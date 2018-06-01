"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dedent;
function dedent(strings) {
  // $FlowFixMe: Flow doesn't undestand .raw
  var raw = typeof strings === "string" ? [strings] : strings.raw;

  // first, perform interpolation
  var result = "";
  for (var i = 0; i < raw.length; i++) {
    result += raw[i]
    // join lines when there is a suppressed newline
    .replace(/\\\n[ \t]*/g, "")
    // handle escaped backticks
    .replace(/\\`/g, "`");

    if (i < (arguments.length <= 1 ? 0 : arguments.length - 1)) {
      var value_str = String(arguments.length <= i + 1 ? undefined : arguments[i + 1]);
      // Over-indent multiline interpolations so they don't 'fall' to 0
      if (value_str.includes('\n')) {
        var spaces_before_match = result.match(/(?:^|\n)([ \t]*).*$/);
        if (spaces_before_match && typeof value_str === 'string') {
          (function () {
            var spaces_before = spaces_before_match[1];
            result += value_str.split('\n').map(function (str, i) {
              return i === 0 ? str : "" + spaces_before + str;
            }).join('\n');
          })();
        } else {
          result += value_str;
        }
      } else {
        result += arguments.length <= i + 1 ? undefined : arguments[i + 1];
      }
    }
  }

  // now strip indentation
  var lines = result.split("\n");
  var mindent = null;
  lines.forEach(function (l, index) {
    if (!index) {
      return;
    }
    var m = l.match(/^(\s*)\S+/);
    if (m) {
      var indent = m[1].length;
      if (mindent == null) {
        // this is the first indented line
        mindent = indent;
      } else {
        mindent = Math.min(mindent, indent);
      }
    }
  });

  if (mindent !== null) {
    var m = mindent; // appease Flow
    result = lines.map(function (l) {
      return l[0] === " " ? l.slice(m) : l;
    }).join("\n");
  }

  return result
  // dedent eats leading and trailing whitespace too
  .trim()
  // handle escaped newlines at the end to ensure they don't get stripped too
  .replace(/\\n/g, "\n");
}
