import { createClient } from 'contentful';

const client = createClient({
  space: 'sm8otodtkz58',
  accessToken: 'cMj9I6sZK52795pLZ9EiQKqTepPNQGYtRDh6zH9Sh3E',
  environment: 'master',
});

const entries = await client.getEntries({
  content_type: 'page',
  'fields.slug': 'home',
  include: 3,
  limit: 1,
});

if (entries.items.length === 0) {
  console.log('No page found');
  process.exit(1);
}

const page = entries.items[0];
const components = page.fields.components || [];

console.log('Page title:', page.fields.title || page.fields.name);
console.log('Components count:', components.length);
console.log('---');

for (const comp of components) {
  if (!comp?.sys?.contentType?.sys?.id) {
    console.log('UNRESOLVED LINK:', JSON.stringify(comp));
    continue;
  }
  const ct = comp.sys.contentType.sys.id;
  const fields = comp.fields;
  console.log(`\n=== ${ct} ===`);
  console.log('Field keys:', Object.keys(fields));

  // Print each field with truncated values
  for (const [key, value] of Object.entries(fields)) {
    if (value && typeof value === 'object' && value.sys) {
      // It's a linked entry or asset
      const type = value.sys.type;
      const ct2 = value.sys.contentType?.sys?.id;
      console.log(`  ${key}: [${type}${ct2 ? ` (${ct2})` : ''}]`);
      if (value.fields) {
        console.log(`    -> fields:`, Object.keys(value.fields));
      }
    } else if (Array.isArray(value)) {
      console.log(`  ${key}: Array[${value.length}]`);
      if (value.length > 0 && value[0]?.fields) {
        console.log(`    -> first item fields:`, Object.keys(value[0].fields));
        console.log(`    -> first item contentType:`, value[0]?.sys?.contentType?.sys?.id);
        console.log(`    -> first item field values:`, JSON.stringify(value[0].fields, null, 2).substring(0, 500));
      } else if (value.length > 0) {
        console.log(`    -> first item:`, JSON.stringify(value[0]).substring(0, 200));
      }
    } else {
      const str = JSON.stringify(value);
      console.log(`  ${key}:`, str.length > 200 ? str.substring(0, 200) + '...' : str);
    }
  }
}
