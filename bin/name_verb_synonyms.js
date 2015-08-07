#!/usr/bin/env node

var VerbNet = require("../src/vn");

console.log("Finding synonyms for verb 'name'...");

var vn = new VerbNet();

var matches = vn.search(function(node, crumbs) {
  return crumbs.length && crumbs[0].attributes.ID == "dub-29.3" && node.name == "MEMBER";
});


matches = matches.map(VerbNet.parentVerbClassMembers);
matches = VerbNet.flatten(matches);

console.log(matches);

VerbNet.log(matches, "words/name_verb_synonyms.json");
console.log("Complete.");