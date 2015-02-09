// ==UserScript==
// @name            DuckDuckMenu
// @description     Extends DDG by adding a customizable list of additional search engines for making fast searches from other engines. Modified version for bigger text,bugfixing and click ease.
// @namespace       greasyfork.org/users/3926-jguer
// @homepage        https://github.com/Jguer/DuckduckGo-Mextended
// @icon            https://raw.githubusercontent.com/Jguer/DuckduckGo-Mextended/v3/resources/large.png
// @updateURL       https://github.com/Jguer/DuckduckGo-Mextended/raw/v3/src/DuckduckGo_MExtended.meta.js
// @downloadURL     https://github.com/Jguer/DuckduckGo-Mextended/raw/v3/src/DuckduckGo_MExtended.user.js
// @include         *://duckduckgo.com/?q=*
// @require         //ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @grant           GM_getValue
// @grant           GM_setValue
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

/* Disable until someone says their Chrome version 34.02.32.4213 build 3201 rev402 isn't able to use @require.
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
*/
function main(){
//Create Menu
  var searchVal = $("#search_form_input").val();
  $('<div>').addClass("ddgm").prependTo("body");
  console.log("Search term is " + searchVal);
  
  
//Load default Engines
  btncreate("Google", "http://www.google.com/search?q=",searchVal);
  btncreate("Youtube","http://www.youtube.com/results?search_query=",searchVal);
  btncreate("Wikipedia","http://en.wikipedia.org/w/index.php?title=Special%3ASearch&profile=default&search=",searchVal);
  btncreate("Github","https://github.com/search?q=",searchVal);
  btncreate("Kickass.so","https://kickass.so/usearch/",searchVal);
  btncreate("The Pirate Bay","https://thepiratebay.se/search/", searchVal+"/0/7/0");
  btncreate("Subtitle Seeker","http://subtitleseeker.ee/search/request.php?q=", searchVal);

//Load Custom Engines
/*  function LoadCEngines(){
    var i = 0;
  /* for(i=0; i<6; i++) { 
    var _cEngineName[i]= GM_getValue("cEngineName["+i+"]", "0");
    var _cEngineURL[i]= GM_getValue("cEngineURL["+i+"]", "0");

    if(_cEngineName[i].length !== 0){ 
    btncreate( _cEngineName[i],_cEngineURL[i],searchVal);
    console.log("Added Button with "+ _cEngineName[i]);
    } 
    console.log("Loaded Custom Engines");
    } 
  };
  
  function LoadCEngines(); */
  
//Create Settings Menu  
  $('<a>').addClass("addengine").addClass("ddgmbtn").text("Add new Engine").attr( "href" , "#").appendTo(".ddgm");

/*
Logic
*/

//Generic Engine Creator
  function btncreate(name,searchEngine, _searchVal){
    $('<a>').addClass("ddgmbtn").text(name).attr( "href" , searchEngine + _searchVal ).appendTo($(".ddgm"));
    console.log("Added Button with "+ name);
  };


  
//Add Custom Engine
  $(".addengine").click(function() {
    var cName = prompt("Engine Name","Display Name");
    if(name.length < 25) {
      var cSearchEngine= prompt("Engine URL (Example:http://www.google.com/search?q=)","URL");
      btncreate( cName, cSearchEngine ,searchVal);
//Save Custom engine           
        for(i=0; i<6; i++) { 
           if(GM_getValue(cEngineName[i].length === 0)){
             GM_setValue(cEngineName[i],cName);
             GM_setValue(cEngineURL[i],cSearchEngine);
             break;
           }
        }
      }
    else
      {
        alert("Your title is too long");  
      }
  });
}

// load jQuery and execute the main function

//Main function
main();
//addJQuery(main); 
console.log("Created the Menu");











