//explain спочатку

use('spotify');

db.tracks.find({
  track_genre: "pop",
  "audio_features.danceability": { $gte: 0.7 }
})
.sort({ popularity: -1 })
.explain("executionStats"); // для VSCode playground 

//робимо індекси 

// db.tracks.createIndex({
//   track_genre: 1,
//   popularity: -1,
//   "audio_features.danceability": 1
// });

//

// db.tracks.dropIndexes();
