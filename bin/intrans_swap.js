#!/usr/bin/env node

var VerbNet = require("../src/vn");

console.log('Guessing intransitive swap verbs...');

/*
 Some verbs allow an alternate syntactic form where the patient is the object of the clause.
     "Jen broke the vase"
     "Jen broke" (ungrammatical)
     "The vase broke" (alternation)

  These verbs are collected so the alternate form can be transformed to the passive form, e.g.:
      "The glass broke" => "The glass was broken"

  There is a small set of words that may be ambiguously used either way. Such as:
    "Jen folded sheets"
    "Jen folded" (grammatical)
    "The sheets folded" (alternation)

 */

var vn = new VerbNet();

var altern = vn.search(function(node) {
  return node.name === "SYNTAX"
      && (node.children[0] && node.children[0].name === "NP" && node.children[0].attributes.value === "Patient")
      && (node.children[1] && node.children[1].name === "VERB")
      && node.children[2] == null;
});
altern = altern.map(VerbNet.parentVerbClassMembers);
altern = VerbNet.flatten(altern);

var monotrans = vn.search(function(node) {
  return node.name === "SYNTAX"
      && (node.children[0] && node.children[0].name === "NP")
      && (node.children[1] && node.children[1].name === "VERB")
      && (node.children[2] && node.children[0].name === "NP" && node.children[2].attributes.value === "Patient")
});
monotrans = monotrans.map(VerbNet.parentVerbClassMembers);
monotrans = VerbNet.flatten(monotrans);

var ambig = vn.search(function(node) {
  return node.name === "SYNTAX"
      && (node.children[0] && node.children[0].name === "NP" && node.children[0].attributes.value === "Agent")
      && (node.children[1] && node.children[1].name === "VERB")
      && node.children[2] == null;
});
ambig = ambig.map(VerbNet.parentVerbClassMembers);
ambig = VerbNet.flatten(ambig);

var matches = VerbNet.intersect(altern, monotrans);
VerbNet.log(VerbNet.disjunct(matches, ambig), "words/intrans_swap.json");
VerbNet.log(VerbNet.intersect(matches, ambig), "words/intrans_swap_ambig.json");


//VerbNet.log(VerbNet.disjunct(matches, amb), "words/intrans_swap.json");
//VerbNet.log(VerbNet.intersect(matches, amb), "words/intrans_swap_ambig.json");
//
//console.log(VerbNet.intersect(amb, matches));

console.log("Complete.");


//VerbNet.log(matches, "words/intrans_swap0.json");