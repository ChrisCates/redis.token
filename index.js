//Dependencies
var redis = require('redis')
var cryptojs = require('crypto-js')
var crypto = require('crypto')
var config = {}
var client

module.exports = function(config, callback) {
  //Create the client
  client = redis.createClient(config)

  //Throw errors if there are any
  client.on('error', function(err) { if (err) callback(new Error(err)) })

  return module.exports
}

module.exports.init = function(config, callback) {
  //Create the client
  client = redis.createClient(config)

  //Throw errors if there are any
  client.on('error', function(err) { if (err) return callback(new Error(err)) })

  return module.exports
}

//The generate token function
module.exports.generate = function(c,callback) {
  //If no object is supplied
  if (!c) return callback(new Error('Must supply a config!'))
  var data = []
  //Converts the object into a hashtable
  Object.keys(c).forEach(function(key) {
    data.push(key)
    data.push(config[key])
  })
  //Create a random SHA3 key
  var rKey
  if (!config.salt) {
    rKey = cryptojs.SHA3(crypto.randomBytes(100)).toString()
  } else {
    rKey = config.salt()
  }

  //Set the key as the hashtable in Redis
  client.hmset(rKey, data, function(err,res) {
    return callback(err, {
      'token': rKey
    })
  })
}

//The get token function
module.exports.get = function(key,callback) {
  //If no key is supplied return an error
  if (!key) return callback(new Error('Must supply a key!'))
  //Get the key and it's associated objects
  client.HGETALL(key, function(err,reply) {
    return callback(err,reply)
  })
}
