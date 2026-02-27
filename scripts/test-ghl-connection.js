#!/usr/bin/env node

/**
 * Test GoHighLevel API Connection
 * 
 * Verifies your GHL API credentials are working
 */

import 'dotenv/config';

const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

if (!GHL_API_KEY || !GHL_LOCATION_ID) {
  console.error('❌ Missing required environment variables:');
  if (!GHL_API_KEY) console.error('   - GHL_API_KEY');
  if (!GHL_LOCATION_ID) console.error('   - GHL_LOCATION_ID');
  console.log('\n📝 Add these to your .env file');
  process.exit(1);
}

async function testConnection() {
  console.log('🔌 Testing GoHighLevel Connection...\n');
  console.log('API Key:', GHL_API_KEY.substring(0, 10) + '...');
  console.log('Location ID:', GHL_LOCATION_ID);
  console.log('');

  try {
    // Test 1: Get Location Info
    console.log('Test 1: Fetching location info...');
    const locationResponse = await fetch(
      `https://rest.gohighlevel.com/v1/locations/${GHL_LOCATION_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!locationResponse.ok) {
      throw new Error(`HTTP ${locationResponse.status}: ${locationResponse.statusText}`);
    }

    const location = await locationResponse.json();
    console.log('✅ Location found:', location.name || location.companyName);
    console.log('');

    // Test 2: List Contacts
    console.log('Test 2: Fetching contacts...');
    const contactsResponse = await fetch(
      `https://rest.gohighlevel.com/v1/contacts?locationId=${GHL_LOCATION_ID}&limit=5`,
      {
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!contactsResponse.ok) {
      throw new Error(`HTTP ${contactsResponse.status}`);
    }

    const contacts = await contactsResponse.json();
    console.log(`✅ Found ${contacts.contacts?.length || 0} contacts (showing first 5)`);
    console.log('');

    // Test 3: List Pipelines
    console.log('Test 3: Fetching pipelines...');
    const pipelinesResponse = await fetch(
      `https://rest.gohighlevel.com/v1/pipelines/?locationId=${GHL_LOCATION_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (pipelinesResponse.ok) {
      const pipelines = await pipelinesResponse.json();
      console.log(`✅ Found ${pipelines.pipelines?.length || 0} pipelines`);
      
      if (pipelines.pipelines && pipelines.pipelines.length > 0) {
        console.log('\n📋 Available Pipelines:');
        pipelines.pipelines.forEach(p => {
          console.log(`   - ${p.name} (ID: ${p.id})`);
        });
      }
    } else {
      console.log('⚠️  Could not fetch pipelines (permission issue?)');
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ CONNECTION SUCCESSFUL!');
    console.log('='.repeat(50));
    console.log('\nYour GoHighLevel API credentials are working correctly.');
    console.log('You can now use GHL forms in your project.\n');

  } catch (error) {
    console.log('\n' + '='.repeat(50));
    console.error('❌ CONNECTION FAILED!');
    console.log('='.repeat(50));
    console.error('\nError:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your API key is correct');
    console.log('2. Verify Location ID is correct');
    console.log('3. Ensure API key has proper scopes:');
    console.log('   - contacts.readonly');
    console.log('   - contacts.write');
    console.log('   - locations.readonly');
    console.log('\n');
    process.exit(1);
  }
}

testConnection();
