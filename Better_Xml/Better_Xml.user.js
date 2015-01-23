// ==UserScript==
// @name        Better Xml
// @namespace   http://www.aaubry.net
// @include     *
// @version     1
// @grant       none
// ==/UserScript==

function describe(o) {
  if(o == null) {
    alert("<null>");
    return;
  }

  var info = "";
  for(var k in o) {
    var val;
    try {
      val = o[k];
    } catch(e) {
      val = e;
    }
  
    info += k + ": " + val + "\n";
  }
  alert(info);
}

function prettifyNode(node) {
  if(node.nodeType != 1) return;

  var cssClass = node.getAttribute("class");
  switch(cssClass) {
    case "attribute-value":
      var match = /(http[^"']*)/.exec(node.firstChild.nodeValue);
      if(match != null) {
      
        var text = node.firstChild;
        var link = document.createElementNS(node.namespaceURI, "a");
        link.setAttribute("href", match[1]);
        //link.setAttribute("target", "_blank");
        link.appendChild(node.firstChild);
        node.appendChild(link);
      }
      break;
  }

  var child = node.firstChild;
  while(child != null) {
    prettifyNode(child);
  
    child = child.nextSibling;
  }
}

function prettify() {
  var node = document.styleSheets[0].ownerNode.parentNode;
  prettifyNode(node);
}

try {
  var contentType = document.contentType;
  if(contentType == "text/xml") {
    prettify();
  }
}
catch(e) {
  alert(e);
}