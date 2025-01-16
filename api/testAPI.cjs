const axios = require('axios');

// Base URL for your local server
const baseURL = 'http://localhost:3001';

async function testEndpoint(endpoint, method = 'get', data = {}) {
  try {
    const response = await axios({
      method,
      url: `${baseURL}${endpoint}`,
      data,
    });
    console.log(`✅ [${method.toUpperCase()}] ${endpoint} - Status: ${response.status}`);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`❌ [${method.toUpperCase()}] ${endpoint} - Status: ${error.response.status}`);
      console.error('Error Response:', error.response.data);
    } else {
      console.error(`❌ [${method.toUpperCase()}] ${endpoint} - Error:`, error.message);
    }
  }
}

// List of tests to run
const tests = [
  // Basic tests
  { endpoint: '/login', method: 'post', data: { username: 'pitagoras', password: 'Orwell1984!!' } },
  { endpoint: '/signUp', method: 'post', data: { username: 'newusessre1', email: 'newuse1sser@example.com', password: 'Newpass1!' } },
  { endpoint: '/verify-email', method: 'get' },
  
  // Dynamic path tests with various paths and data
  { endpoint: '/path/rabano/be/friend', method: 'post', data: { relationship: 'best friend' } },
  { endpoint: '/path/rabano/have/skills', method: 'post', data: { skill: 'coding' } },
  { endpoint: '/path/rabano/do/actions', method: 'post', data: { action: 'write code' } },

  // Test auto-initialization on new path
  { endpoint: '/path/rabano/me&&you/love', method: 'post', data: { context: 'travel' } },

  // Test non-existent user (expect 404)
  { endpoint: '/path/nonexistentuser/me&&you', method: 'post', data: {} },

  // Check retrieval of user profile
  { endpoint: '/user-profile/rabano', method: 'get' },
];

// Run all tests
async function runTests() {
  for (let test of tests) {
    console.log(`Testing ${test.endpoint}`);
    await testEndpoint(test.endpoint, test.method, test.data);
  }
}

runTests();