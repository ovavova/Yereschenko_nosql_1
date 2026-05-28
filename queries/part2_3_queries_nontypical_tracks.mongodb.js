// 1. Ініціалізація вашої бази даних у Playground
use('spotify'); 

// 2. Агрегація даних вашої колекції
db.tracks.aggregate([
  //  Відсікаємо документи без коректного темпу, щоб уникнути NaN 
  {
    $match: {
      "audio_features.tempo": { $type: "number" }
    }
  },

  // Групуємо за жанром, рахуємо середнє і відхилення, збираємо треки
  {
    $group: {
      _id: "$track_genre",
      avg_tempo: { $avg: "$audio_features.tempo" },
      stdDev: { $stdDevPop: "$audio_features.tempo" },
      all_tracks: {
        $push: {
          _id: "$_id",
          track_name: "$track_name",
          popularity: "$popularity",
          artists: "$artists",
          audio_features: {
            tempo: "$audio_features.tempo"
          }
        }
      }
    }
  },
  
  // 3. Формуємо поріг tempo треку > mean жанру + 2 * stdDev жанру
  {
    $project: {
      _id: 0,
      genre: "$_id",
      avg_tempo: "$avg_tempo",
      outlier_threshold: {
        $add: [
          "$avg_tempo",
          { $multiply: [2, "$stdDev"] }
        ]
      },
      all_tracks: 1
    }
  },
  
  // Фільтруємо tempo > outlier_threshold
  {
    $project: {
      avg_tempo: 1,
      genre: 1,
      outlier_threshold: 1,
      outlier_tracks: {
        $filter: {
          input: "$all_tracks",
          as: "track",
          cond: { $gt: ["$$track.audio_features.tempo", "$outlier_threshold"] }
        }
      }
    }
  },
  
  // Виключаємо з результатів жанри, у яких немає жодного нетипового треку
  {
    $match: {
      "outlier_tracks.0": { $exists: true }
    }
  }
]);