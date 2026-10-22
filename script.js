(function(){
var H=[[[9.5,12.5]],[[15,18]],[],[[9.5,12.5],[13.5,18]],[],[[9.5,12.5],[13.5,18]],[[9.5,15.5]]];
var D=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];
function fmt(h){var m=Math.round((h%1)*60);return Math.floor(h)+"h"+(m?String(m).padStart(2,"0"):"")}
var f=new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Brussels",weekday:"short",hour:"numeric",minute:"numeric",hour12:false,month:"numeric"});
var parts={};f.formatToParts(new Date()).forEach(function(x){parts[x.type]=x.value});
var map={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};
var day=map[parts.weekday],now=(+parts.hour%24)+(+parts.minute)/60,mo=+parts.month-1;
var txt="",on=false,i,j,iv;
for(i=0;i<H[day].length;i++){iv=H[day][i];if(now>=iv[0]&&now<iv[1]){on=true;txt="Ouvert maintenant, fermeture à "+fmt(iv[1]);}}
if(!on){var found=false;
for(i=0;i<H[day].length&&!found;i++){if(now<H[day][i][0]){txt="Fermé, ouverture aujourd’hui à "+fmt(H[day][i][0]);found=true}}
for(j=1;j<=7&&!found;j++){var d=(day+j)%7;if(H[d].length){txt="Fermé, ouverture "+(j===1?"demain":D[d])+" à "+fmt(H[d][0][0]);found=true}}}
var o=document.getElementById("open");if(on)o.classList.add("on");
document.getElementById("opentxt").textContent=txt;
var rows=document.querySelectorAll("#hours tr");var idx=(day+6)%7;if(rows[idx])rows[idx].className="today";

})();

(function(){var th=[].slice.call(document.querySelectorAll("#thumbs button")),big=document.getElementById("big"),cap=document.getElementById("cap"),cnt=document.getElementById("cnt"),v=document.getElementById("viewer"),i=0,x0=null;
var t;function set(n){i=(n+th.length)%th.length;var im=th[i].querySelector("img");big.src=im.src;document.getElementById("bg").style.backgroundImage="url("+im.src+")";big.alt=im.alt;big.width=+im.getAttribute("width");big.height=+im.getAttribute("height");cap.textContent=im.getAttribute("data-cap");cnt.textContent=(i+1)+" / "+th.length;th.forEach(function(b,k){b.setAttribute("aria-current",k===i?"true":"false")})}
function go(n){i=(n+th.length)%th.length;var bg=document.getElementById("bg");big.style.opacity=0;bg.style.opacity=0;clearTimeout(t);t=setTimeout(function(){set(i);big.style.opacity=1;bg.style.opacity=1},200)}
th.forEach(function(b,k){b.onclick=function(){go(k)}});
document.getElementById("prev").onclick=function(){go(i-1)};
document.getElementById("next").onclick=function(){go(i+1)};
v.addEventListener("keydown",function(e){if(e.key==="ArrowLeft")go(i-1);if(e.key==="ArrowRight")go(i+1)});
v.addEventListener("touchstart",function(e){x0=e.touches[0].clientX},{passive:true});
v.addEventListener("touchend",function(e){if(x0===null)return;var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)go(d<0?i+1:i-1);x0=null});

requestAnimationFrame(function(){set(0)});})();

(function(){if(!("IntersectionObserver" in window)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
var els=[].slice.call(document.querySelectorAll(".perks li,section h2,section .lead,.panel,.etals li,.feature,.story>*,.gallery,.rev,.faq details,.info>.card,.more"));
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var t=e.target;t.classList.add("in");io.unobserve(t);setTimeout(function(){t.classList.remove("reveal","in");t.style.transitionDelay=""},1200)})},{threshold:.12,rootMargin:"0px 0px -5% 0px"});
els.forEach(function(el){var n=[].slice.call(el.parentNode.children).indexOf(el);el.style.transitionDelay=Math.min(n,4)*80+"ms";el.classList.add("reveal");io.observe(el)});
})();

(function(){var L={};[].forEach.call(document.querySelectorAll(".topbar nav a"),function(a){L[a.getAttribute("href").slice(1)]=a});
if("IntersectionObserver" in window){
var so=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;for(var k in L)L[k].classList.remove("act");var a=L[e.target.id];if(a)a.classList.add("act")})},{rootMargin:"-45% 0px -50% 0px"});
Object.keys(L).forEach(function(id){var el=document.getElementById(id);if(el)so.observe(el)});
if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co.unobserve(e.target);var el=e.target,to=+el.getAttribute("data-to"),t0=null;
function f(t){if(t0===null)t0=t;var p=Math.min((t-t0)/1200,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)})},{threshold:.6});
[].forEach.call(document.querySelectorAll(".count"),function(el){el.textContent="0";co.observe(el)})}}
})();

(function(){var w=document.getElementById("wave");if(!w)return;
if(!("IntersectionObserver" in window)||matchMedia("(prefers-reduced-motion: reduce)").matches){w.classList.add("go");return}
var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){w.classList.add("go");o.disconnect()}},{threshold:.35});o.observe(w)})();

(function(){var e=document.getElementById("sep");if(!e)return;
if(!("IntersectionObserver" in window)||matchMedia("(prefers-reduced-motion: reduce)").matches){e.classList.add("go");return}
var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){e.classList.add("go");o.disconnect()}},{threshold:.6});o.observe(e)})();
