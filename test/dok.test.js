var assert = require('should');
var app = require('../')
var _ = require('lodash')

function getCommand(cmd) {
  return _.find(app.commands, function (element, index, array) {
    if(element._name == cmd) {
      return true;
    }
  })
};

describe('Dokku-toolchain tests', function () {
  it('Should have 4 commands', function () {
    app.commands.should.have.length(7);
  });

  it('Add command should have 1 argument', function () {
    var cmd = getCommand('add');
    cmd._args.should.have.length(1);
  });

  it('Set command should have 3 arguments', function () {
    var cmd = getCommand('set');
    cmd._args.should.have.length(3);
  });

  it('Push command should have 1 argument', function () {
    var cmd = getCommand('push');
    cmd._args.should.have.length(1);
  });
});
