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
// @version         3.0.0 Build 248
// @author          Jguer
// ==/UserScript==
//Styles
function addGlobalStyle(css) {
  var head,
  style;
  head = document.getElementsByTagName('head') [0];
  if (!head) {
    return;
  }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}
//Main Menu Style
addGlobalStyle('.ddgm { background-color:  #24272A; height: 40px; display: block; }');
//Button Style
addGlobalStyle('.ddgmbtn { background-color: #24272A; height: 25px; width: auto; text-align: center; display: inline-block; vertical-align: middle;padding-top: 6px;padding-bottom: 6px; font-family: inherit; font-size: 1.2em; font-weight: 600; color: white; border-width: 3px; border-bottom-width: 0px; border-color:  #24272A; padding-left: 4px; padding-right: 4px; border-style: solid;}');
addGlobalStyle('.ddgmbtn:hover { background-color:  #5A6269; color: white; text-decoration:none;}');
addGlobalStyle('.ddgmbtn:visited {color: white;}');
//Custom Engine Style
addGlobalStyle('.cddgmbtn { background-color: #24272A;}');
//Engine Add Style
addGlobalStyle('.addengine { float: right;}');
addGlobalStyle('.addengine:hover { background-color:  #5A6269; color: white; text-decoration:none;}');
addGlobalStyle('.addengine:visited {color: white;}');
//Edit Menu Style
addGlobalStyle('.enginedit { float: right;}');
addGlobalStyle('.enginedit:hover { background-color:  #5A6269; color: white; text-decoration:none;}');
addGlobalStyle('.enginedit:visited {color: white;}');
addGlobalStyle('.removex { color: red;font-family: inherit; font-weight: bold; position:relative; top:-5px;}');
addGlobalStyle('.removex:visited {color: red;}')
addGlobalStyle('.removex:hover { color: white; text-decoration:none;}');
addGlobalStyle('.ddgem { background-color: #24272A; height: 20px; }');
addGlobalStyle('.ddgembtn { float: right; background-color: #24272A; height: 14px; width: auto; text-align: center; display: inline-block; vertical-align: middle;padding-top: 3px;padding-bottom: 3px; font-family: inherit; font-size: 0.8em; font-weight: 600; color: white; border-width: 3px; border-bottom-width: 0px;border-top-width: 0px; border-color:  #24272A; padding-left: 4px; padding-right: 4px; border-style: solid;position:relative; top:-2px;}');
addGlobalStyle('.ddgembtn:hover { background-color:  #5A6269; color: white; text-decoration:none;}');
addGlobalStyle('.ddgembtn:visited {color: white;}');

