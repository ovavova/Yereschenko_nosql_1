//explain спочатку

db.tracks.explain("executionStats").find({
  track_genre: "pop",
  "audio_features.danceability": { $gte: 0.7 }
}).sort({ popularity: -1 }).toArray();

//робимо індекси ESR

// db.tracks.createIndex({
//   track_genre: 1,
//   popularity: -1,
//   "audio_features.danceability": 1
// });

//

// db.tracks.explain("executionStats").find({
//   track_genre: "pop",
//   "audio_features.danceability": { $gte: 0.7 }
// }).sort({ popularity: -1 }).toArray();