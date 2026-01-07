require('dotenv').config({ path: require('path').join(__dirname, '../.env.local') });
const { GoogleGenerativeAI } = require('@google/generative-ai');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable. Check .env.local file.');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function testWebSearch() {
  const movieTitle = "Marty Supreme";

  console.log(`Testing Gemini for: ${movieTitle}`);
  console.log('Making API request...\n');

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-pro-preview",
      tools: [
        {
          googleSearch: {}
        }
      ]
    });

    const result = await model.generateContent([
      `whats the yt link for marty supreme trailer like the exact video link?`
    ]);

    const response = result.response;
    const trailerUrl = response.text();

    console.log('✓ API response received!\n');
    console.log('Trailer URL:', trailerUrl.trim());

  } catch (error) {
    console.error('✗ Error occurred:\n');
    console.error('Error message:', error.message);
    console.error('\nFull error:', error);
  }
}

testWebSearch();
