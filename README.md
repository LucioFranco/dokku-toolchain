# dok [![Build Status](https://travis-ci.org/LucioFranco/dokku-toolchain.svg)](https://travis-ci.org/LucioFranco/dokku-toolchain)
Simple dokku toolchain inspired by Heroku toolbelt

# Usage
Before you can access the server you must put in your credentials. You must run dok set command first.
```
dok set <hostname> <username> <password>
```
Now you can run this!

```
dok run <dokku command>
```
There is a list of all the commands you can run with dokku-alt at the bottom.

To add a git remote just run
```
dok add <appname>
```
To remove the remote run
```
dok remove
```
note: you must be inside a git repository for this to work

If you would like to remove the current server from the config.json file run
```
dok clean
```

# Test

To run the tests you just run
```
npm install
npm test
```


```
Usage: dok COMMAND <app> [command-specific-options]

access:add                                      Add admin user
access:info <fingeprint>                        Show information about the key
access:list                                     List all SSH keys: admins and deployments
access:remove <fingerprint>                     Revoke all permissions for specific SSH key
backup:export [file]                            Export dokku configuration files
backup:import [file]                            Import dokku configuration files
config <app>                                    Display the config vars for an app
config:get <app> KEY                            Display a config value for an app
config:set <app> KEY1=VALUE1 [KEY2=VALUE2 ...]  Set one or more config vars
config:unset <app> KEY1 [KEY2 ...]              Unset one or more config vars
create <app>                                    Create shallow app
delete <app>                                    Delete an application
deploy:allow <app>                              Allow push-access (aka. deployment) to an app
deploy:list <app>                               List all push-acccesses for an application
disable <app>                                   Disable specific app
domains:get <app>                               Get domains for an app
domains:redirect:get <app>                      Get redirect domains for an app
domains:redirect:set <app> <domains...>         Set redirect app domains
domains:set <app> <domains...>                  Set app domains
enable <app>                                    Re-enable specific app
enter <app>                                     Enter into currently running container
exec <app> <cmd>                                Execute command in currently running container
help                                            Print the list of commands
htpasswd:add <app> <user>                       Add http-basic auth user
htpasswd:disable <app>                          Remove http-basic Auth
htpasswd:remove <app> <user>                    Remove user
list                                            List app
logs <app> [-t] [-f]                            Show the last logs for an application (-t or -f follows)
manager:disable                                 Disable dokku-alt-manager application
manager:enable                                  Enable dokku-alt-manager application
manager:install [revision]                      Install and configure dokku-alt-manager
manager:uninstall                               Uninstall and wipe dokku-alt-manager
manager:upgrade [revision]                      Disable dokku-alt-manager application
mariadb:console:admin                           Launch admin (be careful!)
mariadb:console <app> <db>                      Launch console for MariaDB container
mariadb:create <db>                             Create a MariaDB database
mariadb:delete <db>                             Delete specified MariaDB database
mariadb:dump <app> <db>                         Dump database for an app
mariadb:info <app> <db>                         Display application informations
mariadb:link <app> <db>                         Link database to app
mariadb:list <app>                              List linked databases
mariadb:restart                                 Restart MariaDB container (for example to switch image)
mariadb:unlink <app> <db>                       Unlink database from app
mongodb:console <app> <db>                      Launch console for MongoDB container
mongodb:create <db>                             Create a MongoDB database
mongodb:delete <db>                             Delete specified MongoDB database
mongodb:dump <app> <db> <collection>            Dump database collection in bson for an app
mongodb:export <app> <db> <collection>          Export database collection for an app
mongodb:import <app> <db> <collection>          Import database collection for an app
mongodb:info <app> <db>                         Display application informations
mongodb:link <app> <db>                         Link database to app
mongodb:list <app>                              List linked databases
mongodb:restart                                 Restart MongoDB container (for example to switch image)
mongodb:unlink <app> <db>                       Unlink database from app
nginx:import-ssl <app>                          Imports a tarball from stdin; should contain server.crt and server.key
plugins-install                                 Install active plugins
plugins                                         Print active plugins
plugins-update                                  Update active plugins
postgresql:console:admin                        Launch admin console (be careful!)
postgresql:console <app> <db>                   Launch console for PostgreSQL container
postgresql:create <db>                          Create a PostgreSQL database
postgresql:delete <db>                          Delete specified PostgreSQL database
postgresql:dump <app> <db>                      Dump database for an app
postgresql:info <app> <db>                      Display application informations
postgresql:link <app> <db>                      Link database to app
postgresql:list <app>                           List linked databases
postgresql:restart                              Restart PostgreSQL container (for example to switch image)
postgresql:unlink <app> <db>                    Unlink database from app
preboot:cooldown:time <app> <secs>              Re-enable specific app
preboot:disable <app>                           Stop specific app
preboot:enable <app>                            Enable specific app
preboot:status <app>                            Status of specific app
preboot:wait:time <app> <secs>                  Restart specific app (not-redeploy)
rebuild:all:force                               Remove all caches and rebuild all apps
rebuild:all                                     Rebuild all apps
rebuild <app> [ref]                             Rebuild an app (using optional ref)
rebuild:force <app> [ref]                       Remove all caches and rebuild an app (using optional ref)
redis:create <app>                              Create a Redis database
redis:delete <app>                              Delete specified Redis database
redis:info <app>                                Display application information
restart <app>                                   Restart specific app (not-redeploy)
run <app> <cmd>                                 Run a command in the environment of an application
ssl:certificate <app>                           Pipe signed certifcate with all intermediates for an APP
ssl:forget <app>                                Wipes certificate for an APP
ssl:generate <app>                              Generate certificate signing request for an APP
ssl:info <app>                                  Show info about certifcate and certificate request
ssl:key <app>                                   Pipe private key for an APP
ssl:selfsigned <app>                            Generate self-signed certificate an APP
start <app>                                     Stop specific app
status <app>                                    Status of specific app
stop <app>                                      Stop specific app
tag:add <app> <tag>                             Tag latest running image using specified name
tag:list <app>                                  List all image tags
tag:rm <app> <tag>                              Tag latest running image using specified name
top <app> [args...]                             Show running processes
url <app>                                       Show the URL for an application
version                                         Print dokku's version
volume:create <name> <paths...>                 Create a data volume for specified paths
volume:delete <name>                            Delete a data volume
volume:info <name>                              Display volume information
volume:link <app> <name>                        Link volume to app
volume:list:apps <name>                         Display apps linked to volume
volume:list                                     List volumes
volume:unlink <app> <name>                      Unlink volume from app
```
