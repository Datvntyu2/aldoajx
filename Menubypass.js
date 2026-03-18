// ==UserScript==
// @name         menudypass v2
// @namespace    datcn.pro
// @description  menu by datcn
// @version      4.0
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @run-at       document-end
// @icon         https://truyentranhmoi.edu.vn/upload/2025/08/anh-choso-01.webp
// ==/UserScript==

(function () {
'use strict';

// ===== TOAST PRO CAM =====
function showToast(text){

const old1 = document.getElementById("__datcn_toast");
const old2 = document.getElementById("__datcn_overlay");
if(old1) old1.remove();
if(old2) old2.remove();

// overlay blur
const overlay = document.createElement("div");
overlay.id="__datcn_overlay";
overlay.style.cssText=`
position:fixed;
top:0;left:0;
width:100%;height:100%;
background:rgba(0,0,0,.35);
backdrop-filter:blur(6px);
z-index:999998;
transition:all .3s;
`;

// box
const box = document.createElement("div");
box.id="__datcn_toast";

box.style.cssText = `
position:fixed;
top:50%;
left:50%;
transform:translate(-50%,-50%) scale(.8);
z-index:999999;
background:linear-gradient(135deg,#ff7a18,#ffb347);
color:#fff;
padding:22px 28px;
border-radius:18px;
font-size:16px;
font-weight:600;
text-align:center;
box-shadow:0 20px 60px rgba(255,140,0,.6);
transition:all .3s ease;
opacity:0;
`;

// nội dung
box.innerHTML = `
<div style="font-size:13px;opacity:.85">⚡ datcn script</div>
<div style="margin-top:8px;font-size:18px;font-weight:800">
${text}
</div>
<div style="margin-top:6px;font-size:12px;opacity:.8">
Auto đóng sau 4s
</div>
`;

document.body.appendChild(overlay);
document.body.appendChild(box);

// animation hiện
setTimeout(()=>{
box.style.opacity="1";
box.style.transform="translate(-50%,-50%) scale(1)";
},50);

// auto tắt
setTimeout(()=>{
box.style.opacity="0";
box.style.transform="translate(-50%,-60%) scale(.9)";
overlay.style.opacity="0";

setTimeout(()=>{
box.remove();
overlay.remove();
},250);

},1500);

}

// ===== RUN TOOL =====
function runTool(name,url){

GM_xmlhttpRequest({
method:"GET",
url:url,

onload:function(res){

try{

const s=document.createElement("script");
s.textContent=res.responseText;
document.documentElement.appendChild(s);
s.remove();

showToast(name+" đã kích hoạt");

}catch(e){
showToast("Lỗi "+name);
}

},

onerror:function(){
showToast("Không tải được "+name);
}

});

}

// ===== MENU =====
GM_registerMenuCommand("▶ Bypass Link4m", function(){
runTool("Bypass Link4m",
"https://raw.githubusercontent.com/Datvntyu2/aldoajx/main/Bypasslink4m.js");
});

GM_registerMenuCommand("▶ Bypass Gộp", function(){
runTool("Bypass Gộp",
"https://raw.githubusercontent.com/Datvntyu2/aldoajx/main/Bypassgop.js");
});

GM_registerMenuCommand("▶ nhapma", function(){
runTool("Nhập Mã",
"https://raw.githubusercontent.com/Datvntyu2/aldoajx/main/Nhapma.js");
});

GM_registerMenuCommand("▶ TapLayma", function(){
runTool("Tập Lấy Mã",
"https://raw.githubusercontent.com/Datvntyu2/aldoajx/main/Taplayma.js");
});

GM_registerMenuCommand("▶ TrafficTop", function(){
runTool("TrafficTop",
"https://raw.githubusercontent.com/Datvntyu2/aldoajx/main/Traffictop.js");
});

GM_registerMenuCommand("▶ YeuLink", function(){
runTool("YêuLink",
"https://raw.githubusercontent.com/Datvntyu2/aldoajx/main/Yeulink.js");
});

})();
