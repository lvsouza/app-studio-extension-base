var Re = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function He(A) {
  return A && A.__esModule && Object.prototype.hasOwnProperty.call(A, "default") ? A.default : A;
}
function Ue(A) {
  if (A.__esModule) return A;
  var H = A.default;
  if (typeof H == "function") {
    var E = function x() {
      return this instanceof x ? Reflect.construct(H, arguments, this.constructor) : H.apply(this, arguments);
    };
    E.prototype = H.prototype;
  } else E = {};
  return Object.defineProperty(E, "__esModule", { value: !0 }), Object.keys(A).forEach(function(x) {
    var I = Object.getOwnPropertyDescriptor(A, x);
    Object.defineProperty(E, x, I.get ? I : {
      enumerable: !0,
      get: function() {
        return A[x];
      }
    });
  }), E;
}
var X = { exports: {} };
const Ce = {}, Ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ce
}, Symbol.toStringTag, { value: "Module" })), C = /* @__PURE__ */ Ue(Ie);
/**
 * workerpool.js
 * https://github.com/josdejong/workerpool
 *
 * Offload tasks to a pool of workers on node.js and in the browser.
 *
 * @version 9.2.0
 * @date    2024-10-11
 *
 * @license
 * Copyright (C) 2014-2022 Jos de Jong <wjosdejong@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
(function(A, H) {
  (function(E, x) {
    x(H);
  })(Re, function(E) {
    var x = {}, I = { exports: {} };
    (function(t) {
      var s = function(f) {
        return typeof f < "u" && f.versions != null && f.versions.node != null && f + "" == "[object process]";
      };
      t.exports.isNode = s, t.exports.platform = typeof process < "u" && s(process) ? "node" : "browser";
      var i = t.exports.platform === "node" && C;
      t.exports.isMainThread = t.exports.platform === "node" ? (!i || i.isMainThread) && !process.connected : typeof Window < "u", t.exports.cpus = t.exports.platform === "browser" ? self.navigator.hardwareConcurrency : C.cpus().length;
    })(I);
    var q = I.exports, z = {}, J;
    function F() {
      if (J) return z;
      J = 1;
      function t(f, g) {
        var e = this;
        if (!(this instanceof t))
          throw new SyntaxError("Constructor must be called with the new operator");
        if (typeof f != "function")
          throw new SyntaxError("Function parameter handler(resolve, reject) missing");
        var O = [], k = [];
        this.resolved = !1, this.rejected = !1, this.pending = !0;
        var T = function(r, u) {
          O.push(r), k.push(u);
        };
        this.then = function(o, r) {
          return new t(function(u, l) {
            var w = o ? s(o, u, l) : u, j = r ? s(r, u, l) : l;
            T(w, j);
          }, e);
        };
        var W = function(r) {
          return e.resolved = !0, e.rejected = !1, e.pending = !1, O.forEach(function(u) {
            u(r);
          }), T = function(l, w) {
            l(r);
          }, W = a = function() {
          }, e;
        }, a = function(r) {
          return e.resolved = !1, e.rejected = !0, e.pending = !1, k.forEach(function(u) {
            u(r);
          }), T = function(l, w) {
            w(r);
          }, W = a = function() {
          }, e;
        };
        this.cancel = function() {
          return g ? g.cancel() : a(new i()), e;
        }, this.timeout = function(o) {
          if (g)
            g.timeout(o);
          else {
            var r = setTimeout(function() {
              a(new h("Promise timed out after " + o + " ms"));
            }, o);
            e.always(function() {
              clearTimeout(r);
            });
          }
          return e;
        }, f(function(o) {
          W(o);
        }, function(o) {
          a(o);
        });
      }
      function s(f, g, e) {
        return function(O) {
          try {
            var k = f(O);
            k && typeof k.then == "function" && typeof k.catch == "function" ? k.then(g, e) : g(k);
          } catch (T) {
            e(T);
          }
        };
      }
      t.prototype.catch = function(f) {
        return this.then(null, f);
      }, t.prototype.always = function(f) {
        return this.then(f, f);
      }, t.prototype.finally = function(f) {
        var g = this, e = function() {
          return new t(function(k) {
            return k();
          }).then(f).then(function() {
            return g;
          });
        };
        return this.then(e, e);
      }, t.all = function(f) {
        return new t(function(g, e) {
          var O = f.length, k = [];
          O ? f.forEach(function(T, W) {
            T.then(function(a) {
              k[W] = a, O--, O == 0 && g(k);
            }, function(a) {
              O = 0, e(a);
            });
          }) : g(k);
        });
      }, t.defer = function() {
        var f = {};
        return f.promise = new t(function(g, e) {
          f.resolve = g, f.reject = e;
        }), f;
      };
      function i(f) {
        this.message = f || "promise cancelled", this.stack = new Error().stack;
      }
      i.prototype = new Error(), i.prototype.constructor = Error, i.prototype.name = "CancellationError", t.CancellationError = i;
      function h(f) {
        this.message = f || "timeout exceeded", this.stack = new Error().stack;
      }
      return h.prototype = new Error(), h.prototype.constructor = Error, h.prototype.name = "TimeoutError", t.TimeoutError = h, z.Promise = t, z;
    }
    function Y(t, s) {
      (s == null || s > t.length) && (s = t.length);
      for (var i = 0, h = Array(s); i < s; i++) h[i] = t[i];
      return h;
    }
    function fe(t, s) {
      var i = typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
      if (!i) {
        if (Array.isArray(t) || (i = he(t)) || s) {
          i && (t = i);
          var h = 0, f = function() {
          };
          return {
            s: f,
            n: function() {
              return h >= t.length ? {
                done: !0
              } : {
                done: !1,
                value: t[h++]
              };
            },
            e: function(k) {
              throw k;
            },
            f
          };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      var g, e = !0, O = !1;
      return {
        s: function() {
          i = i.call(t);
        },
        n: function() {
          var k = i.next();
          return e = k.done, k;
        },
        e: function(k) {
          O = !0, g = k;
        },
        f: function() {
          try {
            e || i.return == null || i.return();
          } finally {
            if (O) throw g;
          }
        }
      };
    }
    function ce(t, s, i) {
      return (s = pe(s)) in t ? Object.defineProperty(t, s, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : t[s] = i, t;
    }
    function Z(t, s) {
      var i = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var h = Object.getOwnPropertySymbols(t);
        s && (h = h.filter(function(f) {
          return Object.getOwnPropertyDescriptor(t, f).enumerable;
        })), i.push.apply(i, h);
      }
      return i;
    }
    function le(t) {
      for (var s = 1; s < arguments.length; s++) {
        var i = arguments[s] != null ? arguments[s] : {};
        s % 2 ? Z(Object(i), !0).forEach(function(h) {
          ce(t, h, i[h]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : Z(Object(i)).forEach(function(h) {
          Object.defineProperty(t, h, Object.getOwnPropertyDescriptor(i, h));
        });
      }
      return t;
    }
    function de(t, s) {
      if (typeof t != "object" || !t) return t;
      var i = t[Symbol.toPrimitive];
      if (i !== void 0) {
        var h = i.call(t, s || "default");
        if (typeof h != "object") return h;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (s === "string" ? String : Number)(t);
    }
    function pe(t) {
      var s = de(t, "string");
      return typeof s == "symbol" ? s : s + "";
    }
    function $(t) {
      "@babel/helpers - typeof";
      return $ = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(s) {
        return typeof s;
      } : function(s) {
        return s && typeof Symbol == "function" && s.constructor === Symbol && s !== Symbol.prototype ? "symbol" : typeof s;
      }, $(t);
    }
    function he(t, s) {
      if (t) {
        if (typeof t == "string") return Y(t, s);
        var i = {}.toString.call(t).slice(8, -1);
        return i === "Object" && t.constructor && (i = t.constructor.name), i === "Map" || i === "Set" ? Array.from(t) : i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? Y(t, s) : void 0;
      }
    }
    var D = { exports: {} }, U = {}, ee;
    function me() {
      return ee || (ee = 1, U.validateOptions = function(s, i, h) {
        if (s) {
          var f = s ? Object.keys(s) : [], g = f.find(function(O) {
            return !i.includes(O);
          });
          if (g)
            throw new Error('Object "' + h + '" contains an unknown option "' + g + '"');
          var e = i.find(function(O) {
            return Object.prototype[O] && !f.includes(O);
          });
          if (e)
            throw new Error('Object "' + h + '" contains an inherited option "' + e + '" which is not defined in the object itself but in its prototype. Only plain objects are allowed. Please remove the option from the prototype or override it with a value "undefined".');
          return s;
        }
      }, U.workerOptsNames = ["credentials", "name", "type"], U.forkOptsNames = ["cwd", "detached", "env", "execPath", "execArgv", "gid", "serialization", "signal", "killSignal", "silent", "stdio", "uid", "windowsVerbatimArguments", "timeout"], U.workerThreadOptsNames = ["argv", "env", "eval", "execArgv", "stdin", "stdout", "stderr", "workerData", "trackUnmanagedFds", "transferList", "resourceLimits", "name"]), U;
    }
    var B, re;
    function ve() {
      return re || (re = 1, B = `!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e="undefined"!=typeof globalThis?globalThis:e||self).worker=n()}(this,(function(){"use strict";function e(n){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(n)}function n(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var t={};var r=function(e,n){this.message=e,this.transfer=n},o={};function i(e,n){var t=this;if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");if("function"!=typeof e)throw new SyntaxError("Function parameter handler(resolve, reject) missing");var r=[],o=[];this.resolved=!1,this.rejected=!1,this.pending=!0;var a=function(e,n){r.push(e),o.push(n)};this.then=function(e,n){return new i((function(t,r){var o=e?u(e,t,r):t,i=n?u(n,t,r):r;a(o,i)}),t)};var f=function(e){return t.resolved=!0,t.rejected=!1,t.pending=!1,r.forEach((function(n){n(e)})),a=function(n,t){n(e)},f=d=function(){},t},d=function(e){return t.resolved=!1,t.rejected=!0,t.pending=!1,o.forEach((function(n){n(e)})),a=function(n,t){t(e)},f=d=function(){},t};this.cancel=function(){return n?n.cancel():d(new s),t},this.timeout=function(e){if(n)n.timeout(e);else{var r=setTimeout((function(){d(new c("Promise timed out after "+e+" ms"))}),e);t.always((function(){clearTimeout(r)}))}return t},e((function(e){f(e)}),(function(e){d(e)}))}function u(e,n,t){return function(r){try{var o=e(r);o&&"function"==typeof o.then&&"function"==typeof o.catch?o.then(n,t):n(o)}catch(e){t(e)}}}function s(e){this.message=e||"promise cancelled",this.stack=(new Error).stack}function c(e){this.message=e||"timeout exceeded",this.stack=(new Error).stack}return i.prototype.catch=function(e){return this.then(null,e)},i.prototype.always=function(e){return this.then(e,e)},i.prototype.finally=function(e){var n=this,t=function(){return new i((function(e){return e()})).then(e).then((function(){return n}))};return this.then(t,t)},i.all=function(e){return new i((function(n,t){var r=e.length,o=[];r?e.forEach((function(e,i){e.then((function(e){o[i]=e,0==--r&&n(o)}),(function(e){r=0,t(e)}))})):n(o)}))},i.defer=function(){var e={};return e.promise=new i((function(n,t){e.resolve=n,e.reject=t})),e},s.prototype=new Error,s.prototype.constructor=Error,s.prototype.name="CancellationError",i.CancellationError=s,c.prototype=new Error,c.prototype.constructor=Error,c.prototype.name="TimeoutError",i.TimeoutError=c,o.Promise=i,function(n){var t=r,i=o.Promise,u="__workerpool-cleanup__",s={exit:function(){}},c={addAbortListener:function(e){s.abortListeners.push(e)},emit:s.emit};if("undefined"!=typeof self&&"function"==typeof postMessage&&"function"==typeof addEventListener)s.on=function(e,n){addEventListener(e,(function(e){n(e.data)}))},s.send=function(e,n){n?postMessage(e,n):postMessage(e)};else{if("undefined"==typeof process)throw new Error("Script must be executed as a worker");var a;try{a=require("worker_threads")}catch(n){if("object"!==e(n)||null===n||"MODULE_NOT_FOUND"!==n.code)throw n}if(a&&null!==a.parentPort){var f=a.parentPort;s.send=f.postMessage.bind(f),s.on=f.on.bind(f),s.exit=process.exit.bind(process)}else s.on=process.on.bind(process),s.send=function(e){process.send(e)},s.on("disconnect",(function(){process.exit(1)})),s.exit=process.exit.bind(process)}function d(e){return Object.getOwnPropertyNames(e).reduce((function(n,t){return Object.defineProperty(n,t,{value:e[t],enumerable:!0})}),{})}function l(e){return e&&"function"==typeof e.then&&"function"==typeof e.catch}s.methods={},s.methods.run=function(e,n){var t=new Function("return ("+e+").apply(this, arguments);");return t.worker=c,t.apply(t,n)},s.methods.methods=function(){return Object.keys(s.methods)},s.terminationHandler=void 0,s.abortListenerTimeout=1e3,s.abortListeners=[],s.terminateAndExit=function(e){var n=function(){s.exit(e)};if(!s.terminationHandler)return n();var t=s.terminationHandler(e);return l(t)?(t.then(n,n),t):(n(),new i((function(e,n){n(new Error("Worker terminating"))})))},s.cleanup=function(e){if(!s.abortListeners.length)return s.send({id:e,method:u,error:d(new Error("Worker terminating"))}),new i((function(e){e()}));var n,t=s.abortListeners.map((function(e){return e()})),r=new i((function(e,t){n=setTimeout((function(){t(new Error("Timeout occured waiting for abort handler, killing worker"))}),s.abortListenerTimeout)})),o=i.all(t).then((function(){clearTimeout(n),s.abortListeners.length||(s.abortListeners=[])}),(function(){clearTimeout(n),s.exit()}));return i.all([o,r]).then((function(){s.send({id:e,method:u,error:null})}),(function(n){s.send({id:e,method:u,error:n?d(n):null})}))};var p=null;s.on("message",(function(e){if("__workerpool-terminate__"===e)return s.terminateAndExit(0);if(e.method===u)return s.cleanup(e.id);try{var n=s.methods[e.method];if(!n)throw new Error('Unknown method "'+e.method+'"');p=e.id;var r=n.apply(n,e.params);l(r)?r.then((function(n){n instanceof t?s.send({id:e.id,result:n.message,error:null},n.transfer):s.send({id:e.id,result:n,error:null}),p=null})).catch((function(n){s.send({id:e.id,result:null,error:d(n)}),p=null})):(r instanceof t?s.send({id:e.id,result:r.message,error:null},r.transfer):s.send({id:e.id,result:r,error:null}),p=null)}catch(n){s.send({id:e.id,result:null,error:d(n)})}})),s.register=function(e,n){if(e)for(var t in e)e.hasOwnProperty(t)&&(s.methods[t]=e[t],s.methods[t].worker=c);n&&(s.terminationHandler=n.onTerminate,s.abortListenerTimeout=n.abortListenerTimeout||1e3),s.send("ready")},s.emit=function(e){if(p){if(e instanceof t)return void s.send({id:p,isEvent:!0,payload:e.message},e.transfer);s.send({id:p,isEvent:!0,payload:e})}},n.add=s.register,n.emit=s.emit}(t),n(t)}));
//# sourceMappingURL=worker.min.js.map
`), B;
    }
    var te;
    function we() {
      if (te) return D.exports;
      te = 1;
      var t = F(), s = t.Promise, i = q, h = me(), f = h.validateOptions, g = h.forkOptsNames, e = h.workerThreadOptsNames, O = h.workerOptsNames, k = "__workerpool-terminate__", T = "__workerpool-cleanup__";
      function W() {
        var c = o();
        if (!c)
          throw new Error("WorkerPool: workerType = 'thread' is not supported, Node >= 11.7.0 required");
        return c;
      }
      function a() {
        if (typeof Worker != "function" && ((typeof Worker > "u" ? "undefined" : $(Worker)) !== "object" || typeof Worker.prototype.constructor != "function"))
          throw new Error("WorkerPool: Web Workers not supported");
      }
      function o() {
        try {
          return C;
        } catch (c) {
          if ($(c) === "object" && c !== null && c.code === "MODULE_NOT_FOUND")
            return null;
          throw c;
        }
      }
      function r() {
        if (i.platform === "browser") {
          if (typeof Blob > "u")
            throw new Error("Blob not supported by the browser");
          if (!window.URL || typeof window.URL.createObjectURL != "function")
            throw new Error("URL.createObjectURL not supported by the browser");
          var c = new Blob([ve()], {
            type: "text/javascript"
          });
          return window.URL.createObjectURL(c);
        } else
          return __dirname + "/worker.js";
      }
      function u(c, p) {
        if (p.workerType === "web")
          return a(), l(c, p.workerOpts, Worker);
        if (p.workerType === "thread")
          return n = W(), w(c, n, p);
        if (p.workerType === "process" || !p.workerType)
          return j(c, S(p), C);
        if (i.platform === "browser")
          return a(), l(c, p.workerOpts, Worker);
        var n = o();
        return n ? w(c, n, p) : j(c, S(p), C);
      }
      function l(c, p, n) {
        f(p, O, "workerOpts");
        var d = new n(c, p);
        return d.isBrowserWorker = !0, d.on = function(m, y) {
          this.addEventListener(m, function(b) {
            y(b.data);
          });
        }, d.send = function(m, y) {
          this.postMessage(m, y);
        }, d;
      }
      function w(c, p, n) {
        var d, m;
        f(n == null ? void 0 : n.workerThreadOpts, e, "workerThreadOpts");
        var y = new p.Worker(c, le({
          stdout: (d = n == null ? void 0 : n.emitStdStreams) !== null && d !== void 0 ? d : !1,
          // pipe worker.STDOUT to process.STDOUT if not requested
          stderr: (m = n == null ? void 0 : n.emitStdStreams) !== null && m !== void 0 ? m : !1
        }, n == null ? void 0 : n.workerThreadOpts));
        return y.isWorkerThread = !0, y.send = function(b, v) {
          this.postMessage(b, v);
        }, y.kill = function() {
          return this.terminate(), !0;
        }, y.disconnect = function() {
          this.terminate();
        }, n != null && n.emitStdStreams && (y.stdout.on("data", function(b) {
          return y.emit("stdout", b);
        }), y.stderr.on("data", function(b) {
          return y.emit("stderr", b);
        })), y;
      }
      function j(c, p, n) {
        f(p.forkOpts, g, "forkOpts");
        var d = n.fork(c, p.forkArgs, p.forkOpts), m = d.send;
        return d.send = function(y) {
          return m.call(d, y);
        }, p.emitStdStreams && (d.stdout.on("data", function(y) {
          return d.emit("stdout", y);
        }), d.stderr.on("data", function(y) {
          return d.emit("stderr", y);
        })), d.isChildProcess = !0, d;
      }
      function S(c) {
        c = c || {};
        var p = process.execArgv.join(" "), n = p.indexOf("--inspect") !== -1, d = p.indexOf("--debug-brk") !== -1, m = [];
        return n && (m.push("--inspect=" + c.debugPort), d && m.push("--debug-brk")), process.execArgv.forEach(function(y) {
          y.indexOf("--max-old-space-size") > -1 && m.push(y);
        }), Object.assign({}, c, {
          forkArgs: c.forkArgs,
          forkOpts: Object.assign({}, c.forkOpts, {
            execArgv: (c.forkOpts && c.forkOpts.execArgv || []).concat(m),
            stdio: c.emitStdStreams ? "pipe" : void 0
          })
        });
      }
      function M(c) {
        for (var p = new Error(""), n = Object.keys(c), d = 0; d < n.length; d++)
          p[n[d]] = c[n[d]];
        return p;
      }
      function N(c, p) {
        if (Object.keys(c.processing).length === 1) {
          var n = Object.values(c.processing)[0];
          n.options && typeof n.options.on == "function" && n.options.on(p);
        }
      }
      function R(c, p) {
        var n = this, d = p || {};
        this.script = c || r(), this.worker = u(this.script, d), this.debugPort = d.debugPort, this.forkOpts = d.forkOpts, this.forkArgs = d.forkArgs, this.workerOpts = d.workerOpts, this.workerThreadOpts = d.workerThreadOpts, this.workerTerminateTimeout = d.workerTerminateTimeout, c || (this.worker.ready = !0), this.requestQueue = [], this.worker.on("stdout", function(v) {
          N(n, {
            stdout: v.toString()
          });
        }), this.worker.on("stderr", function(v) {
          N(n, {
            stderr: v.toString()
          });
        }), this.worker.on("message", function(v) {
          if (!n.terminated)
            if (typeof v == "string" && v === "ready")
              n.worker.ready = !0, y();
            else {
              var P = v.id, _ = n.processing[P];
              if (_ !== void 0 && (v.isEvent ? _.options && typeof _.options.on == "function" && _.options.on(v.payload) : (delete n.processing[P], n.terminating === !0 && n.terminate(), v.error ? _.resolver.reject(M(v.error)) : _.resolver.resolve(v.result))), v.method === T) {
                var L = n.tracking[v.id];
                L !== void 0 && (v.error ? (clearTimeout(L.timeoutId), L.resolver.reject(M(v.error))) : (n.tracking && clearTimeout(L.timeoutId), L.resolver.resolve(L.result))), delete n.tracking[P];
              }
            }
        });
        function m(v) {
          n.terminated = !0;
          for (var P in n.processing)
            n.processing[P] !== void 0 && n.processing[P].resolver.reject(v);
          n.processing = /* @__PURE__ */ Object.create(null);
        }
        function y() {
          var v = fe(n.requestQueue.splice(0)), P;
          try {
            for (v.s(); !(P = v.n()).done; ) {
              var _ = P.value;
              n.worker.send(_.message, _.transfer);
            }
          } catch (L) {
            v.e(L);
          } finally {
            v.f();
          }
        }
        var b = this.worker;
        this.worker.on("error", m), this.worker.on("exit", function(v, P) {
          var _ = `Workerpool Worker terminated Unexpectedly
`;
          _ += "    exitCode: `" + v + "`\n", _ += "    signalCode: `" + P + "`\n", _ += "    workerpool.script: `" + n.script + "`\n", _ += "    spawnArgs: `" + b.spawnargs + "`\n", _ += "    spawnfile: `" + b.spawnfile + "`\n", _ += "    stdout: `" + b.stdout + "`\n", _ += "    stderr: `" + b.stderr + "`\n", m(new Error(_));
        }), this.processing = /* @__PURE__ */ Object.create(null), this.tracking = /* @__PURE__ */ Object.create(null), this.terminating = !1, this.terminated = !1, this.cleaning = !1, this.terminationHandler = null, this.lastId = 0;
      }
      return R.prototype.methods = function() {
        return this.exec("methods");
      }, R.prototype.exec = function(c, p, n, d) {
        n || (n = s.defer());
        var m = ++this.lastId;
        this.processing[m] = {
          id: m,
          resolver: n,
          options: d
        };
        var y = {
          message: {
            id: m,
            method: c,
            params: p
          },
          transfer: d && d.transfer
        };
        this.terminated ? n.reject(new Error("Worker is terminated")) : this.worker.ready ? this.worker.send(y.message, y.transfer) : this.requestQueue.push(y);
        var b = this;
        return n.promise.catch(function(v) {
          if (v instanceof s.CancellationError || v instanceof s.TimeoutError)
            return b.tracking[m] = {
              id: m,
              resolver: s.defer()
            }, delete b.processing[m], b.tracking[m].resolver.promise = b.tracking[m].resolver.promise.catch(function(P) {
              delete b.tracking[m];
              var _ = b.terminateAndNotify(!0).then(function() {
                throw P;
              }, function(L) {
                throw L;
              });
              return _;
            }), b.worker.send({
              id: m,
              method: T
            }), b.tracking[m].timeoutId = setTimeout(function() {
              b.tracking[m].resolver.reject(v);
            }, b.workerTerminateTimeout), b.tracking[m].resolver.promise;
          throw v;
        });
      }, R.prototype.busy = function() {
        return this.cleaning || Object.keys(this.processing).length > 0;
      }, R.prototype.terminate = function(c, p) {
        var n = this;
        if (c) {
          for (var d in this.processing)
            this.processing[d] !== void 0 && this.processing[d].resolver.reject(new Error("Worker terminated"));
          this.processing = /* @__PURE__ */ Object.create(null);
        }
        for (var m = 0, y = Object.values(n.tracking); m < y.length; m++) {
          var b = y[m];
          clearTimeout(b.timeoutId), b.resolver.reject(new Error("Worker Terminating"));
        }
        if (n.tracking = /* @__PURE__ */ Object.create(null), typeof p == "function" && (this.terminationHandler = p), this.busy())
          this.terminating = !0;
        else {
          var v = function(L) {
            if (n.terminated = !0, n.cleaning = !1, n.worker != null && n.worker.removeAllListeners && n.worker.removeAllListeners("message"), n.worker = null, n.terminating = !1, n.terminationHandler)
              n.terminationHandler(L, n);
            else if (L)
              throw L;
          };
          if (this.worker)
            if (typeof this.worker.kill == "function") {
              if (this.worker.killed) {
                v(new Error("worker already killed!"));
                return;
              }
              var P = setTimeout(function() {
                n.worker && n.worker.kill();
              }, this.workerTerminateTimeout);
              this.worker.once("exit", function() {
                clearTimeout(P), n.worker && (n.worker.killed = !0), v();
              }), this.worker.ready ? this.worker.send(k) : this.requestQueue.push({
                message: k
              }), this.cleaning = !0;
              return;
            } else if (typeof this.worker.terminate == "function")
              this.worker.terminate(), this.worker.killed = !0;
            else
              throw new Error("Failed to terminate worker");
          v();
        }
      }, R.prototype.terminateAndNotify = function(c, p) {
        var n = s.defer();
        return p && n.promise.timeout(p), this.terminate(c, function(d, m) {
          d ? n.reject(d) : n.resolve(m);
        }), n.promise;
      }, D.exports = R, D.exports._tryRequireWorkerThreads = o, D.exports._setupProcessWorker = j, D.exports._setupBrowserWorker = l, D.exports._setupWorkerThreadWorker = w, D.exports.ensureWorkerThreads = W, D.exports;
    }
    var Q, ne;
    function ke() {
      if (ne) return Q;
      ne = 1;
      var t = 65535;
      Q = s;
      function s() {
        this.ports = /* @__PURE__ */ Object.create(null), this.length = 0;
      }
      return s.prototype.nextAvailableStartingAt = function(i) {
        for (; this.ports[i] === !0; )
          i++;
        if (i >= t)
          throw new Error("WorkerPool debug port limit reached: " + i + ">= " + t);
        return this.ports[i] = !0, this.length++, i;
      }, s.prototype.releasePort = function(i) {
        delete this.ports[i], this.length--;
      }, Q;
    }
    var V, oe;
    function ye() {
      if (oe) return V;
      oe = 1;
      var t = F(), s = t.Promise, i = we(), h = q, f = ke(), g = new f();
      function e(a, o) {
        typeof a == "string" ? this.script = a || null : (this.script = null, o = a), this.workers = [], this.tasks = [], o = o || {}, this.forkArgs = Object.freeze(o.forkArgs || []), this.forkOpts = Object.freeze(o.forkOpts || {}), this.workerOpts = Object.freeze(o.workerOpts || {}), this.workerThreadOpts = Object.freeze(o.workerThreadOpts || {}), this.debugPortStart = o.debugPortStart || 43210, this.nodeWorker = o.nodeWorker, this.workerType = o.workerType || o.nodeWorker || "auto", this.maxQueueSize = o.maxQueueSize || 1 / 0, this.workerTerminateTimeout = o.workerTerminateTimeout || 1e3, this.onCreateWorker = o.onCreateWorker || function() {
          return null;
        }, this.onTerminateWorker = o.onTerminateWorker || function() {
          return null;
        }, this.emitStdStreams = o.emitStdStreams || !1, o && "maxWorkers" in o ? (O(o.maxWorkers), this.maxWorkers = o.maxWorkers) : this.maxWorkers = Math.max((h.cpus || 4) - 1, 1), o && "minWorkers" in o && (o.minWorkers === "max" ? this.minWorkers = this.maxWorkers : (k(o.minWorkers), this.minWorkers = o.minWorkers, this.maxWorkers = Math.max(this.minWorkers, this.maxWorkers)), this._ensureMinWorkers()), this._boundNext = this._next.bind(this), this.workerType === "thread" && i.ensureWorkerThreads();
      }
      e.prototype.exec = function(a, o, r) {
        if (o && !Array.isArray(o))
          throw new TypeError('Array expected as argument "params"');
        if (typeof a == "string") {
          var u = s.defer();
          if (this.tasks.length >= this.maxQueueSize)
            throw new Error("Max queue size of " + this.maxQueueSize + " reached");
          var l = this.tasks, w = {
            method: a,
            params: o,
            resolver: u,
            timeout: null,
            options: r
          };
          l.push(w);
          var j = u.promise.timeout;
          return u.promise.timeout = function(M) {
            return l.indexOf(w) !== -1 ? (w.timeout = M, u.promise) : j.call(u.promise, M);
          }, this._next(), u.promise;
        } else {
          if (typeof a == "function")
            return this.exec("run", [String(a), o], r);
          throw new TypeError('Function or string expected as argument "method"');
        }
      }, e.prototype.proxy = function() {
        if (arguments.length > 0)
          throw new Error("No arguments expected");
        var a = this;
        return this.exec("methods").then(function(o) {
          var r = {};
          return o.forEach(function(u) {
            r[u] = function() {
              return a.exec(u, Array.prototype.slice.call(arguments));
            };
          }), r;
        });
      }, e.prototype._next = function() {
        if (this.tasks.length > 0) {
          var a = this._getWorker();
          if (a) {
            var o = this, r = this.tasks.shift();
            if (r.resolver.promise.pending) {
              var u = a.exec(r.method, r.params, r.resolver, r.options).then(o._boundNext).catch(function() {
                if (a.terminated)
                  return o._removeWorker(a);
              }).then(function() {
                o._next();
              });
              typeof r.timeout == "number" && u.timeout(r.timeout);
            } else
              o._next();
          }
        }
      }, e.prototype._getWorker = function() {
        for (var a = this.workers, o = 0; o < a.length; o++) {
          var r = a[o];
          if (r.busy() === !1)
            return r;
        }
        return a.length < this.maxWorkers ? (r = this._createWorkerHandler(), a.push(r), r) : null;
      }, e.prototype._removeWorker = function(a) {
        var o = this;
        return g.releasePort(a.debugPort), this._removeWorkerFromList(a), this._ensureMinWorkers(), new s(function(r, u) {
          a.terminate(!1, function(l) {
            o.onTerminateWorker({
              forkArgs: a.forkArgs,
              forkOpts: a.forkOpts,
              workerThreadOpts: a.workerThreadOpts,
              script: a.script
            }), l ? u(l) : r(a);
          });
        });
      }, e.prototype._removeWorkerFromList = function(a) {
        var o = this.workers.indexOf(a);
        o !== -1 && this.workers.splice(o, 1);
      }, e.prototype.terminate = function(a, o) {
        var r = this;
        this.tasks.forEach(function(S) {
          S.resolver.reject(new Error("Pool terminated"));
        }), this.tasks.length = 0;
        var u = function(M) {
          g.releasePort(M.debugPort), this._removeWorkerFromList(M);
        }, l = u.bind(this), w = [], j = this.workers.slice();
        return j.forEach(function(S) {
          var M = S.terminateAndNotify(a, o).then(l).always(function() {
            r.onTerminateWorker({
              forkArgs: S.forkArgs,
              forkOpts: S.forkOpts,
              workerThreadOpts: S.workerThreadOpts,
              script: S.script
            });
          });
          w.push(M);
        }), s.all(w);
      }, e.prototype.stats = function() {
        var a = this.workers.length, o = this.workers.filter(function(r) {
          return r.busy();
        }).length;
        return {
          totalWorkers: a,
          busyWorkers: o,
          idleWorkers: a - o,
          pendingTasks: this.tasks.length,
          activeTasks: o
        };
      }, e.prototype._ensureMinWorkers = function() {
        if (this.minWorkers)
          for (var a = this.workers.length; a < this.minWorkers; a++)
            this.workers.push(this._createWorkerHandler());
      }, e.prototype._createWorkerHandler = function() {
        var a = this.onCreateWorker({
          forkArgs: this.forkArgs,
          forkOpts: this.forkOpts,
          workerOpts: this.workerOpts,
          workerThreadOpts: this.workerThreadOpts,
          script: this.script
        }) || {};
        return new i(a.script || this.script, {
          forkArgs: a.forkArgs || this.forkArgs,
          forkOpts: a.forkOpts || this.forkOpts,
          workerOpts: a.workerOpts || this.workerOpts,
          workerThreadOpts: a.workerThreadOpts || this.workerThreadOpts,
          debugPort: g.nextAvailableStartingAt(this.debugPortStart),
          workerType: this.workerType,
          workerTerminateTimeout: this.workerTerminateTimeout,
          emitStdStreams: this.emitStdStreams
        });
      };
      function O(a) {
        if (!T(a) || !W(a) || a < 1)
          throw new TypeError("Option maxWorkers must be an integer number >= 1");
      }
      function k(a) {
        if (!T(a) || !W(a) || a < 0)
          throw new TypeError("Option minWorkers must be an integer number >= 0");
      }
      function T(a) {
        return typeof a == "number";
      }
      function W(a) {
        return Math.round(a) == a;
      }
      return V = e, V;
    }
    var G = {}, K, ie;
    function se() {
      if (ie) return K;
      ie = 1;
      function t(s, i) {
        this.message = s, this.transfer = i;
      }
      return K = t, K;
    }
    var ae;
    function ue() {
      return ae || (ae = 1, function(t) {
        var s = se(), i = F().Promise, h = "__workerpool-terminate__", f = "__workerpool-cleanup__", g = 1e3, e = {
          exit: function() {
          }
        }, O = {
          /**
           * 
           * @param {() => Promise<void>} listener 
           */
          addAbortListener: function(u) {
            e.abortListeners.push(u);
          },
          emit: e.emit
        };
        if (typeof self < "u" && typeof postMessage == "function" && typeof addEventListener == "function")
          e.on = function(r, u) {
            addEventListener(r, function(l) {
              u(l.data);
            });
          }, e.send = function(r, u) {
            u ? postMessage(r, u) : postMessage(r);
          };
        else if (typeof process < "u") {
          var k;
          try {
            k = C;
          } catch (r) {
            if (!($(r) === "object" && r !== null && r.code === "MODULE_NOT_FOUND")) throw r;
          }
          if (k && /* if there is a parentPort, we are in a WorkerThread */
          k.parentPort !== null) {
            var T = k.parentPort;
            e.send = T.postMessage.bind(T), e.on = T.on.bind(T), e.exit = process.exit.bind(process);
          } else
            e.on = process.on.bind(process), e.send = function(r) {
              process.send(r);
            }, e.on("disconnect", function() {
              process.exit(1);
            }), e.exit = process.exit.bind(process);
        } else
          throw new Error("Script must be executed as a worker");
        function W(r) {
          return Object.getOwnPropertyNames(r).reduce(function(u, l) {
            return Object.defineProperty(u, l, {
              value: r[l],
              enumerable: !0
            });
          }, {});
        }
        function a(r) {
          return r && typeof r.then == "function" && typeof r.catch == "function";
        }
        e.methods = {}, e.methods.run = function(u, l) {
          var w = new Function("return (" + u + ").apply(this, arguments);");
          return w.worker = O, w.apply(w, l);
        }, e.methods.methods = function() {
          return Object.keys(e.methods);
        }, e.terminationHandler = void 0, e.abortListenerTimeout = g, e.abortListeners = [], e.terminateAndExit = function(r) {
          var u = function() {
            e.exit(r);
          };
          if (!e.terminationHandler)
            return u();
          var l = e.terminationHandler(r);
          return a(l) ? (l.then(u, u), l) : (u(), new i(function(w, j) {
            j(new Error("Worker terminating"));
          }));
        }, e.cleanup = function(r) {
          if (!e.abortListeners.length)
            return e.send({
              id: r,
              method: f,
              error: W(new Error("Worker terminating"))
            }), new i(function(N) {
              N();
            });
          var u = function() {
            e.exit();
          }, l = function() {
            e.abortListeners.length || (e.abortListeners = []);
          }, w = e.abortListeners.map(function(N) {
            return N();
          }), j, S = new i(function(N, R) {
            j = setTimeout(function() {
              R(new Error("Timeout occured waiting for abort handler, killing worker"));
            }, e.abortListenerTimeout);
          }), M = i.all(w).then(function() {
            clearTimeout(j), l();
          }, function() {
            clearTimeout(j), u();
          });
          return i.all([M, S]).then(function() {
            e.send({
              id: r,
              method: f,
              error: null
            });
          }, function(N) {
            e.send({
              id: r,
              method: f,
              error: N ? W(N) : null
            });
          });
        };
        var o = null;
        e.on("message", function(r) {
          if (r === h)
            return e.terminateAndExit(0);
          if (r.method === f)
            return e.cleanup(r.id);
          try {
            var u = e.methods[r.method];
            if (u) {
              o = r.id;
              var l = u.apply(u, r.params);
              a(l) ? l.then(function(w) {
                w instanceof s ? e.send({
                  id: r.id,
                  result: w.message,
                  error: null
                }, w.transfer) : e.send({
                  id: r.id,
                  result: w,
                  error: null
                }), o = null;
              }).catch(function(w) {
                e.send({
                  id: r.id,
                  result: null,
                  error: W(w)
                }), o = null;
              }) : (l instanceof s ? e.send({
                id: r.id,
                result: l.message,
                error: null
              }, l.transfer) : e.send({
                id: r.id,
                result: l,
                error: null
              }), o = null);
            } else
              throw new Error('Unknown method "' + r.method + '"');
          } catch (w) {
            e.send({
              id: r.id,
              result: null,
              error: W(w)
            });
          }
        }), e.register = function(r, u) {
          if (r)
            for (var l in r)
              r.hasOwnProperty(l) && (e.methods[l] = r[l], e.methods[l].worker = O);
          u && (e.terminationHandler = u.onTerminate, e.abortListenerTimeout = u.abortListenerTimeout || g), e.send("ready");
        }, e.emit = function(r) {
          if (o) {
            if (r instanceof s) {
              e.send({
                id: o,
                isEvent: !0,
                payload: r.message
              }, r.transfer);
              return;
            }
            e.send({
              id: o,
              isEvent: !0,
              payload: r
            });
          }
        }, t.add = e.register, t.emit = e.emit;
      }(G)), G;
    }
    var ge = q.platform, be = q.isMainThread, Oe = q.cpus;
    function _e(t, s) {
      var i = ye();
      return new i(t, s);
    }
    var Te = x.pool = _e;
    function Ee(t, s) {
      var i = ue();
      i.add(t, s);
    }
    var xe = x.worker = Ee;
    function We(t) {
      var s = ue();
      s.emit(t);
    }
    var je = x.workerEmit = We, Pe = F(), Ae = Pe.Promise, Se = x.Promise = Ae, Le = x.Transfer = se(), Me = x.platform = ge, Ne = x.isMainThread = be, De = x.cpus = Oe;
    E.Promise = Se, E.Transfer = Le, E.cpus = De, E.default = x, E.isMainThread = Ne, E.platform = Me, E.pool = Te, E.worker = xe, E.workerEmit = je, Object.defineProperty(E, "__esModule", { value: !0 });
  });
})(X, X.exports);
var qe = X.exports;
const $e = /* @__PURE__ */ He(qe);
class Fe {
  constructor() {
    $e.worker({
      activate: this.activate,
      deactivate: this.deactivate
    });
  }
  /**
   * Método chamado automaticamente ao ativar a extensão.
   * Pode ser sobrescrito pelas classes derivadas.
   */
  activate() {
    console.log("Extensão ativada (método base).");
  }
  /**
   * Método chamado automaticamente ao desativar a extensão.
   * Pode ser sobrescrito pelas classes derivadas.
   */
  deactivate() {
    console.log("Extensão desativada (método base).");
  }
}
export {
  Fe as ExtensionBase
};
//# sourceMappingURL=index.es.js.map