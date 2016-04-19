# redis.token
## A token based storage system in Redis that uses hashtables.
### By Chris Cates :star:

### Installation
```
npm install redis.token --save
```

### Usage

This NPM module automatically converts key value objects into hash tables.
The `Redis.GET` command automatically returns an object in the `redis` npm module.

Two dependencies for this project is (NPM):

```
crypto-js
redis
```

### Demo

```
var redis = require("redis.token")

redis.generate(
  {
    "key": "value",
    "key2": "value"
  },
  function(key) {
    console.log(key)
    //Returns randomly generated SHA3 token
    redis.get(key.token, function(reply) {
      console.log(reply)
      /*
      Returns
      {
        "key": "value",
        "key2": "value"
      }
      */
    })
  }
)
```

### API

#### redis.token.generate(obj,callback)

Generates a hashtable with the key values in `obj`, callback returns a token.

#### redis.token.get(token,callback)

With the token generated in `.generate()` you can retrieve the object stored.
