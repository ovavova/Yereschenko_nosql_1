
use('spotify'); 

// Пошук треків для фонової роботи
db.tracks.aggregate([
  {
    $match: {
      "audio_features.loudness": { $lt: -10 },
      "audio_features.speechiness": { $lt: 0.1 },
      "audio_features.instrumentalness": { $gt: 0.5 },
      "explicit": false
    }
  },

]);