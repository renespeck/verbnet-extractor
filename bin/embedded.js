#!/usr/bin/env node

var VerbNet = require("../src/vn");

console.log("Guessing embedding behaviour...");

var vn = new VerbNet();

[
  "ac_to_inf",
  "sc_to_inf",
  "oc_to_inf",
  "NP V NP to be NP",
  "NP V that S",
  "NP V NP that S",
  "NP V NP S",
  "NP V S",
  '"NP V NP"',
  "NP V what S"
].forEach(function(str) {
  var matches = vn.wordsWithAttr(new RegExp(str, "i"));
  VerbNet.log(matches, "out/" + str.replace(/ /g, "_") + ".json");
});

var matches = vn.wordsWithAttr(/"(np v np\.recipient)|(np v pp.recipient)"/i);
VerbNet.log(matches, "out/embed_strong.json");

var a = vn.wordsWithAttr(/"np v np"/i), b = vn.wordsWithAttr(/"(np v np\.recipient)|(np v pp.recipient)"/i);
VerbNet.log(VerbNet.intersect(a, b), "out/embed_ditran_to.json");

var a = vn.wordsWithAttr(/np v s/i), b = vn.wordsWithAttr(/np v that s/i);
VerbNet.log(VerbNet.disjunct(a, b), "out/embed_imp.json");

//var mono = vn.wordsWithAttr(/"np v np"/i), all = vn.wordsWithAttr(/np v/i);
//VerbNet.log(VerbNet.disjunct(all, mono), "out/embed_not_mono.json");

console.log("Complete.");