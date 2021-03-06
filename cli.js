#!/usr/bin/env node
'use strict';
const meow = require('meow');
const arrify = require('arrify');
const fn = require('bin-version-check');

const cli = meow(`
	Usage
	  $ bin-version-check <binary> <semver-range>

	Options
	  --args  CLI args to get binary version (Can be set multiple times)  [Default: --version]

	Example
	  $ curl --version
	  curl 7.30.0 (x86_64-apple-darwin13.0)
	  $ bin-version-check curl '>=8'
	  curl 7.30.0 doesn't satisfy the version requirement of >=8

	Exits with code 0 if the semver range is satisfied and 1 if not
`);

if (cli.input.length === 0) {
	console.error('`binary` and `semver-range` required');
	process.exit(1);
}

if (cli.flags.args) {
	cli.flags.args = arrify(cli.flags.args);
}

fn(cli.input[0], cli.input[1], cli.flags);
