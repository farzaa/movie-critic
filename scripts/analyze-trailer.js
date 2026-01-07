require('dotenv').config({ path: require('path').join(__dirname, '../.env.local') });
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable. Check .env.local file.');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function analyzeTrailer(youtubeUrl, movieTitle) {
  console.log(`Analyzing trailer: ${youtubeUrl}\n`);

  try {
    // Use latest Gemini for video understanding with video config
    const model = genAI.getGenerativeModel({
      model: "gemini-3-pro-preview",
      tools: [
        {
          googleSearch: {}
        }
      ],
    });

    console.log('Sending YouTube video to Gemini for analysis (1fps sampling + Google Search grounding)...\n');

    const result = await model.generateContent([
      {
        fileData: {
          fileUri: youtubeUrl,
          mimeType: "video/*"
        }
      },
      {
        text: `Analyze this movie trailer for "${movieTitle}" in detail. It's a real trailer for the movie. Use Google Search to find additional context about the movie, cast, director, and release information.

Provide:
1. A brief summary of what the movie appears to be about (use search to verify plot details)
2. The genre and tone of the film
3. Key visual elements and cinematography style
4. Emotional themes present in the trailer
5. Notable cast or production elements visible (include actual names from search)
6. Release date and any critical reception if available
7. Overall assessment of the trailer's appeal
8. And finally a very in-depth report starting "You should watch this movie if..." and then 3-4 paragraphs detailing it.

Be concise but insightful, and include factual information found via search.
`
      }
    ]);

    const response = result.response;
    const analysis = response.text();

    console.log('========== TRAILER ANALYSIS ==========\n');
    console.log(analysis);
    console.log('\n========== END ==========\n');

    return analysis;

  } catch (error) {
    console.error('Error analyzing trailer:', error);
    console.error('Error details:', error.message);
    return null;
  }
}

async function analyzeAllMovies() {
  try {
    // Read scraped movies
    const moviesPath = path.join(__dirname, '../app/data/scraped-movies.json');
    const moviesData = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));

    console.log(`Found ${moviesData.length} movies to analyze\n`);

    // Analyze each movie's trailer
    for (let i = 0; i < moviesData.length; i++) {
      const movie = moviesData[i];

      if (!movie.trailerUrl) {
        console.log(`Skipping ${movie.title} - no trailer URL\n`);
        continue;
      }

      console.log(`\n========== [${i + 1}/${moviesData.length}] Analyzing: ${movie.title} ==========\n`);

      const analysis = await analyzeTrailer(movie.trailerUrl, movie.title);

      if (analysis) {
        movie.trailerAnalysis = analysis;
        console.log(`✓ Analysis complete for ${movie.title}\n`);

        // Save immediately after each analysis
        fs.writeFileSync(moviesPath, JSON.stringify(moviesData, null, 2));
        console.log(`✓ Saved analysis for ${movie.title} to ${moviesPath}\n`);
      } else {
        console.log(`✗ Failed to analyze ${movie.title}\n`);
      }

      // Add delay between requests to avoid rate limiting
      if (i < moviesData.length - 1) {
        console.log('Waiting 2 seconds before next analysis...\n');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log(`\n✓ All analyses complete!`);

  } catch (error) {
    console.error('Error analyzing movies:', error);
    process.exit(1);
  }
}

// Run analysis on all movies
analyzeAllMovies();
