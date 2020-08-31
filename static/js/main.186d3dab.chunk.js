(this["webpackJsonpnote-practice"]=this["webpackJsonpnote-practice"]||[]).push([[0],{12:function(e,t,n){e.exports=n(19)},17:function(e,t,n){},18:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(10),l=n.n(c),o=(n(17),n(3)),u=n(5),i=n(21),s=(n(18),{A:"blue",B:"purple",C:"red",D:"yellow",E:"orange",F:"green",G:"teal"}),m=function(e){var t=e.letter,n=e.mod,a=e.color,c="text-".concat(a,"-400"),l="flex content-center justify-center text-auto-size ".concat(c),u={lineHeight:"inherit",top:0,fontSize:"0.5em"};return r.a.createElement("div",{className:l},r.a.createElement("sup",{className:"invisible",style:Object(o.a)({},u)},n),r.a.createElement("span",null,t),r.a.createElement("sup",{className:n?"":"invisible",style:Object(o.a)({},u)},n))},f=function(e){var t=e.notes,n=void 0===t?[]:t;return r.a.createElement("div",{className:"grid items-center content-center grid-cols-6 justify-evenly"},n.map((function(e,t){var n=e[0],a=e[1],c=s[n];return r.a.createElement(m,{key:e+t,letter:n,mod:a,color:c})})))},v=function(e){var t=e.name,n=e.children;return r.a.createElement("label",{className:"mr-2 text-gray-400",htmlFor:t},n)},d=function(e){var t=e.value,n=e.onChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement(v,{name:"note-filter"},"Notes:"),r.a.createElement("select",{className:"px-1 rounded-sm",name:"note-filter",value:t,onChange:n},r.a.createElement("option",{value:"any"},"Any"),r.a.createElement("option",{value:"naturals"},"Naturals Only"),r.a.createElement("option",{value:"sharps"},"Naturals + Sharps"),r.a.createElement("option",{value:"flats"},"Naturals + Flats")))},b=function(e){var t=e.value,n=e.onChange,c=Object(a.useRef)(null);return r.a.createElement(r.a.Fragment,null,r.a.createElement(v,{name:"note-timer"},"Refresh Timer:"),r.a.createElement("input",{ref:c,className:"w-12 px-1 rounded-sm",name:"note-timer",type:"number",min:0,max:60,step:1,value:t,onChange:n,onKeyUp:function(e){var t;"Enter"===e.key&&(null===(t=c.current)||void 0===t||t.blur())}}))},p=function(e){var t=e.value,n=e.onChange,c=Object(a.useRef)(null);return r.a.createElement(r.a.Fragment,null,r.a.createElement(v,{name:"note-count"},"Count:"),r.a.createElement("input",{ref:c,className:"w-10 px-1 rounded-sm",name:"note-count",type:"number",min:1,max:12,value:t,onChange:n,onKeyUp:function(e){var t;"Enter"===e.key&&(null===(t=c.current)||void 0===t||t.blur())}}))},E=n(4),g=function(e,t){return e.filter((function(e){return t.every((function(t){return e!==t}))}))},h=n(11),y=function(e){for(var t=Object(h.a)(e).slice(0),n=t.length;n;){var a=Math.floor(Math.random()*n--),r=[t[a],t[n]];t[n]=r[0],t[a]=r[1]}return t},j=["A","B","C","D","E","F","G"],O=g(j,["B","E"]).map((function(e){return e+"\u266f"})),x=g(j,["C","F"]).map((function(e){return e+"\u266d"})),N=function(){return[].concat(j)},C=function(){return[].concat(Object(E.a)(N()),Object(E.a)(O))},w=function(){return[].concat(Object(E.a)(N()),Object(E.a)(x))},k=function(){return Math.random()>.5?C():w()},F=function(e){switch(e){case"any":return k();case"naturals":return N();case"sharps":return C();case"flats":return w();default:return k()}},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.filter,n=void 0===t?"any":t,a=e.count,r=void 0===a?6:a;return y(F(n)).slice(0,r)},B=function(e){return null===e?0:Math.floor(e/1e3)},M=function(e){var t=parseInt(e,10);return!Number.isFinite(t)||t<=0?null:1e3*t},A=function(){var e=Object(a.useState)(6),t=Object(u.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)("any"),s=Object(u.a)(l,2),m=s[0],v=s[1],E=Object(a.useState)(S({filter:m,count:n})),g=Object(u.a)(E,2),h=g[0],y=g[1],j=Object(a.useState)(null),O=Object(u.a)(j,2),x=O[0],N=O[1],C=Object(a.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return y(S(Object(o.a)({filter:m,count:n},e)))}),[m,n,y]),w=Object(a.useCallback)((function(e){var t=e.target;N(M(t.value))}),[N]),k=Object(a.useCallback)((function(e){var t=e.target.value;c(t),C({count:t})}),[c,C]),F=Object(a.useCallback)((function(e){var t=e.target.value;v(t),C({filter:t})}),[v,C]),A=Object(a.useCallback)((function(){null!==x?N(x+1):C()}),[C,x,N]);return Object(i.a)(C,x,{immediate:!0}),r.a.createElement("div",{className:"flex flex-col flex-1"},r.a.createElement("div",{className:"flex-1 w-full max-w-6xl p-4 mx-auto select-none",onClick:A},r.a.createElement(f,{notes:h})),r.a.createElement("div",{className:"my-4 text-sm italic text-center text-gray-100 opacity-25"},"Tap screen to refresh notes"),r.a.createElement("div",{className:"grid grid-rows-3 px-4 pt-4 bg-gray-700 md:grid-cols-3 md:grid-rows-1"},r.a.createElement("div",{className:"flex justify-center mb-4 md:justify-start"},r.a.createElement(d,{value:m,onChange:F})),r.a.createElement("div",{className:"flex justify-center mb-4 "},r.a.createElement(b,{value:B(x),onChange:w})),r.a.createElement("div",{className:"flex justify-center mb-4 md:justify-end"},r.a.createElement(p,{value:n,onChange:k}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[12,1,2]]]);
//# sourceMappingURL=main.186d3dab.chunk.js.map