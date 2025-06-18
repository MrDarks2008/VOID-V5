// ==UserScript==
// @name         Kwintix Ultimate
// @namespace    http://tampermonkey.net/
// @version      2024-05-20
// @description  you pay 15 dolars for me)
// @author       Vinder?!
// @match        *starve.io*
// @run-at       document-start
// @grant        unsafeWindow
// @webRequest   [{"selector":"*https://securepubads.g.doubleclick.net/tag/js/gpt.js*","action":"cancel"}]
// @icon         https://www.google.com/s2/favicons?sz=64&domain=starve.io
// ==/UserScript==
/* workerTimers */ ! function (e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).fastUniqueNumbers = {}) }(this, function (e) { "use strict"; var t, r = void 0 === Number.MAX_SAFE_INTEGER ? 9007199254740991 : Number.MAX_SAFE_INTEGER, n = new WeakMap, i = function (e, t) { return function (n) { var i = t.get(n), o = void 0 === i ? n.size : i < 1073741824 ? i + 1 : 0; if (!n.has(o)) return e(n, o); if (n.size < 536870912) { for (; n.has(o);) o = Math.floor(1073741824 * Math.random()); return e(n, o) } if (n.size > r) throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!"); for (; n.has(o);) o = Math.floor(Math.random() * r); return e(n, o) } }((t = n, function (e, r) { return t.set(e, r), r }), n), o = function (e) { return function (t) { var r = e(t); return t.add(r), r } }(i); e.addUniqueNumber = o, e.generateUniqueNumber = i, Object.defineProperty(e, "__esModule", { value: !0 }) }), function (e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports, require("fast-unique-numbers")) : "function" == typeof define && define.amd ? define(["exports", "fast-unique-numbers"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).workerTimersBroker = {}, e.fastUniqueNumbers) }(this, function (e, t) { "use strict"; e.load = function (e) { var r = new Map([[0, function () { }]]), n = new Map([[0, function () { }]]), i = new Map, o = new Worker(e); o.addEventListener("message", function (e) { var t = e.data; if (function (e) { return void 0 !== e.method && "call" === e.method }(t)) { var o = t.params, a = o.timerId, s = o.timerType; if ("interval" === s) { var u = r.get(a); if ("number" == typeof u) { var d = i.get(u); if (void 0 === d || d.timerId !== a || d.timerType !== s) throw new Error("The timer is in an undefined state.") } else { if (void 0 === u) throw new Error("The timer is in an undefined state."); u() } } else if ("timeout" === s) { var f = n.get(a); if ("number" == typeof f) { var l = i.get(f); if (void 0 === l || l.timerId !== a || l.timerType !== s) throw new Error("The timer is in an undefined state.") } else { if (void 0 === f) throw new Error("The timer is in an undefined state."); f(), n.delete(a) } } } else { if (! function (e) { return null === e.error && "number" == typeof e.id }(t)) { var m = t.error.message; throw new Error(m) } var c = t.id, p = i.get(c); if (void 0 === p) throw new Error("The timer is in an undefined state."); var v = p.timerId, h = p.timerType; i.delete(c), "interval" === h ? r.delete(v) : n.delete(v) } }); return { clearInterval: function (e) { var n = t.generateUniqueNumber(i); i.set(n, { timerId: e, timerType: "interval" }), r.set(e, n), o.postMessage({ id: n, method: "clear", params: { timerId: e, timerType: "interval" } }) }, clearTimeout: function (e) { var r = t.generateUniqueNumber(i); i.set(r, { timerId: e, timerType: "timeout" }), n.set(e, r), o.postMessage({ id: r, method: "clear", params: { timerId: e, timerType: "timeout" } }) }, setInterval: function (e, n) { var i = t.generateUniqueNumber(r); return r.set(i, function () { e(), "function" == typeof r.get(i) && o.postMessage({ id: null, method: "set", params: { delay: n, now: performance.now(), timerId: i, timerType: "interval" } }) }), o.postMessage({ id: null, method: "set", params: { delay: n, now: performance.now(), timerId: i, timerType: "interval" } }), i }, setTimeout: function (e, r) { var i = t.generateUniqueNumber(n); return n.set(i, e), o.postMessage({ id: null, method: "set", params: { delay: r, now: performance.now(), timerId: i, timerType: "timeout" } }), i } } }, Object.defineProperty(e, "__esModule", { value: !0 }) }), function (e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports, require("worker-timers-broker")) : "function" == typeof define && define.amd ? define(["exports", "worker-timers-broker"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).workerTimers = {}, e.workerTimersBroker) }(this, function (e, t) { "use strict"; var r = null, n = function (e, t) { return function () { if (null !== r) return r; var n = new Blob([t], { type: "application/javascript; charset=utf-8" }), i = URL.createObjectURL(n); return (r = e(i)).setTimeout(function () { return URL.revokeObjectURL(i) }, 0), r } }(t.load, '(()=>{var e={67:(e,t,r)=>{var o,i;void 0===(i="function"==typeof(o=function(){"use strict";var e=new Map,t=new Map,r=function(t){var r=e.get(t);if(void 0===r)throw new Error(\'There is no interval scheduled with the given id "\'.concat(t,\'".\'));clearTimeout(r),e.delete(t)},o=function(e){var r=t.get(e);if(void 0===r)throw new Error(\'There is no timeout scheduled with the given id "\'.concat(e,\'".\'));clearTimeout(r),t.delete(e)},i=function(e,t){var r,o=performance.now();return{expected:o+(r=e-Math.max(0,o-t)),remainingDelay:r}},n=function e(t,r,o,i){var n=performance.now();n>o?postMessage({id:null,method:"call",params:{timerId:r,timerType:i}}):t.set(r,setTimeout(e,o-n,t,r,o,i))},a=function(t,r,o){var a=i(t,o),s=a.expected,d=a.remainingDelay;e.set(r,setTimeout(n,d,e,r,s,"interval"))},s=function(e,r,o){var a=i(e,o),s=a.expected,d=a.remainingDelay;t.set(r,setTimeout(n,d,t,r,s,"timeout"))};addEventListener("message",(function(e){var t=e.data;try{if("clear"===t.method){var i=t.id,n=t.params,d=n.timerId,c=n.timerType;if("interval"===c)r(d),postMessage({error:null,id:i});else{if("timeout"!==c)throw new Error(\'The given type "\'.concat(c,\'" is not supported\'));o(d),postMessage({error:null,id:i})}}else{if("set"!==t.method)throw new Error(\'The given method "\'.concat(t.method,\'" is not supported\'));var u=t.params,l=u.delay,p=u.now,m=u.timerId,v=u.timerType;if("interval"===v)a(l,m,p);else{if("timeout"!==v)throw new Error(\'The given type "\'.concat(v,\'" is not supported\'));s(l,m,p)}}}catch(e){postMessage({error:{message:e.message},id:t.id,result:null})}}))})?o.call(t,r,t,e):o)||(e.exports=i)}},t={};function r(o){var i=t[o];if(void 0!==i)return i.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(67)})()})();'); e.clearInterval = function (e) { return n().clearInterval(e) }, e.clearTimeout = function (e) { return n().clearTimeout(e) }, e.setInterval = function (e, t) { return n().setInterval(e, t) }, e.setTimeout = function (e, t) { return n().setTimeout(e, t) }, Object.defineProperty(e, "__esModule", { value: !0 }) });
let is_left = !1
      , is_right = !1
      , is_bottom = !1
      , okw = !0
      , is_top = !1
      , SpectatorVector = {
        x: 0,
        y: 0
    };
    document.addEventListener("visibilitychange", ( () => {
        "visible" === document.visibilityState ? window.ThisTabMiniMized = !1 : window.ThisTabMiniMized = !0
    }
    ));
    const daisu = function() {
        var e;
        !function(e, t) {
            "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).fastUniqueNumbers = {})
        }(this, (function(e) {
            "use strict";
            var t, n = void 0 === Number.MAX_SAFE_INTEGER ? 9007199254740991 : Number.MAX_SAFE_INTEGER, o = new WeakMap, r = function(e, t) {
                return function(o) {
                    var r = t.get(o)
                      , i = void 0 === r ? o.size : r < 1073741824 ? r + 1 : 0;
                    if (!o.has(i))
                        return e(o, i);
                    if (o.size < 536870912) {
                        for (; o.has(i); )
                            i = Math.floor(1073741824 * Math.random());
                        return e(o, i)
                    }
                    if (o.size > n)
                        throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
                    for (; o.has(i); )
                        i = Math.floor(Math.random() * n);
                    return e(o, i)
                }
            }((t = o,
            function(e, n) {
                return t.set(e, n),
                n
            }
            ), o), i = function(e) {
                return function(t) {
                    var n = e(t);
                    return t.add(n),
                    n
                }
            }(r);
            e.addUniqueNumber = i,
            e.generateUniqueNumber = r,
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        )),
        function(e, t) {
            "object" == typeof exports && "undefined" != typeof module ? t(exports, require("fast-unique-numbers")) : "function" == typeof define && define.amd ? define(["exports", "fast-unique-numbers"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).workerTimersBroker = {}, e.fastUniqueNumbers)
        }(this, (function(e, t) {
            "use strict";
            e.load = function(e) {
                var n = new Map([[0, function() {}
                ]])
                  , o = new Map([[0, function() {}
                ]])
                  , r = new Map
                  , i = new Worker(e);
                return i.addEventListener("message", (function(e) {
                    var t = e.data;
                    if (function(e) {
                        return void 0 !== e.method && "call" === e.method
                    }(t)) {
                        var i = t.params
                          , a = i.timerId
                          , s = i.timerType;
                        if ("interval" === s) {
                            var l = n.get(a);
                            if ("number" == typeof l) {
                                var u = r.get(l);
                                if (void 0 === u || u.timerId !== a || u.timerType !== s)
                                    throw new Error("The timer is in an undefined state.")
                            } else {
                                if (void 0 === l)
                                    throw new Error("The timer is in an undefined state.");
                                l()
                            }
                        } else if ("timeout" === s) {
                            var c = o.get(a);
                            if ("number" == typeof c) {
                                var d = r.get(c);
                                if (void 0 === d || d.timerId !== a || d.timerType !== s)
                                    throw new Error("The timer is in an undefined state.")
                            } else {
                                if (void 0 === c)
                                    throw new Error("The timer is in an undefined state.");
                                c(),
                                o.delete(a)
                            }
                        }
                    } else {
                        if (!function(e) {
                            return null === e.error && "number" == typeof e.id
                        }(t)) {
                            var p = t.error.message;
                            throw new Error(p)
                        }
                        var f = t.id
                          , g = r.get(f);
                        if (void 0 === g)
                            throw new Error("The timer is in an undefined state.");
                        var h = g.timerId
                          , b = g.timerType;
                        r.delete(f),
                        "interval" === b ? n.delete(h) : o.delete(h)
                    }
                }
                )),
                {
                    clearInterval: function(e) {
                        var o = t.generateUniqueNumber(r);
                        r.set(o, {
                            timerId: e,
                            timerType: "interval"
                        }),
                        n.set(e, o),
                        i.postMessage({
                            id: o,
                            method: "clear",
                            params: {
                                timerId: e,
                                timerType: "interval"
                            }
                        })
                    },
                    clearTimeout: function(e) {
                        var n = t.generateUniqueNumber(r);
                        r.set(n, {
                            timerId: e,
                            timerType: "timeout"
                        }),
                        o.set(e, n),
                        i.postMessage({
                            id: n,
                            method: "clear",
                            params: {
                                timerId: e,
                                timerType: "timeout"
                            }
                        })
                    },
                    setInterval: function(e, o) {
                        var r = t.generateUniqueNumber(n);
                        return n.set(r, (function() {
                            e(),
                            "function" == typeof n.get(r) && i.postMessage({
                                id: null,
                                method: "set",
                                params: {
                                    delay: o,
                                    now: performance.now(),
                                    timerId: r,
                                    timerType: "interval"
                                }
                            })
                        }
                        )),
                        i.postMessage({
                            id: null,
                            method: "set",
                            params: {
                                delay: o,
                                now: performance.now(),
                                timerId: r,
                                timerType: "interval"
                            }
                        }),
                        r
                    },
                    setTimeout: function(e, n) {
                        var r = t.generateUniqueNumber(o);
                        return o.set(r, e),
                        i.postMessage({
                            id: null,
                            method: "set",
                            params: {
                                delay: n,
                                now: performance.now(),
                                timerId: r,
                                timerType: "timeout"
                            }
                        }),
                        r
                    }
                }
            }
            ,
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        )),
        function(e, t) {
            "object" == typeof exports && "undefined" != typeof module ? t(exports, require("worker-timers-broker")) : "function" == typeof define && define.amd ? define(["exports", "worker-timers-broker"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).workerTimers = {}, e.workerTimersBroker)
        }(this, (function(e, t) {
            "use strict";
            var n = null
              , o = function(e, t) {
                return function() {
                    if (null !== n)
                        return n;
                    var t = new Blob(['(()=>{var e={67:(e,t,r)=>{var o,i;void 0===(i="function"==typeof(o=function(){"use strict";var e=new Map,t=new Map,r=function(t){var r=e.get(t);if(void 0===r)throw new Error(\'There is no interval scheduled with the given id "\'.concat(t,\'".\'));clearTimeout(r),e.delete(t)},o=function(e){var r=t.get(e);if(void 0===r)throw new Error(\'There is no timeout scheduled with the given id "\'.concat(e,\'".\'));clearTimeout(r),t.delete(e)},i=function(e,t){var r,o=performance.now();return{expected:o+(r=e-Math.max(0,o-t)),remainingDelay:r}},n=function e(t,r,o,i){var n=performance.now();n>o?postMessage({id:null,method:"call",params:{timerId:r,timerType:i}}):t.set(r,setTimeout(e,o-n,t,r,o,i))},a=function(t,r,o){var a=i(t,o),s=a.expected,d=a.remainingDelay;e.set(r,setTimeout(n,d,e,r,s,"interval"))},s=function(e,r,o){var a=i(e,o),s=a.expected,d=a.remainingDelay;t.set(r,setTimeout(n,d,t,r,s,"timeout"))};addEventListener("message",(function(e){var t=e.data;try{if("clear"===t.method){var i=t.id,n=t.params,d=n.timerId,c=n.timerType;if("interval"===c)r(d),postMessage({error:null,id:i});else{if("timeout"!==c)throw new Error(\'The given type "\'.concat(c,\'" is not supported\'));o(d),postMessage({error:null,id:i})}}else{if("set"!==t.method)throw new Error(\'The given method "\'.concat(t.method,\'" is not supported\'));var u=t.params,l=u.delay,p=u.now,m=u.timerId,v=u.timerType;if("interval"===v)a(l,m,p);else{if("timeout"!==v)throw new Error(\'The given type "\'.concat(v,\'" is not supported\'));s(l,m,p)}}}catch(e){postMessage({error:{message:e.message},id:t.id,result:null})}}))})?o.call(t,r,t,e):o)||(e.exports=i)}},t={};function r(o){var i=t[o];if(void 0!==i)return i.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(67)})()})();'],{
                        type: "application/javascript; charset=utf-8"
                    })
                      , o = URL.createObjectURL(t);
                    return (n = e(o)).setTimeout((function() {
                        return URL.revokeObjectURL(o)
                    }
                    ), 0),
                    n
                }
            }(t.load);
            e.clearInterval = function(e) {
                return o().clearInterval(e)
            }
            ,
            e.clearTimeout = function(e) {
                return o().clearTimeout(e)
            }
            ,
            e.setInterval = function(e, t) {
                return o().setInterval(e, t)
            }
            ,
            e.setTimeout = function(e, t) {
                return o().setTimeout(e, t)
            }
            ,
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        )),
        e = function() {
            return function(e) {
                function t(o) {
                    if (n[o])
                        return n[o].exports;
                    var r = n[o] = {
                        i: o,
                        l: !1,
                        exports: {}
                    };
                    return e[o].call(r.exports, r, r.exports, t),
                    r.l = !0,
                    r.exports
                }
                var n = {};
                return t.m = e,
                t.c = n,
                t.d = function(e, n, o) {
                    t.o(e, n) || Object.defineProperty(e, n, {
                        configurable: !1,
                        enumerable: !0,
                        get: o
                    })
                }
                ,
                t.n = function(e) {
                    var n = e && e.__esModule ? function() {
                        return e.default
                    }
                    : function() {
                        return e
                    }
                    ;
                    return t.d(n, "a", n),
                    n
                }
                ,
                t.o = function(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                }
                ,
                t.p = "",
                t(t.s = 16)
            }([function(e, t, n) {
                function o(e, t, n) {
                    var o = s[t];
                    if (void 0 === o && (o = function(e) {
                        var t = a(e)
                          , n = i(t);
                        return s[t] = s[e] = s[n] = n,
                        n
                    }(t)),
                    o) {
                        if (void 0 === n)
                            return e.style[o];
                        e.style[o] = l(o, n)
                    }
                }
                function r() {
                    2 === arguments.length ? "string" == typeof arguments[1] ? arguments[0].style.cssText = arguments[1] : function(e, t) {
                        for (var n in t)
                            t.hasOwnProperty(n) && o(e, n, t[n])
                    }(arguments[0], arguments[1]) : o(arguments[0], arguments[1], arguments[2])
                }
                var i = n(18)
                  , a = n(19)
                  , s = {
                    float: "cssFloat"
                }
                  , l = n(22);
                e.exports = r,
                e.exports.set = r,
                e.exports.get = function(e, t) {
                    return Array.isArray(t) ? t.reduce((function(t, n) {
                        return t[n] = o(e, n || ""),
                        t
                    }
                    ), {}) : o(e, t || "")
                }
            }
            , function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.theme = void 0;
                var o = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1,
                            o.configurable = !0,
                            "value"in o && (o.writable = !0),
                            Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n),
                        o && e(t, o),
                        t
                    }
                }();
                !function(e) {
                    e && e.__esModule
                }(n(9));
                var r = function() {
                    function e() {
                        !function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, e)
                    }
                    return o(e, [{
                        key: "Set",
                        value: function(e) {
                            Object.assign(this, i, e)
                        }
                    }]),
                    e
                }()
                  , i = {
                    name: "BaseTheme",
                    colors: {
                        menuBarBackground: "black",
                        menuBarText: "black",
                        panelBackground: "black",
                        componentBackground: "black",
                        componentBackgroundHover: "black",
                        componentForeground: "black",
                        componentActive: "black",
                        textPrimary: "black",
                        textSecondary: "black",
                        textHover: "black",
                        textActive: "black"
                    },
                    sizing: {
                        menuBarHeight: "25px",
                        componentHeight: "20px",
                        componentSpacing: "5px",
                        labelWidth: "42%"
                    }
                };
                t.theme = new r
            }
            , function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var o = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(n(0));
                t.default = function(e, t, n) {
                    var r = e.appendChild(document.createElement("div"));
                    return r.classList.add("guify-component-container"),
                    (0,
                    o.default)(r, {
                        position: "relative",
                        "min-height": n.sizing.componentHeight,
                        "margin-bottom": n.sizing.componentSpacing
                    }),
                    r
                }
                ,
                e.exports = t.default
            }
            , function(e, t, n) {
                "use strict";
                var o = n(31);
                e.exports = o,
                e.exports.csjs = o,
                e.exports.getCss = n(45)
            }
            , function(e, t, n) {
                var o;
                !function(t) {
                    "use strict";
                    function r() {}
                    function i(e, t) {
                        for (var n = e.length; n--; )
                            if (e[n].listener === t)
                                return n;
                        return -1
                    }
                    function a(e) {
                        return function() {
                            return this[e].apply(this, arguments)
                        }
                    }
                    function s(e) {
                        return "function" == typeof e || e instanceof RegExp || !!e && "object" == typeof e && s(e.listener)
                    }
                    var l = r.prototype
                      , u = t.EventEmitter;
                    l.getListeners = function(e) {
                        var t, n, o = this._getEvents();
                        if (e instanceof RegExp)
                            for (n in t = {},
                            o)
                                o.hasOwnProperty(n) && e.test(n) && (t[n] = o[n]);
                        else
                            t = o[e] ||= [];
                        return t
                    }
                    ,
                    l.flattenListeners = function(e) {
                        var t, n = [];
                        for (t = 0; t < e.length; t += 1)
                            n.push(e[t].listener);
                        return n
                    }
                    ,
                    l.getListenersAsObject = function(e) {
                        var t, n = this.getListeners(e);
                        return n instanceof Array && ((t = {})[e] = n),
                        t || n
                    }
                    ,
                    l.addListener = function(e, t) {
                        if (!s(t))
                            throw new TypeError("listener must be a function");
                        var n, o = this.getListenersAsObject(e), r = "object" == typeof t;
                        for (n in o)
                            o.hasOwnProperty(n) && -1 === i(o[n], t) && o[n].push(r ? t : {
                                listener: t,
                                once: !1
                            });
                        return this
                    }
                    ,
                    l.on = a("addListener"),
                    l.addOnceListener = function(e, t) {
                        return this.addListener(e, {
                            listener: t,
                            once: !0
                        })
                    }
                    ,
                    l.once = a("addOnceListener"),
                    l.defineEvent = function(e) {
                        return this.getListeners(e),
                        this
                    }
                    ,
                    l.defineEvents = function(e) {
                        for (var t = 0; t < e.length; t += 1)
                            this.defineEvent(e[t]);
                        return this
                    }
                    ,
                    l.removeListener = function(e, t) {
                        var n, o, r = this.getListenersAsObject(e);
                        for (o in r)
                            r.hasOwnProperty(o) && -1 !== (n = i(r[o], t)) && r[o].splice(n, 1);
                        return this
                    }
                    ,
                    l.off = a("removeListener"),
                    l.addListeners = function(e, t) {
                        return this.manipulateListeners(!1, e, t)
                    }
                    ,
                    l.removeListeners = function(e, t) {
                        return this.manipulateListeners(!0, e, t)
                    }
                    ,
                    l.manipulateListeners = function(e, t, n) {
                        var o, r, i = e ? this.removeListener : this.addListener, a = e ? this.removeListeners : this.addListeners;
                        if ("object" != typeof t || t instanceof RegExp)
                            for (o = n.length; o--; )
                                i.call(this, t, n[o]);
                        else
                            for (o in t)
                                t.hasOwnProperty(o) && (r = t[o]) && ("function" == typeof r ? i.call(this, o, r) : a.call(this, o, r));
                        return this
                    }
                    ,
                    l.removeEvent = function(e) {
                        var t, n = typeof e, o = this._getEvents();
                        if ("string" === n)
                            delete o[e];
                        else if (e instanceof RegExp)
                            for (t in o)
                                o.hasOwnProperty(t) && e.test(t) && delete o[t];
                        else
                            delete this._events;
                        return this
                    }
                    ,
                    l.removeAllListeners = a("removeEvent"),
                    l.emitEvent = function(e, t) {
                        var n, o, r, i, a = this.getListenersAsObject(e);
                        for (i in a)
                            if (a.hasOwnProperty(i))
                                for (n = a[i].slice(0),
                                r = 0; r < n.length; r++)
                                    !0 === (o = n[r]).once && this.removeListener(e, o.listener),
                                    o.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(e, o.listener);
                        return this
                    }
                    ,
                    l.trigger = a("emitEvent"),
                    l.emit = function(e) {
                        var t = Array.prototype.slice.call(arguments, 1);
                        return this.emitEvent(e, t)
                    }
                    ,
                    l.setOnceReturnValue = function(e) {
                        return this._onceReturnValue = e,
                        this
                    }
                    ,
                    l._getOnceReturnValue = function() {
                        return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
                    }
                    ,
                    l._getEvents = function() {
                        return this._events ||= {}
                    }
                    ,
                    r.noConflict = function() {
                        return t.EventEmitter = u,
                        r
                    }
                    ,
                    void 0 !== (o = function() {
                        return r
                    }
                    .call(t, n, t, e)) && (e.exports = o)
                }(void 0 !== unsafeWindow ? unsafeWindow : this || {})
            }
            , function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var o = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(n(0));
                t.default = function(e, t, n) {
                    var r = e.appendChild(document.createElement("div"));
                    (0,
                    o.default)(r, {
                        left: 0,
                        width: "calc(" + n.sizing.labelWidth + " - 2%)",
                        display: "inline-block",
                        "margin-right": "2%",
                        verticalAlign: "top"
                    });
                    var i = r.appendChild(document.createElement("div"));
                    return i.innerHTML = t,
                    (0,
                    o.default)(i, {
                        color: n.colors.textPrimary,
                        display: "inline-block",
                        verticalAlign: "sub",
                        "min-height": n.sizing.componentHeight,
                        "line-height": n.sizing.componentHeight
                    }),
                    i
                }
                ,
                e.exports = t.default
            }
            , function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var o = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(n(0));
                t.default = function(e, t, n, r, i) {
                    var a = e.appendChild(document.createElement("input"));
                    a.type = "text",
                    a.value = t;
                    var s = {
                        position: "absolute",
                        backgroundColor: n.colors.componentBackground,
                        paddingLeft: "1%",
                        height: n.sizing.componentHeight,
                        width: r,
                        display: "inline-block",
                        overflow: "hidden",
                        border: "none",
                        "font-family": "'Hack', monospace",
                        "font-size": "11px",
                        color: n.colors.textSecondary,
                        userSelect: "text",
                        cursor: "text",
                        lineHeight: n.sizing.componentHeight,
                        wordBreak: "break-all",
                        "box-sizing": "border-box",
                        "-moz-box-sizing": "border-box",
                        "-webkit-box-sizing": "border-box"
                    };
                    return i || (s.right = 0),
                    (0,
                    o.default)(a, s),
                    a
                }
                ,
                e.exports = t.default
            }
            , function(e, t, n) {
                "use strict";
                function o(e) {
                    return e instanceof r
                }
                function r() {}
                e.exports = {
                    makeComposition: function(e, t, n) {
                        var o = e.join(" ");
                        return Object.create(r.prototype, {
                            classNames: {
                                value: Object.freeze(e),
                                configurable: !1,
                                writable: !1,
                                enumerable: !0
                            },
                            unscoped: {
                                value: Object.freeze(t),
                                configurable: !1,
                                writable: !1,
                                enumerable: !0
                            },
                            className: {
                                value: o,
                                configurable: !1,
                                writable: !1,
                                enumerable: !0
                            },
                            selector: {
                                value: e.map((function(e) {
                                    return n ? e : "." + e
                                }
                                )).join(", "),
                                configurable: !1,
                                writable: !1,
                                enumerable: !0
                            },
                            toString: {
                                value: function() {
                                    return o
                                },
                                configurable: !1,
                                writeable: !1,
                                enumerable: !1
                            }
                        })
                    },
                    isComposition: o,
                    ignoreComposition: function(e) {
                        return e.reduce((function(e, t) {
                            return o(t) && t.classNames.forEach((function(n, o) {
                                e[n] = t.unscoped[o]
                            }
                            )),
                            e
                        }
                        ), {})
                    }
                }
            }
            , function(e, t, n) {
                "use strict";
                var o = /(@\S*keyframes\s*)([^{\s]*)/.source
                  , r = /(?!(?:[^*\/]|\*[^\/]|\/[^*])*\*+\/)/.source
                  , i = new RegExp(/(\.)(?!\d)([^\s\.,{\[>+~#:)]*)(?![^{]*})/.source + r,"g")
                  , a = new RegExp(o + r,"g");
                e.exports = {
                    classRegex: i,
                    keyframesRegex: a,
                    ignoreComments: r
                }
            }
            , function(e, t, n) {
                "use strict";
                e.exports = {
                    light: {
                        name: "Light",
                        colors: {
                            menuBarBackground: "rgb(227, 227, 227)",
                            menuBarText: "rgb(36, 36, 36)",
                            panelBackground: "rgb(227, 227, 227)",
                            componentBackground: "rgb(204, 204, 204)",
                            componentBackgroundHover: "rgb(190, 190, 190)",
                            componentForeground: "rgb(105, 105, 105)",
                            componentActive: "rgb(36, 36, 36)",
                            textPrimary: "rgb(36, 36, 36)",
                            textSecondary: "rgb(87, 87, 87)",
                            textHover: "rgb(204, 204, 204)",
                            textActive: "rgb(204, 204, 204)"
                        }
                    },
                    dark: {
                        name: "Dark",
                        colors: {
                            menuBarBackground: "rgb(35, 35, 35)",
                            menuBarText: "rgb(235, 235, 235)",
                            panelBackground: "rgb(35, 35, 35)",
                            componentBackground: "rgb(54, 54, 54)",
                            componentBackgroundHover: "rgb(76, 76, 76)",
                            componentForeground: "rgb(112, 112, 112)",
                            componentActive: "rgb(202, 202, 202)",
                            textPrimary: "rgb(235, 235, 235)",
                            textSecondary: "rgb(181, 181, 181)",
                            textHover: "rgb(235, 235, 235)",
                            textActive: "rgb(54, 54, 54)"
                        }
                    },
                    yorha: {
                        name: "YoRHa",
                        colors: {
                            menuBarBackground: "#CCC8B1",
                            menuBarText: "#454138",
                            panelBackground: "#CCC8B1",
                            componentBackground: "#BAB5A1",
                            componentBackgroundHover: "#877F6E",
                            componentForeground: "#454138",
                            componentActive: "#978F7E",
                            textPrimary: "#454138",
                            textSecondary: "#454138",
                            textHover: "#CCC8B1",
                            textActive: "#CCC8B1"
                        },
                        font: {
                            fontFamily: "helvetica, sans-serif",
                            fontSize: "14px",
                            fontWeight: "100"
                        }
                    }
                }
            }
            , function(e, t, n) {
                !function(n) {
                    "use strict";
                    function o(e) {
                        return "number" == typeof e && !isNaN(e) || !!(e = (e || "").toString().trim()) && !isNaN(e)
                    }
                    void 0 !== e && e.exports && (t = e.exports = o),
                    t.isNumeric = o
                }()
            }
            , function(e, t, n) {
                "use strict";
                e.exports = " css "
            }
            , function(e, t, n) {
                "use strict";
                e.exports = n(44)
            }
            , function(e, t) {
                function n(e, t) {
                    if (t = t || {},
                    void 0 === e)
                        throw new Error(i);
                    var n, a = !0 === t.prepend ? "prepend" : "append", s = void 0 !== t.container ? t.container : document.querySelector("head"), l = o.indexOf(s);
                    return -1 === l && (l = o.push(s) - 1,
                    r[l] = {}),
                    void 0 !== r[l] && void 0 !== r[l][a] ? n = r[l][a] : (n = r[l][a] = function() {
                        var e = document.createElement("style");
                        return e.setAttribute("type", "text/css"),
                        e
                    }(),
                    "prepend" === a ? s.insertBefore(n, s.childNodes[0]) : s.appendChild(n)),
                    65279 === e.charCodeAt(0) && (e = e.substr(1, e.length)),
                    n.styleSheet ? n.styleSheet.cssText += e : n.textContent += e,
                    n
                }
                var o = []
                  , r = []
                  , i = "insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).";
                e.exports = n,
                e.exports.insertCss = n
            }
            , function(e, t, n) {
                var o;
                !function(r) {
                    function i(e, t) {
                        if (t = t || {},
                        (e = e || "")instanceof i)
                            return e;
                        if (!(this instanceof i))
                            return new i(e,t);
                        var n = function(e) {
                            var t = {
                                r: 0,
                                g: 0,
                                b: 0
                            }
                              , n = 1
                              , o = null
                              , r = null
                              , i = null
                              , a = !1
                              , s = !1;
                            return "string" == typeof e && (e = function(e) {
                                var t;
                                e = e.replace(B, "").replace(I, "").toLowerCase();
                                var n = !1;
                                if (H[e])
                                    e = H[e],
                                    n = !0;
                                else if ("transparent" == e)
                                    return {
                                        r: 0,
                                        g: 0,
                                        b: 0,
                                        a: 0,
                                        format: "name"
                                    };
                                return (t = W.rgb.exec(e)) ? {
                                    r: t[1],
                                    g: t[2],
                                    b: t[3]
                                } : (t = W.rgba.exec(e)) ? {
                                    r: t[1],
                                    g: t[2],
                                    b: t[3],
                                    a: t[4]
                                } : (t = W.hsl.exec(e)) ? {
                                    h: t[1],
                                    s: t[2],
                                    l: t[3]
                                } : (t = W.hsla.exec(e)) ? {
                                    h: t[1],
                                    s: t[2],
                                    l: t[3],
                                    a: t[4]
                                } : (t = W.hsv.exec(e)) ? {
                                    h: t[1],
                                    s: t[2],
                                    v: t[3]
                                } : (t = W.hsva.exec(e)) ? {
                                    h: t[1],
                                    s: t[2],
                                    v: t[3],
                                    a: t[4]
                                } : (t = W.hex8.exec(e)) ? {
                                    r: A(t[1]),
                                    g: A(t[2]),
                                    b: A(t[3]),
                                    a: M(t[4]),
                                    format: n ? "name" : "hex8"
                                } : (t = W.hex6.exec(e)) ? {
                                    r: A(t[1]),
                                    g: A(t[2]),
                                    b: A(t[3]),
                                    format: n ? "name" : "hex"
                                } : (t = W.hex4.exec(e)) ? {
                                    r: A(t[1] + "" + t[1]),
                                    g: A(t[2] + "" + t[2]),
                                    b: A(t[3] + "" + t[3]),
                                    a: M(t[4] + "" + t[4]),
                                    format: n ? "name" : "hex8"
                                } : !!(t = W.hex3.exec(e)) && {
                                    r: A(t[1] + "" + t[1]),
                                    g: A(t[2] + "" + t[2]),
                                    b: A(t[3] + "" + t[3]),
                                    format: n ? "name" : "hex"
                                }
                            }(e)),
                            "object" == typeof e && (N(e.r) && N(e.g) && N(e.b) ? (t = function(e, t, n) {
                                return {
                                    r: 255 * T(e, 255),
                                    g: 255 * T(t, 255),
                                    b: 255 * T(n, 255)
                                }
                            }(e.r, e.g, e.b),
                            a = !0,
                            s = "%" === String(e.r).substr(-1) ? "prgb" : "rgb") : N(e.h) && N(e.s) && N(e.v) ? (o = C(e.s),
                            r = C(e.v),
                            t = l(e.h, o, r),
                            a = !0,
                            s = "hsv") : N(e.h) && N(e.s) && N(e.l) && (o = C(e.s),
                            i = C(e.l),
                            t = function(e, t, n) {
                                function o(e, t, n) {
                                    return n < 0 && (n += 1),
                                    n > 1 && (n -= 1),
                                    n < .16666666666666666 ? e + 6 * (t - e) * n : n < .5 ? t : n < .6666666666666666 ? e + (t - e) * (.6666666666666666 - n) * 6 : e
                                }
                                var r, i, a;
                                if (e = T(e, 360),
                                t = T(t, 100),
                                n = T(n, 100),
                                0 === t)
                                    r = i = a = n;
                                else {
                                    var s = n < .5 ? n * (1 + t) : n + t - n * t
                                      , l = 2 * n - s;
                                    r = o(l, s, e + .3333333333333333),
                                    i = o(l, s, e),
                                    a = o(l, s, e - .3333333333333333)
                                }
                                return {
                                    r: 255 * r,
                                    g: 255 * i,
                                    b: 255 * a
                                }
                            }(e.h, o, i),
                            a = !0,
                            s = "hsl"),
                            e.hasOwnProperty("a") && (n = e.a)),
                            n = E(n),
                            {
                                ok: a,
                                format: e.format || s,
                                r: D(255, U(t.r, 0)),
                                g: D(255, U(t.g, 0)),
                                b: D(255, U(t.b, 0)),
                                a: n
                            }
                        }(e);
                        this._originalInput = e,
                        this._r = n.r,
                        this._g = n.g,
                        this._b = n.b,
                        this._a = n.a,
                        this._roundA = P(100 * this._a) / 100,
                        this._format = t.format || n.format,
                        this._gradientType = t.gradientType,
                        this._r < 1 && (this._r = P(this._r)),
                        this._g < 1 && (this._g = P(this._g)),
                        this._b < 1 && (this._b = P(this._b)),
                        this._ok = n.ok,
                        this._tc_id = L++
                    }
                    function a(e, t, n) {
                        var o, r;
                        e = T(e, 255),
                        t = T(t, 255),
                        n = T(n, 255);
                        var i = U(e, t, n)
                          , a = D(e, t, n)
                          , s = (i + a) / 2;
                        if (i == a)
                            o = r = 0;
                        else {
                            var l = i - a;
                            switch (r = s > .5 ? l / (2 - i - a) : l / (i + a),
                            i) {
                            case e:
                                o = (t - n) / l + (t < n ? 6 : 0);
                                break;
                            case t:
                                o = (n - e) / l + 2;
                                break;
                            case n:
                                o = (e - t) / l + 4
                            }
                            o /= 6
                        }
                        return {
                            h: o,
                            s: r,
                            l: s
                        }
                    }
                    function s(e, t, n) {
                        var o, r;
                        e = T(e, 255),
                        t = T(t, 255),
                        n = T(n, 255);
                        var i = U(e, t, n)
                          , a = D(e, t, n)
                          , s = i
                          , l = i - a;
                        if (r = 0 === i ? 0 : l / i,
                        i == a)
                            o = 0;
                        else {
                            switch (i) {
                            case e:
                                o = (t - n) / l + (t < n ? 6 : 0);
                                break;
                            case t:
                                o = (n - e) / l + 2;
                                break;
                            case n:
                                o = (e - t) / l + 4
                            }
                            o /= 6
                        }
                        return {
                            h: o,
                            s: r,
                            v: s
                        }
                    }
                    function l(e, t, n) {
                        e = 6 * T(e, 360),
                        t = T(t, 100),
                        n = T(n, 100);
                        var o = r.floor(e)
                          , i = e - o
                          , a = n * (1 - t)
                          , s = n * (1 - i * t)
                          , l = n * (1 - (1 - i) * t)
                          , u = o % 6;
                        return {
                            r: 255 * [n, s, a, a, l, n][u],
                            g: 255 * [l, n, n, s, a, a][u],
                            b: 255 * [a, a, l, n, n, s][u]
                        }
                    }
                    function u(e, t, n, o) {
                        var r = [_(P(e).toString(16)), _(P(t).toString(16)), _(P(n).toString(16))];
                        return o && r[0].charAt(0) == r[0].charAt(1) && r[1].charAt(0) == r[1].charAt(1) && r[2].charAt(0) == r[2].charAt(1) ? r[0].charAt(0) + r[1].charAt(0) + r[2].charAt(0) : r.join("")
                    }
                    function c(e, t, n, o) {
                        return [_(R(o)), _(P(e).toString(16)), _(P(t).toString(16)), _(P(n).toString(16))].join("")
                    }
                    function d(e, t) {
                        t = 0 === t ? 0 : t || 10;
                        var n = i(e).toHsl();
                        return n.s -= t / 100,
                        n.s = O(n.s),
                        i(n)
                    }
                    function p(e, t) {
                        t = 0 === t ? 0 : t || 10;
                        var n = i(e).toHsl();
                        return n.s += t / 100,
                        n.s = O(n.s),
                        i(n)
                    }
                    function f(e) {
                        return i(e).desaturate(100)
                    }
                    function g(e, t) {
                        t = 0 === t ? 0 : t || 10;
                        var n = i(e).toHsl();
                        return n.l += t / 100,
                        n.l = O(n.l),
                        i(n)
                    }
                    function h(e, t) {
                        t = 0 === t ? 0 : t || 10;
                        var n = i(e).toRgb();
                        return n.r = U(0, D(255, n.r - P(-t / 100 * 255))),
                        n.g = U(0, D(255, n.g - P(-t / 100 * 255))),
                        n.b = U(0, D(255, n.b - P(-t / 100 * 255))),
                        i(n)
                    }
                    function b(e, t) {
                        t = 0 === t ? 0 : t || 10;
                        var n = i(e).toHsl();
                        return n.l -= t / 100,
                        n.l = O(n.l),
                        i(n)
                    }
                    function m(e, t) {
                        var n = i(e).toHsl()
                          , o = (n.h + t) % 360;
                        return n.h = o < 0 ? 360 + o : o,
                        i(n)
                    }
                    function y(e) {
                        var t = i(e).toHsl();
                        return t.h = (t.h + 180) % 360,
                        i(t)
                    }
                    function v(e) {
                        var t = i(e).toHsl()
                          , n = t.h;
                        return [i(e), i({
                            h: (n + 120) % 360,
                            s: t.s,
                            l: t.l
                        }), i({
                            h: (n + 240) % 360,
                            s: t.s,
                            l: t.l
                        })]
                    }
                    function k(e) {
                        var t = i(e).toHsl()
                          , n = t.h;
                        return [i(e), i({
                            h: (n + 90) % 360,
                            s: t.s,
                            l: t.l
                        }), i({
                            h: (n + 180) % 360,
                            s: t.s,
                            l: t.l
                        }), i({
                            h: (n + 270) % 360,
                            s: t.s,
                            l: t.l
                        })]
                    }
                    function S(e) {
                        var t = i(e).toHsl()
                          , n = t.h;
                        return [i(e), i({
                            h: (n + 72) % 360,
                            s: t.s,
                            l: t.l
                        }), i({
                            h: (n + 216) % 360,
                            s: t.s,
                            l: t.l
                        })]
                    }
                    function w(e, t, n) {
                        t = t || 6,
                        n = n || 30;
                        var o = i(e).toHsl()
                          , r = 360 / n
                          , a = [i(e)];
                        for (o.h = (o.h - (r * t >> 1) + 720) % 360; --t; )
                            o.h = (o.h + r) % 360,
                            a.push(i(o));
                        return a
                    }
                    function x(e, t) {
                        t = t || 6;
                        for (var n = i(e).toHsv(), o = n.h, r = n.s, a = n.v, s = [], l = 1 / t; t--; )
                            s.push(i({
                                h: o,
                                s: r,
                                v: a
                            })),
                            a = (a + l) % 1;
                        return s
                    }
                    function E(e) {
                        return e = parseFloat(e),
                        (isNaN(e) || e < 0 || e > 1) && (e = 1),
                        e
                    }
                    function T(e, t) {
                        (function(e) {
                            return "string" == typeof e && -1 != e.indexOf(".") && 1 === parseFloat(e)
                        }
                        )(e) && (e = "100%");
                        var n = function(e) {
                            return "string" == typeof e && -1 != e.indexOf("%")
                        }(e);
                        return e = D(t, U(0, parseFloat(e))),
                        n && (e = parseInt(e * t, 10) / 100),
                        r.abs(e - t) < 1e-6 ? 1 : e % t / parseFloat(t)
                    }
                    function O(e) {
                        return D(1, U(0, e))
                    }
                    function A(e) {
                        return parseInt(e, 16)
                    }
                    function _(e) {
                        return 1 == e.length ? "0" + e : "" + e
                    }
                    function C(e) {
                        return e <= 1 && (e = 100 * e + "%"),
                        e
                    }
                    function R(e) {
                        return r.round(255 * parseFloat(e)).toString(16)
                    }
                    function M(e) {
                        return A(e) / 255
                    }
                    function N(e) {
                        return !!W.CSS_UNIT.exec(e)
                    }
                    var B = /^\s+/
                      , I = /\s+$/
                      , L = 0
                      , P = r.round
                      , D = r.min
                      , U = r.max
                      , j = r.random;
                    i.prototype = {
                        isDark: function() {
                            return this.getBrightness() < 128
                        },
                        isLight: function() {
                            return !this.isDark()
                        },
                        isValid: function() {
                            return this._ok
                        },
                        getOriginalInput: function() {
                            return this._originalInput
                        },
                        getFormat: function() {
                            return this._format
                        },
                        getAlpha: function() {
                            return this._a
                        },
                        getBrightness: function() {
                            var e = this.toRgb();
                            return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3
                        },
                        getLuminance: function() {
                            var e, t, n, o = this.toRgb();
                            return e = o.r / 255,
                            t = o.g / 255,
                            n = o.b / 255,
                            .2126 * (e <= .03928 ? e / 12.92 : r.pow((e + .055) / 1.055, 2.4)) + .7152 * (t <= .03928 ? t / 12.92 : r.pow((t + .055) / 1.055, 2.4)) + .0722 * (n <= .03928 ? n / 12.92 : r.pow((n + .055) / 1.055, 2.4))
                        },
                        setAlpha: function(e) {
                            return this._a = E(e),
                            this._roundA = P(100 * this._a) / 100,
                            this
                        },
                        toHsv: function() {
                            var e = s(this._r, this._g, this._b);
                            return {
                                h: 360 * e.h,
                                s: e.s,
                                v: e.v,
                                a: this._a
                            }
                        },
                        toHsvString: function() {
                            var e = s(this._r, this._g, this._b)
                              , t = P(360 * e.h)
                              , n = P(100 * e.s)
                              , o = P(100 * e.v);
                            return 1 == this._a ? "hsv(" + t + ", " + n + "%, " + o + "%)" : "hsva(" + t + ", " + n + "%, " + o + "%, " + this._roundA + ")"
                        },
                        toHsl: function() {
                            var e = a(this._r, this._g, this._b);
                            return {
                                h: 360 * e.h,
                                s: e.s,
                                l: e.l,
                                a: this._a
                            }
                        },
                        toHslString: function() {
                            var e = a(this._r, this._g, this._b)
                              , t = P(360 * e.h)
                              , n = P(100 * e.s)
                              , o = P(100 * e.l);
                            return 1 == this._a ? "hsl(" + t + ", " + n + "%, " + o + "%)" : "hsla(" + t + ", " + n + "%, " + o + "%, " + this._roundA + ")"
                        },
                        toHex: function(e) {
                            return u(this._r, this._g, this._b, e)
                        },
                        toHexString: function(e) {
                            return "#" + this.toHex(e)
                        },
                        toHex8: function(e) {
                            return function(e, t, n, o, r) {
                                var i = [_(P(e).toString(16)), _(P(t).toString(16)), _(P(n).toString(16)), _(R(o))];
                                return r && i[0].charAt(0) == i[0].charAt(1) && i[1].charAt(0) == i[1].charAt(1) && i[2].charAt(0) == i[2].charAt(1) && i[3].charAt(0) == i[3].charAt(1) ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0) + i[3].charAt(0) : i.join("")
                            }(this._r, this._g, this._b, this._a, e)
                        },
                        toHex8String: function(e) {
                            return "#" + this.toHex8(e)
                        },
                        toRgb: function() {
                            return {
                                r: P(this._r),
                                g: P(this._g),
                                b: P(this._b),
                                a: this._a
                            }
                        },
                        toRgbString: function() {
                            return 1 == this._a ? "rgb(" + P(this._r) + ", " + P(this._g) + ", " + P(this._b) + ")" : "rgba(" + P(this._r) + ", " + P(this._g) + ", " + P(this._b) + ", " + this._roundA + ")"
                        },
                        toPercentageRgb: function() {
                            return {
                                r: P(100 * T(this._r, 255)) + "%",
                                g: P(100 * T(this._g, 255)) + "%",
                                b: P(100 * T(this._b, 255)) + "%",
                                a: this._a
                            }
                        },
                        toPercentageRgbString: function() {
                            return 1 == this._a ? "rgb(" + P(100 * T(this._r, 255)) + "%, " + P(100 * T(this._g, 255)) + "%, " + P(100 * T(this._b, 255)) + "%)" : "rgba(" + P(100 * T(this._r, 255)) + "%, " + P(100 * T(this._g, 255)) + "%, " + P(100 * T(this._b, 255)) + "%, " + this._roundA + ")"
                        },
                        toName: function() {
                            return 0 === this._a ? "transparent" : !(this._a < 1) && (F[u(this._r, this._g, this._b, !0)] || !1)
                        },
                        toFilter: function(e) {
                            var t = "#" + c(this._r, this._g, this._b, this._a)
                              , n = t
                              , o = this._gradientType ? "GradientType = 1, " : "";
                            if (e) {
                                var r = i(e);
                                n = "#" + c(r._r, r._g, r._b, r._a)
                            }
                            return "progid:DXImageTransform.Microsoft.gradient(" + o + "startColorstr=" + t + ",endColorstr=" + n + ")"
                        },
                        toString: function(e) {
                            var t = !!e;
                            e = e || this._format;
                            var n = !1
                              , o = this._a < 1 && this._a >= 0;
                            return t || !o || "hex" !== e && "hex6" !== e && "hex3" !== e && "hex4" !== e && "hex8" !== e && "name" !== e ? ("rgb" === e && (n = this.toRgbString()),
                            "prgb" === e && (n = this.toPercentageRgbString()),
                            "hex" !== e && "hex6" !== e || (n = this.toHexString()),
                            "hex3" === e && (n = this.toHexString(!0)),
                            "hex4" === e && (n = this.toHex8String(!0)),
                            "hex8" === e && (n = this.toHex8String()),
                            "name" === e && (n = this.toName()),
                            "hsl" === e && (n = this.toHslString()),
                            "hsv" === e && (n = this.toHsvString()),
                            n || this.toHexString()) : "name" === e && 0 === this._a ? this.toName() : this.toRgbString()
                        },
                        clone: function() {
                            return i(this.toString())
                        },
                        _applyModification: function(e, t) {
                            var n = e.apply(null, [this].concat([].slice.call(t)));
                            return this._r = n._r,
                            this._g = n._g,
                            this._b = n._b,
                            this.setAlpha(n._a),
                            this
                        },
                        lighten: function() {
                            return this._applyModification(g, arguments)
                        },
                        brighten: function() {
                            return this._applyModification(h, arguments)
                        },
                        darken: function() {
                            return this._applyModification(b, arguments)
                        },
                        desaturate: function() {
                            return this._applyModification(d, arguments)
                        },
                        saturate: function() {
                            return this._applyModification(p, arguments)
                        },
                        greyscale: function() {
                            return this._applyModification(f, arguments)
                        },
                        spin: function() {
                            return this._applyModification(m, arguments)
                        },
                        _applyCombination: function(e, t) {
                            return e.apply(null, [this].concat([].slice.call(t)))
                        },
                        analogous: function() {
                            return this._applyCombination(w, arguments)
                        },
                        complement: function() {
                            return this._applyCombination(y, arguments)
                        },
                        monochromatic: function() {
                            return this._applyCombination(x, arguments)
                        },
                        splitcomplement: function() {
                            return this._applyCombination(S, arguments)
                        },
                        triad: function() {
                            return this._applyCombination(v, arguments)
                        },
                        tetrad: function() {
                            return this._applyCombination(k, arguments)
                        }
                    },
                    i.fromRatio = function(e, t) {
                        if ("object" == typeof e) {
                            var n = {};
                            for (var o in e)
                                e.hasOwnProperty(o) && (n[o] = "a" === o ? e[o] : C(e[o]));
                            e = n
                        }
                        return i(e, t)
                    }
                    ,
                    i.equals = function(e, t) {
                        return !!e && !!t && i(e).toRgbString() == i(t).toRgbString()
                    }
                    ,
                    i.random = function() {
                        return i.fromRatio({
                            r: j(),
                            g: j(),
                            b: j()
                        })
                    }
                    ,
                    i.mix = function(e, t, n) {
                        n = 0 === n ? 0 : n || 50;
                        var o = i(e).toRgb()
                          , r = i(t).toRgb()
                          , a = n / 100;
                        return i({
                            r: (r.r - o.r) * a + o.r,
                            g: (r.g - o.g) * a + o.g,
                            b: (r.b - o.b) * a + o.b,
                            a: (r.a - o.a) * a + o.a
                        })
                    }
                    ,
                    i.readability = function(e, t) {
                        var n = i(e)
                          , o = i(t);
                        return (r.max(n.getLuminance(), o.getLuminance()) + .05) / (r.min(n.getLuminance(), o.getLuminance()) + .05)
                    }
                    ,
                    i.isReadable = function(e, t, n) {
                        var o, r, a = i.readability(e, t);
                        switch (r = !1,
                        o = function(e) {
                            var t, n;
                            return "AA" !== (t = ((e = e || {
                                level: "AA",
                                size: "small"
                            }).level || "AA").toUpperCase()) && "AAA" !== t && (t = "AA"),
                            "small" !== (n = (e.size || "small").toLowerCase()) && "large" !== n && (n = "small"),
                            {
                                level: t,
                                size: n
                            }
                        }(n),
                        o.level + o.size) {
                        case "AAsmall":
                        case "AAAlarge":
                            r = a >= 4.5;
                            break;
                        case "AAlarge":
                            r = a >= 3;
                            break;
                        case "AAAsmall":
                            r = a >= 7
                        }
                        return r
                    }
                    ,
                    i.mostReadable = function(e, t, n) {
                        var o, r, a, s, l = null, u = 0;
                        r = (n = n || {}).includeFallbackColors,
                        a = n.level,
                        s = n.size;
                        for (var c = 0; c < t.length; c++)
                            (o = i.readability(e, t[c])) > u && (u = o,
                            l = i(t[c]));
                        return i.isReadable(e, l, {
                            level: a,
                            size: s
                        }) || !r ? l : (n.includeFallbackColors = !1,
                        i.mostReadable(e, ["#fff", "#000"], n))
                    }
                    ;
                    var H = i.names = {
                        aliceblue: "f0f8ff",
                        antiquewhite: "faebd7",
                        aqua: "0ff",
                        aquamarine: "7fffd4",
                        azure: "f0ffff",
                        beige: "f5f5dc",
                        bisque: "ffe4c4",
                        black: "000",
                        blanchedalmond: "ffebcd",
                        blue: "00f",
                        blueviolet: "8a2be2",
                        brown: "a52a2a",
                        burlywood: "deb887",
                        burntsienna: "ea7e5d",
                        cadetblue: "5f9ea0",
                        chartreuse: "7fff00",
                        chocolate: "d2691e",
                        coral: "ff7f50",
                        cornflowerblue: "6495ed",
                        cornsilk: "fff8dc",
                        crimson: "dc143c",
                        cyan: "0ff",
                        darkblue: "00008b",
                        darkcyan: "008b8b",
                        darkgoldenrod: "b8860b",
                        darkgray: "a9a9a9",
                        darkgreen: "006400",
                        darkgrey: "a9a9a9",
                        darkkhaki: "bdb76b",
                        darkmagenta: "8b008b",
                        darkolivegreen: "556b2f",
                        darkorange: "ff8c00",
                        darkorchid: "9932cc",
                        darkred: "8b0000",
                        darksalmon: "e9967a",
                        darkseagreen: "8fbc8f",
                        darkslateblue: "483d8b",
                        darkslategray: "2f4f4f",
                        darkslategrey: "2f4f4f",
                        darkturquoise: "00ced1",
                        darkviolet: "9400d3",
                        deeppink: "ff1493",
                        deepskyblue: "00bfff",
                        dimgray: "696969",
                        dimgrey: "696969",
                        dodgerblue: "1e90ff",
                        firebrick: "b22222",
                        floralwhite: "fffaf0",
                        forestgreen: "228b22",
                        fuchsia: "f0f",
                        gainsboro: "dcdcdc",
                        ghostwhite: "f8f8ff",
                        gold: "ffd700",
                        goldenrod: "daa520",
                        gray: "808080",
                        green: "008000",
                        greenyellow: "adff2f",
                        grey: "808080",
                        honeydew: "f0fff0",
                        hotpink: "ff69b4",
                        indianred: "cd5c5c",
                        indigo: "4b0082",
                        ivory: "fffff0",
                        khaki: "f0e68c",
                        lavender: "e6e6fa",
                        lavenderblush: "fff0f5",
                        lawngreen: "7cfc00",
                        lemonchiffon: "fffacd",
                        lightblue: "add8e6",
                        lightcoral: "f08080",
                        lightcyan: "e0ffff",
                        lightgoldenrodyellow: "fafad2",
                        lightgray: "d3d3d3",
                        lightgreen: "90ee90",
                        lightgrey: "d3d3d3",
                        lightpink: "ffb6c1",
                        lightsalmon: "ffa07a",
                        lightseagreen: "20b2aa",
                        lightskyblue: "87cefa",
                        lightslategray: "789",
                        lightslategrey: "789",
                        lightsteelblue: "b0c4de",
                        lightyellow: "ffffe0",
                        lime: "0f0",
                        limegreen: "32cd32",
                        linen: "faf0e6",
                        magenta: "f0f",
                        maroon: "800000",
                        mediumaquamarine: "66cdaa",
                        mediumblue: "0000cd",
                        mediumorchid: "ba55d3",
                        mediumpurple: "9370db",
                        mediumseagreen: "3cb371",
                        mediumslateblue: "7b68ee",
                        mediumspringgreen: "00fa9a",
                        mediumturquoise: "48d1cc",
                        mediumvioletred: "c71585",
                        midnightblue: "191970",
                        mintcream: "f5fffa",
                        mistyrose: "ffe4e1",
                        moccasin: "ffe4b5",
                        navajowhite: "ffdead",
                        navy: "000080",
                        oldlace: "fdf5e6",
                        olive: "808000",
                        olivedrab: "6b8e23",
                        orange: "ffa500",
                        orangered: "ff4500",
                        orchid: "da70d6",
                        palegoldenrod: "eee8aa",
                        palegreen: "98fb98",
                        paleturquoise: "afeeee",
                        palevioletred: "db7093",
                        papayawhip: "ffefd5",
                        peachpuff: "ffdab9",
                        peru: "cd853f",
                        pink: "ffc0cb",
                        plum: "dda0dd",
                        powderblue: "b0e0e6",
                        purple: "800080",
                        rebeccapurple: "663399",
                        red: "f00",
                        rosybrown: "bc8f8f",
                        royalblue: "4169e1",
                        saddlebrown: "8b4513",
                        salmon: "fa8072",
                        sandybrown: "f4a460",
                        seagreen: "2e8b57",
                        seashell: "fff5ee",
                        sienna: "a0522d",
                        silver: "c0c0c0",
                        skyblue: "87ceeb",
                        slateblue: "6a5acd",
                        slategray: "708090",
                        slategrey: "708090",
                        snow: "fffafa",
                        springgreen: "00ff7f",
                        steelblue: "4682b4",
                        tan: "d2b48c",
                        teal: "008080",
                        thistle: "d8bfd8",
                        tomato: "ff6347",
                        turquoise: "40e0d0",
                        violet: "ee82ee",
                        wheat: "f5deb3",
                        white: "fff",
                        whitesmoke: "f5f5f5",
                        yellow: "ff0",
                        yellowgreen: "9acd32"
                    }
                      , F = i.hexNames = function(e) {
                        var t = {};
                        for (var n in e)
                            e.hasOwnProperty(n) && (t[e[n]] = n);
                        return t
                    }(H)
                      , W = function() {
                        var e = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)"
                          , t = "[\\s|\\(]+(" + e + ")[,|\\s]+(" + e + ")[,|\\s]+(" + e + ")\\s*\\)?"
                          , n = "[\\s|\\(]+(" + e + ")[,|\\s]+(" + e + ")[,|\\s]+(" + e + ")[,|\\s]+(" + e + ")\\s*\\)?";
                        return {
                            CSS_UNIT: new RegExp(e),
                            rgb: new RegExp("rgb" + t),
                            rgba: new RegExp("rgba" + n),
                            hsl: new RegExp("hsl" + t),
                            hsla: new RegExp("hsla" + n),
                            hsv: new RegExp("hsv" + t),
                            hsva: new RegExp("hsva" + n),
                            hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                            hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                            hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                            hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
                        }
                    }();
                    void 0 !== e && e.exports ? e.exports = i : void 0 !== (o = function() {
                        return i
                    }
                    .call(t, n, t, e)) && (e.exports = o)
                }(Math)
            }
            , function(e, t) {
                !function() {
                    "use strict";
                    var t = void 0 !== unsafeWindow && void 0 !== window.document ? window.document : {}
                      , n = void 0 !== e && e.exports
                      , o = function() {
                        for (var e, n = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], o = 0, r = n.length, i = {}; o < r; o++)
                            if ((e = n[o]) && e[1]in t) {
                                for (o = 0; o < e.length; o++)
                                    i[n[0][o]] = e[o];
                                return i
                            }
                        return !1
                    }()
                      , r = {
                        change: o.fullscreenchange,
                        error: o.fullscreenerror
                    }
                      , i = {
                        request: function(e) {
                            return new Promise(function(n, r) {
                                var i = function() {
                                    this.off("change", i),
                                    n()
                                }
                                .bind(this);
                                this.on("change", i),
                                e = e || t.documentElement,
                                Promise.resolve(e[o.requestFullscreen]()).catch(r)
                            }
                            .bind(this))
                        },
                        exit: function() {
                            return new Promise(function(e, n) {
                                if (this.isFullscreen) {
                                    var r = function() {
                                        this.off("change", r),
                                        e()
                                    }
                                    .bind(this);
                                    this.on("change", r),
                                    Promise.resolve(t[o.exitFullscreen]()).catch(n)
                                } else
                                    e()
                            }
                            .bind(this))
                        },
                        toggle: function(e) {
                            return this.isFullscreen ? this.exit() : this.request(e)
                        },
                        onchange: function(e) {
                            this.on("change", e)
                        },
                        onerror: function(e) {
                            this.on("error", e)
                        },
                        on: function(e, n) {
                            var o = r[e];
                            o && t.addEventListener(o, n, !1)
                        },
                        off: function(e, n) {
                            var o = r[e];
                            o && t.removeEventListener(o, n, !1)
                        },
                        raw: o
                    };
                    o ? (Object.defineProperties(i, {
                        isFullscreen: {
                            get: function() {
                                return Boolean(t[o.fullscreenElement])
                            }
                        },
                        element: {
                            enumerable: !0,
                            get: function() {
                                return t[o.fullscreenElement]
                            }
                        },
                        isEnabled: {
                            enumerable: !0,
                            get: function() {
                                return Boolean(t[o.fullscreenEnabled])
                            }
                        }
                    }),
                    n ? e.exports = i : window.screenfull = i) : n ? e.exports = {
                        isEnabled: !1
                    } : window.screenfull = {
                        isEnabled: !1
                    }
                }()
            }
            , function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var o = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(n(17));
                t.default = o.default,
                e.exports = t.default
            }
            , function(e, t, n) {
                "use strict";
                function o(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1,
                            o.configurable = !0,
                            "value"in o && (o.writable = !0),
                            Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n),
                        o && e(t, o),
                        t
                    }
                }()
                  , i = o(n(0))
                  , a = o(n(23))
                  , s = o(n(9))
                  , l = n(1)
                  , u = n(24)
                  , c = n(72)
                  , d = n(74)
                  , p = n(77)
                  , f = o(n(15))
                  , g = n(79)
                  , h = function() {
                    function e(t) {
                        !function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                        this.opts = t,
                        this.hasRoot = void 0 !== t.root,
                        t.width = t.width || 300,
                        t.root = t.root || document.body,
                        t.align = t.align || "left",
                        t.opacity = t.opacity || 1,
                        t.barMode = t.barMode || "offset",
                        t.panelMode = t.panelMode || "inner",
                        t.pollRateMS = t.pollRateMS || 100,
                        t.open = t.open || !1;
                        var n = t.theme;
                        void 0 === t.theme && (n = s.default.dark),
                        (0,
                        a.default)(t.theme) && (void 0 === s.default[t.theme] ? (console.error("There is no theme preset with the name '" + t.theme + "'! Defaulting to dark theme."),
                        n = s.default.dark) : n = s.default[t.theme]),
                        l.theme.Set(n),
                        this._ConstructElements(),
                        this._LoadStyles(),
                        this.componentManager = new u.ComponentManager,
                        this.loadedComponents = [],
                        this._UpdateComponents()
                    }
                    return r(e, [{
                        key: "_LoadStyles",
                        value: function() {
                            function e(e) {
                                var t = document.createElement("style");
                                t.setAttribute("type", "text/css"),
                                t.setAttribute("rel", "stylesheet"),
                                t.setAttribute("href", e),
                                document.getElementsByTagName("head")[0].appendChild(t)
                            }
                            e("//cdn.jsdelivr.net/font-hack/2.019/css/hack.min.css"),
                            l.theme.font ? (l.theme.font.fontURL && e(l.theme.font.fontURL),
                            l.theme.font.fontFamily && (0,
                            i.default)(this.container, "font-family", l.theme.font.fontFamily),
                            l.theme.font.fontSize && (0,
                            i.default)(this.container, "font-size", l.theme.font.fontSize),
                            l.theme.font.fontWeight && (0,
                            i.default)(this.container, "font-weight", l.theme.font.fontWeight)) : (0,
                            i.default)(this.container, "font-family", "'Hack', monospace")
                        }
                    }, {
                        key: "_ConstructElements",
                        value: function() {
                            var e = this;
                            this.container = document.createElement("div"),
                            this.container.classList.add(g["guify-container"]);
                            var t = {};
                            "overlay" != this.opts.barMode && "above" != this.opts.barMode && "none" != this.opts.barMode || (t.position = "absolute"),
                            this.hasRoot && "above" == this.opts.barMode && (t.top = "-" + l.theme.sizing.menuBarHeight),
                            (0,
                            i.default)(this.container, t),
                            this.opts.root.insertBefore(this.container, this.opts.root.childNodes[0]),
                            "none" !== this.opts.barMode && (this.bar = new c.MenuBar(this.container,this.opts),
                            this.bar.addListener("ontogglepanel", (function() {
                                e.panel.ToggleVisible()
                            }
                            )),
                            this.bar.addListener("onfullscreenrequested", (function() {
                                e.ToggleFullscreen()
                            }
                            ))),
                            this.panel = new d.Panel(this.container,this.opts),
                            "none" === this.opts.barMode || !0 === this.opts.open ? this.panel.SetVisible(!0) : this.panel.SetVisible(!1),
                            this.toaster = new p.ToastArea(this.container,this.opts)
                        }
                    }, {
                        key: "_UpdateComponents",
                        value: function() {
                            var e = this;
                            this.loadedComponents.forEach((function(e) {
                                e.binding && e.binding.object[e.binding.property] != e.oldValue && (e.SetValue(e.binding.object[e.binding.property]),
                                e.oldValue = e.binding.object[e.binding.property])
                            }
                            )),
                            setTimeout((function() {
                                window.requestAnimationFrame((function() {
                                    e._UpdateComponents()
                                }
                                ))
                            }
                            ), this.opts.pollRateMS)
                        }
                    }, {
                        key: "Register",
                        value: function(e) {
                            var t = this
                              , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            if (!Array.isArray(e)) {
                                var o = Object.assign(e, n);
                                return this._Register(o)
                            }
                            e.forEach((function(e) {
                                var o = Object.assign(e, n);
                                t._Register(o)
                            }
                            ))
                        }
                    }, {
                        key: "Remove",
                        value: function(e) {
                            e.Remove(),
                            this.loadedComponents = this.loadedComponents.filter((function(t) {
                                return t !== e
                            }
                            ))
                        }
                    }, {
                        key: "_Register",
                        value: function(e) {
                            if (e.object && e.property && void 0 === e.object[e.property])
                                throw new Error("Object " + e.object + " has no property '" + e.property + "'");
                            e.object && e.property && (e.initial = e.object[e.property]);
                            var t = this.panel.panel;
                            if (e.folder) {
                                var n = this.loadedComponents.find((function(t) {
                                    return "folder" === t.opts.type && t.opts.label === e.folder
                                }
                                ));
                                if (!n)
                                    throw new Error("No folder exists with the name " + e.folder);
                                t = n.folderContainer
                            }
                            var o = this.componentManager.Create(t, e);
                            return e.object && e.property && (o.binding = {
                                object: e.object,
                                property: e.property
                            }),
                            o.on && (o.on("initialized", (function(t) {
                                e.onInitialize && e.onInitialize(t)
                            }
                            )),
                            o.on("input", (function(t) {
                                e.object && e.property && (e.object[e.property] = t),
                                e.onChange && e.onChange(t)
                            }
                            ))),
                            this.loadedComponents.push(o),
                            o
                        }
                    }, {
                        key: "Toast",
                        value: function(e, t=5e3, n=0) {
                            this.toaster.CreateToast(e, t, n)
                        }
                    }, {
                        key: "ToggleFullscreen",
                        value: function() {
                            f.default.isFullscreen ? f.default.exit() : (window.console.log("Request fullscreen"),
                            f.default.request(this.opts.root))
                        }
                    }]),
                    e
                }();
                t.default = h,
                e.exports = t.default
            }
            , function(e, t) {
                var n = null
                  , o = ["Webkit", "Moz", "O", "ms"];
                e.exports = function(e) {
                    n ||= document.createElement("div");
                    var t = n.style;
                    if (e in t)
                        return e;
                    for (var r = e.charAt(0).toUpperCase() + e.slice(1), i = o.length; i >= 0; i--) {
                        var a = o[i] + r;
                        if (a in t)
                            return a
                    }
                    return !1
                }
            }
            , function(e, t, n) {
                var o = n(20);
                e.exports = function(e) {
                    return o(e).replace(/\s(\w)/g, (function(e, t) {
                        return t.toUpperCase()
                    }
                    ))
                }
            }
            , function(e, t, n) {
                var o = n(21);
                e.exports = function(e) {
                    return o(e).replace(/[\W_]+(.|$)/g, (function(e, t) {
                        return t ? " " + t : ""
                    }
                    )).trim()
                }
            }
            , function(e, t) {
                e.exports = function(e) {
                    return n.test(e) ? e.toLowerCase() : o.test(e) ? (function(e) {
                        return e.replace(i, (function(e, t) {
                            return t ? " " + t : ""
                        }
                        ))
                    }(e) || e).toLowerCase() : r.test(e) ? function(e) {
                        return e.replace(a, (function(e, t, n) {
                            return t + " " + n.toLowerCase().split("").join(" ")
                        }
                        ))
                    }(e).toLowerCase() : e.toLowerCase()
                }
                ;
                var n = /\s/
                  , o = /(_|-|\.|:)/
                  , r = /([a-z][A-Z]|[A-Z][a-z])/
                  , i = /[\W_]+(.|$)/g
                  , a = /(.)([A-Z]+)/g
            }
            , function(e, t) {
                var n = {
                    animationIterationCount: !0,
                    boxFlex: !0,
                    boxFlexGroup: !0,
                    boxOrdinalGroup: !0,
                    columnCount: !0,
                    flex: !0,
                    flexGrow: !0,
                    flexPositive: !0,
                    flexShrink: !0,
                    flexNegative: !0,
                    flexOrder: !0,
                    gridRow: !0,
                    gridColumn: !0,
                    fontWeight: !0,
                    lineClamp: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    tabSize: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0,
                    fillOpacity: !0,
                    stopOpacity: !0,
                    strokeDashoffset: !0,
                    strokeOpacity: !0,
                    strokeWidth: !0
                };
                e.exports = function(e, t) {
                    return "number" != typeof t || n[e] ? t : t + "px"
                }
            }
            , function(e, t, n) {
                "use strict";
                var o = String.prototype.valueOf
                  , r = Object.prototype.toString
                  , i = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag;
                e.exports = function(e) {
                    return "string" == typeof e || "object" == typeof e && (i ? function(e) {
                        try {
                            return o.call(e),
                            !0
                        } catch (e) {
                            return !1
                        }
                    }(e) : "[object String]" === r.call(e))
                }
            }
            , function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.ComponentManager = void 0;
                var o = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1,
                            o.configurable = !0,
                            "value"in o && (o.writable = !0),
                            Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n),
                        o && e(t, o),
                        t
                    }
                }()
                  , r = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(n(25))
                  , i = n(1);
                t.ComponentManager = function() {
                    function e() {
                        !function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                        this.uuid = (0,
                        r.default)(),
                        this.components = {
                            title: n(28),
                            range: n(29),
                            button: n(46),
                            checkbox: n(48),
                            select: n(50),
                            text: n(52),
                            color: n(53),
                            folder: n(65),
                            file: n(67),
                            display: n(69),
                            interval: n(70)
                        }
                    }
                    return o(e, [{
                        key: "Create",
                        value: function(e, t) {
                            if (void 0 === this.components[t.type])
                                throw new Error("No component type named '" + t.type + "' exists.");
                            var n = new this.components[t.type](e,t,i.theme,this.uuid);
                            return Object.assign(n, {
                                Remove: function() {
                                    this.container.parentNode.removeChild(this.container)
                                }
                            }),
                            n
                        }
                    }]),
                    e
                }()
            }
            , function(e, t, n) {
                var o = n(26)
                  , r = n(27);
                e.exports = function(e, t, n) {
                    var i = t && n || 0;
                    "string" == typeof e && (t = "binary" === e ? new Array(16) : null,
                    e = null);
                    var a = (e = e || {}).random || (e.rng || o)();
                    if (a[6] = 15 & a[6] | 64,
                    a[8] = 63 & a[8] | 128,
                    t)
                        for (var s = 0; s < 16; ++s)
                            t[i + s] = a[s];
                    return t || r(a)
                }
            }
            , function(e, t) {
                var n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
                if (n) {
                    var o = new Uint8Array(16);
                    e.exports = function() {
                        return n(o),
                        o
                    }
                } else {
                    var r = new Array(16);
                    e.exports = function() {
                        for (var e, t = 0; t < 16; t++)
                            0 == (3 & t) && (e = 4294967296 * Math.random()),
                            r[t] = e >>> ((3 & t) << 3) & 255;
                        return r
                    }
                }
            }
            , function(e, t) {
                for (var n = [], o = 0; o < 256; ++o)
                    n[o] = (o + 256).toString(16).substr(1);
                e.exports = function(e, t) {
                    var o = t || 0
                      , r = n;
                    return [r[e[o++]], r[e[o++]], r[e[o++]], r[e[o++]], "-", r[e[o++]], r[e[o++]], "-", r[e[o++]], r[e[o++]], "-", r[e[o++]], r[e[o++]], "-", r[e[o++]], r[e[o++]], r[e[o++]], r[e[o++]], r[e[o++]], r[e[o++]]].join("")
                }
            }
            , function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var o = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(n(0));
                t.default = function e(t, r, i) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.opts = r,
                    this.container = n(2)(t, r.label, i),
                    (0,
                    o.default)(this.container, {});
                    var a = this.container.appendChild(document.createElement("div"));
                    (0,
                    o.default)(a, {
                        "box-sizing": "border-box",
                        width: "100%",
                        display: "inline-block",
                        height: i.sizing.componentHeight,
                        verticalAlign: "top"
                    });
                    var s = a.appendChild(document.createElement("div"));
                    s.innerHTML = "&#9632; " + r.label + " &#9632;",
                    (0,
                    o.default)(s, {
                        display: "inline-block",
                        verticalAlign: "sub",
                        height: i.sizing.componentHeight,
                        "line-height": i.sizing.componentHeight,
                        "padding-left": "5px",
                        "padding-right": "5px",
                        "background-color": i.colors.textPrimary,
                        color: i.colors.panelBackground
                    })
                }
                ,
                e.exports = t.default
            }
            , function(e, t, n) {
                "use strict";
                function o(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1,
                            o.configurable = !0,
                            "value"in o && (o.writable = !0),
                            Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n),
                        o && e(t, o),
                        t
                    }
                }()
                  , i = o(n(4))
                  , a = o(n(0))
                  , s = o(n(10))
                  , l = n(30)
                  , u = function(e) {
                    function t(e, o, r, i) {
                        !function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        var u = function(e, t) {
                            if (!e)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !t || "object" != typeof t && "function" != typeof t ? e : t
                        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                        if (u.opts = o,
                        u.container = n(2)(e, o.label, r),
                        n(5)(u.container, o.label, r),
                        o.step && o.steps)
                            throw new Error("Cannot specify both step and steps. Got step = " + o.step + ", steps = ",o.steps);
                        if (u.input = u.container.appendChild(document.createElement("input")),
                        u.input.type = "range",
                        u.input.className = l["guify-range"],
                        o.label && u.input.setAttribute("aria-label", o.label + " input"),
                        "log" === o.scale) {
                            if (o.max = (0,
                            s.default)(o.max) ? o.max : 100,
                            o.min = (0,
                            s.default)(o.min) ? o.min : .1,
                            o.min * o.max <= 0)
                                throw new Error("Log range min/max must have the same sign and not equal zero. Got min = " + o.min + ", max = " + o.max);
                            if (u.logmin = o.min,
                            u.logmax = o.max,
                            u.logsign = o.min > 0 ? 1 : -1,
                            u.logmin = Math.abs(u.logmin),
                            u.logmax = Math.abs(u.logmax),
                            o.min = 0,
                            o.max = 100,
                            (0,
                            s.default)(o.step))
                                throw new Error("Log may only use steps (integer number of steps), not a step value. Got step =" + o.step);
                            if (o.step = 1,
                            o.initial = u.InverseScaleValue((0,
                            s.default)(o.initial) ? o.initial : scaleValue(.5 * (o.min + o.max))),
                            o.initial * u.InverseScaleValue(o.max) <= 0)
                                throw new Error("Log range initial value must have the same sign as min/max and must not equal zero. Got initial value = " + o.initial)
                        } else
                            o.max = (0,
                            s.default)(o.max) ? o.max : 100,
                            o.min = (0,
                            s.default)(o.min) ? o.min : 0,
                            o.step = (0,
                            s.default)(o.step) ? o.step : .01,
                            o.initial = (0,
                            s.default)(o.initial) ? o.initial : .5 * (o.min + o.max);
                        (0,
                        s.default)(o.steps) && (o.step = (0,
                        s.default)(o.steps) ? (o.max - o.min) / o.steps : o.step);
                        var c = Math.round((o.initial - o.min) / o.step);
                        return o.initial = o.min + o.step * c,
                        u.input.min = o.min,
                        u.input.max = o.max,
                        u.input.step = o.step,
                        u.input.value = o.initial,
                        (0,
                        a.default)(u.input, {
                            width: "calc(100% - " + r.sizing.labelWidth + " - 16% - 0.5em)"
                        }),
                        u.valueComponent = n(6)(u.container, u.ScaleValue(o.initial), r, "16%"),
                        o.label && u.valueComponent.setAttribute("aria-label", o.label + " value"),
                        setTimeout((function() {
                            u.emit("initialized", parseFloat(u.input.value))
                        }
                        )),
                        u.userIsModifying = !1,
                        u.input.addEventListener("focus", (function() {
                            u.focused = !0
                        }
                        )),
                        u.input.addEventListener("blur", (function() {
                            u.focused = !1
                        }
                        )),
                        u.input.addEventListener("mouseup", (function() {
                            u.input.blur()
                        }
                        )),
                        u.input.oninput = function(e) {
                            var t = u.ScaleValue(parseFloat(e.target.value));
                            u.valueComponent.value = u.FormatNumber(t),
                            u.lastValue = t,
                            u.emit("input", t)
                        }
                        ,
                        u.valueComponent.onchange = function() {
                            var e = u.valueComponent.value;
                            if (Number(parseFloat(e)) == e) {
                                var t = parseFloat(e);
                                t = Math.min(Math.max(t, o.min), o.max),
                                t = Math.ceil((t - o.min) / o.step) * o.step + o.min,
                                u.valueComponent.value = t,
                                u.emit("input", t)
                            } else
                                u.valueComponent.value = u.lastValue
                        }
                        ,
                        u
                    }
                    return function(e, t) {
                        if ("function" != typeof t && null !== t)
                            throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, e),
                    r(t, [{
                        key: "ScaleValue",
                        value: function(e) {
                            return "log" === this.opts.scale ? this.logsign * Math.exp(Math.log(this.logmin) + (Math.log(this.logmax) - Math.log(this.logmin)) * e / 100) : e
                        }
                    }, {
                        key: "InverseScaleValue",
                        value: function(e) {
                            return "log" === this.opts.scale ? 100 * (Math.log(e * this.logsign) - Math.log(this.logmin)) / (Math.log(this.logmax) - Math.log(this.logmin)) : e
                        }
                    }, {
                        key: "SetValue",
                        value: function(e) {
                            !0 !== this.focused && (this.valueComponent.value = this.FormatNumber(e),
                            this.input.value = this.InverseScaleValue(e),
                            this.lastValue = this.input.value)
                        }
                    }, {
                        key: "GetValue",
                        value: function() {
                            return this.input.value
                        }
                    }, {
                        key: "FormatNumber",
                        value: function(e) {
                            return e.toFixed(3).replace(/\.?0*$/, "")
                        }
                    }]),
                    t
                }(i.default);
                t.default = u,
                e.exports = t.default
            }
            , function(e, t, n) {
                "use strict";
                var o = Object.freeze(Object.defineProperties(["\n\ninput[type=range].guify-range {\n    -webkit-appearance: none;\n    width: 100%;\n    height: ", ";\n    margin: 0px 0;\n    padding: 0;\n    display: inline-block;\n}\n\n/* Remove outlines since we'll be adding our own */\ninput[type=range].guify-range:focus {\n    outline: none;\n}\ninput[type=range].guify-range::-moz-focus-outer {\n    border: 0;\n}\n\n/* Webkit */\ninput[type=range].guify-range::-webkit-slider-runnable-track {\n    width: 100%;\n    height: ", ";\n    cursor: ew-resize;\n    background: ", ";\n}\ninput[type=range].guify-range::-webkit-slider-thumb {\n    height: ", ";\n    width: 10px;\n    background: ", ";\n    cursor: ew-resize;\n    -webkit-appearance: none;\n    margin-top: 0px;\n}\ninput[type=range].guify-range:focus::-webkit-slider-runnable-track {\n    background: ", ";\n    outline: none;\n}\n\n/* Gecko */\ninput[type=range].guify-range::-moz-range-track {\n    width: 100%;\n    height: ", ";\n    cursor: ew-resize;\n    background: ", ";\n}\ninput[type=range].guify-range:focus::-moz-range-track {\n    background: ", ";\n}\ninput[type=range].guify-range::-moz-range-thumb {\n    height: ", ";\n    width: 10px;\n    background: ", ";\n    cursor: ew-resize;\n    border: none;\n    border-radius: 0;\n}\n\n/* IE */\ninput[type=range].guify-range::-ms-track {\n    width: 100%;\n    height: ", ";\n    cursor: ew-resize;\n    background: transparent;\n    border-color: transparent;\n    color: transparent;\n}\ninput[type=range].guify-range::-ms-fill-lower {\n    background: ", ";\n}\ninput[type=range].guify-range::-ms-fill-upper {\n    background: ", ";\n}\ninput[type=range].guify-range:focus::-ms-fill-lower {\n    background: ", ";\n}\ninput[type=range].guify-range:focus::-ms-fill-upper {\n    background: ", ";\n}\ninput[type=range].guify-range::-ms-thumb {\n    width: 10px;\n    border-radius: 0px;\n    background: ", ";\n    cursor: ew-resize;\n    height: ", ";\n}\ninput[type=range].guify-range:focus::-ms-fill-lower {\n    background: ", ";\n    outline: none;\n}\ninput[type=range].guify-range:focus::-ms-fill-upper {\n    background: ", ";\n    outline: none;\n}\n\n"], {
                    raw: {
                        value: Object.freeze(["\n\ninput[type=range].guify-range {\n    -webkit-appearance: none;\n    width: 100%;\n    height: ", ";\n    margin: 0px 0;\n    padding: 0;\n    display: inline-block;\n}\n\n/* Remove outlines since we'll be adding our own */\ninput[type=range].guify-range:focus {\n    outline: none;\n}\ninput[type=range].guify-range::-moz-focus-outer {\n    border: 0;\n}\n\n/* Webkit */\ninput[type=range].guify-range::-webkit-slider-runnable-track {\n    width: 100%;\n    height: ", ";\n    cursor: ew-resize;\n    background: ", ";\n}\ninput[type=range].guify-range::-webkit-slider-thumb {\n    height: ", ";\n    width: 10px;\n    background: ", ";\n    cursor: ew-resize;\n    -webkit-appearance: none;\n    margin-top: 0px;\n}\ninput[type=range].guify-range:focus::-webkit-slider-runnable-track {\n    background: ", ";\n    outline: none;\n}\n\n/* Gecko */\ninput[type=range].guify-range::-moz-range-track {\n    width: 100%;\n    height: ", ";\n    cursor: ew-resize;\n    background: ", ";\n}\ninput[type=range].guify-range:focus::-moz-range-track {\n    background: ", ";\n}\ninput[type=range].guify-range::-moz-range-thumb {\n    height: ", ";\n    width: 10px;\n    background: ", ";\n    cursor: ew-resize;\n    border: none;\n    border-radius: 0;\n}\n\n/* IE */\ninput[type=range].guify-range::-ms-track {\n    width: 100%;\n    height: ", ";\n    cursor: ew-resize;\n    background: transparent;\n    border-color: transparent;\n    color: transparent;\n}\ninput[type=range].guify-range::-ms-fill-lower {\n    background: ", ";\n}\ninput[type=range].guify-range::-ms-fill-upper {\n    background: ", ";\n}\ninput[type=range].guify-range:focus::-ms-fill-lower {\n    background: ", ";\n}\ninput[type=range].guify-range:focus::-ms-fill-upper {\n    background: ", ";\n}\ninput[type=range].guify-range::-ms-thumb {\n    width: 10px;\n    border-radius: 0px;\n    background: ", ";\n    cursor: ew-resize;\n    height: ", ";\n}\ninput[type=range].guify-range:focus::-ms-fill-lower {\n    background: ", ";\n    outline: none;\n}\ninput[type=range].guify-range:focus::-ms-fill-upper {\n    background: ", ";\n    outline: none;\n}\n\n"])
                    }
                }))
                  , r = n(1)
                  , i = n(3)
                  , a = r.theme.colors.componentBackground
                  , s = r.theme.colors.componentForeground
                  , l = r.theme.colors.componentActive;
                e.exports = i(o, r.theme.sizing.componentHeight, r.theme.sizing.componentHeight, a, r.theme.sizing.componentHeight, s, l, r.theme.sizing.componentHeight, a, l, r.theme.sizing.componentHeight, s, r.theme.sizing.componentHeight, a, a, l, l, s, r.theme.sizing.componentHeight, l, l)
            }
            , function(e, t, n) {
                "use strict";
                (function(t) {
                    var o = n(33)
                      , r = n(13);
                    e.exports = function() {
                        var e = Array.prototype.slice.call(arguments)
                          , n = o.apply(null, e);
                        return t.document && r(o.getCss(n)),
                        n
                    }
                }
                ).call(t, n(32))
            }
            , function(e, t) {
                var n;
                n = function() {
                    return this
                }();
                try {
                    n = n || Function("return this")() || (0,
                    eval)("this")
                } catch (e) {
                    "object" == typeof unsafeWindow && (n = unsafeWindow)
                }
                e.exports = n
            }
            , function(e, t, n) {
                "use strict";
                var o = n(34);
                e.exports = o(),
                e.exports.csjs = o,
                e.exports.noScope = o({
                    noscope: !0
                }),
                e.exports.getCss = n(12)
            }
            , function(e, t, n) {
                "use strict";
                e.exports = n(35)
            }
            , function(e, t, n) {
                "use strict";
                function o(e) {
                    return s(e) ? e.selector : e
                }
                function r(e, t) {
                    return Object.keys(e).reduce((function(n, o) {
                        return t[o] || (n[o] = e[o]),
                        n
                    }
                    ), {})
                }
                var i = n(36)
                  , a = n(7)
                  , s = a.isComposition
                  , l = a.ignoreComposition
                  , u = n(37)
                  , c = n(38)
                  , d = n(11)
                  , p = n(43);
                e.exports = function(e) {
                    var t = void 0 !== (e = void 0 === e ? {} : e).noscope && e.noscope;
                    return function(e, n) {
                        n = Array(arguments.length - 1);
                        for (var a = 1; a < arguments.length; a++)
                            n[a - 1] = arguments[a];
                        var s = function(e, t) {
                            return e.map((function(e, n) {
                                return n !== t.length ? e + t[n] : e
                            }
                            )).join("")
                        }(e, n.map(o))
                          , f = l(n)
                          , g = t ? p(s) : c(s, f)
                          , h = i(g.css)
                          , b = r(g.classes, f)
                          , m = r(g.keyframes, f)
                          , y = h.compositions
                          , v = u(b, m, y);
                        return Object.defineProperty(v, d, {
                            enumerable: !1,
                            configurable: !1,
                            writeable: !1,
                            value: h.css
                        })
                    }
                }
            }
            , function(e, t, n) {
                "use strict";
                function o(e) {
                    var t = e.trim();
                    return "." === t[0] ? t.substr(1) : t
                }
                n(7).makeComposition;
                var r = /\.([^\s]+)(\s+)(extends\s+)(\.[^{]+)/g;
                e.exports = function(e) {
                    for (var t, n = []; t = r.exec(e); )
                        n.unshift(t);
                    return n.reduce((function(e, t) {
                        var n = o(t[1])
                          , r = t[3]
                          , i = t[4]
                          , a = t.index + t[1].length + t[2].length
                          , s = r.length + i.length;
                        return e.css = e.css.slice(0, a) + " " + e.css.slice(a + s + 1),
                        function(e) {
                            return e.split(",").map(o)
                        }(i).forEach((function(t) {
                            e.compositions[n] ||= {},
                            e.compositions[t] ||= {},
                            e.compositions[n][t] = e.compositions[t]
                        }
                        )),
                        e
                    }
                    ), {
                        css: e,
                        compositions: {}
                    })
                }
            }
            , function(e, t, n) {
                "use strict";
                var o = n(7).makeComposition;
                e.exports = function(e, t, n) {
                    var r = Object.keys(t).reduce((function(e, n) {
                        var r = t[n];
                        return e[r] = o([n], [r], !0),
                        e
                    }
                    ), {});
                    return Object.keys(e).reduce((function(t, r) {
                        var i = e[r]
                          , a = n[r]
                          , s = a ? function(e) {
                            var t = {}
                              , n = [];
                            return function e(o) {
                                return Object.keys(o).forEach((function(r) {
                                    t[r] || (t[r] = !0,
                                    n.push(r),
                                    e(o[r]))
                                }
                                ))
                            }(e),
                            n
                        }(a) : []
                          , l = [r].concat(s)
                          , u = l.map((function(t) {
                            return e[t] ? e[t] : t
                        }
                        ));
                        return t[i] = o(l, u),
                        t
                    }
                    ), r)
                }
            }
            , function(e, t, n) {
                "use strict";
                var o = n(39)
                  , r = n(42)
                  , i = n(8)
                  , a = i.classRegex
                  , s = i.keyframesRegex;
                e.exports = function(e, t) {
                    var n = o(e)
                      , i = {
                        classes: a,
                        keyframes: s
                    }
                      , l = Object.keys(i).reduce((function(e, o) {
                        var r = i[o];
                        return {
                            css: e.css.replace(r, (function(r, i, a) {
                                var s = t[a] ? a : n(a);
                                return e[o][s] = a,
                                i + s
                            }
                            )),
                            keyframes: e.keyframes,
                            classes: e.classes
                        }
                    }
                    ), {
                        css: e,
                        keyframes: {},
                        classes: {}
                    });
                    return r(l)
                }
            }
            , function(e, t, n) {
                "use strict";
                var o = n(40)
                  , r = n(41);
                e.exports = function(e) {
                    var t = o(r(e));
                    return function(e) {
                        return e + "_" + t
                    }
                }
            }
            , function(e, t, n) {
                "use strict";
                e.exports = function(e) {
                    if (0 === e)
                        return "0";
                    for (var t = ""; e > 0; )
                        t = "015uyvefmcd2DkAeM9PLGKt11yMBdfcuERQnnTGFMk-FffhfGJrbQqy2nyMXYZ"[e % 62] + t,
                        e = Math.floor(e / 62);
                    return t
                }
            }
            , function(e, t, n) {
                "use strict";
                e.exports = function(e) {
                    for (var t = 5381, n = e.length; n; )
                        t = 33 * t ^ e.charCodeAt(--n);
                    return t >>> 0
                }
            }
            , function(e, t, n) {
                var o = n(8).ignoreComments;
                e.exports = function(e) {
                    var t = Object.keys(e.keyframes).reduce((function(t, n) {
                        return t[e.keyframes[n]] = n,
                        t
                    }
                    ), {})
                      , n = Object.keys(t);
                    if (n.length) {
                        var r = "((?:animation|animation-name)\\s*:[^};]*)(" + n.join("|") + ")([;\\s])" + o
                          , i = new RegExp(r,"g");
                        return {
                            css: e.css.replace(i, (function(e, n, o, r) {
                                return n + t[o] + r
                            }
                            )),
                            keyframes: e.keyframes,
                            classes: e.classes
                        }
                    }
                    return e
                }
            }
            , function(e, t, n) {
                "use strict";
                function o(e, t) {
                    for (var n, o = {}; null !== (n = t.exec(e)); ) {
                        var r = n[2];
                        o[r] = r
                    }
                    return o
                }
                var r = n(8)
                  , i = r.classRegex
                  , a = r.keyframesRegex;
                e.exports = function(e) {
                    return {
                        css: e,
                        keyframes: o(e, a),
                        classes: o(e, i)
                    }
                }
            }
            , function(e, t, n) {
                "use strict";
                var o = n(11);
                e.exports = function(e) {
                    return e[o]
                }
            }
            , function(e, t, n) {
                "use strict";
                e.exports = n(12)
            }
            , function(e, t, n) {
                "use strict";
                function o(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = o(n(4));
                o(n(0));
                var i = n(47)
                  , a = function(e) {
                    function t(e, o, r, a) {
                        !function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        var s = function(e, t) {
                            if (!e)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !t || "object" != typeof t && "function" != typeof t ? e : t
                        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                        s.opts = o,
                        s.container = n(2)(e, o.label, r),
                        n(5)(s.container, "", r);
                        var l = s.container.appendChild(document.createElement("button"));
                        return l.className = i["guify-button"],
                        l.textContent = o.label,
                        l.addEventListener("click", o.action),
                        l.addEventListener("mouseup", (function() {
                            l.blur()
                        }
                        )),
                        s
                    }
                    return function(e, t) {
                        if ("function" != typeof t && null !== t)
                            throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, e),
                    t
                }(r.default);
                t.default = a,
                e.exports = t.default
            }
            , function(e, t, n) {
                "use strict";
                var o = Object.freeze(Object.defineProperties(["\n\n.guify-button {\n    box-sizing: border-box !important;\n    color: ", ";\n    background-color: ", ";\n\n    position: absolute;\n    text-align: center;\n    height: ", ";\n    line-height: ", ";\n    padding-top: 0px;\n    padding-bottom: 0px;\n    width: calc(100% - ", ");\n    border: none;\n    cursor: pointer;\n    right: 0;\n    font-family: inherit;\n}\n\n\n.guify-button:focus {\n    outline:none;\n}\n.guify-button::-moz-focus-inner {\n    border:0;\n}\n\n.guify-button:hover,\n.guify-button:focus {\n    color: ", ";\n    background-color: ", ";\n}\n\n.guify-button:active {\n    color: ", " !important;\n    background-color: ", " !important;\n}\n\n"], {
                    raw: {
                        value: Object.freeze(["\n\n.guify-button {\n    box-sizing: border-box !important;\n    color: ", ";\n    background-color: ", ";\n\n    position: absolute;\n    text-align: center;\n    height: ", ";\n    line-height: ", ";\n    padding-top: 0px;\n    padding-bottom: 0px;\n    width: calc(100% - ", ");\n    border: none;\n    cursor: pointer;\n    right: 0;\n    font-family: inherit;\n}\n\n\n.guify-button:focus {\n    outline:none;\n}\n.guify-button::-moz-focus-inner {\n    border:0;\n}\n\n.guify-button:hover,\n.guify-button:focus {\n    color: ", ";\n    background-color: ", ";\n}\n\n.guify-button:active {\n    color: ", " !important;\n    background-color: ", " !important;\n}\n\n"])
                    }
                }))
                  , r = n(1)
                  , i = n(3);
                e.exports = i(o, r.theme.colors.textSecondary, r.theme.colors.componentBackground, r.theme.sizing.componentHeight, r.theme.sizing.componentHeight, r.theme.sizing.labelWidth, r.theme.colors.textHover, r.theme.colors.componentForeground, r.theme.colors.textActive, r.theme.colors.componentActive)
            }
            , function(e, t, n) {
                "use strict";
                function o(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1,
                            o.configurable = !0,
                            "value"in o && (o.writable = !0),
                            Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n),
                        o && e(t, o),
                        t
                    }
                }()
                  , i = o(n(4));
                o(n(0));
                var a = n(49)
                  , s = function(e) {
                    function t(e, o, r, i) {
                        !function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        var s = function(e, t) {
                            if (!e)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !t || "object" != typeof t && "function" != typeof t ? e : t
                        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                        return s.opts = o,
                        s.container = n(2)(e, o.label, r),
                        n(5)(s.container, o.label, r),
                        s.input = s.container.appendChild(document.createElement("input")),
                        s.input.id = "checkbox-" + o.label + i,
                        s.input.type = "checkbox",
                        s.input.checked = o.initial,
                        s.input.className = a["guify-checkbox"],
                        o.label && s.input.setAttribute("aria-label", o.label),
                        s.container.appendChild(document.createElement("label")).htmlFor = s.input.id,
                        setTimeout((function() {
                            s.emit("initialized", s.input.checked)
                        }
                        )),
                        s.input.onchange = function(e) {
                            s.emit("input", e.target.checked)
                        }
                        ,
                        s
                    }
                    return function(e, t) {
                        if ("function" != typeof t && null !== t)
                            throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, e),
                    r(t, [{
                        key: "SetValue",
                        value: function(e) {
                            this.input.checked = e
                        }
                    }, {
                        key: "GetValue",
                        value: function() {
                            return this.input.checked
                        }
                    }]),
                    t
                }(i.default);
                t.default = s,
                e.exports = t.default
            }
            , function(e, t, n) {
                "use strict";
                var o = Object.freeze(Object.defineProperties(['\n\ninput[type=checkbox].guify-checkbox {\n    opacity: 0;\n    appearance: none;\n    -moz-appearance: none;\n    -webkit-appearance: none;\n    margin: 0;\n    border-radius: 0;\n    cursor: pointer;\n}\n\ninput[type=checkbox].guify-checkbox + label {\n    margin: 0;\n}\n\ninput[type=checkbox].guify-checkbox + label:before {\n    content: "";\n    display: inline-block;\n    width: ', ";\n    height: ", ";\n    padding: 0;\n    margin: 0;\n    vertical-align: middle;\n    background-color: ", ";\n    border-radius: 0px;\n    cursor: pointer;\n    box-sizing: content-box;\n    -moz-box-sizing: content-box;\n    -webkit-box-sizing: content-box;\n\n}\n\n/* Hover style */\ninput[type=checkbox].guify-checkbox:hover + label:before {\n    width: calc(", " - (", " * 2));\n    height: calc(", " - (", " * 2));\n    background-color: ", ";\n    border: solid 4px ", ";\n}\n\n/* Checked style */\ninput[type=checkbox]:checked.guify-checkbox + label:before {\n    width: calc(", " - (", " * 2));\n    height: calc(", " - (", " * 2));\n    background-color: ", ";\n    border: solid ", " ", ";\n}\n\n/* Focused and checked */\ninput[type=checkbox]:checked.guify-checkbox:focus + label:before {\n    width: calc(", " - (", " * 2));\n    height: calc(", " - (", " * 2));\n    background-color: ", ";\n    border: solid ", " ", ";\n}\n\n/* Focus and unchecked */\ninput[type=checkbox].guify-checkbox:focus + label:before {\n    background-color: ", ";\n}\n\n"], {
                    raw: {
                        value: Object.freeze(['\n\ninput[type=checkbox].guify-checkbox {\n    opacity: 0;\n    appearance: none;\n    -moz-appearance: none;\n    -webkit-appearance: none;\n    margin: 0;\n    border-radius: 0;\n    cursor: pointer;\n}\n\ninput[type=checkbox].guify-checkbox + label {\n    margin: 0;\n}\n\ninput[type=checkbox].guify-checkbox + label:before {\n    content: "";\n    display: inline-block;\n    width: ', ";\n    height: ", ";\n    padding: 0;\n    margin: 0;\n    vertical-align: middle;\n    background-color: ", ";\n    border-radius: 0px;\n    cursor: pointer;\n    box-sizing: content-box;\n    -moz-box-sizing: content-box;\n    -webkit-box-sizing: content-box;\n\n}\n\n/* Hover style */\ninput[type=checkbox].guify-checkbox:hover + label:before {\n    width: calc(", " - (", " * 2));\n    height: calc(", " - (", " * 2));\n    background-color: ", ";\n    border: solid 4px ", ";\n}\n\n/* Checked style */\ninput[type=checkbox]:checked.guify-checkbox + label:before {\n    width: calc(", " - (", " * 2));\n    height: calc(", " - (", " * 2));\n    background-color: ", ";\n    border: solid ", " ", ";\n}\n\n/* Focused and checked */\ninput[type=checkbox]:checked.guify-checkbox:focus + label:before {\n    width: calc(", " - (", " * 2));\n    height: calc(", " - (", " * 2));\n    background-color: ", ";\n    border: solid ", " ", ";\n}\n\n/* Focus and unchecked */\ninput[type=checkbox].guify-checkbox:focus + label:before {\n    background-color: ", ";\n}\n\n"])
                    }
                }))
                  , r = n(1)
                  , i = n(3);
                e.exports = i(o, r.theme.sizing.componentHeight, r.theme.sizing.componentHeight, r.theme.colors.componentBackground, r.theme.sizing.componentHeight, "4px", r.theme.sizing.componentHeight, "4px", r.theme.colors.componentBackgroundHover, r.theme.colors.componentBackground, r.theme.sizing.componentHeight, "4px", r.theme.sizing.componentHeight, "4px", r.theme.colors.componentForeground, "4px", r.theme.colors.componentBackground, r.theme.sizing.componentHeight, "4px", r.theme.sizing.componentHeight, "4px", r.theme.colors.componentForeground, "4px", r.theme.colors.componentBackgroundHover, r.theme.colors.componentBackgroundHover)
            }
            , function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var o = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1,
                            o.configurable = !0,
                            "value"in o && (o.writable = !0),
                            Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n),
                        o && e(t, o),
                        t
                    }
                }()
                  , r = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(n(4))
                  , i = n(51)
                  , a = function(e) {
                    function t(e, o, r, a) {
                        var s, l, u, c, d, p, f;
                        !function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        var g = function(e, t) {
                            if (!e)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !t || "object" != typeof t && "function" != typeof t ? e : t
                        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                        if (g.opts = o,
                        g.container = n(2)(e, o.label, r),
                        n(5)(g.container, o.label, r),
                        g.input = document.createElement("select"),
                        g.input.className = i["guify-select-dropdown"],
                        o.label && g.input.setAttribute("aria-label", o.label),
                        (l = document.createElement("span")).classList.add(i["guify-select-triangle"], i["guify-select-triangle--down"]),
                        (u = document.createElement("span")).classList.add(i["guify-select-triangle"], i["guify-select-triangle--up"]),
                        g.container.appendChild(l),
                        g.container.appendChild(u),
                        Array.isArray(o.options))
                            for (s = 0; s < o.options.length; s++)
                                d = o.options[s],
                                (p = document.createElement("option")).value = p.textContent = d,
                                o.initial === d && (p.selected = "selected"),
                                g.input.appendChild(p);
                        else
                            for (f = Object.keys(o.options),
                            s = 0; s < f.length; s++)
                                c = f[s],
                                (p = document.createElement("option")).value = c,
                                o.initial === c && (p.selected = "selected"),
                                p.textContent = o.options[c],
                                g.input.appendChild(p);
                        function h() {
                            l.classList.add(i["guify-select-triangle--down-highlight"]),
                            u.classList.add(i["guify-select-triangle--up-highlight"])
                        }
                        function b() {
                            l.classList.remove(i["guify-select-triangle--down-highlight"]),
                            u.classList.remove(i["guify-select-triangle--up-highlight"])
                        }
                        g.container.appendChild(g.input),
                        g.input.onchange = function(e) {
                            g.emit("input", e.target.value)
                        }
                        ;
                        var m = !1;
                        return g.input.addEventListener("mouseover", h),
                        g.input.addEventListener("focus", (function() {
                            m = !0,
                            h()
                        }
                        )),
                        g.input.addEventListener("blur", (function() {
                            m = !1,
                            b()
                        }
                        )),
                        g.input.addEventListener("mouseleave", (function() {
                            m || b()
                        }
                        )),
                        g
                    }
                    return function(e, t) {
                        if ("function" != typeof t && null !== t)
                            throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, e),
                    o(t, [{
                        key: "SetValue",
                        value: function(e) {
                            this.input.value = e
                        }
                    }, {
                        key: "GetValue",
                        value: function() {
                            return this.input.value
                        }
                    }]),
                    t
                }(r.default);
                t.default = a,
                e.exports = t.default
            }
            , function(e, t, n) {
                "use strict";
                var o = Object.freeze(Object.defineProperties(["\n\n.guify-select-dropdown {\n    display: inline-block;\n    position: absolute;\n    width: calc(100% - ", ");\n    padding-left: 1.5%;\n    height: ", ";\n    border: none;\n    border-radius: 0;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    -o-appearance:none;\n    appearance: none;\n    font-family: inherit;\n    background-color: ", ";\n    color: ", ";\n    box-sizing: border-box !important;\n    -moz-box-sizing: border-box !important;\n    -webkit-box-sizing: border-box !important;\n}\n\n/* Disable default outline since we're providing our own */\n.guify-select-dropdown:focus {\n    outline: none;\n}\n.guify-select-dropdown::-moz-focus-inner {\n    border: 0;\n}\n\n\n.guify-select-dropdown:focus,\n.guify-select-dropdown:hover {\n    color: ", ";\n    background-color: ", ";\n}\n\n.guify-select-dropdown::-ms-expand {\n    display:none;\n}\n.guify-select-triangle {\n    content: ' ';\n    border-right: 3px solid transparent;\n    border-left: 3px solid transparent;\n    line-height: ", ";\n    position: absolute;\n    right: 2.5%;\n    z-index: 1;\n    pointer-events: none;\n}\n\n.guify-select-triangle--up {\n    bottom: 55%;\n    border-bottom: 5px solid ", ";\n    border-top: 0px transparent;\n}\n\n.guify-select-triangle--down {\n    top: 55%;\n    border-top: 5px solid ", ";\n    border-bottom: 0px transparent;\n}\n\n.guify-select-triangle--up-highlight {\n    border-bottom-color: ", ";\n}\n\n.guify-select-triangle--down-highlight {\n    border-top-color: ", ";\n}\n\n"], {
                    raw: {
                        value: Object.freeze(["\n\n.guify-select-dropdown {\n    display: inline-block;\n    position: absolute;\n    width: calc(100% - ", ");\n    padding-left: 1.5%;\n    height: ", ";\n    border: none;\n    border-radius: 0;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    -o-appearance:none;\n    appearance: none;\n    font-family: inherit;\n    background-color: ", ";\n    color: ", ";\n    box-sizing: border-box !important;\n    -moz-box-sizing: border-box !important;\n    -webkit-box-sizing: border-box !important;\n}\n\n/* Disable default outline since we're providing our own */\n.guify-select-dropdown:focus {\n    outline: none;\n}\n.guify-select-dropdown::-moz-focus-inner {\n    border: 0;\n}\n\n\n.guify-select-dropdown:focus,\n.guify-select-dropdown:hover {\n    color: ", ";\n    background-color: ", ";\n}\n\n.guify-select-dropdown::-ms-expand {\n    display:none;\n}\n.guify-select-triangle {\n    content: ' ';\n    border-right: 3px solid transparent;\n    border-left: 3px solid transparent;\n    line-height: ", ";\n    position: absolute;\n    right: 2.5%;\n    z-index: 1;\n    pointer-events: none;\n}\n\n.guify-select-triangle--up {\n    bottom: 55%;\n    border-bottom: 5px solid ", ";\n    border-top: 0px transparent;\n}\n\n.guify-select-triangle--down {\n    top: 55%;\n    border-top: 5px solid ", ";\n    border-bottom: 0px transparent;\n}\n\n.guify-select-triangle--up-highlight {\n    border-bottom-color: ", ";\n}\n\n.guify-select-triangle--down-highlight {\n    border-top-color: ", ";\n}\n\n"])
                    }
                }))
                  , r = n(1)
                  , i = n(3);
                e.exports = i(o, r.theme.sizing.labelWidth, r.theme.sizing.componentHeight, r.theme.colors.componentBackground, r.theme.colors.textSecondary, r.theme.colors.textHover, r.theme.colors.componentForeground, r.theme.sizing.componentHeight, r.theme.colors.textSecondary, r.theme.colors.textSecondary, r.theme.colors.textHover, r.theme.colors.textHover)
            }
            , function(e, t, n) {
                "use strict";
                function o(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1,
                            o.configurable = !0,
                            "value"in o && (o.writable = !0),
                            Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n),
                        o && e(t, o),
                        t
                    }
                }()
                  , i = o(n(4))
                  , a = o(n(0))
                  , s = function(e) {
                    function t(e, o, r, i) {
                        !function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        var s = function(e, t) {
                            if (!e)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !t || "object" != typeof t && "function" != typeof t ? e : t
                        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                        return s.opts = o,
                        s.container = n(2)(e, o.label, r),
                        n(5)(s.container, o.label, r),
                        s.input = s.container.appendChild(document.createElement("input")),
                        s.input.type = "text",
                        s.input.className = "guify-text",
                        o.initial && (s.input.value = o.initial),
                        o.label && s.input.setAttribute("aria-label", o.label),
                        (0,
                        a.default)(s.input, {
                            position: "absolute",
                            paddingLeft: "6px",
                            height: r.sizing.componentHeight,
                            width: "calc(100% - " + r.sizing.labelWidth + ")",
                            border: "none",
                            background: r.colors.componentBackground,
                            color: r.colors.textSecondary,
                            fontFamily: "inherit",
                            "box-sizing": "border-box",
                            "-moz-box-sizing": "border-box",
                            "-webkit-box-sizing": "border-box",
                            resize: "vertical"
                        }),
                        setTimeout((function() {
                            s.emit("initialized", s.input.value)
                        }
                        )),
                        s.input.oninput = function(e) {
                            s.emit("input", e.target.value)
                        }
                        ,
                        s.input.addEventListener("focus", (function() {
                            (0,
                            a.default)(s.input, {
                                outline: "none"
                            }),
                            s.focused = !0
                        }
                        )),
                        s.input.addEventListener("blur", (function() {
                            s.focused = !1
                        }
                        )),
                        s
                    }
                    return function(e, t) {
                        if ("function" != typeof t && null !== t)
                            throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, e),
                    r(t, [{
                        key: "SetValue",
                        value: function(e) {
                            !0 !== this.focused && (this.input.value = e)
                        }
                    }, {
                        key: "GetValue",
                        value: function() {
                            return this.input.value
                        }
                    }]),
                    t
                }(i.default);
                t.default = s,
                e.exports = t.default
            }
            , function(e, t, n) {
                "use strict";
                function o(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1,
                            o.configurable = !0,
                            "value"in o && (o.writable = !0),
                            Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n),
                        o && e(t, o),
                        t
                    }
                }()
                  , i = o(n(4))
                  , a = o(n(54))
                  , s = o(n(0))
                  , l = o(n(14))
                  , u = o(n(13))
                  , c = function(e) {
                    function t(e, o, r, i) {
                        !function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        var u = function(e, t) {
                            if (!e)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !t || "object" != typeof t && "function" != typeof t ? e : t
                        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                        u.opts = o,
                        u.theme = r,
                        o.format = o.format || "rgb",
                        o.initial = o.initial || "#123456",
                        u.container = n(2)(e, o.label, r),
                        n(5)(u.container, o.label, r);
                        var c = u.container.appendChild(document.createElement("span"));
                        c.className = "guify-color-" + i;
                        var d = n(6)(u.container, "", r, "calc(100% - " + r.sizing.labelWidth + " - 12% - 0.5em)");
                        d.setAttribute("readonly", "true"),
                        c.onmouseover = function() {
                            u.picker.$el.style.display = ""
                        }
                        ;
                        var p = o.initial;
                        switch (o.format) {
                        case "rgb":
                        case "hex":
                            p = (0,
                            l.default)(p).toHexString();
                            break;
                        case "array":
                            p = l.default.fromRatio({
                                r: p[0],
                                g: p[1],
                                b: p[2]
                            }).toHexString()
                        }
                        return u.picker = new a.default({
                            el: c,
                            color: p,
                            background: r.colors.componentBackground,
                            width: 125,
                            height: 100
                        }),
                        (0,
                        s.default)(u.picker.$el, {
                            marginTop: r.sizing.componentHeight,
                            display: "none",
                            position: "absolute"
                        }),
                        (0,
                        s.default)(c, {
                            position: "relative",
                            display: "inline-block",
                            width: "12.5%",
                            height: r.sizing.componentHeight,
                            backgroundColor: u.picker.getHexString()
                        }),
                        u.InjectStyles(),
                        c.onmouseout = function(e) {
                            u.picker.$el.style.display = "none"
                        }
                        ,
                        setTimeout((function() {
                            u.emit("initialized", p)
                        }
                        )),
                        u.picker.onChange((function(e) {
                            d.value = u.Format(e),
                            (0,
                            s.default)(c, {
                                backgroundColor: e
                            }),
                            u.emit("input", u.Format(e))
                        }
                        )),
                        u
                    }
                    return function(e, t) {
                        if ("function" != typeof t && null !== t)
                            throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, e),
                    r(t, [{
                        key: "Format",
                        value: function(e) {
                            switch (this.opts.format) {
                            case "rgb":
                                return (0,
                                l.default)(e).toRgbString();
                            case "hex":
                                return (0,
                                l.default)(e).toHexString();
                            case "array":
                                var t = (0,
                                l.default)(e).toRgb();
                                return [t.r / 255, t.g / 255, t.b / 255].map((function(e) {
                                    return e.toFixed(2)
                                }
                                ));
                            default:
                                return e
                            }
                        }
                    }, {
                        key: "SetValue",
                        value: function(e) {
                            this.picker.setColor(e)
                        }
                    }, {
                        key: "GetValue",
                        value: function() {
                            return this.Format(this.picker.getColor())
                        }
                    }, {
                        key: "InjectStyles",
                        value: function() {
                            (0,
                            u.default)("\n\n        .Scp {\n            width: 125px;\n            height: 100px;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n                -ms-user-select: none;\n                    user-select: none;\n            position: relative;\n            z-index: 1000;\n            cursor: pointer;\n        }\n        .Scp-saturation {\n            position: relative;\n            width: calc(100% - 25px);\n            height: 100%;\n            background: linear-gradient(to right, #fff 0%, #f00 100%);\n            float: left;\n            margin-right: 5px;\n        }\n        .Scp-brightness {\n            width: 100%;\n            height: 100%;\n            background: linear-gradient(to top, #000 0%, rgba(255,255,255,0) 100%);\n        }\n        .Scp-sbSelector {\n            border: 1px solid;\n            position: absolute;\n            width: 14px;\n            height: 14px;\n            background: #fff;\n            border-radius: 10px;\n            top: -7px;\n            left: -7px;\n            box-sizing: border-box;\n            z-index: 10;\n        }\n        .Scp-hue {\n            width: 20px;\n            height: 100%;\n            position: relative;\n            float: left;\n            background: linear-gradient(to bottom, #f00 0%, #f0f 17%, #00f 34%, #0ff 50%, #0f0 67%, #ff0 84%, #f00 100%);\n        }\n        .Scp-hSelector {\n            position: absolute;\n            background: #fff;\n            border-bottom: 1px solid #000;\n            right: -3px;\n            width: 10px;\n            height: 2px;\n        }\n\n        ")
                        }
                    }]),
                    t
                }(i.default);
                t.default = c,
                e.exports = t.default
            }
            , function(e, t, n) {
                "use strict";
                !function() {
                    function t(e) {
                        return e = e || {},
                        this.color = null,
                        this.width = 0,
                        this.widthUnits = "px",
                        this.height = 0,
                        this.heightUnits = "px",
                        this.hue = 0,
                        this.position = {
                            x: 0,
                            y: 0
                        },
                        this.huePosition = 0,
                        this.saturationWidth = 0,
                        this.hueHeight = 0,
                        this.maxHue = 0,
                        this.inputIsNumber = !1,
                        this._onSaturationMouseDown = this._onSaturationMouseDown.bind(this),
                        this._onSaturationMouseMove = this._onSaturationMouseMove.bind(this),
                        this._onSaturationMouseUp = this._onSaturationMouseUp.bind(this),
                        this._onHueMouseDown = this._onHueMouseDown.bind(this),
                        this._onHueMouseMove = this._onHueMouseMove.bind(this),
                        this._onHueMouseUp = this._onHueMouseUp.bind(this),
                        this.$el = document.createElement("div"),
                        this.$el.className = "Scp",
                        this.$el.innerHTML = ['<div class="Scp-saturation">', '<div class="Scp-brightness"></div>', '<div class="Scp-sbSelector"></div>', "</div>", '<div class="Scp-hue">', '<div class="Scp-hSelector"></div>', "</div>"].join(""),
                        this.$saturation = this.$el.querySelector(".Scp-saturation"),
                        this.$hue = this.$el.querySelector(".Scp-hue"),
                        this.$sbSelector = this.$el.querySelector(".Scp-sbSelector"),
                        this.$hSelector = this.$el.querySelector(".Scp-hSelector"),
                        this.$saturation.addEventListener("mousedown", this._onSaturationMouseDown),
                        this.$saturation.addEventListener("touchstart", this._onSaturationMouseDown),
                        this.$hue.addEventListener("mousedown", this._onHueMouseDown),
                        this.$hue.addEventListener("touchstart", this._onHueMouseDown),
                        e.el && this.appendTo(e.el),
                        e.background && this.setBackgroundColor(e.background),
                        e.widthUnits && (this.widthUnits = e.widthUnits),
                        e.heightUnits && (this.heightUnits = e.heightUnits),
                        this.setSize(e.width || 175, e.height || 150),
                        this.setColor(e.color),
                        this
                    }
                    function o(e, t, n) {
                        return Math.min(Math.max(e, t), n)
                    }
                    function r(e) {
                        return {
                            x: (e = 0 === e.type.indexOf("touch") ? e.touches[0] : e).clientX,
                            y: e.clientY
                        }
                    }
                    function i(e) {
                        return "#" + ("00000" + (0 | e).toString(16)).substr(-6)
                    }
                    var a = n(55)
                      , s = n(56)
                      , l = n(14)
                      , u = n(59);
                    a(t.prototype),
                    t.prototype.appendTo = function(e) {
                        return e.appendChild(this.$el),
                        this
                    }
                    ,
                    t.prototype.remove = function() {
                        this._onSaturationMouseUp(),
                        this._onHueMouseUp(),
                        this.$saturation.removeEventListener("mousedown", this._onSaturationMouseDown),
                        this.$saturation.removeEventListener("touchstart", this._onSaturationMouseDown),
                        this.$hue.removeEventListener("mousedown", this._onHueMouseDown),
                        this.$hue.removeEventListener("touchstart", this._onHueMouseDown),
                        this.off(),
                        this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
                    }
                    ,
                    t.prototype.setColor = function(e) {
                        s(e) ? (this.inputIsNumber = !0,
                        e = i(e)) : this.inputIsNumber = !1,
                        this.color = l(e);
                        var t = this.color.toHsv();
                        return isNaN(t.h) || (this.hue = t.h),
                        this._moveSelectorTo(this.saturationWidth * t.s, (1 - t.v) * this.hueHeight),
                        this._moveHueTo((1 - this.hue / 360) * this.hueHeight),
                        this._updateHue(),
                        this
                    }
                    ,
                    t.prototype.setSize = function(e, t) {
                        return this.width = e,
                        this.height = t,
                        this.$el.style.width = this.width + this.widthUnits,
                        this.$el.style.height = this.height + this.heightUnits,
                        this.saturationWidth = this.width - 25,
                        this.$saturation.style.width = this.saturationWidth + "px",
                        this.hueHeight = this.height,
                        this.maxHue = this.hueHeight - 2,
                        this
                    }
                    ,
                    t.prototype.setBackgroundColor = function(e) {
                        return s(e) && (e = i(e)),
                        this.$el.style.padding = "5px",
                        this.$el.style.background = l(e).toHexString(),
                        this
                    }
                    ,
                    t.prototype.setNoBackground = function() {
                        this.$el.style.padding = "0px",
                        this.$el.style.background = "none"
                    }
                    ,
                    t.prototype.onChange = function(e) {
                        return this.on("update", e),
                        this.emit("update", this.getHexString()),
                        this
                    }
                    ,
                    t.prototype.getColor = function() {
                        return this.inputIsNumber ? this.getHexNumber() : this.color.toString()
                    }
                    ,
                    t.prototype.getHexString = function() {
                        return this.color.toHexString().toUpperCase()
                    }
                    ,
                    t.prototype.getHexNumber = function() {
                        return parseInt(this.color.toHex(), 16)
                    }
                    ,
                    t.prototype.getRGB = function() {
                        return this.color.toRgb()
                    }
                    ,
                    t.prototype.getHSV = function() {
                        return this.color.toHsv()
                    }
                    ,
                    t.prototype.isDark = function() {
                        return this.color.isDark()
                    }
                    ,
                    t.prototype.isLight = function() {
                        return this.color.isLight()
                    }
                    ,
                    t.prototype._moveSelectorTo = function(e, t) {
                        this.position.x = o(e, 0, this.saturationWidth),
                        this.position.y = o(t, 0, this.hueHeight),
                        u(this.$sbSelector, {
                            x: this.position.x,
                            y: this.position.y
                        })
                    }
                    ,
                    t.prototype._updateColorFromPosition = function() {
                        this.color = l({
                            h: this.hue,
                            s: this.position.x / this.saturationWidth,
                            v: 1 - this.position.y / this.hueHeight
                        }),
                        this._updateColor()
                    }
                    ,
                    t.prototype._moveHueTo = function(e) {
                        this.huePosition = o(e, 0, this.maxHue),
                        u(this.$hSelector, {
                            y: this.huePosition
                        })
                    }
                    ,
                    t.prototype._updateHueFromPosition = function() {
                        var e = this.color.toHsv();
                        this.hue = 360 * (1 - this.huePosition / this.maxHue),
                        this.color = l({
                            h: this.hue,
                            s: e.s,
                            v: e.v
                        }),
                        this._updateHue()
                    }
                    ,
                    t.prototype._updateHue = function() {
                        var e = l({
                            h: this.hue,
                            s: 1,
                            v: 1
                        });
                        this.$saturation.style.background = "linear-gradient(to right, #fff, " + e.toHexString() + ")",
                        this._updateColor()
                    }
                    ,
                    t.prototype._updateColor = function() {
                        this.$sbSelector.style.background = this.color.toHexString(),
                        this.$sbSelector.style.borderColor = this.color.isDark() ? "#fff" : "#000",
                        this.emit("update", this.color.toHexString())
                    }
                    ,
                    t.prototype._onSaturationMouseDown = function(e) {
                        var t = this.$saturation.getBoundingClientRect()
                          , n = r(e).x
                          , o = r(e).y;
                        this._moveSelectorTo(n - t.left, o - t.top),
                        this._updateColorFromPosition(),
                        window.addEventListener("mouseup", this._onSaturationMouseUp),
                        window.addEventListener("touchend", this._onSaturationMouseUp),
                        window.addEventListener("mousemove", this._onSaturationMouseMove),
                        window.addEventListener("touchmove", this._onSaturationMouseMove),
                        e.preventDefault()
                    }
                    ,
                    t.prototype._onSaturationMouseMove = function(e) {
                        var t = this.$saturation.getBoundingClientRect()
                          , n = r(e).x
                          , o = r(e).y;
                        this._moveSelectorTo(n - t.left, o - t.top),
                        this._updateColorFromPosition()
                    }
                    ,
                    t.prototype._onSaturationMouseUp = function() {
                        window.removeEventListener("mouseup", this._onSaturationMouseUp),
                        window.removeEventListener("touchend", this._onSaturationMouseUp),
                        window.removeEventListener("mousemove", this._onSaturationMouseMove),
                        window.removeEventListener("touchmove", this._onSaturationMouseMove)
                    }
                    ,
                    t.prototype._onHueMouseDown = function(e) {
                        var t = this.$hue.getBoundingClientRect()
                          , n = r(e).y;
                        this._moveHueTo(n - t.top),
                        this._updateHueFromPosition(),
                        window.addEventListener("mouseup", this._onHueMouseUp),
                        window.addEventListener("touchend", this._onHueMouseUp),
                        window.addEventListener("mousemove", this._onHueMouseMove),
                        window.addEventListener("touchmove", this._onHueMouseMove),
                        e.preventDefault()
                    }
                    ,
                    t.prototype._onHueMouseMove = function(e) {
                        var t = this.$hue.getBoundingClientRect()
                          , n = r(e).y;
                        this._moveHueTo(n - t.top),
                        this._updateHueFromPosition()
                    }
                    ,
                    t.prototype._onHueMouseUp = function() {
                        window.removeEventListener("mouseup", this._onHueMouseUp),
                        window.removeEventListener("touchend", this._onHueMouseUp),
                        window.removeEventListener("mousemove", this._onHueMouseMove),
                        window.removeEventListener("touchmove", this._onHueMouseMove)
                    }
                    ,
                    void 0 !== e && e.exports && (e.exports = t)
                }()
            }
            , function(e, t, n) {
                function o(e) {
                    if (e)
                        return function(e) {
                            for (var t in o.prototype)
                                e[t] = o.prototype[t];
                            return e
                        }(e)
                }
                e.exports = o,
                o.prototype.on = o.prototype.addEventListener = function(e, t) {
                    return this._callbacks = this._callbacks || {},
                    (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t),
                    this
                }
                ,
                o.prototype.once = function(e, t) {
                    function n() {
                        this.off(e, n),
                        t.apply(this, arguments)
                    }
                    return n.fn = t,
                    this.on(e, n),
                    this
                }
                ,
                o.prototype.off = o.prototype.removeListener = o.prototype.removeAllListeners = o.prototype.removeEventListener = function(e, t) {
                    if (this._callbacks = this._callbacks || {},
                    0 == arguments.length)
                        return this._callbacks = {},
                        this;
                    var n, o = this._callbacks["$" + e];
                    if (!o)
                        return this;
                    if (1 == arguments.length)
                        return delete this._callbacks["$" + e],
                        this;
                    for (var r = 0; r < o.length; r++)
                        if ((n = o[r]) === t || n.fn === t) {
                            o.splice(r, 1);
                            break
                        }
                    return this
                }
                ,
                o.prototype.emit = function(e) {
                    this._callbacks = this._callbacks || {};
                    var t = [].slice.call(arguments, 1)
                      , n = this._callbacks["$" + e];
                    if (n)
                        for (var o = 0, r = (n = n.slice(0)).length; o < r; ++o)
                            n[o].apply(this, t);
                    return this
                }
                ,
                o.prototype.listeners = function(e) {
                    return this._callbacks = this._callbacks || {},
                    this._callbacks["$" + e] || []
                }
                ,
                o.prototype.hasListeners = function(e) {
                    return !!this.listeners(e).length
                }
            }
            , function(e, t, n) {
                "use strict";
                var o = n(57);
                e.exports = function(e) {
                    var t = o(e);
                    if ("string" === t) {
                        if (!e.trim())
                            return !1
                    } else if ("number" !== t)
                        return !1;
                    return e - e + 1 >= 0
                }
            }
            , function(e, t, n) {
                var o = n(58)
                  , r = Object.prototype.toString;
                e.exports = function(e) {
                    if (void 0 === e)
                        return "undefined";
                    if (null === e)
                        return "null";
                    if (!0 === e || !1 === e || e instanceof Boolean)
                        return "boolean";
                    if ("string" == typeof e || e instanceof String)
                        return "string";
                    if ("number" == typeof e || e instanceof Number)
                        return "number";
                    if ("function" == typeof e || e instanceof Function)
                        return "function";
                    if (void 0 !== Array.isArray && Array.isArray(e))
                        return "array";
                    if (e instanceof RegExp)
                        return "regexp";
                    if (e instanceof Date)
                        return "date";
                    var t = r.call(e);
                    return "[object RegExp]" === t ? "regexp" : "[object Date]" === t ? "date" : "[object Arguments]" === t ? "arguments" : "[object Error]" === t ? "error" : o(e) ? "buffer" : "[object Set]" === t ? "set" : "[object WeakSet]" === t ? "weakset" : "[object Map]" === t ? "map" : "[object WeakMap]" === t ? "weakmap" : "[object Symbol]" === t ? "symbol" : "[object Int8Array]" === t ? "int8array" : "[object Uint8Array]" === t ? "uint8array" : "[object Uint8ClampedArray]" === t ? "uint8clampedarray" : "[object Int16Array]" === t ? "int16array" : "[object Uint16Array]" === t ? "uint16array" : "[object Int32Array]" === t ? "int32array" : "[object Uint32Array]" === t ? "uint32array" : "[object Float32Array]" === t ? "float32array" : "[object Float64Array]" === t ? "float64array" : "object"
                }
            }
            , function(e, t) {
                function n(e) {
                    return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
                }
                e.exports = function(e) {
                    return null != e && (n(e) || function(e) {
                        return "function" == typeof e.readFloatLE && "function" == typeof e.slice && n(e.slice(0, 0))
                    }(e) || !!e._isBuffer)
                }
            }
            , function(e, t, n) {
                "use strict";
                function o() {
                    return Object.keys(a).map((function(e) {
                        return e
                    }
                    ))
                }
                var r = n(60)
                  , i = n(61)
                  , a = n(62)
                  , s = n(63)
                  , l = Object.prototype.hasOwnProperty
                  , u = r("transform")
                  , c = {
                    x: "translateX",
                    y: "translateY",
                    z: "translateZ",
                    origin: "transformOrigin"
                };
                t = e.exports = function(e, t) {
                    var n, o, d, p = [];
                    for (n in function(e) {
                        var t;
                        for (t in e)
                            l.call(c, t) && (e[c[t]] = e[t],
                            delete e[t])
                    }(t),
                    t)
                        l.call(t, n) && (o = t[n],
                        l.call(a.transform, n) ? (d = a.transform[n],
                        i(o) && (o = o.join(d.separator)),
                        p.push(n + "(" + s(o, d.defaultUnit, d.separator) + ")")) : l.call(a, n) ? (d = a[n],
                        i(o) && (o = o.join(d.separator)),
                        e.style[r(n)] = s(o, d.defaultUnit, d.separator)) : console.warn("dom-transform: this property () is not supported."));
                    e.style[u] = p.join(" ")
                }
                ,
                t.get = function(e, t) {
                    var n = e.style;
                    if ("string" == typeof t)
                        return l.call(a.transform, t) ? n[u] : n[r(t)];
                    t ||= o();
                    var i = {};
                    return t.forEach((function(e) {
                        i[e] = n[r(e)]
                    }
                    )),
                    i
                }
                ,
                t.reset = function(e, t) {
                    var n = e.style;
                    "string" != typeof t ? (t ||= o(),
                    t.forEach((function(e) {
                        n[r(e)] = null
                    }
                    ))) : n[r(t)] = null
                }
                ,
                t.isSupported = function() {
                    return u.length > 0
                }
            }
            , function(e, t) {
                function n(e) {
                    if (e = e.replace(/-([a-z])/g, (function(e, t) {
                        return t.toUpperCase()
                    }
                    )),
                    void 0 !== o[e])
                        return e;
                    for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = r.length; n--; ) {
                        var i = r[n] + t;
                        if (void 0 !== o[i])
                            return i
                    }
                    return e
                }
                var o = "undefined" != typeof document ? document.createElement("p").style : {}
                  , r = ["O", "ms", "Moz", "Webkit"]
                  , i = /([A-Z])/g
                  , a = {};
                e.exports = function(e) {
                    return e in a ? a[e] : a[e] = n(e)
                }
                ,
                e.exports.dash = function(e) {
                    return e = n(e),
                    i.test(e) && (e = "-" + e.replace(i, "-$1"),
                    i.lastIndex = 0),
                    e.toLowerCase()
                }
            }
            , function(e, t) {
                var n = Array.isArray
                  , o = Object.prototype.toString;
                e.exports = n || function(e) {
                    return !!e && "[object Array]" == o.call(e)
                }
            }
            , function(e, t, n) {
                "use strict";
                e.exports = {
                    transform: {
                        translate: {
                            defaultUnit: "px"
                        },
                        translate3d: {
                            defaultUnit: "px"
                        },
                        translateX: {
                            defaultUnit: "px"
                        },
                        translateY: {
                            defaultUnit: "px"
                        },
                        translateZ: {
                            defaultUnit: "px"
                        },
                        scale: {
                            defaultUnit: ""
                        },
                        scale3d: {
                            defaultUnit: ""
                        },
                        scaleX: {
                            defaultUnit: ""
                        },
                        scaleY: {
                            defaultUnit: ""
                        },
                        scaleZ: {
                            defaultUnit: ""
                        },
                        rotate: {
                            defaultUnit: "deg"
                        },
                        rotate3d: {
                            defaultUnit: ""
                        },
                        rotateX: {
                            defaultUnit: "deg"
                        },
                        rotateY: {
                            defaultUnit: "deg"
                        },
                        rotateZ: {
                            defaultUnit: "deg"
                        },
                        skew: {
                            defaultUnit: "deg"
                        },
                        skewX: {
                            defaultUnit: "deg"
                        },
                        skewY: {
                            defaultUnit: "deg"
                        },
                        perspective: {
                            defaultUnit: "px"
                        },
                        matrix: {
                            defaultUnit: ""
                        },
                        matrix3d: {
                            defaultUnit: ""
                        }
                    },
                    transformOrigin: {
                        defaultUnit: "px",
                        separator: " "
                    }
                }
            }
            , function(e, t, n) {
                "use strict";
                var o = n(64)
                  , r = /^-?\d+(\.\d+)?$/;
                e.exports = function(e, t, n) {
                    if (n = n || ",",
                    "number" == typeof e)
                        return "" + e + t;
                    var i = new RegExp(n,"g");
                    return e.split(i.test(e) ? n : " ").map((function(e) {
                        return e = o(e),
                        r.test(e) && (e += t),
                        e
                    }
                    )).join(n)
                }
            }
            , function(e, t) {
                (t = e.exports = function(e) {
                    return e.replace(/^\s*|\s*$/g, "")
                }
                ).left = function(e) {
                    return e.replace(/^\s*/, "")
                }
                ,
                t.right = function(e) {
                    return e.replace(/\s*$/, "")
                }
            }
            , function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var o = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1,
                            o.configurable = !0,
                            "value"in o && (o.writable = !0),
                            Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n),
                        o && e(t, o),
                        t
                    }
                }()
                  , r = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(n(0))
                  , i = n(66)
                  , a = function() {
                    function e(t, o, a, s) {
                        var l = this;
                        !function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                        this.opts = o,
                        this.container = n(2)(t, o.label, a),
                        this.container.classList.add(i["guify-folder"]),
                        this.container.setAttribute("role", "button"),
                        this.container.setAttribute("tabIndex", "0"),
                        this.arrow = this.container.appendChild(document.createElement("div")),
                        this.arrow.innerHTML = "&#9662;",
                        (0,
                        r.default)(this.arrow, {
                            width: "1.5em"
                        }),
                        this.label = this.container.appendChild(document.createElement("div")),
                        this.label.innerHTML = o.label,
                        this.container.onclick = function() {
                            l.Toggle()
                        }
                        ,
                        this.container.addEventListener("mouseup", (function() {
                            l.container.blur()
                        }
                        )),
                        this.container.addEventListener("keydown", (function(e) {
                            13 !== e.which && 32 !== e.which || l.Toggle()
                        }
                        )),
                        this.folderContainer = t.appendChild(document.createElement("div")),
                        this.folderContainer.classList.add(i["guify-folder-contents"]),
                        this.open = this.opts.open || !1,
                        this.SetOpen(this.open)
                    }
                    return o(e, [{
                        key: "Toggle",
                        value: function() {
                            this.open = !this.open,
                            this.SetOpen(this.open)
                        }
                    }, {
                        key: "SetOpen",
                        value: function(e) {
                            this.open = e,
                            e ? (this.folderContainer.classList.remove(i["guify-folder-closed"]),
                            this.arrow.innerHTML = "&#9662;") : (this.folderContainer.classList.add(i["guify-folder-closed"]),
                            this.arrow.innerHTML = "&#9656;")
                        }
                    }]),
                    e
                }();
                t.default = a,
                e.exports = t.default
            }
            , function(e, t, n) {
                "use strict";
                var o = Object.freeze(Object.defineProperties(["\n\n.guify-folder {\n    cursor: pointer;\n    padding-left: 0.5em;\n    color: ", ";\n}\n\n.guify-folder div {\n    display: inline-block;\n    vertical-align: sub;\n    line-height: calc(", " + 5px);\n}\n\n.guify-folder:hover,\n.guify-folder:focus {\n    color: ", ";\n    background-color: ", ";\n    outline: none;\n}\n\n\n.guify-folder-contents {\n    display: block;\n    box-sizing: border-box;\n    padding-left: 14px;\n    margin-bottom: 5px;\n    border-left: 2px solid ", ";\n}\n\n.guify-folder-contents.guify-folder-closed {\n    height: 0;\n    display: none;\n}\n\n\n"], {
                    raw: {
                        value: Object.freeze(["\n\n.guify-folder {\n    cursor: pointer;\n    padding-left: 0.5em;\n    color: ", ";\n}\n\n.guify-folder div {\n    display: inline-block;\n    vertical-align: sub;\n    line-height: calc(", " + 5px);\n}\n\n.guify-folder:hover,\n.guify-folder:focus {\n    color: ", ";\n    background-color: ", ";\n    outline: none;\n}\n\n\n.guify-folder-contents {\n    display: block;\n    box-sizing: border-box;\n    padding-left: 14px;\n    margin-bottom: 5px;\n    border-left: 2px solid ", ";\n}\n\n.guify-folder-contents.guify-folder-closed {\n    height: 0;\n    display: none;\n}\n\n\n"])
                    }
                }))
                  , r = n(1)
                  , i = n(3);
                e.exports = i(o, r.theme.colors.textPrimary, r.theme.sizing.componentHeight, r.theme.colors.textHover, r.theme.colors.componentForeground, r.theme.colors.componentBackground)
            }
            , function(e, t, n) {
                "use strict";
                function o(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1,
                            o.configurable = !0,
                            "value"in o && (o.writable = !0),
                            Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n),
                        o && e(t, o),
                        t
                    }
                }()
                  , i = o(n(4))
                  , a = o(n(0))
                  , s = n(68)
                  , l = function(e) {
                    function t(e, o, r, i) {
                        !function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        var l = function(e, t) {
                            if (!e)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !t || "object" != typeof t && "function" != typeof t ? e : t
                        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                        l.opts = o,
                        l.opts.fileReadFunc = l.opts.fileReadFunc || "readAsDataURL",
                        l.file = null,
                        l.fileName = null,
                        l.container = n(2)(e, o.label, r),
                        l.container.classList.add(s["guify-file-container"]),
                        l.container.setAttribute("role", "button"),
                        l.container.setAttribute("tabIndex", "0"),
                        (0,
                        a.default)(l.container, {
                            width: "100%",
                            "box-sizing": "border-box",
                            "-moz-box-sizing": "border-box",
                            "-webkit-box-sizing": "border-box",
                            height: "unset",
                            padding: "8px"
                        });
                        var u = l.container.appendChild(document.createElement("div"));
                        u.innerHTML = o.label,
                        (0,
                        a.default)(u, "padding-bottom", "5px");
                        var c = l.container.appendChild(document.createElement("input"));
                        function d(e) {
                            var t;
                            e.dataTransfer ? t = e.dataTransfer.files : e.target && (t = e.target.files),
                            t[0];
                            var n = new FileReader;
                            n.onload = function() {
                                l.file = n.result,
                                l.fileLabel.innerHTML = t[0].name,
                                l.emit("input", l.file)
                            }
                            ,
                            n[l.opts.fileReadFunc](t[0])
                        }
                        return c.setAttribute("type", "file"),
                        c.setAttribute("multiple", !1),
                        c.style.display = "none",
                        o.label && c.setAttribute("aria-label", o.label),
                        l.fileLabel = l.container.appendChild(document.createElement("div")),
                        l.fileLabel.innerHTML = "Choose a file...",
                        c.addEventListener("change", d),
                        l.container.addEventListener("dragover", (function(e) {
                            e.preventDefault(),
                            e.stopPropagation(),
                            l.container.classList.add(s["guify-dragover"])
                        }
                        )),
                        l.container.addEventListener("dragleave", (function(e) {
                            e.preventDefault(),
                            e.stopPropagation(),
                            l.container.classList.remove(s["guify-dragover"])
                        }
                        )),
                        l.container.addEventListener("drop", (function(e) {
                            e.preventDefault(),
                            e.stopPropagation(),
                            l.container.classList.remove(s["guify-dragover"]),
                            d(e)
                        }
                        )),
                        l.container.onclick = function() {
                            c.click()
                        }
                        ,
                        l.container.addEventListener("keydown", (function(e) {
                            13 !== e.which && 32 !== e.which || c.click()
                        }
                        )),
                        l.container.addEventListener("mouseup", (function() {
                            l.container.blur()
                        }
                        )),
                        l
                    }
                    return function(e, t) {
                        if ("function" != typeof t && null !== t)
                            throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, e),
                    r(t, [{
                        key: "SetValue",
                        value: function(e) {}
                    }, {
                        key: "GetValue",
                        value: function() {
                            return this.file
                        }
                    }]),
                    t
                }(i.default);
                t.default = l,
                e.exports = t.default
            }
            , function(e, t, n) {
                "use strict";
                var o = Object.freeze(Object.defineProperties(["\n\n.guify-file-container {\n    display: inline-block;\n    outline: none;\n    padding-top: 8px;\n    padding-bottom: 8px;\n    color: ", ";\n    background-color: ", ";\n}\n\n.guify-file-container:hover,\n.guify-file-container:focus {\n    color: ", ";\n    background-color: ", ";\n}\n\n.guify-file-container:active {\n    color: ", " !important;\n    background-color: ", " !important;\n}\n\n.guify-dragover {\n    background-color: ", ";\n    box-shadow: inset 0 0 0 3px ", ";\n}\n\n\n"], {
                    raw: {
                        value: Object.freeze(["\n\n.guify-file-container {\n    display: inline-block;\n    outline: none;\n    padding-top: 8px;\n    padding-bottom: 8px;\n    color: ", ";\n    background-color: ", ";\n}\n\n.guify-file-container:hover,\n.guify-file-container:focus {\n    color: ", ";\n    background-color: ", ";\n}\n\n.guify-file-container:active {\n    color: ", " !important;\n    background-color: ", " !important;\n}\n\n.guify-dragover {\n    background-color: ", ";\n    box-shadow: inset 0 0 0 3px ", ";\n}\n\n\n"])
                    }
                }))
                  , r = n(1)
                  , i = n(3);
                e.exports = i(o, r.theme.colors.textPrimary, r.theme.colors.componentBackground, r.theme.colors.textHover, r.theme.colors.componentForeground, r.theme.colors.textActive, r.theme.colors.componentActive, r.theme.colors.componentBackground, r.theme.colors.componentForeground)
            }
            , function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var o = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1,
                            o.configurable = !0,
                            "value"in o && (o.writable = !0),
                            Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n),
                        o && e(t, o),
                        t
                    }
                }()
                  , r = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(n(0))
                  , i = function() {
                    function e(t, o, i, a) {
                        !function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                        this.opts = o,
                        this.container = n(2)(t, o.label, i),
                        n(5)(this.container, o.label, i),
                        this.text = this.container.appendChild(document.createElement("div")),
                        (0,
                        r.default)(this.text, {
                            display: "inline-block",
                            height: "unset",
                            width: "calc(100% - " + i.sizing.labelWidth + ")",
                            border: "none",
                            color: i.colors.textSecondary,
                            fontFamily: "inherit",
                            "box-sizing": "border-box",
                            "-moz-box-sizing": "border-box",
                            "-webkit-box-sizing": "border-box",
                            verticalAlign: "sub",
                            "line-height": i.sizing.componentHeight,
                            "user-select": "text"
                        }),
                        o.label && this.text.setAttribute("aria-label", o.label)
                    }
                    return o(e, [{
                        key: "SetValue",
                        value: function(e) {
                            this.text.innerHTML = e.toString()
                        }
                    }, {
                        key: "GetValue",
                        value: function() {
                            return this.text.innerHTML.toString()
                        }
                    }]),
                    e
                }();
                t.default = i,
                e.exports = t.default
            }
            , function(e, t, n) {
                "use strict";
                function o(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }
                function r(e, t, n) {
                    return Math.min(Math.max(e, t), n)
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var i = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1,
                            o.configurable = !0,
                            "value"in o && (o.writable = !0),
                            Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n),
                        o && e(t, o),
                        t
                    }
                }()
                  , a = o(n(4))
                  , s = o(n(0))
                  , l = o(n(10))
                  , u = n(71)
                  , c = function(e) {
                    function t(e, o, i, a) {
                        !function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        var c = function(e, t) {
                            if (!e)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !t || "object" != typeof t && "function" != typeof t ? e : t
                        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                        if (c.opts = o,
                        c.container = n(2)(e, o.label, i),
                        n(5)(c.container, o.label, i),
                        o.step && o.steps)
                            throw new Error("Cannot specify both step and steps. Got step = " + o.step + ", steps = ",o.steps);
                        if (c.input = c.container.appendChild(document.createElement("span")),
                        c.input.className = u["guify-interval"],
                        c.handle = document.createElement("span"),
                        c.handle.className = u["guify-interval-handle"],
                        c.input.appendChild(c.handle),
                        Array.isArray(o.initial) || (o.initial = []),
                        "log" === o.scale) {
                            if (o.max = (0,
                            l.default)(o.max) ? o.max : 100,
                            o.min = (0,
                            l.default)(o.min) ? o.min : .1,
                            o.min * o.max <= 0)
                                throw new Error("Log range min/max must have the same sign and not equal zero. Got min = " + o.min + ", max = " + o.max);
                            if (c.logmin = o.min,
                            c.logmax = o.max,
                            c.logsign = o.min > 0 ? 1 : -1,
                            c.logmin = Math.abs(c.logmin),
                            c.logmax = Math.abs(c.logmax),
                            o.min = 0,
                            o.max = 100,
                            (0,
                            l.default)(o.step))
                                throw new Error("Log may only use steps (integer number of steps), not a step value. Got step =" + o.step);
                            if (o.step = 1,
                            o.initial = [c.InverseScaleValue((0,
                            l.default)(o.initial) ? o.initial[0] : scaleValue(o.min + .25 * (o.max - o.min))), c.InverseScaleValue((0,
                            l.default)(o.initial) ? o.initial[1] : scaleValue(o.min + .75 * (o.max - o.min)))],
                            c.ScaleValue(o.initial[0]) * c.ScaleValue(o.max) <= 0 || scaleValue(o.initial[1]) * c.ScaleValue(o.max) <= 0)
                                throw new Error("Log range initial value must have the same sign as min/max and must not equal zero. Got initial value = [" + c.ScaleValue(o.initial[0]) + ", " + c.ScaleValue(o.initial[1]) + "]")
                        } else
                            o.max = (0,
                            l.default)(o.max) ? o.max : 100,
                            o.min = (0,
                            l.default)(o.min) ? o.min : 0,
                            o.step = (0,
                            l.default)(o.step) ? o.step : .01,
                            o.initial = [(0,
                            l.default)(o.initial[0]) ? o.initial[0] : .25 * (o.min + o.max), (0,
                            l.default)(o.initial[1]) ? o.initial[1] : .75 * (o.min + o.max)];
                        function d(e) {
                            return e.pageX - c.input.getBoundingClientRect().left
                        }
                        function p(e) {
                            var t = r(d(e) / c.input.offsetWidth, 0, 1);
                            c.setActiveValue(t)
                        }
                        (0,
                        l.default)(o.steps) && (o.step = (0,
                        l.default)(o.steps) ? (o.max - o.min) / o.steps : o.step),
                        o.initial[0] = o.min + o.step * Math.round((o.initial[0] - o.min) / o.step),
                        o.initial[1] = o.min + o.step * Math.round((o.initial[1] - o.min) / o.step),
                        c.value = o.initial,
                        (0,
                        s.default)(c.handle, {
                            left: (c.value[0] - o.min) / (o.max - o.min) * 100 + "%",
                            right: 100 - (c.value[1] - o.min) / (o.max - o.min) * 100 + "%"
                        }),
                        c.lValue = n(6)(c.container, c.ScaleValue(o.initial[0]), i, "11%", !0),
                        c.rValue = n(6)(c.container, c.ScaleValue(o.initial[1]), i, "11%"),
                        o.label && c.lValue.setAttribute("aria-label", o.label + " lower value"),
                        o.label && c.lValue.setAttribute("aria-label", o.label + " upper value"),
                        c.activeIndex = -1,
                        setTimeout((function() {
                            var e = c.ScaleValue(c.value[0])
                              , t = c.ScaleValue(c.value[1]);
                            c.lValue.innerHTML = e,
                            c.rValue.innerHTML = t,
                            c.emit("initialized", [e, t])
                        }
                        )),
                        c.input.addEventListener("focus", (function() {
                            c.focused = !0
                        }
                        )),
                        c.input.addEventListener("blur", (function() {
                            c.focused = !1
                        }
                        ));
                        var f = function e(t) {
                            var n = r(d(t) / c.input.offsetWidth, 0, 1);
                            c.setActiveValue(n),
                            document.removeEventListener("mousemove", p),
                            document.removeEventListener("mouseup", e),
                            c.activeIndex = -1
                        };
                        return c.input.addEventListener("mousedown", (function(e) {
                            var t = r(d(e) / c.input.offsetWidth, 0, 1)
                              , n = (c.value[0] - o.min) / (o.max - o.min)
                              , i = (c.value[1] - o.min) / (o.max - o.min);
                            n -= 1e-15 * Math.abs(o.max - o.min),
                            i += 1e-15 * Math.abs(o.max - o.min);
                            var a = Math.abs(n - t)
                              , s = Math.abs(i - t);
                            c.activeIndex = a < s ? 0 : 1,
                            window.console.log(c.activeIndex),
                            document.addEventListener("mousemove", p),
                            document.addEventListener("mouseup", f)
                        }
                        )),
                        c.input.addEventListener("mouseup", (function() {
                            c.input.blur()
                        }
                        )),
                        c.input.oninput = function() {
                            var e = c.ScaleValue(c.value[0])
                              , t = c.ScaleValue(c.value[1]);
                            c.lValue.value = e,
                            c.rValue.value = t,
                            c.emit("input", [e, t])
                        }
                        ,
                        c.lValue.onchange = function() {
                            var e = c.lValue.value
                              , t = parseFloat(c.rValue.value);
                            if (Number(parseFloat(e)) == e) {
                                var n = parseFloat(e);
                                n = Math.min(Math.max(n, o.min), o.max),
                                n = Math.ceil((n - o.min) / o.step) * o.step + o.min,
                                n = Math.min(n, t),
                                c.lValue.value = n,
                                c.emit("input", [n, t]),
                                c.RefreshHandle([n, t])
                            } else
                                c.lValue.value = c.lastValue[0]
                        }
                        ,
                        c.rValue.onchange = function() {
                            var e = c.rValue.value
                              , t = parseFloat(c.lValue.value);
                            if (Number(parseFloat(e)) == e) {
                                var n = parseFloat(e);
                                n = Math.min(Math.max(n, o.min), o.max),
                                n = Math.ceil((n - o.min) / o.step) * o.step + o.min,
                                n = Math.max(n, t),
                                c.rValue.value = n,
                                c.emit("input", [t, n]),
                                c.RefreshHandle([t, n])
                            } else
                                c.rValue.value = c.lastValue[1]
                        }
                        ,
                        c
                    }
                    return function(e, t) {
                        if ("function" != typeof t && null !== t)
                            throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, e),
                    i(t, [{
                        key: "ScaleValue",
                        value: function(e) {
                            return "log" === this.opts.scale ? this.logsign * Math.exp(Math.log(this.logmin) + (Math.log(this.logmax) - Math.log(this.logmin)) * e / 100) : e
                        }
                    }, {
                        key: "InverseScaleValue",
                        value: function(e) {
                            return "log" === this.opts.scale ? 100 * (Math.log(e * this.logsign) - Math.log(this.logmin)) / (Math.log(this.logmax) - Math.log(this.logmin)) : e
                        }
                    }, {
                        key: "setActiveValue",
                        value: function(e) {
                            if (-1 !== this.activeIndex) {
                                var t = this.opts
                                  , n = (this.value[0] - t.min) / (t.max - t.min)
                                  , o = (this.value[1] - t.min) / (t.max - t.min);
                                e = 0 === this.activeIndex ? Math.min(o, e) : Math.max(n, e);
                                var r = t.min + Math.round((t.max - t.min) * e / t.step) * t.step;
                                this.value[this.activeIndex] = r,
                                (0,
                                s.default)(this.handle, {
                                    left: (this.value[0] - t.min) / (t.max - t.min) * 100 + "%",
                                    right: 100 - (this.value[1] - t.min) / (t.max - t.min) * 100 + "%"
                                }),
                                this.input.oninput()
                            }
                        }
                    }, {
                        key: "SetValue",
                        value: function(e) {
                            !0 !== this.focused && (this.lValue.value = this.FormatNumber(e[0]),
                            this.rValue.value = this.FormatNumber(e[1]),
                            this.lastValue = [this.lValue.value, this.rValue.value])
                        }
                    }, {
                        key: "FormatNumber",
                        value: function(e) {
                            return e.toFixed(3).replace(/\.?0*$/, "")
                        }
                    }, {
                        key: "GetValue",
                        value: function() {
                            return [this.lValue.value, this.rValue.value]
                        }
                    }, {
                        key: "RefreshHandle",
                        value: function(e) {
                            var t = (parseFloat(e[0]) - this.opts.min) / (this.opts.max - this.opts.min) * 100
                              , n = 100 - (parseFloat(e[1]) - this.opts.min) / (this.opts.max - this.opts.min) * 100;
                            (0,
                            s.default)(this.handle, {
                                left: t + "%",
                                right: n + "%"
                            })
                        }
                    }]),
                    t
                }(a.default);
                t.default = c,
                e.exports = t.default
            }
            , function(e, t, n) {
                "use strict";
                var o = Object.freeze(Object.defineProperties(["\n.guify-interval {\n    -webkit-appearance: none;\n    position: absolute;\n    height: 20px;\n    margin: 0px 0;\n    width: 33%;\n    left: 54.5%;\n    background-color: ", ";\n    cursor: ew-resize;\n\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n.guify-interval-handle {\n    background-color: ", ";\n    position: absolute;\n    height: ", ";\n    min-width: 1px;\n}\n.guify-interval-handle:focus {\n    background: ", ";\n}\n"], {
                    raw: {
                        value: Object.freeze(["\n.guify-interval {\n    -webkit-appearance: none;\n    position: absolute;\n    height: 20px;\n    margin: 0px 0;\n    width: 33%;\n    left: 54.5%;\n    background-color: ", ";\n    cursor: ew-resize;\n\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n.guify-interval-handle {\n    background-color: ", ";\n    position: absolute;\n    height: ", ";\n    min-width: 1px;\n}\n.guify-interval-handle:focus {\n    background: ", ";\n}\n"])
                    }
                }))
                  , r = n(1)
                  , i = n(3)
                  , a = r.theme.colors.componentBackground
                  , s = r.theme.colors.componentForeground
                  , l = r.theme.colors.componentActive;
                e.exports = i(o, a, s, r.theme.sizing.componentHeight, l)
            }
            , function(e, t, n) {
                "use strict";
                function o(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.MenuBar = void 0;
                var r = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1,
                            o.configurable = !0,
                            "value"in o && (o.writable = !0),
                            Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n),
                        o && e(t, o),
                        t
                    }
                }()
                  , i = o(n(0))
                  , a = o(n(4))
                  , s = o((n(1),
                n(15)));
                t.MenuBar = function(e) {
                    function t(e, o) {
                        !function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        var r = function(e, t) {
                            if (!e)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !t || "object" != typeof t && "function" != typeof t ? e : t
                        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this))
                          , a = n(73);
                        if (r.element = document.createElement("div"),
                        r.element.className = a["guify-bar"],
                        e.appendChild(r.element),
                        o.title) {
                            var l = r.element.appendChild(document.createElement("div"));
                            l.className = a["guify-bar-title"],
                            l.innerHTML = o.title
                        }
                        var u = r.element.appendChild(document.createElement("button"));
                        if (u.className = a["guify-bar-button"],
                        u.innerHTML = "Controls",
                        (0,
                        i.default)(u, {
                            left: "left" == o.align ? "0" : "unset",
                            right: "left" == o.align ? "unset" : "0"
                        }),
                        u.onclick = function() {
                            r.emit("ontogglepanel")
                        }
                        ,
                        s.default.isEnabled) {
                            var c = r.element.appendChild(document.createElement("button"));
                            c.className = a["guify-bar-button"],
                            c.innerHTML = "「　」",
                            c.setAttribute("aria-label", "Toggle Fullscreen"),
                            (0,
                            i.default)(c, {
                                left: "left" == o.align ? "unset" : "0",
                                right: "left" == o.align ? "0" : "unset"
                            }),
                            c.onclick = function() {
                                r.emit("onfullscreenrequested")
                            }
                        }
                        return r
                    }
                    return function(e, t) {
                        if ("function" != typeof t && null !== t)
                            throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, e),
                    r(t, [{
                        key: "SetVisible",
                        value: function(e) {
                            this.element.style.display = e ? "block" : "none"
                        }
                    }]),
                    t
                }(a.default)
            }
            , function(e, t, n) {
                "use strict";
                var o = Object.freeze(Object.defineProperties(["\n\n.guify-bar {\n    background-color: ", ";\n    height: ", ";\n    width: 100%;\n    opacity: 1.0;\n    position: relative;\n    cursor: default;\n}\n\n.guify-bar-title {\n    color: ", ";\n    text-align: center;\n    width: 100%;\n    position: absolute;\n    top: 0;\n    line-height: ", ";\n    color: ", ";\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n\n.guify-bar-button {\n    text-align: center;\n    border: none;\n    cursor: pointer;\n    font-family: inherit;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    color: ", ";\n    background-color: ", ";\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    margin: 0;\n\n}\n\n/* Hide default accessibility outlines since we're providing our own visual feedback */\n.guify-bar-button:focus {\n    outline:none;\n}\n.guify-bar-button::-moz-focus-inner {\n    border:0;\n}\n\n.guify-bar-button:hover,\n.guify-bar-button:focus {\n    color: ", ";\n    background-color: ", ";\n}\n\n.guify-bar-button:active {\n    color: ", " !important;\n    background-color: ", " !important;\n}\n\n\n"], {
                    raw: {
                        value: Object.freeze(["\n\n.guify-bar {\n    background-color: ", ";\n    height: ", ";\n    width: 100%;\n    opacity: 1.0;\n    position: relative;\n    cursor: default;\n}\n\n.guify-bar-title {\n    color: ", ";\n    text-align: center;\n    width: 100%;\n    position: absolute;\n    top: 0;\n    line-height: ", ";\n    color: ", ";\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n\n.guify-bar-button {\n    text-align: center;\n    border: none;\n    cursor: pointer;\n    font-family: inherit;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    color: ", ";\n    background-color: ", ";\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    margin: 0;\n\n}\n\n/* Hide default accessibility outlines since we're providing our own visual feedback */\n.guify-bar-button:focus {\n    outline:none;\n}\n.guify-bar-button::-moz-focus-inner {\n    border:0;\n}\n\n.guify-bar-button:hover,\n.guify-bar-button:focus {\n    color: ", ";\n    background-color: ", ";\n}\n\n.guify-bar-button:active {\n    color: ", " !important;\n    background-color: ", " !important;\n}\n\n\n"])
                    }
                }))
                  , r = n(1)
                  , i = n(3);
                e.exports = i(o, r.theme.colors.menuBarBackground, r.theme.sizing.menuBarHeight, r.theme.colors.text1, r.theme.sizing.menuBarHeight, r.theme.colors.menuBarText, r.theme.colors.textPrimary, r.theme.colors.componentBackground, r.theme.colors.textHover, r.theme.colors.componentForeground, r.theme.colors.textActive, r.theme.colors.componentActive)
            }
            , function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.Panel = void 0;
                var o = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1,
                            o.configurable = !0,
                            "value"in o && (o.writable = !0),
                            Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n),
                        o && e(t, o),
                        t
                    }
                }()
                  , r = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(n(0))
                  , i = n(1);
                t.Panel = function() {
                    function e(t, o) {
                        !function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                        this.opts = o,
                        this.styles = n(75),
                        this.container = t.appendChild(document.createElement("div")),
                        this.container.className = this.styles["guify-panel-container"],
                        (0,
                        r.default)(this.container, {
                            width: o.width,
                            opacity: o.opacity || 1,
                            left: "left" == o.align ? "0" : "unset",
                            right: "left" == o.align ? "unset" : "0"
                        }),
                        "outer" == o.panelMode && (0,
                        r.default)(this.container, {
                            left: "left" == o.align ? "unset" : "100%",
                            right: "left" == o.align ? "100%" : "unset"
                        }),
                        "none" === o.barMode && this._MakeToggleButton(),
                        this.panel = this.container.appendChild(document.createElement("div")),
                        this.panel.className = this.styles["guify-panel"],
                        "none" === o.barMode && o.title && n(76)(this.panel, o.title, i.theme)
                    }
                    return o(e, [{
                        key: "SetVisible",
                        value: function(e) {
                            e ? (this.panel.classList.remove(this.styles["guify-panel-hidden"]),
                            this.menuButton && this.menuButton.setAttribute("alt", "Close GUI")) : (this.panel.classList.add(this.styles["guify-panel-hidden"]),
                            this.menuButton && this.menuButton.setAttribute("alt", "Open GUI"))
                        }
                    }, {
                        key: "ToggleVisible",
                        value: function() {
                            this.panel.classList.contains(this.styles["guify-panel-hidden"]) ? this.SetVisible(!0) : this.SetVisible(!1)
                        }
                    }, {
                        key: "_MakeToggleButton",
                        value: function() {
                            var e = this;
                            this.menuButton = this.container.appendChild(document.createElement("button")),
                            this.menuButton.className = this.styles["guify-panel-toggle-button"],
                            (0,
                            r.default)(this.menuButton, {
                                left: "left" == this.opts.align ? "0px" : "unset",
                                right: "left" == this.opts.align ? "unset" : "0px"
                            }),
                            this.menuButton.onclick = function() {
                                e.ToggleVisible()
                            }
                            ,
                            this.menuButton.addEventListener("mouseup", (function() {
                                e.menuButton.blur()
                            }
                            )),
                            this.menuButton.innerHTML = '\n        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">\n            <rect x="10%" y="10%" width="80%" height="80%"/>\n        </svg>\n        '
                        }
                    }]),
                    e
                }()
            }
            , function(e, t, n) {
                "use strict";
                var o = Object.freeze(Object.defineProperties(["\n\n.guify-panel-container {\n    position: absolute;\n    background: ", ";\n}\n\n.guify-panel {\n    padding: 14px;\n    /* Last component will have a margin, so reduce padding to account for this */\n    padding-bottom: calc(14px - ", ");\n\n    /* all: initial;  */\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    cursor: default;\n    text-align: left;\n    box-sizing: border-box;\n}\n\n.guify-panel.guify-panel-hidden {\n    height: 0px;\n    display: none;\n}\n\n.guify-panel * {\n    box-sizing: initial;\n    -webkit-box-sizing: initial;\n    -moz-box-sizing: initial;\n}\n\n.guify-panel input {\n    font-family: 'Hack';\n    font-size: 11px;\n    display: inline;\n}\n\n.guify-panel a {\n    color: inherit;\n    text-decoration: none;\n}\n\n.guify-panel-toggle-button {\n    position: absolute;\n    top: 0;\n    margin: 0;\n    padding: 0;\n    width: 15px;\n    height: 15px;\n    line-height: 15px;\n    text-align: center;\n    border: none;\n    cursor: pointer;\n    font-family: inherit;\n    color: ", ";\n    background-color: ", ";\n\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n\n}\n\n/* Open/Close button styling */\n.guify-panel-toggle-button svg {\n    fill-opacity: 0;\n    stroke-width: 3;\n    stroke: ", ";\n}\n\n/* Remove browser default outlines since we're providing our own */\n.guify-panel-toggle-button:focus {\n    outline:none;\n}\n.guify-panel-toggle-button::-moz-focus-inner {\n    border: 0;\n}\n\n.guify-panel-toggle-button:hover,\n.guify-panel-toggle-button:focus {\n    color: ", ";\n    background-color: ", ";\n}\n\n.guify-panel-toggle-button:active {\n    color: ", ";\n    background-color: ", ";\n}\n\n"], {
                    raw: {
                        value: Object.freeze(["\n\n.guify-panel-container {\n    position: absolute;\n    background: ", ";\n}\n\n.guify-panel {\n    padding: 14px;\n    /* Last component will have a margin, so reduce padding to account for this */\n    padding-bottom: calc(14px - ", ");\n\n    /* all: initial;  */\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    cursor: default;\n    text-align: left;\n    box-sizing: border-box;\n}\n\n.guify-panel.guify-panel-hidden {\n    height: 0px;\n    display: none;\n}\n\n.guify-panel * {\n    box-sizing: initial;\n    -webkit-box-sizing: initial;\n    -moz-box-sizing: initial;\n}\n\n.guify-panel input {\n    font-family: 'Hack';\n    font-size: 11px;\n    display: inline;\n}\n\n.guify-panel a {\n    color: inherit;\n    text-decoration: none;\n}\n\n.guify-panel-toggle-button {\n    position: absolute;\n    top: 0;\n    margin: 0;\n    padding: 0;\n    width: 15px;\n    height: 15px;\n    line-height: 15px;\n    text-align: center;\n    border: none;\n    cursor: pointer;\n    font-family: inherit;\n    color: ", ";\n    background-color: ", ";\n\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n\n}\n\n/* Open/Close button styling */\n.guify-panel-toggle-button svg {\n    fill-opacity: 0;\n    stroke-width: 3;\n    stroke: ", ";\n}\n\n/* Remove browser default outlines since we're providing our own */\n.guify-panel-toggle-button:focus {\n    outline:none;\n}\n.guify-panel-toggle-button::-moz-focus-inner {\n    border: 0;\n}\n\n.guify-panel-toggle-button:hover,\n.guify-panel-toggle-button:focus {\n    color: ", ";\n    background-color: ", ";\n}\n\n.guify-panel-toggle-button:active {\n    color: ", ";\n    background-color: ", ";\n}\n\n"])
                    }
                }))
                  , r = n(1)
                  , i = n(3);
                e.exports = i(o, r.theme.colors.panelBackground, r.theme.sizing.componentSpacing, r.theme.colors.textPrimary, r.theme.colors.componentBackground, r.theme.colors.componentForeground, r.theme.colors.textHover, r.theme.colors.componentForeground, r.theme.colors.textActive, r.theme.colors.componentActive)
            }
            , function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.default = function(e, t, n) {
                    var r = e.appendChild(document.createElement("div"));
                    return r.innerHTML = t,
                    (0,
                    o.default)(r, {
                        width: "100%",
                        textAlign: "center",
                        color: n.colors.textSecondary,
                        height: "20px",
                        marginBottom: "4px"
                    }),
                    r
                }
                ;
                var o = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(n(0));
                e.exports = t.default
            }
            , function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.ToastArea = void 0;
                var o = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1,
                            o.configurable = !0,
                            "value"in o && (o.writable = !0),
                            Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n),
                        o && e(t, o),
                        t
                    }
                }()
                  , r = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(n(0));
                n(1),
                t.ToastArea = function() {
                    function e(t, o) {
                        !function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                        this.opts = o,
                        this.styles = n(78),
                        this.element = t.appendChild(document.createElement("div")),
                        this.element.classList.add(this.styles["guify-toast-area"]),
                        (0,
                        r.default)(this.element, {
                            position: "absolute",
                            width: "100%"
                        })
                    }
                    return o(e, [{
                        key: "CreateToast",
                        value: function(e, t=5e3, n=0) {
                            window.console.log("[Toast] " + e);
                            var o = this.element.appendChild(document.createElement("div"));
                            o.classList.add(this.styles["guify-toast-notification"]),
                            o.setAttribute("aria-live", "polite"),
                            o.innerHTML = e,
                            (0,
                            r.default)(o, {});
                            var i = o.appendChild(document.createElement("button"));
                            i.innerHTML = "&#10006;",
                            i.classList.add(this.styles["guify-toast-close-button"]);
                            var a = void 0;
                            function s() {
                                o.blur(),
                                (0,
                                r.default)(o, {
                                    opacity: "0"
                                }),
                                clearTimeout(a),
                                a = setTimeout((function() {
                                    o && o.parentNode.removeChild(o)
                                }
                                ), n)
                            }
                            a = setTimeout(s, t),
                            i.onclick = s
                        }
                    }]),
                    e
                }()
            }
            , function(e, t, n) {
                "use strict";
                var o = Object.freeze(Object.defineProperties(["\n\n.guify-toast-notification {\n    box-sizing: border-box;\n    color: theme.colors.text1;\n    position: relative;\n    width: 100%;\n    /* height: 20px; */\n    padding: 8px;\n    padding-left: 20px;\n    padding-right: 20px;\n    text-align: center;\n    font-family: 'Hack', monospace;\n    font-size: 11px;\n}\n\n.guify-toast-area .guify-toast-notification:nth-child(odd) {\n    color: ", ";\n    background-color: ", ";\n}\n\n.guify-toast-area .guify-toast-notification:nth-child(even) {\n    color: ", ";\n    background-color: ", ";\n}\n\n.guify-toast-close-button {\n    color: ", ";\n    background: transparent;\n    position: absolute;\n    textAlign: center;\n    margin-top: auto;\n    margin-bottom: auto;\n    border: none;\n    cursor: pointer;\n    top: 0;\n    bottom: 0;\n    right: 8px;\n}\n\n"], {
                    raw: {
                        value: Object.freeze(["\n\n.guify-toast-notification {\n    box-sizing: border-box;\n    color: theme.colors.text1;\n    position: relative;\n    width: 100%;\n    /* height: 20px; */\n    padding: 8px;\n    padding-left: 20px;\n    padding-right: 20px;\n    text-align: center;\n    font-family: 'Hack', monospace;\n    font-size: 11px;\n}\n\n.guify-toast-area .guify-toast-notification:nth-child(odd) {\n    color: ", ";\n    background-color: ", ";\n}\n\n.guify-toast-area .guify-toast-notification:nth-child(even) {\n    color: ", ";\n    background-color: ", ";\n}\n\n.guify-toast-close-button {\n    color: ", ";\n    background: transparent;\n    position: absolute;\n    textAlign: center;\n    margin-top: auto;\n    margin-bottom: auto;\n    border: none;\n    cursor: pointer;\n    top: 0;\n    bottom: 0;\n    right: 8px;\n}\n\n"])
                    }
                }))
                  , r = n(1)
                  , i = n(3);
                e.exports = i(o, r.theme.colors.textPrimary, r.theme.colors.panelBackground, r.theme.colors.textPrimary, r.theme.colors.menuBarBackground, r.theme.colors.textPrimary)
            }
            , function(e, t, n) {
                "use strict";
                var o = Object.freeze(Object.defineProperties(["\n\n.guify-container {\n    position: relative;\n    left: 0;\n    width: 100%;\n    font-size: 11px;\n    z-index: 9999;\n}\n\n"], {
                    raw: {
                        value: Object.freeze(["\n\n.guify-container {\n    position: relative;\n    left: 0;\n    width: 100%;\n    font-size: 11px;\n    z-index: 9999;\n}\n\n"])
                    }
                }));
                n(1);
                var r = n(3);
                e.exports = r(o)
            }
            ])
        }
        ,
        "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("awaxdez", [], e) : "object" == typeof exports ? exports.awaxdez = e() : this.awaxdez = e()
    };
    daisu();
