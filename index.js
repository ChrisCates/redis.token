//Dependencies
var redis = require("redis")
var crypto = require("crypto-js")
var config = {}
var secret = "redis.token"
var client

module.exports = function(config, callback) {

  //Supply configuration object
  if (!config) {
    config = {}
  }

  //Create the client
  client = redis.createClient(config)

  //Throw errors if there are any
  client.on("error", function(err) {
    if (err) return callback(err)
  })

  return module.exports
}

//The generate token function
module.exports.generate = function(config,callback) {
  //If no object is supplied
  if (!config) return callback("Must supply a parameter")
  var data = []
  //Converts the object into a hashtable
  Object.keys(config).map(function(key) {
    data.push(key)
    data.push(config[key])
  })
  //Create a random SHA3 key
  var rKey = crypto.SHA3(secret + Math.random()).toString()
  //Set the key as the hashtable in Redis
  client.hmset(rKey,data, function(err,res) {
    return callback(err,{
      "token": rKey
    })
  })
}

//The get token function
module.exports.get = function(key,callback) {
  //If no key is supplied return an error
  if (!key) return callback("Must supply a key")
  //Get the key and it's associated objects
  client.HGETALL(key, function(err,reply) {
    return callback(err,reply)
  })
}
