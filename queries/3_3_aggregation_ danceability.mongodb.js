// 3. Найбільш «танцювальний» жанр

// Визначте, який музичний жанр найкраще підходить для танців. Для цього згрупуйте треки за жанрами та обчисліть середні значення танцювальності (danceability), енергії (energy) та позитивності (valence).

// Відфільтруйте жанри, в яких налічується менше 100 треків, щоб забезпечити статистичну надійність. У результаті виведіть:

// назву жанру
// середню танцювальність (avg_danceability)
// середню енергію (avg_energy)
// середню позитивність (avg_valence)
// кількість треків у жанрі

use('spotify');

const danceableGenres = db.tracks.aggregate([
  // Групуємо за жанром та рахуємо avg
  {
    $group: {
      _id: "$track_genre",
      totalTracks: { $sum: 1 },
      avg_danceability: { $avg: "$audio_features.danceability" },
      avg_energy: { $avg: "$audio_features.energy" },
      avg_valence: { $avg: "$audio_features.valence" }
    }
  },

  // Фільтруємо жанри, де менше 100 треків, щоб забезпечити статистичну надійність.
  {
    $match: {
      totalTracks: { $gte: 100 }
    }
  },

  // Сортуємо за спаданням середньої dancibility
  {
    $sort: {
      avg_danceability: -1
    }
  },

  // Форматуємо вивід проекція та округлення
  {
    $project: {
      _id: 0,
      genre: "$_id",
      avg_danceability: { $round: ["$avg_danceability", 3] },
      avg_energy: { $round: ["$avg_energy", 3] },
      avg_valence: { $round: ["$avg_valence", 3] },
      tracks_count: "$totalTracks"
    }
  }
]).toArray();

// Вивід результату в Playground
danceableGenres;