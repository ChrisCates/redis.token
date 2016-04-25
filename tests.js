var redis

var token = ""

describe('Redis Token', function() {

  describe('Redis Token initialize', function () {
    it('should initiailize redis - with error', function (done) {
      redis = require("./index.js")({
        "host": "oops"
      }, function(err) {
        if (err) done()
      })
    })
    it('should initiailize redis - without error', function (done) {
      redis = require("./index.js").init()
      done()
    })
  })

  describe('Redis Token .generate()', function () {
    it('should return a token', function (done) {
      redis.generate({
        "key": "value"
      }, function(err,response) {
        if (err) throw err
        if (response) {
          token = response.token
          done()
        }
      })
    })
  })

  describe('Redis Token .get()', function () {
    it('should return an object', function (done) {
      redis.get(token, function(err, obj) {
        if (err) throw err
        if (obj) {
          done()
        }
      })
    })
  })

})
