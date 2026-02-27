import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

// Fetch all pages
const pages = await client.getEntries({
  content_type: 'page',
  include: 3,
});

console.log(`Found ${pages.items.length} page(s):\n`);

for (const page of pages.items) {
  const f = page.fields;
  console.log(`========================================`);
  console.log(`PAGE: "${f.title || f.name}" (slug: "${f.slug}")`);
  console.log(`========================================`);

  // SEO
  if (f.seo?.fields) {
    console.log(`SEO: title="${f.seo.fields.title}", desc="${f.seo.fields.description}"`);
  }

  const components = f.components || [];
  console.log(`Components: ${components.length}\n`);

  for (const comp of components) {
    if (!comp?.sys?.contentType?.sys?.id) {
      console.log(`  UNRESOLVED LINK: ${JSON.stringify(comp)}`);
      continue;
    }
    if (!comp?.fields) {
      console.log(`  NO FIELDS: ${comp.sys.contentType.sys.id}`);
      continue;
    }

    const ct = comp.sys.contentType.sys.id;
    const fields = comp.fields;
    console.log(`--- ${ct} ---`);
    console.log(`  Field keys: ${JSON.stringify(Object.keys(fields))}`);

    for (const [key, value] of Object.entries(fields)) {
      if (value && typeof value === 'object' && value.sys) {
        const type = value.sys.type;
        const ct2 = value.sys.contentType?.sys?.id;
        console.log(`  ${key}: [${type}${ct2 ? ` (${ct2})` : ''}]`);
        if (value.fields) {
          console.log(`    -> fields: ${JSON.stringify(Object.keys(value.fields))}`);
          console.log(`    -> values: ${JSON.stringify(value.fields, null, 2).substring(0, 600)}`);
        }
      } else if (Array.isArray(value)) {
        console.log(`  ${key}: Array[${value.length}]`);
        for (let idx = 0; idx < Math.min(value.length, 3); idx++) {
          const item = value[idx];
          if (item?.fields) {
            const itemCt = item?.sys?.contentType?.sys?.id || 'unknown';
            console.log(`    [${idx}] (${itemCt}) keys: ${JSON.stringify(Object.keys(item.fields))}`);
            console.log(`        values: ${JSON.stringify(item.fields, null, 2).substring(0, 500)}`);
          } else if (item?.sys?.type === 'Link') {
            console.log(`    [${idx}] UNRESOLVED LINK: ${JSON.stringify(item)}`);
          } else {
            console.log(`    [${idx}]: ${JSON.stringify(item).substring(0, 200)}`);
          }
        }
        if (value.length > 3) {
          console.log(`    ... and ${value.length - 3} more`);
        }
      } else if (typeof value === 'object' && value !== null && value.nodeType) {
        // Rich text
        console.log(`  ${key}: [RichText]`);
      } else {
        const str = JSON.stringify(value);
        console.log(`  ${key}: ${str.length > 300 ? str.substring(0, 300) + '...' : str}`);
      }
    }
    console.log('');
  }
}

// Also check for any content types we might not know about
console.log('\n========================================');
console.log('ALL CONTENT TYPES IN SPACE:');
console.log('========================================');
const contentTypes = await client.getContentTypes();
for (const ct of contentTypes.items) {
  console.log(`  ${ct.sys.id}: "${ct.name}" (${ct.fields.length} fields)`);
  for (const field of ct.fields) {
    const link = field.linkType || (field.items?.linkType) || '';
    console.log(`    - ${field.id} (${field.type}${link ? '→' + link : ''})${field.required ? ' [required]' : ''}`);
  }
}