let saveconsole = window.console
      , cooldown = !1
      , aobxd = !0
      , acl = !0
      , log = console.log
      , lasthook = [];
    const fakeScreen = {
        width: 3840,
        height: 2160,
        availWidth: 3840,
        availHeight: 2160,
        colorDepth: screen.colorDepth,
        pixelDepth: screen.pixelDepth,
        orientation: screen.orientation
    };
    Object.defineProperty(window, "screen", {
        get: function() {
            return fakeScreen
        }
    }),
    window.setTimeout = new Proxy(window.setTimeout,{
        apply: (e, t, n) => (33 === n[1] && (n[1] = 0),
        e.apply(t, n))
    });
    const blockfog = ["img/day-fog0.png", "img/day-fog1.png", "img/day-fog2.png", "img/night-fog0.png", "img/night-fog1.png", "img/night-fog2.png", "img/day-fogdesert0.png", "img/day-fogdesert1.png", "img/day-fogdesert2.png", "img/night-fogdesert0.png", "img/night-fogdesert1.png", "img/night-fogdesert2.png"]
      , blockfogSrc = Object.getOwnPropertyDescriptor(Image.prototype, "src");
    function circle(e, t, n, o) {
        e.beginPath(),
        e.arc(t, n, o, 0, 2 * Math.PI)
    }
    Object.defineProperty(Image.prototype, "src", {
        set: function(e) {
            "string " == typeof e && blockfog.some((t => e.includes(t))) || blockfogSrc.set.call(this, e)
        },
        get: function() {
            return blockfogSrc.get.call(this)
        }
    });
    let heal = !1;
    var times = [];
    let TimeVar = performance.now()
      , FPS = 240
      , A = Date.now()
      , B = Date.now();
    class createText {
        constructor(e, t, n) {
            this.canvas = document.createElement("canvas"),
            this.ctx = this.canvas.getContext("2d"),
            this.canvas.width = e,
            this.canvas.height = t,
            this.buildType = n
        }
        drawText(e, t, n, o) {
            switch (this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height),
            this.ctx.font = t + "px Baloo Paaji",
            this.ctx.strokeStyle = n,
            this.ctx.fillStyle = o,
            this.ctx.lineWidth = 7,
            this.buildType) {
            case 1:
                this.ctx.strokeText("x" + (255 & e), 15, 40),
                this.ctx.fillText("x" + (255 & e), 15, 40),
                this.ctx.strokeText("x" + ((65280 & e) >> 8), 15, 60),
                this.ctx.fillText("x" + ((65280 & e) >> 8), 15, 60);
                break;
            case 2:
                this.ctx.strokeText("x" + (31 & e), 15, 40),
                this.ctx.fillText("x" + (31 & e), 15, 40),
                this.ctx.strokeText("x" + ((992 & e) >> 5), 15, 60),
                this.ctx.fillText("x" + ((992 & e) >> 5), 15, 60),
                this.ctx.strokeText("x" + ((31744 & e) >> 10), 15, 80),
                this.ctx.fillText("x" + ((31744 & e) >> 10), 15, 80);
                break;
            case 3:
                this.ctx.strokeText(e[0], 15, 40),
                this.ctx.fillText(e[0], 15, 40),
                this.ctx.strokeText((16 & e[1]) >> 4 ? "L" : "U", 15, 60),
                this.ctx.fillText((16 & e[1]) >> 4 ? "L" : "U", 15, 60),
                this.ctx.strokeText((16 & e[1]) >> 4 ? e[1] - 16 : e[1], 15, 80),
                this.ctx.fillText((16 & e[1]) >> 4 ? e[1] - 16 : e[1], 15, 80);
                break;
            default:
                this.ctx.strokeText(e, 15, 40),
                this.ctx.fillText(e, 15, 40)
            }
        }
    }
    let x = {
        hp: 100,
        food: 100,
        temp: 100,
        water: 100,
        air: 100,
        heat: 0
    };
    var STATE = {
        DELETE: 1,
        HURT: 2,
        COLD: 4,
        HUNGER: 8,
        ATTACK: 16,
        WALK: 32,
        IDLE: 64,
        HEAL: 128,
        WEB: 256
    };
    let COUNTER = 0
      , INV = {
        SWORD: COUNTER++,
        PICK: COUNTER++,
        FUR: COUNTER++,
        PICK_GOLD: COUNTER++,
        PICK_DIAMOND: COUNTER++,
        SWORD_GOLD: COUNTER++,
        SWORD_DIAMOND: COUNTER++,
        HAND: COUNTER++,
        PICK_WOOD: COUNTER++,
        PIRATE_SWORD: COUNTER++,
        EARMUFFS: COUNTER++,
        COAT: COUNTER++,
        WOOD_SPEAR: COUNTER++,
        SPEAR: COUNTER++,
        GOLD_SPEAR: COUNTER++,
        DIAMOND_SPEAR: COUNTER++,
        DRAGON_SPEAR: COUNTER++,
        LAVA_SPEAR: COUNTER++,
        CRAB_SPEAR: COUNTER++,
        REIDITE_SWORD: COUNTER++,
        DIAMOND_PROTECTION: COUNTER++,
        AMETHYST_PROTECTION: COUNTER++,
        REIDITE_PROTECTION: COUNTER++,
        EXPLORER_HAT: COUNTER++,
        PIRATE_HAT: COUNTER++,
        STONE_HELMET: COUNTER++,
        GOLD_HELMET: COUNTER++,
        DIAMOND_HELMET: COUNTER++,
        BOOK: COUNTER++,
        BAG: COUNTER++,
        SWORD_AMETHYST: COUNTER++,
        PICK_AMETHYST: COUNTER++,
        PICK_REIDITE: COUNTER++,
        AMETHYST_SPEAR: COUNTER++,
        REIDITE_SPEAR: COUNTER++,
        HAMMER: COUNTER++,
        HAMMER_GOLD: COUNTER++,
        HAMMER_DIAMOND: COUNTER++,
        HAMMER_AMETHYST: COUNTER++,
        HAMMER_REIDITE: COUNTER++,
        CAP_SCARF: COUNTER++,
        CHRISTMAS_HAT: COUNTER++,
        ELF_HAT: COUNTER++,
        AMETHYST_HELMET: COUNTER++,
        REIDITE_HELMET: COUNTER++,
        SUPER_HAMMER: COUNTER++,
        SHOVEL: COUNTER++,
        SUPER_DIVING_SUIT: COUNTER++,
        DIVING_MASK: COUNTER++,
        WATERING_CAN_FULL: COUNTER++,
        SHOVEL_GOLD: COUNTER++,
        SHOVEL_DIAMOND: COUNTER++,
        SHOVEL_AMETHYST: COUNTER++,
        PITCHFORK: COUNTER++,
        PITCHFORK2: COUNTER++,
        SPANNER: COUNTER++,
        MACHETE: COUNTER++,
        SWORD_WOOD: COUNTER++,
        WOOD_HELMET: COUNTER++,
        DRAGON_HELMET: COUNTER++,
        LAVA_HELMET: COUNTER++,
        CROWN_CRAB: COUNTER++,
        DRAGON_SWORD: COUNTER++,
        LAVA_SWORD: COUNTER++,
        WOOD_BOW: COUNTER++,
        STONE_BOW: COUNTER++,
        GOLD_BOW: COUNTER++,
        DIAMOND_BOW: COUNTER++,
        AMETHYST_BOW: COUNTER++,
        REIDITE_BOW: COUNTER++,
        DRAGON_BOW: COUNTER++,
        WOOD_SHIELD: COUNTER++,
        STONE_SHIELD: COUNTER++,
        GOLD_SHIELD: COUNTER++,
        DIAMOND_SHIELD: COUNTER++,
        AMETHYST_SHIELD: COUNTER++,
        REIDITE_SHIELD: COUNTER++,
        CROWN_GREEN: COUNTER++,
        CROWN_ORANGE: COUNTER++,
        CROWN_BLUE: COUNTER++,
        TURBAN1: COUNTER++,
        TURBAN2: COUNTER++,
        PILOT_HELMET: COUNTER++,
        HOOD: COUNTER++,
        PEASANT: COUNTER++,
        WINTER_HOOD: COUNTER++,
        WINTER_PEASANT: COUNTER++,
        FLOWER_HAT: COUNTER++,
        FUR_HAT: COUNTER++,
        SADDLE: COUNTER++,
        WITCH: COUNTER++,
        NIMBUS: COUNTER++,
        WAND1: COUNTER++,
        WAND2: COUNTER++,
        WOOD_AXE: COUNTER++,
        STONE_AXE: COUNTER++,
        GOLD_AXE: COUNTER++,
        DIAMOND_AXE: COUNTER++,
        AMETHYST_AXE: COUNTER++,
        REIDITE_AXE: COUNTER++,
        FIREFLY: COUNTER++,
        WOOD_ARROW: COUNTER++,
        STONE_ARROW: COUNTER++,
        GOLD_ARROW: COUNTER++,
        DIAMOND_ARROW: COUNTER++,
        AMETHYST_ARROW: COUNTER++,
        REIDITE_ARROW: COUNTER++,
        DRAGON_ARROW: COUNTER++,
        STONE: COUNTER++,
        WOOD: COUNTER++,
        PLANT: COUNTER++,
        GOLD: COUNTER++,
        DIAMOND: COUNTER++,
        FIRE: COUNTER++,
        WORKBENCH: COUNTER++,
        SEED: COUNTER++,
        MEAT: COUNTER++,
        COOKED_MEAT: COUNTER++,
        BIG_FIRE: COUNTER++,
        FURNACE: COUNTER++,
        PAPER: COUNTER++,
        AMETHYST: COUNTER++,
        AMETHYST_WALL: COUNTER++,
        AMETHYST_SPIKE: COUNTER++,
        AMETHYST_DOOR: COUNTER++,
        BRIDGE: COUNTER++,
        SAND: COUNTER++,
        BOTTLE_FULL: COUNTER++,
        BOTTLE_EMPTY: COUNTER++,
        KRAKEN_SKIN: COUNTER++,
        WATERING_CAN: COUNTER++,
        FLOUR: COUNTER++,
        WHEAT_SEED: COUNTER++,
        COOKIE: COUNTER++,
        WILD_WHEAT: COUNTER++,
        WINDMILL: COUNTER++,
        CAKE: COUNTER++,
        FOODFISH: COUNTER++,
        FOODFISH_COOKED: COUNTER++,
        SCALES: COUNTER++,
        GROUND: COUNTER++,
        PLOT: COUNTER++,
        ICE: COUNTER++,
        BREAD: COUNTER++,
        BREAD_OVEN: COUNTER++,
        SANDWICH: COUNTER++,
        FUR_WINTER: COUNTER++,
        BLUE_CORD: COUNTER++,
        LOCK: COUNTER++,
        DRAGON_HEART: COUNTER++,
        LAVA_HEART: COUNTER++,
        RESURRECTION: COUNTER++,
        EMERALD_MACHINE: COUNTER++,
        EXTRACTOR_MACHINE_STONE: COUNTER++,
        EXTRACTOR_MACHINE_GOLD: COUNTER++,
        EXTRACTOR_MACHINE_DIAMOND: COUNTER++,
        EXTRACTOR_MACHINE_AMETHYST: COUNTER++,
        EXTRACTOR_MACHINE_REIDITE: COUNTER++,
        LOCKPICK: COUNTER++,
        TOTEM: COUNTER++,
        SPIKE: COUNTER++,
        CORD: COUNTER++,
        WALL: COUNTER++,
        STONE_WALL: COUNTER++,
        GOLD_WALL: COUNTER++,
        DIAMOND_WALL: COUNTER++,
        WOOD_DOOR: COUNTER++,
        CHEST: COUNTER++,
        STONE_SPIKE: COUNTER++,
        GOLD_SPIKE: COUNTER++,
        DIAMOND_SPIKE: COUNTER++,
        STONE_DOOR: COUNTER++,
        GOLD_DOOR: COUNTER++,
        DIAMOND_DOOR: COUNTER++,
        FUR_WOLF: COUNTER++,
        GEMME_GREEN: COUNTER++,
        GEMME_ORANGE: COUNTER++,
        GEMME_BLUE: COUNTER++,
        SPECIAL_FUR: COUNTER++,
        SPECIAL_FUR_2: COUNTER++,
        BUCKET_FULL: COUNTER++,
        BUCKET_EMPTY: COUNTER++,
        WELL: COUNTER++,
        SIGN: COUNTER++,
        DRAGON_CUBE: COUNTER++,
        DRAGON_ORB: COUNTER++,
        LAVA_CUBE: COUNTER++,
        LAVA_ORB: COUNTER++,
        PUMPKIN_SEED: COUNTER++,
        PUMPKIN: COUNTER++,
        ROOF: COUNTER++,
        GARLIC_SEED: COUNTER++,
        GARLIC: COUNTER++,
        THORNBUSH_SEED: COUNTER++,
        THORNBUSH: COUNTER++,
        BANDAGE: COUNTER++,
        CRAB_STICK: COUNTER++,
        CRAB_LOOT: COUNTER++,
        BED: COUNTER++,
        SUGAR_CAN: COUNTER++,
        CANDY: COUNTER++,
        GARLAND: COUNTER++,
        REIDITE: COUNTER++,
        FLAME: COUNTER++,
        CARROT_SEED: COUNTER++,
        CARROT: COUNTER++,
        TOMATO_SEED: COUNTER++,
        TOMATO: COUNTER++,
        WATERMELON_SEED: COUNTER++,
        WATERMELON: COUNTER++,
        ALOE_VERA_SEED: COUNTER++,
        ALOE_VERA: COUNTER++,
        WOOD_DOOR_SPIKE: COUNTER++,
        STONE_DOOR_SPIKE: COUNTER++,
        GOLD_DOOR_SPIKE: COUNTER++,
        DIAMOND_DOOR_SPIKE: COUNTER++,
        AMETHYST_DOOR_SPIKE: COUNTER++,
        REIDITE_WALL: COUNTER++,
        REIDITE_DOOR: COUNTER++,
        REIDITE_SPIKE: COUNTER++,
        REIDITE_DOOR_SPIKE: COUNTER++,
        WOOD_TOWER: COUNTER++,
        PENGUIN_FEATHER: COUNTER++,
        BOAT: COUNTER++,
        SLED: COUNTER++,
        MOUNT_BOAR: COUNTER++,
        CRAB_BOSS: COUNTER++,
        BABY_DRAGON: COUNTER++,
        BABY_LAVA: COUNTER++,
        HAWK: COUNTER++,
        PLANE: COUNTER++,
        HAWK_FEATHER: COUNTER++,
        VULTURE_FEATHER: COUNTER++,
        CACTUS: COUNTER++,
        EMERALD: COUNTER++,
        PITCHFORK_PART: COUNTER++,
        PILOT_GLASSES: COUNTER++,
        FUR_BOAR: COUNTER++,
        SANDWORM_JUICE: COUNTER++,
        BABY_MAMMOTH: COUNTER++,
        FUR_MAMMOTH: COUNTER++
    };
    const ITEMS = {
        PLAYERS: 0,
        FIRE: 1,
        WORKBENCH: 2,
        SEED: 3,
        WALL: 4,
        SPIKE: 5,
        BIG_FIRE: 6,
        STONE_WALL: 7,
        GOLD_WALL: 8,
        DIAMOND_WALL: 9,
        WOOD_DOOR: 10,
        CHEST: 11,
        STONE_SPIKE: 12,
        GOLD_SPIKE: 13,
        DIAMOND_SPIKE: 14,
        STONE_DOOR: 15,
        GOLD_DOOR: 16,
        DIAMOND_DOOR: 17,
        FURNACE: 18,
        AMETHYST_WALL: 19,
        AMETHYST_SPIKE: 20,
        AMETHYST_DOOR: 21,
        RESURRECTION: 22,
        EMERALD_MACHINE: 23,
        EXTRACTOR_MACHINE_STONE: 24,
        EXTRACTOR_MACHINE_GOLD: 25,
        EXTRACTOR_MACHINE_DIAMOND: 26,
        EXTRACTOR_MACHINE_AMETHYST: 27,
        EXTRACTOR_MACHINE_REIDITE: 28,
        TOTEM: 29,
        BRIDGE: 30,
        WHEAT_SEED: 31,
        WINDMILL: 32,
        PLOT: 33,
        BREAD_OVEN: 34,
        WELL: 35,
        SIGN: 36,
        PUMPKIN_SEED: 37,
        ROOF: 38,
        GARLIC_SEED: 39,
        THORNBUSH_SEED: 40,
        BED: 41,
        GARLAND: 42,
        TOMATO_SEED: 43,
        CARROT_SEED: 44,
        WOOD_DOOR_SPIKE: 45,
        STONE_DOOR_SPIKE: 46,
        GOLD_DOOR_SPIKE: 47,
        DIAMOND_DOOR_SPIKE: 48,
        AMETHYST_DOOR_SPIKE: 49,
        REIDITE_WALL: 50,
        REIDITE_DOOR: 51,
        REIDITE_SPIKE: 52,
        REIDITE_DOOR_SPIKE: 53,
        WATERMELON_SEED: 54,
        ALOE_VERA_SEED: 55,
        WOOD_TOWER: 56,
        WOLF: 60,
        SPIDER: 61,
        FOX: 62,
        BEAR: 63,
        DRAGON: 64,
        PIRANHA: 65,
        KRAKEN: 66,
        CRAB: 67,
        FLAME: 68,
        LAVA_DRAGON: 69,
        BOAR: 70,
        CRAB_BOSS: 71,
        BABY_DRAGON: 72,
        BABY_LAVA: 73,
        HAWK: 74,
        VULTURE: 75,
        SAND_WORM: 76,
        BABY_MAMMOTH: 77,
        MAMMOTH: 78,
        WHEAT_MOB: 79,
        RABBIT: 80,
        TREASURE_CHEST: 81,
        DEAD_BOX: 82,
        PUMPKIN_MOB: 83,
        GARLIC_MOB: 84,
        THORNBUSH_MOB: 85,
        CRATE: 86,
        GIFT: 87,
        PENGUIN: 88,
        ALOE_VERA_MOB: 89,
        FIREFLY: 90,
        SPELL: 91,
        FRUIT: 100
    };
    document.title = "Kwintix Ultimate";
