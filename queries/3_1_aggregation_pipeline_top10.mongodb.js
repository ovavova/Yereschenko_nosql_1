db.tracks.aggregate([
  // Step 1: Розгортаємо масив артистів, щоб обробляти кожного виконавця окремо
  { 
    $unwind: "$artists" 
  },
  
  // Step 2: Групуємо за виконавцем, рахуємо кількість треків та середню популярність
  {
    $group: {
      _id: "$artists",
      totalTracks: { $sum: 1 },
      avgPopularity: { $avg: "$popularity" }
    }
  },
  
  // Step 3: Фільтруємо виконавців, які мають хоча б 5 треків
  {
    $match: {
      totalTracks: { $gte: 5 }
    }
  },
  
  // Step 4: Сортуємо за спаданням середньої популярності
  {
    $sort: {
      avgPopularity: -1
    }
  },
  
  // Step 5: Обмежуємо результат топ-10 виконавцями
  {
    $limit: 10
  },
  
  // Step 6: Форматуємо вивід (проекція), щоб залишити тільки потрібні поля
  {
    $project: {
      _id: 0,
      artist: "$_id",
      avgPopularity: { $round: ["$avgPopularity", 2] } // Округлення для красивого виводу
    }
  }
]);