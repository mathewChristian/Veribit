#!/usr/bin/env node
const homedir = require('os').homedir();
const novid = require('../index')
novid({ db: homedir + "/.novi" })