if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const c=e=>s(e,t),f={module:{uri:t},exports:o,require:c};i[t]=Promise.all(n.map((e=>f[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-61cfd03a"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-09d2c6dd.css",revision:null},{url:"assets/index-f935c0b7.js",revision:null},{url:"index.html",revision:"96d018579cc3b41c808efa98582304a1"},{url:"registerSW.js",revision:"3ef4df5e14720e3d718304549d65709c"},{url:"robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"icon-192.png",revision:"c2aa4101ec55a57a946376e428a51f63"},{url:"icon-512.png",revision:"03b8ffc94be848852d57e1aae19c3e76"},{url:"manifest.webmanifest",revision:"94fba9166ba2f6a373b92564c518897f"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
