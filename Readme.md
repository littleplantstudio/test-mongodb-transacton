# MongoDB Setup for test transaction

## setup replica via docker compose

```
docker-compose up -d

```

## setup replica

1. connect to db with mongo command

```
mongo "mongodb://rootuser:rootpass@localhost:27017/?authSource=admin"
```

2. config replica set

```
rs.initiate();

var newConfig = {
  _id: "rs0",
  members: [{ _id: 0, host: "127.0.0.1:27017" }],
};

rs.reconfig(newConfig, { force: true });
```

3. check status

```
rs.status();
```

## test connect and use transaction session

```
npm i

node index.js
```
