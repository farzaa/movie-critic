require('dotenv').config({ path: require('path').join(__dirname, '../.env.local') });
const { Browserbase } = require('@browserbasehq/sdk');
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const BROWSERBASE_PROJECT_ID = process.env.BROWSERBASE_PROJECT_ID;
const BROWSERBASE_API_KEY = process.env.BROWSERBASE_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!BROWSERBASE_PROJECT_ID || !BROWSERBASE_API_KEY || !GEMINI_API_KEY) {
  throw new Error('Missing required environment variables. Check .env.local file.');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function findYouTubeTrailer(movieTitle) {
  console.log(`Searching for trailer: ${movieTitle}`);

  try {
    console.log('Making Gemini API request with Google Search...');

    const model = genAI.getGenerativeModel({
      model: "gemini-3-pro-preview",
      tools: [
        {
          googleSearch: {}
        }
      ]
    });

    const result = await model.generateContent([
      `whats the yt link for ${movieTitle} trailer like the exact video link?`
    ]);

    console.log('API response received');

    const response = result.response;
    const trailerUrl = response.text().trim();

    console.log(`Found: ${trailerUrl}`);
    return trailerUrl;
  } catch (error) {
    console.error(`Error finding trailer for ${movieTitle}:`, error);
    console.error('Error details:', error.message);
    return null;
  }
}

async function scrapeAMCMovies() {
  console.log('Creating BrowserBase session...');
  const bb = new Browserbase({
    apiKey: BROWSERBASE_API_KEY,
  });

  const session = await bb.sessions.create({
    projectId: BROWSERBASE_PROJECT_ID,
  });

  console.log('Session created:', session.id);

  const browser = await puppeteer.connect({
    browserWSEndpoint: session.connectUrl,
  });

  try {
    const page = await browser.newPage();

    console.log('Navigating to AMC Lincoln Square showtimes...');
    await page.goto('https://www.amctheatres.com/movie-theatres/new-york-city/amc-lincoln-square-13/showtimes');

    console.log('Waiting for dynamic content to fully load...');
    // Give significant time for React/JS to render
    await new Promise(resolve => setTimeout(resolve, 10000));

    console.log('Extracting movie titles...');
    const movieTitles = await page.evaluate(() => {
      const titles = [];

      // Find all section elements (each section is a movie)
      const sections = document.querySelectorAll('section');

      sections.forEach(section => {
        // Find the movie title link within this section
        const titleLink = section.querySelector('a[href^="/movies/"]');

        if (titleLink) {
          const title = titleLink.textContent.trim();
          if (title) {
            titles.push(title);
          }
        }
      });

      return titles;
    });

    console.log('\n\n========== MOVIE TITLES ==========\n');
    movieTitles.forEach(title => {
      console.log(title);
    });
    console.log('\n========== END ==========\n\n');
    console.log(`Found ${movieTitles.length} movies`);

    return movieTitles;
  } catch (error) {
    console.error('Error scraping movies:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run the scraper
async function main() {
  try {
    // Step 1: Scrape movie titles
    const titles = await scrapeAMCMovies();
    console.log(`\nSuccessfully scraped ${titles.length} movie titles`);

    // Step 2: Find YouTube trailers for each movie
    console.log('\n========== FINDING YOUTUBE TRAILERS ==========\n');
    const moviesWithTrailers = [];

    for (let i = 0; i < titles.length; i++) {
      const title = titles[i];
      const trailerUrl = await findYouTubeTrailer(title);
      moviesWithTrailers.push({
        id: i + 1,
        title,
        trailerUrl,
        genre: 'Drama', // Placeholder
        rating: 7.5, // Placeholder
        review: 'AI prediction pending based on trailer analysis.',
        posterUrl: '',
        releaseDate: new Date().getFullYear().toString(),
        showtimes: []
      });

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Step 3: Save to JSON file
    const outputPath = path.join(__dirname, '../app/data/scraped-movies.json');
    fs.writeFileSync(outputPath, JSON.stringify(moviesWithTrailers, null, 2));
    console.log(`\n✓ Saved ${moviesWithTrailers.length} movies with trailers to ${outputPath}`);

    console.log('\n========== COMPLETE ==========\n');
  } catch (error) {
    console.error('Failed to scrape:', error);
    process.exit(1);
  }
}

main();
