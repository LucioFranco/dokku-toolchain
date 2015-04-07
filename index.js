#! /usr/bin/env node
var app = require('commander');
var SSH = require('simple-ssh');
var jf = require('jsonfile');
var util = require('util');
var fs = require('fs');
var pkg = require('./package.json');
var exec = require('child_process').exec;

app
  .version(pkg.version);

app
  .command('add <server> <appname>')
  .description('adds dokku remote to your git repo')
  .action(function (server, appname) {
    var url = 'dokku@' + server + ':' + appname;
    fs.exists('.git', function (exists) {
      if (exists) {
        exec('git remote add dokku ' + url, {},function (err, out, code) {
          if (err) {
            console.log(err)
            process.exit(code);
          }else {
            console.log('Sucessfully added git remote.');
            console.log('To push run git push dokku <branch>');
          }
        });
      }else {
        console.log('This directory is not a git repo');
      }
    });
  });

app
  .command('remove')
  .description('removes the dokku remote from your git repo')
  .action(function () {
    fs.exists('.git', function (exists) {
      if (exists) {
        exec('git remote remove dokku', {}, function (err, out, code) {
          if (err) {
            console.log('Remote does not exsist');
          }else {
            console.log('Sucessfully removed remote');
          }
        });
      }else {
        console.log('This is not a git repo');
      }
    })
  });

app
  .command('set <hostname> <username> <password>')
  .description('sets the hostname, user, and password for the dokku server')
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
  .description('execute commands remotely on dokku remote server')
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
  .description('removes saved server data from config file')
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
