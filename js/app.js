/*! For license information please see app.js.LICENSE.txt */
(() => {
  var t = {
      8670(t, e, n) {
        "use strict";
        (n(4185),
          (e.Tl = function (t, e, n, o, r) {
            return "undefined" == typeof OC
              ? (console.warn("No OC found"), e)
              : OC.L10N.translate(t, e, n, o, r);
          }),
          n(7495),
          n(5440));
      },
      9498(t, e, n) {
        "use strict";
        ((e.Jv = void 0), n(5440));
        const o = (t, e, n) => {
          const o = Object.assign({ escape: !0 }, n || {});
          return (
            "/" !== t.charAt(0) && (t = "/" + t),
            (r = (r = e || {}) || {}),
            t.replace(/{([^{}]*)}/g, function (t, e) {
              var n = r[e];
              return o.escape
                ? "string" == typeof n || "number" == typeof n
                  ? encodeURIComponent(n.toString())
                  : encodeURIComponent(t)
                : "string" == typeof n || "number" == typeof n
                  ? n.toString()
                  : t;
            })
          );
          var r;
        };
        e.Jv = (t, e, n) => {
          var i;
          const s = Object.assign({ noRewrite: !1 }, n || {});
          return !0 !==
            (null === (i = window) ||
            void 0 === i ||
            null === (i = i.OC) ||
            void 0 === i ||
            null === (i = i.config) ||
            void 0 === i
              ? void 0
              : i.modRewriteWorking) || s.noRewrite
            ? r() + "/index.php" + o(t, e, n)
            : r() + o(t, e, n);
        };
        function r() {
          let t = window._oc_webroot;
          if (void 0 === t) {
            t = location.pathname;
            const e = t.indexOf("/index.php/");
            t = -1 !== e ? t.substr(0, e) : t.substr(0, t.lastIndexOf("/"));
          }
          return t;
        }
      },
      7736(t) {
        var e;
        ((e = function (t) {
          var e = function (t) {
            return new e.lib.init(t);
          };
          function n(t, e) {
            return e.offset[t]
              ? isNaN(e.offset[t])
                ? e.offset[t]
                : e.offset[t] + "px"
              : "0px";
          }
          function o(t, e) {
            return !(
              !t ||
              "string" != typeof e ||
              !(
                t.className && t.className.trim().split(/\s+/gi).indexOf(e) > -1
              )
            );
          }
          return (
            (e.defaults = {
              oldestFirst: !0,
              text: "Toastify is awesome!",
              node: void 0,
              duration: 3e3,
              selector: void 0,
              callback: function () {},
              destination: void 0,
              newWindow: !1,
              close: !1,
              gravity: "toastify-top",
              positionLeft: !1,
              position: "",
              backgroundColor: "",
              avatar: "",
              className: "",
              stopOnFocus: !0,
              onClick: function () {},
              offset: { x: 0, y: 0 },
              escapeMarkup: !0,
              ariaLive: "polite",
              style: { background: "" },
            }),
            (e.lib = e.prototype =
              {
                toastify: "1.12.0",
                constructor: e,
                init: function (t) {
                  return (
                    t || (t = {}),
                    (this.options = {}),
                    (this.toastElement = null),
                    (this.options.text = t.text || e.defaults.text),
                    (this.options.node = t.node || e.defaults.node),
                    (this.options.duration =
                      0 === t.duration ? 0 : t.duration || e.defaults.duration),
                    (this.options.selector = t.selector || e.defaults.selector),
                    (this.options.callback = t.callback || e.defaults.callback),
                    (this.options.destination =
                      t.destination || e.defaults.destination),
                    (this.options.newWindow =
                      t.newWindow || e.defaults.newWindow),
                    (this.options.close = t.close || e.defaults.close),
                    (this.options.gravity =
                      "bottom" === t.gravity
                        ? "toastify-bottom"
                        : e.defaults.gravity),
                    (this.options.positionLeft =
                      t.positionLeft || e.defaults.positionLeft),
                    (this.options.position = t.position || e.defaults.position),
                    (this.options.backgroundColor =
                      t.backgroundColor || e.defaults.backgroundColor),
                    (this.options.avatar = t.avatar || e.defaults.avatar),
                    (this.options.className =
                      t.className || e.defaults.className),
                    (this.options.stopOnFocus =
                      void 0 === t.stopOnFocus
                        ? e.defaults.stopOnFocus
                        : t.stopOnFocus),
                    (this.options.onClick = t.onClick || e.defaults.onClick),
                    (this.options.offset = t.offset || e.defaults.offset),
                    (this.options.escapeMarkup =
                      void 0 !== t.escapeMarkup
                        ? t.escapeMarkup
                        : e.defaults.escapeMarkup),
                    (this.options.ariaLive = t.ariaLive || e.defaults.ariaLive),
                    (this.options.style = t.style || e.defaults.style),
                    t.backgroundColor &&
                      (this.options.style.background = t.backgroundColor),
                    this
                  );
                },
                buildToast: function () {
                  if (!this.options) throw "Toastify is not initialized";
                  var t = document.createElement("div");
                  for (var e in ((t.className =
                    "toastify on " + this.options.className),
                  this.options.position
                    ? (t.className += " toastify-" + this.options.position)
                    : !0 === this.options.positionLeft
                      ? ((t.className += " toastify-left"),
                        console.warn(
                          "Property `positionLeft` will be depreciated in further versions. Please use `position` instead.",
                        ))
                      : (t.className += " toastify-right"),
                  (t.className += " " + this.options.gravity),
                  this.options.backgroundColor &&
                    console.warn(
                      'DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.',
                    ),
                  this.options.style))
                    t.style[e] = this.options.style[e];
                  if (
                    (this.options.ariaLive &&
                      t.setAttribute("aria-live", this.options.ariaLive),
                    this.options.node &&
                      this.options.node.nodeType === Node.ELEMENT_NODE)
                  )
                    t.appendChild(this.options.node);
                  else if (
                    (this.options.escapeMarkup
                      ? (t.innerText = this.options.text)
                      : (t.innerHTML = this.options.text),
                    "" !== this.options.avatar)
                  ) {
                    var o = document.createElement("img");
                    ((o.src = this.options.avatar),
                      (o.className = "toastify-avatar"),
                      "left" == this.options.position ||
                      !0 === this.options.positionLeft
                        ? t.appendChild(o)
                        : t.insertAdjacentElement("afterbegin", o));
                  }
                  if (!0 === this.options.close) {
                    var r = document.createElement("button");
                    ((r.type = "button"),
                      r.setAttribute("aria-label", "Close"),
                      (r.className = "toast-close"),
                      (r.innerHTML = "&#10006;"),
                      r.addEventListener(
                        "click",
                        function (t) {
                          (t.stopPropagation(),
                            this.removeElement(this.toastElement),
                            window.clearTimeout(
                              this.toastElement.timeOutValue,
                            ));
                        }.bind(this),
                      ));
                    var i =
                      window.innerWidth > 0 ? window.innerWidth : screen.width;
                    ("left" == this.options.position ||
                      !0 === this.options.positionLeft) &&
                    i > 360
                      ? t.insertAdjacentElement("afterbegin", r)
                      : t.appendChild(r);
                  }
                  if (this.options.stopOnFocus && this.options.duration > 0) {
                    var s = this;
                    (t.addEventListener("mouseover", function (e) {
                      window.clearTimeout(t.timeOutValue);
                    }),
                      t.addEventListener("mouseleave", function () {
                        t.timeOutValue = window.setTimeout(function () {
                          s.removeElement(t);
                        }, s.options.duration);
                      }));
                  }
                  if (
                    (void 0 !== this.options.destination &&
                      t.addEventListener(
                        "click",
                        function (t) {
                          (t.stopPropagation(),
                            !0 === this.options.newWindow
                              ? window.open(this.options.destination, "_blank")
                              : (window.location = this.options.destination));
                        }.bind(this),
                      ),
                    "function" == typeof this.options.onClick &&
                      void 0 === this.options.destination &&
                      t.addEventListener(
                        "click",
                        function (t) {
                          (t.stopPropagation(), this.options.onClick());
                        }.bind(this),
                      ),
                    "object" == typeof this.options.offset)
                  ) {
                    var a = n("x", this.options),
                      l = n("y", this.options),
                      c = "left" == this.options.position ? a : "-" + a,
                      u = "toastify-top" == this.options.gravity ? l : "-" + l;
                    t.style.transform = "translate(" + c + "," + u + ")";
                  }
                  return t;
                },
                showToast: function () {
                  var t;
                  if (
                    ((this.toastElement = this.buildToast()),
                    !(t =
                      "string" == typeof this.options.selector
                        ? document.getElementById(this.options.selector)
                        : this.options.selector instanceof HTMLElement ||
                            ("undefined" != typeof ShadowRoot &&
                              this.options.selector instanceof ShadowRoot)
                          ? this.options.selector
                          : document.body))
                  )
                    throw "Root element is not defined";
                  var n = e.defaults.oldestFirst ? t.firstChild : t.lastChild;
                  return (
                    t.insertBefore(this.toastElement, n),
                    e.reposition(),
                    this.options.duration > 0 &&
                      (this.toastElement.timeOutValue = window.setTimeout(
                        function () {
                          this.removeElement(this.toastElement);
                        }.bind(this),
                        this.options.duration,
                      )),
                    this
                  );
                },
                hideToast: function () {
                  (this.toastElement.timeOutValue &&
                    clearTimeout(this.toastElement.timeOutValue),
                    this.removeElement(this.toastElement));
                },
                removeElement: function (t) {
                  ((t.className = t.className.replace(" on", "")),
                    window.setTimeout(
                      function () {
                        (this.options.node &&
                          this.options.node.parentNode &&
                          this.options.node.parentNode.removeChild(
                            this.options.node,
                          ),
                          t.parentNode && t.parentNode.removeChild(t),
                          this.options.callback.call(t),
                          e.reposition());
                      }.bind(this),
                      400,
                    ));
                },
              }),
            (e.reposition = function () {
              for (
                var t,
                  e = { top: 15, bottom: 15 },
                  n = { top: 15, bottom: 15 },
                  r = { top: 15, bottom: 15 },
                  i = document.getElementsByClassName("toastify"),
                  s = 0;
                s < i.length;
                s++
              ) {
                t =
                  !0 === o(i[s], "toastify-top")
                    ? "toastify-top"
                    : "toastify-bottom";
                var a = i[s].offsetHeight;
                ((t = t.substr(9, t.length - 1)),
                  (window.innerWidth > 0 ? window.innerWidth : screen.width) <=
                  360
                    ? ((i[s].style[t] = r[t] + "px"), (r[t] += a + 15))
                    : !0 === o(i[s], "toastify-left")
                      ? ((i[s].style[t] = e[t] + "px"), (e[t] += a + 15))
                      : ((i[s].style[t] = n[t] + "px"), (n[t] += a + 15)));
              }
              return this;
            }),
            (e.lib.init.prototype = e.lib),
            e
          );
        }),
          t.exports ? (t.exports = e()) : (this.Toastify = e()));
      },
      6262(t, e) {
        "use strict";
        e.A = (t, e) => {
          const n = t.__vccOpts || t;
          for (const [t, o] of e) n[t] = o;
          return n;
        };
      },
      9306(t, e, n) {
        "use strict";
        var o = n(4901),
          r = n(6823),
          i = TypeError;
        t.exports = function (t) {
          if (o(t)) return t;
          throw new i(r(t) + " is not a function");
        };
      },
      7829(t, e, n) {
        "use strict";
        var o = n(8183).charAt;
        t.exports = function (t, e, n) {
          return e + (n ? o(t, e).length : 1);
        };
      },
      8551(t, e, n) {
        "use strict";
        var o = n(34),
          r = String,
          i = TypeError;
        t.exports = function (t) {
          if (o(t)) return t;
          throw new i(r(t) + " is not an object");
        };
      },
      9617(t, e, n) {
        "use strict";
        var o = n(5397),
          r = n(5610),
          i = n(6198),
          s = function (t) {
            return function (e, n, s) {
              var a = o(e),
                l = i(a);
              if (0 === l) return !t && -1;
              var c,
                u = r(s, l);
              if (t && n != n) {
                for (; l > u;) if ((c = a[u++]) != c) return !0;
              } else
                for (; l > u; u++)
                  if ((t || u in a) && a[u] === n) return t || u || 0;
              return !t && -1;
            };
          };
        t.exports = { includes: s(!0), indexOf: s(!1) };
      },
      2195(t, e, n) {
        "use strict";
        var o = n(9504),
          r = o({}.toString),
          i = o("".slice);
        t.exports = function (t) {
          return i(r(t), 8, -1);
        };
      },
      6955(t, e, n) {
        "use strict";
        var o = n(2140),
          r = n(4901),
          i = n(2195),
          s = n(8227)("toStringTag"),
          a = Object,
          l =
            "Arguments" ===
            i(
              (function () {
                return arguments;
              })(),
            );
        t.exports = o
          ? i
          : function (t) {
              var e, n, o;
              return void 0 === t
                ? "Undefined"
                : null === t
                  ? "Null"
                  : "string" ==
                      typeof (n = (function (t, e) {
                        try {
                          return t[e];
                        } catch (t) {}
                      })((e = a(t)), s))
                    ? n
                    : l
                      ? i(e)
                      : "Object" === (o = i(e)) && r(e.callee)
                        ? "Arguments"
                        : o;
            };
      },
      7740(t, e, n) {
        "use strict";
        var o = n(9297),
          r = n(5031),
          i = n(7347),
          s = n(4913);
        t.exports = function (t, e, n) {
          for (var a = r(e), l = s.f, c = i.f, u = 0; u < a.length; u++) {
            var p = a[u];
            o(t, p) || (n && o(n, p)) || l(t, p, c(e, p));
          }
        };
      },
      6699(t, e, n) {
        "use strict";
        var o = n(3724),
          r = n(4913),
          i = n(6980);
        t.exports = o
          ? function (t, e, n) {
              return r.f(t, e, i(1, n));
            }
          : function (t, e, n) {
              return ((t[e] = n), t);
            };
      },
      6980(t) {
        "use strict";
        t.exports = function (t, e) {
          return {
            enumerable: !(1 & t),
            configurable: !(2 & t),
            writable: !(4 & t),
            value: e,
          };
        };
      },
      6840(t, e, n) {
        "use strict";
        var o = n(4901),
          r = n(4913),
          i = n(283),
          s = n(9433);
        t.exports = function (t, e, n, a) {
          a || (a = {});
          var l = a.enumerable,
            c = void 0 !== a.name ? a.name : e;
          if ((o(n) && i(n, c, a), a.global)) l ? (t[e] = n) : s(e, n);
          else {
            try {
              a.unsafe ? t[e] && (l = !0) : delete t[e];
            } catch (t) {}
            l
              ? (t[e] = n)
              : r.f(t, e, {
                  value: n,
                  enumerable: !1,
                  configurable: !a.nonConfigurable,
                  writable: !a.nonWritable,
                });
          }
          return t;
        };
      },
      9433(t, e, n) {
        "use strict";
        var o = n(4576),
          r = Object.defineProperty;
        t.exports = function (t, e) {
          try {
            r(o, t, { value: e, configurable: !0, writable: !0 });
          } catch (n) {
            o[t] = e;
          }
          return e;
        };
      },
      3724(t, e, n) {
        "use strict";
        var o = n(9039);
        t.exports = !o(function () {
          return (
            7 !==
            Object.defineProperty({}, 1, {
              get: function () {
                return 7;
              },
            })[1]
          );
        });
      },
      4055(t, e, n) {
        "use strict";
        var o = n(4576),
          r = n(34),
          i = o.document,
          s = r(i) && r(i.createElement);
        t.exports = function (t) {
          return s ? i.createElement(t) : {};
        };
      },
      8727(t) {
        "use strict";
        t.exports = [
          "constructor",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "toLocaleString",
          "toString",
          "valueOf",
        ];
      },
      2839(t, e, n) {
        "use strict";
        var o = n(4576).navigator,
          r = o && o.userAgent;
        t.exports = r ? String(r) : "";
      },
      9519(t, e, n) {
        "use strict";
        var o,
          r,
          i = n(4576),
          s = n(2839),
          a = i.process,
          l = i.Deno,
          c = (a && a.versions) || (l && l.version),
          u = c && c.v8;
        (u && (r = (o = u.split("."))[0] > 0 && o[0] < 4 ? 1 : +(o[0] + o[1])),
          !r &&
            s &&
            (!(o = s.match(/Edge\/(\d+)/)) || o[1] >= 74) &&
            (o = s.match(/Chrome\/(\d+)/)) &&
            (r = +o[1]),
          (t.exports = r));
      },
      6518(t, e, n) {
        "use strict";
        var o = n(4576),
          r = n(7347).f,
          i = n(6699),
          s = n(6840),
          a = n(9433),
          l = n(7740),
          c = n(2796);
        t.exports = function (t, e) {
          var n,
            u,
            p,
            d,
            f,
            h = t.target,
            v = t.global,
            g = t.stat;
          if ((n = v ? o : g ? o[h] || a(h, {}) : o[h] && o[h].prototype))
            for (u in e) {
              if (
                ((d = e[u]),
                (p = t.dontCallGetSet ? (f = r(n, u)) && f.value : n[u]),
                !c(v ? u : h + (g ? "." : "#") + u, t.forced) && void 0 !== p)
              ) {
                if (typeof d == typeof p) continue;
                l(d, p);
              }
              ((t.sham || (p && p.sham)) && i(d, "sham", !0), s(n, u, d, t));
            }
        };
      },
      9039(t) {
        "use strict";
        t.exports = function (t) {
          try {
            return !!t();
          } catch (t) {
            return !0;
          }
        };
      },
      9228(t, e, n) {
        "use strict";
        n(7495);
        var o = n(9565),
          r = n(6840),
          i = n(7323),
          s = n(9039),
          a = n(8227),
          l = n(6699),
          c = a("species"),
          u = RegExp.prototype;
        t.exports = function (t, e, n, p) {
          var d = a(t),
            f = !s(function () {
              var e = {};
              return (
                (e[d] = function () {
                  return 7;
                }),
                7 !== ""[t](e)
              );
            }),
            h =
              f &&
              !s(function () {
                var e = !1,
                  n = /a/;
                if ("split" === t) {
                  var o = {};
                  ((o[c] = function () {
                    return n;
                  }),
                    ((n = { constructor: o, flags: "" })[d] = /./[d]));
                }
                return (
                  (n.exec = function () {
                    return ((e = !0), null);
                  }),
                  n[d](""),
                  !e
                );
              });
          if (!f || !h || n) {
            var v = /./[d],
              g = e(d, ""[t], function (t, e, n, r, s) {
                var a = e.exec;
                return a === i || a === u.exec
                  ? f && !s
                    ? { done: !0, value: o(v, e, n, r) }
                    : { done: !0, value: o(t, n, e, r) }
                  : { done: !1 };
              });
            (r(String.prototype, t, g[0]), r(u, d, g[1]));
          }
          p && l(u[d], "sham", !0);
        };
      },
      8745(t, e, n) {
        "use strict";
        var o = n(616),
          r = Function.prototype,
          i = r.apply,
          s = r.call;
        t.exports =
          ("object" == typeof Reflect && Reflect.apply) ||
          (o
            ? s.bind(i)
            : function () {
                return s.apply(i, arguments);
              });
      },
      616(t, e, n) {
        "use strict";
        var o = n(9039);
        t.exports = !o(function () {
          var t = function () {}.bind();
          return "function" != typeof t || t.hasOwnProperty("prototype");
        });
      },
      9565(t, e, n) {
        "use strict";
        var o = n(616),
          r = Function.prototype.call;
        t.exports = o
          ? r.bind(r)
          : function () {
              return r.apply(r, arguments);
            };
      },
      350(t, e, n) {
        "use strict";
        var o = n(3724),
          r = n(9297),
          i = Function.prototype,
          s = o && Object.getOwnPropertyDescriptor,
          a = r(i, "name"),
          l = a && "something" === function () {}.name,
          c = a && (!o || (o && s(i, "name").configurable));
        t.exports = { EXISTS: a, PROPER: l, CONFIGURABLE: c };
      },
      9504(t, e, n) {
        "use strict";
        var o = n(616),
          r = Function.prototype,
          i = r.call,
          s = o && r.bind.bind(i, i);
        t.exports = o
          ? s
          : function (t) {
              return function () {
                return i.apply(t, arguments);
              };
            };
      },
      7751(t, e, n) {
        "use strict";
        var o = n(4576),
          r = n(4901);
        t.exports = function (t, e) {
          return arguments.length < 2
            ? ((n = o[t]), r(n) ? n : void 0)
            : o[t] && o[t][e];
          var n;
        };
      },
      5966(t, e, n) {
        "use strict";
        var o = n(9306),
          r = n(4117);
        t.exports = function (t, e) {
          var n = t[e];
          return r(n) ? void 0 : o(n);
        };
      },
      2478(t, e, n) {
        "use strict";
        var o = n(9504),
          r = n(8981),
          i = Math.floor,
          s = o("".charAt),
          a = o("".replace),
          l = o("".slice),
          c = /\$([$&'`]|\d{1,2}|<[^>]*>)/g,
          u = /\$([$&'`]|\d{1,2})/g;
        t.exports = function (t, e, n, o, p, d) {
          var f = n + t.length,
            h = o.length,
            v = u;
          return (
            void 0 !== p && ((p = r(p)), (v = c)),
            a(d, v, function (r, a) {
              var c;
              switch (s(a, 0)) {
                case "$":
                  return "$";
                case "&":
                  return t;
                case "`":
                  return l(e, 0, n);
                case "'":
                  return l(e, f);
                case "<":
                  c = p[l(a, 1, -1)];
                  break;
                default:
                  var u = +a;
                  if (0 === u) return r;
                  if (u > h) {
                    var d = i(u / 10);
                    return 0 === d
                      ? r
                      : d <= h
                        ? void 0 === o[d - 1]
                          ? s(a, 1)
                          : o[d - 1] + s(a, 1)
                        : r;
                  }
                  c = o[u - 1];
              }
              return void 0 === c ? "" : c;
            })
          );
        };
      },
      4576(t) {
        "use strict";
        var e = function (t) {
          return t && t.Math === Math && t;
        };
        t.exports =
          e("object" == typeof globalThis && globalThis) ||
          e("object" == typeof window && window) ||
          e("object" == typeof self && self) ||
          e("object" == typeof globalThis && globalThis) ||
          e("object" == typeof this && this) ||
          (function () {
            return this;
          })() ||
          Function("return this")();
      },
      9297(t, e, n) {
        "use strict";
        var o = n(9504),
          r = n(8981),
          i = o({}.hasOwnProperty);
        t.exports =
          Object.hasOwn ||
          function (t, e) {
            return i(r(t), e);
          };
      },
      421(t) {
        "use strict";
        t.exports = {};
      },
      397(t, e, n) {
        "use strict";
        var o = n(7751);
        t.exports = o("document", "documentElement");
      },
      5917(t, e, n) {
        "use strict";
        var o = n(3724),
          r = n(9039),
          i = n(4055);
        t.exports =
          !o &&
          !r(function () {
            return (
              7 !==
              Object.defineProperty(i("div"), "a", {
                get: function () {
                  return 7;
                },
              }).a
            );
          });
      },
      7055(t, e, n) {
        "use strict";
        var o = n(9504),
          r = n(9039),
          i = n(2195),
          s = Object,
          a = o("".split);
        t.exports = r(function () {
          return !s("z").propertyIsEnumerable(0);
        })
          ? function (t) {
              return "String" === i(t) ? a(t, "") : s(t);
            }
          : s;
      },
      3706(t, e, n) {
        "use strict";
        var o = n(9504),
          r = n(4901),
          i = n(7629),
          s = o(Function.toString);
        (r(i.inspectSource) ||
          (i.inspectSource = function (t) {
            return s(t);
          }),
          (t.exports = i.inspectSource));
      },
      1181(t, e, n) {
        "use strict";
        var o,
          r,
          i,
          s = n(8622),
          a = n(4576),
          l = n(34),
          c = n(6699),
          u = n(9297),
          p = n(7629),
          d = n(6119),
          f = n(421),
          h = "Object already initialized",
          v = a.TypeError,
          g = a.WeakMap;
        if (s || p.state) {
          var m = p.state || (p.state = new g());
          ((m.get = m.get),
            (m.has = m.has),
            (m.set = m.set),
            (o = function (t, e) {
              if (m.has(t)) throw new v(h);
              return ((e.facade = t), m.set(t, e), e);
            }),
            (r = function (t) {
              return m.get(t) || {};
            }),
            (i = function (t) {
              return m.has(t);
            }));
        } else {
          var y = d("state");
          ((f[y] = !0),
            (o = function (t, e) {
              if (u(t, y)) throw new v(h);
              return ((e.facade = t), c(t, y, e), e);
            }),
            (r = function (t) {
              return u(t, y) ? t[y] : {};
            }),
            (i = function (t) {
              return u(t, y);
            }));
        }
        t.exports = {
          set: o,
          get: r,
          has: i,
          enforce: function (t) {
            return i(t) ? r(t) : o(t, {});
          },
          getterFor: function (t) {
            return function (e) {
              var n;
              if (!l(e) || (n = r(e)).type !== t)
                throw new v("Incompatible receiver, " + t + " required");
              return n;
            };
          },
        };
      },
      4901(t) {
        "use strict";
        var e = "object" == typeof document && document.all;
        t.exports =
          void 0 === e && void 0 !== e
            ? function (t) {
                return "function" == typeof t || t === e;
              }
            : function (t) {
                return "function" == typeof t;
              };
      },
      2796(t, e, n) {
        "use strict";
        var o = n(9039),
          r = n(4901),
          i = /#|\.prototype\./,
          s = function (t, e) {
            var n = l[a(t)];
            return n === u || (n !== c && (r(e) ? o(e) : !!e));
          },
          a = (s.normalize = function (t) {
            return String(t).replace(i, ".").toLowerCase();
          }),
          l = (s.data = {}),
          c = (s.NATIVE = "N"),
          u = (s.POLYFILL = "P");
        t.exports = s;
      },
      4117(t) {
        "use strict";
        t.exports = function (t) {
          return null == t;
        };
      },
      34(t, e, n) {
        "use strict";
        var o = n(4901);
        t.exports = function (t) {
          return "object" == typeof t ? null !== t : o(t);
        };
      },
      6395(t) {
        "use strict";
        t.exports = !1;
      },
      757(t, e, n) {
        "use strict";
        var o = n(7751),
          r = n(4901),
          i = n(1625),
          s = n(7040),
          a = Object;
        t.exports = s
          ? function (t) {
              return "symbol" == typeof t;
            }
          : function (t) {
              var e = o("Symbol");
              return r(e) && i(e.prototype, a(t));
            };
      },
      6198(t, e, n) {
        "use strict";
        var o = n(8014);
        t.exports = function (t) {
          return o(t.length);
        };
      },
      283(t, e, n) {
        "use strict";
        var o = n(9504),
          r = n(9039),
          i = n(4901),
          s = n(9297),
          a = n(3724),
          l = n(350).CONFIGURABLE,
          c = n(3706),
          u = n(1181),
          p = u.enforce,
          d = u.get,
          f = String,
          h = Object.defineProperty,
          v = o("".slice),
          g = o("".replace),
          m = o([].join),
          y =
            a &&
            !r(function () {
              return 8 !== h(function () {}, "length", { value: 8 }).length;
            }),
          b = String(String).split("String"),
          x = (t.exports = function (t, e, n) {
            ("Symbol(" === v(f(e), 0, 7) &&
              (e = "[" + g(f(e), /^Symbol\(([^)]*)\).*$/, "$1") + "]"),
              n && n.getter && (e = "get " + e),
              n && n.setter && (e = "set " + e),
              (!s(t, "name") || (l && t.name !== e)) &&
                (a
                  ? h(t, "name", { value: e, configurable: !0 })
                  : (t.name = e)),
              y &&
                n &&
                s(n, "arity") &&
                t.length !== n.arity &&
                h(t, "length", { value: n.arity }));
            try {
              n && s(n, "constructor") && n.constructor
                ? a && h(t, "prototype", { writable: !1 })
                : t.prototype && (t.prototype = void 0);
            } catch (t) {}
            var o = p(t);
            return (
              s(o, "source") ||
                (o.source = m(b, "string" == typeof e ? e : "")),
              t
            );
          });
        Function.prototype.toString = x(function () {
          return (i(this) && d(this).source) || c(this);
        }, "toString");
      },
      741(t) {
        "use strict";
        var e = Math.ceil,
          n = Math.floor;
        t.exports =
          Math.trunc ||
          function (t) {
            var o = +t;
            return (o > 0 ? n : e)(o);
          };
      },
      2360(t, e, n) {
        "use strict";
        var o,
          r = n(8551),
          i = n(6801),
          s = n(8727),
          a = n(421),
          l = n(397),
          c = n(4055),
          u = n(6119),
          p = "prototype",
          d = "script",
          f = u("IE_PROTO"),
          h = function () {},
          v = function (t) {
            return "<" + d + ">" + t + "</" + d + ">";
          },
          g = function (t) {
            (t.write(v("")), t.close());
            var e = t.parentWindow.Object;
            return ((t = null), e);
          },
          m = function () {
            try {
              o = new ActiveXObject("htmlfile");
            } catch (t) {}
            var t, e, n;
            m =
              "undefined" != typeof document
                ? document.domain && o
                  ? g(o)
                  : ((e = c("iframe")),
                    (n = "java" + d + ":"),
                    (e.style.display = "none"),
                    l.appendChild(e),
                    (e.src = String(n)),
                    (t = e.contentWindow.document).open(),
                    t.write(v("document.F=Object")),
                    t.close(),
                    t.F)
                : g(o);
            for (var r = s.length; r--;) delete m[p][s[r]];
            return m();
          };
        ((a[f] = !0),
          (t.exports =
            Object.create ||
            function (t, e) {
              var n;
              return (
                null !== t
                  ? ((h[p] = r(t)), (n = new h()), (h[p] = null), (n[f] = t))
                  : (n = m()),
                void 0 === e ? n : i.f(n, e)
              );
            }));
      },
      6801(t, e, n) {
        "use strict";
        var o = n(3724),
          r = n(8686),
          i = n(4913),
          s = n(8551),
          a = n(5397),
          l = n(1072);
        e.f =
          o && !r
            ? Object.defineProperties
            : function (t, e) {
                s(t);
                for (var n, o = a(e), r = l(e), c = r.length, u = 0; c > u;)
                  i.f(t, (n = r[u++]), o[n]);
                return t;
              };
      },
      4913(t, e, n) {
        "use strict";
        var o = n(3724),
          r = n(5917),
          i = n(8686),
          s = n(8551),
          a = n(6969),
          l = TypeError,
          c = Object.defineProperty,
          u = Object.getOwnPropertyDescriptor,
          p = "enumerable",
          d = "configurable",
          f = "writable";
        e.f = o
          ? i
            ? function (t, e, n) {
                if (
                  (s(t),
                  (e = a(e)),
                  s(n),
                  "function" == typeof t &&
                    "prototype" === e &&
                    "value" in n &&
                    f in n &&
                    !n[f])
                ) {
                  var o = u(t, e);
                  o &&
                    o[f] &&
                    ((t[e] = n.value),
                    (n = {
                      configurable: d in n ? n[d] : o[d],
                      enumerable: p in n ? n[p] : o[p],
                      writable: !1,
                    }));
                }
                return c(t, e, n);
              }
            : c
          : function (t, e, n) {
              if ((s(t), (e = a(e)), s(n), r))
                try {
                  return c(t, e, n);
                } catch (t) {}
              if ("get" in n || "set" in n)
                throw new l("Accessors not supported");
              return ("value" in n && (t[e] = n.value), t);
            };
      },
      7347(t, e, n) {
        "use strict";
        var o = n(3724),
          r = n(9565),
          i = n(8773),
          s = n(6980),
          a = n(5397),
          l = n(6969),
          c = n(9297),
          u = n(5917),
          p = Object.getOwnPropertyDescriptor;
        e.f = o
          ? p
          : function (t, e) {
              if (((t = a(t)), (e = l(e)), u))
                try {
                  return p(t, e);
                } catch (t) {}
              if (c(t, e)) return s(!r(i.f, t, e), t[e]);
            };
      },
      8480(t, e, n) {
        "use strict";
        var o = n(1828),
          r = n(8727).concat("length", "prototype");
        e.f =
          Object.getOwnPropertyNames ||
          function (t) {
            return o(t, r);
          };
      },
      3717(t, e) {
        "use strict";
        e.f = Object.getOwnPropertySymbols;
      },
      1625(t, e, n) {
        "use strict";
        var o = n(9504);
        t.exports = o({}.isPrototypeOf);
      },
      1828(t, e, n) {
        "use strict";
        var o = n(9504),
          r = n(9297),
          i = n(5397),
          s = n(9617).indexOf,
          a = n(421),
          l = o([].push);
        t.exports = function (t, e) {
          var n,
            o = i(t),
            c = 0,
            u = [];
          for (n in o) !r(a, n) && r(o, n) && l(u, n);
          for (; e.length > c;) r(o, (n = e[c++])) && (~s(u, n) || l(u, n));
          return u;
        };
      },
      1072(t, e, n) {
        "use strict";
        var o = n(1828),
          r = n(8727);
        t.exports =
          Object.keys ||
          function (t) {
            return o(t, r);
          };
      },
      8773(t, e) {
        "use strict";
        var n = {}.propertyIsEnumerable,
          o = Object.getOwnPropertyDescriptor,
          r = o && !n.call({ 1: 2 }, 1);
        e.f = r
          ? function (t) {
              var e = o(this, t);
              return !!e && e.enumerable;
            }
          : n;
      },
      4270(t, e, n) {
        "use strict";
        var o = n(9565),
          r = n(4901),
          i = n(34),
          s = TypeError;
        t.exports = function (t, e) {
          var n, a;
          if ("string" === e && r((n = t.toString)) && !i((a = o(n, t))))
            return a;
          if (r((n = t.valueOf)) && !i((a = o(n, t)))) return a;
          if ("string" !== e && r((n = t.toString)) && !i((a = o(n, t))))
            return a;
          throw new s("Can't convert object to primitive value");
        };
      },
      5031(t, e, n) {
        "use strict";
        var o = n(7751),
          r = n(9504),
          i = n(8480),
          s = n(3717),
          a = n(8551),
          l = r([].concat);
        t.exports =
          o("Reflect", "ownKeys") ||
          function (t) {
            var e = i.f(a(t)),
              n = s.f;
            return n ? l(e, n(t)) : e;
          };
      },
      6682(t, e, n) {
        "use strict";
        var o = n(9565),
          r = n(8551),
          i = n(4901),
          s = n(2195),
          a = n(7323),
          l = TypeError;
        t.exports = function (t, e) {
          var n = t.exec;
          if (i(n)) {
            var c = o(n, t, e);
            return (null !== c && r(c), c);
          }
          if ("RegExp" === s(t)) return o(a, t, e);
          throw new l("RegExp#exec called on incompatible receiver");
        };
      },
      7323(t, e, n) {
        "use strict";
        var o,
          r,
          i = n(9565),
          s = n(9504),
          a = n(655),
          l = n(7979),
          c = n(8429),
          u = n(5745),
          p = n(2360),
          d = n(1181).get,
          f = n(3635),
          h = n(8814),
          v = u("native-string-replace", String.prototype.replace),
          g = RegExp.prototype.exec,
          m = g,
          y = s("".charAt),
          b = s("".indexOf),
          x = s("".replace),
          _ = s("".slice),
          w =
            ((r = /b*/g),
            i(g, (o = /a/), "a"),
            i(g, r, "a"),
            0 !== o.lastIndex || 0 !== r.lastIndex),
          O = c.BROKEN_CARET,
          E = void 0 !== /()??/.exec("")[1];
        ((w || E || O || f || h) &&
          (m = function (t) {
            var e,
              n,
              o,
              r,
              s,
              c,
              u,
              f = this,
              h = d(f),
              S = a(t),
              T = h.raw;
            if (T)
              return (
                (T.lastIndex = f.lastIndex),
                (e = i(m, T, S)),
                (f.lastIndex = T.lastIndex),
                e
              );
            var C = h.groups,
              k = O && f.sticky,
              A = i(l, f),
              P = f.source,
              L = 0,
              j = S;
            if (
              (k &&
                ((A = x(A, "y", "")),
                -1 === b(A, "g") && (A += "g"),
                (j = _(S, f.lastIndex)),
                f.lastIndex > 0 &&
                  (!f.multiline ||
                    (f.multiline && "\n" !== y(S, f.lastIndex - 1))) &&
                  ((P = "(?: " + P + ")"), (j = " " + j), L++),
                (n = new RegExp("^(?:" + P + ")", A))),
              E && (n = new RegExp("^" + P + "$(?!\\s)", A)),
              w && (o = f.lastIndex),
              (r = i(g, k ? n : f, j)),
              k
                ? r
                  ? ((r.input = _(r.input, L)),
                    (r[0] = _(r[0], L)),
                    (r.index = f.lastIndex),
                    (f.lastIndex += r[0].length))
                  : (f.lastIndex = 0)
                : w &&
                  r &&
                  (f.lastIndex = f.global ? r.index + r[0].length : o),
              E &&
                r &&
                r.length > 1 &&
                i(v, r[0], n, function () {
                  for (s = 1; s < arguments.length - 2; s++)
                    void 0 === arguments[s] && (r[s] = void 0);
                }),
              r && C)
            )
              for (r.groups = c = p(null), s = 0; s < C.length; s++)
                c[(u = C[s])[0]] = r[u[1]];
            return r;
          }),
          (t.exports = m));
      },
      5213(t, e, n) {
        "use strict";
        var o = n(4576),
          r = n(9039),
          i = o.RegExp,
          s = !r(function () {
            var t = !0;
            try {
              i(".", "d");
            } catch (e) {
              t = !1;
            }
            var e = {},
              n = "",
              o = t ? "dgimsy" : "gimsy",
              r = function (t, o) {
                Object.defineProperty(e, t, {
                  get: function () {
                    return ((n += o), !0);
                  },
                });
              },
              s = {
                dotAll: "s",
                global: "g",
                ignoreCase: "i",
                multiline: "m",
                sticky: "y",
              };
            for (var a in (t && (s.hasIndices = "d"), s)) r(a, s[a]);
            return (
              Object.getOwnPropertyDescriptor(i.prototype, "flags").get.call(
                e,
              ) !== o || n !== o
            );
          });
        t.exports = { correct: s };
      },
      7979(t, e, n) {
        "use strict";
        var o = n(8551);
        t.exports = function () {
          var t = o(this),
            e = "";
          return (
            t.hasIndices && (e += "d"),
            t.global && (e += "g"),
            t.ignoreCase && (e += "i"),
            t.multiline && (e += "m"),
            t.dotAll && (e += "s"),
            t.unicode && (e += "u"),
            t.unicodeSets && (e += "v"),
            t.sticky && (e += "y"),
            e
          );
        };
      },
      1034(t, e, n) {
        "use strict";
        var o = n(9565),
          r = n(9297),
          i = n(1625),
          s = n(5213),
          a = n(7979),
          l = RegExp.prototype;
        t.exports = s.correct
          ? function (t) {
              return t.flags;
            }
          : function (t) {
              return s.correct || !i(l, t) || r(t, "flags") ? t.flags : o(a, t);
            };
      },
      8429(t, e, n) {
        "use strict";
        var o = n(9039),
          r = n(4576).RegExp,
          i = o(function () {
            var t = r("a", "y");
            return ((t.lastIndex = 2), null !== t.exec("abcd"));
          }),
          s =
            i ||
            o(function () {
              return !r("a", "y").sticky;
            }),
          a =
            i ||
            o(function () {
              var t = r("^r", "gy");
              return ((t.lastIndex = 2), null !== t.exec("str"));
            });
        t.exports = { BROKEN_CARET: a, MISSED_STICKY: s, UNSUPPORTED_Y: i };
      },
      3635(t, e, n) {
        "use strict";
        var o = n(9039),
          r = n(4576).RegExp;
        t.exports = o(function () {
          var t = r(".", "s");
          return !(t.dotAll && t.test("\n") && "s" === t.flags);
        });
      },
      8814(t, e, n) {
        "use strict";
        var o = n(9039),
          r = n(4576).RegExp;
        t.exports = o(function () {
          var t = r("(?<a>b)", "g");
          return (
            "b" !== t.exec("b").groups.a || "bc" !== "b".replace(t, "$<a>c")
          );
        });
      },
      7750(t, e, n) {
        "use strict";
        var o = n(4117),
          r = TypeError;
        t.exports = function (t) {
          if (o(t)) throw new r("Can't call method on " + t);
          return t;
        };
      },
      6119(t, e, n) {
        "use strict";
        var o = n(5745),
          r = n(3392),
          i = o("keys");
        t.exports = function (t) {
          return i[t] || (i[t] = r(t));
        };
      },
      7629(t, e, n) {
        "use strict";
        var o = n(6395),
          r = n(4576),
          i = n(9433),
          s = "__core-js_shared__",
          a = (t.exports = r[s] || i(s, {}));
        (a.versions || (a.versions = [])).push({
          version: "3.48.0",
          mode: o ? "pure" : "global",
          copyright:
            "© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.",
          license: "https://github.com/zloirock/core-js/blob/v3.48.0/LICENSE",
          source: "https://github.com/zloirock/core-js",
        });
      },
      5745(t, e, n) {
        "use strict";
        var o = n(7629);
        t.exports = function (t, e) {
          return o[t] || (o[t] = e || {});
        };
      },
      8183(t, e, n) {
        "use strict";
        var o = n(9504),
          r = n(1291),
          i = n(655),
          s = n(7750),
          a = o("".charAt),
          l = o("".charCodeAt),
          c = o("".slice),
          u = function (t) {
            return function (e, n) {
              var o,
                u,
                p = i(s(e)),
                d = r(n),
                f = p.length;
              return d < 0 || d >= f
                ? t
                  ? ""
                  : void 0
                : (o = l(p, d)) < 55296 ||
                    o > 56319 ||
                    d + 1 === f ||
                    (u = l(p, d + 1)) < 56320 ||
                    u > 57343
                  ? t
                    ? a(p, d)
                    : o
                  : t
                    ? c(p, d, d + 2)
                    : u - 56320 + ((o - 55296) << 10) + 65536;
            };
          };
        t.exports = { codeAt: u(!1), charAt: u(!0) };
      },
      4495(t, e, n) {
        "use strict";
        var o = n(9519),
          r = n(9039),
          i = n(4576).String;
        t.exports =
          !!Object.getOwnPropertySymbols &&
          !r(function () {
            var t = Symbol("symbol detection");
            return (
              !i(t) ||
              !(Object(t) instanceof Symbol) ||
              (!Symbol.sham && o && o < 41)
            );
          });
      },
      5610(t, e, n) {
        "use strict";
        var o = n(1291),
          r = Math.max,
          i = Math.min;
        t.exports = function (t, e) {
          var n = o(t);
          return n < 0 ? r(n + e, 0) : i(n, e);
        };
      },
      5397(t, e, n) {
        "use strict";
        var o = n(7055),
          r = n(7750);
        t.exports = function (t) {
          return o(r(t));
        };
      },
      1291(t, e, n) {
        "use strict";
        var o = n(741);
        t.exports = function (t) {
          var e = +t;
          return e != e || 0 === e ? 0 : o(e);
        };
      },
      8014(t, e, n) {
        "use strict";
        var o = n(1291),
          r = Math.min;
        t.exports = function (t) {
          var e = o(t);
          return e > 0 ? r(e, 9007199254740991) : 0;
        };
      },
      8981(t, e, n) {
        "use strict";
        var o = n(7750),
          r = Object;
        t.exports = function (t) {
          return r(o(t));
        };
      },
      2777(t, e, n) {
        "use strict";
        var o = n(9565),
          r = n(34),
          i = n(757),
          s = n(5966),
          a = n(4270),
          l = n(8227),
          c = TypeError,
          u = l("toPrimitive");
        t.exports = function (t, e) {
          if (!r(t) || i(t)) return t;
          var n,
            l = s(t, u);
          if (l) {
            if (
              (void 0 === e && (e = "default"), (n = o(l, t, e)), !r(n) || i(n))
            )
              return n;
            throw new c("Can't convert object to primitive value");
          }
          return (void 0 === e && (e = "number"), a(t, e));
        };
      },
      6969(t, e, n) {
        "use strict";
        var o = n(2777),
          r = n(757);
        t.exports = function (t) {
          var e = o(t, "string");
          return r(e) ? e : e + "";
        };
      },
      2140(t, e, n) {
        "use strict";
        var o = {};
        ((o[n(8227)("toStringTag")] = "z"),
          (t.exports = "[object z]" === String(o)));
      },
      655(t, e, n) {
        "use strict";
        var o = n(6955),
          r = String;
        t.exports = function (t) {
          if ("Symbol" === o(t))
            throw new TypeError("Cannot convert a Symbol value to a string");
          return r(t);
        };
      },
      6823(t) {
        "use strict";
        var e = String;
        t.exports = function (t) {
          try {
            return e(t);
          } catch (t) {
            return "Object";
          }
        };
      },
      3392(t, e, n) {
        "use strict";
        var o = n(9504),
          r = 0,
          i = Math.random(),
          s = o((1.1).toString);
        t.exports = function (t) {
          return "Symbol(" + (void 0 === t ? "" : t) + ")_" + s(++r + i, 36);
        };
      },
      7040(t, e, n) {
        "use strict";
        var o = n(4495);
        t.exports = o && !Symbol.sham && "symbol" == typeof Symbol.iterator;
      },
      8686(t, e, n) {
        "use strict";
        var o = n(3724),
          r = n(9039);
        t.exports =
          o &&
          r(function () {
            return (
              42 !==
              Object.defineProperty(function () {}, "prototype", {
                value: 42,
                writable: !1,
              }).prototype
            );
          });
      },
      8622(t, e, n) {
        "use strict";
        var o = n(4576),
          r = n(4901),
          i = o.WeakMap;
        t.exports = r(i) && /native code/.test(String(i));
      },
      8227(t, e, n) {
        "use strict";
        var o = n(4576),
          r = n(5745),
          i = n(9297),
          s = n(3392),
          a = n(4495),
          l = n(7040),
          c = o.Symbol,
          u = r("wks"),
          p = l ? c.for || c : (c && c.withoutSetter) || s;
        t.exports = function (t) {
          return (
            i(u, t) || (u[t] = a && i(c, t) ? c[t] : p("Symbol." + t)),
            u[t]
          );
        };
      },
      4185(t, e, n) {
        "use strict";
        var o = n(6518),
          r = n(3724),
          i = n(4913).f;
        o(
          {
            target: "Object",
            stat: !0,
            forced: Object.defineProperty !== i,
            sham: !r,
          },
          { defineProperty: i },
        );
      },
      7495(t, e, n) {
        "use strict";
        var o = n(6518),
          r = n(7323);
        o({ target: "RegExp", proto: !0, forced: /./.exec !== r }, { exec: r });
      },
      5440(t, e, n) {
        "use strict";
        var o = n(8745),
          r = n(9565),
          i = n(9504),
          s = n(9228),
          a = n(9039),
          l = n(8551),
          c = n(4901),
          u = n(34),
          p = n(1291),
          d = n(8014),
          f = n(655),
          h = n(7750),
          v = n(7829),
          g = n(5966),
          m = n(2478),
          y = n(1034),
          b = n(6682),
          x = n(8227)("replace"),
          _ = Math.max,
          w = Math.min,
          O = i([].concat),
          E = i([].push),
          S = i("".indexOf),
          T = i("".slice),
          C = function (t) {
            return void 0 === t ? t : String(t);
          },
          k = "$0" === "a".replace(/./, "$0"),
          A = !!/./[x] && "" === /./[x]("a", "$0");
        s(
          "replace",
          function (t, e, n) {
            var i = A ? "$" : "$0";
            return [
              function (t, n) {
                var o = h(this),
                  i = u(t) ? g(t, x) : void 0;
                return i ? r(i, t, o, n) : r(e, f(o), t, n);
              },
              function (t, r) {
                var s = l(this),
                  a = f(t);
                if (
                  "string" == typeof r &&
                  -1 === S(r, i) &&
                  -1 === S(r, "$<")
                ) {
                  var u = n(e, s, a, r);
                  if (u.done) return u.value;
                }
                var h = c(r);
                h || (r = f(r));
                var g,
                  x = f(y(s)),
                  k = -1 !== S(x, "g");
                k && ((g = -1 !== S(x, "u")), (s.lastIndex = 0));
                for (var A, P = []; null !== (A = b(s, a)) && (E(P, A), k);)
                  "" === f(A[0]) && (s.lastIndex = v(a, d(s.lastIndex), g));
                for (var L = "", j = 0, D = 0; D < P.length; D++) {
                  for (
                    var I,
                      N = f((A = P[D])[0]),
                      R = _(w(p(A.index), a.length), 0),
                      M = [],
                      V = 1;
                    V < A.length;
                    V++
                  )
                    E(M, C(A[V]));
                  var H = A.groups;
                  if (h) {
                    var U = O([N], M, R, a);
                    (void 0 !== H && E(U, H), (I = f(o(r, void 0, U))));
                  } else I = m(N, a, R, M, H, r);
                  R >= j && ((L += T(a, j, R) + I), (j = R + N.length));
                }
                return L + T(a, j);
              },
            ];
          },
          !!a(function () {
            var t = /./;
            return (
              (t.exec = function () {
                var t = [];
                return ((t.groups = { a: "7" }), t);
              }),
              "7" !== "".replace(t, "$<a>")
            );
          }) ||
            !k ||
            A,
        );
      },
    },
    e = {};
  function n(o) {
    var r = e[o];
    if (void 0 !== r) return r.exports;
    var i = (e[o] = { exports: {} });
    return (t[o].call(i.exports, i, i.exports, n), i.exports);
  }
  ((n.n = (t) => {
    var e = t && t.__esModule ? () => t.default : () => t;
    return (n.d(e, { a: e }), e);
  }),
    (n.d = (t, e) => {
      for (var o in e)
        n.o(e, o) &&
          !n.o(t, o) &&
          Object.defineProperty(t, o, { enumerable: !0, get: e[o] });
    }),
    (n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (() => {
      "use strict";
      var t = n(9498),
        e = n(7736),
        o = n.n(e),
        r = n(8670),
        i = (function () {
          function t(t, e) {
            ((this.actionLink = !0),
              (this.bodyClass = "vapor-table-data"),
              (this.rowClass = "table-row"),
              (this.headingClass = "table-heading"),
              (this.cellClass = "table-cell"),
              (this.tableContainer = "vapor-table-wrapper"),
              (this.table = document.getElementById(this.tableContainer)),
              t &&
                e &&
                ((this.table.innerHTML = ""),
                (this.rows = e),
                (this.heading = t)));
          }
          return (
            (t.getInstance = function (e, n) {
              return new t(e, n);
            }),
            (t.prototype.create = function () {
              var t = this.createHeading(),
                e = this.createRow();
              return (
                this.table.appendChild(t),
                this.table.appendChild(e),
                this
              );
            }),
            (t.prototype.clear = function () {
              this.table.innerHTML = "";
            }),
            (t.prototype.loading = function () {
              return (
                (this.table.innerHTML =
                  '<div class="text-center"><div class="spinner-border" role="status"> <span class="visually-hidden">Loading...</span></div></div>'),
                this
              );
            }),
            (t.prototype.noData = function () {
              this.clear();
              var t = document.createElement("div");
              (t.classList.add("no-items"),
                t.appendChild(document.createTextNode(f.t("No items"))),
                this.table.appendChild(t));
            }),
            (t.prototype.createHeading = function (t) {
              var e = this;
              void 0 === t && (t = "table-heading");
              var n = document.createElement("section");
              n.classList.add(this.headingClass);
              var o = document.createElement("header");
              return (
                o.classList.add(this.rowClass),
                n.classList.add(this.headingClass),
                this.heading.forEach(function (n) {
                  var r = document.createElement("div");
                  (r.classList.add(t + "-" + n.toLowerCase()),
                    r.classList.add(e.cellClass));
                  var i = document.createTextNode(f.t(f.ucfirst(n)));
                  (r.appendChild(i), o.appendChild(r));
                }),
                n.appendChild(o),
                n
              );
            }),
            (t.prototype.createRow = function () {
              var t,
                e = this,
                n = document.createElement("section");
              (n.classList.add(this.bodyClass), n.classList.add("table-body"));
              for (
                var o = function (o) {
                    if (null === o) return "continue";
                    var i;
                    (t = document.createElement("div")).classList.add(
                      r.rowClass,
                    );
                    var s = function (n) {
                      if ("data" == n.substring(0, 4)) {
                        var s = n.replace("_", "-");
                        return (
                          "string" == typeof o[n] &&
                            (t.setAttribute(s, o[n]), t.setAttribute("id", n)),
                          "continue"
                        );
                      }
                      var a = document.createElement("div");
                      if (
                        (a.classList.add(r.cellClass),
                        "actions" === n && Array.isArray(o[n]))
                      ) {
                        var l = o[n];
                        a.classList.add([r.cellClass, "action-item"].join("-"));
                        var c = document.createElement("div");
                        (c.classList.add("button-container"),
                          l.forEach(function (t) {
                            if (t.name) {
                              var n = t.data || "";
                              c.appendChild(
                                e.createActionButton(t.name, t.path, n),
                              );
                            }
                          }),
                          a.appendChild(c),
                          t.appendChild(a));
                      } else {
                        var u;
                        if (Array.isArray(o[n]))
                          return (
                            o[n].forEach(function (t) {
                              ((u = document.createElement("div")),
                                f.isHtml(t)
                                  ? (u.innerHTML = t)
                                  : ((i = document.createTextNode(t)),
                                    u.appendChild(i)),
                                a.appendChild(u));
                            }),
                            a.setAttribute("id", [r.cellClass, n].join("-")),
                            t.appendChild(a),
                            "continue"
                          );
                        "string" == typeof o[n] &&
                          ((i = document.createTextNode(o[n])),
                          a.appendChild(i),
                          a.setAttribute("id", [r.cellClass, n].join("-")),
                          t.appendChild(a));
                      }
                    };
                    for (var a in o) s(a);
                    n.appendChild(t);
                  },
                  r = this,
                  i = 0,
                  s = this.rows;
                i < s.length;
                i++
              )
                o(s[i]);
              return n;
            }),
            (t.prototype.createActionButton = function (t, e, n) {
              var o = document.createElement("button");
              return (
                o.classList.add("icon-" + t),
                o.setAttribute("path", e),
                o.setAttribute("data", n || "nodata"),
                "refresh" == t && (t = f.t("Redownload")),
                o.setAttribute("data-tippy-content", f.ucfirst(t)),
                o.setAttribute("title", f.ucfirst(t)),
                o.setAttribute("id", t + "-action-button"),
                o
              );
            }),
            (t.prototype.createActionCell = function (t) {
              var e = document.createElement("div"),
                n = document.createElement("button");
              (n.classList.add("icon-more", "action-button"),
                n.setAttribute("id", "action-links-button"),
                e.classList.add("action-item"),
                e.appendChild(n),
                t.appendChild(e));
            }),
            t
          );
        })();
      const s = i;
      var a = (function () {
        function t(t, e) {
          (void 0 === e && (e = !1),
            (this.url = t),
            (this.method = "POST"),
            (this.data = null),
            (this.contentType = "application/json"),
            (this.legacyHttp = e),
            e || (this.headers = new Headers()));
        }
        return (
          (t.prototype.isFetchAPISupported = function () {
            return "function" == typeof fetch;
          }),
          (t.create = function (t, e) {
            return (void 0 === e && (e = !1), new a(t, e));
          }),
          (t.prototype.setData = function (t) {
            return ((this.data = t), this);
          }),
          (t.prototype.setContentType = function (t) {
            return ((this.contentType = t), this);
          }),
          (t.prototype.send = function () {
            var t = this,
              e = this.getToken();
            if (!this.isFetchAPISupported() || this.legacyHttp) {
              ((this.client = new XMLHttpRequest()),
                this.client.open(this.method, this.url),
                this.contentType &&
                  this.setHeader("Content-Type", this.contentType),
                e &&
                  (this.setHeader("requesttoken", e),
                  this.setHeader("OCS-APIREQUEST", "true")));
              var n = this.handler;
              ((this.client.onreadystatechange = function () {
                if (t.client.readyState === XMLHttpRequest.DONE) {
                  var e = t.client.status,
                    o = t.client.getResponseHeader("Content-Type");
                  (0 === e || (e >= 200 && e < 400)) &&
                    ("function" == typeof n &&
                    -1 !== o.indexOf("application/json")
                      ? n(JSON.parse(t.client.response))
                      : n(t.client.response));
                }
              }),
                (this.client.onerror = this.errorHandler));
              var o = this.data ? JSON.stringify(this.data) : null;
              this.client.send(o);
            } else {
              var r = this.getRequestOpts();
              fetch(r)
                .then(function (e) {
                  if (200 === e.status) {
                    var n = e.headers.get("content-type");
                    n && -1 !== n.indexOf("application/json")
                      ? e.json().then(function (e) {
                          t.handler(e);
                        })
                      : e.text().then(function (e) {
                          t.handler(e);
                        });
                  } else
                    console.log("Network failures. Status Code: " + e.status);
                })
                .catch(this.errorHandler);
            }
          }),
          (t.prototype.setHeader = function (t, e) {
            this.legacyHttp
              ? this.client.setRequestHeader(t, e)
              : this.headers.set(t, e);
          }),
          (t.prototype.appendHeader = function (t, e) {
            this.headers.append(t, e);
          }),
          (t.prototype.getRequestOpts = function () {
            var t;
            if (
              (this.setHeader("content-type", this.contentType),
              (t = this.getToken()) &&
                (this.setHeader("requesttoken", t),
                this.setHeader("OCS-APIREQUEST", "true")),
              "POST" == this.method && this.data)
            )
              var e = JSON.stringify(this.data);
            var n = {
              headers: this.headers,
              method: this.method,
              body: e,
              mode: "cors",
              cache: "default",
            };
            return new Request(this.url, n);
          }),
          (t.prototype.getToken = function () {
            return "undefined" == typeof document
              ? null
              : window.document
                  .getElementsByTagName("head")[0]
                  .getAttribute("data-requesttoken");
          }),
          (t.prototype.setUrl = function (t) {
            return ((this.url = t), this);
          }),
          (t.prototype.setMethod = function (t) {
            return ((this.method = t), this);
          }),
          (t.prototype.setHandler = function (t) {
            return ((this.handler = t || function (t) {}), this);
          }),
          (t.prototype.setErrorHandler = function (t) {
            return (
              (this.errorHandler =
                t ||
                function (t) {
                  console.log(t);
                }),
              this
            );
          }),
          (t.prototype.upload = function (t) {
            var e = this,
              n = new FormData();
            ((this.client = new XMLHttpRequest()),
              this.client.open(this.method, this.url, !0),
              this.setHeader("requesttoken", this.getToken()),
              this.setHeader("OCS-APIREQUEST", "true"));
            var o = this.handler;
            return (
              (this.client.onload = function () {
                "function" == typeof o && o(JSON.parse(e.client.response));
              }),
              n.append("torrentfile", t),
              this.client.send(n)
            );
          }),
          t
        );
      })();
      const l = a;
      const c = (function () {
          function t() {
            ((this.delay = 1500), (this.enabled = !1), (this.enabled = !1));
          }
          return (
            (t.create = function () {
              return (
                (this.instance = this.instance || new t()),
                this.instance
              );
            }),
            (t.prototype.enable = function () {
              return ((this.enabled = !0), this);
            }),
            (t.prototype.disable = function () {
              return ((this.enabled = !1), this);
            }),
            (t.prototype.isEnabled = function () {
              return this.enabled;
            }),
            (t.prototype.setDelay = function (t) {
              return (void 0 === t && (t = 1500), (this.delay = t), this);
            }),
            (t.prototype.run = function (t) {
              for (var e = this, n = [], o = 1; o < arguments.length; o++)
                n[o - 1] = arguments[o];
              (this.clear().enable(),
                t.apply(void 0, n),
                (this.timeoutID = window.setTimeout(function () {
                  e.enabled &&
                    e.run.apply(
                      e,
                      (function (t, e, n) {
                        if (n || 2 === arguments.length)
                          for (var o, r = 0, i = e.length; r < i; r++)
                            (!o && r in e) ||
                              (o || (o = Array.prototype.slice.call(e, 0, r)),
                              (o[r] = e[r]));
                        return t.concat(o || Array.prototype.slice.call(e));
                      })([t], n, !1),
                    );
                }, this.delay)));
            }),
            (t.prototype.clear = function () {
              return (
                this.timeoutID && window.clearTimeout(this.timeoutID),
                this
              );
            }),
            t
          );
        })(),
        u = function (t, e, n, o) {
          var r;
          ("function" != typeof n || o || ((o = n), (n = e)),
            e instanceof Element
              ? e.addEventListener(t, function (t) {
                  o.call(e, t);
                })
              : ("string" == typeof e && (r = document.querySelectorAll(e)),
                r &&
                  r.forEach(function (r) {
                    r.addEventListener(t, function (t) {
                      var r = t.target;
                      if (r !== this || n !== e) {
                        for (; r && r != this; r = r.parentElement)
                          if ("string" == typeof n && r.matches(n)) {
                            o.call(r, t);
                            break;
                          }
                      } else o.call(r, t);
                    });
                  })));
        };
      const p = (function () {
          function t(t) {
            var e = this;
            if (
              ((this.elements = []),
              (this.options = {
                selector: "",
                sourceHandler: null,
                minChars: 3,
                delay: 150,
                offsetLeft: 0,
                offsetTop: 1,
                cache: !0,
                menuClass: "",
                onSelect: function (t, e, n) {},
                data: [],
                renderer: function (t, e) {
                  e = e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                  var n = new RegExp(
                    "(".concat(e.split(" ").join("|"), ")"),
                    "gi",
                  );
                  return '<div class="suggestion-item" data-val="'
                    .concat(t, '">')
                    .concat(t.replace(n, "<b>$1</b>"), "</div>");
                },
              }),
              Object.assign(this.options, t),
              "string" != typeof this.options.selector &&
                !(this.options.selector instanceof NodeList))
            )
              throw "invalid selecor!";
            var n =
              this.options.selector instanceof NodeList
                ? this.options.selector
                : document.querySelectorAll(this.options.selector);
            n.length < 1
              ? console.log("no element found for autoComplete")
              : n.forEach(function (t) {
                  var n = { element: t, sgBox: null, cache: [], lastValue: "" };
                  e.elements.push(n);
                });
          }
          return (
            (t.getInstance = function (e) {
              return new t(e);
            }),
            (t.prototype.run = function () {
              for (var t = 0, e = this.elements; t < e.length; t++) {
                var n = e[t];
                this.init(n);
              }
            }),
            (t.prototype.init = function (e) {
              var n = this,
                o = e.element;
              (o.setAttribute("autocomplete", "off"),
                (e.sgBox = this.createSuggestionBox()),
                this.attach("resize", window, function () {
                  n.updateSuggestionBox(e);
                }),
                document.body.appendChild(e.sgBox.box),
                this.live(
                  "suggestion-item",
                  "mouseleave",
                  function (t) {
                    var n = e.sgBox.box.querySelector(
                      ".suggestion-item.selected",
                    );
                    n &&
                      setTimeout(function () {
                        n.className = n.className.replace("selected", "");
                      }, 20);
                  },
                  e.sgBox.box,
                ),
                this.live(
                  "suggestion-item",
                  "mouseover",
                  function (t) {
                    var n = e.sgBox.box.querySelector(
                      ".suggestion-item.selected",
                    );
                    (n && n.classList.remove("selected"),
                      this.classList.add("selected"));
                  },
                  e.sgBox.box,
                ),
                this.live(
                  "suggestion-item",
                  "mousedown,pointerdown",
                  function (o) {
                    (o.stopPropagation(),
                      (function (e, o, r) {
                        if (t.hasClass(e, "suggestion-item")) {
                          var i = e.getAttribute("data-val");
                          ((o.element.value = i),
                            n.options.onSelect(r, i, e),
                            n.hideBox(o.sgBox.box));
                        }
                      })(this, e, o));
                  },
                  e.sgBox.box,
                ),
                this.attach("blur", o, function () {
                  return n.blurCallback(e);
                }),
                this.attach("keydown", o, function (t) {
                  return n.keyDownCallback(e, t);
                }),
                this.attach("keyup", o, function (t) {
                  return n.keyUpCallback(e, t);
                }),
                this.options.minChars ||
                  this.attach("focus", o, function (t) {
                    return n.focusCallback(e, t);
                  }));
            }),
            (t.prototype.getCache = function (t, e) {
              var n = [];
              if (!e) return n;
              if (t in e) n = e[t];
              else
                for (var o = 1; o < t.length - this.options.minChars; o++) {
                  var r = t.slice(0, t.length - o);
                  r in e && !e[r].length && n.push(e[r]);
                }
              return n;
            }),
            (t.prototype.hideBox = function (t) {
              t.style.display = "none";
            }),
            (t.prototype.showResult = function (t, e) {
              var n = this;
              t = t.toLowerCase();
              var o,
                r = [];
              if (
                ((o = this.options.sourceHandler
                  ? this.options.sourceHandler()
                  : this.options.data),
                !this.options.cache)
              ) {
                for (var i = 0, s = o; i < s.length; i++)
                  -1 !== (c = s[i]).toLowerCase().indexOf(t, 0) && r.push(c);
                window.setTimeout(function () {
                  return n.suggest(t, e, r);
                }, this.options.delay);
              }
              if ((r = this.getCache(t, e.cache)).length >= 1)
                this.suggest(t, e, r);
              else {
                for (var a = 0, l = o; a < l.length; a++) {
                  var c;
                  -1 !== (c = l[a]).toLowerCase().indexOf(t, 0) && r.push(c);
                }
                ((e.cache[t] = r),
                  window.setTimeout(function () {
                    return n.suggest(t, e, r);
                  }, this.options.delay));
              }
            }),
            (t.prototype.suggest = function (t, e, n) {
              if (e) {
                var o = e.sgBox;
                if (n.length && t.length >= this.options.minChars) {
                  for (var r = "", i = 0; i < n.length; i++)
                    r += this.options.renderer(n[i], t);
                  ((o.box.innerHTML = r), this.updateSuggestionBox(e, !1));
                } else this.hideBox(o.box);
              }
            }),
            (t.prototype.updatePosition = function (t, e) {
              var n = e.getBoundingClientRect();
              ((t.style.left =
                Math.round(
                  n.left +
                    (window.pageXOffset ||
                      document.documentElement.scrollLeft) +
                    this.options.offsetLeft,
                ) + "px"),
                (t.style.top =
                  Math.round(
                    n.bottom +
                      (window.pageYOffset ||
                        document.documentElement.scrollTop) +
                      this.options.offsetTop,
                  ) + "px"),
                (t.style.width = Math.round(n.right - n.left) + "px"));
            }),
            (t.prototype.updateSuggestionBox = function (e, n, o) {
              var r = e.element,
                i = e.sgBox,
                s = i.box;
              if (
                (this.updatePosition(s, r),
                (!n || o) &&
                  ((s.style.display = "block"),
                  i.maxHeight || (i.maxHeight = t.getMaxHeight(i.box)),
                  i.suggestionHeight ||
                    (i.suggestionHeight =
                      i.box.querySelector(".suggestion-item").offsetHeight),
                  i.suggestionHeight))
              )
                if (o) {
                  var a = i.box.scrollTop,
                    l =
                      o.getBoundingClientRect().top -
                      i.box.getBoundingClientRect().top;
                  l + i.suggestionHeight - i.maxHeight > 0
                    ? (i.box.scrollTop =
                        l + i.suggestionHeight + a - i.maxHeight)
                    : l < 0 && (i.box.scrollTop = l + a);
                } else i.box.scrollTop = 0;
            }),
            (t.hasClass = function (t, e) {
              return t.classList
                ? t.classList.contains(e)
                : new RegExp("\\b" + e + "\\b").test(t.className);
            }),
            (t.prototype.attach = function (t, e, n, o) {
              u(t, e, n, o);
            }),
            (t.prototype.live = function (e, n, o, r) {
              for (
                var i = 0,
                  s =
                    "string" == typeof n && n.indexOf(",") ? n.split(",") : [n];
                i < s.length;
                i++
              ) {
                var a = s[i];
                this.attach(a, r || window.document, function (n) {
                  for (
                    var r, i = n.target || n.srcElement;
                    i && !(r = t.hasClass(i, e));
                  )
                    i = i.parentElement;
                  r && o.call(i, n);
                });
              }
            }),
            (t.prototype.blurCallback = function (t) {
              var e,
                n = this,
                o = t.sgBox;
              try {
                e = document.querySelector(".suggestion-container:hover");
              } catch (t) {
                e = 0;
              }
              e
                ? t.element !== document.activeElement &&
                  window.setTimeout(function () {
                    t.element.focus();
                  }, 20)
                : ((t.lastValue = t.element.value),
                  window.setTimeout(function () {
                    return n.hideBox(o.box);
                  }, 350));
            }),
            (t.prototype.keyUpCallback = function (e, n) {
              var o = e.sgBox,
                r = this.options,
                i = window.event ? n.keyCode : n.which;
              if (!i || ((i < 35 || i > 40) && ![t.ENTER, t.ESC].includes(i))) {
                var s = e.element.value;
                ((e.lastValue = s),
                  s && s.length >= r.minChars
                    ? this.showResult(s, e)
                    : this.hideBox(o.box));
              }
            }),
            (t.prototype.keyDownCallback = function (t, e) {
              var n = this,
                o = t.sgBox,
                r = this.options,
                i = window.event ? e.keyCode : e.which;
              if ((40 != i && 38 != i) || !o.box.innerHTML) {
                if (27 == i)
                  ((t.element.value = t.lastValue), this.hideBox(o.box));
                else if (13 == i || 9 == i) {
                  var s = o.box.querySelector(".suggestion-item.selected");
                  s &&
                    "none" != o.box.style.display &&
                    (r.onSelect(e, s.getAttribute("data-val"), s),
                    window.setTimeout(function () {
                      return n.hideBox(o.box);
                    }, 20));
                }
              } else {
                var a = o.box.querySelector(".suggestion-item.selected"),
                  l = void 0;
                (a
                  ? (l = 40 == i ? a.nextSibling : a.previousSibling)
                    ? ((a.className = a.className.replace("selected", "")),
                      l instanceof Element &&
                        ((l.className += " selected"),
                        (t.element.value = l.getAttribute("data-val"))))
                    : ((a.className = a.className.replace("selected", "")),
                      (t.element.value = t.lastValue),
                      (l = null))
                  : (((l =
                      40 == i
                        ? o.box.querySelector(".suggestion-item")
                        : o.box.childNodes[
                            o.box.childNodes.length - 1
                          ]).className += " selected"),
                    (t.element.value = l.getAttribute("data-val"))),
                  this.updateSuggestionBox(t, !1, l));
              }
            }),
            (t.prototype.focusCallback = function (t, e) {
              ((t.lastValue = "\n"), this.keyUpCallback(t, e));
            }),
            (t.getMaxHeight = function (t) {
              var e = getComputedStyle(t, null);
              return parseInt(e.maxHeight);
            }),
            (t.prototype.createSuggestionBox = function () {
              var t = {
                box: document.createElement("div"),
                maxHeight: 0,
                suggestionHeight: 0,
              };
              return (t.box.classList.add("suggestion-container"), t);
            }),
            (t.UP = 38),
            (t.DOWN = 40),
            (t.ENTER = 13),
            (t.ESC = 27),
            t
          );
        })(),
        d = {
          vue: {},
          addVue(t, e) {
            d.vue[t] = e;
          },
          getVue: (t) => d.vue[t],
          generateUrl: t.Jv,
          loop(t) {
            let e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 3e3;
            for (
              var n = arguments.length, o = new Array(n > 2 ? n - 2 : 0), r = 2;
              r < n;
              r++
            )
              o[r - 2] = arguments[r];
            c.create()
              .setDelay(e)
              .run(t, ...o);
          },
          isPolling: () => c.create().isEnabled(),
          enabePolling() {
            c.create().enable();
          },
          disablePolling() {
            c.create().disable().clear();
          },
          polling() {
            let t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 1500,
              e = arguments.length > 1 ? arguments[1] : void 0;
            c.create().setDelay(t).run(d.refresh, e);
          },
          scanFolder() {
            let t =
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
              e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "/apps/vapor/scanfolder",
              n = d.generateUrl(e);
            return new Promise((e) => {
              d.httpClient(n)
                .setData({ force: t })
                .setHandler(function (t) {
                  e(t.status);
                })
                .send();
            });
          },
          pollingFolder() {
            let t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1500;
            c.create().setDelay(t).run(d.scanFolder);
          },
          pollingYtdl() {
            let t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1500;
            c.create().setDelay(t).run(d.refresh, "/apps/vapor/ytdl/get");
          },
          refresh(t) {
            t = t || "/apps/vapor/status/active";
            let e = d.generateUrl(t);
            d.httpClient(e)
              .setHandler(function (t) {
                (t && t.row
                  ? s.getInstance(t.title, t.row).create()
                  : s.getInstance().noData(),
                  t.counter && d.updateCounter(t.counter));
              })
              .send();
          },
          trim: (t, e) => t.split(e).filter(Boolean).join(e),
          isHtml: (t) => new RegExp("^<([a-z]+)[^>]+>(.*?)</\\1>", "i").test(t),
          ucfirst: (t) => t.charAt(0).toUpperCase() + t.slice(1),
          isURL(t) {
            try {
              return (new URL(t.trim()), !0);
            } catch (t) {
              return (console.log(t.message), !1);
            }
          },
          isMagnetURI: (t) =>
            /^magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32,40}(&dn=.+&tr=.+)?$/i.test(
              t.trim(),
            ),
          _message: function (t) {
            let e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            const n = {
              text: (t = t || "Empty"),
              newWindow: !0,
              close: !0,
              gravity: "top",
              position: "center",
              stopOnFocus: !0,
              onClick: function () {},
            };
            (Object.assign(n, e), o()(n).showToast());
          },
          error: function (t) {
            let e = {
              style: {
                color: "#721c24",
                "background-color": "#f8d7da",
                "border-color": "#f5c6cb",
              },
              duration:
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : 2e4,
              backgroundColor: "#f8d7da",
            };
            d._message(t, e);
          },
          info: function (t) {
            const e = {
              style: {
                color: "#004085",
                "background-color": "#cce5ff",
                "border-color": "#b8daff",
              },
              duration:
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : 2e3,
              text: t,
              backgroundColor: "#cce5ff",
            };
            d._message(t, e);
          },
          warn: function (t) {
            const e = {
              style: {
                color: "#856404",
                "background-color": "#fff3cd",
                "border-color": "#ffeeba",
              },
              duration:
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : 2e3,
              backgroundColor: "#fff3cd",
            };
            d._message(t, e);
          },
          message: function (t) {
            let e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 2e3;
            d.info(t, e);
          },
          getPathLast: function (t) {
            return t.substring(t.lastIndexOf("/") + 1);
          },
          updateCounter(t) {
            for (let e in t)
              document.getElementById(e + "-downloads-counter").innerHTML =
                '<div class="number">' + t[e] + "</div>";
          },
          getCounters() {
            let t = d.generateUrl("apps/vapor/counters");
            d.httpClient(t)
              .setMethod("GET")
              .setHandler(function (t) {
                t.counter && d.updateCounter(t.counter);
              })
              .send();
          },
          html2DOM: function (t) {
            return new window.DOMParser()
              .parseFromString(t, "text/html")
              .querySelector("div");
          },
          getData(t) {
            const e = "object" == typeof t ? t : document.getElementById(t),
              n = {};
            if (
              ((n._path = e.getAttribute("path") || ""),
              ["SELECT", "INPUT"].includes(e.nodeName.toUpperCase()))
            ) {
              for (let t in e.dataset) "rel" != t && (n[t] = e.dataset[t]);
              n[e.getAttribute("id") || e.getAttribute("name")] = e.value;
            } else {
              const t = e.querySelectorAll("input,select");
              for (let e = 0; e < t.length; e++) {
                const o = t[e];
                if (
                  !o.hasAttribute("type") ||
                  "button" !== o.getAttribute("type")
                ) {
                  n[o.getAttribute("id") || o.getAttribute("name")] = o.value;
                  for (let t in o.dataset) "rel" != t && (n[t] = o.dataset[t]);
                }
              }
            }
            return n;
          },
          showElement(t) {
            let e = d.getVue("mainApp");
            e.$data.display[t] = !0;
            for (let n in e.$data.display) n !== t && (e.$data.display[n] = !1);
          },
          hideElement(t) {
            d.getVue("mainApp").$data.display[t] = !1;
          },
          showDownload() {
            (d.showElement("download"), s.getInstance().clear());
          },
          hideDownload() {
            d.hideElement("download");
          },
          topleft(t) {
            let e = "object" == typeof t ? t : document.getElementById(t);
            ((e.style.top = 0), (e.style.left = 0), (e.style.width = "100%"));
          },
          loadingTpl: () =>
            '<button class="bs-spinner">\n        <span\n          class="spinner-border spinner-border-sm"\n          role="status"\n          aria-hidden="true"\n          disabled\n        ></span\n        ><span class="visually-hidden">Loading...</span>',
          getCssVar: (t) =>
            window
              .getComputedStyle(document.documentElement)
              .getPropertyValue(t),
          getScrollTop: () =>
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0,
          showErrors(t) {
            document.querySelectorAll(t).forEach((t) => {
              let e;
              (e = t.getAttribute("data-error-message")) && d.error(e, 2e4);
            });
          },
          str2Boolean: function (t) {
            if ("string" != typeof t) return !1;
            switch (t.toLowerCase().trim()) {
              case "true":
              case "yes":
              case "1":
                return !0;
              case "false":
              case "no":
              case "0":
              case null:
                return !1;
              default:
                return Boolean(t);
            }
          },
          t: function (t) {
            return (0, r.Tl)("vapor", t);
          },
          resetSearch: function (t) {
            ((t.$data.loading = 0), s.getInstance([], []).clear());
          },
          redirect(t) {
            window.location.href = t;
          },
          getContentTableType: () =>
            document.getElementById("vapor-table-wrapper").getAttribute("type"),
          setContentTableType(t) {
            let e = document.getElementById("vapor-table-wrapper");
            (e.setAttribute("type", t), (e.className = "table " + t));
          },
          filepicker(t, e) {
            OC.dialogs.filepicker(
              (0, r.Tl)("vapor", "Select a directory"),
              t,
              !1,
              "httpd/unix-directory",
              !0,
              OC.dialogs.FILEPICKER_TYPE_CHOOSE,
              e,
            );
          },
          getSettings(t) {
            let e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : null,
              n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : 2,
              o = d.generateUrl("/apps/vapor/getsettings");
            return new Promise((r) => {
              d.httpClient(o)
                .setData({ name: t, type: n, default: e })
                .setHandler((t) => {
                  r(t);
                })
                .send();
            });
          },
          httpClient: (t) => new l.create(t, !0),
          autoComplete(t, e) {
            try {
              p.getInstance({
                selector: t,
                minChars: 1,
                sourceHandler: function () {
                  return Array.isArray(e) ? e : Object.keys(e);
                },
                renderer: (t, n) => {
                  if (!t || !n) return;
                  let o;
                  ((n = n.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")),
                    (o = e.hasOwnProperty(t) ? e[t] : t));
                  var r = new RegExp(`(${n.split(" ").join("|")})`, "gi");
                  return `<div data-tippy-content="${o}" class="suggestion-item" data-val="${t}">${t.replace(r, "<b>$1</b>")}</div>`;
                },
              }).run();
            } catch (t) {
              (console.log(t), d.error(t));
            }
          },
          transformParams(t) {
            let e,
              n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "aria2-settings";
            for (let o in t)
              if ("_" != o.charAt(0)) {
                if (-1 !== (e = o.indexOf(n + "-key-"))) {
                  let e = n + "-value-" + o.substring(o.lastIndexOf("-") + 1);
                  if (void 0 === t[e]) continue;
                  ((t[t[o]] = t[e]), delete t[o], delete t[e]);
                }
              } else delete t[o];
            return t;
          },
          isEmptyObject: (t) => 0 === Object.keys(t).length,
        },
        f = d;
      var h = (function () {
        function t(t, e) {
          ((this.id = "vapor-tooltip"),
            (this.style = { display: "", position: "" }),
            (this.element =
              "object" == typeof t ? t : document.querySelector(t)),
            (this.style = { position: "fixed", display: "block" }),
            (this.text = e || this.element.getAttribute("data-text")));
        }
        return (
          (t.prototype.create = function (t) {
            ((this.messageNode = document.createElement("div")),
              this.messageNode.classList.add(this.id),
              this.messageNode.setAttribute("id", this.id),
              (this.messageNode.style.display = this.style.display),
              (this.messageNode.style.position = this.style.position),
              (this.messageNode.style.zIndex = "10000"));
            var e = document.createElement("div");
            e.setAttribute("id", t);
            var n = document.createTextNode(this.text);
            return (
              e.appendChild(n),
              this.messageNode.appendChild(e),
              this.setPosition(),
              this
            );
          }),
          (t.prototype.render = function () {
            document.body.appendChild(this.messageNode);
          }),
          (t.prototype.html = function () {
            return this.messageNode;
          }),
          (t.prototype.setPosition = function (t, e) {
            (void 0 === t && (t = 20), void 0 === e && (e = 0));
            var n = this.element.getBoundingClientRect(),
              o = n.top + t + "px",
              r = n.left - e + "px";
            ((this.messageNode.style.top = o),
              (this.messageNode.style.left = r));
          }),
          t
        );
      })();
      const v = h,
        g = (function () {
          function t(t, e) {
            ((this.element =
              "object" == typeof t ? t : document.querySelector(t)),
              (this.text = e || this.element.getAttribute("data-text")));
          }
          return (
            (t.prototype._copy = function (t) {
              var e,
                n = document.createElement("textarea");
              ((n.value = t),
                (n.style.top = "0"),
                (n.style.left = "0"),
                (n.style.position = "fixed"),
                document.body.appendChild(n),
                n.focus(),
                n.select());
              try {
                e = document.execCommand("copy");
              } catch (t) {
                (console.error("failed to copy", t), (e = !1));
              } finally {
                document.body.removeChild(n);
              }
              e && this.ShowMsg("Copied!");
            }),
            (t.prototype.ShowMsg = function (t) {
              var e = new v(this.element, t).create("copy-alert").html();
              (document.body.appendChild(e),
                setTimeout(function () {
                  e.remove();
                }, 1e3));
            }),
            (t.prototype.Copy = function () {
              var t = this;
              return navigator.clipboard
                ? navigator.clipboard.writeText(this.text).then(
                    function () {
                      t.ShowMsg("Copied!");
                    },
                    function (t) {
                      console.error("failed to copy text: ", t);
                    },
                  )
                : this._copy(this.text);
            }),
            t
          );
        })();
      function m(t) {
        const e = Object.create(null);
        for (const n of t.split(",")) e[n] = 1;
        return (t) => t in e;
      }
      const y = {},
        b = [],
        x = () => {},
        _ = () => !1,
        w = (t) =>
          111 === t.charCodeAt(0) &&
          110 === t.charCodeAt(1) &&
          (t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97),
        O = (t) => t.startsWith("onUpdate:"),
        E = Object.assign,
        S = (t, e) => {
          const n = t.indexOf(e);
          n > -1 && t.splice(n, 1);
        },
        T = Object.prototype.hasOwnProperty,
        C = (t, e) => T.call(t, e),
        k = Array.isArray,
        A = (t) => "[object Map]" === V(t),
        P = (t) => "[object Set]" === V(t),
        L = (t) => "[object Date]" === V(t),
        j = (t) => "function" == typeof t,
        D = (t) => "string" == typeof t,
        I = (t) => "symbol" == typeof t,
        N = (t) => null !== t && "object" == typeof t,
        R = (t) => (N(t) || j(t)) && j(t.then) && j(t.catch),
        M = Object.prototype.toString,
        V = (t) => M.call(t),
        H = (t) => "[object Object]" === V(t),
        U = (t) =>
          D(t) && "NaN" !== t && "-" !== t[0] && "" + parseInt(t, 10) === t,
        B = m(
          ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
        ),
        F = (t) => {
          const e = Object.create(null);
          return (n) => e[n] || (e[n] = t(n));
        },
        $ = /-\w/g,
        W = F((t) => t.replace($, (t) => t.slice(1).toUpperCase())),
        q = /\B([A-Z])/g,
        z = F((t) => t.replace(q, "-$1").toLowerCase()),
        K = F((t) => t.charAt(0).toUpperCase() + t.slice(1)),
        Y = F((t) => (t ? `on${K(t)}` : "")),
        J = (t, e) => !Object.is(t, e),
        X = (t, ...e) => {
          for (let n = 0; n < t.length; n++) t[n](...e);
        },
        G = (t, e, n, o = !1) => {
          Object.defineProperty(t, e, {
            configurable: !0,
            enumerable: !1,
            writable: o,
            value: n,
          });
        },
        Q = (t) => {
          const e = parseFloat(t);
          return isNaN(e) ? t : e;
        };
      let Z;
      const tt = () =>
        Z ||
        (Z =
          "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
                ? window
                : "undefined" != typeof globalThis
                  ? globalThis
                  : {});
      function et(t) {
        if (k(t)) {
          const e = {};
          for (let n = 0; n < t.length; n++) {
            const o = t[n],
              r = D(o) ? it(o) : et(o);
            if (r) for (const t in r) e[t] = r[t];
          }
          return e;
        }
        if (D(t) || N(t)) return t;
      }
      const nt = /;(?![^(]*\))/g,
        ot = /:([^]+)/,
        rt = /\/\*[^]*?\*\//g;
      function it(t) {
        const e = {};
        return (
          t
            .replace(rt, "")
            .split(nt)
            .forEach((t) => {
              if (t) {
                const n = t.split(ot);
                n.length > 1 && (e[n[0].trim()] = n[1].trim());
              }
            }),
          e
        );
      }
      function st(t) {
        let e = "";
        if (D(t)) e = t;
        else if (k(t))
          for (let n = 0; n < t.length; n++) {
            const o = st(t[n]);
            o && (e += o + " ");
          }
        else if (N(t)) for (const n in t) t[n] && (e += n + " ");
        return e.trim();
      }
      const at = m(
        "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
      );
      function lt(t) {
        return !!t || "" === t;
      }
      function ct(t, e) {
        if (t === e) return !0;
        let n = L(t),
          o = L(e);
        if (n || o) return !(!n || !o) && t.getTime() === e.getTime();
        if (((n = I(t)), (o = I(e)), n || o)) return t === e;
        if (((n = k(t)), (o = k(e)), n || o))
          return (
            !(!n || !o) &&
            (function (t, e) {
              if (t.length !== e.length) return !1;
              let n = !0;
              for (let o = 0; n && o < t.length; o++) n = ct(t[o], e[o]);
              return n;
            })(t, e)
          );
        if (((n = N(t)), (o = N(e)), n || o)) {
          if (!n || !o) return !1;
          if (Object.keys(t).length !== Object.keys(e).length) return !1;
          for (const n in t) {
            const o = t.hasOwnProperty(n),
              r = e.hasOwnProperty(n);
            if ((o && !r) || (!o && r) || !ct(t[n], e[n])) return !1;
          }
        }
        return String(t) === String(e);
      }
      function ut(t, e) {
        return t.findIndex((t) => ct(t, e));
      }
      const pt = (t) => !(!t || !0 !== t.__v_isRef),
        dt = (t) =>
          D(t)
            ? t
            : null == t
              ? ""
              : k(t) || (N(t) && (t.toString === M || !j(t.toString)))
                ? pt(t)
                  ? dt(t.value)
                  : JSON.stringify(t, ft, 2)
                : String(t),
        ft = (t, e) =>
          pt(e)
            ? ft(t, e.value)
            : A(e)
              ? {
                  [`Map(${e.size})`]: [...e.entries()].reduce(
                    (t, [e, n], o) => ((t[ht(e, o) + " =>"] = n), t),
                    {},
                  ),
                }
              : P(e)
                ? { [`Set(${e.size})`]: [...e.values()].map((t) => ht(t)) }
                : I(e)
                  ? ht(e)
                  : !N(e) || k(e) || H(e)
                    ? e
                    : String(e),
        ht = (t, e = "") => {
          var n;
          return I(t) ? `Symbol(${null != (n = t.description) ? n : e})` : t;
        };
      let vt, gt;
      class mt {
        constructor(t = !1) {
          ((this.detached = t),
            (this._active = !0),
            (this._on = 0),
            (this.effects = []),
            (this.cleanups = []),
            (this._isPaused = !1),
            (this.__v_skip = !0),
            (this.parent = vt),
            !t &&
              vt &&
              (this.index = (vt.scopes || (vt.scopes = [])).push(this) - 1));
        }
        get active() {
          return this._active;
        }
        pause() {
          if (this._active) {
            let t, e;
            if (((this._isPaused = !0), this.scopes))
              for (t = 0, e = this.scopes.length; t < e; t++)
                this.scopes[t].pause();
            for (t = 0, e = this.effects.length; t < e; t++)
              this.effects[t].pause();
          }
        }
        resume() {
          if (this._active && this._isPaused) {
            let t, e;
            if (((this._isPaused = !1), this.scopes))
              for (t = 0, e = this.scopes.length; t < e; t++)
                this.scopes[t].resume();
            for (t = 0, e = this.effects.length; t < e; t++)
              this.effects[t].resume();
          }
        }
        run(t) {
          if (this._active) {
            const e = vt;
            try {
              return ((vt = this), t());
            } finally {
              vt = e;
            }
          }
        }
        on() {
          1 === ++this._on && ((this.prevScope = vt), (vt = this));
        }
        off() {
          this._on > 0 &&
            0 === --this._on &&
            ((vt = this.prevScope), (this.prevScope = void 0));
        }
        stop(t) {
          if (this._active) {
            let e, n;
            for (this._active = !1, e = 0, n = this.effects.length; e < n; e++)
              this.effects[e].stop();
            for (
              this.effects.length = 0, e = 0, n = this.cleanups.length;
              e < n;
              e++
            )
              this.cleanups[e]();
            if (((this.cleanups.length = 0), this.scopes)) {
              for (e = 0, n = this.scopes.length; e < n; e++)
                this.scopes[e].stop(!0);
              this.scopes.length = 0;
            }
            if (!this.detached && this.parent && !t) {
              const t = this.parent.scopes.pop();
              t &&
                t !== this &&
                ((this.parent.scopes[this.index] = t), (t.index = this.index));
            }
            this.parent = void 0;
          }
        }
      }
      const yt = new WeakSet();
      class bt {
        constructor(t) {
          ((this.fn = t),
            (this.deps = void 0),
            (this.depsTail = void 0),
            (this.flags = 5),
            (this.next = void 0),
            (this.cleanup = void 0),
            (this.scheduler = void 0),
            vt && vt.active && vt.effects.push(this));
        }
        pause() {
          this.flags |= 64;
        }
        resume() {
          64 & this.flags &&
            ((this.flags &= -65),
            yt.has(this) && (yt.delete(this), this.trigger()));
        }
        notify() {
          (2 & this.flags && !(32 & this.flags)) || 8 & this.flags || Ot(this);
        }
        run() {
          if (!(1 & this.flags)) return this.fn();
          ((this.flags |= 2), Rt(this), Tt(this));
          const t = gt,
            e = jt;
          ((gt = this), (jt = !0));
          try {
            return this.fn();
          } finally {
            (Ct(this), (gt = t), (jt = e), (this.flags &= -3));
          }
        }
        stop() {
          if (1 & this.flags) {
            for (let t = this.deps; t; t = t.nextDep) Pt(t);
            ((this.deps = this.depsTail = void 0),
              Rt(this),
              this.onStop && this.onStop(),
              (this.flags &= -2));
          }
        }
        trigger() {
          64 & this.flags
            ? yt.add(this)
            : this.scheduler
              ? this.scheduler()
              : this.runIfDirty();
        }
        runIfDirty() {
          kt(this) && this.run();
        }
        get dirty() {
          return kt(this);
        }
      }
      let xt,
        _t,
        wt = 0;
      function Ot(t, e = !1) {
        if (((t.flags |= 8), e)) return ((t.next = _t), void (_t = t));
        ((t.next = xt), (xt = t));
      }
      function Et() {
        wt++;
      }
      function St() {
        if (--wt > 0) return;
        if (_t) {
          let t = _t;
          for (_t = void 0; t;) {
            const e = t.next;
            ((t.next = void 0), (t.flags &= -9), (t = e));
          }
        }
        let t;
        for (; xt;) {
          let e = xt;
          for (xt = void 0; e;) {
            const n = e.next;
            if (((e.next = void 0), (e.flags &= -9), 1 & e.flags))
              try {
                e.trigger();
              } catch (e) {
                t || (t = e);
              }
            e = n;
          }
        }
        if (t) throw t;
      }
      function Tt(t) {
        for (let e = t.deps; e; e = e.nextDep)
          ((e.version = -1),
            (e.prevActiveLink = e.dep.activeLink),
            (e.dep.activeLink = e));
      }
      function Ct(t) {
        let e,
          n = t.depsTail,
          o = n;
        for (; o;) {
          const t = o.prevDep;
          (-1 === o.version ? (o === n && (n = t), Pt(o), Lt(o)) : (e = o),
            (o.dep.activeLink = o.prevActiveLink),
            (o.prevActiveLink = void 0),
            (o = t));
        }
        ((t.deps = e), (t.depsTail = n));
      }
      function kt(t) {
        for (let e = t.deps; e; e = e.nextDep)
          if (
            e.dep.version !== e.version ||
            (e.dep.computed &&
              (At(e.dep.computed) || e.dep.version !== e.version))
          )
            return !0;
        return !!t._dirty;
      }
      function At(t) {
        if (4 & t.flags && !(16 & t.flags)) return;
        if (((t.flags &= -17), t.globalVersion === Mt)) return;
        if (
          ((t.globalVersion = Mt),
          !t.isSSR && 128 & t.flags && ((!t.deps && !t._dirty) || !kt(t)))
        )
          return;
        t.flags |= 2;
        const e = t.dep,
          n = gt,
          o = jt;
        ((gt = t), (jt = !0));
        try {
          Tt(t);
          const n = t.fn(t._value);
          (0 === e.version || J(n, t._value)) &&
            ((t.flags |= 128), (t._value = n), e.version++);
        } catch (t) {
          throw (e.version++, t);
        } finally {
          ((gt = n), (jt = o), Ct(t), (t.flags &= -3));
        }
      }
      function Pt(t, e = !1) {
        const { dep: n, prevSub: o, nextSub: r } = t;
        if (
          (o && ((o.nextSub = r), (t.prevSub = void 0)),
          r && ((r.prevSub = o), (t.nextSub = void 0)),
          n.subs === t && ((n.subs = o), !o && n.computed))
        ) {
          n.computed.flags &= -5;
          for (let t = n.computed.deps; t; t = t.nextDep) Pt(t, !0);
        }
        e || --n.sc || !n.map || n.map.delete(n.key);
      }
      function Lt(t) {
        const { prevDep: e, nextDep: n } = t;
        (e && ((e.nextDep = n), (t.prevDep = void 0)),
          n && ((n.prevDep = e), (t.nextDep = void 0)));
      }
      let jt = !0;
      const Dt = [];
      function It() {
        (Dt.push(jt), (jt = !1));
      }
      function Nt() {
        const t = Dt.pop();
        jt = void 0 === t || t;
      }
      function Rt(t) {
        const { cleanup: e } = t;
        if (((t.cleanup = void 0), e)) {
          const t = gt;
          gt = void 0;
          try {
            e();
          } finally {
            gt = t;
          }
        }
      }
      let Mt = 0;
      class Vt {
        constructor(t, e) {
          ((this.sub = t),
            (this.dep = e),
            (this.version = e.version),
            (this.nextDep =
              this.prevDep =
              this.nextSub =
              this.prevSub =
              this.prevActiveLink =
                void 0));
        }
      }
      class Ht {
        constructor(t) {
          ((this.computed = t),
            (this.version = 0),
            (this.activeLink = void 0),
            (this.subs = void 0),
            (this.map = void 0),
            (this.key = void 0),
            (this.sc = 0),
            (this.__v_skip = !0));
        }
        track(t) {
          if (!gt || !jt || gt === this.computed) return;
          let e = this.activeLink;
          if (void 0 === e || e.sub !== gt)
            ((e = this.activeLink = new Vt(gt, this)),
              gt.deps
                ? ((e.prevDep = gt.depsTail),
                  (gt.depsTail.nextDep = e),
                  (gt.depsTail = e))
                : (gt.deps = gt.depsTail = e),
              Ut(e));
          else if (
            -1 === e.version &&
            ((e.version = this.version), e.nextDep)
          ) {
            const t = e.nextDep;
            ((t.prevDep = e.prevDep),
              e.prevDep && (e.prevDep.nextDep = t),
              (e.prevDep = gt.depsTail),
              (e.nextDep = void 0),
              (gt.depsTail.nextDep = e),
              (gt.depsTail = e),
              gt.deps === e && (gt.deps = t));
          }
          return e;
        }
        trigger(t) {
          (this.version++, Mt++, this.notify(t));
        }
        notify(t) {
          Et();
          try {
            for (let t = this.subs; t; t = t.prevSub)
              t.sub.notify() && t.sub.dep.notify();
          } finally {
            St();
          }
        }
      }
      function Ut(t) {
        if ((t.dep.sc++, 4 & t.sub.flags)) {
          const e = t.dep.computed;
          if (e && !t.dep.subs) {
            e.flags |= 20;
            for (let t = e.deps; t; t = t.nextDep) Ut(t);
          }
          const n = t.dep.subs;
          (n !== t && ((t.prevSub = n), n && (n.nextSub = t)),
            (t.dep.subs = t));
        }
      }
      const Bt = new WeakMap(),
        Ft = Symbol(""),
        $t = Symbol(""),
        Wt = Symbol("");
      function qt(t, e, n) {
        if (jt && gt) {
          let e = Bt.get(t);
          e || Bt.set(t, (e = new Map()));
          let o = e.get(n);
          (o || (e.set(n, (o = new Ht())), (o.map = e), (o.key = n)),
            o.track());
        }
      }
      function zt(t, e, n, o, r, i) {
        const s = Bt.get(t);
        if (!s) return void Mt++;
        const a = (t) => {
          t && t.trigger();
        };
        if ((Et(), "clear" === e)) s.forEach(a);
        else {
          const r = k(t),
            i = r && U(n);
          if (r && "length" === n) {
            const t = Number(o);
            s.forEach((e, n) => {
              ("length" === n || n === Wt || (!I(n) && n >= t)) && a(e);
            });
          } else
            switch (
              ((void 0 !== n || s.has(void 0)) && a(s.get(n)),
              i && a(s.get(Wt)),
              e)
            ) {
              case "add":
                r
                  ? i && a(s.get("length"))
                  : (a(s.get(Ft)), A(t) && a(s.get($t)));
                break;
              case "delete":
                r || (a(s.get(Ft)), A(t) && a(s.get($t)));
                break;
              case "set":
                A(t) && a(s.get(Ft));
            }
        }
        St();
      }
      function Kt(t) {
        const e = Pe(t);
        return e === t ? e : (qt(e, 0, Wt), ke(t) ? e : e.map(Le));
      }
      function Yt(t) {
        return (qt((t = Pe(t)), 0, Wt), t);
      }
      function Jt(t, e) {
        return Ce(t) ? (Te(t) ? je(Le(e)) : je(e)) : Le(e);
      }
      const Xt = {
        __proto__: null,
        [Symbol.iterator]() {
          return Gt(this, Symbol.iterator, (t) => Jt(this, t));
        },
        concat(...t) {
          return Kt(this).concat(...t.map((t) => (k(t) ? Kt(t) : t)));
        },
        entries() {
          return Gt(this, "entries", (t) => ((t[1] = Jt(this, t[1])), t));
        },
        every(t, e) {
          return Zt(this, "every", t, e, void 0, arguments);
        },
        filter(t, e) {
          return Zt(
            this,
            "filter",
            t,
            e,
            (t) => t.map((t) => Jt(this, t)),
            arguments,
          );
        },
        find(t, e) {
          return Zt(this, "find", t, e, (t) => Jt(this, t), arguments);
        },
        findIndex(t, e) {
          return Zt(this, "findIndex", t, e, void 0, arguments);
        },
        findLast(t, e) {
          return Zt(this, "findLast", t, e, (t) => Jt(this, t), arguments);
        },
        findLastIndex(t, e) {
          return Zt(this, "findLastIndex", t, e, void 0, arguments);
        },
        forEach(t, e) {
          return Zt(this, "forEach", t, e, void 0, arguments);
        },
        includes(...t) {
          return ee(this, "includes", t);
        },
        indexOf(...t) {
          return ee(this, "indexOf", t);
        },
        join(t) {
          return Kt(this).join(t);
        },
        lastIndexOf(...t) {
          return ee(this, "lastIndexOf", t);
        },
        map(t, e) {
          return Zt(this, "map", t, e, void 0, arguments);
        },
        pop() {
          return ne(this, "pop");
        },
        push(...t) {
          return ne(this, "push", t);
        },
        reduce(t, ...e) {
          return te(this, "reduce", t, e);
        },
        reduceRight(t, ...e) {
          return te(this, "reduceRight", t, e);
        },
        shift() {
          return ne(this, "shift");
        },
        some(t, e) {
          return Zt(this, "some", t, e, void 0, arguments);
        },
        splice(...t) {
          return ne(this, "splice", t);
        },
        toReversed() {
          return Kt(this).toReversed();
        },
        toSorted(t) {
          return Kt(this).toSorted(t);
        },
        toSpliced(...t) {
          return Kt(this).toSpliced(...t);
        },
        unshift(...t) {
          return ne(this, "unshift", t);
        },
        values() {
          return Gt(this, "values", (t) => Jt(this, t));
        },
      };
      function Gt(t, e, n) {
        const o = Yt(t),
          r = o[e]();
        return (
          o === t ||
            ke(t) ||
            ((r._next = r.next),
            (r.next = () => {
              const t = r._next();
              return (t.done || (t.value = n(t.value)), t);
            })),
          r
        );
      }
      const Qt = Array.prototype;
      function Zt(t, e, n, o, r, i) {
        const s = Yt(t),
          a = s !== t && !ke(t),
          l = s[e];
        if (l !== Qt[e]) {
          const e = l.apply(t, i);
          return a ? Le(e) : e;
        }
        let c = n;
        s !== t &&
          (a
            ? (c = function (e, o) {
                return n.call(this, Jt(t, e), o, t);
              })
            : n.length > 2 &&
              (c = function (e, o) {
                return n.call(this, e, o, t);
              }));
        const u = l.call(s, c, o);
        return a && r ? r(u) : u;
      }
      function te(t, e, n, o) {
        const r = Yt(t),
          i = r !== t && !ke(t);
        let s = n,
          a = !1;
        r !== t &&
          (i
            ? ((a = 0 === o.length),
              (s = function (e, o, r) {
                return (
                  a && ((a = !1), (e = Jt(t, e))),
                  n.call(this, e, Jt(t, o), r, t)
                );
              }))
            : n.length > 3 &&
              (s = function (e, o, r) {
                return n.call(this, e, o, r, t);
              }));
        const l = r[e](s, ...o);
        return a ? Jt(t, l) : l;
      }
      function ee(t, e, n) {
        const o = Pe(t);
        qt(o, 0, Wt);
        const r = o[e](...n);
        return (-1 !== r && !1 !== r) || !Ae(n[0])
          ? r
          : ((n[0] = Pe(n[0])), o[e](...n));
      }
      function ne(t, e, n = []) {
        (It(), Et());
        const o = Pe(t)[e].apply(t, n);
        return (St(), Nt(), o);
      }
      const oe = m("__proto__,__v_isRef,__isVue"),
        re = new Set(
          Object.getOwnPropertyNames(Symbol)
            .filter((t) => "arguments" !== t && "caller" !== t)
            .map((t) => Symbol[t])
            .filter(I),
        );
      function ie(t) {
        I(t) || (t = String(t));
        const e = Pe(this);
        return (qt(e, 0, t), e.hasOwnProperty(t));
      }
      class se {
        constructor(t = !1, e = !1) {
          ((this._isReadonly = t), (this._isShallow = e));
        }
        get(t, e, n) {
          if ("__v_skip" === e) return t.__v_skip;
          const o = this._isReadonly,
            r = this._isShallow;
          if ("__v_isReactive" === e) return !o;
          if ("__v_isReadonly" === e) return o;
          if ("__v_isShallow" === e) return r;
          if ("__v_raw" === e)
            return n === (o ? (r ? we : _e) : r ? xe : be).get(t) ||
              Object.getPrototypeOf(t) === Object.getPrototypeOf(n)
              ? t
              : void 0;
          const i = k(t);
          if (!o) {
            let t;
            if (i && (t = Xt[e])) return t;
            if ("hasOwnProperty" === e) return ie;
          }
          const s = Reflect.get(t, e, De(t) ? t : n);
          if (I(e) ? re.has(e) : oe(e)) return s;
          if ((o || qt(t, 0, e), r)) return s;
          if (De(s)) {
            const t = i && U(e) ? s : s.value;
            return o && N(t) ? Ee(t) : t;
          }
          return N(s) ? (o ? Ee(s) : Oe(s)) : s;
        }
      }
      class ae extends se {
        constructor(t = !1) {
          super(!1, t);
        }
        set(t, e, n, o) {
          let r = t[e];
          const i = k(t) && U(e);
          if (!this._isShallow) {
            const t = Ce(r);
            if (
              (ke(n) || Ce(n) || ((r = Pe(r)), (n = Pe(n))),
              !i && De(r) && !De(n))
            )
              return (t || (r.value = n), !0);
          }
          const s = i ? Number(e) < t.length : C(t, e),
            a = Reflect.set(t, e, n, De(t) ? t : o);
          return (
            t === Pe(o) &&
              (s ? J(n, r) && zt(t, "set", e, n) : zt(t, "add", e, n)),
            a
          );
        }
        deleteProperty(t, e) {
          const n = C(t, e),
            o = (t[e], Reflect.deleteProperty(t, e));
          return (o && n && zt(t, "delete", e, void 0), o);
        }
        has(t, e) {
          const n = Reflect.has(t, e);
          return ((I(e) && re.has(e)) || qt(t, 0, e), n);
        }
        ownKeys(t) {
          return (qt(t, 0, k(t) ? "length" : Ft), Reflect.ownKeys(t));
        }
      }
      class le extends se {
        constructor(t = !1) {
          super(!0, t);
        }
        set(t, e) {
          return !0;
        }
        deleteProperty(t, e) {
          return !0;
        }
      }
      const ce = new ae(),
        ue = new le(),
        pe = new ae(!0),
        de = (t) => t,
        fe = (t) => Reflect.getPrototypeOf(t);
      function he(t) {
        return function (...e) {
          return "delete" !== t && ("clear" === t ? void 0 : this);
        };
      }
      function ve(t, e) {
        const n = (function (t, e) {
          const n = {
            get(n) {
              const o = this.__v_raw,
                r = Pe(o),
                i = Pe(n);
              t || (J(n, i) && qt(r, 0, n), qt(r, 0, i));
              const { has: s } = fe(r),
                a = e ? de : t ? je : Le;
              return s.call(r, n)
                ? a(o.get(n))
                : s.call(r, i)
                  ? a(o.get(i))
                  : void (o !== r && o.get(n));
            },
            get size() {
              const e = this.__v_raw;
              return (!t && qt(Pe(e), 0, Ft), e.size);
            },
            has(e) {
              const n = this.__v_raw,
                o = Pe(n),
                r = Pe(e);
              return (
                t || (J(e, r) && qt(o, 0, e), qt(o, 0, r)),
                e === r ? n.has(e) : n.has(e) || n.has(r)
              );
            },
            forEach(n, o) {
              const r = this,
                i = r.__v_raw,
                s = Pe(i),
                a = e ? de : t ? je : Le;
              return (
                !t && qt(s, 0, Ft),
                i.forEach((t, e) => n.call(o, a(t), a(e), r))
              );
            },
          };
          return (
            E(
              n,
              t
                ? {
                    add: he("add"),
                    set: he("set"),
                    delete: he("delete"),
                    clear: he("clear"),
                  }
                : {
                    add(t) {
                      const n = Pe(this),
                        o = fe(n),
                        r = Pe(t),
                        i = e || ke(t) || Ce(t) ? t : r;
                      return (
                        o.has.call(n, i) ||
                          (J(t, i) && o.has.call(n, t)) ||
                          (J(r, i) && o.has.call(n, r)) ||
                          (n.add(i), zt(n, "add", i, i)),
                        this
                      );
                    },
                    set(t, n) {
                      e || ke(n) || Ce(n) || (n = Pe(n));
                      const o = Pe(this),
                        { has: r, get: i } = fe(o);
                      let s = r.call(o, t);
                      s || ((t = Pe(t)), (s = r.call(o, t)));
                      const a = i.call(o, t);
                      return (
                        o.set(t, n),
                        s ? J(n, a) && zt(o, "set", t, n) : zt(o, "add", t, n),
                        this
                      );
                    },
                    delete(t) {
                      const e = Pe(this),
                        { has: n, get: o } = fe(e);
                      let r = n.call(e, t);
                      (r || ((t = Pe(t)), (r = n.call(e, t))),
                        o && o.call(e, t));
                      const i = e.delete(t);
                      return (r && zt(e, "delete", t, void 0), i);
                    },
                    clear() {
                      const t = Pe(this),
                        e = 0 !== t.size,
                        n = t.clear();
                      return (e && zt(t, "clear", void 0, void 0), n);
                    },
                  },
            ),
            ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
              n[o] = (function (t, e, n) {
                return function (...o) {
                  const r = this.__v_raw,
                    i = Pe(r),
                    s = A(i),
                    a = "entries" === t || (t === Symbol.iterator && s),
                    l = "keys" === t && s,
                    c = r[t](...o),
                    u = n ? de : e ? je : Le;
                  return (
                    !e && qt(i, 0, l ? $t : Ft),
                    E(Object.create(c), {
                      next() {
                        const { value: t, done: e } = c.next();
                        return e
                          ? { value: t, done: e }
                          : { value: a ? [u(t[0]), u(t[1])] : u(t), done: e };
                      },
                    })
                  );
                };
              })(o, t, e);
            }),
            n
          );
        })(t, e);
        return (e, o, r) =>
          "__v_isReactive" === o
            ? !t
            : "__v_isReadonly" === o
              ? t
              : "__v_raw" === o
                ? e
                : Reflect.get(C(n, o) && o in e ? n : e, o, r);
      }
      const ge = { get: ve(!1, !1) },
        me = { get: ve(!1, !0) },
        ye = { get: ve(!0, !1) },
        be = new WeakMap(),
        xe = new WeakMap(),
        _e = new WeakMap(),
        we = new WeakMap();
      function Oe(t) {
        return Ce(t) ? t : Se(t, !1, ce, ge, be);
      }
      function Ee(t) {
        return Se(t, !0, ue, ye, _e);
      }
      function Se(t, e, n, o, r) {
        if (!N(t)) return t;
        if (t.__v_raw && (!e || !t.__v_isReactive)) return t;
        const i =
          (s = t).__v_skip || !Object.isExtensible(s)
            ? 0
            : (function (t) {
                switch (t) {
                  case "Object":
                  case "Array":
                    return 1;
                  case "Map":
                  case "Set":
                  case "WeakMap":
                  case "WeakSet":
                    return 2;
                  default:
                    return 0;
                }
              })(((t) => V(t).slice(8, -1))(s));
        var s;
        if (0 === i) return t;
        const a = r.get(t);
        if (a) return a;
        const l = new Proxy(t, 2 === i ? o : n);
        return (r.set(t, l), l);
      }
      function Te(t) {
        return Ce(t) ? Te(t.__v_raw) : !(!t || !t.__v_isReactive);
      }
      function Ce(t) {
        return !(!t || !t.__v_isReadonly);
      }
      function ke(t) {
        return !(!t || !t.__v_isShallow);
      }
      function Ae(t) {
        return !!t && !!t.__v_raw;
      }
      function Pe(t) {
        const e = t && t.__v_raw;
        return e ? Pe(e) : t;
      }
      const Le = (t) => (N(t) ? Oe(t) : t),
        je = (t) => (N(t) ? Ee(t) : t);
      function De(t) {
        return !!t && !0 === t.__v_isRef;
      }
      const Ie = {
        get: (t, e, n) => {
          return "__v_raw" === e
            ? t
            : De((o = Reflect.get(t, e, n)))
              ? o.value
              : o;
          var o;
        },
        set: (t, e, n, o) => {
          const r = t[e];
          return De(r) && !De(n)
            ? ((r.value = n), !0)
            : Reflect.set(t, e, n, o);
        },
      };
      function Ne(t) {
        return Te(t) ? t : new Proxy(t, Ie);
      }
      class Re {
        constructor(t, e, n) {
          ((this.fn = t),
            (this.setter = e),
            (this._value = void 0),
            (this.dep = new Ht(this)),
            (this.__v_isRef = !0),
            (this.deps = void 0),
            (this.depsTail = void 0),
            (this.flags = 16),
            (this.globalVersion = Mt - 1),
            (this.next = void 0),
            (this.effect = this),
            (this.__v_isReadonly = !e),
            (this.isSSR = n));
        }
        notify() {
          if (((this.flags |= 16), !(8 & this.flags || gt === this)))
            return (Ot(this, !0), !0);
        }
        get value() {
          const t = this.dep.track();
          return (At(this), t && (t.version = this.dep.version), this._value);
        }
        set value(t) {
          this.setter && this.setter(t);
        }
      }
      const Me = {},
        Ve = new WeakMap();
      let He;
      function Ue(t, e = 1 / 0, n) {
        if (e <= 0 || !N(t) || t.__v_skip) return t;
        if (((n = n || new Map()).get(t) || 0) >= e) return t;
        if ((n.set(t, e), e--, De(t))) Ue(t.value, e, n);
        else if (k(t)) for (let o = 0; o < t.length; o++) Ue(t[o], e, n);
        else if (P(t) || A(t))
          t.forEach((t) => {
            Ue(t, e, n);
          });
        else if (H(t)) {
          for (const o in t) Ue(t[o], e, n);
          for (const o of Object.getOwnPropertySymbols(t))
            Object.prototype.propertyIsEnumerable.call(t, o) && Ue(t[o], e, n);
        }
        return t;
      }
      function Be(t, e, n, o) {
        try {
          return o ? t(...o) : t();
        } catch (t) {
          $e(t, e, n);
        }
      }
      function Fe(t, e, n, o) {
        if (j(t)) {
          const r = Be(t, e, n, o);
          return (
            r &&
              R(r) &&
              r.catch((t) => {
                $e(t, e, n);
              }),
            r
          );
        }
        if (k(t)) {
          const r = [];
          for (let i = 0; i < t.length; i++) r.push(Fe(t[i], e, n, o));
          return r;
        }
      }
      function $e(t, e, n, o = !0) {
        e && e.vnode;
        const { errorHandler: r, throwUnhandledErrorInProduction: i } =
          (e && e.appContext.config) || y;
        if (e) {
          let o = e.parent;
          const i = e.proxy,
            s = `https://vuejs.org/error-reference/#runtime-${n}`;
          for (; o;) {
            const e = o.ec;
            if (e)
              for (let n = 0; n < e.length; n++)
                if (!1 === e[n](t, i, s)) return;
            o = o.parent;
          }
          if (r) return (It(), Be(r, null, 10, [t, i, s]), void Nt());
        }
        !(function (t, e, n, o = !0, r = !1) {
          if (r) throw t;
          console.error(t);
        })(t, 0, 0, o, i);
      }
      const We = [];
      let qe = -1;
      const ze = [];
      let Ke = null,
        Ye = 0;
      const Je = Promise.resolve();
      let Xe = null;
      function Ge(t) {
        const e = Xe || Je;
        return t ? e.then(this ? t.bind(this) : t) : e;
      }
      function Qe(t) {
        if (!(1 & t.flags)) {
          const e = nn(t),
            n = We[We.length - 1];
          (!n || (!(2 & t.flags) && e >= nn(n))
            ? We.push(t)
            : We.splice(
                (function (t) {
                  let e = qe + 1,
                    n = We.length;
                  for (; e < n;) {
                    const o = (e + n) >>> 1,
                      r = We[o],
                      i = nn(r);
                    i < t || (i === t && 2 & r.flags) ? (e = o + 1) : (n = o);
                  }
                  return e;
                })(e),
                0,
                t,
              ),
            (t.flags |= 1),
            Ze());
        }
      }
      function Ze() {
        Xe || (Xe = Je.then(on));
      }
      function tn(t, e, n = qe + 1) {
        for (; n < We.length; n++) {
          const e = We[n];
          if (e && 2 & e.flags) {
            if (t && e.id !== t.uid) continue;
            (We.splice(n, 1),
              n--,
              4 & e.flags && (e.flags &= -2),
              e(),
              4 & e.flags || (e.flags &= -2));
          }
        }
      }
      function en(t) {
        if (ze.length) {
          const t = [...new Set(ze)].sort((t, e) => nn(t) - nn(e));
          if (((ze.length = 0), Ke)) return void Ke.push(...t);
          for (Ke = t, Ye = 0; Ye < Ke.length; Ye++) {
            const t = Ke[Ye];
            (4 & t.flags && (t.flags &= -2),
              8 & t.flags || t(),
              (t.flags &= -2));
          }
          ((Ke = null), (Ye = 0));
        }
      }
      const nn = (t) => (null == t.id ? (2 & t.flags ? -1 : 1 / 0) : t.id);
      function on(t) {
        try {
          for (qe = 0; qe < We.length; qe++) {
            const t = We[qe];
            !t ||
              8 & t.flags ||
              (4 & t.flags && (t.flags &= -2),
              Be(t, t.i, t.i ? 15 : 14),
              4 & t.flags || (t.flags &= -2));
          }
        } finally {
          for (; qe < We.length; qe++) {
            const t = We[qe];
            t && (t.flags &= -2);
          }
          ((qe = -1),
            (We.length = 0),
            en(),
            (Xe = null),
            (We.length || ze.length) && on(t));
        }
      }
      let rn,
        sn = [],
        an = !1;
      function ln(t, ...e) {
        rn ? rn.emit(t, ...e) : an || sn.push({ event: t, args: e });
      }
      function cn(t, e) {
        var n, o;
        ((rn = t),
          rn
            ? ((rn.enabled = !0),
              sn.forEach(({ event: t, args: e }) => rn.emit(t, ...e)),
              (sn = []))
            : "undefined" != typeof window &&
                window.HTMLElement &&
                !(null ==
                (o = null == (n = window.navigator) ? void 0 : n.userAgent)
                  ? void 0
                  : o.includes("jsdom"))
              ? ((e.__VUE_DEVTOOLS_HOOK_REPLAY__ =
                  e.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((t) => {
                  cn(t, e);
                }),
                setTimeout(() => {
                  rn ||
                    ((e.__VUE_DEVTOOLS_HOOK_REPLAY__ = null),
                    (an = !0),
                    (sn = []));
                }, 3e3))
              : ((an = !0), (sn = [])));
      }
      const un = fn("component:added"),
        pn = fn("component:updated"),
        dn = fn("component:removed");
      function fn(t) {
        return (e) => {
          ln(t, e.appContext.app, e.uid, e.parent ? e.parent.uid : void 0, e);
        };
      }
      let hn = null,
        vn = null;
      function gn(t) {
        const e = hn;
        return ((hn = t), (vn = (t && t.type.__scopeId) || null), e);
      }
      function mn(t, e = hn, n) {
        if (!e) return t;
        if (t._n) return t;
        const o = (...n) => {
          o._d && dr(-1);
          const r = gn(e);
          let i;
          try {
            i = t(...n);
          } finally {
            (gn(r), o._d && dr(1));
          }
          return (__VUE_PROD_DEVTOOLS__ && pn(e), i);
        };
        return ((o._n = !0), (o._c = !0), (o._d = !0), o);
      }
      function yn(t, e) {
        if (null === hn) return t;
        const n = qr(hn),
          o = t.dirs || (t.dirs = []);
        for (let t = 0; t < e.length; t++) {
          let [r, i, s, a = y] = e[t];
          r &&
            (j(r) && (r = { mounted: r, updated: r }),
            r.deep && Ue(i),
            o.push({
              dir: r,
              instance: n,
              value: i,
              oldValue: void 0,
              arg: s,
              modifiers: a,
            }));
        }
        return t;
      }
      function bn(t, e, n, o) {
        const r = t.dirs,
          i = e && e.dirs;
        for (let s = 0; s < r.length; s++) {
          const a = r[s];
          i && (a.oldValue = i[s].value);
          let l = a.dir[o];
          l && (It(), Fe(l, n, 8, [t.el, a, t, e]), Nt());
        }
      }
      function xn(t, e, n = !1) {
        const o = Dr();
        if (o || So) {
          let r = So
            ? So._context.provides
            : o
              ? null == o.parent || o.ce
                ? o.vnode.appContext && o.vnode.appContext.provides
                : o.parent.provides
              : void 0;
          if (r && t in r) return r[t];
          if (arguments.length > 1) return n && j(e) ? e.call(o && o.proxy) : e;
        }
      }
      const _n = Symbol.for("v-scx");
      function wn(t, e, n) {
        return On(t, e, n);
      }
      function On(t, e, n = y) {
        const { immediate: o, deep: r, flush: i, once: s } = n,
          a = E({}, n),
          l = (e && o) || (!e && "post" !== i);
        let c;
        if (Br)
          if ("sync" === i) {
            const t = xn(_n);
            c = t.__watcherHandles || (t.__watcherHandles = []);
          } else if (!l) {
            const t = () => {};
            return ((t.stop = x), (t.resume = x), (t.pause = x), t);
          }
        const u = jr;
        a.call = (t, e, n) => Fe(t, u, e, n);
        let p = !1;
        ("post" === i
          ? (a.scheduler = (t) => {
              Jo(t, u && u.suspense);
            })
          : "sync" !== i &&
            ((p = !0),
            (a.scheduler = (t, e) => {
              e ? t() : Qe(t);
            })),
          (a.augmentJob = (t) => {
            (e && (t.flags |= 4),
              p && ((t.flags |= 2), u && ((t.id = u.uid), (t.i = u))));
          }));
        const d = (function (t, e, n = y) {
          const {
              immediate: o,
              deep: r,
              once: i,
              scheduler: s,
              augmentJob: a,
              call: l,
            } = n,
            c = (t) =>
              r ? t : ke(t) || !1 === r || 0 === r ? Ue(t, 1) : Ue(t);
          let u,
            p,
            d,
            f,
            h = !1,
            v = !1;
          if (
            (De(t)
              ? ((p = () => t.value), (h = ke(t)))
              : Te(t)
                ? ((p = () => c(t)), (h = !0))
                : k(t)
                  ? ((v = !0),
                    (h = t.some((t) => Te(t) || ke(t))),
                    (p = () =>
                      t.map((t) =>
                        De(t)
                          ? t.value
                          : Te(t)
                            ? c(t)
                            : j(t)
                              ? l
                                ? l(t, 2)
                                : t()
                              : void 0,
                      )))
                  : (p = j(t)
                      ? e
                        ? l
                          ? () => l(t, 2)
                          : t
                        : () => {
                            if (d) {
                              It();
                              try {
                                d();
                              } finally {
                                Nt();
                              }
                            }
                            const e = He;
                            He = u;
                            try {
                              return l ? l(t, 3, [f]) : t(f);
                            } finally {
                              He = e;
                            }
                          }
                      : x),
            e && r)
          ) {
            const t = p,
              e = !0 === r ? 1 / 0 : r;
            p = () => Ue(t(), e);
          }
          const g = vt,
            m = () => {
              (u.stop(), g && g.active && S(g.effects, u));
            };
          if (i && e) {
            const t = e;
            e = (...e) => {
              (t(...e), m());
            };
          }
          let b = v ? new Array(t.length).fill(Me) : Me;
          const _ = (t) => {
            if (1 & u.flags && (u.dirty || t))
              if (e) {
                const t = u.run();
                if (r || h || (v ? t.some((t, e) => J(t, b[e])) : J(t, b))) {
                  d && d();
                  const n = He;
                  He = u;
                  try {
                    const n = [
                      t,
                      b === Me ? void 0 : v && b[0] === Me ? [] : b,
                      f,
                    ];
                    ((b = t), l ? l(e, 3, n) : e(...n));
                  } finally {
                    He = n;
                  }
                }
              } else u.run();
          };
          return (
            a && a(_),
            (u = new bt(p)),
            (u.scheduler = s ? () => s(_, !1) : _),
            (f = (t) =>
              (function (t, e = !1, n = He) {
                if (n) {
                  let e = Ve.get(n);
                  (e || Ve.set(n, (e = [])), e.push(t));
                }
              })(t, !1, u)),
            (d = u.onStop =
              () => {
                const t = Ve.get(u);
                if (t) {
                  if (l) l(t, 4);
                  else for (const e of t) e();
                  Ve.delete(u);
                }
              }),
            e
              ? o
                ? _(!0)
                : (b = u.run())
              : s
                ? s(_.bind(null, !0), !0)
                : u.run(),
            (m.pause = u.pause.bind(u)),
            (m.resume = u.resume.bind(u)),
            (m.stop = m),
            m
          );
        })(t, e, a);
        return (Br && (c ? c.push(d) : l && d()), d);
      }
      function En(t, e, n) {
        const o = this.proxy,
          r = D(t) ? (t.includes(".") ? Sn(o, t) : () => o[t]) : t.bind(o, o);
        let i;
        j(e) ? (i = e) : ((i = e.handler), (n = e));
        const s = Rr(this),
          a = On(r, i.bind(o), n);
        return (s(), a);
      }
      function Sn(t, e) {
        const n = e.split(".");
        return () => {
          let e = t;
          for (let t = 0; t < n.length && e; t++) e = e[n[t]];
          return e;
        };
      }
      const Tn = Symbol("_vte"),
        Cn = Symbol("_leaveCb");
      function kn(t, e) {
        6 & t.shapeFlag && t.component
          ? ((t.transition = e), kn(t.component.subTree, e))
          : 128 & t.shapeFlag
            ? ((t.ssContent.transition = e.clone(t.ssContent)),
              (t.ssFallback.transition = e.clone(t.ssFallback)))
            : (t.transition = e);
      }
      function An(t) {
        t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
      }
      function Pn(t, e) {
        let n;
        return !(
          !(n = Object.getOwnPropertyDescriptor(t, e)) || n.configurable
        );
      }
      (Boolean, Boolean);
      const Ln = new WeakMap();
      function jn(t, e, n, o, r = !1) {
        if (k(t))
          return void t.forEach((t, i) =>
            jn(t, e && (k(e) ? e[i] : e), n, o, r),
          );
        if (In(o) && !r)
          return void (
            512 & o.shapeFlag &&
            o.type.__asyncResolved &&
            o.component.subTree.component &&
            jn(t, e, n, o.component.subTree)
          );
        const i = 4 & o.shapeFlag ? qr(o.component) : o.el,
          s = r ? null : i,
          { i: a, r: l } = t,
          c = e && e.r,
          u = a.refs === y ? (a.refs = {}) : a.refs,
          p = a.setupState,
          d = Pe(p),
          f = p === y ? _ : (t) => !Pn(u, t) && C(d, t),
          h = (t, e) => !e || !Pn(u, e);
        if (null != c && c !== l)
          if ((Dn(e), D(c))) ((u[c] = null), f(c) && (p[c] = null));
          else if (De(c)) {
            const t = e;
            (h(0, t.k) && (c.value = null), t.k && (u[t.k] = null));
          }
        if (j(l)) Be(l, a, 12, [s, u]);
        else {
          const e = D(l),
            o = De(l);
          if (e || o) {
            const a = () => {
              if (t.f) {
                const n = e
                  ? f(l)
                    ? p[l]
                    : u[l]
                  : h() || !t.k
                    ? l.value
                    : u[t.k];
                if (r) k(n) && S(n, i);
                else if (k(n)) n.includes(i) || n.push(i);
                else if (e) ((u[l] = [i]), f(l) && (p[l] = u[l]));
                else {
                  const e = [i];
                  (h(0, t.k) && (l.value = e), t.k && (u[t.k] = e));
                }
              } else
                e
                  ? ((u[l] = s), f(l) && (p[l] = s))
                  : o && (h(0, t.k) && (l.value = s), t.k && (u[t.k] = s));
            };
            if (s) {
              const e = () => {
                (a(), Ln.delete(t));
              };
              ((e.id = -1), Ln.set(t, e), Jo(e, n));
            } else (Dn(t), a());
          }
        }
      }
      function Dn(t) {
        const e = Ln.get(t);
        e && ((e.flags |= 8), Ln.delete(t));
      }
      (tt().requestIdleCallback, tt().cancelIdleCallback);
      const In = (t) => !!t.type.__asyncLoader,
        Nn = (t) => t.type.__isKeepAlive;
      function Rn(t, e) {
        Vn(t, "a", e);
      }
      function Mn(t, e) {
        Vn(t, "da", e);
      }
      function Vn(t, e, n = jr) {
        const o =
          t.__wdc ||
          (t.__wdc = () => {
            let e = n;
            for (; e;) {
              if (e.isDeactivated) return;
              e = e.parent;
            }
            return t();
          });
        if ((Un(e, o, n), n)) {
          let t = n.parent;
          for (; t && t.parent;)
            (Nn(t.parent.vnode) && Hn(o, e, n, t), (t = t.parent));
        }
      }
      function Hn(t, e, n, o) {
        const r = Un(e, t, o, !0);
        Kn(() => {
          S(o[e], r);
        }, n);
      }
      function Un(t, e, n = jr, o = !1) {
        if (n) {
          const r = n[t] || (n[t] = []),
            i =
              e.__weh ||
              (e.__weh = (...o) => {
                It();
                const r = Rr(n),
                  i = Fe(e, n, t, o);
                return (r(), Nt(), i);
              });
          return (o ? r.unshift(i) : r.push(i), i);
        }
      }
      (RegExp, RegExp);
      const Bn =
          (t) =>
          (e, n = jr) => {
            (Br && "sp" !== t) || Un(t, (...t) => e(...t), n);
          },
        Fn = Bn("bm"),
        $n = Bn("m"),
        Wn = Bn("bu"),
        qn = Bn("u"),
        zn = Bn("bum"),
        Kn = Bn("um"),
        Yn = Bn("sp"),
        Jn = Bn("rtg"),
        Xn = Bn("rtc");
      function Gn(t, e = jr) {
        Un("ec", t, e);
      }
      const Qn = "components";
      function Zn(t, e) {
        return (
          (function (t, e, n = !0, o = !1) {
            const r = hn || jr;
            if (r) {
              const n = r.type;
              if (t === Qn) {
                const t = (function (t, e = !0) {
                  return j(t)
                    ? t.displayName || t.name
                    : t.name || (e && t.__name);
                })(n, !1);
                if (t && (t === e || t === W(e) || t === K(W(e)))) return n;
              }
              const i = eo(r[t] || n[t], e) || eo(r.appContext[t], e);
              return !i && o ? n : i;
            }
          })(Qn, t, !0, e) || t
        );
      }
      const to = Symbol.for("v-ndc");
      function eo(t, e) {
        return t && (t[e] || t[W(e)] || t[K(W(e))]);
      }
      function no(t, e, n, o) {
        let r;
        const i = n && n[o],
          s = k(t);
        if (s || D(t)) {
          let n = !1,
            o = !1;
          (s && Te(t) && ((n = !ke(t)), (o = Ce(t)), (t = Yt(t))),
            (r = new Array(t.length)));
          for (let s = 0, a = t.length; s < a; s++)
            r[s] = e(
              n ? (o ? je(Le(t[s])) : Le(t[s])) : t[s],
              s,
              void 0,
              i && i[s],
            );
        } else if ("number" == typeof t) {
          r = new Array(t);
          for (let n = 0; n < t; n++) r[n] = e(n + 1, n, void 0, i && i[n]);
        } else if (N(t))
          if (t[Symbol.iterator])
            r = Array.from(t, (t, n) => e(t, n, void 0, i && i[n]));
          else {
            const n = Object.keys(t);
            r = new Array(n.length);
            for (let o = 0, s = n.length; o < s; o++) {
              const s = n[o];
              r[o] = e(t[s], s, o, i && i[o]);
            }
          }
        else r = [];
        return (n && (n[o] = r), r);
      }
      function oo(t, e, n = {}, o, r) {
        if (hn.ce || (hn.parent && In(hn.parent) && hn.parent.ce)) {
          const t = Object.keys(n).length > 0;
          return (
            "default" !== e && (n.name = e),
            ur(),
            vr(rr, null, [_r("slot", n, o && o())], t ? -2 : 64)
          );
        }
        let i = t[e];
        (i && i._c && (i._d = !1), ur());
        const s = i && ro(i(n)),
          a = n.key || (s && s.key),
          l = vr(
            rr,
            { key: (a && !I(a) ? a : `_${e}`) + (!s && o ? "_fb" : "") },
            s || (o ? o() : []),
            s && 1 === t._ ? 64 : -2,
          );
        return (
          !r && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
          i && i._c && (i._d = !0),
          l
        );
      }
      function ro(t) {
        return t.some(
          (t) =>
            !gr(t) || (t.type !== sr && !(t.type === rr && !ro(t.children))),
        )
          ? t
          : null;
      }
      const io = (t) => (t ? (Vr(t) ? qr(t) : io(t.parent)) : null),
        so = E(Object.create(null), {
          $: (t) => t,
          $el: (t) => t.vnode.el,
          $data: (t) => t.data,
          $props: (t) => t.props,
          $attrs: (t) => t.attrs,
          $slots: (t) => t.slots,
          $refs: (t) => t.refs,
          $parent: (t) => io(t.parent),
          $root: (t) => io(t.root),
          $host: (t) => t.ce,
          $emit: (t) => t.emit,
          $options: (t) => (__VUE_OPTIONS_API__ ? ho(t) : t.type),
          $forceUpdate: (t) =>
            t.f ||
            (t.f = () => {
              Qe(t.update);
            }),
          $nextTick: (t) => t.n || (t.n = Ge.bind(t.proxy)),
          $watch: (t) => (__VUE_OPTIONS_API__ ? En.bind(t) : x),
        }),
        ao = (t, e) => t !== y && !t.__isScriptSetup && C(t, e),
        lo = {
          get({ _: t }, e) {
            if ("__v_skip" === e) return !0;
            const {
              ctx: n,
              setupState: o,
              data: r,
              props: i,
              accessCache: s,
              type: a,
              appContext: l,
            } = t;
            if ("$" !== e[0]) {
              const t = s[e];
              if (void 0 !== t)
                switch (t) {
                  case 1:
                    return o[e];
                  case 2:
                    return r[e];
                  case 4:
                    return n[e];
                  case 3:
                    return i[e];
                }
              else {
                if (ao(o, e)) return ((s[e] = 1), o[e]);
                if (__VUE_OPTIONS_API__ && r !== y && C(r, e))
                  return ((s[e] = 2), r[e]);
                if (C(i, e)) return ((s[e] = 3), i[e]);
                if (n !== y && C(n, e)) return ((s[e] = 4), n[e]);
                (__VUE_OPTIONS_API__ && !uo) || (s[e] = 0);
              }
            }
            const c = so[e];
            let u, p;
            return c
              ? ("$attrs" === e && qt(t.attrs, 0, ""), c(t))
              : (u = a.__cssModules) && (u = u[e])
                ? u
                : n !== y && C(n, e)
                  ? ((s[e] = 4), n[e])
                  : ((p = l.config.globalProperties), C(p, e) ? p[e] : void 0);
          },
          set({ _: t }, e, n) {
            const { data: o, setupState: r, ctx: i } = t;
            return ao(r, e)
              ? ((r[e] = n), !0)
              : __VUE_OPTIONS_API__ && o !== y && C(o, e)
                ? ((o[e] = n), !0)
                : !(
                    C(t.props, e) ||
                    ("$" === e[0] && e.slice(1) in t) ||
                    ((i[e] = n), 0)
                  );
          },
          has(
            {
              _: {
                data: t,
                setupState: e,
                accessCache: n,
                ctx: o,
                appContext: r,
                props: i,
                type: s,
              },
            },
            a,
          ) {
            let l;
            return !!(
              n[a] ||
              (__VUE_OPTIONS_API__ && t !== y && "$" !== a[0] && C(t, a)) ||
              ao(e, a) ||
              C(i, a) ||
              C(o, a) ||
              C(so, a) ||
              C(r.config.globalProperties, a) ||
              ((l = s.__cssModules) && l[a])
            );
          },
          defineProperty(t, e, n) {
            return (
              null != n.get
                ? (t._.accessCache[e] = 0)
                : C(n, "value") && this.set(t, e, n.value, null),
              Reflect.defineProperty(t, e, n)
            );
          },
        };
      function co(t) {
        return k(t) ? t.reduce((t, e) => ((t[e] = null), t), {}) : t;
      }
      let uo = !0;
      function po(t, e, n) {
        Fe(k(t) ? t.map((t) => t.bind(e.proxy)) : t.bind(e.proxy), e, n);
      }
      function fo(t, e, n, o) {
        let r = o.includes(".") ? Sn(n, o) : () => n[o];
        if (D(t)) {
          const n = e[t];
          j(n) && wn(r, n);
        } else if (j(t)) wn(r, t.bind(n));
        else if (N(t))
          if (k(t)) t.forEach((t) => fo(t, e, n, o));
          else {
            const o = j(t.handler) ? t.handler.bind(n) : e[t.handler];
            j(o) && wn(r, o, t);
          }
      }
      function ho(t) {
        const e = t.type,
          { mixins: n, extends: o } = e,
          {
            mixins: r,
            optionsCache: i,
            config: { optionMergeStrategies: s },
          } = t.appContext,
          a = i.get(e);
        let l;
        return (
          a
            ? (l = a)
            : r.length || n || o
              ? ((l = {}),
                r.length && r.forEach((t) => vo(l, t, s, !0)),
                vo(l, e, s))
              : (l = e),
          N(e) && i.set(e, l),
          l
        );
      }
      function vo(t, e, n, o = !1) {
        const { mixins: r, extends: i } = e;
        (i && vo(t, i, n, !0), r && r.forEach((e) => vo(t, e, n, !0)));
        for (const r in e)
          if (o && "expose" === r);
          else {
            const o = go[r] || (n && n[r]);
            t[r] = o ? o(t[r], e[r]) : e[r];
          }
        return t;
      }
      const go = {
        data: mo,
        props: _o,
        emits: _o,
        methods: xo,
        computed: xo,
        beforeCreate: bo,
        created: bo,
        beforeMount: bo,
        mounted: bo,
        beforeUpdate: bo,
        updated: bo,
        beforeDestroy: bo,
        beforeUnmount: bo,
        destroyed: bo,
        unmounted: bo,
        activated: bo,
        deactivated: bo,
        errorCaptured: bo,
        serverPrefetch: bo,
        components: xo,
        directives: xo,
        watch: function (t, e) {
          if (!t) return e;
          if (!e) return t;
          const n = E(Object.create(null), t);
          for (const o in e) n[o] = bo(t[o], e[o]);
          return n;
        },
        provide: mo,
        inject: function (t, e) {
          return xo(yo(t), yo(e));
        },
      };
      function mo(t, e) {
        return e
          ? t
            ? function () {
                return E(
                  j(t) ? t.call(this, this) : t,
                  j(e) ? e.call(this, this) : e,
                );
              }
            : e
          : t;
      }
      function yo(t) {
        if (k(t)) {
          const e = {};
          for (let n = 0; n < t.length; n++) e[t[n]] = t[n];
          return e;
        }
        return t;
      }
      function bo(t, e) {
        return t ? [...new Set([].concat(t, e))] : e;
      }
      function xo(t, e) {
        return t ? E(Object.create(null), t, e) : e;
      }
      function _o(t, e) {
        return t
          ? k(t) && k(e)
            ? [...new Set([...t, ...e])]
            : E(Object.create(null), co(t), co(null != e ? e : {}))
          : e;
      }
      function wo() {
        return {
          app: null,
          config: {
            isNativeTag: _,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {},
          },
          mixins: [],
          components: {},
          directives: {},
          provides: Object.create(null),
          optionsCache: new WeakMap(),
          propsCache: new WeakMap(),
          emitsCache: new WeakMap(),
        };
      }
      let Oo = 0;
      function Eo(t, e) {
        return function (n, o = null) {
          (j(n) || (n = E({}, n)), null == o || N(o) || (o = null));
          const r = wo(),
            i = new WeakSet(),
            s = [];
          let a = !1;
          const l = (r.app = {
            _uid: Oo++,
            _component: n,
            _props: o,
            _container: null,
            _context: r,
            _instance: null,
            version: Kr,
            get config() {
              return r.config;
            },
            set config(t) {},
            use: (t, ...e) => (
              i.has(t) ||
                (t && j(t.install)
                  ? (i.add(t), t.install(l, ...e))
                  : j(t) && (i.add(t), t(l, ...e))),
              l
            ),
            mixin: (t) => (
              __VUE_OPTIONS_API__ && (r.mixins.includes(t) || r.mixins.push(t)),
              l
            ),
            component: (t, e) =>
              e ? ((r.components[t] = e), l) : r.components[t],
            directive: (t, e) =>
              e ? ((r.directives[t] = e), l) : r.directives[t],
            mount(i, s, c) {
              if (!a) {
                const u = l._ceVNode || _r(n, o);
                return (
                  (u.appContext = r),
                  !0 === c ? (c = "svg") : !1 === c && (c = void 0),
                  s && e ? e(u, i) : t(u, i, c),
                  (a = !0),
                  (l._container = i),
                  (i.__vue_app__ = l),
                  __VUE_PROD_DEVTOOLS__ &&
                    ((l._instance = u.component),
                    (function (t, e) {
                      ln("app:init", t, e, {
                        Fragment: rr,
                        Text: ir,
                        Comment: sr,
                        Static: ar,
                      });
                    })(l, Kr)),
                  qr(u.component)
                );
              }
            },
            onUnmount(t) {
              s.push(t);
            },
            unmount() {
              a &&
                (Fe(s, l._instance, 16),
                t(null, l._container),
                __VUE_PROD_DEVTOOLS__ &&
                  ((l._instance = null),
                  (function (t) {
                    ln("app:unmount", t);
                  })(l)),
                delete l._container.__vue_app__);
            },
            provide: (t, e) => ((r.provides[t] = e), l),
            runWithContext(t) {
              const e = So;
              So = l;
              try {
                return t();
              } finally {
                So = e;
              }
            },
          });
          return l;
        };
      }
      let So = null;
      function To(t, e, ...n) {
        if (t.isUnmounted) return;
        const o = t.vnode.props || y;
        let r = n;
        const i = e.startsWith("update:"),
          s =
            i &&
            ((t, e) =>
              "modelValue" === e || "model-value" === e
                ? t.modelModifiers
                : t[`${e}Modifiers`] ||
                  t[`${W(e)}Modifiers`] ||
                  t[`${z(e)}Modifiers`])(o, e.slice(7));
        let a;
        (s &&
          (s.trim && (r = n.map((t) => (D(t) ? t.trim() : t))),
          s.number && (r = n.map(Q))),
          __VUE_PROD_DEVTOOLS__ &&
            (function (t, e, n) {
              ln("component:emit", t.appContext.app, t, e, n);
            })(t, e, r));
        let l = o[(a = Y(e))] || o[(a = Y(W(e)))];
        (!l && i && (l = o[(a = Y(z(e)))]), l && Fe(l, t, 6, r));
        const c = o[a + "Once"];
        if (c) {
          if (t.emitted) {
            if (t.emitted[a]) return;
          } else t.emitted = {};
          ((t.emitted[a] = !0), Fe(c, t, 6, r));
        }
      }
      const Co = new WeakMap();
      function ko(t, e, n = !1) {
        const o = __VUE_OPTIONS_API__ && n ? Co : e.emitsCache,
          r = o.get(t);
        if (void 0 !== r) return r;
        const i = t.emits;
        let s = {},
          a = !1;
        if (__VUE_OPTIONS_API__ && !j(t)) {
          const o = (t) => {
            const n = ko(t, e, !0);
            n && ((a = !0), E(s, n));
          };
          (!n && e.mixins.length && e.mixins.forEach(o),
            t.extends && o(t.extends),
            t.mixins && t.mixins.forEach(o));
        }
        return i || a
          ? (k(i) ? i.forEach((t) => (s[t] = null)) : E(s, i),
            N(t) && o.set(t, s),
            s)
          : (N(t) && o.set(t, null), null);
      }
      function Ao(t, e) {
        return (
          !(!t || !w(e)) &&
          ((e = e.slice(2).replace(/Once$/, "")),
          C(t, e[0].toLowerCase() + e.slice(1)) || C(t, z(e)) || C(t, e))
        );
      }
      function Po(t) {
        const {
            type: e,
            vnode: n,
            proxy: o,
            withProxy: r,
            propsOptions: [i],
            slots: s,
            attrs: a,
            emit: l,
            render: c,
            renderCache: u,
            props: p,
            data: d,
            setupState: f,
            ctx: h,
            inheritAttrs: v,
          } = t,
          g = gn(t);
        let m, y;
        try {
          if (4 & n.shapeFlag) {
            const t = r || o,
              e = t;
            ((m = Tr(c.call(e, t, u, p, f, d, h))), (y = a));
          } else {
            const t = e;
            ((m = Tr(
              t.length > 1 ? t(p, { attrs: a, slots: s, emit: l }) : t(p, null),
            )),
              (y = e.props ? a : Lo(a)));
          }
        } catch (e) {
          ((lr.length = 0), $e(e, t, 1), (m = _r(sr)));
        }
        let b = m;
        if (y && !1 !== v) {
          const t = Object.keys(y),
            { shapeFlag: e } = b;
          t.length &&
            7 & e &&
            (i && t.some(O) && (y = jo(y, i)), (b = wr(b, y, !1, !0)));
        }
        return (
          n.dirs &&
            ((b = wr(b, null, !1, !0)),
            (b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs)),
          n.transition && kn(b, n.transition),
          (m = b),
          gn(g),
          m
        );
      }
      const Lo = (t) => {
          let e;
          for (const n in t)
            ("class" === n || "style" === n || w(n)) &&
              ((e || (e = {}))[n] = t[n]);
          return e;
        },
        jo = (t, e) => {
          const n = {};
          for (const o in t) (O(o) && o.slice(9) in e) || (n[o] = t[o]);
          return n;
        };
      function Do(t, e, n) {
        const o = Object.keys(e);
        if (o.length !== Object.keys(t).length) return !0;
        for (let r = 0; r < o.length; r++) {
          const i = o[r];
          if (Io(e, t, i) && !Ao(n, i)) return !0;
        }
        return !1;
      }
      function Io(t, e, n) {
        const o = t[n],
          r = e[n];
        return "style" === n && N(o) && N(r) ? !ct(o, r) : o !== r;
      }
      const No = {},
        Ro = () => Object.create(No),
        Mo = (t) => Object.getPrototypeOf(t) === No;
      function Vo(t, e, n, o) {
        const [r, i] = t.propsOptions;
        let s,
          a = !1;
        if (e)
          for (let l in e) {
            if (B(l)) continue;
            const c = e[l];
            let u;
            r && C(r, (u = W(l)))
              ? i && i.includes(u)
                ? ((s || (s = {}))[u] = c)
                : (n[u] = c)
              : Ao(t.emitsOptions, l) ||
                (l in o && c === o[l]) ||
                ((o[l] = c), (a = !0));
          }
        if (i) {
          const e = Pe(n),
            o = s || y;
          for (let s = 0; s < i.length; s++) {
            const a = i[s];
            n[a] = Ho(r, e, a, o[a], t, !C(o, a));
          }
        }
        return a;
      }
      function Ho(t, e, n, o, r, i) {
        const s = t[n];
        if (null != s) {
          const t = C(s, "default");
          if (t && void 0 === o) {
            const t = s.default;
            if (s.type !== Function && !s.skipFactory && j(t)) {
              const { propsDefaults: i } = r;
              if (n in i) o = i[n];
              else {
                const s = Rr(r);
                ((o = i[n] = t.call(null, e)), s());
              }
            } else o = t;
            r.ce && r.ce._setProp(n, o);
          }
          s[0] &&
            (i && !t
              ? (o = !1)
              : !s[1] || ("" !== o && o !== z(n)) || (o = !0));
        }
        return o;
      }
      const Uo = new WeakMap();
      function Bo(t, e, n = !1) {
        const o = __VUE_OPTIONS_API__ && n ? Uo : e.propsCache,
          r = o.get(t);
        if (r) return r;
        const i = t.props,
          s = {},
          a = [];
        let l = !1;
        if (__VUE_OPTIONS_API__ && !j(t)) {
          const o = (t) => {
            l = !0;
            const [n, o] = Bo(t, e, !0);
            (E(s, n), o && a.push(...o));
          };
          (!n && e.mixins.length && e.mixins.forEach(o),
            t.extends && o(t.extends),
            t.mixins && t.mixins.forEach(o));
        }
        if (!i && !l) return (N(t) && o.set(t, b), b);
        if (k(i))
          for (let t = 0; t < i.length; t++) {
            const e = W(i[t]);
            Fo(e) && (s[e] = y);
          }
        else if (i)
          for (const t in i) {
            const e = W(t);
            if (Fo(e)) {
              const n = i[t],
                o = (s[e] = k(n) || j(n) ? { type: n } : E({}, n)),
                r = o.type;
              let l = !1,
                c = !0;
              if (k(r))
                for (let t = 0; t < r.length; ++t) {
                  const e = r[t],
                    n = j(e) && e.name;
                  if ("Boolean" === n) {
                    l = !0;
                    break;
                  }
                  "String" === n && (c = !1);
                }
              else l = j(r) && "Boolean" === r.name;
              ((o[0] = l), (o[1] = c), (l || C(o, "default")) && a.push(e));
            }
          }
        const c = [s, a];
        return (N(t) && o.set(t, c), c);
      }
      function Fo(t) {
        return "$" !== t[0] && !B(t);
      }
      const $o = (t) => "_" === t || "_ctx" === t || "$stable" === t,
        Wo = (t) => (k(t) ? t.map(Tr) : [Tr(t)]),
        qo = (t, e, n) => {
          if (e._n) return e;
          const o = mn((...t) => Wo(e(...t)), n);
          return ((o._c = !1), o);
        },
        zo = (t, e, n) => {
          const o = t._ctx;
          for (const n in t) {
            if ($o(n)) continue;
            const r = t[n];
            if (j(r)) e[n] = qo(0, r, o);
            else if (null != r) {
              const t = Wo(r);
              e[n] = () => t;
            }
          }
        },
        Ko = (t, e) => {
          const n = Wo(e);
          t.slots.default = () => n;
        },
        Yo = (t, e, n) => {
          for (const o in e) (!n && $o(o)) || (t[o] = e[o]);
        },
        Jo = function (t, e) {
          e && e.pendingBranch
            ? k(t)
              ? e.effects.push(...t)
              : e.effects.push(t)
            : ((n = t),
              k(n)
                ? ze.push(...n)
                : Ke && -1 === n.id
                  ? Ke.splice(Ye + 1, 0, n)
                  : 1 & n.flags || (ze.push(n), (n.flags |= 1)),
              Ze());
          var n;
        };
      function Xo(t, e) {
        ("boolean" != typeof __VUE_OPTIONS_API__ &&
          (tt().__VUE_OPTIONS_API__ = !0),
          "boolean" != typeof __VUE_PROD_DEVTOOLS__ &&
            (tt().__VUE_PROD_DEVTOOLS__ = !1),
          "boolean" != typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ &&
            (tt().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = !1));
        const n = tt();
        ((n.__VUE__ = !0),
          __VUE_PROD_DEVTOOLS__ && cn(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n));
        const {
            insert: o,
            remove: r,
            patchProp: i,
            createElement: s,
            createText: a,
            createComment: l,
            setText: c,
            setElementText: u,
            parentNode: p,
            nextSibling: d,
            setScopeId: f = x,
            insertStaticContent: h,
          } = t,
          v = (
            t,
            e,
            n,
            o = null,
            r = null,
            i = null,
            s = void 0,
            a = null,
            l = !!e.dynamicChildren,
          ) => {
            if (t === e) return;
            (t && !mr(t, e) && ((o = J(t)), F(t, r, i, !0), (t = null)),
              -2 === e.patchFlag && ((l = !1), (e.dynamicChildren = null)));
            const { type: c, ref: u, shapeFlag: p } = e;
            switch (c) {
              case ir:
                g(t, e, n, o);
                break;
              case sr:
                m(t, e, n, o);
                break;
              case ar:
                null == t && _(e, n, o, s);
                break;
              case rr:
                P(t, e, n, o, r, i, s, a, l);
                break;
              default:
                1 & p
                  ? w(t, e, n, o, r, i, s, a, l)
                  : 6 & p
                    ? L(t, e, n, o, r, i, s, a, l)
                    : (64 & p || 128 & p) &&
                      c.process(t, e, n, o, r, i, s, a, l, et);
            }
            null != u && r
              ? jn(u, t && t.ref, i, e || t, !e)
              : null == u && t && null != t.ref && jn(t.ref, null, i, t, !0);
          },
          g = (t, e, n, r) => {
            if (null == t) o((e.el = a(e.children)), n, r);
            else {
              const n = (e.el = t.el);
              e.children !== t.children && c(n, e.children);
            }
          },
          m = (t, e, n, r) => {
            null == t ? o((e.el = l(e.children || "")), n, r) : (e.el = t.el);
          },
          _ = (t, e, n, o) => {
            [t.el, t.anchor] = h(t.children, e, n, o, t.el, t.anchor);
          },
          w = (t, e, n, o, r, i, s, a, l) => {
            if (
              ("svg" === e.type
                ? (s = "svg")
                : "math" === e.type && (s = "mathml"),
              null == t)
            )
              O(e, n, o, r, i, s, a, l);
            else {
              const n = t.el && t.el._isVueCE ? t.el : null;
              try {
                (n && n._beginPatch(), T(t, e, r, i, s, a, l));
              } finally {
                n && n._endPatch();
              }
            }
          },
          O = (t, e, n, r, a, l, c, p) => {
            let d, f;
            const { props: h, shapeFlag: v, transition: g, dirs: m } = t;
            if (
              ((d = t.el = s(t.type, l, h && h.is, h)),
              8 & v
                ? u(d, t.children)
                : 16 & v && S(t.children, d, null, r, a, Go(t, l), c, p),
              m && bn(t, null, r, "created"),
              E(d, t, t.scopeId, c, r),
              h)
            ) {
              for (const t in h)
                "value" === t || B(t) || i(d, t, null, h[t], l, r);
              ("value" in h && i(d, "value", null, h.value, l),
                (f = h.onVnodeBeforeMount) && Ar(f, r, t));
            }
            (__VUE_PROD_DEVTOOLS__ &&
              (G(d, "__vnode", t, !0), G(d, "__vueParentComponent", r, !0)),
              m && bn(t, null, r, "beforeMount"));
            const y = (function (t, e) {
              return (!t || (t && !t.pendingBranch)) && e && !e.persisted;
            })(a, g);
            (y && g.beforeEnter(d),
              o(d, e, n),
              ((f = h && h.onVnodeMounted) || y || m) &&
                Jo(() => {
                  (f && Ar(f, r, t),
                    y && g.enter(d),
                    m && bn(t, null, r, "mounted"));
                }, a));
          },
          E = (t, e, n, o, r) => {
            if ((n && f(t, n), o))
              for (let e = 0; e < o.length; e++) f(t, o[e]);
            if (r) {
              let n = r.subTree;
              if (
                e === n ||
                (or(n.type) && (n.ssContent === e || n.ssFallback === e))
              ) {
                const e = r.vnode;
                E(t, e, e.scopeId, e.slotScopeIds, r.parent);
              }
            }
          },
          S = (t, e, n, o, r, i, s, a, l = 0) => {
            for (let c = l; c < t.length; c++) {
              const l = (t[c] = a ? Cr(t[c]) : Tr(t[c]));
              v(null, l, e, n, o, r, i, s, a);
            }
          },
          T = (t, e, n, o, r, s, a) => {
            const l = (e.el = t.el);
            __VUE_PROD_DEVTOOLS__ && (l.__vnode = e);
            let { patchFlag: c, dynamicChildren: p, dirs: d } = e;
            c |= 16 & t.patchFlag;
            const f = t.props || y,
              h = e.props || y;
            let v;
            if (
              (n && Qo(n, !1),
              (v = h.onVnodeBeforeUpdate) && Ar(v, n, e, t),
              d && bn(e, t, n, "beforeUpdate"),
              n && Qo(n, !0),
              ((f.innerHTML && null == h.innerHTML) ||
                (f.textContent && null == h.textContent)) &&
                u(l, ""),
              p
                ? k(t.dynamicChildren, p, l, n, o, Go(e, r), s)
                : a || M(t, e, l, null, n, o, Go(e, r), s, !1),
              c > 0)
            ) {
              if (16 & c) A(l, f, h, n, r);
              else if (
                (2 & c &&
                  f.class !== h.class &&
                  i(l, "class", null, h.class, r),
                4 & c && i(l, "style", f.style, h.style, r),
                8 & c)
              ) {
                const t = e.dynamicProps;
                for (let e = 0; e < t.length; e++) {
                  const o = t[e],
                    s = f[o],
                    a = h[o];
                  (a === s && "value" !== o) || i(l, o, s, a, r, n);
                }
              }
              1 & c && t.children !== e.children && u(l, e.children);
            } else a || null != p || A(l, f, h, n, r);
            ((v = h.onVnodeUpdated) || d) &&
              Jo(() => {
                (v && Ar(v, n, e, t), d && bn(e, t, n, "updated"));
              }, o);
          },
          k = (t, e, n, o, r, i, s) => {
            for (let a = 0; a < e.length; a++) {
              const l = t[a],
                c = e[a],
                u =
                  l.el && (l.type === rr || !mr(l, c) || 198 & l.shapeFlag)
                    ? p(l.el)
                    : n;
              v(l, c, u, null, o, r, i, s, !0);
            }
          },
          A = (t, e, n, o, r) => {
            if (e !== n) {
              if (e !== y)
                for (const s in e) B(s) || s in n || i(t, s, e[s], null, r, o);
              for (const s in n) {
                if (B(s)) continue;
                const a = n[s],
                  l = e[s];
                a !== l && "value" !== s && i(t, s, l, a, r, o);
              }
              "value" in n && i(t, "value", e.value, n.value, r);
            }
          },
          P = (t, e, n, r, i, s, l, c, u) => {
            const p = (e.el = t ? t.el : a("")),
              d = (e.anchor = t ? t.anchor : a(""));
            let { patchFlag: f, dynamicChildren: h, slotScopeIds: v } = e;
            (v && (c = c ? c.concat(v) : v),
              null == t
                ? (o(p, n, r),
                  o(d, n, r),
                  S(e.children || [], n, d, i, s, l, c, u))
                : f > 0 &&
                    64 & f &&
                    h &&
                    t.dynamicChildren &&
                    t.dynamicChildren.length === h.length
                  ? (k(t.dynamicChildren, h, n, i, s, l, c),
                    (null != e.key || (i && e === i.subTree)) && Zo(t, e, !0))
                  : M(t, e, n, d, i, s, l, c, u));
          },
          L = (t, e, n, o, r, i, s, a, l) => {
            ((e.slotScopeIds = a),
              null == t
                ? 512 & e.shapeFlag
                  ? r.ctx.activate(e, n, o, s, l)
                  : j(e, n, o, r, i, s, l)
                : D(t, e, l));
          },
          j = (t, e, n, o, r, i, s) => {
            const a = (t.component = (function (t, e, n) {
              const o = t.type,
                r = (e ? e.appContext : t.appContext) || Pr,
                i = {
                  uid: Lr++,
                  vnode: t,
                  type: o,
                  parent: e,
                  appContext: r,
                  root: null,
                  next: null,
                  subTree: null,
                  effect: null,
                  update: null,
                  job: null,
                  scope: new mt(!0),
                  render: null,
                  proxy: null,
                  exposed: null,
                  exposeProxy: null,
                  withProxy: null,
                  provides: e ? e.provides : Object.create(r.provides),
                  ids: e ? e.ids : ["", 0, 0],
                  accessCache: null,
                  renderCache: [],
                  components: null,
                  directives: null,
                  propsOptions: Bo(o, r),
                  emitsOptions: ko(o, r),
                  emit: null,
                  emitted: null,
                  propsDefaults: y,
                  inheritAttrs: o.inheritAttrs,
                  ctx: y,
                  data: y,
                  props: y,
                  attrs: y,
                  slots: y,
                  refs: y,
                  setupState: y,
                  setupContext: null,
                  suspense: n,
                  suspenseId: n ? n.pendingId : 0,
                  asyncDep: null,
                  asyncResolved: !1,
                  isMounted: !1,
                  isUnmounted: !1,
                  isDeactivated: !1,
                  bc: null,
                  c: null,
                  bm: null,
                  m: null,
                  bu: null,
                  u: null,
                  um: null,
                  bum: null,
                  da: null,
                  a: null,
                  rtg: null,
                  rtc: null,
                  ec: null,
                  sp: null,
                };
              return (
                (i.ctx = { _: i }),
                (i.root = e ? e.root : i),
                (i.emit = To.bind(null, i)),
                t.ce && t.ce(i),
                i
              );
            })(t, o, r));
            if (
              (Nn(t) && (a.ctx.renderer = et),
              (function (t, e = !1, n = !1) {
                e && Nr(e);
                const { props: o, children: r } = t.vnode,
                  i = Vr(t);
                ((function (t, e, n, o = !1) {
                  const r = {},
                    i = Ro();
                  ((t.propsDefaults = Object.create(null)), Vo(t, e, r, i));
                  for (const e in t.propsOptions[0]) e in r || (r[e] = void 0);
                  (n
                    ? (t.props = o ? r : Se(r, !1, pe, me, xe))
                    : t.type.props
                      ? (t.props = r)
                      : (t.props = i),
                    (t.attrs = i));
                })(t, o, i, e),
                  ((t, e, n) => {
                    const o = (t.slots = Ro());
                    if (32 & t.vnode.shapeFlag) {
                      const t = e._;
                      t ? (Yo(o, e, n), n && G(o, "_", t, !0)) : zo(e, o);
                    } else e && Ko(t, e);
                  })(t, r, n || e));
                const s = i
                  ? (function (t, e) {
                      const n = t.type;
                      ((t.accessCache = Object.create(null)),
                        (t.proxy = new Proxy(t.ctx, lo)));
                      const { setup: o } = n;
                      if (o) {
                        It();
                        const n = (t.setupContext =
                            o.length > 1
                              ? (function (t) {
                                  const e = (e) => {
                                    t.exposed = e || {};
                                  };
                                  return {
                                    attrs: new Proxy(t.attrs, Wr),
                                    slots: t.slots,
                                    emit: t.emit,
                                    expose: e,
                                  };
                                })(t)
                              : null),
                          r = Rr(t),
                          i = Be(o, t, 0, [t.props, n]),
                          s = R(i);
                        if ((Nt(), r(), (!s && !t.sp) || In(t) || An(t), s)) {
                          if ((i.then(Mr, Mr), e))
                            return i
                              .then((n) => {
                                Fr(t, n, e);
                              })
                              .catch((e) => {
                                $e(e, t, 0);
                              });
                          t.asyncDep = i;
                        } else Fr(t, i, e);
                      } else $r(t, e);
                    })(t, e)
                  : void 0;
                e && Nr(!1);
              })(a, !1, s),
              a.asyncDep)
            ) {
              if ((r && r.registerDep(a, I, s), !t.el)) {
                const o = (a.subTree = _r(sr));
                (m(null, o, e, n), (t.placeholder = o.el));
              }
            } else I(a, t, e, n, r, i, s);
          },
          D = (t, e, n) => {
            const o = (e.component = t.component);
            if (
              (function (t, e, n) {
                const { props: o, children: r, component: i } = t,
                  { props: s, children: a, patchFlag: l } = e,
                  c = i.emitsOptions;
                if (e.dirs || e.transition) return !0;
                if (!(n && l >= 0))
                  return (
                    !((!r && !a) || (a && a.$stable)) ||
                    (o !== s && (o ? !s || Do(o, s, c) : !!s))
                  );
                if (1024 & l) return !0;
                if (16 & l) return o ? Do(o, s, c) : !!s;
                if (8 & l) {
                  const t = e.dynamicProps;
                  for (let e = 0; e < t.length; e++) {
                    const n = t[e];
                    if (Io(s, o, n) && !Ao(c, n)) return !0;
                  }
                }
                return !1;
              })(t, e, n)
            ) {
              if (o.asyncDep && !o.asyncResolved) return void N(o, e, n);
              ((o.next = e), o.update());
            } else ((e.el = t.el), (o.vnode = e));
          },
          I = (t, e, n, o, r, i, s) => {
            t.scope.on();
            const a = (t.effect = new bt(() => {
              if (t.isMounted) {
                let { next: e, bu: n, u: o, parent: a, vnode: c } = t;
                {
                  const n = tr(t);
                  if (n)
                    return (
                      e && ((e.el = c.el), N(t, e, s)),
                      void n.asyncDep.then(() => {
                        Jo(() => {
                          t.isUnmounted || l();
                        }, r);
                      })
                    );
                }
                let u,
                  d = e;
                (Qo(t, !1),
                  e ? ((e.el = c.el), N(t, e, s)) : (e = c),
                  n && X(n),
                  (u = e.props && e.props.onVnodeBeforeUpdate) &&
                    Ar(u, a, e, c),
                  Qo(t, !0));
                const f = Po(t),
                  h = t.subTree;
                ((t.subTree = f),
                  v(h, f, p(h.el), J(h), t, r, i),
                  (e.el = f.el),
                  null === d &&
                    (function ({ vnode: t, parent: e }, n) {
                      for (; e;) {
                        const o = e.subTree;
                        if (
                          (o.suspense &&
                            o.suspense.activeBranch === t &&
                            (o.el = t.el),
                          o !== t)
                        )
                          break;
                        (((t = e.vnode).el = n), (e = e.parent));
                      }
                    })(t, f.el),
                  o && Jo(o, r),
                  (u = e.props && e.props.onVnodeUpdated) &&
                    Jo(() => Ar(u, a, e, c), r),
                  __VUE_PROD_DEVTOOLS__ && pn(t));
              } else {
                let s;
                const { el: a, props: l } = e,
                  { bm: c, m: u, parent: p, root: d, type: f } = t,
                  h = In(e);
                if (
                  (Qo(t, !1),
                  c && X(c),
                  !h && (s = l && l.onVnodeBeforeMount) && Ar(s, p, e),
                  Qo(t, !0),
                  a && ot)
                ) {
                  const e = () => {
                    ((t.subTree = Po(t)), ot(a, t.subTree, t, r, null));
                  };
                  h && f.__asyncHydrate ? f.__asyncHydrate(a, t, e) : e();
                } else {
                  d.ce &&
                    d.ce._hasShadowRoot() &&
                    d.ce._injectChildStyle(
                      f,
                      t.parent ? t.parent.type : void 0,
                    );
                  const s = (t.subTree = Po(t));
                  (v(null, s, n, o, t, r, i), (e.el = s.el));
                }
                if ((u && Jo(u, r), !h && (s = l && l.onVnodeMounted))) {
                  const t = e;
                  Jo(() => Ar(s, p, t), r);
                }
                ((256 & e.shapeFlag ||
                  (p && In(p.vnode) && 256 & p.vnode.shapeFlag)) &&
                  t.a &&
                  Jo(t.a, r),
                  (t.isMounted = !0),
                  __VUE_PROD_DEVTOOLS__ && un(t),
                  (e = n = o = null));
              }
            }));
            t.scope.off();
            const l = (t.update = a.run.bind(a)),
              c = (t.job = a.runIfDirty.bind(a));
            ((c.i = t),
              (c.id = t.uid),
              (a.scheduler = () => Qe(c)),
              Qo(t, !0),
              l());
          },
          N = (t, e, n) => {
            e.component = t;
            const o = t.vnode.props;
            ((t.vnode = e),
              (t.next = null),
              (function (t, e, n, o) {
                const {
                    props: r,
                    attrs: i,
                    vnode: { patchFlag: s },
                  } = t,
                  a = Pe(r),
                  [l] = t.propsOptions;
                let c = !1;
                if (!(o || s > 0) || 16 & s) {
                  let o;
                  Vo(t, e, r, i) && (c = !0);
                  for (const i in a)
                    (e && (C(e, i) || ((o = z(i)) !== i && C(e, o)))) ||
                      (l
                        ? !n ||
                          (void 0 === n[i] && void 0 === n[o]) ||
                          (r[i] = Ho(l, a, i, void 0, t, !0))
                        : delete r[i]);
                  if (i !== a)
                    for (const t in i)
                      (e && C(e, t)) || (delete i[t], (c = !0));
                } else if (8 & s) {
                  const n = t.vnode.dynamicProps;
                  for (let o = 0; o < n.length; o++) {
                    let s = n[o];
                    if (Ao(t.emitsOptions, s)) continue;
                    const u = e[s];
                    if (l)
                      if (C(i, s)) u !== i[s] && ((i[s] = u), (c = !0));
                      else {
                        const e = W(s);
                        r[e] = Ho(l, a, e, u, t, !1);
                      }
                    else u !== i[s] && ((i[s] = u), (c = !0));
                  }
                }
                c && zt(t.attrs, "set", "");
              })(t, e.props, o, n),
              ((t, e, n) => {
                const { vnode: o, slots: r } = t;
                let i = !0,
                  s = y;
                if (32 & o.shapeFlag) {
                  const t = e._;
                  (t
                    ? n && 1 === t
                      ? (i = !1)
                      : Yo(r, e, n)
                    : ((i = !e.$stable), zo(e, r)),
                    (s = e));
                } else e && (Ko(t, e), (s = { default: 1 }));
                if (i) for (const t in r) $o(t) || null != s[t] || delete r[t];
              })(t, e.children, n),
              It(),
              tn(t),
              Nt());
          },
          M = (t, e, n, o, r, i, s, a, l = !1) => {
            const c = t && t.children,
              p = t ? t.shapeFlag : 0,
              d = e.children,
              { patchFlag: f, shapeFlag: h } = e;
            if (f > 0) {
              if (128 & f) return void H(c, d, n, o, r, i, s, a, l);
              if (256 & f) return void V(c, d, n, o, r, i, s, a, l);
            }
            8 & h
              ? (16 & p && Y(c, r, i), d !== c && u(n, d))
              : 16 & p
                ? 16 & h
                  ? H(c, d, n, o, r, i, s, a, l)
                  : Y(c, r, i, !0)
                : (8 & p && u(n, ""), 16 & h && S(d, n, o, r, i, s, a, l));
          },
          V = (t, e, n, o, r, i, s, a, l) => {
            e = e || b;
            const c = (t = t || b).length,
              u = e.length,
              p = Math.min(c, u);
            let d;
            for (d = 0; d < p; d++) {
              const o = (e[d] = l ? Cr(e[d]) : Tr(e[d]));
              v(t[d], o, n, null, r, i, s, a, l);
            }
            c > u ? Y(t, r, i, !0, !1, p) : S(e, n, o, r, i, s, a, l, p);
          },
          H = (t, e, n, o, r, i, s, a, l) => {
            let c = 0;
            const u = e.length;
            let p = t.length - 1,
              d = u - 1;
            for (; c <= p && c <= d;) {
              const o = t[c],
                u = (e[c] = l ? Cr(e[c]) : Tr(e[c]));
              if (!mr(o, u)) break;
              (v(o, u, n, null, r, i, s, a, l), c++);
            }
            for (; c <= p && c <= d;) {
              const o = t[p],
                c = (e[d] = l ? Cr(e[d]) : Tr(e[d]));
              if (!mr(o, c)) break;
              (v(o, c, n, null, r, i, s, a, l), p--, d--);
            }
            if (c > p) {
              if (c <= d) {
                const t = d + 1,
                  p = t < u ? e[t].el : o;
                for (; c <= d;)
                  (v(
                    null,
                    (e[c] = l ? Cr(e[c]) : Tr(e[c])),
                    n,
                    p,
                    r,
                    i,
                    s,
                    a,
                    l,
                  ),
                    c++);
              }
            } else if (c > d) for (; c <= p;) (F(t[c], r, i, !0), c++);
            else {
              const f = c,
                h = c,
                g = new Map();
              for (c = h; c <= d; c++) {
                const t = (e[c] = l ? Cr(e[c]) : Tr(e[c]));
                null != t.key && g.set(t.key, c);
              }
              let m,
                y = 0;
              const x = d - h + 1;
              let _ = !1,
                w = 0;
              const O = new Array(x);
              for (c = 0; c < x; c++) O[c] = 0;
              for (c = f; c <= p; c++) {
                const o = t[c];
                if (y >= x) {
                  F(o, r, i, !0);
                  continue;
                }
                let u;
                if (null != o.key) u = g.get(o.key);
                else
                  for (m = h; m <= d; m++)
                    if (0 === O[m - h] && mr(o, e[m])) {
                      u = m;
                      break;
                    }
                void 0 === u
                  ? F(o, r, i, !0)
                  : ((O[u - h] = c + 1),
                    u >= w ? (w = u) : (_ = !0),
                    v(o, e[u], n, null, r, i, s, a, l),
                    y++);
              }
              const E = _
                ? (function (t) {
                    const e = t.slice(),
                      n = [0];
                    let o, r, i, s, a;
                    const l = t.length;
                    for (o = 0; o < l; o++) {
                      const l = t[o];
                      if (0 !== l) {
                        if (((r = n[n.length - 1]), t[r] < l)) {
                          ((e[o] = r), n.push(o));
                          continue;
                        }
                        for (i = 0, s = n.length - 1; i < s;)
                          ((a = (i + s) >> 1),
                            t[n[a]] < l ? (i = a + 1) : (s = a));
                        l < t[n[i]] && (i > 0 && (e[o] = n[i - 1]), (n[i] = o));
                      }
                    }
                    for (i = n.length, s = n[i - 1]; i-- > 0;)
                      ((n[i] = s), (s = e[s]));
                    return n;
                  })(O)
                : b;
              for (m = E.length - 1, c = x - 1; c >= 0; c--) {
                const t = h + c,
                  p = e[t],
                  d = e[t + 1],
                  f = t + 1 < u ? d.el || nr(d) : o;
                0 === O[c]
                  ? v(null, p, n, f, r, i, s, a, l)
                  : _ && (m < 0 || c !== E[m] ? U(p, n, f, 2) : m--);
              }
            }
          },
          U = (t, e, n, i, s = null) => {
            const {
              el: a,
              type: l,
              transition: c,
              children: u,
              shapeFlag: p,
            } = t;
            if (6 & p) U(t.component.subTree, e, n, i);
            else if (128 & p) t.suspense.move(e, n, i);
            else if (64 & p) l.move(t, e, n, et);
            else if (l !== rr)
              if (l !== ar)
                if (2 !== i && 1 & p && c)
                  if (0 === i)
                    (c.beforeEnter(a), o(a, e, n), Jo(() => c.enter(a), s));
                  else {
                    const { leave: i, delayLeave: s, afterLeave: l } = c,
                      u = () => {
                        t.ctx.isUnmounted ? r(a) : o(a, e, n);
                      },
                      p = () => {
                        (a._isLeaving && a[Cn](!0),
                          i(a, () => {
                            (u(), l && l());
                          }));
                      };
                    s ? s(a, u, p) : p();
                  }
                else o(a, e, n);
              else
                (({ el: t, anchor: e }, n, r) => {
                  let i;
                  for (; t && t !== e;) ((i = d(t)), o(t, n, r), (t = i));
                  o(e, n, r);
                })(t, e, n);
            else {
              o(a, e, n);
              for (let t = 0; t < u.length; t++) U(u[t], e, n, i);
              o(t.anchor, e, n);
            }
          },
          F = (t, e, n, o = !1, r = !1) => {
            const {
              type: i,
              props: s,
              ref: a,
              children: l,
              dynamicChildren: c,
              shapeFlag: u,
              patchFlag: p,
              dirs: d,
              cacheIndex: f,
            } = t;
            if (
              (-2 === p && (r = !1),
              null != a && (It(), jn(a, null, n, t, !0), Nt()),
              null != f && (e.renderCache[f] = void 0),
              256 & u)
            )
              return void e.ctx.deactivate(t);
            const h = 1 & u && d,
              v = !In(t);
            let g;
            if ((v && (g = s && s.onVnodeBeforeUnmount) && Ar(g, e, t), 6 & u))
              K(t.component, n, o);
            else {
              if (128 & u) return void t.suspense.unmount(n, o);
              (h && bn(t, null, e, "beforeUnmount"),
                64 & u
                  ? t.type.remove(t, e, n, et, o)
                  : c && !c.hasOnce && (i !== rr || (p > 0 && 64 & p))
                    ? Y(c, e, n, !1, !0)
                    : ((i === rr && 384 & p) || (!r && 16 & u)) && Y(l, e, n),
                o && $(t));
            }
            ((v && (g = s && s.onVnodeUnmounted)) || h) &&
              Jo(() => {
                (g && Ar(g, e, t), h && bn(t, null, e, "unmounted"));
              }, n);
          },
          $ = (t) => {
            const { type: e, el: n, anchor: o, transition: i } = t;
            if (e === rr) return void q(n, o);
            if (e === ar)
              return void (({ el: t, anchor: e }) => {
                let n;
                for (; t && t !== e;) ((n = d(t)), r(t), (t = n));
                r(e);
              })(t);
            const s = () => {
              (r(n), i && !i.persisted && i.afterLeave && i.afterLeave());
            };
            if (1 & t.shapeFlag && i && !i.persisted) {
              const { leave: e, delayLeave: o } = i,
                r = () => e(n, s);
              o ? o(t.el, s, r) : r();
            } else s();
          },
          q = (t, e) => {
            let n;
            for (; t !== e;) ((n = d(t)), r(t), (t = n));
            r(e);
          },
          K = (t, e, n) => {
            const {
              bum: o,
              scope: r,
              job: i,
              subTree: s,
              um: a,
              m: l,
              a: c,
            } = t;
            var u;
            (er(l),
              er(c),
              o && X(o),
              r.stop(),
              i && ((i.flags |= 8), F(s, t, e, n)),
              a && Jo(a, e),
              Jo(() => {
                t.isUnmounted = !0;
              }, e),
              __VUE_PROD_DEVTOOLS__ &&
                ((u = t),
                rn &&
                  "function" == typeof rn.cleanupBuffer &&
                  !rn.cleanupBuffer(u) &&
                  dn(u)));
          },
          Y = (t, e, n, o = !1, r = !1, i = 0) => {
            for (let s = i; s < t.length; s++) F(t[s], e, n, o, r);
          },
          J = (t) => {
            if (6 & t.shapeFlag) return J(t.component.subTree);
            if (128 & t.shapeFlag) return t.suspense.next();
            const e = d(t.anchor || t.el),
              n = e && e[Tn];
            return n ? d(n) : e;
          };
        let Q = !1;
        const Z = (t, e, n) => {
            let o;
            (null == t
              ? e._vnode &&
                (F(e._vnode, null, null, !0), (o = e._vnode.component))
              : v(e._vnode || null, t, e, null, null, null, n),
              (e._vnode = t),
              Q || ((Q = !0), tn(o), en(), (Q = !1)));
          },
          et = {
            p: v,
            um: F,
            m: U,
            r: $,
            mt: j,
            mc: S,
            pc: M,
            pbc: k,
            n: J,
            o: t,
          };
        let nt, ot;
        return (
          e && ([nt, ot] = e(et)),
          { render: Z, hydrate: nt, createApp: Eo(Z, nt) }
        );
      }
      function Go({ type: t, props: e }, n) {
        return ("svg" === n && "foreignObject" === t) ||
          ("mathml" === n &&
            "annotation-xml" === t &&
            e &&
            e.encoding &&
            e.encoding.includes("html"))
          ? void 0
          : n;
      }
      function Qo({ effect: t, job: e }, n) {
        n
          ? ((t.flags |= 32), (e.flags |= 4))
          : ((t.flags &= -33), (e.flags &= -5));
      }
      function Zo(t, e, n = !1) {
        const o = t.children,
          r = e.children;
        if (k(o) && k(r))
          for (let t = 0; t < o.length; t++) {
            const e = o[t];
            let i = r[t];
            (1 & i.shapeFlag &&
              !i.dynamicChildren &&
              ((i.patchFlag <= 0 || 32 === i.patchFlag) &&
                ((i = r[t] = Cr(r[t])), (i.el = e.el)),
              n || -2 === i.patchFlag || Zo(e, i)),
              i.type === ir &&
                (-1 === i.patchFlag && (i = r[t] = Cr(i)), (i.el = e.el)),
              i.type !== sr || i.el || (i.el = e.el));
          }
      }
      function tr(t) {
        const e = t.subTree.component;
        if (e) return e.asyncDep && !e.asyncResolved ? e : tr(e);
      }
      function er(t) {
        if (t) for (let e = 0; e < t.length; e++) t[e].flags |= 8;
      }
      function nr(t) {
        if (t.placeholder) return t.placeholder;
        const e = t.component;
        return e ? nr(e.subTree) : null;
      }
      const or = (t) => t.__isSuspense;
      const rr = Symbol.for("v-fgt"),
        ir = Symbol.for("v-txt"),
        sr = Symbol.for("v-cmt"),
        ar = Symbol.for("v-stc"),
        lr = [];
      let cr = null;
      function ur(t = !1) {
        lr.push((cr = t ? null : []));
      }
      let pr = 1;
      function dr(t, e = !1) {
        ((pr += t), t < 0 && cr && e && (cr.hasOnce = !0));
      }
      function fr(t) {
        return (
          (t.dynamicChildren = pr > 0 ? cr || b : null),
          lr.pop(),
          (cr = lr[lr.length - 1] || null),
          pr > 0 && cr && cr.push(t),
          t
        );
      }
      function hr(t, e, n, o, r, i) {
        return fr(xr(t, e, n, o, r, i, !0));
      }
      function vr(t, e, n, o, r) {
        return fr(_r(t, e, n, o, r, !0));
      }
      function gr(t) {
        return !!t && !0 === t.__v_isVNode;
      }
      function mr(t, e) {
        return t.type === e.type && t.key === e.key;
      }
      const yr = ({ key: t }) => (null != t ? t : null),
        br = ({ ref: t, ref_key: e, ref_for: n }) => (
          "number" == typeof t && (t = "" + t),
          null != t
            ? D(t) || De(t) || j(t)
              ? { i: hn, r: t, k: e, f: !!n }
              : t
            : null
        );
      function xr(
        t,
        e = null,
        n = null,
        o = 0,
        r = null,
        i = t === rr ? 0 : 1,
        s = !1,
        a = !1,
      ) {
        const l = {
          __v_isVNode: !0,
          __v_skip: !0,
          type: t,
          props: e,
          key: e && yr(e),
          ref: e && br(e),
          scopeId: vn,
          slotScopeIds: null,
          children: n,
          component: null,
          suspense: null,
          ssContent: null,
          ssFallback: null,
          dirs: null,
          transition: null,
          el: null,
          anchor: null,
          target: null,
          targetStart: null,
          targetAnchor: null,
          staticCount: 0,
          shapeFlag: i,
          patchFlag: o,
          dynamicProps: r,
          dynamicChildren: null,
          appContext: null,
          ctx: hn,
        };
        return (
          a
            ? (kr(l, n), 128 & i && t.normalize(l))
            : n && (l.shapeFlag |= D(n) ? 8 : 16),
          pr > 0 &&
            !s &&
            cr &&
            (l.patchFlag > 0 || 6 & i) &&
            32 !== l.patchFlag &&
            cr.push(l),
          l
        );
      }
      const _r = function (t, e = null, n = null, o = 0, r = null, i = !1) {
        if (((t && t !== to) || (t = sr), gr(t))) {
          const o = wr(t, e, !0);
          return (
            n && kr(o, n),
            pr > 0 &&
              !i &&
              cr &&
              (6 & o.shapeFlag ? (cr[cr.indexOf(t)] = o) : cr.push(o)),
            (o.patchFlag = -2),
            o
          );
        }
        if (((s = t), j(s) && "__vccOpts" in s && (t = t.__vccOpts), e)) {
          e = (function (t) {
            return t ? (Ae(t) || Mo(t) ? E({}, t) : t) : null;
          })(e);
          let { class: t, style: n } = e;
          (t && !D(t) && (e.class = st(t)),
            N(n) && (Ae(n) && !k(n) && (n = E({}, n)), (e.style = et(n))));
        }
        var s;
        return xr(
          t,
          e,
          n,
          o,
          r,
          D(t)
            ? 1
            : or(t)
              ? 128
              : ((t) => t.__isTeleport)(t)
                ? 64
                : N(t)
                  ? 4
                  : j(t)
                    ? 2
                    : 0,
          i,
          !0,
        );
      };
      function wr(t, e, n = !1, o = !1) {
        const {
            props: r,
            ref: i,
            patchFlag: s,
            children: a,
            transition: l,
          } = t,
          c = e
            ? (function (...t) {
                const e = {};
                for (let n = 0; n < t.length; n++) {
                  const o = t[n];
                  for (const t in o)
                    if ("class" === t)
                      e.class !== o.class && (e.class = st([e.class, o.class]));
                    else if ("style" === t) e.style = et([e.style, o.style]);
                    else if (w(t)) {
                      const n = e[t],
                        r = o[t];
                      !r ||
                        n === r ||
                        (k(n) && n.includes(r)) ||
                        (e[t] = n ? [].concat(n, r) : r);
                    } else "" !== t && (e[t] = o[t]);
                }
                return e;
              })(r || {}, e)
            : r,
          u = {
            __v_isVNode: !0,
            __v_skip: !0,
            type: t.type,
            props: c,
            key: c && yr(c),
            ref:
              e && e.ref
                ? n && i
                  ? k(i)
                    ? i.concat(br(e))
                    : [i, br(e)]
                  : br(e)
                : i,
            scopeId: t.scopeId,
            slotScopeIds: t.slotScopeIds,
            children: a,
            target: t.target,
            targetStart: t.targetStart,
            targetAnchor: t.targetAnchor,
            staticCount: t.staticCount,
            shapeFlag: t.shapeFlag,
            patchFlag: e && t.type !== rr ? (-1 === s ? 16 : 16 | s) : s,
            dynamicProps: t.dynamicProps,
            dynamicChildren: t.dynamicChildren,
            appContext: t.appContext,
            dirs: t.dirs,
            transition: l,
            component: t.component,
            suspense: t.suspense,
            ssContent: t.ssContent && wr(t.ssContent),
            ssFallback: t.ssFallback && wr(t.ssFallback),
            placeholder: t.placeholder,
            el: t.el,
            anchor: t.anchor,
            ctx: t.ctx,
            ce: t.ce,
          };
        return (l && o && kn(u, l.clone(u)), u);
      }
      function Or(t = " ", e = 0) {
        return _r(ir, null, t, e);
      }
      function Er(t, e) {
        const n = _r(ar, null, t);
        return ((n.staticCount = e), n);
      }
      function Sr(t = "", e = !1) {
        return e ? (ur(), vr(sr, null, t)) : _r(sr, null, t);
      }
      function Tr(t) {
        return null == t || "boolean" == typeof t
          ? _r(sr)
          : k(t)
            ? _r(rr, null, t.slice())
            : gr(t)
              ? Cr(t)
              : _r(ir, null, String(t));
      }
      function Cr(t) {
        return (null === t.el && -1 !== t.patchFlag) || t.memo ? t : wr(t);
      }
      function kr(t, e) {
        let n = 0;
        const { shapeFlag: o } = t;
        if (null == e) e = null;
        else if (k(e)) n = 16;
        else if ("object" == typeof e) {
          if (65 & o) {
            const n = e.default;
            return void (
              n && (n._c && (n._d = !1), kr(t, n()), n._c && (n._d = !0))
            );
          }
          {
            n = 32;
            const o = e._;
            o || Mo(e)
              ? 3 === o &&
                hn &&
                (1 === hn.slots._
                  ? (e._ = 1)
                  : ((e._ = 2), (t.patchFlag |= 1024)))
              : (e._ctx = hn);
          }
        } else
          j(e)
            ? ((e = { default: e, _ctx: hn }), (n = 32))
            : ((e = String(e)), 64 & o ? ((n = 16), (e = [Or(e)])) : (n = 8));
        ((t.children = e), (t.shapeFlag |= n));
      }
      function Ar(t, e, n, o = null) {
        Fe(t, e, 7, [n, o]);
      }
      const Pr = wo();
      let Lr = 0;
      let jr = null;
      const Dr = () => jr || hn;
      let Ir, Nr;
      {
        const t = tt(),
          e = (e, n) => {
            let o;
            return (
              (o = t[e]) || (o = t[e] = []),
              o.push(n),
              (t) => {
                o.length > 1 ? o.forEach((e) => e(t)) : o[0](t);
              }
            );
          };
        ((Ir = e("__VUE_INSTANCE_SETTERS__", (t) => (jr = t))),
          (Nr = e("__VUE_SSR_SETTERS__", (t) => (Br = t))));
      }
      const Rr = (t) => {
          const e = jr;
          return (
            Ir(t),
            t.scope.on(),
            () => {
              (t.scope.off(), Ir(e));
            }
          );
        },
        Mr = () => {
          (jr && jr.scope.off(), Ir(null));
        };
      function Vr(t) {
        return 4 & t.vnode.shapeFlag;
      }
      let Hr,
        Ur,
        Br = !1;
      function Fr(t, e, n) {
        (j(e)
          ? t.type.__ssrInlineRender
            ? (t.ssrRender = e)
            : (t.render = e)
          : N(e) &&
            (__VUE_PROD_DEVTOOLS__ && (t.devtoolsRawSetupState = e),
            (t.setupState = Ne(e))),
          $r(t, n));
      }
      function $r(t, e, n) {
        const o = t.type;
        if (!t.render) {
          if (!e && Hr && !o.render) {
            const e = o.template || (__VUE_OPTIONS_API__ && ho(t).template);
            if (e) {
              const { isCustomElement: n, compilerOptions: r } =
                  t.appContext.config,
                { delimiters: i, compilerOptions: s } = o,
                a = E(E({ isCustomElement: n, delimiters: i }, r), s);
              o.render = Hr(e, a);
            }
          }
          ((t.render = o.render || x), Ur && Ur(t));
        }
        if (__VUE_OPTIONS_API__) {
          const e = Rr(t);
          It();
          try {
            !(function (t) {
              const e = ho(t),
                n = t.proxy,
                o = t.ctx;
              ((uo = !1), e.beforeCreate && po(e.beforeCreate, t, "bc"));
              const {
                data: r,
                computed: i,
                methods: s,
                watch: a,
                provide: l,
                inject: c,
                created: u,
                beforeMount: p,
                mounted: d,
                beforeUpdate: f,
                updated: h,
                activated: v,
                deactivated: g,
                beforeDestroy: m,
                beforeUnmount: y,
                destroyed: b,
                unmounted: _,
                render: w,
                renderTracked: O,
                renderTriggered: E,
                errorCaptured: S,
                serverPrefetch: T,
                expose: C,
                inheritAttrs: A,
                components: P,
                directives: L,
                filters: D,
              } = e;
              if (
                (c &&
                  (function (t, e) {
                    k(t) && (t = yo(t));
                    for (const n in t) {
                      const o = t[n];
                      let r;
                      ((r = N(o)
                        ? "default" in o
                          ? xn(o.from || n, o.default, !0)
                          : xn(o.from || n)
                        : xn(o)),
                        De(r)
                          ? Object.defineProperty(e, n, {
                              enumerable: !0,
                              configurable: !0,
                              get: () => r.value,
                              set: (t) => (r.value = t),
                            })
                          : (e[n] = r));
                    }
                  })(c, o),
                s)
              )
                for (const t in s) {
                  const e = s[t];
                  j(e) && (o[t] = e.bind(n));
                }
              if (r) {
                const e = r.call(n, n);
                N(e) && (t.data = Oe(e));
              }
              if (((uo = !0), i))
                for (const t in i) {
                  const e = i[t],
                    r = j(e) ? e.bind(n, n) : j(e.get) ? e.get.bind(n, n) : x,
                    s = !j(e) && j(e.set) ? e.set.bind(n) : x,
                    a = zr({ get: r, set: s });
                  Object.defineProperty(o, t, {
                    enumerable: !0,
                    configurable: !0,
                    get: () => a.value,
                    set: (t) => (a.value = t),
                  });
                }
              if (a) for (const t in a) fo(a[t], o, n, t);
              if (l) {
                const t = j(l) ? l.call(n) : l;
                Reflect.ownKeys(t).forEach((e) => {
                  !(function (t, e) {
                    if (jr) {
                      let n = jr.provides;
                      const o = jr.parent && jr.parent.provides;
                      (o === n && (n = jr.provides = Object.create(o)),
                        (n[t] = e));
                    }
                  })(e, t[e]);
                });
              }
              function I(t, e) {
                k(e) ? e.forEach((e) => t(e.bind(n))) : e && t(e.bind(n));
              }
              if (
                (u && po(u, t, "c"),
                I(Fn, p),
                I($n, d),
                I(Wn, f),
                I(qn, h),
                I(Rn, v),
                I(Mn, g),
                I(Gn, S),
                I(Xn, O),
                I(Jn, E),
                I(zn, y),
                I(Kn, _),
                I(Yn, T),
                k(C))
              )
                if (C.length) {
                  const e = t.exposed || (t.exposed = {});
                  C.forEach((t) => {
                    Object.defineProperty(e, t, {
                      get: () => n[t],
                      set: (e) => (n[t] = e),
                      enumerable: !0,
                    });
                  });
                } else t.exposed || (t.exposed = {});
              (w && t.render === x && (t.render = w),
                null != A && (t.inheritAttrs = A),
                P && (t.components = P),
                L && (t.directives = L),
                T && An(t));
            })(t);
          } finally {
            (Nt(), e());
          }
        }
      }
      const Wr = { get: (t, e) => (qt(t, 0, ""), t[e]) };
      function qr(t) {
        return t.exposed
          ? t.exposeProxy ||
              (t.exposeProxy = new Proxy(
                Ne(
                  ((e = t.exposed),
                  !C(e, "__v_skip") &&
                    Object.isExtensible(e) &&
                    G(e, "__v_skip", !0),
                  e),
                ),
                {
                  get: (e, n) => (n in e ? e[n] : n in so ? so[n](t) : void 0),
                  has: (t, e) => e in t || e in so,
                },
              ))
          : t.proxy;
        var e;
      }
      const zr = (t, e) => {
          const n = (function (t, e, n = !1) {
            let o, r;
            return (
              j(t) ? (o = t) : ((o = t.get), (r = t.set)),
              new Re(o, r, n)
            );
          })(t, 0, Br);
          return n;
        },
        Kr = "3.5.30";
      let Yr;
      const Jr = "undefined" != typeof window && window.trustedTypes;
      if (Jr)
        try {
          Yr = Jr.createPolicy("vue", { createHTML: (t) => t });
        } catch (t) {}
      const Xr = Yr ? (t) => Yr.createHTML(t) : (t) => t,
        Gr = "undefined" != typeof document ? document : null,
        Qr = Gr && Gr.createElement("template"),
        Zr = {
          insert: (t, e, n) => {
            e.insertBefore(t, n || null);
          },
          remove: (t) => {
            const e = t.parentNode;
            e && e.removeChild(t);
          },
          createElement: (t, e, n, o) => {
            const r =
              "svg" === e
                ? Gr.createElementNS("http://www.w3.org/2000/svg", t)
                : "mathml" === e
                  ? Gr.createElementNS("http://www.w3.org/1998/Math/MathML", t)
                  : n
                    ? Gr.createElement(t, { is: n })
                    : Gr.createElement(t);
            return (
              "select" === t &&
                o &&
                null != o.multiple &&
                r.setAttribute("multiple", o.multiple),
              r
            );
          },
          createText: (t) => Gr.createTextNode(t),
          createComment: (t) => Gr.createComment(t),
          setText: (t, e) => {
            t.nodeValue = e;
          },
          setElementText: (t, e) => {
            t.textContent = e;
          },
          parentNode: (t) => t.parentNode,
          nextSibling: (t) => t.nextSibling,
          querySelector: (t) => Gr.querySelector(t),
          setScopeId(t, e) {
            t.setAttribute(e, "");
          },
          insertStaticContent(t, e, n, o, r, i) {
            const s = n ? n.previousSibling : e.lastChild;
            if (r && (r === i || r.nextSibling))
              for (
                ;
                e.insertBefore(r.cloneNode(!0), n),
                  r !== i && (r = r.nextSibling);
              );
            else {
              Qr.innerHTML = Xr(
                "svg" === o
                  ? `<svg>${t}</svg>`
                  : "mathml" === o
                    ? `<math>${t}</math>`
                    : t,
              );
              const r = Qr.content;
              if ("svg" === o || "mathml" === o) {
                const t = r.firstChild;
                for (; t.firstChild;) r.appendChild(t.firstChild);
                r.removeChild(t);
              }
              e.insertBefore(r, n);
            }
            return [
              s ? s.nextSibling : e.firstChild,
              n ? n.previousSibling : e.lastChild,
            ];
          },
        },
        ti = Symbol("_vtc");
      Boolean;
      const ei = Symbol("_vod"),
        ni = Symbol("_vsh"),
        oi = Symbol(""),
        ri = /(?:^|;)\s*display\s*:/,
        ii = /\s*!important$/;
      function si(t, e, n) {
        if (k(n)) n.forEach((n) => si(t, e, n));
        else if ((null == n && (n = ""), e.startsWith("--")))
          t.setProperty(e, n);
        else {
          const o = (function (t, e) {
            const n = li[e];
            if (n) return n;
            let o = W(e);
            if ("filter" !== o && o in t) return (li[e] = o);
            o = K(o);
            for (let n = 0; n < ai.length; n++) {
              const r = ai[n] + o;
              if (r in t) return (li[e] = r);
            }
            return e;
          })(t, e);
          ii.test(n)
            ? t.setProperty(z(o), n.replace(ii, ""), "important")
            : (t[o] = n);
        }
      }
      const ai = ["Webkit", "Moz", "ms"],
        li = {},
        ci = "http://www.w3.org/1999/xlink";
      function ui(t, e, n, o, r, i = at(e)) {
        o && e.startsWith("xlink:")
          ? null == n
            ? t.removeAttributeNS(ci, e.slice(6, e.length))
            : t.setAttributeNS(ci, e, n)
          : null == n || (i && !lt(n))
            ? t.removeAttribute(e)
            : t.setAttribute(e, i ? "" : I(n) ? String(n) : n);
      }
      function pi(t, e, n, o, r) {
        if ("innerHTML" === e || "textContent" === e)
          return void (null != n && (t[e] = "innerHTML" === e ? Xr(n) : n));
        const i = t.tagName;
        if ("value" === e && "PROGRESS" !== i && !i.includes("-")) {
          const o = "OPTION" === i ? t.getAttribute("value") || "" : t.value,
            r = null == n ? ("checkbox" === t.type ? "on" : "") : String(n);
          return (
            (o === r && "_value" in t) || (t.value = r),
            null == n && t.removeAttribute(e),
            void (t._value = n)
          );
        }
        let s = !1;
        if ("" === n || null == n) {
          const o = typeof t[e];
          "boolean" === o
            ? (n = lt(n))
            : null == n && "string" === o
              ? ((n = ""), (s = !0))
              : "number" === o && ((n = 0), (s = !0));
        }
        try {
          t[e] = n;
        } catch (t) {}
        s && t.removeAttribute(r || e);
      }
      function di(t, e, n, o) {
        t.addEventListener(e, n, o);
      }
      const fi = Symbol("_vei");
      const hi = /(?:Once|Passive|Capture)$/;
      let vi = 0;
      const gi = Promise.resolve(),
        mi = () => vi || (gi.then(() => (vi = 0)), (vi = Date.now())),
        yi = (t) =>
          111 === t.charCodeAt(0) &&
          110 === t.charCodeAt(1) &&
          t.charCodeAt(2) > 96 &&
          t.charCodeAt(2) < 123;
      "undefined" != typeof HTMLElement && HTMLElement;
      const bi = (t) => {
          const e = t.props["onUpdate:modelValue"] || !1;
          return k(e) ? (t) => X(e, t) : e;
        },
        xi = Symbol("_assign"),
        _i = {
          deep: !0,
          created(t, e, n) {
            ((t[xi] = bi(n)),
              di(t, "change", () => {
                const e = t._modelValue,
                  n = (function (t) {
                    return "_value" in t ? t._value : t.value;
                  })(t),
                  o = t.checked,
                  r = t[xi];
                if (k(e)) {
                  const t = ut(e, n),
                    i = -1 !== t;
                  if (o && !i) r(e.concat(n));
                  else if (!o && i) {
                    const n = [...e];
                    (n.splice(t, 1), r(n));
                  }
                } else if (P(e)) {
                  const t = new Set(e);
                  (o ? t.add(n) : t.delete(n), r(t));
                } else r(Oi(t, o));
              }));
          },
          mounted: wi,
          beforeUpdate(t, e, n) {
            ((t[xi] = bi(n)), wi(t, e, n));
          },
        };
      function wi(t, { value: e, oldValue: n }, o) {
        let r;
        if (((t._modelValue = e), k(e))) r = ut(e, o.props.value) > -1;
        else if (P(e)) r = e.has(o.props.value);
        else {
          if (e === n) return;
          r = ct(e, Oi(t, !0));
        }
        t.checked !== r && (t.checked = r);
      }
      function Oi(t, e) {
        const n = e ? "_trueValue" : "_falseValue";
        return n in t ? t[n] : e;
      }
      const Ei = ["ctrl", "shift", "alt", "meta"],
        Si = {
          stop: (t) => t.stopPropagation(),
          prevent: (t) => t.preventDefault(),
          self: (t) => t.target !== t.currentTarget,
          ctrl: (t) => !t.ctrlKey,
          shift: (t) => !t.shiftKey,
          alt: (t) => !t.altKey,
          meta: (t) => !t.metaKey,
          left: (t) => "button" in t && 0 !== t.button,
          middle: (t) => "button" in t && 1 !== t.button,
          right: (t) => "button" in t && 2 !== t.button,
          exact: (t, e) => Ei.some((n) => t[`${n}Key`] && !e.includes(n)),
        },
        Ti = (t, e) => {
          if (!t) return t;
          const n = t._withMods || (t._withMods = {}),
            o = e.join(".");
          return (
            n[o] ||
            (n[o] = (n, ...o) => {
              for (let t = 0; t < e.length; t++) {
                const o = Si[e[t]];
                if (o && o(n, e)) return;
              }
              return t(n, ...o);
            })
          );
        },
        Ci = E(
          {
            patchProp: (t, e, n, o, r, i) => {
              const s = "svg" === r;
              "class" === e
                ? (function (t, e, n) {
                    const o = t[ti];
                    (o && (e = (e ? [e, ...o] : [...o]).join(" ")),
                      null == e
                        ? t.removeAttribute("class")
                        : n
                          ? t.setAttribute("class", e)
                          : (t.className = e));
                  })(t, o, s)
                : "style" === e
                  ? (function (t, e, n) {
                      const o = t.style,
                        r = D(n);
                      let i = !1;
                      if (n && !r) {
                        if (e)
                          if (D(e))
                            for (const t of e.split(";")) {
                              const e = t.slice(0, t.indexOf(":")).trim();
                              null == n[e] && si(o, e, "");
                            }
                          else for (const t in e) null == n[t] && si(o, t, "");
                        for (const t in n)
                          ("display" === t && (i = !0), si(o, t, n[t]));
                      } else if (r) {
                        if (e !== n) {
                          const t = o[oi];
                          (t && (n += ";" + t),
                            (o.cssText = n),
                            (i = ri.test(n)));
                        }
                      } else e && t.removeAttribute("style");
                      ei in t &&
                        ((t[ei] = i ? o.display : ""),
                        t[ni] && (o.display = "none"));
                    })(t, n, o)
                  : w(e)
                    ? O(e) ||
                      (function (t, e, n, o, r = null) {
                        const i = t[fi] || (t[fi] = {}),
                          s = i[e];
                        if (o && s) s.value = o;
                        else {
                          const [n, a] = (function (t) {
                            let e;
                            if (hi.test(t)) {
                              let n;
                              for (e = {}; (n = t.match(hi));)
                                ((t = t.slice(0, t.length - n[0].length)),
                                  (e[n[0].toLowerCase()] = !0));
                            }
                            return [
                              ":" === t[2] ? t.slice(3) : z(t.slice(2)),
                              e,
                            ];
                          })(e);
                          if (o) {
                            const s = (i[e] = (function (t, e) {
                              const n = (t) => {
                                if (t._vts) {
                                  if (t._vts <= n.attached) return;
                                } else t._vts = Date.now();
                                Fe(
                                  (function (t, e) {
                                    if (k(e)) {
                                      const n = t.stopImmediatePropagation;
                                      return (
                                        (t.stopImmediatePropagation = () => {
                                          (n.call(t), (t._stopped = !0));
                                        }),
                                        e.map(
                                          (t) => (e) =>
                                            !e._stopped && t && t(e),
                                        )
                                      );
                                    }
                                    return e;
                                  })(t, n.value),
                                  e,
                                  5,
                                  [t],
                                );
                              };
                              return ((n.value = t), (n.attached = mi()), n);
                            })(o, r));
                            di(t, n, s, a);
                          } else
                            s &&
                              ((function (t, e, n, o) {
                                t.removeEventListener(e, n, o);
                              })(t, n, s, a),
                              (i[e] = void 0));
                        }
                      })(t, e, 0, o, i)
                    : (
                          "." === e[0]
                            ? ((e = e.slice(1)), 1)
                            : "^" === e[0]
                              ? ((e = e.slice(1)), 0)
                              : (function (t, e, n, o) {
                                  if (o)
                                    return (
                                      "innerHTML" === e ||
                                      "textContent" === e ||
                                      !!(e in t && yi(e) && j(n))
                                    );
                                  if (
                                    "spellcheck" === e ||
                                    "draggable" === e ||
                                    "translate" === e ||
                                    "autocorrect" === e
                                  )
                                    return !1;
                                  if ("sandbox" === e && "IFRAME" === t.tagName)
                                    return !1;
                                  if ("form" === e) return !1;
                                  if ("list" === e && "INPUT" === t.tagName)
                                    return !1;
                                  if ("type" === e && "TEXTAREA" === t.tagName)
                                    return !1;
                                  if ("width" === e || "height" === e) {
                                    const e = t.tagName;
                                    if (
                                      "IMG" === e ||
                                      "VIDEO" === e ||
                                      "CANVAS" === e ||
                                      "SOURCE" === e
                                    )
                                      return !1;
                                  }
                                  return (!yi(e) || !D(n)) && e in t;
                                })(t, e, o, s)
                        )
                      ? (pi(t, e, o),
                        t.tagName.includes("-") ||
                          ("value" !== e &&
                            "checked" !== e &&
                            "selected" !== e) ||
                          ui(t, e, o, s, 0, "value" !== e))
                      : t._isVueCE &&
                          ((function (t, e) {
                            const n = t._def.props;
                            if (!n) return !1;
                            const o = W(e);
                            return Array.isArray(n)
                              ? n.some((t) => W(t) === o)
                              : Object.keys(n).some((t) => W(t) === o);
                          })(t, e) ||
                            (t._def.__asyncLoader &&
                              (/[A-Z]/.test(e) || !D(o))))
                        ? pi(t, W(e), o, 0, e)
                        : ("true-value" === e
                            ? (t._trueValue = o)
                            : "false-value" === e && (t._falseValue = o),
                          ui(t, e, o, s));
            },
          },
          Zr,
        );
      let ki;
      const Ai = (...t) => {
        const e = (ki || (ki = Xo(Ci))).createApp(...t),
          { mount: n } = e;
        return (
          (e.mount = (t) => {
            const o = (function (t) {
              if (D(t)) return document.querySelector(t);
              return t;
            })(t);
            if (!o) return;
            const r = e._component;
            (j(r) || r.render || r.template || (r.template = o.innerHTML),
              1 === o.nodeType && (o.textContent = ""));
            const i = n(
              o,
              !1,
              (function (t) {
                return t instanceof SVGElement
                  ? "svg"
                  : "function" == typeof MathMLElement &&
                      t instanceof MathMLElement
                    ? "mathml"
                    : void 0;
              })(o),
            );
            return (
              o instanceof Element &&
                (o.removeAttribute("v-cloak"),
                o.setAttribute("data-v-app", "")),
              i
            );
          }),
          e
        );
      };
      const Pi = { key: 0, class: "form-section", id: "form-section" },
        Li = ["action"],
        ji = { class: "options-group" },
        Di = { class: "action-group" },
        Ii = { key: 0, class: "download-input-container" },
        Ni = { class: "download-controls-container" },
        Ri = { key: 0, id: "select-value-extension-container" },
        Mi = ["value"],
        Vi = { class: "text-input-link", id: "text-input-link" },
        Hi = ["placeholder", "data-type"],
        Ui = {
          name: "textinput",
          props: { placeholder: String, dataType: String },
        };
      var Bi = n(6262);
      const Fi = (0, Bi.A)(Ui, [
          [
            "render",
            function (t, e, n, o, r, i) {
              return (
                ur(),
                hr("div", Vi, [
                  xr(
                    "input",
                    {
                      type: "text",
                      name: "text-input-value",
                      id: "text-input-value",
                      placeholder: n.placeholder,
                      "data-type": n.dataType,
                    },
                    null,
                    8,
                    Hi,
                  ),
                ])
              );
            },
          ],
          ["__scopeId", "data-v-071f026e"],
        ]),
        $i = { class: "search-input", id: "nc-vue-search-input" },
        Wi = { class: "search-controls-container" },
        qi = { id: "select-value-search-container" },
        zi = ["value"],
        Ki = ["value"],
        Yi = { key: 1, class: "bs-spinner" },
        Ji = {
          data: () => ({ loading: 0 }),
          methods: {
            handler(t) {
              (this.enableLoading && (this.loading = 1),
                this.$emit("clicked", t, this));
            },
          },
          name: "actionButton",
          props: {
            className: String,
            enableLoading: { type: Boolean, default: !1 },
            btnType: { type: String, default: "" },
            action: { type: String, default: "" },
          },
        },
        Xi = (0, Bi.A)(Ji, [
          [
            "render",
            function (t, e, n, o, r, i) {
              return (
                ur(),
                hr(
                  rr,
                  null,
                  [
                    1 ^ r.loading
                      ? (ur(),
                        hr(
                          "button",
                          {
                            key: 0,
                            ref: "button",
                            class: st(["button-vue", n.className]),
                            onClick:
                              e[0] ||
                              (e[0] = Ti(
                                function () {
                                  return i.handler && i.handler(...arguments);
                                },
                                ["prevent"],
                              )),
                          },
                          [
                            oo(
                              t.$slots,
                              "default",
                              {},
                              () => [e[1] || (e[1] = Or(OC.L10N.translate('vapor','Download'), -1))],
                              !0,
                            ),
                          ],
                          2,
                        ))
                      : Sr("", !0),
                    r.loading
                      ? (ur(),
                        hr("button", Yi, [
                          ...(e[2] ||
                            (e[2] = [
                              xr(
                                "span",
                                {
                                  class: "spinner-border spinner-border-sm",
                                  role: "status",
                                  "aria-hidden": "true",
                                  disabled: "",
                                },
                                null,
                                -1,
                              ),
                              xr(
                                "span",
                                { class: "visually-hidden" },
                                "Loading...",
                                -1,
                              ),
                            ])),
                        ]))
                      : Sr("", !0),
                  ],
                  64,
                )
              );
            },
          ],
          ["__scopeId", "data-v-39a2f65c"],
        ]),
        Gi = {
          data: () => ({
            placeholder: (0, r.Tl)("vapor", "Enter keyword to search"),
            selected: "TPB",
          }),
          components: { textInput: Fi, actionButton: Xi },
          methods: {
            search(t, e) {
              this.$emit("search", t, e);
            },
            selectHandler(t) {
              const e = {},
                n = t.target;
              ((e.key = n.value),
                (e.label = n.options[n.selectedIndex].text),
                this.$emit("optionSelected", e));
            },
          },
          name: "searchInput",
          props: { selectOptions: Object },
        },
        Qi = (0, Bi.A)(Gi, [
          [
            "render",
            function (t, e, n, o, r, i) {
              const s = Zn("textInput"),
                a = Zn("actionButton");
              return (
                ur(),
                hr("div", $i, [
                  _r(
                    s,
                    { placeholder: r.placeholder, dataType: "search" },
                    null,
                    8,
                    ["placeholder"],
                  ),
                  xr("div", Wi, [
                    xr("div", qi, [
                      xr(
                        "select",
                        {
                          value: r.selected,
                          onChange:
                            e[0] ||
                            (e[0] = function () {
                              return (
                                i.selectHandler && i.selectHandler(...arguments)
                              );
                            }),
                          id: "select-value-search",
                        },
                        [
                          (ur(!0),
                          hr(
                            rr,
                            null,
                            no(
                              n.selectOptions,
                              (t, e) => (
                                ur(),
                                hr(
                                  "option",
                                  { key: e, value: t.name },
                                  dt(t.label),
                                  9,
                                  Ki,
                                )
                              ),
                            ),
                            128,
                          )),
                        ],
                        40,
                        zi,
                      ),
                    ]),
                    _r(
                      a,
                      {
                        className: "search-button",
                        enableLoading: !0,
                        onClicked: i.search,
                      },
                      {
                        default: mn(() => [
                          ...(e[1] || (e[1] = [Or(OC.L10N.translate('vapor','Search'), -1)])),
                        ]),
                        _: 1,
                      },
                      8,
                      ["onClicked"],
                    ),
                  ]),
                ])
              );
            },
          ],
          ["__scopeId", "data-v-616a1668"],
        ]),
        Zi = ["action"],
        ts = { class: "icon-upload fileinput" },
        es = {
          name: "uploadFile",
          methods: {
            handler(t) {
              this.$emit("uploadfile", t, this);
            },
          },
          props: ["path"],
        },
        ns = (0, Bi.A)(es, [
          [
            "render",
            function (t, e, n, o, r, i) {
              return (
                ur(),
                hr(
                  "form",
                  {
                    class: "upload-file-form",
                    id: "nc-vue-upload-file-form",
                    action: n.path,
                  },
                  [
                    xr("div", ts, [
                      xr(
                        "input",
                        {
                          type: "file",
                          name: "torrentfile",
                          id: "torrentfile",
                          accept: ".torrent",
                          onChange:
                            e[0] ||
                            (e[0] = function () {
                              return i.handler && i.handler(...arguments);
                            }),
                        },
                        null,
                        32,
                      ),
                    ]),
                  ],
                  8,
                  Zi,
                )
              );
            },
          ],
          ["__scopeId", "data-v-dd0fd24c"],
        ]),
        os = ["data-path"],
        rs = {
          name: "folderSettings",
          methods: {
            handler(t) {
              let e = t.target,
                n = e.hasAttribute("data-path")
                  ? e.getAttribute("data-path")
                  : void 0;
              f.filepicker(function (t) {
                if (e.getAttribute("data-path") == t)
                  return void f.info("Same folder,No need to update");
                let n = { ncd_downloader_dir: t },
                  o = f.generateUrl("/apps/vapor/personal/save");
                f.httpClient(o)
                  .setData(n)
                  .setHandler((e) => {
                    e.status && f.info("Download folder updated to " + t);
                  })
                  .send();
              }, n);
            },
          },
          props: ["path"],
        },
        is = (0, Bi.A)(rs, [
          [
            "render",
            function (t, e, n, o, r, i) {
              return (
                ur(),
                hr(
                  "div",
                  {
                    onClick:
                      e[0] ||
                      (e[0] = function () {
                        return i.handler && i.handler(...arguments);
                      }),
                    class: "downloader-folder-settings",
                    "data-tippy-content": "Set Download Folder",
                    "data-path": n.path,
                  },
                  null,
                  8,
                  os,
                )
              );
            },
          ],
          ["__scopeId", "data-v-7fcbec17"],
        ]),
        ss = {
          inject: ["settings", "search_sites"],
          data() {
            return {
              checkedValue: !1,
              path: this.uris.aria2_url,
              dlPath: this.settings.settings.ncd_downloader_dir,
              inputType: "download",
              checkboxes: !1,
              downloadType: "aria2",
              placeholder: (0, r.Tl)(
                "vapor",
                "Paste your http/magnet link here",
              ),
              searchLabel: (0, r.Tl)("vapor", "Search Torrents"),
              searchOptions: this.search_sites
                ? this.search_sites
                : this.noOptions(),
              selectedExt: "defaultext",
            };
          },
          components: {
            textInput: Fi,
            actionButton: Xi,
            searchInput: Qi,
            uploadFile: ns,
            folderSettings: is,
          },
          created() {},
          computed: {},
          methods: {
            whichType(t, e) {
              let n = e.target;
              (document.querySelectorAll(".option-buttons").forEach((t) => {
                t.classList.remove("active-button");
              }),
                n.classList.toggle("active-button"),
                (this.downloadType = t),
                "aria2" === t
                  ? (this.path = this.uris.aria2_url)
                  : "ytdl" === t
                    ? ((this.placeholder = (0, r.Tl)(
                        "vapor",
                        "Paste your video link here",
                      )),
                      (this.path = this.uris.ytd_url))
                    : (this.path = this.uris.search_url),
                (this.checkboxes = "ytdl" === t),
                (this.inputType = "search" === t ? "search" : "download"));
            },
            download(t) {
              this.$emit("download", t);
            },
            search(t, e) {
              this.$emit("search", t, e);
            },
            uploadFile(t, e) {
              this.$emit("uploadfile", t, e);
            },
            optionCallback(t) {
              "music" == t.label.toLowerCase()
                ? (this.searchLabel = (0, r.Tl)("vapor", "Search Music"))
                : (this.searchLabel = (0, r.Tl)("vapor", "Search Torrents"));
            },
            noOptions: () => [{ name: "nooptions", label: "No Options" }],
          },
          mounted() {},
          name: "mainForm",
          props: { uris: Object, uri: String },
        },
        as = (0, Bi.A)(ss, [
          [
            "render",
            function (t, e, n, o, r, i) {
              const s = Zn("textInput"),
                a = Zn("actionButton"),
                l = Zn("uploadFile"),
                c = Zn("folderSettings"),
                u = Zn("searchInput");
              return (
                ur(),
                hr(
                  "form",
                  {
                    class: "main-form",
                    id: "nc-vue-unified-form",
                    action: r.path,
                  },
                  [
                    xr("div", ji, [
                      xr(
                        "div",
                        {
                          class:
                            "magnet-link http-link option-buttons active-button",
                          onClick:
                            e[0] ||
                            (e[0] = Ti(
                              (t) => i.whichType("aria2", t),
                              ["prevent"],
                            )),
                        },
                        " HTTP/MAGNET ",
                      ),
                      xr(
                        "div",
                        {
                          class: "ytdl-link option-buttons",
                          onClick:
                            e[1] ||
                            (e[1] = Ti(
                              (t) => i.whichType("ytdl", t),
                              ["prevent"],
                            )),
                        },
                        " Youtube-dl ",
                      ),
                      xr(
                        "div",
                        {
                          class: "search-torrents option-buttons",
                          onClick:
                            e[2] ||
                            (e[2] = Ti(
                              (t) => i.whichType("search", t),
                              ["prevent"],
                            )),
                        },
                        dt(r.searchLabel),
                        1,
                      ),
                    ]),
                    xr("div", Di, [
                      "download" === r.inputType
                        ? (ur(),
                          hr("div", Ii, [
                            _r(
                              s,
                              {
                                placeholder: r.placeholder,
                                dataType: r.downloadType,
                              },
                              null,
                              8,
                              ["placeholder", "dataType"],
                            ),
                            xr("div", Ni, [
                              r.checkboxes
                                ? (ur(),
                                  hr("div", Ri, [
                                    xr(
                                      "select",
                                      {
                                        value: r.selectedExt,
                                        id: "select-value-extension",
                                      },
                                      [
                                        ...(e[3] ||
                                          (e[3] = [
                                            Er(
                                              '<option id="defaultext" value="defaultext">Default</option><optgroup label="Video"><option id="mp4" value="mp4">mp4</option><option id="webm" value="webm">webm</option></optgroup><optgroup label="Audio"><option id="m4a" value="m4a">m4a</option><option id="mp3" value="mp3">mp3</option><option id="vorbis" value="vorbis">vorbis</option><option id="opus" value="opus">opus</option></optgroup>',
                                              3,
                                            ),
                                          ])),
                                      ],
                                      8,
                                      Mi,
                                    ),
                                  ]))
                                : Sr("", !0),
                              _r(
                                a,
                                {
                                  className: "download-button",
                                  onClicked: i.download,
                                },
                                null,
                                8,
                                ["onClicked"],
                              ),
                              "aria2" === r.downloadType
                                ? (ur(),
                                  vr(
                                    l,
                                    {
                                      key: 1,
                                      onUploadfile: i.uploadFile,
                                      path: n.uris.upload_url,
                                    },
                                    null,
                                    8,
                                    ["onUploadfile", "path"],
                                  ))
                                : Sr("", !0),
                              _r(c, { path: r.dlPath }, null, 8, ["path"]),
                            ]),
                          ]))
                        : (ur(),
                          vr(
                            u,
                            {
                              key: 1,
                              onSearch: i.search,
                              onOptionSelected: i.optionCallback,
                              selectOptions: r.searchOptions,
                            },
                            null,
                            8,
                            ["onSearch", "onOptionSelected", "selectOptions"],
                          )),
                    ]),
                  ],
                  8,
                  Li,
                )
              );
            },
          ],
        ]),
        ls = ["for"],
        cs = { class: "toggle-label" },
        us = ["disabled", "id", "name", "value"],
        ps = {
          name: "toggleButton",
          props: {
            disabled: { type: Boolean, default: !1 },
            enabledText: { type: String, default: "On" },
            disabledText: { type: String, default: "Off" },
            name: { type: String, default: "check-button" },
            defaultStatus: { type: Boolean, default: !1 },
          },
          methods: {},
          data() {
            return { status: this.defaultStatus };
          },
          watch: {
            defaultStatus() {
              this.status = Boolean(this.defaultStatus);
            },
          },
          computed: {
            isActive() {
              return this.status;
            },
            text() {
              return this.status ? this.disabledText : this.enabledText;
            },
            inputValue: {
              get() {
                return this.status;
              },
              set(t) {
                ((this.status = t), this.$emit("changed", this.name, t));
              },
            },
          },
        },
        ds = (0, Bi.A)(ps, [
          [
            "render",
            function (t, e, n, o, r, i) {
              return (
                ur(),
                hr(
                  "label",
                  {
                    for: n.name,
                    class: st([{ active: i.isActive }, "toggle-button"]),
                  },
                  [
                    xr("span", cs, dt(i.text), 1),
                    yn(
                      xr(
                        "input",
                        {
                          type: "checkbox",
                          disabled: n.disabled,
                          id: n.name,
                          name: n.name,
                          value: t.value,
                          "onUpdate:modelValue":
                            e[0] || (e[0] = (t) => (i.inputValue = t)),
                        },
                        null,
                        8,
                        us,
                      ),
                      [[_i, i.inputValue]],
                    ),
                    e[1] ||
                      (e[1] = xr("span", { class: "toggle-switch" }, null, -1)),
                  ],
                  10,
                  ls,
                )
              );
            },
          ],
          ["__scopeId", "data-v-c0727916"],
        ]),
        fs = (t, e) => {
          t
            ? t.hasOwnProperty("error")
              ? f.error((0, r.Tl)("vapor", t.error))
              : t.hasOwnProperty("duplicate")
                ? f._message((0, r.Tl)("vapor", t.message), {
                    duration: 15e3,
                    backgroundColor: "#1976d2",
                  })
                : t.hasOwnProperty("message")
                  ? f.message((0, r.Tl)("vapor", t.message))
                  : t.hasOwnProperty("file") &&
                    f.message((0, r.Tl)("vapor", "Downloading " + t.file))
            : f.error((0, r.Tl)("vapor", "Something must have gone wrong!"));
        },
        hs = {
          name: "mainApp",
          inject: ["settings"],
          provide() {
            return { search_sites: this.settings.search_sites };
          },
          data: () => ({
            display: { download: !0, search: !1 },
            uris: {
              ytd_url: f.generateUrl("/apps/vapor/ytdl/new"),
              aria2_url: f.generateUrl("/apps/vapor/new"),
              search_url: f.generateUrl("/apps/vapor/search"),
              upload_url: f.generateUrl("/apps/vapor/upload"),
            },
          }),
          created() {},
          methods: {
            download(t) {
              let e,
                n = t.target.closest("form"),
                o = f.getData(n),
                i = o["text-input-value"].trim();
              if (!f.isURL(i) && !f.isMagnetURI(i))
                return void f.error((0, r.Tl)("vapor", i + " is Invalid"));
              ("ytdl" === o.type
                ? ((o.extension = ""),
                  "defaultext" !== o["select-value-extension"] &&
                    (o.extension = o["select-value-extension"]),
                  (e = f.t("Download task started!")),
                  f.pollingYtdl(),
                  f.setContentTableType("ytdl-downloads"))
                : (f.polling(), f.setContentTableType("active-downloads")),
                e && f.info(e));
              let s = n.getAttribute("action");
              ((o.url = o["text-input-value"]),
                delete o["text-input-value"],
                f
                  .httpClient(s)
                  .setData(o)
                  .setHandler(function (t) {
                    fs(t);
                  })
                  .send());
            },
            search(t, e) {
              let n = t.target.closest("form"),
                o = f.getData(n),
                i = o["text-input-value"];
              if (!i || (i && i.length < 2))
                return (
                  f.error((0, r.Tl)("vapor", "Please enter valid keyword!")),
                  void (e.$data.loading = 0)
                );
              (f.disablePolling(), s.getInstance().loading());
              let a = n.getAttribute("action");
              ((o.keyword = o["text-input-value"]),
                (o.site = o["select-value-search"]),
                delete o["text-input-value"],
                delete o["select-value-search"],
                f
                  .httpClient(a)
                  .setData(o)
                  .setHandler(function (t) {
                    if (t && t.title) {
                      e.$data.loading = 0;
                      const n = s.getInstance(t.title, t.row);
                      ((n.actionLink = !1),
                        (n.rowClass = "table-row-search"),
                        n.create());
                    }
                    t.error && (f.resetSearch(e), f.error(t.error));
                  })
                  .send());
            },
            uploadFile(t, e) {
              let n = t.target;
              const o = n.files || t.dataTransfer.files;
              if (o) {
                let t = n.closest("form").getAttribute("action");
                return f
                  .httpClient(t)
                  .setHandler(function (t) {
                    fs(t);
                  })
                  .upload(o[0]);
              }
              return !1;
            },
          },
          components: { mainForm: as, toggleButton: ds },
          mounted() {},
        },
        vs = (0, Bi.A)(hs, [
          [
            "render",
            function (t, e, n, o, r, i) {
              const s = Zn("mainForm");
              return r.display.download
                ? (ur(),
                  hr("section", Pi, [
                    _r(
                      s,
                      {
                        onDownload: i.download,
                        onSearch: i.search,
                        onUploadfile: i.uploadFile,
                        uris: r.uris,
                      },
                      null,
                      8,
                      ["onDownload", "onSearch", "onUploadfile", "uris"],
                    ),
                  ]))
                : Sr("", !0);
            },
          ],
        ]);
      function gs(t) {
        if (null == t) return window;
        if ("[object Window]" !== t.toString()) {
          var e = t.ownerDocument;
          return (e && e.defaultView) || window;
        }
        return t;
      }
      function ms(t) {
        return t instanceof gs(t).Element || t instanceof Element;
      }
      function ys(t) {
        return t instanceof gs(t).HTMLElement || t instanceof HTMLElement;
      }
      function bs(t) {
        return (
          "undefined" != typeof ShadowRoot &&
          (t instanceof gs(t).ShadowRoot || t instanceof ShadowRoot)
        );
      }
      var xs = Math.max,
        _s = Math.min,
        ws = Math.round;
      function Os() {
        var t = navigator.userAgentData;
        return null != t && t.brands && Array.isArray(t.brands)
          ? t.brands
              .map(function (t) {
                return t.brand + "/" + t.version;
              })
              .join(" ")
          : navigator.userAgent;
      }
      function Es() {
        return !/^((?!chrome|android).)*safari/i.test(Os());
      }
      function Ss(t, e, n) {
        (void 0 === e && (e = !1), void 0 === n && (n = !1));
        var o = t.getBoundingClientRect(),
          r = 1,
          i = 1;
        e &&
          ys(t) &&
          ((r = (t.offsetWidth > 0 && ws(o.width) / t.offsetWidth) || 1),
          (i = (t.offsetHeight > 0 && ws(o.height) / t.offsetHeight) || 1));
        var s = (ms(t) ? gs(t) : window).visualViewport,
          a = !Es() && n,
          l = (o.left + (a && s ? s.offsetLeft : 0)) / r,
          c = (o.top + (a && s ? s.offsetTop : 0)) / i,
          u = o.width / r,
          p = o.height / i;
        return {
          width: u,
          height: p,
          top: c,
          right: l + u,
          bottom: c + p,
          left: l,
          x: l,
          y: c,
        };
      }
      function Ts(t) {
        var e = gs(t);
        return { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
      }
      function Cs(t) {
        return t ? (t.nodeName || "").toLowerCase() : null;
      }
      function ks(t) {
        return ((ms(t) ? t.ownerDocument : t.document) || window.document)
          .documentElement;
      }
      function As(t) {
        return Ss(ks(t)).left + Ts(t).scrollLeft;
      }
      function Ps(t) {
        return gs(t).getComputedStyle(t);
      }
      function Ls(t) {
        var e = Ps(t),
          n = e.overflow,
          o = e.overflowX,
          r = e.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + r + o);
      }
      function js(t, e, n) {
        void 0 === n && (n = !1);
        var o,
          r,
          i = ys(e),
          s =
            ys(e) &&
            (function (t) {
              var e = t.getBoundingClientRect(),
                n = ws(e.width) / t.offsetWidth || 1,
                o = ws(e.height) / t.offsetHeight || 1;
              return 1 !== n || 1 !== o;
            })(e),
          a = ks(e),
          l = Ss(t, s, n),
          c = { scrollLeft: 0, scrollTop: 0 },
          u = { x: 0, y: 0 };
        return (
          (i || (!i && !n)) &&
            (("body" !== Cs(e) || Ls(a)) &&
              (c =
                (o = e) !== gs(o) && ys(o)
                  ? { scrollLeft: (r = o).scrollLeft, scrollTop: r.scrollTop }
                  : Ts(o)),
            ys(e)
              ? (((u = Ss(e, !0)).x += e.clientLeft), (u.y += e.clientTop))
              : a && (u.x = As(a))),
          {
            x: l.left + c.scrollLeft - u.x,
            y: l.top + c.scrollTop - u.y,
            width: l.width,
            height: l.height,
          }
        );
      }
      function Ds(t) {
        var e = Ss(t),
          n = t.offsetWidth,
          o = t.offsetHeight;
        return (
          Math.abs(e.width - n) <= 1 && (n = e.width),
          Math.abs(e.height - o) <= 1 && (o = e.height),
          { x: t.offsetLeft, y: t.offsetTop, width: n, height: o }
        );
      }
      function Is(t) {
        return "html" === Cs(t)
          ? t
          : t.assignedSlot || t.parentNode || (bs(t) ? t.host : null) || ks(t);
      }
      function Ns(t) {
        return ["html", "body", "#document"].indexOf(Cs(t)) >= 0
          ? t.ownerDocument.body
          : ys(t) && Ls(t)
            ? t
            : Ns(Is(t));
      }
      function Rs(t, e) {
        var n;
        void 0 === e && (e = []);
        var o = Ns(t),
          r = o === (null == (n = t.ownerDocument) ? void 0 : n.body),
          i = gs(o),
          s = r ? [i].concat(i.visualViewport || [], Ls(o) ? o : []) : o,
          a = e.concat(s);
        return r ? a : a.concat(Rs(Is(s)));
      }
      function Ms(t) {
        return ["table", "td", "th"].indexOf(Cs(t)) >= 0;
      }
      function Vs(t) {
        return ys(t) && "fixed" !== Ps(t).position ? t.offsetParent : null;
      }
      function Hs(t) {
        for (
          var e = gs(t), n = Vs(t);
          n && Ms(n) && "static" === Ps(n).position;
        )
          n = Vs(n);
        return n &&
          ("html" === Cs(n) ||
            ("body" === Cs(n) && "static" === Ps(n).position))
          ? e
          : n ||
              (function (t) {
                var e = /firefox/i.test(Os());
                if (
                  /Trident/i.test(Os()) &&
                  ys(t) &&
                  "fixed" === Ps(t).position
                )
                  return null;
                var n = Is(t);
                for (
                  bs(n) && (n = n.host);
                  ys(n) && ["html", "body"].indexOf(Cs(n)) < 0;
                ) {
                  var o = Ps(n);
                  if (
                    "none" !== o.transform ||
                    "none" !== o.perspective ||
                    "paint" === o.contain ||
                    -1 !== ["transform", "perspective"].indexOf(o.willChange) ||
                    (e && "filter" === o.willChange) ||
                    (e && o.filter && "none" !== o.filter)
                  )
                    return n;
                  n = n.parentNode;
                }
                return null;
              })(t) ||
              e;
      }
      var Us = "top",
        Bs = "bottom",
        Fs = "right",
        $s = "left",
        Ws = "auto",
        qs = [Us, Bs, Fs, $s],
        zs = "start",
        Ks = "end",
        Ys = "viewport",
        Js = "popper",
        Xs = qs.reduce(function (t, e) {
          return t.concat([e + "-" + zs, e + "-" + Ks]);
        }, []),
        Gs = [].concat(qs, [Ws]).reduce(function (t, e) {
          return t.concat([e, e + "-" + zs, e + "-" + Ks]);
        }, []),
        Qs = [
          "beforeRead",
          "read",
          "afterRead",
          "beforeMain",
          "main",
          "afterMain",
          "beforeWrite",
          "write",
          "afterWrite",
        ];
      function Zs(t) {
        var e = new Map(),
          n = new Set(),
          o = [];
        function r(t) {
          (n.add(t.name),
            []
              .concat(t.requires || [], t.requiresIfExists || [])
              .forEach(function (t) {
                if (!n.has(t)) {
                  var o = e.get(t);
                  o && r(o);
                }
              }),
            o.push(t));
        }
        return (
          t.forEach(function (t) {
            e.set(t.name, t);
          }),
          t.forEach(function (t) {
            n.has(t.name) || r(t);
          }),
          o
        );
      }
      var ta = { placement: "bottom", modifiers: [], strategy: "absolute" };
      function ea() {
        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
          e[n] = arguments[n];
        return !e.some(function (t) {
          return !(t && "function" == typeof t.getBoundingClientRect);
        });
      }
      function na(t) {
        void 0 === t && (t = {});
        var e = t,
          n = e.defaultModifiers,
          o = void 0 === n ? [] : n,
          r = e.defaultOptions,
          i = void 0 === r ? ta : r;
        return function (t, e, n) {
          void 0 === n && (n = i);
          var r,
            s,
            a = {
              placement: "bottom",
              orderedModifiers: [],
              options: Object.assign({}, ta, i),
              modifiersData: {},
              elements: { reference: t, popper: e },
              attributes: {},
              styles: {},
            },
            l = [],
            c = !1,
            u = {
              state: a,
              setOptions: function (n) {
                var r = "function" == typeof n ? n(a.options) : n;
                (p(),
                  (a.options = Object.assign({}, i, a.options, r)),
                  (a.scrollParents = {
                    reference: ms(t)
                      ? Rs(t)
                      : t.contextElement
                        ? Rs(t.contextElement)
                        : [],
                    popper: Rs(e),
                  }));
                var s,
                  c,
                  d = (function (t) {
                    var e = Zs(t);
                    return Qs.reduce(function (t, n) {
                      return t.concat(
                        e.filter(function (t) {
                          return t.phase === n;
                        }),
                      );
                    }, []);
                  })(
                    ((s = [].concat(o, a.options.modifiers)),
                    (c = s.reduce(function (t, e) {
                      var n = t[e.name];
                      return (
                        (t[e.name] = n
                          ? Object.assign({}, n, e, {
                              options: Object.assign({}, n.options, e.options),
                              data: Object.assign({}, n.data, e.data),
                            })
                          : e),
                        t
                      );
                    }, {})),
                    Object.keys(c).map(function (t) {
                      return c[t];
                    })),
                  );
                return (
                  (a.orderedModifiers = d.filter(function (t) {
                    return t.enabled;
                  })),
                  a.orderedModifiers.forEach(function (t) {
                    var e = t.name,
                      n = t.options,
                      o = void 0 === n ? {} : n,
                      r = t.effect;
                    if ("function" == typeof r) {
                      var i = r({ state: a, name: e, instance: u, options: o });
                      l.push(i || function () {});
                    }
                  }),
                  u.update()
                );
              },
              forceUpdate: function () {
                if (!c) {
                  var t = a.elements,
                    e = t.reference,
                    n = t.popper;
                  if (ea(e, n)) {
                    ((a.rects = {
                      reference: js(e, Hs(n), "fixed" === a.options.strategy),
                      popper: Ds(n),
                    }),
                      (a.reset = !1),
                      (a.placement = a.options.placement),
                      a.orderedModifiers.forEach(function (t) {
                        return (a.modifiersData[t.name] = Object.assign(
                          {},
                          t.data,
                        ));
                      }));
                    for (var o = 0; o < a.orderedModifiers.length; o++)
                      if (!0 !== a.reset) {
                        var r = a.orderedModifiers[o],
                          i = r.fn,
                          s = r.options,
                          l = void 0 === s ? {} : s,
                          p = r.name;
                        "function" == typeof i &&
                          (a =
                            i({ state: a, options: l, name: p, instance: u }) ||
                            a);
                      } else ((a.reset = !1), (o = -1));
                  }
                }
              },
              update:
                ((r = function () {
                  return new Promise(function (t) {
                    (u.forceUpdate(), t(a));
                  });
                }),
                function () {
                  return (
                    s ||
                      (s = new Promise(function (t) {
                        Promise.resolve().then(function () {
                          ((s = void 0), t(r()));
                        });
                      })),
                    s
                  );
                }),
              destroy: function () {
                (p(), (c = !0));
              },
            };
          if (!ea(t, e)) return u;
          function p() {
            (l.forEach(function (t) {
              return t();
            }),
              (l = []));
          }
          return (
            u.setOptions(n).then(function (t) {
              !c && n.onFirstUpdate && n.onFirstUpdate(t);
            }),
            u
          );
        };
      }
      var oa = { passive: !0 };
      function ra(t) {
        return t.split("-")[0];
      }
      function ia(t) {
        return t.split("-")[1];
      }
      function sa(t) {
        return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
      }
      function aa(t) {
        var e,
          n = t.reference,
          o = t.element,
          r = t.placement,
          i = r ? ra(r) : null,
          s = r ? ia(r) : null,
          a = n.x + n.width / 2 - o.width / 2,
          l = n.y + n.height / 2 - o.height / 2;
        switch (i) {
          case Us:
            e = { x: a, y: n.y - o.height };
            break;
          case Bs:
            e = { x: a, y: n.y + n.height };
            break;
          case Fs:
            e = { x: n.x + n.width, y: l };
            break;
          case $s:
            e = { x: n.x - o.width, y: l };
            break;
          default:
            e = { x: n.x, y: n.y };
        }
        var c = i ? sa(i) : null;
        if (null != c) {
          var u = "y" === c ? "height" : "width";
          switch (s) {
            case zs:
              e[c] = e[c] - (n[u] / 2 - o[u] / 2);
              break;
            case Ks:
              e[c] = e[c] + (n[u] / 2 - o[u] / 2);
          }
        }
        return e;
      }
      var la = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
      function ca(t) {
        var e,
          n = t.popper,
          o = t.popperRect,
          r = t.placement,
          i = t.variation,
          s = t.offsets,
          a = t.position,
          l = t.gpuAcceleration,
          c = t.adaptive,
          u = t.roundOffsets,
          p = t.isFixed,
          d = s.x,
          f = void 0 === d ? 0 : d,
          h = s.y,
          v = void 0 === h ? 0 : h,
          g = "function" == typeof u ? u({ x: f, y: v }) : { x: f, y: v };
        ((f = g.x), (v = g.y));
        var m = s.hasOwnProperty("x"),
          y = s.hasOwnProperty("y"),
          b = $s,
          x = Us,
          _ = window;
        if (c) {
          var w = Hs(n),
            O = "clientHeight",
            E = "clientWidth";
          (w === gs(n) &&
            "static" !== Ps((w = ks(n))).position &&
            "absolute" === a &&
            ((O = "scrollHeight"), (E = "scrollWidth")),
            (r === Us || ((r === $s || r === Fs) && i === Ks)) &&
              ((x = Bs),
              (v -=
                (p && w === _ && _.visualViewport
                  ? _.visualViewport.height
                  : w[O]) - o.height),
              (v *= l ? 1 : -1)),
            (r !== $s && ((r !== Us && r !== Bs) || i !== Ks)) ||
              ((b = Fs),
              (f -=
                (p && w === _ && _.visualViewport
                  ? _.visualViewport.width
                  : w[E]) - o.width),
              (f *= l ? 1 : -1)));
        }
        var S,
          T = Object.assign({ position: a }, c && la),
          C =
            !0 === u
              ? (function (t, e) {
                  var n = t.x,
                    o = t.y,
                    r = e.devicePixelRatio || 1;
                  return { x: ws(n * r) / r || 0, y: ws(o * r) / r || 0 };
                })({ x: f, y: v }, gs(n))
              : { x: f, y: v };
        return (
          (f = C.x),
          (v = C.y),
          l
            ? Object.assign(
                {},
                T,
                (((S = {})[x] = y ? "0" : ""),
                (S[b] = m ? "0" : ""),
                (S.transform =
                  (_.devicePixelRatio || 1) <= 1
                    ? "translate(" + f + "px, " + v + "px)"
                    : "translate3d(" + f + "px, " + v + "px, 0)"),
                S),
              )
            : Object.assign(
                {},
                T,
                (((e = {})[x] = y ? v + "px" : ""),
                (e[b] = m ? f + "px" : ""),
                (e.transform = ""),
                e),
              )
        );
      }
      const ua = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function (t) {
          var e = t.state;
          Object.keys(e.elements).forEach(function (t) {
            var n = e.styles[t] || {},
              o = e.attributes[t] || {},
              r = e.elements[t];
            ys(r) &&
              Cs(r) &&
              (Object.assign(r.style, n),
              Object.keys(o).forEach(function (t) {
                var e = o[t];
                !1 === e
                  ? r.removeAttribute(t)
                  : r.setAttribute(t, !0 === e ? "" : e);
              }));
          });
        },
        effect: function (t) {
          var e = t.state,
            n = {
              popper: {
                position: e.options.strategy,
                left: "0",
                top: "0",
                margin: "0",
              },
              arrow: { position: "absolute" },
              reference: {},
            };
          return (
            Object.assign(e.elements.popper.style, n.popper),
            (e.styles = n),
            e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow),
            function () {
              Object.keys(e.elements).forEach(function (t) {
                var o = e.elements[t],
                  r = e.attributes[t] || {},
                  i = Object.keys(
                    e.styles.hasOwnProperty(t) ? e.styles[t] : n[t],
                  ).reduce(function (t, e) {
                    return ((t[e] = ""), t);
                  }, {});
                ys(o) &&
                  Cs(o) &&
                  (Object.assign(o.style, i),
                  Object.keys(r).forEach(function (t) {
                    o.removeAttribute(t);
                  }));
              });
            }
          );
        },
        requires: ["computeStyles"],
      };
      var pa = { left: "right", right: "left", bottom: "top", top: "bottom" };
      function da(t) {
        return t.replace(/left|right|bottom|top/g, function (t) {
          return pa[t];
        });
      }
      var fa = { start: "end", end: "start" };
      function ha(t) {
        return t.replace(/start|end/g, function (t) {
          return fa[t];
        });
      }
      function va(t, e) {
        var n = e.getRootNode && e.getRootNode();
        if (t.contains(e)) return !0;
        if (n && bs(n)) {
          var o = e;
          do {
            if (o && t.isSameNode(o)) return !0;
            o = o.parentNode || o.host;
          } while (o);
        }
        return !1;
      }
      function ga(t) {
        return Object.assign({}, t, {
          left: t.x,
          top: t.y,
          right: t.x + t.width,
          bottom: t.y + t.height,
        });
      }
      function ma(t, e, n) {
        return e === Ys
          ? ga(
              (function (t, e) {
                var n = gs(t),
                  o = ks(t),
                  r = n.visualViewport,
                  i = o.clientWidth,
                  s = o.clientHeight,
                  a = 0,
                  l = 0;
                if (r) {
                  ((i = r.width), (s = r.height));
                  var c = Es();
                  (c || (!c && "fixed" === e)) &&
                    ((a = r.offsetLeft), (l = r.offsetTop));
                }
                return { width: i, height: s, x: a + As(t), y: l };
              })(t, n),
            )
          : ms(e)
            ? (function (t, e) {
                var n = Ss(t, !1, "fixed" === e);
                return (
                  (n.top = n.top + t.clientTop),
                  (n.left = n.left + t.clientLeft),
                  (n.bottom = n.top + t.clientHeight),
                  (n.right = n.left + t.clientWidth),
                  (n.width = t.clientWidth),
                  (n.height = t.clientHeight),
                  (n.x = n.left),
                  (n.y = n.top),
                  n
                );
              })(e, n)
            : ga(
                (function (t) {
                  var e,
                    n = ks(t),
                    o = Ts(t),
                    r = null == (e = t.ownerDocument) ? void 0 : e.body,
                    i = xs(
                      n.scrollWidth,
                      n.clientWidth,
                      r ? r.scrollWidth : 0,
                      r ? r.clientWidth : 0,
                    ),
                    s = xs(
                      n.scrollHeight,
                      n.clientHeight,
                      r ? r.scrollHeight : 0,
                      r ? r.clientHeight : 0,
                    ),
                    a = -o.scrollLeft + As(t),
                    l = -o.scrollTop;
                  return (
                    "rtl" === Ps(r || n).direction &&
                      (a += xs(n.clientWidth, r ? r.clientWidth : 0) - i),
                    { width: i, height: s, x: a, y: l }
                  );
                })(ks(t)),
              );
      }
      function ya(t) {
        return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, t);
      }
      function ba(t, e) {
        return e.reduce(function (e, n) {
          return ((e[n] = t), e);
        }, {});
      }
      function xa(t, e) {
        void 0 === e && (e = {});
        var n = e,
          o = n.placement,
          r = void 0 === o ? t.placement : o,
          i = n.strategy,
          s = void 0 === i ? t.strategy : i,
          a = n.boundary,
          l = void 0 === a ? "clippingParents" : a,
          c = n.rootBoundary,
          u = void 0 === c ? Ys : c,
          p = n.elementContext,
          d = void 0 === p ? Js : p,
          f = n.altBoundary,
          h = void 0 !== f && f,
          v = n.padding,
          g = void 0 === v ? 0 : v,
          m = ya("number" != typeof g ? g : ba(g, qs)),
          y = d === Js ? "reference" : Js,
          b = t.rects.popper,
          x = t.elements[h ? y : d],
          _ = (function (t, e, n, o) {
            var r =
                "clippingParents" === e
                  ? (function (t) {
                      var e = Rs(Is(t)),
                        n =
                          ["absolute", "fixed"].indexOf(Ps(t).position) >= 0 &&
                          ys(t)
                            ? Hs(t)
                            : t;
                      return ms(n)
                        ? e.filter(function (t) {
                            return ms(t) && va(t, n) && "body" !== Cs(t);
                          })
                        : [];
                    })(t)
                  : [].concat(e),
              i = [].concat(r, [n]),
              s = i[0],
              a = i.reduce(
                function (e, n) {
                  var r = ma(t, n, o);
                  return (
                    (e.top = xs(r.top, e.top)),
                    (e.right = _s(r.right, e.right)),
                    (e.bottom = _s(r.bottom, e.bottom)),
                    (e.left = xs(r.left, e.left)),
                    e
                  );
                },
                ma(t, s, o),
              );
            return (
              (a.width = a.right - a.left),
              (a.height = a.bottom - a.top),
              (a.x = a.left),
              (a.y = a.top),
              a
            );
          })(ms(x) ? x : x.contextElement || ks(t.elements.popper), l, u, s),
          w = Ss(t.elements.reference),
          O = aa({
            reference: w,
            element: b,
            strategy: "absolute",
            placement: r,
          }),
          E = ga(Object.assign({}, b, O)),
          S = d === Js ? E : w,
          T = {
            top: _.top - S.top + m.top,
            bottom: S.bottom - _.bottom + m.bottom,
            left: _.left - S.left + m.left,
            right: S.right - _.right + m.right,
          },
          C = t.modifiersData.offset;
        if (d === Js && C) {
          var k = C[r];
          Object.keys(T).forEach(function (t) {
            var e = [Fs, Bs].indexOf(t) >= 0 ? 1 : -1,
              n = [Us, Bs].indexOf(t) >= 0 ? "y" : "x";
            T[t] += k[n] * e;
          });
        }
        return T;
      }
      function _a(t, e, n) {
        return xs(t, _s(e, n));
      }
      function wa(t, e, n) {
        return (
          void 0 === n && (n = { x: 0, y: 0 }),
          {
            top: t.top - e.height - n.y,
            right: t.right - e.width + n.x,
            bottom: t.bottom - e.height + n.y,
            left: t.left - e.width - n.x,
          }
        );
      }
      function Oa(t) {
        return [Us, Fs, Bs, $s].some(function (e) {
          return t[e] >= 0;
        });
      }
      var Ea = na({
          defaultModifiers: [
            {
              name: "eventListeners",
              enabled: !0,
              phase: "write",
              fn: function () {},
              effect: function (t) {
                var e = t.state,
                  n = t.instance,
                  o = t.options,
                  r = o.scroll,
                  i = void 0 === r || r,
                  s = o.resize,
                  a = void 0 === s || s,
                  l = gs(e.elements.popper),
                  c = [].concat(
                    e.scrollParents.reference,
                    e.scrollParents.popper,
                  );
                return (
                  i &&
                    c.forEach(function (t) {
                      t.addEventListener("scroll", n.update, oa);
                    }),
                  a && l.addEventListener("resize", n.update, oa),
                  function () {
                    (i &&
                      c.forEach(function (t) {
                        t.removeEventListener("scroll", n.update, oa);
                      }),
                      a && l.removeEventListener("resize", n.update, oa));
                  }
                );
              },
              data: {},
            },
            {
              name: "popperOffsets",
              enabled: !0,
              phase: "read",
              fn: function (t) {
                var e = t.state,
                  n = t.name;
                e.modifiersData[n] = aa({
                  reference: e.rects.reference,
                  element: e.rects.popper,
                  strategy: "absolute",
                  placement: e.placement,
                });
              },
              data: {},
            },
            {
              name: "computeStyles",
              enabled: !0,
              phase: "beforeWrite",
              fn: function (t) {
                var e = t.state,
                  n = t.options,
                  o = n.gpuAcceleration,
                  r = void 0 === o || o,
                  i = n.adaptive,
                  s = void 0 === i || i,
                  a = n.roundOffsets,
                  l = void 0 === a || a,
                  c = {
                    placement: ra(e.placement),
                    variation: ia(e.placement),
                    popper: e.elements.popper,
                    popperRect: e.rects.popper,
                    gpuAcceleration: r,
                    isFixed: "fixed" === e.options.strategy,
                  };
                (null != e.modifiersData.popperOffsets &&
                  (e.styles.popper = Object.assign(
                    {},
                    e.styles.popper,
                    ca(
                      Object.assign({}, c, {
                        offsets: e.modifiersData.popperOffsets,
                        position: e.options.strategy,
                        adaptive: s,
                        roundOffsets: l,
                      }),
                    ),
                  )),
                  null != e.modifiersData.arrow &&
                    (e.styles.arrow = Object.assign(
                      {},
                      e.styles.arrow,
                      ca(
                        Object.assign({}, c, {
                          offsets: e.modifiersData.arrow,
                          position: "absolute",
                          adaptive: !1,
                          roundOffsets: l,
                        }),
                      ),
                    )),
                  (e.attributes.popper = Object.assign(
                    {},
                    e.attributes.popper,
                    { "data-popper-placement": e.placement },
                  )));
              },
              data: {},
            },
            ua,
            {
              name: "offset",
              enabled: !0,
              phase: "main",
              requires: ["popperOffsets"],
              fn: function (t) {
                var e = t.state,
                  n = t.options,
                  o = t.name,
                  r = n.offset,
                  i = void 0 === r ? [0, 0] : r,
                  s = Gs.reduce(function (t, n) {
                    return (
                      (t[n] = (function (t, e, n) {
                        var o = ra(t),
                          r = [$s, Us].indexOf(o) >= 0 ? -1 : 1,
                          i =
                            "function" == typeof n
                              ? n(Object.assign({}, e, { placement: t }))
                              : n,
                          s = i[0],
                          a = i[1];
                        return (
                          (s = s || 0),
                          (a = (a || 0) * r),
                          [$s, Fs].indexOf(o) >= 0
                            ? { x: a, y: s }
                            : { x: s, y: a }
                        );
                      })(n, e.rects, i)),
                      t
                    );
                  }, {}),
                  a = s[e.placement],
                  l = a.x,
                  c = a.y;
                (null != e.modifiersData.popperOffsets &&
                  ((e.modifiersData.popperOffsets.x += l),
                  (e.modifiersData.popperOffsets.y += c)),
                  (e.modifiersData[o] = s));
              },
            },
            {
              name: "flip",
              enabled: !0,
              phase: "main",
              fn: function (t) {
                var e = t.state,
                  n = t.options,
                  o = t.name;
                if (!e.modifiersData[o]._skip) {
                  for (
                    var r = n.mainAxis,
                      i = void 0 === r || r,
                      s = n.altAxis,
                      a = void 0 === s || s,
                      l = n.fallbackPlacements,
                      c = n.padding,
                      u = n.boundary,
                      p = n.rootBoundary,
                      d = n.altBoundary,
                      f = n.flipVariations,
                      h = void 0 === f || f,
                      v = n.allowedAutoPlacements,
                      g = e.options.placement,
                      m = ra(g),
                      y =
                        l ||
                        (m !== g && h
                          ? (function (t) {
                              if (ra(t) === Ws) return [];
                              var e = da(t);
                              return [ha(t), e, ha(e)];
                            })(g)
                          : [da(g)]),
                      b = [g].concat(y).reduce(function (t, n) {
                        return t.concat(
                          ra(n) === Ws
                            ? (function (t, e) {
                                void 0 === e && (e = {});
                                var n = e,
                                  o = n.placement,
                                  r = n.boundary,
                                  i = n.rootBoundary,
                                  s = n.padding,
                                  a = n.flipVariations,
                                  l = n.allowedAutoPlacements,
                                  c = void 0 === l ? Gs : l,
                                  u = ia(o),
                                  p = u
                                    ? a
                                      ? Xs
                                      : Xs.filter(function (t) {
                                          return ia(t) === u;
                                        })
                                    : qs,
                                  d = p.filter(function (t) {
                                    return c.indexOf(t) >= 0;
                                  });
                                0 === d.length && (d = p);
                                var f = d.reduce(function (e, n) {
                                  return (
                                    (e[n] = xa(t, {
                                      placement: n,
                                      boundary: r,
                                      rootBoundary: i,
                                      padding: s,
                                    })[ra(n)]),
                                    e
                                  );
                                }, {});
                                return Object.keys(f).sort(function (t, e) {
                                  return f[t] - f[e];
                                });
                              })(e, {
                                placement: n,
                                boundary: u,
                                rootBoundary: p,
                                padding: c,
                                flipVariations: h,
                                allowedAutoPlacements: v,
                              })
                            : n,
                        );
                      }, []),
                      x = e.rects.reference,
                      _ = e.rects.popper,
                      w = new Map(),
                      O = !0,
                      E = b[0],
                      S = 0;
                    S < b.length;
                    S++
                  ) {
                    var T = b[S],
                      C = ra(T),
                      k = ia(T) === zs,
                      A = [Us, Bs].indexOf(C) >= 0,
                      P = A ? "width" : "height",
                      L = xa(e, {
                        placement: T,
                        boundary: u,
                        rootBoundary: p,
                        altBoundary: d,
                        padding: c,
                      }),
                      j = A ? (k ? Fs : $s) : k ? Bs : Us;
                    x[P] > _[P] && (j = da(j));
                    var D = da(j),
                      I = [];
                    if (
                      (i && I.push(L[C] <= 0),
                      a && I.push(L[j] <= 0, L[D] <= 0),
                      I.every(function (t) {
                        return t;
                      }))
                    ) {
                      ((E = T), (O = !1));
                      break;
                    }
                    w.set(T, I);
                  }
                  if (O)
                    for (
                      var N = function (t) {
                          var e = b.find(function (e) {
                            var n = w.get(e);
                            if (n)
                              return n.slice(0, t).every(function (t) {
                                return t;
                              });
                          });
                          if (e) return ((E = e), "break");
                        },
                        R = h ? 3 : 1;
                      R > 0 && "break" !== N(R);
                      R--
                    );
                  e.placement !== E &&
                    ((e.modifiersData[o]._skip = !0),
                    (e.placement = E),
                    (e.reset = !0));
                }
              },
              requiresIfExists: ["offset"],
              data: { _skip: !1 },
            },
            {
              name: "preventOverflow",
              enabled: !0,
              phase: "main",
              fn: function (t) {
                var e = t.state,
                  n = t.options,
                  o = t.name,
                  r = n.mainAxis,
                  i = void 0 === r || r,
                  s = n.altAxis,
                  a = void 0 !== s && s,
                  l = n.boundary,
                  c = n.rootBoundary,
                  u = n.altBoundary,
                  p = n.padding,
                  d = n.tether,
                  f = void 0 === d || d,
                  h = n.tetherOffset,
                  v = void 0 === h ? 0 : h,
                  g = xa(e, {
                    boundary: l,
                    rootBoundary: c,
                    padding: p,
                    altBoundary: u,
                  }),
                  m = ra(e.placement),
                  y = ia(e.placement),
                  b = !y,
                  x = sa(m),
                  _ = "x" === x ? "y" : "x",
                  w = e.modifiersData.popperOffsets,
                  O = e.rects.reference,
                  E = e.rects.popper,
                  S =
                    "function" == typeof v
                      ? v(
                          Object.assign({}, e.rects, {
                            placement: e.placement,
                          }),
                        )
                      : v,
                  T =
                    "number" == typeof S
                      ? { mainAxis: S, altAxis: S }
                      : Object.assign({ mainAxis: 0, altAxis: 0 }, S),
                  C = e.modifiersData.offset
                    ? e.modifiersData.offset[e.placement]
                    : null,
                  k = { x: 0, y: 0 };
                if (w) {
                  if (i) {
                    var A,
                      P = "y" === x ? Us : $s,
                      L = "y" === x ? Bs : Fs,
                      j = "y" === x ? "height" : "width",
                      D = w[x],
                      I = D + g[P],
                      N = D - g[L],
                      R = f ? -E[j] / 2 : 0,
                      M = y === zs ? O[j] : E[j],
                      V = y === zs ? -E[j] : -O[j],
                      H = e.elements.arrow,
                      U = f && H ? Ds(H) : { width: 0, height: 0 },
                      B = e.modifiersData["arrow#persistent"]
                        ? e.modifiersData["arrow#persistent"].padding
                        : { top: 0, right: 0, bottom: 0, left: 0 },
                      F = B[P],
                      $ = B[L],
                      W = _a(0, O[j], U[j]),
                      q = b
                        ? O[j] / 2 - R - W - F - T.mainAxis
                        : M - W - F - T.mainAxis,
                      z = b
                        ? -O[j] / 2 + R + W + $ + T.mainAxis
                        : V + W + $ + T.mainAxis,
                      K = e.elements.arrow && Hs(e.elements.arrow),
                      Y = K
                        ? "y" === x
                          ? K.clientTop || 0
                          : K.clientLeft || 0
                        : 0,
                      J = null != (A = null == C ? void 0 : C[x]) ? A : 0,
                      X = D + z - J,
                      G = _a(f ? _s(I, D + q - J - Y) : I, D, f ? xs(N, X) : N);
                    ((w[x] = G), (k[x] = G - D));
                  }
                  if (a) {
                    var Q,
                      Z = "x" === x ? Us : $s,
                      tt = "x" === x ? Bs : Fs,
                      et = w[_],
                      nt = "y" === _ ? "height" : "width",
                      ot = et + g[Z],
                      rt = et - g[tt],
                      it = -1 !== [Us, $s].indexOf(m),
                      st = null != (Q = null == C ? void 0 : C[_]) ? Q : 0,
                      at = it ? ot : et - O[nt] - E[nt] - st + T.altAxis,
                      lt = it ? et + O[nt] + E[nt] - st - T.altAxis : rt,
                      ct =
                        f && it
                          ? (function (t, e, n) {
                              var o = _a(t, e, n);
                              return o > n ? n : o;
                            })(at, et, lt)
                          : _a(f ? at : ot, et, f ? lt : rt);
                    ((w[_] = ct), (k[_] = ct - et));
                  }
                  e.modifiersData[o] = k;
                }
              },
              requiresIfExists: ["offset"],
            },
            {
              name: "arrow",
              enabled: !0,
              phase: "main",
              fn: function (t) {
                var e,
                  n = t.state,
                  o = t.name,
                  r = t.options,
                  i = n.elements.arrow,
                  s = n.modifiersData.popperOffsets,
                  a = ra(n.placement),
                  l = sa(a),
                  c = [$s, Fs].indexOf(a) >= 0 ? "height" : "width";
                if (i && s) {
                  var u = (function (t, e) {
                      return ya(
                        "number" !=
                          typeof (t =
                            "function" == typeof t
                              ? t(
                                  Object.assign({}, e.rects, {
                                    placement: e.placement,
                                  }),
                                )
                              : t)
                          ? t
                          : ba(t, qs),
                      );
                    })(r.padding, n),
                    p = Ds(i),
                    d = "y" === l ? Us : $s,
                    f = "y" === l ? Bs : Fs,
                    h =
                      n.rects.reference[c] +
                      n.rects.reference[l] -
                      s[l] -
                      n.rects.popper[c],
                    v = s[l] - n.rects.reference[l],
                    g = Hs(i),
                    m = g
                      ? "y" === l
                        ? g.clientHeight || 0
                        : g.clientWidth || 0
                      : 0,
                    y = h / 2 - v / 2,
                    b = u[d],
                    x = m - p[c] - u[f],
                    _ = m / 2 - p[c] / 2 + y,
                    w = _a(b, _, x),
                    O = l;
                  n.modifiersData[o] =
                    (((e = {})[O] = w), (e.centerOffset = w - _), e);
                }
              },
              effect: function (t) {
                var e = t.state,
                  n = t.options.element,
                  o = void 0 === n ? "[data-popper-arrow]" : n;
                null != o &&
                  ("string" != typeof o ||
                    (o = e.elements.popper.querySelector(o))) &&
                  va(e.elements.popper, o) &&
                  (e.elements.arrow = o);
              },
              requires: ["popperOffsets"],
              requiresIfExists: ["preventOverflow"],
            },
            {
              name: "hide",
              enabled: !0,
              phase: "main",
              requiresIfExists: ["preventOverflow"],
              fn: function (t) {
                var e = t.state,
                  n = t.name,
                  o = e.rects.reference,
                  r = e.rects.popper,
                  i = e.modifiersData.preventOverflow,
                  s = xa(e, { elementContext: "reference" }),
                  a = xa(e, { altBoundary: !0 }),
                  l = wa(s, o),
                  c = wa(a, r, i),
                  u = Oa(l),
                  p = Oa(c);
                ((e.modifiersData[n] = {
                  referenceClippingOffsets: l,
                  popperEscapeOffsets: c,
                  isReferenceHidden: u,
                  hasPopperEscaped: p,
                }),
                  (e.attributes.popper = Object.assign(
                    {},
                    e.attributes.popper,
                    {
                      "data-popper-reference-hidden": u,
                      "data-popper-escaped": p,
                    },
                  )));
              },
            },
          ],
        }),
        Sa = "tippy-content",
        Ta = "tippy-arrow",
        Ca = "tippy-svg-arrow",
        ka = { passive: !0, capture: !0 },
        Aa = function () {
          return document.body;
        };
      function Pa(t, e, n) {
        if (Array.isArray(t)) {
          var o = t[e];
          return null == o ? (Array.isArray(n) ? n[e] : n) : o;
        }
        return t;
      }
      function La(t, e) {
        var n = {}.toString.call(t);
        return 0 === n.indexOf("[object") && n.indexOf(e + "]") > -1;
      }
      function ja(t, e) {
        return "function" == typeof t ? t.apply(void 0, e) : t;
      }
      function Da(t, e) {
        return 0 === e
          ? t
          : function (o) {
              (clearTimeout(n),
                (n = setTimeout(function () {
                  t(o);
                }, e)));
            };
        var n;
      }
      function Ia(t) {
        return [].concat(t);
      }
      function Na(t, e) {
        -1 === t.indexOf(e) && t.push(e);
      }
      function Ra(t) {
        return [].slice.call(t);
      }
      function Ma(t) {
        return Object.keys(t).reduce(function (e, n) {
          return (void 0 !== t[n] && (e[n] = t[n]), e);
        }, {});
      }
      function Va() {
        return document.createElement("div");
      }
      function Ha(t) {
        return ["Element", "Fragment"].some(function (e) {
          return La(t, e);
        });
      }
      function Ua(t, e) {
        t.forEach(function (t) {
          t && (t.style.transitionDuration = e + "ms");
        });
      }
      function Ba(t, e) {
        t.forEach(function (t) {
          t && t.setAttribute("data-state", e);
        });
      }
      function Fa(t, e, n) {
        var o = e + "EventListener";
        ["transitionend", "webkitTransitionEnd"].forEach(function (e) {
          t[o](e, n);
        });
      }
      function $a(t, e) {
        for (var n = e; n;) {
          var o;
          if (t.contains(n)) return !0;
          n =
            null == n.getRootNode || null == (o = n.getRootNode())
              ? void 0
              : o.host;
        }
        return !1;
      }
      var Wa = { isTouch: !1 },
        qa = 0;
      function za() {
        Wa.isTouch ||
          ((Wa.isTouch = !0),
          window.performance && document.addEventListener("mousemove", Ka));
      }
      function Ka() {
        var t = performance.now();
        (t - qa < 20 &&
          ((Wa.isTouch = !1), document.removeEventListener("mousemove", Ka)),
          (qa = t));
      }
      function Ya() {
        var t,
          e = document.activeElement;
        if ((t = e) && t._tippy && t._tippy.reference === t) {
          var n = e._tippy;
          e.blur && !n.state.isVisible && e.blur();
        }
      }
      var Ja = !(
          "undefined" == typeof window ||
          "undefined" == typeof document ||
          !window.msCrypto
        ),
        Xa = Object.assign(
          {
            appendTo: Aa,
            aria: { content: "auto", expanded: "auto" },
            delay: 0,
            duration: [300, 250],
            getReferenceClientRect: null,
            hideOnClick: !0,
            ignoreAttributes: !1,
            interactive: !1,
            interactiveBorder: 2,
            interactiveDebounce: 0,
            moveTransition: "",
            offset: [0, 10],
            onAfterUpdate: function () {},
            onBeforeUpdate: function () {},
            onCreate: function () {},
            onDestroy: function () {},
            onHidden: function () {},
            onHide: function () {},
            onMount: function () {},
            onShow: function () {},
            onShown: function () {},
            onTrigger: function () {},
            onUntrigger: function () {},
            onClickOutside: function () {},
            placement: "top",
            plugins: [],
            popperOptions: {},
            render: null,
            showOnCreate: !1,
            touch: !0,
            trigger: "mouseenter focus",
            triggerTarget: null,
          },
          {
            animateFill: !1,
            followCursor: !1,
            inlinePositioning: !1,
            sticky: !1,
          },
          {
            allowHTML: !1,
            animation: "fade",
            arrow: !0,
            content: "",
            inertia: !1,
            maxWidth: 350,
            role: "tooltip",
            theme: "",
            zIndex: 9999,
          },
        ),
        Ga = Object.keys(Xa);
      function Qa(t) {
        var e = (t.plugins || []).reduce(function (e, n) {
          var o,
            r = n.name,
            i = n.defaultValue;
          return (
            r && (e[r] = void 0 !== t[r] ? t[r] : null != (o = Xa[r]) ? o : i),
            e
          );
        }, {});
        return Object.assign({}, t, e);
      }
      function Za(t, e) {
        var n = Object.assign(
          {},
          e,
          { content: ja(e.content, [t]) },
          e.ignoreAttributes
            ? {}
            : (function (t, e) {
                return (
                  e
                    ? Object.keys(Qa(Object.assign({}, Xa, { plugins: e })))
                    : Ga
                ).reduce(function (e, n) {
                  var o = (t.getAttribute("data-tippy-" + n) || "").trim();
                  if (!o) return e;
                  if ("content" === n) e[n] = o;
                  else
                    try {
                      e[n] = JSON.parse(o);
                    } catch (t) {
                      e[n] = o;
                    }
                  return e;
                }, {});
              })(t, e.plugins),
        );
        return (
          (n.aria = Object.assign({}, Xa.aria, n.aria)),
          (n.aria = {
            expanded:
              "auto" === n.aria.expanded ? e.interactive : n.aria.expanded,
            content:
              "auto" === n.aria.content
                ? e.interactive
                  ? null
                  : "describedby"
                : n.aria.content,
          }),
          n
        );
      }
      function tl(t, e) {
        t.innerHTML = e;
      }
      function el(t) {
        var e = Va();
        return (
          !0 === t
            ? (e.className = Ta)
            : ((e.className = Ca), Ha(t) ? e.appendChild(t) : tl(e, t)),
          e
        );
      }
      function nl(t, e) {
        Ha(e.content)
          ? (tl(t, ""), t.appendChild(e.content))
          : "function" != typeof e.content &&
            (e.allowHTML ? tl(t, e.content) : (t.textContent = e.content));
      }
      function ol(t) {
        var e = t.firstElementChild,
          n = Ra(e.children);
        return {
          box: e,
          content: n.find(function (t) {
            return t.classList.contains(Sa);
          }),
          arrow: n.find(function (t) {
            return t.classList.contains(Ta) || t.classList.contains(Ca);
          }),
          backdrop: n.find(function (t) {
            return t.classList.contains("tippy-backdrop");
          }),
        };
      }
      function rl(t) {
        var e = Va(),
          n = Va();
        ((n.className = "tippy-box"),
          n.setAttribute("data-state", "hidden"),
          n.setAttribute("tabindex", "-1"));
        var o = Va();
        function r(n, o) {
          var r = ol(e),
            i = r.box,
            s = r.content,
            a = r.arrow;
          (o.theme
            ? i.setAttribute("data-theme", o.theme)
            : i.removeAttribute("data-theme"),
            "string" == typeof o.animation
              ? i.setAttribute("data-animation", o.animation)
              : i.removeAttribute("data-animation"),
            o.inertia
              ? i.setAttribute("data-inertia", "")
              : i.removeAttribute("data-inertia"),
            (i.style.maxWidth =
              "number" == typeof o.maxWidth ? o.maxWidth + "px" : o.maxWidth),
            o.role ? i.setAttribute("role", o.role) : i.removeAttribute("role"),
            (n.content === o.content && n.allowHTML === o.allowHTML) ||
              nl(s, t.props),
            o.arrow
              ? a
                ? n.arrow !== o.arrow &&
                  (i.removeChild(a), i.appendChild(el(o.arrow)))
                : i.appendChild(el(o.arrow))
              : a && i.removeChild(a));
        }
        return (
          (o.className = Sa),
          o.setAttribute("data-state", "hidden"),
          nl(o, t.props),
          e.appendChild(n),
          n.appendChild(o),
          r(t.props, t.props),
          { popper: e, onUpdate: r }
        );
      }
      rl.$$tippy = !0;
      var il = 1,
        sl = [],
        al = [];
      function ll(t, e) {
        var n,
          o,
          r,
          i,
          s,
          a,
          l,
          c,
          u = Za(t, Object.assign({}, Xa, Qa(Ma(e)))),
          p = !1,
          d = !1,
          f = !1,
          h = !1,
          v = [],
          g = Da(K, u.interactiveDebounce),
          m = il++,
          y = (c = u.plugins).filter(function (t, e) {
            return c.indexOf(t) === e;
          }),
          b = {
            id: m,
            reference: t,
            popper: Va(),
            popperInstance: null,
            props: u,
            state: {
              isEnabled: !0,
              isVisible: !1,
              isDestroyed: !1,
              isMounted: !1,
              isShown: !1,
            },
            plugins: y,
            clearDelayTimeouts: function () {
              (clearTimeout(n), clearTimeout(o), cancelAnimationFrame(r));
            },
            setProps: function (e) {
              if (!b.state.isDestroyed) {
                (D("onBeforeUpdate", [b, e]), q());
                var n = b.props,
                  o = Za(
                    t,
                    Object.assign({}, n, Ma(e), { ignoreAttributes: !0 }),
                  );
                ((b.props = o),
                  W(),
                  n.interactiveDebounce !== o.interactiveDebounce &&
                    (R(), (g = Da(K, o.interactiveDebounce))),
                  n.triggerTarget && !o.triggerTarget
                    ? Ia(n.triggerTarget).forEach(function (t) {
                        t.removeAttribute("aria-expanded");
                      })
                    : o.triggerTarget && t.removeAttribute("aria-expanded"),
                  N(),
                  j(),
                  w && w(n, o),
                  b.popperInstance &&
                    (G(),
                    Z().forEach(function (t) {
                      requestAnimationFrame(
                        t._tippy.popperInstance.forceUpdate,
                      );
                    })),
                  D("onAfterUpdate", [b, e]));
              }
            },
            setContent: function (t) {
              b.setProps({ content: t });
            },
            show: function () {
              var t = b.state.isVisible,
                e = b.state.isDestroyed,
                n = !b.state.isEnabled,
                o = Wa.isTouch && !b.props.touch,
                r = Pa(b.props.duration, 0, Xa.duration);
              if (!(
                t ||
                e ||
                n ||
                o ||
                k().hasAttribute("disabled") ||
                (D("onShow", [b], !1), !1 === b.props.onShow(b))
              )) {
                if (
                  ((b.state.isVisible = !0),
                  C() && (_.style.visibility = "visible"),
                  j(),
                  U(),
                  b.state.isMounted || (_.style.transition = "none"),
                  C())
                ) {
                  var i = P();
                  Ua([i.box, i.content], 0);
                }
                var s, l, c;
                ((a = function () {
                  var t;
                  if (b.state.isVisible && !h) {
                    if (
                      ((h = !0),
                      _.offsetHeight,
                      (_.style.transition = b.props.moveTransition),
                      C() && b.props.animation)
                    ) {
                      var e = P(),
                        n = e.box,
                        o = e.content;
                      (Ua([n, o], r), Ba([n, o], "visible"));
                    }
                    (I(),
                      N(),
                      Na(al, b),
                      null == (t = b.popperInstance) || t.forceUpdate(),
                      D("onMount", [b]),
                      b.props.animation &&
                        C() &&
                        (function (t) {
                          F(t, function () {
                            ((b.state.isShown = !0), D("onShown", [b]));
                          });
                        })(r));
                  }
                }),
                  (l = b.props.appendTo),
                  (c = k()),
                  (s =
                    (b.props.interactive && l === Aa) || "parent" === l
                      ? c.parentNode
                      : ja(l, [c])).contains(_) || s.appendChild(_),
                  (b.state.isMounted = !0),
                  G());
              }
            },
            hide: function () {
              var t = !b.state.isVisible,
                e = b.state.isDestroyed,
                n = !b.state.isEnabled,
                o = Pa(b.props.duration, 1, Xa.duration);
              if (
                !(t || e || n) &&
                (D("onHide", [b], !1), !1 !== b.props.onHide(b))
              ) {
                if (
                  ((b.state.isVisible = !1),
                  (b.state.isShown = !1),
                  (h = !1),
                  (p = !1),
                  C() && (_.style.visibility = "hidden"),
                  R(),
                  B(),
                  j(!0),
                  C())
                ) {
                  var r = P(),
                    i = r.box,
                    s = r.content;
                  b.props.animation && (Ua([i, s], o), Ba([i, s], "hidden"));
                }
                (I(),
                  N(),
                  b.props.animation
                    ? C() &&
                      (function (t, e) {
                        F(t, function () {
                          !b.state.isVisible &&
                            _.parentNode &&
                            _.parentNode.contains(_) &&
                            e();
                        });
                      })(o, b.unmount)
                    : b.unmount());
              }
            },
            hideWithInteractivity: function (t) {
              (A().addEventListener("mousemove", g), Na(sl, g), g(t));
            },
            enable: function () {
              b.state.isEnabled = !0;
            },
            disable: function () {
              (b.hide(), (b.state.isEnabled = !1));
            },
            unmount: function () {
              (b.state.isVisible && b.hide(),
                b.state.isMounted &&
                  (Q(),
                  Z().forEach(function (t) {
                    t._tippy.unmount();
                  }),
                  _.parentNode && _.parentNode.removeChild(_),
                  (al = al.filter(function (t) {
                    return t !== b;
                  })),
                  (b.state.isMounted = !1),
                  D("onHidden", [b])));
            },
            destroy: function () {
              b.state.isDestroyed ||
                (b.clearDelayTimeouts(),
                b.unmount(),
                q(),
                delete t._tippy,
                (b.state.isDestroyed = !0),
                D("onDestroy", [b]));
            },
          };
        if (!u.render) return b;
        var x = u.render(b),
          _ = x.popper,
          w = x.onUpdate;
        (_.setAttribute("data-tippy-root", ""),
          (_.id = "tippy-" + b.id),
          (b.popper = _),
          (t._tippy = b),
          (_._tippy = b));
        var O = y.map(function (t) {
            return t.fn(b);
          }),
          E = t.hasAttribute("aria-expanded");
        return (
          W(),
          N(),
          j(),
          D("onCreate", [b]),
          u.showOnCreate && tt(),
          _.addEventListener("mouseenter", function () {
            b.props.interactive && b.state.isVisible && b.clearDelayTimeouts();
          }),
          _.addEventListener("mouseleave", function () {
            b.props.interactive &&
              b.props.trigger.indexOf("mouseenter") >= 0 &&
              A().addEventListener("mousemove", g);
          }),
          b
        );
        function S() {
          var t = b.props.touch;
          return Array.isArray(t) ? t : [t, 0];
        }
        function T() {
          return "hold" === S()[0];
        }
        function C() {
          var t;
          return !(null == (t = b.props.render) || !t.$$tippy);
        }
        function k() {
          return l || t;
        }
        function A() {
          var t,
            e,
            n = k().parentNode;
          return n
            ? null != (e = Ia(n)[0]) && null != (t = e.ownerDocument) && t.body
              ? e.ownerDocument
              : document
            : document;
        }
        function P() {
          return ol(_);
        }
        function L(t) {
          return (b.state.isMounted && !b.state.isVisible) ||
            Wa.isTouch ||
            (i && "focus" === i.type)
            ? 0
            : Pa(b.props.delay, t ? 0 : 1, Xa.delay);
        }
        function j(t) {
          (void 0 === t && (t = !1),
            (_.style.pointerEvents = b.props.interactive && !t ? "" : "none"),
            (_.style.zIndex = "" + b.props.zIndex));
        }
        function D(t, e, n) {
          var o;
          (void 0 === n && (n = !0),
            O.forEach(function (n) {
              n[t] && n[t].apply(n, e);
            }),
            n && (o = b.props)[t].apply(o, e));
        }
        function I() {
          var e = b.props.aria;
          if (e.content) {
            var n = "aria-" + e.content,
              o = _.id;
            Ia(b.props.triggerTarget || t).forEach(function (t) {
              var e = t.getAttribute(n);
              if (b.state.isVisible) t.setAttribute(n, e ? e + " " + o : o);
              else {
                var r = e && e.replace(o, "").trim();
                r ? t.setAttribute(n, r) : t.removeAttribute(n);
              }
            });
          }
        }
        function N() {
          !E &&
            b.props.aria.expanded &&
            Ia(b.props.triggerTarget || t).forEach(function (t) {
              b.props.interactive
                ? t.setAttribute(
                    "aria-expanded",
                    b.state.isVisible && t === k() ? "true" : "false",
                  )
                : t.removeAttribute("aria-expanded");
            });
        }
        function R() {
          (A().removeEventListener("mousemove", g),
            (sl = sl.filter(function (t) {
              return t !== g;
            })));
        }
        function M(e) {
          if (!Wa.isTouch || (!f && "mousedown" !== e.type)) {
            var n = (e.composedPath && e.composedPath()[0]) || e.target;
            if (!b.props.interactive || !$a(_, n)) {
              if (
                Ia(b.props.triggerTarget || t).some(function (t) {
                  return $a(t, n);
                })
              ) {
                if (Wa.isTouch) return;
                if (b.state.isVisible && b.props.trigger.indexOf("click") >= 0)
                  return;
              } else D("onClickOutside", [b, e]);
              !0 === b.props.hideOnClick &&
                (b.clearDelayTimeouts(),
                b.hide(),
                (d = !0),
                setTimeout(function () {
                  d = !1;
                }),
                b.state.isMounted || B());
            }
          }
        }
        function V() {
          f = !0;
        }
        function H() {
          f = !1;
        }
        function U() {
          var t = A();
          (t.addEventListener("mousedown", M, !0),
            t.addEventListener("touchend", M, ka),
            t.addEventListener("touchstart", H, ka),
            t.addEventListener("touchmove", V, ka));
        }
        function B() {
          var t = A();
          (t.removeEventListener("mousedown", M, !0),
            t.removeEventListener("touchend", M, ka),
            t.removeEventListener("touchstart", H, ka),
            t.removeEventListener("touchmove", V, ka));
        }
        function F(t, e) {
          var n = P().box;
          function o(t) {
            t.target === n && (Fa(n, "remove", o), e());
          }
          if (0 === t) return e();
          (Fa(n, "remove", s), Fa(n, "add", o), (s = o));
        }
        function $(e, n, o) {
          (void 0 === o && (o = !1),
            Ia(b.props.triggerTarget || t).forEach(function (t) {
              (t.addEventListener(e, n, o),
                v.push({ node: t, eventType: e, handler: n, options: o }));
            }));
        }
        function W() {
          var t;
          (T() &&
            ($("touchstart", z, { passive: !0 }),
            $("touchend", Y, { passive: !0 })),
            ((t = b.props.trigger), t.split(/\s+/).filter(Boolean)).forEach(
              function (t) {
                if ("manual" !== t)
                  switch (($(t, z), t)) {
                    case "mouseenter":
                      $("mouseleave", Y);
                      break;
                    case "focus":
                      $(Ja ? "focusout" : "blur", J);
                      break;
                    case "focusin":
                      $("focusout", J);
                  }
              },
            ));
        }
        function q() {
          (v.forEach(function (t) {
            var e = t.node,
              n = t.eventType,
              o = t.handler,
              r = t.options;
            e.removeEventListener(n, o, r);
          }),
            (v = []));
        }
        function z(t) {
          var e,
            n = !1;
          if (b.state.isEnabled && !X(t) && !d) {
            var o = "focus" === (null == (e = i) ? void 0 : e.type);
            ((i = t),
              (l = t.currentTarget),
              N(),
              !b.state.isVisible &&
                La(t, "MouseEvent") &&
                sl.forEach(function (e) {
                  return e(t);
                }),
              "click" === t.type &&
              (b.props.trigger.indexOf("mouseenter") < 0 || p) &&
              !1 !== b.props.hideOnClick &&
              b.state.isVisible
                ? (n = !0)
                : tt(t),
              "click" === t.type && (p = !n),
              n && !o && et(t));
          }
        }
        function K(t) {
          var e = t.target,
            n = k().contains(e) || _.contains(e);
          if ("mousemove" !== t.type || !n) {
            var o = Z()
              .concat(_)
              .map(function (t) {
                var e,
                  n = null == (e = t._tippy.popperInstance) ? void 0 : e.state;
                return n
                  ? {
                      popperRect: t.getBoundingClientRect(),
                      popperState: n,
                      props: u,
                    }
                  : null;
              })
              .filter(Boolean);
            (function (t, e) {
              var n = e.clientX,
                o = e.clientY;
              return t.every(function (t) {
                var e = t.popperRect,
                  r = t.popperState,
                  i = t.props.interactiveBorder,
                  s = r.placement.split("-")[0],
                  a = r.modifiersData.offset;
                if (!a) return !0;
                var l = "bottom" === s ? a.top.y : 0,
                  c = "top" === s ? a.bottom.y : 0,
                  u = "right" === s ? a.left.x : 0,
                  p = "left" === s ? a.right.x : 0,
                  d = e.top - o + l > i,
                  f = o - e.bottom - c > i,
                  h = e.left - n + u > i,
                  v = n - e.right - p > i;
                return d || f || h || v;
              });
            })(o, t) && (R(), et(t));
          }
        }
        function Y(t) {
          X(t) ||
            (b.props.trigger.indexOf("click") >= 0 && p) ||
            (b.props.interactive ? b.hideWithInteractivity(t) : et(t));
        }
        function J(t) {
          (b.props.trigger.indexOf("focusin") < 0 && t.target !== k()) ||
            (b.props.interactive &&
              t.relatedTarget &&
              _.contains(t.relatedTarget)) ||
            et(t);
        }
        function X(t) {
          return !!Wa.isTouch && T() !== t.type.indexOf("touch") >= 0;
        }
        function G() {
          Q();
          var e = b.props,
            n = e.popperOptions,
            o = e.placement,
            r = e.offset,
            i = e.getReferenceClientRect,
            s = e.moveTransition,
            l = C() ? ol(_).arrow : null,
            c = i
              ? {
                  getBoundingClientRect: i,
                  contextElement: i.contextElement || k(),
                }
              : t,
            u = [
              { name: "offset", options: { offset: r } },
              {
                name: "preventOverflow",
                options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
              },
              { name: "flip", options: { padding: 5 } },
              { name: "computeStyles", options: { adaptive: !s } },
              {
                name: "$$tippy",
                enabled: !0,
                phase: "beforeWrite",
                requires: ["computeStyles"],
                fn: function (t) {
                  var e = t.state;
                  if (C()) {
                    var n = P().box;
                    (["placement", "reference-hidden", "escaped"].forEach(
                      function (t) {
                        "placement" === t
                          ? n.setAttribute("data-placement", e.placement)
                          : e.attributes.popper["data-popper-" + t]
                            ? n.setAttribute("data-" + t, "")
                            : n.removeAttribute("data-" + t);
                      },
                    ),
                      (e.attributes.popper = {}));
                  }
                },
              },
            ];
          (C() &&
            l &&
            u.push({ name: "arrow", options: { element: l, padding: 3 } }),
            u.push.apply(u, (null == n ? void 0 : n.modifiers) || []),
            (b.popperInstance = Ea(
              c,
              _,
              Object.assign({}, n, {
                placement: o,
                onFirstUpdate: a,
                modifiers: u,
              }),
            )));
        }
        function Q() {
          b.popperInstance &&
            (b.popperInstance.destroy(), (b.popperInstance = null));
        }
        function Z() {
          return Ra(_.querySelectorAll("[data-tippy-root]"));
        }
        function tt(t) {
          (b.clearDelayTimeouts(), t && D("onTrigger", [b, t]), U());
          var e = L(!0),
            o = S(),
            r = o[0],
            i = o[1];
          (Wa.isTouch && "hold" === r && i && (e = i),
            e
              ? (n = setTimeout(function () {
                  b.show();
                }, e))
              : b.show());
        }
        function et(t) {
          if (
            (b.clearDelayTimeouts(),
            D("onUntrigger", [b, t]),
            b.state.isVisible)
          ) {
            if (!(
              b.props.trigger.indexOf("mouseenter") >= 0 &&
              b.props.trigger.indexOf("click") >= 0 &&
              ["mouseleave", "mousemove"].indexOf(t.type) >= 0 &&
              p
            )) {
              var e = L(!1);
              e
                ? (o = setTimeout(function () {
                    b.state.isVisible && b.hide();
                  }, e))
                : (r = requestAnimationFrame(function () {
                    b.hide();
                  }));
            }
          } else B();
        }
      }
      function cl(t, e) {
        void 0 === e && (e = {});
        var n = Xa.plugins.concat(e.plugins || []);
        (document.addEventListener("touchstart", za, ka),
          window.addEventListener("blur", Ya));
        var o,
          r = Object.assign({}, e, { plugins: n }),
          i = ((o = t),
          Ha(o)
            ? [o]
            : (function (t) {
                  return La(t, "NodeList");
                })(o)
              ? Ra(o)
              : Array.isArray(o)
                ? o
                : Ra(document.querySelectorAll(o))).reduce(function (t, e) {
            var n = e && ll(e, r);
            return (n && t.push(n), t);
          }, []);
        return Ha(t) ? i[0] : i;
      }
      ((cl.defaultProps = Xa),
        (cl.setDefaultProps = function (t) {
          Object.keys(t).forEach(function (e) {
            Xa[e] = t[e];
          });
        }),
        (cl.currentInput = Wa),
        Object.assign({}, ua, {
          effect: function (t) {
            var e = t.state,
              n = {
                popper: {
                  position: e.options.strategy,
                  left: "0",
                  top: "0",
                  margin: "0",
                },
                arrow: { position: "absolute" },
                reference: {},
              };
            (Object.assign(e.elements.popper.style, n.popper),
              (e.styles = n),
              e.elements.arrow &&
                Object.assign(e.elements.arrow.style, n.arrow));
          },
        }));
      var ul = { mouseover: "mouseenter", focusin: "focus", click: "click" };
      function pl(t, e) {
        var n,
          o,
          r,
          i = [],
          s = [],
          a = !1,
          l = e.target,
          c =
            ((n = e),
            (o = ["target"]),
            (r = Object.assign({}, n)),
            o.forEach(function (t) {
              delete r[t];
            }),
            r),
          u = Object.assign({}, c, { trigger: "manual", touch: !1 }),
          p = Object.assign({ touch: Xa.touch }, c, { showOnCreate: !0 }),
          d = cl(t, u);
        function f(t) {
          if (t.target && !a) {
            var n = t.target.closest(l);
            if (n) {
              var o =
                n.getAttribute("data-tippy-trigger") || e.trigger || Xa.trigger;
              if (
                !n._tippy &&
                !(
                  ("touchstart" === t.type && "boolean" == typeof p.touch) ||
                  ("touchstart" !== t.type && o.indexOf(ul[t.type]) < 0)
                )
              ) {
                var r = cl(n, p);
                r && (s = s.concat(r));
              }
            }
          }
        }
        function h(t, e, n, o) {
          (void 0 === o && (o = !1),
            t.addEventListener(e, n, o),
            i.push({ node: t, eventType: e, handler: n, options: o }));
        }
        return (
          Ia(d).forEach(function (t) {
            var e = t.destroy,
              n = t.enable,
              o = t.disable;
            ((t.destroy = function (t) {
              (void 0 === t && (t = !0),
                t &&
                  s.forEach(function (t) {
                    t.destroy();
                  }),
                (s = []),
                i.forEach(function (t) {
                  var e = t.node,
                    n = t.eventType,
                    o = t.handler,
                    r = t.options;
                  e.removeEventListener(n, o, r);
                }),
                (i = []),
                e());
            }),
              (t.enable = function () {
                (n(),
                  s.forEach(function (t) {
                    return t.enable();
                  }),
                  (a = !1));
              }),
              (t.disable = function () {
                (o(),
                  s.forEach(function (t) {
                    return t.disable();
                  }),
                  (a = !0));
              }),
              (function (t) {
                var e = t.reference;
                (h(e, "touchstart", f, ka),
                  h(e, "mouseover", f),
                  h(e, "focusin", f),
                  h(e, "click", f));
              })(t));
          }),
          d
        );
      }
      cl.setDefaultProps({ render: rl });
      const dl = { id: "vapor-settings-collapsible-container" },
        fl = ["data-tippy-content"],
        hl = ["data-tippy-content"],
        vl = { class: "vapor-settings-item" },
        gl = ["href"],
        ml = { key: 0, class: "vapor-settings-item" },
        yl = ["href", "title"],
        bl = {
          name: "settingsBar",
          inject: ["settings"],
          data() {
            return {
              personal: {
                title: (0, r.Tl)("vapor", "Personal Settings"),
                url: this.settings.personal_url,
              },
              admin: {
                title: (0, r.Tl)("vapor", "Admin Settings"),
                url: this.settings.admin_url,
              },
              isAdmin: this.settings.is_admin,
              sectionName: (0, r.Tl)("vapor", "Settings"),
              errorText: (0, r.Tl)("vapor", "Hide Errors"),
              toggleStatus: f.str2Boolean(this.settings.ncd_hide_errors),
              btStatus: f.str2Boolean(this.settings.ncd_disable_bt),
              errorTooltip: (0, r.Tl)("vapor", "Enable this to hide errors"),
              btTooltip: (0, r.Tl)(
                "ncdownload",
                OC.L10N.translate('vapor','Disable BT for non-admin users'),
              ),
            };
          },
          created() {},
          methods: {
            toggle(t, e) {
              let n = {};
              n[t] = e ? 1 : 0;
              let o = "ncd_disable_bt" == t ? "/admin/save" : "/personal/save";
              const i = f.generateUrl("/apps/vapor" + o);
              f.httpClient(i)
                .setData(n)
                .setHandler((t) => {
                  t.message && f.message((0, r.Tl)("vapor", t.message), 1e3);
                })
                .send();
            },
          },
          components: { toggleButton: ds },
          mounted() {},
        },
        xl = (0, Bi.A)(bl, [
          [
            "render",
            function (t, e, n, o, r, i) {
              const s = Zn("toggleButton");
              return (
                ur(),
                hr("section", dl, [
                  xr(
                    "div",
                    {
                      class: "vapor-settings-item",
                      "data-tippy-content": r.errorTooltip,
                    },
                    [
                      _r(
                        s,
                        {
                          disabledText: r.errorText,
                          enabledText: r.errorText,
                          defaultStatus: r.toggleStatus,
                          onChanged: i.toggle,
                          name: "ncd_hide_errors",
                        },
                        null,
                        8,
                        [
                          "disabledText",
                          "enabledText",
                          "defaultStatus",
                          "onChanged",
                        ],
                      ),
                    ],
                    8,
                    fl,
                  ),
                  xr(
                    "div",
                    {
                      class: "vapor-settings-item",
                      "data-tippy-content": r.btTooltip,
                    },
                    [
                      r.isAdmin
                        ? (ur(),
                          vr(
                            s,
                            {
                              key: 0,
                              disabledText: OC.L10N.translate('vapor','Enable BT for non-admin users'),
                              enabledText: OC.L10N.translate('vapor','Disable BT for non-admin users'),
                              defaultStatus: r.btStatus,
                              name: "ncd_disable_bt",
                              onChanged: i.toggle,
                            },
                            null,
                            8,
                            ["defaultStatus", "onChanged"],
                          ))
                        : Sr("", !0),
                    ],
                    8,
                    hl,
                  ),
                  xr("div", vl, [
                    xr(
                      "a",
                      { href: r.personal.url, title: "" },
                      [xr("button", null, dt(r.personal.title), 1)],
                      8,
                      gl,
                    ),
                  ]),
                  r.isAdmin
                    ? (ur(),
                      hr("div", ml, [
                        xr(
                          "a",
                          { href: r.admin.url, title: r.admin.title },
                          [xr("button", null, dt(r.admin.title), 1)],
                          8,
                          yl,
                        ),
                      ]))
                    : Sr("", !0),
                ])
              );
            },
          ],
        ]);
      window.addEventListener("DOMContentLoaded", function () {
        (f.showErrors("[data-error-message]"),
          u("click", ".download-queue a", (t) =>
            ((t) => {
              (t.stopPropagation(), t.preventDefault());
              let e,
                n = t.target,
                o = f.getContentTableType(),
                r = n.getAttribute("path"),
                i = n.getAttribute("id");
              (o === i && f.isPolling()) ||
                (f.setContentTableType(i),
                ["active-downloads", "ytdl-downloads"].includes(i) ||
                  (e = 15e3),
                "ytdl-downloads" === i ? f.pollingYtdl() : f.polling(e, r));
            })(t),
          ),
          u(
            "click",
            "#vapor-table-wrapper",
            ".download-file-folder",
            function (t) {
              (t.stopPropagation(), t.preventDefault());
              let e = t.target.getAttribute("href");
              f.scanFolder().then(() => {
                f.redirect(e);
              });
            },
          ),
          u(
            "click",
            "#vapor-table-wrapper",
            ".table-cell-action-item .button-container button",
            (t) =>
              ((t) => {
                let e = t.target;
                (t.stopPropagation(), t.preventDefault());
                let n,
                  o = e.getAttribute("path"),
                  r = {};
                if (
                  ("download-action-button" == e.getAttribute("id") &&
                    (f.loop(f.getCounters),
                    f.setContentTableType("search-results")),
                  (n = e.closest(".table-row-search")))
                ) {
                  if ("icon-clipboard" == e.className)
                    return void new g(e, n.dataset.link).Copy();
                  r["text-input-value"] = n.dataset.link;
                } else
                  ((n = e.closest(".table-row")),
                    (r = n.dataset),
                    r.gid || console.log("gid is not set!"));
                ((r.url = r["text-input-value"]),
                  delete r["text-input-value"],
                  f
                    .httpClient(o)
                    .setErrorHandler(function (t, e, n) {
                      console.log(n);
                    })
                    .setHandler(function (t) {
                      t.hasOwnProperty("error")
                        ? f.error(t.error)
                        : (t.hasOwnProperty("result") &&
                            f.message("Success " + t.result),
                          t.hasOwnProperty("message") && f.message(t.message),
                          n && n.remove());
                    })
                    .setData(r)
                    .send());
              })(t),
          ),
          u(
            "click",
            "#vapor-table-wrapper",
            ".table-row button.icon-clipboard",
            function (t) {
              let e = t.target;
              new g(e).Copy();
            },
          ));
        let t = Ai(vs),
          e = Ai(xl);
        const n = document.getElementById("app-settings-data");
        let o = {};
        try {
          let t = n.getAttribute("data-settings"),
            e = n.getAttribute("data-search-sites");
          ((o.settings = JSON.parse(t)), (o.search_sites = JSON.parse(e)));
        } catch (t) {
          ((o = {}), console.log(t));
        }
        (e.provide("settings", o.settings),
          e.mount("#app-settings-content"),
          t.provide("settings", o));
        let i = t.mount("#vapor-form-wrapper");
        (f.addVue(i.$options.name, i),
          u("click", "#start-aria2", "button", function (t) {
            let e = t.target;
            if (e.classList.contains("notinstalled")) return;
            let n = e.parentElement,
              o = n.innerHTML;
            n.innerHTML = f.loadingTpl();
            let i = f.generateUrl("/apps/vapor/aria2/start");
            f.httpClient(i)
              .setHandler(function (t) {
                !(function (t, e, n) {
                  if (((t.innerHTML = e), !n.status))
                    return void (n.error && f.error(n.error));
                  let o = document.querySelector("#start-aria2 button"),
                    i = o.getAttribute("data-aria2");
                  i &&
                    ("on" === i
                      ? (o.setAttribute("data-aria2", "off"),
                        (o.textContent = (0, r.Tl)("vapor", "Start Aria2")))
                      : (o.setAttribute("data-aria2", "on"),
                        (o.textContent = (0, r.Tl)("vapor", "Stop Aria2"))));
                })(n, o, t);
              })
              .send();
          }),
          u("click", "#app-navigation", "#search-download", f.showDownload),
          u("click", "#app-settings-header", "button", function () {
            const t = document.getElementById("app-settings-content");
            t.style.display =
              "none" === t.style.display || "" === t.style.display
                ? "block"
                : "none";
          }),
          pl("#app-vapor-wrapper", { target: "[data-tippy-content]" }));
      });
    })());
})();
//# sourceMappingURL=app.js.map
