
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// // 1. Select the database
// use('spotify');


// const dropResult = db.tracks.drop();
// console.log("Old 'tracks' collection dropped:", dropResult);

// // Створити нову колекцію tracks

// // Використовуйте базу spotify.
// // Перед трансформацією видаліть стару колекцію tracks, якщо вона існує.

// db.createCollection('tracks');
// console.log("New 'tracks' collection created.");


// db.getCollectionNames();

// const source_collection = 'tracks_raw';

// db.getCollection(source_collection).aggregate([
//   {
//     $project: {
//       track_id: 1,
//       track_name: 1,
//       album_name: 1,
//       explicit: 1,
//       popularity: 1,
//       duration_ms: 1,
//       track_genre: 1,
//       artists_raw: 1 // Temporarily keeping this to compare in Step 2
//     }
//   },
//   { $limit: 5 } // Limit to 2 documents for easy reading
// ]);

use('spotify');
const source_collection = 'tracks_raw';

db.getCollection(source_collection).aggregate([
  {
    $project: {
      track_name: 1,
      popularity: 1, // Keep to verify the tier logic works
      duration_ms: 1, // Keep to verify math works
      
      duration_sec: {
        $round: [{ $divide: ["$duration_ms", 1000] }, 1]
      },

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
          ],
          default: "unknown"
        }
      }
    }
  },
  { $limit: 5 } // Increased limit to hopefully catch different popularity tiers
]);

