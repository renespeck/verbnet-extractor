#!/usr/bin/env node

var VerbNet = require("../src/vn");

console.log("Guessing 'for'-ditransitive verbs...");

var vn = new VerbNet();
var matches = vn.wordsWithAttr(/np.beneficiary.np/i);
VerbNet.log(matches, "out/ditrans_for.json");

console.log("Complete.");