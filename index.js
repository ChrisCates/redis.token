//Dependencies
var redis = require("redis")
var crypto = require("crypto-js")
var config = {}
var secret = "redis.token"
var client

module.exports = function(config) {

  //Supply configuration object
  if (!config) {
    config = {}
  }

  //Create the client
  client = redis.createClient(config)

  //Throw errors if there are any
  client.on("error", function(err) {
    if (err) throw err
  })

  return module.exports
}

module.exports.generate = function(config,callback) {
  if (!config) throw "Must supply a parameter"
  var data = []
  Object.keys(config).map(function(key) {
    data.push(key)
    data.push(config[key])
  })
  var rKey = crypto.SHA3(secret + Math.random()).toString()
  client.hmset(rKey,data, function(err,res) {
    if (err) throw err
    return callback({
      "token": rKey
    })
  })
}

module.exports.get = function(key,callback) {
  if (!key) throw "Must supply a key"
  client.HGETALL(key, function(err,reply) {
    return callback(reply)
  })
}
