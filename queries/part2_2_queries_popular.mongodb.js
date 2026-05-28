
use('spotify'); 

db.tracks.aggregate([
  // Розгортаємо  артистів
  { $unwind: "$artists" },

  // Групуємо за іменем артиста та рахуємо 
  {
    $group: {
      _id: "$artists",
      total_tracks: { $sum: 1 },
      min_popularity: { $min: "$popularity" },
      avg_popularity: { $avg: "$popularity" }
    }
  },

  // 3. Фільтруємо за критеріями: >= 3 треків та мінімальна популярність >= 60
  {
    $match: {
      total_tracks: { $gte: 3 },
      min_popularity: { $gte: 60 }
    }
  },

  //  Сортуємо за середньою популярністю (від вищої до нижчої) та топ-20
  { $sort: { avg_popularity: -1 } },
  { $limit: 20 },

  // Формуємо view
  {
    $project: {
      _id: 0,
      artist_name: "$_id",
      total_tracks: 1,
      min_popularity: 1,
      avg_popularity: { $round: ["$avg_popularity", 1] }
    }
  }
]);