#!/usr/bin/env node

var VerbNet = require("../src/vn");

console.log("Guessing 'to be'-ditransitive verbs...");

var vn = new VerbNet();
//var matches = vn.wordsWithAttr(/np v np(-|\.\w+)? np(-|\.\w+)?/i);
var matches = vn.wordsWithAttr(/np v np np"/i);
VerbNet.log(matches, "words/ditrans_be.json");

console.log("Complete.");