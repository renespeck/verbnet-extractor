"use strict";

var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");
var xmlParse = require("xml-parser");

module.exports = VerbNet;

VerbNet.DEFAULT_VERBNET_DIR = path.resolve(__dirname, "..", "verbnet-3.2");

function VerbNet(verbnetDir) {
  if (verbnetDir == null) {
    verbnetDir = VerbNet.DEFAULT_VERBNET_DIR;
  }
  this.verbnetDir = verbnetDir;
  this.classFiles = this.listClassFiles();
  var vnData = this.vnData = {};
  this.classFiles.forEach(function(fn) {
    try {
      var xml = fs.readFileSync(fn, "utf8").replace('<!DOCTYPE VNCLASS SYSTEM "vn_class-3.dtd">', "");
      var obj = xmlParse(xml);
    } catch (error) {
      throw new Error(`Couldn't open and parse verb class XML file "${fn}": ${error}`)
    }
    vnData[path.basename(fn, ".xml")] = obj;
  });
}

VerbNet.prototype.search = function(nodeMatch) {
  var crumbs = [];
  var matches = [];
  var className;
  function recurse(parent) {
    if (nodeMatch(parent, crumbs)) {
      matches.push({
        node: parent,
        parents: crumbs.concat([]),
        className: className
      })
    }
    crumbs.push(parent);
    parent.children.forEach(function (child) {
      recurse(child);
    });
    crumbs.pop();
  }

  for (className in this.vnData) {
    recurse(this.vnData[className].root);
  }

  return matches;
};

VerbNet.prototype.map = function(nodeMatch) {
  var crumbs = [];
  var matches = [];
  function recurse(parent) {
    var val;
    if (val = nodeMatch(parent, crumbs)) {
      matches.push(val);
    }
    crumbs.push(parent);
    parent.children.forEach(function (child) {
      recurse(child);
    });
    crumbs.pop();
  }

  for (var className in this.vnData) {
    recurse(this.vnData[className].root);
  }

  return matches;
};

VerbNet.prototype.listClassFiles = function() {
  var self = this;
  try {
    return fs.readdirSync(this.verbnetDir).filter(function (fn) {
      return fn.endsWith("xml");
    }).map(function(fn) {
      return path.join(self.verbnetDir, fn);
    });
  } catch (error) {
    throw new Error(`Couldn't list files in VerbNet directory "${this.verbnetDir}": ${error}`);
  }
};

VerbNet.prototype.wordsWithAttr = function (re) {
  var matches = this.search(function(node) {
    return JSON.stringify(node.attributes).search(re) != -1;
  });
  matches = matches.map(VerbNet.parentVerbClassMembers);
  return VerbNet.flatten(matches);
};

VerbNet.childrenWithAttribute = function (parent, attr, val) {
  return parent.children.filter(function(child) {
    return child.attributes[attr] == val;
  });
};

VerbNet.childrenWithTag = function (parent, tag) {
  return parent.children.filter(function(child) {
    return child.name == tag;
  });
};

VerbNet.descendantsWithTag = function (parent, tag) {
  var descs = VerbNet.childrenWithTag(parent, tag);
  parent.children.forEach(function(child) {
    descs = descs.concat(VerbNet.descendantsWithTag(child, tag));
  });
  return descs;
};

VerbNet.parentWithTag = function (parents, tag) {
  var rev = parents.reverse();
  for (var i in rev) {
    if (rev[i].name == tag) {
      return rev[i];
    }
  }
  return null;
};

VerbNet.flatten = function (array, depth) {
  if (depth || depth == null) {
    var res = [];
    for (var i in array) {
      if (Array.isArray(array[i])) {
        res = res.concat(VerbNet.flatten(array[i]));
      } else {
        res.push(array[i]);
      }
    }
    return res;
  } else {
    return array;
  }
};

VerbNet.parentVerbClassMembers = function (entry) {
  var node = entry.node;
  var parents = entry.parents;
  var vnClass = VerbNet.parentWithTag(parents, "VNSUBCLASS") || VerbNet.parentWithTag(parents, "VNCLASS");
  if (vnClass == null) return [];
  return VerbNet.descendantsWithTag(vnClass, "MEMBERS").map(function(members) {
    return members.children.map(function(child) {
      return { word: child.attributes.name, className: vnClass.attributes.ID };
    });
  });
};

/**
 * Reduce output of `parentVerbClassMembers` to array of words only (no `className`).
 * @param members
 */
VerbNet.wordsList = function (members) {
  return unique(members.map(function(m) {
    return m.word;
  })).sort();
};

VerbNet.disjunct = function (inA, notInB) {
  return inA.filter(function(en0) {
    return !notInB.some(function(en1) { return en1.word === en0.word; });
  });
};

VerbNet.intersect = function (a, b) {
  return a.filter(function(en0) {
    return b.some(function(en1) { return en1.word === en0.word; });
  });
};

VerbNet.log = function (obj, fn) {
  console.log(JSON.stringify(unique(obj.map(function(el) { return el.className; })), null, 2));
  if (fn) {
    mkdirp.sync(path.dirname(fn));
    fs.writeFileSync(fn, JSON.stringify(VerbNet.wordsList(obj), null, 2), "utf8");
  }
};

function unique(array) {
  return array.filter(function(el,i,a){if(i==a.indexOf(el))return 1;return 0})
}
