#! /usr/bin/env node

var app = require('commander'),
    SSH = require('simple-ssh'),
    jf = require('jsonfile'),
    util = require('util'),
    fs = require('fs'),
    pkg = require('./package.json'),
    exec = require('child_process').exec;

app
  .version(pkg.version);

// add <appname> command
// allows user to add git remote name dokku for their server
// in their config.json
app
  .command('add <appname>')
  .description('adds dokku remote to your git repo')
  .action(function (appname) {
    var server = 'localhost';
    jf.readFile('config.json', function (err, obj) {
      if (err) {
        console.log('You need to add a server');
        console.log('Please run dok set <hostname> <username> <password>');
        process.exit(1);
      }else {
        server = obj.host;
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
      }
    });
  });

// server command
// allows user to see hostname and username for dokku server
app
  .command('server')
  .description('gets hostname and username for dokku server')
  .action(function () {
    jf.readFile('config.json', function (err, file) {
      if (err) {
        console.log('You need to add a server');
        console.log('Please run dok set <hostname> <username> <password>');
        process.exit(1);
      }else {
        console.log('Server:');
        console.log('Host:' + file.host);
        console.log('User:' + file.user);
      }
    });
  });

// push <branch> command
// allows user to push to the dokku server
app
  .command('push <branch>')
  .description('push to the dokku server')
  .action(function (branch) {
    fs.exists('.git', function (exists) {
      if (exists) {
        exec('git push dokku ' + branch, {}, function (err, out, code) {
          if (err) {
            console.log('Could not push to remote');
          }else {
            console.log(out);
            console.log(code);
          }
        });
      }else {
        console.log('This is not a git repo');
      }
    });
  });

// remove command
// allows user to remove the remote that they added using
// the add command
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
    });
  });

// set <hostname> <username> <password> command
// allows user to setup their dokku server with dok
// places information into config.json
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

// run command
// allows user to run commands remotely through ssh
app
  .command('run')
  .description('execute commands remotely on dokku remote server')
  .action(function () {
    app.args.pop();
    jf.readFile('config.json', function (err, file) {
      if (err) {
        console.log('You need to add a server');
        console.log('Please run dok set <hostname> <username> <password>');
        process.exit(1);
      }else {
        console.log('accessing the server.....');
        var shell = new SSH({
          host: file.host,
          user: file.user,
          pass: file.pass
        });

        shell.exec('sudo dokku ' + app.args.join(' '), {
          pty: true,
          out: function (stdout) {
            console.log(stdout);
          },
          err: function (stderr) {
            console.log(stderr);
          }
        }).start();
      }
    });
  });

// clean command
// allows user to clean the config.json file
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

if (!app.args.length && !(app.rawArgs[2] == 'run')) app.help();

module.exports = app;
