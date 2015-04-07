#! /usr/bin/env node
var app = require('commander');
var SSH = require('simple-ssh');
var jf = require('jsonfile');
var util = require('util');
var pkg = require('./package.json')

app
  .version(pkg.version);

app
  .command('help')
  .action(function () {
    console.log('Welcome to dok the dokku toolbelt');
    console.log(' Commands:');
    console.log('   run <cmd> - runs any dokku command through ssh');
    console.log('   set <hostname> <username> <password> - sets the hostname, user, and password for the dokku server');
    console.log('   clean - removes saved server data from config file');
    console.log('Thank you for using dok!');
  });

app
  .command('set <hostname> <username> <password>')
  .action(function (hostname, username, password) {
    var server = {
      host: hostname,
      user: username,
      pass: password
    };

    jf.writeFile('config.json', server, function (err) {
      if(err) {
        console.log(err);
      }else {
        console.log('Sucessfully saved config file');
      }
    });
  });

app
  .command('run')
  .description('execute commands remotely')
  .action(function () {
    app.args.pop();
    var file = {};
    jf.readFile('config.json', function (err, obj) {
      if (err) {
        console.log('You need to add a server');
        process.exit(1);
      }else {
        console.log('accessing the server.....')
        file = obj;
        var shell = new SSH({
          host: file.host,
          user: file.user,
          pass: file.pass
        });

        shell.exec('sudo dokku ' + app.args.join(' '), {
          pty: true,
          out: function(stdout) {
            console.log(stdout);
          },
          err: function (stderr) {
            console.log(stderr);
          }
        }).start();
      }
    });
  });

app
  .command('clean')
  .action(function () {
    jf.writeFile('config.json', {  }, function (err) {
      if (err) {
        console.log(err);
      }else {
        console.log('Sucessfully cleared your server information');
      }
    });
  });

app.parse(process.argv);

module.exports = app;