const Settings = {
    lowfps: {
        Timeout: 10,
        enable: !1,
        keyMode: "press",
        key: "NONE"
    },
    id: !1,
    PlayerOnTop: {
        enabled: !0,
        draw: !1
    },
    idd: {
        enabled: !0,
        draw: !1
    },
    putthatmuchinchest: {
        amount: 10
    },
    BoxOnTop: {
        enabled: !0,
        draw: !1
    },
    ChestOnTop: {
        enabled: !0,
        draw: !1
    },
    TotemOnTop: {
        enabled: !0,
        draw: !1
    },
    TreasureOnTop: {
        enabled: !0,
        draw: !1
    },
    ShowHP: {
        enabled: !0,
        draw: !1
    },
    blizard: {
        enabled: !0,
        draw: !1
    },
    sandstorm: {
        enabled: !0,
        draw: !1
    },
    Timers: {
        enabled: !0,
        draw: !1
    },
    Roofs: {
        enabled: !0,
        draw: !1
    },
    NoFog: {
        enabled: !0,
        draw: !1
    },
    ColoredSpikes: {
        enabled: !0,
        draw: !1
    },
    ListEnabledHacks: {
        enabled: !0,
        draw: !1
    },
    ChestInfo: {
        enabled: !0,
        draw: !1
    },
    BoxInfo: {
        enabled: !0,
        draw: !1
    },
    TotemInfo: {
        enabled: !0,
        draw: !1
    },
    MachineInfo: {
        enabled: !0,
        draw: !1
    },
    ExtractorInfo: {
        enabled: !0,
        draw: !1
    },
    BuildsInfo: {
        enabled: !0,
        draw: !1
    },
    WeatherInfo: {
        enabled: !0,
        draw: !1
    },
    Xray: {
        enabled: !1,
        draw: !0,
        key: "KeyZ",
        keyMode: "press"
    },
    SpikeA: {
        enabled: !1,
        key: "KeyO",
        angle: null,
        range: 120,
        keyMode: "press",
        draw: !0
    },
    AutoExtractorTake: {
        enabled: !1,
        draw: !0,
        key: "NONE",
        keyMode: "press"
    },
    AutoFire: {
        enabled: !1,
        draw: !0,
        key: "NONE",
        keyMode: "hold"
    },
    AutoExtractorPut: {
        enabled: !1,
        draw: !0,
        key: "NONE",
        keyMode: "press"
    },
    AutoExitDragon: {
        enabled: !1,
        draw: !0,
        key: "NONE",
        keyMode: "press"
    },
    AutoBreadTake: {
        enabled: !1,
        draw: !0,
        key: "NONE",
        keyMode: "press"
    },
    AutoBreadPut: {
        enabled: !1,
        draw: !0,
        key: "NONE",
        keyMode: "press"
    },
    AutoFeed: {
        enabled: !0,
        range: 60,
        draw: !1
    },
    AutoFeed2: {
        enabled: !0,
        range: 60,
        draw: !1
    },
    ChaseEnemy: {
        enabled: !1,
        key: "NONE",
        id: 0
    },
    AutoIce: {
        enabled: !1,
        draw: !0
    },
    AutoBook: {
        enabled: !0,
        draw: !1
    },
    Gauges: {
        enabled: !1,
        draw: !1
    },
    AutoBuild: {
        enabled: !1,
        draw: !0,
        key: "NONE",
        keyMode: "press",
        build: "Bridges"
    },
    AutoRespawn: {
        enabled: !1,
        draw: !1
    },
    AutoTotem: {
        enabled: !1,
        draw: !0,
        key: "KeyH",
        keyMode: "press"
    },
    AutoSeed: {
        enabled: !1,
        draw: !0,
        key: "NONE",
        keyMode: "press",
        seed: "Berry"
    },
    AutoCrown: {
        enabled: !1,
        draw: !0
    },
    AutoCrown2: {
        enabled: !1,
        draw: !0
    },
    AutoGreenCrown: {
        enabled: !1,
        draw: !0
    },
    amounfordelay: 300,
    DropSword: {
        enabled: !1,
        draw: !0,
        key: "NONE",
        keyMode: "hold"
    },
    AutoWall: {
        enabled: !1,
        draw: !0,
        key: "KeyC",
        keyMode: "hold",
        priority: ["Wood Wall", "Stone Wall", "Gold Wall", "Diamond Wall", "Amethyst Wall", "Reidite Wall"]
    },
    AutoSpike: {
        enabled: !1,
        draw: !0,
        key: "Space",
        keyMode: "hold",
        priority: ["Reidite Spike", "Amethyst Spike", "Diamond Spike", "Gold Spike", "Stone Spike", "Wood Spike", "Wood Wall"],
        mode: !0,
        delay: 80
    },
    spkrange: 50,
    AutoSteal: {
        enabled: !1,
        draw: !0,
        key: "KeyQ",
        keyMode: "hold",
        unlock: !1
    },
    AutoFarm: {
        enabled: !1,
        draw: !0,
        water: !1,
        key: "NONE",
        keyMode: "press",
        angle: null,
        x: 0,
        y: 0,
        xx: 0,
        yy: 0,
        sx: 0,
        sy: 0
    },
    PatchFinder: {
        enabled: !1,
        draw: !0,
        key: "NONE",
        keyMode: "press",
        x: 0,
        y: 0
    },
    ZmaVerify: {
        enabled: !1,
        draw: !0,
        key: "NONE",
        keyMode: "press",
        x: 0,
        y: 0
    },
    AobVerify: {
        enabled: !1,
        draw: !0,
        key: "NONE",
        keyMode: "press",
        x: 0,
        y: 0
    },
    PvpOrDieVerify: {
        enabled: !1,
        draw: !0,
        key: "NONE",
        keyMode: "press",
        x: 0,
        y: 0
    },
    AutoBottle: {
        enabled: !1,
        draw: !0,
        key: "NONE",
        keyMode: "press"
    },
    AutoReidite: {
        enabled: !1,
        draw: !0,
        key: "NONE",
        keyMode: "press"
    },
    AutoCraft: {
        enabled: !1,
        draw: !0,
        key: "KeyK",
        keyMode: "press",
        last: null
    },
    AutoRecycle: {
        enabled: !1,
        draw: !0,
        key: "KeyL",
        keyMode: "press",
        last: null
    },
    AimBot: {
        enabled: !1,
        draw: !0,
        key: "KeyF",
        keyMode: "press",
        angle: null
    },
    Spectator: {
        enabled: !1,
        draw: !0,
        key: "KeyP",
        keyMode: "press",
        speed: .5
    },
    PlayerTracers: {
        enabled: !1,
        draw: !1
    },
    KrakenTracers: {
        enabled: !1,
        draw: !1
    },
    SandwormTracers: {
        enabled: !1,
        draw: !1
    },
    SpiderTracers: {
        enabled: !1,
        draw: !1
    },
    WolfTracers: {
        enabled: !1,
        draw: !1
    },
    RabbitTracers: {
        enabled: !1,
        draw: !1
    },
    VultureTracers: {
        enabled: !1,
        draw: !1
    },
    BabyDragonTracers: {
        enabled: !1,
        draw: !1
    },
    BabyLavaDragonTracers: {
        enabled: !1,
        draw: !1
    },
    TokenJoiner: {
        enabled: !1,
        token: null,
        token_id: null
    },
    nows: {
        autoreidite: Date.now(),
        autofire: Date.now(),
        AutoIce: Date.now(),
        autowall: Date.now(),
        autoextractortake: Date.now(),
        autoextractorput: Date.now(),
        autobreadtake: Date.now(),
        autobreadput: Date.now(),
        autocraft: Date.now(),
        autorecycle: Date.now(),
        autosteal: Date.now(),
        autobuild: Date.now(),
        autototem: Date.now(),
        autoseed: Date.now(),
        autocrown: Date.now(),
        autocrown2: Date.now(),
        autocrown3: Date.now(),
        dropsword: Date.now(),
        autospike: Date.now(),
        autofarm: Date.now(),
        spikeaimbot: Date.now(),
        chaseenemy: Date.now(),
        sendping: Date.now()
    },
    textalert: {
        enabled: false,
        t: "none"
    }
};
let user, world, client, keyboard, CLIENT, mouse, UI, game;
let master = Symbol();
function removeAds() {
    document.querySelector(".grecaptcha-badge").style.display = "none",
    document.querySelector("body > div.rc-anchor.rc-anchor-invisible.rc-anchor-light.rc-anchor-invisible-hover").style.display = "none",
    document.querySelector("body > div.rc-anchor.rc-anchor-invisible.rc-anchor-light.rc-anchor-invisible-hover").style.display = "none"
}
Object.defineProperty(Object.prototype, "claimed", {
    get() {
        return this[master]
    },
    set(e) {
        this[master] = e,
        client || (client = this,
        window.client = client,
        window.console.log(window.client))
    }
}),
Object.defineProperty(Object.prototype, "control", {
    get() {
        return this[master]
    },
    set(e) {
        if (this[master] = e,
        !user) {
            user = this,
            window.user = user,
            window.console.log(window.user),
            document.getElementById("ssIFrame_google");
            let e = document.getElementById("preroll")
              , t = document.getElementById("trevda")
              , n = document.createElement("style");
            e.remove(),
            t.remove(),
            n.innerHTML = ".grecaptcha-badge { visibility: hidden; }",
            document.head.appendChild(n),
            console.log(e + ":" + t),
            console.log("removed"),
            new MutationObserver((function(e) {
                for (const t of e)
                    for (const e of t.addedNodes)
                        e.src && (e.src.includes("server.cmpstar.net") || e.src.includes("sdk.truepush.com") || e.src.includes("sdki.truepush.com") || e.src.includes("adinplay") || e.src.includes("amazon-adsystem.com") || e.src.includes("www.google-analytics.com") || e.src.includes("ib.adnxs.com") || e.src.includes("targeting.unrulymedia.com") || e.src.includes("www.google-analytics.com") || e.src.includes("pagead2.googlesyndication.com") || e.src.includes("doubleclick.net") || e.src.includes("script.4dex.io")) && (e.src = "",
                        e.innerHTML = "",
                        e.textContent = ""),
                        "wg-ad-container" === e.className && setTimeout((function() {
                            const e = document.querySelector(".wg-ad-player");
                            e.currentTime = 20,
                            e.parentElement.style.display = "none"
                        }
                        ), 1)
            }
            )).observe(document, {
                childList: !0,
                attributes: !0,
                subtree: !0
            })
        }
    }
}),
Object.defineProperty(Object.prototype, "mode", {
    get() {
        return this[master]
    },
    set(e) {
        this[master] = e,
        world || this.cache || (world = this,
        window.world = world,
        window.console.log(window.world))
    }
}),
Object.defineProperty(Object.prototype, "down", {
    get() {
        return this[master]
    },
    set(e) {
        this[master] = e,
        keyboard || (keyboard = this,
        window.keyboard = keyboard,
        window.console.log(window.keyboard))
    }
}),
Object.defineProperty(Object.prototype, "mapping", {
    get() {
        return this[master]
    },
    set(e) {
        this[master] = e,
        UI || (UI = this,
        window.UI = UI,
        window.console.log(window.UI),
        log(UI))
    }
}),
Object.defineProperty(Object.prototype, "IDLE", {
    get() {
        return this[master]
    },
    set(e) {
        this[master] = e,
        mouse || (mouse = this,
        window.mouse = mouse,
        window.console.log(window.mouse))
    }
}),
Object.defineProperty(Object.prototype, "options", {
    get() {
        return this[master]
    },
    set(e) {
        this[master] = e,
        !game && this.sign && (game = this,
        window.game = game,
        log(window.game))
    }
});
try {
    removeAds()
} catch (e) {}
const sandImage = new Image();
sandImage.src = "https://raw.githubusercontent.com/XmreLoux/images/main/sandstorm.png";
const blizImage = new Image();
blizImage.src = "https://raw.githubusercontent.com/XmreLoux/images/main/blizzard.png";
window.log = window.console.log;
const packets = {
    extPut: 27,
    extTake: 37,
    windMillPut: 30,
    windMillTake: 4,
    ovenPutWood: 14,
    ovenPutFlour: 25,
    ovenTake: 13,
    placeBuild: 22,
    drop: 31,
    angle: 0,
    attack: 36,
    stopAttack: 16,
    unlock: 20,
    chestPut: 1,
    chestTake: 8,
    equip: 34,
    craft: 26,
    recycle: 18,
    joinTotem: 17,
    revive: 35,
    PING: "[21]"
};
function pointer() {
    if (setTimeout(pointer, 600),
    !window.world || !window.user || !window.client)
        return;
    let e = !0;
    for (const t in vars)
        null == vars[t] && (e = !1);
    if (e && user.token && user.token_id)
        return;
    if (!window.user.token || vars.token) {
        document.cookie.split(";").forEach((e => {
            e.trim().startsWith("starve_token") && (user.token = e.split("=")[1].trim())
        }
        ));
        for (const e in user)
            user[e] == user.token && "token" !== e && "token_id" !== e && e !== vars.token_id && (vars.token = e)
    }
    if (!window.user.token_id || vars.token_id) {
        document.cookie.split(";").forEach((e => {
            e.trim().startsWith("starve_token_id") && (user.token_id = e.split("=")[1].trim())
        }
        ));
        for (const e in user)
            user[e] == user.token_id && "token_id" !== e && "token" !== e && e !== vars.token && (vars.token_id = e)
    }
    if (vars.socket) {
        let e = client[vars.socket].onopen.toString()
          , t = e.slice(e.indexOf("enabled")).split(",");
        vars.skin = t[1].split(".")[1].trim(),
        vars.accessory = t[2].split(".")[1].trim(),
        vars.bag = t[3].split(".")[1].trim(),
        vars.book = t[4].split(".")[1].trim()
    }
    let t = 0;
    for (const e in client) {
        switch (t++,
        typeof client[e]) {
        case "object":
            if (null == client[e])
                break;
            client[e].OPEN && null == vars.socket && (vars.socket = e);
            break;
        case "function":
            let t = client[e].toString();
            if (t.includes(".max") && t.includes(".r") && t.includes("return") && (null == vars.select_craft || "null" == vars.select_craft) && (vars.select_craft = e),
            t.includes("now") && !t.includes("Date") && (vars.reborn = e,
            vars.ghost = t.split("=")[1].split(".")[1].trim()),
            t.includes(".level") && t.includes("|") && t.includes(".label") && t.includes("null") && !t.includes("starve_token") && null == vars.id) {
                let e = ((t.split("var ")[1] + "").split("=")[0] + "").replaceAll(/\s+/g, "") + "";
                vars.id = e
            }
        }
        if ("ping" == e && null == vars.timeoutvalue) {
            vars.inv_select = Object.keys(client)[t - 27],
            log(vars.inv_select),
            log(client[vars.inv_select].toString().split("!=="));
            try {
                vars.clothe = client[vars.inv_select].toString().split("!==")[1].split("))")[0].split(".")[1].trim()
            } catch (e) {
                vars.clothe = client[vars.inv_select].toString().split("!==")[0].split("&&").slice(-1)[0].split(".")[1].trim()
            }
            log(vars.clothe),
            vars.timeoutvalue = Object.keys(client)[t + 1],
            client[vars.timeoutvalue] = new Proxy(client[vars.timeoutvalue],{
                apply() {
                    if (1 === !client[vars.socket].readyState)
                        return Reflect.apply(...arguments)
                }
            })
        }
    }
    for (const e in game)
        null == vars.chest_buttons && (vars.chest_buttons = Object.keys(game)[46],
        log(vars.chest_buttons)),
        null != vars.update_c && null != vars.update_connection || (vars.update_c = Object.keys(game)[64],
        vars.update_connection = Object.keys(game)[62]);
    for (const e in UI)
        "object" == typeof UI[e] && "translate"in UI[e] && null == vars.gauges && "y"in UI[e] && (vars.gauges = e,
        log(vars.gauges));
    for (const e in user)
        switch (typeof user[e]) {
        case "object":
            if (null == user[e])
                break;
            if (user[e].max && null == vars.inv && (vars.inv = e),
            user[e].x && null == vars.cam && (vars.cam = e),
            user[e].translate && null == vars.auto_feed)
                for (const t in user[e])
                    if ("function" == typeof user[e][t]) {
                        user[e][t].toString().includes("0.35") && (vars.auto_feed = e,
                        window.console.log(e))
                    }
            if (user[e].prefix && null == vars.chat && (vars.chat = e),
            user[e].style && !window.user[e].prefix && null == vars.terminal && (vars.terminal = e),
            Array.isArray(user[e]) && 0 == user[e].length && null == vars.team && (vars.team = e),
            vars.inv && (null == vars.n || null == vars.inv_ids)) {
                for (const e in user[vars.inv])
                    Array.isArray(user[vars.inv][e]) && user[vars.inv][e].length > 1 && "object" != typeof user[vars.inv][e][0] && (vars.n = e);
                for (const e in user[vars.inv])
                    Array.isArray(user[vars.inv][e]) && user[vars.inv][e].length < 100 && user[vars.inv][e].length > 1 && (vars.inv_ids = e)
            }
            let t = 0;
            for (const e in user.control) {
                if ("function" == typeof user.control[e] && null == vars.send_move) {
                    let t = user.control[e].toString();
                    vars.send_move = t.split("!=")[1].split(".")[1].split("(")[0].trim(),
                    log(vars.send_move)
                }
                t++,
                6 == t && null == vars.update && (vars.update = e,
                log(vars.update))
            }
            for (const e in user[vars.chat])
                if ("function" == typeof user[vars.chat][e] && null == vars.send_chat || "undefined" == vars.send_chat) {
                    let t = user[vars.chat][e].toString();
                    vars.send_chat = t,
                    log(vars.send_chat)
                }
            for (let e in user)
                if ("object" == typeof user[e] && null !== user[e] && user[e].timeout)
                    for (const t in user[e].timeout)
                        .2 == user[e].timeout[t] && (vars.helmet = e)
        }
    for (const e in world)
        switch (typeof world[e]) {
        case "object":
            if (null == [e])
                break;
            if (Array.isArray(world[e])) {
                if (world[e].length > 1500 && null == vars.fast_units && !Array.isArray(world[e][0]) && (vars.fast_units = e),
                null == vars.players && (vars.players = Object.keys(world)[3]),
                null == vars.nickname && world[vars.players] && user.alive && (vars.nickname = Object.keys(world[Object.keys(world)[3]][0])[0]),
                101 == world[e].length && null == vars.units && (vars.units = e),
                vars.units && null == vars.pid && world[vars.units][0].length > 0 && world[vars.units][0].forEach((e => {
                    for (const t in e)
                        e[t] == user.id && "info" !== t && (vars.pid = t)
                }
                )),
                vars.units && null == vars.playerInfo) {
                    let e = document.cookie.split(";").find((e => e.trim().startsWith("starve_nickname"))).slice(17);
                    e || (e = document.getElementById("nickname_input").value),
                    world[vars.units][ITEMS.PLAYERS].length > 0 && world[vars.units][ITEMS.PLAYERS].forEach((t => {
                        for (const n in t)
                            if ("object" == typeof t[n] && null !== t[n])
                                for (const o in t[n])
                                    t[n][o] == e && (vars.playerInfo = n)
                    }
                    ))
                }
                !vars.units || null != vars.drawSpike && "null" != vars.drawSpike || [5, 12, 13, 14, 20, 52, 10, 15, 16, 17, 21, 51, 45, 46, 47, 48, 49, 53].forEach((e => {
                    if (world[vars.units][e].length > 0)
                        for (let t in world[vars.units][e])
                            for (const n in world[vars.units][e][t])
                                "function" == typeof world[vars.units][e][t][n] && world[vars.units][e][t][n].toString().includes("width") && (vars.drawSpike = n)
                }
                ))
            }
        }
}
window.vars = {
    nickname: null,
    update_c: null,
    update_connection: null,
    ease: null,
    myPlayer: null,
    update: null,
    clothe: null,
    timeoutvalue: null,
    inv_select: null,
    _src: null,
    gauges: null,
    id: null,
    alive: "ⵠΔⵠΔⲆ",
    auto_feed: null,
    fast_units: null,
    units: null,
    inv: null,
    inv_ids: null,
    n: null,
    chat: null,
    terminal: null,
    cam: null,
    team: null,
    socket: null,
    select_craft: null,
    drawSpike: null,
    pid: null,
    skin: null,
    accessory: null,
    bag: null,
    book: null,
    playerInfo: null,
    helmet: null,
    ghost: null,
    reborn: null,
    token_id: null,
    token: null,
    send_move: null,
    send_chat: null,
    is_top: null,
    is_bottom: null,
    is_left: null,
    is_right: null,
    players: null,
    build: "ΔᐃⵠΔᐃ"
},
pointer();
const Timers = {
    HealTimer: 10,
    GaugeTimer: 5
};
let Hack, autoCrownReady = !0, hackIndex = 0;
setTimeout(( () => {
function e(e, t) {
    let n;
    return e + t > 254 && (n = e + t - 254),
    e + t < 0 && (n = 254 + (e + t)),
    e + t >= 0 && e + t < 254 && (n = e + t),
    n
}
function t(e) {
    if (e && null != e.right)
        switch (e.right) {
        case 94:
        case 95:
        case 96:
        case 97:
        case 98:
        case 99:
            return "AXE";
        case 57:
        case 0:
        case 5:
        case 6:
        case 30:
        case 19:
        case 62:
        case 63:
        case 22:
            return "SWORD";
        case 12:
        case 13:
        case 14:
        case 15:
        case 33:
        case 34:
        case 18:
        case 16:
        case 17:
            return "SPEAR";
        case 9:
            return "PIRATE"
        }
}
function n(e, t, n) {
    for (const o of t)
        if (!h(o) && g(e, o) <= n && (o.ⲆᐃⵠΔⵠᐃΔ && e.ⲆᐃⵠΔⵠᐃΔ || !o.ⲆᐃⵠΔⵠᐃΔ && !e.ⲆᐃⵠΔⵠᐃΔ))
            return o
}
function o(e, t, n) {
    for (let r = 0; r < t.length; r++)
        if (t[r].info && 16 != t[r].info && 10 != t[r].info) {
            const i = g(e, t[r]);
            if (i <= n && i >= 50)
                if (o)
                    i < g(o, e) && (o = t[r]);
                else
                    var o = t[r]
        }
    return o
}
function r(e, t, n) {
    for (let r = 0; r < t.length; r++)
        if (t[r].info && 16 == t[r].info) {
            const i = g(e, t[r]);
            if (i <= n)
                if (o)
                    i < g(o, e) && (o = t[r]);
                else
                    var o = t[r]
        }
    return o
}
function i(e, t) {
    let n = e.y
      , o = e.x
      , r = t ? t.x : x
      , i = t ? t.y : 0
      , a = 0;
    return n < i - 25 && t && (a += 4),
    n > i + 25 && t && (a += 8),
    o < r - 25 && (a += 2),
    o > r + 25 && (a += 1),
    a
}
function a(e, t, n) {
    let o = e.y
      , r = e.x
      , i = 0;
    return o < n - 25 && (i += 4),
    o > n + 25 && (i += 8),
    r < t - 25 && (i += 2),
    r > t + 25 && (i += 1),
    i
}
function s(e, t, n) {
    return e && t ? n ? Math.atan2(t.r.y - e.r.y, t.r.x - e.r.x) : Math.atan2(t.y - e.y, t.x - e.x) : null
}

    unsafeWindow.pizdabol = {
        LoadPizdabol: () => {
            let container = document.body;
            let pizdamenu = new guify({
                title: "Kwintix Ultimate",
                theme: {
                    name: "Kwintix",
                    colors: {
                        panelBackground: "rgb(255, 255, 255)",
                        componentBackground: "rgb(0,0,0)",
                        componentForeground: "rgb(0, 251, 255)",
                        textPrimary: "rgb(174, 0, 255)",
                        textSecondary: "rgb(174, 0, 255)",
                        textHover: "rgb(0,0,0)"
                    },
                    font: {
                        fontFamily: "Baloo Paaji",
                        fontSize: "20px"
                    }
                },
                align: "right",
                width: 700,
                opacity: .6,
                barMode: "none",
                panelMode: "`",
                root: unsafeWindow.container,
                open: !1
            });
            delete unsafeWindow.guify
            pizdamenu.Register([{
                type: "folder",
                label: "Visuals",
                open: !1
            }, {
                type: "folder",
                label: "Misc",
                open: !1
            }, {
                type: "folder",
                label: "Keybinds",
                open: !1
            }, {
                type: "folder",
                label: "AutoSpike",
                open: !1
            }, {
                type: "folder",
                label: "AutoSteal",
                open: !1
            }, {
                type: "folder",
                label: "AutoCraft&AutoRecycle",
                open: !1
            }, {
                type: "folder",
                label: "Spectator",
                open: !1
            }, {
                type: "folder",
                label: "AutoFarm",
                open: !1
            }, {
                type: "folder",
                label: "Verify&ZMA",
                open: !1
            }, {
                type: "folder",
                label: "PatchFinder",
                open: !1
            }, {
                type: "folder",
                label: "Tracers",
                open: !1
            }, {
                type: "folder",
                label: "Skins",
                open: !1
            }, {
                type: "folder",
                label: "Token",
                open: !1
            }, {
                type: "folder",
                label: "AutoFire",
                open: !1
            }]),
            pizdamenu.Register([{
                type: "checkbox",
                label: "Gauges",
                object: Settings.Gauges,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "ChestInfo",
                object: Settings.ChestInfo,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "BoxInfo",
                object: Settings.BoxInfo,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "TotemInfo",
                object: Settings.TotemInfo,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "ExtractorInfo",
                object: Settings.ExtractorInfo,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "MachineInfo",
                object: Settings.MachineInfo,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "ColoredSpikes",
                object: Settings.ColoredSpikes,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "Timers",
                object: Settings.Timers,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "ListEnabledHacks",
                object: Settings.ListEnabledHacks,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "Roofs",
                object: Settings.Roofs,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, , {
                type: "checkbox",
                label: "ShowID",
                object: Settings.idd,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "Xray",
                object: Settings.Xray,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }], {
                folder: "Visuals"
            }),
            pizdamenu.Register([{
                type: "checkbox",
                label: "AutoExtractorTake",
                object: Settings.AutoExtractorTake,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "AutoExtractorPut",
                object: Settings.AutoExtractorPut,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "AutoBreadTake",
                object: Settings.AutoBreadTake,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "AutoBreadPut",
                object: Settings.AutoBreadPut,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "AutoFeed",
                object: Settings.AutoFeed,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "AutoBuild",
                object: Settings.AutoBuild,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "AutoRespawn",
                object: Settings.AutoRespawn,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "AutoCrown",
                object: Settings.AutoCrown,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "AutoBook",
                object: Settings.AutoBook,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "AutoIce",
                object: Settings.AutoIce,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "AimBot",
                object: Settings.AimBot,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "AutoTotem",
                object: Settings.AutoTotem,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "AutoSeed",
                object: Settings.AutoSeed,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "select",
                label: "AutoSeed Seed",
                object: Settings.AutoSeed,
                property: "seed",
                options: ["Berry", "Wheat", "Pumpkin", "Thornbush", "Aloe", "Watermelon", "Garlic", "Carrot", "Tomato"],
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "select",
                label: "AutoBuild Build",
                object: Settings.AutoBuild,
                property: "build",
                options: ["Roofs", "Bridges", "Plots"],
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "range",
                label: "AutoFoodWhen",
                min: 3,
                step: 1,
                max: 100,
                object: Settings.AutoFeed2,
                property: "range",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "range",
                label: "ChaseEnemyID",
                min: 0,
                step: 1,
                max: 100,
                object: Settings.ChaseEnemy,
                property: "id",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "range",
                label: "put that much in chest",
                min: 10,
                step: 10,
                max: 8e3,
                object: Settings.putthatmuchinchest,
                property: "amount",
                onChange() {
                    pizdabol.saveSettings()
                }
            }], {
                folder: "Misc"
            }),
            pizdamenu.Register([{
                type: "display",
                label: "AutoExtractorTake Key",
                object: Settings.AutoExtractorTake,
                property: "key"
            }, {
                type: "button",
                label: "Set AutoExtractorTake Key",
                action() {
                    pizdabol.setKeybind("AutoExtractorTake")
                }
            }, {
                type: "display",
                label: "AutoExtractorPut Key",
                object: Settings.AutoExtractorPut,
                property: "key"
            }, {
                type: "button",
                label: "Set AutoExtractorPut Key",
                action() {
                    pizdabol.setKeybind("AutoExtractorPut")
                }
            }, {
                type: "display",
                label: "AutoBreadTake Key",
                object: Settings.AutoBreadTake,
                property: "key"
            }, {
                type: "button",
                label: "Set AutoBreadTake Key",
                action() {
                    pizdabol.setKeybind("AutoBreadTake")
                }
            }, {
                type: "display",
                label: "AutoBreadPut Key",
                object: Settings.AutoBreadPut,
                property: "key"
            }, {
                type: "button",
                label: "Set AutoBreadPut Key",
                action() {
                    pizdabol.setKeybind("AutoBreadPut")
                }
            }, {
                type: "display",
                label: "DropSword Key",
                object: Settings.DropSword,
                property: "key"
            }, {
                type: "button",
                label: "Set DropSword Key",
                action() {
                    pizdabol.setKeybind("DropSword")
                }
            }, {
                type: "display",
                label: "AutoSeed Key",
                object: Settings.AutoSeed,
                property: "key"
            }, {
                type: "button",
                label: "Set AutoSeed Key",
                action() {
                    pizdabol.setKeybind("AutoSeed")
                }
            }, {
                type: "display",
                label: "AutoBuild Key",
                object: Settings.AutoBuild,
                property: "key"
            }, {
                type: "button",
                label: "Set AutoBuild Key",
                action() {
                    pizdabol.setKeybind("AutoBuild")
                }
            }, {
                type: "display",
                label: "AutoTotem Key",
                object: Settings.AutoTotem,
                property: "key"
            }, {
                type: "button",
                label: "Set AutoTotem Key",
                action() {
                    pizdabol.setKeybind("AutoTotem")
                }
            }, {
                type: "display",
                label: "AimBot Key",
                object: Settings.AimBot,
                property: "key"
            }, {
                type: "button",
                label: "Set AimBot Key",
                action() {
                    pizdabol.setKeybind("AimBot")
                }
            }, {
                type: "display",
                label: "Aimbot&&Aut Key:",
                object: Settings.SpikeA,
                property: "key"
            }, {
                type: "button",
                label: "Set Aimbot&&Auto Key",
                action: e => {
                    pizdabol.setKeybind("SpikeA")
                }
            }, {
                type: "display",
                label: "Xray Key",
                object: Settings.Xray,
                property: "key"
            }, {
                type: "button",
                label: "Set Xray Key",
                action() {
                    pizdabol.setKeybind("Xray")
                }
            }], {
                folder: "Keybinds"
            }),
            pizdamenu.Register([{
                type: "range",
                label: "SpikeWIDE",
                min: 3,
                step: 1,
                max: 100,
                object: Settings,
                property: "spkrange",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "range",
                label: "AutoSpike Delay",
                object: Settings.AutoSpike,
                property: "delay",
                min: 0,
                max: 500
            }, {
                type: "range",
                label: "Aimbot&&Spike Range",
                object: Settings.SpikeA,
                property: "range",
                min: 10,
                max: 300
            }, {
                type: "display",
                label: "AutoSpike Key",
                object: Settings.AutoSpike,
                property: "key"
            }, {
                type: "button",
                label: "Set AutoSpike Key",
                action() {
                    pizdabol.setKeybind("AutoSpike")
                }
            }, {
                type: "display",
                label: "AutoWall Key",
                object: Settings.AutoWall,
                property: "key"
            }, {
                type: "button",
                label: "Set AutoWall Key",
                action() {
                    pizdabol.setKeybind("AutoWall")
                }
            }, {
                type: "checkbox",
                label: "AutoSpike 2",
                object: Settings.AutoSpike,
                property: "mode",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "Auto Aimbot&&Spike",
                object: Settings.SpikeA,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "select",
                label: "AutoSpike Priority 1",
                object: Settings.AutoSpike.priority,
                property: "0",
                options: ["Reidite Spike", "Amethyst Spike", "Diamond Spike", "Gold Spike", "Stone Spike", "Wood Spike", "Wood Wall"],
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "select",
                label: "AutoSpike Priority 2",
                object: Settings.AutoSpike.priority,
                property: "1",
                options: ["Reidite Spike", "Amethyst Spike", "Diamond Spike", "Gold Spike", "Stone Spike", "Wood Spike", "Wood Wall"],
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "select",
                label: "AutoSpike Priority 3",
                object: Settings.AutoSpike.priority,
                property: "2",
                options: ["Reidite Spike", "Amethyst Spike", "Diamond Spike", "Gold Spike", "Stone Spike", "Wood Spike", "Wood Wall"],
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "select",
                label: "AutoSpike Priority 4",
                object: Settings.AutoSpike.priority,
                property: "3",
                options: ["Reidite Spike", "Amethyst Spike", "Diamond Spike", "Gold Spike", "Stone Spike", "Wood Spike", "Wood Wall"],
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "select",
                label: "AutoSpike Priority 5",
                object: Settings.AutoSpike.priority,
                property: "4",
                options: ["Reidite Spike", "Amethyst Spike", "Diamond Spike", "Gold Spike", "Stone Spike", "Wood Spike", "Wood Wall"],
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "select",
                label: "AutoSpike Priority 6",
                object: Settings.AutoSpike.priority,
                property: "5",
                options: ["Reidite Spike", "Amethyst Spike", "Diamond Spike", "Gold Spike", "Stone Spike", "Wood Spike", "Wood Wall"],
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "select",
                label: "AutoSpike Priority 7",
                object: Settings.AutoSpike.priority,
                property: "6",
                options: ["Reidite Spike", "Amethyst Spike", "Diamond Spike", "Gold Spike", "Stone Spike", "Wood Spike", "Wood Wall"],
                onChange() {
                    pizdabol.saveSettings()
                }
            }], {
                folder: "AutoSpike"
            }),
            pizdamenu.Register([{
                type: "checkbox",
                label: "AutoSteal",
                object: Settings.AutoSteal,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "AutoUnlock",
                object: Settings.AutoSteal,
                property: "unlock",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "display",
                label: "AutoSteal Key",
                object: Settings.AutoSteal,
                property: "key"
            }, {
                type: "button",
                label: "Set AutoSteal Key",
                action() {
                    pizdabol.setKeybind("AutoSteal")
                }
            }], {
                folder: "AutoSteal"
            }),
            pizdamenu.Register([{
                type: "checkbox",
                label: "AutoCraft",
                object: Settings.AutoCraft,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "display",
                label: "AutoCraft Key",
                object: Settings.AutoCraft,
                property: "key"
            }, {
                type: "button",
                label: "Set AutoCraft Key",
                action() {
                    pizdabol.setKeybind("AutoCraft")
                }
            }, {
                type: "checkbox",
                label: "AutoRecycle",
                object: Settings.AutoRecycle,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "display",
                label: "AutoRecycle Key",
                object: Settings.AutoRecycle,
                property: "key"
            }, {
                type: "button",
                label: "Set AutoRecycle Key",
                action() {
                    pizdabol.setKeybind("AutoRecycle")
                }
            }], {
                folder: "AutoCraft&AutoRecycle"
            }),
            pizdamenu.Register([{
                type: "checkbox",
                label: "Spectator",
                object: Settings.Spectator,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "range",
                label: "Spectator Speed",
                min: .05,
                step: .05,
                max: 1,
                object: Settings.Spectator,
                property: "speed",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "display",
                label: "Spectator Key",
                object: Settings.Spectator,
                property: "key"
            }, {
                type: "button",
                label: "Set Spectator Key",
                action() {
                    pizdabol.setKeybind("Spectator")
                }
            }], {
                folder: "Spectator"
            }),
            pizdamenu.Register([{
                type: "checkbox",
                label: "AutoFarm",
                object: Settings.AutoFarm,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "AutoWater",
                object: Settings.AutoFarm,
                property: "water",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "display",
                label: "AutoFarm Key",
                object: Settings.AutoFarm,
                property: "key"
            }, {
                type: "button",
                label: "Set AutoFarm key",
                action() {
                    pizdabol.setKeybind("AutoFarm")
                }
            }, {
                type: "display",
                label: "X",
                object: Settings.AutoFarm,
                property: "x"
            }, {
                type: "display",
                label: "Y",
                object: Settings.AutoFarm,
                property: "y"
            }, {
                type: "display",
                label: "X2",
                object: Settings.AutoFarm,
                property: "xx"
            }, {
                type: "display",
                label: "Y2",
                object: Settings.AutoFarm,
                property: "yy"
            }, {
                type: "display",
                label: "SX",
                object: Settings.AutoFarm,
                property: "sx"
            }, {
                type: "display",
                label: "SY",
                object: Settings.AutoFarm,
                property: "sy"
            }, {
                type: "button",
                label: "Left Top Farm",
                action() {
                    const e = world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id));
                    e && (Settings.AutoFarm.x = Math.floor(e.x),
                    Settings.AutoFarm.y = Math.floor(e.y),
                    pizdabol.saveSettings())
                }
            }, {
                type: "button",
                label: "Right Bot Farm",
                action() {
                    const e = world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id));
                    e && (Settings.AutoFarm.xx = Math.floor(e.x),
                    Settings.AutoFarm.yy = Math.floor(e.y),
                    pizdabol.saveSettings())
                }
            }, {
                type: "button",
                label: "Safe Point",
                action() {
                    const e = world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id));
                    e && (Settings.AutoFarm.sx = Math.floor(e.x),
                    Settings.AutoFarm.sy = Math.floor(e.y),
                    pizdabol.saveSettings())
                }
            }], {
                folder: "AutoFarm"
            }),
            pizdamenu.Register([{
                type: "checkbox",
                label: "Zma Verify",
                object: Settings.ZmaVerify,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "PvpOrDie Verify",
                object: Settings.PvpOrDieVerify,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "Aob Verify",
                object: Settings.AobVerify,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "AutoCrownFORZMA",
                object: Settings.AutoCrown2,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "AutoGreenCrownFORZMA",
                object: Settings.AutoGreenCrown,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "range",
                label: "GreenDelay",
                min: 100,
                step: 10,
                max: 1e3,
                object: Settings,
                property: "amounfordelay",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "AutoBottle",
                object: Settings.AutoBottle,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "AutoPutReidite",
                object: Settings.AutoReidite,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }], {
                folder: "Verify&ZMA"
            }),
            pizdamenu.Register([{
                type: "checkbox",
                label: "PatchFinder",
                object: Settings.PatchFinder,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "text",
                label: "PatchFinder X",
                object: Settings.PatchFinder,
                property: "x",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "text",
                label: "PatchFinder Y",
                object: Settings.PatchFinder,
                property: "y",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "button",
                label: "Set PatchFinder X Y",
                action() {
                    const e = world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id));
                    if (e) {
                        const t = e => Math.floor(e / 100);
                        Settings.PatchFinder.x = t(e.x),
                        Settings.PatchFinder.y = t(e.y)
                    }
                }
            }], {
                folder: "PatchFinder"
            }),
            pizdamenu.Register([{
                type: "checkbox",
                label: "PlayerTracers",
                object: Settings.PlayerTracers,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "KrakenTracers",
                object: Settings.KrakenTracers,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "SandwormTracers",
                object: Settings.SandwormTracers,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "SpiderTracers",
                object: Settings.SpiderTracers,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "WolfTracers",
                object: Settings.WolfTracers,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "RabbitTracers",
                object: Settings.RabbitTracers,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "VultureTracers",
                object: Settings.VultureTracers,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "BabyDragonTracers",
                object: Settings.BabyDragonTracers,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "checkbox",
                label: "BabyLavaDragonTracers",
                object: Settings.BabyLavaDragonTracers,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }], {
                folder: "Tracers"
            }),
            pizdamenu.Register([{
                type: "title",
                label: "Token Joiner"
            }, {
                type: "checkbox",
                label: "Token Joiner Enabled",
                object: Settings.TokenJoiner,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings(),
                    Settings.TokenJoiner.enabled && window.token && window.token_id && (user[vars.token] = window.token,
                    user[vars.token_id] = window.token_id)
                }
            }, {
                type: "text",
                label: "Token Joiner Token",
                object: Settings.TokenJoiner,
                property: "token",
                onChange(e) {
                    pizdabol.saveSettings(),
                    window.token = e
                }
            }, {
                type: "text",
                label: "Token Joiner TokenID",
                object: Settings.TokenJoiner,
                property: "token_id",
                onChange(e) {
                    pizdabol.saveSettings(),
                    window.token_id = e
                }
            }, {
                type: "title",
                label: "Token"
            }, {
                type: "button",
                label: "Go To Lobby",
                action() {
                    if (client) {
                        const e = client[Object.keys(client)[137]]();
                        e && e.call(window.client)
                    }
                }
            }, {
                type: "button",
                label: "Copy Token&TokenID",
                action() {
                    const e = document.cookie.split("; ").find((e => e.startsWith("starve_token="))).split("=")[1]
                      , t = document.cookie.split("; ").find((e => e.startsWith("starve_token_id="))).split("=")[1];
                    prompt("Ctrl + C", `\`\`\`TOKEN: ${e}\nTOKEN_ID: ${t}\`\`\``)
                }
            }], {
                folder: "Token"
            }),
            pizdamenu.Register([{
                type: "title",
                label: "AutoFire"
            }, {
                type: "checkbox",
                label: "Auto Fire Enabled",
                object: Settings.AutoFire,
                property: "enabled",
                onChange() {
                    pizdabol.saveSettings()
                }
            }, {
                type: "display",
                label: "AutoFire Key",
                object: Settings.AutoFire,
                property: "key"
            }, {
                type: "button",
                label: "Set AutoFire key",
                action() {
                    pizdabol.setKeybind("AutoFire")
                }
            }], {
                folder: "AutoFire"
            }),
            pizdamenu.Register([{
                type: "select",
                label: "Skin",
                options: c,
                onChange: e => {
                    const t = world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id));
                    t[vars.skin] = c.indexOf(e),
                    window.currentSkin = c.indexOf(e)
                }
            }, {
                type: "select",
                label: "Accessory",
                options: f,
                onChange: e => {
                    const t = world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id));
                    t[vars.accessory] = f.indexOf(e),
                    window.currentAccessory = f.indexOf(e)
                }
            }, {
                type: "select",
                label: "Book",
                options: d,
                onChange: e => {
                    const t = world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id));
                    t[vars.book] = d.indexOf(e),
                    window.currentBook = d.indexOf(e)
                }
            }, {
                type: "select",
                label: "Bag",
                options: p,
                onChange: e => {
                    const t = world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id));
                    t[vars.bag] = p.indexOf(e),
                    window.currentBag = p.indexOf(e)
                }
            }], {
                folder: "Skins"
            })
        },
        setKeybind: e => {
            Settings[e] && Settings[e].key && (Settings[e].key = "Press Any Key",
            document.addEventListener("keydown", (function t(n) {
                "Escape" === n.code ? Settings[e].key = "NONE" : Settings[e].key = n.code,
                document.removeEventListener("keydown", t),
                pizdabol.saveSettings()
            }
            )))
        },
        saveSettings: () => {
            for (let e in Settings) localStorage.setItem(e + "ZOV", JSON.stringify(Settings[e]))
        },
        loadSettings: () => {
            for (const e in Settings) {
                const t = localStorage.getItem(e + "ZOV");
                t && (Settings[e] = JSON.parse(t))
            }
            Settings.AimBot.enabled = !1,
            Settings.AutoSpike.enabled = !1,
            Settings.AutoFire.enabled = !1,
            Settings.AutoWall.enabled = !1,
            Settings.Xray.enabled = !1,
            Settings.AutoSeed.enabled = !1,
            Settings.AutoBreadTake.enabled = !1,
            Settings.SpikeA.enabled = !1,
            Settings.AutoSpike.delay || (Settings.AutoSpike.delay = 80),
            Settings.nows.autowall || (Settings.nows.autowall = Date.now()),
            Settings.nows.AutoIce || (Settings.nows.AutoIce = Date.now()),
            Settings.nows.spikeaimbot || (Settings.nows.spikeaimbot = Date.now())
        },
        LoadHack: () => {
            pizdabol.loadSettings();
            workerTimers.setInterval(v, 20);
                workerTimers.setInterval(y, 30);
                workerTimers.setInterval(m, 250);
            window.console.log(Settings);
            let e = unsafeWindow.document.createElement("script");
            e.src = "https://unpkg.com/guify@0.12.0/lib/guify.min.js"
            e.onload = () => pizdabol.LoadPizdabol(),
            unsafeWindow.document.body.appendChild(e)
            document.addEventListener("keydown", (e => {
                if (window.user) {
                    for (const t in Settings)
                        e.code === Settings[t].key && "hold" === Settings[t].keyMode && (Settings[t].enabled = !0);
                    "KeyW" == e.code && (is_top = !0),
                    "KeyS" == e.code && (is_bottom = !0),
                    "KeyD" == e.code && (is_right = !0),
                    "KeyA" == e.code && (is_left = !0)
                }
            }
            )),
            document.addEventListener("keyup", (e => {
                if (window.user) {
                    for (const t in Settings)
                        e.code === Settings[t].key && "hold" === Settings[t].keyMode && (Settings[t].enabled = !1);
                    "KeyW" == e.code && (is_top = !1),
                    "KeyS" == e.code && (is_bottom = !1),
                    "KeyD" == e.code && (is_right = !1),
                    "KeyA" == e.code && (is_left = !1)
                }
            }
            )),
            document.addEventListener("keypress", (e => {
                if (window.user) {
                    for (const t in Settings)
                        e.code === Settings[t].key && "press" === Settings[t].keyMode && (Settings[t].enabled = !Settings[t].enabled);
                    e.code !== Settings.Spectator.key || Settings.Spectator.enabled || (client[vars.socket].send(JSON.stringify([9])),
                    SpectatorVector = {
                        x: 0,
                        y: 0
                    })
                }
            }
            )),

            Hack = function() {
                if (requestAnimationFrame(Hack),
                !window.world || !window.client || !window.user)
                    return;
                if (!user.alive)
                    return;
                Settings.Spectator.enabled && (is_left && (user[vars.cam].x += 100 * Settings.Spectator.speed,
                SpectatorVector.x += 100 * Settings.Spectator.speed),
                is_right && (user[vars.cam].x -= 100 * Settings.Spectator.speed,
                SpectatorVector.x -= 100 * Settings.Spectator.speed),
                is_bottom && (user[vars.cam].y -= 100 * Settings.Spectator.speed,
                SpectatorVector.y -= 100 * Settings.Spectator.speed),
                is_top && (user[vars.cam].y += 100 * Settings.Spectator.speed,
                SpectatorVector.y += 100 * Settings.Spectator.speed));
                const e = performance.now();
                for (; times.length > 0 && times[0] <= e - 1e3; )
                    times.shift();
                times.push(e),
                performance.now() - TimeVar >= 1e3 && (TimeVar = performance.now(),
                FPS = times.length - 1);
                const t = world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id));
                let n = world[vars.units][0];
                if (Settings.idd.enabled)
                    try {
                        let e = Object.values(world[vars.units][0])[0]
                          , t = Object.keys(e)[1];
                        for (let e of n)
                            b.lineWidth = 7,
                            b.strokeStyle = h(e[t]) ? "green" : "red",
                            b.font = "30px Baloo Paaji",
                            b.strokeText(e[t], user[vars.cam].x + e.x, user[vars.cam].y + e.y),
                            b.fillStyle = "black",
                            b.fillText(e[t], user[vars.cam].x + e.x, user[vars.cam].y + e.y)
                    } catch (e) {}
                if (Settings.ListEnabledHacks.enabled) {
                    let e = 500;
                    for (const t in Settings)
                        Settings[t].enabled && Settings[t].draw && (b.save(),
                        b.font = "20px Baloo Paaji",
                        b.fillStyle = "#f00",
                        b.strokeStyle = "#000",
                        b.lineWidth = 8,
                        b.strokeText(t, 3, e),
                        b.fillText(t, 3, e),
                        b.restore(),
                        e += 20)
                }
                let o = world[vars.units][ITEMS.BED];
                if (o.length && t) {
                    var r = -8;
                    for (let e = 0; e < o.length; e++)
                        Math.abs(t.x - o[e].x) < 34 && Math.abs(t.y - o[e].y) < 34 && (b.font = "30px Baloo Paaji",
                        b.strokeStyle = "black",
                        b.lineWidth = 7,
                        b.strokeText("B", user[vars.auto_feed].translate.x - 4, user[vars.auto_feed].translate.y + r + 20),
                        b.fillStyle = "#5f57ff",
                        b.fillText("B", user[vars.auto_feed].translate.x - 4, user[vars.auto_feed].translate.y + r + 20),
                        r += 30)
                }
                if (b.restore(),
                Settings.Timers.enabled && vars.auto_feed && t && (k(UI[vars.gauges], t),
                world[vars.units][ITEMS.CHEST].forEach((e => {
                    e.action && Settings.ChestInfo.enabled && (null == vars.img && (vars.img = Object.keys(game[vars.chest_buttons][e.action / 2 - 1].info)[2]),
                    b.save(),
                    b.globalAlpha = 1,
                    function(e, t, n, o, r, i, a, s, l, u) {
                        void 0 !== t.tryLoad && 1 !== t.tryLoad() || (void 0 !== u ? e.drawImage(t, n, o, Math.max(1, r), Math.max(1, i), a, s, l, u) : void 0 !== i ? e.drawImage(t, n, o, r, i) : e.drawImage(t, n, o))
                    }(b, game[vars.chest_buttons][e.action / 2 - 1].info[vars.img][0], user[vars.cam].x + e.x - 33, user[vars.cam].y + e.y - 25, 67, 52),
                    b.globalAlpha = 1,
                    b.font = "18px Baloo Paaji",
                    b.lineWidth = 7,
                    b.strokeStyle = "rgb(0,0,0)",
                    b.strokeText(e.action / 2 - 1, user[vars.cam].x + e.x - 32, user[vars.cam].y + e.y - 12),
                    b.fillStyle = "rgb(255,255,255)",
                    b.fillText(e.action / 2 - 1, user[vars.cam].x + e.x - 32, user[vars.cam].y + e.y - 12),
                    b.strokeStyle = "rgb(0,0,0)",
                    b.strokeText("x" + e.info, user[vars.cam].x + e.x - 32, user[vars.cam].y + e.y + 30),
                    b.fillStyle = "rgb(255,255,255)",
                    b.fillText("x" + e.info, user[vars.cam].x + e.x - 32, user[vars.cam].y + e.y + 30),
                    b.restore())
                }
                ))),
                world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id))) {
                    const e = world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id));
                    if (Settings.PlayerTracers.enabled) {
                        world[vars.units][0].forEach((t => {
                            b.save(),
                            b.beginPath(),
                            b.strokeStyle = h(t) ? "#0f0" : "#f00",
                            b.lineWidth = 3,
                            b.moveTo(e.x + user[vars.cam].x, e.y + user[vars.cam].y),
                            b.lineTo(t.x + user[vars.cam].x, t.y + user[vars.cam].y),
                            b.stroke(),
                            b.restore()
                        }
                        ))
                    }
                    if (Settings.KrakenTracers.enabled) {
                        world[vars.units][66].forEach((t => {
                            b.save(),
                            b.beginPath(),
                            b.strokeStyle = "#440b8a",
                            b.lineWidth = 3,
                            b.moveTo(e.x + user[vars.cam].x, e.y + user[vars.cam].y),
                            b.lineTo(t.x + user[vars.cam].x, t.y + user[vars.cam].y),
                            b.stroke(),
                            b.restore()
                        }
                        ))
                    }
                    if (Settings.SandwormTracers.enabled) {
                        world[vars.units][76].forEach((t => {
                            b.save(),
                            b.beginPath(),
                            b.strokeStyle = "#000",
                            b.lineWidth = 3,
                            b.moveTo(e.x + user[vars.cam].x, e.y + user[vars.cam].y),
                            b.lineTo(t.x + user[vars.cam].x, t.y + user[vars.cam].y),
                            b.stroke(),
                            b.restore()
                        }
                        ))
                    }
                    if (Settings.SpiderTracers.enabled) {
                        world[vars.units][61].forEach((t => {
                            b.save(),
                            b.beginPath(),
                            b.strokeStyle = "#ffffff",
                            b.lineWidth = 3,
                            b.moveTo(e.x + user[vars.cam].x, e.y + user[vars.cam].y),
                            b.lineTo(t.x + user[vars.cam].x, t.y + user[vars.cam].y),
                            b.stroke(),
                            b.restore()
                        }
                        ))
                    }
                    if (Settings.WolfTracers.enabled) {
                        world[vars.units][60].forEach((t => {
                            b.save(),
                            b.beginPath(),
                            b.strokeStyle = "#8a0b5e",
                            b.lineWidth = 3,
                            b.moveTo(e.x + user[vars.cam].x, e.y + user[vars.cam].y),
                            b.lineTo(t.x + user[vars.cam].x, t.y + user[vars.cam].y),
                            b.stroke(),
                            b.restore()
                        }
                        ))
                    }
                    if (Settings.RabbitTracers.enabled) {
                        world[vars.units][80].forEach((t => {
                            b.save(),
                            b.beginPath(),
                            b.strokeStyle = "pink",
                            b.lineWidth = 3,
                            b.moveTo(e.x + user[vars.cam].x, e.y + user[vars.cam].y),
                            b.lineTo(t.x + user[vars.cam].x, t.y + user[vars.cam].y),
                            b.stroke(),
                            b.restore()
                        }
                        ))
                    }
                    if (Settings.VultureTracers.enabled) {
                        world[vars.units][75].forEach((t => {
                            b.save(),
                            b.beginPath(),
                            b.strokeStyle = "#42423c",
                            b.lineWidth = 3,
                            b.moveTo(e.x + user[vars.cam].x, e.y + user[vars.cam].y),
                            b.lineTo(t.x + user[vars.cam].x, t.y + user[vars.cam].y),
                            b.stroke(),
                            b.restore()
                        }
                        ))
                    }
                    if (Settings.BabyDragonTracers.enabled) {
                        world[vars.units][72].forEach((t => {
                            b.save(),
                            b.beginPath(),
                            b.strokeStyle = "#44dbb5",
                            b.lineWidth = 3,
                            b.moveTo(e.x + user[vars.cam].x, e.y + user[vars.cam].y),
                            b.lineTo(t.x + user[vars.cam].x, t.y + user[vars.cam].y),
                            b.stroke(),
                            b.restore()
                        }
                        ))
                    }
                    if (Settings.BabyLavaDragonTracers.enabled) {
                        world[vars.units][73].forEach((t => {
                            b.save(),
                            b.beginPath(),
                            b.strokeStyle = "#f00",
                            b.lineWidth = 3,
                            b.moveTo(e.x + user[vars.cam].x, e.y + user[vars.cam].y),
                            b.lineTo(t.x + user[vars.cam].x, t.y + user[vars.cam].y),
                            b.stroke(),
                            b.restore()
                        }
                        ))
                    }
                }
                Settings.BoxInfo.enabled && Settings.BoxInfo && (world[vars.units][ITEMS.DEAD_BOX].forEach((e => {
                    e.dissapear || (e.dissapear = Date.now() + 24e4),
                    e.hits || (e.hits = 0),
                    null == e.change && (e.change = !0),
                    e.hitten || (e.hitten = e => {
                        e.action == STATE.HURT && e.change && (e.change = !1,
                        e.hits++),
                        e.action != STATE.HURT && (e.change = !0)
                    }
                    ),
                    e.hitten(e);
                    const t = Math.ceil((e.dissapear - Date.now()) / 1e3);
                    b.save(),
                    b.lineWidth = 8,
                    b.font = "16px Baloo Paaji",
                    b.strokeStyle = "black",
                    b.fillStyle = "white",
                    b.strokeText("Dead", e.x - 20 + user[vars.cam].x, e.y + user[vars.cam].y - 20),
                    b.fillText("Dead", e.x - 20 + user[vars.cam].x, e.y + user[vars.cam].y - 20),
                    b.restore(),
                    b.save(),
                    b.lineWidth = 8,
                    b.font = "16px Baloo Paaji",
                    b.strokeStyle = "black",
                    b.fillStyle = "white",
                    b.strokeText(`${t} S`, e.x - 20 + user[vars.cam].x, e.y + user[vars.cam].y),
                    b.fillText(`${t} S`, e.x - 20 + user[vars.cam].x, e.y + user[vars.cam].y),
                    b.restore(),
                    b.save(),
                    b.lineWidth = 8,
                    b.font = "16px Baloo Paaji",
                    b.strokeStyle = "black",
                    b.fillStyle = "white",
                    b.strokeText(`count: ${e.hits}`, e.x - 20 + user[vars.cam].x, e.y + 20 + user[vars.cam].y),
                    b.fillText(`count: ${e.hits}`, e.x - 20 + user[vars.cam].x, e.y + 20 + user[vars.cam].y),
                    b.restore()
                }
                )),
                world[vars.units][ITEMS.CRATE].forEach((e => {
                    e.dissapear || (e.dissapear = Date.now() + 16e3),
                    e.hits || (e.hits = 0),
                    null == e.change && (e.change = !0),
                    e.hitten || (e.hitten = e => {
                        e.action == STATE.HURT && e.change && (e.change = !1,
                        e.hits++),
                        e.action != STATE.HURT && (e.change = !0)
                    }
                    ),
                    e.hitten(e);
                    const t = Math.ceil((e.dissapear - Date.now()) / 1e3);
                    b.save(),
                    b.lineWidth = 8,
                    b.font = "16px Baloo Paaji",
                    b.strokeStyle = "black",
                    b.fillStyle = "white",
                    b.strokeText("Drop", e.x - 20 + user[vars.cam].x, e.y + user[vars.cam].y - 20),
                    b.fillText("Drop", e.x - 20 + user[vars.cam].x, e.y + user[vars.cam].y - 20),
                    b.restore(),
                    b.save(),
                    b.lineWidth = 8,
                    b.font = "16px Baloo Paaji",
                    b.strokeStyle = "black",
                    b.fillStyle = "white",
                    b.strokeText(`${t} S`, e.x - 20 + user[vars.cam].x, e.y + user[vars.cam].y),
                    b.fillText(`${t} S`, e.x - 20 + user[vars.cam].x, e.y + user[vars.cam].y),
                    b.restore(),
                    b.save(),
                    b.lineWidth = 8,
                    b.font = "16px Baloo Paaji",
                    b.strokeStyle = "black",
                    b.fillStyle = "white",
                    b.strokeText(`hits: ${e.hits}`, e.x - 20 + user[vars.cam].x, e.y + 20 + user[vars.cam].y),
                    b.fillText(`hits: ${e.hits}`, e.x - 20 + user[vars.cam].x, e.y + 20 + user[vars.cam].y),
                    b.restore()
                }
                ))),
                Settings.TotemInfo && world[vars.units][ITEMS.TOTEM].forEach((e => {
                    Settings.TotemInfo.enabled && Settings.idd.enabled && (b.save(),
                    b.lineWidth = 8,
                    b.strokeStyle = "#000",
                    b.fillStyle = "#fff",
                    b.font = "22px Baloo Paaji",
                    b.strokeText(world[vars.players][e[vars.pid]][vars.nickname], e.x + user[vars.cam].x - 25, e.y + user[vars.cam].y),
                    b.fillText(world[vars.players][e[vars.pid]][vars.nickname], e.x + user[vars.cam].x - 25, e.y + user[vars.cam].y),
                    b.strokeText(e.info >= 16 ? e.info % 16 : e.info, e.x + user[vars.cam].x - 25, e.y + user[vars.cam].y + 20),
                    b.fillText(e.info >= 16 ? e.info % 16 : e.info, e.x + user[vars.cam].x - 25, e.y + user[vars.cam].y + 20),
                    b.strokeText(e.info >= 16 ? "L" : "U", e.x + user[vars.cam].x - 25, e.y + user[vars.cam].y + 40),
                    b.fillText(e.info >= 16 ? "L" : "U", e.x + user[vars.cam].x - 25, e.y + user[vars.cam].y + 40),
                    b.restore())
                }
                )),
                Settings.ExtractorInfo.enabled && [ITEMS.EXTRACTOR_MACHINE_REIDITE, ITEMS.EXTRACTOR_MACHINE_AMETHYST, ITEMS.EXTRACTOR_MACHINE_DIAMOND, ITEMS.EXTRACTOR_MACHINE_GOLD, ITEMS.EXTRACTOR_MACHINE_STONE].forEach((e => {
                    world[vars.units][e].forEach((e => {
                        b.save(),
                        b.strokeStyle = "#000",
                        b.fillStyle = "#fff",
                        b.lineWidth = 7,
                        b.font = "24px Baloo Paaji",
                        b.strokeText(((65280 & e.info) >> 8) + "x", user[vars.cam].x + e.x - 20, user[vars.cam].y + e.y + 15),
                        b.fillText(((65280 & e.info) >> 8) + "x", user[vars.cam].x + e.x - 20, user[vars.cam].y + e.y + 15),
                        b.strokeText((255 & e.info) + "x", user[vars.cam].x + e.x - 20, user[vars.cam].y + e.y - 5),
                        b.fillText((255 & e.info) + "x", user[vars.cam].x + e.x - 20, user[vars.cam].y + e.y - 5),
                        b.restore()
                    }
                    ))
                }
                )),
                Settings.MachineInfo.enabled && ([ITEMS.WINDMILL, ITEMS.BREAD_OVEN].forEach((e => {
                    world[vars.units][e].forEach((t => {
                        e == ITEMS.BREAD_OVEN ? (b.save(),
                        b.strokeStyle = "#000",
                        b.fillStyle = "#fff",
                        b.lineWidth = 7,
                        b.font = "24px Baloo Paaji",
                        b.strokeText("x" + (31 & t.info), user[vars.cam].x + t.x - 15, user[vars.cam].y + t.y),
                        b.fillText("x" + (31 & t.info), user[vars.cam].x + t.x - 15, user[vars.cam].y + t.y),
                        b.strokeText("x" + ((992 & t.info) >> 5), user[vars.cam].x + t.x - 15, user[vars.cam].y + t.y + 20),
                        b.fillText("x" + ((992 & t.info) >> 5), user[vars.cam].x + t.x - 15, user[vars.cam].y + t.y + 20),
                        b.strokeText("x" + ((31744 & t.info) >> 10), user[vars.cam].x + t.x - 15, user[vars.cam].y + t.y + 40),
                        b.fillText("x" + ((31744 & t.info) >> 10), user[vars.cam].x + t.x - 15, user[vars.cam].y + t.y + 40),
                        b.restore()) : (b.save(),
                        b.strokeStyle = "#000",
                        b.fillStyle = "#fff",
                        b.lineWidth = 7,
                        b.font = "24px Baloo Paaji",
                        b.strokeText(((65280 & t.info) >> 8) + "x", user[vars.cam].x + t.x - 20, user[vars.cam].y + t.y + 15),
                        b.fillText(((65280 & t.info) >> 8) + "x", user[vars.cam].x + t.x - 20, user[vars.cam].y + t.y + 15),
                        b.strokeText((255 & t.info) + "x", user[vars.cam].x + t.x - 20, user[vars.cam].y + t.y - 5),
                        b.fillText((255 & t.info) + "x", user[vars.cam].x + t.x - 20, user[vars.cam].y + t.y - 5),
                        b.restore())
                    }
                    ))
                }
                )),
                world[vars.units][ITEMS.EMERALD_MACHINE].forEach((e => {
                    let t = world[Object.keys(world)[3]];
                    if (Settings.idd.enabled)
                        try {
                            for (let n of t)
                                n[vars.pid] == e[vars.pid] && (b.save(),
                                b.lineWidth = 8,
                                b.strokeStyle = "#000",
                                b.fillStyle = "#EF2A2A",
                                b.font = "22px Baloo Paaji",
                                b.strokeText(world[vars.players][e[vars.pid]][vars.nickname], e.x + user[vars.cam].x - 25, e.y + user[vars.cam].y),
                                b.fillText(world[vars.players][e[vars.pid]][vars.nickname], e.x + user[vars.cam].x - 25, e.y + user[vars.cam].y),
                                b.restore())
                        } catch (e) {}
                }
                )))
            }
            ,
            Hack()
        },
    };
    function u() {
        x.water < 50 && okw && (client[vars.socket].send(JSON.stringify([packets.equip, 127])),
        okw = !1,
        workerTimers.setTimeout((function() {
            okw = !0
        }
        ), 1e3));
        const e = vars.inv && vars.n ? user[vars.inv][vars.n][136] ? 136 : user[vars.inv][vars.n][110] ? 110 : user[vars.inv][vars.n][145] ? 145 : user[vars.inv][vars.n][138] ? 138 : user[vars.inv][vars.n][117] ? 117 : user[vars.inv][vars.n][209] ? 209 : user[vars.inv][vars.n][207] ? 207 : user[vars.inv][vars.n][205] ? 205 : user[vars.inv][vars.n][189] ? 189 : user[vars.inv][vars.n][143] ? 143 : null : null;
        x.food < Settings.AutoFeed2.range && e && client[vars.socket].send(JSON.stringify([packets.equip, e]))
    }

    pizdabol.LoadHack();
    const c = ["Starver", "Angry", "Sad", "Happy 1", "What?", "Suspicious", "Scar", "In Trouble", "Cute", "Bored 1", "Happy 2", "Crazy", "Happy 3", "Very Cute", "Curious", "Bored 2", "Happy 4", "Scar 2", "Sick", "Somnambule", "Feel Bad", "Mmmh.", "Panic", "Hypnotic", "Stars in the eyes", "Seams", "Scared at night", "Vampire", "Zombie", "Devaster", "Dead Devaster", "Cactus", "Bee", "Camo Skin", "Blue Limax Skin", "Red Limax Skin", "Mr. Pumpkin", "Wood", "Zebra", "Tiger", "Day or Night", "Square Starver", "Voodoo Doll", "Frankenstein", "Old Mummy", "Werewolf", "Old Cthulhu", "Sea Man", "Old Pumpkin", "Old Snowman", "Old Christmas Tree Man", "Old Mrs Bell", "Old Elfy", "Old Mr Present", "My Dear Old Deer", "Mr Angel", "Mr Ice Cube", "Mr Snowman", "Crystal Sky Skin", "Radioactive Starver", "Eaten Cookie", "Blob Thing", "Machine Mask", "Mad", "Survivor", "Starverator", "Totem", "Big Pile of Sand", "Big Pile of Dirt", "Sandstone", "Lollipop 1", "Lollipop 2", "Lollipop 3", "Lollipop 4", "Yellow Bird", "Red Bird", "Blue Bird", "Owl", "Nemo", "Mr. Bread", "Mr. Bread 2", "Mr. Bread 3", "Red Berry", "Old Berry", "Cake", "Christmas Cake", "Mr. Pancake", "Mr. Taco", "Mr. Bottle", "Mr. Bottle 2", "Pink Rabbit", "Marshmallow", "Fox", "Raccoon", "Cloud", "Moon", "Mr. Panda", "Mr. Strawberry", "Mummy", "Dino", "Mr. Koala", "Bottle Protection", "Leaf Man", "Bubble", "Potato", "Axolotl", "Rusted Machine", "Starving Machine", "Night Stars", "Blue Jay", "Dave", "Smug", "Reclaimed", "Legacy Wolf", "Starver of the Seas", "Ice", "Sandwich Cookie", "Purple Geode", "Cyan Geode", "Yellow Geode", "Furnace Head", "Bag", "Lit Furnace Head", "Test Dummy", "Star-ver", "Starver Chest", "Starver Workbench", "Fish", "Crab", "Piranha", "Winter Fox", "Baby Foxy", "Winter Bear", "Hawk", "Nice Little Yuki", "Baby Yuki", "Mr. Carrot", "Bat Limax", "Mr. Crate", "Mr. Spider", "Mr. Spider 2", "Mr. Blue Starfish", "Mr. Orange Starfish", "Mr. Pink Starfish", "Mr. ShellMauve", "Mr. Shell Bead", "Angry Crab", "Penguin", "Mr. Boar", "I saw you", "It was funny", "You can scream", "Mr. Book", "Mr. Mammoth", "Mr. Mammoth 2", "Nightmare", "Shiny Crystal", "Water skin", "Fall Berry Bush Starver", "Christmas Berry Bush Starver", "Berry Bush Starver", "Tamer", "Tamon Wolf", "Tamon Snow Wolf", "Tamon Rabbit", "Tamon Snow Rabbit", "Tamon Bear", "Tamon Polar Bear", "Crying Angel", "Tamon Fennec", "Decay", "Pillow", "Exotic", "Apple", "Golden Apple", "Lava Cube", "Dragon Cube", "Will-O'-The-Wisp", "Flame", "Be a Tree", "Toxic Mutant", "Mr. Tomato", "Mr. Mauve, the Lapa", "Golden Fish", "LapaMauve", "LapaMauve ", "Mr. Burger", "Tropical Starver", "Mr. ShellPink", "Mr. OranShell", "Pepe", "Mr. Ant", "Mr. Watermelon", "Mr. Thornbush", "Cthulhu", "Mr. Cactus", "Momo", "Scream", "Tamon Dragon", "Forest Spirit", "Evil Goat", "Rotten", "Fossil", "Tamon Spectrum", "Black Cat", "Tamon Lynx", "Tamon Warg", "Tamon Menhir", "Mr. Garlic", "Robot Dragon", "Lava Dragon Version 1", "Lava Dragon Version 2", "Lava Dragon Version 3", "Ice Dragon Version 1", "Ice Dragon Version 2", "Ice Dragon Version 3", "Baby Dragon Version 1", "Baby Dragon Version 2", "Baby Lava", "Kraken", "Sandworm", "Mr. Golden Bread", "Starver Ores", "Poo", "Volcano Starver", "Lava Starver", "Revaster", "Awakened", "Tamon Ice Dragon", "Crystal Dragon", "Bone Dragon", "Tamon Warg Ghost", "Cursed", "Robot", "Blue Butterfly", "Yrifox", "Blob Skin"];
    const d = ["Book 1", "Book 2", "Book 3", "Book 4", "Damaged Book 1", "Damaged Book 2", "Scroll", "Clipboard", "Seed Book", "Camo Book", "Stone Tablet", "Reclaimed Book", "Star Book", "Gold Book", "Old Mysterious Paper", "Gold Engraving", "Ant Book", "Mummy Book", "Garlic Book", "Pumpkin Book", "Christmas Tree Book", "Diamond Book", "Obscure Book", "Rolled Parchment", "Cake Book", "Christmas Cake Book", "Fish Book", "Once upon a time", "Chrono Clock", "Recipe Book", "Amethyst Book", "Paint Pallet", "Watermelon Book", "Thornbush Book", "Menu", "Lover Letter", "Fresh-Baked Cookies", "Inside, there is just a book.", "Crafting Machine", "Winter Book", "Autumn Book", "Reidite Book", "Lava Book", "Lava Book 2", "Ocean Mystery", "Dragon Book", "Engineer Book", "Nightmare Book", "Mystery Book", "Cursed Book"];
    const p = ["Bag 1", "Old Bag", "Bag 2", "Bag 3", "Bag 4", "Bag 5", "Wood Pickaxe Bag", "Wood Carrier", "Bag 6", "Bag with Wooden Swords", "Big Bag", "Bag 6", "Easter Bag", "Star Bag", "Winter Bag", "Stone Carrier", "Stone Pickaxe Bag", "Bag Camouflage", "Bag with Stone Swords", "Cow Bag", "Starver Bag", "Crystal Sky Bag", "Portable Furnace", "Crate Bag", "Honey Pot", "Gold Carrier", "Gold Pickaxe Bag", "Mr and Mrs Bakers", "Bag with Golden Swords", "Explorer Bag", "Bamboo Bag", "Mummy Bag", "Watermelon Bag", "Garlic Bag", "Pumpkin Bag", "Oil Barel bag", "Tree Bag", "Lit Portable Furnace", "Christmas Berry Bush Bag", "Berry Bush Bag", "Fall Berry Bush Bag", "Reclaimed Bag", "a Rabbit in my Bag", "Bird's nest", "a Fish on your Back", "a Squirrel in my Bag", "Diamond Carrier", "Resources Bag", "Diamond Pickaxe Bag", "Bag with Diamond Swords", "My Cake Bag", "My Christmas Cake Bag", "Fish Bag", "Cloud Bag", "Bee Bag", "Bag and Bedroll", "Peasant's Bag", "Probably Stolen Bag", "Natural Bag", "Amethyst Carrier", "Amethyst Pickaxe Bag", "Your Baby", "Tropical Bag", "Bag with Amethyst Swords", "Ice Bag", "Thornbush Bag", "Autumn Bag", "Dino Egg Bag", "Magic Cloud Bag", "Chest Bag", "Tamon Spectum Bag", "Winter Peasant's Bag", "Reidite Carrier", "Lava Bag", "Lava Bag 2", "Dragon Bag", "Winter Ice Bag", "Reidite Pickaxe Bag", "Octopus Bowl", "Cave Bag", "Bag with Reidite Swords", "Engineer Bag"];
    const f = ["Nothing", "Pink Cheeks", "Heart", "Bandage 1", "Flower 1", "Bow 1", "Bandage 2", "Flower 2", "Bandage 3", "Foliage", "Peaceful", "Sparkles", "Luxury", "Snow Flakes Crown", "Glasses 1", "Bow 2", "Little Stars", "Pirate Eye Patch 1", "Pirate Eye Patch 2", "Clown nose", "Eye Patch", "Flower 3", "False Nose", "Red Cloth", "Blue Cloth", "Transparent Mask", "Starve.io Anime", "Hero Mask", "This starver is mad", "Scars", "In Search of Intelligence", "Reclaimed Bandage", "Unwrap Starver for Gift", "Star Glasses", "Great-aunt's Glasses", "Little Starver", "Little Glasses", "Flower Chain", "Horns", "Golden Flower", "Sleeping Mask", "Fish on your head", "Rose", "Grey Scarf", "Black Scarf", "Skull Mask", "Golden Monocle", "A simple instruction", "Garland", "The Doormat", "Copium Tanks", "Eyelashes", "Helmet Prototype", "Fancy Glasses", "Medecin Mask", "Mr. Mayor", "Sunglasses 2", "Starfish", "Berry", "Flake", "Leaf ", "A sword in your head", "Winter Scarf", "Winter Scarf 2", "Winter Scarf 3", "Mask with animal tracks", "Spring Mask", "Pink Mask", "Blue Mask", "Military Mask", "Orange Mask", "White and Red Points Mask", "Stick out your tongue Mask", "Two Teeth Mask", "Make-up Mask", "Sad Mask", "Happy Mask", "Blood", "Axed Plans", "Saddle", "I see", "I have no body and I must dress", "Cursed Crown", "Clown Face", "Sunglasses 3", "Engineer's Glasses", "Engineer's Monocle", "Mauve's butt", "Lapa Head", "Lapa Head ", "Mask and Glasses", "Tamon Spectrum Pet", "Jason", "Devil Horns", "Big Boss", "Baby Kraken", "Deer Antlers", "Baby Dragon on your head", "Gaz Mask and Glasses", "Pink Gaz Mask and Glasses", "Engineer Glasses", "Jarred Horns", "Curved Horns", "Evil Goat Horns", "Decorative Earmuffs", "Tamon Dragon Pet", "Blanket", "More than Level 5", "More than Level 10", "More than Level 15", "More than Level 20", "More than Level 25", "More than Level 30", "More than Level 35", "More than Level 40", "More than Level 45", "More than Level 50", "More than Level 55", "More than Level 60"];
    function g(e, t) {
        try {
            return e.x && e.y && t.x && t.y ? Math.sqrt((t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y)) : 0
        } catch (e) {
            return 0
        }
    }
    function h(e) {
        return user.id === e[vars.pid] || user[vars.team].includes(e[vars.pid])
    }
    var b = document.getElementById("game_canvas").getContext("2d");
    function m() {
        if (window.client && client[vars.socket]) {
            if (!window.world || !window.client || !window.user)
                return;
            if (!user.alive)
                return;
            const e = world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id));
            if (client[vars.socket].send(packets.PING),
            Settings.AutoCrown.enabled && !Settings.AutoCrown2.enabled && (log(user[vars.ghost].enabled),
            Date.now() - Settings.nows.autocrown > 5050 && user[vars.ghost].enabled)) {
                world[vars.units][22].forEach((t => {
                    g(t, e) <= 400 && (client[vars.socket].send(JSON.stringify([packets.revive, t[vars.pid], t.id])),
                    client[vars.socket].send(JSON.stringify([packets.equip, 79])))
                }
                )),
                Settings.nows.autocrown = Date.now()
            }
            let lastm;
            u(),
            vars.update_c && vars.update_connection && window.ThisTabMiniMized && (game[vars.update_c](),
            game[vars.update_connection](),
            e && (lastm = e),
            lastm && client[vars.socket].send(JSON.stringify([packets.send_angle, lastm.angle + ~~(3 * Math.random())])))
        }
    }
    function y() {
        if (window.client && client[vars.socket]) {
            if (!window.world || !window.client || !window.user)
                return;
            if (!user.alive)
                return;
            const e = world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id));
            if (Settings.AutoReidite.enabled) {
                world[vars.units][ITEMS.CHEST].forEach((t => {
                    g(t, e) <= 300 && (client[vars.socket].send(JSON.stringify([packets.chestPut, parseInt(INV.REIDITE), 255, t[vars.pid], t.id])),
                    client[vars.socket].send(JSON.stringify([packets.chestPut, parseInt(INV.GOLD), 255, t[vars.pid], t.id])))
                }
                ))
            }
        }
    }
    function v() {
        if (window.client && (client[vars.socket] && (client[vars.socket].current || (client[vars.socket].current = !0,
        client[vars.socket].send = new Proxy(client[vars.socket].send,{
            apply: function(e, t, n) {
                const o = [11, 29, 3, 9];
                let r;
                if ("string" == typeof n[0] && (JSON.parse(n[0])[0] == packets.recycle && (Settings.AutoRecycle.last = JSON.parse(n[0])[1]),
                1 == JSON.parse(n[0])[0] && 10 == JSON.parse(n[0])[2])) {
                    if (Settings.putthatmuchinchest.amount >= 255)
                        for (let e = 0; e < Settings.putthatmuchinchest.amount; e += 255)
                            client[vars.socket].send(JSON.stringify([JSON.parse(n[0])[0], JSON.parse(n[0])[1], 255, JSON.parse(n[0])[3], JSON.parse(n[0])[4]]))
                }
                if ("string" == typeof n[0] && (r = JSON.parse(n[0])[0]),
                !("string" == typeof n[0] && o.includes(r) && Settings.Spectator.enabled || "string" != typeof n[0] && o.includes(n[0][0]) && Settings.Spectator.enabled))
                    return e.apply(t, n)
            }
        }),
        client[vars.socket].addEventListener("message", (e => {
            if ("string" == typeof e.data)
                3 === (e = JSON.parse(e.data))[0] && (A = Date.now(),
                B = Date.now(),
                heal = !1,
                window.user.alive = !0);
            else {
                var t = new Uint8Array(e.data);
                switch (t[0]) {
                case 16:
                    (window.tm || Date.now()) - Date.now() > 12e4 && client[vars.socket].send(JSON.stringify([8, " "])),
                    u(),
                    A = Date.now(),
                    t[1] - x.hp > 0 && (B = Date.now(),
                    heal = !1),
                    heal && (B = Date.now()),
                    heal = !heal,
                    x = {
                        hp: t[1],
                        food: t[2],
                        temp: t[3],
                        water: t[4],
                        air: t[5],
                        heat: t[6]
                    };
                    break;
                case 25:
                    user.alive = !1;
                    break;
                case 28:
                    const e = world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id));
                    wokerTimers.setTimeout(( () => {
                        e[vars.clothe] != INV.CROWN_BLUE && client[vars.socket].send(JSON.stringify([packets.equip, 79]))
                    }
                    ), 250);
                    break;
                case 37:
                    x && (t[1] - x.hp > 0 && (B = Date.now(),
                    heal = !1),
                    x.hp = t[1]);
                    break;
                case 38:
                    x && (x.food = t[1]);
                    break;
                case 39:
                    x && (x.water = t[1]);
                    break;
                case 55:
                    x && (x.heat = t[1]);
                    break;
                case 56:
                    x && (x.temp = t[1]);
                    break;
                case 68:
                    window.sandstorm = t[1];
                    console.log("SANDSTORM: " + window.sandstorm);
                    break;
                case 69:
                    window.blizard = t[1]
                    console.log("BLIZZARD: " + window.blizard);
                    break;
                }
            }
        }
        )),
        client[vars.socket].addEventListener("close", ( () => user.alive = !1)))),
        client[vars.select_craft] && (client[vars.select_craft] = e => {
            Settings.AutoCraft.last = e,
            Settings.AutoBook && !Settings.AutoCraft.enabled && client[vars.socket].send(JSON.stringify([packets.equip, 28])),
            client[vars.socket].send(JSON.stringify([packets.craft, e]))
        }
        )),
        !window.world || !window.client || !window.user)
            return;
        if (!user.alive)
            return;
        const l = world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id))
          , c = Date.now();
        if (window.tm = c,
        l) {
            if (Settings.AutoTotem.enabled && c - Settings.nows.autototem > 80 && world[vars.units][ITEMS.TOTEM].forEach((e => {
                g(e, l) <= 300 && (client[vars.socket].send(JSON.stringify([packets.joinTotem, e[vars.pid], e.id])),
                Settings.nows.autototem = c)
            }
            )),
            Settings.ChaseEnemy.enabled && c - Settings.nows.chaseenemy > 50) {
                const e = world[vars.units][ITEMS.PLAYERS].filter((e => e[vars.pid] == Settings.ChaseEnemy.id));
                let t = 0;
                Math.sqrt(Math.pow(l.y - e.y, 2) + Math.pow(l.x - e.x, 2)) < 350 && (t = function(e, t, n) {
                    let o, r = 0, i = 2 * Math.PI;
                    switch (n && (o = Math.floor((calcAngle2(e, t) + i) % i * 360 / i)),
                    n || (o = Math.floor((calcAngle1(e, t) + i) % i * 360 / i)),
                    Math.round(o / 45)) {
                    case 0:
                    case 8:
                        r = 2;
                        break;
                    case 1:
                        r = 6;
                        break;
                    case 2:
                        r = 4;
                        break;
                    case 3:
                        r = 5;
                        break;
                    case 4:
                        r = 1;
                        break;
                    case 5:
                        r = 9;
                        break;
                    case 6:
                        r = 8;
                        break;
                    case 7:
                        r = 10
                    }
                    return r
                }(l, e, !0),
                client[vars.send_move](t)),
                Settings.nows.chaseenemy = c
            }
            if (Settings.AutoCraft.enabled && null != Settings.AutoCraft.last && c - Settings.nows.autocraft > 30 && (u(),
            client[vars.select_craft](Settings.AutoCraft.last),
            Settings.nows.autocraft = c),
            Settings.AutoRecycle.enabled && null != Settings.AutoRecycle.last && c - Settings.nows.autorecycle > 30 && (u(),
            client[vars.socket].send(JSON.stringify([packets.recycle, Settings.AutoRecycle.last])),
            Settings.nows.autorecycle = c),
            Settings.AutoFarm.enabled) {
                if (c - Settings.nows.autofarm > 250) {
                    if (!function(e, t, n, o, r, i) {
                        n > r && ([n,r] = [r, n]);
                        o > i && ([o,i] = [i, o]);
                        return e >= n && e <= r && t >= o && t <= i
                    }(l.x, l.y, Settings.AutoFarm.x, Settings.AutoFarm.y, Settings.AutoFarm.xx, Settings.AutoFarm.yy))
                        return client[vars.send_move](i(l, {
                            x: (Settings.AutoFarm.x + Settings.AutoFarm.xx) / 2,
                            y: (Settings.AutoFarm.y + Settings.AutoFarm.yy) / 2
                        })),
                        void (Settings.AutoFarm.angle = null);
                    for (const e of [world[vars.units][3], world[vars.units][31], world[vars.units][37], world[vars.units][39], world[vars.units][40], world[vars.units][43], world[vars.units][44], world[vars.units][54], world[vars.units][55]]) {
                        const t = o(l, e, 2e4);
                        if (t || (Settings.AutoFarm.angle = null,
                        client[vars.send_move](16)),
                        t) {
                            if ((user[vars.inv][vars.n][54] || user[vars.inv][vars.n][53]) && t && t.x >= Settings.AutoFarm.x && t.x <= Settings.AutoFarm.xx && t.y >= Settings.AutoFarm.y && t.y <= Settings.AutoFarm.yy) {
                                const e = i(l, t);
                                client[vars.send_move](e),
                                user[vars.inv][vars.n][54] && 54 != l.right ? client[vars.socket].send(JSON.stringify([packets.equip, 54])) : user[vars.inv][vars.n][53] && 53 != l.right && 54 != l.right && client[vars.socket].send(JSON.stringify([packets.equip, 53])),
                                Settings.AutoFarm.angle = s(l, t, !0),
                                g(t, l) <= 220 && (client[vars.socket].send(JSON.stringify([packets.attack, Settings.AutoFarm.angle])),
                                client[vars.socket].send(JSON.stringify([packets.stopAttack])));
                                break
                            }
                        } else if (Settings.AutoFarm.water) {
                            const t = r(l, e, 2e3);
                            if (t && t.x >= Settings.AutoFarm.x && t.x <= Settings.AutoFarm.xx && t.y >= Settings.AutoFarm.y && t.y <= Settings.AutoFarm.yy) {
                                const e = i(l, t);
                                client[vars.send_move](e),
                                49 != l.right && user[vars.inv][vars.n][49] && client[vars.socket].send(JSON.stringify([packets.equip, 49])),
                                Settings.AutoFarm.angle = s(l, t, !0),
                                g(t, l) <= 100 && (client[vars.socket].send(JSON.stringify([packets.attack, Settings.AutoFarm.angle])),
                                client[vars.socket].send(JSON.stringify([packets.stopAttack])))
                            }
                        } else if (Settings.AutoFarm.sx && Settings.AutoFarm.sy) {
                            const e = a(l, Settings.AutoFarm.sx, Settings.AutoFarm.sy);
                            client[vars.send_move](e),
                            Settings.AutoFarm.angle = null,
                            client[vars.send_move](16)
                        }
                    }
                    Settings.nows.autofarm = c
                }
            } else
                Settings.AutoFarm.angle = null;
            if (Settings.AutoSteal.enabled && c - Settings.nows.autosteal > 100) {
                const e = world[vars.units][11]
                  , t = world[vars.units][34]
                  , n = world[vars.units][32];
                e.forEach((e => {
                    g(e, l) <= 300 && (Settings.AutoSteal.unlock && !h(e) && e.action && client[vars.socket].send(JSON.stringify([packets.unlock, e[vars.pid], e.id])),
                    client[vars.socket].send(JSON.stringify([packets.chestTake, e[vars.pid], e.id])))
                }
                )),
                t.forEach((e => {
                    g(e, l) <= 300 && client[vars.socket].send(JSON.stringify([packets.ovenTake, e[vars.pid], e.id]))
                }
                )),
                n.forEach((e => {
                    g(e, l) <= 300 && client[vars.socket].send(JSON.stringify([packets.windMillTake, e[vars.pid], e.id]))
                }
                ));
                const o = [24, 25, 26, 27, 28];
                for (let e = 0; e < o.length; e++) {
                    world[vars.units][o[e]].forEach((e => {
                        g(e, l) <= 300 && client[vars.socket].send(JSON.stringify([packets.extTake, e[vars.pid], e.id, e.type]))
                    }
                    ))
                }
                Settings.nows.autosteal = c
            }
            if (Settings.AutoIce.enabled && c - Settings.nows.AutoIce > 300 && user[vars.inv][vars.n][142] && (100 - x.heat >= 99 && (log(x.heat),
            client[vars.socket].send(JSON.stringify([packets.equip, 142]))),
            Settings.nows.AutoIce = c),
            Settings.ZmaVerify.enabled && l && void 0 !== l.x && void 0 !== l.y && (l?.x >= 6650 && l?.x < 6750 && l?.y >= 1150 && l?.y < 1250 ? client[vars.send_move](2) : l?.x >= 6750 && l?.x < 6850 && l?.y >= 1150 && l?.y < 1250 ? client[vars.send_move](4) : l?.x >= 6750 && l?.x < 6850 && l?.y >= 1450 && l?.y < 1550 && client[vars.send_move](1)),
            Settings.AobVerify.enabled && l && void 0 !== l.x && void 0 !== l.y && (l?.x >= 8550 && l?.x < 8650 && l?.y >= 4850 && l?.y < 4950 ? client[vars.send_move](4) : l?.x >= 8550 && l?.x < 8650 && l?.y >= 5150 && l?.y < 5250 ? client[vars.send_move](1) : l?.x >= 8250 && l?.x < 8350 && l?.y >= 5150 && l?.y < 5250 && client[vars.send_move](8)),
            Settings.PvpOrDieVerify.enabled && l && void 0 !== l.x && void 0 !== l.y && (l?.x >= 4700 && l?.x < 4900 && l?.y >= 4700 && l?.y < 4900 ? client[vars.send_move](8) : l?.x >= 4700 && l?.x < 4900 && l?.y >= 4300 && l?.y < 4500 && client[vars.send_move](1)),
            Settings.AutoCrown2.enabled && !Settings.AutoCrown.enabled && acl && user[vars.ghost].enabled) {
                world[vars.units][22].forEach((e => {
                    g(e, l) <= 400 && (client[vars.socket].send(JSON.stringify([packets.revive, e[vars.pid], e.id])),
                    client[vars.socket].send(JSON.stringify([packets.equip, 79])),
                    acl = !1,
                    setTimeout(( () => {
                        acl = !0
                    }
                    ), 500))
                }
                ))
            }
            if (Settings.AutoGreenCrown.enabled && !cooldown && vars.clothe && 2 * x.hp < 180) {
                let e = l[vars.clothe];
                e != INV.CROWN_GREEN && user[vars.inv][vars.n][INV.CROWN_GREEN] && 1e4 - (Date.now() - B) < Settings.amounfordelay && (cooldown = !0,
                client[vars.socket].send(JSON.stringify([packets.equip, INV.CROWN_GREEN])),
                setTimeout(( () => {
                    client[vars.socket].send(JSON.stringify([packets.equip, e])),
                    setTimeout(( () => {
                        cooldown = !1
                    }
                    ), 1500)
                }
                ), 200))
            }
            if (Settings.AutoBottle.enabled && 2 * x.hp < 45 && aobxd && user[vars.inv][vars.n][INV.BOTTLE_FULL] && (client[vars.socket].send(JSON.stringify([packets.equip, INV.BOTTLE_FULL])),
            aobxd = !1,
            setTimeout(( () => {
                aobxd = !0
            }
            ), 1e3)),
            Settings.PatchFinder.enabled && l && void 0 !== l.x && void 0 !== l.y) {
                const e = 100 * Settings.PatchFinder.x
                  , t = 100 * Settings.PatchFinder.y
                  , n = e - l.x
                  , o = t - l.y
                  , r = Math.sqrt(n * n + o * o)
                  , i = Math.atan2(o, n)
                  , a = Math.PI / 8;
                r > 10 && (Math.abs(i) < a ? client[vars.send_move](2) : Math.abs(i) > Math.PI - a ? client[vars.send_move](1) : i > a && i < Math.PI - a ? client[vars.send_move](4) : client[vars.send_move](8))
            }
            if (Settings.SpikeA.enabled && Date.now() - Settings.nows.spikeaimbot > 150) {
                const e = world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id));
                let t = n(e, world[vars.units][ITEMS.PLAYERS], 300);
                if (t) {
                    if (g(e, t) <= Settings.SpikeA.range) {
                        let n = s(e, t, !0)
                          , o = 2 * Math.PI
                          , r = Math.floor((n + o) % o * 255 / o)
                          , i = null;
                        for (const e of Settings.AutoSpike.priority) {
                            if ("Reidite Spike" === e && user[vars.inv][vars.n][219]) {
                                i = 219;
                                break
                            }
                            if ("Amethyst Spike" === e && user[vars.inv][vars.n][123]) {
                                i = 123;
                                break
                            }
                            if ("Diamond Spike" === e && user[vars.inv][vars.n][170]) {
                                i = 170;
                                break
                            }
                            if ("Gold Spike" === e && user[vars.inv][vars.n][169]) {
                                i = 169;
                                break
                            }
                            if ("Stone Spike" === e && user[vars.inv][vars.n][168]) {
                                i = 168;
                                break
                            }
                            if ("Wood Spike" === e && user[vars.inv][vars.n][160]) {
                                i = 160;
                                break
                            }
                            if ("Wood Wall" === e && user[vars.inv][vars.n][162]) {
                                i = 162;
                                break
                            }
                        }
                        if (n && i && client[vars.socket] && e && client[vars.socket].send) {
                            client[vars.socket].send(JSON.stringify([packets.placeBuild, i, r, 0]));
                            for (let e = 0; e < 10; e++)
                                client[vars.socket].send(JSON.stringify([packets.placeBuild, i, (3 * e + r) % 255, 0])),
                                client[vars.socket].send(JSON.stringify([packets.placeBuild, i, (r - 3 * e + 255) % 255, 0]));
                            Settings.nows.spikeaimbot = Date.now()
                        }
                    }
                }
            }
            if (Settings.DropSword.enabled && c - Settings.nows.dropsword > 80 && t(l) && (client[vars.socket].send(JSON.stringify([packets.drop, l.right])),
            Settings.nows.dropsword = c),
            Settings.AutoBuild.enabled && c - Settings.nows.autobuild > 100) {
                const e = 2 * Math.PI;
                "Roofs" === Settings.AutoBuild.build && user[vars.inv][vars.n][190] ? (client[vars.socket].send(JSON.stringify([packets.placeBuild, 190, Math.floor((l.angle + e) % e * 255 / e), 1])),
                Settings.nows.autobuild = c) : "Bridges" === Settings.AutoBuild.build && user[vars.inv][vars.n][125] ? (client[vars.socket].send(JSON.stringify([packets.placeBuild, 125, Math.floor((l.angle + e) % e * 255 / e), 1])),
                Settings.nows.autobuild = c) : "Plots" === Settings.AutoBuild.build && user[vars.inv][vars.n][141] && (client[vars.socket].send(JSON.stringify([packets.placeBuild, 141, Math.floor((l.angle + e) % e * 255 / e), 1])),
                Settings.nows.autobuild = c)
            }
            if (Settings.AutoFire.enabled && c - Settings.nows.autofire > 100) {
                const e = user[vars.inv][vars.n][INV.BIG_FIRE]
                  , t = user[vars.inv][vars.n][INV.FIRE];
                if (t || t) {
                    const t = 2 * Math.PI
                      , n = Math.floor((l.angle + t) % t * 255 / t);
                    client[vars.socket].send(JSON.stringify([packets.placeBuild, e ? INV.BIG_FIRE : INV.FIRE, n, 0])),
                    Settings.nows.autofire = c
                }
            }
            if (Settings.AutoSeed.enabled && c - Settings.nows.autoseed > 100) {
                let e;
                switch (Settings.AutoSeed.seed) {
                case "Berry":
                    e = 115;
                    break;
                case "Wheat":
                    e = 132;
                    break;
                case "Pumpkin":
                    e = 188;
                    break;
                case "Thornbush":
                    e = 193;
                    break;
                case "Aloe":
                    e = 210;
                    break;
                case "Watermelon":
                    e = 208;
                    break;
                case "Garlic":
                    e = 191;
                    break;
                case "Carrot":
                    e = 204;
                    break;
                case "Tomato":
                    e = 206
                }
                if (e && user[vars.inv][vars.n][e]) {
                    const t = 2 * Math.PI
                      , n = Math.floor((l.angle + t) % t * 255 / t);
                    client[vars.socket].send(JSON.stringify([packets.placeBuild, e, n, 1])),
                    Settings.nows.autoseed = c
                }
            }
            if (Settings.AutoExtractorTake.enabled && c - Settings.nows.autoextractortake > 100) {
                const e = [24, 25, 26, 27, 28];
                for (let t = 0; t < e.length; t++) {
                    world[vars.units][e[t]].forEach((e => {
                        g(e, l) <= 300 && client[vars.socket].send(JSON.stringify([packets.extTake, e[vars.pid], e.id, e.type]))
                    }
                    ))
                }
                Settings.nows.autoextractortake = c
            }
            if (Settings.AutoExtractorPut.enabled && c - Settings.nows.autoextractorput > 100) {
                const e = [24, 25, 26, 27, 28];
                for (let t = 0; t < e.length; t++) {
                    world[vars.units][e[t]].forEach((e => {
                        g(e, l) <= 300 && client[vars.socket].send(JSON.stringify([packets.extPut, 255, e[vars.pid], e.id, e.type]))
                    }
                    ))
                }
                Settings.nows.autoextractorput = c
            }
            if (Settings.AutoBreadTake.enabled && c - Settings.nows.autobreadtake > 100) {
                const e = world[vars.units][34]
                  , t = world[vars.units][32];
                e.forEach((e => {
                    g(e, l) <= 300 && client[vars.socket].send(JSON.stringify([packets.ovenTake, e[vars.pid], e.id]))
                }
                )),
                t.forEach((e => {
                    g(e, l) <= 300 && client[vars.socket].send(JSON.stringify([packets.windMillTake, e[vars.pid], e.id]))
                }
                )),
                Settings.nows.autobreadtake = c
            }
            if (Settings.AutoBreadPut.enabled && c - Settings.nows.autobreadput > 100) {
                const e = world[vars.units][34]
                  , t = world[vars.units][32];
                e.forEach((e => {
                    g(e, l) <= 300 && (client[vars.socket].send(JSON.stringify([packets.ovenPutWood, 31, e[vars.pid], e.id])),
                    client[vars.socket].send(JSON.stringify([packets.ovenPutFlour, 31, e[vars.pid], e.id])))
                }
                )),
                t.forEach((e => {
                    g(e, l) <= 300 && client[vars.socket].send(JSON.stringify([packets.windMillPut, 255, e[vars.pid], e.id]))
                }
                )),
                Settings.nows.autobreadput = c
            }
            if (Settings.AutoSpike.enabled && c - Settings.nows.autospike > Settings.AutoSpike.delay) {
                let t;
                for (const e of Settings.AutoSpike.priority) {
                    if ("Reidite Spike" === e && user[vars.inv][vars.n][219]) {
                        t = 219;
                        break
                    }
                    if ("Amethyst Spike" === e && user[vars.inv][vars.n][123]) {
                        t = 123;
                        break
                    }
                    if ("Diamond Spike" === e && user[vars.inv][vars.n][170]) {
                        t = 170;
                        break
                    }
                    if ("Gold Spike" === e && user[vars.inv][vars.n][169]) {
                        t = 169;
                        break
                    }
                    if ("Stone Spike" === e && user[vars.inv][vars.n][168]) {
                        t = 168;
                        break
                    }
                    if ("Wood Spike" === e && user[vars.inv][vars.n][160]) {
                        t = 160;
                        break
                    }
                    if ("Wood Wall" === e && user[vars.inv][vars.n][162]) {
                        t = 162;
                        break
                    }
                }
                if (t) {
                    const n = world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id))
                      , o = 2 * Math.PI;
                    let r = Math.floor((n.angle + o) % o * 255 / o);
                    if (Settings.AimBot.angle && (r = Math.floor((Settings.AimBot.angle + o) % o * 255 / o)),
                    client[vars.socket].send(JSON.stringify([packets.placeBuild, t, r, 0])),
                    Settings.AutoSpike.mode)
                        for (let n = 0; n < 12; n++)
                            client[vars.socket].send(JSON.stringify([packets.placeBuild, t, e(r, n * Settings.spkrange / 20), 0])),
                            client[vars.socket].send(JSON.stringify([packets.placeBuild, t, e(r, -n * Settings.spkrange / 20), 0]));
                    Settings.nows.autospike = c
                }
            }
            if (Settings.AutoWall.enabled && c - Settings.nows.autowall > 250) {
                let t;
                for (const e of Settings.AutoWall.priority) {
                    if ("Wood Wall" === e && user[vars.inv][vars.n][162]) {
                        t = 162;
                        break
                    }
                    if ("Stone Wall" === e && user[vars.inv][vars.n][163]) {
                        t = 163;
                        break
                    }
                    if ("Gold Wall" === e && user[vars.inv][vars.n][164]) {
                        t = 164;
                        break
                    }
                    if ("Diamond Wall" === e && user[vars.inv][vars.n][165]) {
                        t = 165;
                        break
                    }
                    if ("Amethyst Wall" === e && user[vars.inv][vars.n][122]) {
                        t = 122;
                        break
                    }
                    if ("Reidite Wall" === e && user[vars.inv][vars.n][217]) {
                        t = 217;
                        break
                    }
                }
                if (t) {
                    const n = world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id))
                      , o = 2 * Math.PI;
                    let r = Math.floor((n.angle + o) % o * 255 / o);
                    Settings.AimBot.angle && (r = Math.floor((Settings.AimBot.angle + o) % o * 255 / o)),
                    client[vars.socket].send(JSON.stringify([packets.placeBuild, t, r, 0]));
                    for (let n = 0; n < 30; n += 5)
                        client[vars.socket].send(JSON.stringify([packets.placeBuild, t, e(r, n), 0])),
                        client[vars.socket].send(JSON.stringify([packets.placeBuild, t, e(r, -n), 0]));
                    Settings.nows.autowall = c
                }
            }
        }
    }

