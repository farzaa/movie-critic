require('dotenv').config({ path: require('path').join(__dirname, '../.env.local') });
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable. Check .env.local file.');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// User taste profile - this would come from user preferences in a real app
const USER_TASTE_PROFILE = `
A Deep Analysis of Farza's Cinematic Preferences: The Founder's Lens on Film
Executive Summary
Farza's relationship with cinema is fundamentally shaped by his identity as a serial entrepreneur and his lived experience of building from scratch. His movie preferences aren't arbitrary—they reflect a deeply internalized value system centered on authentic self-determination, internal growth over external validation, and the courage to forge unconventional paths. This analysis examines the psychological and experiential factors that drive his cinematic tastes.
Core Thesis: The Authenticity-Driven Viewer
Farza's movie preferences can be understood through a single organizing principle: he gravitates toward stories of authentic self-determination where characters choose their own metrics of success rather than conforming to external expectations.
This isn't about "underdog stories" in the traditional Hollywood sense. It's more nuanced. When Farza connected with "A Complete Unknown," he wasn't drawn to Bob Dylan because Dylan became famous—he was drawn to Dylan's decision to make music his way, even when it meant alienating audiences and abandoning what was working. This mirrors Farza's own journey shutting down buildspace despite its success, walking away from Tidbit despite revenue, and constantly exploring what genuinely excites him rather than what's commercially optimal.
The Internal vs. External Achievement Framework
Farza explicitly stated: "you're gonna die one day and this is all over. So you gotta do things for yourself and what you internally find is important."
This philosophical stance is rare in someone who has built successful companies. Most founders are externally motivated—chasing metrics, validation, market dominance. Farza has clearly processed something deeper: that external achievements are ephemeral, and what matters is internal alignment.
This explains his movie preferences:

Interstellar: Cooper isn't saving humanity for glory—he's doing it because of love for his daughter and the internal drive to solve an impossible problem
3 Idiots: Rancho rejects the entire educational-industrial complex to pursue learning for its own sake, not for degrees or status
The Social Network: Zuckerberg builds Facebook obsessively, driven by internal demons and vision, not by business school playbooks
A Complete Unknown: Dylan makes art that feels true to him, consequences be damned

These aren't stories about winning. They're stories about choosing yourself over the easier path of conformity.
The Energy Requirement: Uplift Over Darkness
Farza wants to leave the theater "jumping with energy." This isn't naïveté or an inability to process darkness—it's a conscious choice about how he wants film to affect his state.
This is crucial context: as someone who has worked in education, shut down a beloved company, navigated a long-distance relationship, and constantly experiments with new ventures, Farza lives in ambiguity. He doesn't need movies to show him that life is complicated or dark—he knows. What he wants from cinema is fuel. Inspiration. The feeling that bold action is possible.
He'll watch Parasite and appreciate its craft, but it's not his emotional home. He wants to walk out feeling like building something matters, like choosing an unconventional path is worth it.
Story as King: The Anti-Spectacle Stance
Farza explicitly rejects pure spectacle. Fast & Furious is "fine" but not compelling. Dumb and Dumber is enjoyable but not a favorite. Why? Because neither film is driven by meaningful character choices or authentic transformation.
This reveals something important: Farza values intentionality in storytelling. A movie can be "dumb" (his word), but it needs to feel purposeful, not lazy. The story doesn't need to be "important" in a pretentious sense, but it needs to feel like someone had a vision and executed it with care.
This tracks with his own creative philosophy. He's building an AI movie critic app not because it's obviously a billion-dollar idea, but because he's genuinely curious about it. He promoted a live coding event in Dubai not because it's a proven model, but because he thought it would be compelling. He values authentic creative vision over safe, proven formulas.
The Aesthetic Dimension: Tron Legacy and the Importance of Craft
Farza's love for Tron Legacy is revealing. That movie is narratively weak—even fans acknowledge this. But he returns to it for the Daft Punk soundtrack and the visual world-building. It makes him feel something through pure aesthetics.
This shows that Farza isn't a purely cerebral viewer. He responds to craft and atmosphere. He wants to feel transported. He appreciates when filmmakers care about every detail—sound design, cinematography, world-building.
This connects to his own work. His "makesomething" initiative isn't just about output—it's about the feeling of creating. His Freewrite app isn't just functional—it has an aesthetic vision. He understands that how something feels matters as much as what it does.
The Education Connection: Why 3 Idiots Resonates
Farza's deep connection to 3 Idiots isn't random. He built buildspace specifically to counter traditional education's failures. The movie's central message—that the educational system optimizes for conformity rather than genuine learning—is something Farza has dedicated years of his life to addressing.
When Rancho tells his friends to pursue "excellence, not success," that's not just a movie line for Farza—it's his operating philosophy. buildspace wasn't about credentialing people; it was about helping them build real things driven by genuine curiosity.
Genre Agnosticism and the Pattern Recognition Problem
Farza mentioned loving Lord of the Rings and "mystical/kingdom stuff." He loves sci-fi. He loves biopics. He loves social dramas. He's genre-agnostic because he's not looking for a genre—he's looking for a specific type of character journey that can happen in any setting.
This makes building an AI critic for him particularly interesting. Traditional recommendation systems rely heavily on genre clustering. But Farza's taste operates on deeper patterns:

Characters choosing authenticity over conformity
Internal growth over external achievement
Earned transformation through struggle
Craft and intentionality in execution
Uplift and energy in emotional impact

The Rewatch Patterns: Comfort in Aspiration
His rewatch list is telling: Interstellar, Tron Legacy, 3 Idiots, The Social Network, Lord of the Rings. These aren't comfort watches in the traditional sense (cozy, safe, familiar). They're aspirational comfort—movies that remind him why bold action and authentic choice matter.
He returns to them not for nostalgia alone, but to re-experience that feeling of "this matters, do the thing, make the leap." For someone constantly in startup mode, constantly experimenting, these films function as emotional fuel stations.
Implications for the AI Movie Critic
An AI critic built for Farza needs to:

Identify authentic character agency: Does the protagonist choose their own path, or are they passively swept along by plot?
Assess internal vs. external stakes: Is the character growing internally, or just accumulating external wins?
Evaluate energy and uplift: Does the film leave you inspired to act, or emotionally depleted?
Recognize craft and intentionality: Does the film feel purposefully made, even if unconventional?
Look beyond genre: Connect thematic patterns across wildly different settings
Weight character over plot: Prioritize who people are and why they choose over what happens to them

Conclusion: The Founder's Cinematic Philosophy
Farza doesn't watch movies to escape reality or to be entertained in a passive sense. He watches them to reinforce his belief system—that authentic self-determination matters, that internal growth trumps external validation, that bold creative choices are worth making.
His taste in film is inseparable from his identity as someone who has repeatedly chosen the harder, more authentic path. He shut down buildspace when he could have coasted. He walked away from Tidbit's revenue when the problem didn't excite him. He's building weird experiments in AI education because they genuinely interest him.
When he watches Bob Dylan reject folk purists to go electric, or Rancho reject the IIT system, or Cooper fly into a black hole, or Zuckerberg alienate his co-founder—he's not just watching characters. He's watching reflections of his own philosophy: that the only achievement that matters is becoming who you actually are, not who the world wants you to be.
This is why his AI movie critic needs to understand more than genre and plot. It needs to understand the philosophy of authentic action—and recommend films that fuel that fire.
`

