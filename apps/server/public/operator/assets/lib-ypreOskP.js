import{n as e}from"./lib-D8zAfmGr.js";import{$ as t,Ct as n,Et as r,Q as i,St as a,Z as o,_t as s,at as c,bt as l,ct as u,dt as d,et as f,ft as p,gt as m,ht as h,it as g,lt as _,mt as v,nt as y,ot as b,pt as x,rt as S,st as C,tt as w,ut as T,vt as E,wt as D,xt as O,yt as k}from"./index-CFsv2szE.js";var A=D((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),ee=D(((e,t)=>{t.exports=A()})),te=D((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var C=Array.isArray;function w(){}var T={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function D(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function O(e,t){return D(e.type,t,e.props)}function k(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function A(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ee=/\/+/g;function te(e,t){return typeof e==`object`&&e&&e.key!=null?A(``+e.key):t.toString(36)}function ne(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(w,w):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function j(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,j(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+te(e,0):a,C(o)?(i=``,c!=null&&(i=c.replace(ee,`$&/`)+`/`),j(o,r,i,``,function(e){return e})):o!=null&&(k(o)&&(o=O(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ee,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(C(e))for(var u=0;u<e.length;u++)a=e[u],s=l+te(a,u),c+=j(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+te(a,u++),c+=j(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return j(ne(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function re(e,t,n){if(e==null)return e;var r=[],i=0;return j(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function M(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var ie=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function ae(e){var t=T.T,n={};n.types=t===null?null:t.types,T.T=n;try{var r=e(),i=T.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(w,ie)}catch(e){ie(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),T.T=t}}function oe(e){var t=T.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else ae(oe.bind(null,e))}var se={map:re,forEach:function(e,t,n){re(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return re(e,function(){t++}),t},toArray:function(e){return re(e,function(e){return e})||[]},only:function(e){if(!k(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=se,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=T,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return T.H.useMemoCache(e)}},e.addTransitionType=oe,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!E.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return D(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)E.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return D(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=k,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:M}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=ae,e.unstable_useCacheRefresh=function(){return T.H.useCacheRefresh()},e.use=function(e){return T.H.use(e)},e.useActionState=function(e,t,n){return T.H.useActionState(e,t,n)},e.useCallback=function(e,t){return T.H.useCallback(e,t)},e.useContext=function(e){return T.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return T.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return T.H.useEffect(e,t)},e.useEffectEvent=function(e){return T.H.useEffectEvent(e)},e.useId=function(){return T.H.useId()},e.useImperativeHandle=function(e,t,n){return T.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return T.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return T.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return T.H.useMemo(e,t)},e.useOptimistic=function(e,t){return T.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return T.H.useReducer(e,t,n)},e.useRef=function(e){return T.H.useRef(e)},e.useState=function(e){return T.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return T.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return T.H.useTransition()},e.version=`19.3.1`})),ne=D(((e,t)=>{t.exports=te()})),j=`-ms-`,re=`-moz-`,M=`-webkit-`,ie=`comm`,ae=`rule`,oe=`decl`,se=`@import`,ce=`@namespace`,le=`@keyframes`,ue=`@layer`,de=Math.abs,fe=String.fromCharCode,pe=Object.assign;function me(e,t){return _e(e,0)^45?(((t<<2^_e(e,0))<<2^_e(e,1))<<2^_e(e,2))<<2^_e(e,3):0}function he(e){return e.trim()}function N(e,t){return(e=t.exec(e))?e[0]:e}function P(e,t,n){return e.replace(t,n)}function ge(e,t,n){return e.indexOf(t,n)}function _e(e,t){return e.charCodeAt(t)|0}function ve(e,t,n){return e.slice(t,n)}function ye(e){return e.length}function F(e){return e.length}function be(e,t){return t.push(e),e}function xe(e,t){return e.map(t).join(``)}function Se(e,t){return e.filter(function(e){return!N(e,t)})}var I=1,Ce=1,L=0,R=0,we=0,Te=``;function Ee(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:I,column:Ce,length:o,return:``,siblings:s}}function De(e,t){return pe(Ee(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function Oe(e){for(;e.root;)e=De(e.root,{children:[e]});be(e,e.siblings)}function ke(){return we}function Ae(){return we=R>0?_e(Te,--R):0,Ce--,we===10&&(Ce=1,I--),we}function je(){return we=R<L?_e(Te,R++):0,Ce++,we===10&&(Ce=1,I++),we}function Me(){return _e(Te,R)}function Ne(){return R}function Pe(e,t){return ve(Te,e,t)}function Fe(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Ie(e){return I=Ce=1,L=ye(Te=e),R=0,[]}function Le(e){return Te=``,e}function Re(e){return he(Pe(R-1,Ve(e===91?e+2:e===40?e+1:e)))}function ze(e){for(;(we=Me())&&we<33;)je();return Fe(e)>2||Fe(we)>3?``:` `}function Be(e,t){for(;--t&&je()&&!(we<48||we>102||we>57&&we<65||we>70&&we<97););return Pe(e,Ne()+(t<6&&Me()==32&&je()==32))}function Ve(e){for(;je();)switch(we){case e:return R;case 34:case 39:e!==34&&e!==39&&Ve(we);break;case 40:e===41&&Ve(e);break;case 92:je()}return R}function He(e,t){for(;je()&&e+we!==57&&(e+we!==84||Me()!==47););return`/*`+Pe(t,R-1)+`*`+fe(e===47?e:je())}function Ue(e){for(;!Fe(Me());)je();return Pe(e,R)}function We(e){return Le(Ge(``,null,null,null,[``],e=Ie(e),0,[0],e))}function Ge(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=je()){case 40:if(m!=108&&_e(C,d-1)==58){ge(C+=P(Re(v),`&`,`&\f`),`&\f`,de(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=Re(v);break;case 9:case 10:case 13:case 32:C+=ze(m);break;case 92:C+=Be(Ne()-1,7);continue;case 47:switch(Me()){case 42:case 47:be(qe(He(je(),Ne()),t,n,c),c),(Fe(m||1)==5||Fe(Me()||1)==5)&&ye(C)&&ve(C,-1,void 0)!==` `&&(C+=` `);break;default:C+=`/`}break;case 123*h:s[l++]=ye(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=P(C,/\f/g,``)),p>0&&(ye(C)-d||h===0&&m===47)&&be(p>32?Je(C+`;`,r,n,d-1,c):Je(P(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(be(S=Ke(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123){if(u===0)Ge(C,t,S,S,b,a,d,s,x);else{switch(f){case 99:if(_e(C,3)===110)break;case 108:if(_e(C,2)===97)break;default:u=0;case 100:case 109:case 115:}u?Ge(e,S,S,r&&be(Ke(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x):Ge(C,S,S,S,[``],x,0,s,x)}}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+ye(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&Ae()==125)continue}switch(C+=fe(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(ye(C)-1)*_,_=1;break;case 64:Me()===45&&(C+=Re(je())),f=Me(),u=d=ye(y=C+=Ue(Ne())),v++;break;case 45:m===45&&ye(C)==2&&(h=0)}}return a}function Ke(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=F(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=ve(e,f+1,f=de(g=o[h])),b=e;v<m;++v)(b=he(g>0?p[v]+` `+y:P(y,/&\f/g,p[v])))&&(c[_++]=b);return Ee(e,t,n,i===0?ae:s,c,l,u,d)}function qe(e,t,n,r){return Ee(e,t,n,ie,fe(ke()),ve(e,2,-2),0,r)}function Je(e,t,n,r,i){return Ee(e,t,n,oe,ve(e,0,r),ve(e,r+1,-1),r,i)}function Ye(e,t,n){switch(me(e,t)){case 5103:return M+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return M+e+e;case 4855:return M+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return re+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return M+e+re+e+j+e+e;case 5936:switch(_e(e,t+11)){case 114:return M+e+j+P(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return M+e+j+P(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return M+e+j+P(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return M+e+j+e+e;case 6165:return M+e+j+`flex-`+e+e;case 5187:return M+e+P(e,/(\w+).+(:[^]+)/,M+`box-$1$2`+j+`flex-$1$2`)+e;case 5443:return M+e+j+`flex-item-`+P(e,/flex-|-self/g,``)+(N(e,/flex-|baseline/)?``:j+`grid-row-`+P(e,/flex-|-self/g,``))+e;case 4675:return M+e+j+`flex-line-pack`+P(e,/align-content|flex-|-self/g,``)+e;case 5548:return M+e+j+P(e,`shrink`,`negative`)+e;case 5292:return M+e+j+P(e,`basis`,`preferred-size`)+e;case 6060:return M+`box-`+P(e,`-grow`,``)+M+e+j+P(e,`grow`,`positive`)+e;case 4554:return M+P(e,/([^-])(transform)/g,`$1`+M+`$2`)+e;case 6187:return P(P(P(e,/(zoom-|grab)/,M+`$1`),/(image-set)/,M+`$1`),e,``)+e;case 5495:case 3959:return P(e,/(image-set\([^]*)/,M+"$1$`$1");case 4968:return P(P(e,/(.+:)(flex-)?(.*)/,M+`box-pack:$3`+j+`flex-pack:$3`),/space-between/,`justify`)+M+e+e;case 4200:if(!N(e,/flex-|baseline/))return j+`grid-column-align`+ve(e,t)+e;break;case 2592:case 3360:return j+P(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,N(e.props,/grid-\w+-end/)})?~ge(e+(n=n[t].value),`span`,0)?e:j+P(e,`-start`,``)+e+j+`grid-row-span:`+(~ge(n,`span`,0)?N(n,/\d+/):+N(n,/\d+/)-N(e,/\d+/))+`;`:j+P(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return N(e.props,/grid-\w+-start/)})?e:j+P(P(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return P(e,/(.+)-inline(.+)/,M+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(ye(e)-1-t>6)switch(_e(e,t+1)){case 109:if(_e(e,t+4)!==45)break;case 102:return P(e,/(.+:)(.+)-([^]+)/,`$1`+M+`$2-$3$1`+re+(_e(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~ge(e,`stretch`,0)?Ye(P(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return P(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return j+n+`:`+r+s+(i?j+n+`-span:`+(a?o:+o-r)+s:``)+e});case 4949:if(_e(e,t+6)===121)return P(e,`:`,`:`+M)+e;break;case 6444:switch(_e(e,_e(e,14)===45?18:11)){case 120:return P(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+M+(_e(e,14)===45?`inline-`:``)+`box$3$1`+M+`$2$3$1`+j+`$2box$3`)+e;case 100:return P(e,`:`,`:`+j)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return P(e,`scroll-`,`scroll-snap-`)+e}return e}function Xe(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function Ze(e,t,n,r){switch(e.type){case ue:if(e.children.length)break;case se:case ce:case oe:return e.return=e.return||e.value;case ie:return``;case le:return e.return=e.value+`{`+Xe(e.children,r)+`}`;case ae:if(!ye(e.value=e.props.join(`,`)))return``}return ye(n=Xe(e.children,r))?e.return=e.value+`{`+n+`}`:``}function Qe(e){var t=F(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function $e(e){return function(t){t.root||(t=t.return)&&e(t)}}function et(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case oe:e.return=Ye(e.value,e.length,n);return;case le:return Xe([De(e,{value:P(e.value,`@`,`@`+M)})],r);case ae:if(e.length)return xe(n=e.props,function(t){switch(N(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:Oe(De(e,{props:[P(t,/:(read-\w+)/,`:`+re+`$1`)]})),Oe(De(e,{props:[t]})),pe(e,{props:Se(n,r)});break;case`::placeholder`:Oe(De(e,{props:[P(t,/:(plac\w+)/,`:`+M+`input-$1`)]})),Oe(De(e,{props:[P(t,/:(plac\w+)/,`:`+re+`$1`)]})),Oe(De(e,{props:[P(t,/:(plac\w+)/,j+`input-$1`)]})),Oe(De(e,{props:[t]})),pe(e,{props:Se(n,r)})}return``})}}var z=ee(),B=r(ne());function tt(e,...t){return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var nt=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,rt=`active`,it=`data-styled-version`,at=`6.6.0`,ot=`/*!sc*/
`,st=typeof window<`u`&&typeof document<`u`;if(!B.createContext)throw tt(19);function ct(e){if(typeof process<`u`){let t={}[e];if(t!==void 0&&t!==``)return t!==`false`}}var lt=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:ct(`REACT_APP_SC_DISABLE_SPEEDY`)??ct(`SC_DISABLE_SPEEDY`)??(typeof process<`u`&&!1)),ut=`sc-keyframes-`,dt=new Map,ft=new Map,pt=1,mt=e=>{if(dt.has(e))return dt.get(e);for(;ft.has(pt);)pt++;let t=pt++;return dt.set(e,t),ft.set(t,e),t},ht=e=>ft.get(e),gt=(e,t)=>{pt=t+1,dt.set(e,t),ft.set(t,e)},_t=Object.freeze([]),vt=Object.freeze({});function yt(e,t,n=vt){return e.theme!==n.theme&&e.theme||t||n.theme}var bt=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,xt=/(^-|-$)/g;function St(e){return e.replace(bt,`-`).replace(xt,``)}var Ct=/(a)(d)/gi,wt=e=>String.fromCharCode(e+(e>25?39:97));function Tt(e){let t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=wt(t%52)+n;return(wt(t%52)+n).replace(Ct,`$1-$2`)}var Et=5381,Dt=(e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e},Ot=e=>Dt(Et,e);function kt(e){return Tt(Ot(e)>>>0)}function At(e){return e.displayName||e.name||`Component`}function jt(e){return typeof e==`string`&&!0}function Mt(e){return jt(e)?`styled.${e}`:`Styled(${At(e)})`}var Nt=Symbol.for(`react.memo`),Pt=Symbol.for(`react.forward_ref`),Ft={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},It={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Lt={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Rt={[Pt]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[Nt]:Lt};function zt(e){return(`type`in(t=e)&&t.type.$$typeof)===Nt?Lt:`$$typeof`in e?Rt[e.$$typeof]:Ft;var t}var Bt=Object.defineProperty,Vt=Object.getOwnPropertyNames,Ht=Object.getOwnPropertySymbols,Ut=Object.getOwnPropertyDescriptor,Wt=Object.getPrototypeOf,Gt=Object.prototype;function Kt(e,t,n){if(typeof t!=`string`){let r=Wt(t);r&&r!==Gt&&Kt(e,r,n);let i=Vt(t).concat(Ht(t)),a=zt(e),o=zt(t);for(let r=0;r<i.length;++r){let s=i[r];if(!(s in It||n&&n[s]||o&&s in o||a&&s in a)){let n=Ut(t,s);try{Bt(e,s,n)}catch{}}}}return e}function qt(e){return typeof e==`function`}var Jt=Symbol.for(`react.forward_ref`);function Yt(e){return e!=null&&(typeof e==`object`||typeof e==`function`)&&e.$$typeof===Jt&&`styledComponentId`in e}function Xt(e,t){return e&&t?e+` `+t:e||t||``}function Zt(e,t){return e.join(t||``)}function Qt(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function $t(e,t,n=!1){if(!n&&!Qt(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let n=0;n<t.length;n++)e[n]=$t(e[n],t[n]);else if(Qt(t))for(let n in t)e[n]=$t(e[n],t[n]);return e}function en(e,t){Object.defineProperty(e,"toString",{value:t})}var tn=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(let n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){let t=this.groupSizes,n=t.length,r=n;for(;e>=r;)if(r<<=1,r<0)throw tt(16,`${e}`);this.groupSizes=new Uint32Array(r),this.groupSizes.set(t),this.length=r;for(let e=n;e<r;e++)this.groupSizes[e]=0}let n=this.indexOfGroup(e+1),r=0;for(let i=0,a=t.length;i<a;i++)this.tag.insertRule(n,t[i])&&(this.groupSizes[e]++,n++,r++);r>0&&this._cGroup>e&&(this._cIndex+=r)}clearGroup(e){if(e<this.length){let t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(let e=n;e<r;e++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t=``;if(e>=this.length||this.groupSizes[e]===0)return t;let n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n;for(let e=r;e<i;e++)t+=this.tag.getRule(e)+ot;return t}},nn=`style[${nt}][${it}="${at}"]`,rn=RegExp(`^${nt}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),an=e=>typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11,on=e=>{if(!e)return document;if(an(e))return e;if(`getRootNode`in e){let t=e.getRootNode();if(an(t))return t}return document},sn=(e,t,n)=>{let r=n.split(`,`),i;for(let n=0,a=r.length;n<a;n++)(i=r[n])&&e.registerName(t,i)},cn=(e,t)=>{let n=(t.textContent??``).split(ot),r=[];for(let t=0,i=n.length;t<i;t++){let i=n[t].trim();if(!i)continue;let a=i.match(rn);if(a){let t=0|parseInt(a[1],10),n=a[2];t!==0&&(gt(n,t),sn(e,n,a[3]),e.getTag().insertRules(t,r)),r.length=0}else r.push(i)}},ln=e=>{let t=on(e.options.target).querySelectorAll(nn);for(let n=0,r=t.length;n<r;n++){let r=t[n];r&&r.getAttribute(nt)!==rt&&(cn(e,r),r.parentNode&&r.parentNode.removeChild(r))}},un=!1;function dn(){if(!1!==un)return un;if(typeof document<`u`){let e=document.head.querySelector(`meta[property="csp-nonce"]`);if(e)return un=e.nonce||e.getAttribute(`content`)||void 0;let t=document.head.querySelector(`meta[name="sc-nonce"]`);if(t)return un=t.getAttribute(`content`)||void 0}return un=typeof __webpack_nonce__<`u`?__webpack_nonce__:void 0}var fn=(e,t)=>{if(typeof document>`u`)throw tt(20);let n=document.head,r=e||n,i=document.createElement(`style`),a=(e=>{let t=Array.from(e.querySelectorAll(`style[${nt}]`));return t[t.length-1]})(r),o=a===void 0?null:a.nextSibling;i.setAttribute(nt,rt),i.setAttribute(it,at);let s=t||dn();return s&&i.setAttribute(`nonce`,s),r.insertBefore(i,o),i},pn=class{constructor(e,t){this.element=fn(e,t),this.element.appendChild(document.createTextNode(``)),this.sheet=(e=>{if(e.sheet)return e.sheet;let t=e.getRootNode().styleSheets??document.styleSheets;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(r.ownerNode===e)return r}throw tt(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){let t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``}},mn=class{constructor(e,t){this.element=fn(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){let n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:``}},hn=st,gn={isServer:!st,useCSSOMInjection:!lt},_n=class e{static registerId(e){return mt(e)}constructor(e=vt,t={},n){this.options=Object.assign(Object.assign({},gn),e),this.gs=t,this.keyframeIds=new Set,this.names=new Map(n),this.server=!!e.isServer,!this.server&&st&&hn&&(hn=!1,ln(this)),en(this,()=>(e=>{let t=e.getTag(),{length:n}=t,r=``;for(let i=0;i<n;i++){let n=ht(i);if(n===void 0)continue;let a=e.names.get(n);if(a===void 0||!a.size)continue;let o=t.getGroup(i);if(o.length===0)continue;let s=nt+`.g`+i+`[id="`+n+`"]`,c=``;for(let e of a)e.length>0&&(c+=e+`,`);r+=o+s+`{content:"`+c+`"}/*!sc*/
`}return r})(this))}rehydrate(){!this.server&&st&&ln(this)}reconstructWithOptions(t,n=!0){let r=new e(Object.assign(Object.assign({},this.options),t),this.gs,n&&this.names||void 0);return r.keyframeIds=new Set(this.keyframeIds),!this.server&&st&&t.target!==this.options.target&&on(this.options.target)!==on(t.target)&&ln(r),r}allocateGSInstance(e){return this.gs[e]=(this.gs[e]||0)+1}getTag(){return this.tag||=(e=(({useCSSOMInjection:e,target:t,nonce:n})=>e?new pn(t,n):new mn(t,n))(this.options),new tn(e));var e}hasNameForId(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n}registerName(e,t){mt(e),e.startsWith(ut)&&this.keyframeIds.add(e);let n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))}insertRules(e,t,n){this.registerName(e,t),this.getTag().insertRules(mt(e),n)}clearNames(e){this.names.has(e)&&this.names.get(e).clear()}clearRules(e){this.getTag().clearGroup(mt(e)),this.clearNames(e)}clearTag(){this.tag=void 0}},vn=new WeakSet,yn={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function bn(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in yn||e.startsWith(`--`)?String(t).trim():t+`px`}var xn=47;function Sn(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t=``;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r>=65&&r<=90?`-`+String.fromCharCode(r+32):e[n]}return t.startsWith(`ms-`)?`-`+t:t}var Cn=Symbol.for(`sc-keyframes`);function wn(e){return typeof e==`object`&&!!e&&Cn in e}function Tn(e){return qt(e)&&!(e.prototype&&e.prototype.isReactComponent)}var En=e=>e==null||!1===e||e===``,Dn=Symbol.for(`react.client.reference`);function On(e){return e.$$typeof===Dn}function kn(e,t){for(let n in e){let r=e[n];e.hasOwnProperty(n)&&!En(r)&&(Array.isArray(r)&&vn.has(r)||qt(r)?t.push(Sn(n)+`:`,r,`;`):Qt(r)?(t.push(n+` {`),kn(r,t),t.push(`}`)):t.push(Sn(n)+`: `+bn(n,r)+`;`))}}function An(e,t,n,r,i=[]){if(En(e))return i;let a=typeof e;if(a===`string`)return i.push(e),i;if(a===`function`)return On(e)?i:Tn(e)&&t?An(e(t),t,n,r,i):(i.push(e),i);if(Array.isArray(e)){for(let a=0;a<e.length;a++)An(e[a],t,n,r,i);return i}return Yt(e)?(i.push(`.${e.styledComponentId}`),i):wn(e)?(n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i):On(e)?i:Qt(e)&&e.toString===Object.prototype.toString?(kn(e,i),i):(i.push(e.toString()),i)}var jn=Ot(at),Mn=class{constructor(e,t,n){this.rules=e,this.componentId=t,this.baseHash=Dt(jn,t),this.baseStyle=n,_n.registerId(t)}generateAndInjectStyles(e,t,n){let r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):``;{let i=``;for(let r=0;r<this.rules.length;r++){let a=this.rules[r];if(typeof a==`string`)i+=a;else if(a){if(Tn(a)){let r=a(e);typeof r==`string`?i+=r:r!=null&&!1!==r&&(i+=Zt(An(r,e,t,n)))}else i+=Zt(An(a,e,t,n))}}if(i){this.dynamicNameCache||=new Map;let e=n.hash?n.hash+i:i,a=this.dynamicNameCache.get(e);if(!a){if(a=Tt(Dt(Dt(this.baseHash,n.hash),i)>>>0),this.dynamicNameCache.size>=200){let e=this.dynamicNameCache.keys().next().value;e!==void 0&&this.dynamicNameCache.delete(e)}this.dynamicNameCache.set(e,a)}if(!t.hasNameForId(this.componentId,a)){let e=n(i,`.`+a,void 0,this.componentId);t.insertRules(this.componentId,a,e)}r=Xt(r,a)}}return r}},Nn=/&/g;function Pn(e,t){let n=0;for(;--t>=0&&e.charCodeAt(t)===92;)n++;return!(1&~n)}function Fn(e){let t=e.length,n=``,r=0,i=0,a=0,o=!1,s=!1;for(let c=0;c<t;c++){let l=e.charCodeAt(c);if(a!==0||o||l!==xn||e.charCodeAt(c+1)!==42){if(o)l===42&&e.charCodeAt(c+1)===xn&&(o=!1,c++);else if(l!==34&&l!==39||Pn(e,c)){if(a===0){if(l===123)i++;else if(l===125){if(i--,i<0){s=!0;let n=c+1;for(;n<t;){let t=e.charCodeAt(n);if(t===59||t===10)break;n++}n<t&&e.charCodeAt(n)===59&&n++,i=0,c=n-1,r=n;continue}i===0&&(n+=e.substring(r,c+1),r=c+1)}else l===59&&i===0&&(n+=e.substring(r,c+1),r=c+1)}}else a===0?a=l:a===l&&(a=0)}else o=!0,c++}return s||i!==0||a!==0?(r<t&&i===0&&a===0&&(n+=e.substring(r)),n):e}function In(e,t){let n=t+` `,r=`,`+n;for(let i=0;i<e.length;i++){let a=e[i];if(a.type===`rule`){a.value=(n+a.value).replaceAll(`,`,r);let e=a.props,t=[];for(let r=0;r<e.length;r++)t[r]=n+e[r];a.props=t}Array.isArray(a.children)&&a.type!==`@keyframes`&&In(a.children,t)}return e}function Ln({options:e=vt,plugins:t=_t}=vt){let n,r,i,a=(e,t,i)=>i.startsWith(r)&&i.endsWith(r)&&i.replaceAll(r,``).length>0?`.${n}`:e,o=t.slice();o.push(e=>{e.type===`rule`&&e.value.includes(`&`)&&(i||=RegExp(`\\${r}\\b`,`g`),e.props[0]=e.props[0].replace(Nn,r).replace(i,a))}),e.prefix&&o.push(et),o.push(Ze);let s=[],c=Qe(o.concat($e(e=>s.push(e)))),l=(t,a=``,o=``,l=`&`)=>{n=l,r=a,i=void 0;let u=function(e){let t=e.indexOf(`//`)!==-1,n=e.indexOf(`}`)!==-1;if(!t&&!n)return e;if(!t)return Fn(e);let r=e.length,i=``,a=0,o=0,s=0,c=0,l=0,u=!1;for(;o<r;){let t=e.charCodeAt(o);if(t!==34&&t!==39||Pn(e,o)){if(s===0){if(t===xn&&o+1<r&&e.charCodeAt(o+1)===42){for(o+=2;o+1<r&&(e.charCodeAt(o)!==42||e.charCodeAt(o+1)!==xn);)o++;o+=2}else if(t!==40){if(t!==41){if(c>0)o++;else if(t===42&&o+1<r&&e.charCodeAt(o+1)===xn)i+=e.substring(a,o),o+=2,a=o,u=!0;else if(t===xn&&o+1<r&&e.charCodeAt(o+1)===xn){for(i+=e.substring(a,o);o<r&&e.charCodeAt(o)!==10;)o++;a=o,u=!0}else t===123?l++:t===125&&l--,o++}else c>0&&c--,o++}else c++,o++}else o++}else s===0?s=t:s===t&&(s=0),o++}return u?(a<r&&(i+=e.substring(a)),l===0?i:Fn(i)):l===0?e:Fn(e)}(t),d=We(o||a?o+` `+a+` { `+u+` }`:u);return e.namespace&&(d=In(d,e.namespace)),s=[],Xe(d,c),s},u=e,d=Et;for(let e=0;e<t.length;e++)t[e].name||tt(15),d=Dt(d,t[e].name);return u!=null&&u.namespace&&(d=Dt(d,u.namespace)),u!=null&&u.prefix&&(d=Dt(d,`p`)),l.hash=d===Et?``:d.toString(),l}var Rn=new _n,zn=Ln(),Bn=B.createContext({shouldForwardProp:void 0,styleSheet:Rn,stylis:zn,stylisPlugins:void 0});Bn.Consumer;function Vn(){return B.useContext(Bn)}function Hn(e){let t=Vn(),{styleSheet:n}=t,r=B.useMemo(()=>{let t=n;return e.sheet?t=e.sheet:e.target?t=t.reconstructWithOptions(e.nonce===void 0?{target:e.target}:{target:e.target,nonce:e.nonce},!1):e.nonce!==void 0&&(t=t.reconstructWithOptions({nonce:e.nonce})),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:!1})),t},[e.disableCSSOMInjection,e.nonce,e.sheet,e.target,n]),i=B.useMemo(()=>e.stylisPlugins===void 0&&e.namespace===void 0&&e.enableVendorPrefixes===void 0?t.stylis:Ln({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:e.stylisPlugins??t.stylisPlugins}),[e.enableVendorPrefixes,e.namespace,e.stylisPlugins,t.stylis,t.stylisPlugins]),a=`shouldForwardProp`in e?e.shouldForwardProp:t.shouldForwardProp,o=e.stylisPlugins??t.stylisPlugins,s=B.useMemo(()=>({shouldForwardProp:a,styleSheet:r,stylis:i,stylisPlugins:o}),[a,r,i,o]);return B.createElement(Bn.Provider,{value:s},e.children)}var Un=B.createContext(void 0);Un.Consumer;var Wn={};function Gn(e,t){let n=typeof e==`string`?St(e):`sc`;Wn[n]=(Wn[n]||0)+1;let r=n+`-`+kt(at+n+Wn[n]);return t?t+`-`+r:r}function Kn(e,t,n){let r=Yt(e),i=e,a=!jt(e),{attrs:o=_t,componentId:s=Gn(t.displayName,t.parentComponentId),displayName:c=Mt(e)}=t,l=t.displayName&&t.componentId?St(t.displayName)+`-`+t.componentId:t.componentId||s,u=r&&i.attrs?i.attrs.concat(o).filter(Boolean):o,{shouldForwardProp:d}=t;if(r&&i.shouldForwardProp){let e=i.shouldForwardProp;if(t.shouldForwardProp){let n=t.shouldForwardProp;d=(t,r)=>e(t,r)&&n(t,r)}else d=e}let f=new Mn(n,l,r?i.componentStyle:void 0);function p(e,t){return function(e,t,n){let{attrs:r,componentStyle:i,defaultProps:a,foldedComponentIds:o,styledComponentId:s,target:c}=e,l=B.useContext(Un),u=Vn(),d=e.shouldForwardProp||u.shouldForwardProp,f=yt(t,l,a)||vt,[p,m]=function(e,t,n){let r=Object.assign(Object.assign({},t),{className:void 0,theme:n}),i=null,a=e.length>1;for(let t=0;t<e.length;t++){let n=e[t],o=qt(n)?n(a?Object.assign({},r):r):n;for(let e in o)e===`className`?r.className=Xt(r.className,o[e]):e===`style`?r.style=Object.assign(Object.assign({},r.style),o[e]):o[e]===void 0?e in r&&(r[e]!==void 0&&(i||=[]).push(e),r[e]=void 0):r[e]=o[e]}return`className`in t&&typeof t.className==`string`&&(r.className=Xt(r.className,t.className)),[r,i]}(r,t,f),h=i.generateAndInjectStyles(p,u.styleSheet,u.stylis),g=p.as||c,_=jt(g),v=function(e,t,n,r,i,a){let o={};for(let s in e)s[0]===`$`||s===`as`||s===`theme`&&e.theme===n||(s===`forwardedAs`?e.forwardedAs!==void 0&&(o.as=e.forwardedAs):e[s]===void 0?s===`className`||i||a!==null&&a.indexOf(s)!==-1||r&&!r(s,t)||(o[s]=void 0):r&&!r(s,t)||(o[s]=e[s]));return o}(p,g,f,d,_,m),y=Xt(o,s);return h&&(y+=` `+h),p.className&&(y+=` `+p.className),v[_&&g.includes(`-`)?`class`:`className`]=y,n&&(v.ref=n),(0,B.createElement)(g,v)}(m,e,t)}p.displayName=c;let m=B.forwardRef(p);return m.attrs=u,m.componentStyle=f,m.displayName=c,m.shouldForwardProp=d,m.foldedComponentIds=r?Xt(i.foldedComponentIds,i.styledComponentId):``,m.styledComponentId=l,m.target=r?i.target:e,Object.defineProperty(m,"defaultProps",{get(){return this._foldedDefaultProps},set(e){this._foldedDefaultProps=r?function(e,...t){for(let n of t)$t(e,n,!0);return e}({},i.defaultProps,e):e}}),en(m,()=>`.${m.styledComponentId}`),a&&Kt(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}var qn=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`));function Jn(e,t){let n=[e[0]];for(let r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var Yn=e=>(vn.add(e),e);function Xn(e,...t){if(qt(e)||Qt(e))return Yn(An(Jn(_t,[e,...t])));let n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?An(n):Yn(An(Jn(n,t)))}function Zn(e,t,n=vt){if(!t)throw tt(1,t);let r=(r,...i)=>e(t,n,Xn(r,...i));return r.attrs=r=>Zn(e,t,Object.assign(Object.assign({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)})),r.withConfig=r=>Zn(e,t,Object.assign(Object.assign({},n),r)),r}var Qn=e=>Zn(Kn,e),V=Qn;qn.forEach(e=>{V[e]=Qn(e)}),`${nt}`,`${nt}`,`${nt}`;var H={textWhite:`#EDEDED`,textGrey:`#9C9C9C`,textTertiary:`#6B6B6E`,dangerRed:`rgba(243, 151, 143, 1)`,dangerRedPressed:`rgba(240, 97, 84,1)`,accent:`#2D7FF9`,accentInk:`#FFFFFF`,accentGlow:`rgba(45, 127, 249, 0.35)`,panelBackground:`rgba(38, 38, 38, 0.72)`,panelBorder:`rgba(61, 61, 63, 0.7)`,buttonBackground:`rgba(61, 61, 63, 0.6)`,buttonHovered:`rgba(61, 61, 63, 0.8)`,buttonPressed:`rgba(61, 61, 63, 1)`,gradientGrey:`linear-gradient(to bottom, #343434, #393939)`,gradientGreyTranslucent:`linear-gradient(to bottom, rgba(52, 52, 52, 0.75), rgba(57, 57, 57, 0.75))`,gradientLightGreyTranslucent:`linear-gradient(to bottom, rgba(75, 75, 75, 0.75), rgba(80, 80, 80, 0.75))`},$n={height:`30px`,minWidth:`30px`,fontSize:`14px`,radiusMiddle:`3px`,radiusSolo:`10px`,radiusFirst:`10px 3px 3px 10px`,radiusLast:`3px 10px 10px 3px`,widthLong:`70px`,widthShort:`30px`,gap:`3px`},er=V.button`
  background: ${H.gradientGreyTranslucent};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${H.textWhite};
  border: 1px solid transparent;
  border-radius: ${$n.radiusMiddle};
  font-size: ${$n.fontSize};
  height: ${$n.height};
  min-width: ${$n.minWidth};
  transition: all 0.2s ease-in-out;
  text-transform: none;
  box-shadow: none;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    sans-serif;

  &:first-child {
    border-radius: ${({$reverse:e})=>e?$n.radiusLast:$n.radiusFirst};
  }

  &:last-child {
    border-radius: ${({$reverse:e})=>e?$n.radiusFirst:$n.radiusLast};
  }

  &:first-child:last-child {
    border-radius: ${$n.radiusSolo};
  }
`,tr=V.div`
  padding: 4px;
  display: flex;
  gap: 2px;
  background-color: ${H.panelBackground};
  border: 1px solid ${H.panelBorder};
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  box-shadow:
    0 5px 10px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  justify-content: center;
  pointer-events: all;
  border-radius: 14px;
  align-items: center;
`,nr=V.button`
  background-color: ${({$active:e,$open:t})=>e?`rgba(45, 127, 249, 0.18)`:t?`rgba(255, 255, 255, 0.1)`:`transparent`};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({$active:e})=>e?H.accent:H.textWhite};
  border-radius: 8px;
  height: 28px;
  min-width: 28px;
  padding: 0 6px;
  transition: all 0.15s ease-in-out;
  text-transform: none;
  box-shadow: none;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    sans-serif;

  &:hover:not(:disabled) {
    background-color: ${({$active:e,$open:t})=>e?`rgba(45, 127, 249, 0.24)`:t?`rgba(255, 255, 255, 0.14)`:`rgba(255, 255, 255, 0.06)`};
  }

  &:active:not(:disabled) {
    background-color: ${({$active:e,$open:t})=>e?`rgba(45, 127, 249, 0.32)`:t?`rgba(255, 255, 255, 0.18)`:`rgba(255, 255, 255, 0.1)`};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${H.accent};
    outline-offset: 1px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  &:disabled:hover,
  &:disabled:active {
    background-color: transparent;
  }
`,rr=V.div`
  background-color: ${({$pressed:e})=>e?H.buttonPressed:H.buttonBackground};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${H.textWhite};
  border-radius: 8px;
  font-size: 14px;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    sans-serif;
  height: 30px;
  width: 30px;
  transition: all 0.2s ease-in-out;
`,ir=V.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3px;
  margin-bottom: 3px;

  &:last-child {
    margin-bottom: 0;
  }
`,ar=V.div`
  flex: none;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ${H.panelBorder};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  font-size: 9px;
  font-weight: 600;
  color: ${H.textGrey};
`;V.div`
  display: flex;
  align-items: center;
  height: 30px;
  margin-bottom: 3px;
  justify-content: flex-start;
  flex-direction: ${({$reverse:e})=>e?`row-reverse`:`row`};

  &:last-child {
    margin-bottom: 0;
  }
`,V.div`
  display: flex;
  flex-direction: ${({$reverse:e})=>e?`row-reverse`:`row`};
  height: 100%;
  justify-content: space-between;
  align-items: center;
  margin: ${({$reverse:e})=>e?`0 5px 0 0`:`0 0 0 5px`};
  gap: 3px;
`,V.button`
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  pointer-events: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  margin: 0 5px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`,V.div`
  position: absolute;
  background-color: ${H.accent};
  box-shadow: 0 0 8px ${H.accentGlow};
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  pointer-events: auto;
`,V.input.attrs({type:`range`})`
  -webkit-appearance: none;
  appearance: none;
  background: ${H.gradientGreyTranslucent};
  border: none;
  height: 100%;
  width: ${$n.widthLong};
  cursor: pointer;
  margin: 0;
  transition: all 0.2s ease-in-out;
  border-radius: ${({$reverse:e})=>e?$n.radiusFirst:$n.radiusLast};

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 8px;
    height: 30px;
    background-color: ${H.accent};
    border-radius: ${$n.radiusMiddle};
  }

  &::-moz-range-thumb {
    width: 10px;
    height: 30px;
    background-color: ${H.accent};
    border-radius: ${$n.radiusMiddle};
  }

  &::-ms-thumb {
    width: 8px;
    height: 24px;
    background-color: ${H.accent};
    border-radius: ${$n.radiusMiddle};
  }
`,V.div`
  display: flex;
  flex-direction: column;
  align-items: ${({$reverse:e})=>e?`flex-start`:`flex-end`};
  justify-content: center;
  margin: ${({$reverse:e})=>e?`2px -26px 0 0`:`2px 0 0 -26px`};
`,V.div`
  display: flex;
  flex-direction: ${({$reverse:e})=>e?`row-reverse`:`row`};
  align-items: center;
  justify-content: center;
`;var U={labelW:`40px`,fieldW:`52px`,gap:`4px`,rowH:`26px`,cellRadius:`8px`,inset:`rgba(0, 0, 0, 0.25)`,accentSoft:`rgba(45, 127, 249, 0.45)`,accentTint:`rgba(45, 127, 249, 0.18)`},or=V.span`
  flex: none;
  width: ${U.labelW};
  font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  font-size: 10px;
  color: ${H.textGrey};
`,sr=V.div`
  position: fixed;
  padding: 5px;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    sans-serif;
  color: ${H.textWhite};
  pointer-events: all;
  background-color: ${H.panelBackground};
  border: 1px solid ${H.panelBorder};
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 12px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`,cr=V.hr`
  width: ${({$horizontal:e=!0})=>e?`unset`:`1px`};
  height: ${({$horizontal:e=!0})=>e?`1px`:`unset`};
  background-color: ${H.panelBorder};
  margin: 5px 3px;
  border: none;
`,lr=V.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({$isRed:e})=>e?H.dangerRed:H.textWhite};
  font-size: 12px;
  padding: 3px;
  text-transform: none;
  box-shadow: none;

  &:hover {
    color: ${({$isRed:e})=>e?H.dangerRedPressed:`#ffffff`};
  }

  &:active {
    color: ${({$isRed:e})=>e?H.dangerRedPressed:`#ffffff`};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${H.accent};
    outline-offset: 1px;
  }
`,ur=V.div`
  display: flex;
  flex-direction: row;
  gap: ${U.gap};
  height: ${U.rowH};
`,dr=V.input.attrs({type:`text`})`
  width: ${U.fieldW};
  outline: none;
  background: ${U.inset};
  border: 1px solid ${H.panelBorder};
  border-radius: ${U.cellRadius};
  height: ${U.rowH};
  color: ${H.textWhite};
  padding: 0 10px 0 5px;
  box-sizing: border-box;
  font-size: 10px;
  font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;

  &:focus-visible {
    outline: 2px solid ${H.accent};
    outline-offset: 1px;
  }

  &:read-only {
    background: ${U.inset};
    cursor: default;
  }

  &:invalid {
    background-color: ${H.dangerRed};
  }
`,fr=V.span`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${H.textGrey};
  font-size: 10px;
  font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
`,pr=e=>e?.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase();function mr(e,t,n=[]){if(t==null)throw Error(`[lucide]: iconNode is required when icon name is used`);return{name:pr(e),size:24,node:t,...n.length>0?{aliases:n}:{}}}var hr=e=>{let t=``,n=!1;for(let r of e)r===`-`||r===`_`||r<=` `?n=t.length>0:(t.length===0?t+=r.toLowerCase():t+=n?r.toUpperCase():r,n=!1);return t},gr=e=>{let t=hr(e);return t.charAt(0).toUpperCase()+t.slice(1)},_r=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),vr={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":2,"stroke-linecap":`round`,"stroke-linejoin":`round`};function yr(e){return e!=null}function br(e,t={}){let n=t.attributeNames??{},r=e=>n[e]??e,i=e.size??e.width??vr.width,a=e.size??e.height??vr.height,o=e.aliases?.filter(e=>typeof e==`string`&&e.trim()!==``).map(e=>`lucide-${e}`)??[],s=[...e.name?[`lucide-${e.name}`]:[],...o],c=t.className?.split(` `).filter(Boolean)??[],l=t.includeDefaultClasses===!1?_r(...c):_r(`lucide`,...s,...c),u=t.absoluteStrokeWidth?Number(t.strokeWidth??vr[`stroke-width`])*Number(e.size??e.width??vr.width)/Number(t.size??t.width??vr.width):t.strokeWidth??vr[`stroke-width`];return[`svg`,{...Object.entries(vr).reduce((e,[t,n])=>(e[r(t)]=n,e),{}),...`color`in t&&t.color&&{[r(`stroke`)]:t.color},...`size`in t&&yr(t.size)&&{[r(`width`)]:t.size,[r(`height`)]:t.size},...`width`in t&&yr(t.width)&&{[r(`width`)]:t.width},...`height`in t&&yr(t.height)&&{[r(`height`)]:t.height},[r(`stroke-width`)]:u,...l&&{[r(`class`)]:l},[r(`viewBox`)]:`0 0 ${i} ${a}`,...t.hasA11yProp===!1?{[r(`aria-hidden`)]:`true`}:{},...`attributes`in t&&t.attributes},e.node.map(e=>{let[n,i,a]=e,o=t.nonScalingStroke?{[r(`vector-effect`)]:`non-scaling-stroke`,...i}:i;return a?[n,o,a]:[n,o]})]}function xr(e,t={}){return br(e,{...t,attributeNames:{...t.attributeNames,class:`className`,"stroke-width":`strokeWidth`,"stroke-linecap":`strokeLinecap`,"stroke-linejoin":`strokeLinejoin`,"vector-effect":`vectorEffect`}})}var Sr=e=>{for(let t in e)if(t.startsWith(`aria-`)||t===`role`||t===`title`)return!0;return!1},Cr=(0,B.createContext)({}),wr=()=>(0,B.useContext)(Cr),Tr=(0,B.forwardRef)(({color:e,size:t,width:n,height:r,strokeWidth:i,absoluteStrokeWidth:a,nonScalingStroke:o,className:s=``,children:c,iconNode:l=[],icon:u={node:l,aliases:[],size:24},...d},f)=>{let{size:p=24,strokeWidth:m=2,absoluteStrokeWidth:h=!1,nonScalingStroke:g=!1,color:_=`currentColor`,className:v=``}=wr()??{},y=!!c||Sr(d),[b,x,S=[]]=xr(u,{color:e??_,width:n??t??p,height:r??t??p,strokeWidth:i??m,absoluteStrokeWidth:a??h,nonScalingStroke:o??g,className:_r(v,s),hasA11yProp:y,attributes:d});return(0,B.createElement)(b,{ref:f,...x},[...S.map(([e,t])=>(0,B.createElement)(e,t)),...Array.isArray(c)?c:[c]])});function W(e,t=[],n=[]){let r=typeof e==`string`?mr(e,t,n):e,i=(0,B.forwardRef)(({className:e,...t},n)=>(0,B.createElement)(Tr,{ref:n,icon:r,className:e,...t}));return r.name&&(i.displayName=gr(r.name)),i}var Er={name:`armchair`,size:24,node:[[`path`,{d:`M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3`,key:`irtipd`}],[`path`,{d:`M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z`,key:`1qyhux`}],[`path`,{d:`M5 18v2`,key:`ppbyun`}],[`path`,{d:`M19 18v2`,key:`gy7782`}]]};Er.node;var Dr=W(Er),Or={name:`arrow-big-up`,size:24,node:[[`path`,{d:`M9 19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-7.086-7.086a1 1 0 0 0-1.414 0l-7.086 7.086a.707.707 0 0 0 .5 1.207H8a1 1 0 0 1 1 1z`,key:`106j91`}]]};Or.node;var kr=W(Or),Ar={name:`arrow-down`,size:24,node:[[`path`,{d:`M12 5v14`,key:`s699le`}],[`path`,{d:`m19 12-7 7-7-7`,key:`1idqje`}]]};Ar.node;var jr=W(Ar),Mr={name:`arrow-left`,size:24,node:[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]};Mr.node;var Nr=W(Mr),Pr={name:`arrow-right-to-line`,size:24,node:[[`path`,{d:`M17 12H3`,key:`8awo09`}],[`path`,{d:`m11 18 6-6-6-6`,key:`8c2y43`}],[`path`,{d:`M21 5v14`,key:`nzette`}]]};Pr.node;var Fr=W(Pr),Ir={name:`arrow-right`,size:24,node:[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]};Ir.node;var Lr=W(Ir),Rr={name:`arrow-up`,size:24,node:[[`path`,{d:`m5 12 7-7 7 7`,key:`hav0vg`}],[`path`,{d:`M12 19V5`,key:`x0mq9r`}]]};Rr.node;var zr=W(Rr),Br={name:`atom`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`1`,key:`41hilf`}],[`path`,{d:`M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z`,key:`1l2ple`}],[`path`,{d:`M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z`,key:`1wam0m`}]]};Br.node;var Vr=W(Br),Hr={name:`ban`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M4.929 4.929 19.07 19.071`,key:`196cmz`}]]};Hr.node;var Ur=W(Hr),Wr={name:`box`,size:24,node:[[`path`,{d:`M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z`,key:`hh9hay`}],[`path`,{d:`m3.3 7 8.7 5 8.7-5`,key:`g66t2b`}],[`path`,{d:`M12 22V12`,key:`d0xqtd`}]]};Wr.node;var Gr=W(Wr),Kr={name:`bug`,size:24,node:[[`path`,{d:`M12 20v-9`,key:`1qisl0`}],[`path`,{d:`M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z`,key:`uouzyp`}],[`path`,{d:`M14.12 3.88 16 2`,key:`qol33r`}],[`path`,{d:`M21 21a4 4 0 0 0-3.81-4`,key:`1b0z45`}],[`path`,{d:`M21 5a4 4 0 0 1-3.55 3.97`,key:`5cxbf6`}],[`path`,{d:`M22 13h-4`,key:`1jl80f`}],[`path`,{d:`M3 21a4 4 0 0 1 3.81-4`,key:`1fjd4g`}],[`path`,{d:`M3 5a4 4 0 0 0 3.55 3.97`,key:`1d7oge`}],[`path`,{d:`M6 13H2`,key:`82j7cp`}],[`path`,{d:`m8 2 1.88 1.88`,key:`fmnt4t`}],[`path`,{d:`M9 7.13V6a3 3 0 1 1 6 0v1.13`,key:`1vgav8`}]]};Kr.node;var qr=W(Kr),Jr={name:`chevron-left`,size:24,node:[[`path`,{d:`m15 18-6-6 6-6`,key:`1wnfg3`}]]};Jr.node;var Yr=W(Jr),Xr={name:`chevron-right`,size:24,node:[[`path`,{d:`m9 18 6-6-6-6`,key:`mthhwq`}]]};Xr.node;var Zr=W(Xr),Qr={name:`circle-dot`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`1`,key:`41hilf`}],[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}]]};Qr.node;var $r=W(Qr),ei={name:`circle-play`,size:24,node:[[`path`,{d:`M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z`,key:`kmsa83`}],[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}]],aliases:[`play-circle`]};ei.node;var ti=W(ei),ni={name:`circle-x`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m15 9-6 6`,key:`1uzhvr`}],[`path`,{d:`m9 9 6 6`,key:`z0biqf`}]],aliases:[`x-circle`]};ni.node;var ri=W(ni),ii={name:`corner-down-left`,size:24,node:[[`path`,{d:`M20 4v7a4 4 0 0 1-4 4H4`,key:`6o5b7l`}],[`path`,{d:`m9 10-5 5 5 5`,key:`1kshq7`}]]};ii.node;var ai=W(ii),oi={name:`delete`,size:24,node:[[`path`,{d:`M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z`,key:`1yo7s0`}],[`path`,{d:`m12 9 6 6`,key:`anjzzh`}],[`path`,{d:`m18 9-6 6`,key:`1fp51s`}]]};oi.node;var si=W(oi),ci={name:`eye`,size:24,node:[[`path`,{d:`M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0`,key:`1nclc0`}],[`circle`,{cx:`12`,cy:`12`,r:`3`,key:`1v7zrd`}]]};ci.node;var li=W(ci),ui={name:`gamepad-2`,size:24,node:[[`line`,{x1:`6`,x2:`10`,y1:`11`,y2:`11`,key:`1gktln`}],[`line`,{x1:`8`,x2:`8`,y1:`9`,y2:`13`,key:`qnk9ow`}],[`line`,{x1:`15`,x2:`15.01`,y1:`12`,y2:`12`,key:`krot7o`}],[`line`,{x1:`18`,x2:`18.01`,y1:`10`,y2:`10`,key:`1lcuu1`}],[`path`,{d:`M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z`,key:`mfqc10`}]]};ui.node;var di=W(ui),fi={name:`glasses`,size:24,node:[[`circle`,{cx:`6`,cy:`15`,r:`4`,key:`vux9w4`}],[`circle`,{cx:`18`,cy:`15`,r:`4`,key:`18o8ve`}],[`path`,{d:`M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2`,key:`1ag4bs`}],[`path`,{d:`M2.5 13 5 7c.7-1.3 1.4-2 3-2`,key:`1hm1gs`}],[`path`,{d:`M21.5 13 19 7c-.7-1.3-1.5-2-3-2`,key:`1r31ai`}]]};fi.node;var pi=W(fi),mi={name:`hand`,size:24,node:[[`path`,{d:`M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2`,key:`1fvzgz`}],[`path`,{d:`M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2`,key:`1kc0my`}],[`path`,{d:`M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8`,key:`10h0bg`}],[`path`,{d:`M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15`,key:`1s1gnw`}]]};mi.node;var hi=W(mi),gi={name:`keyboard`,size:24,node:[[`path`,{d:`M10 8h.01`,key:`1r9ogq`}],[`path`,{d:`M12 12h.01`,key:`1mp3jc`}],[`path`,{d:`M14 8h.01`,key:`1primd`}],[`path`,{d:`M16 12h.01`,key:`1l6xoz`}],[`path`,{d:`M18 8h.01`,key:`emo2bl`}],[`path`,{d:`M6 8h.01`,key:`x9i8wu`}],[`path`,{d:`M7 16h10`,key:`wp8him`}],[`path`,{d:`M8 12h.01`,key:`czm47f`}],[`rect`,{width:`20`,height:`16`,x:`2`,y:`4`,rx:`2`,key:`18n3k1`}]]};gi.node;var _i=W(gi),vi={name:`layers`,size:24,node:[[`path`,{d:`M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z`,key:`zw3jo`}],[`path`,{d:`M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12`,key:`1wduqc`}],[`path`,{d:`M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17`,key:`kqbvx6`}]],aliases:[`layers-3`]};vi.node;var yi=W(vi),bi={name:`log-out`,size:24,node:[[`path`,{d:`m16 17 5-5-5-5`,key:`1bji2h`}],[`path`,{d:`M21 12H9`,key:`dn1m92`}],[`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`,key:`1uf3rs`}]]};bi.node;var xi=W(bi),Si={name:`mouse-left`,size:24,node:[[`path`,{d:`M12 7.318V10`,key:`17s7lh`}],[`path`,{d:`M5 10v5a7 7 0 0 0 14 0V9c0-3.527-2.608-6.515-6-7`,key:`imk5ea`}],[`circle`,{cx:`7`,cy:`4`,r:`2`,key:`ra7k3`}]]};Si.node;var Ci=W(Si),wi={name:`mouse-right`,size:24,node:[[`path`,{d:`M12 7.318V10`,key:`17s7lh`}],[`path`,{d:`M19 10v5a7 7 0 0 1-14 0V9c0-3.527 2.608-6.515 6-7`,key:`2es5nn`}],[`circle`,{cx:`17`,cy:`4`,r:`2`,key:`y5j2s2`}]]};wi.node;var Ti=W(wi),Ei={name:`mouse`,size:24,node:[[`rect`,{x:`5`,y:`2`,width:`14`,height:`20`,rx:`7`,key:`11ol66`}],[`path`,{d:`M12 6v4`,key:`16clxf`}]]};Ei.node;var Di=W(Ei),Oi={name:`pin`,size:24,node:[[`path`,{d:`M12 17v5`,key:`bb1du9`}],[`path`,{d:`M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z`,key:`1nkz8b`}]]};Oi.node;var ki=W(Oi),Ai={name:`plug`,size:24,node:[[`path`,{d:`M12 22v-5`,key:`1ega77`}],[`path`,{d:`M15 8V2`,key:`18g5xt`}],[`path`,{d:`M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z`,key:`1xoxul`}],[`path`,{d:`M9 8V2`,key:`14iosj`}]]};Ai.node;var ji=W(Ai),Mi={name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]};Mi.node;var Ni=W(Mi),Pi={name:`save`,size:24,node:[[`path`,{d:`M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z`,key:`1c8476`}],[`path`,{d:`M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7`,key:`1ydtos`}],[`path`,{d:`M7 3v4a1 1 0 0 0 1 1h7`,key:`t51u73`}]]};Pi.node;var Fi=W(Pi),Ii={name:`scan-eye`,size:24,node:[[`path`,{d:`M3 7V5a2 2 0 0 1 2-2h2`,key:`aa7l1z`}],[`path`,{d:`M17 3h2a2 2 0 0 1 2 2v2`,key:`4qcy5o`}],[`path`,{d:`M21 17v2a2 2 0 0 1-2 2h-2`,key:`6vwrx8`}],[`path`,{d:`M7 21H5a2 2 0 0 1-2-2v-2`,key:`ioqczr`}],[`circle`,{cx:`12`,cy:`12`,r:`1`,key:`41hilf`}],[`path`,{d:`M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0`,key:`11ak4c`}]]};Ii.node;var Li=W(Ii),Ri={name:`scan`,size:24,node:[[`path`,{d:`M3 7V5a2 2 0 0 1 2-2h2`,key:`aa7l1z`}],[`path`,{d:`M17 3h2a2 2 0 0 1 2 2v2`,key:`4qcy5o`}],[`path`,{d:`M21 17v2a2 2 0 0 1-2 2h-2`,key:`6vwrx8`}],[`path`,{d:`M7 21H5a2 2 0 0 1-2-2v-2`,key:`ioqczr`}]]};Ri.node;var zi=W(Ri),Bi={name:`settings`,size:24,node:[[`path`,{d:`M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915`,key:`1i5ecw`}],[`circle`,{cx:`12`,cy:`12`,r:`3`,key:`1v7zrd`}]]};Bi.node;var Vi=W(Bi),Hi={name:`shapes`,size:24,node:[[`path`,{d:`M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z`,key:`1bo67w`}],[`rect`,{x:`3`,y:`14`,width:`7`,height:`7`,rx:`1`,key:`1bkyp8`}],[`circle`,{cx:`17.5`,cy:`17.5`,r:`3.5`,key:`w3z12y`}]]};Hi.node;var Ui=W(Hi),Wi={name:`video`,size:24,node:[[`path`,{d:`m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5`,key:`ftymec`}],[`rect`,{x:`2`,y:`6`,width:`14`,height:`12`,rx:`2`,key:`158x01`}]]};Wi.node;var Gi=W(Wi),Ki={name:`x`,size:24,node:[[`path`,{d:`M18 6 6 18`,key:`1bl5f8`}],[`path`,{d:`m6 6 12 12`,key:`d8bk6v`}]]};Ki.node;var qi={"rotate-ccw":Ni,"circle-play":ti,"gamepad-2":di,hand:hi,eye:li,keyboard:_i,armchair:Dr,layers:yi,box:Gr,shapes:Ui,save:Fi,scan:zi,"scan-eye":Li,"log-out":xi,atom:Vr,bug:qr,x:W(Ki),settings:Vi,"circle-x":ri,plug:ji,glasses:pi,video:Gi,pin:ki,"circle-dot":$r,"chevron-left":Yr,"chevron-right":Zr,ban:Ur,mouse:Di,"mouse-left":Ci,"mouse-right":Ti,"corner-down-left":ai,"arrow-big-up":kr,"arrow-up":zr,"arrow-down":jr,"arrow-left":Nr,"arrow-right":Lr,"arrow-right-to-line":Fr,delete:si},Ji=({size:e,color:t,style:n})=>(0,z.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:e,height:e,viewBox:`0 0 14 14`,fill:`none`,style:n,children:[(0,z.jsx)(`path`,{fill:t,d:`M10.5 8.367a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8Z`}),(0,z.jsx)(`path`,{fill:t,fillRule:`evenodd`,d:`M0 5.8A2.8 2.8 0 0 1 2.8 3h8.4A2.8 2.8 0 0 1 14 5.8v2.8a2.8 2.8 0 0 1-2.8 2.8H9.526c-.619 0-1.184-.35-1.46-.903l-.108-.214a.933.933 0 0 0-.835-.516h-.246c-.354 0-.677.2-.835.516l-.107.214a1.633 1.633 0 0 1-1.461.903H2.8A2.8 2.8 0 0 1 0 8.6V5.8Zm4.9 1.167a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0Zm8.367-.768a.268.268 0 0 0 .076-.292 2.942 2.942 0 0 0-.187-.407l-.055-.096a3.012 3.012 0 0 0-.262-.37.27.27 0 0 0-.29-.08l-.66.21a2.279 2.279 0 0 0-.522-.302l-.148-.676a.268.268 0 0 0-.215-.211 3.062 3.062 0 0 0-1.008.001.268.268 0 0 0-.215.21l-.148.677a2.28 2.28 0 0 0-.522.301l-.66-.21a.268.268 0 0 0-.29.081c-.096.116-.184.24-.262.37l-.056.096c-.072.13-.135.265-.187.406a.268.268 0 0 0 .076.292l.513.467a2.293 2.293 0 0 0 0 .603l-.513.467a.268.268 0 0 0-.076.291c.052.141.115.276.187.407l.056.096c.078.13.166.253.262.37a.27.27 0 0 0 .29.08l.66-.211c.158.122.333.224.52.3l.149.677a.268.268 0 0 0 .215.211 3.06 3.06 0 0 0 1.007 0 .268.268 0 0 0 .216-.21l.148-.677a2.28 2.28 0 0 0 .521-.301l.66.21c.105.033.22.004.29-.08.097-.117.184-.24.263-.37l.055-.097c.073-.13.135-.265.188-.406a.268.268 0 0 0-.076-.292l-.513-.466a2.299 2.299 0 0 0 0-.602l.513-.467Z`})]}),G=({name:e,size:t=16,color:n=`currentColor`,strokeWidth:r=2,style:i})=>{if(e===`iwer`)return(0,z.jsx)(Ji,{size:t,color:n,style:i});let a=qi[e];return a?(0,z.jsx)(a,{size:t,color:n,strokeWidth:r,style:i}):null},Yi={KeyA:`A`,KeyB:`B`,KeyC:`C`,KeyD:`D`,KeyE:`E`,KeyF:`F`,KeyG:`G`,KeyH:`H`,KeyI:`I`,KeyJ:`J`,KeyK:`K`,KeyL:`L`,KeyM:`M`,KeyN:`N`,KeyO:`O`,KeyP:`P`,KeyQ:`Q`,KeyR:`R`,KeyS:`S`,KeyT:`T`,KeyU:`U`,KeyV:`V`,KeyW:`W`,KeyX:`X`,KeyY:`Y`,KeyZ:`Z`,Digit0:`0`,Digit1:`1`,Digit2:`2`,Digit3:`3`,Digit4:`4`,Digit5:`5`,Digit6:`6`,Digit7:`7`,Digit8:`8`,Digit9:`9`,Tab:(0,z.jsx)(G,{name:`arrow-right-to-line`,size:15}),Backspace:(0,z.jsx)(G,{name:`delete`,size:15}),Enter:(0,z.jsx)(G,{name:`corner-down-left`,size:15}),ShiftLeft:(0,z.jsx)(G,{name:`arrow-big-up`,size:15}),ShiftRight:(0,z.jsx)(G,{name:`arrow-big-up`,size:15}),Space:` `,ArrowUp:(0,z.jsx)(G,{name:`arrow-up`,size:15}),ArrowDown:(0,z.jsx)(G,{name:`arrow-down`,size:15}),ArrowLeft:(0,z.jsx)(G,{name:`arrow-left`,size:15}),ArrowRight:(0,z.jsx)(G,{name:`arrow-right`,size:15}),Semicolon:`;`,Equal:`=`,Comma:`,`,Minus:`-`,Period:`.`,Slash:`/`,Backquote:"`",BracketLeft:`[`,Backslash:`\\`,BracketRight:`]`,Quote:`'`,MouseLeft:(0,z.jsx)(G,{name:`mouse-left`,size:15}),MouseRight:(0,z.jsx)(G,{name:`mouse-right`,size:15})},Xi=e=>{let t,n=new Set,r=(e,r)=>{let i=typeof e==`function`?e(t):e;if(!Object.is(i,t)){let e=t;t=r??(typeof i!=`object`||!i)?i:Object.assign({},t,i),n.forEach(n=>n(t,e))}},i=()=>t,a={setState:r,getState:i,getInitialState:()=>o,subscribe:e=>(n.add(e),()=>n.delete(e))},o=t=e(r,i,a);return a},Zi=(e=>e?Xi(e):Xi),Qi=e=>e;function $i(e,t=Qi){let n=B.useSyncExternalStore(e.subscribe,B.useCallback(()=>t(e.getState()),[e,t]),()=>t(e.getInitialState()));return B.useDebugValue(n),n}var ea=e=>{let t=Zi(e),n=e=>$i(t,e);return Object.assign(n,t),n},ta=(e=>e?ea(e):ea),na=`iwer-prefs`;function ra(e){if(typeof window>`u`||!e)return;let t=window.location.origin===`null`?`*`:window.location.origin;window.postMessage({channel:na,scope:`origin`,patch:e},t)}var ia=null;function aa(){return ia}var oa={thumbstick:`Press`,trigger:`Trig`,squeeze:`Grip`,"x-button":`X`,"y-button":`Y`,"a-button":`A`,"b-button":`B`,thumbrest:`Rest`,pose:`Pose`,pinch:`Pinch`},sa=e=>oa[e]??e,ca={"thumbstick-up":`arrow-up`,"thumbstick-down":`arrow-down`,"thumbstick-left":`arrow-left`,"thumbstick-right":`arrow-right`},la=[`thumbstick-up`,`thumbstick-down`,`thumbstick-left`,`thumbstick-right`,`thumbstick`],ua=[`trigger`,`squeeze`,`a-button`,`b-button`,`x-button`,`y-button`,`thumbrest`,`pose`,`pinch`],da={left:{"thumbstick-up":`KeyW`,"thumbstick-down":`KeyS`,"thumbstick-left":`KeyA`,"thumbstick-right":`KeyD`,thumbstick:`KeyR`,"x-button":`KeyX`,"y-button":`KeyZ`,trigger:`KeyQ`,squeeze:`KeyE`,pinch:`MouseLeft`,pose:`KeyF`},right:{"thumbstick-up":`ArrowUp`,"thumbstick-down":`ArrowDown`,"thumbstick-left":`ArrowLeft`,"thumbstick-right":`ArrowRight`,thumbstick:`Slash`,"a-button":`Enter`,"b-button":`ShiftRight`,trigger:`MouseLeft`,squeeze:`MouseRight`,pinch:`MouseRight`,pose:`Backslash`}},fa=ta(e=>({keyMap:da,bindKey:(t,n,r=`Unmapped`)=>{ra({keymap:{[t]:{[n]:r}}}),e(e=>({keyMap:{...e.keyMap,[t]:{...e.keyMap[t],[n]:r}}}))},resetKeyMap:t=>{let n={...da[t]};ra({keymap:{[t]:n}}),e(e=>({keyMap:{...e.keyMap,[t]:n}}))}})),pa=V.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  background-color: ${U.inset};
  border-radius: ${U.cellRadius};
  margin-bottom: ${U.gap};
  color: ${H.textTertiary};
  font-size: 10px;
  line-height: 1.3;
`,ma=V.div`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${H.textTertiary};
  margin: 4px 0 1px;
`,ha=V.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${U.gap};
  height: ${U.rowH};
  margin-bottom: ${U.gap};
`,ga=V.div`
  flex: none;
  width: ${U.labelW};
  height: ${U.rowH};
  display: flex;
  align-items: center;
  font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  font-size: 10px;
  color: ${H.textGrey};
`,_a=V.button`
  flex: 1 1 auto;
  height: ${U.rowH};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: ${U.cellRadius};
  border: 1px solid
    ${({$listening:e})=>e?H.accent:H.panelBorder};
  background-color: ${({$listening:e})=>e?U.accentTint:H.buttonBackground};
  color: ${({$listening:e})=>e?H.accent:H.textWhite};
  cursor: pointer;
  font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  font-size: 12px;
  transition: all 0.12s ease;

  &:hover {
    background-color: ${({$listening:e})=>e?U.accentTint:H.buttonPressed};
  }
  &:focus {
    outline: none;
  }
`,va=V.button`
  flex: none;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  background-color: transparent;
  color: ${H.textGrey};
  cursor: pointer;
  transition: all 0.12s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.06);
    color: ${H.textWhite};
  }
  &:focus {
    outline: none;
  }
`,ya=V.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  height: ${U.rowH};
  border: none;
  border-radius: ${U.cellRadius};
  background-color: transparent;
  color: ${H.textGrey};
  cursor: pointer;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    sans-serif;
  font-size: 12px;
  transition: all 0.12s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.06);
    color: ${H.textWhite};
  }
  &:focus {
    outline: none;
  }
`,ba=({handedness:e,actions:t})=>{let{keyMap:n,bindKey:r,resetKeyMap:i}=fa(),[a,o]=(0,B.useState)(null);(0,B.useEffect)(()=>{if(!a)return;let t=t=>{Yi[t.code]&&(r(e,a,t.code),o(null))},n=t=>{let n=t.button===0?`MouseLeft`:t.button===2?`MouseRight`:null;n&&Yi[n]&&(r(e,a,n),o(null))},i=e=>e.preventDefault();return window.addEventListener(`keydown`,t),window.addEventListener(`mousedown`,n),window.addEventListener(`contextmenu`,i),()=>{window.removeEventListener(`keydown`,t),window.removeEventListener(`mousedown`,n),window.removeEventListener(`contextmenu`,i)}},[a,e,r]);let s=n[e]??{},c=Object.keys(s).filter(e=>t.includes(e)),l=la.filter(e=>c.includes(e)),u=c.filter(e=>!e.startsWith(`thumbstick`)).sort((e,t)=>ua.indexOf(e)-ua.indexOf(t)),d=t=>{let n=Yi[s[t]];return(0,z.jsxs)(ha,{children:[(0,z.jsx)(ga,{children:ca[t]?(0,z.jsx)(G,{name:ca[t],size:14}):sa(t)}),(0,z.jsx)(_a,{type:`button`,$listening:a===t,onClick:()=>o(a===t?null:t),onContextMenu:e=>e.preventDefault(),title:`Click, then press a key or mouse button`,children:a===t?`press a key…`:n??`—`}),(0,z.jsx)(va,{type:`button`,onClick:()=>r(e,t),onContextMenu:e=>e.preventDefault(),title:`Clear binding`,children:(0,z.jsx)(G,{name:`ban`,size:12})})]},t)};return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(cr,{}),(0,z.jsxs)(pa,{children:[(0,z.jsx)(G,{name:`keyboard`,size:12}),`Click a binding, then press a key or mouse button`]}),l.length>0&&(0,z.jsx)(ma,{children:`Thumbstick`}),l.map(d),u.length>0&&l.length>0&&(0,z.jsx)(ma,{children:`Buttons`}),u.map(d),(0,z.jsx)(cr,{}),(0,z.jsxs)(ya,{type:`button`,onClick:()=>i(e),children:[(0,z.jsx)(G,{name:`rotate-ccw`,size:12}),`Reset to defaults`]})]})},xa=16,Sa=V.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0;
  margin-bottom: ${U.gap};
`,Ca=V.div`
  position: relative;
  flex: none;
  width: ${U.fieldW};
  height: ${U.fieldW};
  border-radius: 50%;
  background-color: ${U.inset};
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`,wa=V.div`
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${H.accent};
  box-shadow: 0 0 8px ${H.accentGlow};
  cursor: grab;
  pointer-events: auto;
`,Ta=V.div`
  display: flex;
  flex-direction: column;
  gap: ${U.gap};
  flex: 1 1 auto;
  /* Joystick occupies column 1 (= label-width's first field). Offset the X/Y
     stack by one grid gap so the fields land exactly in columns 2 and 3,
     lining up with the Position/Rotation fields above. */
  margin-left: ${U.gap};
`,Ea=V.div`
  display: flex;
  gap: ${U.gap};
  align-items: center;
`,Da=V.div`
  position: relative;
  display: inline-block;
  height: ${U.rowH};
`,Oa=V.div`
  flex: 1 1 auto;
  height: ${U.rowH};
  border-radius: ${U.cellRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  font-size: 11px;
  color: ${H.textWhite};
  background-color: ${({$active:e})=>e?U.accentTint:U.inset};
  transition: background-color 0.12s ease;
`,ka=V.button`
  flex: none;
  width: 22px;
  height: ${U.rowH};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${({$active:e})=>e?U.accentTint:`transparent`};
  color: ${({$active:e})=>e?H.accent:H.textGrey};

  &:hover {
    background-color: rgba(255, 255, 255, 0.06);
  }
  &:focus {
    outline: none;
  }
`,Aa=V.div`
  flex: none;
  display: flex;
  align-items: center;
  gap: ${U.gap};
  margin-left: ${U.gap};
`,ja=({xrController:e,pointerLocked:t,buttonId:n,mappedKeyUp:r,mappedKeyDown:i,mappedKeyLeft:a,mappedKeyRight:o,mappedKeyPressed:s})=>{let c=(0,B.useRef)(null),l=(0,B.useRef)({x:0,y:0}),u=(0,B.useRef)(!1),[d,f]=(0,B.useState)({x:0,y:0}),[p,m]=(0,B.useState)(!1),[h,g]=(0,B.useState)(!1),_=(0,B.useRef)(!1);_.current=h;let[v,y]=(0,B.useState)(!1),[b,x]=(0,B.useState)({up:!1,down:!1,left:!1,right:!1,pressed:!1}),S=(0,B.useRef)(b);return S.current=b,(0,B.useEffect)(()=>{let t=t=>{if(!u.current||!c.current)return;let r=t.clientX-l.current.x,i=t.clientY-l.current.y,a=Math.sqrt(r*r+i*i),o=r,s=i;if(a>xa){let e=Math.atan2(i,r);o=Math.cos(e)*xa,s=Math.sin(e)*xa}c.current.style.transform=`translate(${o}px, ${s}px)`;let d=o/xa,p=s/xa;e.updateAxes(n,d,p),f({x:d,y:p})},r=()=>{u.current&&(u.current=!1,c.current&&(c.current.style.transform=`translate(0, 0)`),e.updateAxes(n,0,0),f({x:0,y:0}))};return document.addEventListener(`mousemove`,t),document.addEventListener(`mouseup`,r),()=>{document.removeEventListener(`mousemove`,t),document.removeEventListener(`mouseup`,r)}},[n,e]),(0,B.useEffect)(()=>{let t=()=>{p&&!_.current&&(m(!1),e.updateButtonValue(n,0))};return window.addEventListener(`mouseup`,t),()=>window.removeEventListener(`mouseup`,t)},[p,n,e]),(0,B.useEffect)(()=>{if(!t)return;let c=t=>{let r=+!!t.right-!!t.left,i=+!!t.down-!!t.up,a=Math.sqrt(r*r+i*i);a===0?e.updateAxes(n,0,0):e.updateAxes(n,r/a,i/a)},l=(t,l)=>{if(!t)return;let u={...S.current},d=!1;t===r&&(u.up=l,d=!0),t===i&&(u.down=l,d=!0),t===a&&(u.left=l,d=!0),t===o&&(u.right=l,d=!0),t===s&&(u.pressed=l,d=!0,e.updateButtonValue(n,+!!l)),d&&(x(u),c(u))},u=e=>e.button===0?`MouseLeft`:e.button===2?`MouseRight`:null,d=e=>l(e.code,!0),f=e=>l(e.code,!1),p=e=>l(u(e),!0),m=e=>l(u(e),!1);return window.addEventListener(`keydown`,d),window.addEventListener(`keyup`,f),window.addEventListener(`mousedown`,p),window.addEventListener(`mouseup`,m),()=>{window.removeEventListener(`keydown`,d),window.removeEventListener(`keyup`,f),window.removeEventListener(`mousedown`,p),window.removeEventListener(`mouseup`,m)}},[t,r,i,a,o,s,n,e]),t?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(ir,{children:[(0,z.jsx)(ar,{children:`Stick`}),(0,z.jsx)(rr,{$pressed:b.up,children:Yi[r]}),(0,z.jsx)(rr,{$pressed:b.pressed,children:Yi[s]})]}),(0,z.jsxs)(ir,{children:[(0,z.jsx)(rr,{$pressed:b.left,children:Yi[a]}),(0,z.jsx)(rr,{$pressed:b.down,children:Yi[i]}),(0,z.jsx)(rr,{$pressed:b.right,children:Yi[o]})]})]}):(0,z.jsxs)(Sa,{children:[(0,z.jsx)(or,{children:`Stick`}),(0,z.jsx)(Ca,{children:(0,z.jsx)(wa,{ref:c,onMouseDown:e=>{let t=c.current;if(!t)return;let n=t.getBoundingClientRect();l.current={x:n.left+n.width/2,y:n.top+n.height/2},u.current=!0,e.preventDefault()}})}),(0,z.jsxs)(Ta,{children:[(0,z.jsxs)(Ea,{children:[(0,z.jsxs)(Da,{children:[(0,z.jsx)(dr,{readOnly:!0,value:d.x.toFixed(2)}),(0,z.jsx)(fr,{children:`X`})]}),(0,z.jsxs)(Da,{children:[(0,z.jsx)(dr,{readOnly:!0,value:d.y.toFixed(2)}),(0,z.jsx)(fr,{children:`Y`})]})]}),(0,z.jsxs)(Ea,{style:{gap:0},children:[(0,z.jsx)(Oa,{$active:p||h,onMouseDown:()=>{h||(m(!0),e.updateButtonValue(n,1))},children:`click`}),(0,z.jsxs)(Aa,{children:[(0,z.jsx)(ka,{$active:h,onClick:()=>{let t=!h;g(t),m(t),e.updateButtonValue(n,+!!t)},type:`button`,title:`Hold (latch)`,children:(0,z.jsx)(G,{name:`pin`,size:12})}),(0,z.jsx)(ka,{$active:v,onClick:()=>{let t=!v;y(t),e.updateButtonTouch(n,t)},type:`button`,title:`Toggle touch state`,children:(0,z.jsx)(G,{name:`circle-dot`,size:12})})]})]})]})]})},Ma=V.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
  height: ${U.rowH};
  margin-bottom: ${U.gap};

  &:last-child {
    margin-bottom: 0;
  }
`,Na=V.div`
  flex: none;
  display: flex;
  align-items: center;
  gap: ${U.gap};
  margin-left: ${U.gap};
`,Pa=V.div`
  position: relative;
  flex: 1 1 auto;
  height: ${U.rowH};
  border-radius: ${U.cellRadius};
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  user-select: none;
  background-color: ${({$active:e})=>e?U.accentTint:U.inset};
  transition: background-color 0.12s ease;
`,Fa=V.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: ${U.accentSoft};
  pointer-events: none;
`,Ia=V.span`
  position: relative;
  z-index: 1;
  font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  font-size: 11px;
  color: ${H.textWhite};
  pointer-events: none;
`,La=V.button`
  flex: none;
  width: 22px;
  height: ${U.rowH};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${({$active:e})=>e?U.accentTint:`transparent`};
  color: ${({$active:e})=>e?H.accent:H.textGrey};
  transition: all 0.12s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.06);
  }
  &:focus {
    outline: none;
  }
`,Ra=({label:e,analog:t,supportsTouch:n,mappedKey:r,pointerLocked:i,onValue:a,onTouch:o})=>{let[s,c]=(0,B.useState)(0),[l,u]=(0,B.useState)(!1),[d,f]=(0,B.useState)(!1),[p,m]=(0,B.useState)(!1),h=(0,B.useRef)(null),g=(0,B.useRef)(!1),_=(0,B.useRef)(!1);_.current=l;let v=e=>{let t=Math.min(1,Math.max(0,e));c(t),a(t)};(0,B.useEffect)(()=>{if(!i)return;let e=e=>{a(+!!e),m(e)},t=e=>r===`MouseLeft`&&e.button===0||r===`MouseRight`&&e.button===2,n=t=>{t.code===r&&e(!0)},o=t=>{t.code===r&&e(!1)},s=n=>{t(n)&&e(!0)},c=n=>{t(n)&&e(!1)};return window.addEventListener(`keydown`,n),window.addEventListener(`keyup`,o),window.addEventListener(`mousedown`,s),window.addEventListener(`mouseup`,c),()=>{window.removeEventListener(`keydown`,n),window.removeEventListener(`keyup`,o),window.removeEventListener(`mousedown`,s),window.removeEventListener(`mouseup`,c)}},[r,i,a]),(0,B.useEffect)(()=>{let e=e=>{if(!g.current||!t||!h.current)return;let n=h.current.getBoundingClientRect();v((e.clientX-n.left)/n.width)},n=()=>{g.current&&(g.current=!1,_.current||v(0))};return window.addEventListener(`mousemove`,e),window.addEventListener(`mouseup`,n),()=>{window.removeEventListener(`mousemove`,e),window.removeEventListener(`mouseup`,n)}},[t]);let y=()=>{l||(g.current=!0,v(1))},b=()=>{let e=!l;u(e),v(e?s>0?s:1:0)},x=()=>{let e=!d;f(e),o?.(e)};if(i)return(0,z.jsxs)(ir,{children:[(0,z.jsx)(ar,{children:e}),(0,z.jsx)(rr,{$pressed:p,children:Yi[r]})]});let S=t?s.toFixed(2):l?`hold`:`press`;return(0,z.jsxs)(Ma,{children:[(0,z.jsx)(or,{children:e}),(0,z.jsxs)(Pa,{ref:h,$active:!t&&s>0,onMouseDown:y,title:`Click to press; drag to set value`,children:[t&&(0,z.jsx)(Fa,{style:{width:`${s*100}%`}}),(0,z.jsx)(Ia,{children:S})]}),(0,z.jsxs)(Na,{children:[(0,z.jsx)(La,{$active:l,onClick:b,title:`Hold (latch)`,type:`button`,children:(0,z.jsx)(G,{name:`pin`,size:12})}),n&&(0,z.jsx)(La,{$active:d,onClick:x,title:`Toggle touch state`,type:`button`,children:(0,z.jsx)(G,{name:`circle-dot`,size:12})})]})]})};function za(e,t){let n=10**t;return Math.round(e*n)/n}var Ba=V.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({$mb:e})=>e??`0`};
`,Va=V.div`
  position: relative;
  display: inline-block;
  height: 26px;
`,Ha=({vector:e,label:t=``,multiplier:n=1,precision:r=2,onValidInput:i=()=>{},marginBottom:a=`0`})=>{let[o,s]=(0,B.useState)({x:(e.x/n).toFixed(r),y:(e.y/n).toFixed(r),z:(e.z/n).toFixed(r)}),c=(0,B.useRef)({x:za(e.x/n,r),y:za(e.y/n,r),z:za(e.z/n,r)}),l=(0,B.useRef)(null),u=(0,B.useRef)({x:0,y:0,z:0}),d=()=>{let t=u.current;t.x=za(e.x/n,r),t.y=za(e.y/n,r),t.z=za(e.z/n,r);let{x:i,y:a,z:o}=c.current;(t.x!==i||t.y!==a||t.z!==o)&&(c.current={x:t.x,y:t.y,z:t.z},s({x:t.x.toFixed(r),y:t.y.toFixed(r),z:t.z.toFixed(r)})),l.current=requestAnimationFrame(d)};(0,B.useEffect)(()=>(l.current=requestAnimationFrame(d),()=>{l.current&&cancelAnimationFrame(l.current)}),[e,n,r]);let f=t=>r=>{let a=r.target.value,o=parseFloat(a);s(e=>({...e,[t]:a})),isNaN(o)||(c.current[t]=o,e[t]=o*n,i())};return(0,z.jsxs)(Ba,{$mb:a,children:[(0,z.jsx)(or,{children:t}),(0,z.jsx)(ur,{children:[`x`,`y`,`z`].map(e=>(0,z.jsxs)(Va,{children:[(0,z.jsx)(dr,{value:o[e],onChange:f(e),className:parseFloat(o[e])===c.current[e]?void 0:`invalid`}),(0,z.jsx)(fr,{children:e.toUpperCase()})]},`${t}-${e}`))})]})},Ua={thumbstick:`Stick`,trigger:`Trig`,squeeze:`Grip`,"a-button":`A`,"b-button":`B`,"x-button":`X`,"y-button":`Y`,thumbrest:`Rest`,menu:`Menu`};function Wa(e){return Ua[e]?Ua[e]:e.charAt(0).toUpperCase()+e.slice(1).replace(/-button$/,``)}function Ga(e){let t=new Set;for(let n of e.axes)n&&n.id&&t.add(n.id);let n=e.buttons.filter(e=>e!==null).map(e=>({id:e.id,type:e.type,hasAxes:t.has(e.id)}));return n.sort((e,t)=>e.hasAxes&&!t.hasAxes?-1:!e.hasAxes&&t.hasAxes?1:0),n}var Ka=({controller:e,handle:t,handedness:n,pointerLocked:r})=>{let{keyMap:i}=fa(),[a,o]=B.useState(e.connected),[s,c]=B.useState(!1),l=Ga(e.gamepadConfig),u=l.flatMap(e=>e.hasAxes?[`${e.id}-left`,`${e.id}-right`,`${e.id}-up`,`${e.id}-down`,e.id]:e.id);return B.useEffect(()=>{r&&c(!1)},[r]),(0,z.jsxs)(sr,{style:n===`left`?{left:`8px`,bottom:`8px`}:{right:`8px`,bottom:`8px`},children:[!r&&(0,z.jsxs)(`div`,{style:{display:`flex`,flexDirection:`row`,justifyContent:`space-between`,alignItems:`center`},children:[(0,z.jsxs)(`div`,{style:{fontSize:`14px`,fontWeight:600,display:`flex`,flexDirection:`row`,alignItems:`center`,gap:`6px`},children:[(0,z.jsx)(G,{name:`gamepad-2`,size:15}),`Controller [`,n===`left`?`L`:`R`,`]`]}),(0,z.jsx)(`div`,{style:{display:`flex`,flexDirection:`row`,gap:`1px`},children:a?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(lr,{title:`Click to ${s?`close`:`change`} key bindings`,onClick:()=>c(!s),children:(0,z.jsx)(G,{name:`settings`,size:14})}),(0,z.jsx)(lr,{title:`Click to disconnect ${n} controller`,$isRed:!0,onClick:()=>{e.connected=!1,o(!1)},children:(0,z.jsx)(G,{name:`circle-x`,size:14})})]}):(0,z.jsx)(lr,{title:`Click to reconnect ${n} controller`,onClick:()=>{e.connected=!0,o(!0)},style:{marginLeft:`5px`},children:(0,z.jsx)(G,{name:`plug`,size:14})})})]}),a&&!r&&(0,z.jsxs)(z.Fragment,{children:[!s&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(cr,{}),(0,z.jsx)(Ha,{vector:t.position,label:`Pos`,marginBottom:U.gap}),(0,z.jsx)(Ha,{vector:t.rotation,label:`Rot`})]}),(0,z.jsx)(cr,{})]}),a&&(s?(0,z.jsx)(ba,{handedness:n,actions:u}):l.map(t=>{let a=i[n];return t.hasAxes?(0,z.jsx)(ja,{xrController:e,pointerLocked:r,buttonId:t.id,mappedKeyUp:a[`${t.id}-up`],mappedKeyDown:a[`${t.id}-down`],mappedKeyLeft:a[`${t.id}-left`],mappedKeyRight:a[`${t.id}-right`],mappedKeyPressed:a[t.id]},t.id):(0,z.jsx)(Ra,{label:Wa(t.id),analog:t.type===`analog`,supportsTouch:!0,mappedKey:a[t.id],pointerLocked:r,onValue:n=>e.updateButtonValue(t.id,n),onTouch:n=>e.updateButtonTouch(t.id,n)},t.id)}))]},n)},qa=[`default`,`point`,`fist`,`open`,`thumbs-up`];function Ja(e){let t=qa.filter(t=>e.includes(t));return t.length>0?t:[...e]}function Ya(e,t,n){let r=Ja(t),i=r.indexOf(e);return i===-1?n>0?r[0]:r[r.length-1]:r[(i+r.length+n)%r.length]}function Xa(e,t){return Object.keys(t).length>0?`${e}*`:e}var Za=V.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
  height: ${U.rowH};
  margin-bottom: ${U.gap};
`,Qa=V.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${U.gap};
  height: ${U.rowH};
`,$a=V.button`
  flex: none;
  width: 22px;
  height: ${U.rowH};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${U.inset};
  color: ${H.textGrey};

  &:hover {
    color: ${H.textWhite};
  }
  &:focus {
    outline: none;
  }
`,eo=V.div`
  flex: 1 1 auto;
  height: ${U.rowH};
  border-radius: ${U.cellRadius};
  background-color: ${U.inset};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: ${H.textWhite};
`,to=({xrDevice:e,hand:t,pointerLocked:n,mappedKey:r})=>{let i=()=>Xa(t.poseId,t.fingerPoses),[a,o]=(0,B.useState)(i),[s,c]=(0,B.useState)(!1);(0,B.useEffect)(()=>{let t=()=>o(i());return t(),e.onStateChange(t)},[e,t]);let l=t.inputSource.handedness,u=e=>{let n=Ya(t.poseId,t.poseIds,e);t.poseId=n,o(i()),ra({handPoses:{[l]:n}})};return(0,B.useEffect)(()=>{let e=e=>r===`MouseLeft`&&e.button===0||r===`MouseRight`&&e.button===2,t=e=>{e.repeat||e.code===r&&(u(1),c(!0))},i=e=>{e.code===r&&c(!1)},a=t=>{e(t)&&(u(1),c(!0))},o=t=>{e(t)&&c(!1)};return n&&(window.addEventListener(`keydown`,t),window.addEventListener(`keyup`,i),window.addEventListener(`mousedown`,a),window.addEventListener(`mouseup`,o)),()=>{window.removeEventListener(`keydown`,t),window.removeEventListener(`keyup`,i),window.removeEventListener(`mousedown`,a),window.removeEventListener(`mouseup`,o)}},[r,n,t]),n?(0,z.jsxs)(ir,{children:[(0,z.jsx)(ar,{children:`Pose`}),(0,z.jsx)(rr,{$pressed:s,children:Yi[r]})]}):(0,z.jsxs)(Za,{children:[(0,z.jsx)(or,{children:`Pose`}),(0,z.jsxs)(Qa,{children:[(0,z.jsx)($a,{type:`button`,onClick:()=>u(-1),title:`Previous pose`,children:(0,z.jsx)(G,{name:`chevron-left`,size:14})}),(0,z.jsx)(eo,{children:a}),(0,z.jsx)($a,{type:`button`,onClick:()=>u(1),title:`Next pose`,children:(0,z.jsx)(G,{name:`chevron-right`,size:14})})]})]})},no=({xrDevice:e,hand:t,handle:n,handedness:r,pointerLocked:i})=>{let{keyMap:a}=fa(),[o,s]=B.useState(t.connected),[c,l]=B.useState(!1);return B.useEffect(()=>{i&&l(!1)},[i]),(0,z.jsxs)(sr,{style:r===`left`?{left:`8px`,bottom:`8px`}:{right:`8px`,bottom:`8px`},children:[!i&&(0,z.jsxs)(`div`,{style:{display:`flex`,flexDirection:`row`,justifyContent:`space-between`,alignItems:`center`},children:[(0,z.jsxs)(`div`,{style:{fontSize:`14px`,fontWeight:600,display:`flex`,flexDirection:`row`,alignItems:`center`,gap:`6px`},children:[(0,z.jsx)(G,{name:`hand`,size:15}),`Hand [`,r===`left`?`L`:`R`,`]`]}),(0,z.jsx)(`div`,{style:{display:`flex`,flexDirection:`row`,gap:`1px`},children:o?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(lr,{title:`Click to ${c?`close`:`change`} key bindings`,onClick:()=>l(!c),children:(0,z.jsx)(G,{name:`settings`,size:14})}),(0,z.jsx)(lr,{title:`Click to disconnect ${r} hand`,$isRed:!0,onClick:()=>{t.connected=!1,s(!1)},children:(0,z.jsx)(G,{name:`circle-x`,size:14})})]}):(0,z.jsx)(lr,{title:`Click to reconnect ${r} hand`,onClick:()=>{t.connected=!0,s(!0)},style:{marginLeft:`5px`},children:(0,z.jsx)(G,{name:`plug`,size:14})})})]}),o&&!i&&(0,z.jsxs)(z.Fragment,{children:[!c&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(cr,{}),(0,z.jsx)(Ha,{vector:n.position,label:`Pos`,marginBottom:U.gap}),(0,z.jsx)(Ha,{vector:n.rotation,label:`Rot`})]}),(0,z.jsx)(cr,{})]}),o&&(c?(0,z.jsx)(ba,{handedness:r,actions:[`pose`,`pinch`]}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(to,{xrDevice:e,hand:t,pointerLocked:i,mappedKey:a[r].pose}),(0,z.jsx)(Ra,{label:`Pinch`,analog:!0,supportsTouch:!1,mappedKey:a[r].pinch,pointerLocked:i,onValue:e=>t.updatePinchValue(e)})]}))]},r)},ro=ta(e=>({inputMode:`controller`,setInputMode:t=>e(()=>({inputMode:t}))})),io=({xrDevice:e,inputLayer:t,pointerLocked:n})=>{let r=ro(e=>e.inputMode);return(0,z.jsx)(z.Fragment,{children:r===`controller`?Object.entries(e.controllers).map(([e,r])=>(0,z.jsx)(Ka,{controller:r,handle:t.transformHandles.get(e),handedness:e,pointerLocked:n},`controller-${e}`)):Object.entries(e.hands).map(([r,i])=>(0,z.jsx)(no,{xrDevice:e,hand:i,handle:t.transformHandles.get(r),handedness:r,pointerLocked:n},`hand-${r}`))})},ao=ta(e=>({mode:`off`,commitHand:`right`,setMode:t=>e({mode:t}),setCommitHand:t=>e({commitHand:t})}));function oo(e,t,n,r,i){if(n.width<=0||n.height<=0)return[0,0,-1];let a=r?n.width/2:n.width,o=e-n.left,s=(r&&o>=a?o-a:o)/a*2-1,c=1-(t-n.top)/n.height*2,l=Math.tan(i/2),u=s*(a/n.height)*l,d=c*l,f=Math.hypot(u,d,-1);return[u/f,d/f,-1/f]}var so=V.td`
  text-align: right;
  color: ${H.textWhite};
  padding: 0 8px 0 0;
  font-weight: bold;
`,co=V.td`
  text-align: left;
  color: ${H.textGrey};
  padding: 0;
`,lo=248,uo=V(sr)`
  position: absolute;
  top: calc(100% + 8px);
  left: ${({$left:e})=>`${e}px`};
  width: ${lo}px;
  box-sizing: border-box;
  gap: ${$n.gap};
  padding: 8px;
  overflow: visible;
  z-index: 10;
`,fo=V.div`
  min-height: 26px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 2px 4px;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${H.accent};
    outline-offset: 1px;
    border-radius: ${U.cellRadius};
  }
`,po=V.strong`
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
`,mo=V.button`
  width: 100%;
  min-height: 42px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr) 16px;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border: 1px solid
    ${({$selected:e})=>e?U.accentSoft:`rgba(255, 255, 255, 0.04)`};
  border-radius: ${U.cellRadius};
  background: ${({$selected:e})=>e?U.accentTint:`transparent`};
  color: ${({$selected:e,$unavailable:t})=>t?H.textGrey:e?H.accent:H.textWhite};
  cursor: ${({$unavailable:e})=>e?`default`:`pointer`};
  text-align: left;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    sans-serif;
  &:hover {
    background: ${({$selected:e,$unavailable:t})=>t?e?U.accentTint:`transparent`:e?`rgba(45, 127, 249, 0.24)`:`rgba(255, 255, 255, 0.07)`};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${H.accent};
    outline-offset: 1px;
  }
`,ho=V.span`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
`,go=V.span`
  font-size: 12px;
  font-weight: 600;
  line-height: 15px;
`,_o=V.span`
  color: ${H.textGrey};
  font-size: 10px;
  font-weight: 400;
  line-height: 13px;
`,vo=V.div`
  padding: 5px 2px 3px;
  color: ${H.textGrey};
  font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`,yo=V.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 2px;
  padding: 2px;
  border-radius: ${U.cellRadius};
  background: ${({$unavailable:e})=>e?`rgba(20, 20, 22, 0.42)`:U.inset};
`,bo=V.button`
  height: ${U.rowH};
  min-width: 0;
  padding: 0 6px;
  overflow: hidden;
  border: 1px solid
    ${({$selected:e,$unavailable:t})=>e?t?`rgba(255, 255, 255, 0.08)`:U.accentSoft:`transparent`};
  border-radius: 6px;
  background: ${({$selected:e,$unavailable:t})=>e?t?`rgba(255, 255, 255, 0.04)`:U.accentTint:`transparent`};
  color: ${({$selected:e,$unavailable:t})=>t?H.textGrey:e?H.accent:H.textGrey};
  cursor: ${({$unavailable:e})=>e?`not-allowed`:`pointer`};
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    sans-serif;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  &:hover {
    color: ${({$unavailable:e})=>e?H.textGrey:H.textWhite};
    background: ${({$selected:e,$unavailable:t})=>t?e?`rgba(255, 255, 255, 0.04)`:`transparent`:e?`rgba(45, 127, 249, 0.24)`:`rgba(255, 255, 255, 0.06)`};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${H.accent};
    outline-offset: 1px;
  }
`,xo=V.div`
  display: grid;
  grid-template-columns: 8px minmax(0, 1fr);
  align-items: start;
  gap: 7px;
  padding: 7px 8px;
  border-radius: ${U.cellRadius};
  background: ${U.inset};
  color: ${H.textGrey};
  font-size: 10px;
  line-height: 14px;
`,So=V.span`
  width: 6px;
  height: 6px;
  margin-top: 4px;
  border-radius: 50%;
  background: ${({$tone:e})=>e===`active`?H.accent:e===`error`?H.dangerRed:H.textGrey};
  box-shadow: ${({$tone:e})=>e===`active`?`0 0 6px ${H.accentGlow}`:`none`};
`,Co=V.div`
  display: grid;
  gap: 4px;
  padding: 2px;
`,wo=V.div`
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  align-items: center;
  gap: 7px;
  color: ${H.textGrey};
  font-size: 10px;
  line-height: 13px;

  > :first-child {
    justify-self: center;
  }
`,To=V.span`
  min-width: 20px;
  box-sizing: border-box;
  padding: 2px 4px;
  border: 1px solid ${H.panelBorder};
  border-radius: 5px;
  color: ${H.textWhite};
  font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  font-size: 10px;
  text-align: center;
`;function Eo(t){let n=t.activeSession;return{supported:e(t.supportedFeatures),sessionActive:n!=null,negotiated:!!n?.enabledFeatures.some(e=>e===`gaze-tracking`||e===`eye-tracking`),connected:!!t.gaze?.connected}}function Do(e){let[t,n]=B.useState(()=>Eo(e));return B.useEffect(()=>{let t=()=>{let t=Eo(e);n(e=>e.supported===t.supported&&e.sessionActive===t.sessionActive&&e.negotiated===t.negotiated&&e.connected===t.connected?e:t)};t();let r=window.setInterval(t,500);return()=>window.clearInterval(r)},[e]),t}function Oo(e,t){let[n,r]=B.useState(0);return B.useLayoutEffect(()=>{if(!e)return;let n=()=>{let e=t.current,n=e?.offsetParent;if(!e||!n)return;let i=e.getBoundingClientRect(),a=n.getBoundingClientRect(),o=Math.max(8,Math.min(i.left+i.width/2-lo/2,window.innerWidth-lo-8));r(o-a.left)};return n(),window.addEventListener(`resize`,n),()=>window.removeEventListener(`resize`,n)},[e,t]),n}function ko(e,t){B.useEffect(()=>{if(!e)return;let n=window.requestAnimationFrame(()=>{var e;let n=t.current,r=n?.querySelector(`[data-autofocus="true"]`),i=n?.querySelector(`button:not([disabled]), input:not([disabled])`);(e=r??i)==null||e.focus()});return()=>window.cancelAnimationFrame(n)},[e,t])}var Ao=[`meeting_room`,`living_room`,`music_room`,`office_large`,`office_small`];function jo(e){let t=e.sem,n=t?.environments??Ao,r=n.filter(e=>(t?.environmentInfo)?.call(t,e)?.kind===`legacy-scan`),i=n.filter(e=>!r.includes(e));return!i.length||!r.length?[{label:void 0,ids:n}]:[{label:void 0,ids:i},{label:`Legacy scans`,ids:r}]}var Mo=V.div`
  color: ${H.textGrey};
  font-size: 10px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 8px 10px 2px;
`,No=ta(e=>({infoPanelOpen:!1,envDropDownOpen:!1,headsetOpen:!1,inputMenuOpen:!1,gazePanelOpen:!1,setInfoPanelOpen:t=>e(()=>({infoPanelOpen:t})),setEnvDropDownOpen:t=>e(()=>({envDropDownOpen:t})),setHeadsetOpen:t=>e(()=>({headsetOpen:t})),setInputMenuOpen:t=>e(()=>({inputMenuOpen:t})),setGazePanelOpen:t=>e(()=>({gazePanelOpen:t}))}));function Po(e){return e.split(`_`).map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(` `)}var Fo=[{value:`off`,label:`Off`},{value:`cursor`,label:`Cursor`},{value:`head-locked`,label:`Head`}],K=[{value:`left`,label:`Left`},{value:`right`,label:`Right`}],Io=({xrDevice:e,inputLayer:t})=>{let[n,r]=B.useState(!!e.sem?.planesVisible),[i,a]=B.useState(!!e.sem?.boundingBoxesVisible),[o,s]=B.useState(!!e.sem?.meshesVisible),c=e.visibilityMask!==void 0,[l,u]=B.useState(e.visibilityMaskEnabled),{inputMode:d,setInputMode:f}=ro(),p=ao(e=>e.mode),m=ao(e=>e.setMode),h=ao(e=>e.commitHand),g=ao(e=>e.setCommitHand),_=Do(e),v=B.useRef(null),y=B.useRef(null),b=B.useRef(null),x=B.useRef(null),S=B.useRef(null),C=B.useRef(null),w=B.useRef(null),T=B.useRef(null),E=B.useRef(null),{infoPanelOpen:D,setInfoPanelOpen:O,envDropDownOpen:k,setEnvDropDownOpen:A,headsetOpen:ee,setHeadsetOpen:te,inputMenuOpen:ne,setInputMenuOpen:j,gazePanelOpen:re,setGazePanelOpen:M}=No(),ie=Oo(ne,y),ae=Oo(re,b),oe=Oo(ee,x),se=Oo(k,S);ko(ne,C),ko(re,w),ko(ee,T),ko(k,E),B.useEffect(()=>{if(!(ne||re||ee||k))return;let e=()=>{j(!1),M(!1),te(!1),A(!1)},t=t=>{let n=v.current;n&&t.composedPath().includes(n)||e()},n=t=>{if(t.key!==`Escape`)return;let n=!!(v.current&&t.composedPath().includes(v.current)),r=ne?y.current:re?b.current:ee?x.current:S.current;e(),n&&r?.focus()};return document.addEventListener(`pointerdown`,t,!0),document.addEventListener(`keydown`,n),()=>{document.removeEventListener(`pointerdown`,t,!0),document.removeEventListener(`keydown`,n)}},[k,re,ee,ne,A,M,te,j]);let ce=p===`off`?d:d===`hand`&&p===`cursor`?`gaze-hands`:null,le=p!==`off`&&_.sessionActive&&_.negotiated&&_.connected?`active`:p!==`off`&&_.sessionActive&&_.negotiated&&!_.connected?`error`:`idle`,ue=_.supported?p===`off`?`Off · the app receives no gaze input`:_.sessionActive?_.negotiated?_.connected?`Streaming to the XR session`:`Source disconnected · far rays are active`:`Session didn't request gaze-tracking`:`Ready · enter XR to publish gaze`:`No eye tracking on this profile · choose a gaze-capable device`,de=e=>{t.setGazeMode(e),m(t.currentGazeMode),ra({gazeMode:e})},fe=e=>{t.setGazeCommitHand(e),g(e),ra({gazeCommitHand:e})},pe=(n,r)=>{let i=n===`controller`?`controller`:`hand`,a=n===`gaze-hands`?`cursor`:`off`;f(i),e.primaryInputMode=i,t.setGazeMode(a),m(t.currentGazeMode),ra({inputMode:i,gazeMode:a}),j(!1),r&&window.requestAnimationFrame(()=>y.current?.focus())},me=e=>{_.supported&&de(e)},he=(e,t)=>{var n;if(!_.supported)return;let r=e.key===`ArrowRight`?1:e.key===`ArrowLeft`?-1:0;if(r===0)return;e.preventDefault();let i=Fo[(Fo.findIndex(e=>e.value===t)+r+Fo.length)%Fo.length];me(i.value),(n=e.currentTarget.parentElement?.querySelectorAll(`[role="radio"]`)?.[i.value===`off`?0:i.value===`cursor`?1:2])==null||n.focus()},N=(e,t)=>{var n;if(p===`off`||!_.supported)return;let r=e.key===`ArrowRight`?1:e.key===`ArrowLeft`?-1:0;if(r===0)return;e.preventDefault();let i=K[(K.findIndex(e=>e.value===t)+r+K.length)%K.length];fe(i.value),(n=e.currentTarget.parentElement?.querySelectorAll(`[role="radio"]`)?.[i.value===`left`?0:1])==null||n.focus()},P=e=>e?H.accent:H.textGrey,ge=t=>(0,z.jsx)(nr,{style:{fontSize:`12px`,width:`100%`,justifyContent:`start`,borderRadius:`8px`,padding:`6px 10px`},onClick:n=>{var r;let i=aa();i?i(t):t===`none`?e.sem.deleteAll():(r=e.sem.loadDefaultEnvironment(t))==null||r.catch(e=>console.error(`Could not load environment ${t}`,e)),ra({environment:t}),A(!1),n.detail===0&&window.requestAnimationFrame(()=>S.current?.focus())},children:Po(t)},t);return(0,z.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,flexDirection:`row`,alignItems:`center`,gap:`6px`,padding:`8px`},children:[(0,z.jsxs)(`div`,{ref:v,style:{position:`relative`},children:[(0,z.jsxs)(tr,{children:[(0,z.jsx)(nr,{title:`Reset device transforms`,onClick:()=>t.resetDeviceTransforms(),children:(0,z.jsx)(G,{name:`rotate-ccw`,size:16})}),(0,z.jsx)(nr,{title:p===`cursor`?`Pointer lock is unavailable while cursor gaze is active`:`Play mode (lock pointer)`,disabled:p===`cursor`,onClick:()=>{t.lockPointer(),A(!1),O(!1)},children:(0,z.jsx)(G,{name:`circle-play`,size:16})}),(0,z.jsx)(nr,{ref:y,title:`Select input mode`,"aria-expanded":ne,"aria-controls":ne?`iwer-input-mode-menu`:void 0,$open:ne,onClick:()=>{j(!ne),te(!1),M(!1),A(!1),O(!1)},children:(0,z.jsx)(G,{name:d===`hand`&&p===`cursor`?`eye`:d===`controller`?`gamepad-2`:`hand`,size:16})}),(0,z.jsx)(nr,{ref:b,title:`Configure gaze emulation`,"aria-expanded":re,"aria-controls":re?`iwer-gaze-settings`:void 0,$active:p!==`off`,$open:re,onClick:()=>{M(!re),te(!1),j(!1),A(!1),O(!1)},children:(0,z.jsx)(G,{name:`scan-eye`,size:16,color:le===`error`?H.dangerRed:void 0})}),(0,z.jsx)(nr,{ref:x,title:`Headset position`,"aria-expanded":ee,"aria-controls":ee?`iwer-headset-settings`:void 0,$open:ee,onClick:()=>{te(!ee),j(!1),M(!1),A(!1),O(!1)},children:(0,z.jsx)(G,{name:`glasses`,size:16})}),(0,z.jsx)(nr,{"aria-label":`Field-of-view mask`,"aria-pressed":l,disabled:!c,title:c?(l?`Disable`:`Enable`)+` field-of-view mask`:`Field-of-view mask unavailable for this device profile`,onClick:()=>{e.visibilityMaskEnabled=!e.visibilityMaskEnabled,u(e.visibilityMaskEnabled),ra({visibilityMaskEnabled:e.visibilityMaskEnabled})},children:(0,z.jsx)(G,{name:`scan`,size:16,color:c?l?H.accent:H.textGrey:H.textTertiary})}),e.sem&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(cr,{$horizontal:!1}),(0,z.jsx)(nr,{ref:S,title:`Select emulated environment`,"aria-expanded":k,"aria-controls":k?`iwer-environment-menu`:void 0,$open:k,onClick:()=>{A(!k),j(!1),M(!1),te(!1),O(!1)},children:(0,z.jsx)(G,{name:`armchair`,size:16})}),(0,z.jsx)(nr,{title:`Toggle plane visibility`,onClick:()=>{e.sem.planesVisible=!n,r(!n)},children:(0,z.jsx)(G,{name:`layers`,size:16,color:P(n)})}),(0,z.jsx)(nr,{title:`Toggle bounding-box visibility`,onClick:()=>{e.sem.boundingBoxesVisible=!i,a(!i)},children:(0,z.jsx)(G,{name:`box`,size:16,color:P(i)})}),(0,z.jsx)(nr,{title:`Toggle mesh visibility`,onClick:()=>{e.sem.meshesVisible=!o,s(!o)},children:(0,z.jsx)(G,{name:`shapes`,size:16,color:P(o)})})]}),(0,z.jsx)(cr,{$horizontal:!1}),(0,z.jsx)(nr,{title:`Save current device pose as the default for this site`,onClick:()=>{let e=t.captureDefaultPose();t.applyDefaultPose(e),ra({defaultPose:e})},children:(0,z.jsx)(G,{name:`save`,size:16})}),(0,z.jsx)(cr,{$horizontal:!1}),(0,z.jsx)(nr,{title:`Exit XR session`,onClick:()=>e.activeSession?.end(),children:(0,z.jsx)(G,{name:`log-out`,size:16})})]}),ne&&(0,z.jsxs)(uo,{ref:C,id:`iwer-input-mode-menu`,role:`group`,"aria-label":`Input mode`,$left:ie,children:[(0,z.jsxs)(fo,{children:[(0,z.jsx)(G,{name:`gamepad-2`,size:15}),(0,z.jsx)(po,{children:`Input setup`})]}),(0,z.jsxs)(mo,{type:`button`,"aria-pressed":ce===`controller`,"data-autofocus":ce===`controller`,$selected:ce===`controller`,onClick:e=>pe(`controller`,e.detail===0),children:[(0,z.jsx)(G,{name:`gamepad-2`,size:15}),(0,z.jsxs)(ho,{children:[(0,z.jsx)(go,{children:`Controllers`}),(0,z.jsx)(_o,{children:`Ray + trigger`})]}),ce===`controller`?(0,z.jsx)(G,{name:`circle-dot`,size:14,color:H.accent}):(0,z.jsx)(`span`,{"aria-hidden":`true`})]}),(0,z.jsxs)(mo,{type:`button`,"aria-pressed":ce===`hand`,"data-autofocus":ce===`hand`,$selected:ce===`hand`,onClick:e=>pe(`hand`,e.detail===0),children:[(0,z.jsx)(G,{name:`hand`,size:15}),(0,z.jsxs)(ho,{children:[(0,z.jsx)(go,{children:`Hands`}),(0,z.jsx)(_o,{children:`Ray, poke + grab`})]}),ce===`hand`?(0,z.jsx)(G,{name:`circle-dot`,size:14,color:H.accent}):(0,z.jsx)(`span`,{"aria-hidden":`true`})]}),(0,z.jsxs)(mo,{type:`button`,"aria-pressed":ce===`gaze-hands`,"data-autofocus":ce===`gaze-hands`,"aria-disabled":!_.supported,"aria-describedby":_.supported?void 0:`iwer-gaze-preset-hint`,$selected:ce===`gaze-hands`,$unavailable:!_.supported,title:_.supported?`Use cursor gaze with hand pinch`:`Select a gaze-capable device profile first`,onClick:e=>{_.supported&&pe(`gaze-hands`,e.detail===0)},children:[(0,z.jsx)(G,{name:`eye`,size:15}),(0,z.jsxs)(ho,{children:[(0,z.jsx)(go,{children:`Gaze + Hands`}),(0,z.jsx)(_o,{children:`Look, then pinch`})]}),ce===`gaze-hands`?(0,z.jsx)(G,{name:`circle-dot`,size:14,color:H.accent}):(0,z.jsx)(`span`,{"aria-hidden":`true`})]}),!_.supported&&(0,z.jsx)(_o,{id:`iwer-gaze-preset-hint`,style:{padding:`4px`},children:`Needs an eye-tracking profile, such as Meta Quest Pro.`}),ce==null&&(0,z.jsxs)(_o,{style:{padding:`5px 4px 2px`},children:[`Custom · `,d===`controller`?`Controllers`:`Hands`,` + `,p===`head-locked`?`head gaze`:`cursor gaze`]})]}),re&&(0,z.jsxs)(uo,{ref:w,id:`iwer-gaze-settings`,role:`group`,"aria-label":`Gaze emulation settings`,$left:ae,children:[(0,z.jsxs)(fo,{children:[(0,z.jsx)(G,{name:`eye`,size:15}),(0,z.jsx)(po,{children:`Gaze emulation`}),(0,z.jsx)(lr,{title:`Close gaze settings`,onClick:e=>{var t;M(!1),e.detail===0&&((t=b.current)==null||t.focus())},children:(0,z.jsx)(G,{name:`circle-x`,size:14})})]}),(0,z.jsxs)(xo,{"aria-live":`polite`,children:[(0,z.jsx)(So,{$tone:le}),(0,z.jsx)(`span`,{children:ue})]}),(0,z.jsx)(vo,{id:`iwer-gaze-mode-label`,children:`Gaze mode`}),(0,z.jsx)(yo,{role:`radiogroup`,"aria-label":`Gaze mode`,"aria-labelledby":`iwer-gaze-mode-label`,"aria-disabled":!_.supported,$unavailable:!_.supported,children:Fo.map(({value:e,label:t})=>(0,z.jsx)(bo,{type:`button`,role:`radio`,"aria-checked":p===e,"aria-disabled":!_.supported,tabIndex:p===e?0:-1,"data-autofocus":p===e,$selected:p===e,$unavailable:!_.supported,onClick:()=>me(e),onKeyDown:t=>he(t,e),children:t},e))}),(0,z.jsx)(vo,{id:`iwer-gaze-hand-label`,children:`Commit hand`}),(0,z.jsx)(yo,{role:`radiogroup`,"aria-label":`Gaze commit hand`,"aria-labelledby":`iwer-gaze-hand-label`,"aria-disabled":p===`off`||!_.supported,$unavailable:p===`off`||!_.supported,children:K.map(({value:e,label:t})=>(0,z.jsx)(bo,{type:`button`,role:`radio`,"aria-checked":h===e,"aria-disabled":p===`off`||!_.supported,tabIndex:h===e?0:-1,$selected:h===e,$unavailable:p===`off`||!_.supported,onClick:()=>{p!==`off`&&_.supported&&fe(e)},onKeyDown:t=>N(t,e),children:t},e))}),(0,z.jsxs)(_o,{style:{padding:`3px 2px 1px`},children:[d===`hand`?`Pinch`:`Trigger`,` confirms the gaze target.`]}),p===`cursor`&&_.sessionActive&&_.connected&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(cr,{}),(0,z.jsx)(vo,{children:`Cursor controls`}),(0,z.jsxs)(Co,{children:[(0,z.jsxs)(wo,{children:[(0,z.jsx)(G,{name:`mouse-left`,size:14}),(0,z.jsxs)(`span`,{children:[`Aim + commit · drag to move`,` `,d===`hand`?`hand`:`controller`]})]}),(0,z.jsxs)(wo,{children:[(0,z.jsx)(G,{name:`mouse-right`,size:14}),(0,z.jsx)(`span`,{children:`Drag to look around`})]}),(0,z.jsxs)(wo,{children:[(0,z.jsx)(G,{name:`mouse`,size:14}),(0,z.jsx)(`span`,{children:`While held, wheel to adjust depth`})]}),(0,z.jsxs)(wo,{children:[(0,z.jsx)(To,{children:`Space`}),(0,z.jsx)(`span`,{children:`Reset commit-hand pose`})]})]}),(0,z.jsx)(_o,{style:{padding:`3px 2px 1px`},children:`Play mode is unavailable while cursor gaze is on.`})]})]}),ee&&(0,z.jsxs)(uo,{ref:T,id:`iwer-headset-settings`,role:`group`,"aria-label":`Headset position`,$left:oe,children:[(0,z.jsxs)(fo,{tabIndex:-1,"data-autofocus":`true`,style:{fontSize:`13px`,fontWeight:600},children:[(0,z.jsx)(G,{name:`glasses`,size:15}),e.name]}),(0,z.jsx)(cr,{}),(0,z.jsx)(Ha,{vector:t.combinedCameraPosition,label:`Pos`})]}),k&&(0,z.jsxs)(uo,{ref:E,id:`iwer-environment-menu`,role:`group`,"aria-label":`Emulated environment`,$left:se,children:[jo(e).map(({label:e,ids:t})=>{let n=t.map(ge);if(!e)return(0,z.jsx)(B.Fragment,{children:n},`current`);let r=`iwer-environment-group-`+e.replace(/\W+/g,`-`);return(0,z.jsxs)(`div`,{role:`group`,"aria-labelledby":r,children:[(0,z.jsx)(Mo,{id:r,children:e}),n]},e)}),ge(`none`)]})]}),(0,z.jsxs)(tr,{children:[(0,z.jsx)(nr,{title:`About IWER`,onClick:()=>{O(!D),j(!1),M(!1),te(!1),A(!1)},children:(0,z.jsx)(G,{name:`iwer`,size:16})}),(0,z.jsx)(nr,{title:`Report issues`,onClick:()=>window.open(`https://github.com/meta-quest/immersive-web-emulation-runtime/issues`,`_blank`),children:(0,z.jsx)(G,{name:`bug`,size:16})})]}),D&&(0,z.jsxs)(sr,{style:{top:`50vh`,left:`50vw`,transform:`translate(-50%, -50%)`,maxWidth:`240px`,gap:`4px`,padding:`16px`},children:[(0,z.jsx)(`div`,{style:{display:`flex`,justifyContent:`end`},children:(0,z.jsx)(lr,{$isRed:!0,onClick:()=>O(!1),children:(0,z.jsx)(G,{name:`circle-x`,size:14})})}),(0,z.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`},children:(0,z.jsx)(G,{name:`iwer`,size:72})}),(0,z.jsxs)(`p`,{style:{textAlign:`center`,padding:`0 5px`,margin:`0`},children:[(0,z.jsx)(`b`,{children:`Immersive Web Emulation Runtime`}),` (IWER) is a free, open-source WebXR developer tool created by Meta Platforms, Inc.`]}),(0,z.jsx)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,display:`flex`,justifyContent:`center`,fontSize:`12px`,padding:`8px`},children:(0,z.jsxs)(`tbody`,{children:[(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(so,{children:`IWER`}),(0,z.jsxs)(co,{children:[`v`,e.version]})]}),(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(so,{children:`DevUI`}),(0,z.jsxs)(co,{children:[`v`,e.devui.version]})]}),e.sem&&(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(so,{children:`SEM`}),(0,z.jsxs)(co,{children:[`v`,e.sem.version]})]})]})}),(0,z.jsx)(er,{style:{borderRadius:$n.radiusSolo},onClick:()=>window.open(`https://github.com/meta-quest/immersive-web-emulation-runtime/blob/main/LICENSE`,`_blank`),children:`MIT License`}),(0,z.jsx)(er,{style:{borderRadius:$n.radiusSolo},onClick:()=>window.open(`https://github.com/meta-quest/immersive-web-emulation-runtime`,`_blank`),children:`View Source on GitHub`})]})]})},Lo=1e3,Ro=1001,zo=1002,Bo=1003,Vo=1004,Ho=1005,Uo=1006,Wo=1007,Go=1008,Ko=1009,qo=1010,Jo=1011,Yo=1012,Xo=1013,Zo=1014,Qo=1015,$o=1016,es=1017,ts=1018,ns=1020,rs=35902,is=35899,as=1021,os=1022,ss=1023,cs=1026,ls=1027,us=1028,ds=1029,fs=1030,ps=1031,ms=1033,hs=33776,gs=33777,_s=33778,vs=33779,ys=35840,bs=35841,xs=35842,Ss=35843,Cs=36196,ws=37492,Ts=37496,Es=37488,Ds=37489,Os=37490,ks=37491,As=37808,js=37809,Ms=37810,Ns=37811,Ps=37812,Fs=37813,Is=37814,Ls=37815,Rs=37816,zs=37817,Bs=37818,Vs=37819,Hs=37820,Us=37821,Ws=36492,Gs=36494,Ks=36495,qs=36283,Js=36284,Ys=36285,Xs=36286,Zs=2300,Qs=2301,$s=2302,ec=2303,tc=2400,nc=2401,rc=2402,ic=3200,ac=`srgb`,oc=`srgb-linear`,sc=`linear`,cc=`srgb`,lc=7680,uc=35044,dc=2e3;function fc(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function pc(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function mc(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function hc(){let e=mc(`canvas`);return e.style.display=`block`,e}var gc={};function _c(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function vc(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function q(...e){e=vc(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function J(...e){e=vc(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function yc(...e){let t=e.join(` `);t in gc||(gc[t]=!0,q(...e))}function bc(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var xc={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Sc=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Cc=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),wc=Math.PI/180,Tc=180/Math.PI;function Ec(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Cc[e&255]+Cc[e>>8&255]+Cc[e>>16&255]+Cc[e>>24&255]+`-`+Cc[t&255]+Cc[t>>8&255]+`-`+Cc[t>>16&15|64]+Cc[t>>24&255]+`-`+Cc[n&63|128]+Cc[n>>8&255]+`-`+Cc[n>>16&255]+Cc[n>>24&255]+Cc[r&255]+Cc[r>>8&255]+Cc[r>>16&255]+Cc[r>>24&255]).toLowerCase()}function Y(e,t,n){return Math.max(t,Math.min(n,e))}function Dc(e,t){return(e%t+t)%t}function Oc(e,t,n){return(1-n)*e+n*t}function kc(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`Invalid component type.`)}}function Ac(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`Invalid component type.`)}}var jc=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Y(this.x,e.x,t.x),this.y=Y(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Y(this.x,e,t),this.y=Y(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Y(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Y(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Mc=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:q(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Y(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},X=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Pc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Pc.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Y(this.x,e.x,t.x),this.y=Y(this.y,e.y,t.y),this.z=Y(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Y(this.x,e,t),this.y=Y(this.y,e,t),this.z=Y(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Y(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Nc.copy(this).projectOnVector(e),this.sub(Nc)}reflect(e){return this.sub(Nc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Y(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Nc=new X,Pc=new Mc,Z=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Fc.makeScale(e,t)),this}rotate(e){return this.premultiply(Fc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Fc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Fc=new Z,Ic=new Z().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Lc=new Z().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Rc(){let e={enabled:!0,workingColorSpace:oc,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Bc(e.r),e.g=Bc(e.g),e.b=Bc(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Vc(e.r),e.g=Vc(e.g),e.b=Vc(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?sc:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return yc(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return yc(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[oc]:{primaries:t,whitePoint:r,transfer:sc,toXYZ:Ic,fromXYZ:Lc,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ac},outputColorSpaceConfig:{drawingBufferColorSpace:ac}},[ac]:{primaries:t,whitePoint:r,transfer:cc,toXYZ:Ic,fromXYZ:Lc,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ac}}}),e}var zc=Rc();function Bc(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Vc(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Hc,Uc=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Hc===void 0&&(Hc=mc(`canvas`)),Hc.width=e.width,Hc.height=e.height;let t=Hc.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Hc}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=mc(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Bc(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Bc(t[e]/255)*255):t[e]=Bc(t[e]);return{data:t,width:e.width,height:e.height}}return q(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Wc=0,Gc=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wc++}),this.uuid=Ec(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Kc(r[t].image)):e.push(Kc(r[t]))}else e=Kc(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Kc(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Uc.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(q(`Texture: Unable to serialize Texture.`),{})}var qc=0,Jc=new X,Yc=class e extends Sc{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=Ro,i=Ro,a=Uo,o=Go,s=ss,c=Ko,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qc++}),this.uuid=Ec(),this.name=``,this.source=new Gc(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new jc(0,0),this.repeat=new jc(1,1),this.center=new jc(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Z,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Jc).x}get height(){return this.source.getSize(Jc).y}get depth(){return this.source.getSize(Jc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){q(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?q(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Lo:e.x-=Math.floor(e.x);break;case Ro:e.x=e.x<0?0:1;break;case zo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Lo:e.y-=Math.floor(e.y);break;case Ro:e.y=e.y<0?0:1;break;case zo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Yc.DEFAULT_IMAGE=null,Yc.DEFAULT_MAPPING=300,Yc.DEFAULT_ANISOTROPY=1;var Xc=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Y(this.x,e.x,t.x),this.y=Y(this.y,e.y,t.y),this.z=Y(this.z,e.z,t.z),this.w=Y(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Y(this.x,e,t),this.y=Y(this.y,e,t),this.z=Y(this.z,e,t),this.w=Y(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Y(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Zc=class extends Sc{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Uo,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Xc(0,0,e,t),this.scissorTest=!1,this.viewport=new Xc(0,0,e,t),this.textures=[];let r=new Yc({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Uo,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Gc(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:`dispose`})}},Qc=class extends Zc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},$c=class extends Yc{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Bo,this.minFilter=Bo,this.wrapR=Ro,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},el=class extends Yc{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Bo,this.minFilter=Bo,this.wrapR=Ro,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},tl=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,n=e.elements,r=1/nl.setFromMatrixColumn(e,0).length(),i=1/nl.setFromMatrixColumn(e,1).length(),a=1/nl.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(il,e,al)}lookAt(e,t,n){let r=this.elements;return cl.subVectors(e,t),cl.lengthSq()===0&&(cl.z=1),cl.normalize(),ol.crossVectors(n,cl),ol.lengthSq()===0&&(Math.abs(n.z)===1?cl.x+=1e-4:cl.z+=1e-4,cl.normalize(),ol.crossVectors(n,cl)),ol.normalize(),sl.crossVectors(cl,ol),r[0]=ol.x,r[4]=sl.x,r[8]=cl.x,r[1]=ol.y,r[5]=sl.y,r[9]=cl.y,r[2]=ol.z,r[6]=sl.z,r[10]=cl.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],ee=r[10],te=r[14],ne=r[3],j=r[7],re=r[11],M=r[15];return i[0]=a*x+o*T+s*k+c*ne,i[4]=a*S+o*E+s*A+c*j,i[8]=a*C+o*D+s*ee+c*re,i[12]=a*w+o*O+s*te+c*M,i[1]=l*x+u*T+d*k+f*ne,i[5]=l*S+u*E+d*A+f*j,i[9]=l*C+u*D+d*ee+f*re,i[13]=l*w+u*O+d*te+f*M,i[2]=p*x+m*T+h*k+g*ne,i[6]=p*S+m*E+h*A+g*j,i[10]=p*C+m*D+h*ee+g*re,i[14]=p*w+m*O+h*te+g*M,i[3]=_*x+v*T+y*k+b*ne,i[7]=_*S+v*E+y*A+b*j,i[11]=_*C+v*D+y*ee+b*re,i[15]=_*w+v*O+y*te+b*M,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinant();if(i===0)return n.set(1,1,1),t.identity(),this;let a=nl.set(r[0],r[1],r[2]).length(),o=nl.set(r[4],r[5],r[6]).length(),s=nl.set(r[8],r[9],r[10]).length();i<0&&(a=-a),rl.copy(this);let c=1/a,l=1/o,u=1/s;return rl.elements[0]*=c,rl.elements[1]*=c,rl.elements[2]*=c,rl.elements[4]*=l,rl.elements[5]*=l,rl.elements[6]*=l,rl.elements[8]*=u,rl.elements[9]*=u,rl.elements[10]*=u,t.setFromRotationMatrix(rl),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=dc,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=dc,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},nl=new X,rl=new tl,il=new X(0,0,0),al=new X(1,1,1),ol=new X,sl=new X,cl=new X,ll=new tl,ul=new Mc,dl=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(Y(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-Y(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(Y(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-Y(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(Y(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-Y(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:q(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ll.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ll,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ul.setFromEuler(this),this.setFromQuaternion(ul,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};dl.DEFAULT_ORDER=`XYZ`;var fl=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},pl=0,ml=new X,hl=new Mc,gl=new tl,_l=new X,vl=new X,yl=new X,bl=new Mc,xl=new X(1,0,0),Sl=new X(0,1,0),Cl=new X(0,0,1),wl={type:`added`},Tl={type:`removed`},El={type:`childadded`,child:null},Dl={type:`childremoved`,child:null},Ol=class e extends Sc{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pl++}),this.uuid=Ec(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new X,n=new dl,r=new Mc,i=new X(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new tl},normalMatrix:{value:new Z}}),this.matrix=new tl,this.matrixWorld=new tl,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hl.setFromAxisAngle(e,t),this.quaternion.multiply(hl),this}rotateOnWorldAxis(e,t){return hl.setFromAxisAngle(e,t),this.quaternion.premultiply(hl),this}rotateX(e){return this.rotateOnAxis(xl,e)}rotateY(e){return this.rotateOnAxis(Sl,e)}rotateZ(e){return this.rotateOnAxis(Cl,e)}translateOnAxis(e,t){return ml.copy(e).applyQuaternion(this.quaternion),this.position.add(ml.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xl,e)}translateY(e){return this.translateOnAxis(Sl,e)}translateZ(e){return this.translateOnAxis(Cl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(gl.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?_l.copy(e):_l.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),vl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gl.lookAt(vl,_l,this.up):gl.lookAt(_l,vl,this.up),this.quaternion.setFromRotationMatrix(gl),r&&(gl.extractRotation(r.matrixWorld),hl.setFromRotationMatrix(gl),this.quaternion.premultiply(hl.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(J(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wl),El.child=e,this.dispatchEvent(El),El.child=null):J(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Tl),Dl.child=e,this.dispatchEvent(Dl),Dl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),gl.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),gl.multiply(e.parent.matrixWorld)),e.applyMatrix4(gl),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wl),El.child=e,this.dispatchEvent(El),El.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vl,e,yl),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vl,bl,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};Ol.DEFAULT_UP=new X(0,1,0),Ol.DEFAULT_MATRIX_AUTO_UPDATE=!0,Ol.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var kl=class extends Ol{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Al={type:`move`},jl=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Al)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new kl;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Ml={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nl={h:0,s:0,l:0},Pl={h:0,s:0,l:0};function Fl(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Il=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ac){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,zc.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=zc.workingColorSpace){return this.r=e,this.g=t,this.b=n,zc.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=zc.workingColorSpace){if(e=Dc(e,1),t=Y(t,0,1),n=Y(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Fl(i,r,e+1/3),this.g=Fl(i,r,e),this.b=Fl(i,r,e-1/3)}return zc.colorSpaceToWorking(this,r),this}setStyle(e,t=ac){function n(t){t!==void 0&&parseFloat(t)<1&&q(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:q(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);q(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ac){let n=Ml[e.toLowerCase()];return n===void 0?q(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bc(e.r),this.g=Bc(e.g),this.b=Bc(e.b),this}copyLinearToSRGB(e){return this.r=Vc(e.r),this.g=Vc(e.g),this.b=Vc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ac){return zc.workingToColorSpace(Ll.copy(this),e),Math.round(Y(Ll.r*255,0,255))*65536+Math.round(Y(Ll.g*255,0,255))*256+Math.round(Y(Ll.b*255,0,255))}getHexString(e=ac){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=zc.workingColorSpace){zc.workingToColorSpace(Ll.copy(this),t);let n=Ll.r,r=Ll.g,i=Ll.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=zc.workingColorSpace){return zc.workingToColorSpace(Ll.copy(this),t),e.r=Ll.r,e.g=Ll.g,e.b=Ll.b,e}getStyle(e=ac){zc.workingToColorSpace(Ll.copy(this),e);let t=Ll.r,n=Ll.g,r=Ll.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Nl),this.setHSL(Nl.h+e,Nl.s+t,Nl.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Nl),e.getHSL(Pl);let n=Oc(Nl.h,Pl.h,t),r=Oc(Nl.s,Pl.s,t),i=Oc(Nl.l,Pl.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ll=new Il;Il.NAMES=Ml;var Rl=class extends Ol{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new dl,this.environmentIntensity=1,this.environmentRotation=new dl,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},zl=new X,Bl=new X,Vl=new X,Hl=new X,Ul=new X,Wl=new X,Gl=new X,Kl=new X,ql=new X,Jl=new X,Yl=new Xc,Xl=new Xc,Zl=new Xc,Ql=class e{constructor(e=new X,t=new X,n=new X){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),zl.subVectors(e,t),r.cross(zl);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){zl.subVectors(r,t),Bl.subVectors(n,t),Vl.subVectors(e,t);let a=zl.dot(zl),o=zl.dot(Bl),s=zl.dot(Vl),c=Bl.dot(Bl),l=Bl.dot(Vl),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Hl)!==null&&Hl.x>=0&&Hl.y>=0&&Hl.x+Hl.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Hl)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Hl.x),s.addScaledVector(a,Hl.y),s.addScaledVector(o,Hl.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Yl.setScalar(0),Xl.setScalar(0),Zl.setScalar(0),Yl.fromBufferAttribute(e,t),Xl.fromBufferAttribute(e,n),Zl.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Yl,i.x),a.addScaledVector(Xl,i.y),a.addScaledVector(Zl,i.z),a}static isFrontFacing(e,t,n,r){return zl.subVectors(n,t),Bl.subVectors(e,t),zl.cross(Bl).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zl.subVectors(this.c,this.b),Bl.subVectors(this.a,this.b),zl.cross(Bl).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Ul.subVectors(r,n),Wl.subVectors(i,n),Kl.subVectors(e,n);let s=Ul.dot(Kl),c=Wl.dot(Kl);if(s<=0&&c<=0)return t.copy(n);ql.subVectors(e,r);let l=Ul.dot(ql),u=Wl.dot(ql);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Ul,a);Jl.subVectors(e,i);let f=Ul.dot(Jl),p=Wl.dot(Jl);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Wl,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Gl.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Gl,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Ul,a).addScaledVector(Wl,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},$l=class{constructor(e=new X(1/0,1/0,1/0),t=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(tu.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(tu.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=tu.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,tu):tu.fromBufferAttribute(r,t),tu.applyMatrix4(e.matrixWorld),this.expandByPoint(tu);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),nu.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),nu.copy(e.boundingBox)),nu.applyMatrix4(e.matrixWorld),this.union(nu)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,tu),tu.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(lu),uu.subVectors(this.max,lu),ru.subVectors(e.a,lu),iu.subVectors(e.b,lu),au.subVectors(e.c,lu),ou.subVectors(iu,ru),su.subVectors(au,iu),cu.subVectors(ru,au);let t=[0,-ou.z,ou.y,0,-su.z,su.y,0,-cu.z,cu.y,ou.z,0,-ou.x,su.z,0,-su.x,cu.z,0,-cu.x,-ou.y,ou.x,0,-su.y,su.x,0,-cu.y,cu.x,0];return!pu(t,ru,iu,au,uu)||(t=[1,0,0,0,1,0,0,0,1],!pu(t,ru,iu,au,uu))?!1:(du.crossVectors(ou,su),t=[du.x,du.y,du.z],pu(t,ru,iu,au,uu))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,tu).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(tu).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(eu[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),eu[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),eu[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),eu[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),eu[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),eu[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),eu[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),eu[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(eu)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},eu=[new X,new X,new X,new X,new X,new X,new X,new X],tu=new X,nu=new $l,ru=new X,iu=new X,au=new X,ou=new X,su=new X,cu=new X,lu=new X,uu=new X,du=new X,fu=new X;function pu(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){fu.fromArray(e,a);let o=i.x*Math.abs(fu.x)+i.y*Math.abs(fu.y)+i.z*Math.abs(fu.z),s=t.dot(fu),c=n.dot(fu),l=r.dot(fu);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var mu=new X,hu=new jc,gu=0,_u=class extends Sc{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gu++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=uc,this.updateRanges=[],this.gpuType=Qo,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)hu.fromBufferAttribute(this,t),hu.applyMatrix3(e),this.setXY(t,hu.x,hu.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mu.fromBufferAttribute(this,t),mu.applyMatrix3(e),this.setXYZ(t,mu.x,mu.y,mu.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mu.fromBufferAttribute(this,t),mu.applyMatrix4(e),this.setXYZ(t,mu.x,mu.y,mu.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mu.fromBufferAttribute(this,t),mu.applyNormalMatrix(e),this.setXYZ(t,mu.x,mu.y,mu.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mu.fromBufferAttribute(this,t),mu.transformDirection(e),this.setXYZ(t,mu.x,mu.y,mu.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=kc(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ac(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=kc(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ac(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=kc(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ac(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=kc(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ac(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=kc(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ac(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ac(t,this.array),n=Ac(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Ac(t,this.array),n=Ac(n,this.array),r=Ac(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Ac(t,this.array),n=Ac(n,this.array),r=Ac(r,this.array),i=Ac(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:`dispose`})}},vu=class extends _u{constructor(e,t,n){super(new Uint16Array(e),t,n)}},yu=class extends _u{constructor(e,t,n){super(new Uint32Array(e),t,n)}},bu=class extends _u{constructor(e,t,n){super(new Float32Array(e),t,n)}},xu=new $l,Su=new X,Cu=new X,wu=class{constructor(e=new X,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?xu.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Su.subVectors(e,this.center);let t=Su.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Su,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Cu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Su.copy(e.center).add(Cu)),this.expandByPoint(Su.copy(e.center).sub(Cu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Tu=0,Eu=new tl,Du=new Ol,Ou=new X,ku=new $l,Au=new $l,ju=new X,Mu=class e extends Sc{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tu++}),this.uuid=Ec(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(fc(e)?yu:vu)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Z().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Eu.makeRotationFromQuaternion(e),this.applyMatrix4(Eu),this}rotateX(e){return Eu.makeRotationX(e),this.applyMatrix4(Eu),this}rotateY(e){return Eu.makeRotationY(e),this.applyMatrix4(Eu),this}rotateZ(e){return Eu.makeRotationZ(e),this.applyMatrix4(Eu),this}translate(e,t,n){return Eu.makeTranslation(e,t,n),this.applyMatrix4(Eu),this}scale(e,t,n){return Eu.makeScale(e,t,n),this.applyMatrix4(Eu),this}lookAt(e){return Du.lookAt(e),Du.updateMatrix(),this.applyMatrix4(Du.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ou).negate(),this.translate(Ou.x,Ou.y,Ou.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new bu(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&q(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $l);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)J(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];ku.setFromBufferAttribute(n),this.morphTargetsRelative?(ju.addVectors(this.boundingBox.min,ku.min),this.boundingBox.expandByPoint(ju),ju.addVectors(this.boundingBox.max,ku.max),this.boundingBox.expandByPoint(ju)):(this.boundingBox.expandByPoint(ku.min),this.boundingBox.expandByPoint(ku.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&J(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wu);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)J(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new X,1/0);else if(e){let n=this.boundingSphere.center;if(ku.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Au.setFromBufferAttribute(n),this.morphTargetsRelative?(ju.addVectors(ku.min,Au.min),ku.expandByPoint(ju),ju.addVectors(ku.max,Au.max),ku.expandByPoint(ju)):(ku.expandByPoint(Au.min),ku.expandByPoint(Au.max))}ku.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)ju.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(ju));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)ju.fromBufferAttribute(a,t),o&&(Ou.fromBufferAttribute(e,t),ju.add(Ou)),r=Math.max(r,n.distanceToSquared(ju))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&J(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){J(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new _u(new Float32Array(4*n.count),4));let a=this.getAttribute(`tangent`),o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new X,s[e]=new X;let c=new X,l=new X,u=new X,d=new jc,f=new jc,p=new jc,m=new X,h=new X;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new X,y=new X,b=new X,x=new X;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0)n=new _u(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new X,i=new X,a=new X,o=new X,s=new X,c=new X,l=new X,u=new X;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ju.fromBufferAttribute(e,t),ju.normalize(),e.setXYZ(t,ju.x,ju.y,ju.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new _u(a,r,i)}if(this.index===null)return q(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}},Nu=0,Pu=class extends Sc{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=Ec(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Il(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=lc,this.stencilZFail=lc,this.stencilZPass=lc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){q(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?q(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Fu=new X,Iu=new X,Lu=new X,Ru=new X,zu=new X,Bu=new X,Vu=new X,Hu=class{constructor(e=new X,t=new X(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fu)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Fu.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fu.copy(this.origin).addScaledVector(this.direction,t),Fu.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Iu.copy(e).add(t).multiplyScalar(.5),Lu.copy(t).sub(e).normalize(),Ru.copy(this.origin).sub(Iu);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Lu),o=Ru.dot(this.direction),s=-Ru.dot(Lu),c=Ru.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Iu).addScaledVector(Lu,d),f}intersectSphere(e,t){Fu.subVectors(e.center,this.origin);let n=Fu.dot(this.direction),r=Fu.dot(Fu)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Fu)!==null}intersectTriangle(e,t,n,r,i){zu.subVectors(t,e),Bu.subVectors(n,e),Vu.crossVectors(zu,Bu);let a=this.direction.dot(Vu),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ru.subVectors(this.origin,e);let s=o*this.direction.dot(Bu.crossVectors(Ru,Bu));if(s<0)return null;let c=o*this.direction.dot(zu.cross(Ru));if(c<0||s+c>a)return null;let l=-o*Ru.dot(Vu);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Uu=class extends Pu{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Il(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dl,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Wu=new tl,Gu=new Hu,Ku=new wu,qu=new X,Ju=new X,Yu=new X,Xu=new X,Zu=new X,Qu=new X,$u=new X,ed=new X,td=class extends Ol{constructor(e=new Mu,t=new Uu){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Qu.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Zu.fromBufferAttribute(s,e),a?Qu.addScaledVector(Zu,r):Qu.addScaledVector(Zu.sub(t),r))}t.add(Qu)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ku.copy(n.boundingSphere),Ku.applyMatrix4(i),Gu.copy(e.ray).recast(e.near),Ku.containsPoint(Gu.origin)===!1&&(Gu.intersectSphere(Ku,qu)===null||Gu.origin.distanceToSquared(qu)>(e.far-e.near)**2)||(Wu.copy(i).invert(),Gu.copy(e.ray).applyMatrix4(Wu),(n.boundingBox===null||Gu.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Gu)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=rd(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=rd(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=rd(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=rd(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function nd(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;ed.copy(s),ed.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(ed);return l<n.near||l>n.far?null:{distance:l,point:ed.clone(),object:e}}function rd(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Ju),e.getVertexPosition(c,Yu),e.getVertexPosition(l,Xu);let u=nd(e,t,n,r,Ju,Yu,Xu,$u);if(u){let e=new X;Ql.getBarycoord($u,Ju,Yu,Xu,e),i&&(u.uv=Ql.getInterpolatedAttribute(i,s,c,l,e,new jc)),a&&(u.uv1=Ql.getInterpolatedAttribute(a,s,c,l,e,new jc)),o&&(u.normal=Ql.getInterpolatedAttribute(o,s,c,l,e,new X),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new X,materialIndex:0};Ql.getNormal(Ju,Yu,Xu,t.normal),u.face=t,u.barycoord=e}return u}var id=class extends Yc{constructor(e=null,t=1,n=1,r,i,a,o,s,c=Bo,l=Bo,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ad=new X,od=new X,sd=new Z,cd=class{constructor(e=new X(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=ad.subVectors(n,t).cross(od.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(ad),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||sd.getNormalMatrix(e),r=this.coplanarPoint(ad).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ld=new wu,ud=new jc(.5,.5),dd=new X,fd=class{constructor(e=new cd,t=new cd,n=new cd,r=new cd,i=new cd,a=new cd){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=dc,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ld.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ld.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ld)}intersectsSprite(e){return ld.center.set(0,0,0),ld.radius=.7071067811865476+ud.distanceTo(e.center),ld.applyMatrix4(e.matrixWorld),this.intersectsSphere(ld)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(dd.x=r.normal.x>0?e.max.x:e.min.x,dd.y=r.normal.y>0?e.max.y:e.min.y,dd.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(dd)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},pd=class extends Yc{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},md=class extends Yc{constructor(e,t,n=Zo,r,i,a,o=Bo,s=Bo,c,l=cs,u=1){if(l!==1026&&l!==1027)throw Error(`DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Gc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},hd=class extends md{constructor(e,t=Zo,n=301,r,i,a=Bo,o=Bo,s,c=cs){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},gd=class extends Yc{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},_d=class e extends Mu{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new bu(c,3)),this.setAttribute(`normal`,new bu(l,3)),this.setAttribute(`uv`,new bu(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new X;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},vd=class e extends Mu{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new bu(p,3)),this.setAttribute(`normal`,new bu(m,3)),this.setAttribute(`uv`,new bu(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},yd=class e extends Mu{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new X,p=new jc;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new bu(s,3)),this.setAttribute(`normal`,new bu(c,3)),this.setAttribute(`uv`,new bu(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};function bd(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Sd(i))i.isRenderTargetTexture?(q(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Sd(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function xd(e){let t={};for(let n=0;n<e.length;n++){let r=bd(e[n]);for(let e in r)t[e]=r[e]}return t}function Sd(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Cd(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function wd(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:zc.workingColorSpace}var Td={clone:bd,merge:xd},Ed=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Dd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Od=class extends Pu{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ed,this.fragmentShader=Dd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=bd(e.uniforms),this.uniformsGroups=Cd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},kd=class extends Od{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Ad=class extends Pu{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=ic,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},jd=class extends Pu{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Md(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}var Nd=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`call to abstract method`)}intervalChanged_(){}},Pd=class extends Nd{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:tc,endingEnd:tc}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case nc:i=e,o=2*t-n;break;case rc:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case nc:a=e,s=2*n-t;break;case rc:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Fd=class extends Nd{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Id=class extends Nd{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Ld=class extends Nd{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.settings||this.DefaultSettings_,u=l.inTangents,d=l.outTangents;if(!u||!d){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let f=o*2,p=e-1;for(let l=0;l!==o;++l){let o=a[c+l],m=a[s+l],h=p*f+l*2,g=d[h],_=d[h+1],v=e*f+l*2,y=u[v],b=u[v+1],x=(n-t)/(r-t),S,C,w,T,E;for(let e=0;e<8;e++){S=x*x,C=S*x,w=1-x,T=w*w,E=T*w;let e=E*t+3*T*x*g+3*w*S*y+C*r-n;if(Math.abs(e)<1e-10)break;let i=3*T*(g-t)+6*w*x*(y-g)+3*S*(r-y);if(Math.abs(i)<1e-10)break;x-=e/i,x=Math.max(0,Math.min(1,x))}i[l]=E*o+3*T*x*_+3*w*S*b+C*m}return i}},Rd=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Md(t,this.TimeBufferType),this.values=Md(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Md(e.times,Array),values:Md(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Id(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Fd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Pd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Ld(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Zs:t=this.InterpolantFactoryMethodDiscrete;break;case Qs:t=this.InterpolantFactoryMethodLinear;break;case $s:t=this.InterpolantFactoryMethodSmooth;break;case ec:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return q(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Zs;case this.InterpolantFactoryMethodLinear:return Qs;case this.InterpolantFactoryMethodSmooth:return $s;case this.InterpolantFactoryMethodBezier:return ec}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(J(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(J(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){J(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){J(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&pc(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){J(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===$s,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Rd.prototype.ValueTypeName=``,Rd.prototype.TimeBufferType=Float32Array,Rd.prototype.ValueBufferType=Float32Array,Rd.prototype.DefaultInterpolation=Qs;var zd=class extends Rd{constructor(e,t,n){super(e,t,n)}};zd.prototype.ValueTypeName=`bool`,zd.prototype.ValueBufferType=Array,zd.prototype.DefaultInterpolation=Zs,zd.prototype.InterpolantFactoryMethodLinear=void 0,zd.prototype.InterpolantFactoryMethodSmooth=void 0;var Bd=class extends Rd{constructor(e,t,n,r){super(e,t,n,r)}};Bd.prototype.ValueTypeName=`color`;var Vd=class extends Rd{constructor(e,t,n,r){super(e,t,n,r)}};Vd.prototype.ValueTypeName=`number`;var Hd=class extends Nd{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Mc.slerpFlat(i,0,a,c-o,a,c,s);return i}},Ud=class extends Rd{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Hd(this.times,this.values,this.getValueSize(),e)}};Ud.prototype.ValueTypeName=`quaternion`,Ud.prototype.InterpolantFactoryMethodSmooth=void 0;var Wd=class extends Rd{constructor(e,t,n){super(e,t,n)}};Wd.prototype.ValueTypeName=`string`,Wd.prototype.ValueBufferType=Array,Wd.prototype.DefaultInterpolation=Zs,Wd.prototype.InterpolantFactoryMethodLinear=void 0,Wd.prototype.InterpolantFactoryMethodSmooth=void 0;var Gd=class extends Rd{constructor(e,t,n,r){super(e,t,n,r)}};Gd.prototype.ValueTypeName=`vector`;var Kd=new X,qd=new Mc,Jd=new X,Yd=class extends Ol{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new tl,this.projectionMatrix=new tl,this.projectionMatrixInverse=new tl,this.coordinateSystem=dc,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Kd,qd,Jd),Jd.x===1&&Jd.y===1&&Jd.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Kd,qd,Jd.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Kd,qd,Jd),Jd.x===1&&Jd.y===1&&Jd.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Kd,qd,Jd.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Xd=new X,Zd=new jc,Qd=new jc,$d=class extends Yd{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Tc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(wc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Tc*2*Math.atan(Math.tan(wc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Xd.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xd.x,Xd.y).multiplyScalar(-e/Xd.z),Xd.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xd.x,Xd.y).multiplyScalar(-e/Xd.z)}getViewSize(e,t){return this.getViewBounds(e,Zd,Qd),t.subVectors(Qd,Zd)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(wc*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ef=class extends Yd{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},tf=-90,nf=1,rf=class extends Ol{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new $d(tf,nf,e,t);r.layers=this.layers,this.add(r);let i=new $d(tf,nf,e,t);i.layers=this.layers,this.add(i);let a=new $d(tf,nf,e,t);a.layers=this.layers,this.add(a);let o=new $d(tf,nf,e,t);o.layers=this.layers,this.add(o);let s=new $d(tf,nf,e,t);s.layers=this.layers,this.add(s);let c=new $d(tf,nf,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},af=class extends $d{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},of=`\\[\\]\\.:\\/`,sf=RegExp(`[\\[\\]\\.:\\/]`,`g`),cf=`[^\\[\\]\\.:\\/]`,lf=`[^`+of.replace(`\\.`,``)+`]`,uf=`((?:WC+[\\/:])*)`.replace(`WC`,cf),df=`(WCOD+)?`.replace(`WCOD`,lf),ff=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,cf),pf=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,cf),mf=RegExp(`^`+uf+df+ff+pf+`$`),hf=[`material`,`materials`,`bones`,`map`],gf=class{constructor(e,t,n){let r=n||_f.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},_f=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(sf,``)}static parseTrackName(e){let t=mf.exec(e);if(t===null)throw Error(`PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);hf.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){q(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){J(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){J(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){J(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){J(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){J(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){J(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){J(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;J(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){J(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){J(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};_f.Composite=gf,_f.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},_f.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},_f.prototype.GetterByBindingType=[_f.prototype._getValue_direct,_f.prototype._getValue_array,_f.prototype._getValue_arrayElement,_f.prototype._getValue_toArray],_f.prototype.SetterByBindingTypeAndVersioning=[[_f.prototype._setValue_direct,_f.prototype._setValue_direct_setNeedsUpdate,_f.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[_f.prototype._setValue_array,_f.prototype._setValue_array_setNeedsUpdate,_f.prototype._setValue_array_setMatrixWorldNeedsUpdate],[_f.prototype._setValue_arrayElement,_f.prototype._setValue_arrayElement_setNeedsUpdate,_f.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[_f.prototype._setValue_fromArray,_f.prototype._setValue_fromArray_setNeedsUpdate,_f.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};function vf(e,t,n,r){let i=yf(r);switch(n){case as:return e*t;case us:return e*t/i.components*i.byteLength;case ds:return e*t/i.components*i.byteLength;case fs:return e*t*2/i.components*i.byteLength;case ps:return e*t*2/i.components*i.byteLength;case os:return e*t*3/i.components*i.byteLength;case ss:return e*t*4/i.components*i.byteLength;case ms:return e*t*4/i.components*i.byteLength;case hs:case gs:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case _s:case vs:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case bs:case Ss:return Math.max(e,16)*Math.max(t,8)/4;case ys:case xs:return Math.max(e,8)*Math.max(t,8)/2;case Cs:case ws:case Es:case Ds:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ts:case Os:case ks:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case As:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case js:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Ms:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Ns:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Ps:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Fs:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Is:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Ls:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Rs:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case zs:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Bs:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Vs:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Hs:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Us:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ws:case Gs:case Ks:return Math.ceil(e/4)*Math.ceil(t/4)*16;case qs:case Js:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ys:case Xs:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function yf(e){switch(e){case Ko:case qo:return{byteLength:1,components:1};case Yo:case Jo:case $o:return{byteLength:2,components:1};case es:case ts:return{byteLength:2,components:4};case Zo:case Xo:case Qo:return{byteLength:4,components:1};case rs:case is:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`184`}})),typeof window<`u`&&(window.__THREE__?q(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`184`);function bf(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function xf(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Q={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},$={common:{diffuse:{value:new Il(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Z},alphaMap:{value:null},alphaMapTransform:{value:new Z},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Z}},envmap:{envMap:{value:null},envMapRotation:{value:new Z},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Z}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Z}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Z},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Z},normalScale:{value:new jc(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Z},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Z}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Z}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Z}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Il(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new X},probesMax:{value:new X},probesResolution:{value:new X}},points:{diffuse:{value:new Il(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Z},alphaTest:{value:0},uvTransform:{value:new Z}},sprite:{diffuse:{value:new Il(16777215)},opacity:{value:1},center:{value:new jc(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Z},alphaMap:{value:null},alphaMapTransform:{value:new Z},alphaTest:{value:0}}},Sf={basic:{uniforms:xd([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.fog]),vertexShader:Q.meshbasic_vert,fragmentShader:Q.meshbasic_frag},lambert:{uniforms:xd([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new Il(0)},envMapIntensity:{value:1}}]),vertexShader:Q.meshlambert_vert,fragmentShader:Q.meshlambert_frag},phong:{uniforms:xd([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new Il(0)},specular:{value:new Il(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Q.meshphong_vert,fragmentShader:Q.meshphong_frag},standard:{uniforms:xd([$.common,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.roughnessmap,$.metalnessmap,$.fog,$.lights,{emissive:{value:new Il(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag},toon:{uniforms:xd([$.common,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.gradientmap,$.fog,$.lights,{emissive:{value:new Il(0)}}]),vertexShader:Q.meshtoon_vert,fragmentShader:Q.meshtoon_frag},matcap:{uniforms:xd([$.common,$.bumpmap,$.normalmap,$.displacementmap,$.fog,{matcap:{value:null}}]),vertexShader:Q.meshmatcap_vert,fragmentShader:Q.meshmatcap_frag},points:{uniforms:xd([$.points,$.fog]),vertexShader:Q.points_vert,fragmentShader:Q.points_frag},dashed:{uniforms:xd([$.common,$.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Q.linedashed_vert,fragmentShader:Q.linedashed_frag},depth:{uniforms:xd([$.common,$.displacementmap]),vertexShader:Q.depth_vert,fragmentShader:Q.depth_frag},normal:{uniforms:xd([$.common,$.bumpmap,$.normalmap,$.displacementmap,{opacity:{value:1}}]),vertexShader:Q.meshnormal_vert,fragmentShader:Q.meshnormal_frag},sprite:{uniforms:xd([$.sprite,$.fog]),vertexShader:Q.sprite_vert,fragmentShader:Q.sprite_frag},background:{uniforms:{uvTransform:{value:new Z},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Q.background_vert,fragmentShader:Q.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Z}},vertexShader:Q.backgroundCube_vert,fragmentShader:Q.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Q.cube_vert,fragmentShader:Q.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Q.equirect_vert,fragmentShader:Q.equirect_frag},distance:{uniforms:xd([$.common,$.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Q.distance_vert,fragmentShader:Q.distance_frag},shadow:{uniforms:xd([$.lights,$.fog,{color:{value:new Il(0)},opacity:{value:1}}]),vertexShader:Q.shadow_vert,fragmentShader:Q.shadow_frag}};Sf.physical={uniforms:xd([Sf.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Z},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Z},clearcoatNormalScale:{value:new jc(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Z},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Z},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Z},sheen:{value:0},sheenColor:{value:new Il(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Z},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Z},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Z},transmissionSamplerSize:{value:new jc},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Z},attenuationDistance:{value:0},attenuationColor:{value:new Il(0)},specularColor:{value:new Il(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Z},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Z},anisotropyVector:{value:new jc},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Z}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag};var Cf={r:0,b:0,g:0},wf=new tl,Tf=new Z;Tf.set(-1,0,0,0,1,0,0,0,1);function Ef(e,t,n,r,i,a){let o=new Il(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new td(new _d(1,1,1),new Od({name:`BackgroundCubeMaterial`,uniforms:bd(Sf.backgroundCube.uniforms),vertexShader:Sf.backgroundCube.vertexShader,fragmentShader:Sf.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(wf.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Tf),l.material.toneMapped=zc.getTransfer(i.colorSpace)!==cc,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new td(new vd(2,2),new Od({name:`BackgroundMaterial`,uniforms:bd(Sf.background.uniforms),vertexShader:Sf.background.vertexShader,fragmentShader:Sf.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=zc.getTransfer(i.colorSpace)!==cc,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Cf,wd(e)),n.buffers.color.setClear(Cf.r,Cf.g,Cf.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Df(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Of(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function kf(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(q(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&q(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Af(e){let t=this,n=null,r=0,i=!1,a=!1,o=new cd,s=new Z,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var jf=4,Mf=[.125,.215,.35,.446,.526,.582],Nf=20,Pf=256,Ff=new ef,If=new Il,Lf=null,Rf=0,zf=0,Bf=!1,Vf=new X,Hf=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Vf}=i;Lf=this._renderer.getRenderTarget(),Rf=this._renderer.getActiveCubeFace(),zf=this._renderer.getActiveMipmapLevel(),Bf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Yf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Jf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Lf,Rf,zf),this._renderer.xr.enabled=Bf,e.scissorTest=!1,Gf(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lf=this._renderer.getRenderTarget(),Rf=this._renderer.getActiveCubeFace(),zf=this._renderer.getActiveMipmapLevel(),Bf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Uo,minFilter:Uo,generateMipmaps:!1,type:$o,format:ss,colorSpace:oc,depthBuffer:!1},r=Wf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wf(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Uf(r)),this._blurMaterial=qf(r,e,t),this._ggxMaterial=Kf(r,e,t)}return r}_compileMaterial(e){let t=new td(new Mu,e);this._renderer.compile(t,Ff)}_sceneToCubeUV(e,t,n,r,i){let a=new $d(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(If),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new td(new _d,new Uu({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(If),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Gf(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Yf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Jf());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Gf(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Ff)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(0+c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-jf?n-d+jf:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Gf(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Ff),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Gf(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Ff)}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&J(`blur direction must be either latitudinal or longitudinal!`);let l=this._lodMeshes[r];l.material=c;let u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/39,p=i/f,m=isFinite(i)?1+Math.floor(3*p):Nf;m>Nf&&q(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Nf}`);let h=[],g=0;for(let e=0;e<Nf;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];Gf(t,3*v*(r>_-jf?r-_+jf:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,Ff)}};function Uf(e){let t=[],n=[],r=[],i=e,a=e-jf+1+Mf.length;for(let o=0;o<a;o++){let a=2**i;t.push(a);let s=1/a;o>e-jf?s=Mf[o-e+jf-1]:o===0&&(s=0),n.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new Mu;h.setAttribute(`position`,new _u(f,3)),h.setAttribute(`uv`,new _u(p,2)),h.setAttribute(`faceIndex`,new _u(m,1)),r.push(new td(h,null)),i>jf&&i--}return{lodMeshes:r,sizeLods:t,sigmas:n}}function Wf(e,t,n){let r=new Qc(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Gf(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Kf(e,t,n){return new Od({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Pf,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Xf(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function qf(e,t,n){let r=new Float32Array(Nf),i=new X(0,1,0);return new Od({name:`SphericalGaussianBlur`,defines:{n:Nf,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Xf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Jf(){return new Od({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Xf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Yf(){return new Od({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Xf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var Zf=class extends Qc{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new pd(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new _d(5,5,5),i=new Od({name:`CubemapFromEquirect`,uniforms:bd(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new td(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=Uo),new rf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Qf(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Zf(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Hf(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Hf(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function $f(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&yc(`WebGLRenderer: `+e+` extension not supported.`),t}}}function ep(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?yu:vu)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function tp(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function np(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:J(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function rp(e,t,n){let r=new WeakMap,i=new Xc;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new $c(h,p,m,u);g.type=Qo,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new jc(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function ip(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var ap={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function op(e,t,n,r,i){let a=new Qc(t,n,{type:e,depthBuffer:r,stencilBuffer:i,depthTexture:r?new md(t,n):void 0}),o=new Qc(t,n,{type:$o,depthBuffer:!1,stencilBuffer:!1}),s=new Mu;s.setAttribute(`position`,new bu([-1,3,0,-1,-1,0,3,-1,0],3)),s.setAttribute(`uv`,new bu([0,2,0,0,2,0],2));let c=new kd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new td(s,c),u=new ef(-1,1,1,-1,0,1),d=null,f=null,p=!1,m,h=null,g=[],_=!1;this.setSize=function(e,t){a.setSize(e,t),o.setSize(e,t);for(let n=0;n<g.length;n++){let r=g[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){g=e,_=g.length>0&&g[0].isRenderPass===!0;let t=a.width,n=a.height;for(let e=0;e<g.length;e++){let r=g[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(p||e.toneMapping===0&&g.length===0)return!1;if(h=t,t!==null){let e=t.width,n=t.height;(a.width!==e||a.height!==n)&&this.setSize(e,n)}return _===!1&&e.setRenderTarget(a),m=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return _},this.end=function(e,t){e.toneMapping=m,p=!0;let n=a,r=o;for(let i=0;i<g.length;i++){let a=g[i];if(a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1)){let e=n;n=r,r=e}}if(d!==e.outputColorSpace||f!==e.toneMapping){d=e.outputColorSpace,f=e.toneMapping,c.defines={},zc.getTransfer(d)===`srgb`&&(c.defines.SRGB_TRANSFER=``);let t=ap[f];t&&(c.defines[t]=``),c.needsUpdate=!0}c.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(h),e.render(l,u),h=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),s.dispose(),c.dispose()}}var sp=new Yc,cp=new md(1,1),lp=new $c,up=new el,dp=new pd,fp=[],pp=[],mp=new Float32Array(16),hp=new Float32Array(9),gp=new Float32Array(4);function _p(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=fp[i];if(a===void 0&&(a=new Float32Array(i),fp[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function vp(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function yp(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function bp(e,t){let n=pp[t];n===void 0&&(n=new Int32Array(t),pp[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function xp(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Sp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(vp(n,t))return;e.uniform2fv(this.addr,t),yp(n,t)}}function Cp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(vp(n,t))return;e.uniform3fv(this.addr,t),yp(n,t)}}function wp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(vp(n,t))return;e.uniform4fv(this.addr,t),yp(n,t)}}function Tp(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(vp(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),yp(n,t)}else{if(vp(n,r))return;gp.set(r),e.uniformMatrix2fv(this.addr,!1,gp),yp(n,r)}}function Ep(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(vp(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),yp(n,t)}else{if(vp(n,r))return;hp.set(r),e.uniformMatrix3fv(this.addr,!1,hp),yp(n,r)}}function Dp(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(vp(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),yp(n,t)}else{if(vp(n,r))return;mp.set(r),e.uniformMatrix4fv(this.addr,!1,mp),yp(n,r)}}function Op(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function kp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(vp(n,t))return;e.uniform2iv(this.addr,t),yp(n,t)}}function Ap(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(vp(n,t))return;e.uniform3iv(this.addr,t),yp(n,t)}}function jp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(vp(n,t))return;e.uniform4iv(this.addr,t),yp(n,t)}}function Mp(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Np(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(vp(n,t))return;e.uniform2uiv(this.addr,t),yp(n,t)}}function Pp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(vp(n,t))return;e.uniform3uiv(this.addr,t),yp(n,t)}}function Fp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(vp(n,t))return;e.uniform4uiv(this.addr,t),yp(n,t)}}function Ip(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(cp.compareFunction=n.isReversedDepthBuffer()?518:515,a=cp):a=sp,n.setTexture2D(t||a,i)}function Lp(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||up,i)}function Rp(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||dp,i)}function zp(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||lp,i)}function Bp(e){switch(e){case 5126:return xp;case 35664:return Sp;case 35665:return Cp;case 35666:return wp;case 35674:return Tp;case 35675:return Ep;case 35676:return Dp;case 5124:case 35670:return Op;case 35667:case 35671:return kp;case 35668:case 35672:return Ap;case 35669:case 35673:return jp;case 5125:return Mp;case 36294:return Np;case 36295:return Pp;case 36296:return Fp;case 35678:case 36198:case 36298:case 36306:case 35682:return Ip;case 35679:case 36299:case 36307:return Lp;case 35680:case 36300:case 36308:case 36293:return Rp;case 36289:case 36303:case 36311:case 36292:return zp}}function Vp(e,t){e.uniform1fv(this.addr,t)}function Hp(e,t){let n=_p(t,this.size,2);e.uniform2fv(this.addr,n)}function Up(e,t){let n=_p(t,this.size,3);e.uniform3fv(this.addr,n)}function Wp(e,t){let n=_p(t,this.size,4);e.uniform4fv(this.addr,n)}function Gp(e,t){let n=_p(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Kp(e,t){let n=_p(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function qp(e,t){let n=_p(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Jp(e,t){e.uniform1iv(this.addr,t)}function Yp(e,t){e.uniform2iv(this.addr,t)}function Xp(e,t){e.uniform3iv(this.addr,t)}function Zp(e,t){e.uniform4iv(this.addr,t)}function Qp(e,t){e.uniform1uiv(this.addr,t)}function $p(e,t){e.uniform2uiv(this.addr,t)}function em(e,t){e.uniform3uiv(this.addr,t)}function tm(e,t){e.uniform4uiv(this.addr,t)}function nm(e,t,n){let r=this.cache,i=t.length,a=bp(n,i);vp(r,a)||(e.uniform1iv(this.addr,a),yp(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?cp:sp;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function rm(e,t,n){let r=this.cache,i=t.length,a=bp(n,i);vp(r,a)||(e.uniform1iv(this.addr,a),yp(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||up,a[e])}function im(e,t,n){let r=this.cache,i=t.length,a=bp(n,i);vp(r,a)||(e.uniform1iv(this.addr,a),yp(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||dp,a[e])}function am(e,t,n){let r=this.cache,i=t.length,a=bp(n,i);vp(r,a)||(e.uniform1iv(this.addr,a),yp(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||lp,a[e])}function om(e){switch(e){case 5126:return Vp;case 35664:return Hp;case 35665:return Up;case 35666:return Wp;case 35674:return Gp;case 35675:return Kp;case 35676:return qp;case 5124:case 35670:return Jp;case 35667:case 35671:return Yp;case 35668:case 35672:return Xp;case 35669:case 35673:return Zp;case 5125:return Qp;case 36294:return $p;case 36295:return em;case 36296:return tm;case 35678:case 36198:case 36298:case 36306:case 35682:return nm;case 35679:case 36299:case 36307:return rm;case 35680:case 36300:case 36308:case 36293:return im;case 36289:case 36303:case 36311:case 36292:return am}}var sm=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Bp(t.type)}},cm=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=om(t.type)}},lm=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},um=/(\w+)(\])?(\[|\.)?/g;function dm(e,t){e.seq.push(t),e.map[t.id]=t}function fm(e,t,n){let r=e.name,i=r.length;for(um.lastIndex=0;;){let a=um.exec(r),o=um.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){dm(n,l===void 0?new sm(s,e,t):new cm(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new lm(s),dm(n,e)),n=e}}}var pm=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);fm(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function mm(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var hm=37297,gm=0;function _m(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var vm=new Z;function ym(e){zc._getMatrix(vm,zc.workingColorSpace,e);let t=`mat3( ${vm.elements.map(e=>e.toFixed(4))} )`;switch(zc.getTransfer(e)){case sc:return[t,`LinearTransferOETF`];case cc:return[t,`sRGBTransferOETF`];default:return q(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function bm(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+_m(e.getShaderSource(t),r)}return i}function xm(e,t){let n=ym(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Sm={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Cm(e,t){let n=Sm[t];return n===void 0?(q(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var wm=new X;function Tm(){return zc.getLuminanceCoefficients(wm),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${wm.x.toFixed(4)}, ${wm.y.toFixed(4)}, ${wm.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Em(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(km).join(`
`)}function Dm(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Om(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function km(e){return e!==``}function Am(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function jm(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Mm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nm(e){return e.replace(Mm,Fm)}var Pm=new Map;function Fm(e,t){let n=Q[t];if(n===void 0){let e=Pm.get(t);if(e!==void 0)n=Q[e],q(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`Can not resolve #include <`+t+`>`)}return Nm(n)}var Im=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Lm(e){return e.replace(Im,Rm)}function Rm(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function zm(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Bm={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Vm(e){return Bm[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Hm={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Um(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Hm[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Wm={302:`ENVMAP_MODE_REFRACTION`};function Gm(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Wm[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Km={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function qm(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Km[e.combine]||`ENVMAP_BLENDING_NONE`}function Jm(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Ym(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Vm(n),l=Um(n),u=Gm(n),d=qm(n),f=Jm(n),p=Em(n),m=Dm(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(km).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(km).join(`
`),_.length>0&&(_+=`
`)):(g=[zm(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(km).join(`
`),_=[zm(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Q.tonemapping_pars_fragment,n.toneMapping===0?``:Cm(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Q.colorspace_pars_fragment,xm(`linearToOutputTexel`,n.outputColorSpace),Tm(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(km).join(`
`)),o=Nm(o),o=Am(o,n),o=jm(o,n),s=Nm(s),s=Am(s,n),s=jm(s,n),o=Lm(o),s=Lm(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=mm(i,i.VERTEX_SHADER,y),S=mm(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.morphTargets===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=bm(i,x,`vertex`),n=bm(i,S,`fragment`);J(`THREE.WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):q(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new pm(i,h),T=Om(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,hm)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=gm++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Xm=0,Zm=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),i=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Qm(e),t.set(e,n)),n}},Qm=class{constructor(e){this.id=Xm++,this.code=e,this.usedTimes=0}};function $m(e){return e===1030||e===37490||e===36285}function eh(e,t,n,r,i,a){let o=new fl,s=new Zm,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&q(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=Sf[C];D=e.vertexShader,O=e.fragmentShader}else D=i.vertexShader,O=i.fragmentShader,s.update(i),k=s.getVertexShaderID(i),A=s.getFragmentShaderID(i);let ee=e.getRenderTarget(),te=e.state.buffers.depth.getReversed(),ne=h.isInstancedMesh===!0,j=h.isBatchedMesh===!0,re=!!i.map,M=!!i.matcap,ie=!!x,ae=!!i.aoMap,oe=!!i.lightMap,se=!!i.bumpMap,ce=!!i.normalMap,le=!!i.displacementMap,ue=!!i.emissiveMap,de=!!i.metalnessMap,fe=!!i.roughnessMap,pe=i.anisotropy>0,me=i.clearcoat>0,he=i.dispersion>0,N=i.iridescence>0,P=i.sheen>0,ge=i.transmission>0,_e=pe&&!!i.anisotropyMap,ve=me&&!!i.clearcoatMap,ye=me&&!!i.clearcoatNormalMap,F=me&&!!i.clearcoatRoughnessMap,be=N&&!!i.iridescenceMap,xe=N&&!!i.iridescenceThicknessMap,Se=P&&!!i.sheenColorMap,I=P&&!!i.sheenRoughnessMap,Ce=!!i.specularMap,L=!!i.specularColorMap,R=!!i.specularIntensityMap,we=ge&&!!i.transmissionMap,Te=ge&&!!i.thicknessMap,Ee=!!i.gradientMap,De=!!i.alphaMap,Oe=i.alphaTest>0,ke=!!i.alphaHash,Ae=!!i.extensions,je=0;i.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(je=e.toneMapping);let Me={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:j,batchingColor:j&&h._colorsTexture!==null,instancing:ne,instancingColor:ne&&h.instanceColor!==null,instancingMorph:ne&&h.morphTexture!==null,outputColorSpace:ee===null?e.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:zc.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:re,matcap:M,envMap:ie,envMapMode:ie&&x.mapping,envMapCubeUVHeight:S,aoMap:ae,lightMap:oe,bumpMap:se,normalMap:ce,displacementMap:le,emissiveMap:ue,normalMapObjectSpace:ce&&i.normalMapType===1,normalMapTangentSpace:ce&&i.normalMapType===0,packedNormalMap:ce&&i.normalMapType===0&&$m(i.normalMap.format),metalnessMap:de,roughnessMap:fe,anisotropy:pe,anisotropyMap:_e,clearcoat:me,clearcoatMap:ve,clearcoatNormalMap:ye,clearcoatRoughnessMap:F,dispersion:he,iridescence:N,iridescenceMap:be,iridescenceThicknessMap:xe,sheen:P,sheenColorMap:Se,sheenRoughnessMap:I,specularMap:Ce,specularColorMap:L,specularIntensityMap:R,transmission:ge,transmissionMap:we,thicknessMap:Te,gradientMap:Ee,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:De,alphaTest:Oe,alphaHash:ke,combine:i.combine,mapUv:re&&m(i.map.channel),aoMapUv:ae&&m(i.aoMap.channel),lightMapUv:oe&&m(i.lightMap.channel),bumpMapUv:se&&m(i.bumpMap.channel),normalMapUv:ce&&m(i.normalMap.channel),displacementMapUv:le&&m(i.displacementMap.channel),emissiveMapUv:ue&&m(i.emissiveMap.channel),metalnessMapUv:de&&m(i.metalnessMap.channel),roughnessMapUv:fe&&m(i.roughnessMap.channel),anisotropyMapUv:_e&&m(i.anisotropyMap.channel),clearcoatMapUv:ve&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:ye&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:F&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:I&&m(i.sheenRoughnessMap.channel),specularMapUv:Ce&&m(i.specularMap.channel),specularColorMapUv:L&&m(i.specularColorMap.channel),specularIntensityMapUv:R&&m(i.specularIntensityMap.channel),transmissionMapUv:we&&m(i.transmissionMap.channel),thicknessMapUv:Te&&m(i.thicknessMap.channel),alphaMapUv:De&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(ce||pe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(re||De),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&ce===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:te,skinning:h.isSkinnedMesh===!0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:je,decodeVideoTexture:re&&i.map.isVideoTexture===!0&&zc.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ue&&i.emissiveMap.isVideoTexture===!0&&zc.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ae&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ae&&i.extensions.multiDraw===!0||j)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Me.vertexUv1s=c.has(1),Me.vertexUv2s=c.has(2),Me.vertexUv3s=c.has(3),c.clear(),Me}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Sf[t];n=Td.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Ym(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function th(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function nh(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function rh(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function ih(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||nh),r.length>1&&r.sort(t||rh),i.length>1&&i.sort(t||rh)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function ah(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new ih,e.set(t,[i])):n>=r.length?(i=new ih,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function oh(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new X,color:new Il};break;case`SpotLight`:n={position:new X,direction:new X,color:new Il,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new X,color:new Il,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new X,skyColor:new Il,groundColor:new Il};break;case`RectAreaLight`:n={color:new Il,position:new X,halfWidth:new X,halfHeight:new X}}return e[t.id]=n,n}}}function sh(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jc};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jc};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jc,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var ch=0;function lh(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function uh(e){let t=new oh,n=sh(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new X);let i=new X,a=new tl,o=new tl;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(lh);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=null;if(y.shadow&&y.shadow.map&&(C=y.shadow.map.texture.format===1030?y.shadow.map.texture:y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=$.LTC_FLOAT_1,r.rectAreaLTC2=$.LTC_FLOAT_2):(r.rectAreaLTC1=$.LTC_HALF_1,r.rectAreaLTC2=$.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=ch++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function dh(e){let t=new uh(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function fh(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new dh(e),t.set(n,[a])):r>=i.length?(a=new dh(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var ph=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,mh=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,hh=[new X(1,0,0),new X(-1,0,0),new X(0,1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1)],gh=[new X(0,-1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1),new X(0,-1,0),new X(0,-1,0)],_h=new tl,vh=new X,yh=new X;function bh(e,t,n){let r=new fd,i=new jc,a=new jc,o=new Xc,s=new Ad,c=new jd,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new Od({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new jc},radius:{value:4}},vertexShader:ph,fragmentShader:mh}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Mu;m.setAttribute(`position`,new _u(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new td(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(q(`WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){q(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){q(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Qc(i.x,i.y,{format:fs,type:$o,minFilter:Uo,magFilter:Uo,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new md(i.x,i.y,Qo),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=cs,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Bo,d.map.depthTexture.magFilter=Bo}else l.isPointLight?(d.map=new Zf(i.x),d.map.depthTexture=new hd(i.x,Zo)):(d.map=new Qc(i.x,i.y),d.map.depthTexture=new md(i.x,i.y,Zo)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=cs,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=Uo,d.map.depthTexture.magFilter=Uo):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Bo,d.map.depthTexture.magFilter=Bo);d.camera.updateProjectionMatrix()}let g=d.map.isWebGLCubeRenderTarget?6:1;for(let t=0;t<g;t++){if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),vh.setFromMatrixPosition(l.matrixWorld),e.position.copy(vh),yh.copy(e.position),yh.add(hh[t]),e.up.copy(gh[t]),e.lookAt(yh),e.updateMatrixWorld(),n.makeTranslation(-vh.x,-vh.y,-vh.z),_h.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(_h,e.coordinateSystem,e.reversedDepth)}else d.updateMatrices(l);r=d.getFrustum(),b(n,s,d.camera,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new Qc(i.x,i.y,{format:fs,type:$o})),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value=n.mapSize,f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function xh(e,t){function n(){let t=!1,n=new Xc,r=null,i=new Xc(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?de(e.DEPTH_TEST):fe(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=xc[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?de(e.STENCIL_TEST):fe(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Il(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,te=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ne=!1,j=0,re=e.getParameter(e.VERSION);re.indexOf(`WebGL`)===-1?re.indexOf(`OpenGL ES`)!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),ne=j>=2):(j=parseFloat(/^WebGL (\d)/.exec(re)[1]),ne=j>=1);let M=null,ie={},ae=e.getParameter(e.SCISSOR_BOX),oe=e.getParameter(e.VIEWPORT),se=new Xc().fromArray(ae),ce=new Xc().fromArray(oe);function le(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ue={};ue[e.TEXTURE_2D]=le(e.TEXTURE_2D,e.TEXTURE_2D,1),ue[e.TEXTURE_CUBE_MAP]=le(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[e.TEXTURE_2D_ARRAY]=le(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ue[e.TEXTURE_3D]=le(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),de(e.DEPTH_TEST),o.setFunc(3),ve(!1),ye(1),de(e.CULL_FACE),ge(0);function de(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function fe(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function pe(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function me(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function he(t){return h!==t&&(e.useProgram(t),h=t,!0)}let N={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};N[103]=e.MIN,N[104]=e.MAX;let P={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ge(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(fe(e.BLEND),g=!1);else if(g===!1&&(de(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:J(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:J(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:J(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:J(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(N[n],N[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(P[r],P[i],P[o],P[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function _e(t,n){t.side===2?fe(e.CULL_FACE):de(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ve(r),t.blending===1&&t.transparent===!1?ge(0):ge(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),be(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?de(e.SAMPLE_ALPHA_TO_COVERAGE):fe(e.SAMPLE_ALPHA_TO_COVERAGE)}function ve(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ye(t){t===0?fe(e.CULL_FACE):(de(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function F(t){t!==k&&(ne&&e.lineWidth(t),k=t)}function be(t,n,r){t?(de(e.POLYGON_OFFSET_FILL),(A!==n||ee!==r)&&(A=n,ee=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):fe(e.POLYGON_OFFSET_FILL)}function xe(t){t?de(e.SCISSOR_TEST):fe(e.SCISSOR_TEST)}function Se(t){t===void 0&&(t=e.TEXTURE0+te-1),M!==t&&(e.activeTexture(t),M=t)}function I(t,n,r){r===void 0&&(r=M===null?e.TEXTURE0+te-1:M);let i=ie[r];i===void 0&&(i={type:void 0,texture:void 0},ie[r]=i),(i.type!==t||i.texture!==n)&&(M!==r&&(e.activeTexture(r),M=r),e.bindTexture(t,n||ue[t]),i.type=t,i.texture=n)}function Ce(){let t=ie[M];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function L(){try{e.compressedTexImage2D(...arguments)}catch(e){J(`WebGLState:`,e)}}function R(){try{e.compressedTexImage3D(...arguments)}catch(e){J(`WebGLState:`,e)}}function we(){try{e.texSubImage2D(...arguments)}catch(e){J(`WebGLState:`,e)}}function Te(){try{e.texSubImage3D(...arguments)}catch(e){J(`WebGLState:`,e)}}function Ee(){try{e.compressedTexSubImage2D(...arguments)}catch(e){J(`WebGLState:`,e)}}function De(){try{e.compressedTexSubImage3D(...arguments)}catch(e){J(`WebGLState:`,e)}}function Oe(){try{e.texStorage2D(...arguments)}catch(e){J(`WebGLState:`,e)}}function ke(){try{e.texStorage3D(...arguments)}catch(e){J(`WebGLState:`,e)}}function Ae(){try{e.texImage2D(...arguments)}catch(e){J(`WebGLState:`,e)}}function je(){try{e.texImage3D(...arguments)}catch(e){J(`WebGLState:`,e)}}function Me(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ne(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Pe(t){se.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),se.copy(t))}function Fe(t){ce.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ce.copy(t))}function Ie(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Le(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Re(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},M=null,ie={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Il(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,se.set(0,0,e.canvas.width,e.canvas.height),ce.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:de,disable:fe,bindFramebuffer:pe,drawBuffers:me,useProgram:he,setBlending:ge,setMaterial:_e,setFlipSided:ve,setCullFace:ye,setLineWidth:F,setPolygonOffset:be,setScissorTest:xe,activeTexture:Se,bindTexture:I,unbindTexture:Ce,compressedTexImage2D:L,compressedTexImage3D:R,texImage2D:Ae,texImage3D:je,pixelStorei:Ne,getParameter:Me,updateUBOMapping:Ie,uniformBlockBinding:Le,texStorage2D:Oe,texStorage3D:ke,texSubImage2D:we,texSubImage3D:Te,compressedTexSubImage2D:Ee,compressedTexSubImage3D:De,scissor:Pe,viewport:Fe,reset:Re}}function Sh(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new jc,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):mc(`canvas`)}function g(e,t,n){let r=1,i=L(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),q(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&q(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];q(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||q(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?sc:zc.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,q(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function ee(e){O=e}function te(){let e=O;return e>=i.maxTextures&&q(`WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function ne(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function j(t,i){let a=r.get(t);if(t.isVideoTexture&&I(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)q(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)q(`WebGLRenderer: Texture marked for update but image is incomplete`);else{fe(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function re(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?fe(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function M(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?fe(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ie(t,i){let a=r.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version?pe(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ae={[Lo]:e.REPEAT,[Ro]:e.CLAMP_TO_EDGE,[zo]:e.MIRRORED_REPEAT},oe={[Bo]:e.NEAREST,[Vo]:e.NEAREST_MIPMAP_NEAREST,[Ho]:e.NEAREST_MIPMAP_LINEAR,[Uo]:e.LINEAR,[Wo]:e.LINEAR_MIPMAP_NEAREST,[Go]:e.LINEAR_MIPMAP_LINEAR},se={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ce(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&q(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ae[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ae[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ae[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,oe[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,oe[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,se[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function le(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=ne(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function ue(e,t,n){return Math.floor(Math.floor(e/n)/t)}function de(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ue(n.start,r.width,4),c=ue(t.start,r.width,4);n.start<=i+1&&a===c&&ue(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function fe(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=le(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=zc.getPrimaries(zc.workingColorSpace),r=o.colorSpace===``?null:zc.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=Ce(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);ce(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===ls,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&de(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=vf(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}o.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else q(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data)}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?q(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=vf(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}let r=e.RGBA,i=e.RGBA,a=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,r,i,a,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=L(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=L(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function pe(t,o,s){if(o.image.length!==6)return;let c=le(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=zc.getPrimaries(zc.workingColorSpace),r=o.colorSpace===``?null:zc.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Ce(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);ce(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?q(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=L(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function me(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Se(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,xe(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function he(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Se(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,xe(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,xe(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);Se(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,xe(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,xe(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function N(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`renderTarget.depthTexture must be an instance of THREE.DepthTexture`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,l.__webglTexture&&i.depthTexture.image.width===i.width&&i.depthTexture.image.height===i.height||(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),ce(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else j(i.depthTexture,0);let u=l.__webglTexture,d=xe(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Se(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Se(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`Unknown depthTexture format`)}function P(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)N(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?N(i.__webglFramebuffer[0],t,0):N(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),he(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),he(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ge(t,n,i){let a=r.get(t);n!==void 0&&me(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&P(t)}function _e(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Se(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=xe(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),he(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),ce(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)me(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else me(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),ce(c,a),me(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),ce(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)me(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else me(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&P(t)}function ve(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let ye=[],F=[];function be(t){if(t.samples>0){if(Se(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(ye.length=0,F.length=0,ye.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.resolveDepthBuffer===!1&&(ye.push(l),F.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,F)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ye))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function xe(e){return Math.min(i.maxSamples,e.samples)}function Se(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function I(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Ce(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(zc.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&q(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):J(`WebGLTextures: Unsupported texture color space:`,n)),t}function L(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=te,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=ee,this.setTexture2D=j,this.setTexture2DArray=re,this.setTexture3D=M,this.setTextureCube=ie,this.rebindTextures=ge,this.setupRenderTarget=_e,this.updateRenderTargetMipmap=ve,this.updateMultisampleRenderTarget=be,this.setupDepthRenderbuffer=P,this.setupFrameBufferTexture=me,this.useMultisampledRTT=Se,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Ch(e,t){function n(n,r=``){let i,a=zc.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var wh=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Th=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Eh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new gd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Od({vertexShader:wh,fragmentShader:Th,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new td(new vd(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Dh=class extends Sc{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Eh,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new jc,C=null,w=new $d;w.viewport=new Xc;let T=new $d;T.viewport=new Xc;let E=[w,T],D=new af,O=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new jl,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new jl,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new jl,b[e]=t),t.getHandSpace()};function A(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ee(){r.removeEventListener(`select`,A),r.removeEventListener(`selectstart`,A),r.removeEventListener(`selectend`,A),r.removeEventListener(`squeeze`,A),r.removeEventListener(`squeezestart`,A),r.removeEventListener(`squeezeend`,A),r.removeEventListener(`end`,ee),r.removeEventListener(`inputsourceschange`,te);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}O=null,k=null,h.reset();for(let e in g)delete g[e];e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,se.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&q(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&q(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,A),r.addEventListener(`selectstart`,A),r.addEventListener(`selectend`,A),r.addEventListener(`squeeze`,A),r.addEventListener(`squeezestart`,A),r.addEventListener(`squeezeend`,A),r.addEventListener(`end`,ee),r.addEventListener(`inputsourceschange`,te),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?ls:cs,a=_.stencil?ns:Zo);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Qc(d.textureWidth,d.textureHeight,{format:ss,type:Ko,depthTexture:new md(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Qc(f.framebufferWidth,f.framebufferHeight,{format:ss,type:Ko,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),se.setContext(r),se.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function te(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let ne=new X,j=new X;function re(e,t,n){ne.setFromMatrixPosition(t.matrixWorld),j.setFromMatrixPosition(n.matrixWorld);let r=ne.distanceTo(j),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function M(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),D.near=T.near=w.near=t,D.far=T.far=w.far=n,(O!==D.near||k!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),O=D.near,k=D.far),D.layers.mask=e.layers.mask|6,w.layers.mask=D.layers.mask&-5,T.layers.mask=D.layers.mask&-3;let i=e.parent,a=D.cameras;M(D,i);for(let e=0;e<a.length;e++)M(a[e],i);a.length===2?re(D,w,T):D.projectionMatrix.copy(w.projectionMatrix),ie(e,D,i)};function ie(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Tc*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(D)},this.getCameraTexture=function(e){return g[e]};let ae=null;function oe(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==D.cameras.length&&(D.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=E[n];o===void 0&&(o=new $d,o.layers.enable(n),o.viewport=new Xc,E[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(D.matrix.copy(o.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),i===!0&&D.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new gd,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ae&&ae(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let se=new bf;se.setAnimationLoop(oe),this.setAnimationLoop=function(e){ae=e},this.dispose=function(){}}},Oh=new tl,kh=new Z;kh.set(-1,0,0,0,1,0,0,0,1);function Ah(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,wd(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Oh.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(kh),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function jh(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(m(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return J(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let t=0,n=r.length;t<n;t++){let n=Array.isArray(r[t])?r[t]:[r[t]];for(let r=0,i=n.length;r<i;r++){let i=n[r];if(p(i,t,r,a)===!0){let t=i.__offset,n=Array.isArray(i.value)?i.value:[i.value],r=0;for(let a=0;a<n.length;a++){let o=n[a],s=h(o);typeof o==`number`||typeof o==`boolean`?(i.__data[0]=o,e.bufferSubData(e.UNIFORM_BUFFER,t+r,i.__data)):o.isMatrix3?(i.__data[0]=o.elements[0],i.__data[1]=o.elements[1],i.__data[2]=o.elements[2],i.__data[3]=0,i.__data[4]=o.elements[3],i.__data[5]=o.elements[4],i.__data[6]=o.elements[5],i.__data[7]=0,i.__data[8]=o.elements[6],i.__data[9]=o.elements[7],i.__data[10]=o.elements[8],i.__data[11]=0):ArrayBuffer.isView(o)?i.__data.set(new o.constructor(o.buffer,o.byteOffset,i.__data.length)):(o.toArray(i.__data,r),r+=s.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,t,i.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=h(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?q(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):q(`WebGLRenderer: Unsupported uniform value type.`,e),t}function g(t){let n=t.target;n.removeEventListener(`dispose`,g);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:_}}var Mh=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Nh=null;function Ph(){return Nh===null&&(Nh=new id(Mh,16,16,fs,$o),Nh.name=`DFG_LUT`,Nh.minFilter=Uo,Nh.magFilter=Uo,Nh.wrapS=Ro,Nh.wrapT=Ro,Nh.generateMipmaps=!1,Nh.needsUpdate=!0),Nh}var Fh=class{constructor(e={}){let{canvas:t=hc(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Ko}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([ms,ps,ds]),g=new Set([Ko,Zo,Yo,ns,es,ts]),_=new Uint32Array(4),v=new Int32Array(4),y=new X,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null;this._outputColorSpace=ac;let O=0,k=0,A=null,ee=-1,te=null,ne=new Xc,j=new Xc,re=null,M=new Il(0),ie=0,ae=t.width,oe=t.height,se=1,ce=null,le=null,ue=new Xc(0,0,ae,oe),de=new Xc(0,0,ae,oe),fe=!1,pe=new fd,me=!1,he=!1,N=new tl,P=new X,ge=new Xc,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ve=!1;function ye(){return A===null?se:1}let F=n;function be(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r184`),t.addEventListener(`webglcontextlost`,Ue,!1),t.addEventListener(`webglcontextrestored`,We,!1),t.addEventListener(`webglcontextcreationerror`,Ge,!1),F===null){let t=`webgl2`;if(F=be(t,e),F===null)throw be(t)?Error(`Error creating WebGL context with your selected attributes.`):Error(`Error creating WebGL context.`)}}catch(e){throw J(`WebGLRenderer: `+e.message),e}let xe,Se,I,Ce,L,R,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be;function Ve(){xe=new $f(F),xe.init(),Re=new Ch(F,xe),Se=new kf(F,xe,e,Re),I=new xh(F,xe),Se.reversedDepthBuffer&&d&&I.buffers.depth.setReversed(!0),Ce=new np(F),L=new th,R=new Sh(F,xe,I,L,Se,Re,Ce),we=new Qf(T),Te=new xf(F),ze=new Df(F,Te),Ee=new ep(F,Te,Ce,ze),De=new ip(F,Ee,Te,ze,Ce),Fe=new rp(F,Se,R),Me=new Af(L),Oe=new eh(T,we,xe,Se,ze,Me),ke=new Ah(T,L),Ae=new ah,je=new fh(xe),Pe=new Ef(T,we,I,De,p,s),Ne=new bh(T,De,Se),Be=new jh(F,Ce,Se,I),Ie=new Of(F,xe,Ce),Le=new tp(F,xe,Ce),Ce.programs=Oe.programs,T.capabilities=Se,T.extensions=xe,T.properties=L,T.renderLists=Ae,T.shadowMap=Ne,T.state=I,T.info=Ce}Ve(),m!==1009&&(w=new op(m,t.width,t.height,r,i));let He=new Dh(T,F);this.xr=He,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let e=xe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=xe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return se},this.setPixelRatio=function(e){e!==void 0&&(se=e,this.setSize(ae,oe,!1))},this.getSize=function(e){return e.set(ae,oe)},this.setSize=function(e,n,r=!0){He.isPresenting?q(`WebGLRenderer: Can't change size while VR device is presenting.`):(ae=e,oe=n,t.width=Math.floor(e*se),t.height=Math.floor(n*se),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(ae*se,oe*se).floor()},this.setDrawingBufferSize=function(e,n,r){ae=e,oe=n,se=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)J(`THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){q(`THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(ne)},this.getViewport=function(e){return e.copy(ue)},this.setViewport=function(e,t,n,r){e.isVector4?ue.set(e.x,e.y,e.z,e.w):ue.set(e,t,n,r),I.viewport(ne.copy(ue).multiplyScalar(se).round())},this.getScissor=function(e){return e.copy(de)},this.setScissor=function(e,t,n,r){e.isVector4?de.set(e.x,e.y,e.z,e.w):de.set(e,t,n,r),I.scissor(j.copy(de).multiplyScalar(se).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(e){I.setScissorTest(fe=e)},this.setOpaqueSort=function(e){ce=e},this.setTransparentSort=function(e){le=e},this.getClearColor=function(e){return e.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor(...arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(A!==null){let t=A.texture.format;e=h.has(t)}if(e){let e=A.texture.type,t=g.has(e),n=Pe.getClearColor(),r=Pe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,F.clearBufferuiv(F.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,F.clearBufferiv(F.COLOR,0,v))}else r|=F.COLOR_BUFFER_BIT}t&&(r|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&F.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Ue,!1),t.removeEventListener(`webglcontextrestored`,We,!1),t.removeEventListener(`webglcontextcreationerror`,Ge,!1),Pe.dispose(),Ae.dispose(),je.dispose(),L.dispose(),we.dispose(),De.dispose(),ze.dispose(),Be.dispose(),Oe.dispose(),He.dispose(),He.removeEventListener(`sessionstart`,Qe),He.removeEventListener(`sessionend`,$e),et.stop()};function Ue(e){e.preventDefault(),_c(`WebGLRenderer: Context Lost.`),E=!0}function We(){_c(`WebGLRenderer: Context Restored.`),E=!1;let e=Ce.autoReset,t=Ne.enabled,n=Ne.autoUpdate,r=Ne.needsUpdate,i=Ne.type;Ve(),Ce.autoReset=e,Ne.enabled=t,Ne.autoUpdate=n,Ne.needsUpdate=r,Ne.type=i}function Ge(e){J(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Ke(e){let t=e.target;t.removeEventListener(`dispose`,Ke),qe(t)}function qe(e){Je(e),L.remove(e)}function Je(e){let t=L.get(e).programs;t!==void 0&&(t.forEach(function(e){Oe.releaseProgram(e)}),e.isShaderMaterial&&Oe.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=_e);let o=i.isMesh&&i.matrixWorld.determinant()<0,s=ct(e,t,n,r,i);I.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ee.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;ze.setup(i,r,s,n,c);let h,g=Ie;if(c!==null&&(h=Te.get(c),g=Le,g.setIndex(h)),i.isMesh)r.wireframe===!0?(I.setLineWidth(r.wireframeLinewidth*ye()),g.setMode(F.LINES)):g.setMode(F.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),I.setLineWidth(e*ye()),i.isLineSegments?g.setMode(F.LINES):i.isLineLoop?g.setMode(F.LINE_LOOP):g.setMode(F.LINE_STRIP)}else i.isPoints?g.setMode(F.POINTS):i.isSprite&&g.setMode(F.TRIANGLES);if(i.isBatchedMesh){if(xe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Te.get(c).bytesPerElement:1,o=L.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(F,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function Ye(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,it(e,t,n),e.side=0,e.needsUpdate=!0,it(e,t,n),e.side=2):it(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),x=je.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t){if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];Ye(a,n,e),r.add(a)}else Ye(t,n,e),r.add(t)}}),x=C.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){L.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}xe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let Xe=null;function Ze(e){Xe&&Xe(e)}function Qe(){et.stop()}function $e(){et.start()}let et=new bf;et.setAnimationLoop(Ze),typeof self<`u`&&et.setContext(self),this.setAnimationLoop=function(e){Xe=e,He.setAnimationLoop(e),e===null?et.stop():et.start()},He.addEventListener(`sessionstart`,Qe),He.addEventListener(`sessionend`,$e),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){J(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=He.enabled===!0&&He.isPresenting===!0,r=w!==null&&(A===null||n)&&w.begin(T,A);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),He.enabled===!0&&He.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(He.cameraAutoUpdate===!0&&He.updateCamera(t),t=He.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,A),x=je.get(e,C.length),x.init(t),x.state.textureUnits=R.getTextureUnits(),C.push(x),N.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),pe.setFromProjectionMatrix(N,dc,t.reversedDepth),he=this.localClippingEnabled,me=Me.init(this.clippingPlanes,he),b=Ae.get(e,S.length),b.init(),S.push(b),He.enabled===!0&&He.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&z(e,t,-1/0,T.sortObjects)}z(e,t,0,T.sortObjects),b.finish(),T.sortObjects===!0&&b.sort(ce,le),ve=He.enabled===!1||He.isPresenting===!1||He.hasDepthSensing()===!1,ve&&Pe.addToRenderList(b,e),this.info.render.frame++,me===!0&&Me.beginShadows();let i=x.state.shadowsArray;if(Ne.render(i,e,t),me===!0&&Me.endShadows(),this.info.autoReset===!0&&this.info.reset(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];tt(n,r,e,a)}ve&&Pe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];B(b,e,n,n.viewport)}}else r.length>0&&tt(n,r,e,t),ve&&Pe.render(e),B(b,e,t)}A!==null&&k===0&&(R.updateMultisampleRenderTarget(A),R.updateRenderTargetMipmap(A)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),ze.resetDefaultState(),ee=-1,te=null,C.pop(),C.length>0?(x=C[C.length-1],R.setTextureUnits(x.state.textureUnits),me===!0&&Me.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function z(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||pe.intersectsSprite(e)){r&&ge.setFromMatrixPosition(e.matrixWorld).applyMatrix4(N);let t=De.update(e),i=e.material;i.visible&&b.push(e,t,i,n,ge.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||pe.intersectsObject(e))){let t=De.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),ge.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),ge.copy(e.boundingSphere.center)),ge.applyMatrix4(e.matrixWorld).applyMatrix4(N)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&b.push(e,t,s,n,ge.z,o)}}else i.visible&&b.push(e,t,i,n,ge.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)z(i[e],t,n,r)}function B(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),me===!0&&Me.setGlobalState(T.clippingPlanes,n),r&&I.viewport(ne.copy(r)),i.length>0&&nt(i,t,n),a.length>0&&nt(a,t,n),o.length>0&&nt(o,t,n),I.buffers.depth.setTest(!0),I.buffers.depth.setMask(!0),I.buffers.color.setMask(!0),I.setPolygonOffset(!1)}function tt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=xe.has(`EXT_color_buffer_half_float`)||xe.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Qc(1,1,{generateMipmaps:!0,type:e?$o:Ko,minFilter:Go,samples:Math.max(4,Se.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:zc.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||ne;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(M),ie=T.getClearAlpha(),ie<1&&T.setClearColor(16777215,.5),T.clear(),ve&&Pe.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),me===!0&&Me.setGlobalState(T.clippingPlanes,r),nt(e,n,r),R.updateMultisampleRenderTarget(a),R.updateRenderTargetMipmap(a),xe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,rt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(R.updateMultisampleRenderTarget(a),R.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(M,ie),d!==void 0&&(r.viewport=d),T.toneMapping=u}function nt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&rt(o,t,n,s,l,c)}}function rt(e,t,n,r,i,a){e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function it(e,t,n){t.isScene!==!0&&(t=_e);let r=L.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Oe.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Oe.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=we.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Ke),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return ot(e,s),d}else s.uniforms=Oe.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Oe.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Me.uniform),ot(e,s),r.needsLights=ut(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function at(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=pm.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function ot(e,t){let n=L.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function st(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function ct(e,t,n,r,i){t.isScene!==!0&&(t=_e),R.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=A===null?T.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:zc.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=we.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=L.get(r),y=x.state.lights;if(me===!0&&(he===!0||e!==te)){let t=e===te&&r.id===ee;Me.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Me.numPlanes||v.numIntersection!==Me.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=it(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(I.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==ee&&(ee=r.id,w=!0),v.needsLights){let e=st(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||te!==e){I.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(F,`projectionMatrix`,e.projectionMatrix),O.setValue(F,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(F,P.setFromMatrixPosition(e.matrixWorld)),Se.logarithmicDepthBuffer&&O.setValue(F,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(F,`isOrthographic`,e.isOrthographicCamera===!0),te!==e&&(te=e,w=!0,E=!0)}if(v.needsLights&&(y.state.directionalShadowMap.length>0&&O.setValue(F,`directionalShadowMap`,y.state.directionalShadowMap,R),y.state.spotShadowMap.length>0&&O.setValue(F,`spotShadowMap`,y.state.spotShadowMap,R),y.state.pointShadowMap.length>0&&O.setValue(F,`pointShadowMap`,y.state.pointShadowMap,R)),i.isSkinnedMesh){O.setOptional(F,i,`bindMatrix`),O.setOptional(F,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(F,`boneTexture`,e.boneTexture,R))}i.isBatchedMesh&&(O.setOptional(F,i,`batchingTexture`),O.setValue(F,`batchingTexture`,i._matricesTexture,R),O.setOptional(F,i,`batchingIdTexture`),O.setValue(F,`batchingIdTexture`,i._indirectTexture,R),O.setOptional(F,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(F,`batchingColorTexture`,i._colorsTexture,R));let ne=n.morphAttributes;if((ne.position!==void 0||ne.normal!==void 0||ne.color!==void 0)&&Fe.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(F,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=Ph()),w){if(O.setValue(F,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&lt(k,E),a&&r.fog===!0&&ke.refreshFogUniforms(k,a),ke.refreshMaterialUniforms(k,r,se,oe,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}pm.upload(F,at(v),k,R)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(pm.upload(F,at(v),k,R),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(F,`center`,i.center),O.setValue(F,`modelViewMatrix`,i.modelViewMatrix),O.setValue(F,`normalMatrix`,i.normalMatrix),O.setValue(F,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Be.update(n,S),Be.bind(n,S)}}return S}function lt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function ut(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return O},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(e,t,n){let r=L.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),L.get(e.texture).__webglTexture=t,L.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=L.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0};let dt=F.createFramebuffer();this.setRenderTarget=function(e,t=0,n=0){A=e,O=t,k=n;let r=null,i=!1,a=!1;if(e){let o=L.get(e);if(o.__useDefaultFramebuffer!==void 0){I.bindFramebuffer(F.FRAMEBUFFER,o.__webglFramebuffer),ne.copy(e.viewport),j.copy(e.scissor),re=e.scissorTest,I.viewport(ne),I.scissor(j),I.setScissorTest(re),ee=-1;return}if(o.__webglFramebuffer===void 0)R.setupRenderTarget(e);else if(o.__hasExternalTextures)R.rebindTextures(e,L.get(e.texture).__webglTexture,L.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&L.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.`);R.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=L.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&R.useMultisampledRTT(e)===!1?L.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,ne.copy(e.viewport),j.copy(e.scissor),re=e.scissorTest}else ne.copy(ue).multiplyScalar(se).floor(),j.copy(de).multiplyScalar(se).floor(),re=fe;if(n!==0&&(r=dt),I.bindFramebuffer(F.FRAMEBUFFER,r)&&I.drawBuffers(e,r),I.viewport(ne),I.scissor(j),I.setScissorTest(re),i){let r=L.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=L.get(e.textures[t]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=L.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,t.__webglTexture,n)}ee=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){J(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){I.bindFramebuffer(F.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s),!Se.textureFormatReadable(c)){J(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!Se.textureTypeReadable(l)){J(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&F.readPixels(t,n,r,i,Re.convert(c),Re.convert(l),a)}finally{let e=A===null?null:L.get(A).__webglFramebuffer;I.bindFramebuffer(F.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){I.bindFramebuffer(F.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s),!Se.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!Se.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,d),F.bufferData(F.PIXEL_PACK_BUFFER,a.byteLength,F.STREAM_READ),F.readPixels(t,n,r,i,Re.convert(l),Re.convert(u),0);let f=A===null?null:L.get(A).__webglFramebuffer;I.bindFramebuffer(F.FRAMEBUFFER,f);let p=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await bc(F,p,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,d),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,a),F.deleteBuffer(d),F.deleteSync(p),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;R.setTexture2D(e,0),F.copyTexSubImage2D(F.TEXTURE_2D,n,0,0,o,s,i,a),I.unbindTexture()};let ft=F.createFramebuffer(),pt=F.createFramebuffer();this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Re.convert(t.format),_=Re.convert(t.type),v;t.isData3DTexture?(R.setTexture3D(t,0),v=F.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(R.setTexture2DArray(t,0),v=F.TEXTURE_2D_ARRAY):(R.setTexture2D(t,0),v=F.TEXTURE_2D),I.activeTexture(F.TEXTURE0),I.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,t.flipY),I.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),I.pixelStorei(F.UNPACK_ALIGNMENT,t.unpackAlignment);let y=I.getParameter(F.UNPACK_ROW_LENGTH),b=I.getParameter(F.UNPACK_IMAGE_HEIGHT),x=I.getParameter(F.UNPACK_SKIP_PIXELS),S=I.getParameter(F.UNPACK_SKIP_ROWS),C=I.getParameter(F.UNPACK_SKIP_IMAGES);I.pixelStorei(F.UNPACK_ROW_LENGTH,h.width),I.pixelStorei(F.UNPACK_IMAGE_HEIGHT,h.height),I.pixelStorei(F.UNPACK_SKIP_PIXELS,l),I.pixelStorei(F.UNPACK_SKIP_ROWS,u),I.pixelStorei(F.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=L.get(e),r=L.get(t),h=L.get(n.__renderTarget),g=L.get(r.__renderTarget);I.bindFramebuffer(F.READ_FRAMEBUFFER,h.__webglFramebuffer),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,L.get(e).__webglTexture,i,d+n),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,L.get(t).__webglTexture,a,m+n)),F.blitFramebuffer(l,u,o,s,f,p,o,s,F.DEPTH_BUFFER_BIT,F.NEAREST);I.bindFramebuffer(F.READ_FRAMEBUFFER,null),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||L.has(e)){let n=L.get(e),r=L.get(t);I.bindFramebuffer(F.READ_FRAMEBUFFER,ft),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,pt);for(let e=0;e<c;e++)w?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,n.__webglTexture,i),T?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,r.__webglTexture,a),i===0?T?F.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):F.copyTexSubImage2D(v,a,f,p,l,u,o,s):F.blitFramebuffer(l,u,o,s,f,p,o,s,F.COLOR_BUFFER_BIT,F.NEAREST);I.bindFramebuffer(F.READ_FRAMEBUFFER,null),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?F.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h);I.pixelStorei(F.UNPACK_ROW_LENGTH,y),I.pixelStorei(F.UNPACK_IMAGE_HEIGHT,b),I.pixelStorei(F.UNPACK_SKIP_PIXELS,x),I.pixelStorei(F.UNPACK_SKIP_ROWS,S),I.pixelStorei(F.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&F.generateMipmap(v),I.unbindTexture()},this.initRenderTarget=function(e){L.get(e).__webglFramebuffer===void 0&&R.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?R.setTextureCube(e,0):e.isData3DTexture?R.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?R.setTexture2DArray(e,0):R.setTexture2D(e,0),I.unbindTexture()},this.resetState=function(){O=0,k=0,A=null,I.reset(),ze.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return dc}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=zc._getDrawingBufferColorSpace(e),t.unpackColorSpace=zc._getUnpackColorSpace()}};function Ih(e,t,n){return Math.max(t,Math.min(n,e))}var Lh=new u,Rh=new u,zh={x:`XYZ`,y:`YXZ`,z:`ZXY`};function Bh(e,t,r,i,a,o){Lh.copy(r),a!=null&&Lh.premultiply(Rh.copy(a).invert());let s=new n,c=new h,l=new n;Lh.decompose(s,c,l),$h(s,i.initialTargetPosition,o.translate??!0);let u,d=o.rotate??!0;if(d===!1)c.copy(i.initialTargetQuaternion),u=i.initialTargetRotation.clone();else if(Array.isArray(d)||d===!0||typeof d!=`string`&&!Array.isArray(d)&&d.x===!0&&d.y===!0&&d.z===!0)u=new y().setFromQuaternion(c,i.initialTargetRotation.order);else if(typeof d==`string`){let e=zh[d];u=new y().setFromQuaternion(c,e);for(let t of e){let e=t.toLowerCase();e!==d&&(u[e]=0)}u.order=i.initialTargetRotation.order,c.setFromEuler(u)}else u=Jh(c,i.initialTargetRotation,d);return typeof o.scale!=`object`||!o.scale.uniform?$h(l,i.initialTargetScale,o.scale??!0):eg(l,i.initialTargetScale,o.scale),{pointerAmount:t,position:s,quaternion:c,rotation:u,scale:l,time:e}}var Vh=new v,Hh=new n,Uh=new n,Wh=new n,Gh=new h;function Kh(e,t,n){return Vh.normal.copy(e),Vh.constant=0,qh(Hh,Vh.normal),Uh.copy(Hh),Uh.applyQuaternion(Gh.copy(t).invert().premultiply(n)),Vh.projectPoint(Hh,Hh).normalize(),Vh.projectPoint(Uh,Uh).normalize(),(Wh.crossVectors(Hh,Vh.normal).dot(Uh)<0?1:-1)*Hh.angleTo(Uh)}function qh(e,t){t.x===0?e.set(1,0,0):t.y===0?e.set(0,1,0):t.z===0?e.set(0,0,1):e.set(-t.y,t.x,0)}function Jh(e,t,n){let r=``,i=``;for(let e of t.order)n[e.toLowerCase()]===!1?i+=e:r+=e;let a=r+i,o=new y().setFromQuaternion(e,a);for(let e of a){let r=e.toLowerCase();o[r]=tg(r,o[r],t[r],n)}return e.setFromEuler(o),o}var Yh=new n,Xh=new v,Zh=new n,Qh=new n;function $h(e,t,r){if(Array.isArray(r))switch(r.length){case 0:e.copy(t);return;case 1:e.sub(t),yg(e,r[0]instanceof n?r[0]:Yh.fromArray(r[0])),e.add(t);return;case 2:Yh.crossVectors(r[0]instanceof n?r[0]:Zh.fromArray(r[0]),r[1]instanceof n?r[1]:Qh.fromArray(r[1])),Xh.setFromNormalAndCoplanarPoint(Yh,t),Xh.projectPoint(e,e);return}else e.x=tg(`x`,e.x,t.x,r),e.y=tg(`y`,e.y,t.y,r),e.z=tg(`z`,e.z,t.z,r)}function eg(e,t,n){if(Array.isArray(n))return;let r=-1/0,i=1/0;for(let e of[`x`,`y`,`z`]){let a=n[e],o=t[e];if(!Array.isArray(a)||o===0)continue;let s=a[0]/o,c=a[1]/o;r=Math.max(r,Math.min(s,c)),i=Math.min(i,Math.max(s,c))}if(r===-1/0&&i===1/0)return;let a=e.length()/t.length();e.copy(t).multiplyScalar(Ih(a,r,i))}function tg(e,t,n,r){if(typeof r==`boolean`)return r?t:n;if(typeof r==`string`)return r===e?t:n;let i=r[e];return i===!1?n:Array.isArray(i)?Ih(t,...i):t}function ng(e=!0,t,n,r,i,a){if(e){switch(t.length){case 0:case 3:return;case 1:_g(n,...t,r,i,a);return;case 2:gg(...t,n,r,i,a);return}throw Error(`space cannot be ${t.length}D but received (${t.map(e=>e.toArray().join(`/`)).join(`; `)})`)}}var rg={x:new n(1,0,0),y:new n(0,1,0),z:new n(0,0,1)};function ig(e,t,n,r,i){if(r!==!1){if(r===!0)e[0]=rg.x,e[1]=rg.y,e[2]=rg.z;else if(typeof r==`string`)ug(e,t,n,r,i);else if(Array.isArray(r))for(let a of r)ug(e,t,n,a,i);else r.x!==!1&&ug(e,t,n,`x`,i),r.y!==!1&&ug(e,t,n,`y`,i),r.z!==!1&&ug(e,t,n,`z`,i)}}var ag=new h,og=new y,sg=new n,cg=new n,lg=new n;function ug(e,t,r,i,a){if(Array.isArray(i)?sg.set(...i):i instanceof n?sg.copy(i):sg.copy(rg[i]),a===`translate`)sg.applyQuaternion(t),fg(e,sg);else if(a===`scale`)Array.isArray(i)?ag.identity():ag.setFromEuler(r),ag.premultiply(t),sg.applyQuaternion(ag),fg(e,sg);else{if(Array.isArray(i))og.set(0,0,0);else{og.copy(r);for(let e=2;e>=0;e--){let t=r.order[e].toLowerCase();if(og[t]=0,t===i)break}}ag.setFromEuler(og).premultiply(t),sg.normalize(),cg.set(0,1,0),sg.dot(cg)>.99&&cg.set(0,0,1),lg.crossVectors(sg,cg).normalize(),cg.copy(lg),lg.applyQuaternion(ag),fg(e,lg),lg.crossVectors(sg,cg).normalize(),lg.applyQuaternion(ag),fg(e,lg)}}var dg=new n;function fg(e,t){e.length!==3&&(e.length===0?e.push(t.clone()):e.length===1?Math.abs(e[0].dot(t))<.999&&e.push(t.clone()):(dg.crossVectors(e[0],e[1]),Math.abs(dg.dot(t))<.001||e.push(t.clone())))}var pg=new v,mg=new n,hg=new n;function gg(e,t,n,r,i,a){mg.crossVectors(e,t).normalize(),pg.setFromNormalAndCoplanarPoint(mg,n);let o=a==null?0:Math.abs(mg.dot(a));if(a==null||o<.01){pg.projectPoint(i,i);return}let s=-pg.distanceToPoint(r)/a.dot(pg.normal);s<0?pg.projectPoint(i,i):(hg.copy(i),i.copy(r).addScaledVector(a,s))}function _g(e,t,n,r,i){let a=i==null?0:1-Math.abs(t.dot(i));if(i==null||a<.001){vg(r,e,t);return}hg.subVectors(n,e);let o=t.dot(i),s=t.dot(hg),c=i.dot(hg),l=1-o*o,u=(s-o*c)/l;(o*s-c)/l<0?vg(r,e,t):(hg.copy(r),r.copy(e).addScaledVector(t,u))}function vg(e,t,n){e.sub(t),yg(e,n),e.add(t)}function yg(e,t){let n=e.dot(t);e.copy(t).multiplyScalar(n)}var bg=new u,xg=new u,Sg=new n,Cg=new n,wg=new h,Tg=new n(1,1,1),Eg=[];function Dg(e,t,n,r,i){return r==null?wg.identity():r.decompose(Sg,wg,Cg),Eg.length=0,ig(Eg,wg,n.initialTargetRotation,i.translate??!0,`translate`),xg.makeRotationFromQuaternion(wg.copy(t.initialPointerWorldQuaternion).invert()).multiply(bg.makeTranslation(Sg.copy(t.initialPointerWorldPoint).negate())),n.initialTargetParentWorldMatrix!=null&&xg.multiply(n.initialTargetParentWorldMatrix),ng(i.projectRays,Eg,t.initialPointerWorldPoint,t.pointerWorldOrigin,Sg.copy(t.pointerWorldPoint),t.pointerWorldDirection),wg.copy(t.pointerWorldQuaternion),(i.rotate??!0)===!1&&wg.copy(t.initialPointerWorldQuaternion),bg.compose(Sg,wg,Tg).multiply(xg).multiply(xg.compose(n.initialTargetPosition,n.initialTargetQuaternion,n.initialTargetScale)),Bh(e,1,bg,n,r,i)}var Og=new n,kg=new n,Ag=new n,jg=new n,Mg=new n,Ng=new n,Pg=new n,Fg=new u,Ig=new u,Lg=new u,Rg=new h,zg=new h,Bg=[];function Vg(e,t,n,r,i,a){i==null?Rg.identity():i.decompose(Ag,Rg,jg),Bg.length=0,ig(Bg,Rg,r.initialTargetRotation,a.translate??!0,`translate`),ig(Bg,Rg,r.initialTargetRotation,a.rotate??!0,`rotate`),ig(Bg,Rg,r.initialTargetRotation,a.scale??!0,`scale`),ng(a.projectRays,Bg,t.initialPointerWorldPoint,t.pointerWorldOrigin,Ag.copy(t.pointerWorldPoint),t.pointerWorldDirection),ng(a.projectRays,Bg,n.initialPointerWorldPoint,n.pointerWorldOrigin,jg.copy(n.pointerWorldPoint),n.pointerWorldDirection),Og.copy(n.initialPointerWorldPoint).sub(t.initialPointerWorldPoint),kg.copy(jg).sub(Ag),Ag.copy(Og),r.prevTwoPointerDeltaRotation!=null&&Ag.applyQuaternion(r.prevTwoPointerDeltaRotation),Ag.normalize(),jg.copy(kg).normalize(),Rg.setFromUnitVectors(Ag,jg),r.prevTwoPointerDeltaRotation==null?r.prevTwoPointerDeltaRotation=new h:Rg.multiply(r.prevTwoPointerDeltaRotation),r.prevTwoPointerDeltaRotation.copy(Rg);let o=(Kh(jg,t.prevPointerWorldQuaternion,t.pointerWorldQuaternion)+Kh(jg,n.prevPointerWorldQuaternion,n.pointerWorldQuaternion))*.5+(r.prevAngle??0);if(r.prevAngle=o,Rg.premultiply(zg.setFromAxisAngle(jg,o)),Lg.compose(r.initialTargetPosition,r.initialTargetQuaternion,r.initialTargetScale),r.initialTargetParentWorldMatrix!=null&&Lg.premultiply(r.initialTargetParentWorldMatrix),typeof a.scale==`object`&&(a.scale.uniform??!1))Pg.setScalar(kg.length()/Og.length());else{Lg.decompose(Mg,zg,Ng),Ag.copy(Og).applyQuaternion(zg.invert()).divide(Ng),Ag.x=Math.abs(Ag.x),Ag.y=Math.abs(Ag.y),Ag.z=Math.abs(Ag.z);let e=Math.max(...Ag.toArray());Ag.divideScalar(e),Pg.set(1,1,1),Pg.addScaledVector(Ag,kg.length()/Og.length()-1)}return Fg.makeTranslation(Ag.copy(kg).multiplyScalar(.5).add(t.pointerWorldPoint)).multiply(Ig.makeRotationFromQuaternion(Rg)).multiply(Ig.makeRotationFromQuaternion(zg.invert())).multiply(Ig.makeScale(Pg.x,Pg.y,Pg.z)).multiply(Ig.makeRotationFromQuaternion(zg.invert())).multiply(Ig.makeTranslation(Ag.copy(Og).multiplyScalar(.5).add(t.initialPointerWorldPoint).negate())).multiply(Lg),Bh(e,2,Fg,r,i,a)}var Hg=new n,Ug=new n,Wg=new n,Gg=new n,Kg=new n,qg=new h,Jg=new h,Yg=new u,Xg=new n,Zg=[];function Qg(e,t,n,r,i,a){if(i==null?qg.identity():i.decompose(Hg,qg,Ug),Zg.length=0,a.translate===`as-scale`&&ig(Zg,qg,n.initialTargetRotation,a.scale??!0,`scale`),a.translate!=`as-scale`&&ig(Zg,qg,n.initialTargetRotation,a.rotate??!0,`rotate`),Yg.makeTranslation(n.initialTargetPosition),n.initialTargetParentWorldMatrix!=null&&Yg.premultiply(n.initialTargetParentWorldMatrix),Gg.setFromMatrixPosition(Yg),ng(a.projectRays,Zg,t.initialPointerWorldPoint,t.pointerWorldOrigin,Gg,void 0),Gg.negate().add(t.initialPointerWorldPoint),Kg.setFromMatrixPosition(r),ng(a.projectRays,Zg,t.initialPointerWorldPoint,t.pointerWorldOrigin,Kg,void 0),ng(a.projectRays,Zg,t.initialPointerWorldPoint,t.pointerWorldOrigin,Ug.copy(t.pointerWorldPoint),t.pointerWorldDirection),Kg.negate().add(Ug),a.translate===`as-scale`?qg.copy(n.initialTargetQuaternion):(Hg.copy(Gg),n.prevTranslateAsDeltaRotation!=null&&Hg.applyQuaternion(n.prevTranslateAsDeltaRotation),Hg.normalize(),Ug.copy(Kg).normalize(),qg.setFromUnitVectors(Hg,Ug),n.prevTranslateAsDeltaRotation==null?n.prevTranslateAsDeltaRotation=new h:qg.multiply(n.prevTranslateAsDeltaRotation),n.prevTranslateAsDeltaRotation.copy(qg),n.initialTargetParentWorldMatrix!=null&&(Jg.setFromRotationMatrix(n.initialTargetParentWorldMatrix),qg.multiply(Jg.normalize()),qg.premultiply(Jg.invert())),qg.multiply(n.initialTargetQuaternion)),a.translate===`as-rotate`)Xg.set(1,1,1);else if(typeof a.scale==`object`&&(a.scale.uniform??!1))Xg.setScalar(Kg.length()/Gg.length());else if(a.translate===`as-rotate-and-scale`){Yg.compose(n.initialTargetPosition,n.initialTargetQuaternion,n.initialTargetScale),n.initialTargetParentWorldMatrix!=null&&Yg.premultiply(n.initialTargetParentWorldMatrix),Yg.decompose(Ug,Jg,Wg),Hg.copy(Gg).applyQuaternion(Jg.invert()).divide(Wg),Hg.x=Math.abs(Hg.x),Hg.y=Math.abs(Hg.y),Hg.z=Math.abs(Hg.z);let e=Math.max(...Hg.toArray());Hg.divideScalar(e),Xg.set(1,1,1),Xg.addScaledVector(Hg,Kg.length()/Gg.length()-1)}else n.initialTargetParentWorldMatrix==null?Jg.copy(n.initialTargetQuaternion):(n.initialTargetParentWorldMatrix.decompose(Hg,Jg,Ug),Jg.multiply(n.initialTargetQuaternion)),Hg.copy(Gg).applyQuaternion(Jg.invert()),i==null?Jg.copy(n.initialTargetQuaternion):(i.decompose(Ug,Jg,Wg),Jg.multiply(n.initialTargetQuaternion)),Ug.copy(Kg).applyQuaternion(Jg.invert()),Xg.x=Math.abs(Hg.x)<.001?1:Math.abs(Ug.x/Hg.x),Xg.y=Math.abs(Hg.y)<.001?1:Math.abs(Ug.y/Hg.y),Xg.z=Math.abs(Hg.z)<.001?1:Math.abs(Ug.z/Hg.z);return Xg.multiply(n.initialTargetScale),Yg.compose(n.initialTargetPosition,qg,Xg),Bh(e,1,Yg,n,void 0,a)}var $g=class{t1;t2;_position;_quaternion;_rotation;_scale;constructor(e,t){this.t1=e,this.t2=t}get time(){return this.t1.time-this.t2.time}get position(){return this._position??=this.t1.position.clone().sub(this.t2.position)}get quaternion(){return this._quaternion??=this.t2.quaternion.clone().invert().premultiply(this.t1.quaternion)}get rotation(){return this._rotation??=new y().setFromQuaternion(this.quaternion)}get scale(){return this._scale??=this.t1.scale.clone().sub(this.t2.scale)}},e_=class{cancel;previous;memo;event;initial;current;first;last;_delta;_offset;constructor(e){this.cancel=e}start(e,t){this.event=e,this.previous=void 0,this.current=t,this.initial=t,this.first=!0,this.last=!1,this.memo=void 0,this._delta=void 0,this._offset=void 0}update(e,t){this.event=e,this.previous=this.current,this.current=t,this.first=!1,this.last=!1,this._delta=void 0,this._offset=void 0}end(e){this.event=e,this.first=!1,this.last=!0,this._delta=void 0,this._offset=void 0}get delta(){if(this.previous!=null)return this._delta??=new $g(this.current,this.previous)}get offset(){return this._offset??=new $g(this.current,this.initial)}};function t_(e,t){if(e.details.type===`sphere`)return!1;if(e.details.type===`lines`){let{line:n}=e.details;return t.copy(n.end).sub(n.start).normalize(),!0}return e.details.type===`screen-ray`?(t.copy(e.details.direction),!0):(t.set(0,0,-1).applyQuaternion(e.pointerQuaternion),!0)}var n_=new n,r_=class{target;getOptions;outputState;latestMoveEvent;inputState=new Map;capturedObjects=new Map;initialTargetPosition=new n;initialTargetQuaternion=new h;initialTargetRotation=new y;initialTargetScale=new n;initialTargetParentWorldMatrix;prevTwoPointerDeltaRotation;prevTranslateAsDeltaRotation;prevAngle;handlers={onPointerDown:this.onPointerDown.bind(this),onPointerMove:this.onPointerMove.bind(this),onPointerEnd:this.onPointerEnd.bind(this)};constructor(e,t=()=>({})){this.target=e,this.getOptions=t,this.outputState=new e_(this.cancel.bind(this))}firstOnPointer(e){let t=this.getTarget();if(t==null)return;let n=t_(e,n_)?n_.clone():void 0;e.intersection.details.type,this.inputState.set(e.pointerId,{pointerWorldDirection:n,pointerWorldPoint:e.point,pointerWorldOrigin:e.pointerPosition,pointerWorldQuaternion:e.pointerQuaternion,initialPointerWorldPoint:e.point.clone(),initialPointerWorldDirection:n?.clone(),initialPointerWorldQuaternion:e.pointerQuaternion.clone(),prevPointerWorldQuaternion:e.pointerQuaternion}),this.save(),this.inputState.size===1&&this.outputState.start(e,{pointerAmount:1,time:e.timeStamp,position:this.initialTargetPosition.clone(),quaternion:this.initialTargetQuaternion.clone(),rotation:this.initialTargetRotation.clone(),scale:this.initialTargetScale.clone()}),this.outputState.memo=this.apply(t)}onPointerDown(e){this.getOptions().filter?.(e)!==!1&&(this.stopPropagation(e),this.capturePointer(e.pointerId,e.object)&&this.firstOnPointer(e))}onPointerMove(e){if(!this.capturedObjects.has(e.pointerId))return;this.stopPropagation(e);let t=this.inputState.get(e.pointerId);t==null?this.firstOnPointer(e):(this.latestMoveEvent=e,t.pointerWorldPoint=e.point,t.prevPointerWorldQuaternion=t.pointerWorldQuaternion,t.pointerWorldQuaternion=e.pointerQuaternion,t.pointerWorldOrigin=e.pointerPosition,t.pointerWorldDirection!=null&&t_(e,t.pointerWorldDirection))}cancel(){if(this.capturedObjects.size===0)return;for(let[e,t]of this.capturedObjects)t.releasePointerCapture(e);this.capturedObjects.clear(),this.inputState.clear(),this.outputState.end(void 0);let e=this.getTarget();e!=null&&this.apply(e)}onPointerEnd(e){let t=this.capturedObjects.get(e.pointerId);t!=null&&(this.stopPropagation(e),this.releasePointer(e.pointerId,t,e))}update(e){let t=this.getTarget();if(t==null||this.inputState.size===0||this.latestMoveEvent==null&&(this.getOptions().alwaysUpdate??!1)===!1)return;let n=this.getOptions(),r;if(n.translate===`as-rotate`||n.translate===`as-rotate-and-scale`||n.translate===`as-scale`){n.translate,this.prevTwoPointerDeltaRotation=void 0,this.prevAngle=void 0;let[i]=this.inputState.values(),a=t.matrixWorld,o=t.parent?.matrixWorld;r=Qg(e,i,this,a,o,n)}else if(this.inputState.size===1){this.prevTwoPointerDeltaRotation=void 0,this.prevAngle=void 0,this.prevTranslateAsDeltaRotation=void 0;let[i]=this.inputState.values();r=Dg(e,i,this,t.parent?.matrixWorld,n)}else{this.prevTranslateAsDeltaRotation=void 0;let[i,a]=this.inputState.values();r=Vg(e,i,a,this,t.parent?.matrixWorld,n)}this.outputState.update(this.latestMoveEvent,r),this.outputState.memo=this.apply(t),this.latestMoveEvent=void 0}getTarget(){return this.target instanceof d?this.target:this.target?.current}capturePointer(e,t){if(this.capturedObjects.has(e))return!1;let{multitouch:n,translate:r}=this.getOptions();return((n??!0)===!1||typeof r==`string`)&&this.capturedObjects.size===1?!1:(this.capturedObjects.set(e,t),t.setPointerCapture(e),!0)}releasePointer(e,t,n){let r=this.getTarget();r!=null&&this.capturedObjects.delete(e)&&(this.inputState.delete(e),t.releasePointerCapture(e),this.inputState.size>0?this.save():(this.outputState.end(n),this.apply(r)))}stopPropagation(e){e!=null&&(this.getOptions()?.stopPropagation??!0)&&e.stopPropagation()}apply(e){return(this.getOptions().apply??a_)(this.outputState,e)}getState(){return this.inputState.size===0?void 0:this.outputState}save(){let e=this.getTarget();if(e!=null){e.updateWorldMatrix(!0,!1),this.prevAngle=void 0,this.prevTwoPointerDeltaRotation=void 0,this.prevTranslateAsDeltaRotation=void 0,this.initialTargetParentWorldMatrix=e.parent?.matrixWorld.clone(),e.matrixAutoUpdate?(this.initialTargetPosition.copy(e.position),this.initialTargetQuaternion.copy(e.quaternion),this.initialTargetRotation.copy(e.rotation),this.initialTargetScale.copy(e.scale)):(e.matrix.decompose(this.initialTargetPosition,this.initialTargetQuaternion,this.initialTargetScale),this.initialTargetRotation.setFromQuaternion(this.initialTargetQuaternion,e.rotation.order));for(let e of this.inputState.values())e.pointerWorldDirection!=null&&e.initialPointerWorldDirection?.copy(e.pointerWorldDirection),e.initialPointerWorldPoint.copy(e.pointerWorldPoint),e.initialPointerWorldQuaternion.copy(e.pointerWorldQuaternion)}}bind(e){let{onPointerDown:t,onPointerMove:n,onPointerEnd:r}=this.handlers;return e.addEventListener(`pointerdown`,t),e.addEventListener(`pointermove`,n),e.addEventListener(`pointercancel`,r),e.addEventListener(`pointerup`,r),()=>{e.removeEventListener(`pointerdown`,t),e.removeEventListener(`pointermove`,n),e.removeEventListener(`pointercancel`,r),e.removeEventListener(`pointerup`,r),this.cancel()}}capture(e,t){return this.capturePointer(e,t)?()=>this.releasePointer(e,t,void 0):i_}};function i_(){}function a_(e,t){t.position.copy(e.current.position),t.rotation.order=e.current.rotation.order,t.quaternion.copy(e.current.quaternion),t.scale.copy(e.current.scale)}var o_=class{target;getOptions;handles=[];hoveredTagMap=new Map;hoverSubscriptions=[];applySubscriptions=[];space;constructor(e,t){this.target=e,this.getOptions=t}getSpace(){return this.space??`world`}getTarget(){return this.target instanceof d?this.target:this.target.current}getHandleOptions(e,t){let n=this.getOptions?.(),r=t?.();return{...n,...r,apply:(t,i)=>(this.onApply(e,t,i),(r?.apply??n?.apply??a_)?.(t,i))}}registerHandle(e,t,n){let r={object:t,store:e,tag:n};this.handles.push(r);let i=e.bind(t),a=this.onPointerEnter.bind(this,n),o=this.onPointerLeave.bind(this);return t.addEventListener(`pointerenter`,a),t.addEventListener(`pointerleave`,o),()=>{let t=this.handles.indexOf(r);t!=-1&&this.handles.splice(t,1),i(),e.cancel()}}subscribeHover(e){return this.hoverSubscriptions.push(e),e(Array.from(this.hoveredTagMap.values())),()=>{let t=this.hoverSubscriptions.indexOf(e);t!==-1&&this.hoverSubscriptions.splice(t,1)}}subscribeApply(e){return this.applySubscriptions.push(e),()=>{let t=this.applySubscriptions.indexOf(e);t!==-1&&this.applySubscriptions.splice(t,1)}}update(e){for(let{store:t}of this.handles)t.update(e)}onPointerEnter(e,t){this.hoveredTagMap.set(t.pointerId,e),this.updateHover()}onPointerLeave(e){this.hoveredTagMap.delete(e.pointerId),this.updateHover()}updateHover(){let e=Array.from(this.hoveredTagMap.values());for(let t of this.hoverSubscriptions)t(e)}onApply(e,t,n){for(let r of this.applySubscriptions)r(e,t,n)}},s_={depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0};function c_(e,t,n,{color:r,hoverColor:i,hoverOpacity:a,opacity:o,disabled:s=!1}){if(i==null&&a==null||s)t.color.set(r),t.opacity=o??1,s&&(t.opacity*=.5,t.color.lerp(new f(1,1,1),.5));else return i??=r,e.subscribeHover(e=>{let s=e.some(e=>e.includes(n));t.color.set(s?i:r),t.opacity=(s?a:o)??1})}var l_=new h,u_=new t;u_.setAttribute(`position`,new S([-1e3,0,0,1e3,0,0],3));var d_=class extends C{context;rotationOffset;constructor(e,t){super(u_),this.context=e,this.rotationOffset=t,this.renderOrder=1/0}update(){this.quaternion.setFromEuler(this.rotationOffset);let e=this.context.getTarget();this.context.getSpace()===`world`&&e!=null&&(e.getWorldQuaternion(l_).invert(),this.quaternion.premultiply(l_))}bind(e){this.material=new b({...s_,color:this.material.color??`white`,opacity:this.material.opacity??1});let t=this.context.subscribeHover(t=>{let n=t.some(t=>t.includes(e));this.visible=n}),n=this.context.subscribeApply((e,t)=>{if(t.last){this.position.set(0,0,0);return}this.position.copy(t.initial.position).sub(t.current.position);let n=this.context.getTarget();n!=null&&(l_.copy(n.quaternion).invert(),this.position.applyQuaternion(l_))});return()=>{this.material.dispose(),t(),n()}}},f_=class extends g{context;axis;store;options;tag;constructor(e,t,n,r){super(),this.context=e,this.axis=t,this.tag=(n??``)+t,this.store=new r_(e.target,()=>e.getHandleOptions(this.tag,r))}};function p_(e,t=!0){if(t===!1)return{options:!1,disabled:!0};if(t===!0){let t={x:!1,y:!1,z:!1,e:!1};for(let n of e)t[n]=!0;return{options:t,disabled:!1}}if(t===`disabled`)return{options:{x:!0,y:!0,z:!0,e:!0},disabled:!0};if(typeof t==`string`)return{options:t===e&&{x:!1,y:!1,z:!1,e:!1,[e]:!0},disabled:!1};let n={x:!1,y:!1,z:!1,e:!1},r=!1;for(let i of e){let e=t[i]??!0;if(e===!1)return{options:!1,disabled:!0};e===`disabled`&&(r=!0,e=!0),n[i]=e}return{options:n,disabled:r}}var m_=new n,h_=new n;function g_(e,t,n,r){if(!n)return r;let i;return t instanceof x?i=(t.top-t.bottom)/t.zoom:(t.getWorldPosition(m_),e.getWorldPosition(h_),i=m_.distanceTo(h_)*Math.min(1.9*Math.tan(Math.PI*t.fov/360)/t.zoom,7)),i*r/4}var __=new w(0,.04,.1,12);__.translate(0,.05,0);var v_=new w(.0075,.0075,.5,3);v_.translate(0,.25,0);var y_=new y(0,0,-Math.PI/2),b_=new y(0,0,Math.PI/2),x_=class extends f_{invert;showArrowBody;constructor(e,t,n=``,r,i=!1,a=!0){super(e,t,n,()=>({scale:!1,rotate:!1,translate:r==null?this.options:[r],multitouch:!1})),this.invert=i,this.showArrowBody=a}bind(e,t,n){let{options:r,disabled:i}=p_(this.axis,n);if(r===!1)return;this.options=r;let a=this.invert?b_:y_,o=new T(s_),s=c_(this.context,o,this.tag,{color:e,hoverColor:t,disabled:i}),c=new _(__,o);c.renderOrder=1/0,c.position.x=this.invert?-.5:.5,c.rotation.copy(a),this.add(c);let l,u;if(this.showArrowBody){let t=new T(s_);l=c_(this.context,t,this.tag,{color:e,hoverColor:16777024,disabled:i}),u=new _(v_,t),u.renderOrder=1/0,u.rotation.copy(a),this.add(u)}let d=new _(new w(.13,0,.6,4));d.pointerEventsOrder=1/0,d.position.x=this.invert?-.3:.3,d.rotation.copy(a),d.visible=!1,this.add(d);let f=i?void 0:this.context.registerHandle(this.store,d,this.tag);return()=>{o.dispose(),f?.(),s?.(),l?.(),this.remove(c),u!=null&&this.remove(u),this.remove(d)}}},S_=class extends f_{constructor(e,t,n=``,r){super(e,t,n,()=>({translate:r??this.options,scale:!1,rotate:!1,multitouch:!1}))}bind(e,t,n){let{options:r,disabled:i}=p_(this.axis,n);if(r===!1)return;this.options=r;let a=new T(s_),s=c_(this.context,a,this.tag,{opacity:.5,hoverOpacity:1,color:e,hoverColor:t,disabled:i}),c=new _(new o(.2,.2,.01),a);c.renderOrder=1/0,c.pointerEventsOrder=1/0,c.position.set(.15,.15,0);let l=i?void 0:this.context.registerHandle(this.store,c,this.tag);return this.add(c),()=>{a.dispose(),c.geometry.dispose(),l?.(),s?.(),this.remove(c)}}};new n;var C_=new h;function w_(e,n){let r=new _(new p(.01,2),new T(s_));r.renderOrder=1/0,r.visible=!1,e.add(r);let i=new _(new p(.01,2),new T(s_));i.renderOrder=1/0,i.visible=!1,e.add(i);let a=new t;a.setAttribute(`position`,new S([0,0,0,1,1,1],3));let o=new C(a,new b(s_));o.renderOrder=1/0,o.visible=!1,e.add(o);let s=n.subscribeApply((e,t)=>{i.position.set(0,0,0),r.position.copy(t.initial.position).sub(t.current.position);let a=n.getTarget();a!=null&&(C_.copy(a.quaternion).invert(),r.position.applyQuaternion(C_)),o.position.set(0,0,0),o.scale.copy(r.position),r.visible=!t.last,o.visible=!t.last,i.visible=!t.last});return()=>{r.geometry.dispose(),r.material.dispose(),i.geometry.dispose(),i.material.dispose(),o.geometry.dispose(),o.material.dispose(),e.remove(r),e.remove(i),e.remove(o),s()}}var T_=class extends f_{constructor(e){super(e,`xyz`,``,()=>({translate:this.options,scale:!1,rotate:!1,multitouch:!1}))}bind(e){let{options:t,disabled:n}=p_(this.axis,e);if(t===!1)return;this.options=t;let r=new T(s_),i=c_(this.context,r,this.tag,{color:16777215,hoverColor:16776960,opacity:.25,hoverOpacity:1,disabled:n}),a=new _(new p(.1,0),r);a.renderOrder=1/0,this.add(a);let o=new _(new p(.2,0));o.pointerEventsOrder=1/0,o.visible=!1,this.add(o);let s=n?void 0:this.context.registerHandle(this.store,o,this.tag);return()=>{r.dispose(),a.geometry.dispose(),o.geometry.dispose(),s?.(),i?.(),this.remove(a),this.remove(o)}}},E_=new n,D_=new h,O_=new h,k_=new h().setFromEuler(new y(0,0,Math.PI/2)),A_=new h().setFromEuler(new y(0,-Math.PI/2,0)),j_=new h,M_=new h().setFromEuler(new y(0,-Math.PI/2,0)),N_=new h().setFromEuler(new y(Math.PI/2,0,0)),P_=class extends g{context;size;fixed;free;translationX;translationY;translationZ;translationNegX;translationNegY;translationNegZ;translationXY;translationYZ;translationXZ;scaleGroup=new g;xAxis=new n;yAxis=new n;zAxis=new n;negXAxis=new n;negYAxis=new n;negZAxis=new n;constructor(e,t,n){super(),this.context=e,this.size=t,this.fixed=n,this.add(this.scaleGroup),this.free=new T_(this.context),this.scaleGroup.add(this.free),this.translationX=new x_(this.context,`x`,void 0,this.xAxis),this.scaleGroup.add(this.translationX),this.translationY=new x_(this.context,`y`,void 0,this.yAxis),this.scaleGroup.add(this.translationY),this.translationZ=new x_(this.context,`z`,void 0,this.zAxis),this.scaleGroup.add(this.translationZ),this.translationNegX=new x_(this.context,`x`,void 0,this.negXAxis,!0,!1),this.scaleGroup.add(this.translationNegX),this.translationNegY=new x_(this.context,`y`,void 0,this.negYAxis,!0,!1),this.scaleGroup.add(this.translationNegY),this.translationNegZ=new x_(this.context,`z`,void 0,this.negZAxis,!0,!1),this.scaleGroup.add(this.translationNegZ),this.translationXY=new S_(this.context,`xy`,void 0,[this.xAxis,this.yAxis]),this.scaleGroup.add(this.translationXY),this.translationXZ=new S_(this.context,`xz`,void 0,[this.xAxis,this.zAxis]),this.scaleGroup.add(this.translationXZ),this.translationYZ=new S_(this.context,`yz`,void 0,[this.yAxis,this.zAxis]),this.scaleGroup.add(this.translationYZ)}update(e){this.updateWorldMatrix(!0,!1),this.xAxis.set(1,0,0),this.yAxis.set(0,1,0),this.zAxis.set(0,0,1),this.free.quaternion.identity(),this.translationX.quaternion.copy(O_),this.translationY.quaternion.copy(k_),this.translationZ.quaternion.copy(A_),this.translationNegX.quaternion.copy(O_),this.translationNegY.quaternion.copy(k_),this.translationNegZ.quaternion.copy(A_),this.translationXY.quaternion.copy(j_),this.translationYZ.quaternion.copy(M_),this.translationXZ.quaternion.copy(N_);let t=this.context.getSpace(),n=this.context.getTarget();t==`world`&&n!=null?(n.getWorldQuaternion(D_).invert(),this.free.quaternion.premultiply(D_),this.translationX.quaternion.premultiply(D_),this.translationY.quaternion.premultiply(D_),this.translationZ.quaternion.premultiply(D_),this.translationNegX.quaternion.premultiply(D_),this.translationNegY.quaternion.premultiply(D_),this.translationNegZ.quaternion.premultiply(D_),this.translationXY.quaternion.premultiply(D_),this.translationYZ.quaternion.premultiply(D_),this.translationXZ.quaternion.premultiply(D_),n.parent!=null&&(n.parent.getWorldQuaternion(D_).invert(),this.xAxis.applyQuaternion(D_),this.yAxis.applyQuaternion(D_),this.zAxis.applyQuaternion(D_))):n!=null&&(this.xAxis.applyQuaternion(n.quaternion),this.yAxis.applyQuaternion(n.quaternion),this.zAxis.applyQuaternion(n.quaternion)),this.negXAxis.copy(this.xAxis).negate(),this.negYAxis.copy(this.yAxis).negate(),this.negZAxis.copy(this.zAxis).negate(),this.scaleGroup.scale.setScalar(1),n!=null&&(n.getWorldScale(E_),this.scaleGroup.scale.divide(E_)),this.scaleGroup.scale.multiplyScalar(g_(this,e,this.fixed??!0,this.size??1))}bind(e){let t=w_(this,this.context),n=this.translationX.bind(16711680,16776960,e),r=this.translationY.bind(65280,16776960,e),i=this.translationZ.bind(255,16776960,e),a=this.translationNegX.bind(16711680,16776960,e),o=this.translationNegY.bind(65280,16776960,e),s=this.translationNegZ.bind(255,16776960,e),c=this.translationXY.bind(255,16776960,e),l=this.translationYZ.bind(16711680,16776960,e),u=this.translationXZ.bind(65280,16776960,e),d=this.free.bind(e);return()=>{t(),n?.(),r?.(),i?.(),a?.(),o?.(),s?.(),c?.(),l?.(),u?.(),d?.()}}},F_=new y(0,0,-Math.PI/2),I_=new y(0,0,Math.PI/2),L_=class extends f_{invert;showHandleLine;constructor(e,t,n=``,r=!1,i=!0){super(e,t,n,()=>({scale:this.options,rotate:!1,translate:`as-scale`,multitouch:!1})),this.invert=r,this.showHandleLine=i}bind(e,t,n){let{options:r,disabled:i}=p_(this.axis,n);if(r===!1)return;this.options=r;let a=this.invert?I_:F_,s=new g;s.position.x=this.invert?-.5:.5,s.rotation.copy(a),this.add(s);let c=new T(s_),l=c_(this.context,c,this.tag,{color:e,hoverColor:t,disabled:i}),u=new _(new o(.08,.08,.08),c);u.renderOrder=1/0,u.rotation.copy(a),s.add(u);let d,f,p;if(this.showHandleLine){p=new g,p.rotation.copy(a),this.add(p);let n=new T(s_);d=c_(this.context,n,this.tag,{color:e,hoverColor:t,disabled:i}),f=new _(new w(.0075,.0075,.5,3),n),f.renderOrder=1/0,f.position.y=.25,p.add(f)}let m=new g;m.visible=!1,m.rotation.copy(a),m.position.x=this.invert?-.3:.3,this.add(m);let h=new _(new w(.2,0,.5,4));h.pointerEventsOrder=1/0,h.position.y=.04,m.add(h);let v=i?void 0:this.context.registerHandle(this.store,h,this.tag);return()=>{c.dispose(),h.geometry.dispose(),u.geometry.dispose(),f?.geometry.dispose(),v?.(),l?.(),d?.(),p!=null&&this.remove(p),this.remove(m),this.remove(s)}}},R_=class extends f_{constructor(e,t,n=``){super(e,t,n,()=>({translate:`as-scale`,scale:this.options,rotate:!1,multitouch:!1}))}bind(e,t,n){let{options:r,disabled:i}=p_(this.axis,n);if(r===!1)return;this.options=r;let a=new T(s_),s=c_(this.context,a,this.tag,{opacity:.5,hoverOpacity:1,color:e,hoverColor:t,disabled:i}),c=new _(new o(.2,.2,.01),a);c.renderOrder=1/0,c.pointerEventsOrder=1/0,c.position.set(.15,.15,0);let l=i?void 0:this.context.registerHandle(this.store,c,this.tag);return this.add(c),()=>{a.dispose(),c.geometry.dispose(),l?.(),s?.(),this.remove(c)}}},z_=new y(0,0,-Math.PI/2),B_=new y(0,0,Math.PI/2),V_=class extends f_{actualAxis;invert;constructor(e,t=``,n,r=!1){super(e,`xyz`,t,()=>({scale:{uniform:!0,...this.options},rotate:!1,translate:`as-scale`,multitouch:!1})),this.actualAxis=n,this.invert=r}bind(e,t,n){let{options:r,disabled:i}=p_(this.actualAxis,n);if(r===!1)return;this.options=r;let a=this.invert?B_:z_,s=new g;s.position.x=this.invert?-.7:.7,s.rotation.copy(a),this.add(s);let c=new T(s_),l=c_(this.context,c,this.tag,{color:e,hoverColor:t,opacity:.5,hoverOpacity:1,disabled:i}),u=new _(new o(.08,.08,.08),c);u.renderOrder=1/0,u.rotation.copy(a),s.add(u);let d=new _(new o(.15,.15,.15),c);d.visible=!1,d.pointerEventsOrder=1/0,d.rotation.copy(a),s.add(d);let f=i?void 0:this.context.registerHandle(this.store,d,this.tag);return()=>{c.dispose(),u.geometry.dispose(),f?.(),l?.(),this.remove(s)}}},H_=new n,U_=class extends g{context;size;fixed;scaleX;scaleY;scaleZ;scaleNegX;scaleNegY;scaleNegZ;translationX;translationY;translationZ;translationNegX;translationNegY;translationNegZ;translationXY;translationYZ;translationXZ;constructor(e,t,n){super(),this.context=e,this.size=t,this.fixed=n,this.scaleX=new V_(this.context,void 0,`x`),this.add(this.scaleX),this.scaleY=new V_(this.context,void 0,`y`),this.scaleY.rotation.z=Math.PI/2,this.add(this.scaleY),this.scaleZ=new V_(this.context,void 0,`z`),this.scaleZ.rotation.y=-Math.PI/2,this.add(this.scaleZ),this.scaleNegX=new V_(this.context,void 0,`x`,!0),this.add(this.scaleNegX),this.scaleNegY=new V_(this.context,void 0,`y`,!0),this.scaleNegY.rotation.z=Math.PI/2,this.add(this.scaleNegY),this.scaleNegZ=new V_(this.context,void 0,`z`,!0),this.scaleNegZ.rotation.y=-Math.PI/2,this.add(this.scaleNegZ),this.translationX=new L_(this.context,`x`),this.add(this.translationX),this.translationY=new L_(this.context,`y`),this.translationY.rotation.z=Math.PI/2,this.add(this.translationY),this.translationZ=new L_(this.context,`z`),this.translationZ.rotation.y=-Math.PI/2,this.add(this.translationZ),this.translationNegX=new L_(this.context,`x`,void 0,!0,!1),this.add(this.translationNegX),this.translationNegY=new L_(this.context,`y`,void 0,!0,!1),this.translationNegY.rotation.z=Math.PI/2,this.add(this.translationNegY),this.translationNegZ=new L_(this.context,`z`,void 0,!0,!1),this.translationNegZ.rotation.y=-Math.PI/2,this.add(this.translationNegZ),this.translationXY=new R_(this.context,`xy`),this.add(this.translationXY),this.translationXZ=new R_(this.context,`xz`),this.translationXZ.rotation.x=Math.PI/2,this.add(this.translationXZ),this.translationYZ=new R_(this.context,`yz`),this.translationYZ.rotation.y=-Math.PI/2,this.add(this.translationYZ)}update(e){this.updateWorldMatrix(!0,!1),this.scale.setScalar(1);let t=this.context.getTarget();t!=null&&(t.getWorldScale(H_),this.scale.divide(H_)),this.scale.multiplyScalar(g_(this,e,this.fixed??!0,this.size??1))}bind(e){let t=this.scaleX.bind(16777215,16776960,e),n=this.scaleY.bind(16777215,16776960,e),r=this.scaleZ.bind(16777215,16776960,e),i=this.scaleNegX.bind(16777215,16776960,e),a=this.scaleNegY.bind(16777215,16776960,e),o=this.scaleNegZ.bind(16777215,16776960,e),s=this.translationX.bind(16711680,16776960,e),c=this.translationY.bind(65280,16776960,e),l=this.translationZ.bind(255,16776960,e),u=this.translationNegX.bind(16711680,16776960,e),d=this.translationNegY.bind(65280,16776960,e),f=this.translationNegZ.bind(255,16776960,e),p=this.translationXY.bind(255,16776960,e),m=this.translationYZ.bind(16711680,16776960,e),h=this.translationXZ.bind(65280,16776960,e);return()=>{s?.(),c?.(),l?.(),u?.(),d?.(),f?.(),p?.(),m?.(),h?.(),t?.(),n?.(),r?.(),i?.(),a?.(),o?.()}}},W_={x:{vector1:new n(0,0,-1),vector2:new n(0,-1,0),rotationOffset:new h,axis:[1,0,0]},y:{vector1:new n(0,0,-1),vector2:new n(-1,0,-1),rotationOffset:new h().setFromEuler(new y(0,0,Math.PI/2)),axis:[0,1,0]},z:{vector1:new n(-1,0,0),vector2:new n(0,-1,0),rotationOffset:new h().setFromEuler(new y(0,Math.PI/2,0)),axis:[0,0,1]}},G_=new n,K_=new n,q_=new n,J_=new n,Y_=new h,X_=class extends f_{direction=new n(1,0,0);constructor(e,t,n=``){super(e,t,n,()=>({scale:!1,translate:`as-rotate`,rotate:[this.direction],multitouch:!1}))}update(e){let{rotationOffset:t,vector1:n,vector2:r}=W_[this.axis];e.getWorldPosition(G_),this.getWorldPosition(K_).sub(G_),q_.copy(n),J_.copy(r);let i=this.context.getTarget(),a=this.context.getSpace();a===`local`&&i!=null&&(i.getWorldQuaternion(Y_),q_.applyQuaternion(Y_),J_.applyQuaternion(Y_)),J_.crossVectors(q_,J_);let o=K_.dot(J_);J_.multiplyScalar(o),K_.sub(J_),this.quaternion.setFromUnitVectors(q_,K_.normalize()),a===`local`&&i!=null&&(i.getWorldQuaternion(Y_),this.quaternion.multiply(Y_)),this.quaternion.multiply(t),i?.parent==null?Y_.identity():(i.parent.matrixWorld.decompose(G_,Y_,K_),Y_.invert(),this.quaternion.premultiply(Y_)),this.store.getState()??(this.direction.fromArray(W_[this.axis].axis),this.direction.applyQuaternion(a===`local`&&i!=null?i?.quaternion:Y_)),i!=null&&this.quaternion.premultiply(Y_.copy(i.quaternion).invert())}bind(e,t){let{options:n,disabled:r}=p_(this.axis,t);if(n===!1)return;this.options=n;let i=new T(s_),a=c_(this.context,i,this.tag,{color:e,hoverColor:16776960,disabled:r}),o=new _(sv(.5,.5),i);o.renderOrder=1/0,this.add(o);let s=new _(new l(.5,.1,4,24));s.visible=!1,s.pointerEventsOrder=1/0,s.rotation.set(0,-Math.PI/2,-Math.PI/2),this.add(s);let c=r?void 0:this.context.registerHandle(this.store,s,this.tag);return()=>{i.dispose(),s.geometry.dispose(),o.geometry.dispose(),c?.(),a?.(),this.remove(s),this.remove(o)}}},Z_=new n,Q_=new n,$_=new n(1,0,0),ev=new h,tv=class extends f_{constructor(e,t=``){super(e,`xyz`,t,()=>({scale:!1,translate:`as-rotate`,rotate:this.options,multitouch:!1}))}update(e){e.getWorldPosition(Z_),this.getWorldPosition(Q_).sub(Z_),this.quaternion.setFromUnitVectors($_,Q_.normalize());let t=this.context.getTarget();t?.parent!=null&&(t.parent.matrixWorld.decompose(Z_,ev,Q_),ev.invert(),this.quaternion.premultiply(ev)),t!=null&&(ev.copy(t.quaternion).invert(),this.quaternion.premultiply(ev))}bind(e){let{options:t,disabled:n}=p_(this.axis,e);if(t===!1)return;this.options=t;let r=new T(s_),i=c_(this.context,r,this.tag,{color:16777215,hoverColor:16776960,opacity:.25,disabled:n}),a=new _(sv(.5,1),r);a.renderOrder=1/0,this.add(a);let o=new _(new k(.25,10,8));o.visible=!1,o.pointerEventsOrder=1/0,this.add(o);let s=n?void 0:this.context.registerHandle(this.store,o,this.tag);return()=>{this.pointerEvents=`none`,r.dispose(),o.geometry.dispose(),a.geometry.dispose(),s?.(),i?.(),this.remove(o),this.remove(a)}}},nv=new n,rv=new n,iv=new n(1,0,0),av=new h,ov=class extends f_{direction=new n(1,0,0);constructor(e,t=``){super(e,`e`,t,()=>({scale:!1,translate:`as-rotate`,rotate:[this.direction],multitouch:!1}))}update(e){e.getWorldPosition(nv),this.getWorldPosition(this.direction).sub(nv).normalize(),this.quaternion.setFromUnitVectors(iv,this.direction);let t=this.context.getTarget();t?.parent!=null&&(t.parent.matrixWorld.decompose(nv,av,rv),av.invert(),this.quaternion.premultiply(av),this.direction.applyQuaternion(av)),t!=null&&(av.copy(t.quaternion).invert(),this.quaternion.premultiply(av)),this.direction.negate()}bind(e){let{options:t,disabled:n}=p_(this.axis,e);if(t===!1)return;this.options=t;let r=new T(s_),i=c_(this.context,r,this.tag,{color:16776960,hoverColor:16776960,opacity:.5,disabled:n}),a=new _(sv(.75,1),r);a.renderOrder=1/0,this.add(a);let o=new _(new l(.75,.1,2,24),new T({color:`white`}));o.visible=!1,o.rotation.y=Math.PI/2,o.pointerEventsOrder=1/0,this.add(o);let s=n?void 0:this.context.registerHandle(this.store,o,this.tag);return()=>{r.dispose(),o.geometry.dispose(),a.geometry.dispose(),s?.(),i?.(),this.remove(o),this.remove(a)}}};function sv(e,t){let n=new l(e,.0075,3,64,t*Math.PI*2);return n.rotateY(Math.PI/2),n.rotateX(Math.PI/2),n}var cv=new n,lv=class extends g{context;fixed;size;rotationX;rotationY;rotationZ;free;screen;constructor(e,t,n){super(),this.context=e,this.fixed=t,this.size=n,this.rotationX=new X_(this.context,`x`),this.add(this.rotationX),this.rotationY=new X_(this.context,`y`),this.add(this.rotationY),this.rotationZ=new X_(this.context,`z`),this.add(this.rotationZ),this.free=new tv(this.context),this.add(this.free),this.screen=new ov(this.context),this.add(this.screen)}update(e){this.updateWorldMatrix(!0,!1),this.rotationX.update(e),this.rotationY.update(e),this.rotationZ.update(e),this.free.update(e),this.screen.update(e),this.scale.setScalar(1);let t=this.context.getTarget();t!=null&&(t.getWorldScale(cv),this.scale.divide(cv)),this.scale.multiplyScalar(g_(this,e,this.fixed??!0,this.size??1))}bind(e){let t=this.rotationX.bind(16711680,e),n=this.rotationY.bind(65280,e),r=this.rotationZ.bind(255,e),i=this.screen.bind(e),a=this.free.bind(e);return()=>{t?.(),n?.(),r?.(),i?.(),a?.()}}},uv=new y,dv=new y(0,0,Math.PI/2),fv=new y(0,-Math.PI/2,0),pv=class extends g{xAxisHighlight;yAxisHighlight;zAxisHighlight;handles;context;constructor(e){super(),this.context=new o_(this,e),this.xAxisHighlight=new d_(this.context,uv),this.add(this.xAxisHighlight),this.yAxisHighlight=new d_(this.context,dv),this.add(this.yAxisHighlight),this.zAxisHighlight=new d_(this.context,fv),this.add(this.zAxisHighlight)}set space(e){this.context.space=e}get space(){return this.context.space}update(e,t){this.context.update(e),this.xAxisHighlight.update(),this.yAxisHighlight.update(),this.zAxisHighlight.update(),this.handles?.update(t)}bind(e,t){let n=this.xAxisHighlight.bind(`x`),r=this.yAxisHighlight.bind(`y`),i=this.zAxisHighlight.bind(`z`);switch(e){case`rotate`:this.handles=new lv(this.context);break;case`scale`:this.handles=new U_(this.context);break;case`translate`:this.handles=new P_(this.context)}this.add(this.handles);let a=this.handles.bind(t);return()=>{this.handles!=null&&this.remove(this.handles),this.handles=void 0,a(),n(),r(),i()}}};new n(0,0,1),new n(0,1,0),new n,new n,new y,new h,new n,new h,new h;var mv=class{nativeEvent;NONE=0;CAPTURING_PHASE=1;AT_TARGET=2;BUBBLING_PHASE=3;relatedTarget=null;get altKey(){return this.getFromNative(`altKey`,!1)}get button(){return this.getFromNative(`button`,0)}get buttons(){return this.getFromNative(`buttons`,0)}get clientX(){return this.getFromNative(`clientX`,0)}get clientY(){return this.getFromNative(`clientY`,0)}get ctrlKey(){return this.getFromNative(`ctrlKey`,!1)}get layerX(){return this.getFromNative(`layerX`,0)}get layerY(){return this.getFromNative(`layerY`,0)}get metaKey(){return this.getFromNative(`metaKey`,!1)}get movementX(){return this.getFromNative(`movementX`,0)}get movementY(){return this.getFromNative(`movementY`,0)}get offsetX(){return this.getFromNative(`offsetX`,0)}get offsetY(){return this.getFromNative(`offsetY`,0)}get pageX(){return this.getFromNative(`pageX`,0)}get pageY(){return this.getFromNative(`pageY`,0)}get screenX(){return this.getFromNative(`screenX`,0)}get screenY(){return this.getFromNative(`screenY`,0)}get shiftKey(){return this.getFromNative(`shiftKey`,!1)}get x(){return this.getFromNative(`x`,0)}get y(){return this.getFromNative(`y`,0)}get detail(){return this.getFromNative(`detail`,0)}get view(){return this.getFromNative(`view`,null)}get which(){return this.getFromNative(`which`,0)}get cancelBubble(){return this.getFromNative(`cancelBubble`,!1)}get composed(){return this.getFromNative(`composed`,!1)}get eventPhase(){return this.getFromNative(`eventPhase`,0)}get isTrusted(){return this.getFromNative(`isTrusted`,!1)}get returnValue(){return this.getFromNative(`returnValue`,!1)}get timeStamp(){return this.getFromNative(`timeStamp`,0)}get cancelable(){return this.getFromNative(`cancelable`,!1)}get defaultPrevented(){return this.getFromNative(`defaultPrevented`,!1)}constructor(e){this.nativeEvent=e}getFromNative(e,t){return e in this.nativeEvent?this.nativeEvent[e]:t}},hv=new n,gv=class e extends mv{type;bubbles;internalPointer;intersection;camera;currentObject;object;propagationState;get pointerId(){return this.internalPointer.id}get pointerType(){return this.internalPointer.type}get pointerState(){return this.internalPointer.state}get distance(){return this.intersection.distance}get distanceToRay(){return this.intersection.distanceToRay}get point(){return this.intersection.point}get index(){return this.intersection.index}get face(){return this.intersection.face}get faceIndex(){return this.intersection.faceIndex}get uv(){return this.intersection.uv}get uv1(){return this.intersection.uv1}get normal(){return this.intersection.normal}get instanceId(){return this.intersection.instanceId}get pointOnLine(){return this.intersection.pointOnLine}get batchId(){return this.intersection.batchId}get pointerPosition(){return this.intersection.pointerPosition}get pointerQuaternion(){return this.intersection.pointerQuaternion}get pointOnFace(){return this.intersection.pointOnFace}get localPoint(){return this.intersection.localPoint}get details(){return this.intersection.details}get target(){return this.object}get currentTarget(){return this.currentObject}get eventObject(){return this.currentObject}get srcElement(){return this.currentObject}_pointer;get pointer(){return this._pointer??=(hv.copy(this.intersection.point).project(this.camera),new a(hv.x,hv.y)),this._pointer}_ray;get ray(){if(this._ray!=null)return this._ray;switch(this.intersection.details.type){case`screen-ray`:case`ray`:case`sphere`:return this._ray=new m(this.intersection.pointerPosition,new n(0,0,-1).applyQuaternion(this.intersection.pointerQuaternion));case`lines`:return this._ray=new m(this.intersection.details.line.start,this.intersection.details.line.end.clone().sub(this.intersection.details.line.start).normalize())}}_intersections=[];get intersections(){return this._intersections??=[{...this.intersection,eventObject:this.currentObject}],this._intersections}_unprojectedPoint;get unprojectedPoint(){if(this._unprojectedPoint==null){let e=this.pointer;this._unprojectedPoint=new n(e.x,e.y,0).unproject(this.camera)}return this._unprojectedPoint}get stopped(){return this.propagationState.stoppedImmediate||this.propagationState.stopped}get stoppedImmediate(){return this.propagationState.stoppedImmediate}get delta(){throw Error(`not supported`)}constructor(e,t,n,r,i,a,o=i.object,s=o,c={stopped:!t,stoppedImmediate:!1}){super(n),this.type=e,this.bubbles=t,this.internalPointer=r,this.intersection=i,this.camera=a,this.currentObject=o,this.object=s,this.propagationState=c}stopPropagation(){this.propagationState.stopped=!0}stopImmediatePropagation(){this.propagationState.stoppedImmediate=!0}retarget(t){return new e(this.type,this.bubbles,this.nativeEvent,this.internalPointer,this.intersection,this.camera,t,this.target,this.propagationState)}},_v=class e extends gv{get deltaX(){return this.nativeEvent.deltaX}get deltaY(){return this.nativeEvent.deltaY}get deltaZ(){return this.nativeEvent.deltaZ}constructor(e,t,n,r,i,a){super(`wheel`,!0,e,t,n,r,i,a)}retarget(t){return new e(this.nativeEvent,this.internalPointer,this.intersection,this.camera,t,this.target)}};function vv(e){yv(e,e.currentObject)}function yv(e,t){if(t==null)return;let n=Sv(t,e.type);if(n!=null&&n.length>0){let r=e.retarget(t),i=n.length;for(let e=0;e<i&&!r.stoppedImmediate;e++)n[e](r)}e.stopped||yv(e,t.parent)}var bv={click:`onClick`,contextmenu:`onContextMenu`,dblclick:`onDoubleClick`,pointercancel:`onPointerCancel`,pointerdown:`onPointerDown`,pointerenter:`onPointerEnter`,pointerleave:`onPointerLeave`,pointermove:`onPointerMove`,pointerout:`onPointerOut`,pointerover:`onPointerOver`,pointerup:`onPointerUp`,wheel:`onWheel`},xv=Object.keys(bv);function Sv(e,t){if(e._listeners!=null&&t in e._listeners)return e._listeners[t];let n;if(e.isVoidObject&&t===`click`&&e.parent?.__r3f!=null&&(n=e.parent.__r3f.root.getState().onPointerMissed),e.__r3f!=null&&(n=e.__r3f.handlers[bv[t]]),n!=null)return[n]}var Cv=new k(1e10),wv=new Map;function Tv(e){let t=wv.get(e);return t??(t=new _(Cv),t.isVoidObject=!0,t.parent=e,t.pointerEventsOrder=-1/0,wv.set(e,t)),t}function Ev(e,t,n){let r=t.normal??t.face?.normal;return r!=null&&(e.setFromNormalAndCoplanarPoint(r,t.localPoint),e.applyMatrix4(n),!0)}function Dv(e,t,n){if(t===`none`||t===`listener`&&!e)return!1;if(n===`all`)return!0;if(typeof n==`function`)return({id:e,type:t,state:r})=>n(e,t,r);let r,i;return`deny`in n?(i=!0,r=n.deny):(i=!1,r=n.allow),Array.isArray(r)?e=>Ov(r.includes(e.type),i):e=>Ov(r===e.type,i)}function Ov(e,t){return t?!e:e}function kv(e,t,n,r=!1,i,a,o){let s=r||Av(e,t),c=t.pointerEvents??i,l=c??t.defaultPointerEvents??`listener`,u=t.pointerEventsType??a??`all`,d=t.pointerEventsOrder??o??0,f=Dv(s,l,u),p=n.length;if(p===1)(f===!0||typeof f==`function`&&f(n[0]))&&jv(n[0],t,l,u,d);else if(f===!0)for(let e=0;e<p;e++)jv(n[e],t,l,u,d);else if(typeof f==`function`)for(let e=0;e<p;e++){let r=n[e];f(r)&&jv(r,t,l,u,d)}if(t.children.length===0||t.intersectChildren===!1)return;let m=t.interactableDescendants??t.children,h=m.length;for(let t=0;t<h;t++)kv(e,m[t],n,s,c,u,d)}function Av(e,t){if(t.ancestorsHaveListeners||e===`pointer`&&t.ancestorsHavePointerListeners||e===`wheel`&&t.ancestorsHaveWheelListeners||t.__r3f!=null&&t.__r3f?.eventCount>0&&(e===`wheel`&&t.__r3f.handlers.onWheel!=null||e===`pointer`&&Object.keys(t.__r3f.handlers).some(e=>e!=`onWheel`)))return!0;if(t._listeners==null)return!1;if(e===`wheel`){let e=t._listeners.wheel;return e!=null&&e.length>0}let n=Object.entries(t._listeners),r=n.length;for(let e=0;e<r;e++){let t=n[e];if(t[0]!==`wheel`&&xv.includes(t[0])&&t[1]!=null&&t[1].length>0)return!0}return!1}function jv({intersector:e,options:t},n,r,i,a){t.filter?.(n,r,i,a)!==!1&&e.executeIntersection(n,a)}function Mv(e,t,{customSort:n=Nv}={},r){let i,a,o,s=e.length;for(let c=0;c<s;c++){let s=e[c];if(r?.(s)===!1)continue;let l=t?.[c];(i==null||n(s,l,i,a)<0)&&(o=c,i=s,a=l)}return o}function Nv(e,t=0,n,r=0){return t==r?e.distance-n.distance:r-t}var Pv=1e7;function Fv(e,t,n,r,i,a=0){let o=t.direction.clone().multiplyScalar(Pv),s=Pv;return{distance:s+a,object:Tv(e),point:o,normal:t.origin.clone().sub(o).normalize(),details:n(o,s),pointerPosition:r,pointerQuaternion:i,pointOnFace:o,localPoint:o}}function Iv(e,t,n){for(;n>0;)e.push(t),--n}var Lv=Symbol(`buttonsDownTime`),Rv=Symbol(`buttonsClickTime`);globalThis.pointerEventspointerMap??=new Map,d.prototype.setPointerCapture=function(e){zv(e)?.setCapture(this)},d.prototype.releasePointerCapture=function(e){let t=zv(e);t!=null&&t.hasCaptured(this)&&t.setCapture(void 0)},d.prototype.hasPointerCapture=function(e){return zv(e)?.hasCaptured(this)??!1};function zv(e){return globalThis.pointerEventspointerMap?.get(e)}var Bv=class{id;type;state;intersector;getCamera;onMoveCommited;parentSetPointerCapture;parentReleasePointerCapture;options;prevIntersection;intersection;prevEnabled=!0;enabled=!0;wheelIntersection;pointerEntered=[];pointerEnteredHelper=[];pointerCapture;buttonsDownTime=new Map;buttonsDown=new Set;wasMoved=!1;onFirstMove=[];constructor(e,t,n,r,i,a,o,s,c={}){this.id=e,this.type=t,this.state=n,this.intersector=r,this.getCamera=i,this.onMoveCommited=a,this.parentSetPointerCapture=o,this.parentReleasePointerCapture=s,this.options=c,globalThis.pointerEventspointerMap?.set(e,this)}getPointerCapture(){return this.pointerCapture}hasCaptured(e){return this.pointerCapture?.object===e}setCapture(e){this.pointerCapture?.object!==e&&(this.clearPointerCapture(),e!=null&&this.intersection!=null&&(this.pointerCapture={object:e,intersection:this.intersection},this.parentSetPointerCapture?.()))}getButtonsDown(){return this.buttonsDown}getIntersection(){return this.intersection}getEnabled(){return this.enabled}setEnabled(e,t,n=!0){this.enabled!==e&&(!e&&this.pointerCapture!=null&&this.clearPointerCapture(),this.enabled=e,n&&this.commit(t,!1))}computeIntersection(e,t,n){return this.pointerCapture==null?(this.intersector.startIntersection(n),kv(e,t,[this]),this.intersector.finalizeIntersection(t)):this.intersector.intersectPointerCapture(this.pointerCapture,n)}setIntersection(e){this.intersection=e}commit(e,t){let n=this.getCamera(),r=this.prevEnabled?this.prevIntersection:void 0,i=this.enabled?this.intersection:void 0;r!=null&&r.object!=i?.object&&vv(new gv(`pointerout`,!0,e,this,r,n));let a=this.pointerEntered;this.pointerEntered=[],this.pointerEnteredHelper.length=0,Vv(i?.object,this.pointerEntered,a,this.pointerEnteredHelper);let o=a.length;for(let t=0;t<o;t++){let i=a[t];vv(new gv(`pointerleave`,!1,e,this,r,n,i))}i!=null&&r?.object!=i.object&&vv(new gv(`pointerover`,!0,e,this,i,n));for(let t=this.pointerEnteredHelper.length-1;t>=0;t--){let r=this.pointerEnteredHelper[t];vv(new gv(`pointerenter`,!1,e,this,i,n,r))}if(t&&i!=null&&vv(new gv(`pointermove`,!0,e,this,i,n)),this.prevIntersection=this.intersection,this.prevEnabled=this.enabled,!this.wasMoved&&this.intersector.isReady()){this.wasMoved=!0;let e=this.onFirstMove.length;for(let t=0;t<e;t++)this.onFirstMove[t](n);this.onFirstMove.length=0}this.onMoveCommited?.(this)}move(e,t){this.intersection=this.computeIntersection(`pointer`,e,t),this.commit(t,!0)}over(e,t){this.wasMoved||(this.intersection=this.computeIntersection(`pointer`,e,t),this.commit(t,!1))}emitMove(e){this.intersection!=null&&vv(new gv(`pointermove`,!0,e,this,this.intersection,this.getCamera()))}down(e){if(this.buttonsDown.add(e.button),!this.enabled)return;if(!this.wasMoved){this.onFirstMove.push(this.down.bind(this,e));return}if(this.intersection==null)return;vv(new gv(`pointerdown`,!0,e,this,this.intersection,this.getCamera()));let{object:t}=this.intersection;t[Lv]??=new Map,t[Lv].set(e.button,e.timeStamp),this.buttonsDownTime.set(e.button,e.timeStamp)}up(e){if(this.buttonsDown.delete(e.button),!this.enabled)return;if(!this.wasMoved){this.onFirstMove.push(this.up.bind(this,e));return}if(this.intersection==null)return;let{clickThesholdMs:t,contextMenuButton:n=2,dblClickThresholdMs:r=500,clickThresholdMs:i=t??300}=this.options;this.clearPointerCapture();let a=Hv(this.buttonsDownTime,this.intersection.object[Lv],e.button,e.timeStamp,i),o=this.getCamera();if(a&&e.button===n&&vv(new gv(`contextmenu`,!0,e,this,this.intersection,o)),vv(new gv(`pointerup`,!0,e,this,this.intersection,o)),!a||e.button===n)return;vv(new gv(`click`,!0,e,this,this.intersection,o));let{object:s}=this.intersection,c=s[Rv]??=new Map,l=c.get(e.button);l==null||e.timeStamp-l>r?c.set(e.button,e.timeStamp):(vv(new gv(`dblclick`,!0,e,this,this.intersection,o)),c.delete(e.button))}cancel(e){this.buttonsDown.clear(),this.buttonsDownTime.clear(),this.clearPointerCapture(),this.onFirstMove.length=0,this.enabled&&this.wasMoved&&this.intersection!=null&&vv(new gv(`pointercancel`,!0,e,this,this.intersection,this.getCamera()))}wheel(e,t,n=!1){if(!this.enabled)return;if(!this.wasMoved&&n){this.onFirstMove.push(this.wheel.bind(this,e,t,n));return}n||(this.wheelIntersection=this.computeIntersection(`wheel`,e,t));let r=n?this.intersection:this.wheelIntersection;r!=null&&vv(new _v(t,this,r,this.getCamera()))}emitWheel(e,t=!1){if(!this.enabled)return;if(!this.wasMoved&&t){this.onFirstMove.push(this.emitWheel.bind(this,e,t));return}let n=t?this.intersection:this.wheelIntersection;n!=null&&vv(new _v(e,this,n,this.getCamera()))}exit(e){(this.buttonsDown.size>0||this.pointerCapture!=null)&&this.cancel(e),this.wasMoved&&(this.intersection=void 0,this.commit(e,!1)),this.onFirstMove.length=0,this.wasMoved=!1}clearPointerCapture(){this.pointerCapture!=null&&(this.parentReleasePointerCapture?.(),this.pointerCapture=void 0)}};function Vv(e,t,n,r){if(e==null)return;let i=n.indexOf(e);i==-1?r.push(e):n.splice(i,1),t.push(e),Vv(e.parent,t,n,r)}function Hv(e,t,n,r,i){if(t==null)return!1;let a=t.get(n);return!(a==null||r-a>i||a!=e.get(n))}var Uv=new O,Wv=new O,Gv=new a,Kv=new a,qv=new a,Jv=new n,Yv=new u,Xv=new n;function Zv(e,t,n){Xv.copy(t).applyMatrix4(Yv.copy(n.matrixWorld).invert());let r=n.geometry.attributes.uv;if(r==null||!(r instanceof i))return!1;let a;return Qv(n,(e,t,i)=>{n.getVertexPosition(e,Uv.a),n.getVertexPosition(t,Uv.b),n.getVertexPosition(i,Uv.c);let o=Uv.closestPointToPoint(Xv,Jv).distanceTo(Xv);a!=null&&o>=a||(a=o,Wv.copy(Uv),Gv.fromBufferAttribute(r,e),Kv.fromBufferAttribute(r,t),qv.fromBufferAttribute(r,i))}),a!=null&&(Wv.closestPointToPoint(Xv,Jv),Wv.getInterpolation(Jv,Gv,Kv,qv,e),!0)}function Qv(e,t){let n=e.geometry.drawRange;if(e.geometry.index!=null){let r=e.geometry.index,i=Math.max(0,n.start),a=Math.min(r.count,n.start+n.count);for(let e=i;e<a;e+=3)t(r.getX(e),r.getX(e+1),r.getX(e+2));return}let r=e.geometry.attributes.position;if(r==null)return;let i=Math.max(0,n.start),a=Math.min(r.count,n.start+n.count);for(let e=i;e<a;e+=3)t(e,e+1,e+2)}new u,new c,new n,new v,new m,new a,new n(0,0,0),new n(0,0,1);var $v=new u,ey=new n;new n(0,0,-1),new v;var ty=new a,ny=new n,ry=class{prepareTransformation;options;raycaster=new s;cameraQuaternion=new h;fromPosition=new n;fromQuaternion=new h;coords=new a;viewPlane=new v;intersects=[];pointerEventsOrders=[];constructor(e,t){this.prepareTransformation=e,this.options=t}isReady(){return!0}intersectPointerCapture({intersection:e,object:t},r){let i=e.details;if(i.type!=`screen-ray`)throw Error(`unable to process a pointer capture of type "${e.details.type}" with a camera ray intersector`);if(!this.startIntersection(r))return e;this.viewPlane.constant-=i.distanceViewPlane;let a=this.raycaster.ray.intersectPlane(this.viewPlane,new n);if(a==null)return e;e.object.updateWorldMatrix(!0,!1),Ev(this.viewPlane,e,e.object.matrixWorld);let o=e.uv;return e.object instanceof _&&Zv(ty,a,e.object)&&(o=ty.clone()),{...e,details:{...i,direction:this.raycaster.ray.direction.clone(),screenPoint:this.coords.clone()},uv:o,object:t,point:a,pointOnFace:a,pointerPosition:this.raycaster.ray.origin.clone(),pointerQuaternion:this.cameraQuaternion.clone()}}startIntersection(e){let t=this.prepareTransformation(e,this.coords);return t!=null&&(t.updateWorldMatrix(!0,!1),t.matrixWorld.decompose(this.fromPosition,this.fromQuaternion,ey),this.raycaster.setFromCamera(this.coords,t),this.viewPlane.setFromNormalAndCoplanarPoint(t.getWorldDirection(ny),this.raycaster.ray.origin),!0)}executeIntersection(e,t){let n=this.intersects.length;e.raycast(this.raycaster,this.intersects),Iv(this.pointerEventsOrders,t,this.intersects.length-n)}finalizeIntersection(e){let t=this.fromPosition.clone(),n=this.cameraQuaternion.clone(),r=this.raycaster.ray.direction.clone(),i=Mv(this.intersects,this.pointerEventsOrders,this.options),a=i==null?void 0:this.intersects[i];return this.intersects.length=0,this.pointerEventsOrders.length=0,a==null?Fv(e,this.raycaster.ray,(e,t)=>({type:`screen-ray`,distanceViewPlane:t,screenPoint:this.coords.clone(),direction:r}),t,n):(a.object.updateWorldMatrix(!0,!1),$v.copy(a.object.matrixWorld).invert(),Object.assign(a,{details:{type:`screen-ray`,distanceViewPlane:this.viewPlane.distanceToPoint(a.point),screenPoint:this.coords.clone(),direction:r},pointOnFace:a.point,pointerPosition:t,pointerQuaternion:n,localPoint:a.point.clone().applyMatrix4($v)}))}};new n,new a,new u,new n,new h,new v,new E,new n,new n,new n,new n(1e-4,1e-4,1e-4),new u;var iy=23412;function ay(){return iy++}function oy(e,t,n){if(!(t instanceof globalThis.MouseEvent))return n.set(0,0);let{width:r,height:i,top:a,left:o}=e.getBoundingClientRect(),s=t.clientX-o,c=t.clientY-a;return n.set(s/r*2-1,-(c/i)*2+1)}function sy(e,t,n,r){return cy(e,typeof t==`function`?t:()=>t,n,oy.bind(null,e),t=>{try{e.setPointerCapture(t)}catch(e){if(!(e instanceof DOMException&&e.name===`NotFoundError`))throw e}},t=>{e.hasPointerCapture(t)&&e.releasePointerCapture(t)},{pointerTypePrefix:`screen-`,...r})}function cy(e,t,n,r,i,a,o={}){let s=o?.forwardPointerCapture??!0,c=new Map,l=o.pointerTypePrefix??`forward-`,u=(e,u)=>{let d=c.get(e.pointerId);return d??(d=new Bv(ay(),`${l}${e.pointerType}`,e.pointerState,new ry((e,n)=>(r(e,n),t()),o),t,void 0,s?i.bind(null,e.pointerId):void 0,s?a.bind(null,e.pointerId):void 0,o),u!=`move`&&u!=`wheel`&&(d.setIntersection(d.computeIntersection(`pointer`,n,e)),d.commit(e,!1)),c.set(e.pointerId,d)),d},d=new Map,f=new Map,p=[],m=[],h=(e,t,r)=>{switch(e){case`move`:r.move(n,t);return;case`over`:r.move(n,t);return;case`wheel`:r.wheel(n,t);return;case`cancel`:r.cancel(t);return;case`down`:if(!ly(t))return;r.down(t);return;case`up`:if(!ly(t))return;r.up(t);return;case`exit`:f.delete(r),d.delete(r),r.exit(t);return}},g=(e,t)=>{let n=u(t,e);e===`move`&&f.set(n,t),e===`wheel`&&d.set(n,t),o.batchEvents??!0?m.push({type:e,event:t}):h(e,t,n)},_=g.bind(null,`move`),v=g.bind(null,`over`),y=g.bind(null,`cancel`),b=g.bind(null,`down`),x=g.bind(null,`up`),S=g.bind(null,`wheel`),C=g.bind(null,`exit`);return e.addEventListener(`pointermove`,_),e.addEventListener(`pointerover`,v),e.addEventListener(`pointercancel`,y),e.addEventListener(`pointerdown`,b),e.addEventListener(`pointerup`,x),e.addEventListener(`wheel`,S),e.addEventListener(`pointerleave`,C),{destroy(){e.removeEventListener(`pointermove`,_),e.removeEventListener(`pointerover`,v),e.removeEventListener(`pointercancel`,y),e.removeEventListener(`pointerdown`,b),e.removeEventListener(`pointerup`,x),e.removeEventListener(`wheel`,S),e.removeEventListener(`pointerleave`,C),f.clear(),d.clear()},update(){let e=m.length;for(let t=0;t<e;t++){let{type:e,event:n}=m[t],r=u(n,e);e===`move`&&(p.push(r),f.get(r)!=n)?r.emitMove(n):e===`wheel`&&d.get(r)!=n?r.emitWheel(n):h(e,n,r)}if(m.length=0,o.intersectEveryFrame??!1)for(let[e,t]of f.entries())p.includes(e)||e.move(n,t);p.length=0}}}function ly(e){return e.button!=null}new a,new h,new n,new n,new n,new a,new a,new n,new n,new a,new a,new a,new a,new n,new n;var uy=2,dy=class{constructor(e){this.xrDevice=e,this.combinedCameraPosition=new X,this.isPointerLocked=!1,this.vec3=new X,this.quat=new Mc,this.quatB=new Mc,this.quatInv=new Mc,this.quatMouse=new Mc,this.euler=new dl,this.keyState={ShiftLeft:!1,KeyW:!1,KeyA:!1,KeyS:!1,KeyD:!1,ArrowUp:!1,ArrowDown:!1},this.lastTime=0,this.preferredConnectedGazeMode=`head-locked`,this.gazeCommitHand=`right`,this.gazePointerId=null,this.gazeHeadsetDragActive=!1,this.gazeLastPointer={x:0,y:0},this.gazeForward=new X(0,0,-1),this.gazeDirection=new X,this.gazeQuaternion=new Mc,this.isInProgrammaticMode=!1,this.interactionsEnabled=!0,this.scene=new Rl,this.gazeMode=e.gaze?.connected?`head-locked`:`off`,this.camera=new $d(50,window.innerWidth/window.innerHeight,.1,40),this.playerRig=new kl,this.cameraRig=new kl,this.scene.add(this.playerRig),this.playerRig.add(this.cameraRig),this.cameraRig.position.fromArray(e.position.vec3),this.cameraRig.quaternion.fromArray(e.quaternion.quat),this.cameraRig.add(this.camera),this.camera.position.x-=e.ipd/2;let t=new td(new yd(.25,.27,32),new Uu({color:16777215,side:0}));t.rotateX(-Math.PI/2),this.scene.add(t),this.renderer=new Fh({alpha:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setClearColor(0,0),this.renderer.domElement.style.position=`fixed`,this.renderer.domElement.style.top=`50vh`,this.renderer.domElement.style.left=`50vw`,this.renderer.domElement.style.transform=`translate(-50%, -50%)`,this.transformHandles=new Map,[`left`,`right`].forEach(t=>{let n=new pv;n.scale.setScalar(.1),n.position.fromArray(e.controllers[t].position.vec3),n.quaternion.fromArray(e.controllers[t].quaternion.quat),this.cameraRig.attach(n),n.userData={defaultPosition:n.position.toArray(),defaultQuaternion:n.quaternion.toArray()},n.userData.setMode=e=>{var t,r;(r=(t=n.userData).modeCleanup)==null||r.call(t),n.userData.modeCleanup=n.bind(e),n.userData.mode=e},n.userData.setMode(`translate`),n.space=`local`,this.transformHandles.set(t,n),n.addEventListener(`click`,()=>{n.userData.mode===`translate`?n.userData.setMode(`rotate`):n.userData.setMode(`translate`)})}),window.transformHandles=this.transformHandles,this.mouseMoveHandler=t=>{if(!this.isPointerLocked||this.isInProgrammaticMode)return;let n=t.movementX||t.mozMovementX||t.webkitMovementX||0,r=t.movementY||t.mozMovementY||t.webkitMovementY||0;this.playerRig.rotation.y-=n*.002,this.cameraRig.rotation.x-=r*.002,e.quaternion.copy(this.cameraRig.getWorldQuaternion(this.quatMouse))},this.cameraRig.getWorldPosition(this.combinedCameraPosition),this.headsetDefaultPosition=this.cameraRig.position.clone(),this.headsetDefaultQuaternion=this.cameraRig.quaternion.clone(),this.forwardHtmlEvents=sy(this.renderer.domElement,()=>this.camera,this.scene).update,this.pointerLockChangeHandlerBound=this.pointerLockChangeHandler.bind(this),this.gazePointerDownHandlerBound=this.gazePointerDownHandler.bind(this),this.gazePointerMoveHandlerBound=this.gazePointerMoveHandler.bind(this),this.gazePointerUpHandlerBound=this.gazePointerUpHandler.bind(this),this.gazeWheelHandlerBound=this.gazeWheelHandler.bind(this),this.gazeContextMenuHandlerBound=this.gazeContextMenuHandler.bind(this),this.windowBlurHandlerBound=()=>{this.releaseGazeCommit(!0),this.gazeHeadsetDragActive=!1},this.documentVisibilityHandlerBound=()=>{document.visibilityState!==`visible`&&(this.releaseGazeCommit(!0),this.gazeHeadsetDragActive=!1)},this.keyDownHandlerBound=this.keyDownHandler.bind(this),this.keyUpHandlerBound=this.keyUpHandler.bind(this),document.addEventListener(`pointerlockchange`,this.pointerLockChangeHandlerBound,!1),document.addEventListener(`mozpointerlockchange`,this.pointerLockChangeHandlerBound,!1),document.addEventListener(`webkitpointerlockchange`,this.pointerLockChangeHandlerBound,!1),document.addEventListener(`keydown`,this.keyDownHandlerBound,!1),document.addEventListener(`keyup`,this.keyUpHandlerBound,!1),this.renderer.domElement.addEventListener(`pointerdown`,this.gazePointerDownHandlerBound),this.renderer.domElement.addEventListener(`pointermove`,this.gazePointerMoveHandlerBound),this.renderer.domElement.addEventListener(`pointerup`,this.gazePointerUpHandlerBound),this.renderer.domElement.addEventListener(`pointercancel`,this.gazePointerUpHandlerBound),this.renderer.domElement.addEventListener(`wheel`,this.gazeWheelHandlerBound,{passive:!1}),this.renderer.domElement.addEventListener(`contextmenu`,this.gazeContextMenuHandlerBound),window.addEventListener(`blur`,this.windowBlurHandlerBound),document.addEventListener(`visibilitychange`,this.documentVisibilityHandlerBound)}lockPointer(){!this.isInProgrammaticMode&&this.interactionsEnabled&&this.gazeMode!==`cursor`&&(this.renderer.domElement.requestPointerLock=this.renderer.domElement.requestPointerLock||this.renderer.domElement.mozRequestPointerLock||this.renderer.domElement.webkitRequestPointerLock,this.renderer.domElement.requestPointerLock())}pointerLockChangeHandler(){this.isPointerLocked=document.pointerLockElement===this.renderer.domElement||document.mozPointerLockElement===this.renderer.domElement||document.webkitPointerLockElement===this.renderer.domElement,this.isPointerLocked?document.addEventListener(`mousemove`,this.mouseMoveHandler,!1):document.removeEventListener(`mousemove`,this.mouseMoveHandler,!1)}get currentGazeMode(){return this.gazeMode}get currentGazeCommitHand(){return this.gazeCommitHand}applyGazeModePresentation(e){var t;this.gazeMode=e,e===`cursor`&&this.isPointerLocked&&((t=document.exitPointerLock)==null||t.call(document));let n=e===`cursor`;this.renderer.domElement.style.cursor=n?`crosshair`:``,this.renderer.domElement.style.touchAction=n?`none`:``,this.setTransformHandleRoutingSuppressed(n)}setGazeMode(e){this.releaseGazeCommit(!0),this.gazeHeadsetDragActive=!1;let t=this.xrDevice.gaze;t?(e!==`off`&&(this.preferredConnectedGazeMode=e),t.connected=e!==`off`,e===`head-locked`&&t.quaternion.set(0,0,0,1),this.applyGazeModePresentation(e)):this.applyGazeModePresentation(`off`)}setProgrammaticMode(e){let t=this.isInProgrammaticMode;if(this.isInProgrammaticMode=e,!t||e)return;this.syncFromDevice();let n=this.xrDevice.gaze?.connected?this.preferredConnectedGazeMode:`off`;n!==this.gazeMode&&(this.releaseGazeCommit(!0),this.gazeHeadsetDragActive=!1,this.applyGazeModePresentation(n))}setGazeCommitHand(e){e!==this.gazeCommitHand&&(this.releaseGazeCommit(!0),this.gazeHeadsetDragActive=!1,this.gazeCommitHand=e)}onSessionEnd(){this.releaseGazeCommit(!0),this.gazeHeadsetDragActive=!1}setTransformHandleRoutingSuppressed(e){this.transformHandles.forEach(t=>{var n,r;e&&!t.userData.gazeSuppressed?((r=(n=t.userData).modeCleanup)==null||r.call(n),t.userData.modeCleanup=void 0,t.userData.gazeSuppressed=!0):!e&&t.userData.gazeSuppressed&&(t.userData.gazeSuppressed=!1,t.userData.setMode(t.userData.mode))})}gazeInteractionEnabled(){return this.gazeMode===`cursor`&&!!this.xrDevice.gaze?.connected&&this.xrDevice.visibilityState===`visible`&&this.interactionsEnabled&&!this.isInProgrammaticMode&&!!this.xrDevice.activeSession}updateGazeFromPointer(e,t){if(!this.gazeInteractionEnabled()||this.gazeCommitActive)return;let n=oo(e,t,this.renderer.domElement.getBoundingClientRect(),this.xrDevice.stereoEnabled,this.xrDevice.fovy);this.gazeDirection.fromArray(n),this.gazeQuaternion.setFromUnitVectors(this.gazeForward,this.gazeDirection),this.xrDevice.gaze.quaternion.copy(this.gazeQuaternion)}beginGazeCommit(){if(this.gazeCommitActive||this.gazeCommitPendingRelease)return;let e=this.xrDevice.primaryInputMode,t=this.gazeCommitHand;(e===`hand`?this.xrDevice.hands[t]:this.xrDevice.controllers[t])?.connected&&(this.writeGazeCommitValue({mode:e,handedness:t},1,!1),this.gazeCommitActive={mode:e,handedness:t})}writeGazeCommitValue(e,t,n){if(e.mode===`hand`){let r=this.xrDevice.hands[e.handedness];n?r?.setPinchValueImmediate(t):r?.updatePinchValue(t)}else{let r=this.xrDevice.controllers[e.handedness];n?r?.setButtonValueImmediate(`trigger`,t):r?.updateButtonValue(`trigger`,t)}}releaseGazeCommit(e){var t,n,r;let i=this.gazeCommitActive,a=this.gazeCommitPendingRelease?.source,o=this.gazePointerId;if(this.gazePointerId=null,o!==null&&(t=this.renderer.domElement).hasPointerCapture?.call(t,o)&&((r=(n=this.renderer.domElement).releasePointerCapture)==null||r.call(n,o)),e){let e=this.gazeCommitPendingRelease?.queuedForFrame;this.gazeCommitPendingRelease=void 0,a&&!e&&this.writeGazeCommitValue(a,0,!1),i&&i!==a&&this.writeGazeCommitValue(i,0,!0),this.gazeCommitActive=void 0}else i&&(this.gazeCommitPendingRelease={source:i,queuedForFrame:!1},this.gazeCommitActive=void 0)}schedulePendingGazeRelease(){let e=this.gazeCommitPendingRelease;e&&queueMicrotask(()=>{this.gazeCommitPendingRelease===e&&(e.queuedForFrame?this.gazeCommitPendingRelease=void 0:(this.writeGazeCommitValue(e.source,0,!1),e.queuedForFrame=!0))})}gazeCommitSourceIsActive(){let e=this.gazeCommitActive;return!e||this.xrDevice.primaryInputMode!==e.mode?!1:!!(e.mode===`hand`?this.xrDevice.hands[e.handedness]:this.xrDevice.controllers[e.handedness])?.connected}moveCommitInput(e,t){let n=this.gazeCommitActive;if(!n)return;let r=this.transformHandles.get(n.handedness);if(!r)return;let i=this.renderer.domElement.getBoundingClientRect(),a=Math.max(.25,Math.abs(r.position.z)),o=2*Math.tan(this.xrDevice.fovy/2)*a/Math.max(i.height,1);r.position.x+=e*o,r.position.y-=t*o,this.syncDeviceTransforms()}moveCommitInputDepth(e){let t=this.gazeCommitActive;if(!t)return;let n=this.transformHandles.get(t.handedness);if(!n)return;let r=this.renderer.domElement.getBoundingClientRect(),i=Math.max(.25,Math.abs(n.position.z)),a=2*Math.tan(this.xrDevice.fovy/2)*i/Math.max(r.height,1);n.position.z-=e*a*.5,this.syncDeviceTransforms()}gazePointerDownHandler(e){var t,n;this.gazePointerId===null&&this.gazeInteractionEnabled()&&(e.button===0||e.button===2)&&(e.preventDefault(),e.stopPropagation(),this.gazePointerId=e.pointerId,this.gazeLastPointer={x:e.clientX,y:e.clientY},(n=(t=this.renderer.domElement).setPointerCapture)==null||n.call(t,e.pointerId),e.button===0?(this.updateGazeFromPointer(e.clientX,e.clientY),this.beginGazeCommit()):this.gazeHeadsetDragActive=!0)}gazePointerMoveHandler(e){if(this.gazePointerId!==null&&this.gazePointerId!==e.pointerId)return;let t=e.clientX-this.gazeLastPointer.x,n=e.clientY-this.gazeLastPointer.y;this.gazeLastPointer={x:e.clientX,y:e.clientY},this.gazeInteractionEnabled()&&(this.gazeCommitActive?(e.preventDefault(),this.moveCommitInput(t,n)):this.gazeHeadsetDragActive?(e.preventDefault(),this.playerRig.rotation.y-=t*.002,this.cameraRig.rotation.x-=n*.002,this.xrDevice.quaternion.copy(this.cameraRig.getWorldQuaternion(this.quatMouse))):this.updateGazeFromPointer(e.clientX,e.clientY))}gazePointerUpHandler(e){var t,n,r;this.gazePointerId===e.pointerId&&(this.gazeCommitActive&&this.releaseGazeCommit(!1),this.gazeHeadsetDragActive=!1,this.gazePointerId=null,(t=this.renderer.domElement).hasPointerCapture?.call(t,e.pointerId)&&((r=(n=this.renderer.domElement).releasePointerCapture)==null||r.call(n,e.pointerId)))}gazeWheelHandler(e){this.gazeInteractionEnabled()&&this.gazeCommitActive&&(e.preventDefault(),e.stopPropagation(),this.moveCommitInputDepth(e.deltaY))}gazeContextMenuHandler(e){this.gazeMode===`cursor`&&e.preventDefault()}resetInputTransform(e){let t=this.transformHandles.get(e);t&&(t.position.fromArray(t.userData.defaultPosition),t.quaternion.fromArray(t.userData.defaultQuaternion),this.syncDeviceTransforms())}keyDownHandler(e){let{keyState:t}=this;if(e.code in t&&(t[e.code]=!0),!this.isInProgrammaticMode){if(this.gazeMode===`cursor`&&e.code===`Space`){if(e.composedPath().some(e=>{if(typeof e!=`object`||!e)return!1;let t=e;return t.isContentEditable===!0||typeof t.tagName==`string`&&[`A`,`BUTTON`,`INPUT`,`SELECT`,`TEXTAREA`].includes(t.tagName)}))return;e.preventDefault(),this.resetInputTransform(this.gazeCommitHand)}else t.ShiftLeft&&t.ArrowUp&&(this.cameraRig.position.y+=.05),t.ShiftLeft&&t.ArrowDown&&(this.cameraRig.position.y-=.05)}}keyUpHandler(e){let{keyState:t}=this;e.code in t&&(t[e.code]=!1)}movePlayerRig(e){let{playerRig:t,keyState:n,vec3:r}=this;r.set(+!!n.KeyD-!!n.KeyA,0,+!!n.KeyS-!!n.KeyW),r.lengthSq()>0&&n.ShiftLeft&&(r.normalize().multiplyScalar(uy*e).applyQuaternion(t.quaternion),t.position.add(r))}resetDeviceTransforms(){let{playerRig:e,cameraRig:t,transformHandles:n}=this;t.position.copy(this.headsetDefaultPosition),t.quaternion.copy(this.headsetDefaultQuaternion),e.position.set(0,0,0),e.quaternion.set(0,0,0,1),n.forEach(e=>{e.position.fromArray(e.userData.defaultPosition),e.quaternion.fromArray(e.userData.defaultQuaternion)})}captureDefaultPose(){let e=this.cameraRig.getWorldPosition(this.vec3).toArray(),t=this.cameraRig.getWorldQuaternion(this.quat).toArray(),n={},r={};return this.transformHandles.forEach((e,t)=>{let i=e.getWorldPosition(this.vec3).toArray(),a=e.getWorldQuaternion(this.quat).toArray();n[t]={position:i,quaternion:a},r[t]={position:[...i],quaternion:[...a]}}),{headset:{position:e,quaternion:t},controllers:n,hands:r}}applyDefaultPose(e){let{headset:t,controllers:n,hands:r}=e;this.headsetDefaultPosition.fromArray(t.position),this.headsetDefaultQuaternion.fromArray(t.quaternion),this.quatInv.copy(this.headsetDefaultQuaternion).invert(),this.transformHandles.forEach((e,t)=>{let i=n?.[t]??r?.[t];i&&(this.vec3.fromArray(i.position).sub(this.headsetDefaultPosition).applyQuaternion(this.quatInv),this.quat.fromArray(i.quaternion).premultiply(this.quatInv),e.userData.defaultPosition=this.vec3.toArray(),e.userData.defaultQuaternion=this.quat.toArray())}),this.resetDeviceTransforms(),this.combinedCameraPosition.copy(this.headsetDefaultPosition)}syncDeviceTransforms(){let{xrDevice:e,cameraRig:t,transformHandles:n}=this;e.position.copy(t.getWorldPosition(this.vec3)),e.quaternion.copy(t.getWorldQuaternion(this.quat)),n.forEach((t,n)=>{let r=e.primaryInputMode===`controller`?e.controllers[n]:e.hands[n];r.position.copy(t.getWorldPosition(this.vec3)),r.quaternion.copy(t.getWorldQuaternion(this.quat))})}syncFromDevice(){let{xrDevice:e,playerRig:t,cameraRig:n,transformHandles:r}=this;this.syncGazeModeFromDevice();let i=e.position,a=e.quaternion;this.combinedCameraPosition.set(i.x,i.y,i.z),this.quatB.set(a.x,a.y,a.z,a.w),this.euler.setFromQuaternion(this.quatB,`YXZ`),t.position.set(i.x,0,i.z),t.rotation.set(0,this.euler.y,0),n.position.set(0,i.y,0),this.quat.setFromEuler(this.euler.set(0,this.euler.y,0,`YXZ`)),n.quaternion.multiplyQuaternions(this.quat.invert(),this.quatB),t.updateMatrixWorld(!0),n.getWorldQuaternion(this.quatInv).invert(),r.forEach((t,r)=>{let i=e.primaryInputMode===`controller`?e.controllers[r]:e.hands[r],a=this.vec3.set(i.position.x,i.position.y,i.position.z);n.worldToLocal(a),t.position.copy(a),this.quatB.set(i.quaternion.x,i.quaternion.y,i.quaternion.z,i.quaternion.w),this.quatB.premultiply(this.quatInv),t.quaternion.copy(this.quatB)})}syncGazeModeFromDevice(){let e=this.xrDevice.gaze?.connected?`head-locked`:`off`;e!==this.gazeMode&&(this.releaseGazeCommit(!0),this.gazeHeadsetDragActive=!1,this.applyGazeModePresentation(e))}setInteractionsEnabled(e){this.interactionsEnabled=e,e||(this.releaseGazeCommit(!0),this.gazeHeadsetDragActive=!1),!e&&this.isPointerLocked&&document.exitPointerLock()}renderScene(e){!this.gazeCommitActive||this.gazeInteractionEnabled()&&this.gazeCommitSourceIsActive()||(this.releaseGazeCommit(!0),this.gazeHeadsetDragActive=!1),this.schedulePendingGazeRelease();let t=this.xrDevice.fovy/Math.PI*180,n=!1;this.camera.fov!==t&&(this.camera.fov=t,n=!0);let r=this.xrDevice.canvasDimensions;if(r){let e=this.renderer.domElement;(e.width!==r.width||e.height!==r.height)&&(this.camera.aspect=r.width/r.height,this.renderer.setSize(r.width,r.height),n=!0)}n&&this.camera.updateProjectionMatrix(),this.isInProgrammaticMode||(this.isPointerLocked?this.cameraRig.getWorldPosition(this.combinedCameraPosition):(this.cameraRig.position.y=this.combinedCameraPosition.y,this.playerRig.position.x=this.combinedCameraPosition.x,this.playerRig.position.z=this.combinedCameraPosition.z)),this.gazeMode!==`cursor`&&this.forwardHtmlEvents(),this.transformHandles.forEach((t,n)=>{let r=!!(this.xrDevice.primaryInputMode===`controller`?this.xrDevice.controllers[n]:this.xrDevice.hands[n])?.connected;t.visible=r&&!this.isPointerLocked&&!this.isInProgrammaticMode&&this.gazeMode!==`cursor`,r&&t.update(e,this.camera)});let i=Math.min((e-this.lastTime)/1e3,.1);this.isInProgrammaticMode||(this.movePlayerRig(i),this.syncDeviceTransforms()),this.renderer.render(this.scene,this.camera),this.lastTime=e}get domElement(){return this.renderer.domElement}dispose(){this.releaseGazeCommit(!0),this.setTransformHandleRoutingSuppressed(!1),this.renderer.dispose(),document.removeEventListener(`pointerlockchange`,this.pointerLockChangeHandlerBound,!1),document.removeEventListener(`mozpointerlockchange`,this.pointerLockChangeHandlerBound,!1),document.removeEventListener(`webkitpointerlockchange`,this.pointerLockChangeHandlerBound,!1),document.removeEventListener(`mousemove`,this.mouseMoveHandler,!1),document.removeEventListener(`keydown`,this.keyDownHandlerBound,!1),document.removeEventListener(`keyup`,this.keyUpHandlerBound,!1),this.renderer.domElement.removeEventListener(`pointerdown`,this.gazePointerDownHandlerBound),this.renderer.domElement.removeEventListener(`pointermove`,this.gazePointerMoveHandlerBound),this.renderer.domElement.removeEventListener(`pointerup`,this.gazePointerUpHandlerBound),this.renderer.domElement.removeEventListener(`pointercancel`,this.gazePointerUpHandlerBound),this.renderer.domElement.removeEventListener(`wheel`,this.gazeWheelHandlerBound),this.renderer.domElement.removeEventListener(`contextmenu`,this.gazeContextMenuHandlerBound),window.removeEventListener(`blur`,this.windowBlurHandlerBound),document.removeEventListener(`visibilitychange`,this.documentVisibilityHandlerBound)}},fy=`2.8.0`,py=D((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,O());else{var t=n(l);t!==null&&ee(x,t.startTime-e)}}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&ee(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?O():S=!1}}}var O;if(typeof y==`function`)O=function(){y(D)};else if(typeof MessageChannel<`u`){var k=new MessageChannel,A=k.port2;k.port1.onmessage=D,O=function(){A.postMessage(null)}}else O=function(){_(D,0)};function ee(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,ee(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,O()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),my=D(((e,t)=>{t.exports=py()})),hy=D((e=>{var t=ne();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function u(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=u(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=u(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),gy=D(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=hy()})),_y=D((e=>{var t=my(),n=ne(),r=gy();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function d(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=d(e),t!==null)return t;e=e.sibling}return null}function f(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&f(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function p(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function m(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function h(e){var t=[null,null],n=p(e);return n===null||g(t,e,n.child,{foundSelf:!1}),t}function g(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&g(e,t,n.child,r))return!0;n=n.sibling}return!1}function _(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var v=null,y=null;function b(e,t,n){return e===n||e===t&&(v=e,!0)}function x(e,t,n){return e===n?(y=e,!1):e===t&&(y!==null&&(v=e),!0)}function S(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function C(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var w=Object.assign,T=Symbol.for(`react.element`),E=Symbol.for(`react.transitional.element`),D=Symbol.for(`react.portal`),O=Symbol.for(`react.fragment`),k=Symbol.for(`react.strict_mode`),A=Symbol.for(`react.profiler`),ee=Symbol.for(`react.consumer`),te=Symbol.for(`react.context`),j=Symbol.for(`react.forward_ref`),re=Symbol.for(`react.suspense`),M=Symbol.for(`react.suspense_list`),ie=Symbol.for(`react.memo`),ae=Symbol.for(`react.lazy`),oe=Symbol.for(`react.activity`),se=Symbol.for(`react.legacy_hidden`),ce=Symbol.for(`react.memo_cache_sentinel`),le=Symbol.for(`react.view_transition`),ue=Symbol.for(`react.recoverable`),de=Symbol.iterator;function fe(e){return typeof e!=`object`||!e?null:(e=de&&e[de]||e[`@@iterator`],typeof e==`function`?e:null)}var pe=Symbol.for(`react.client.reference`);function me(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===pe?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case O:return`Fragment`;case A:return`Profiler`;case k:return`StrictMode`;case re:return`Suspense`;case M:return`SuspenseList`;case oe:return`Activity`;case le:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case D:return`Portal`;case te:return e.displayName||`Context`;case ee:return(e._context.displayName||`Context`)+`.Consumer`;case j:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case ie:return t=e.displayName||null,t===null?me(e.type)||`Memo`:t;case ae:t=e._payload,e=e._init;try{return me(e(t))}catch{}}return null}var he=Array.isArray,N=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,P=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ge={pending:!1,data:null,method:null,action:null},_e=[],ve=-1;function ye(e){return{current:e}}function F(e){0>ve||(e.current=_e[ve],_e[ve]=null,ve--)}function be(e,t){ve++,_e[ve]=e.current,e.current=t}var xe=ye(null),Se=ye(null),I=ye(null),Ce=ye(null);function L(e,t){switch(be(I,t),be(Se,e),be(xe,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?cp(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=cp(t),e=lp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}F(xe),be(xe,e)}function R(){F(xe),F(Se),F(I)}function we(e){var t=e.memoizedState;t!==null&&(ah._currentValue=t.memoizedState,be(Ce,e)),t=xe.current;var n=lp(t,e.type);t!==n&&(be(Se,e),be(xe,n))}function Te(e){Se.current===e&&(F(xe),F(Se)),Ce.current===e&&(F(Ce),ah._currentValue=ge)}var Ee,De;function Oe(e){if(Ee===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Ee=t&&t[1]||``,De=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Ee+e+De}var ke=!1;function Ae(e,t){if(!e||ke)return``;ke=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{ke=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Oe(n):``}function je(e,t){switch(e.tag){case 26:case 27:case 5:return Oe(e.type);case 16:return Oe(`Lazy`);case 13:return e.child!==t&&t!==null?Oe(`Suspense Fallback`):Oe(`Suspense`);case 19:return Oe(`SuspenseList`);case 0:case 15:return Ae(e.type,!1);case 11:return Ae(e.type.render,!1);case 1:return Ae(e.type,!0);case 31:return Oe(`Activity`);case 30:return Oe(`ViewTransition`);default:return``}}function Me(e){try{var t=``,n=null;do t+=je(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Ne=Object.prototype.hasOwnProperty,Pe=t.unstable_scheduleCallback,Fe=t.unstable_cancelCallback,Ie=t.unstable_shouldYield,Le=t.unstable_requestPaint,Re=t.unstable_now,ze=t.unstable_getCurrentPriorityLevel,Be=t.unstable_ImmediatePriority,Ve=t.unstable_UserBlockingPriority,He=t.unstable_NormalPriority,Ue=t.unstable_LowPriority,We=t.unstable_IdlePriority,Ge=t.log,Ke=t.unstable_setDisableYieldValue,qe=null,Je=null;function Ye(e){if(typeof Ge==`function`&&Ke(e),Je&&typeof Je.setStrictMode==`function`)try{Je.setStrictMode(qe,e)}catch{}}var Xe=Math.clz32?Math.clz32:$e,Ze=Math.log,Qe=Math.LN2;function $e(e){return e>>>=0,e===0?32:31-(Ze(e)/Qe|0)|0}var et=256,z=262144,B=4194304;function tt(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function nt(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=tt(n))):i=tt(o):i=tt(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=tt(n))):i=tt(o)):i=tt(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function rt(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function it(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-Xe(n),i=1<<r;t|=e[r],n&=~i}return t}function at(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ot(){var e=B;return B<<=1,!(B&62914560)&&(B=4194304),e}function st(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ct(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function lt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Xe(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&ut(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function ut(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Xe(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function dt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Xe(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function ft(e,t){var n=t&-t;return n=n&42?1:pt(n),(n&(e.suspendedLanes|t))===0?n:0}function pt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function mt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function ht(){var e=P.p;return e===0?(e=window.event,e===void 0?32:xh(e.type)):e}function gt(e,t){var n=P.p;try{return P.p=e,t()}finally{P.p=n}}var _t=Math.random().toString(36).slice(2),vt=`__reactFiber$`+_t,yt=`__reactProps$`+_t,bt=`__reactContainer$`+_t,xt=`__reactEvents$`+_t,St=`__reactListeners$`+_t,Ct=`__reactHandles$`+_t,wt=`__reactResources$`+_t,Tt=`__reactMarker$`+_t,Et=`__reactLoad$`+_t;function Dt(e){delete e[vt],delete e[yt],delete e[St],delete e[Ct]}function Ot(e){var t;if(t=e[vt])return t;for(var n=e.parentNode;n;){if(t=n[bt]||n[vt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=um(e);e!==null;){if(n=e[vt])return n;e=um(e)}return t}e=n,n=e.parentNode}return null}function kt(e){if(e=e[vt]||e[bt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function At(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function jt(e){var t=e[wt];return t||=e[wt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Mt(e){e[Tt]=!0}function Nt(e){e[Et]=void 0}var Pt=new Set,Ft={};function It(e,t){Lt(e,t),Lt(e+`Capture`,t)}function Lt(e,t){for(Ft[e]=t,e=0;e<t.length;e++)Pt.add(t[e])}var Rt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),zt={},Bt={};function Vt(e){return Ne.call(Bt,e)?!0:Ne.call(zt,e)?!1:Rt.test(e)?Bt[e]=!0:(zt[e]=!0,!1)}var Ht=!1;function Ut(){var e=Ht;return Ht=!1,e}function Wt(e,t,n){if(Vt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function Gt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function Kt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function qt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Jt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Yt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Xt(e){if(!e._valueTracker){var t=Jt(e)?`checked`:`value`;e._valueTracker=Yt(e,t,``+e[t])}}function Zt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Jt(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var Qt=/[\n"\\]/g;function $t(e){return e.replace(Qt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function en(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+qt(t)):e.value!==``+qt(t)&&(e.value=``+qt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):nn(e,qt(n)):o===`number`&&e.value==t?nn(e,qt(e.value)):nn(e,qt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+qt(s):e.removeAttribute(`name`)}function tn(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Xt(e);return}n=n==null?``:``+qt(n),t=t==null?n:``+qt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Xt(e)}function nn(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function rn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+qt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function an(e,t,n){t!=null&&(t=``+qt(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+qt(n)}function on(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(he(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=qt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Xt(e)}function sn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var cn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function ln(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||cn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function un(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,Ht=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(ln(e,a,r),Ht=!0)}else for(var o in t)t.hasOwnProperty(o)&&ln(e,o,t[o])}function dn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var fn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),pn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function mn(e){return pn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function hn(){}var gn=null;function _n(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var vn=null,yn=null;function bn(e){var t=kt(e);if(t&&(e=t.stateNode)){var n=e[yt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(en(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+$t(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[yt]||null;if(!a)throw Error(i(90));en(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Zt(r)}break a;case`textarea`:an(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&rn(e,!!n.multiple,t,!1)}}}var xn=!1;function Sn(e,t,n){if(xn)return e(t,n);xn=!0;try{return e(t)}finally{if(xn=!1,(vn!==null||yn!==null)&&(Id(),vn&&(t=vn,e=yn,yn=vn=null,bn(t),e)))for(t=0;t<e.length;t++)bn(e[t])}}function Cn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[yt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var wn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Tn=!1;if(wn)try{var En={};Object.defineProperty(En,"passive",{get:function(){Tn=!0}}),window.addEventListener(`test`,En,En),window.removeEventListener(`test`,En,En)}catch{Tn=!1}var Dn=null,On=null,kn=null;function An(){if(kn)return kn;var e,t=On,n=t.length,r,i=`value`in Dn?Dn.value:Dn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return kn=i.slice(e,1<r?1-r:void 0)}function jn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Mn(){return!0}function Nn(){return!1}function Pn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Mn:Nn,this.isPropagationStopped=Nn,this}return w(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Mn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Mn)},persist:function(){},isPersistent:Mn}),t}var Fn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},In=Pn(Fn),Ln=w({},Fn,{view:0,detail:0}),Rn=Pn(Ln),zn,Bn,Vn,Hn=w({},Ln,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:V,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Vn&&(Vn&&e.type===`mousemove`?(zn=e.screenX-Vn.screenX,Bn=e.screenY-Vn.screenY):Bn=zn=0,Vn=e),zn)},movementY:function(e){return`movementY`in e?e.movementY:Bn}}),Un=Pn(Hn),Wn=Pn(w({},Hn,{dataTransfer:0})),Gn=Pn(w({},Ln,{relatedTarget:0})),Kn=Pn(w({},Fn,{animationName:0,elapsedTime:0,pseudoElement:0})),qn=Pn(w({},Fn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Jn=Pn(w({},Fn,{data:0})),Yn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Xn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Zn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Qn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Zn[e])?!!t[e]:!1}function V(){return Qn}var H=Pn(w({},Ln,{key:function(e){if(e.key){var t=Yn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=jn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Xn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:V,charCode:function(e){return e.type===`keypress`?jn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?jn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),$n=Pn(w({},Hn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),er=Pn(w({},Fn,{submitter:0})),tr=Pn(w({},Ln,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:V})),nr=Pn(w({},Fn,{propertyName:0,elapsedTime:0,pseudoElement:0})),rr=Pn(w({},Hn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),ir=Pn(w({},Fn,{newState:0,oldState:0,source:0})),ar=[9,13,27,32],U=wn&&`CompositionEvent`in window,or=null;wn&&`documentMode`in document&&(or=document.documentMode);var sr=wn&&`TextEvent`in window&&!or,cr=wn&&(!U||or&&8<or&&11>=or),lr=` `,ur=!1;function dr(e,t){switch(e){case`keyup`:return ar.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function fr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var pr=!1;function mr(e,t){switch(e){case`compositionend`:return fr(t);case`keypress`:return t.which===32?(ur=!0,lr):null;case`textInput`:return e=t.data,e===lr&&ur?null:e;default:return null}}function hr(e,t){if(pr)return e===`compositionend`||!U&&dr(e,t)?(e=An(),kn=On=Dn=null,pr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return cr&&t.locale!==`ko`?null:t.data;default:return null}}var gr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function _r(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!gr[e.type]:t===`textarea`}function vr(e,t,n,r){vn?yn?yn.push(r):yn=[r]:vn=r,t=Gf(t,`onChange`),0<t.length&&(n=new In(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var yr=null,br=null;function xr(e){Lf(e,0)}function Sr(e){if(Zt(At(e)))return e}function Cr(e,t){if(e===`change`)return t}var wr=!1;if(wn){var Tr;if(wn){var W=`oninput`in document;if(!W){var Er=document.createElement(`div`);Er.setAttribute(`oninput`,`return;`),W=typeof Er.oninput==`function`}Tr=W}else Tr=!1;wr=Tr&&(!document.documentMode||9<document.documentMode)}function Dr(){yr&&(yr.detachEvent(`onpropertychange`,Or),br=yr=null)}function Or(e){if(e.propertyName===`value`&&Sr(br)){var t=[];vr(t,br,e,_n(e)),Sn(xr,t)}}function kr(e,t,n){e===`focusin`?(Dr(),yr=t,br=n,yr.attachEvent(`onpropertychange`,Or)):e===`focusout`&&Dr()}function Ar(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return Sr(br)}function jr(e,t){if(e===`click`)return Sr(t)}function Mr(e,t){if(e===`input`||e===`change`)return Sr(t)}function Nr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Pr=typeof Object.is==`function`?Object.is:Nr;function Fr(e,t){if(Pr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ne.call(t,i)||!Pr(e[i],t[i]))return!1}return!0}function Ir(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Lr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Rr(e,t){var n=Lr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Lr(n)}}function zr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?zr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Br(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ir(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ir(e.document)}return t}function Vr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Hr=wn&&`documentMode`in document&&11>=document.documentMode,Ur=null,Wr=null,Gr=null,Kr=!1;function qr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Kr||Ur==null||Ur!==Ir(r)||(r=Ur,`selectionStart`in r&&Vr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Gr&&Fr(Gr,r)||(Gr=r,r=Gf(Wr,`onSelect`),0<r.length&&(t=new In(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Ur)))}function Jr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Yr={animationend:Jr(`Animation`,`AnimationEnd`),animationiteration:Jr(`Animation`,`AnimationIteration`),animationstart:Jr(`Animation`,`AnimationStart`),transitionrun:Jr(`Transition`,`TransitionRun`),transitionstart:Jr(`Transition`,`TransitionStart`),transitioncancel:Jr(`Transition`,`TransitionCancel`),transitionend:Jr(`Transition`,`TransitionEnd`)},Xr={},Zr={};wn&&(Zr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Yr.animationend.animation,delete Yr.animationiteration.animation,delete Yr.animationstart.animation),`TransitionEvent`in window||delete Yr.transitionend.transition);function Qr(e){if(Xr[e])return Xr[e];if(!Yr[e])return e;var t=Yr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Zr)return Xr[e]=t[n];return e}var $r=Qr(`animationend`),ei=Qr(`animationiteration`),ti=Qr(`animationstart`),ni=Qr(`transitionrun`),ri=Qr(`transitionstart`),ii=Qr(`transitioncancel`),ai=Qr(`transitionend`),oi=new Map,si=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);si.push(`scrollEnd`);function ci(e,t){oi.set(e,t),It(t,[e])}var li=0;function ui(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=_d.identifierPrefix;var n=li++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function di(e){if(e==null||typeof e==`string`)return e;var t=null,n=Td;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function fi(e,t){return e=di(e),t=di(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var pi=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},mi=[],hi=0,gi=0;function _i(){for(var e=hi,t=gi=hi=0;t<e;){var n=mi[t];mi[t++]=null;var r=mi[t];mi[t++]=null;var i=mi[t];mi[t++]=null;var a=mi[t];if(mi[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&xi(n,i,a)}}function vi(e,t,n,r){mi[hi++]=e,mi[hi++]=t,mi[hi++]=n,mi[hi++]=r,gi|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function yi(e,t,n,r){return vi(e,t,n,r),Si(e)}function bi(e,t){return vi(e,null,null,t),Si(e)}function xi(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Xe(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function Si(e){if(50<Ed)throw Ed=0,Dd=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Ci={};function wi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ti(e,t,n,r){return new wi(e,t,n,r)}function Ei(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Di(e,t){var n=e.alternate;return n===null?(n=Ti(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Oi(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function ki(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)Ei(r)&&(s=1);else if(typeof r==`string`)s=Gm(e,n,xe.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case oe:return e=Ti(31,n,t,a),e.elementType=oe,e.lanes=o,e;case O:return Ai(n.children,a,o,t);case k:s=8,a|=24;break;case A:return e=Ti(12,n,t,a|2),e.elementType=A,e.lanes=o,e;case re:return e=Ti(13,n,t,a),e.elementType=re,e.lanes=o,e;case M:return e=Ti(19,n,t,a),e.elementType=M,e.lanes=o,e;case se:case le:return e=a|32,e=Ti(30,n,t,e),e.elementType=le,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case te:s=10;break a;case ee:s=9;break a;case j:s=11;break a;case ie:s=14;break a;case ae:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=Ti(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Ai(e,t,n,r){return e=Ti(7,e,r,t),e.lanes=n,e}function ji(e,t,n){return e=Ti(6,e,null,t),e.lanes=n,e}function Mi(e){var t=Ti(18,null,null,0);return t.stateNode=e,t}function Ni(e,t,n){return t=Ti(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Pi=new WeakMap;function Fi(e,t){if(typeof e==`object`&&e){var n=Pi.get(e);return n===void 0?(t={value:e,source:t,stack:Me(t)},Pi.set(e,t),t):n}return{value:e,source:t,stack:Me(t)}}var Ii=[],Li=0,Ri=null,zi=0,Bi=[],Vi=0,Hi=null,Ui=1,Wi=``;function Gi(e,t){Ii[Li++]=zi,Ii[Li++]=Ri,Ri=e,zi=t}function Ki(e,t,n){Bi[Vi++]=Ui,Bi[Vi++]=Wi,Bi[Vi++]=Hi,Hi=e;var r=Ui;e=Wi;var i=32-Xe(r)-1;r&=~(1<<i),n+=1;var a=32-Xe(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Ui=1<<32-Xe(t)+i|n<<i|r,Wi=a+e}else Ui=1<<a|n<<i|r,Wi=e}function qi(e){e.return!==null&&(Gi(e,1),Ki(e,1,0))}function Ji(e){for(;e===Ri;)Ri=Ii[--Li],Ii[Li]=null,zi=Ii[--Li],Ii[Li]=null;for(;e===Hi;)Hi=Bi[--Vi],Bi[Vi]=null,Wi=Bi[--Vi],Bi[Vi]=null,Ui=Bi[--Vi],Bi[Vi]=null}function G(e,t){Bi[Vi++]=Ui,Bi[Vi++]=Wi,Bi[Vi++]=Hi,Ui=t.id,Wi=t.overflow,Hi=e}var Yi=null,Xi=null,Zi=!1,Qi=null,$i=!1,ea=Error(i(519));function ta(e){throw sa(Fi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),ea}function na(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[vt]=e,t[yt]=r,n){case`dialog`:Rf(`cancel`,t),Rf(`close`,t);break;case`iframe`:case`object`:case`embed`:Rf(`load`,t);break;case`video`:case`audio`:for(n=0;n<Ff.length;n++)Rf(Ff[n],t);break;case`source`:Rf(`error`,t);break;case`img`:case`image`:case`link`:Rf(`error`,t),Rf(`load`,t);break;case`details`:Rf(`toggle`,t);break;case`input`:Rf(`invalid`,t),tn(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Rf(`invalid`,t);break;case`textarea`:Rf(`invalid`,t),on(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Zf(t.textContent,n)?(r.popover!=null&&(Rf(`beforetoggle`,t),Rf(`toggle`,t)),r.onScroll!=null&&Rf(`scroll`,t),r.onScrollEnd!=null&&Rf(`scrollend`,t),r.onClick!=null&&(t.onclick=hn),t=!0):t=!1,t||ta(e,!0)}function ra(e){for(Yi=e.return;Yi;)switch(Yi.tag){case 5:case 31:case 13:$i=!1;return;case 27:case 3:$i=!0;return;default:Yi=Yi.return}}function ia(e){if(e!==Yi)return!1;if(!Zi)return ra(e),Zi=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||dp(e.type,e.memoizedProps)),n=!n),n&&Xi&&ta(e),ra(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Xi=lm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Xi=lm(e)}else t===27?(t=Xi,bp(e.type)?(e=cm,cm=null,Xi=e):Xi=t):Xi=Yi?sm(e.stateNode.nextSibling):null;return!0}function aa(){Xi=Yi=null,Zi=!1}function oa(){var e=Qi;return e!==null&&(ld===null?ld=e:ld.push.apply(ld,e),Qi=null),e}function sa(e){Qi===null?Qi=[e]:Qi.push(e)}var ca=ye(null),la=null,ua=null;function da(e,t,n){be(ca,t._currentValue),t._currentValue=n}function fa(e){e._currentValue=ca.current,F(ca)}function pa(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function ma(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),pa(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),pa(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),pa(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function ha(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Pr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===Ce.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[ah]:e.push(ah))}a=a.return}return e!==null&&ma(t,e,n,r),t.flags|=262144,e!==null}function ga(e){for(e=e.firstContext;e!==null;){if(!Pr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function _a(e){la=e,ua=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function va(e){return ba(la,e)}function ya(e,t){return la===null&&_a(e),ba(e,t)}function ba(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ua===null){if(e===null)throw Error(i(308));ua=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ua=ua.next=t;return n}var xa=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Sa=t.unstable_scheduleCallback,Ca=t.unstable_NormalPriority,wa={$$typeof:te,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ta(){return{controller:new xa,data:new Map,refCount:0}}function Ea(e){e.refCount--,e.refCount===0&&Sa(Ca,function(){e.controller.abort()})}function Da(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var Oa=null;function ka(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Aa=null,ja=0,Ma=0,Na=null;function Pa(e,t){if(Aa===null){var n=Aa=[];ja=0,Ma=Af(),Na={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return ja++,t.then(Fa,Fa),t}function Fa(){if(--ja===0&&(Oa=null,Aa!==null)){Na!==null&&(Na.status=`fulfilled`);var e=Aa;Aa=null,Ma=0,Na=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Ia(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var La=N.S;N.S=function(e,t){if(fd=Re(),typeof t==`object`&&t&&typeof t.then==`function`&&Pa(e,t),Oa!==null)for(var n=vf;n!==null;)Da(n,Oa),n=n.next;if(n=e.types,n!==null){for(var r=vf;r!==null;)Da(r,n),r=r.next;if(Ma!==0){r=Oa,r===null&&(r=Oa=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}La!==null&&La(e,t)};var Ra=ye(null);function za(){var e=Ra.current;return e===null?qu.pooledCache:e}function Ba(e,t){t===null?be(Ra,Ra.current):be(Ra,t.pool)}function Va(){var e=za();return e===null?null:{parent:wa._currentValue,pool:e}}var Ha=Error(i(460)),Ua=Error(i(474)),Wa=Error(i(542)),Ga={then:function(){}};function Ka(e){return e=e.status,e===`fulfilled`||e===`rejected`}function qa(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(hn,hn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Za(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(hn,hn);else{if(e=qu,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Za(e),e}throw Ya=t,Ha}}function Ja(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Ya=e,Ha):e}}var Ya=null;function Xa(){if(Ya===null)throw Error(i(459));var e=Ya;return Ya=null,e}function Za(e){if(e===Ha||e===Wa)throw Error(i(483))}var Qa=null,$a=0;function eo(e){var t=$a;return $a+=1,Qa===null&&(Qa=[]),qa(Qa,e,t)}function to(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function no(e,t){throw t.$$typeof===T?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function ro(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Di(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=ji(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===O?(e=d(e,t,n.props.children,r,n.key),to(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===ae&&Ja(i)===t.type)?(t=a(t,n.props),to(t,n),t.return=e,t):(t=ki(n.type,n.key,n.props,null,e.mode,r),to(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Ni(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Ai(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=ji(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case E:return n=ki(t.type,t.key,t.props,null,e.mode,n),to(n,t),n.return=e,n;case D:return t=Ni(t,e.mode,n),t.return=e,t;case ae:return t=Ja(t),f(e,t,n)}if(he(t)||fe(t))return t=Ai(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,eo(t),n);if(t.$$typeof===te)return f(e,ya(e,t),n);no(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case E:return n.key===i?l(e,t,n,r):null;case D:return n.key===i?u(e,t,n,r):null;case ae:return n=Ja(n),p(e,t,n,r)}if(he(n)||fe(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,eo(n),r);if(n.$$typeof===te)return p(e,t,ya(e,n),r);no(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case E:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case D:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case ae:return r=Ja(r),m(e,t,n,r,i)}if(he(r)||fe(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,eo(r),i);if(r.$$typeof===te)return m(e,t,n,ya(t,r),i);no(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),Zi&&Gi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return Zi&&Gi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),Zi&&Gi(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),Zi&&Gi(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return Zi&&Gi(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),Zi&&Gi(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===O&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case E:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===O){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),to(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===ae&&Ja(l)===r.type){n(e,r.sibling),c=a(r,o.props),to(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===O?(c=Ai(o.props.children,e.mode,c,o.key),to(c,o),c.return=e,e=c):(c=ki(o.type,o.key,o.props,null,e.mode,c),to(c,o),c.return=e,e=c)}return s(e);case D:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Ni(o,e.mode,c),c.return=e,e=c}return s(e);case ae:return o=Ja(o),_(e,r,o,c)}if(he(o))return h(e,r,o,c);if(fe(o)){if(l=fe(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,eo(o),c);if(o.$$typeof===te)return _(e,r,ya(e,o),c);no(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=ji(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{$a=0;var i=_(e,t,n,r);return Qa=null,i}catch(t){if(t===Ha||t===Wa)throw t;var a=Ti(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var io=ro(!0),ao=ro(!1),oo=!1;function so(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function co(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function lo(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function uo(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Ku&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=Si(e),xi(e,null,n),t}return vi(e,r,t,n),Si(e)}function fo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,dt(e,n)}}function po(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var mo=!1;function ho(){if(mo){var e=Na;if(e!==null)throw e}}function go(e,t,n,r){mo=!1;var i=e.updateQueue;oo=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Yu&f)===f:(r&f)===f){f!==0&&f===Ma&&(mo=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=w({},d,f);break a;case 2:oo=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),rd|=o,e.lanes=o,e.memoizedState=d}}function _o(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function vo(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)_o(n[e],t)}var yo=ye(null),bo=ye(0);function xo(e,t){e=td,be(bo,e),be(yo,t),td=e|t.baseLanes}function So(){be(bo,td),be(yo,yo.current)}function Co(){td=bo.current,F(yo),F(bo)}var wo=ye(null),To=null;function Eo(e){var t=e.alternate;be(jo,jo.current&1),be(wo,e),To===null&&(t===null||yo.current!==null||t.memoizedState!==null)&&(To=e)}function Do(e){be(jo,jo.current),be(wo,e),To===null&&(To=e)}function Oo(e){e.tag===22?(be(jo,jo.current),be(wo,e),To===null&&(To=e)):ko()}function ko(){be(jo,jo.current),be(wo,wo.current)}function Ao(e){F(wo),To===e&&(To=null),F(jo)}var jo=ye(0);function Mo(e,t){be(wo,wo.current),be(jo,t)}function No(e){F(jo),F(wo),To===e&&(To=null)}function Po(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||im(n)||am(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Fo=0,K=null,Io=null,Lo=null,Ro=!1,zo=!1,Bo=!1,Vo=0,Ho=0,Uo=null,Wo=0;function Go(){throw Error(i(321))}function Ko(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Pr(e[n],t[n]))return!1;return!0}function qo(e,t,n,r,i,a){return Fo=a,K=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,N.H=e===null||e.memoizedState===null?uc:dc,Bo=!1,a=n(r,i),Bo=!1,zo&&(a=Yo(t,n,r,i)),Jo(e),a}function Jo(e){N.H=lc;var t=Io!==null&&Io.next!==null;if(Fo=0,Lo=Io=K=null,Ro=!1,Ho=0,Uo=null,t)throw Error(i(300));e===null||Ec||(e=e.dependencies,e!==null&&ga(e)&&(Ec=!0))}function Yo(e,t,n,r){K=e;var a=0;do{if(zo&&(Uo=null),Ho=0,zo=!1,25<=a)throw Error(i(301));if(a+=1,Lo=Io=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}N.H=fc,o=t(n,r)}while(zo);return o}function Xo(){var e=N.H,t=e.useState()[0];return t=typeof t.then==`function`?rs(t):t,e=e.useState()[0],(Io===null?null:Io.memoizedState)!==e&&(K.flags|=1024),t}function Zo(){var e=Vo!==0;return Vo=0,e}function Qo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function $o(e){if(Ro){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ro=!1}Fo=0,Lo=Io=K=null,zo=!1,Ho=Vo=0,Uo=null}function es(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Lo===null?K.memoizedState=Lo=e:Lo=Lo.next=e,Lo}function ts(){if(Io===null){var e=K.alternate;e=e===null?null:e.memoizedState}else e=Io.next;var t=Lo===null?K.memoizedState:Lo.next;if(t!==null)Lo=t,Io=e;else{if(e===null)throw K.alternate===null?Error(i(467)):Error(i(310));Io=e,e={memoizedState:Io.memoizedState,baseState:Io.baseState,baseQueue:Io.baseQueue,queue:Io.queue,next:null},Lo===null?K.memoizedState=Lo=e:Lo=Lo.next=e}return Lo}function ns(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function rs(e){var t=Ho;return Ho+=1,Uo===null&&(Uo=[]),e=qa(Uo,e,t),t=K,(Lo===null?t.memoizedState:Lo.next)===null&&(t=t.alternate,N.H=t===null||t.memoizedState===null?uc:dc),e}function is(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return rs(e);if(e.$$typeof===ue)return;if(e.$$typeof===te)return va(e)}throw Error(i(438,String(e)))}function as(e){var t=null,n=K.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=K.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=ns(),K.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ce;return t.index++,n}function os(e,t){return typeof t==`function`?t(e):t}function ss(e){return cs(ts(),Io,e)}function cs(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Fo&f)===f:(Yu&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===Ma&&(d=!0);else if((Fo&p)===p){u=u.next,p===Ma&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,K.lanes|=p,rd|=p;f=u.action,Bo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,K.lanes|=f,rd|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Pr(o,e.memoizedState)&&(Ec=!0,d&&(n=Na,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function ls(e){var t=ts(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Pr(o,t.memoizedState)||(Ec=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function us(e,t,n){var r=K,a=ts(),o=Zi;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Pr((Io||a).memoizedState,n);if(s&&(a.memoizedState=n,Ec=!0),a=a.queue,Fs(ps.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||Lo!==null&&!!(Lo.memoizedState.tag&1),As(e?9:8,{destroy:void 0},fs.bind(null,r,a,n,t),null),e){if(r.flags|=2048,qu===null)throw Error(i(349));o||Fo&127||ds(r,t,n)}return n}function ds(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=K.updateQueue,t===null?(t=ns(),K.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function fs(e,t,n,r){t.value=n,t.getSnapshot=r,ms(t)&&hs(e)}function ps(e,t,n){return n(function(){ms(t)&&hs(e)})}function ms(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Pr(e,n)}catch{return!0}}function hs(e){var t=bi(e,2);t!==null&&jd(t,e,2)}function gs(e){var t=es();if(typeof e==`function`){var n=e;if(e=n(),Bo){Ye(!0);try{n()}finally{Ye(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:os,lastRenderedState:e},t}function _s(e,t,n,r){return e.baseState=n,cs(e,Io,typeof r==`function`?r:os)}function vs(e,t,n,r,a){if(oc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};N.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,ys(t,o)):(o.next=n.next,t.pending=n.next=o)}}function ys(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=N.T,o={};o.types=a===null?null:a.types,N.T=o;try{var s=n(i,r),c=N.S;c!==null&&c(o,s),bs(e,t,s)}catch(n){Ss(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),N.T=a}}else try{a=n(i,r),bs(e,t,a)}catch(n){Ss(e,t,n)}}function bs(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){xs(e,t,n)},function(n){return Ss(e,t,n)}):xs(e,t,n)}function xs(e,t,n){t.status=`fulfilled`,t.value=n,Cs(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,ys(e,n)))}function Ss(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Cs(t),t=t.next;while(t!==r)}e.action=null}function Cs(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function ws(e,t){return t}function Ts(e,t){if(Zi){var n=qu.formState;if(n!==null){a:{var r=K;if(Zi){if(Xi){b:{for(var i=Xi,a=$i;i.nodeType!==8;)if(!a||(i=sm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){Xi=sm(i.nextSibling),r=i.data===`F!`;break a}}ta(r)}r=!1}r&&(t=n[0])}}return n=es(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ws,lastRenderedState:t},n.queue=r,n=rc.bind(null,K,r),r.dispatch=n,r=gs(!1),a=ac.bind(null,K,!1,r.queue),r=es(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=vs.bind(null,K,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Es(e){return Ds(ts(),Io,e)}function Ds(e,t,n){if(t=cs(e,t,ws)[0],e=ss(os)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=rs(t)}catch(e){throw e===Ha?Wa:e}else r=t;t=ts();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(K.flags|=2048,As(9,{destroy:void 0},Os.bind(null,i,n),null)),[r,a,e]}function Os(e,t){e.action=t}function ks(e){var t=ts(),n=Io;if(n!==null)return Ds(t,n,e);ts(),t=t.memoizedState,n=ts();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function As(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=K.updateQueue,t===null&&(t=ns(),K.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function js(){return ts().memoizedState}function Ms(e,t,n,r){var i=es();K.flags|=e,i.memoizedState=As(1|t,{destroy:void 0},n,r===void 0?null:r)}function Ns(e,t,n,r){var i=ts();r=r===void 0?null:r;var a=i.memoizedState.inst;Io!==null&&r!==null&&Ko(r,Io.memoizedState.deps)?i.memoizedState=As(t,a,n,r):(K.flags|=e,i.memoizedState=As(1|t,a,n,r))}function Ps(e,t){Ms(8390656,8,e,t)}function Fs(e,t){Ns(2048,8,e,t)}function Is(e){K.flags|=4;var t=K.updateQueue;if(t===null)t=ns(),K.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Ls(e){var t=ts().memoizedState;return Is({ref:t,nextImpl:e}),function(){if(Ku&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Rs(e,t){return Ns(4,2,e,t)}function zs(e,t){return Ns(4,4,e,t)}function Bs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Vs(e,t,n){n=n==null?null:n.concat([e]),Ns(4,4,Bs.bind(null,t,e),n)}function Hs(){}function Us(e,t){var n=ts();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Ko(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ws(e,t){var n=ts();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Ko(t,r[1]))return r[0];if(r=e(),Bo){Ye(!0);try{e()}finally{Ye(!1)}}return n.memoizedState=[r,t],r}function Gs(e,t,n){return n===void 0||Fo&1073741824&&!(Yu&261930)?e.memoizedState=t:(e.memoizedState=n,e=kd(),K.lanes|=e,rd|=e,n)}function Ks(e,t,n,r){return Pr(n,t)?n:yo.current===null?!(Fo&106)||Fo&1073741824&&!(Yu&261930)?(Ec=!0,e.memoizedState=n):(e=kd(),K.lanes|=e,rd|=e,t):(e=Gs(e,n,r),Pr(e,t)||(Ec=!0),e)}function qs(e,t,n,r,i){var a=P.p;P.p=a!==0&&8>a?a:8;var o=N.T,s={};s.types=o===null?null:o.types,N.T=s,ac(e,!1,t,n);try{var c=i(),l=N.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?ic(e,t,Ia(c,r),Od(e)):ic(e,t,r,Od(e))}catch(n){ic(e,t,{then:function(){},status:`rejected`,reason:n},Od())}finally{P.p=a,o!==null&&s.types!==null&&(o.types=s.types),N.T=o}}function Js(){}function Ys(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Xs(e).queue;qs(e,a,t,ge,n===null?Js:function(){return Zs(e),n(r)})}function Xs(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ge,baseState:ge,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:os,lastRenderedState:ge},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:os,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Zs(e){var t=Xs(e);t.next===null&&(t=e.alternate.memoizedState),ic(e,t.next.queue,{},Od())}function Qs(){return va(ah)}function $s(){return ts().memoizedState}function ec(){return ts().memoizedState}function tc(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Od();e=lo(n);var r=uo(t,e,n);r!==null&&(jd(r,t,n),fo(r,t,n)),t={cache:Ta()},e.payload=t;return}t=t.return}}function nc(e,t,n){var r=Od();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},oc(e)?sc(t,n):(n=yi(e,t,n,r),n!==null&&(jd(n,e,r),cc(n,t,r)))}function rc(e,t,n){ic(e,t,n,Od())}function ic(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(oc(e))sc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Pr(s,o))return vi(e,t,i,0),qu===null&&_i(),!1}catch{}if(n=yi(e,t,i,r),n!==null)return jd(n,e,r),cc(n,t,r),!0}return!1}function ac(e,t,n,r){if(r={lane:2,revertLane:Af(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},oc(e)){if(t)throw Error(i(479))}else t=yi(e,n,r,2),t!==null&&jd(t,e,2)}function oc(e){var t=e.alternate;return e===K||t!==null&&t===K}function sc(e,t){zo=Ro=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function cc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,dt(e,n)}}var lc={readContext:va,use:is,useCallback:Go,useContext:Go,useEffect:Go,useImperativeHandle:Go,useLayoutEffect:Go,useInsertionEffect:Go,useMemo:Go,useReducer:Go,useRef:Go,useState:Go,useDebugValue:Go,useDeferredValue:Go,useTransition:Go,useSyncExternalStore:Go,useId:Go,useHostTransitionStatus:Go,useFormState:Go,useActionState:Go,useOptimistic:Go,useMemoCache:Go,useCacheRefresh:Go,useEffectEvent:Go},uc={readContext:va,use:is,useCallback:function(e,t){return es().memoizedState=[e,t===void 0?null:t],e},useContext:va,useEffect:Ps,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Ms(4194308,4,Bs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ms(4194308,4,e,t)},useInsertionEffect:function(e,t){Ms(4,2,e,t)},useMemo:function(e,t){var n=es();t=t===void 0?null:t;var r=e();if(Bo){Ye(!0);try{e()}finally{Ye(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=es();if(n!==void 0){var i=n(t);if(Bo){Ye(!0);try{n(t)}finally{Ye(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=nc.bind(null,K,e),[r.memoizedState,e]},useRef:function(e){var t=es();return e={current:e},t.memoizedState=e},useState:function(e){e=gs(e);var t=e.queue,n=rc.bind(null,K,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Hs,useDeferredValue:function(e,t){return Gs(es(),e,t)},useTransition:function(){var e=gs(!1);return e=qs.bind(null,K,e.queue,!0,!1),es().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=K,a=es();if(Zi){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),qu===null)throw Error(i(349));Yu&127||ds(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Ps(ps.bind(null,r,o,e),[e]),r.flags|=2048,As(9,{destroy:void 0},fs.bind(null,r,o,n,t),null),n},useId:function(){var e=es(),t=qu.identifierPrefix;if(Zi){var n=Wi,r=Ui;n=(r&~(1<<32-Xe(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Vo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Wo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Qs,useFormState:Ts,useActionState:Ts,useOptimistic:function(e){var t=es();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=ac.bind(null,K,!0,n),n.dispatch=t,[e,t]},useMemoCache:as,useCacheRefresh:function(){return es().memoizedState=tc.bind(null,K)},useEffectEvent:function(e){var t=es(),n={impl:e};return t.memoizedState=n,function(){if(Ku&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},dc={readContext:va,use:is,useCallback:Us,useContext:va,useEffect:Fs,useImperativeHandle:Vs,useInsertionEffect:Rs,useLayoutEffect:zs,useMemo:Ws,useReducer:ss,useRef:js,useState:function(){return ss(os)},useDebugValue:Hs,useDeferredValue:function(e,t){return Ks(ts(),Io.memoizedState,e,t)},useTransition:function(){var e=ss(os)[0],t=ts().memoizedState;return[typeof e==`boolean`?e:rs(e),t]},useSyncExternalStore:us,useId:$s,useHostTransitionStatus:Qs,useFormState:Es,useActionState:Es,useOptimistic:function(e,t){return _s(ts(),Io,e,t)},useMemoCache:as,useCacheRefresh:ec,useEffectEvent:Ls},fc={readContext:va,use:is,useCallback:Us,useContext:va,useEffect:Fs,useImperativeHandle:Vs,useInsertionEffect:Rs,useLayoutEffect:zs,useMemo:Ws,useReducer:ls,useRef:js,useState:function(){return ls(os)},useDebugValue:Hs,useDeferredValue:function(e,t){var n=ts();return Io===null?Gs(n,e,t):Ks(n,Io.memoizedState,e,t)},useTransition:function(){var e=ls(os)[0],t=ts().memoizedState;return[typeof e==`boolean`?e:rs(e),t]},useSyncExternalStore:us,useId:$s,useHostTransitionStatus:Qs,useFormState:ks,useActionState:ks,useOptimistic:function(e,t){var n=ts();return Io===null?(n.baseState=e,[e,n.queue.dispatch]):_s(n,Io,e,t)},useMemoCache:as,useCacheRefresh:ec,useEffectEvent:Ls};function pc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:w({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var mc={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Od(),i=lo(r);i.payload=t,n!=null&&(i.callback=n),t=uo(e,i,r),t!==null&&(jd(t,e,r),fo(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Od(),i=lo(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=uo(e,i,r),t!==null&&(jd(t,e,r),fo(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Od(),r=lo(n);r.tag=2,t!=null&&(r.callback=t),t=uo(e,r,n),t!==null&&(jd(t,e,n),fo(t,e,n))}};function hc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Fr(n,r)||!Fr(i,a):!0}function gc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&mc.enqueueReplaceState(t,t.state,null)}function _c(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=w({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function vc(e){pi(e)}function q(e){console.error(e)}function J(e){pi(e)}function yc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function bc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function xc(e,t,n){return n=lo(n),n.tag=3,n.payload={element:null},n.callback=function(){yc(e,t)},n}function Sc(e){return e=lo(e),e.tag=3,e}function Cc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){bc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){bc(t,n,r),typeof i!=`function`&&(hd===null?hd=new Set([this]):hd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function wc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&ha(t,n,a,!0),n=wo.current,n!==null){switch(n.tag){case 31:case 13:case 19:return To===null?Ud():n.alternate===null&&nd===0&&(nd=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Ga?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),ff(e,r,a)),!1;case 22:return n.flags|=65536,r===Ga?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),ff(e,r,a)),!1}throw Error(i(435,n.tag))}return ff(e,r,a),Ud(),!1}if(Zi)return t=wo.current,t===null?(r!==ea&&(t=Error(i(423),{cause:r}),sa(Fi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Fi(r,n),a=xc(e.stateNode,r,a),po(e,a),nd!==4&&(nd=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==ea&&(e=Error(i(422),{cause:r}),sa(Fi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Fi(o,n),cd===null?cd=[o]:cd.push(o),nd!==4&&(nd=2),t===null)return!0;r=Fi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=xc(n.stateNode,r,e),po(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(hd===null||!hd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Sc(a),Cc(a,e,n,r),po(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Tc=Error(i(461)),Ec=!1;function Y(e,t,n,r){t.child=e===null?ao(t,null,n,r):io(t,e.child,n,r)}function Dc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return _a(t),r=qo(e,t,n,o,a,i),s=Zo(),e!==null&&!Ec?(Qo(e,t,i),$c(e,t,i)):(Zi&&s&&qi(t),t.flags|=1,Y(e,t,r,i),t.child)}function Oc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!Ei(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,kc(e,t,a,r,i)):(e=ki(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!el(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Fr:n,n(o,r)&&e.ref===t.ref)return $c(e,t,i)}return t.flags|=1,e=Di(a,r),e.ref=t.ref,e.return=t,t.child=e}function kc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Fr(a,r)&&e.ref===t.ref){if(Ec=!1,t.pendingProps=r=a,el(e,i))e.flags&131072&&(Ec=!0);else return t.lanes=e.lanes,$c(e,t,i)}}return Fc(e,t,n,r,i)}function Ac(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Mc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ba(t,a===null?null:a.cachePool),a===null?So():xo(t,a),Oo(t);else return r=t.lanes=536870912,Mc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Ba(t,null),So(),ko()):(Ba(t,a.cachePool),xo(t,a),ko(),t.memoizedState=null);return Y(e,t,i,n),t.child}function jc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Mc(e,t,n,r,i){var a=za();return a=a===null?null:{parent:wa._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Ba(t,null),So(),Oo(t),e!==null&&ha(e,t,r,!0),t.childLanes=i,null}function X(e,t){return t=Wc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Nc(e,t,n){return io(t,e.child,null,n),e=X(t,t.pendingProps),e.flags|=2,Ao(t),t.memoizedState=null,e}function Pc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(Zi){if(r.mode===`hidden`)return e=X(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},jc(null,e);if(Do(t),(e=Xi)?(e=rm(e,$i),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Hi===null?null:{id:Ui,overflow:Wi},retryLane:536870912,hydrationErrors:null},n=Mi(e),n.return=t,t.child=n,Yi=t,Xi=null)):e=null,e===null)throw ta(t);return t.lanes=536870912,null}return X(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(Do(t),a){if(t.flags&256)t.flags&=-257,t=Nc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(Ec||ha(e,t,n,!1),a=(n&e.childLanes)!==0,Ec||a){if(yo.current===null){if(r=qu,r!==null&&(s=ft(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,bi(e,s),jd(r,e,s),Tc;Ud()}t=Nc(e,t,n)}else e=o.treeContext,Xi=sm(s.nextSibling),Yi=t,Zi=!0,Qi=null,$i=!1,e!==null&&G(t,e),t=X(t,r),t.flags|=134221824;return t}return e=Di(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Z(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Fc(e,t,n,r,i){return _a(t),n=qo(e,t,n,r,void 0,i),r=Zo(),e!==null&&!Ec?(Qo(e,t,i),$c(e,t,i)):(Zi&&r&&qi(t),t.flags|=1,Y(e,t,n,i),t.child)}function Ic(e,t,n,r,i,a){return _a(t),t.updateQueue=null,n=Yo(t,r,n,i),Jo(e),r=Zo(),e!==null&&!Ec?(Qo(e,t,a),$c(e,t,a)):(Zi&&r&&qi(t),t.flags|=1,Y(e,t,n,a),t.child)}function Lc(e,t,n,r,i){if(_a(t),t.stateNode===null){var a=Ci,o=n.contextType;typeof o==`object`&&o&&(a=va(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=mc,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},so(t),o=n.contextType,a.context=typeof o==`object`&&o?va(o):Ci,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(pc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&mc.enqueueReplaceState(a,a.state,null),go(t,r,a,i),ho(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=_c(n,s);a.props=c;var l=a.context,u=n.contextType;o=Ci,typeof u==`object`&&u&&(o=va(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&gc(t,a,r,o),oo=!1;var f=t.memoizedState;a.state=f,go(t,r,a,i),ho(),l=t.memoizedState,s||f!==l||oo?(typeof d==`function`&&(pc(t,n,d,r),l=t.memoizedState),(c=oo||hc(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,co(e,t),o=t.memoizedProps,u=_c(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=Ci,typeof l==`object`&&l&&(c=va(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&gc(t,a,r,c),oo=!1,f=t.memoizedState,a.state=f,go(t,r,a,i),ho();var p=t.memoizedState;o!==d||f!==p||oo||e!==null&&e.dependencies!==null&&ga(e.dependencies)?(typeof s==`function`&&(pc(t,n,s,r),p=t.memoizedState),(u=oo||hc(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&ga(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,Z(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=io(t,e.child,null,i),t.child=io(t,null,n,i)):Y(e,t,n,i),t.memoizedState=a.state,e=t.child):e=$c(e,t,i),e}function Rc(e,t,n,r){return aa(),t.flags|=256,Y(e,t,n,r),t.child}var zc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Bc(e){return{baseLanes:e,cachePool:Va()}}function Vc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=od),e}function Hc(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(jo.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(Zi){if(i?Eo(t):ko(),(e=Xi)?(e=rm(e,$i),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Hi===null?null:{id:Ui,overflow:Wi},retryLane:536870912,hydrationErrors:null},n=Mi(e),n.return=t,t.child=n,Yi=t,Xi=null)):e=null,e===null)throw ta(t);return t.lanes=am(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(ko(),i=t.mode,a=Wc({mode:`hidden`,children:a},i),r=Ai(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=Bc(n),r.childLanes=Vc(e,o,n),t.memoizedState=zc,jc(null,r)):(Eo(t),Uc(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return Kc(e,t,a,o,r,c,s,n)}return i?(ko(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Di(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=Ai(i,a,n,null),i.flags|=2):i=Di(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,jc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=Bc(n):(a=i.cachePool,a===null?a=Va():(s=wa._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=Vc(e,o,n),t.memoizedState=zc,jc(e.child,r)):(Eo(t),n=e.child,e=n.sibling,n=Di(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Uc(e,t){return t=Wc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Wc(e,t){return e=Ti(22,e,null,t),e.lanes=0,e}function Gc(e,t,n){return io(t,e.child,null,n),e=Uc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Kc(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(Eo(t),t.flags&=-257,Gc(e,t,c)):t.memoizedState===null?(ko(),o=a.fallback,s=t.mode,a=Wc({mode:`visible`,children:a.children},s),o=Ai(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,io(t,e.child,null,c),a=t.child,a.memoizedState=Bc(c),a.childLanes=Vc(e,r,c),t.memoizedState=zc,jc(null,a)):(ko(),t.child=e.child,t.flags|=128,null);if(Eo(t),am(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,sa({value:a,source:null,stack:null})),Gc(e,t,c)}if(Ec||ha(e,t,c,!1),r=(c&e.childLanes)!==0,Ec||r){if(yo.current!==null)return Gc(e,t,c);if(r=qu,r!==null&&(a=ft(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,bi(e,a),jd(r,e,a),Tc;return im(o)||Ud(),Gc(e,t,c)}return im(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,Xi=sm(o.nextSibling),Yi=t,Zi=!0,Qi=null,$i=!1,e!==null&&G(t,e),t=Uc(t,a.children),t.flags|=134221824,t)}function qc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),pa(e.return,t,n)}function Jc(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Po(n)===null&&(t=e),e=e.sibling}return t}function Yc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Xc(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function Zc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=jo.current;if(t.flags&128)return Mo(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Mo(t,o),i===`backwards`&&e!==null?(Xc(e),Y(e,t,r,n),Xc(e)):Y(e,t,r,n),r=Zi?zi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&qc(e,n,t);else if(e.tag===19)qc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=Jc(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,Xc(t)),Yc(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Po(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Yc(t,!0,n,null,a,r);break;case`together`:Yc(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=Jc(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Yc(t,!1,i,n,a,r)}return t.child}function Qc(e,t,n){var r=t.pendingProps;return da(t,t.type,r.value),Y(e,t,r.children,n),t.child}function $c(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),rd|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(ha(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Di(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Di(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function el(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&ga(e)))}function tl(e,t,n){switch(t.tag){case 3:L(t,t.stateNode.containerInfo),da(t,wa,e.memoizedState.cache),aa();break;case 27:case 5:we(t);break;case 4:L(t,t.stateNode.containerInfo);break;case 10:da(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Do(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return Eo(t),t.flags|=128,null;r=ha(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?Hc(e,t,n):(Eo(t),e=$c(e,t,n),e===null?null:e.sibling)}Eo(t);break;case 19:if(t.flags&128)return Zc(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(ha(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Zc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Mo(t,jo.current),r)break;return null;case 22:return t.lanes=0,Ac(e,t,n,t.pendingProps);case 24:da(t,wa,e.memoizedState.cache)}return $c(e,t,n)}function nl(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)Ec=!0;else{if(!el(e,n)&&!(t.flags&128))return Ec=!1,tl(e,t,n);Ec=!!(e.flags&131072)}}else Ec=!1,Zi&&t.flags&1048576&&Ki(t,zi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Ja(t.elementType),t.type=e,typeof e==`function`)Ei(e)?(r=_c(e,r),t.tag=1,t=Lc(null,t,e,r,n)):(t.tag=0,t=Fc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===j){t.tag=11,t=Dc(null,t,e,r,n);break a}if(a===ie){t.tag=14,t=Oc(null,t,e,r,n);break a}if(a===te){t.tag=10,t.type=e,t=Qc(null,t,n);break a}}throw t=me(e)||e,Error(i(306,t,``))}}return t;case 0:return Fc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=_c(r,t.pendingProps),Lc(e,t,r,a,n);case 3:a:{if(L(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,co(e,t),go(t,r,null,n);var s=t.memoizedState;if(r=s.cache,da(t,wa,r),r!==o.cache&&ma(t,[wa],n,!0),ho(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Rc(e,t,r,n);break a}if(r!==a){a=Fi(Error(i(424)),t),sa(a),t=Rc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(Xi=sm(e.firstChild),Yi=t,Zi=!0,Qi=null,$i=!0,n=ao(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(aa(),r===a){t=$c(e,t,n);break a}Y(e,t,r,n)}t=t.child}return t;case 26:return Z(e,t),e===null?(n=jm(t.type,null,t.pendingProps,null))?t.memoizedState=n:Zi||(t.stateNode=up(t.type,t.pendingProps,I.current,t)):t.memoizedState=jm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return we(t),e===null&&Zi&&(r=t.stateNode=pm(t.type,t.pendingProps,I.current),Yi=t,$i=!0,a=Xi,bp(t.type)?(cm=a,Xi=sm(r.firstChild)):Xi=a),Y(e,t,t.pendingProps.children,n),Z(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Zi&&((a=r=Xi)&&(r=tm(r,t.type,t.pendingProps,$i),r===null?a=!1:(t.stateNode=r,Yi=t,Xi=sm(r.firstChild),$i=!1,a=!0)),a||ta(t)),we(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,dp(a,o)?r=null:s!==null&&dp(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=qo(e,t,Xo,null,null,n),ah._currentValue=a),Z(e,t),Y(e,t,r,n),t.child;case 6:return e===null&&Zi&&((e=n=Xi)&&(n=nm(n,t.pendingProps,$i),n===null?e=!1:(t.stateNode=n,Yi=t,Xi=null,e=!0)),e||ta(t)),null;case 13:return Hc(e,t,n);case 4:return L(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=io(t,null,r,n):Y(e,t,r,n),t.child;case 11:return Dc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,Z(e,t),Y(e,t,r,n),t.child;case 8:return Y(e,t,t.pendingProps.children,n),t.child;case 12:return Y(e,t,t.pendingProps.children,n),t.child;case 10:return Qc(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,_a(t),a=va(a),r=r(a),t.flags|=1,Y(e,t,r,n),t.child;case 14:return Oc(e,t,t.type,t.pendingProps,n);case 15:return kc(e,t,t.type,t.pendingProps,n);case 19:return Zc(e,t,n);case 31:return Pc(e,t,n);case 22:return Ac(e,t,n,t.pendingProps);case 24:return _a(t),r=va(wa),e===null?(a=za(),a===null&&(a=qu,o=Ta(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},so(t),da(t,wa,a)):((e.lanes&n)!==0&&(co(e,t),go(t,null,null,n),ho()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,da(t,wa,r),r!==a.cache&&ma(t,[wa],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),da(t,wa,r))),Y(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:Zi&&qi(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:Z(e,t),Y(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function rl(e){e.flags|=4}function il(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Km(t,r):Km(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Bd())e.flags|=8192;else throw Ya=Ga,Ua}}else e.flags&=-16777217}function al(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!qm(t)){if(Bd())e.flags|=8192;else throw Ya=Ga,Ua}}function ol(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:ot(),e.lanes|=t,sd|=t)}function sl(e,t){if(!Zi)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function cl(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function ll(e,t,n){var r=t.pendingProps;switch(Ji(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return cl(t),null;case 1:return cl(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),fa(wa),R(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(ia(t)?rl(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,oa())),cl(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(rl(t),o===null?(cl(t),il(t,a,null,r,n)):(cl(t),al(t,o))):o?o===e.memoizedState?(cl(t),t.flags&=-16777217):(rl(t),cl(t),al(t,o)):(e=e.memoizedProps,e!==r&&rl(t),cl(t),il(t,a,e,r,n)),null;case 27:if(Te(t),n=I.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&rl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return cl(t),t.subtreeFlags&=-33554433,null}e=xe.current,ia(t)?na(t,e):(e=pm(a,r,n),t.stateNode=e,rl(t))}return cl(t),t.subtreeFlags&=-33554433,null;case 5:if(Te(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&rl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return cl(t),t.subtreeFlags&=-33554433,null}if(o=xe.current,ia(t))na(t,o);else{var s=sp(I.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[vt]=t,o[yt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(ep(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&rl(t)}}return cl(t),t.subtreeFlags&=-33554433,il(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&rl(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=I.current,ia(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Yi,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[vt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Zf(e.nodeValue,n)),e||ta(t,!0)}else e=sp(e).createTextNode(r),e[vt]=t,t.stateNode=e}return cl(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=ia(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[vt]=t}else aa(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;cl(t),e=!1}else n=oa(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Ao(t),t):(Ao(t),null);if(t.flags&128)throw Error(i(558))}return cl(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=ia(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[vt]=t}else aa(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;cl(t),a=!1}else a=oa(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Ao(t),t):(Ao(t),null)}return Ao(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),ol(t,t.updateQueue),cl(t),null);case 4:return R(),e===null&&Vf(t.stateNode.containerInfo),t.flags|=67108864,cl(t),null;case 10:return fa(t.type),cl(t),null;case 19:if(No(t),r=t.memoizedState,r===null)return cl(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)sl(r,!1);else{if(nd!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Po(e),o!==null){for(t.flags|=128,sl(r,!1),e=o.updateQueue,t.updateQueue=e,ol(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Oi(n,e),n=n.sibling;return Mo(t,jo.current&1|2),Zi&&Gi(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Re()>pd&&(t.flags|=128,a=!0,sl(r,!1),t.lanes=4194304)}}else{if(!a){if(e=Po(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,ol(t,e),sl(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!Zi)return cl(t),null}else 2*Re()-r.renderingStartTime>pd&&n!==536870912&&(t.flags|=128,a=!0,sl(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Re(),e.sibling=null,o=jo.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||Zi?Mo(t,o):(n=o,be(wo,t),be(jo,n),To===null&&(To=t)),Zi&&Gi(t,r.treeForkCount),e}return cl(t),null;case 22:case 23:return Ao(t),Co(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(cl(t),t.subtreeFlags&6&&(t.flags|=8192)):cl(t),n=t.updateQueue,n!==null&&ol(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&F(Ra),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),fa(wa),cl(t),null;case 25:return null;case 30:return t.flags|=33554432,cl(t),null}throw Error(i(156,t.tag))}function ul(e,t){switch(Ji(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return fa(wa),R(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Te(t),null;case 31:if(t.memoizedState!==null){if(Ao(t),t.alternate===null)throw Error(i(340));aa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Ao(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));aa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return No(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return R(),null;case 10:return fa(t.type),null;case 22:case 23:return Ao(t),Co(),e!==null&&F(Ra),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return fa(wa),null;case 25:return null;default:return null}}function dl(e,t){switch(Ji(t),t.tag){case 3:fa(wa),R();break;case 26:case 27:case 5:Te(t);break;case 4:R();break;case 31:t.memoizedState!==null&&Ao(t);break;case 13:Ao(t);break;case 19:No(t);break;case 10:fa(t.type);break;case 22:case 23:Ao(t),Co(),e!==null&&F(Ra);break;case 24:fa(wa)}}function fl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){df(t,t.return,e)}}function pl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){df(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){df(t,t.return,e)}}function ml(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{vo(t,n)}catch(t){df(e,e.return,t)}}}function hl(e,t,n){n.props=_c(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){df(e,t,n)}}function gl(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=ui(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Mp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new Np(e);f(e.child,!1,Xp,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){df(e,t,n)}}function _l(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){df(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){df(e,t,n)}else n.current=null}}function vl(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)Qp(e.stateNode,t[n])}function yl(e){for(var t=e.return;t!==null&&(Sl(t)&&Qp(e.stateNode,t.stateNode),!xl(t));)t=t.return}function bl(e){for(var t=e.return;t!==null&&(Sl(t)&&$p(e.stateNode,t.stateNode),!xl(t));)t=t.return}function xl(e){return e.tag===5||e.tag===3||e.tag===27}function Sl(e){return e&&e.tag===7&&e.stateNode!==null}function Cl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){df(e,e.return,t)}}function wl(e,t,n){try{var r=e.stateNode;np(r,e.type,n,t),r[yt]=t}catch(t){df(e,e.return,t)}}function Tl(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&bp(e.type)||e.tag===4}function El(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Tl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&bp(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Dl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=hn)),vl(e,r),Ht=!0;else if(i!==4&&(i===27&&(vl(e,r),r=null,bp(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Dl(e,t,n,r),e=e.sibling;e!==null;)Dl(e,t,n,r),e=e.sibling}function Ol(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),vl(e,r),Ht=!0;else if(i!==4&&(i===27&&(vl(e,r),r=null,bp(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Ol(e,t,n,r),e=e.sibling;e!==null;)Ol(e,t,n,r),e=e.sibling}function kl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);ep(t,r,n),t[vt]=e,t[yt]=n}catch(t){df(e,e.return,t)}}var Al=!1,jl=null;function Ml(e){(e.tag===30||e.subtreeFlags&33554432)&&(Al=!0)}var Nl=null;function Pl(){var e=Nl;return Nl=null,e}var Fl=0;function Il(e,t,n,r,i){return Fl=0,Ll(e.child,t,n,r,i)}function Ll(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Ep(o);r.push(s),s.view&&(a=!0)}else a||Ep(o).view&&(a=!0);Al=!0,Cp(o,Fl===0?t:t+`_`+Fl,n),Fl++}else e.tag===22&&e.memoizedState!==null||e.tag===30&&i||Ll(e.child,t,n,r,i)&&(a=!0);e=e.sibling}return a}function Rl(e,t){for(;e!==null;)e.tag===5?wp(e.stateNode,e.memoizedProps):e.tag===22&&e.memoizedState!==null||e.tag===30&&t||Rl(e.child,t),e=e.sibling}function zl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(zl(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=fi(t.default,t.share),t!==`none`&&(Il(e,n,t,null,!1)||Rl(e.child,!1))}e=e.sibling}}function Bl(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=ui(r,n),a=fi(r.default,n.paired?r.share:r.enter);a===`none`?zl(e):Il(e,i,a,null,!1)?(zl(e),n.paired||t||Ad(e,r.onEnter)):Rl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Bl(e,t),e=e.sibling;else zl(e)}function Vl(e){if(jl!==null&&jl.size!==0){var t=jl;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=fi(n.default,n.share);if(a!==`none`&&(Il(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Ad(e,n.onShare)):Rl(e.child,!1)),t.delete(r),t.size===0)break}}}Vl(e)}e=e.sibling}}}function Hl(e){if(e.tag===30){var t=e.memoizedProps,n=ui(t,e.stateNode),r=jl===null?void 0:jl.get(n),i=fi(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Il(e,n,i,null,!1)?r===void 0?Ad(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,jl.delete(n),Ad(e,t.onShare)):Rl(e.child,!1)),jl!==null&&Vl(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Hl(e),e=e.sibling;else jl!==null&&Vl(e)}function Ul(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=ui(t,e.stateNode);t=fi(t.default,t.update),e.flags&=-5,t!==`none`&&Il(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&Ul(e);e=e.sibling}}function Wl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Rl(e.child,!1))}Wl(e)}e=e.sibling}}function Gl(e){if(e.tag===30)e.stateNode.paired=null,Rl(e.child,!1),Wl(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Gl(e),e=e.sibling;else Wl(e)}function Kl(e){for(e=e.child;e!==null;)e.tag===30?Rl(e.child,!1):e.subtreeFlags&33554432&&Kl(e),e=e.sibling}function ql(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&Fl<a.length){var l=a[Fl],u=Ep(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&Cp(c,Fl===0?n:n+`_`+Fl,i),s&&e.flags&4||(Nl===null&&(Nl=[]),Nl.push(c,Fl===0?r:r+`_`+Fl,t.memoizedProps)),Fl++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:ql(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function Jl(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=ui(n,r),a=fi(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(Dp)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;Fl=0,i=ql(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Ad(e,n.onUpdate))}else e.subtreeFlags&33554432&&Jl(e,t);e=e.sibling}}var Yl=!1,Xl=!1,Zl=!1,Ql=!1,$l=typeof WeakSet==`function`?WeakSet:Set,eu=null,tu=!1,nu=!1,ru=!1,iu=!1;function au(e,t,n){if(e=e.containerInfo,ap=mh,e=Br(e),Vr(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(op={focusedElem:e,selectionRange:r},mh=!1,n=(n&335544064)===n,eu=t,t=n?9270:1024;eu!==null;){if(e=eu,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&Hl(r[a]);if(e.alternate===null&&e.flags&2)n&&Ml(e),ou(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&Hl(r),ou(n);continue}if(r!==null&&r.memoizedState!==null){n&&Ml(e),ou(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,eu=r):(n&&Ul(e),ou(n))}}jl=null}function ou(e){for(;eu!==null;){var t=eu,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=_c(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){df(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)em(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:em(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=ui(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=fi(a.default,a.update),a!==`none`&&Il(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,eu=r;break}eu=t.return}}function su(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Du(e,n),r&4&&fl(5,n);break;case 1:if(Du(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){df(n,n.return,e)}else{var i=_c(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){df(n,n.return,e)}}}r&64&&ml(n),r&512&&gl(n,n.return);break;case 3:if(Du(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{vo(e,t)}catch(e){df(n,n.return,e)}}break;case 27:t===null&&r&4&&kl(n);case 26:case 5:Du(e,n),t===null&&r&4&&Cl(n),r&512&&gl(n,n.return);break;case 12:Du(e,n);break;case 31:Du(e,n),r&4&&gu(e,n);break;case 13:Du(e,n),r&4&&_u(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=hf.bind(null,n),om(e,n))));break;case 22:if(r=n.memoizedState!==null||Yl,!r){var a=t!==null&&t.memoizedState!==null||Xl;t=Yl,i=Xl,Yl=r,(Xl=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),ku(e,n,r)):Du(e,n),Yl=t,Xl=i}break;case 30:Du(e,n),r&512&&gl(n,n.return);break;case 7:r&512&&gl(n,n.return);default:Du(e,n)}}function cu(e,t){for(e=e.child;e!==null;)lu(e,t),e=e.sibling}function lu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){df(e,e.return,t)}uu(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,Ht=!0}catch(t){df(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?Sp(s,!0):Sp(e.stateNode,!1)}catch(t){df(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&cu(e,t);break;default:cu(e,t)}}function uu(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:lu(n,r);break a;case 22:n.memoizedState===null&&uu(n,r);break a;default:uu(n,r)}}e=e.sibling}}function du(e){var t=e.alternate;t!==null&&(e.alternate=null,du(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Dt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var fu=null,pu=!1;function mu(e,t,n){for(n=n.child;n!==null;)hu(e,t,n),n=n.sibling}function hu(e,t,n){if(Je&&typeof Je.onCommitFiberUnmount==`function`)try{Je.onCommitFiberUnmount(qe,n)}catch{}switch(n.tag){case 26:Xl||_l(n,t),mu(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!Xl&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Xl||_l(n,t),bl(n);var r=fu,i=pu;bp(n.type)&&(fu=n.stateNode,pu=!1),mu(e,t,n),mm(n.stateNode,n.type,n.memoizedProps),fu=r,pu=i;break;case 5:Xl||_l(n,t),bl(n);case 6:if(n.tag===6&&bl(n),r=fu,i=pu,fu=null,mu(e,t,n),fu=r,pu=i,fu!==null){if(pu)try{(fu.nodeType===9?fu.body:fu.nodeName===`HTML`?fu.ownerDocument.body:fu).removeChild(n.stateNode),Ht=!0}catch(e){df(n,t,e)}else try{fu.removeChild(n.stateNode),Ht=!0}catch(e){df(n,t,e)}}break;case 18:fu!==null&&(pu?(e=fu,xp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Bh(e)):xp(fu,n.stateNode));break;case 4:r=fu,i=pu,fu=n.stateNode.containerInfo,pu=!0,mu(e,t,n),fu=r,pu=i;break;case 0:case 11:case 14:case 15:pl(2,n,t),Xl||pl(4,n,t),mu(e,t,n);break;case 1:Xl||(_l(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&hl(n,t,r)),mu(e,t,n);break;case 21:mu(e,t,n);break;case 22:Xl=(r=Xl)||n.memoizedState!==null,mu(e,t,n),Xl=r;break;case 30:_l(n,t),mu(e,t,n);break;case 7:Xl||_l(n,t),mu(e,t,n);break;default:mu(e,t,n)}}function gu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Bh(e)}catch(e){df(t,t.return,e)}}}function _u(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Bh(e)}catch(e){df(t,t.return,e)}}function vu(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new $l),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new $l),t;default:throw Error(i(435,e.tag))}}function yu(e,t){var n=vu(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=gf.bind(null,e,t);t.then(r,r)}})}function bu(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(bp(l.type)){fu=l.stateNode,pu=!1;break a}break;case 5:fu=l.stateNode,pu=!1;break a;case 3:case 4:fu=l.stateNode.containerInfo,pu=!0;break a}l=l.return}if(fu===null)throw Error(i(160));hu(s,c,o),fu=null,pu=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Su(t,e,n),t=t.sibling}var xu=null;function Su(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}bu(t,e,n),Cu(e),a&4&&(pl(3,e,e.return),fl(3,e),pl(5,e,e.return));break;case 1:bu(t,e,n),Cu(e),a&512&&(Xl||r===null||_l(r,r.return)),a&64&&Yl&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=xu,bu(t,e,n),Cu(e),a&512&&(Xl||r===null||_l(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(Yl)e.stateNode=up(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[Tt]||r[vt]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),ep(r,t,n),r[vt]=e,Mt(r),t=r;break a;case`link`:if(o=Um(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),ep(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Um(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),ep(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[vt]=e,Mt(r),t=r}e.stateNode=t}}else Yl||Wm(o,e.type,e.stateNode)}else e.stateNode=Rm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&wl(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||Xl||t.parentNode.removeChild(t)):a.count--,n===null?Yl||Wm(o,e.type,e.stateNode):Rm(o,n,e.memoizedProps))}break;case 27:bu(t,e,n),Cu(e),a&512&&(Xl||r===null||_l(r,r.return)),r!==null&&a&4&&wl(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=Zl,Zl=!1,bu(t,e,n),Zl=o,Cu(e),a&512&&(Xl||r===null||_l(r,r.return)),e.flags&32){t=e.stateNode;try{sn(t,``),Ht=!0}catch(t){df(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,wl(e,t,r===null?t:r.memoizedProps)),a&1024&&(Ql=!0);break;case 6:if(bu(t,e,n),Cu(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,Ht=!0}catch(t){df(e,e.return,t)}}break;case 3:if(Ht=!1,Hm=null,o=xu,xu=vm(t.containerInfo),bu(t,e,n),xu=o,Cu(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Bh(t.containerInfo)}catch(t){df(e,e.return,t)}Ql&&(Ql=!1,wu(e)),Ht=!1;break;case 4:a=Zl,Zl=Yl,r=Ut(),o=xu,xu=vm(e.stateNode.containerInfo),bu(t,e,n),Cu(e),xu=o,Ht&&nu&&(ru=!0),Ht=r,Zl=a;break;case 12:bu(t,e,n),Cu(e);break;case 31:bu(t,e,n),Cu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,yu(e,t)));break;case 13:bu(t,e,n),Cu(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(dd=Re()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,yu(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=Yl,l=Xl,u=Zl;Yl=c||o,Zl=u||o,Xl=l||s,bu(t,e,n),Xl=l,Zl=u,Yl=c,Cu(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||Yl||Xl||(t=s||Xl,n=Yl,r=Xl,Yl=o||Yl,Xl=t,Ou(e,2),Yl=n,Xl=r),!o&&Zl||cu(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,yu(e,n))));break;case 19:bu(t,e,n),Cu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,yu(e,t)));break;case 30:a&512&&(Xl||r===null||_l(r,r.return)),a=Ut(),o=nu,s=(n&335544064)===n,c=e.memoizedProps,nu=s&&fi(c.default,c.update)!==`none`,bu(t,e,n),Cu(e),s&&r!==null&&Ht&&(e.flags|=4),nu=o,Ht=a;break;case 21:break;case 7:a&512&&(Xl||r===null||_l(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:bu(t,e,n),Cu(e)}}function Cu(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Tl(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(Sl(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(xl(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Ol(e,El(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(sn(l,``),n.flags&=-33),Ol(e,El(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;Dl(e,El(e),u,s);break;default:throw Error(i(161))}}catch(t){df(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function wu(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;wu(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,mh=!0,t.reset(),mh=!1),e=e.sibling}}function Tu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Eu(t,e),t=t.sibling;else Jl(t,!1)}function Eu(e,t){var n=e.alternate;if(n===null)Bl(e,!1);else switch(e.tag){case 3:if(iu=tu=!1,Pl(),Tu(t,e),!tu&&!ru){if(e=Nl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];wp(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),iu=!0}Nl=null;break;case 5:Tu(t,e);break;case 4:r=tu,tu=!1,Tu(t,e),tu&&(ru=!0),tu=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Tu(t,e):Bl(e,!1));break;case 30:r=tu,i=Pl(),tu=!1,Tu(t,e),tu&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=ui(a,o),o=ui(n.memoizedProps,o);var s=fi(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Fl=0,t=ql(e,n,t,o,s,a,!0),Fl!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Ad(e,e.memoizedProps.onUpdate),Nl=i):i!==null&&(i.push.apply(i,Nl),Nl=i),tu=e.flags&32?!0:r;break;default:Tu(t,e)}}function Du(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)su(e,t.alternate,t),t=t.sibling}function Ou(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:pl(4,n,n.return),Ou(n,r);break;case 1:_l(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&hl(n,n.return,i),Ou(n,r);break;case 27:r&2&&mm(n.stateNode,n.type,n.memoizedProps);case 5:_l(n,n.return),n.tag!==5&&n.tag!==27||bl(n),Ou(n,r);break;case 6:bl(n);break;case 26:_l(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||Xl||i.parentNode.removeChild(i),Ou(n,r);break;case 22:n.memoizedState===null&&Ou(n,r);break;case 30:_l(n,n.return),Ou(n,r);break;case 7:_l(n,n.return);default:Ou(n,r)}e=e.sibling}}function ku(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:ku(i,a,n),fl(4,a);break;case 1:if(ku(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){df(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)_o(l[i],c)}catch(e){df(r,r.return,e)}}s&&o&64&&ml(a),gl(a,a.return);break;case 27:n&2&&kl(a);case 5:a.tag!==5&&a.tag!==27||yl(a),ku(i,a,n),s&&r===null&&o&4&&Cl(a),gl(a,a.return);break;case 6:yl(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||Yl||Wm(vm(c.ownerDocument),a.type,c),ku(i,a,n),s&&r===null&&o&4&&Cl(a),gl(a,a.return);break;case 12:ku(i,a,n);break;case 31:ku(i,a,n),s&&o&4&&gu(i,a);break;case 13:ku(i,a,n),s&&o&4&&_u(i,a);break;case 22:a.memoizedState===null&&ku(i,a,n),gl(a,a.return);break;case 30:ku(i,a,n),gl(a,a.return);break;case 7:gl(a,a.return);default:ku(i,a,n)}t=t.sibling}}function Au(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Ea(n))}function ju(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Ea(e))}function Mu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Nu(e,t,n,r),t=t.sibling;else i&&Kl(t)}function Nu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&Gl(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Mu(e,t,n,r),a&2048&&fl(9,t);break;case 1:Mu(e,t,n,r);break;case 3:Mu(e,t,n,r),i&&iu&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&Ea(a)));break;case 12:if(a&2048){Mu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){df(t,t.return,e)}}else Mu(e,t,n,r);break;case 31:Mu(e,t,n,r);break;case 13:Mu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&Gl(t),o._visibility&2?Mu(e,t,n,r):(o._visibility|=2,Pu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&Gl(s),o._visibility&2?Mu(e,t,n,r):Fu(e,t)),a&2048&&Au(s,t);break;case 24:Mu(e,t,n,r),a&2048&&ju(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Rl(a.child,!0),Rl(t.child,!0))),Mu(e,t,n,r);break;default:Mu(e,t,n,r)}}function Pu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Pu(a,o,s,c,i),fl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Pu(a,o,s,c,i)):u._visibility&2?Pu(a,o,s,c,i):Fu(a,o),i&&l&2048&&Au(o.alternate,o);break;case 24:Pu(a,o,s,c,i),i&&l&2048&&ju(o.alternate,o);break;default:Pu(a,o,s,c,i)}t=t.sibling}}function Fu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Fu(n,r),i&2048&&Au(r.alternate,r);break;case 24:Fu(n,r),i&2048&&ju(r.alternate,r);break;default:Fu(n,r)}t=t.sibling}}var Iu=8192;function Lu(e,t,n){if(e.subtreeFlags&Iu)for(e=e.child;e!==null;)Ru(e,t,n),e=e.sibling}function Ru(e,t,n){switch(e.tag){case 26:Lu(e,t,n),e.flags&Iu&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&Ym(n,e)):Xm(n,xu,e.memoizedState,e.memoizedProps));break;case 5:Lu(e,t,n),e.flags&Iu&&(e=e.stateNode,(t&335544128)===t&&Ym(n,e));break;case 3:case 4:var r=xu;xu=vm(e.stateNode.containerInfo),Lu(e,t,n),xu=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Iu,Iu=16777216,Lu(e,t,n),Iu=r):Lu(e,t,n));break;case 30:if((e.flags&Iu)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,jl===null&&(jl=new Map),jl.set(r,i)}Lu(e,t,n);break;default:Lu(e,t,n)}}function zu(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Bu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];eu=r,Uu(r,e)}zu(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Vu(e),e=e.sibling}function Vu(e){switch(e.tag){case 0:case 11:case 15:Bu(e),e.flags&2048&&pl(9,e,e.return);break;case 3:Bu(e);break;case 12:Bu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Hu(e)):Bu(e);break;default:Bu(e)}}function Hu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];eu=r,Uu(r,e)}zu(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:pl(8,t,t.return),Hu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Hu(t));break;default:Hu(t)}e=e.sibling}}function Uu(e,t){for(;eu!==null;){var n=eu;switch(n.tag){case 0:case 11:case 15:pl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Ea(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,eu=r;else a:for(n=e;eu!==null;){r=eu;var i=r.sibling,a=r.return;if(du(r),r===n){eu=null;break a}if(i!==null){i.return=a,eu=i;break a}eu=a}}}var Wu={getCacheForType:function(e){var t=va(wa),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return va(wa).controller.signal}},Gu=typeof WeakMap==`function`?WeakMap:Map,Ku=0,qu=null,Ju=null,Yu=0,Xu=0,Zu=null,Qu=!1,$u=!1,ed=!1,td=0,nd=0,rd=0,id=0,ad=0,od=0,sd=0,cd=null,ld=null,ud=!1,dd=0,fd=0,pd=1/0,md=null,hd=null,gd=0,_d=null,vd=null,yd=0,bd=0,xd=null,Sd=null,Cd=null,wd=null,Td=null,Ed=0,Dd=null;function Od(){return Ku&2&&Yu!==0?Yu&-Yu:N.T===null?ht():Af()}function kd(){if(od===0){if(!(Yu&536870912)||Zi){var e=z;z<<=1,!(z&3932160)&&(z=262144),od=e}else od=536870912}return e=wo.current,e!==null&&(e.flags|=32),od}function Ad(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Mp(ui(e.memoizedProps,n))),wd===null&&(wd=[]),wd.push(t.bind(null,r))}}function jd(e,t,n){(e===qu&&(Xu===2||Xu===9)||e.cancelPendingCommit!==null)&&(Rd(e,0),Fd(e,Yu,od,!1)),ct(e,n),Ku&2&&e===qu||(e===qu&&(!(Ku&2)&&(id|=n),nd===4&&Fd(e,Yu,od,!1)),Sf(e))}function Md(e,t,n){if(Ku&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||rt(e,t),a=r?Kd(e,t):Wd(e,t,!0),o=r;do{if(a===0){$u&&!r&&Fd(e,t,0,!1);break}if(n=e.current.alternate,o&&!Pd(n))a=Wd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=cd;var l=c.current.memoizedState.isDehydrated;if(l&&(Rd(c,s).flags|=256),s=Wd(c,s,!1),s!==2&&s!==6){if(ed&&!l){c.errorRecoveryDisabledLanes|=o,id|=o,a=4;break a}o=ld,ld=a,o!==null&&(ld===null?ld=o:ld.push.apply(ld,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Rd(e,0),Fd(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Fd(r,t,od,!Qu);break a;case 2:ld=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=dd+300-Re(),10<a)){if(Fd(r,t,od,!Qu),nt(r,0,!0)!==0)break a;yd=t,r.timeoutHandle=mp(Nd.bind(null,r,n,ld,md,ud,t,od,id,sd,Qu,o,`Throttled`,-0,0),a);break a}Nd(r,n,ld,md,ud,t,od,id,sd,Qu,o,null,-0,0)}break}}while(1);Sf(e)}function Nd(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:hn},jl=null,Ru(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=eh.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?dd-Re():(a&4194048)===a?fd-Re():0,m=Qm(d,m),m!==null)?(yd=a,e.cancelPendingCommit=m($d.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Fd(e,a,o,!l)):$d(e,t,a,n,r,i,o,s,c,l,u,d)}function Pd(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Pr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Fd(e,t,n,r){t=it(e,t),t&=~ad,t&=~id,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Xe(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&ut(e,n,t)}function Id(){return Ku&6?!0:(Cf(0,!1),!1)}function Ld(){if(Ju!==null){if(Xu===0)var e=Ju.return;else e=Ju,ua=la=null,$o(e),Qa=null,$a=0,e=Ju;for(;e!==null;)dl(e.alternate,e),e=e.return;Ju=null}}function Rd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,hp(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),yd=0,Ld(),qu=e,Ju=n=Di(e.current,null),Yu=t,Xu=0,Zu=null,Qu=!1,$u=rt(e,t),ed=!1,sd=od=ad=id=rd=nd=0,ld=cd=null,ud=!1,td=it(e,t),_i(),n}function zd(e,t){K=null,N.H=lc,t===Ha||t===Wa?(t=Xa(),Xu=3):t===Ua?(t=Xa(),Xu=4):Xu=t===Tc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Zu=t,Ju===null&&(nd=1,yc(e,Fi(t,e.current)))}function Bd(){var e=wo.current;return e===null?!0:(Yu&4194048)===Yu?To===null:(Yu&62914560)===Yu||Yu&536870912?e===To:!1}function Vd(){var e=N.H;return N.H=lc,e===null?lc:e}function Hd(){var e=N.A;return N.A=Wu,e}function Ud(){nd=4,Qu||(Yu&4194048)!==Yu&&wo.current!==null||($u=!0),!(rd&134217727)&&!(id&134217727)||qu===null||Fd(qu,Yu,od,!1)}function Wd(e,t,n){var r=Ku;Ku|=2;var i=Vd(),a=Hd();(qu!==e||Yu!==t)&&(md=null,Rd(e,t)),t=!1;var o=nd;a:do try{if(Xu!==0&&Ju!==null){var s=Ju,c=Zu;switch(Xu){case 8:Ld(),o=6;break a;case 3:case 2:case 9:case 6:wo.current===null&&(t=!0);var l=Xu;if(Xu=0,Zu=null,Xd(e,s,c,l),n&&$u){o=0;break a}break;default:l=Xu,Xu=0,Zu=null,Xd(e,s,c,l)}}Gd(),o=nd;break}catch(t){zd(e,t)}while(1);return t&&e.shellSuspendCounter++,ua=la=null,Ku=r,N.H=i,N.A=a,Ju===null&&(qu=null,Yu=0,_i()),o}function Gd(){for(;Ju!==null;)Jd(Ju)}function Kd(e,t){var n=Ku;Ku|=2;var r=Vd(),a=Hd();qu!==e||Yu!==t?(md=null,pd=Re()+500,Rd(e,t)):$u=rt(e,t);a:do try{if(Xu!==0&&Ju!==null){t=Ju;var o=Zu;b:switch(Xu){case 1:Xu=0,Zu=null,Xd(e,t,o,1);break;case 2:case 9:if(Ka(o)){Xu=0,Zu=null,Yd(t);break}t=function(){Xu!==2&&Xu!==9||qu!==e||(Xu=7),Sf(e)},o.then(t,t);break a;case 3:Xu=7;break a;case 4:Xu=5;break a;case 7:Ka(o)?(Xu=0,Zu=null,Yd(t)):(Xu=0,Zu=null,Xd(e,t,o,7));break;case 5:var s=null;switch(Ju.tag){case 26:s=Ju.memoizedState;case 5:case 27:var c=Ju;if(s?qm(s):c.stateNode.complete){Xu=0,Zu=null;var l=c.sibling;if(l!==null)Ju=l;else{var u=c.return;u===null?Ju=null:(Ju=u,Zd(u))}break b}}Xu=0,Zu=null,Xd(e,t,o,5);break;case 6:Xu=0,Zu=null,Xd(e,t,o,6);break;case 8:Ld(),nd=6;break a;default:throw Error(i(462))}}qd();break}catch(t){zd(e,t)}while(1);return ua=la=null,N.H=r,N.A=a,Ku=n,Ju===null?(qu=null,Yu=0,_i(),nd):0}function qd(){for(;Ju!==null&&!Ie();)Jd(Ju)}function Jd(e){var t=nl(e.alternate,e,td);e.memoizedProps=e.pendingProps,t===null?Zd(e):Ju=t}function Yd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Ic(n,t,t.pendingProps,t.type,void 0,Yu);break;case 11:t=Ic(n,t,t.pendingProps,t.type.render,t.ref,Yu);break;case 5:$o(t);var r=t;r===Yi&&(Zi?(ra(r),r.tag===5&&r.stateNode!=null&&(Xi=r.stateNode)):(ra(r),Zi=!0));default:dl(n,t),t=Ju=Oi(t,td),t=nl(n,t,td)}e.memoizedProps=e.pendingProps,t===null?Zd(e):Ju=t}function Xd(e,t,n,r){ua=la=null,$o(t),Qa=null,$a=0;var i=t.return;try{if(wc(e,i,t,n,Yu)){nd=1,yc(e,Fi(n,e.current)),Ju=null;return}}catch(t){if(i!==null)throw Ju=i,t;nd=1,yc(e,Fi(n,e.current)),Ju=null;return}t.flags&32768?(Zi||r===1?e=!0:$u||Yu&536870912?e=!1:(Qu=e=!0,(r===2||r===9||r===3||r===6)&&(r=wo.current,r!==null&&r.tag===13&&(r.flags|=16384))),Qd(t,e)):Zd(t)}function Zd(e){var t=e;do{if(t.flags&32768){Qd(t,Qu);return}e=t.return;var n=ll(t.alternate,t,td);if(n!==null){Ju=n;return}if(t=t.sibling,t!==null){Ju=t;return}Ju=t=e}while(t!==null);nd===0&&(nd=5)}function Qd(e,t){do{var n=ul(e.alternate,e);if(n!==null){n.flags&=32767,Ju=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Ju=e;return}Ju=e=n}while(e!==null);nd=6,Ju=null}function $d(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do cf();while(gd!==0);if(Ku&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===qu&&(Ju=qu=null,Yu=0),vd=t,_d=e,yd=n,xd=a,Sd=r,ef(e,t,n,s,c,l,f)}}function ef(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(bd=s,s|=gi,lt(e,n,s,r,i,a),wd=null,(n&335544064)===n?(Td=ka(e),r=10262):(Td=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,_f(He,function(){return lf(),null})):(e.callbackNode=null,e.callbackPriority=0),Al=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=N.T,N.T=null,i=P.p,P.p=2,a=Ku,Ku|=4;try{au(e,t,n)}finally{Ku=a,P.p=i,N.T=r}}gd=1,Al?Cd=Ap(o,e.containerInfo,Td,rf,af,nf,of,lf,tf,null,null):(rf(),af(),of())}function tf(e){if(gd!==0){var t=_d.onRecoverableError;t(e,{componentStack:null})}}function nf(){gd===3&&(gd=0,Eu(vd,_d),gd=4)}function rf(){if(gd===1){gd=0;var e=_d,t=vd,n=yd,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=N.T,N.T=null;var i=P.p;P.p=2;var a=Ku;Ku|=4;try{nu=ru=!1,Su(t,e,n),n=op;var o=Br(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&zr(s.ownerDocument.documentElement,s)){if(c!==null&&Vr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Rr(s,h),v=Rr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}mh=!!ap,op=ap=null}finally{Ku=a,P.p=i,N.T=r}}e.current=t,gd=2}}function af(){if(gd===2){gd=0;var e=_d,t=vd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=N.T,N.T=null;var r=P.p;P.p=2;var i=Ku;Ku|=4;try{su(e,t.alternate,t)}finally{Ku=i,P.p=r,N.T=n}}gd=3}}function of(){if(gd===4||gd===3){gd=0;var e=Cd;Cd=null,Le();var t=_d,n=vd,r=yd,i=Sd,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?gd=5:(gd=0,vd=_d=null,sf(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(hd=null),mt(r),n=n.stateNode,Je&&typeof Je.onCommitFiberRoot==`function`)try{Je.onCommitFiberRoot(qe,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=N.T,a=P.p,P.p=2,N.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{N.T=n,P.p=a}}if(i=wd,o=Td,Td=null,i!==null&&(wd=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);yd&3&&cf(),Sf(t),a=t.pendingLanes,r&261930&&a&42?t===Dd?Ed++:(Ed=0,Dd=t):(Ed=0,Dd=null),Cf(0,!1)}}function sf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Ea(t)))}function cf(){return Cd!==null&&(Cd.skipTransition(),Cd=null),rf(),af(),of(),lf()}function lf(){if(gd!==5)return!1;var e=_d,t=bd;bd=0;var n=mt(yd),r=N.T,a=P.p;try{P.p=32>n?32:n,N.T=null,n=xd,xd=null;var o=_d,s=yd;if(gd=0,vd=_d=null,yd=0,Ku&6)throw Error(i(331));var c=Ku;if(Ku|=4,Vu(o.current),Nu(o,o.current,s,n),Ku=c,Cf(0,!1),Je&&typeof Je.onPostCommitFiberRoot==`function`)try{Je.onPostCommitFiberRoot(qe,o)}catch{}return!0}finally{P.p=a,N.T=r,sf(e,t)}}function uf(e,t,n){t=Fi(n,t),t=xc(e.stateNode,t,2),e=uo(e,t,2),e!==null&&(ct(e,2),Sf(e))}function df(e,t,n){if(e.tag===3)uf(e,e,n);else for(;t!==null;){if(t.tag===3){uf(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(hd===null||!hd.has(r))){e=Fi(n,e),n=Sc(2),r=uo(t,n,2),r!==null&&(Cc(n,r,t,e),ct(r,2),Sf(r));break}}t=t.return}}function ff(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Gu;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(ed=!0,i.add(n),e=pf.bind(null,e,t,n),t.then(e,e))}function pf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,qu===e&&(Yu&n)===n&&(nd===4||nd===3&&(Yu&62914560)===Yu&&300>Re()-dd?Ku&2?ad|=n:Rd(e,0):ad|=n,sd===Yu&&(sd=0)),Sf(e)}function mf(e,t){t===0&&(t=ot()),e=bi(e,t),e!==null&&(ct(e,t),Sf(e))}function hf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),mf(e,n)}function gf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),mf(e,n)}function _f(e,t){return Pe(e,t)}var vf=null,yf=null,bf=!1,xf=!1,Q=!1,$=0;function Sf(e){e!==yf&&e.next===null&&(yf===null?vf=yf=e:yf=yf.next=e),xf=!0,bf||(bf=!0,kf())}function Cf(e,t){if(!Q&&xf){Q=!0;do for(var n=!1,r=vf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Xe(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Of(r,a))}else a=Yu,a=nt(r,r===qu?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||rt(r,a)||(n=!0,Of(r,a))}r=r.next}while(n);Q=!1}}function wf(){Tf()}function Tf(){xf=bf=!1;var e=0;$!==0&&pp()&&(e=$);for(var t=Re(),n=null,r=vf;r!==null;){var i=r.next,a=Ef(r,t);a===0?(r.next=null,n===null?vf=i:n.next=i,i===null&&(yf=n)):(n=r,(e!==0||a&3)&&(xf=!0)),r=i}gd!==0&&gd!==5||Cf(e,!1),$!==0&&($=0)}function Ef(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Xe(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=at(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=qu,n=Yu,n=nt(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Xu===2||Xu===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Fe(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||rt(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Fe(r),mt(n)){case 2:case 8:n=Ve;break;case 32:n=He;break;case 268435456:n=We;break;default:n=He}return r=Df.bind(null,e),n=Pe(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Fe(r),e.callbackPriority=2,e.callbackNode=null,2}function Df(e,t){if(gd!==0&&gd!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(cf()&&e.callbackNode!==n)return null;var r=Yu;return r=nt(e,e===qu?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Md(e,r,t),Ef(e,Re()),e.callbackNode!=null&&e.callbackNode===n?Df.bind(null,e):null)}function Of(e,t){if(cf())return null;Md(e,t,!0)}function kf(){vp(function(){Ku&6?Pe(Be,wf):Tf()})}function Af(){if($===0){var e=Ma;e===0&&(e=et,et<<=1,!(et&261888)&&(et=256)),$=e}return $}function jf(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:mn(e)}function Mf(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=jf((i[yt]||null).action),o=r.submitter;o&&(t=(t=o[yt]||null)?jf(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new In(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if($!==0){var e=new FormData(i,o);Ys(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),Ys(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Nf=0;Nf<si.length;Nf++){var Pf=si[Nf];ci(Pf.toLowerCase(),`on`+(Pf[0].toUpperCase()+Pf.slice(1)))}ci($r,`onAnimationEnd`),ci(ei,`onAnimationIteration`),ci(ti,`onAnimationStart`),ci(`dblclick`,`onDoubleClick`),ci(`focusin`,`onFocus`),ci(`focusout`,`onBlur`),ci(ni,`onTransitionRun`),ci(ri,`onTransitionStart`),ci(ii,`onTransitionCancel`),ci(ai,`onTransitionEnd`),Lt(`onMouseEnter`,[`mouseout`,`mouseover`]),Lt(`onMouseLeave`,[`mouseout`,`mouseover`]),Lt(`onPointerEnter`,[`pointerout`,`pointerover`]),Lt(`onPointerLeave`,[`pointerout`,`pointerover`]),It(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),It(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),It(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),It(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),It(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),It(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var Ff=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),If=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(Ff));function Lf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){pi(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){pi(e)}i.currentTarget=null,a=c}}}}function Rf(e,t){var n=t[xt];n===void 0&&(n=t[xt]=new Set);var r=e+`__bubble`;n.has(r)||(Hf(t,e,2,!1),n.add(r))}function zf(e,t,n){var r=0;t&&(r|=4),Hf(n,e,r,t)}var Bf=`_reactListening`+Math.random().toString(36).slice(2);function Vf(e){if(!e[Bf]){e[Bf]=!0,Pt.forEach(function(t){t!==`selectionchange`&&(If.has(t)||zf(t,!1,e),zf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Bf]||(t[Bf]=!0,zf(`selectionchange`,!1,t))}}function Hf(e,t,n,r){switch(xh(t)){case 2:var i=hh;break;case 8:i=gh;break;default:i=_h}n=i.bind(null,t,n,e),i=void 0,!Tn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Uf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=Ot(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}Sn(function(){var r=a,i=_n(n),s=[];a:{var c=oi.get(e);if(c!==void 0){var l=In,u=e;switch(e){case`keypress`:if(jn(n)===0)break a;case`keydown`:case`keyup`:l=H;break;case`focusin`:u=`focus`,l=Gn;break;case`focusout`:u=`blur`,l=Gn;break;case`beforeblur`:case`afterblur`:l=Gn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Un;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Wn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=tr;break;case $r:case ei:case ti:l=Kn;break;case ai:l=nr;break;case`scroll`:case`scrollend`:l=Rn;break;case`wheel`:l=rr;break;case`copy`:case`cut`:case`paste`:l=qn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=$n;break;case`submit`:l=er;break;case`toggle`:case`beforetoggle`:l=ir}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=Cn(m,p),g!=null&&d.push(Wf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==gn&&(u=n.relatedTarget||n.fromElement)&&(Ot(u)||u[bt]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?Ot(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=Un,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=$n,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:At(c),h=l==null?u:At(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,Ot(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?C(c,l,Kf):null,c!==null&&qf(s,u,c,d,!1),l!==null&&f!==null&&qf(s,f,l,d,!0)))}a:{if(c=r?At(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=Cr;else if(_r(c)){if(wr)_=Mr;else{_=Ar;var v=kr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&dn(r.elementType)&&(_=Cr):_=jr;if(_&&=_(e,r)){vr(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?At(r):window,e){case`focusin`:(_r(v)||v.contentEditable===`true`)&&(Ur=v,Wr=r,Gr=null);break;case`focusout`:Gr=Wr=Ur=null;break;case`mousedown`:Kr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Kr=!1,qr(s,n,i);break;case`selectionchange`:if(Hr)break;case`keydown`:case`keyup`:qr(s,n,i)}var y;if(U)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else pr?dr(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(cr&&n.locale!==`ko`&&(pr||b!==`onCompositionStart`?b===`onCompositionEnd`&&pr&&(y=An()):(Dn=i,On=`value`in Dn?Dn.value:Dn.textContent,pr=!0)),v=Gf(r,b),0<v.length&&(b=new Jn(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=fr(n),y!==null&&(b.data=y)))),(y=sr?mr(e,n):hr(e,n))&&(b=Gf(r,`onBeforeInput`),0<b.length&&(v=new Jn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),Mf(s,e,r,n,i)}Lf(s,t)})}function Wf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Gf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=Cn(e,n),i!=null&&r.unshift(Wf(e,i,a)),i=Cn(e,t),i!=null&&r.push(Wf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Kf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function qf(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=Cn(n,a),l!=null&&o.unshift(Wf(n,l,c))):i||(l=Cn(n,a),l!=null&&o.push(Wf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Jf=/\r\n?/g,Yf=/\u0000|\uFFFD/g;function Xf(e){return(typeof e==`string`?e:``+e).replace(Jf,`
`).replace(Yf,``)}function Zf(e,t){return t=Xf(t),Xf(e)===t}function Qf(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||sn(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&sn(e,``+r);else return;break;case`className`:Gt(e,`class`,r);break;case`tabIndex`:Gt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Gt(e,n,r);break;case`style`:un(e,r,o);return;case`data`:if(t!==`object`){Gt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=mn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&Qf(e,t,`name`,a.name,a,null),Qf(e,t,`formEncType`,a.formEncType,a,null),Qf(e,t,`formMethod`,a.formMethod,a,null),Qf(e,t,`formTarget`,a.formTarget,a,null)):(Qf(e,t,`encType`,a.encType,a,null),Qf(e,t,`method`,a.method,a,null),Qf(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=mn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=hn);return;case`onScroll`:r!=null&&Rf(`scroll`,e);return;case`onScrollEnd`:r!=null&&Rf(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=mn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Rf(`beforetoggle`,e),Rf(`toggle`,e),Wt(e,`popover`,r);break;case`xlinkActuate`:Kt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Kt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Kt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Kt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Kt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Kt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Kt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Kt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Kt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Wt(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=fn.get(n)||n,Wt(e,n,r);else return}Ht=!0}function $f(e,t,n,r,a,o){switch(n){case`style`:un(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)sn(e,r);else if(typeof r==`number`||typeof r==`bigint`)sn(e,``+r);else return;break;case`onScroll`:r!=null&&Rf(`scroll`,e);return;case`onScrollEnd`:r!=null&&Rf(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=hn);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!Ft.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[yt]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}Ht=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):Wt(e,n,r)}return}Ht=!0}function ep(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Rf(`error`,e),Rf(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Qf(e,t,o,s,n,null)}}a&&Qf(e,t,`srcSet`,n.srcSet,n,null),r&&Qf(e,t,`src`,n.src,n,null);return;case`input`:Rf(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:Qf(e,t,r,d,n,null)}}tn(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Rf(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:Qf(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&rn(e,!!r,n,!0):rn(e,!!r,t,!1);return;case`textarea`:for(s in Rf(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:Qf(e,t,s,c,n,null)}on(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:Qf(e,t,l,r,n,null)}return;case`dialog`:Rf(`beforetoggle`,e),Rf(`toggle`,e),Rf(`cancel`,e),Rf(`close`,e);break;case`iframe`:case`object`:Rf(`load`,e);break;case`video`:case`audio`:for(r=0;r<Ff.length;r++)Rf(Ff[r],e);break;case`image`:Rf(`error`,e),Rf(`load`,e);break;case`details`:Rf(`toggle`,e);break;case`embed`:case`source`:case`link`:Rf(`error`,e),Rf(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Qf(e,t,u,r,n,null)}return;default:if(dn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&$f(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&Qf(e,t,c,r,n,null))}var tp={};function np(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||Qf(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(Ht=!0),o=m;break;case`name`:m!==f&&(Ht=!0),a=m;break;case`checked`:m!==f&&(Ht=!0),u=m;break;case`defaultChecked`:m!==f&&(Ht=!0),d=m;break;case`value`:m!==f&&(Ht=!0),s=m;break;case`defaultValue`:m!==f&&(Ht=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&Qf(e,t,p,m,r,f)}}en(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||Qf(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(Ht=!0),p=o;break;case`defaultValue`:o!==l&&(Ht=!0),c=o;break;case`multiple`:o!==l&&(Ht=!0),s=o;default:o!==l&&Qf(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?rn(e,!!n,n?[]:``,!1):rn(e,!!n,t,!0)):rn(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:Qf(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(Ht=!0),p=a;break;case`defaultValue`:a!==o&&(Ht=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&Qf(e,t,s,a,r,o)}an(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:Qf(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(Ht=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:Qf(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&Qf(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:Qf(e,t,u,p,r,m)}return;default:if(dn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&$f(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||$f(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&Qf(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||Qf(e,t,f,p,r,m)}function rp(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function ip(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&rp(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&rp(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var ap=null,op=null;function sp(e){return e.nodeType===9?e:e.ownerDocument}function cp(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function lp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function up(e,t,n,r){return n=sp(n).createElement(e),n[vt]=r,n[yt]=t,ep(n,e,t),Mt(n),n}function dp(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var fp=null;function pp(){var e=window.event;return e&&e.type===`popstate`?e!==fp&&(fp=e,!0):(fp=null,!1)}var mp=typeof setTimeout==`function`?setTimeout:void 0,hp=typeof clearTimeout==`function`?clearTimeout:void 0,gp=typeof Promise==`function`?Promise:void 0,_p=typeof requestAnimationFrame==`function`?requestAnimationFrame:mp,vp=typeof queueMicrotask==`function`?queueMicrotask:gp===void 0?mp:function(e){return gp.resolve(null).then(e).catch(yp)};function yp(e){setTimeout(function(){throw e})}function bp(e){return e===`head`}function xp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Bh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)hm(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,hm(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Tt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&hm(e.ownerDocument.body)}n=i}while(n);Bh(t)}function Sp(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function Cp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function wp(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function Tp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Ep(e){return Tp(e.getBoundingClientRect(),getComputedStyle(e),e)}function Dp(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return Tp(t,n,e)}function Op(e){return e.documentElement.clientHeight}function kp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Ap(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Op(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Jm(f),u>Zm){s.length=o;break}f=new Promise(kp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function jp(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}jp.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:w({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},jp.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},jp.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Mp(e){return{name:e,group:new jp(`group`,e),imagePair:new jp(`image-pair`,e),old:new jp(`old`,e),new:new jp(`new`,e)}}function Np(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Np.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Rp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Ip(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),f(this._fragmentFiber.child,!1,Pp,e,s,r)}this._eventListeners=a}};function Pp(e,t,n,r){return _(e).addEventListener(t,n,r),!1}Np.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Rp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Ip(i.optionsOrUseCapture),f(this._fragmentFiber.child,!1,Fp,e,n,i),r.splice(t,1),a!==null&&a()}};function Fp(e,t,n,r){return _(e).removeEventListener(t,n,r),!1}function Ip(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function Lp(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Rp(e,t,n,r){if(e.length===0)return-1;r=Lp(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&Lp(a.optionsOrUseCapture)===r)return i}return-1}Np.prototype.dispatchEvent=function(e){var t=p(this._fragmentFiber);if(t===null)return!0;t=_(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Ip(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Ip(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},Np.prototype.focus=function(e){f(this._fragmentFiber.child,!0,zp,e,void 0,void 0)};function zp(e,t){return e.tag!==6&&(e=_(e),dm(e,t))}Np.prototype.focusLast=function(e){var t=[];f(this._fragmentFiber.child,!0,Bp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!zp(t[n],e);n--);};function Bp(e,t){return t.push(e),!1}Np.prototype.blur=function(){var e=p(this._fragmentFiber);e!==null&&(e=_(e),e=sp(e).activeElement,e!==null&&f(this._fragmentFiber.child,!1,Vp,e,void 0,void 0))};function Vp(e,t){return e.tag!==6&&(e=_(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Np.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),f(this._fragmentFiber.child,!1,Hp,e,void 0,void 0)};function Hp(e,t){return e.tag===6||(e=_(e),t.observe(e)),!1}Np.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),f(this._fragmentFiber.child,!1,Up,e,void 0,void 0);for(var n=t=0;n<Wp.length;n++){var r=Wp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Wp[t++]=r}Wp.length=t}};function Up(e,t){return e.tag===6||(e=_(e),t.unobserve(e)),!1}var Wp=[],Gp=!1;function Kp(e,t,n){Wp.push({fragmentInstance:e,observer:t,instance:n}),Gp||(Gp=!0,fm(function(){Gp=!1;var e=Wp;Wp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}Np.prototype.getClientRects=function(){var e=[];return f(this._fragmentFiber.child,!1,qp,e,void 0,void 0),e};function qp(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=_(e),t.push.apply(t,e.getClientRects());return!1}Np.prototype.getRootNode=function(e){var t=p(this._fragmentFiber);return t===null?this:_(t).getRootNode(e)},Np.prototype.compareDocumentPosition=function(e){var t=p(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];f(this._fragmentFiber.child,!1,Bp,n,void 0,void 0);var r=_(t);if(n.length===0){if(n=r,m(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=h(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=_(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=_(n[0]),i=_(n[n.length-1]);var a=m(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||Jp(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function Jp(e,t,n,r,i){var a=Ot(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=p(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=C(n,a,S),t===null?t=!1:(f(t,!0,b,a,n),a=v,v=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=C(r,a,S),t===null?t=!1:(f(t,!0,x,a,r),a=v,y=v=null,t=a!==null)),t):!1}function Yp(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Np.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];f(this._fragmentFiber.child,!1,Bp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=h(this._fragmentFiber);if(r=n?r[1]||r[0]||p(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=_(r),Yp(e,n);return}if(r=_(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=_(a),Yp(a,n)):_(a).scrollIntoView(e),r+=n?-1:1}};function Xp(e,t){return e=_(e),Zp(e,t),!1}function Zp(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function Qp(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Ip(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Wp.length;i++){var a=Wp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Wp[r++]=a)}Wp.length=r,n.observe(e)}),Zp(e,t))}function $p(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Ip(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Kp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function em(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:em(n),Dt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[Tt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=sm(e.nextSibling),e===null)break}return null}function nm(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=sm(e.nextSibling),e===null))return null;return e}function rm(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=sm(e.nextSibling),e===null))return null;return e}function im(e){return e.data===`$?`||e.data===`$~`}function am(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function om(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function sm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var cm=null;function lm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return sm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function um(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function dm(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function fm(e){_p(function(){_p(function(t){return e(t)})})}function pm(e,t,n){switch(t=sp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function mm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&Qf(e,t,r,null,tp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===hn&&(e.onclick=null),Dt(e)}function hm(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Dt(e)}var gm=new Map,_m=new Set;function vm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var ym=P.d;P.d={f:bm,r:xm,D:wm,C:Tm,L:Em,m:Dm,X:km,S:Om,M:Am};function bm(){var e=ym.f(),t=Id();return e||t}function xm(e){var t=kt(e);t!==null&&t.tag===5&&t.type===`form`?Zs(t):ym.r(e)}var Sm=typeof document>`u`?null:document;function Cm(e,t,n){var r=Sm;if(r&&typeof t==`string`&&t){var i=$t(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),_m.has(i)||(_m.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),ep(t,`link`,e),Mt(t),r.head.appendChild(t)))}}function wm(e){ym.D(e),Cm(`dns-prefetch`,e,null)}function Tm(e,t){ym.C(e,t),Cm(`preconnect`,e,t)}function Em(e,t,n){ym.L(e,t,n);var r=Sm;if(r&&e&&t){var i=`link[rel="preload"][as="`+$t(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+$t(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+$t(n.imageSizes)+`"]`)):i+=`[href="`+$t(e)+`"]`;var a=i;switch(t){case`style`:a=Mm(e);break;case`script`:a=Im(e)}if(!(gm.has(a)||(e=w({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),gm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Nm(a))||t===`script`&&r.querySelector(Lm(a))))){var o=r.createElement(`link`);ep(o,`link`,e),t===`style`&&(o[Et]=!0,o.onload=o.onerror=function(){Nt(o)}),Mt(o),r.head.appendChild(o)}}}function Dm(e,t){ym.m(e,t);var n=Sm;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+$t(r)+`"][href="`+$t(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Im(e)}if(!gm.has(a)&&(e=w({rel:`modulepreload`,href:e},t),gm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Lm(a)))return}r=n.createElement(`link`),ep(r,`link`,e),Mt(r),n.head.appendChild(r)}}}function Om(e,t,n){ym.S(e,t,n);var r=Sm;if(r&&e){var i=jt(r).hoistableStyles,a=Mm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Nm(a)))s.loading=5;else{e=w({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=gm.get(a))&&Bm(e,n);var c=o=r.createElement(`link`);Mt(c),ep(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,zm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function km(e,t){ym.X(e,t);var n=Sm;if(n&&e){var r=jt(n).hoistableScripts,i=Im(e),a=r.get(i);a||(a=n.querySelector(Lm(i)),a||(e=w({src:e,async:!0},t),(t=gm.get(i))&&Vm(e,t),a=n.createElement(`script`),Mt(a),ep(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Am(e,t){ym.M(e,t);var n=Sm;if(n&&e){var r=jt(n).hoistableScripts,i=Im(e),a=r.get(i);a||(a=n.querySelector(Lm(i)),a||(e=w({src:e,async:!0,type:`module`},t),(t=gm.get(i))&&Vm(e,t),a=n.createElement(`script`),Mt(a),ep(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function jm(e,t,n,r){var a=(a=I.current)?vm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Mm(n.href),t=jt(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Mm(n.href);var o=jt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Nm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=gm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},gm.set(e,o)),Fm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Im(n),t=jt(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Mm(e){return`href="`+$t(e)+`"`}function Nm(e){return`link[rel="stylesheet"][`+e+`]`}function Pm(e){return w({},e,{"data-precedence":e.precedence,precedence:null})}function Fm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[Et]){r.loading=1;return}}else t=e.createElement(`link`),t[Et]=!0,t.onload=t.onerror=Nt.bind(null,t),ep(t,`link`,n),Mt(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Im(e){return`[src="`+$t(e)+`"]`}function Lm(e){return`script[async]`+e}function Rm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+$t(n.href)+`"]`);if(r)return t.instance=r,Mt(r),r;var a=w({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Mt(r),ep(r,`style`,a),zm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Mm(n.href);var o=e.querySelector(Nm(a));if(o)return t.state.loading|=4,t.instance=o,Mt(o),o;r=Pm(n),(a=gm.get(a))&&Bm(r,a),o=(e.ownerDocument||e).createElement(`link`),Mt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),ep(o,`link`,r),t.state.loading|=4,zm(o,n.precedence,e),t.instance=o;case`script`:return o=Im(n.src),(a=e.querySelector(Lm(o)))?(t.instance=a,Mt(a),a):(r=n,(a=gm.get(o))&&(r=w({},n),Vm(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Mt(a),ep(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,zm(r,n.precedence,e));return t.instance}function zm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Bm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Vm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Hm=null;function Um(e,t,n){if(Hm===null){var r=new Map,i=Hm=new Map;i.set(n,r)}else i=Hm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Tt]||a[vt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Wm(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Gm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Km(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function qm(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Jm(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function Ym(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Jm(t),e.suspenseyImages.push(t)),e=th.bind(e),t.decode().then(e,e))}function Xm(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Mm(r.href),a=t.querySelector(Nm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=eh.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Mt(a);return}a=t.ownerDocument||t,r=Pm(r),(i=gm.get(i))&&Bm(r,i),a=a.createElement(`link`),Mt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),ep(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=eh.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Zm=0;function Qm(e,t){return e.stylesheets&&e.count===0&&rh(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&rh(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Zm===0&&(Zm=62500*ip());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&rh(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Zm?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function $m(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)rh(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function eh(){this.count--,$m(this)}function th(){this.imgCount--,$m(this)}var nh=null;function rh(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,nh=new Map,t.forEach(ih,e),nh=null,eh.call(e))}function ih(e,t){if(!(t.state.loading&4)){var n=nh.get(e);if(n)var r=n.get(null);else{n=new Map,nh.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=eh.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var ah={$$typeof:te,Provider:null,Consumer:null,_currentValue:ge,_currentValue2:ge,_threadCount:0};function oh(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=st(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=st(0),this.hiddenUpdates=st(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function sh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new oh(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=Ti(3,null,null,t),e.current=a,a.stateNode=e,t=Ta(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},so(a),e}function ch(e){return e?(e=Ci,e):Ci}function lh(e,t,n,r,i,a){i=ch(i),r.context===null?r.context=i:r.pendingContext=i,r=lo(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=uo(e,r,t),n!==null&&(jd(n,e,t),fo(n,e,t))}function uh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function dh(e,t){uh(e,t),(e=e.alternate)&&uh(e,t)}function fh(e){if(e.tag===13||e.tag===31){var t=bi(e,67108864);t!==null&&jd(t,e,67108864),dh(e,67108864)}}function ph(e){if(e.tag===13||e.tag===31){var t=Od();t=pt(t);var n=bi(e,t);n!==null&&jd(n,e,t),dh(e,t)}}var mh=!0;function hh(e,t,n,r){var i=N.T;N.T=null;var a=P.p;try{P.p=2,_h(e,t,n,r)}finally{P.p=a,N.T=i}}function gh(e,t,n,r){var i=N.T;N.T=null;var a=P.p;try{P.p=8,_h(e,t,n,r)}finally{P.p=a,N.T=i}}function _h(e,t,n,r){if(mh){var i=vh(r);if(i===null)Uf(e,t,r,yh,n),Ah(e,r);else if(Mh(i,e,t,n,r))r.stopPropagation();else if(Ah(e,r),t&4&&-1<kh.indexOf(e)){for(;i!==null;){var a=kt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=tt(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Xe(o);s.entanglements[1]|=c,o&=~c}Sf(a),!(Ku&6)&&(pd=Re()+500,Cf(0,!1))}}break;case 31:case 13:s=bi(a,2),s!==null&&jd(s,a,2),Id(),dh(a,2)}if(a=vh(r),a===null&&Uf(e,t,r,yh,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Uf(e,t,r,null,n)}}function vh(e){return e=_n(e),bh(e)}var yh=null;function bh(e){if(yh=null,e=Ot(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return yh=e,null}function xh(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(ze()){case Be:return 2;case Ve:return 8;case He:case Ue:return 32;case We:return 268435456;default:return 32}default:return 32}}var Sh=!1,Ch=null,wh=null,Th=null,Eh=new Map,Dh=new Map,Oh=[],kh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Ah(e,t){switch(e){case`focusin`:case`focusout`:Ch=null;break;case`dragenter`:case`dragleave`:wh=null;break;case`mouseover`:case`mouseout`:Th=null;break;case`pointerover`:case`pointerout`:Eh.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:Dh.delete(t.pointerId)}}function jh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=kt(t),t!==null&&fh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Mh(e,t,n,r,i){switch(t){case`focusin`:return Ch=jh(Ch,e,t,n,r,i),!0;case`dragenter`:return wh=jh(wh,e,t,n,r,i),!0;case`mouseover`:return Th=jh(Th,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Eh.set(a,jh(Eh.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,Dh.set(a,jh(Dh.get(a)||null,e,t,n,r,i)),!0}return!1}function Nh(e){var t=Ot(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,gt(e.priority,function(){ph(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,gt(e.priority,function(){ph(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ph(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=vh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);gn=r,n.target.dispatchEvent(r),gn=null}else return t=kt(n),t!==null&&fh(t),e.blockedOn=n,!1;t.shift()}return!0}function Fh(e,t,n){Ph(e)&&n.delete(t)}function Ih(){Sh=!1,Ch!==null&&Ph(Ch)&&(Ch=null),wh!==null&&Ph(wh)&&(wh=null),Th!==null&&Ph(Th)&&(Th=null),Eh.forEach(Fh),Dh.forEach(Fh)}function Lh(e,n){e.blockedOn===n&&(e.blockedOn=null,Sh||(Sh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Ih)))}var Rh=null;function zh(e){Rh!==e&&(Rh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Rh===e&&(Rh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(bh(r||n)===null)continue;break}var a=kt(n);a!==null&&(e.splice(t,3),t-=3,Ys(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Bh(e){function t(t){return Lh(t,e)}Ch!==null&&Lh(Ch,e),wh!==null&&Lh(wh,e),Th!==null&&Lh(Th,e),Eh.forEach(t),Dh.forEach(t);for(var n=0;n<Oh.length;n++){var r=Oh[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Oh.length&&(n=Oh[0],n.blockedOn===null);)Nh(n),n.blockedOn===null&&Oh.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[yt]||null;if(typeof a==`function`)o||zh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[yt]||null)s=o.formAction;else if(bh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),zh(n)}}}function Vh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Hh(e){this._internalRoot=e}Uh.prototype.render=Hh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;lh(n,Od(),e,t,null,null)},Uh.prototype.unmount=Hh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;lh(e.current,2,null,e,null,null),Id(),t[bt]=null}};function Uh(e){this._internalRoot=e}Uh.prototype.unstable_scheduleHydration=function(e){if(e){var t=ht();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Oh.length&&t!==0&&t<Oh[n].priority;n++);Oh.splice(n,0,e),n===0&&Nh(e)}};var Wh=n.version;if(Wh!==`19.3.1`)throw Error(i(527,Wh,`19.3.1`));P.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:d(e),e=e===null?null:e.stateNode,e};var Gh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:N,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Kh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Kh.isDisabled&&Kh.supportsFiber)try{qe=Kh.inject(Gh),Je=Kh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=vc,s=q,c=J;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=sh(e,1,!1,null,null,n,r,null,o,s,c,Vh),e[bt]=t.current,Vf(e),new Hh(t)}})),vy=D(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=_y()}))(),yy=class{constructor(e){this.version=fy,e.ipd=0,ro.getState().setInputMode(e.primaryInputMode),this.devUIContainer=document.createElement(`div`),this.devUIContainer.style.position=`fixed`,this.devUIContainer.style.width=`100vw`,this.devUIContainer.style.height=`100vh`,this.devUIContainer.style.top=`50vh`,this.devUIContainer.style.left=`50vw`,this.devUIContainer.style.transform=`translate(-50%, -50%)`,this.devUIContainer.style.pointerEvents=`none`;let t=this.devUIContainer.attachShadow({mode:`open`});this.inputLayer=new dy(e),ao.setState({mode:this.inputLayer.currentGazeMode,commitHand:this.inputLayer.currentGazeCommitHand}),this.unsubscribeControlMode=e.onControlModeChange(t=>{t===`programmatic`?(this.inputLayer.setProgrammaticMode(!0),this.inputLayer.syncFromDevice(),ro.getState().setInputMode(e.primaryInputMode),ao.getState().setMode(this.inputLayer.currentGazeMode),this.inputLayer.setInteractionsEnabled(!1)):(this.inputLayer.setProgrammaticMode(!1),this.inputLayer.setInteractionsEnabled(!0),ao.getState().setMode(this.inputLayer.currentGazeMode))}),this.unsubscribeStateChange=e.onStateChange(()=>{this.inputLayer.isInProgrammaticMode&&(this.inputLayer.syncFromDevice(),ro.getState().setInputMode(e.primaryInputMode),ao.getState().setMode(this.inputLayer.currentGazeMode))}),(0,vy.createRoot)(t).render((0,z.jsx)(by,{xrDevice:e,inputLayer:this.inputLayer,shadowRoot:t}));let n=()=>{let t=document.createElement(`div`);document.body.appendChild(t);let n=t.attachShadow({mode:`open`});(0,vy.createRoot)(n).render((0,z.jsx)(xy,{xrDevice:e,shadowRoot:n}))};document.body?n():window.onload=n}render(e){this.inputLayer.renderScene(e)}applyDefaultPose(e){this.inputLayer.applyDefaultPose(e)}setGazeMode(e){this.inputLayer.setGazeMode(e),ao.getState().setMode(this.inputLayer.currentGazeMode)}setGazeCommitHand(e){this.inputLayer.setGazeCommitHand(e),ao.getState().setCommitHand(e)}onSessionEnd(){this.inputLayer.onSessionEnd()}dispose(){this.unsubscribeControlMode(),this.unsubscribeStateChange(),this.inputLayer.dispose()}get devUICanvas(){return this.inputLayer.domElement}},by=({xrDevice:e,inputLayer:t,shadowRoot:n})=>{let[r,i]=(0,B.useState)(!1),[a,o]=(0,B.useState)(e.controlMode);return(0,B.useEffect)(()=>{let t=()=>{let e=document.pointerLockElement||document.mozPointerLockElement||document.webkitPointerLockElement;i(!!e)};document.addEventListener(`pointerlockchange`,t,!1),document.addEventListener(`mozpointerlockchange`,t,!1),document.addEventListener(`webkitpointerlockchange`,t,!1);let n=e.onControlModeChange(e=>{o(e)});return()=>{document.removeEventListener(`pointerlockchange`,t,!1),document.removeEventListener(`mozpointerlockchange`,t,!1),document.removeEventListener(`webkitpointerlockchange`,t,!1),n()}},[e]),(0,z.jsx)(Hn,{target:n,disableCSSOMInjection:!0,children:(0,z.jsxs)(`div`,{style:{width:`100vw`,height:`100vh`,display:`flex`,flexDirection:`column`,justifyContent:`space-between`,pointerEvents:`none`},children:[a===`programmatic`&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`div`,{style:{position:`absolute`,top:0,left:0,right:0,bottom:0,pointerEvents:`none`,zIndex:999,boxShadow:`inset 0 0 20px 5px rgba(59, 130, 246, 0.5)`}}),(0,z.jsxs)(`div`,{style:{position:`absolute`,bottom:`8px`,left:`50%`,transform:`translateX(-50%)`,backgroundColor:`rgba(59, 130, 246, 0.9)`,color:`white`,padding:`6px 16px`,borderRadius:`16px`,fontSize:`12px`,fontFamily:`system-ui, sans-serif`,fontWeight:500,zIndex:1e3,display:`flex`,alignItems:`center`,gap:`6px`,boxShadow:`0 2px 8px rgba(0,0,0,0.3)`},children:[(0,z.jsx)(`span`,{style:{fontSize:`14px`},children:`●`}),`Remote Control Active`]})]}),a!==`programmatic`&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(Io,{xrDevice:e,inputLayer:t}),(0,z.jsx)(io,{xrDevice:e,inputLayer:t,pointerLocked:r})]})]})})},xy=({xrDevice:e,shadowRoot:t})=>{let[n,r]=B.useState(e.sessionOffered&&!e.activeSession);return B.useEffect(()=>{let t=setInterval(()=>{r(e.sessionOffered&&!e.activeSession)},1e3);return()=>{clearInterval(t)}},[]),(0,z.jsx)(Hn,{target:t,disableCSSOMInjection:!0,children:(0,z.jsxs)(tr,{style:{zIndex:899,position:`fixed`,top:`8px`,display:`flex`,flexDirection:`row`,alignItems:`center`,justifyItems:`space-between`,left:`50vw`,transform:n?`translateX(-50%)`:`translateX(-50%) translateY(calc(-100% - 12px))`,transition:`transform 0.2s ease-in-out`,paddingLeft:`5px`,gap:`3px`},children:[(0,z.jsx)(G,{name:`iwer`,size:24}),(0,z.jsx)(nr,{onClick:()=>{e.grantOfferedSession()},style:{fontSize:`16px`},children:`Enter XR`})]})})};export{yy as DevUI};