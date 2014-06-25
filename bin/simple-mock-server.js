#!/usr/bin/env node

var colors = require('colors'),
    server = require('../lib/simple-mock-server'),
    argv = require('optimist').argv,
    portfinder = require('portfinder'),
    opener = require('opener');

if (argv.h || argv.help) {
  console.log([
    "usage: simple-mock-server [path] [options]",
    "",
    "options:",
    "  -s --silent        Disable logging [false]",
    "  -p                 Port to use [8080]",
    "  -h --help          Print this list and exit",
    "  --cors          Allow CORS [false].",
  ].join('\n'));
  process.exit();
}

var options = {
	port: parseInt(process.env.PORT || argv.p || '8080', 10),
	silent: !!(argv.s || argv.silent),
	cors: argv.cors
};
server.start(options);

if (process.platform !== 'win32') {
  //
  // Signal handlers don't work on Windows.
  //
  process.on('SIGINT', function () {
    process.exit();
  });
}
