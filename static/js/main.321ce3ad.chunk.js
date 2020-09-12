(this["webpackJsonpnote-practice"]=this["webpackJsonpnote-practice"]||[]).push([[0],{50:function(e,t,a){e.exports=a(59)},55:function(e,t,a){},59:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(7),c=a.n(l),u=(a(55),a(26)),s=a(16),o=a(96),i=a(93),m={A:"blue",B:"purple",C:"red",D:"yellow",E:"orange",F:"green",G:"teal"},f=[{label:"All Notes",value:"any"},{label:"Naturals Only",value:"naturals"},{label:"Naturals + Sharps",value:"sharps"},{label:"Naturals + Flats",value:"flats"},{label:"Inversion Groups",value:"inversions"}],b=function(e){var t=e.letter,a=e.mod,n=e.color,l="text-".concat(n,"-400"),c="flex content-center justify-center text-auto-size w-32 ".concat(l),s={lineHeight:"inherit",top:0,fontSize:"0.5em"};return r.a.createElement("div",{className:c},r.a.createElement("sup",{className:"invisible",style:Object(u.a)({},s)},a),r.a.createElement("span",null,t),r.a.createElement("sup",{className:a?"":"invisible",style:Object(u.a)({},s)},a))},v=function(e){var t=e.notes,a=void 0===t?[]:t;return r.a.createElement("div",{className:"flex flex-wrap items-center content-center justify-center gap-4"},a.map((function(e,t){var a=e[0],n=e[1],l=m[a];return r.a.createElement(b,{key:e+t,letter:a,mod:n,color:l})})))},g=a(94),j=a(95),p=function(e){var t=e.value,a=e.onChange;return r.a.createElement(g.a,{id:"note-filter",className:"px-1",label:"Display",select:!0,value:t,onChange:a},f.map((function(e){return r.a.createElement(j.a,{key:e.value,value:e.value},e.label)})))},d=function(e){var t=e.onChange,a=Object(n.useRef)(null),l=Object(n.useState)("0"),c=Object(s.a)(l,2),u=c[0],o=c[1],i=Object(n.useCallback)((function(e){var a=parseInt(e.target.value),n=e.target.value;a<0?n="0":a>60&&(n="".concat(60)),o(n),t(e)}),[t,o]),m=Object(n.useCallback)((function(e){var a=e.target.value,n=parseInt(a);Number.isFinite(n)?o(a):o("0"),t(e)}),[t,o]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a,{id:"note-timer",className:"w-16 px-1",ref:a,label:"Timer",size:"small",type:"number",value:u,onChange:i,onBlur:m}))},h=function(e){var t=e.value,a=e.max,l=e.onChange,c=Object(n.useRef)(null),u=Object(n.useRef)(12),s=Object(n.useCallback)((function(e){var t=e.target.value,n=parseInt(e.target.value);n<=0?t="1":n>a&&(t="".concat(a)),Number.isFinite(n)&&(u.current=t),e.target.value=t,l(e)}),[a,l]),o=Object(n.useCallback)((function(e){Number.isFinite(e.target.value)||(e.target.value=u.current),l(e)}),[l]);return r.a.createElement(g.a,{id:"note-count",className:"w-10 px-1",ref:c,label:"Count",type:"number",value:t,size:"small",onChange:s,onBlur:o})},O=Object(n.memo)((function(e){var t=e.filter,a=e.count,l=e.setTimerDelay,c=e.setCount,u=e.setFilter,s=e.changeNotes,o="naturals"===t?7:12,i=Object(n.useCallback)((function(e){var t=e.target;l(function(e){var t=parseInt(e);return!Number.isFinite(t)||t<=0?null:1e3*t}(t.value))}),[l]),m=Object(n.useCallback)((function(e){var t=e.target.value;c(t),s({count:t})}),[c,s]),f=Object(n.useCallback)((function(e){var t=e.target.value;u(t),s({filter:t})}),[u,s]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"flex justify-center mb-4 md:justify-start"},r.a.createElement(p,{value:t,onChange:f})),r.a.createElement("div",{className:"flex justify-center mb-4 "},r.a.createElement(d,{onChange:i})),r.a.createElement("div",{className:"flex justify-center mb-4 md:justify-end"},r.a.createElement(h,{value:a,max:o,onChange:m})))})),y=a(27),E=function(e,t){return e.filter((function(e){return t.every((function(t){return e!==t}))}))},C=a(43),x=function(e){for(var t=Object(C.a)(e).slice(0),a=t.length;a;){var n=Math.floor(Math.random()*a--),r=[t[n],t[a]];t[a]=r[0],t[n]=r[1]}return t},N=["A","B","C","D","E","F","G"],w=E(N,["B","E"]).map((function(e){return e+"\u266f"})),k=E(N,["C","F"]).map((function(e){return e+"\u266d"})),F=[["C","F","G"],["A","D","E"],["Ab","Db","Eb"],["B","Bb","Gb"]],B=function(){return[].concat(N)},S=function(){return[].concat(Object(y.a)(B()),Object(y.a)(w))},A=function(){return[].concat(Object(y.a)(B()),Object(y.a)(k))},D=function(e){switch(e){case"any":return Math.random()>.5?S():A();case"naturals":return B();case"sharps":return S();case"flats":return A();case"inversions":return[].concat(F)}},I=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.filter,a=void 0===t?"any":t,n=e.count,r=void 0===n?6:n,l=x(D(a));return l.some(Array.isArray)&&(l=l.flatMap((function(e){return x(e)}))),l.slice(0,r)},G=function(){var e=Object(o.a)(),t=Object(n.useState)(12),a=Object(s.a)(t,2),l=a[0],c=a[1],m=Object(n.useState)("any"),f=Object(s.a)(m,2),b=f[0],g=f[1],j=Object(n.useState)(I({filter:b,count:l})),p=Object(s.a)(j,2),d=p[0],h=p[1],y=Object(n.useState)(null),E=Object(s.a)(y,2),C=E[0],x=E[1],N=Object(n.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return h(I(Object(u.a)({filter:b,count:l},e)))}),[b,l,h]),w=Object(n.useCallback)((function(){null!==C&&x(C+1),N()}),[N,C,x]);return Object(n.useEffect)((function(){"naturals"===b&&l>7&&c(7)}),[b,l]),Object(i.a)(N,C),r.a.createElement("div",{className:"flex flex-col bg-gray-900",style:{height:e.height}},r.a.createElement("div",{className:"flex-1 w-full max-w-6xl p-4 mx-auto select-none",onClick:w},r.a.createElement(v,{notes:d})),r.a.createElement("div",{className:"my-4 text-sm italic text-center text-gray-100 opacity-25"},"Tap screen to refresh notes"),r.a.createElement("div",{className:"grid grid-rows-3 px-4 pt-4 bg-gray-300 md:grid-cols-3 md:grid-rows-1"},r.a.createElement(O,{count:l,filter:b,setFilter:g,setTimerDelay:x,setCount:c,changeNotes:N})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(G,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[50,1,2]]]);
//# sourceMappingURL=main.321ce3ad.chunk.js.map