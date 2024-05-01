import express from 'express';
import mongoose from 'mongoose';

import cors from 'cors'; // Import cors middleware


const app = express();
const PORT = 5000;

// Enable CORS middleware
app.use(cors());




// MongoDB connection URI
const MONGODB_URI = 'mongodb://127.0.0.1:27017/leaderboardDb';

// Define MongoDB schema and model for leaderboard data
const leaderboardSchema = new mongoose.Schema({
    teamName:
        {
          type:String,
          required:true
        
        },
  
      totalGamesPlayed:
      {
        type:Number,
        required:true
      
      },

      score:
      {
        type:Number,
        required:true
      
      }
  
});

const Leaderboard = mongoose.model('leaderboards', leaderboardSchema);

// Connect to MongoDB database
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));




// // API endpoint to fetch leaderboard data
// app.get('/', async (req, res) => {
//   try {
//     // Fetch leaderboard data from MongoDB



//     console.log("Before get req")

//     const teamNames = [
//         "The Avengers",
//         "Skale",
//         "One Million Bugs",
//         "The Musketeers",
//         "Bugs killer",
//         "Foo Fighters",
//         "The Ultimate"
//       ];

      
//       // Generate random scores for each team
//       const leaderboardData = teamNames.map(teamName => ({
//         teamName: teamName,
//         totalGamesPlayed: Math.floor(Math.random() * 30) + 20, // Random total games played between 20 and 49
//         score: Math.floor(Math.random() * 100 )// Random score between 0 and 100
//       }));
    
   
//       // Sort the leaderboardData array in descending order based on the score
//       leaderboardData.sort((a, b) => b.score - a.score);
      
//       // Send the sorted leaderboardData as JSON response
//       res.json(leaderboardData);
      
//   } catch (error) {
//     console.error('Error fetching leaderboard data:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });




app.get('/', async (req, res) => {
  try {
    // Fetch leaderboard data from MongoDB
    const leaderboardData = await Leaderboard.find().sort({ score: -1 }); // Sort by score in descending order

    console.log(leaderboardData, "RANDOM TEXT")
    res.json(leaderboardData);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