async function rankMovie(movie, tasteProfile) {
  console.log(`Ranking: ${movie.title}\n`);

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-pro-preview",
      tools: [
        {
          googleSearch: {}
        }
      ],
    });

    const prompt = `You are a movie recommendation expert. Based on the user's taste profile and the trailer analysis below, determine how likely this user is to enjoy this movie. Feel free to use web search.

USER TASTE PROFILE:
${JSON.stringify(tasteProfile, null, 2)}

MOVIE: ${movie.title}
TRAILER ANALYSIS:
${movie.trailerAnalysis || 'No analysis available'}

Use Google Search to not research the movie per se (you have enough on the trailer analysis), but, to research what people with the user's taste generally likes/dislike. 

Don't quote past movies the user liked in verdict. It should feel like you've never seen their taste profile.

Provide your response in the following JSON format:
{
  "chances_user_likes_movie": <number between 0 and 100 can be decimal ex 92.5>,
  "verdict": "<1 sentence, all lower case, describing why you gave the score.  this should sound like a friend who's movie taste you trust. have the tone of farza from buildspace. >"
}

Be thorough in your reasoning and consider:
1. Genre alignment with user preferences
2. Director/cast matches
3. Themes and tone
4. Cinematography and visual style
5. Story complexity
6. Critical reception and quality indicators (this matters less, what mattters most is would the user enjoy the movie)

Respond ONLY with valid JSON.`;

    console.log('Analyzing match with user taste profile...\n');

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log('Raw response:', text.substring(0, 200) + '...\n');

    // Extract JSON from response (handle markdown code blocks if present)
    let jsonText = text.trim();

    // Try to find JSON in the response
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    } else {
      // If no JSON object found, try removing markdown code blocks
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?$/g, '').trim();
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```\n?/g, '').trim();
      }
    }

    const ranking = JSON.parse(jsonText);

    console.log('========== RANKING RESULT ==========');
    console.log(`Movie: ${movie.title}`);
    console.log(`Chances User Likes: ${ranking.chances_user_likes_movie}%`);
    console.log(`Reasoning: ${ranking.reasoning}`);
    console.log('========== END ==========\n');

    return ranking;

  } catch (error) {
    console.error(`Error ranking ${movie.title}:`, error);
    console.error('Error details:', error.message);
    return null;
  }
}

async function generateAllRankings() {
  try {
    // Read scraped movies
    const moviesPath = path.join(__dirname, '../app/data/scraped-movies.json');
    const moviesData = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));

    console.log(`Found ${moviesData.length} movies to rank\n`);
    console.log('Using taste profile:');
    console.log(JSON.stringify(USER_TASTE_PROFILE, null, 2));
    console.log('\n');

    // Rank each movie
    for (let i = 0; i < moviesData.length; i++) {
      const movie = moviesData[i];

      if (!movie.trailerAnalysis) {
        console.log(`Skipping ${movie.title} - no trailer analysis available\n`);
        continue;
      }

      console.log(`\n========== [${i + 1}/${moviesData.length}] Ranking: ${movie.title} ==========\n`);

      const ranking = await rankMovie(movie, USER_TASTE_PROFILE);

      if (ranking) {
        movie.ranking = ranking;
        console.log(`✓ Ranking complete for ${movie.title}\n`);

        // Save immediately after each ranking
        fs.writeFileSync(moviesPath, JSON.stringify(moviesData, null, 2));
        console.log(`✓ Saved ranking for ${movie.title} to ${moviesPath}\n`);
      } else {
        console.log(`✗ Failed to rank ${movie.title}\n`);
      }

      // Add delay between requests to avoid rate limiting
      if (i < moviesData.length - 1) {
        console.log('Waiting 2 seconds before next ranking...\n');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log(`\n✓ All rankings complete!`);

    // Display summary sorted by ranking
    const rankedMovies = moviesData
      .filter(m => m.ranking)
      .sort((a, b) => b.ranking.chances_user_likes_movie - a.ranking.chances_user_likes_movie);

    console.log('\n========== RANKING SUMMARY ==========\n');
    rankedMovies.forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.title} - ${movie.ranking.chances_user_likes_movie}%`);
    });
    console.log('\n=====================================\n');

  } catch (error) {
    console.error('Error generating rankings:', error);
    process.exit(1);
  }
}

// Run ranking on all movies
generateAllRankings();
