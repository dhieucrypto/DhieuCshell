const axios = require('axios');

async function testLink4M() {
    const apiToken = '684f35458e7e332bb173a6c8';
    const testUrl = 'https://google.com';
    const apiUrl = `https://link4m.com/api-shorten/v2?api=${apiToken}&url=${encodeURIComponent(testUrl)}`;

    console.log('Testing Link4M API with URL:', apiUrl);

    try {
        const response = await axios.get(apiUrl);
        console.log('Response status:', response.status);
        console.log('Response data:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error testing Link4M:', error.message);
        if (error.response) {
            console.error('Error response data:', error.response.data);
        }
    }
}

testLink4M();