;
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
function main() {
  //Create Menu
  var searchVal = $('#search_form_input').val();
  $('<div>').addClass('ddgm').prependTo('body');
  console.log('##Search term is ' + searchVal);
  console.log('#Created the Menu');
  
  
  //Load default Engines
  
  function LoadDefault() {
    var gname = GM_getValue('ddgmDisEngines', 'empty'); 
    var dname;
    var durl;
    for(var i= 0; i <7; i++) {
      switch(i){
        case 0:
          dname = 'Google';
          durl = 'http://www.google.com/search?q=';
          break;
        case 1:
          dname = 'Youtube';
          durl = 'http://www.youtube.com/results?search_query=';
          break;
        case 2:
          dname = 'Wikipedia';
          durl = 'http://en.wikipedia.org/w/index.php?title=Special%3ASearch&profile=default&search=';
          break;
        case 3:
          dname = 'Github';
          durl = 'https://github.com/search?q=';
          break;      
        case 4:
          dname = 'Kickass';
          durl = 'https://kickass.to/usearch/';
          break;      
        case 5:
          dname = 'The Pirate Bay';
          durl = 'https://thepiratebay.se/search/';
          break;      
        case 6:
          dname = 'Subtitle Seeker';
          durl = 'http://subtitleseeker.ee/search/request.php?q=';
          break;  
        default: 
         alert("Error");
      }
    if(gname.indexOf(dname) < 0)
      {
        btncreate(dname,durl,searchVal);
      } 
    }
   console.log('#Loaded Default Engines');
  }
  /*
  btncreate('Google', 'http://www.google.com/search?q=', searchVal);
  btncreate('Youtube', 'http://www.youtube.com/results?search_query=', searchVal);
  btncreate('Wikipedia', 'http://en.wikipedia.org/w/index.php?title=Special%3ASearch&profile=default&search=', searchVal);
  btncreate('Github', 'https://github.com/search?q=', searchVal);
  btncreate('Kickass', 'https://kickass.to/usearch/', searchVal);
  btncreate('The Pirate Bay', 'https://thepiratebay.se/search/', searchVal + '/0/7/0');
  btncreate('Subtitle Seeker', 'http://subtitleseeker.ee/search/request.php?q=', searchVal);
*/
  
 LoadDefault()
  //Load Custom Engines
  function LoadCustom() {
    var _CEngineName = [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ];
    var _CEngineURL = [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ];
    var arrayLength;
    for (var i = 0; i < 9; i++) {
      _CEngineName[i] = GM_getValue('CEngineName' + i, 'empty');
      _CEngineURL[i] = GM_getValue('CEngineUrl' + i, 'empty');
      if (_CEngineName[i] != 'empty') {
        cbtncreate(_CEngineName[i], _CEngineURL[i], searchVal);
      }
    }
  }
  LoadCustom();
  //Create Settings Menu  
  $('<a>').addClass('addengine').addClass('ddgmbtn').text('Add new Engine').attr('href', '#').appendTo('.ddgm');
  $('<a>').addClass('enginedit').addClass('ddgmbtn').text('Edit Menu').attr('href', '#').appendTo('.ddgm');
  /*
Logic
*/
  //Default Engine Creator
  function btncreate(name, searchEngine, _searchVal) {
    if (name != undefined & searchEngine != undefined) {
      $('<a>').addClass('ddgmbtn').addClass('engine').text(name).attr('href', searchEngine + _searchVal).appendTo('.ddgm');
      console.log('##Added Button with ' + name);
    }
  };
  //Custom Engine Creator
  function cbtncreate(name, searchEngine, _searchVal) {
    if (name != undefined & searchEngine != undefined) {
      $('<a>').addClass('ddgmbtn').addClass('engine').addClass('cddgmbtn').hide().text(name).attr('href', searchEngine + _searchVal).prependTo('.ddgm').fadeIn(600);
      console.log('##Added Button first with ' + name);
    }
  };
  //Add Custom Engine
  $('.addengine').click(function () {
    var cName = prompt('Engine Name', 'Display Name');
    if (name.length < 25) {
      var cSearchEngine = prompt('Engine URL (Example:http://www.google.com/search?q=)', 'URL');
      cbtncreate(cName, cSearchEngine, searchVal);
      //Save Custom engine           
      var cEnginesave = [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ];
      for (var i = 0; i < 9; i++) {
        cEnginesave[i] = GM_getValue('CEngineName' + i, 'empty');
        if (cEnginesave[i] == 'empty') {
          GM_setValue('CEngineName' + i, cName);
          GM_setValue('CEngineUrl' + i, cSearchEngine);
          break;
        }
      }
    } 
    else
    {
      alert('Your title is too long');
    }
  });
  //Edit Engines
  $('.enginedit').click(function () {
    if ($('#restoredengines').length) {
      //if removex exists remove edit menu
      $('.removex').fadeOut(300, function() {
        $(this).remove();
      });
      $('.ddgem').slideUp(600, function() {
        $(this).remove();
      });
    } 
    else {
      //if removex doesn't exist add menu
      $('<a>').text(' x').addClass('removex').hide().attr('href', '#').appendTo('.engine').fadeIn(300);
      $('<div>').addClass('ddgem').slideDown(600).insertAfter('.ddgm');
      $('<a>').addClass('ddgembtn').attr("id","restoredengines").text('Restore default Engines').attr('href', '#').appendTo('.ddgem');

    }
  });
  
  
  //Restore Default Engines
  $(document).on('click', '#restoredengines', function () {
    GM_setValue('ddgmDisEngines', 'empty'); 
    location.reload();
  });
  
  //Remove Engine
  $(document).on('click', '.removex', function () {
    var comparedel = $(this).parent('.engine').clone().children().remove().end().text();
    $(this).closest('.engine').remove();
    console.log('#Removed Engine ' + comparedel);
    var cEnginedel = [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ];
    for (var i = 0; i < 9; i++) {
      cEnginedel[i] = GM_getValue('CEngineName' + i, 'empty');
      if (cEnginedel[i] == comparedel) {
        GM_setValue('CEngineName' + i, 'empty');
        GM_setValue('CEngineUrl' + i, 'empty');
        break;
      }
    }
  var disabledengines = GM_getValue('ddgmDisEngines', 'empty'); 
  GM_setValue('ddgmDisEngines', disabledengines + ' ' + comparedel);
  disabledengines = GM_getValue('ddgmDisEngines', 'empty'); 
  console.log("#Disabled Engines "+ disabledengines)
  });
}
//Call the Main function

main();
//addJQuery(main); 
