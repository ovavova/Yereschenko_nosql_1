// scripts/02_transform.js
// Запуск: mongosh "ВАШ_URI" --file scripts/02_transform.js

!!! МІСЦЕ ДЛЯ ВАШОГО КОДУ !!!


db = db.getSiblingDB("spotify");

// raw дані після завантаження
const source_collection = "tracks_raw";

//Перед трансформацією видаліть стару колекцію tracks, якщо вона існує.

print("Видалення старої колекції 'tracks'...");
db.tracks.drop();

print("Початок трансформації даних...");

// Трансформація диних 

const pipeline = [
  {
    $project: {
      // Залишаємо тільки потрібні поля для аналізу:track_id, track_name, album_name, explicit, popularity, duration_ms, track_genre та рядок із артистами (artists_raw)
      track_id: 1,
      track_name: 1,
      album_name: 1,
      explicit: 1,
      popularity: 1,
      duration_ms: 1,
      track_genre: 1,

      // 3. Перетворення артистів

      artists: {
        $map: {
          input: { $split: ["$artists_raw", ";"] },
          as: "artist",
          // зберігаємо масивом без пробілів:
          in: { $trim: { input: "$$artist" } }
        }
      },

      // 4. Формування аудіо-характеристик та обчислюваних полів

        // 4.1 Створіть вкладений об’єкт audio_features, що включає всі аудіофічі: danceability, energy, loudness, speechiness, acousticness, instrumentalness, liveness, valence, tempo, key, mode, time_signature.

      audio_features: {
        danceability: "$danceability",
        energy: "$energy",
        loudness: "$loudness",
        speechiness: "$speechiness",
        acousticness: "$acousticness",
        instrumentalness: "$instrumentalness",
        liveness: "$liveness",
        valence: "$valence",
        tempo: "$tempo",
        key: "$key",
        mode: "$mode",
        time_signature: "$time_signature"
      },

      // 4.2 Додайте поле duration_sec — тривалість треку в секундах (округлена до одного знака).
      duration_sec: {
        $round: [{ $divide: ["$duration_ms", 1000] }, 1]
      },

      // Розподіл за популярністю
      popularity_tier: {
        $switch: {
          branches: [
            { case: { $gte: ["$popularity", 70] }, then: "high" },
            { 
              case: { 
                $and: [
                  { $gte: ["$popularity", 40] },
                  { $lt: ["$popularity", 70] }
                ] 
              }, 
              then: "medium" 
            },
            { case: { $lt: ["$popularity", 40] }, then: "low" }
          ]
        }
      }
    }
  },
  // 6. Збереження результату 
  {
    $out: "tracks"
  }
];

