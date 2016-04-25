var redis = require("./index.js")()

var token = ""

describe('Redis Token', function() {

  describe('Redis Token initialize', function () {
    it('should initiailize redis', function (done) {
      redis = require("./index.js")()
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
        } else {
          throw "Did not supply a token..."
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
        } else {
          throw "Did not supply an object..."
        }
      })
    })
  })

})
