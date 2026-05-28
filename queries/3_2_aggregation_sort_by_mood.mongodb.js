// Завдання 2. Розподіл треків за настроєм

// Кожному треку присвойте настрій на основі двох полів: valence (позитивність) та energy:

// високий valence + висока energy → happy
// низький valence + висока energy → angry
// високий valence + низька energy → calm
// низький valence + низька energy → sad Порахуйте, скільки треків потрапило до кожної категорії, та виведіть таблицю з настроєм і кількістю треків.

use('spotify');

const moodDistribution = db.tracks.aggregate([
  // Визначаємо настрій для кожного треку на основі valence та energy
  {
    $project: {
      mood: {
        $switch: {
          branches: [
            // високий valence (>= 0.5) + висока energy (>= 0.5) → happy
            {
              case: { $and: [ { $gte: ["$audio_features.valence", 0.5] }, { $gte: ["$audio_features.energy", 0.5] } ] },
              then: "happy"
            },
            // низький valence (< 0.5) + висока energy (>= 0.5) → angry
            {
              case: { $and: [ { $lt: ["$audio_features.valence", 0.5] }, { $gte: ["$audio_features.energy", 0.5] } ] },
              then: "angry"
            },
            // високий valence (>= 0.5) + низька energy (< 0.5) → calm
            {
              case: { $and: [ { $gte: ["$audio_features.valence", 0.5] }, { $lt: ["$audio_features.energy", 0.5] } ] },
              then: "calm"
            },
            // низький valence (< 0.5) + низька energy (< 0.5) → sad
            {
              case: { $and: [ { $lt: ["$audio_features.valence", 0.5] }, { $lt: ["$audio_features.energy", 0.5] } ] },
              then: "sad"
            }
          ],
          default: "unknown" // На випадок, якщо десь відсутні поля
        }
      }
    }
  },

  // 2. Групуємо за настроєм та рахуємо кількість треків
  {
    $group: {
      _id: "$mood",
      count: { $sum: 1 }
    }
  },

  // 3. Сортуємо за кількістю треків - порядок зменшення
  {
    $sort: {
      count: -1
    }
  },

  // вивід
  {
    $project: {
      _id: 0,
      mood: "$_id",
      count: 1
    }
  }
]).toArray();

// Вивід  в Playground
moodDistribution;