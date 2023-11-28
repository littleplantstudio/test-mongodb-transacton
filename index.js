const mongodb = require("mongodb");

const url = "mongodb://rootuser:rootpass@127.0.0.1:27017";
const client = new mongodb.MongoClient(url, {});

async function main() {
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db("test_db");
  const collection = db.collection("documents");
  const session = client.startSession();

  try {
    await session.withTransaction(
      async () => {
        const data = await collection.findOneAndUpdate(
          { index: 1 },
          { $set: { index: 1 } },
          { upsert: true, session }
        );
        console.log("data", data);
        // throw new Error("Transaction aborted");
      },
      {
        retryWrites: true,
      }
    );
    await session.commitTransaction();
  } catch (error) {
    console.log("error", error);
  } finally {
    await session.endSession();
    console.log("finally", "close db connection");
    await client.close();
  }
  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => {});
