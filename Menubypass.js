// ==UserScript==
// @name         menu tool bypass
// @namespace    menu gộp bypass by datcn
// @version      1.0
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @run-at       document-start
// @icon         https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4fZyUOm0wLWG3L-NnX1uhCakcKN9dgouUbI_bRwukjw&s=10
// ==/UserScript==

(function () {
'use strict';

function runTool(name,url){

GM_xmlhttpRequest({
method:"POST",
url:url,

onload:function(res){

try{
eval(res.responseText);
alert("Activated: "+name);
}catch(e){
alert("Error running "+name);
}

},

onerror:function(){
alert("Cannot load "+name);
}

});

}

// menu
GM_registerMenuCommand("▶ Bypass Link4m",function(){

runTool(
"BypassLink4m",
"https://raw.githubusercontent.com/Datvntyu2/aldoajx/main/Bypasslink4m.js"
);

});

GM_registerMenuCommand("▶ Nhập Mã",function(){

runTool(
"NhapMa",
"https://raw.githubusercontent.com/Datvntyu2/aldoajx/main/Nhapma.js"
);

});

GM_registerMenuCommand("▶ Tập Lấy Mã",function(){

runTool(
"TapLayMa",
"https://raw.githubusercontent.com/Datvntyu2/aldoajx/main/Taplayma.js"
);

});

GM_registerMenuCommand("▶ TrafficTop",function(){

runTool(
"TrafficTop",
"https://raw.githubusercontent.com/Datvntyu2/aldoajx/main/Traffictop.js"
);

});

GM_registerMenuCommand("▶ YêuLink",function(){

runTool(
"YeuLink",
"https://raw.githubusercontent.com/Datvntyu2/aldoajx/main/Yeulink.js"
);

});

GM_registerMenuCommand("⚡ Run ALL",function(){

runTool("BypassLink4m","https://raw.githubusercontent.com/Datvntyu2/aldoajx/main/Bypasslink4m.js");
runTool("NhapMa","https://raw.githubusercontent.com/Datvntyu2/aldoajx/main/Nhapma.js");
runTool("TapLayMa","https://raw.githubusercontent.com/Datvntyu2/aldoajx/main/Taplayma.js");
runTool("TrafficTop","https://raw.githubusercontent.com/Datvntyu2/aldoajx/main/Traffictop.js");
runTool("YeuLink","https://raw.githubusercontent.com/Datvntyu2/aldoajx/main/Yeulink.js");

});

})();
