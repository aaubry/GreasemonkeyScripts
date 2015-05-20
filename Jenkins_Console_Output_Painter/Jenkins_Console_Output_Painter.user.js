// ==UserScript==
// @name        Jenkins Console Output Painter
// @namespace   http://www.aaubry.net/
// @include     http://*/job/*/consoleFull
// @include     http://*/job/*/console
// @include     https://*/job/*/consoleFull
// @include     https://*/job/*/console
// @version     1
// @grant none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
var output = $("#main-panel pre");

if(output.length != 0) {
  var formatted = $("<pre></pre>");
  output.before(formatted);

  var processMoreLines = function() {
    var lines = output.html();
    if(lines.length == 0) return;
    //lines = lines.split("\n");
    output.text("");

    lines = lines.replace(/(\n[^\n]{79})\n/g, function(m, text) { return text; });

    lines = lines.replace(/\n( +)(\d+) (Warning|Error)([^\n]*)/g, function(m, sp, cnt, type, text) {
      var color = "green";
      if(cnt != "0") {
        color = type == "Warning" ? "orange" : "red";
      }

      return "\n<span style='color:" + color + "'>" + sp + cnt + " " + type + text + "</span>";
    });

    lines = lines.replace(/\n(  [^\n]*)/g, "\n<span style='color:gray'>$1</span>");

    lines = lines.replace(/\n(Passed|Failed)([^\n]*)/g, function(m, res, name) {
      return "\n<span style='color: " + (res == "Passed" ? "green" : "red") + "'>" + res + name + "</span>";
    });

    formatted.html(lines);

    setTimeout(processMoreLines, 100);
  };

  processMoreLines();
} else {
  console.log("no output panel found");
}
