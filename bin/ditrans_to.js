#!/usr/bin/env node

var VerbNet = require("../src/vn");

console.log("Guessing 'to'-ditransitive verb use...");

var vn = new VerbNet();
var matches = vn.wordsWithAttr(/np.dative.np/i);
VerbNet.log(matches, "out/ditrans_to.json");

console.log("Complete.");