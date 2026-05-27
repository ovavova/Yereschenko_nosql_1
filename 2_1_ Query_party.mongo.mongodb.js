use('spotify');


console.log("-------------------Треки для вечірки-------------\n");


// Використовуємо find для пошуку та project для виведення лише потрібних полів
const filter_party_tracks = 
  {
    "audio_features.danceability": { $gt: 0.7 }, // високий danceability (вище 0.7)
    "audio_features.energy": { $gt: 0.7 },       // має високу енергію (також вище 0.7)
    duration_ms: { $gte: 180000, $lte: 300000 }  // тривалість мкс
  };


// Рахуємо загальну кількість таких треків з фільтром
const totalCount = db.tracks.countDocuments(filter_party_tracks);

//Знаходимо самі треки з лімітом у 10 штук
const partyTracks = db.tracks.find(
  filter_party_tracks,
  {
    _id: 0,
    track_name: 1,
    artists: 1,
    "audio_features.danceability": 1,
    "audio_features.energy": 1,
    duration_ms: 1
  }
).limit(10).toArray(); 

// 4. Виводимо загальну кількість та самі документи
console.log(`Усього знайдено треків для вечірки: ${totalCount}`);
console.log(`Показано перші 10 треків:\n`);
console.log(partyTracks);
