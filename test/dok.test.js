var assert = require('should');
var app = require('../')

describe('Dok tests', function () {
  it('Should have 4 commands', function () {
    app.commands.should.have.length(4);
  });
});
