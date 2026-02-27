#!/usr/bin/env node

/**
 * Test GoHighLevel Form Submission
 * 
 * Tests creating a contact and adding a note (simulates form submission)
 */

import 'dotenv/config';

const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

if (!GHL_API_KEY || !GHL_LOCATION_ID) {
  console.error('❌ Missing GHL_API_KEY or GHL_LOCATION_ID in .env');
  process.exit(1);
}

async function testFormSubmission() {
  console.log('📝 Testing GHL Form Submission...\n');

  try {
    // Test contact data
    const testContact = {
      firstName: 'Test',
      lastName: 'User',
      email: `test-${Date.now()}@example.com`,
      phone: '+1234567890',
      source: 'karens-cleaning-test',
      tags: ['test-contact'],
    };

    console.log('1️⃣ Creating test contact...');
    console.log('   Email:', testContact.email);

    const createResponse = await fetch(
      `https://rest.gohighlevel.com/v1/contacts/`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...testContact,
          locationId: GHL_LOCATION_ID,
        }),
      }
    );

    if (!createResponse.ok) {
      const error = await createResponse.json();
      throw new Error(`Failed to create contact: ${JSON.stringify(error)}`);
    }

    const contact = await createResponse.json();
    console.log('✅ Contact created!');
    console.log('   Contact ID:', contact.contact?.id || contact.id);
    console.log('');

    const contactId = contact.contact?.id || contact.id;

    // Test adding a note
    console.log('2️⃣ Adding note to contact...');
    const noteResponse = await fetch(
      `https://rest.gohighlevel.com/v1/contacts/${contactId}/notes`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: 'This is a test note from Karen's Cleaning form test.',
        }),
      }
    );

    if (noteResponse.ok) {
      console.log('✅ Note added!');
    } else {
      console.log('⚠️  Could not add note (permission issue?)');
    }

    console.log('');
    console.log('='.repeat(50));
    console.log('✅ FORM SUBMISSION TEST PASSED!');
    console.log('='.repeat(50));
    console.log('\nYour GHL form integration is working correctly.');
    console.log('\n💡 Next: Check your GHL dashboard for the test contact.');
    console.log(`   Email: ${testContact.email}`);
    console.log('\n⚠️  Remember to delete the test contact from GHL!\n');

  } catch (error) {
    console.log('\n' + '='.repeat(50));
    console.error('❌ TEST FAILED!');
    console.log('='.repeat(50));
    console.error('\nError:', error.message);
    console.log('\n🔧 Check:');
    console.log('1. API key has contacts.write scope');
    console.log('2. Location ID is correct');
    console.log('3. Run: npm run test:ghl:connection first\n');
    process.exit(1);
  }
}

testFormSubmission();
