require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'https://api.sandbox.sahamati.org.in';

async function generateToken() {
  try {
    const response = await axios.post(`${BASE_URL}/iam/v1/user/token/generate`, 
      new URLSearchParams({
        username: process.env.SAHAMATI_USERNAME,
        password: process.env.SAHAMATI_PASSWORD
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json'
        }
      }
    );

    return response.data.accessToken;
  } catch (error) {
    console.error('Error generating token:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function readEntitySecret(accessToken) {
  try {
    const response = await axios.post(`${BASE_URL}/iam/v1/entity/secret/read`,
      {
        ver: "1.0.0",
        timestamp: new Date().toISOString(),
        txnId: "3f5761ac-4a18-11e8-96ff-0277a9fbfedc", // You might want to generate this dynamically
        entityId: "Ice-FIU"
      },
      {
        headers: {
          'Authorization': accessToken,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error reading entity secret:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function main() {
  try {
    const accessToken = await generateToken();
    console.log('Access Token:', accessToken);

    const entitySecret = await readEntitySecret(accessToken);
    console.log('Entity Secret:', entitySecret);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();