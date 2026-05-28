use('spotify'); 


const topArtists = db.tracks.aggregate([
  { 
    $unwind: "$artists" 
  },
  {
    $group: {
      _id: "$artists",
      totalTracks: { $sum: 1 },
      avgPopularity: { $avg: "$popularity" }
    }
  },
  {
    $match: {
      totalTracks: { $gte: 50 }
    }
  },
  {
    $sort: {
      avgPopularity: -1
    }
  },
  {
    $limit: 10
  },
  {
    $project: {
      _id: 0,
      artist: "$_id",
      avgPopularity: { $round: ["$avgPopularity", 2] }
    }
  }
]).toArray(); // Конвертуємо у масив для виводу

//Виводимо результат у Playground
topArtists;