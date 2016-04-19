var assert = require('chai').assert;
var redis = require("./index.js")()

var token = ""

describe('Redis Token', function() {

  describe('Redis Token .generate()', function () {
    it('should return a token', function (done) {
      redis.generate({
        "key": "value"
      }, function(response) {
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
      redis.get(token, function(obj) {
        if (obj) {
          done()
        } else {
          throw "Did not supply an object..."
        }
      })
    })
  })

})
