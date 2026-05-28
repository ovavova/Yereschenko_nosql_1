// Припустимо, що ви часто шукаєте музику для роботи, використовуючи поля audio_features.instrumentalness, audio_features.speechiness та explicit. Щоб такі запити виконувалися ефективно, створіть складений індекс за цими полями та за допомогою explain() покажіть, що він використовується при виконанні пошуку.

use('spotify');

// // cтворюємо індекс
// db.tracks.createIndex({
//   "explicit": 1,                                   //E
//   "audio_features.instrumentalness": 1,            //S
//   "audio_features.speechiness": 1                  //R
// }, { name: "work_music_index" }); //  ім'я 

//  пошук 
db.tracks.find({
  explicit: false,                                    //
  "audio_features.instrumentalness": { $gte: 0.8 },   // 
  "audio_features.speechiness": { $lte: 0.1 }         // 
})

.explain("executionStats");

// db.tracks.dropIndexes();