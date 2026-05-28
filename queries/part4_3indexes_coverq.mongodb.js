// Покривний запит

// Припустимо, що індекс із завдання 1 вже існує.

// Дано запит:
use('spotify');

db.tracks.find({
  track_genre: "pop",
  popularity: { $gte: 70 }
},
  {
    track_genre: 1, 
    popularity: 1,  
    _id: 0          
  })
.explain("executionStats");


