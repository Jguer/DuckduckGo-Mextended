// ==UserScript==
// @name            DuckDuckMenu
// @description     Extends DDG by adding a customizable list of additional search engines for making fast searches from other engines. Modified version for bigger text,bugfixing and click ease.
// @namespace       greasyfork.org/users/3926-jguer
// @homepage        https://github.com/Jguer/DuckduckGo-Mextended
// @icon            https://raw.githubusercontent.com/Jguer/DuckduckGo-Mextended/v3/resources/large.png
// @updateURL       https://github.com/Jguer/DuckduckGo-Mextended/raw/v3/src/DuckduckGo_MExtended.meta.js
// @downloadURL     https://github.com/Jguer/DuckduckGo-Mextended/raw/v3/src/DuckduckGo_MExtended.user.js
// @include         *://duckduckgo.com/?q=*
// @grant           GM_addStyle
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// @version         3.0.0 Alpha
// @author          Jguer
// ==/UserScript==

//Styles
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//Menu Style
addGlobalStyle(".ddgm { background-color:  #24272A; height: 40px; }");

//Button Style
addGlobalStyle(".ddgmbtn { background-color: #24272A; height: 25px; width: auto; text-align: center; display: inline-block; vertical-align: middle;padding-top: 6px;padding-bottom: 8px; font-family: inherit; font-size: 1.2em; font-weight: 600; color: white; border-width: 3px; border-color:  #24272A; padding-left: 4px; padding-right: 4px; border-style: solid;}"); 
addGlobalStyle(".ddgmbtn:hover { background-color:  #5A6269; color: white; text-decoration:none;}");
addGlobalStyle(".ddgmbtn:visited {color: white;}");

//Engine Add Style
addGlobalStyle(".addengine { float: right; padding-bottom: 0px;}"); 
addGlobalStyle(".addengine:hover { background-color:  #5A6269; color: white; text-decoration:none;}");
addGlobalStyle(".addengine:visited {color: white;}");


// Add jQuery
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
} 

function main(){
//Create Menu
  var searchVal = $("#search_form_input").val();
  $('<div>').addClass("ddgm").prependTo("body");
  console.log("Search term is " + searchVal);
  
  
//Create default Buttons
  btncreate("Google", "http://www.google.com/search?q=",searchVal);
  btncreate("Youtube","http://www.youtube.com/results?search_query=",searchVal);
  btncreate("Wikipedia","http://en.wikipedia.org/w/index.php?title=Special%3ASearch&profile=default&search=",searchVal);
  btncreate("Github","https://github.com/search?q=",searchVal);
  
//Create Settings Menu  
  $('<a>').addClass("addengine").addClass("ddgmbtn").text("Add new Engine").attr( "href" , "#").appendTo(".ddgm");

//Generic Button Creator
  function btncreate(name,searchEngine, _searchVal){
    $('<a>').addClass("ddgmbtn").text(name).attr( "href" , searchEngine + _searchVal ).appendTo($(".ddgm"));
    console.log("Added Button with "+ name);
  };

//Add Custom Engine
}





// load jQuery and execute the main function
addJQuery(main); 
console.log("added menu");











