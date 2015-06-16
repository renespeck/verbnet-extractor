#!/usr/bin/env node

var VerbNet = require("../src/vn");

console.log("Guessing 'to'-ditransitive verbs...");

var vn = new VerbNet();
var matches = vn.wordsWithAttr(/np.dative.np/i);
VerbNet.log(matches, "out/ditrans_to.json");

console.log("Complete.");