(this["webpackJsonpnote-practice"]=this["webpackJsonpnote-practice"]||[]).push([[0],{50:function(e,t,a){e.exports=a(59)},55:function(e,t,a){},59:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(7),c=a.n(l),s=(a(55),a(34)),u=a(17),i=a(96),o=a(93),f=function(e,t){return e.filter((function(e){return t.every((function(t){return e!==t}))}))},b={A:"blue",B:"purple",C:"red",D:"yellow",E:"orange",F:"green",G:"teal"},m=[{label:"Any",value:"any"},{label:"Naturals Only",value:"naturals"},{label:"Naturals + Flats",value:"flats"},{label:"Naturals + Sharps",value:"sharps"},{label:"Inversion Groups",value:"inversions"},{label:"Fifths",value:"fifths"}],v=["A","B","C","D","E","F","G"],h=f(v,["B","E"]).map((function(e){return e+"\u266f"})),g=f(v,["C","F"]).map((function(e){return e+"\u266d"})),p=[["C","F","G"],["A","D","E"],["Ab","Db","Eb"],["B","Bb","Gb"]],d=["C","F","Bb","Eb","Ab","Db","Gb","B","E","A","D","G"],j=["C","F","Bb","Eb","Ab","Db","Gb","Cb"],O=["C","G","D","A","E","B","F#","C#"],E=function(e){var t=e.notes,a=void 0===t?[]:t;return r.a.createElement("div",{className:"flex flex-wrap items-center content-center justify-center gap-4"},a.map((function(e,t){var a=e[0],n=e[1],l=b[a];return r.a.createElement(y,{key:e+t,letter:a,mod:n,color:l})})))},y=function(e){var t=e.letter,a=e.mod,n=e.color,l="text-".concat(n,"-400"),c="inline-flex content-center justify-center text-auto-size ".concat(l),u={lineHeight:"inherit",top:0,fontSize:"0.5em"};return r.a.createElement("div",{className:c,style:{flexBasis:"10vw"}},r.a.createElement("sup",{className:"invisible",style:u},a),r.a.createElement("span",null,t),r.a.createElement("sup",{className:a?"":"invisible",style:Object(s.a)({},u)},a))},C=a(94),x=a(95),N=function(e){var t=e.value,a=e.onChange;return r.a.createElement(C.a,{id:"note-filter",className:"px-1",label:"Display",select:!0,value:t,onChange:a},m.map((function(e){return r.a.createElement(x.a,{key:e.value,value:e.value},e.label)})))},w=function(e){var t=e.onChange,a=Object(n.useRef)(null),l=Object(n.useState)("0"),c=Object(u.a)(l,2),s=c[0],i=c[1],o=Object(n.useCallback)((function(e){var a=parseInt(e.target.value),n=e.target.value;a<0?n="0":a>60&&(n="".concat(60)),i(n),t(e)}),[t,i]),f=Object(n.useCallback)((function(e){var a=e.target.value,n=parseInt(a);Number.isFinite(n)?i(a):i("0"),t(e)}),[t,i]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(C.a,{id:"note-timer",className:"w-16 px-1",ref:a,label:"Timer",size:"small",type:"number",value:s,onChange:o,onBlur:f}))},F=function(e){var t=e.value,a=e.max,l=e.onChange,c=Object(n.useRef)(null),s=Object(n.useRef)(12),u=Object(n.useCallback)((function(e){var t=e.target.value,n=parseInt(e.target.value);n<=0?t="1":n>a&&(t="".concat(a)),Number.isFinite(n)&&(s.current=t),e.target.value=t,l(e)}),[a,l]),i=Object(n.useCallback)((function(e){Number.isFinite(e.target.value)||(e.target.value=s.current),l(e)}),[l]);return r.a.createElement(C.a,{id:"note-count",className:"w-10 px-1",ref:c,label:"Count",type:"number",value:t,size:"small",onChange:u,onBlur:i})},k=Object(n.memo)((function(e){var t=e.filter,a=e.count,l=e.setTimerDelay,c=e.setCount,s=e.setFilter,u=e.changeNotes,i="naturals"===t?7:12,o=Object(n.useCallback)((function(e){var t=e.target;l(function(e){var t=parseInt(e);return!Number.isFinite(t)||t<=0?null:1e3*t}(t.value))}),[l]),f=Object(n.useCallback)((function(e){var t=e.target.value;c(t),u({count:t})}),[c,u]),b=Object(n.useCallback)((function(e){var t=e.target.value;s(t),u({filter:t})}),[s,u]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"flex justify-center mb-4 md:justify-start"},r.a.createElement(N,{value:t,onChange:b})),r.a.createElement("div",{className:"flex justify-center mb-4 "},r.a.createElement(w,{onChange:o})),r.a.createElement("div",{className:"flex justify-center mb-4 md:justify-end"},r.a.createElement(F,{value:a,max:i,onChange:f})))})),B=a(10),D=a(43),A=function(e){for(var t=Object(D.a)(e).slice(0),a=t.length;a;){var n=Math.floor(Math.random()*a--),r=[t[n],t[a]];t[a]=r[0],t[n]=r[1]}return t},G=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.flats,a=void 0!==t&&t,n=e.sharps,r=void 0!==n&&n;return a?[].concat(Object(B.a)(v),Object(B.a)(g)):r?[].concat(Object(B.a)(v),Object(B.a)(h)):Object(B.a)(v)},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.flats,a=void 0!==t&&t,n=e.sharps,r=void 0!==n&&n;return a?Object(B.a)(j):r?Object(B.a)(O):Object(B.a)(d)},I=function(e){switch(e){case"any":return A(function(){var e=Math.random()>.5;return G({flats:e,sharps:!e})}());case"naturals":return A(G());case"flats":return A(G({flats:!0}));case"sharps":return A(G({sharps:!0}));case"inversions":return Object(B.a)(p).flatMap((function(e){return A(e)}));case"fifths":return S({});case"fifths-flats":return S({flats:!0});case"fifths-sharps":return S({sharps:!0})}},M=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.filter,a=void 0===t?"any":t,n=e.count,r=void 0===n?6:n;return I(a).slice(0,r)},z=function(){var e=Object(i.a)(),t=Object(n.useState)(12),a=Object(u.a)(t,2),l=a[0],c=a[1],f=Object(n.useState)("any"),b=Object(u.a)(f,2),m=b[0],v=b[1],h=Object(n.useState)(M({filter:m,count:l})),g=Object(u.a)(h,2),p=g[0],d=g[1],j=Object(n.useState)(null),O=Object(u.a)(j,2),y=O[0],C=O[1],x=Object(n.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return d(M(Object(s.a)({filter:m,count:l},e)))}),[m,l,d]),N=Object(n.useCallback)((function(){null!==y&&C(y+1),x()}),[x,y,C]);return Object(o.a)(x,y),r.a.createElement("div",{className:"flex flex-col bg-gray-900",style:{height:e.height}},r.a.createElement("div",{className:"flex-1 w-full max-w-6xl p-4 mx-auto select-none",onClick:N},r.a.createElement(E,{notes:p})),r.a.createElement("div",{className:"my-4 text-sm italic text-center text-gray-100 opacity-25"},"Tap screen to refresh notes"),r.a.createElement("div",{className:"grid grid-rows-3 px-4 pt-4 bg-gray-300 md:grid-cols-3 md:grid-rows-1"},r.a.createElement(k,{count:l,filter:m,setFilter:v,setTimerDelay:C,setCount:c,changeNotes:x})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[50,1,2]]]);
//# sourceMappingURL=main.bf554554.chunk.js.map