function blizzard_sandstorm()
{
    var use = -8;
    const n = document.getElementById("game_canvas").getContext("2d");
    if(window.blizard)
    {
        n.drawImage(blizImage, user[vars.auto_feed].translate.x - 100, user[vars.auto_feed].translate.y + use - 80);
        use+=70;
    }
    if(window.sandstorm)
    {
        n.drawImage(sandImage, user[vars.auto_feed].translate.x - 100, user[vars.auto_feed].translate.y + use - 80);
        use+=70;
    }
}
function gauges()
{
    if(Settings.Gauges.enabled)
    {
        n.strokeText(`${x.food}%`, window.innerWidth / 2 - 130, window.innerHeight - 50 - 70),
        n.fillText(`${x.food}%`, window.innerWidth / 2 - 130, window.innerHeight - 50 - 70),
        n.strokeText(`${x.temp + 100 - x.heat}%`, window.innerWidth / 2 + 210 - 120, window.innerHeight - 50 - 70),
        n.fillText(`${x.temp + 100 - x.heat}%`, window.innerWidth / 2 + 210 - 120, window.innerHeight - 50 - 70),
        n.strokeText(`${x.hp}%`, window.innerWidth / 2 - 270 - 100, window.innerHeight - 50 - 70),
        n.fillText(`${x.hp}%`, window.innerWidth / 2 - 270 - 100, window.innerHeight - 50 - 70),
        n.strokeText(`${x.water}%`, window.innerWidth / 2 + 450 - 120, window.innerHeight - 50 - 70),
        n.fillText(`${x.water}%`, window.innerWidth / 2 + 450 - 120, window.innerHeight - 50 - 70)
    }
    return 1;
}
    function k(e, t) {
        window.outerWidth,
        window.innerWidth;
        const n = document.getElementById("game_canvas").getContext("2d");
        Settings.Timers.enabled && (n.save(),
        n.beginPath(),
        n.lineWidth = 6,
        n.fillStyle = "#AF352A",
        n.strokeStyle = "black",
        n.font = "34px Baloo Paaji",
        n.strokeText(Math.round(6 - (Date.now() - A) / 1e3) + "s", window.innerWidth / 2, window.innerHeight - 50 - 90),
        n.fillText(Math.round(6 - (Date.now() - A) / 1e3) + "s", window.innerWidth / 2, window.innerHeight - 50 - 90),
        n.beginPath(),
        n.lineWidth = 6,
        n.font = "34px Baloo Paaji",
        n.fillStyle = "#68a149",
        n.strokeStyle = "black",
        n.strokeText((10 - (Date.now() - B) / 1000).toFixed(1) + "s", t.x + user[vars.cam].x - 20, t.y + user[vars.cam].y + 55),
        n.fillText((10 - (Date.now() - B) / 1000).toFixed(1) + "s", t.x + user[vars.cam].x - 20, t.y + user[vars.cam].y + 55),
        n.beginPath(),
        n.lineWidth = 6,
        n.fillStyle = "white",
        n.strokeStyle = "black",
        n.font = "34px Baloo Paaji",
        n.strokeText(`${Math.round(FPS)}Hz`, user[vars.auto_feed].translate.x - 200, user[vars.auto_feed].translate.y - 50),
        n.fillText(`${Math.round(FPS)}Hz`, user[vars.auto_feed].translate.x - 200, user[vars.auto_feed].translate.y - 50),
        blizzard_sandstorm(),
        n.restore())
        Settings.Gauges.enabled && (n.save(),
            n.save(),
            n.beginPath(),
            n.lineWidth = 6,
            n.fillStyle = "white",
            n.strokeStyle = "black",
            n.font = "34px Baloo Paaji",
            n.strokeText(`${x.food}%`, window.innerWidth / 2 - 130, window.innerHeight - 50 - 70),
            n.fillText(`${x.food}%`, window.innerWidth / 2 - 130, window.innerHeight - 50 - 70),
            n.strokeText(`${x.temp + 100 - x.heat}%`, window.innerWidth / 2 + 210 - 120, window.innerHeight - 50 - 70),
            n.fillText(`${x.temp + 100 - x.heat}%`, window.innerWidth / 2 + 210 - 120, window.innerHeight - 50 - 70),
            n.strokeText(`${x.hp}%`, window.innerWidth / 2 - 270 - 100, window.innerHeight - 50 - 70),
            n.fillText(`${x.hp}%`, window.innerWidth / 2 - 270 - 100, window.innerHeight - 50 - 70),
            n.strokeText(`${x.water}%`, window.innerWidth / 2 + 450 - 120, window.innerHeight - 50 - 70),
            n.fillText(`${x.water}%`, window.innerWidth / 2 + 450 - 120, window.innerHeight - 50 - 70),
        n.restore())
    }
    window.drawTimers = k,
    document.ondblclick = e => {
        let t = world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id));
        window.currentAccessory && (t[vars.accessory] = currentAccessory),
        window.currentBag && (t[vars.bag] = currentBag),
        window.currentBook && (t[vars.book] = currentBook),
        window.currentSkin && (t[vars.skin] = currentSkin)
    }
    ,
    b.drawImage = new Proxy(b.drawImage,{
        apply() {
            return Settings.Xray.enabled && (arguments[1].globalAlpha = .5),
            Settings.Roofs.enabled && -146 == arguments[2]?.[3] && -145 == arguments[2]?.[4] && (arguments[1].globalAlpha = .3),
            Reflect.apply(...arguments)
        }
    });
    setTimeout((function() {
        let e = user[vars.cam][vars.update];
        user[vars.cam][vars.update] = function() {
            Settings.Spectator.enabled || e.call(user[vars.cam])
        }
        ;
        let o = user.control[vars.update];
        user.control[vars.update] = function() {
            o.call(user.control);
            let e = world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id));
            if (e)
                if (Settings.AimBot.enabled) {
                    let o = 0;
                    switch (t(e)) {
                    case "AXE":
                        o = 110;
                        break;
                    case "SWORD":
                        o = 140;
                        break;
                    case "SPEAR":
                        o = 200;
                        break;
                    case "PIRATE":
                        o = 150
                    }
                    if (o) {
                        const t = n(e, world[vars.units][0], o);
                        if (t) {
                            Settings.AimBot.angle = s(e, t, !0),
                            Settings.AimBot.cleanAngle = s(e, t, !1);
                            const n = 2 * Math.PI
                              , o = Math.floor((Settings.AimBot.angle + n) % n * 255 / n);
                            client[vars.socket].send(JSON.stringify([packets.attack, o])),
                            client[vars.socket].send(JSON.stringify([packets.stopAttack])),
                            world[vars.units][ITEMS.PLAYERS].find((e => e[vars.pid] == user.id)).angle = Settings.AimBot.angle
                        } else
                            Settings.AimBot.angle = null
                    } else
                        Settings.AimBot.angle = null
                } else
                    Settings.AimBot.angle = null
        }
    }
    ), 10000),
    window.console = saveconsole
    alert("discord https://discord.gg/e2wpVMhRqp");
}
), 1000);
