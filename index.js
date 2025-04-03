const { MongoClient } = require("mongodb");

async function initiateConfigServer() {
  const configClient = new MongoClient(
    "mongodb://localhost:27018/?directConnection=true",
  );

  try {
    const result = await configClient.db("admin").command({
      replSetInitiate: {
        _id: "config0",
        configsvr: true,
        members: [{ _id: 0, host: "mongodb-config0:27017" }],
      },
    });

    console.log(result);
  } catch (err) {
    console.error(err);
  } finally {
    await configClient.close();
  }
}

async function initiateShard(client, id, members) {
  try {
    const result = await client.db("admin").command({
      replSetInitiate: { _id: id, members },
    });

    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

async function initializeRouter(routerClient) {
  const promise1 = routerClient.db("admin").command({
    addShard: "shard0/mongodb-shard0:27017",
  });

  const promise2 = routerClient.db("admin").command({
    addShard: "shard1/mongodb-shard1:27017",
  });

  try {
    const [result1, result2] = await Promise.all([promise1, promise2]);
    console.log(result1, "\n", result2);
  } catch (err) {
    console.error(err);
  }
}

const routerClient = new MongoClient("mongodb://localhost:27017");

const shard0Client = new MongoClient(
  "mongodb://localhost:27019/?directConnection=true",
);

const shard1Client = new MongoClient(
  "mongodb://localhost:27020/?directConnection=true",
);

async function main() {
  try {
    await Promise.all([
      initiateConfigServer(),
      initiateShard(shard0Client, "shard0", [
        { _id: 0, host: "mongodb-shard0:27017" },
      ]),
      initiateShard(shard1Client, "shard1", [
        { _id: 0, host: "mongodb-shard1:27017" },
      ]),
    ]);

    await initializeRouter(routerClient);
  } finally {
    await Promise.all([
      routerClient.close(),
      shard0Client.close(),
      shard1Client.close(),
    ]);
  }
}

main();
