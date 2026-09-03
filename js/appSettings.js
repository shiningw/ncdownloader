/*! For license information please see appSettings.js.LICENSE.txt */
(() => {
  var e = {
      8670(e, t, n) {
        "use strict";
        (n(4185),
          (t.Tl = function (e, t, n, o, r) {
            return "undefined" == typeof OC
              ? (console.warn("No OC found"), t)
              : OC.L10N.translate(e, t, n, o, r);
          }),
          n(7495),
          n(5440));
      },
      9498(e, t, n) {
        "use strict";
        ((t.Jv = void 0), n(5440));
        const o = (e, t, n) => {
          const o = Object.assign({ escape: !0 }, n || {});
          return (
            "/" !== e.charAt(0) && (e = "/" + e),
            (r = (r = t || {}) || {}),
            e.replace(/{([^{}]*)}/g, function (e, t) {
              var n = r[t];
              return o.escape
                ? "string" == typeof n || "number" == typeof n
                  ? encodeURIComponent(n.toString())
                  : encodeURIComponent(e)
                : "string" == typeof n || "number" == typeof n
                  ? n.toString()
                  : e;
            })
          );
          var r;
        };
        t.Jv = (e, t, n) => {
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
            ? r() + "/index.php" + o(e, t, n)
            : r() + o(e, t, n);
        };
        function r() {
          let e = window._oc_webroot;
          if (void 0 === e) {
            e = location.pathname;
            const t = e.indexOf("/index.php/");
            e = -1 !== t ? e.substr(0, t) : e.substr(0, e.lastIndexOf("/"));
          }
          return e;
        }
      },
      7736(e) {
        var t;
        ((t = function (e) {
          var t = function (e) {
            return new t.lib.init(e);
          };
          function n(e, t) {
            return t.offset[e]
              ? isNaN(t.offset[e])
                ? t.offset[e]
                : t.offset[e] + "px"
              : "0px";
          }
          function o(e, t) {
            return !(
              !e ||
              "string" != typeof t ||
              !(
                e.className && e.className.trim().split(/\s+/gi).indexOf(t) > -1
              )
            );
          }
          return (
            (t.defaults = {
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
            (t.lib = t.prototype =
              {
                toastify: "1.12.0",
                constructor: t,
                init: function (e) {
                  return (
                    e || (e = {}),
                    (this.options = {}),
                    (this.toastElement = null),
                    (this.options.text = e.text || t.defaults.text),
                    (this.options.node = e.node || t.defaults.node),
                    (this.options.duration =
                      0 === e.duration ? 0 : e.duration || t.defaults.duration),
                    (this.options.selector = e.selector || t.defaults.selector),
                    (this.options.callback = e.callback || t.defaults.callback),
                    (this.options.destination =
                      e.destination || t.defaults.destination),
                    (this.options.newWindow =
                      e.newWindow || t.defaults.newWindow),
                    (this.options.close = e.close || t.defaults.close),
                    (this.options.gravity =
                      "bottom" === e.gravity
                        ? "toastify-bottom"
                        : t.defaults.gravity),
                    (this.options.positionLeft =
                      e.positionLeft || t.defaults.positionLeft),
                    (this.options.position = e.position || t.defaults.position),
                    (this.options.backgroundColor =
                      e.backgroundColor || t.defaults.backgroundColor),
                    (this.options.avatar = e.avatar || t.defaults.avatar),
                    (this.options.className =
                      e.className || t.defaults.className),
                    (this.options.stopOnFocus =
                      void 0 === e.stopOnFocus
                        ? t.defaults.stopOnFocus
                        : e.stopOnFocus),
                    (this.options.onClick = e.onClick || t.defaults.onClick),
                    (this.options.offset = e.offset || t.defaults.offset),
                    (this.options.escapeMarkup =
                      void 0 !== e.escapeMarkup
                        ? e.escapeMarkup
                        : t.defaults.escapeMarkup),
                    (this.options.ariaLive = e.ariaLive || t.defaults.ariaLive),
                    (this.options.style = e.style || t.defaults.style),
                    e.backgroundColor &&
                      (this.options.style.background = e.backgroundColor),
                    this
                  );
                },
                buildToast: function () {
                  if (!this.options) throw "Toastify is not initialized";
                  var e = document.createElement("div");
                  for (var t in ((e.className =
                    "toastify on " + this.options.className),
                  this.options.position
                    ? (e.className += " toastify-" + this.options.position)
                    : !0 === this.options.positionLeft
                      ? ((e.className += " toastify-left"),
                        console.warn(
                          "Property `positionLeft` will be depreciated in further versions. Please use `position` instead.",
                        ))
                      : (e.className += " toastify-right"),
                  (e.className += " " + this.options.gravity),
                  this.options.backgroundColor &&
                    console.warn(
                      'DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.',
                    ),
                  this.options.style))
                    e.style[t] = this.options.style[t];
                  if (
                    (this.options.ariaLive &&
                      e.setAttribute("aria-live", this.options.ariaLive),
                    this.options.node &&
                      this.options.node.nodeType === Node.ELEMENT_NODE)
                  )
                    e.appendChild(this.options.node);
                  else if (
                    (this.options.escapeMarkup
                      ? (e.innerText = this.options.text)
                      : (e.innerHTML = this.options.text),
                    "" !== this.options.avatar)
                  ) {
                    var o = document.createElement("img");
                    ((o.src = this.options.avatar),
                      (o.className = "toastify-avatar"),
                      "left" == this.options.position ||
                      !0 === this.options.positionLeft
                        ? e.appendChild(o)
                        : e.insertAdjacentElement("afterbegin", o));
                  }
                  if (!0 === this.options.close) {
                    var r = document.createElement("button");
                    ((r.type = "button"),
                      r.setAttribute("aria-label", "Close"),
                      (r.className = "toast-close"),
                      (r.innerHTML = "&#10006;"),
                      r.addEventListener(
                        "click",
                        function (e) {
                          (e.stopPropagation(),
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
                      ? e.insertAdjacentElement("afterbegin", r)
                      : e.appendChild(r);
                  }
                  if (this.options.stopOnFocus && this.options.duration > 0) {
                    var s = this;
                    (e.addEventListener("mouseover", function (t) {
                      window.clearTimeout(e.timeOutValue);
                    }),
                      e.addEventListener("mouseleave", function () {
                        e.timeOutValue = window.setTimeout(function () {
                          s.removeElement(e);
                        }, s.options.duration);
                      }));
                  }
                  if (
                    (void 0 !== this.options.destination &&
                      e.addEventListener(
                        "click",
                        function (e) {
                          (e.stopPropagation(),
                            !0 === this.options.newWindow
                              ? window.open(this.options.destination, "_blank")
                              : (window.location = this.options.destination));
                        }.bind(this),
                      ),
                    "function" == typeof this.options.onClick &&
                      void 0 === this.options.destination &&
                      e.addEventListener(
                        "click",
                        function (e) {
                          (e.stopPropagation(), this.options.onClick());
                        }.bind(this),
                      ),
                    "object" == typeof this.options.offset)
                  ) {
                    var a = n("x", this.options),
                      l = n("y", this.options),
                      c = "left" == this.options.position ? a : "-" + a,
                      u = "toastify-top" == this.options.gravity ? l : "-" + l;
                    e.style.transform = "translate(" + c + "," + u + ")";
                  }
                  return e;
                },
                showToast: function () {
                  var e;
                  if (
                    ((this.toastElement = this.buildToast()),
                    !(e =
                      "string" == typeof this.options.selector
                        ? document.getElementById(this.options.selector)
                        : this.options.selector instanceof HTMLElement ||
                            ("undefined" != typeof ShadowRoot &&
                              this.options.selector instanceof ShadowRoot)
                          ? this.options.selector
                          : document.body))
                  )
                    throw "Root element is not defined";
                  var n = t.defaults.oldestFirst ? e.firstChild : e.lastChild;
                  return (
                    e.insertBefore(this.toastElement, n),
                    t.reposition(),
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
                removeElement: function (e) {
                  ((e.className = e.className.replace(" on", "")),
                    window.setTimeout(
                      function () {
                        (this.options.node &&
                          this.options.node.parentNode &&
                          this.options.node.parentNode.removeChild(
                            this.options.node,
                          ),
                          e.parentNode && e.parentNode.removeChild(e),
                          this.options.callback.call(e),
                          t.reposition());
                      }.bind(this),
                      400,
                    ));
                },
              }),
            (t.reposition = function () {
              for (
                var e,
                  t = { top: 15, bottom: 15 },
                  n = { top: 15, bottom: 15 },
                  r = { top: 15, bottom: 15 },
                  i = document.getElementsByClassName("toastify"),
                  s = 0;
                s < i.length;
                s++
              ) {
                e =
                  !0 === o(i[s], "toastify-top")
                    ? "toastify-top"
                    : "toastify-bottom";
                var a = i[s].offsetHeight;
                ((e = e.substr(9, e.length - 1)),
                  (window.innerWidth > 0 ? window.innerWidth : screen.width) <=
                  360
                    ? ((i[s].style[e] = r[e] + "px"), (r[e] += a + 15))
                    : !0 === o(i[s], "toastify-left")
                      ? ((i[s].style[e] = t[e] + "px"), (t[e] += a + 15))
                      : ((i[s].style[e] = n[e] + "px"), (n[e] += a + 15)));
              }
              return this;
            }),
            (t.lib.init.prototype = t.lib),
            t
          );
        }),
          e.exports ? (e.exports = t()) : (this.Toastify = t()));
      },
      6262(e, t) {
        "use strict";
        t.A = (e, t) => {
          const n = e.__vccOpts || e;
          for (const [e, o] of t) n[e] = o;
          return n;
        };
      },
      9306(e, t, n) {
        "use strict";
        var o = n(4901),
          r = n(6823),
          i = TypeError;
        e.exports = function (e) {
          if (o(e)) return e;
          throw new i(r(e) + " is not a function");
        };
      },
      7829(e, t, n) {
        "use strict";
        var o = n(8183).charAt;
        e.exports = function (e, t, n) {
          return t + (n ? o(e, t).length : 1);
        };
      },
      8551(e, t, n) {
        "use strict";
        var o = n(34),
          r = String,
          i = TypeError;
        e.exports = function (e) {
          if (o(e)) return e;
          throw new i(r(e) + " is not an object");
        };
      },
      9617(e, t, n) {
        "use strict";
        var o = n(5397),
          r = n(5610),
          i = n(6198),
          s = function (e) {
            return function (t, n, s) {
              var a = o(t),
                l = i(a);
              if (0 === l) return !e && -1;
              var c,
                u = r(s, l);
              if (e && n != n) {
                for (; l > u;) if ((c = a[u++]) != c) return !0;
              } else
                for (; l > u; u++)
                  if ((e || u in a) && a[u] === n) return e || u || 0;
              return !e && -1;
            };
          };
        e.exports = { includes: s(!0), indexOf: s(!1) };
      },
      2195(e, t, n) {
        "use strict";
        var o = n(9504),
          r = o({}.toString),
          i = o("".slice);
        e.exports = function (e) {
          return i(r(e), 8, -1);
        };
      },
      6955(e, t, n) {
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
        e.exports = o
          ? i
          : function (e) {
              var t, n, o;
              return void 0 === e
                ? "Undefined"
                : null === e
                  ? "Null"
                  : "string" ==
                      typeof (n = (function (e, t) {
                        try {
                          return e[t];
                        } catch (e) {}
                      })((t = a(e)), s))
                    ? n
                    : l
                      ? i(t)
                      : "Object" === (o = i(t)) && r(t.callee)
                        ? "Arguments"
                        : o;
            };
      },
      7740(e, t, n) {
        "use strict";
        var o = n(9297),
          r = n(5031),
          i = n(7347),
          s = n(4913);
        e.exports = function (e, t, n) {
          for (var a = r(t), l = s.f, c = i.f, u = 0; u < a.length; u++) {
            var p = a[u];
            o(e, p) || (n && o(n, p)) || l(e, p, c(t, p));
          }
        };
      },
      6699(e, t, n) {
        "use strict";
        var o = n(3724),
          r = n(4913),
          i = n(6980);
        e.exports = o
          ? function (e, t, n) {
              return r.f(e, t, i(1, n));
            }
          : function (e, t, n) {
              return ((e[t] = n), e);
            };
      },
      6980(e) {
        "use strict";
        e.exports = function (e, t) {
          return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t,
          };
        };
      },
      6840(e, t, n) {
        "use strict";
        var o = n(4901),
          r = n(4913),
          i = n(283),
          s = n(9433);
        e.exports = function (e, t, n, a) {
          a || (a = {});
          var l = a.enumerable,
            c = void 0 !== a.name ? a.name : t;
          if ((o(n) && i(n, c, a), a.global)) l ? (e[t] = n) : s(t, n);
          else {
            try {
              a.unsafe ? e[t] && (l = !0) : delete e[t];
            } catch (e) {}
            l
              ? (e[t] = n)
              : r.f(e, t, {
                  value: n,
                  enumerable: !1,
                  configurable: !a.nonConfigurable,
                  writable: !a.nonWritable,
                });
          }
          return e;
        };
      },
      9433(e, t, n) {
        "use strict";
        var o = n(4576),
          r = Object.defineProperty;
        e.exports = function (e, t) {
          try {
            r(o, e, { value: t, configurable: !0, writable: !0 });
          } catch (n) {
            o[e] = t;
          }
          return t;
        };
      },
      3724(e, t, n) {
        "use strict";
        var o = n(9039);
        e.exports = !o(function () {
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
      4055(e, t, n) {
        "use strict";
        var o = n(4576),
          r = n(34),
          i = o.document,
          s = r(i) && r(i.createElement);
        e.exports = function (e) {
          return s ? i.createElement(e) : {};
        };
      },
      8727(e) {
        "use strict";
        e.exports = [
          "constructor",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "toLocaleString",
          "toString",
          "valueOf",
        ];
      },
      2839(e, t, n) {
        "use strict";
        var o = n(4576).navigator,
          r = o && o.userAgent;
        e.exports = r ? String(r) : "";
      },
      9519(e, t, n) {
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
          (e.exports = r));
      },
      6518(e, t, n) {
        "use strict";
        var o = n(4576),
          r = n(7347).f,
          i = n(6699),
          s = n(6840),
          a = n(9433),
          l = n(7740),
          c = n(2796);
        e.exports = function (e, t) {
          var n,
            u,
            p,
            d,
            f,
            h = e.target,
            m = e.global,
            v = e.stat;
          if ((n = m ? o : v ? o[h] || a(h, {}) : o[h] && o[h].prototype))
            for (u in t) {
              if (
                ((d = t[u]),
                (p = e.dontCallGetSet ? (f = r(n, u)) && f.value : n[u]),
                !c(m ? u : h + (v ? "." : "#") + u, e.forced) && void 0 !== p)
              ) {
                if (typeof d == typeof p) continue;
                l(d, p);
              }
              ((e.sham || (p && p.sham)) && i(d, "sham", !0), s(n, u, d, e));
            }
        };
      },
      9039(e) {
        "use strict";
        e.exports = function (e) {
          try {
            return !!e();
          } catch (e) {
            return !0;
          }
        };
      },
      9228(e, t, n) {
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
        e.exports = function (e, t, n, p) {
          var d = a(e),
            f = !s(function () {
              var t = {};
              return (
                (t[d] = function () {
                  return 7;
                }),
                7 !== ""[e](t)
              );
            }),
            h =
              f &&
              !s(function () {
                var t = !1,
                  n = /a/;
                if ("split" === e) {
                  var o = {};
                  ((o[c] = function () {
                    return n;
                  }),
                    ((n = { constructor: o, flags: "" })[d] = /./[d]));
                }
                return (
                  (n.exec = function () {
                    return ((t = !0), null);
                  }),
                  n[d](""),
                  !t
                );
              });
          if (!f || !h || n) {
            var m = /./[d],
              v = t(d, ""[e], function (e, t, n, r, s) {
                var a = t.exec;
                return a === i || a === u.exec
                  ? f && !s
                    ? { done: !0, value: o(m, t, n, r) }
                    : { done: !0, value: o(e, n, t, r) }
                  : { done: !1 };
              });
            (r(String.prototype, e, v[0]), r(u, d, v[1]));
          }
          p && l(u[d], "sham", !0);
        };
      },
      8745(e, t, n) {
        "use strict";
        var o = n(616),
          r = Function.prototype,
          i = r.apply,
          s = r.call;
        e.exports =
          ("object" == typeof Reflect && Reflect.apply) ||
          (o
            ? s.bind(i)
            : function () {
                return s.apply(i, arguments);
              });
      },
      616(e, t, n) {
        "use strict";
        var o = n(9039);
        e.exports = !o(function () {
          var e = function () {}.bind();
          return "function" != typeof e || e.hasOwnProperty("prototype");
        });
      },
      9565(e, t, n) {
        "use strict";
        var o = n(616),
          r = Function.prototype.call;
        e.exports = o
          ? r.bind(r)
          : function () {
              return r.apply(r, arguments);
            };
      },
      350(e, t, n) {
        "use strict";
        var o = n(3724),
          r = n(9297),
          i = Function.prototype,
          s = o && Object.getOwnPropertyDescriptor,
          a = r(i, "name"),
          l = a && "something" === function () {}.name,
          c = a && (!o || (o && s(i, "name").configurable));
        e.exports = { EXISTS: a, PROPER: l, CONFIGURABLE: c };
      },
      9504(e, t, n) {
        "use strict";
        var o = n(616),
          r = Function.prototype,
          i = r.call,
          s = o && r.bind.bind(i, i);
        e.exports = o
          ? s
          : function (e) {
              return function () {
                return i.apply(e, arguments);
              };
            };
      },
      7751(e, t, n) {
        "use strict";
        var o = n(4576),
          r = n(4901);
        e.exports = function (e, t) {
          return arguments.length < 2
            ? ((n = o[e]), r(n) ? n : void 0)
            : o[e] && o[e][t];
          var n;
        };
      },
      5966(e, t, n) {
        "use strict";
        var o = n(9306),
          r = n(4117);
        e.exports = function (e, t) {
          var n = e[t];
          return r(n) ? void 0 : o(n);
        };
      },
      2478(e, t, n) {
        "use strict";
        var o = n(9504),
          r = n(8981),
          i = Math.floor,
          s = o("".charAt),
          a = o("".replace),
          l = o("".slice),
          c = /\$([$&'`]|\d{1,2}|<[^>]*>)/g,
          u = /\$([$&'`]|\d{1,2})/g;
        e.exports = function (e, t, n, o, p, d) {
          var f = n + e.length,
            h = o.length,
            m = u;
          return (
            void 0 !== p && ((p = r(p)), (m = c)),
            a(d, m, function (r, a) {
              var c;
              switch (s(a, 0)) {
                case "$":
                  return "$";
                case "&":
                  return e;
                case "`":
                  return l(t, 0, n);
                case "'":
                  return l(t, f);
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
      4576(e) {
        "use strict";
        var t = function (e) {
          return e && e.Math === Math && e;
        };
        e.exports =
          t("object" == typeof globalThis && globalThis) ||
          t("object" == typeof window && window) ||
          t("object" == typeof self && self) ||
          t("object" == typeof globalThis && globalThis) ||
          t("object" == typeof this && this) ||
          (function () {
            return this;
          })() ||
          Function("return this")();
      },
      9297(e, t, n) {
        "use strict";
        var o = n(9504),
          r = n(8981),
          i = o({}.hasOwnProperty);
        e.exports =
          Object.hasOwn ||
          function (e, t) {
            return i(r(e), t);
          };
      },
      421(e) {
        "use strict";
        e.exports = {};
      },
      397(e, t, n) {
        "use strict";
        var o = n(7751);
        e.exports = o("document", "documentElement");
      },
      5917(e, t, n) {
        "use strict";
        var o = n(3724),
          r = n(9039),
          i = n(4055);
        e.exports =
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
      7055(e, t, n) {
        "use strict";
        var o = n(9504),
          r = n(9039),
          i = n(2195),
          s = Object,
          a = o("".split);
        e.exports = r(function () {
          return !s("z").propertyIsEnumerable(0);
        })
          ? function (e) {
              return "String" === i(e) ? a(e, "") : s(e);
            }
          : s;
      },
      3706(e, t, n) {
        "use strict";
        var o = n(9504),
          r = n(4901),
          i = n(7629),
          s = o(Function.toString);
        (r(i.inspectSource) ||
          (i.inspectSource = function (e) {
            return s(e);
          }),
          (e.exports = i.inspectSource));
      },
      1181(e, t, n) {
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
          m = a.TypeError,
          v = a.WeakMap;
        if (s || p.state) {
          var g = p.state || (p.state = new v());
          ((g.get = g.get),
            (g.has = g.has),
            (g.set = g.set),
            (o = function (e, t) {
              if (g.has(e)) throw new m(h);
              return ((t.facade = e), g.set(e, t), t);
            }),
            (r = function (e) {
              return g.get(e) || {};
            }),
            (i = function (e) {
              return g.has(e);
            }));
        } else {
          var y = d("state");
          ((f[y] = !0),
            (o = function (e, t) {
              if (u(e, y)) throw new m(h);
              return ((t.facade = e), c(e, y, t), t);
            }),
            (r = function (e) {
              return u(e, y) ? e[y] : {};
            }),
            (i = function (e) {
              return u(e, y);
            }));
        }
        e.exports = {
          set: o,
          get: r,
          has: i,
          enforce: function (e) {
            return i(e) ? r(e) : o(e, {});
          },
          getterFor: function (e) {
            return function (t) {
              var n;
              if (!l(t) || (n = r(t)).type !== e)
                throw new m("Incompatible receiver, " + e + " required");
              return n;
            };
          },
        };
      },
      4901(e) {
        "use strict";
        var t = "object" == typeof document && document.all;
        e.exports =
          void 0 === t && void 0 !== t
            ? function (e) {
                return "function" == typeof e || e === t;
              }
            : function (e) {
                return "function" == typeof e;
              };
      },
      2796(e, t, n) {
        "use strict";
        var o = n(9039),
          r = n(4901),
          i = /#|\.prototype\./,
          s = function (e, t) {
            var n = l[a(e)];
            return n === u || (n !== c && (r(t) ? o(t) : !!t));
          },
          a = (s.normalize = function (e) {
            return String(e).replace(i, ".").toLowerCase();
          }),
          l = (s.data = {}),
          c = (s.NATIVE = "N"),
          u = (s.POLYFILL = "P");
        e.exports = s;
      },
      4117(e) {
        "use strict";
        e.exports = function (e) {
          return null == e;
        };
      },
      34(e, t, n) {
        "use strict";
        var o = n(4901);
        e.exports = function (e) {
          return "object" == typeof e ? null !== e : o(e);
        };
      },
      6395(e) {
        "use strict";
        e.exports = !1;
      },
      757(e, t, n) {
        "use strict";
        var o = n(7751),
          r = n(4901),
          i = n(1625),
          s = n(7040),
          a = Object;
        e.exports = s
          ? function (e) {
              return "symbol" == typeof e;
            }
          : function (e) {
              var t = o("Symbol");
              return r(t) && i(t.prototype, a(e));
            };
      },
      6198(e, t, n) {
        "use strict";
        var o = n(8014);
        e.exports = function (e) {
          return o(e.length);
        };
      },
      283(e, t, n) {
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
          m = o("".slice),
          v = o("".replace),
          g = o([].join),
          y =
            a &&
            !r(function () {
              return 8 !== h(function () {}, "length", { value: 8 }).length;
            }),
          b = String(String).split("String"),
          w = (e.exports = function (e, t, n) {
            ("Symbol(" === m(f(t), 0, 7) &&
              (t = "[" + v(f(t), /^Symbol\(([^)]*)\).*$/, "$1") + "]"),
              n && n.getter && (t = "get " + t),
              n && n.setter && (t = "set " + t),
              (!s(e, "name") || (l && e.name !== t)) &&
                (a
                  ? h(e, "name", { value: t, configurable: !0 })
                  : (e.name = t)),
              y &&
                n &&
                s(n, "arity") &&
                e.length !== n.arity &&
                h(e, "length", { value: n.arity }));
            try {
              n && s(n, "constructor") && n.constructor
                ? a && h(e, "prototype", { writable: !1 })
                : e.prototype && (e.prototype = void 0);
            } catch (e) {}
            var o = p(e);
            return (
              s(o, "source") ||
                (o.source = g(b, "string" == typeof t ? t : "")),
              e
            );
          });
        Function.prototype.toString = w(function () {
          return (i(this) && d(this).source) || c(this);
        }, "toString");
      },
      741(e) {
        "use strict";
        var t = Math.ceil,
          n = Math.floor;
        e.exports =
          Math.trunc ||
          function (e) {
            var o = +e;
            return (o > 0 ? n : t)(o);
          };
      },
      2360(e, t, n) {
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
          m = function (e) {
            return "<" + d + ">" + e + "</" + d + ">";
          },
          v = function (e) {
            (e.write(m("")), e.close());
            var t = e.parentWindow.Object;
            return ((e = null), t);
          },
          g = function () {
            try {
              o = new ActiveXObject("htmlfile");
            } catch (e) {}
            var e, t, n;
            g =
              "undefined" != typeof document
                ? document.domain && o
                  ? v(o)
                  : ((t = c("iframe")),
                    (n = "java" + d + ":"),
                    (t.style.display = "none"),
                    l.appendChild(t),
                    (t.src = String(n)),
                    (e = t.contentWindow.document).open(),
                    e.write(m("document.F=Object")),
                    e.close(),
                    e.F)
                : v(o);
            for (var r = s.length; r--;) delete g[p][s[r]];
            return g();
          };
        ((a[f] = !0),
          (e.exports =
            Object.create ||
            function (e, t) {
              var n;
              return (
                null !== e
                  ? ((h[p] = r(e)), (n = new h()), (h[p] = null), (n[f] = e))
                  : (n = g()),
                void 0 === t ? n : i.f(n, t)
              );
            }));
      },
      6801(e, t, n) {
        "use strict";
        var o = n(3724),
          r = n(8686),
          i = n(4913),
          s = n(8551),
          a = n(5397),
          l = n(1072);
        t.f =
          o && !r
            ? Object.defineProperties
            : function (e, t) {
                s(e);
                for (var n, o = a(t), r = l(t), c = r.length, u = 0; c > u;)
                  i.f(e, (n = r[u++]), o[n]);
                return e;
              };
      },
      4913(e, t, n) {
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
        t.f = o
          ? i
            ? function (e, t, n) {
                if (
                  (s(e),
                  (t = a(t)),
                  s(n),
                  "function" == typeof e &&
                    "prototype" === t &&
                    "value" in n &&
                    f in n &&
                    !n[f])
                ) {
                  var o = u(e, t);
                  o &&
                    o[f] &&
                    ((e[t] = n.value),
                    (n = {
                      configurable: d in n ? n[d] : o[d],
                      enumerable: p in n ? n[p] : o[p],
                      writable: !1,
                    }));
                }
                return c(e, t, n);
              }
            : c
          : function (e, t, n) {
              if ((s(e), (t = a(t)), s(n), r))
                try {
                  return c(e, t, n);
                } catch (e) {}
              if ("get" in n || "set" in n)
                throw new l("Accessors not supported");
              return ("value" in n && (e[t] = n.value), e);
            };
      },
      7347(e, t, n) {
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
        t.f = o
          ? p
          : function (e, t) {
              if (((e = a(e)), (t = l(t)), u))
                try {
                  return p(e, t);
                } catch (e) {}
              if (c(e, t)) return s(!r(i.f, e, t), e[t]);
            };
      },
      8480(e, t, n) {
        "use strict";
        var o = n(1828),
          r = n(8727).concat("length", "prototype");
        t.f =
          Object.getOwnPropertyNames ||
          function (e) {
            return o(e, r);
          };
      },
      3717(e, t) {
        "use strict";
        t.f = Object.getOwnPropertySymbols;
      },
      1625(e, t, n) {
        "use strict";
        var o = n(9504);
        e.exports = o({}.isPrototypeOf);
      },
      1828(e, t, n) {
        "use strict";
        var o = n(9504),
          r = n(9297),
          i = n(5397),
          s = n(9617).indexOf,
          a = n(421),
          l = o([].push);
        e.exports = function (e, t) {
          var n,
            o = i(e),
            c = 0,
            u = [];
          for (n in o) !r(a, n) && r(o, n) && l(u, n);
          for (; t.length > c;) r(o, (n = t[c++])) && (~s(u, n) || l(u, n));
          return u;
        };
      },
      1072(e, t, n) {
        "use strict";
        var o = n(1828),
          r = n(8727);
        e.exports =
          Object.keys ||
          function (e) {
            return o(e, r);
          };
      },
      8773(e, t) {
        "use strict";
        var n = {}.propertyIsEnumerable,
          o = Object.getOwnPropertyDescriptor,
          r = o && !n.call({ 1: 2 }, 1);
        t.f = r
          ? function (e) {
              var t = o(this, e);
              return !!t && t.enumerable;
            }
          : n;
      },
      4270(e, t, n) {
        "use strict";
        var o = n(9565),
          r = n(4901),
          i = n(34),
          s = TypeError;
        e.exports = function (e, t) {
          var n, a;
          if ("string" === t && r((n = e.toString)) && !i((a = o(n, e))))
            return a;
          if (r((n = e.valueOf)) && !i((a = o(n, e)))) return a;
          if ("string" !== t && r((n = e.toString)) && !i((a = o(n, e))))
            return a;
          throw new s("Can't convert object to primitive value");
        };
      },
      5031(e, t, n) {
        "use strict";
        var o = n(7751),
          r = n(9504),
          i = n(8480),
          s = n(3717),
          a = n(8551),
          l = r([].concat);
        e.exports =
          o("Reflect", "ownKeys") ||
          function (e) {
            var t = i.f(a(e)),
              n = s.f;
            return n ? l(t, n(e)) : t;
          };
      },
      6682(e, t, n) {
        "use strict";
        var o = n(9565),
          r = n(8551),
          i = n(4901),
          s = n(2195),
          a = n(7323),
          l = TypeError;
        e.exports = function (e, t) {
          var n = e.exec;
          if (i(n)) {
            var c = o(n, e, t);
            return (null !== c && r(c), c);
          }
          if ("RegExp" === s(e)) return o(a, e, t);
          throw new l("RegExp#exec called on incompatible receiver");
        };
      },
      7323(e, t, n) {
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
          m = u("native-string-replace", String.prototype.replace),
          v = RegExp.prototype.exec,
          g = v,
          y = s("".charAt),
          b = s("".indexOf),
          w = s("".replace),
          x = s("".slice),
          _ =
            ((r = /b*/g),
            i(v, (o = /a/), "a"),
            i(v, r, "a"),
            0 !== o.lastIndex || 0 !== r.lastIndex),
          O = c.BROKEN_CARET,
          S = void 0 !== /()??/.exec("")[1];
        ((_ || S || O || f || h) &&
          (g = function (e) {
            var t,
              n,
              o,
              r,
              s,
              c,
              u,
              f = this,
              h = d(f),
              E = a(e),
              k = h.raw;
            if (k)
              return (
                (k.lastIndex = f.lastIndex),
                (t = i(g, k, E)),
                (f.lastIndex = k.lastIndex),
                t
              );
            var C = h.groups,
              T = O && f.sticky,
              A = i(l, f),
              L = f.source,
              P = 0,
              j = E;
            if (
              (T &&
                ((A = w(A, "y", "")),
                -1 === b(A, "g") && (A += "g"),
                (j = x(E, f.lastIndex)),
                f.lastIndex > 0 &&
                  (!f.multiline ||
                    (f.multiline && "\n" !== y(E, f.lastIndex - 1))) &&
                  ((L = "(?: " + L + ")"), (j = " " + j), P++),
                (n = new RegExp("^(?:" + L + ")", A))),
              S && (n = new RegExp("^" + L + "$(?!\\s)", A)),
              _ && (o = f.lastIndex),
              (r = i(v, T ? n : f, j)),
              T
                ? r
                  ? ((r.input = x(r.input, P)),
                    (r[0] = x(r[0], P)),
                    (r.index = f.lastIndex),
                    (f.lastIndex += r[0].length))
                  : (f.lastIndex = 0)
                : _ &&
                  r &&
                  (f.lastIndex = f.global ? r.index + r[0].length : o),
              S &&
                r &&
                r.length > 1 &&
                i(m, r[0], n, function () {
                  for (s = 1; s < arguments.length - 2; s++)
                    void 0 === arguments[s] && (r[s] = void 0);
                }),
              r && C)
            )
              for (r.groups = c = p(null), s = 0; s < C.length; s++)
                c[(u = C[s])[0]] = r[u[1]];
            return r;
          }),
          (e.exports = g));
      },
      5213(e, t, n) {
        "use strict";
        var o = n(4576),
          r = n(9039),
          i = o.RegExp,
          s = !r(function () {
            var e = !0;
            try {
              i(".", "d");
            } catch (t) {
              e = !1;
            }
            var t = {},
              n = "",
              o = e ? "dgimsy" : "gimsy",
              r = function (e, o) {
                Object.defineProperty(t, e, {
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
            for (var a in (e && (s.hasIndices = "d"), s)) r(a, s[a]);
            return (
              Object.getOwnPropertyDescriptor(i.prototype, "flags").get.call(
                t,
              ) !== o || n !== o
            );
          });
        e.exports = { correct: s };
      },
      7979(e, t, n) {
        "use strict";
        var o = n(8551);
        e.exports = function () {
          var e = o(this),
            t = "";
          return (
            e.hasIndices && (t += "d"),
            e.global && (t += "g"),
            e.ignoreCase && (t += "i"),
            e.multiline && (t += "m"),
            e.dotAll && (t += "s"),
            e.unicode && (t += "u"),
            e.unicodeSets && (t += "v"),
            e.sticky && (t += "y"),
            t
          );
        };
      },
      1034(e, t, n) {
        "use strict";
        var o = n(9565),
          r = n(9297),
          i = n(1625),
          s = n(5213),
          a = n(7979),
          l = RegExp.prototype;
        e.exports = s.correct
          ? function (e) {
              return e.flags;
            }
          : function (e) {
              return s.correct || !i(l, e) || r(e, "flags") ? e.flags : o(a, e);
            };
      },
      8429(e, t, n) {
        "use strict";
        var o = n(9039),
          r = n(4576).RegExp,
          i = o(function () {
            var e = r("a", "y");
            return ((e.lastIndex = 2), null !== e.exec("abcd"));
          }),
          s =
            i ||
            o(function () {
              return !r("a", "y").sticky;
            }),
          a =
            i ||
            o(function () {
              var e = r("^r", "gy");
              return ((e.lastIndex = 2), null !== e.exec("str"));
            });
        e.exports = { BROKEN_CARET: a, MISSED_STICKY: s, UNSUPPORTED_Y: i };
      },
      3635(e, t, n) {
        "use strict";
        var o = n(9039),
          r = n(4576).RegExp;
        e.exports = o(function () {
          var e = r(".", "s");
          return !(e.dotAll && e.test("\n") && "s" === e.flags);
        });
      },
      8814(e, t, n) {
        "use strict";
        var o = n(9039),
          r = n(4576).RegExp;
        e.exports = o(function () {
          var e = r("(?<a>b)", "g");
          return (
            "b" !== e.exec("b").groups.a || "bc" !== "b".replace(e, "$<a>c")
          );
        });
      },
      7750(e, t, n) {
        "use strict";
        var o = n(4117),
          r = TypeError;
        e.exports = function (e) {
          if (o(e)) throw new r("Can't call method on " + e);
          return e;
        };
      },
      6119(e, t, n) {
        "use strict";
        var o = n(5745),
          r = n(3392),
          i = o("keys");
        e.exports = function (e) {
          return i[e] || (i[e] = r(e));
        };
      },
      7629(e, t, n) {
        "use strict";
        var o = n(6395),
          r = n(4576),
          i = n(9433),
          s = "__core-js_shared__",
          a = (e.exports = r[s] || i(s, {}));
        (a.versions || (a.versions = [])).push({
          version: "3.48.0",
          mode: o ? "pure" : "global",
          copyright:
            "© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.",
          license: "https://github.com/zloirock/core-js/blob/v3.48.0/LICENSE",
          source: "https://github.com/zloirock/core-js",
        });
      },
      5745(e, t, n) {
        "use strict";
        var o = n(7629);
        e.exports = function (e, t) {
          return o[e] || (o[e] = t || {});
        };
      },
      8183(e, t, n) {
        "use strict";
        var o = n(9504),
          r = n(1291),
          i = n(655),
          s = n(7750),
          a = o("".charAt),
          l = o("".charCodeAt),
          c = o("".slice),
          u = function (e) {
            return function (t, n) {
              var o,
                u,
                p = i(s(t)),
                d = r(n),
                f = p.length;
              return d < 0 || d >= f
                ? e
                  ? ""
                  : void 0
                : (o = l(p, d)) < 55296 ||
                    o > 56319 ||
                    d + 1 === f ||
                    (u = l(p, d + 1)) < 56320 ||
                    u > 57343
                  ? e
                    ? a(p, d)
                    : o
                  : e
                    ? c(p, d, d + 2)
                    : u - 56320 + ((o - 55296) << 10) + 65536;
            };
          };
        e.exports = { codeAt: u(!1), charAt: u(!0) };
      },
      4495(e, t, n) {
        "use strict";
        var o = n(9519),
          r = n(9039),
          i = n(4576).String;
        e.exports =
          !!Object.getOwnPropertySymbols &&
          !r(function () {
            var e = Symbol("symbol detection");
            return (
              !i(e) ||
              !(Object(e) instanceof Symbol) ||
              (!Symbol.sham && o && o < 41)
            );
          });
      },
      5610(e, t, n) {
        "use strict";
        var o = n(1291),
          r = Math.max,
          i = Math.min;
        e.exports = function (e, t) {
          var n = o(e);
          return n < 0 ? r(n + t, 0) : i(n, t);
        };
      },
      5397(e, t, n) {
        "use strict";
        var o = n(7055),
          r = n(7750);
        e.exports = function (e) {
          return o(r(e));
        };
      },
      1291(e, t, n) {
        "use strict";
        var o = n(741);
        e.exports = function (e) {
          var t = +e;
          return t != t || 0 === t ? 0 : o(t);
        };
      },
      8014(e, t, n) {
        "use strict";
        var o = n(1291),
          r = Math.min;
        e.exports = function (e) {
          var t = o(e);
          return t > 0 ? r(t, 9007199254740991) : 0;
        };
      },
      8981(e, t, n) {
        "use strict";
        var o = n(7750),
          r = Object;
        e.exports = function (e) {
          return r(o(e));
        };
      },
      2777(e, t, n) {
        "use strict";
        var o = n(9565),
          r = n(34),
          i = n(757),
          s = n(5966),
          a = n(4270),
          l = n(8227),
          c = TypeError,
          u = l("toPrimitive");
        e.exports = function (e, t) {
          if (!r(e) || i(e)) return e;
          var n,
            l = s(e, u);
          if (l) {
            if (
              (void 0 === t && (t = "default"), (n = o(l, e, t)), !r(n) || i(n))
            )
              return n;
            throw new c("Can't convert object to primitive value");
          }
          return (void 0 === t && (t = "number"), a(e, t));
        };
      },
      6969(e, t, n) {
        "use strict";
        var o = n(2777),
          r = n(757);
        e.exports = function (e) {
          var t = o(e, "string");
          return r(t) ? t : t + "";
        };
      },
      2140(e, t, n) {
        "use strict";
        var o = {};
        ((o[n(8227)("toStringTag")] = "z"),
          (e.exports = "[object z]" === String(o)));
      },
      655(e, t, n) {
        "use strict";
        var o = n(6955),
          r = String;
        e.exports = function (e) {
          if ("Symbol" === o(e))
            throw new TypeError("Cannot convert a Symbol value to a string");
          return r(e);
        };
      },
      6823(e) {
        "use strict";
        var t = String;
        e.exports = function (e) {
          try {
            return t(e);
          } catch (e) {
            return "Object";
          }
        };
      },
      3392(e, t, n) {
        "use strict";
        var o = n(9504),
          r = 0,
          i = Math.random(),
          s = o((1.1).toString);
        e.exports = function (e) {
          return "Symbol(" + (void 0 === e ? "" : e) + ")_" + s(++r + i, 36);
        };
      },
      7040(e, t, n) {
        "use strict";
        var o = n(4495);
        e.exports = o && !Symbol.sham && "symbol" == typeof Symbol.iterator;
      },
      8686(e, t, n) {
        "use strict";
        var o = n(3724),
          r = n(9039);
        e.exports =
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
      8622(e, t, n) {
        "use strict";
        var o = n(4576),
          r = n(4901),
          i = o.WeakMap;
        e.exports = r(i) && /native code/.test(String(i));
      },
      8227(e, t, n) {
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
        e.exports = function (e) {
          return (
            i(u, e) || (u[e] = a && i(c, e) ? c[e] : p("Symbol." + e)),
            u[e]
          );
        };
      },
      4185(e, t, n) {
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
      7495(e, t, n) {
        "use strict";
        var o = n(6518),
          r = n(7323);
        o({ target: "RegExp", proto: !0, forced: /./.exec !== r }, { exec: r });
      },
      5440(e, t, n) {
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
          m = n(7829),
          v = n(5966),
          g = n(2478),
          y = n(1034),
          b = n(6682),
          w = n(8227)("replace"),
          x = Math.max,
          _ = Math.min,
          O = i([].concat),
          S = i([].push),
          E = i("".indexOf),
          k = i("".slice),
          C = function (e) {
            return void 0 === e ? e : String(e);
          },
          T = "$0" === "a".replace(/./, "$0"),
          A = !!/./[w] && "" === /./[w]("a", "$0");
        s(
          "replace",
          function (e, t, n) {
            var i = A ? "$" : "$0";
            return [
              function (e, n) {
                var o = h(this),
                  i = u(e) ? v(e, w) : void 0;
                return i ? r(i, e, o, n) : r(t, f(o), e, n);
              },
              function (e, r) {
                var s = l(this),
                  a = f(e);
                if (
                  "string" == typeof r &&
                  -1 === E(r, i) &&
                  -1 === E(r, "$<")
                ) {
                  var u = n(t, s, a, r);
                  if (u.done) return u.value;
                }
                var h = c(r);
                h || (r = f(r));
                var v,
                  w = f(y(s)),
                  T = -1 !== E(w, "g");
                T && ((v = -1 !== E(w, "u")), (s.lastIndex = 0));
                for (var A, L = []; null !== (A = b(s, a)) && (S(L, A), T);)
                  "" === f(A[0]) && (s.lastIndex = m(a, d(s.lastIndex), v));
                for (var P = "", j = 0, I = 0; I < L.length; I++) {
                  for (
                    var D,
                      R = f((A = L[I])[0]),
                      V = x(_(p(A.index), a.length), 0),
                      N = [],
                      M = 1;
                    M < A.length;
                    M++
                  )
                    S(N, C(A[M]));
                  var H = A.groups;
                  if (h) {
                    var U = O([R], N, V, a);
                    (void 0 !== H && S(U, H), (D = f(o(r, void 0, U))));
                  } else D = g(R, a, V, N, H, r);
                  V >= j && ((P += k(a, j, V) + D), (j = V + R.length));
                }
                return P + k(a, j);
              },
            ];
          },
          !!a(function () {
            var e = /./;
            return (
              (e.exec = function () {
                var e = [];
                return ((e.groups = { a: "7" }), e);
              }),
              "7" !== "".replace(e, "$<a>")
            );
          }) ||
            !T ||
            A,
        );
      },
    },
    t = {};
  function n(o) {
    var r = t[o];
    if (void 0 !== r) return r.exports;
    var i = (t[o] = { exports: {} });
    return (e[o].call(i.exports, i, i.exports, n), i.exports);
  }
  ((n.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return (n.d(t, { a: t }), t);
  }),
    (n.d = (e, t) => {
      for (var o in t)
        n.o(t, o) &&
          !n.o(e, o) &&
          Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
    }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      "use strict";
      const e = function (e, t, n, o) {
        var r;
        ("function" != typeof n || o || ((o = n), (n = t)),
          t instanceof Element
            ? t.addEventListener(e, function (e) {
                o.call(t, e);
              })
            : ("string" == typeof t && (r = document.querySelectorAll(t)),
              r &&
                r.forEach(function (r) {
                  r.addEventListener(e, function (e) {
                    var r = e.target;
                    if (r !== this || n !== t) {
                      for (; r && r != this; r = r.parentElement)
                        if ("string" == typeof n && r.matches(n)) {
                          o.call(r, e);
                          break;
                        }
                    } else o.call(r, e);
                  });
                })));
      };
      var t = n(9498),
        o = n(7736),
        r = n.n(o),
        i = n(8670),
        s = (function () {
          function e(e, t) {
            ((this.actionLink = !0),
              (this.bodyClass = "vapor-table-data"),
              (this.rowClass = "table-row"),
              (this.headingClass = "table-heading"),
              (this.cellClass = "table-cell"),
              (this.tableContainer = "vapor-table-wrapper"),
              (this.table = document.getElementById(this.tableContainer)),
              e &&
                t &&
                ((this.table.innerHTML = ""),
                (this.rows = t),
                (this.heading = e)));
          }
          return (
            (e.getInstance = function (t, n) {
              return new e(t, n);
            }),
            (e.prototype.create = function () {
              var e = this.createHeading(),
                t = this.createRow();
              return (
                this.table.appendChild(e),
                this.table.appendChild(t),
                this
              );
            }),
            (e.prototype.clear = function () {
              this.table.innerHTML = "";
            }),
            (e.prototype.loading = function () {
              return (
                (this.table.innerHTML =
                  '<div class="text-center"><div class="spinner-border" role="status"> <span class="visually-hidden">Loading...</span></div></div>'),
                this
              );
            }),
            (e.prototype.noData = function () {
              this.clear();
              var e = document.createElement("div");
              (e.classList.add("no-items"),
                e.appendChild(document.createTextNode(f.t("No items"))),
                this.table.appendChild(e));
            }),
            (e.prototype.createHeading = function (e) {
              var t = this;
              void 0 === e && (e = "table-heading");
              var n = document.createElement("section");
              n.classList.add(this.headingClass);
              var o = document.createElement("header");
              return (
                o.classList.add(this.rowClass),
                n.classList.add(this.headingClass),
                this.heading.forEach(function (n) {
                  var r = document.createElement("div");
                  (r.classList.add(e + "-" + n.toLowerCase()),
                    r.classList.add(t.cellClass));
                  var i = document.createTextNode(f.t(f.ucfirst(n)));
                  (r.appendChild(i), o.appendChild(r));
                }),
                n.appendChild(o),
                n
              );
            }),
            (e.prototype.createRow = function () {
              var e,
                t = this,
                n = document.createElement("section");
              (n.classList.add(this.bodyClass), n.classList.add("table-body"));
              for (
                var o = function (o) {
                    if (null === o) return "continue";
                    var i;
                    (e = document.createElement("div")).classList.add(
                      r.rowClass,
                    );
                    var s = function (n) {
                      if ("data" == n.substring(0, 4)) {
                        var s = n.replace("_", "-");
                        return (
                          "string" == typeof o[n] &&
                            (e.setAttribute(s, o[n]), e.setAttribute("id", n)),
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
                          l.forEach(function (e) {
                            if (e.name) {
                              var n = e.data || "";
                              c.appendChild(
                                t.createActionButton(e.name, e.path, n),
                              );
                            }
                          }),
                          a.appendChild(c),
                          e.appendChild(a));
                      } else {
                        var u;
                        if (Array.isArray(o[n]))
                          return (
                            o[n].forEach(function (e) {
                              ((u = document.createElement("div")),
                                f.isHtml(e)
                                  ? (u.innerHTML = e)
                                  : ((i = document.createTextNode(e)),
                                    u.appendChild(i)),
                                a.appendChild(u));
                            }),
                            a.setAttribute("id", [r.cellClass, n].join("-")),
                            e.appendChild(a),
                            "continue"
                          );
                        "string" == typeof o[n] &&
                          ((i = document.createTextNode(o[n])),
                          a.appendChild(i),
                          a.setAttribute("id", [r.cellClass, n].join("-")),
                          e.appendChild(a));
                      }
                    };
                    for (var a in o) s(a);
                    n.appendChild(e);
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
            (e.prototype.createActionButton = function (e, t, n) {
              var o = document.createElement("button");
              return (
                o.classList.add("icon-" + e),
                o.setAttribute("path", t),
                o.setAttribute("data", n || "nodata"),
                "refresh" == e && (e = f.t("Redownload")),
                o.setAttribute("data-tippy-content", f.ucfirst(e)),
                o.setAttribute("title", f.ucfirst(e)),
                o.setAttribute("id", e + "-action-button"),
                o
              );
            }),
            (e.prototype.createActionCell = function (e) {
              var t = document.createElement("div"),
                n = document.createElement("button");
              (n.classList.add("icon-more", "action-button"),
                n.setAttribute("id", "action-links-button"),
                t.classList.add("action-item"),
                t.appendChild(n),
                e.appendChild(t));
            }),
            e
          );
        })();
      const a = s;
      var l = (function () {
        function e(e, t) {
          (void 0 === t && (t = !1),
            (this.url = e),
            (this.method = "POST"),
            (this.data = null),
            (this.contentType = "application/json"),
            (this.legacyHttp = t),
            t || (this.headers = new Headers()));
        }
        return (
          (e.prototype.isFetchAPISupported = function () {
            return "function" == typeof fetch;
          }),
          (e.create = function (e, t) {
            return (void 0 === t && (t = !1), new l(e, t));
          }),
          (e.prototype.setData = function (e) {
            return ((this.data = e), this);
          }),
          (e.prototype.setContentType = function (e) {
            return ((this.contentType = e), this);
          }),
          (e.prototype.send = function () {
            var e = this,
              t = this.getToken();
            if (!this.isFetchAPISupported() || this.legacyHttp) {
              ((this.client = new XMLHttpRequest()),
                this.client.open(this.method, this.url),
                this.contentType &&
                  this.setHeader("Content-Type", this.contentType),
                t &&
                  (this.setHeader("requesttoken", t),
                  this.setHeader("OCS-APIREQUEST", "true")));
              var n = this.handler;
              ((this.client.onreadystatechange = function () {
                if (e.client.readyState === XMLHttpRequest.DONE) {
                  var t = e.client.status,
                    o = e.client.getResponseHeader("Content-Type");
                  (0 === t || (t >= 200 && t < 400)) &&
                    ("function" == typeof n &&
                    -1 !== o.indexOf("application/json")
                      ? n(JSON.parse(e.client.response))
                      : n(e.client.response));
                }
              }),
                (this.client.onerror = this.errorHandler));
              var o = this.data ? JSON.stringify(this.data) : null;
              this.client.send(o);
            } else {
              var r = this.getRequestOpts();
              fetch(r)
                .then(function (t) {
                  if (200 === t.status) {
                    var n = t.headers.get("content-type");
                    n && -1 !== n.indexOf("application/json")
                      ? t.json().then(function (t) {
                          e.handler(t);
                        })
                      : t.text().then(function (t) {
                          e.handler(t);
                        });
                  } else
                    console.log("Network failures. Status Code: " + t.status);
                })
                .catch(this.errorHandler);
            }
          }),
          (e.prototype.setHeader = function (e, t) {
            this.legacyHttp
              ? this.client.setRequestHeader(e, t)
              : this.headers.set(e, t);
          }),
          (e.prototype.appendHeader = function (e, t) {
            this.headers.append(e, t);
          }),
          (e.prototype.getRequestOpts = function () {
            var e;
            if (
              (this.setHeader("content-type", this.contentType),
              (e = this.getToken()) &&
                (this.setHeader("requesttoken", e),
                this.setHeader("OCS-APIREQUEST", "true")),
              "POST" == this.method && this.data)
            )
              var t = JSON.stringify(this.data);
            var n = {
              headers: this.headers,
              method: this.method,
              body: t,
              mode: "cors",
              cache: "default",
            };
            return new Request(this.url, n);
          }),
          (e.prototype.getToken = function () {
            return "undefined" == typeof document
              ? null
              : window.document
                  .getElementsByTagName("head")[0]
                  .getAttribute("data-requesttoken");
          }),
          (e.prototype.setUrl = function (e) {
            return ((this.url = e), this);
          }),
          (e.prototype.setMethod = function (e) {
            return ((this.method = e), this);
          }),
          (e.prototype.setHandler = function (e) {
            return ((this.handler = e || function (e) {}), this);
          }),
          (e.prototype.setErrorHandler = function (e) {
            return (
              (this.errorHandler =
                e ||
                function (e) {
                  console.log(e);
                }),
              this
            );
          }),
          (e.prototype.upload = function (e) {
            var t = this,
              n = new FormData();
            ((this.client = new XMLHttpRequest()),
              this.client.open(this.method, this.url, !0),
              this.setHeader("requesttoken", this.getToken()),
              this.setHeader("OCS-APIREQUEST", "true"));
            var o = this.handler;
            return (
              (this.client.onload = function () {
                "function" == typeof o && o(JSON.parse(t.client.response));
              }),
              n.append("torrentfile", e),
              this.client.send(n)
            );
          }),
          e
        );
      })();
      const c = l;
      const u = (function () {
        function e() {
          ((this.delay = 1500), (this.enabled = !1), (this.enabled = !1));
        }
        return (
          (e.create = function () {
            return ((this.instance = this.instance || new e()), this.instance);
          }),
          (e.prototype.enable = function () {
            return ((this.enabled = !0), this);
          }),
          (e.prototype.disable = function () {
            return ((this.enabled = !1), this);
          }),
          (e.prototype.isEnabled = function () {
            return this.enabled;
          }),
          (e.prototype.setDelay = function (e) {
            return (void 0 === e && (e = 1500), (this.delay = e), this);
          }),
          (e.prototype.run = function (e) {
            for (var t = this, n = [], o = 1; o < arguments.length; o++)
              n[o - 1] = arguments[o];
            (this.clear().enable(),
              e.apply(void 0, n),
              (this.timeoutID = window.setTimeout(function () {
                t.enabled &&
                  t.run.apply(
                    t,
                    (function (e, t, n) {
                      if (n || 2 === arguments.length)
                        for (var o, r = 0, i = t.length; r < i; r++)
                          (!o && r in t) ||
                            (o || (o = Array.prototype.slice.call(t, 0, r)),
                            (o[r] = t[r]));
                      return e.concat(o || Array.prototype.slice.call(t));
                    })([e], n, !1),
                  );
              }, this.delay)));
          }),
          (e.prototype.clear = function () {
            return (
              this.timeoutID && window.clearTimeout(this.timeoutID),
              this
            );
          }),
          e
        );
      })();
      const p = (function () {
          function t(e) {
            var t = this;
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
                onSelect: function (e, t, n) {},
                data: [],
                renderer: function (e, t) {
                  t = t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                  var n = new RegExp(
                    "(".concat(t.split(" ").join("|"), ")"),
                    "gi",
                  );
                  return '<div class="suggestion-item" data-val="'
                    .concat(e, '">')
                    .concat(e.replace(n, "<b>$1</b>"), "</div>");
                },
              }),
              Object.assign(this.options, e),
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
              : n.forEach(function (e) {
                  var n = { element: e, sgBox: null, cache: [], lastValue: "" };
                  t.elements.push(n);
                });
          }
          return (
            (t.getInstance = function (e) {
              return new t(e);
            }),
            (t.prototype.run = function () {
              for (var e = 0, t = this.elements; e < t.length; e++) {
                var n = t[e];
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
            (t.prototype.getCache = function (e, t) {
              var n = [];
              if (!t) return n;
              if (e in t) n = t[e];
              else
                for (var o = 1; o < e.length - this.options.minChars; o++) {
                  var r = e.slice(0, e.length - o);
                  r in t && !t[r].length && n.push(t[r]);
                }
              return n;
            }),
            (t.prototype.hideBox = function (e) {
              e.style.display = "none";
            }),
            (t.prototype.showResult = function (e, t) {
              var n = this;
              e = e.toLowerCase();
              var o,
                r = [];
              if (
                ((o = this.options.sourceHandler
                  ? this.options.sourceHandler()
                  : this.options.data),
                !this.options.cache)
              ) {
                for (var i = 0, s = o; i < s.length; i++)
                  -1 !== (c = s[i]).toLowerCase().indexOf(e, 0) && r.push(c);
                window.setTimeout(function () {
                  return n.suggest(e, t, r);
                }, this.options.delay);
              }
              if ((r = this.getCache(e, t.cache)).length >= 1)
                this.suggest(e, t, r);
              else {
                for (var a = 0, l = o; a < l.length; a++) {
                  var c;
                  -1 !== (c = l[a]).toLowerCase().indexOf(e, 0) && r.push(c);
                }
                ((t.cache[e] = r),
                  window.setTimeout(function () {
                    return n.suggest(e, t, r);
                  }, this.options.delay));
              }
            }),
            (t.prototype.suggest = function (e, t, n) {
              if (t) {
                var o = t.sgBox;
                if (n.length && e.length >= this.options.minChars) {
                  for (var r = "", i = 0; i < n.length; i++)
                    r += this.options.renderer(n[i], e);
                  ((o.box.innerHTML = r), this.updateSuggestionBox(t, !1));
                } else this.hideBox(o.box);
              }
            }),
            (t.prototype.updatePosition = function (e, t) {
              var n = t.getBoundingClientRect();
              ((e.style.left =
                Math.round(
                  n.left +
                    (window.pageXOffset ||
                      document.documentElement.scrollLeft) +
                    this.options.offsetLeft,
                ) + "px"),
                (e.style.top =
                  Math.round(
                    n.bottom +
                      (window.pageYOffset ||
                        document.documentElement.scrollTop) +
                      this.options.offsetTop,
                  ) + "px"),
                (e.style.width = Math.round(n.right - n.left) + "px"));
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
            (t.hasClass = function (e, t) {
              return e.classList
                ? e.classList.contains(t)
                : new RegExp("\\b" + t + "\\b").test(e.className);
            }),
            (t.prototype.attach = function (t, n, o, r) {
              e(t, n, o, r);
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
            (t.prototype.blurCallback = function (e) {
              var t,
                n = this,
                o = e.sgBox;
              try {
                t = document.querySelector(".suggestion-container:hover");
              } catch (e) {
                t = 0;
              }
              t
                ? e.element !== document.activeElement &&
                  window.setTimeout(function () {
                    e.element.focus();
                  }, 20)
                : ((e.lastValue = e.element.value),
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
            (t.prototype.keyDownCallback = function (e, t) {
              var n = this,
                o = e.sgBox,
                r = this.options,
                i = window.event ? t.keyCode : t.which;
              if ((40 != i && 38 != i) || !o.box.innerHTML) {
                if (27 == i)
                  ((e.element.value = e.lastValue), this.hideBox(o.box));
                else if (13 == i || 9 == i) {
                  var s = o.box.querySelector(".suggestion-item.selected");
                  s &&
                    "none" != o.box.style.display &&
                    (r.onSelect(t, s.getAttribute("data-val"), s),
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
                        (e.element.value = l.getAttribute("data-val"))))
                    : ((a.className = a.className.replace("selected", "")),
                      (e.element.value = e.lastValue),
                      (l = null))
                  : (((l =
                      40 == i
                        ? o.box.querySelector(".suggestion-item")
                        : o.box.childNodes[
                            o.box.childNodes.length - 1
                          ]).className += " selected"),
                    (e.element.value = l.getAttribute("data-val"))),
                  this.updateSuggestionBox(e, !1, l));
              }
            }),
            (t.prototype.focusCallback = function (e, t) {
              ((e.lastValue = "\n"), this.keyUpCallback(e, t));
            }),
            (t.getMaxHeight = function (e) {
              var t = getComputedStyle(e, null);
              return parseInt(t.maxHeight);
            }),
            (t.prototype.createSuggestionBox = function () {
              var e = {
                box: document.createElement("div"),
                maxHeight: 0,
                suggestionHeight: 0,
              };
              return (e.box.classList.add("suggestion-container"), e);
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
          addVue(e, t) {
            d.vue[e] = t;
          },
          getVue: (e) => d.vue[e],
          generateUrl: t.Jv,
          loop(e) {
            let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 3e3;
            for (
              var n = arguments.length, o = new Array(n > 2 ? n - 2 : 0), r = 2;
              r < n;
              r++
            )
              o[r - 2] = arguments[r];
            u.create()
              .setDelay(t)
              .run(e, ...o);
          },
          isPolling: () => u.create().isEnabled(),
          enabePolling() {
            u.create().enable();
          },
          disablePolling() {
            u.create().disable().clear();
          },
          polling() {
            let e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 1500,
              t = arguments.length > 1 ? arguments[1] : void 0;
            u.create().setDelay(e).run(d.refresh, t);
          },
          scanFolder() {
            let e =
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
              t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "/apps/vapor/scanfolder",
              n = d.generateUrl(t);
            return new Promise((t) => {
              d.httpClient(n)
                .setData({ force: e })
                .setHandler(function (e) {
                  t(e.status);
                })
                .send();
            });
          },
          pollingFolder() {
            let e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1500;
            u.create().setDelay(e).run(d.scanFolder);
          },
          pollingYtdl() {
            let e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1500;
            u.create().setDelay(e).run(d.refresh, "/apps/vapor/ytdl/get");
          },
          refresh(e) {
            e = e || "/apps/vapor/status/active";
            let t = d.generateUrl(e);
            d.httpClient(t)
              .setHandler(function (e) {
                (e && e.row
                  ? a.getInstance(e.title, e.row).create()
                  : a.getInstance().noData(),
                  e.counter && d.updateCounter(e.counter));
              })
              .send();
          },
          trim: (e, t) => e.split(t).filter(Boolean).join(t),
          isHtml: (e) => new RegExp("^<([a-z]+)[^>]+>(.*?)</\\1>", "i").test(e),
          ucfirst: (e) => e.charAt(0).toUpperCase() + e.slice(1),
          isURL(e) {
            try {
              return (new URL(e.trim()), !0);
            } catch (e) {
              return (console.log(e.message), !1);
            }
          },
          isMagnetURI: (e) =>
            /^magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32,40}(&dn=.+&tr=.+)?$/i.test(
              e.trim(),
            ),
          _message: function (e) {
            let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            const n = {
              text: (e = e || "Empty"),
              newWindow: !0,
              close: !0,
              gravity: "top",
              position: "center",
              stopOnFocus: !0,
              onClick: function () {},
            };
            (Object.assign(n, t), r()(n).showToast());
          },
          error: function (e) {
            let t = {
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
            d._message(e, t);
          },
          info: function (e) {
            const t = {
              style: {
                color: "#004085",
                "background-color": "#cce5ff",
                "border-color": "#b8daff",
              },
              duration:
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : 2e3,
              text: e,
              backgroundColor: "#cce5ff",
            };
            d._message(e, t);
          },
          warn: function (e) {
            const t = {
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
            d._message(e, t);
          },
          message: function (e) {
            let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 2e3;
            d.info(e, t);
          },
          getPathLast: function (e) {
            return e.substring(e.lastIndexOf("/") + 1);
          },
          updateCounter(e) {
            for (let t in e)
              document.getElementById(t + "-downloads-counter").innerHTML =
                '<div class="number">' + e[t] + "</div>";
          },
          getCounters() {
            let e = d.generateUrl("apps/vapor/counters");
            d.httpClient(e)
              .setMethod("GET")
              .setHandler(function (e) {
                e.counter && d.updateCounter(e.counter);
              })
              .send();
          },
          html2DOM: function (e) {
            return new window.DOMParser()
              .parseFromString(e, "text/html")
              .querySelector("div");
          },
          getData(e) {
            const t = "object" == typeof e ? e : document.getElementById(e),
              n = {};
            if (
              ((n._path = t.getAttribute("path") || ""),
              ["SELECT", "INPUT"].includes(t.nodeName.toUpperCase()))
            ) {
              for (let e in t.dataset) "rel" != e && (n[e] = t.dataset[e]);
              n[t.getAttribute("id") || t.getAttribute("name")] = t.value;
            } else {
              const e = t.querySelectorAll("input,select");
              for (let t = 0; t < e.length; t++) {
                const o = e[t];
                if (
                  !o.hasAttribute("type") ||
                  "button" !== o.getAttribute("type")
                ) {
                  n[o.getAttribute("id") || o.getAttribute("name")] = o.value;
                  for (let e in o.dataset) "rel" != e && (n[e] = o.dataset[e]);
                }
              }
            }
            return n;
          },
          showElement(e) {
            let t = d.getVue("mainApp");
            t.$data.display[e] = !0;
            for (let n in t.$data.display) n !== e && (t.$data.display[n] = !1);
          },
          hideElement(e) {
            d.getVue("mainApp").$data.display[e] = !1;
          },
          showDownload() {
            (d.showElement("download"), a.getInstance().clear());
          },
          hideDownload() {
            d.hideElement("download");
          },
          topleft(e) {
            let t = "object" == typeof e ? e : document.getElementById(e);
            ((t.style.top = 0), (t.style.left = 0), (t.style.width = "100%"));
          },
          loadingTpl: () =>
            '<button class="bs-spinner">\n        <span\n          class="spinner-border spinner-border-sm"\n          role="status"\n          aria-hidden="true"\n          disabled\n        ></span\n        ><span class="visually-hidden">Loading...</span>',
          getCssVar: (e) =>
            window
              .getComputedStyle(document.documentElement)
              .getPropertyValue(e),
          getScrollTop: () =>
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0,
          showErrors(e) {
            document.querySelectorAll(e).forEach((e) => {
              let t;
              (t = e.getAttribute("data-error-message")) && d.error(t, 2e4);
            });
          },
          str2Boolean: function (e) {
            if ("string" != typeof e) return !1;
            switch (e.toLowerCase().trim()) {
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
                return Boolean(e);
            }
          },
          t: function (e) {
            return (0, i.Tl)("vapor", e);
          },
          resetSearch: function (e) {
            ((e.$data.loading = 0), a.getInstance([], []).clear());
          },
          redirect(e) {
            window.location.href = e;
          },
          getContentTableType: () =>
            document.getElementById("vapor-table-wrapper").getAttribute("type"),
          setContentTableType(e) {
            let t = document.getElementById("vapor-table-wrapper");
            (t.setAttribute("type", e), (t.className = "table " + e));
          },
          filepicker(e, t) {
            OC.dialogs.filepicker(
              (0, i.Tl)("vapor", "Select a directory"),
              e,
              !1,
              "httpd/unix-directory",
              !0,
              OC.dialogs.FILEPICKER_TYPE_CHOOSE,
              t,
            );
          },
          getSettings(e) {
            let t =
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
                .setData({ name: e, type: n, default: t })
                .setHandler((e) => {
                  r(e);
                })
                .send();
            });
          },
          httpClient: (e) => new c.create(e, !0),
          autoComplete(e, t) {
            try {
              p.getInstance({
                selector: e,
                minChars: 1,
                sourceHandler: function () {
                  return Array.isArray(t) ? t : Object.keys(t);
                },
                renderer: (e, n) => {
                  if (!e || !n) return;
                  let o;
                  ((n = n.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")),
                    (o = t.hasOwnProperty(e) ? t[e] : e));
                  var r = new RegExp(`(${n.split(" ").join("|")})`, "gi");
                  return `<div data-tippy-content="${o}" class="suggestion-item" data-val="${e}">${e.replace(r, "<b>$1</b>")}</div>`;
                },
              }).run();
            } catch (e) {
              (console.log(e), d.error(e));
            }
          },
          transformParams(e) {
            let t,
              n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "aria2-settings";
            for (let o in e)
              if ("_" != o.charAt(0)) {
                if (-1 !== (t = o.indexOf(n + "-key-"))) {
                  let t = n + "-value-" + o.substring(o.lastIndexOf("-") + 1);
                  if (void 0 === e[t]) continue;
                  ((e[e[o]] = e[t]), delete e[o], delete e[t]);
                }
              } else delete e[o];
            return e;
          },
          isEmptyObject: (e) => 0 === Object.keys(e).length,
        },
        f = d;
      function h(e) {
        if (null == e) return window;
        if ("[object Window]" !== e.toString()) {
          var t = e.ownerDocument;
          return (t && t.defaultView) || window;
        }
        return e;
      }
      function m(e) {
        return e instanceof h(e).Element || e instanceof Element;
      }
      function v(e) {
        return e instanceof h(e).HTMLElement || e instanceof HTMLElement;
      }
      function g(e) {
        return (
          "undefined" != typeof ShadowRoot &&
          (e instanceof h(e).ShadowRoot || e instanceof ShadowRoot)
        );
      }
      var y = Math.max,
        b = Math.min,
        w = Math.round;
      function x() {
        var e = navigator.userAgentData;
        return null != e && e.brands && Array.isArray(e.brands)
          ? e.brands
              .map(function (e) {
                return e.brand + "/" + e.version;
              })
              .join(" ")
          : navigator.userAgent;
      }
      function _() {
        return !/^((?!chrome|android).)*safari/i.test(x());
      }
      function O(e, t, n) {
        (void 0 === t && (t = !1), void 0 === n && (n = !1));
        var o = e.getBoundingClientRect(),
          r = 1,
          i = 1;
        t &&
          v(e) &&
          ((r = (e.offsetWidth > 0 && w(o.width) / e.offsetWidth) || 1),
          (i = (e.offsetHeight > 0 && w(o.height) / e.offsetHeight) || 1));
        var s = (m(e) ? h(e) : window).visualViewport,
          a = !_() && n,
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
      function S(e) {
        var t = h(e);
        return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
      }
      function E(e) {
        return e ? (e.nodeName || "").toLowerCase() : null;
      }
      function k(e) {
        return ((m(e) ? e.ownerDocument : e.document) || window.document)
          .documentElement;
      }
      function C(e) {
        return O(k(e)).left + S(e).scrollLeft;
      }
      function T(e) {
        return h(e).getComputedStyle(e);
      }
      function A(e) {
        var t = T(e),
          n = t.overflow,
          o = t.overflowX,
          r = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + r + o);
      }
      function L(e, t, n) {
        void 0 === n && (n = !1);
        var o,
          r,
          i = v(t),
          s =
            v(t) &&
            (function (e) {
              var t = e.getBoundingClientRect(),
                n = w(t.width) / e.offsetWidth || 1,
                o = w(t.height) / e.offsetHeight || 1;
              return 1 !== n || 1 !== o;
            })(t),
          a = k(t),
          l = O(e, s, n),
          c = { scrollLeft: 0, scrollTop: 0 },
          u = { x: 0, y: 0 };
        return (
          (i || (!i && !n)) &&
            (("body" !== E(t) || A(a)) &&
              (c =
                (o = t) !== h(o) && v(o)
                  ? { scrollLeft: (r = o).scrollLeft, scrollTop: r.scrollTop }
                  : S(o)),
            v(t)
              ? (((u = O(t, !0)).x += t.clientLeft), (u.y += t.clientTop))
              : a && (u.x = C(a))),
          {
            x: l.left + c.scrollLeft - u.x,
            y: l.top + c.scrollTop - u.y,
            width: l.width,
            height: l.height,
          }
        );
      }
      function P(e) {
        var t = O(e),
          n = e.offsetWidth,
          o = e.offsetHeight;
        return (
          Math.abs(t.width - n) <= 1 && (n = t.width),
          Math.abs(t.height - o) <= 1 && (o = t.height),
          { x: e.offsetLeft, y: e.offsetTop, width: n, height: o }
        );
      }
      function j(e) {
        return "html" === E(e)
          ? e
          : e.assignedSlot || e.parentNode || (g(e) ? e.host : null) || k(e);
      }
      function I(e) {
        return ["html", "body", "#document"].indexOf(E(e)) >= 0
          ? e.ownerDocument.body
          : v(e) && A(e)
            ? e
            : I(j(e));
      }
      function D(e, t) {
        var n;
        void 0 === t && (t = []);
        var o = I(e),
          r = o === (null == (n = e.ownerDocument) ? void 0 : n.body),
          i = h(o),
          s = r ? [i].concat(i.visualViewport || [], A(o) ? o : []) : o,
          a = t.concat(s);
        return r ? a : a.concat(D(j(s)));
      }
      function R(e) {
        return ["table", "td", "th"].indexOf(E(e)) >= 0;
      }
      function V(e) {
        return v(e) && "fixed" !== T(e).position ? e.offsetParent : null;
      }
      function N(e) {
        for (var t = h(e), n = V(e); n && R(n) && "static" === T(n).position;)
          n = V(n);
        return n &&
          ("html" === E(n) || ("body" === E(n) && "static" === T(n).position))
          ? t
          : n ||
              (function (e) {
                var t = /firefox/i.test(x());
                if (/Trident/i.test(x()) && v(e) && "fixed" === T(e).position)
                  return null;
                var n = j(e);
                for (
                  g(n) && (n = n.host);
                  v(n) && ["html", "body"].indexOf(E(n)) < 0;
                ) {
                  var o = T(n);
                  if (
                    "none" !== o.transform ||
                    "none" !== o.perspective ||
                    "paint" === o.contain ||
                    -1 !== ["transform", "perspective"].indexOf(o.willChange) ||
                    (t && "filter" === o.willChange) ||
                    (t && o.filter && "none" !== o.filter)
                  )
                    return n;
                  n = n.parentNode;
                }
                return null;
              })(e) ||
              t;
      }
      var M = "top",
        H = "bottom",
        U = "right",
        B = "left",
        F = "auto",
        $ = [M, H, U, B],
        W = "start",
        q = "end",
        z = "viewport",
        K = "popper",
        Y = $.reduce(function (e, t) {
          return e.concat([t + "-" + W, t + "-" + q]);
        }, []),
        J = [].concat($, [F]).reduce(function (e, t) {
          return e.concat([t, t + "-" + W, t + "-" + q]);
        }, []),
        G = [
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
      function X(e) {
        var t = new Map(),
          n = new Set(),
          o = [];
        function r(e) {
          (n.add(e.name),
            []
              .concat(e.requires || [], e.requiresIfExists || [])
              .forEach(function (e) {
                if (!n.has(e)) {
                  var o = t.get(e);
                  o && r(o);
                }
              }),
            o.push(e));
        }
        return (
          e.forEach(function (e) {
            t.set(e.name, e);
          }),
          e.forEach(function (e) {
            n.has(e.name) || r(e);
          }),
          o
        );
      }
      var Q = { placement: "bottom", modifiers: [], strategy: "absolute" };
      function Z() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
          t[n] = arguments[n];
        return !t.some(function (e) {
          return !(e && "function" == typeof e.getBoundingClientRect);
        });
      }
      function ee(e) {
        void 0 === e && (e = {});
        var t = e,
          n = t.defaultModifiers,
          o = void 0 === n ? [] : n,
          r = t.defaultOptions,
          i = void 0 === r ? Q : r;
        return function (e, t, n) {
          void 0 === n && (n = i);
          var r,
            s,
            a = {
              placement: "bottom",
              orderedModifiers: [],
              options: Object.assign({}, Q, i),
              modifiersData: {},
              elements: { reference: e, popper: t },
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
                    reference: m(e)
                      ? D(e)
                      : e.contextElement
                        ? D(e.contextElement)
                        : [],
                    popper: D(t),
                  }));
                var s,
                  c,
                  d = (function (e) {
                    var t = X(e);
                    return G.reduce(function (e, n) {
                      return e.concat(
                        t.filter(function (e) {
                          return e.phase === n;
                        }),
                      );
                    }, []);
                  })(
                    ((s = [].concat(o, a.options.modifiers)),
                    (c = s.reduce(function (e, t) {
                      var n = e[t.name];
                      return (
                        (e[t.name] = n
                          ? Object.assign({}, n, t, {
                              options: Object.assign({}, n.options, t.options),
                              data: Object.assign({}, n.data, t.data),
                            })
                          : t),
                        e
                      );
                    }, {})),
                    Object.keys(c).map(function (e) {
                      return c[e];
                    })),
                  );
                return (
                  (a.orderedModifiers = d.filter(function (e) {
                    return e.enabled;
                  })),
                  a.orderedModifiers.forEach(function (e) {
                    var t = e.name,
                      n = e.options,
                      o = void 0 === n ? {} : n,
                      r = e.effect;
                    if ("function" == typeof r) {
                      var i = r({ state: a, name: t, instance: u, options: o });
                      l.push(i || function () {});
                    }
                  }),
                  u.update()
                );
              },
              forceUpdate: function () {
                if (!c) {
                  var e = a.elements,
                    t = e.reference,
                    n = e.popper;
                  if (Z(t, n)) {
                    ((a.rects = {
                      reference: L(t, N(n), "fixed" === a.options.strategy),
                      popper: P(n),
                    }),
                      (a.reset = !1),
                      (a.placement = a.options.placement),
                      a.orderedModifiers.forEach(function (e) {
                        return (a.modifiersData[e.name] = Object.assign(
                          {},
                          e.data,
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
                  return new Promise(function (e) {
                    (u.forceUpdate(), e(a));
                  });
                }),
                function () {
                  return (
                    s ||
                      (s = new Promise(function (e) {
                        Promise.resolve().then(function () {
                          ((s = void 0), e(r()));
                        });
                      })),
                    s
                  );
                }),
              destroy: function () {
                (p(), (c = !0));
              },
            };
          if (!Z(e, t)) return u;
          function p() {
            (l.forEach(function (e) {
              return e();
            }),
              (l = []));
          }
          return (
            u.setOptions(n).then(function (e) {
              !c && n.onFirstUpdate && n.onFirstUpdate(e);
            }),
            u
          );
        };
      }
      var te = { passive: !0 };
      function ne(e) {
        return e.split("-")[0];
      }
      function oe(e) {
        return e.split("-")[1];
      }
      function re(e) {
        return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
      }
      function ie(e) {
        var t,
          n = e.reference,
          o = e.element,
          r = e.placement,
          i = r ? ne(r) : null,
          s = r ? oe(r) : null,
          a = n.x + n.width / 2 - o.width / 2,
          l = n.y + n.height / 2 - o.height / 2;
        switch (i) {
          case M:
            t = { x: a, y: n.y - o.height };
            break;
          case H:
            t = { x: a, y: n.y + n.height };
            break;
          case U:
            t = { x: n.x + n.width, y: l };
            break;
          case B:
            t = { x: n.x - o.width, y: l };
            break;
          default:
            t = { x: n.x, y: n.y };
        }
        var c = i ? re(i) : null;
        if (null != c) {
          var u = "y" === c ? "height" : "width";
          switch (s) {
            case W:
              t[c] = t[c] - (n[u] / 2 - o[u] / 2);
              break;
            case q:
              t[c] = t[c] + (n[u] / 2 - o[u] / 2);
          }
        }
        return t;
      }
      var se = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
      function ae(e) {
        var t,
          n = e.popper,
          o = e.popperRect,
          r = e.placement,
          i = e.variation,
          s = e.offsets,
          a = e.position,
          l = e.gpuAcceleration,
          c = e.adaptive,
          u = e.roundOffsets,
          p = e.isFixed,
          d = s.x,
          f = void 0 === d ? 0 : d,
          m = s.y,
          v = void 0 === m ? 0 : m,
          g = "function" == typeof u ? u({ x: f, y: v }) : { x: f, y: v };
        ((f = g.x), (v = g.y));
        var y = s.hasOwnProperty("x"),
          b = s.hasOwnProperty("y"),
          x = B,
          _ = M,
          O = window;
        if (c) {
          var S = N(n),
            E = "clientHeight",
            C = "clientWidth";
          (S === h(n) &&
            "static" !== T((S = k(n))).position &&
            "absolute" === a &&
            ((E = "scrollHeight"), (C = "scrollWidth")),
            (r === M || ((r === B || r === U) && i === q)) &&
              ((_ = H),
              (v -=
                (p && S === O && O.visualViewport
                  ? O.visualViewport.height
                  : S[E]) - o.height),
              (v *= l ? 1 : -1)),
            (r !== B && ((r !== M && r !== H) || i !== q)) ||
              ((x = U),
              (f -=
                (p && S === O && O.visualViewport
                  ? O.visualViewport.width
                  : S[C]) - o.width),
              (f *= l ? 1 : -1)));
        }
        var A,
          L = Object.assign({ position: a }, c && se),
          P =
            !0 === u
              ? (function (e, t) {
                  var n = e.x,
                    o = e.y,
                    r = t.devicePixelRatio || 1;
                  return { x: w(n * r) / r || 0, y: w(o * r) / r || 0 };
                })({ x: f, y: v }, h(n))
              : { x: f, y: v };
        return (
          (f = P.x),
          (v = P.y),
          l
            ? Object.assign(
                {},
                L,
                (((A = {})[_] = b ? "0" : ""),
                (A[x] = y ? "0" : ""),
                (A.transform =
                  (O.devicePixelRatio || 1) <= 1
                    ? "translate(" + f + "px, " + v + "px)"
                    : "translate3d(" + f + "px, " + v + "px, 0)"),
                A),
              )
            : Object.assign(
                {},
                L,
                (((t = {})[_] = b ? v + "px" : ""),
                (t[x] = y ? f + "px" : ""),
                (t.transform = ""),
                t),
              )
        );
      }
      const le = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function (e) {
          var t = e.state;
          Object.keys(t.elements).forEach(function (e) {
            var n = t.styles[e] || {},
              o = t.attributes[e] || {},
              r = t.elements[e];
            v(r) &&
              E(r) &&
              (Object.assign(r.style, n),
              Object.keys(o).forEach(function (e) {
                var t = o[e];
                !1 === t
                  ? r.removeAttribute(e)
                  : r.setAttribute(e, !0 === t ? "" : t);
              }));
          });
        },
        effect: function (e) {
          var t = e.state,
            n = {
              popper: {
                position: t.options.strategy,
                left: "0",
                top: "0",
                margin: "0",
              },
              arrow: { position: "absolute" },
              reference: {},
            };
          return (
            Object.assign(t.elements.popper.style, n.popper),
            (t.styles = n),
            t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
            function () {
              Object.keys(t.elements).forEach(function (e) {
                var o = t.elements[e],
                  r = t.attributes[e] || {},
                  i = Object.keys(
                    t.styles.hasOwnProperty(e) ? t.styles[e] : n[e],
                  ).reduce(function (e, t) {
                    return ((e[t] = ""), e);
                  }, {});
                v(o) &&
                  E(o) &&
                  (Object.assign(o.style, i),
                  Object.keys(r).forEach(function (e) {
                    o.removeAttribute(e);
                  }));
              });
            }
          );
        },
        requires: ["computeStyles"],
      };
      var ce = { left: "right", right: "left", bottom: "top", top: "bottom" };
      function ue(e) {
        return e.replace(/left|right|bottom|top/g, function (e) {
          return ce[e];
        });
      }
      var pe = { start: "end", end: "start" };
      function de(e) {
        return e.replace(/start|end/g, function (e) {
          return pe[e];
        });
      }
      function fe(e, t) {
        var n = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (n && g(n)) {
          var o = t;
          do {
            if (o && e.isSameNode(o)) return !0;
            o = o.parentNode || o.host;
          } while (o);
        }
        return !1;
      }
      function he(e) {
        return Object.assign({}, e, {
          left: e.x,
          top: e.y,
          right: e.x + e.width,
          bottom: e.y + e.height,
        });
      }
      function me(e, t, n) {
        return t === z
          ? he(
              (function (e, t) {
                var n = h(e),
                  o = k(e),
                  r = n.visualViewport,
                  i = o.clientWidth,
                  s = o.clientHeight,
                  a = 0,
                  l = 0;
                if (r) {
                  ((i = r.width), (s = r.height));
                  var c = _();
                  (c || (!c && "fixed" === t)) &&
                    ((a = r.offsetLeft), (l = r.offsetTop));
                }
                return { width: i, height: s, x: a + C(e), y: l };
              })(e, n),
            )
          : m(t)
            ? (function (e, t) {
                var n = O(e, !1, "fixed" === t);
                return (
                  (n.top = n.top + e.clientTop),
                  (n.left = n.left + e.clientLeft),
                  (n.bottom = n.top + e.clientHeight),
                  (n.right = n.left + e.clientWidth),
                  (n.width = e.clientWidth),
                  (n.height = e.clientHeight),
                  (n.x = n.left),
                  (n.y = n.top),
                  n
                );
              })(t, n)
            : he(
                (function (e) {
                  var t,
                    n = k(e),
                    o = S(e),
                    r = null == (t = e.ownerDocument) ? void 0 : t.body,
                    i = y(
                      n.scrollWidth,
                      n.clientWidth,
                      r ? r.scrollWidth : 0,
                      r ? r.clientWidth : 0,
                    ),
                    s = y(
                      n.scrollHeight,
                      n.clientHeight,
                      r ? r.scrollHeight : 0,
                      r ? r.clientHeight : 0,
                    ),
                    a = -o.scrollLeft + C(e),
                    l = -o.scrollTop;
                  return (
                    "rtl" === T(r || n).direction &&
                      (a += y(n.clientWidth, r ? r.clientWidth : 0) - i),
                    { width: i, height: s, x: a, y: l }
                  );
                })(k(e)),
              );
      }
      function ve(e) {
        return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
      }
      function ge(e, t) {
        return t.reduce(function (t, n) {
          return ((t[n] = e), t);
        }, {});
      }
      function ye(e, t) {
        void 0 === t && (t = {});
        var n = t,
          o = n.placement,
          r = void 0 === o ? e.placement : o,
          i = n.strategy,
          s = void 0 === i ? e.strategy : i,
          a = n.boundary,
          l = void 0 === a ? "clippingParents" : a,
          c = n.rootBoundary,
          u = void 0 === c ? z : c,
          p = n.elementContext,
          d = void 0 === p ? K : p,
          f = n.altBoundary,
          h = void 0 !== f && f,
          g = n.padding,
          w = void 0 === g ? 0 : g,
          x = ve("number" != typeof w ? w : ge(w, $)),
          _ = d === K ? "reference" : K,
          S = e.rects.popper,
          C = e.elements[h ? _ : d],
          A = (function (e, t, n, o) {
            var r =
                "clippingParents" === t
                  ? (function (e) {
                      var t = D(j(e)),
                        n =
                          ["absolute", "fixed"].indexOf(T(e).position) >= 0 &&
                          v(e)
                            ? N(e)
                            : e;
                      return m(n)
                        ? t.filter(function (e) {
                            return m(e) && fe(e, n) && "body" !== E(e);
                          })
                        : [];
                    })(e)
                  : [].concat(t),
              i = [].concat(r, [n]),
              s = i[0],
              a = i.reduce(
                function (t, n) {
                  var r = me(e, n, o);
                  return (
                    (t.top = y(r.top, t.top)),
                    (t.right = b(r.right, t.right)),
                    (t.bottom = b(r.bottom, t.bottom)),
                    (t.left = y(r.left, t.left)),
                    t
                  );
                },
                me(e, s, o),
              );
            return (
              (a.width = a.right - a.left),
              (a.height = a.bottom - a.top),
              (a.x = a.left),
              (a.y = a.top),
              a
            );
          })(m(C) ? C : C.contextElement || k(e.elements.popper), l, u, s),
          L = O(e.elements.reference),
          P = ie({
            reference: L,
            element: S,
            strategy: "absolute",
            placement: r,
          }),
          I = he(Object.assign({}, S, P)),
          R = d === K ? I : L,
          V = {
            top: A.top - R.top + x.top,
            bottom: R.bottom - A.bottom + x.bottom,
            left: A.left - R.left + x.left,
            right: R.right - A.right + x.right,
          },
          B = e.modifiersData.offset;
        if (d === K && B) {
          var F = B[r];
          Object.keys(V).forEach(function (e) {
            var t = [U, H].indexOf(e) >= 0 ? 1 : -1,
              n = [M, H].indexOf(e) >= 0 ? "y" : "x";
            V[e] += F[n] * t;
          });
        }
        return V;
      }
      function be(e, t, n) {
        return y(e, b(t, n));
      }
      function we(e, t, n) {
        return (
          void 0 === n && (n = { x: 0, y: 0 }),
          {
            top: e.top - t.height - n.y,
            right: e.right - t.width + n.x,
            bottom: e.bottom - t.height + n.y,
            left: e.left - t.width - n.x,
          }
        );
      }
      function xe(e) {
        return [M, U, H, B].some(function (t) {
          return e[t] >= 0;
        });
      }
      var _e = ee({
          defaultModifiers: [
            {
              name: "eventListeners",
              enabled: !0,
              phase: "write",
              fn: function () {},
              effect: function (e) {
                var t = e.state,
                  n = e.instance,
                  o = e.options,
                  r = o.scroll,
                  i = void 0 === r || r,
                  s = o.resize,
                  a = void 0 === s || s,
                  l = h(t.elements.popper),
                  c = [].concat(
                    t.scrollParents.reference,
                    t.scrollParents.popper,
                  );
                return (
                  i &&
                    c.forEach(function (e) {
                      e.addEventListener("scroll", n.update, te);
                    }),
                  a && l.addEventListener("resize", n.update, te),
                  function () {
                    (i &&
                      c.forEach(function (e) {
                        e.removeEventListener("scroll", n.update, te);
                      }),
                      a && l.removeEventListener("resize", n.update, te));
                  }
                );
              },
              data: {},
            },
            {
              name: "popperOffsets",
              enabled: !0,
              phase: "read",
              fn: function (e) {
                var t = e.state,
                  n = e.name;
                t.modifiersData[n] = ie({
                  reference: t.rects.reference,
                  element: t.rects.popper,
                  strategy: "absolute",
                  placement: t.placement,
                });
              },
              data: {},
            },
            {
              name: "computeStyles",
              enabled: !0,
              phase: "beforeWrite",
              fn: function (e) {
                var t = e.state,
                  n = e.options,
                  o = n.gpuAcceleration,
                  r = void 0 === o || o,
                  i = n.adaptive,
                  s = void 0 === i || i,
                  a = n.roundOffsets,
                  l = void 0 === a || a,
                  c = {
                    placement: ne(t.placement),
                    variation: oe(t.placement),
                    popper: t.elements.popper,
                    popperRect: t.rects.popper,
                    gpuAcceleration: r,
                    isFixed: "fixed" === t.options.strategy,
                  };
                (null != t.modifiersData.popperOffsets &&
                  (t.styles.popper = Object.assign(
                    {},
                    t.styles.popper,
                    ae(
                      Object.assign({}, c, {
                        offsets: t.modifiersData.popperOffsets,
                        position: t.options.strategy,
                        adaptive: s,
                        roundOffsets: l,
                      }),
                    ),
                  )),
                  null != t.modifiersData.arrow &&
                    (t.styles.arrow = Object.assign(
                      {},
                      t.styles.arrow,
                      ae(
                        Object.assign({}, c, {
                          offsets: t.modifiersData.arrow,
                          position: "absolute",
                          adaptive: !1,
                          roundOffsets: l,
                        }),
                      ),
                    )),
                  (t.attributes.popper = Object.assign(
                    {},
                    t.attributes.popper,
                    { "data-popper-placement": t.placement },
                  )));
              },
              data: {},
            },
            le,
            {
              name: "offset",
              enabled: !0,
              phase: "main",
              requires: ["popperOffsets"],
              fn: function (e) {
                var t = e.state,
                  n = e.options,
                  o = e.name,
                  r = n.offset,
                  i = void 0 === r ? [0, 0] : r,
                  s = J.reduce(function (e, n) {
                    return (
                      (e[n] = (function (e, t, n) {
                        var o = ne(e),
                          r = [B, M].indexOf(o) >= 0 ? -1 : 1,
                          i =
                            "function" == typeof n
                              ? n(Object.assign({}, t, { placement: e }))
                              : n,
                          s = i[0],
                          a = i[1];
                        return (
                          (s = s || 0),
                          (a = (a || 0) * r),
                          [B, U].indexOf(o) >= 0
                            ? { x: a, y: s }
                            : { x: s, y: a }
                        );
                      })(n, t.rects, i)),
                      e
                    );
                  }, {}),
                  a = s[t.placement],
                  l = a.x,
                  c = a.y;
                (null != t.modifiersData.popperOffsets &&
                  ((t.modifiersData.popperOffsets.x += l),
                  (t.modifiersData.popperOffsets.y += c)),
                  (t.modifiersData[o] = s));
              },
            },
            {
              name: "flip",
              enabled: !0,
              phase: "main",
              fn: function (e) {
                var t = e.state,
                  n = e.options,
                  o = e.name;
                if (!t.modifiersData[o]._skip) {
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
                      m = n.allowedAutoPlacements,
                      v = t.options.placement,
                      g = ne(v),
                      y =
                        l ||
                        (g !== v && h
                          ? (function (e) {
                              if (ne(e) === F) return [];
                              var t = ue(e);
                              return [de(e), t, de(t)];
                            })(v)
                          : [ue(v)]),
                      b = [v].concat(y).reduce(function (e, n) {
                        return e.concat(
                          ne(n) === F
                            ? (function (e, t) {
                                void 0 === t && (t = {});
                                var n = t,
                                  o = n.placement,
                                  r = n.boundary,
                                  i = n.rootBoundary,
                                  s = n.padding,
                                  a = n.flipVariations,
                                  l = n.allowedAutoPlacements,
                                  c = void 0 === l ? J : l,
                                  u = oe(o),
                                  p = u
                                    ? a
                                      ? Y
                                      : Y.filter(function (e) {
                                          return oe(e) === u;
                                        })
                                    : $,
                                  d = p.filter(function (e) {
                                    return c.indexOf(e) >= 0;
                                  });
                                0 === d.length && (d = p);
                                var f = d.reduce(function (t, n) {
                                  return (
                                    (t[n] = ye(e, {
                                      placement: n,
                                      boundary: r,
                                      rootBoundary: i,
                                      padding: s,
                                    })[ne(n)]),
                                    t
                                  );
                                }, {});
                                return Object.keys(f).sort(function (e, t) {
                                  return f[e] - f[t];
                                });
                              })(t, {
                                placement: n,
                                boundary: u,
                                rootBoundary: p,
                                padding: c,
                                flipVariations: h,
                                allowedAutoPlacements: m,
                              })
                            : n,
                        );
                      }, []),
                      w = t.rects.reference,
                      x = t.rects.popper,
                      _ = new Map(),
                      O = !0,
                      S = b[0],
                      E = 0;
                    E < b.length;
                    E++
                  ) {
                    var k = b[E],
                      C = ne(k),
                      T = oe(k) === W,
                      A = [M, H].indexOf(C) >= 0,
                      L = A ? "width" : "height",
                      P = ye(t, {
                        placement: k,
                        boundary: u,
                        rootBoundary: p,
                        altBoundary: d,
                        padding: c,
                      }),
                      j = A ? (T ? U : B) : T ? H : M;
                    w[L] > x[L] && (j = ue(j));
                    var I = ue(j),
                      D = [];
                    if (
                      (i && D.push(P[C] <= 0),
                      a && D.push(P[j] <= 0, P[I] <= 0),
                      D.every(function (e) {
                        return e;
                      }))
                    ) {
                      ((S = k), (O = !1));
                      break;
                    }
                    _.set(k, D);
                  }
                  if (O)
                    for (
                      var R = function (e) {
                          var t = b.find(function (t) {
                            var n = _.get(t);
                            if (n)
                              return n.slice(0, e).every(function (e) {
                                return e;
                              });
                          });
                          if (t) return ((S = t), "break");
                        },
                        V = h ? 3 : 1;
                      V > 0 && "break" !== R(V);
                      V--
                    );
                  t.placement !== S &&
                    ((t.modifiersData[o]._skip = !0),
                    (t.placement = S),
                    (t.reset = !0));
                }
              },
              requiresIfExists: ["offset"],
              data: { _skip: !1 },
            },
            {
              name: "preventOverflow",
              enabled: !0,
              phase: "main",
              fn: function (e) {
                var t = e.state,
                  n = e.options,
                  o = e.name,
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
                  m = void 0 === h ? 0 : h,
                  v = ye(t, {
                    boundary: l,
                    rootBoundary: c,
                    padding: p,
                    altBoundary: u,
                  }),
                  g = ne(t.placement),
                  w = oe(t.placement),
                  x = !w,
                  _ = re(g),
                  O = "x" === _ ? "y" : "x",
                  S = t.modifiersData.popperOffsets,
                  E = t.rects.reference,
                  k = t.rects.popper,
                  C =
                    "function" == typeof m
                      ? m(
                          Object.assign({}, t.rects, {
                            placement: t.placement,
                          }),
                        )
                      : m,
                  T =
                    "number" == typeof C
                      ? { mainAxis: C, altAxis: C }
                      : Object.assign({ mainAxis: 0, altAxis: 0 }, C),
                  A = t.modifiersData.offset
                    ? t.modifiersData.offset[t.placement]
                    : null,
                  L = { x: 0, y: 0 };
                if (S) {
                  if (i) {
                    var j,
                      I = "y" === _ ? M : B,
                      D = "y" === _ ? H : U,
                      R = "y" === _ ? "height" : "width",
                      V = S[_],
                      F = V + v[I],
                      $ = V - v[D],
                      q = f ? -k[R] / 2 : 0,
                      z = w === W ? E[R] : k[R],
                      K = w === W ? -k[R] : -E[R],
                      Y = t.elements.arrow,
                      J = f && Y ? P(Y) : { width: 0, height: 0 },
                      G = t.modifiersData["arrow#persistent"]
                        ? t.modifiersData["arrow#persistent"].padding
                        : { top: 0, right: 0, bottom: 0, left: 0 },
                      X = G[I],
                      Q = G[D],
                      Z = be(0, E[R], J[R]),
                      ee = x
                        ? E[R] / 2 - q - Z - X - T.mainAxis
                        : z - Z - X - T.mainAxis,
                      te = x
                        ? -E[R] / 2 + q + Z + Q + T.mainAxis
                        : K + Z + Q + T.mainAxis,
                      ie = t.elements.arrow && N(t.elements.arrow),
                      se = ie
                        ? "y" === _
                          ? ie.clientTop || 0
                          : ie.clientLeft || 0
                        : 0,
                      ae = null != (j = null == A ? void 0 : A[_]) ? j : 0,
                      le = V + te - ae,
                      ce = be(
                        f ? b(F, V + ee - ae - se) : F,
                        V,
                        f ? y($, le) : $,
                      );
                    ((S[_] = ce), (L[_] = ce - V));
                  }
                  if (a) {
                    var ue,
                      pe = "x" === _ ? M : B,
                      de = "x" === _ ? H : U,
                      fe = S[O],
                      he = "y" === O ? "height" : "width",
                      me = fe + v[pe],
                      ve = fe - v[de],
                      ge = -1 !== [M, B].indexOf(g),
                      we = null != (ue = null == A ? void 0 : A[O]) ? ue : 0,
                      xe = ge ? me : fe - E[he] - k[he] - we + T.altAxis,
                      _e = ge ? fe + E[he] + k[he] - we - T.altAxis : ve,
                      Oe =
                        f && ge
                          ? (function (e, t, n) {
                              var o = be(e, t, n);
                              return o > n ? n : o;
                            })(xe, fe, _e)
                          : be(f ? xe : me, fe, f ? _e : ve);
                    ((S[O] = Oe), (L[O] = Oe - fe));
                  }
                  t.modifiersData[o] = L;
                }
              },
              requiresIfExists: ["offset"],
            },
            {
              name: "arrow",
              enabled: !0,
              phase: "main",
              fn: function (e) {
                var t,
                  n = e.state,
                  o = e.name,
                  r = e.options,
                  i = n.elements.arrow,
                  s = n.modifiersData.popperOffsets,
                  a = ne(n.placement),
                  l = re(a),
                  c = [B, U].indexOf(a) >= 0 ? "height" : "width";
                if (i && s) {
                  var u = (function (e, t) {
                      return ve(
                        "number" !=
                          typeof (e =
                            "function" == typeof e
                              ? e(
                                  Object.assign({}, t.rects, {
                                    placement: t.placement,
                                  }),
                                )
                              : e)
                          ? e
                          : ge(e, $),
                      );
                    })(r.padding, n),
                    p = P(i),
                    d = "y" === l ? M : B,
                    f = "y" === l ? H : U,
                    h =
                      n.rects.reference[c] +
                      n.rects.reference[l] -
                      s[l] -
                      n.rects.popper[c],
                    m = s[l] - n.rects.reference[l],
                    v = N(i),
                    g = v
                      ? "y" === l
                        ? v.clientHeight || 0
                        : v.clientWidth || 0
                      : 0,
                    y = h / 2 - m / 2,
                    b = u[d],
                    w = g - p[c] - u[f],
                    x = g / 2 - p[c] / 2 + y,
                    _ = be(b, x, w),
                    O = l;
                  n.modifiersData[o] =
                    (((t = {})[O] = _), (t.centerOffset = _ - x), t);
                }
              },
              effect: function (e) {
                var t = e.state,
                  n = e.options.element,
                  o = void 0 === n ? "[data-popper-arrow]" : n;
                null != o &&
                  ("string" != typeof o ||
                    (o = t.elements.popper.querySelector(o))) &&
                  fe(t.elements.popper, o) &&
                  (t.elements.arrow = o);
              },
              requires: ["popperOffsets"],
              requiresIfExists: ["preventOverflow"],
            },
            {
              name: "hide",
              enabled: !0,
              phase: "main",
              requiresIfExists: ["preventOverflow"],
              fn: function (e) {
                var t = e.state,
                  n = e.name,
                  o = t.rects.reference,
                  r = t.rects.popper,
                  i = t.modifiersData.preventOverflow,
                  s = ye(t, { elementContext: "reference" }),
                  a = ye(t, { altBoundary: !0 }),
                  l = we(s, o),
                  c = we(a, r, i),
                  u = xe(l),
                  p = xe(c);
                ((t.modifiersData[n] = {
                  referenceClippingOffsets: l,
                  popperEscapeOffsets: c,
                  isReferenceHidden: u,
                  hasPopperEscaped: p,
                }),
                  (t.attributes.popper = Object.assign(
                    {},
                    t.attributes.popper,
                    {
                      "data-popper-reference-hidden": u,
                      "data-popper-escaped": p,
                    },
                  )));
              },
            },
          ],
        }),
        Oe = "tippy-content",
        Se = "tippy-arrow",
        Ee = "tippy-svg-arrow",
        ke = { passive: !0, capture: !0 },
        Ce = function () {
          return document.body;
        };
      function Te(e, t, n) {
        if (Array.isArray(e)) {
          var o = e[t];
          return null == o ? (Array.isArray(n) ? n[t] : n) : o;
        }
        return e;
      }
      function Ae(e, t) {
        var n = {}.toString.call(e);
        return 0 === n.indexOf("[object") && n.indexOf(t + "]") > -1;
      }
      function Le(e, t) {
        return "function" == typeof e ? e.apply(void 0, t) : e;
      }
      function Pe(e, t) {
        return 0 === t
          ? e
          : function (o) {
              (clearTimeout(n),
                (n = setTimeout(function () {
                  e(o);
                }, t)));
            };
        var n;
      }
      function je(e) {
        return [].concat(e);
      }
      function Ie(e, t) {
        -1 === e.indexOf(t) && e.push(t);
      }
      function De(e) {
        return [].slice.call(e);
      }
      function Re(e) {
        return Object.keys(e).reduce(function (t, n) {
          return (void 0 !== e[n] && (t[n] = e[n]), t);
        }, {});
      }
      function Ve() {
        return document.createElement("div");
      }
      function Ne(e) {
        return ["Element", "Fragment"].some(function (t) {
          return Ae(e, t);
        });
      }
      function Me(e, t) {
        e.forEach(function (e) {
          e && (e.style.transitionDuration = t + "ms");
        });
      }
      function He(e, t) {
        e.forEach(function (e) {
          e && e.setAttribute("data-state", t);
        });
      }
      function Ue(e, t, n) {
        var o = t + "EventListener";
        ["transitionend", "webkitTransitionEnd"].forEach(function (t) {
          e[o](t, n);
        });
      }
      function Be(e, t) {
        for (var n = t; n;) {
          var o;
          if (e.contains(n)) return !0;
          n =
            null == n.getRootNode || null == (o = n.getRootNode())
              ? void 0
              : o.host;
        }
        return !1;
      }
      var Fe = { isTouch: !1 },
        $e = 0;
      function We() {
        Fe.isTouch ||
          ((Fe.isTouch = !0),
          window.performance && document.addEventListener("mousemove", qe));
      }
      function qe() {
        var e = performance.now();
        (e - $e < 20 &&
          ((Fe.isTouch = !1), document.removeEventListener("mousemove", qe)),
          ($e = e));
      }
      function ze() {
        var e,
          t = document.activeElement;
        if ((e = t) && e._tippy && e._tippy.reference === e) {
          var n = t._tippy;
          t.blur && !n.state.isVisible && t.blur();
        }
      }
      var Ke = !(
          "undefined" == typeof window ||
          "undefined" == typeof document ||
          !window.msCrypto
        ),
        Ye = Object.assign(
          {
            appendTo: Ce,
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
        Je = Object.keys(Ye);
      function Ge(e) {
        var t = (e.plugins || []).reduce(function (t, n) {
          var o,
            r = n.name,
            i = n.defaultValue;
          return (
            r && (t[r] = void 0 !== e[r] ? e[r] : null != (o = Ye[r]) ? o : i),
            t
          );
        }, {});
        return Object.assign({}, e, t);
      }
      function Xe(e, t) {
        var n = Object.assign(
          {},
          t,
          { content: Le(t.content, [e]) },
          t.ignoreAttributes
            ? {}
            : (function (e, t) {
                return (
                  t
                    ? Object.keys(Ge(Object.assign({}, Ye, { plugins: t })))
                    : Je
                ).reduce(function (t, n) {
                  var o = (e.getAttribute("data-tippy-" + n) || "").trim();
                  if (!o) return t;
                  if ("content" === n) t[n] = o;
                  else
                    try {
                      t[n] = JSON.parse(o);
                    } catch (e) {
                      t[n] = o;
                    }
                  return t;
                }, {});
              })(e, t.plugins),
        );
        return (
          (n.aria = Object.assign({}, Ye.aria, n.aria)),
          (n.aria = {
            expanded:
              "auto" === n.aria.expanded ? t.interactive : n.aria.expanded,
            content:
              "auto" === n.aria.content
                ? t.interactive
                  ? null
                  : "describedby"
                : n.aria.content,
          }),
          n
        );
      }
      function Qe(e, t) {
        e.innerHTML = t;
      }
      function Ze(e) {
        var t = Ve();
        return (
          !0 === e
            ? (t.className = Se)
            : ((t.className = Ee), Ne(e) ? t.appendChild(e) : Qe(t, e)),
          t
        );
      }
      function et(e, t) {
        Ne(t.content)
          ? (Qe(e, ""), e.appendChild(t.content))
          : "function" != typeof t.content &&
            (t.allowHTML ? Qe(e, t.content) : (e.textContent = t.content));
      }
      function tt(e) {
        var t = e.firstElementChild,
          n = De(t.children);
        return {
          box: t,
          content: n.find(function (e) {
            return e.classList.contains(Oe);
          }),
          arrow: n.find(function (e) {
            return e.classList.contains(Se) || e.classList.contains(Ee);
          }),
          backdrop: n.find(function (e) {
            return e.classList.contains("tippy-backdrop");
          }),
        };
      }
      function nt(e) {
        var t = Ve(),
          n = Ve();
        ((n.className = "tippy-box"),
          n.setAttribute("data-state", "hidden"),
          n.setAttribute("tabindex", "-1"));
        var o = Ve();
        function r(n, o) {
          var r = tt(t),
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
              et(s, e.props),
            o.arrow
              ? a
                ? n.arrow !== o.arrow &&
                  (i.removeChild(a), i.appendChild(Ze(o.arrow)))
                : i.appendChild(Ze(o.arrow))
              : a && i.removeChild(a));
        }
        return (
          (o.className = Oe),
          o.setAttribute("data-state", "hidden"),
          et(o, e.props),
          t.appendChild(n),
          n.appendChild(o),
          r(e.props, e.props),
          { popper: t, onUpdate: r }
        );
      }
      nt.$$tippy = !0;
      var ot = 1,
        rt = [],
        it = [];
      function st(e, t) {
        var n,
          o,
          r,
          i,
          s,
          a,
          l,
          c,
          u = Xe(e, Object.assign({}, Ye, Ge(Re(t)))),
          p = !1,
          d = !1,
          f = !1,
          h = !1,
          m = [],
          v = Pe(K, u.interactiveDebounce),
          g = ot++,
          y = (c = u.plugins).filter(function (e, t) {
            return c.indexOf(e) === t;
          }),
          b = {
            id: g,
            reference: e,
            popper: Ve(),
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
            setProps: function (t) {
              if (!b.state.isDestroyed) {
                (I("onBeforeUpdate", [b, t]), q());
                var n = b.props,
                  o = Xe(
                    e,
                    Object.assign({}, n, Re(t), { ignoreAttributes: !0 }),
                  );
                ((b.props = o),
                  W(),
                  n.interactiveDebounce !== o.interactiveDebounce &&
                    (V(), (v = Pe(K, o.interactiveDebounce))),
                  n.triggerTarget && !o.triggerTarget
                    ? je(n.triggerTarget).forEach(function (e) {
                        e.removeAttribute("aria-expanded");
                      })
                    : o.triggerTarget && e.removeAttribute("aria-expanded"),
                  R(),
                  j(),
                  _ && _(n, o),
                  b.popperInstance &&
                    (X(),
                    Z().forEach(function (e) {
                      requestAnimationFrame(
                        e._tippy.popperInstance.forceUpdate,
                      );
                    })),
                  I("onAfterUpdate", [b, t]));
              }
            },
            setContent: function (e) {
              b.setProps({ content: e });
            },
            show: function () {
              var e = b.state.isVisible,
                t = b.state.isDestroyed,
                n = !b.state.isEnabled,
                o = Fe.isTouch && !b.props.touch,
                r = Te(b.props.duration, 0, Ye.duration);
              if (!(
                e ||
                t ||
                n ||
                o ||
                T().hasAttribute("disabled") ||
                (I("onShow", [b], !1), !1 === b.props.onShow(b))
              )) {
                if (
                  ((b.state.isVisible = !0),
                  C() && (x.style.visibility = "visible"),
                  j(),
                  U(),
                  b.state.isMounted || (x.style.transition = "none"),
                  C())
                ) {
                  var i = L();
                  Me([i.box, i.content], 0);
                }
                var s, l, c;
                ((a = function () {
                  var e;
                  if (b.state.isVisible && !h) {
                    if (
                      ((h = !0),
                      x.offsetHeight,
                      (x.style.transition = b.props.moveTransition),
                      C() && b.props.animation)
                    ) {
                      var t = L(),
                        n = t.box,
                        o = t.content;
                      (Me([n, o], r), He([n, o], "visible"));
                    }
                    (D(),
                      R(),
                      Ie(it, b),
                      null == (e = b.popperInstance) || e.forceUpdate(),
                      I("onMount", [b]),
                      b.props.animation &&
                        C() &&
                        (function (e) {
                          F(e, function () {
                            ((b.state.isShown = !0), I("onShown", [b]));
                          });
                        })(r));
                  }
                }),
                  (l = b.props.appendTo),
                  (c = T()),
                  (s =
                    (b.props.interactive && l === Ce) || "parent" === l
                      ? c.parentNode
                      : Le(l, [c])).contains(x) || s.appendChild(x),
                  (b.state.isMounted = !0),
                  X());
              }
            },
            hide: function () {
              var e = !b.state.isVisible,
                t = b.state.isDestroyed,
                n = !b.state.isEnabled,
                o = Te(b.props.duration, 1, Ye.duration);
              if (
                !(e || t || n) &&
                (I("onHide", [b], !1), !1 !== b.props.onHide(b))
              ) {
                if (
                  ((b.state.isVisible = !1),
                  (b.state.isShown = !1),
                  (h = !1),
                  (p = !1),
                  C() && (x.style.visibility = "hidden"),
                  V(),
                  B(),
                  j(!0),
                  C())
                ) {
                  var r = L(),
                    i = r.box,
                    s = r.content;
                  b.props.animation && (Me([i, s], o), He([i, s], "hidden"));
                }
                (D(),
                  R(),
                  b.props.animation
                    ? C() &&
                      (function (e, t) {
                        F(e, function () {
                          !b.state.isVisible &&
                            x.parentNode &&
                            x.parentNode.contains(x) &&
                            t();
                        });
                      })(o, b.unmount)
                    : b.unmount());
              }
            },
            hideWithInteractivity: function (e) {
              (A().addEventListener("mousemove", v), Ie(rt, v), v(e));
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
                  Z().forEach(function (e) {
                    e._tippy.unmount();
                  }),
                  x.parentNode && x.parentNode.removeChild(x),
                  (it = it.filter(function (e) {
                    return e !== b;
                  })),
                  (b.state.isMounted = !1),
                  I("onHidden", [b])));
            },
            destroy: function () {
              b.state.isDestroyed ||
                (b.clearDelayTimeouts(),
                b.unmount(),
                q(),
                delete e._tippy,
                (b.state.isDestroyed = !0),
                I("onDestroy", [b]));
            },
          };
        if (!u.render) return b;
        var w = u.render(b),
          x = w.popper,
          _ = w.onUpdate;
        (x.setAttribute("data-tippy-root", ""),
          (x.id = "tippy-" + b.id),
          (b.popper = x),
          (e._tippy = b),
          (x._tippy = b));
        var O = y.map(function (e) {
            return e.fn(b);
          }),
          S = e.hasAttribute("aria-expanded");
        return (
          W(),
          R(),
          j(),
          I("onCreate", [b]),
          u.showOnCreate && ee(),
          x.addEventListener("mouseenter", function () {
            b.props.interactive && b.state.isVisible && b.clearDelayTimeouts();
          }),
          x.addEventListener("mouseleave", function () {
            b.props.interactive &&
              b.props.trigger.indexOf("mouseenter") >= 0 &&
              A().addEventListener("mousemove", v);
          }),
          b
        );
        function E() {
          var e = b.props.touch;
          return Array.isArray(e) ? e : [e, 0];
        }
        function k() {
          return "hold" === E()[0];
        }
        function C() {
          var e;
          return !(null == (e = b.props.render) || !e.$$tippy);
        }
        function T() {
          return l || e;
        }
        function A() {
          var e,
            t,
            n = T().parentNode;
          return n
            ? null != (t = je(n)[0]) && null != (e = t.ownerDocument) && e.body
              ? t.ownerDocument
              : document
            : document;
        }
        function L() {
          return tt(x);
        }
        function P(e) {
          return (b.state.isMounted && !b.state.isVisible) ||
            Fe.isTouch ||
            (i && "focus" === i.type)
            ? 0
            : Te(b.props.delay, e ? 0 : 1, Ye.delay);
        }
        function j(e) {
          (void 0 === e && (e = !1),
            (x.style.pointerEvents = b.props.interactive && !e ? "" : "none"),
            (x.style.zIndex = "" + b.props.zIndex));
        }
        function I(e, t, n) {
          var o;
          (void 0 === n && (n = !0),
            O.forEach(function (n) {
              n[e] && n[e].apply(n, t);
            }),
            n && (o = b.props)[e].apply(o, t));
        }
        function D() {
          var t = b.props.aria;
          if (t.content) {
            var n = "aria-" + t.content,
              o = x.id;
            je(b.props.triggerTarget || e).forEach(function (e) {
              var t = e.getAttribute(n);
              if (b.state.isVisible) e.setAttribute(n, t ? t + " " + o : o);
              else {
                var r = t && t.replace(o, "").trim();
                r ? e.setAttribute(n, r) : e.removeAttribute(n);
              }
            });
          }
        }
        function R() {
          !S &&
            b.props.aria.expanded &&
            je(b.props.triggerTarget || e).forEach(function (e) {
              b.props.interactive
                ? e.setAttribute(
                    "aria-expanded",
                    b.state.isVisible && e === T() ? "true" : "false",
                  )
                : e.removeAttribute("aria-expanded");
            });
        }
        function V() {
          (A().removeEventListener("mousemove", v),
            (rt = rt.filter(function (e) {
              return e !== v;
            })));
        }
        function N(t) {
          if (!Fe.isTouch || (!f && "mousedown" !== t.type)) {
            var n = (t.composedPath && t.composedPath()[0]) || t.target;
            if (!b.props.interactive || !Be(x, n)) {
              if (
                je(b.props.triggerTarget || e).some(function (e) {
                  return Be(e, n);
                })
              ) {
                if (Fe.isTouch) return;
                if (b.state.isVisible && b.props.trigger.indexOf("click") >= 0)
                  return;
              } else I("onClickOutside", [b, t]);
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
        function M() {
          f = !0;
        }
        function H() {
          f = !1;
        }
        function U() {
          var e = A();
          (e.addEventListener("mousedown", N, !0),
            e.addEventListener("touchend", N, ke),
            e.addEventListener("touchstart", H, ke),
            e.addEventListener("touchmove", M, ke));
        }
        function B() {
          var e = A();
          (e.removeEventListener("mousedown", N, !0),
            e.removeEventListener("touchend", N, ke),
            e.removeEventListener("touchstart", H, ke),
            e.removeEventListener("touchmove", M, ke));
        }
        function F(e, t) {
          var n = L().box;
          function o(e) {
            e.target === n && (Ue(n, "remove", o), t());
          }
          if (0 === e) return t();
          (Ue(n, "remove", s), Ue(n, "add", o), (s = o));
        }
        function $(t, n, o) {
          (void 0 === o && (o = !1),
            je(b.props.triggerTarget || e).forEach(function (e) {
              (e.addEventListener(t, n, o),
                m.push({ node: e, eventType: t, handler: n, options: o }));
            }));
        }
        function W() {
          var e;
          (k() &&
            ($("touchstart", z, { passive: !0 }),
            $("touchend", Y, { passive: !0 })),
            ((e = b.props.trigger), e.split(/\s+/).filter(Boolean)).forEach(
              function (e) {
                if ("manual" !== e)
                  switch (($(e, z), e)) {
                    case "mouseenter":
                      $("mouseleave", Y);
                      break;
                    case "focus":
                      $(Ke ? "focusout" : "blur", J);
                      break;
                    case "focusin":
                      $("focusout", J);
                  }
              },
            ));
        }
        function q() {
          (m.forEach(function (e) {
            var t = e.node,
              n = e.eventType,
              o = e.handler,
              r = e.options;
            t.removeEventListener(n, o, r);
          }),
            (m = []));
        }
        function z(e) {
          var t,
            n = !1;
          if (b.state.isEnabled && !G(e) && !d) {
            var o = "focus" === (null == (t = i) ? void 0 : t.type);
            ((i = e),
              (l = e.currentTarget),
              R(),
              !b.state.isVisible &&
                Ae(e, "MouseEvent") &&
                rt.forEach(function (t) {
                  return t(e);
                }),
              "click" === e.type &&
              (b.props.trigger.indexOf("mouseenter") < 0 || p) &&
              !1 !== b.props.hideOnClick &&
              b.state.isVisible
                ? (n = !0)
                : ee(e),
              "click" === e.type && (p = !n),
              n && !o && te(e));
          }
        }
        function K(e) {
          var t = e.target,
            n = T().contains(t) || x.contains(t);
          if ("mousemove" !== e.type || !n) {
            var o = Z()
              .concat(x)
              .map(function (e) {
                var t,
                  n = null == (t = e._tippy.popperInstance) ? void 0 : t.state;
                return n
                  ? {
                      popperRect: e.getBoundingClientRect(),
                      popperState: n,
                      props: u,
                    }
                  : null;
              })
              .filter(Boolean);
            (function (e, t) {
              var n = t.clientX,
                o = t.clientY;
              return e.every(function (e) {
                var t = e.popperRect,
                  r = e.popperState,
                  i = e.props.interactiveBorder,
                  s = r.placement.split("-")[0],
                  a = r.modifiersData.offset;
                if (!a) return !0;
                var l = "bottom" === s ? a.top.y : 0,
                  c = "top" === s ? a.bottom.y : 0,
                  u = "right" === s ? a.left.x : 0,
                  p = "left" === s ? a.right.x : 0,
                  d = t.top - o + l > i,
                  f = o - t.bottom - c > i,
                  h = t.left - n + u > i,
                  m = n - t.right - p > i;
                return d || f || h || m;
              });
            })(o, e) && (V(), te(e));
          }
        }
        function Y(e) {
          G(e) ||
            (b.props.trigger.indexOf("click") >= 0 && p) ||
            (b.props.interactive ? b.hideWithInteractivity(e) : te(e));
        }
        function J(e) {
          (b.props.trigger.indexOf("focusin") < 0 && e.target !== T()) ||
            (b.props.interactive &&
              e.relatedTarget &&
              x.contains(e.relatedTarget)) ||
            te(e);
        }
        function G(e) {
          return !!Fe.isTouch && k() !== e.type.indexOf("touch") >= 0;
        }
        function X() {
          Q();
          var t = b.props,
            n = t.popperOptions,
            o = t.placement,
            r = t.offset,
            i = t.getReferenceClientRect,
            s = t.moveTransition,
            l = C() ? tt(x).arrow : null,
            c = i
              ? {
                  getBoundingClientRect: i,
                  contextElement: i.contextElement || T(),
                }
              : e,
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
                fn: function (e) {
                  var t = e.state;
                  if (C()) {
                    var n = L().box;
                    (["placement", "reference-hidden", "escaped"].forEach(
                      function (e) {
                        "placement" === e
                          ? n.setAttribute("data-placement", t.placement)
                          : t.attributes.popper["data-popper-" + e]
                            ? n.setAttribute("data-" + e, "")
                            : n.removeAttribute("data-" + e);
                      },
                    ),
                      (t.attributes.popper = {}));
                  }
                },
              },
            ];
          (C() &&
            l &&
            u.push({ name: "arrow", options: { element: l, padding: 3 } }),
            u.push.apply(u, (null == n ? void 0 : n.modifiers) || []),
            (b.popperInstance = _e(
              c,
              x,
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
          return De(x.querySelectorAll("[data-tippy-root]"));
        }
        function ee(e) {
          (b.clearDelayTimeouts(), e && I("onTrigger", [b, e]), U());
          var t = P(!0),
            o = E(),
            r = o[0],
            i = o[1];
          (Fe.isTouch && "hold" === r && i && (t = i),
            t
              ? (n = setTimeout(function () {
                  b.show();
                }, t))
              : b.show());
        }
        function te(e) {
          if (
            (b.clearDelayTimeouts(),
            I("onUntrigger", [b, e]),
            b.state.isVisible)
          ) {
            if (!(
              b.props.trigger.indexOf("mouseenter") >= 0 &&
              b.props.trigger.indexOf("click") >= 0 &&
              ["mouseleave", "mousemove"].indexOf(e.type) >= 0 &&
              p
            )) {
              var t = P(!1);
              t
                ? (o = setTimeout(function () {
                    b.state.isVisible && b.hide();
                  }, t))
                : (r = requestAnimationFrame(function () {
                    b.hide();
                  }));
            }
          } else B();
        }
      }
      function at(e, t) {
        void 0 === t && (t = {});
        var n = Ye.plugins.concat(t.plugins || []);
        (document.addEventListener("touchstart", We, ke),
          window.addEventListener("blur", ze));
        var o,
          r = Object.assign({}, t, { plugins: n }),
          i = ((o = e),
          Ne(o)
            ? [o]
            : (function (e) {
                  return Ae(e, "NodeList");
                })(o)
              ? De(o)
              : Array.isArray(o)
                ? o
                : De(document.querySelectorAll(o))).reduce(function (e, t) {
            var n = t && st(t, r);
            return (n && e.push(n), e);
          }, []);
        return Ne(e) ? i[0] : i;
      }
      ((at.defaultProps = Ye),
        (at.setDefaultProps = function (e) {
          Object.keys(e).forEach(function (t) {
            Ye[t] = e[t];
          });
        }),
        (at.currentInput = Fe),
        Object.assign({}, le, {
          effect: function (e) {
            var t = e.state,
              n = {
                popper: {
                  position: t.options.strategy,
                  left: "0",
                  top: "0",
                  margin: "0",
                },
                arrow: { position: "absolute" },
                reference: {},
              };
            (Object.assign(t.elements.popper.style, n.popper),
              (t.styles = n),
              t.elements.arrow &&
                Object.assign(t.elements.arrow.style, n.arrow));
          },
        }));
      var lt = { mouseover: "mouseenter", focusin: "focus", click: "click" };
      function ct(e, t) {
        var n,
          o,
          r,
          i = [],
          s = [],
          a = !1,
          l = t.target,
          c =
            ((n = t),
            (o = ["target"]),
            (r = Object.assign({}, n)),
            o.forEach(function (e) {
              delete r[e];
            }),
            r),
          u = Object.assign({}, c, { trigger: "manual", touch: !1 }),
          p = Object.assign({ touch: Ye.touch }, c, { showOnCreate: !0 }),
          d = at(e, u);
        function f(e) {
          if (e.target && !a) {
            var n = e.target.closest(l);
            if (n) {
              var o =
                n.getAttribute("data-tippy-trigger") || t.trigger || Ye.trigger;
              if (
                !n._tippy &&
                !(
                  ("touchstart" === e.type && "boolean" == typeof p.touch) ||
                  ("touchstart" !== e.type && o.indexOf(lt[e.type]) < 0)
                )
              ) {
                var r = at(n, p);
                r && (s = s.concat(r));
              }
            }
          }
        }
        function h(e, t, n, o) {
          (void 0 === o && (o = !1),
            e.addEventListener(t, n, o),
            i.push({ node: e, eventType: t, handler: n, options: o }));
        }
        return (
          je(d).forEach(function (e) {
            var t = e.destroy,
              n = e.enable,
              o = e.disable;
            ((e.destroy = function (e) {
              (void 0 === e && (e = !0),
                e &&
                  s.forEach(function (e) {
                    e.destroy();
                  }),
                (s = []),
                i.forEach(function (e) {
                  var t = e.node,
                    n = e.eventType,
                    o = e.handler,
                    r = e.options;
                  t.removeEventListener(n, o, r);
                }),
                (i = []),
                t());
            }),
              (e.enable = function () {
                (n(),
                  s.forEach(function (e) {
                    return e.enable();
                  }),
                  (a = !1));
              }),
              (e.disable = function () {
                (o(),
                  s.forEach(function (e) {
                    return e.disable();
                  }),
                  (a = !0));
              }),
              (function (e) {
                var t = e.reference;
                (h(t, "touchstart", f, ke),
                  h(t, "mouseover", f),
                  h(t, "focusin", f),
                  h(t, "click", f));
              })(e));
          }),
          d
        );
      }
      function ut(e) {
        const t = Object.create(null);
        for (const n of e.split(",")) t[n] = 1;
        return (e) => e in t;
      }
      at.setDefaultProps({ render: nt });
      const pt = {},
        dt = [],
        ft = () => {},
        ht = () => !1,
        mt = (e) =>
          111 === e.charCodeAt(0) &&
          110 === e.charCodeAt(1) &&
          (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
        vt = (e) => e.startsWith("onUpdate:"),
        gt = Object.assign,
        yt = (e, t) => {
          const n = e.indexOf(t);
          n > -1 && e.splice(n, 1);
        },
        bt = Object.prototype.hasOwnProperty,
        wt = (e, t) => bt.call(e, t),
        xt = Array.isArray,
        _t = (e) => "[object Map]" === Pt(e),
        Ot = (e) => "[object Set]" === Pt(e),
        St = (e) => "[object Date]" === Pt(e),
        Et = (e) => "function" == typeof e,
        kt = (e) => "string" == typeof e,
        Ct = (e) => "symbol" == typeof e,
        Tt = (e) => null !== e && "object" == typeof e,
        At = (e) => (Tt(e) || Et(e)) && Et(e.then) && Et(e.catch),
        Lt = Object.prototype.toString,
        Pt = (e) => Lt.call(e),
        jt = (e) => "[object Object]" === Pt(e),
        It = (e) =>
          kt(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
        Dt = ut(
          ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
        ),
        Rt = (e) => {
          const t = Object.create(null);
          return (n) => t[n] || (t[n] = e(n));
        },
        Vt = /-\w/g,
        Nt = Rt((e) => e.replace(Vt, (e) => e.slice(1).toUpperCase())),
        Mt = /\B([A-Z])/g,
        Ht = Rt((e) => e.replace(Mt, "-$1").toLowerCase()),
        Ut = Rt((e) => e.charAt(0).toUpperCase() + e.slice(1)),
        Bt = Rt((e) => (e ? `on${Ut(e)}` : "")),
        Ft = (e, t) => !Object.is(e, t),
        $t = (e, ...t) => {
          for (let n = 0; n < e.length; n++) e[n](...t);
        },
        Wt = (e, t, n, o = !1) => {
          Object.defineProperty(e, t, {
            configurable: !0,
            enumerable: !1,
            writable: o,
            value: n,
          });
        },
        qt = (e) => {
          const t = parseFloat(e);
          return isNaN(t) ? e : t;
        };
      let zt;
      const Kt = () =>
        zt ||
        (zt =
          "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
                ? window
                : "undefined" != typeof globalThis
                  ? globalThis
                  : {});
      function Yt(e) {
        if (xt(e)) {
          const t = {};
          for (let n = 0; n < e.length; n++) {
            const o = e[n],
              r = kt(o) ? Qt(o) : Yt(o);
            if (r) for (const e in r) t[e] = r[e];
          }
          return t;
        }
        if (kt(e) || Tt(e)) return e;
      }
      const Jt = /;(?![^(]*\))/g,
        Gt = /:([^]+)/,
        Xt = /\/\*[^]*?\*\//g;
      function Qt(e) {
        const t = {};
        return (
          e
            .replace(Xt, "")
            .split(Jt)
            .forEach((e) => {
              if (e) {
                const n = e.split(Gt);
                n.length > 1 && (t[n[0].trim()] = n[1].trim());
              }
            }),
          t
        );
      }
      function Zt(e) {
        let t = "";
        if (kt(e)) t = e;
        else if (xt(e))
          for (let n = 0; n < e.length; n++) {
            const o = Zt(e[n]);
            o && (t += o + " ");
          }
        else if (Tt(e)) for (const n in e) e[n] && (t += n + " ");
        return t.trim();
      }
      const en = ut(
        "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
      );
      function tn(e) {
        return !!e || "" === e;
      }
      function nn(e, t) {
        if (e === t) return !0;
        let n = St(e),
          o = St(t);
        if (n || o) return !(!n || !o) && e.getTime() === t.getTime();
        if (((n = Ct(e)), (o = Ct(t)), n || o)) return e === t;
        if (((n = xt(e)), (o = xt(t)), n || o))
          return (
            !(!n || !o) &&
            (function (e, t) {
              if (e.length !== t.length) return !1;
              let n = !0;
              for (let o = 0; n && o < e.length; o++) n = nn(e[o], t[o]);
              return n;
            })(e, t)
          );
        if (((n = Tt(e)), (o = Tt(t)), n || o)) {
          if (!n || !o) return !1;
          if (Object.keys(e).length !== Object.keys(t).length) return !1;
          for (const n in e) {
            const o = e.hasOwnProperty(n),
              r = t.hasOwnProperty(n);
            if ((o && !r) || (!o && r) || !nn(e[n], t[n])) return !1;
          }
        }
        return String(e) === String(t);
      }
      function on(e, t) {
        return e.findIndex((e) => nn(e, t));
      }
      const rn = (e) => !(!e || !0 !== e.__v_isRef),
        sn = (e) =>
          kt(e)
            ? e
            : null == e
              ? ""
              : xt(e) || (Tt(e) && (e.toString === Lt || !Et(e.toString)))
                ? rn(e)
                  ? sn(e.value)
                  : JSON.stringify(e, an, 2)
                : String(e),
        an = (e, t) =>
          rn(t)
            ? an(e, t.value)
            : _t(t)
              ? {
                  [`Map(${t.size})`]: [...t.entries()].reduce(
                    (e, [t, n], o) => ((e[ln(t, o) + " =>"] = n), e),
                    {},
                  ),
                }
              : Ot(t)
                ? { [`Set(${t.size})`]: [...t.values()].map((e) => ln(e)) }
                : Ct(t)
                  ? ln(t)
                  : !Tt(t) || xt(t) || jt(t)
                    ? t
                    : String(t),
        ln = (e, t = "") => {
          var n;
          return Ct(e) ? `Symbol(${null != (n = e.description) ? n : t})` : e;
        };
      let cn, un;
      class pn {
        constructor(e = !1) {
          ((this.detached = e),
            (this._active = !0),
            (this._on = 0),
            (this.effects = []),
            (this.cleanups = []),
            (this._isPaused = !1),
            (this.__v_skip = !0),
            (this.parent = cn),
            !e &&
              cn &&
              (this.index = (cn.scopes || (cn.scopes = [])).push(this) - 1));
        }
        get active() {
          return this._active;
        }
        pause() {
          if (this._active) {
            let e, t;
            if (((this._isPaused = !0), this.scopes))
              for (e = 0, t = this.scopes.length; e < t; e++)
                this.scopes[e].pause();
            for (e = 0, t = this.effects.length; e < t; e++)
              this.effects[e].pause();
          }
        }
        resume() {
          if (this._active && this._isPaused) {
            let e, t;
            if (((this._isPaused = !1), this.scopes))
              for (e = 0, t = this.scopes.length; e < t; e++)
                this.scopes[e].resume();
            for (e = 0, t = this.effects.length; e < t; e++)
              this.effects[e].resume();
          }
        }
        run(e) {
          if (this._active) {
            const t = cn;
            try {
              return ((cn = this), e());
            } finally {
              cn = t;
            }
          }
        }
        on() {
          1 === ++this._on && ((this.prevScope = cn), (cn = this));
        }
        off() {
          this._on > 0 &&
            0 === --this._on &&
            ((cn = this.prevScope), (this.prevScope = void 0));
        }
        stop(e) {
          if (this._active) {
            let t, n;
            for (this._active = !1, t = 0, n = this.effects.length; t < n; t++)
              this.effects[t].stop();
            for (
              this.effects.length = 0, t = 0, n = this.cleanups.length;
              t < n;
              t++
            )
              this.cleanups[t]();
            if (((this.cleanups.length = 0), this.scopes)) {
              for (t = 0, n = this.scopes.length; t < n; t++)
                this.scopes[t].stop(!0);
              this.scopes.length = 0;
            }
            if (!this.detached && this.parent && !e) {
              const e = this.parent.scopes.pop();
              e &&
                e !== this &&
                ((this.parent.scopes[this.index] = e), (e.index = this.index));
            }
            this.parent = void 0;
          }
        }
      }
      const dn = new WeakSet();
      class fn {
        constructor(e) {
          ((this.fn = e),
            (this.deps = void 0),
            (this.depsTail = void 0),
            (this.flags = 5),
            (this.next = void 0),
            (this.cleanup = void 0),
            (this.scheduler = void 0),
            cn && cn.active && cn.effects.push(this));
        }
        pause() {
          this.flags |= 64;
        }
        resume() {
          64 & this.flags &&
            ((this.flags &= -65),
            dn.has(this) && (dn.delete(this), this.trigger()));
        }
        notify() {
          (2 & this.flags && !(32 & this.flags)) || 8 & this.flags || gn(this);
        }
        run() {
          if (!(1 & this.flags)) return this.fn();
          ((this.flags |= 2), Ln(this), wn(this));
          const e = un,
            t = kn;
          ((un = this), (kn = !0));
          try {
            return this.fn();
          } finally {
            (xn(this), (un = e), (kn = t), (this.flags &= -3));
          }
        }
        stop() {
          if (1 & this.flags) {
            for (let e = this.deps; e; e = e.nextDep) Sn(e);
            ((this.deps = this.depsTail = void 0),
              Ln(this),
              this.onStop && this.onStop(),
              (this.flags &= -2));
          }
        }
        trigger() {
          64 & this.flags
            ? dn.add(this)
            : this.scheduler
              ? this.scheduler()
              : this.runIfDirty();
        }
        runIfDirty() {
          _n(this) && this.run();
        }
        get dirty() {
          return _n(this);
        }
      }
      let hn,
        mn,
        vn = 0;
      function gn(e, t = !1) {
        if (((e.flags |= 8), t)) return ((e.next = mn), void (mn = e));
        ((e.next = hn), (hn = e));
      }
      function yn() {
        vn++;
      }
      function bn() {
        if (--vn > 0) return;
        if (mn) {
          let e = mn;
          for (mn = void 0; e;) {
            const t = e.next;
            ((e.next = void 0), (e.flags &= -9), (e = t));
          }
        }
        let e;
        for (; hn;) {
          let t = hn;
          for (hn = void 0; t;) {
            const n = t.next;
            if (((t.next = void 0), (t.flags &= -9), 1 & t.flags))
              try {
                t.trigger();
              } catch (t) {
                e || (e = t);
              }
            t = n;
          }
        }
        if (e) throw e;
      }
      function wn(e) {
        for (let t = e.deps; t; t = t.nextDep)
          ((t.version = -1),
            (t.prevActiveLink = t.dep.activeLink),
            (t.dep.activeLink = t));
      }
      function xn(e) {
        let t,
          n = e.depsTail,
          o = n;
        for (; o;) {
          const e = o.prevDep;
          (-1 === o.version ? (o === n && (n = e), Sn(o), En(o)) : (t = o),
            (o.dep.activeLink = o.prevActiveLink),
            (o.prevActiveLink = void 0),
            (o = e));
        }
        ((e.deps = t), (e.depsTail = n));
      }
      function _n(e) {
        for (let t = e.deps; t; t = t.nextDep)
          if (
            t.dep.version !== t.version ||
            (t.dep.computed &&
              (On(t.dep.computed) || t.dep.version !== t.version))
          )
            return !0;
        return !!e._dirty;
      }
      function On(e) {
        if (4 & e.flags && !(16 & e.flags)) return;
        if (((e.flags &= -17), e.globalVersion === Pn)) return;
        if (
          ((e.globalVersion = Pn),
          !e.isSSR && 128 & e.flags && ((!e.deps && !e._dirty) || !_n(e)))
        )
          return;
        e.flags |= 2;
        const t = e.dep,
          n = un,
          o = kn;
        ((un = e), (kn = !0));
        try {
          wn(e);
          const n = e.fn(e._value);
          (0 === t.version || Ft(n, e._value)) &&
            ((e.flags |= 128), (e._value = n), t.version++);
        } catch (e) {
          throw (t.version++, e);
        } finally {
          ((un = n), (kn = o), xn(e), (e.flags &= -3));
        }
      }
      function Sn(e, t = !1) {
        const { dep: n, prevSub: o, nextSub: r } = e;
        if (
          (o && ((o.nextSub = r), (e.prevSub = void 0)),
          r && ((r.prevSub = o), (e.nextSub = void 0)),
          n.subs === e && ((n.subs = o), !o && n.computed))
        ) {
          n.computed.flags &= -5;
          for (let e = n.computed.deps; e; e = e.nextDep) Sn(e, !0);
        }
        t || --n.sc || !n.map || n.map.delete(n.key);
      }
      function En(e) {
        const { prevDep: t, nextDep: n } = e;
        (t && ((t.nextDep = n), (e.prevDep = void 0)),
          n && ((n.prevDep = t), (e.nextDep = void 0)));
      }
      let kn = !0;
      const Cn = [];
      function Tn() {
        (Cn.push(kn), (kn = !1));
      }
      function An() {
        const e = Cn.pop();
        kn = void 0 === e || e;
      }
      function Ln(e) {
        const { cleanup: t } = e;
        if (((e.cleanup = void 0), t)) {
          const e = un;
          un = void 0;
          try {
            t();
          } finally {
            un = e;
          }
        }
      }
      let Pn = 0;
      class jn {
        constructor(e, t) {
          ((this.sub = e),
            (this.dep = t),
            (this.version = t.version),
            (this.nextDep =
              this.prevDep =
              this.nextSub =
              this.prevSub =
              this.prevActiveLink =
                void 0));
        }
      }
      class In {
        constructor(e) {
          ((this.computed = e),
            (this.version = 0),
            (this.activeLink = void 0),
            (this.subs = void 0),
            (this.map = void 0),
            (this.key = void 0),
            (this.sc = 0),
            (this.__v_skip = !0));
        }
        track(e) {
          if (!un || !kn || un === this.computed) return;
          let t = this.activeLink;
          if (void 0 === t || t.sub !== un)
            ((t = this.activeLink = new jn(un, this)),
              un.deps
                ? ((t.prevDep = un.depsTail),
                  (un.depsTail.nextDep = t),
                  (un.depsTail = t))
                : (un.deps = un.depsTail = t),
              Dn(t));
          else if (
            -1 === t.version &&
            ((t.version = this.version), t.nextDep)
          ) {
            const e = t.nextDep;
            ((e.prevDep = t.prevDep),
              t.prevDep && (t.prevDep.nextDep = e),
              (t.prevDep = un.depsTail),
              (t.nextDep = void 0),
              (un.depsTail.nextDep = t),
              (un.depsTail = t),
              un.deps === t && (un.deps = e));
          }
          return t;
        }
        trigger(e) {
          (this.version++, Pn++, this.notify(e));
        }
        notify(e) {
          yn();
          try {
            for (let e = this.subs; e; e = e.prevSub)
              e.sub.notify() && e.sub.dep.notify();
          } finally {
            bn();
          }
        }
      }
      function Dn(e) {
        if ((e.dep.sc++, 4 & e.sub.flags)) {
          const t = e.dep.computed;
          if (t && !e.dep.subs) {
            t.flags |= 20;
            for (let e = t.deps; e; e = e.nextDep) Dn(e);
          }
          const n = e.dep.subs;
          (n !== e && ((e.prevSub = n), n && (n.nextSub = e)),
            (e.dep.subs = e));
        }
      }
      const Rn = new WeakMap(),
        Vn = Symbol(""),
        Nn = Symbol(""),
        Mn = Symbol("");
      function Hn(e, t, n) {
        if (kn && un) {
          let t = Rn.get(e);
          t || Rn.set(e, (t = new Map()));
          let o = t.get(n);
          (o || (t.set(n, (o = new In())), (o.map = t), (o.key = n)),
            o.track());
        }
      }
      function Un(e, t, n, o, r, i) {
        const s = Rn.get(e);
        if (!s) return void Pn++;
        const a = (e) => {
          e && e.trigger();
        };
        if ((yn(), "clear" === t)) s.forEach(a);
        else {
          const r = xt(e),
            i = r && It(n);
          if (r && "length" === n) {
            const e = Number(o);
            s.forEach((t, n) => {
              ("length" === n || n === Mn || (!Ct(n) && n >= e)) && a(t);
            });
          } else
            switch (
              ((void 0 !== n || s.has(void 0)) && a(s.get(n)),
              i && a(s.get(Mn)),
              t)
            ) {
              case "add":
                r
                  ? i && a(s.get("length"))
                  : (a(s.get(Vn)), _t(e) && a(s.get(Nn)));
                break;
              case "delete":
                r || (a(s.get(Vn)), _t(e) && a(s.get(Nn)));
                break;
              case "set":
                _t(e) && a(s.get(Vn));
            }
        }
        bn();
      }
      function Bn(e) {
        const t = Eo(e);
        return t === e ? t : (Hn(t, 0, Mn), Oo(e) ? t : t.map(ko));
      }
      function Fn(e) {
        return (Hn((e = Eo(e)), 0, Mn), e);
      }
      function $n(e, t) {
        return _o(e) ? (xo(e) ? Co(ko(t)) : Co(t)) : ko(t);
      }
      const Wn = {
        __proto__: null,
        [Symbol.iterator]() {
          return qn(this, Symbol.iterator, (e) => $n(this, e));
        },
        concat(...e) {
          return Bn(this).concat(...e.map((e) => (xt(e) ? Bn(e) : e)));
        },
        entries() {
          return qn(this, "entries", (e) => ((e[1] = $n(this, e[1])), e));
        },
        every(e, t) {
          return Kn(this, "every", e, t, void 0, arguments);
        },
        filter(e, t) {
          return Kn(
            this,
            "filter",
            e,
            t,
            (e) => e.map((e) => $n(this, e)),
            arguments,
          );
        },
        find(e, t) {
          return Kn(this, "find", e, t, (e) => $n(this, e), arguments);
        },
        findIndex(e, t) {
          return Kn(this, "findIndex", e, t, void 0, arguments);
        },
        findLast(e, t) {
          return Kn(this, "findLast", e, t, (e) => $n(this, e), arguments);
        },
        findLastIndex(e, t) {
          return Kn(this, "findLastIndex", e, t, void 0, arguments);
        },
        forEach(e, t) {
          return Kn(this, "forEach", e, t, void 0, arguments);
        },
        includes(...e) {
          return Jn(this, "includes", e);
        },
        indexOf(...e) {
          return Jn(this, "indexOf", e);
        },
        join(e) {
          return Bn(this).join(e);
        },
        lastIndexOf(...e) {
          return Jn(this, "lastIndexOf", e);
        },
        map(e, t) {
          return Kn(this, "map", e, t, void 0, arguments);
        },
        pop() {
          return Gn(this, "pop");
        },
        push(...e) {
          return Gn(this, "push", e);
        },
        reduce(e, ...t) {
          return Yn(this, "reduce", e, t);
        },
        reduceRight(e, ...t) {
          return Yn(this, "reduceRight", e, t);
        },
        shift() {
          return Gn(this, "shift");
        },
        some(e, t) {
          return Kn(this, "some", e, t, void 0, arguments);
        },
        splice(...e) {
          return Gn(this, "splice", e);
        },
        toReversed() {
          return Bn(this).toReversed();
        },
        toSorted(e) {
          return Bn(this).toSorted(e);
        },
        toSpliced(...e) {
          return Bn(this).toSpliced(...e);
        },
        unshift(...e) {
          return Gn(this, "unshift", e);
        },
        values() {
          return qn(this, "values", (e) => $n(this, e));
        },
      };
      function qn(e, t, n) {
        const o = Fn(e),
          r = o[t]();
        return (
          o === e ||
            Oo(e) ||
            ((r._next = r.next),
            (r.next = () => {
              const e = r._next();
              return (e.done || (e.value = n(e.value)), e);
            })),
          r
        );
      }
      const zn = Array.prototype;
      function Kn(e, t, n, o, r, i) {
        const s = Fn(e),
          a = s !== e && !Oo(e),
          l = s[t];
        if (l !== zn[t]) {
          const t = l.apply(e, i);
          return a ? ko(t) : t;
        }
        let c = n;
        s !== e &&
          (a
            ? (c = function (t, o) {
                return n.call(this, $n(e, t), o, e);
              })
            : n.length > 2 &&
              (c = function (t, o) {
                return n.call(this, t, o, e);
              }));
        const u = l.call(s, c, o);
        return a && r ? r(u) : u;
      }
      function Yn(e, t, n, o) {
        const r = Fn(e),
          i = r !== e && !Oo(e);
        let s = n,
          a = !1;
        r !== e &&
          (i
            ? ((a = 0 === o.length),
              (s = function (t, o, r) {
                return (
                  a && ((a = !1), (t = $n(e, t))),
                  n.call(this, t, $n(e, o), r, e)
                );
              }))
            : n.length > 3 &&
              (s = function (t, o, r) {
                return n.call(this, t, o, r, e);
              }));
        const l = r[t](s, ...o);
        return a ? $n(e, l) : l;
      }
      function Jn(e, t, n) {
        const o = Eo(e);
        Hn(o, 0, Mn);
        const r = o[t](...n);
        return (-1 !== r && !1 !== r) || !So(n[0])
          ? r
          : ((n[0] = Eo(n[0])), o[t](...n));
      }
      function Gn(e, t, n = []) {
        (Tn(), yn());
        const o = Eo(e)[t].apply(e, n);
        return (bn(), An(), o);
      }
      const Xn = ut("__proto__,__v_isRef,__isVue"),
        Qn = new Set(
          Object.getOwnPropertyNames(Symbol)
            .filter((e) => "arguments" !== e && "caller" !== e)
            .map((e) => Symbol[e])
            .filter(Ct),
        );
      function Zn(e) {
        Ct(e) || (e = String(e));
        const t = Eo(this);
        return (Hn(t, 0, e), t.hasOwnProperty(e));
      }
      class eo {
        constructor(e = !1, t = !1) {
          ((this._isReadonly = e), (this._isShallow = t));
        }
        get(e, t, n) {
          if ("__v_skip" === t) return e.__v_skip;
          const o = this._isReadonly,
            r = this._isShallow;
          if ("__v_isReactive" === t) return !o;
          if ("__v_isReadonly" === t) return o;
          if ("__v_isShallow" === t) return r;
          if ("__v_raw" === t)
            return n === (o ? (r ? go : vo) : r ? mo : ho).get(e) ||
              Object.getPrototypeOf(e) === Object.getPrototypeOf(n)
              ? e
              : void 0;
          const i = xt(e);
          if (!o) {
            let e;
            if (i && (e = Wn[t])) return e;
            if ("hasOwnProperty" === t) return Zn;
          }
          const s = Reflect.get(e, t, To(e) ? e : n);
          if (Ct(t) ? Qn.has(t) : Xn(t)) return s;
          if ((o || Hn(e, 0, t), r)) return s;
          if (To(s)) {
            const e = i && It(t) ? s : s.value;
            return o && Tt(e) ? bo(e) : e;
          }
          return Tt(s) ? (o ? bo(s) : yo(s)) : s;
        }
      }
      class to extends eo {
        constructor(e = !1) {
          super(!1, e);
        }
        set(e, t, n, o) {
          let r = e[t];
          const i = xt(e) && It(t);
          if (!this._isShallow) {
            const e = _o(r);
            if (
              (Oo(n) || _o(n) || ((r = Eo(r)), (n = Eo(n))),
              !i && To(r) && !To(n))
            )
              return (e || (r.value = n), !0);
          }
          const s = i ? Number(t) < e.length : wt(e, t),
            a = Reflect.set(e, t, n, To(e) ? e : o);
          return (
            e === Eo(o) &&
              (s ? Ft(n, r) && Un(e, "set", t, n) : Un(e, "add", t, n)),
            a
          );
        }
        deleteProperty(e, t) {
          const n = wt(e, t),
            o = (e[t], Reflect.deleteProperty(e, t));
          return (o && n && Un(e, "delete", t, void 0), o);
        }
        has(e, t) {
          const n = Reflect.has(e, t);
          return ((Ct(t) && Qn.has(t)) || Hn(e, 0, t), n);
        }
        ownKeys(e) {
          return (Hn(e, 0, xt(e) ? "length" : Vn), Reflect.ownKeys(e));
        }
      }
      class no extends eo {
        constructor(e = !1) {
          super(!0, e);
        }
        set(e, t) {
          return !0;
        }
        deleteProperty(e, t) {
          return !0;
        }
      }
      const oo = new to(),
        ro = new no(),
        io = new to(!0),
        so = (e) => e,
        ao = (e) => Reflect.getPrototypeOf(e);
      function lo(e) {
        return function (...t) {
          return "delete" !== e && ("clear" === e ? void 0 : this);
        };
      }
      function co(e, t) {
        const n = (function (e, t) {
          const n = {
            get(n) {
              const o = this.__v_raw,
                r = Eo(o),
                i = Eo(n);
              e || (Ft(n, i) && Hn(r, 0, n), Hn(r, 0, i));
              const { has: s } = ao(r),
                a = t ? so : e ? Co : ko;
              return s.call(r, n)
                ? a(o.get(n))
                : s.call(r, i)
                  ? a(o.get(i))
                  : void (o !== r && o.get(n));
            },
            get size() {
              const t = this.__v_raw;
              return (!e && Hn(Eo(t), 0, Vn), t.size);
            },
            has(t) {
              const n = this.__v_raw,
                o = Eo(n),
                r = Eo(t);
              return (
                e || (Ft(t, r) && Hn(o, 0, t), Hn(o, 0, r)),
                t === r ? n.has(t) : n.has(t) || n.has(r)
              );
            },
            forEach(n, o) {
              const r = this,
                i = r.__v_raw,
                s = Eo(i),
                a = t ? so : e ? Co : ko;
              return (
                !e && Hn(s, 0, Vn),
                i.forEach((e, t) => n.call(o, a(e), a(t), r))
              );
            },
          };
          return (
            gt(
              n,
              e
                ? {
                    add: lo("add"),
                    set: lo("set"),
                    delete: lo("delete"),
                    clear: lo("clear"),
                  }
                : {
                    add(e) {
                      const n = Eo(this),
                        o = ao(n),
                        r = Eo(e),
                        i = t || Oo(e) || _o(e) ? e : r;
                      return (
                        o.has.call(n, i) ||
                          (Ft(e, i) && o.has.call(n, e)) ||
                          (Ft(r, i) && o.has.call(n, r)) ||
                          (n.add(i), Un(n, "add", i, i)),
                        this
                      );
                    },
                    set(e, n) {
                      t || Oo(n) || _o(n) || (n = Eo(n));
                      const o = Eo(this),
                        { has: r, get: i } = ao(o);
                      let s = r.call(o, e);
                      s || ((e = Eo(e)), (s = r.call(o, e)));
                      const a = i.call(o, e);
                      return (
                        o.set(e, n),
                        s ? Ft(n, a) && Un(o, "set", e, n) : Un(o, "add", e, n),
                        this
                      );
                    },
                    delete(e) {
                      const t = Eo(this),
                        { has: n, get: o } = ao(t);
                      let r = n.call(t, e);
                      (r || ((e = Eo(e)), (r = n.call(t, e))),
                        o && o.call(t, e));
                      const i = t.delete(e);
                      return (r && Un(t, "delete", e, void 0), i);
                    },
                    clear() {
                      const e = Eo(this),
                        t = 0 !== e.size,
                        n = e.clear();
                      return (t && Un(e, "clear", void 0, void 0), n);
                    },
                  },
            ),
            ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
              n[o] = (function (e, t, n) {
                return function (...o) {
                  const r = this.__v_raw,
                    i = Eo(r),
                    s = _t(i),
                    a = "entries" === e || (e === Symbol.iterator && s),
                    l = "keys" === e && s,
                    c = r[e](...o),
                    u = n ? so : t ? Co : ko;
                  return (
                    !t && Hn(i, 0, l ? Nn : Vn),
                    gt(Object.create(c), {
                      next() {
                        const { value: e, done: t } = c.next();
                        return t
                          ? { value: e, done: t }
                          : { value: a ? [u(e[0]), u(e[1])] : u(e), done: t };
                      },
                    })
                  );
                };
              })(o, e, t);
            }),
            n
          );
        })(e, t);
        return (t, o, r) =>
          "__v_isReactive" === o
            ? !e
            : "__v_isReadonly" === o
              ? e
              : "__v_raw" === o
                ? t
                : Reflect.get(wt(n, o) && o in t ? n : t, o, r);
      }
      const uo = { get: co(!1, !1) },
        po = { get: co(!1, !0) },
        fo = { get: co(!0, !1) },
        ho = new WeakMap(),
        mo = new WeakMap(),
        vo = new WeakMap(),
        go = new WeakMap();
      function yo(e) {
        return _o(e) ? e : wo(e, !1, oo, uo, ho);
      }
      function bo(e) {
        return wo(e, !0, ro, fo, vo);
      }
      function wo(e, t, n, o, r) {
        if (!Tt(e)) return e;
        if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
        const i =
          (s = e).__v_skip || !Object.isExtensible(s)
            ? 0
            : (function (e) {
                switch (e) {
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
              })(((e) => Pt(e).slice(8, -1))(s));
        var s;
        if (0 === i) return e;
        const a = r.get(e);
        if (a) return a;
        const l = new Proxy(e, 2 === i ? o : n);
        return (r.set(e, l), l);
      }
      function xo(e) {
        return _o(e) ? xo(e.__v_raw) : !(!e || !e.__v_isReactive);
      }
      function _o(e) {
        return !(!e || !e.__v_isReadonly);
      }
      function Oo(e) {
        return !(!e || !e.__v_isShallow);
      }
      function So(e) {
        return !!e && !!e.__v_raw;
      }
      function Eo(e) {
        const t = e && e.__v_raw;
        return t ? Eo(t) : e;
      }
      const ko = (e) => (Tt(e) ? yo(e) : e),
        Co = (e) => (Tt(e) ? bo(e) : e);
      function To(e) {
        return !!e && !0 === e.__v_isRef;
      }
      const Ao = {
        get: (e, t, n) => {
          return "__v_raw" === t
            ? e
            : To((o = Reflect.get(e, t, n)))
              ? o.value
              : o;
          var o;
        },
        set: (e, t, n, o) => {
          const r = e[t];
          return To(r) && !To(n)
            ? ((r.value = n), !0)
            : Reflect.set(e, t, n, o);
        },
      };
      function Lo(e) {
        return xo(e) ? e : new Proxy(e, Ao);
      }
      class Po {
        constructor(e, t, n) {
          ((this.fn = e),
            (this.setter = t),
            (this._value = void 0),
            (this.dep = new In(this)),
            (this.__v_isRef = !0),
            (this.deps = void 0),
            (this.depsTail = void 0),
            (this.flags = 16),
            (this.globalVersion = Pn - 1),
            (this.next = void 0),
            (this.effect = this),
            (this.__v_isReadonly = !t),
            (this.isSSR = n));
        }
        notify() {
          if (((this.flags |= 16), !(8 & this.flags || un === this)))
            return (gn(this, !0), !0);
        }
        get value() {
          const e = this.dep.track();
          return (On(this), e && (e.version = this.dep.version), this._value);
        }
        set value(e) {
          this.setter && this.setter(e);
        }
      }
      const jo = {},
        Io = new WeakMap();
      let Do;
      function Ro(e, t = 1 / 0, n) {
        if (t <= 0 || !Tt(e) || e.__v_skip) return e;
        if (((n = n || new Map()).get(e) || 0) >= t) return e;
        if ((n.set(e, t), t--, To(e))) Ro(e.value, t, n);
        else if (xt(e)) for (let o = 0; o < e.length; o++) Ro(e[o], t, n);
        else if (Ot(e) || _t(e))
          e.forEach((e) => {
            Ro(e, t, n);
          });
        else if (jt(e)) {
          for (const o in e) Ro(e[o], t, n);
          for (const o of Object.getOwnPropertySymbols(e))
            Object.prototype.propertyIsEnumerable.call(e, o) && Ro(e[o], t, n);
        }
        return e;
      }
      function Vo(e, t, n, o) {
        try {
          return o ? e(...o) : e();
        } catch (e) {
          Mo(e, t, n);
        }
      }
      function No(e, t, n, o) {
        if (Et(e)) {
          const r = Vo(e, t, n, o);
          return (
            r &&
              At(r) &&
              r.catch((e) => {
                Mo(e, t, n);
              }),
            r
          );
        }
        if (xt(e)) {
          const r = [];
          for (let i = 0; i < e.length; i++) r.push(No(e[i], t, n, o));
          return r;
        }
      }
      function Mo(e, t, n, o = !0) {
        t && t.vnode;
        const { errorHandler: r, throwUnhandledErrorInProduction: i } =
          (t && t.appContext.config) || pt;
        if (t) {
          let o = t.parent;
          const i = t.proxy,
            s = `https://vuejs.org/error-reference/#runtime-${n}`;
          for (; o;) {
            const t = o.ec;
            if (t)
              for (let n = 0; n < t.length; n++)
                if (!1 === t[n](e, i, s)) return;
            o = o.parent;
          }
          if (r) return (Tn(), Vo(r, null, 10, [e, i, s]), void An());
        }
        !(function (e, t, n, o = !0, r = !1) {
          if (r) throw e;
          console.error(e);
        })(e, 0, 0, o, i);
      }
      const Ho = [];
      let Uo = -1;
      const Bo = [];
      let Fo = null,
        $o = 0;
      const Wo = Promise.resolve();
      let qo = null;
      function zo(e) {
        const t = qo || Wo;
        return e ? t.then(this ? e.bind(this) : e) : t;
      }
      function Ko(e) {
        if (!(1 & e.flags)) {
          const t = Xo(e),
            n = Ho[Ho.length - 1];
          (!n || (!(2 & e.flags) && t >= Xo(n))
            ? Ho.push(e)
            : Ho.splice(
                (function (e) {
                  let t = Uo + 1,
                    n = Ho.length;
                  for (; t < n;) {
                    const o = (t + n) >>> 1,
                      r = Ho[o],
                      i = Xo(r);
                    i < e || (i === e && 2 & r.flags) ? (t = o + 1) : (n = o);
                  }
                  return t;
                })(t),
                0,
                e,
              ),
            (e.flags |= 1),
            Yo());
        }
      }
      function Yo() {
        qo || (qo = Wo.then(Qo));
      }
      function Jo(e, t, n = Uo + 1) {
        for (; n < Ho.length; n++) {
          const t = Ho[n];
          if (t && 2 & t.flags) {
            if (e && t.id !== e.uid) continue;
            (Ho.splice(n, 1),
              n--,
              4 & t.flags && (t.flags &= -2),
              t(),
              4 & t.flags || (t.flags &= -2));
          }
        }
      }
      function Go(e) {
        if (Bo.length) {
          const e = [...new Set(Bo)].sort((e, t) => Xo(e) - Xo(t));
          if (((Bo.length = 0), Fo)) return void Fo.push(...e);
          for (Fo = e, $o = 0; $o < Fo.length; $o++) {
            const e = Fo[$o];
            (4 & e.flags && (e.flags &= -2),
              8 & e.flags || e(),
              (e.flags &= -2));
          }
          ((Fo = null), ($o = 0));
        }
      }
      const Xo = (e) => (null == e.id ? (2 & e.flags ? -1 : 1 / 0) : e.id);
      function Qo(e) {
        try {
          for (Uo = 0; Uo < Ho.length; Uo++) {
            const e = Ho[Uo];
            !e ||
              8 & e.flags ||
              (4 & e.flags && (e.flags &= -2),
              Vo(e, e.i, e.i ? 15 : 14),
              4 & e.flags || (e.flags &= -2));
          }
        } finally {
          for (; Uo < Ho.length; Uo++) {
            const e = Ho[Uo];
            e && (e.flags &= -2);
          }
          ((Uo = -1),
            (Ho.length = 0),
            Go(),
            (qo = null),
            (Ho.length || Bo.length) && Qo(e));
        }
      }
      let Zo,
        er = [],
        tr = !1;
      function nr(e, ...t) {
        Zo ? Zo.emit(e, ...t) : tr || er.push({ event: e, args: t });
      }
      function or(e, t) {
        var n, o;
        ((Zo = e),
          Zo
            ? ((Zo.enabled = !0),
              er.forEach(({ event: e, args: t }) => Zo.emit(e, ...t)),
              (er = []))
            : "undefined" != typeof window &&
                window.HTMLElement &&
                !(null ==
                (o = null == (n = window.navigator) ? void 0 : n.userAgent)
                  ? void 0
                  : o.includes("jsdom"))
              ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ =
                  t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((e) => {
                  or(e, t);
                }),
                setTimeout(() => {
                  Zo ||
                    ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null),
                    (tr = !0),
                    (er = []));
                }, 3e3))
              : ((tr = !0), (er = [])));
      }
      const rr = ar("component:added"),
        ir = ar("component:updated"),
        sr = ar("component:removed");
      function ar(e) {
        return (t) => {
          nr(e, t.appContext.app, t.uid, t.parent ? t.parent.uid : void 0, t);
        };
      }
      let lr = null,
        cr = null;
      function ur(e) {
        const t = lr;
        return ((lr = e), (cr = (e && e.type.__scopeId) || null), t);
      }
      function pr(e, t = lr, n) {
        if (!t) return e;
        if (e._n) return e;
        const o = (...n) => {
          o._d && is(-1);
          const r = ur(t);
          let i;
          try {
            i = e(...n);
          } finally {
            (ur(r), o._d && is(1));
          }
          return (__VUE_PROD_DEVTOOLS__ && ir(t), i);
        };
        return ((o._n = !0), (o._c = !0), (o._d = !0), o);
      }
      function dr(e, t) {
        if (null === lr) return e;
        const n = Ns(lr),
          o = e.dirs || (e.dirs = []);
        for (let e = 0; e < t.length; e++) {
          let [r, i, s, a = pt] = t[e];
          r &&
            (Et(r) && (r = { mounted: r, updated: r }),
            r.deep && Ro(i),
            o.push({
              dir: r,
              instance: n,
              value: i,
              oldValue: void 0,
              arg: s,
              modifiers: a,
            }));
        }
        return e;
      }
      function fr(e, t, n, o) {
        const r = e.dirs,
          i = t && t.dirs;
        for (let s = 0; s < r.length; s++) {
          const a = r[s];
          i && (a.oldValue = i[s].value);
          let l = a.dir[o];
          l && (Tn(), No(l, n, 8, [e.el, a, e, t]), An());
        }
      }
      function hr(e, t, n = !1) {
        const o = Es();
        if (o || yi) {
          let r = yi
            ? yi._context.provides
            : o
              ? null == o.parent || o.ce
                ? o.vnode.appContext && o.vnode.appContext.provides
                : o.parent.provides
              : void 0;
          if (r && e in r) return r[e];
          if (arguments.length > 1)
            return n && Et(t) ? t.call(o && o.proxy) : t;
        }
      }
      const mr = Symbol.for("v-scx");
      function vr(e, t, n) {
        return gr(e, t, n);
      }
      function gr(e, t, n = pt) {
        const { immediate: o, deep: r, flush: i, once: s } = n,
          a = gt({}, n),
          l = (t && o) || (!t && "post" !== i);
        let c;
        if (Is)
          if ("sync" === i) {
            const e = hr(mr);
            c = e.__watcherHandles || (e.__watcherHandles = []);
          } else if (!l) {
            const e = () => {};
            return ((e.stop = ft), (e.resume = ft), (e.pause = ft), e);
          }
        const u = Ss;
        a.call = (e, t, n) => No(e, u, t, n);
        let p = !1;
        ("post" === i
          ? (a.scheduler = (e) => {
              Fi(e, u && u.suspense);
            })
          : "sync" !== i &&
            ((p = !0),
            (a.scheduler = (e, t) => {
              t ? e() : Ko(e);
            })),
          (a.augmentJob = (e) => {
            (t && (e.flags |= 4),
              p && ((e.flags |= 2), u && ((e.id = u.uid), (e.i = u))));
          }));
        const d = (function (e, t, n = pt) {
          const {
              immediate: o,
              deep: r,
              once: i,
              scheduler: s,
              augmentJob: a,
              call: l,
            } = n,
            c = (e) =>
              r ? e : Oo(e) || !1 === r || 0 === r ? Ro(e, 1) : Ro(e);
          let u,
            p,
            d,
            f,
            h = !1,
            m = !1;
          if (
            (To(e)
              ? ((p = () => e.value), (h = Oo(e)))
              : xo(e)
                ? ((p = () => c(e)), (h = !0))
                : xt(e)
                  ? ((m = !0),
                    (h = e.some((e) => xo(e) || Oo(e))),
                    (p = () =>
                      e.map((e) =>
                        To(e)
                          ? e.value
                          : xo(e)
                            ? c(e)
                            : Et(e)
                              ? l
                                ? l(e, 2)
                                : e()
                              : void 0,
                      )))
                  : (p = Et(e)
                      ? t
                        ? l
                          ? () => l(e, 2)
                          : e
                        : () => {
                            if (d) {
                              Tn();
                              try {
                                d();
                              } finally {
                                An();
                              }
                            }
                            const t = Do;
                            Do = u;
                            try {
                              return l ? l(e, 3, [f]) : e(f);
                            } finally {
                              Do = t;
                            }
                          }
                      : ft),
            t && r)
          ) {
            const e = p,
              t = !0 === r ? 1 / 0 : r;
            p = () => Ro(e(), t);
          }
          const v = cn,
            g = () => {
              (u.stop(), v && v.active && yt(v.effects, u));
            };
          if (i && t) {
            const e = t;
            t = (...t) => {
              (e(...t), g());
            };
          }
          let y = m ? new Array(e.length).fill(jo) : jo;
          const b = (e) => {
            if (1 & u.flags && (u.dirty || e))
              if (t) {
                const e = u.run();
                if (r || h || (m ? e.some((e, t) => Ft(e, y[t])) : Ft(e, y))) {
                  d && d();
                  const n = Do;
                  Do = u;
                  try {
                    const n = [
                      e,
                      y === jo ? void 0 : m && y[0] === jo ? [] : y,
                      f,
                    ];
                    ((y = e), l ? l(t, 3, n) : t(...n));
                  } finally {
                    Do = n;
                  }
                }
              } else u.run();
          };
          return (
            a && a(b),
            (u = new fn(p)),
            (u.scheduler = s ? () => s(b, !1) : b),
            (f = (e) =>
              (function (e, t = !1, n = Do) {
                if (n) {
                  let t = Io.get(n);
                  (t || Io.set(n, (t = [])), t.push(e));
                }
              })(e, !1, u)),
            (d = u.onStop =
              () => {
                const e = Io.get(u);
                if (e) {
                  if (l) l(e, 4);
                  else for (const t of e) t();
                  Io.delete(u);
                }
              }),
            t
              ? o
                ? b(!0)
                : (y = u.run())
              : s
                ? s(b.bind(null, !0), !0)
                : u.run(),
            (g.pause = u.pause.bind(u)),
            (g.resume = u.resume.bind(u)),
            (g.stop = g),
            g
          );
        })(e, t, a);
        return (Is && (c ? c.push(d) : l && d()), d);
      }
      function yr(e, t, n) {
        const o = this.proxy,
          r = kt(e) ? (e.includes(".") ? br(o, e) : () => o[e]) : e.bind(o, o);
        let i;
        Et(t) ? (i = t) : ((i = t.handler), (n = t));
        const s = Ts(this),
          a = gr(r, i.bind(o), n);
        return (s(), a);
      }
      function br(e, t) {
        const n = t.split(".");
        return () => {
          let t = e;
          for (let e = 0; e < n.length && t; e++) t = t[n[e]];
          return t;
        };
      }
      const wr = Symbol("_vte"),
        xr = Symbol("_leaveCb");
      function _r(e, t) {
        6 & e.shapeFlag && e.component
          ? ((e.transition = t), _r(e.component.subTree, t))
          : 128 & e.shapeFlag
            ? ((e.ssContent.transition = t.clone(e.ssContent)),
              (e.ssFallback.transition = t.clone(e.ssFallback)))
            : (e.transition = t);
      }
      function Or(e) {
        e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
      }
      function Sr(e, t) {
        let n;
        return !(
          !(n = Object.getOwnPropertyDescriptor(e, t)) || n.configurable
        );
      }
      (Boolean, Boolean);
      const Er = new WeakMap();
      function kr(e, t, n, o, r = !1) {
        if (xt(e))
          return void e.forEach((e, i) =>
            kr(e, t && (xt(t) ? t[i] : t), n, o, r),
          );
        if (Tr(o) && !r)
          return void (
            512 & o.shapeFlag &&
            o.type.__asyncResolved &&
            o.component.subTree.component &&
            kr(e, t, n, o.component.subTree)
          );
        const i = 4 & o.shapeFlag ? Ns(o.component) : o.el,
          s = r ? null : i,
          { i: a, r: l } = e,
          c = t && t.r,
          u = a.refs === pt ? (a.refs = {}) : a.refs,
          p = a.setupState,
          d = Eo(p),
          f = p === pt ? ht : (e) => !Sr(u, e) && wt(d, e),
          h = (e, t) => !t || !Sr(u, t);
        if (null != c && c !== l)
          if ((Cr(t), kt(c))) ((u[c] = null), f(c) && (p[c] = null));
          else if (To(c)) {
            const e = t;
            (h(0, e.k) && (c.value = null), e.k && (u[e.k] = null));
          }
        if (Et(l)) Vo(l, a, 12, [s, u]);
        else {
          const t = kt(l),
            o = To(l);
          if (t || o) {
            const a = () => {
              if (e.f) {
                const n = t
                  ? f(l)
                    ? p[l]
                    : u[l]
                  : h() || !e.k
                    ? l.value
                    : u[e.k];
                if (r) xt(n) && yt(n, i);
                else if (xt(n)) n.includes(i) || n.push(i);
                else if (t) ((u[l] = [i]), f(l) && (p[l] = u[l]));
                else {
                  const t = [i];
                  (h(0, e.k) && (l.value = t), e.k && (u[e.k] = t));
                }
              } else
                t
                  ? ((u[l] = s), f(l) && (p[l] = s))
                  : o && (h(0, e.k) && (l.value = s), e.k && (u[e.k] = s));
            };
            if (s) {
              const t = () => {
                (a(), Er.delete(e));
              };
              ((t.id = -1), Er.set(e, t), Fi(t, n));
            } else (Cr(e), a());
          }
        }
      }
      function Cr(e) {
        const t = Er.get(e);
        t && ((t.flags |= 8), Er.delete(e));
      }
      (Kt().requestIdleCallback, Kt().cancelIdleCallback);
      const Tr = (e) => !!e.type.__asyncLoader,
        Ar = (e) => e.type.__isKeepAlive;
      function Lr(e, t) {
        jr(e, "a", t);
      }
      function Pr(e, t) {
        jr(e, "da", t);
      }
      function jr(e, t, n = Ss) {
        const o =
          e.__wdc ||
          (e.__wdc = () => {
            let t = n;
            for (; t;) {
              if (t.isDeactivated) return;
              t = t.parent;
            }
            return e();
          });
        if ((Dr(t, o, n), n)) {
          let e = n.parent;
          for (; e && e.parent;)
            (Ar(e.parent.vnode) && Ir(o, t, n, e), (e = e.parent));
        }
      }
      function Ir(e, t, n, o) {
        const r = Dr(t, e, o, !0);
        Br(() => {
          yt(o[t], r);
        }, n);
      }
      function Dr(e, t, n = Ss, o = !1) {
        if (n) {
          const r = n[e] || (n[e] = []),
            i =
              t.__weh ||
              (t.__weh = (...o) => {
                Tn();
                const r = Ts(n),
                  i = No(t, n, e, o);
                return (r(), An(), i);
              });
          return (o ? r.unshift(i) : r.push(i), i);
        }
      }
      (RegExp, RegExp);
      const Rr =
          (e) =>
          (t, n = Ss) => {
            (Is && "sp" !== e) || Dr(e, (...e) => t(...e), n);
          },
        Vr = Rr("bm"),
        Nr = Rr("m"),
        Mr = Rr("bu"),
        Hr = Rr("u"),
        Ur = Rr("bum"),
        Br = Rr("um"),
        Fr = Rr("sp"),
        $r = Rr("rtg"),
        Wr = Rr("rtc");
      function qr(e, t = Ss) {
        Dr("ec", e, t);
      }
      const zr = "components";
      function Kr(e, t) {
        return (
          (function (e, t, n = !0, o = !1) {
            const r = lr || Ss;
            if (r) {
              const n = r.type;
              if (e === zr) {
                const e = (function (e, t = !0) {
                  return Et(e)
                    ? e.displayName || e.name
                    : e.name || (t && e.__name);
                })(n, !1);
                if (e && (e === t || e === Nt(t) || e === Ut(Nt(t)))) return n;
              }
              const i = Jr(r[e] || n[e], t) || Jr(r.appContext[e], t);
              return !i && o ? n : i;
            }
          })(zr, e, !0, t) || e
        );
      }
      const Yr = Symbol.for("v-ndc");
      function Jr(e, t) {
        return e && (e[t] || e[Nt(t)] || e[Ut(Nt(t))]);
      }
      function Gr(e, t, n, o) {
        let r;
        const i = n && n[o],
          s = xt(e);
        if (s || kt(e)) {
          let n = !1,
            o = !1;
          (s && xo(e) && ((n = !Oo(e)), (o = _o(e)), (e = Fn(e))),
            (r = new Array(e.length)));
          for (let s = 0, a = e.length; s < a; s++)
            r[s] = t(
              n ? (o ? Co(ko(e[s])) : ko(e[s])) : e[s],
              s,
              void 0,
              i && i[s],
            );
        } else if ("number" == typeof e) {
          r = new Array(e);
          for (let n = 0; n < e; n++) r[n] = t(n + 1, n, void 0, i && i[n]);
        } else if (Tt(e))
          if (e[Symbol.iterator])
            r = Array.from(e, (e, n) => t(e, n, void 0, i && i[n]));
          else {
            const n = Object.keys(e);
            r = new Array(n.length);
            for (let o = 0, s = n.length; o < s; o++) {
              const s = n[o];
              r[o] = t(e[s], s, o, i && i[o]);
            }
          }
        else r = [];
        return (n && (n[o] = r), r);
      }
      function Xr(e, t, n = {}, o, r) {
        if (lr.ce || (lr.parent && Tr(lr.parent) && lr.parent.ce)) {
          const e = Object.keys(n).length > 0;
          return (
            "default" !== t && (n.name = t),
            os(),
            ls(Xi, null, [hs("slot", n, o && o())], e ? -2 : 64)
          );
        }
        let i = e[t];
        (i && i._c && (i._d = !1), os());
        const s = i && Qr(i(n)),
          a = n.key || (s && s.key),
          l = ls(
            Xi,
            { key: (a && !Ct(a) ? a : `_${t}`) + (!s && o ? "_fb" : "") },
            s || (o ? o() : []),
            s && 1 === e._ ? 64 : -2,
          );
        return (
          !r && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
          i && i._c && (i._d = !0),
          l
        );
      }
      function Qr(e) {
        return e.some(
          (e) =>
            !cs(e) || (e.type !== Zi && !(e.type === Xi && !Qr(e.children))),
        )
          ? e
          : null;
      }
      const Zr = (e) => (e ? (Ls(e) ? Ns(e) : Zr(e.parent)) : null),
        ei = gt(Object.create(null), {
          $: (e) => e,
          $el: (e) => e.vnode.el,
          $data: (e) => e.data,
          $props: (e) => e.props,
          $attrs: (e) => e.attrs,
          $slots: (e) => e.slots,
          $refs: (e) => e.refs,
          $parent: (e) => Zr(e.parent),
          $root: (e) => Zr(e.root),
          $host: (e) => e.ce,
          $emit: (e) => e.emit,
          $options: (e) => (__VUE_OPTIONS_API__ ? ai(e) : e.type),
          $forceUpdate: (e) =>
            e.f ||
            (e.f = () => {
              Ko(e.update);
            }),
          $nextTick: (e) => e.n || (e.n = zo.bind(e.proxy)),
          $watch: (e) => (__VUE_OPTIONS_API__ ? yr.bind(e) : ft),
        }),
        ti = (e, t) => e !== pt && !e.__isScriptSetup && wt(e, t),
        ni = {
          get({ _: e }, t) {
            if ("__v_skip" === t) return !0;
            const {
              ctx: n,
              setupState: o,
              data: r,
              props: i,
              accessCache: s,
              type: a,
              appContext: l,
            } = e;
            if ("$" !== t[0]) {
              const e = s[t];
              if (void 0 !== e)
                switch (e) {
                  case 1:
                    return o[t];
                  case 2:
                    return r[t];
                  case 4:
                    return n[t];
                  case 3:
                    return i[t];
                }
              else {
                if (ti(o, t)) return ((s[t] = 1), o[t]);
                if (__VUE_OPTIONS_API__ && r !== pt && wt(r, t))
                  return ((s[t] = 2), r[t]);
                if (wt(i, t)) return ((s[t] = 3), i[t]);
                if (n !== pt && wt(n, t)) return ((s[t] = 4), n[t]);
                (__VUE_OPTIONS_API__ && !ri) || (s[t] = 0);
              }
            }
            const c = ei[t];
            let u, p;
            return c
              ? ("$attrs" === t && Hn(e.attrs, 0, ""), c(e))
              : (u = a.__cssModules) && (u = u[t])
                ? u
                : n !== pt && wt(n, t)
                  ? ((s[t] = 4), n[t])
                  : ((p = l.config.globalProperties), wt(p, t) ? p[t] : void 0);
          },
          set({ _: e }, t, n) {
            const { data: o, setupState: r, ctx: i } = e;
            return ti(r, t)
              ? ((r[t] = n), !0)
              : __VUE_OPTIONS_API__ && o !== pt && wt(o, t)
                ? ((o[t] = n), !0)
                : !(
                    wt(e.props, t) ||
                    ("$" === t[0] && t.slice(1) in e) ||
                    ((i[t] = n), 0)
                  );
          },
          has(
            {
              _: {
                data: e,
                setupState: t,
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
              (__VUE_OPTIONS_API__ && e !== pt && "$" !== a[0] && wt(e, a)) ||
              ti(t, a) ||
              wt(i, a) ||
              wt(o, a) ||
              wt(ei, a) ||
              wt(r.config.globalProperties, a) ||
              ((l = s.__cssModules) && l[a])
            );
          },
          defineProperty(e, t, n) {
            return (
              null != n.get
                ? (e._.accessCache[t] = 0)
                : wt(n, "value") && this.set(e, t, n.value, null),
              Reflect.defineProperty(e, t, n)
            );
          },
        };
      function oi(e) {
        return xt(e) ? e.reduce((e, t) => ((e[t] = null), e), {}) : e;
      }
      let ri = !0;
      function ii(e, t, n) {
        No(xt(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
      }
      function si(e, t, n, o) {
        let r = o.includes(".") ? br(n, o) : () => n[o];
        if (kt(e)) {
          const n = t[e];
          Et(n) && vr(r, n);
        } else if (Et(e)) vr(r, e.bind(n));
        else if (Tt(e))
          if (xt(e)) e.forEach((e) => si(e, t, n, o));
          else {
            const o = Et(e.handler) ? e.handler.bind(n) : t[e.handler];
            Et(o) && vr(r, o, e);
          }
      }
      function ai(e) {
        const t = e.type,
          { mixins: n, extends: o } = t,
          {
            mixins: r,
            optionsCache: i,
            config: { optionMergeStrategies: s },
          } = e.appContext,
          a = i.get(t);
        let l;
        return (
          a
            ? (l = a)
            : r.length || n || o
              ? ((l = {}),
                r.length && r.forEach((e) => li(l, e, s, !0)),
                li(l, t, s))
              : (l = t),
          Tt(t) && i.set(t, l),
          l
        );
      }
      function li(e, t, n, o = !1) {
        const { mixins: r, extends: i } = t;
        (i && li(e, i, n, !0), r && r.forEach((t) => li(e, t, n, !0)));
        for (const r in t)
          if (o && "expose" === r);
          else {
            const o = ci[r] || (n && n[r]);
            e[r] = o ? o(e[r], t[r]) : t[r];
          }
        return e;
      }
      const ci = {
        data: ui,
        props: hi,
        emits: hi,
        methods: fi,
        computed: fi,
        beforeCreate: di,
        created: di,
        beforeMount: di,
        mounted: di,
        beforeUpdate: di,
        updated: di,
        beforeDestroy: di,
        beforeUnmount: di,
        destroyed: di,
        unmounted: di,
        activated: di,
        deactivated: di,
        errorCaptured: di,
        serverPrefetch: di,
        components: fi,
        directives: fi,
        watch: function (e, t) {
          if (!e) return t;
          if (!t) return e;
          const n = gt(Object.create(null), e);
          for (const o in t) n[o] = di(e[o], t[o]);
          return n;
        },
        provide: ui,
        inject: function (e, t) {
          return fi(pi(e), pi(t));
        },
      };
      function ui(e, t) {
        return t
          ? e
            ? function () {
                return gt(
                  Et(e) ? e.call(this, this) : e,
                  Et(t) ? t.call(this, this) : t,
                );
              }
            : t
          : e;
      }
      function pi(e) {
        if (xt(e)) {
          const t = {};
          for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
          return t;
        }
        return e;
      }
      function di(e, t) {
        return e ? [...new Set([].concat(e, t))] : t;
      }
      function fi(e, t) {
        return e ? gt(Object.create(null), e, t) : t;
      }
      function hi(e, t) {
        return e
          ? xt(e) && xt(t)
            ? [...new Set([...e, ...t])]
            : gt(Object.create(null), oi(e), oi(null != t ? t : {}))
          : t;
      }
      function mi() {
        return {
          app: null,
          config: {
            isNativeTag: ht,
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
      let vi = 0;
      function gi(e, t) {
        return function (n, o = null) {
          (Et(n) || (n = gt({}, n)), null == o || Tt(o) || (o = null));
          const r = mi(),
            i = new WeakSet(),
            s = [];
          let a = !1;
          const l = (r.app = {
            _uid: vi++,
            _component: n,
            _props: o,
            _container: null,
            _context: r,
            _instance: null,
            version: Hs,
            get config() {
              return r.config;
            },
            set config(e) {},
            use: (e, ...t) => (
              i.has(e) ||
                (e && Et(e.install)
                  ? (i.add(e), e.install(l, ...t))
                  : Et(e) && (i.add(e), e(l, ...t))),
              l
            ),
            mixin: (e) => (
              __VUE_OPTIONS_API__ && (r.mixins.includes(e) || r.mixins.push(e)),
              l
            ),
            component: (e, t) =>
              t ? ((r.components[e] = t), l) : r.components[e],
            directive: (e, t) =>
              t ? ((r.directives[e] = t), l) : r.directives[e],
            mount(i, s, c) {
              if (!a) {
                const u = l._ceVNode || hs(n, o);
                return (
                  (u.appContext = r),
                  !0 === c ? (c = "svg") : !1 === c && (c = void 0),
                  s && t ? t(u, i) : e(u, i, c),
                  (a = !0),
                  (l._container = i),
                  (i.__vue_app__ = l),
                  __VUE_PROD_DEVTOOLS__ &&
                    ((l._instance = u.component),
                    (function (e, t) {
                      nr("app:init", e, t, {
                        Fragment: Xi,
                        Text: Qi,
                        Comment: Zi,
                        Static: es,
                      });
                    })(l, Hs)),
                  Ns(u.component)
                );
              }
            },
            onUnmount(e) {
              s.push(e);
            },
            unmount() {
              a &&
                (No(s, l._instance, 16),
                e(null, l._container),
                __VUE_PROD_DEVTOOLS__ &&
                  ((l._instance = null),
                  (function (e) {
                    nr("app:unmount", e);
                  })(l)),
                delete l._container.__vue_app__);
            },
            provide: (e, t) => ((r.provides[e] = t), l),
            runWithContext(e) {
              const t = yi;
              yi = l;
              try {
                return e();
              } finally {
                yi = t;
              }
            },
          });
          return l;
        };
      }
      let yi = null;
      function bi(e, t, ...n) {
        if (e.isUnmounted) return;
        const o = e.vnode.props || pt;
        let r = n;
        const i = t.startsWith("update:"),
          s =
            i &&
            ((e, t) =>
              "modelValue" === t || "model-value" === t
                ? e.modelModifiers
                : e[`${t}Modifiers`] ||
                  e[`${Nt(t)}Modifiers`] ||
                  e[`${Ht(t)}Modifiers`])(o, t.slice(7));
        let a;
        (s &&
          (s.trim && (r = n.map((e) => (kt(e) ? e.trim() : e))),
          s.number && (r = n.map(qt))),
          __VUE_PROD_DEVTOOLS__ &&
            (function (e, t, n) {
              nr("component:emit", e.appContext.app, e, t, n);
            })(e, t, r));
        let l = o[(a = Bt(t))] || o[(a = Bt(Nt(t)))];
        (!l && i && (l = o[(a = Bt(Ht(t)))]), l && No(l, e, 6, r));
        const c = o[a + "Once"];
        if (c) {
          if (e.emitted) {
            if (e.emitted[a]) return;
          } else e.emitted = {};
          ((e.emitted[a] = !0), No(c, e, 6, r));
        }
      }
      const wi = new WeakMap();
      function xi(e, t, n = !1) {
        const o = __VUE_OPTIONS_API__ && n ? wi : t.emitsCache,
          r = o.get(e);
        if (void 0 !== r) return r;
        const i = e.emits;
        let s = {},
          a = !1;
        if (__VUE_OPTIONS_API__ && !Et(e)) {
          const o = (e) => {
            const n = xi(e, t, !0);
            n && ((a = !0), gt(s, n));
          };
          (!n && t.mixins.length && t.mixins.forEach(o),
            e.extends && o(e.extends),
            e.mixins && e.mixins.forEach(o));
        }
        return i || a
          ? (xt(i) ? i.forEach((e) => (s[e] = null)) : gt(s, i),
            Tt(e) && o.set(e, s),
            s)
          : (Tt(e) && o.set(e, null), null);
      }
      function _i(e, t) {
        return (
          !(!e || !mt(t)) &&
          ((t = t.slice(2).replace(/Once$/, "")),
          wt(e, t[0].toLowerCase() + t.slice(1)) || wt(e, Ht(t)) || wt(e, t))
        );
      }
      function Oi(e) {
        const {
            type: t,
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
            inheritAttrs: m,
          } = e,
          v = ur(e);
        let g, y;
        try {
          if (4 & n.shapeFlag) {
            const e = r || o,
              t = e;
            ((g = ys(c.call(t, e, u, p, f, d, h))), (y = a));
          } else {
            const e = t;
            ((g = ys(
              e.length > 1 ? e(p, { attrs: a, slots: s, emit: l }) : e(p, null),
            )),
              (y = t.props ? a : Si(a)));
          }
        } catch (t) {
          ((ts.length = 0), Mo(t, e, 1), (g = hs(Zi)));
        }
        let b = g;
        if (y && !1 !== m) {
          const e = Object.keys(y),
            { shapeFlag: t } = b;
          e.length &&
            7 & t &&
            (i && e.some(vt) && (y = Ei(y, i)), (b = ms(b, y, !1, !0)));
        }
        return (
          n.dirs &&
            ((b = ms(b, null, !1, !0)),
            (b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs)),
          n.transition && _r(b, n.transition),
          (g = b),
          ur(v),
          g
        );
      }
      const Si = (e) => {
          let t;
          for (const n in e)
            ("class" === n || "style" === n || mt(n)) &&
              ((t || (t = {}))[n] = e[n]);
          return t;
        },
        Ei = (e, t) => {
          const n = {};
          for (const o in e) (vt(o) && o.slice(9) in t) || (n[o] = e[o]);
          return n;
        };
      function ki(e, t, n) {
        const o = Object.keys(t);
        if (o.length !== Object.keys(e).length) return !0;
        for (let r = 0; r < o.length; r++) {
          const i = o[r];
          if (Ci(t, e, i) && !_i(n, i)) return !0;
        }
        return !1;
      }
      function Ci(e, t, n) {
        const o = e[n],
          r = t[n];
        return "style" === n && Tt(o) && Tt(r) ? !nn(o, r) : o !== r;
      }
      const Ti = {},
        Ai = () => Object.create(Ti),
        Li = (e) => Object.getPrototypeOf(e) === Ti;
      function Pi(e, t, n, o) {
        const [r, i] = e.propsOptions;
        let s,
          a = !1;
        if (t)
          for (let l in t) {
            if (Dt(l)) continue;
            const c = t[l];
            let u;
            r && wt(r, (u = Nt(l)))
              ? i && i.includes(u)
                ? ((s || (s = {}))[u] = c)
                : (n[u] = c)
              : _i(e.emitsOptions, l) ||
                (l in o && c === o[l]) ||
                ((o[l] = c), (a = !0));
          }
        if (i) {
          const t = Eo(n),
            o = s || pt;
          for (let s = 0; s < i.length; s++) {
            const a = i[s];
            n[a] = ji(r, t, a, o[a], e, !wt(o, a));
          }
        }
        return a;
      }
      function ji(e, t, n, o, r, i) {
        const s = e[n];
        if (null != s) {
          const e = wt(s, "default");
          if (e && void 0 === o) {
            const e = s.default;
            if (s.type !== Function && !s.skipFactory && Et(e)) {
              const { propsDefaults: i } = r;
              if (n in i) o = i[n];
              else {
                const s = Ts(r);
                ((o = i[n] = e.call(null, t)), s());
              }
            } else o = e;
            r.ce && r.ce._setProp(n, o);
          }
          s[0] &&
            (i && !e
              ? (o = !1)
              : !s[1] || ("" !== o && o !== Ht(n)) || (o = !0));
        }
        return o;
      }
      const Ii = new WeakMap();
      function Di(e, t, n = !1) {
        const o = __VUE_OPTIONS_API__ && n ? Ii : t.propsCache,
          r = o.get(e);
        if (r) return r;
        const i = e.props,
          s = {},
          a = [];
        let l = !1;
        if (__VUE_OPTIONS_API__ && !Et(e)) {
          const o = (e) => {
            l = !0;
            const [n, o] = Di(e, t, !0);
            (gt(s, n), o && a.push(...o));
          };
          (!n && t.mixins.length && t.mixins.forEach(o),
            e.extends && o(e.extends),
            e.mixins && e.mixins.forEach(o));
        }
        if (!i && !l) return (Tt(e) && o.set(e, dt), dt);
        if (xt(i))
          for (let e = 0; e < i.length; e++) {
            const t = Nt(i[e]);
            Ri(t) && (s[t] = pt);
          }
        else if (i)
          for (const e in i) {
            const t = Nt(e);
            if (Ri(t)) {
              const n = i[e],
                o = (s[t] = xt(n) || Et(n) ? { type: n } : gt({}, n)),
                r = o.type;
              let l = !1,
                c = !0;
              if (xt(r))
                for (let e = 0; e < r.length; ++e) {
                  const t = r[e],
                    n = Et(t) && t.name;
                  if ("Boolean" === n) {
                    l = !0;
                    break;
                  }
                  "String" === n && (c = !1);
                }
              else l = Et(r) && "Boolean" === r.name;
              ((o[0] = l), (o[1] = c), (l || wt(o, "default")) && a.push(t));
            }
          }
        const c = [s, a];
        return (Tt(e) && o.set(e, c), c);
      }
      function Ri(e) {
        return "$" !== e[0] && !Dt(e);
      }
      const Vi = (e) => "_" === e || "_ctx" === e || "$stable" === e,
        Ni = (e) => (xt(e) ? e.map(ys) : [ys(e)]),
        Mi = (e, t, n) => {
          if (t._n) return t;
          const o = pr((...e) => Ni(t(...e)), n);
          return ((o._c = !1), o);
        },
        Hi = (e, t, n) => {
          const o = e._ctx;
          for (const n in e) {
            if (Vi(n)) continue;
            const r = e[n];
            if (Et(r)) t[n] = Mi(0, r, o);
            else if (null != r) {
              const e = Ni(r);
              t[n] = () => e;
            }
          }
        },
        Ui = (e, t) => {
          const n = Ni(t);
          e.slots.default = () => n;
        },
        Bi = (e, t, n) => {
          for (const o in t) (!n && Vi(o)) || (e[o] = t[o]);
        },
        Fi = function (e, t) {
          t && t.pendingBranch
            ? xt(e)
              ? t.effects.push(...e)
              : t.effects.push(e)
            : ((n = e),
              xt(n)
                ? Bo.push(...n)
                : Fo && -1 === n.id
                  ? Fo.splice($o + 1, 0, n)
                  : 1 & n.flags || (Bo.push(n), (n.flags |= 1)),
              Yo());
          var n;
        };
      function $i(e, t) {
        ("boolean" != typeof __VUE_OPTIONS_API__ &&
          (Kt().__VUE_OPTIONS_API__ = !0),
          "boolean" != typeof __VUE_PROD_DEVTOOLS__ &&
            (Kt().__VUE_PROD_DEVTOOLS__ = !1),
          "boolean" != typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ &&
            (Kt().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = !1));
        const n = Kt();
        ((n.__VUE__ = !0),
          __VUE_PROD_DEVTOOLS__ && or(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n));
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
            setScopeId: f = ft,
            insertStaticContent: h,
          } = e,
          m = (
            e,
            t,
            n,
            o = null,
            r = null,
            i = null,
            s = void 0,
            a = null,
            l = !!t.dynamicChildren,
          ) => {
            if (e === t) return;
            (e && !us(e, t) && ((o = B(e)), V(e, r, i, !0), (e = null)),
              -2 === t.patchFlag && ((l = !1), (t.dynamicChildren = null)));
            const { type: c, ref: u, shapeFlag: p } = t;
            switch (c) {
              case Qi:
                v(e, t, n, o);
                break;
              case Zi:
                g(e, t, n, o);
                break;
              case es:
                null == e && y(t, n, o, s);
                break;
              case Xi:
                k(e, t, n, o, r, i, s, a, l);
                break;
              default:
                1 & p
                  ? b(e, t, n, o, r, i, s, a, l)
                  : 6 & p
                    ? C(e, t, n, o, r, i, s, a, l)
                    : (64 & p || 128 & p) &&
                      c.process(e, t, n, o, r, i, s, a, l, W);
            }
            null != u && r
              ? kr(u, e && e.ref, i, t || e, !t)
              : null == u && e && null != e.ref && kr(e.ref, null, i, e, !0);
          },
          v = (e, t, n, r) => {
            if (null == e) o((t.el = a(t.children)), n, r);
            else {
              const n = (t.el = e.el);
              t.children !== e.children && c(n, t.children);
            }
          },
          g = (e, t, n, r) => {
            null == e ? o((t.el = l(t.children || "")), n, r) : (t.el = e.el);
          },
          y = (e, t, n, o) => {
            [e.el, e.anchor] = h(e.children, t, n, o, e.el, e.anchor);
          },
          b = (e, t, n, o, r, i, s, a, l) => {
            if (
              ("svg" === t.type
                ? (s = "svg")
                : "math" === t.type && (s = "mathml"),
              null == e)
            )
              w(t, n, o, r, i, s, a, l);
            else {
              const n = e.el && e.el._isVueCE ? e.el : null;
              try {
                (n && n._beginPatch(), O(e, t, r, i, s, a, l));
              } finally {
                n && n._endPatch();
              }
            }
          },
          w = (e, t, n, r, a, l, c, p) => {
            let d, f;
            const { props: h, shapeFlag: m, transition: v, dirs: g } = e;
            if (
              ((d = e.el = s(e.type, l, h && h.is, h)),
              8 & m
                ? u(d, e.children)
                : 16 & m && _(e.children, d, null, r, a, Wi(e, l), c, p),
              g && fr(e, null, r, "created"),
              x(d, e, e.scopeId, c, r),
              h)
            ) {
              for (const e in h)
                "value" === e || Dt(e) || i(d, e, null, h[e], l, r);
              ("value" in h && i(d, "value", null, h.value, l),
                (f = h.onVnodeBeforeMount) && xs(f, r, e));
            }
            (__VUE_PROD_DEVTOOLS__ &&
              (Wt(d, "__vnode", e, !0), Wt(d, "__vueParentComponent", r, !0)),
              g && fr(e, null, r, "beforeMount"));
            const y = (function (e, t) {
              return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
            })(a, v);
            (y && v.beforeEnter(d),
              o(d, t, n),
              ((f = h && h.onVnodeMounted) || y || g) &&
                Fi(() => {
                  (f && xs(f, r, e),
                    y && v.enter(d),
                    g && fr(e, null, r, "mounted"));
                }, a));
          },
          x = (e, t, n, o, r) => {
            if ((n && f(e, n), o))
              for (let t = 0; t < o.length; t++) f(e, o[t]);
            if (r) {
              let n = r.subTree;
              if (
                t === n ||
                (Gi(n.type) && (n.ssContent === t || n.ssFallback === t))
              ) {
                const t = r.vnode;
                x(e, t, t.scopeId, t.slotScopeIds, r.parent);
              }
            }
          },
          _ = (e, t, n, o, r, i, s, a, l = 0) => {
            for (let c = l; c < e.length; c++) {
              const l = (e[c] = a ? bs(e[c]) : ys(e[c]));
              m(null, l, t, n, o, r, i, s, a);
            }
          },
          O = (e, t, n, o, r, s, a) => {
            const l = (t.el = e.el);
            __VUE_PROD_DEVTOOLS__ && (l.__vnode = t);
            let { patchFlag: c, dynamicChildren: p, dirs: d } = t;
            c |= 16 & e.patchFlag;
            const f = e.props || pt,
              h = t.props || pt;
            let m;
            if (
              (n && qi(n, !1),
              (m = h.onVnodeBeforeUpdate) && xs(m, n, t, e),
              d && fr(t, e, n, "beforeUpdate"),
              n && qi(n, !0),
              ((f.innerHTML && null == h.innerHTML) ||
                (f.textContent && null == h.textContent)) &&
                u(l, ""),
              p
                ? S(e.dynamicChildren, p, l, n, o, Wi(t, r), s)
                : a || j(e, t, l, null, n, o, Wi(t, r), s, !1),
              c > 0)
            ) {
              if (16 & c) E(l, f, h, n, r);
              else if (
                (2 & c &&
                  f.class !== h.class &&
                  i(l, "class", null, h.class, r),
                4 & c && i(l, "style", f.style, h.style, r),
                8 & c)
              ) {
                const e = t.dynamicProps;
                for (let t = 0; t < e.length; t++) {
                  const o = e[t],
                    s = f[o],
                    a = h[o];
                  (a === s && "value" !== o) || i(l, o, s, a, r, n);
                }
              }
              1 & c && e.children !== t.children && u(l, t.children);
            } else a || null != p || E(l, f, h, n, r);
            ((m = h.onVnodeUpdated) || d) &&
              Fi(() => {
                (m && xs(m, n, t, e), d && fr(t, e, n, "updated"));
              }, o);
          },
          S = (e, t, n, o, r, i, s) => {
            for (let a = 0; a < t.length; a++) {
              const l = e[a],
                c = t[a],
                u =
                  l.el && (l.type === Xi || !us(l, c) || 198 & l.shapeFlag)
                    ? p(l.el)
                    : n;
              m(l, c, u, null, o, r, i, s, !0);
            }
          },
          E = (e, t, n, o, r) => {
            if (t !== n) {
              if (t !== pt)
                for (const s in t) Dt(s) || s in n || i(e, s, t[s], null, r, o);
              for (const s in n) {
                if (Dt(s)) continue;
                const a = n[s],
                  l = t[s];
                a !== l && "value" !== s && i(e, s, l, a, r, o);
              }
              "value" in n && i(e, "value", t.value, n.value, r);
            }
          },
          k = (e, t, n, r, i, s, l, c, u) => {
            const p = (t.el = e ? e.el : a("")),
              d = (t.anchor = e ? e.anchor : a(""));
            let { patchFlag: f, dynamicChildren: h, slotScopeIds: m } = t;
            (m && (c = c ? c.concat(m) : m),
              null == e
                ? (o(p, n, r),
                  o(d, n, r),
                  _(t.children || [], n, d, i, s, l, c, u))
                : f > 0 &&
                    64 & f &&
                    h &&
                    e.dynamicChildren &&
                    e.dynamicChildren.length === h.length
                  ? (S(e.dynamicChildren, h, n, i, s, l, c),
                    (null != t.key || (i && t === i.subTree)) && zi(e, t, !0))
                  : j(e, t, n, d, i, s, l, c, u));
          },
          C = (e, t, n, o, r, i, s, a, l) => {
            ((t.slotScopeIds = a),
              null == e
                ? 512 & t.shapeFlag
                  ? r.ctx.activate(t, n, o, s, l)
                  : T(t, n, o, r, i, s, l)
                : A(e, t, l));
          },
          T = (e, t, n, o, r, i, s) => {
            const a = (e.component = (function (e, t, n) {
              const o = e.type,
                r = (t ? t.appContext : e.appContext) || _s,
                i = {
                  uid: Os++,
                  vnode: e,
                  type: o,
                  parent: t,
                  appContext: r,
                  root: null,
                  next: null,
                  subTree: null,
                  effect: null,
                  update: null,
                  job: null,
                  scope: new pn(!0),
                  render: null,
                  proxy: null,
                  exposed: null,
                  exposeProxy: null,
                  withProxy: null,
                  provides: t ? t.provides : Object.create(r.provides),
                  ids: t ? t.ids : ["", 0, 0],
                  accessCache: null,
                  renderCache: [],
                  components: null,
                  directives: null,
                  propsOptions: Di(o, r),
                  emitsOptions: xi(o, r),
                  emit: null,
                  emitted: null,
                  propsDefaults: pt,
                  inheritAttrs: o.inheritAttrs,
                  ctx: pt,
                  data: pt,
                  props: pt,
                  attrs: pt,
                  slots: pt,
                  refs: pt,
                  setupState: pt,
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
                (i.root = t ? t.root : i),
                (i.emit = bi.bind(null, i)),
                e.ce && e.ce(i),
                i
              );
            })(e, o, r));
            if (
              (Ar(e) && (a.ctx.renderer = W),
              (function (e, t = !1, n = !1) {
                t && Cs(t);
                const { props: o, children: r } = e.vnode,
                  i = Ls(e);
                ((function (e, t, n, o = !1) {
                  const r = {},
                    i = Ai();
                  ((e.propsDefaults = Object.create(null)), Pi(e, t, r, i));
                  for (const t in e.propsOptions[0]) t in r || (r[t] = void 0);
                  (n
                    ? (e.props = o ? r : wo(r, !1, io, po, mo))
                    : e.type.props
                      ? (e.props = r)
                      : (e.props = i),
                    (e.attrs = i));
                })(e, o, i, t),
                  ((e, t, n) => {
                    const o = (e.slots = Ai());
                    if (32 & e.vnode.shapeFlag) {
                      const e = t._;
                      e ? (Bi(o, t, n), n && Wt(o, "_", e, !0)) : Hi(t, o);
                    } else t && Ui(e, t);
                  })(e, r, n || t));
                const s = i
                  ? (function (e, t) {
                      const n = e.type;
                      ((e.accessCache = Object.create(null)),
                        (e.proxy = new Proxy(e.ctx, ni)));
                      const { setup: o } = n;
                      if (o) {
                        Tn();
                        const n = (e.setupContext =
                            o.length > 1
                              ? (function (e) {
                                  const t = (t) => {
                                    e.exposed = t || {};
                                  };
                                  return {
                                    attrs: new Proxy(e.attrs, Vs),
                                    slots: e.slots,
                                    emit: e.emit,
                                    expose: t,
                                  };
                                })(e)
                              : null),
                          r = Ts(e),
                          i = Vo(o, e, 0, [e.props, n]),
                          s = At(i);
                        if ((An(), r(), (!s && !e.sp) || Tr(e) || Or(e), s)) {
                          if ((i.then(As, As), t))
                            return i
                              .then((n) => {
                                Ds(e, n, t);
                              })
                              .catch((t) => {
                                Mo(t, e, 0);
                              });
                          e.asyncDep = i;
                        } else Ds(e, i, t);
                      } else Rs(e, t);
                    })(e, t)
                  : void 0;
                t && Cs(!1);
              })(a, !1, s),
              a.asyncDep)
            ) {
              if ((r && r.registerDep(a, L, s), !e.el)) {
                const o = (a.subTree = hs(Zi));
                (g(null, o, t, n), (e.placeholder = o.el));
              }
            } else L(a, e, t, n, r, i, s);
          },
          A = (e, t, n) => {
            const o = (t.component = e.component);
            if (
              (function (e, t, n) {
                const { props: o, children: r, component: i } = e,
                  { props: s, children: a, patchFlag: l } = t,
                  c = i.emitsOptions;
                if (t.dirs || t.transition) return !0;
                if (!(n && l >= 0))
                  return (
                    !((!r && !a) || (a && a.$stable)) ||
                    (o !== s && (o ? !s || ki(o, s, c) : !!s))
                  );
                if (1024 & l) return !0;
                if (16 & l) return o ? ki(o, s, c) : !!s;
                if (8 & l) {
                  const e = t.dynamicProps;
                  for (let t = 0; t < e.length; t++) {
                    const n = e[t];
                    if (Ci(s, o, n) && !_i(c, n)) return !0;
                  }
                }
                return !1;
              })(e, t, n)
            ) {
              if (o.asyncDep && !o.asyncResolved) return void P(o, t, n);
              ((o.next = t), o.update());
            } else ((t.el = e.el), (o.vnode = t));
          },
          L = (e, t, n, o, r, i, s) => {
            e.scope.on();
            const a = (e.effect = new fn(() => {
              if (e.isMounted) {
                let { next: t, bu: n, u: o, parent: a, vnode: c } = e;
                {
                  const n = Ki(e);
                  if (n)
                    return (
                      t && ((t.el = c.el), P(e, t, s)),
                      void n.asyncDep.then(() => {
                        Fi(() => {
                          e.isUnmounted || l();
                        }, r);
                      })
                    );
                }
                let u,
                  d = t;
                (qi(e, !1),
                  t ? ((t.el = c.el), P(e, t, s)) : (t = c),
                  n && $t(n),
                  (u = t.props && t.props.onVnodeBeforeUpdate) &&
                    xs(u, a, t, c),
                  qi(e, !0));
                const f = Oi(e),
                  h = e.subTree;
                ((e.subTree = f),
                  m(h, f, p(h.el), B(h), e, r, i),
                  (t.el = f.el),
                  null === d &&
                    (function ({ vnode: e, parent: t }, n) {
                      for (; t;) {
                        const o = t.subTree;
                        if (
                          (o.suspense &&
                            o.suspense.activeBranch === e &&
                            (o.el = e.el),
                          o !== e)
                        )
                          break;
                        (((e = t.vnode).el = n), (t = t.parent));
                      }
                    })(e, f.el),
                  o && Fi(o, r),
                  (u = t.props && t.props.onVnodeUpdated) &&
                    Fi(() => xs(u, a, t, c), r),
                  __VUE_PROD_DEVTOOLS__ && ir(e));
              } else {
                let s;
                const { el: a, props: l } = t,
                  { bm: c, m: u, parent: p, root: d, type: f } = e,
                  h = Tr(t);
                if (
                  (qi(e, !1),
                  c && $t(c),
                  !h && (s = l && l.onVnodeBeforeMount) && xs(s, p, t),
                  qi(e, !0),
                  a && z)
                ) {
                  const t = () => {
                    ((e.subTree = Oi(e)), z(a, e.subTree, e, r, null));
                  };
                  h && f.__asyncHydrate ? f.__asyncHydrate(a, e, t) : t();
                } else {
                  d.ce &&
                    d.ce._hasShadowRoot() &&
                    d.ce._injectChildStyle(
                      f,
                      e.parent ? e.parent.type : void 0,
                    );
                  const s = (e.subTree = Oi(e));
                  (m(null, s, n, o, e, r, i), (t.el = s.el));
                }
                if ((u && Fi(u, r), !h && (s = l && l.onVnodeMounted))) {
                  const e = t;
                  Fi(() => xs(s, p, e), r);
                }
                ((256 & t.shapeFlag ||
                  (p && Tr(p.vnode) && 256 & p.vnode.shapeFlag)) &&
                  e.a &&
                  Fi(e.a, r),
                  (e.isMounted = !0),
                  __VUE_PROD_DEVTOOLS__ && rr(e),
                  (t = n = o = null));
              }
            }));
            e.scope.off();
            const l = (e.update = a.run.bind(a)),
              c = (e.job = a.runIfDirty.bind(a));
            ((c.i = e),
              (c.id = e.uid),
              (a.scheduler = () => Ko(c)),
              qi(e, !0),
              l());
          },
          P = (e, t, n) => {
            t.component = e;
            const o = e.vnode.props;
            ((e.vnode = t),
              (e.next = null),
              (function (e, t, n, o) {
                const {
                    props: r,
                    attrs: i,
                    vnode: { patchFlag: s },
                  } = e,
                  a = Eo(r),
                  [l] = e.propsOptions;
                let c = !1;
                if (!(o || s > 0) || 16 & s) {
                  let o;
                  Pi(e, t, r, i) && (c = !0);
                  for (const i in a)
                    (t && (wt(t, i) || ((o = Ht(i)) !== i && wt(t, o)))) ||
                      (l
                        ? !n ||
                          (void 0 === n[i] && void 0 === n[o]) ||
                          (r[i] = ji(l, a, i, void 0, e, !0))
                        : delete r[i]);
                  if (i !== a)
                    for (const e in i)
                      (t && wt(t, e)) || (delete i[e], (c = !0));
                } else if (8 & s) {
                  const n = e.vnode.dynamicProps;
                  for (let o = 0; o < n.length; o++) {
                    let s = n[o];
                    if (_i(e.emitsOptions, s)) continue;
                    const u = t[s];
                    if (l)
                      if (wt(i, s)) u !== i[s] && ((i[s] = u), (c = !0));
                      else {
                        const t = Nt(s);
                        r[t] = ji(l, a, t, u, e, !1);
                      }
                    else u !== i[s] && ((i[s] = u), (c = !0));
                  }
                }
                c && Un(e.attrs, "set", "");
              })(e, t.props, o, n),
              ((e, t, n) => {
                const { vnode: o, slots: r } = e;
                let i = !0,
                  s = pt;
                if (32 & o.shapeFlag) {
                  const e = t._;
                  (e
                    ? n && 1 === e
                      ? (i = !1)
                      : Bi(r, t, n)
                    : ((i = !t.$stable), Hi(t, r)),
                    (s = t));
                } else t && (Ui(e, t), (s = { default: 1 }));
                if (i) for (const e in r) Vi(e) || null != s[e] || delete r[e];
              })(e, t.children, n),
              Tn(),
              Jo(e),
              An());
          },
          j = (e, t, n, o, r, i, s, a, l = !1) => {
            const c = e && e.children,
              p = e ? e.shapeFlag : 0,
              d = t.children,
              { patchFlag: f, shapeFlag: h } = t;
            if (f > 0) {
              if (128 & f) return void D(c, d, n, o, r, i, s, a, l);
              if (256 & f) return void I(c, d, n, o, r, i, s, a, l);
            }
            8 & h
              ? (16 & p && U(c, r, i), d !== c && u(n, d))
              : 16 & p
                ? 16 & h
                  ? D(c, d, n, o, r, i, s, a, l)
                  : U(c, r, i, !0)
                : (8 & p && u(n, ""), 16 & h && _(d, n, o, r, i, s, a, l));
          },
          I = (e, t, n, o, r, i, s, a, l) => {
            t = t || dt;
            const c = (e = e || dt).length,
              u = t.length,
              p = Math.min(c, u);
            let d;
            for (d = 0; d < p; d++) {
              const o = (t[d] = l ? bs(t[d]) : ys(t[d]));
              m(e[d], o, n, null, r, i, s, a, l);
            }
            c > u ? U(e, r, i, !0, !1, p) : _(t, n, o, r, i, s, a, l, p);
          },
          D = (e, t, n, o, r, i, s, a, l) => {
            let c = 0;
            const u = t.length;
            let p = e.length - 1,
              d = u - 1;
            for (; c <= p && c <= d;) {
              const o = e[c],
                u = (t[c] = l ? bs(t[c]) : ys(t[c]));
              if (!us(o, u)) break;
              (m(o, u, n, null, r, i, s, a, l), c++);
            }
            for (; c <= p && c <= d;) {
              const o = e[p],
                c = (t[d] = l ? bs(t[d]) : ys(t[d]));
              if (!us(o, c)) break;
              (m(o, c, n, null, r, i, s, a, l), p--, d--);
            }
            if (c > p) {
              if (c <= d) {
                const e = d + 1,
                  p = e < u ? t[e].el : o;
                for (; c <= d;)
                  (m(
                    null,
                    (t[c] = l ? bs(t[c]) : ys(t[c])),
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
            } else if (c > d) for (; c <= p;) (V(e[c], r, i, !0), c++);
            else {
              const f = c,
                h = c,
                v = new Map();
              for (c = h; c <= d; c++) {
                const e = (t[c] = l ? bs(t[c]) : ys(t[c]));
                null != e.key && v.set(e.key, c);
              }
              let g,
                y = 0;
              const b = d - h + 1;
              let w = !1,
                x = 0;
              const _ = new Array(b);
              for (c = 0; c < b; c++) _[c] = 0;
              for (c = f; c <= p; c++) {
                const o = e[c];
                if (y >= b) {
                  V(o, r, i, !0);
                  continue;
                }
                let u;
                if (null != o.key) u = v.get(o.key);
                else
                  for (g = h; g <= d; g++)
                    if (0 === _[g - h] && us(o, t[g])) {
                      u = g;
                      break;
                    }
                void 0 === u
                  ? V(o, r, i, !0)
                  : ((_[u - h] = c + 1),
                    u >= x ? (x = u) : (w = !0),
                    m(o, t[u], n, null, r, i, s, a, l),
                    y++);
              }
              const O = w
                ? (function (e) {
                    const t = e.slice(),
                      n = [0];
                    let o, r, i, s, a;
                    const l = e.length;
                    for (o = 0; o < l; o++) {
                      const l = e[o];
                      if (0 !== l) {
                        if (((r = n[n.length - 1]), e[r] < l)) {
                          ((t[o] = r), n.push(o));
                          continue;
                        }
                        for (i = 0, s = n.length - 1; i < s;)
                          ((a = (i + s) >> 1),
                            e[n[a]] < l ? (i = a + 1) : (s = a));
                        l < e[n[i]] && (i > 0 && (t[o] = n[i - 1]), (n[i] = o));
                      }
                    }
                    for (i = n.length, s = n[i - 1]; i-- > 0;)
                      ((n[i] = s), (s = t[s]));
                    return n;
                  })(_)
                : dt;
              for (g = O.length - 1, c = b - 1; c >= 0; c--) {
                const e = h + c,
                  p = t[e],
                  d = t[e + 1],
                  f = e + 1 < u ? d.el || Ji(d) : o;
                0 === _[c]
                  ? m(null, p, n, f, r, i, s, a, l)
                  : w && (g < 0 || c !== O[g] ? R(p, n, f, 2) : g--);
              }
            }
          },
          R = (e, t, n, i, s = null) => {
            const {
              el: a,
              type: l,
              transition: c,
              children: u,
              shapeFlag: p,
            } = e;
            if (6 & p) R(e.component.subTree, t, n, i);
            else if (128 & p) e.suspense.move(t, n, i);
            else if (64 & p) l.move(e, t, n, W);
            else if (l !== Xi)
              if (l !== es)
                if (2 !== i && 1 & p && c)
                  if (0 === i)
                    (c.beforeEnter(a), o(a, t, n), Fi(() => c.enter(a), s));
                  else {
                    const { leave: i, delayLeave: s, afterLeave: l } = c,
                      u = () => {
                        e.ctx.isUnmounted ? r(a) : o(a, t, n);
                      },
                      p = () => {
                        (a._isLeaving && a[xr](!0),
                          i(a, () => {
                            (u(), l && l());
                          }));
                      };
                    s ? s(a, u, p) : p();
                  }
                else o(a, t, n);
              else
                (({ el: e, anchor: t }, n, r) => {
                  let i;
                  for (; e && e !== t;) ((i = d(e)), o(e, n, r), (e = i));
                  o(t, n, r);
                })(e, t, n);
            else {
              o(a, t, n);
              for (let e = 0; e < u.length; e++) R(u[e], t, n, i);
              o(e.anchor, t, n);
            }
          },
          V = (e, t, n, o = !1, r = !1) => {
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
            } = e;
            if (
              (-2 === p && (r = !1),
              null != a && (Tn(), kr(a, null, n, e, !0), An()),
              null != f && (t.renderCache[f] = void 0),
              256 & u)
            )
              return void t.ctx.deactivate(e);
            const h = 1 & u && d,
              m = !Tr(e);
            let v;
            if ((m && (v = s && s.onVnodeBeforeUnmount) && xs(v, t, e), 6 & u))
              H(e.component, n, o);
            else {
              if (128 & u) return void e.suspense.unmount(n, o);
              (h && fr(e, null, t, "beforeUnmount"),
                64 & u
                  ? e.type.remove(e, t, n, W, o)
                  : c && !c.hasOnce && (i !== Xi || (p > 0 && 64 & p))
                    ? U(c, t, n, !1, !0)
                    : ((i === Xi && 384 & p) || (!r && 16 & u)) && U(l, t, n),
                o && N(e));
            }
            ((m && (v = s && s.onVnodeUnmounted)) || h) &&
              Fi(() => {
                (v && xs(v, t, e), h && fr(e, null, t, "unmounted"));
              }, n);
          },
          N = (e) => {
            const { type: t, el: n, anchor: o, transition: i } = e;
            if (t === Xi) return void M(n, o);
            if (t === es)
              return void (({ el: e, anchor: t }) => {
                let n;
                for (; e && e !== t;) ((n = d(e)), r(e), (e = n));
                r(t);
              })(e);
            const s = () => {
              (r(n), i && !i.persisted && i.afterLeave && i.afterLeave());
            };
            if (1 & e.shapeFlag && i && !i.persisted) {
              const { leave: t, delayLeave: o } = i,
                r = () => t(n, s);
              o ? o(e.el, s, r) : r();
            } else s();
          },
          M = (e, t) => {
            let n;
            for (; e !== t;) ((n = d(e)), r(e), (e = n));
            r(t);
          },
          H = (e, t, n) => {
            const {
              bum: o,
              scope: r,
              job: i,
              subTree: s,
              um: a,
              m: l,
              a: c,
            } = e;
            var u;
            (Yi(l),
              Yi(c),
              o && $t(o),
              r.stop(),
              i && ((i.flags |= 8), V(s, e, t, n)),
              a && Fi(a, t),
              Fi(() => {
                e.isUnmounted = !0;
              }, t),
              __VUE_PROD_DEVTOOLS__ &&
                ((u = e),
                Zo &&
                  "function" == typeof Zo.cleanupBuffer &&
                  !Zo.cleanupBuffer(u) &&
                  sr(u)));
          },
          U = (e, t, n, o = !1, r = !1, i = 0) => {
            for (let s = i; s < e.length; s++) V(e[s], t, n, o, r);
          },
          B = (e) => {
            if (6 & e.shapeFlag) return B(e.component.subTree);
            if (128 & e.shapeFlag) return e.suspense.next();
            const t = d(e.anchor || e.el),
              n = t && t[wr];
            return n ? d(n) : t;
          };
        let F = !1;
        const $ = (e, t, n) => {
            let o;
            (null == e
              ? t._vnode &&
                (V(t._vnode, null, null, !0), (o = t._vnode.component))
              : m(t._vnode || null, e, t, null, null, null, n),
              (t._vnode = e),
              F || ((F = !0), Jo(o), Go(), (F = !1)));
          },
          W = {
            p: m,
            um: V,
            m: R,
            r: N,
            mt: T,
            mc: _,
            pc: j,
            pbc: S,
            n: B,
            o: e,
          };
        let q, z;
        return (
          t && ([q, z] = t(W)),
          { render: $, hydrate: q, createApp: gi($, q) }
        );
      }
      function Wi({ type: e, props: t }, n) {
        return ("svg" === n && "foreignObject" === e) ||
          ("mathml" === n &&
            "annotation-xml" === e &&
            t &&
            t.encoding &&
            t.encoding.includes("html"))
          ? void 0
          : n;
      }
      function qi({ effect: e, job: t }, n) {
        n
          ? ((e.flags |= 32), (t.flags |= 4))
          : ((e.flags &= -33), (t.flags &= -5));
      }
      function zi(e, t, n = !1) {
        const o = e.children,
          r = t.children;
        if (xt(o) && xt(r))
          for (let e = 0; e < o.length; e++) {
            const t = o[e];
            let i = r[e];
            (1 & i.shapeFlag &&
              !i.dynamicChildren &&
              ((i.patchFlag <= 0 || 32 === i.patchFlag) &&
                ((i = r[e] = bs(r[e])), (i.el = t.el)),
              n || -2 === i.patchFlag || zi(t, i)),
              i.type === Qi &&
                (-1 === i.patchFlag && (i = r[e] = bs(i)), (i.el = t.el)),
              i.type !== Zi || i.el || (i.el = t.el));
          }
      }
      function Ki(e) {
        const t = e.subTree.component;
        if (t) return t.asyncDep && !t.asyncResolved ? t : Ki(t);
      }
      function Yi(e) {
        if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
      }
      function Ji(e) {
        if (e.placeholder) return e.placeholder;
        const t = e.component;
        return t ? Ji(t.subTree) : null;
      }
      const Gi = (e) => e.__isSuspense;
      const Xi = Symbol.for("v-fgt"),
        Qi = Symbol.for("v-txt"),
        Zi = Symbol.for("v-cmt"),
        es = Symbol.for("v-stc"),
        ts = [];
      let ns = null;
      function os(e = !1) {
        ts.push((ns = e ? null : []));
      }
      let rs = 1;
      function is(e, t = !1) {
        ((rs += e), e < 0 && ns && t && (ns.hasOnce = !0));
      }
      function ss(e) {
        return (
          (e.dynamicChildren = rs > 0 ? ns || dt : null),
          ts.pop(),
          (ns = ts[ts.length - 1] || null),
          rs > 0 && ns && ns.push(e),
          e
        );
      }
      function as(e, t, n, o, r, i) {
        return ss(fs(e, t, n, o, r, i, !0));
      }
      function ls(e, t, n, o, r) {
        return ss(hs(e, t, n, o, r, !0));
      }
      function cs(e) {
        return !!e && !0 === e.__v_isVNode;
      }
      function us(e, t) {
        return e.type === t.type && e.key === t.key;
      }
      const ps = ({ key: e }) => (null != e ? e : null),
        ds = ({ ref: e, ref_key: t, ref_for: n }) => (
          "number" == typeof e && (e = "" + e),
          null != e
            ? kt(e) || To(e) || Et(e)
              ? { i: lr, r: e, k: t, f: !!n }
              : e
            : null
        );
      function fs(
        e,
        t = null,
        n = null,
        o = 0,
        r = null,
        i = e === Xi ? 0 : 1,
        s = !1,
        a = !1,
      ) {
        const l = {
          __v_isVNode: !0,
          __v_skip: !0,
          type: e,
          props: t,
          key: t && ps(t),
          ref: t && ds(t),
          scopeId: cr,
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
          ctx: lr,
        };
        return (
          a
            ? (ws(l, n), 128 & i && e.normalize(l))
            : n && (l.shapeFlag |= kt(n) ? 8 : 16),
          rs > 0 &&
            !s &&
            ns &&
            (l.patchFlag > 0 || 6 & i) &&
            32 !== l.patchFlag &&
            ns.push(l),
          l
        );
      }
      const hs = function (e, t = null, n = null, o = 0, r = null, i = !1) {
        if (((e && e !== Yr) || (e = Zi), cs(e))) {
          const o = ms(e, t, !0);
          return (
            n && ws(o, n),
            rs > 0 &&
              !i &&
              ns &&
              (6 & o.shapeFlag ? (ns[ns.indexOf(e)] = o) : ns.push(o)),
            (o.patchFlag = -2),
            o
          );
        }
        if (((s = e), Et(s) && "__vccOpts" in s && (e = e.__vccOpts), t)) {
          t = (function (e) {
            return e ? (So(e) || Li(e) ? gt({}, e) : e) : null;
          })(t);
          let { class: e, style: n } = t;
          (e && !kt(e) && (t.class = Zt(e)),
            Tt(n) && (So(n) && !xt(n) && (n = gt({}, n)), (t.style = Yt(n))));
        }
        var s;
        return fs(
          e,
          t,
          n,
          o,
          r,
          kt(e)
            ? 1
            : Gi(e)
              ? 128
              : ((e) => e.__isTeleport)(e)
                ? 64
                : Tt(e)
                  ? 4
                  : Et(e)
                    ? 2
                    : 0,
          i,
          !0,
        );
      };
      function ms(e, t, n = !1, o = !1) {
        const {
            props: r,
            ref: i,
            patchFlag: s,
            children: a,
            transition: l,
          } = e,
          c = t
            ? (function (...e) {
                const t = {};
                for (let n = 0; n < e.length; n++) {
                  const o = e[n];
                  for (const e in o)
                    if ("class" === e)
                      t.class !== o.class && (t.class = Zt([t.class, o.class]));
                    else if ("style" === e) t.style = Yt([t.style, o.style]);
                    else if (mt(e)) {
                      const n = t[e],
                        r = o[e];
                      !r ||
                        n === r ||
                        (xt(n) && n.includes(r)) ||
                        (t[e] = n ? [].concat(n, r) : r);
                    } else "" !== e && (t[e] = o[e]);
                }
                return t;
              })(r || {}, t)
            : r,
          u = {
            __v_isVNode: !0,
            __v_skip: !0,
            type: e.type,
            props: c,
            key: c && ps(c),
            ref:
              t && t.ref
                ? n && i
                  ? xt(i)
                    ? i.concat(ds(t))
                    : [i, ds(t)]
                  : ds(t)
                : i,
            scopeId: e.scopeId,
            slotScopeIds: e.slotScopeIds,
            children: a,
            target: e.target,
            targetStart: e.targetStart,
            targetAnchor: e.targetAnchor,
            staticCount: e.staticCount,
            shapeFlag: e.shapeFlag,
            patchFlag: t && e.type !== Xi ? (-1 === s ? 16 : 16 | s) : s,
            dynamicProps: e.dynamicProps,
            dynamicChildren: e.dynamicChildren,
            appContext: e.appContext,
            dirs: e.dirs,
            transition: l,
            component: e.component,
            suspense: e.suspense,
            ssContent: e.ssContent && ms(e.ssContent),
            ssFallback: e.ssFallback && ms(e.ssFallback),
            placeholder: e.placeholder,
            el: e.el,
            anchor: e.anchor,
            ctx: e.ctx,
            ce: e.ce,
          };
        return (l && o && _r(u, l.clone(u)), u);
      }
      function vs(e = " ", t = 0) {
        return hs(Qi, null, e, t);
      }
      function gs(e = "", t = !1) {
        return t ? (os(), ls(Zi, null, e)) : hs(Zi, null, e);
      }
      function ys(e) {
        return null == e || "boolean" == typeof e
          ? hs(Zi)
          : xt(e)
            ? hs(Xi, null, e.slice())
            : cs(e)
              ? bs(e)
              : hs(Qi, null, String(e));
      }
      function bs(e) {
        return (null === e.el && -1 !== e.patchFlag) || e.memo ? e : ms(e);
      }
      function ws(e, t) {
        let n = 0;
        const { shapeFlag: o } = e;
        if (null == t) t = null;
        else if (xt(t)) n = 16;
        else if ("object" == typeof t) {
          if (65 & o) {
            const n = t.default;
            return void (
              n && (n._c && (n._d = !1), ws(e, n()), n._c && (n._d = !0))
            );
          }
          {
            n = 32;
            const o = t._;
            o || Li(t)
              ? 3 === o &&
                lr &&
                (1 === lr.slots._
                  ? (t._ = 1)
                  : ((t._ = 2), (e.patchFlag |= 1024)))
              : (t._ctx = lr);
          }
        } else
          Et(t)
            ? ((t = { default: t, _ctx: lr }), (n = 32))
            : ((t = String(t)), 64 & o ? ((n = 16), (t = [vs(t)])) : (n = 8));
        ((e.children = t), (e.shapeFlag |= n));
      }
      function xs(e, t, n, o = null) {
        No(e, t, 7, [n, o]);
      }
      const _s = mi();
      let Os = 0;
      let Ss = null;
      const Es = () => Ss || lr;
      let ks, Cs;
      {
        const e = Kt(),
          t = (t, n) => {
            let o;
            return (
              (o = e[t]) || (o = e[t] = []),
              o.push(n),
              (e) => {
                o.length > 1 ? o.forEach((t) => t(e)) : o[0](e);
              }
            );
          };
        ((ks = t("__VUE_INSTANCE_SETTERS__", (e) => (Ss = e))),
          (Cs = t("__VUE_SSR_SETTERS__", (e) => (Is = e))));
      }
      const Ts = (e) => {
          const t = Ss;
          return (
            ks(e),
            e.scope.on(),
            () => {
              (e.scope.off(), ks(t));
            }
          );
        },
        As = () => {
          (Ss && Ss.scope.off(), ks(null));
        };
      function Ls(e) {
        return 4 & e.vnode.shapeFlag;
      }
      let Ps,
        js,
        Is = !1;
      function Ds(e, t, n) {
        (Et(t)
          ? e.type.__ssrInlineRender
            ? (e.ssrRender = t)
            : (e.render = t)
          : Tt(t) &&
            (__VUE_PROD_DEVTOOLS__ && (e.devtoolsRawSetupState = t),
            (e.setupState = Lo(t))),
          Rs(e, n));
      }
      function Rs(e, t, n) {
        const o = e.type;
        if (!e.render) {
          if (!t && Ps && !o.render) {
            const t = o.template || (__VUE_OPTIONS_API__ && ai(e).template);
            if (t) {
              const { isCustomElement: n, compilerOptions: r } =
                  e.appContext.config,
                { delimiters: i, compilerOptions: s } = o,
                a = gt(gt({ isCustomElement: n, delimiters: i }, r), s);
              o.render = Ps(t, a);
            }
          }
          ((e.render = o.render || ft), js && js(e));
        }
        if (__VUE_OPTIONS_API__) {
          const t = Ts(e);
          Tn();
          try {
            !(function (e) {
              const t = ai(e),
                n = e.proxy,
                o = e.ctx;
              ((ri = !1), t.beforeCreate && ii(t.beforeCreate, e, "bc"));
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
                activated: m,
                deactivated: v,
                beforeDestroy: g,
                beforeUnmount: y,
                destroyed: b,
                unmounted: w,
                render: x,
                renderTracked: _,
                renderTriggered: O,
                errorCaptured: S,
                serverPrefetch: E,
                expose: k,
                inheritAttrs: C,
                components: T,
                directives: A,
                filters: L,
              } = t;
              if (
                (c &&
                  (function (e, t) {
                    xt(e) && (e = pi(e));
                    for (const n in e) {
                      const o = e[n];
                      let r;
                      ((r = Tt(o)
                        ? "default" in o
                          ? hr(o.from || n, o.default, !0)
                          : hr(o.from || n)
                        : hr(o)),
                        To(r)
                          ? Object.defineProperty(t, n, {
                              enumerable: !0,
                              configurable: !0,
                              get: () => r.value,
                              set: (e) => (r.value = e),
                            })
                          : (t[n] = r));
                    }
                  })(c, o),
                s)
              )
                for (const e in s) {
                  const t = s[e];
                  Et(t) && (o[e] = t.bind(n));
                }
              if (r) {
                const t = r.call(n, n);
                Tt(t) && (e.data = yo(t));
              }
              if (((ri = !0), i))
                for (const e in i) {
                  const t = i[e],
                    r = Et(t)
                      ? t.bind(n, n)
                      : Et(t.get)
                        ? t.get.bind(n, n)
                        : ft,
                    s = !Et(t) && Et(t.set) ? t.set.bind(n) : ft,
                    a = Ms({ get: r, set: s });
                  Object.defineProperty(o, e, {
                    enumerable: !0,
                    configurable: !0,
                    get: () => a.value,
                    set: (e) => (a.value = e),
                  });
                }
              if (a) for (const e in a) si(a[e], o, n, e);
              if (l) {
                const e = Et(l) ? l.call(n) : l;
                Reflect.ownKeys(e).forEach((t) => {
                  !(function (e, t) {
                    if (Ss) {
                      let n = Ss.provides;
                      const o = Ss.parent && Ss.parent.provides;
                      (o === n && (n = Ss.provides = Object.create(o)),
                        (n[e] = t));
                    }
                  })(t, e[t]);
                });
              }
              function P(e, t) {
                xt(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
              }
              if (
                (u && ii(u, e, "c"),
                P(Vr, p),
                P(Nr, d),
                P(Mr, f),
                P(Hr, h),
                P(Lr, m),
                P(Pr, v),
                P(qr, S),
                P(Wr, _),
                P($r, O),
                P(Ur, y),
                P(Br, w),
                P(Fr, E),
                xt(k))
              )
                if (k.length) {
                  const t = e.exposed || (e.exposed = {});
                  k.forEach((e) => {
                    Object.defineProperty(t, e, {
                      get: () => n[e],
                      set: (t) => (n[e] = t),
                      enumerable: !0,
                    });
                  });
                } else e.exposed || (e.exposed = {});
              (x && e.render === ft && (e.render = x),
                null != C && (e.inheritAttrs = C),
                T && (e.components = T),
                A && (e.directives = A),
                E && Or(e));
            })(e);
          } finally {
            (An(), t());
          }
        }
      }
      const Vs = { get: (e, t) => (Hn(e, 0, ""), e[t]) };
      function Ns(e) {
        return e.exposed
          ? e.exposeProxy ||
              (e.exposeProxy = new Proxy(
                Lo(
                  ((t = e.exposed),
                  !wt(t, "__v_skip") &&
                    Object.isExtensible(t) &&
                    Wt(t, "__v_skip", !0),
                  t),
                ),
                {
                  get: (t, n) => (n in t ? t[n] : n in ei ? ei[n](e) : void 0),
                  has: (e, t) => t in e || t in ei,
                },
              ))
          : e.proxy;
        var t;
      }
      const Ms = (e, t) => {
          const n = (function (e, t, n = !1) {
            let o, r;
            return (
              Et(e) ? (o = e) : ((o = e.get), (r = e.set)),
              new Po(o, r, n)
            );
          })(e, 0, Is);
          return n;
        },
        Hs = "3.5.30";
      let Us;
      const Bs = "undefined" != typeof window && window.trustedTypes;
      if (Bs)
        try {
          Us = Bs.createPolicy("vue", { createHTML: (e) => e });
        } catch (e) {}
      const Fs = Us ? (e) => Us.createHTML(e) : (e) => e,
        $s = "undefined" != typeof document ? document : null,
        Ws = $s && $s.createElement("template"),
        qs = {
          insert: (e, t, n) => {
            t.insertBefore(e, n || null);
          },
          remove: (e) => {
            const t = e.parentNode;
            t && t.removeChild(e);
          },
          createElement: (e, t, n, o) => {
            const r =
              "svg" === t
                ? $s.createElementNS("http://www.w3.org/2000/svg", e)
                : "mathml" === t
                  ? $s.createElementNS("http://www.w3.org/1998/Math/MathML", e)
                  : n
                    ? $s.createElement(e, { is: n })
                    : $s.createElement(e);
            return (
              "select" === e &&
                o &&
                null != o.multiple &&
                r.setAttribute("multiple", o.multiple),
              r
            );
          },
          createText: (e) => $s.createTextNode(e),
          createComment: (e) => $s.createComment(e),
          setText: (e, t) => {
            e.nodeValue = t;
          },
          setElementText: (e, t) => {
            e.textContent = t;
          },
          parentNode: (e) => e.parentNode,
          nextSibling: (e) => e.nextSibling,
          querySelector: (e) => $s.querySelector(e),
          setScopeId(e, t) {
            e.setAttribute(t, "");
          },
          insertStaticContent(e, t, n, o, r, i) {
            const s = n ? n.previousSibling : t.lastChild;
            if (r && (r === i || r.nextSibling))
              for (
                ;
                t.insertBefore(r.cloneNode(!0), n),
                  r !== i && (r = r.nextSibling);
              );
            else {
              Ws.innerHTML = Fs(
                "svg" === o
                  ? `<svg>${e}</svg>`
                  : "mathml" === o
                    ? `<math>${e}</math>`
                    : e,
              );
              const r = Ws.content;
              if ("svg" === o || "mathml" === o) {
                const e = r.firstChild;
                for (; e.firstChild;) r.appendChild(e.firstChild);
                r.removeChild(e);
              }
              t.insertBefore(r, n);
            }
            return [
              s ? s.nextSibling : t.firstChild,
              n ? n.previousSibling : t.lastChild,
            ];
          },
        },
        zs = Symbol("_vtc");
      Boolean;
      const Ks = Symbol("_vod"),
        Ys = Symbol("_vsh"),
        Js = Symbol(""),
        Gs = /(?:^|;)\s*display\s*:/,
        Xs = /\s*!important$/;
      function Qs(e, t, n) {
        if (xt(n)) n.forEach((n) => Qs(e, t, n));
        else if ((null == n && (n = ""), t.startsWith("--")))
          e.setProperty(t, n);
        else {
          const o = (function (e, t) {
            const n = ea[t];
            if (n) return n;
            let o = Nt(t);
            if ("filter" !== o && o in e) return (ea[t] = o);
            o = Ut(o);
            for (let n = 0; n < Zs.length; n++) {
              const r = Zs[n] + o;
              if (r in e) return (ea[t] = r);
            }
            return t;
          })(e, t);
          Xs.test(n)
            ? e.setProperty(Ht(o), n.replace(Xs, ""), "important")
            : (e[o] = n);
        }
      }
      const Zs = ["Webkit", "Moz", "ms"],
        ea = {},
        ta = "http://www.w3.org/1999/xlink";
      function na(e, t, n, o, r, i = en(t)) {
        o && t.startsWith("xlink:")
          ? null == n
            ? e.removeAttributeNS(ta, t.slice(6, t.length))
            : e.setAttributeNS(ta, t, n)
          : null == n || (i && !tn(n))
            ? e.removeAttribute(t)
            : e.setAttribute(t, i ? "" : Ct(n) ? String(n) : n);
      }
      function oa(e, t, n, o, r) {
        if ("innerHTML" === t || "textContent" === t)
          return void (null != n && (e[t] = "innerHTML" === t ? Fs(n) : n));
        const i = e.tagName;
        if ("value" === t && "PROGRESS" !== i && !i.includes("-")) {
          const o = "OPTION" === i ? e.getAttribute("value") || "" : e.value,
            r = null == n ? ("checkbox" === e.type ? "on" : "") : String(n);
          return (
            (o === r && "_value" in e) || (e.value = r),
            null == n && e.removeAttribute(t),
            void (e._value = n)
          );
        }
        let s = !1;
        if ("" === n || null == n) {
          const o = typeof e[t];
          "boolean" === o
            ? (n = tn(n))
            : null == n && "string" === o
              ? ((n = ""), (s = !0))
              : "number" === o && ((n = 0), (s = !0));
        }
        try {
          e[t] = n;
        } catch (e) {}
        s && e.removeAttribute(r || t);
      }
      function ra(e, t, n, o) {
        e.addEventListener(t, n, o);
      }
      const ia = Symbol("_vei");
      const sa = /(?:Once|Passive|Capture)$/;
      let aa = 0;
      const la = Promise.resolve(),
        ca = () => aa || (la.then(() => (aa = 0)), (aa = Date.now())),
        ua = (e) =>
          111 === e.charCodeAt(0) &&
          110 === e.charCodeAt(1) &&
          e.charCodeAt(2) > 96 &&
          e.charCodeAt(2) < 123;
      "undefined" != typeof HTMLElement && HTMLElement;
      const pa = (e) => {
          const t = e.props["onUpdate:modelValue"] || !1;
          return xt(t) ? (e) => $t(t, e) : t;
        },
        da = Symbol("_assign"),
        fa = {
          deep: !0,
          created(e, t, n) {
            ((e[da] = pa(n)),
              ra(e, "change", () => {
                const t = e._modelValue,
                  n = (function (e) {
                    return "_value" in e ? e._value : e.value;
                  })(e),
                  o = e.checked,
                  r = e[da];
                if (xt(t)) {
                  const e = on(t, n),
                    i = -1 !== e;
                  if (o && !i) r(t.concat(n));
                  else if (!o && i) {
                    const n = [...t];
                    (n.splice(e, 1), r(n));
                  }
                } else if (Ot(t)) {
                  const e = new Set(t);
                  (o ? e.add(n) : e.delete(n), r(e));
                } else r(ma(e, o));
              }));
          },
          mounted: ha,
          beforeUpdate(e, t, n) {
            ((e[da] = pa(n)), ha(e, t, n));
          },
        };
      function ha(e, { value: t, oldValue: n }, o) {
        let r;
        if (((e._modelValue = t), xt(t))) r = on(t, o.props.value) > -1;
        else if (Ot(t)) r = t.has(o.props.value);
        else {
          if (t === n) return;
          r = nn(t, ma(e, !0));
        }
        e.checked !== r && (e.checked = r);
      }
      function ma(e, t) {
        const n = t ? "_trueValue" : "_falseValue";
        return n in e ? e[n] : t;
      }
      const va = ["ctrl", "shift", "alt", "meta"],
        ga = {
          stop: (e) => e.stopPropagation(),
          prevent: (e) => e.preventDefault(),
          self: (e) => e.target !== e.currentTarget,
          ctrl: (e) => !e.ctrlKey,
          shift: (e) => !e.shiftKey,
          alt: (e) => !e.altKey,
          meta: (e) => !e.metaKey,
          left: (e) => "button" in e && 0 !== e.button,
          middle: (e) => "button" in e && 1 !== e.button,
          right: (e) => "button" in e && 2 !== e.button,
          exact: (e, t) => va.some((n) => e[`${n}Key`] && !t.includes(n)),
        },
        ya = (e, t) => {
          if (!e) return e;
          const n = e._withMods || (e._withMods = {}),
            o = t.join(".");
          return (
            n[o] ||
            (n[o] = (n, ...o) => {
              for (let e = 0; e < t.length; e++) {
                const o = ga[t[e]];
                if (o && o(n, t)) return;
              }
              return e(n, ...o);
            })
          );
        },
        ba = gt(
          {
            patchProp: (e, t, n, o, r, i) => {
              const s = "svg" === r;
              "class" === t
                ? (function (e, t, n) {
                    const o = e[zs];
                    (o && (t = (t ? [t, ...o] : [...o]).join(" ")),
                      null == t
                        ? e.removeAttribute("class")
                        : n
                          ? e.setAttribute("class", t)
                          : (e.className = t));
                  })(e, o, s)
                : "style" === t
                  ? (function (e, t, n) {
                      const o = e.style,
                        r = kt(n);
                      let i = !1;
                      if (n && !r) {
                        if (t)
                          if (kt(t))
                            for (const e of t.split(";")) {
                              const t = e.slice(0, e.indexOf(":")).trim();
                              null == n[t] && Qs(o, t, "");
                            }
                          else for (const e in t) null == n[e] && Qs(o, e, "");
                        for (const e in n)
                          ("display" === e && (i = !0), Qs(o, e, n[e]));
                      } else if (r) {
                        if (t !== n) {
                          const e = o[Js];
                          (e && (n += ";" + e),
                            (o.cssText = n),
                            (i = Gs.test(n)));
                        }
                      } else t && e.removeAttribute("style");
                      Ks in e &&
                        ((e[Ks] = i ? o.display : ""),
                        e[Ys] && (o.display = "none"));
                    })(e, n, o)
                  : mt(t)
                    ? vt(t) ||
                      (function (e, t, n, o, r = null) {
                        const i = e[ia] || (e[ia] = {}),
                          s = i[t];
                        if (o && s) s.value = o;
                        else {
                          const [n, a] = (function (e) {
                            let t;
                            if (sa.test(e)) {
                              let n;
                              for (t = {}; (n = e.match(sa));)
                                ((e = e.slice(0, e.length - n[0].length)),
                                  (t[n[0].toLowerCase()] = !0));
                            }
                            return [
                              ":" === e[2] ? e.slice(3) : Ht(e.slice(2)),
                              t,
                            ];
                          })(t);
                          if (o) {
                            const s = (i[t] = (function (e, t) {
                              const n = (e) => {
                                if (e._vts) {
                                  if (e._vts <= n.attached) return;
                                } else e._vts = Date.now();
                                No(
                                  (function (e, t) {
                                    if (xt(t)) {
                                      const n = e.stopImmediatePropagation;
                                      return (
                                        (e.stopImmediatePropagation = () => {
                                          (n.call(e), (e._stopped = !0));
                                        }),
                                        t.map(
                                          (e) => (t) =>
                                            !t._stopped && e && e(t),
                                        )
                                      );
                                    }
                                    return t;
                                  })(e, n.value),
                                  t,
                                  5,
                                  [e],
                                );
                              };
                              return ((n.value = e), (n.attached = ca()), n);
                            })(o, r));
                            ra(e, n, s, a);
                          } else
                            s &&
                              ((function (e, t, n, o) {
                                e.removeEventListener(t, n, o);
                              })(e, n, s, a),
                              (i[t] = void 0));
                        }
                      })(e, t, 0, o, i)
                    : (
                          "." === t[0]
                            ? ((t = t.slice(1)), 1)
                            : "^" === t[0]
                              ? ((t = t.slice(1)), 0)
                              : (function (e, t, n, o) {
                                  if (o)
                                    return (
                                      "innerHTML" === t ||
                                      "textContent" === t ||
                                      !!(t in e && ua(t) && Et(n))
                                    );
                                  if (
                                    "spellcheck" === t ||
                                    "draggable" === t ||
                                    "translate" === t ||
                                    "autocorrect" === t
                                  )
                                    return !1;
                                  if ("sandbox" === t && "IFRAME" === e.tagName)
                                    return !1;
                                  if ("form" === t) return !1;
                                  if ("list" === t && "INPUT" === e.tagName)
                                    return !1;
                                  if ("type" === t && "TEXTAREA" === e.tagName)
                                    return !1;
                                  if ("width" === t || "height" === t) {
                                    const t = e.tagName;
                                    if (
                                      "IMG" === t ||
                                      "VIDEO" === t ||
                                      "CANVAS" === t ||
                                      "SOURCE" === t
                                    )
                                      return !1;
                                  }
                                  return (!ua(t) || !kt(n)) && t in e;
                                })(e, t, o, s)
                        )
                      ? (oa(e, t, o),
                        e.tagName.includes("-") ||
                          ("value" !== t &&
                            "checked" !== t &&
                            "selected" !== t) ||
                          na(e, t, o, s, 0, "value" !== t))
                      : e._isVueCE &&
                          ((function (e, t) {
                            const n = e._def.props;
                            if (!n) return !1;
                            const o = Nt(t);
                            return Array.isArray(n)
                              ? n.some((e) => Nt(e) === o)
                              : Object.keys(n).some((e) => Nt(e) === o);
                          })(e, t) ||
                            (e._def.__asyncLoader &&
                              (/[A-Z]/.test(t) || !kt(o))))
                        ? oa(e, Nt(t), o, 0, t)
                        : ("true-value" === t
                            ? (e._trueValue = o)
                            : "false-value" === t && (e._falseValue = o),
                          na(e, t, o, s));
            },
          },
          qs,
        );
      let wa;
      const xa = (...e) => {
        const t = (wa || (wa = $i(ba))).createApp(...e),
          { mount: n } = t;
        return (
          (t.mount = (e) => {
            const o = (function (e) {
              if (kt(e)) return document.querySelector(e);
              return e;
            })(e);
            if (!o) return;
            const r = t._component;
            (Et(r) || r.render || r.template || (r.template = o.innerHTML),
              1 === o.nodeType && (o.textContent = ""));
            const i = n(
              o,
              !1,
              (function (e) {
                return e instanceof SVGElement
                  ? "svg"
                  : "function" == typeof MathMLElement &&
                      e instanceof MathMLElement
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
          t
        );
      };
      const _a = { class: "section" },
        Oa = { class: "section" },
        Sa = ["id"],
        Ea = { class: "title" },
        ka = ["id", "path"],
        Ca = ["data-rel"];
      var Ta = (function () {
        function e(e) {
          this.container = e;
        }
        return (
          (e.getInstance = function (e) {
            return new this(e);
          }),
          (e.prototype.setContainer = function (e) {
            return ((this.container = e), this);
          }),
          (e.prototype.create = function (e, t) {
            var n = this._createLabel(t.name, t.id),
              o = this._createInput(t),
              r = this._createCancelBtn("has-content"),
              i = this._createContainer(t.id);
            return (
              [n, o, r].forEach(function (e) {
                i.appendChild(e);
              }),
              e.prepend(i)
            );
          }),
          (e.prototype.createInputGroup = function (e, t) {
            var n = this._createContainer(e + "-container"),
              o = { id: e, name: "", value: "", placeholder: "" };
            return (
              n.appendChild(this._createInput(o)),
              (o.id = t),
              (o.placeholder = OC.L10N.translate('vapor','Leave empty if no value needed')),
              n.appendChild(this._createInput(o)),
              n.appendChild(this._createCancelBtn()),
              n
            );
          }),
          (e.prototype._createContainer = function (e) {
            var t = document.createElement("div");
            return (
              t.setAttribute("id", e),
              t.classList.add("autocomplete-container"),
              t
            );
          }),
          (e.prototype._createCancelBtn = function (e) {
            void 0 === e && (e = "");
            var t = document.createElement("button");
            return (
              e && t.classList.add(e),
              t.classList.add("icon-close"),
              t.addEventListener("click", function () {
                this.parentNode.remove();
              }),
              t
            );
          }),
          (e.prototype._createSaveBtn = function (e) {
            var t = document.createElement("input");
            return (
              t.setAttribute("type", "button"),
              t.setAttribute("value", "save"),
              t.setAttribute("data-rel", e + "-container"),
              t
            );
          }),
          (e.prototype._createLabel = function (e, t) {
            e = e.replace("_", "-");
            var n = document.createElement("label");
            n.setAttribute("for", t);
            var o = document.createTextNode(e);
            return (n.appendChild(o), n);
          }),
          (e.prototype._createInput = function (e) {
            var t = document.createElement("input"),
              n = e.type || "text",
              o = e.placeholder,
              r = e.value || "";
            return (
              t.setAttribute("type", n),
              t.setAttribute("id", e.id),
              t.setAttribute("name", e.name || e.id),
              "text" === n &&
                (t.setAttribute("value", r), t.setAttribute("placeholder", o)),
              t.classList.add("form-input-" + n),
              t
            );
          }),
          (e.prototype.render = function (e) {
            var t = document.getElementById(this.container);
            if (!t) throw this.container + " is not found";
            for (var n = 0, o = e; n < o.length; n++) {
              var r = o[n];
              this.create(t, r);
            }
          }),
          e
        );
      })();
      const Aa = Ta,
        La = ["id"],
        Pa = ["for"],
        ja = ["id", "name", "value"],
        Ia = {
          name: "editableRow",
          props: { name: String, value: String, placeholder: String },
          data: () => ({}),
          methods: {
            remove(e) {
              e.target.closest("div").remove();
            },
          },
        };
      var Da = n(6262);
      const Ra = (0, Da.A)(Ia, [
          [
            "render",
            function (e, t, n, o, r, i) {
              return (
                os(),
                as(
                  "div",
                  { id: n.name },
                  [
                    fs("label", { for: n.name }, sn(n.name), 9, Pa),
                    fs(
                      "input",
                      {
                        type: "text",
                        id: n.name,
                        name: n.name,
                        value: n.value,
                        placeholder: "Leave empty if no value needed",
                        class: "form-input-text",
                      },
                      null,
                      8,
                      ja,
                    ),
                    fs("button", {
                      class: "has-content icon-close",
                      onClick:
                        t[0] ||
                        (t[0] = function () {
                          return i.remove && i.remove(...arguments);
                        }),
                    }),
                  ],
                  8,
                  La,
                )
              );
            },
          ],
        ]),
        Va = {
          name: "customOptions",
          props: {
            path: String,
            name: { type: String, default: "settings" },
            title: { type: String, default: "Custom Settings" },
            classes: String,
            validOptions: Array,
            options: Array,
          },
          data() {
            return {
              id: "custom-" + this.name,
              classes: "custom-settings-container",
              container: "custom-settings-container",
              validOptions: this.validOptions,
              options: [],
            };
          },
          components: { editableRow: Ra },
          computed: {
            rows() {
              return this.options;
            },
          },
          methods: {
            newOption(e, t) {
              e.stopPropagation();
              let n,
                o,
                r,
                i = e.target;
              if (
                ((n = document.querySelectorAll(`[id^='${t}-key']`)),
                0 === n.length)
              )
                ((o = `${t}-key-1`), (r = `${t}-value-1`));
              else {
                let e = n.length + 1;
                ((o = `${t}-key-${e}`), (r = `${t}-value-${e}`));
              }
              let s = Aa.getInstance();
              (i.before(s.createInputGroup(o, r)),
                f.autoComplete(`[id^='${t}-key']`, this.validOptions));
            },
            saveOptions(e) {
              let t = e.target,
                n = t.getAttribute("data-rel"),
                o = f.getData(n),
                r = f.generateUrl(o._path);
              o = f.transformParams(o, this.name);
              let i = [];
              for (let e in o) this.validOptions.includes(e) || i.push(e);
              i.length > 0
                ? f.error(OC.L10N.translate('vapor','invalid options: ') + i.join(","))
                : f
                    .httpClient(r)
                    .setData(o)
                    .setHandler((e) => {
                      if (e.error) return void f.error(e.error);
                      this.options = [];
                      for (let e in o)
                        this.options.push({ name: e, value: o[e] });
                      let n = t.parentElement.querySelectorAll(
                        `div[id^='${this.name}-key']`,
                      );
                      (n &&
                        n.length > 0 &&
                        n.forEach((e) => {
                          e.remove();
                        }),
                        f.info(e.message));
                    })
                    .send();
            },
          },
          mounted() {
            this.$emit("mounted", event, this);
          },
        },
        Na = (0, Da.A)(Va, [
          [
            "render",
            function (e, t, n, o, r, i) {
              const s = Kr("editableRow");
              return (
                os(),
                as(
                  "div",
                  { class: Zt(["section", [r.classes]]), id: r.container },
                  [
                    fs("h3", Ea, sn(n.title), 1),
                    fs(
                      "div",
                      { classs: "button-container", id: r.id, path: n.path },
                      [
                        (os(!0),
                        as(
                          Xi,
                          null,
                          Gr(
                            i.rows,
                            (e, t) => (
                              os(),
                              ls(
                                s,
                                {
                                  key: t,
                                  value: e.value,
                                  name: e.name,
                                  placeholder: e.placeholder,
                                },
                                null,
                                8,
                                ["value", "name", "placeholder"],
                              )
                            ),
                          ),
                          128,
                        )),
                        fs(
                          "button",
                          {
                            class: "custom-settings-add-btn",
                            onClick:
                              t[0] ||
                              (t[0] = ya(
                                (e) => i.newOption(e, n.name),
                                ["prevent"],
                              )),
                            "data-tippy-content": OC.L10N.translate('vapor','Add new options'),
                          },
                          [
                            Xr(e.$slots, "add", {}, () => [
                              t[2] || (t[2] = vs(OC.L10N.translate('vapor','New Option'), -1)),
                            ]),
                          ],
                        ),
                        fs(
                          "button",
                          {
                            class: "custom-settings-save-btn",
                            onClick:
                              t[1] ||
                              (t[1] = ya(
                                function () {
                                  return (
                                    i.saveOptions && i.saveOptions(...arguments)
                                  );
                                },
                                ["prevent"],
                              )),
                            "data-rel": r.id,
                          },
                          [
                            Xr(e.$slots, "save", {}, () => [
                              t[3] || (t[3] = vs("Save", -1)),
                            ]),
                          ],
                          8,
                          Ca,
                        ),
                      ],
                      8,
                      ka,
                    ),
                  ],
                  10,
                  Sa,
                )
              );
            },
          ],
        ]),
        Ma = [
          "ca-certificate",
          "certificate",
          "dht-file-path",
          "dht-file-path6",
          "dir",
          "input-file",
          "load-cookies",
          "log",
          "metalink-file",
          "netrc-path",
          "on-bt-download-complete",
          "on-download-complete",
          "on-download-error",
          "on-download-start",
          "on-download-stop",
          "on-download-pause",
          "out",
          "private-key",
          "rpc-certificate",
          "rpc-private-key",
          "save-cookies",
          "save-session",
          "server-stat-if",
          "server-stat-of",
          "torrent-file",
          "all-proxy",
          "all-proxy-passwd",
          "all-proxy-user",
          "allow-overwrite",
          "allow-piece-length-change",
          "always-resume",
          "async-dns",
          "auto-file-renaming",
          "bt-enable-hook-after-hash-check",
          "bt-enable-lpd",
          "bt-exclude-tracker",
          "bt-external-ip",
          "bt-force-encryption",
          "bt-hash-check-seed",
          "bt-load-saved-metadata",
          "bt-max-peers",
          "bt-metadata-only",
          "bt-min-crypto-level",
          "bt-prioritize-piece",
          "bt-remove-unselected-file",
          "bt-request-peer-speed-limit",
          "bt-require-crypto",
          "bt-save-metadata",
          "bt-seed-unverified",
          "bt-stop-timeout",
          "bt-tracker",
          "bt-tracker-connect-timeout",
          "bt-tracker-interval",
          "bt-tracker-timeout",
          "check-integrity",
          "checksum",
          "conditional-get",
          "connect-timeout",
          "content-disposition-default-utf8",
          "continue",
          "dir",
          "dry-run",
          "enable-http-keep-alive",
          "enable-http-pipelining",
          "enable-mmap",
          "enable-peer-exchange",
          "file-allocation",
          "follow-metalink",
          "follow-torrent",
          "force-save",
          "ftp-passwd",
          "ftp-pasv",
          "ftp-proxy",
          "ftp-proxy-passwd",
          "ftp-proxy-user",
          "ftp-reuse-connection",
          "ftp-type",
          "ftp-user",
          "gid",
          "hash-check-only",
          "header",
          "http-accept-gzip",
          "http-auth-challenge",
          "http-no-cache",
          "http-passwd",
          "http-proxy",
          "http-proxy-passwd",
          "http-proxy-user",
          "http-user",
          "https-proxy",
          "https-proxy-passwd",
          "https-proxy-user",
          "index-out",
          "lowest-speed-limit",
          "max-connection-per-server",
          "max-download-limit",
          "max-file-not-found",
          "max-mmap-limit",
          "max-resume-failure-tries",
          "max-tries",
          "max-upload-limit",
          "metalink-base-uri",
          "metalink-enable-unique-protocol",
          "metalink-language",
          "metalink-location",
          "metalink-os",
          "metalink-preferred-protocol",
          "metalink-version",
          "min-split-size",
          "no-file-allocation-limit",
          "no-netrc",
          "no-proxy",
          "out",
          "parameterized-uri",
          "pause",
          "pause-metadata",
          "piece-length",
          "proxy-method",
          "realtime-chunk-checksum",
          "referer",
          "remote-time",
          "remove-control-file",
          "retry-wait",
          "reuse-uri",
          "rpc-save-upload-metadata",
          "seed-ratio",
          "seed-time",
          "select-file",
          "split",
          "ssh-host-key-md",
          "stream-piece-selector",
          "timeout",
          "uri-selector",
          "use-head",
          "user-agent",
          "dry-run",
          "metalink-base-uri",
          "parameterized-uri",
          "pause",
          "piece-length",
          "rpc-save-upload-metadata",
          "bt-max-peers",
          "bt-request-peer-speed-limit",
          "bt-remove-unselected-file",
          "force-save",
          "max-download-limit",
          "max-upload-limit",
          "bt-max-open-files",
          "download-result",
          "keep-unfinished-download-result",
          "log",
          "log-level",
          "max-concurrent-downloads",
          "max-download-result",
          "max-overall-download-limit",
          "max-overall-upload-limit",
          "optimize-concurrent-downloads",
          "save-cookies",
          "save-session",
          "server-stat-of",
          "interface",
        ],
        Ha = ["path", "id"],
        Ua = ["for"],
        Ba = ["id", "name", "value", "placeholder", "data-rel"],
        Fa = ["data-rel"],
        $a = {
          name: "settingsRow",
          props: {
            label: String,
            id: String,
            value: String,
            placeholder: String,
            path: String,
            useBtn: { type: Boolean, default: !1 },
          },
          data() {
            let e = this.id.replaceAll("_", "-");
            return { classes: e + "-input", container: e + "-container" };
          },
          methods: {
            saveHandler(e) {
              if ("change" == e.type && this.useBtn) return;
              e.stopPropagation();
              let t = e.target,
                n = f.getData(t.getAttribute("data-rel")),
                o = f.generateUrl(n._path);
              ((n = f.transformParams(n)),
                f
                  .httpClient(o)
                  .setData(n)
                  .setHandler(function (e) {
                    e && (e.error ? f.error(e.error) : f.info(e.message));
                  })
                  .send());
            },
          },
          computed: {},
          mounted() {},
        },
        Wa = (0, Da.A)($a, [
          [
            "render",
            function (e, t, n, o, r, i) {
              return (
                os(),
                as(
                  "div",
                  { class: Zt(r.container), path: n.path, id: r.container },
                  [
                    fs("label", { for: n.id }, sn(n.label), 9, Ua),
                    fs(
                      "input",
                      {
                        type: "text",
                        class: Zt(r.classes),
                        id: n.id,
                        name: n.id,
                        value: n.value,
                        placeholder: n.placeholder,
                        onChange:
                          t[0] ||
                          (t[0] = function () {
                            return i.saveHandler && i.saveHandler(...arguments);
                          }),
                        "data-rel": r.container,
                      },
                      null,
                      42,
                      Ba,
                    ),
                    n.useBtn
                      ? (os(),
                        as(
                          "input",
                          {
                            key: 0,
                            type: "button",
                            value: OC.L10N.translate('vapor','save'),
                            "data-rel": r.container,
                            onClick:
                              t[1] ||
                              (t[1] = ya(
                                function () {
                                  return (
                                    i.saveHandler && i.saveHandler(...arguments)
                                  );
                                },
                                ["prevent"],
                              )),
                          },
                          null,
                          8,
                          Fa,
                        ))
                      : gs("", !0),
                  ],
                  10,
                  Ha,
                )
              );
            },
          ],
        ]),
        qa = ["for"],
        za = { class: "toggle-label" },
        Ka = ["disabled", "id", "name", "value"],
        Ya = {
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
              set(e) {
                ((this.status = e), this.$emit("changed", this.name, e));
              },
            },
          },
        },
        Ja = (0, Da.A)(Ya, [
          [
            "render",
            function (e, t, n, o, r, i) {
              return (
                os(),
                as(
                  "label",
                  {
                    for: n.name,
                    class: Zt([{ active: i.isActive }, "toggle-button"]),
                  },
                  [
                    fs("span", za, sn(i.text), 1),
                    dr(
                      fs(
                        "input",
                        {
                          type: "checkbox",
                          disabled: n.disabled,
                          id: n.name,
                          name: n.name,
                          value: e.value,
                          "onUpdate:modelValue":
                            t[0] || (t[0] = (e) => (i.inputValue = e)),
                        },
                        null,
                        8,
                        Ka,
                      ),
                      [[fa, i.inputValue]],
                    ),
                    t[1] ||
                      (t[1] = fs("span", { class: "toggle-switch" }, null, -1)),
                  ],
                  10,
                  qa,
                )
              );
            },
          ],
          ["__scopeId", "data-v-c0727916"],
        ]),
        Ga = { class: "system-info-wrapper section" },
        Xa = { class: "system-info" },
        Qa = { class: "system-info-item" },
        Za = { class: "system-info-item-value" },
        el = { class: "version" },
        tl = { class: "system-info-item" },
        nl = { class: "system-info-item-value" },
        ol = { class: "version" },
        rl = { key: 1, class: "bs-spinner" },
        il = {
          data: () => ({ loading: 0 }),
          methods: {
            handler(e) {
              (this.enableLoading && (this.loading = 1),
                this.$emit("clicked", e, this));
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
        sl = {
          name: "systemInfo",
          data: () => ({
            aria2Btn: OC.L10N.translate("vapor", "Check for Update"),
            ytdBtn: OC.L10N.translate("vapor", "Check for Update"),
          }),
          components: {
            actionButton: (0, Da.A)(il, [
              [
                "render",
                function (e, t, n, o, r, i) {
                  return (
                    os(),
                    as(
                      Xi,
                      null,
                      [
                        1 ^ r.loading
                          ? (os(),
                            as(
                              "button",
                              {
                                key: 0,
                                ref: "button",
                                class: Zt(["button-vue", n.className]),
                                onClick:
                                  t[0] ||
                                  (t[0] = ya(
                                    function () {
                                      return (
                                        i.handler && i.handler(...arguments)
                                      );
                                    },
                                    ["prevent"],
                                  )),
                              },
                              [
                                Xr(
                                  e.$slots,
                                  "default",
                                  {},
                                  () => [t[1] || (t[1] = vs("Download", -1))],
                                  !0,
                                ),
                              ],
                              2,
                            ))
                          : gs("", !0),
                        r.loading
                          ? (os(),
                            as("button", rl, [
                              ...(t[2] ||
                                (t[2] = [
                                  fs(
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
                                  fs(
                                    "span",
                                    { class: "visually-hidden" },
                                    "Loading...",
                                    -1,
                                  ),
                                ])),
                            ]))
                          : gs("", !0),
                      ],
                      64,
                    )
                  );
                },
              ],
              ["__scopeId", "data-v-39a2f65c"],
            ]),
          },
          computed: {
            aria2Ver: {
              get() {
                return this.$props.aria2Version;
              },
              set(e) {
                this.$props.aria2Version = e;
              },
            },
            ytdVer: {
              get() {
                return this.$props.ytdVersion;
              },
              set(e) {
                this.$props.ytdVersion = e;
              },
            },
          },
          methods: {
            checkUpdate(e, t) {
              const { btnType: n, action: o } = t.$props,
                r =
                  "check" === o
                    ? "aria2" === n
                      ? "/apps/vapor/aria2/release/check"
                      : "/apps/vapor/ytdl/release/check"
                    : "aria2" === n
                      ? "/apps/vapor/aria2/release/update"
                      : "/apps/vapor/ytdl/release/update";
              f.httpClient(f.generateUrl(r))
                .setMethod("GET")
                .setHandler((e) => {
                  ((t.loading = !1),
                    e.status
                      ? (f.info(e.message),
                        "check" == o
                          ? ("ytd" == n
                              ? (this.ytdBtn = "Update")
                              : (this.aria2Btn = "Update"),
                            (t.$props.action = "update"))
                          : ("ytd" == n
                              ? (this.ytdBtn = "Check for Update")
                              : (this.aria2Btn = "Check for Update"),
                            (t.$props.action = "check"),
                            e.data &&
                              ("ytd" == n
                                ? (this.ytdVer = e.data)
                                : "aria2" == n && (this.aria2Ver = e.data))))
                      : f.info(e.message));
                })
                .send();
            },
          },
          props: {
            aria2Version: { type: String, default: "" },
            ytdVersion: { type: String, default: "" },
          },
        },
        al = {
          name: "adminSettings",
          data: () => ({
            options: [],
            validOptions: Ma,
            settings: [],
            pStatus: !1,
            aria2Version: "",
            ytdVersion: "",
          }),
          components: {
            customOptions: Na,
            settingsRow: Wa,
            toggleButton: Ja,
            systemInfo: (0, Da.A)(sl, [
              [
                "render",
                function (e, t, n, o, r, i) {
                  const s = Kr("actionButton");
                  return (
                    os(),
                    as("div", Ga, [
                      t[2] ||
                        (t[2] = fs(
                          "h2",
                          { class: "section-title" },
                          OC.L10N.translate('vapor','System Info'),
                          -1,
                        )),
                      fs("div", Xa, [
                        fs("div", Qa, [
                          t[0] ||
                            (t[0] = fs(
                              "div",
                              { class: "system-info-item-label" },
                              "Aria2 Version: ",
                              -1,
                            )),
                          fs("div", Za, [fs("span", el, sn(i.aria2Ver), 1)]),
                        ]),
                        fs("div", tl, [
                          t[1] ||
                            (t[1] = fs(
                              "div",
                              { class: "system-info-item-label" },
                              "Yt-dlp Version: ",
                              -1,
                            )),
                          fs("div", nl, [
                            fs("span", ol, sn(i.ytdVer), 1),
                            hs(
                              s,
                              {
                                action: "check",
                                btnType: "ytd",
                                onClicked: i.checkUpdate,
                                enableLoading: "true",
                                className: "check-button",
                              },
                              {
                                default: pr(() => [vs(sn(r.ytdBtn), 1)]),
                                _: 1,
                              },
                              8,
                              ["onClicked"],
                            ),
                          ]),
                        ]),
                      ]),
                    ])
                  );
                },
              ],
              ["__scopeId", "data-v-585cee62"],
            ]),
          },
          methods: {
            toggle(e, t) {
              let n = {};
              n[e] = t ? 1 : 0;
              const o = f.generateUrl("/apps/vapor/admin/save");
              f.httpClient(o)
                .setData(n)
                .setHandler((e) => {
                  e.message && f.message(f.t(e.message), 1e3);
                })
                .send();
            },
            render(e, t) {
              f.httpClient(f.generateUrl("/apps/vapor/admin/aria2/get"))
                .setMethod("GET")
                .setHandler((e) => {
                  if (!e) return;
                  let n = [];
                  for (let t in e)
                    Ma.includes(t) && n.push({ name: t, value: e[t], id: t });
                  t.options = n;
                })
                .send();
            },
          },
          computed: {
            optionRows() {
              return this.options;
            },
          },
          mounted() {
            try {
              let e = this.$el.parentElement.getAttribute("data-settings");
              e = JSON.parse(e);
              let t = this.$el.parentElement.getAttribute("data-options");
              ((t = JSON.parse(t)),
                (this.settings = e),
                (this.pStatus = f.str2Boolean(e.disallow_aria2_settings)),
                (this.aria2Version = e.aria2_version),
                (this.ytdVersion = e.ytdl_version),
                (this.options = t));
            } catch (e) {
              f.error(e);
            }
          },
        },
        ll = (0, Da.A)(al, [
          [
            "render",
            function (e, t, n, o, r, i) {
              const s = Kr("settingsRow"),
                a = Kr("toggleButton"),
                l = Kr("customOptions"),
                c = Kr("systemInfo");
              return (
                os(),
                as(
                  Xi,
                  null,
                  [
                    fs("div", _a, [
                      (os(!0),
                      as(
                        Xi,
                        null,
                        Gr(
                          i.optionRows,
                          (e, t) => (
                            os(),
                            ls(
                              s,
                              {
                                key: t,
                                value: e.value,
                                id: e.id,
                                label: e.label,
                                placeholder: e.placeholder,
                                path: e.path,
                              },
                              null,
                              8,
                              ["value", "id", "label", "placeholder", "path"],
                            )
                          ),
                        ),
                        128,
                      )),
                    ]),
                    fs("div", Oa, [
                      hs(
                        a,
                        {
                          defaultStatus: r.pStatus,
                          disabledText: OC.L10N.translate('vapor','No Aria2 Settings for non-admin Users'),
                          enabledText: OC.L10N.translate('vapor','No Aria2 Settings for non-admin Users'),
                          onChanged: i.toggle,
                          name: "disallow_aria2_settings",
                        },
                        null,
                        8,
                        ["defaultStatus", "onChanged"],
                      ),
                    ]),
                    hs(
                      l,
                      {
                        name: "admin-aria2-settings",
                        onMounted: i.render,
                        title: OC.L10N.translate('vapor','Global Aria2 Settings'),
                        path: "/apps/vapor/admin/aria2/save",
                        validOptions: r.validOptions,
                      },
                      {
                        save: pr(() => [
                          ...(t[0] || (t[0] = [vs(OC.L10N.translate('vapor','Save Settings'), -1)])),
                        ]),
                        _: 1,
                      },
                      8,
                      ["onMounted", "validOptions"],
                    ),
                    hs(
                      c,
                      {
                        aria2Version: r.aria2Version,
                        ytdVersion: r.ytdVersion,
                      },
                      null,
                      8,
                      ["aria2Version", "ytdVersion"],
                    ),
                  ],
                  64,
                )
              );
            },
          ],
        ]),
        cl = { class: "section vapor-general-settings" },
        ul = Object.keys({
          "ignore-errors": "download and postprocessing errors.",
          "no-abort-on-error": "with next video on download",
          "abort-on-error": "downloading of further videos if an",
          "dump-user-agent": "the current user-agent and exit",
          "list-extractors": "all supported extractors and exit",
          "extractor-descriptions": "descriptions of all supported",
          "force-generic-extractor": "extraction to use the generic",
          "default-search": "Use this prefix for unqualified URLs. For",
          "ignore-config": "Don't load any more configuration files",
          "no-config-locations": "not load any custom configuration files",
          "config-locations": "Location of the main configuration file;",
          "flat-playlist": "not extract the videos of a playlist,",
          "no-flat-playlist": "the videos of a playlist",
          "live-from-start": "livestreams from the start.",
          "no-live-from-start": "livestreams from the current time",
          "wait-for-video": "wait for scheduled streams",
          "no-wait-for-video": "not wait for scheduled streams (default)",
          "mark-watched": "videos watched (even with --simulate)",
          "no-mark-watched": "not mark videos watched (default)",
          "no-colors": "not emit color codes in output",
          "compat-options": "Options that can help keep compatibility",
          proxy: "Use the specified HTTP/HTTPS/SOCKS proxy.",
          "socket-timeout": "Time to wait before giving up, in seconds",
          "source-address": "Client-side IP address to bind to",
          "force-ipv4": "all connections via IPv4",
          "force-ipv6": "all connections via IPv6",
          "geo-verification-proxy":
            "Use this proxy to verify the IP address for",
          "geo-bypass": "geographic restriction via faking",
          "no-geo-bypass": "not bypass geographic restriction via",
          "geo-bypass-country": "Force bypass geographic restriction with",
          "playlist-start": "Playlist video to start at (default is 1)",
          "playlist-end": "Playlist video to end at (default is last)",
          "min-filesize": "Do not download any videos smaller than",
          "max-filesize": "Do not download any videos larger than SIZE",
          date: "Download only videos uploaded on this date.",
          datebefore: "Download only videos uploaded on or before",
          dateafter: "Download only videos uploaded on or after",
          "match-filters": "Generic video filter. Any field (see",
          "no-match-filter": "not use generic video filter (default)",
          "no-playlist": "only the video, if the URL refers",
          "yes-playlist": "the playlist, if the URL refers to",
          "age-limit": "Download only videos suitable for the given",
          "download-archive": "Download only videos not listed in the",
          "no-download-archive": "not use archive file (default)",
          "max-downloads": "only on the current",
          "break-on-existing": "the download process when encountering",
          "break-on-reject": "the download process when encountering",
          "break-per-input": "--break-on-existing, --break-on-reject",
          "no-break-per-input": "--break-on-existing and similar options",
          "skip-playlist-after-errors":
            "Number of allowed failures until the rest",
          "concurrent-fragments": "Number of fragments of a dash/hlsnative",
          "limit-rate": "Maximum download rate in bytes per second",
          "throttled-rate": "Minimum download rate in bytes per second",
          retries: "Number of retries (default is 10), or",
          "file-access-retries": "Number of times to retry on file access",
          "fragment-retries": "Number of retries for a fragment (default",
          "skip-unavailable-fragments": "unavailable fragments for DASH,",
          "abort-on-unavailable-fragment": "downloading if a fragment is",
          "keep-fragments": "downloaded fragments on disk after",
          "no-keep-fragments": "downloaded fragments after",
          "buffer-size": "Size of download buffer (e.g. 1024 or 16K)",
          "resize-buffer": "buffer size is automatically resized",
          "no-resize-buffer": "not automatically adjust the buffer size",
          "http-chunk-size": "Size of a chunk for chunk-based HTTP",
          "playlist-reverse": "playlist videos in reverse order",
          "no-playlist-reverse": "playlist videos in default order",
          "playlist-random": "playlist videos in random order",
          "xattr-set-filesize": "file xattribute ytdl.filesize with",
          "hls-use-mpegts": "the mpegts container for HLS videos;",
          "no-hls-use-mpegts": "not use the mpegts container for HLS",
          downloader: "Name or path of the external downloader to",
          "downloader-args": "Give these arguments to the external",
          "batch-file": 'File containing URLs to download ("-" for',
          "no-batch-file": "not read URLs from batch file (default)",
          paths: "The paths where the files should be",
          output: 'Output filename template; see "OUTPUT',
          "output-na-placeholder": "Placeholder value for unavailable meta",
          "restrict-filenames": "filenames to only ASCII",
          "no-restrict-filenames": 'Unicode characters, "&" and spaces in',
          "windows-filenames": "filenames to be Windows-compatible",
          "no-windows-filenames": "filenames Windows-compatible only if",
          "trim-filenames": "Limit the filename length (excluding",
          "no-overwrites": "not overwrite any files",
          "force-overwrites": "all video and metadata files.",
          "no-force-overwrites": "not overwrite the video, but overwrite",
          continue: "partially downloaded files/fragments",
          "no-continue": "not resume partially downloaded",
          part: ".part files instead of writing directly",
          "no-part": "not use .part files - write directly",
          mtime: "the Last-modified header to set the",
          "no-mtime": "not use the Last-modified header to set",
          "write-description": "video description to a .description",
          "no-write-description": "not write video description (default)",
          "write-info-json": "video metadata to a .info.json file",
          "no-write-info-json": "not write video metadata (default)",
          "write-playlist-metafiles": "playlist metadata in addition to the",
          "no-write-playlist-metafiles":
            "not write playlist metadata when using",
          "clean-info-json": "some private fields such as",
          "no-clean-info-json": "all fields to the infojson",
          "write-comments": "video comments to be placed in the",
          "no-write-comments": "not retrieve video comments unless the",
          "load-info-json": "JSON file containing the video information",
          cookies: "Netscape formatted file to read cookies",
          "no-cookies": "not read/dump cookies from/to file",
          "no-cookies-from-browser": "not load cookies from browser (default)",
          "cache-dir": "Location in the filesystem where youtube-dl",
          "no-cache-dir": "filesystem caching",
          "rm-cache-dir": "all filesystem cache files",
          "write-thumbnail": "thumbnail image to disk",
          "no-write-thumbnail": "not write thumbnail image to disk",
          "write-all-thumbnails": "all thumbnail image formats to disk",
          "list-thumbnails": "available thumbnails of each video.",
          "no-simulate": "used",
          "write-link": "an internet shortcut file, depending",
          "write-url-link": "a .url Windows internet shortcut. The",
          "write-webloc-link": "a .webloc macOS internet shortcut",
          "write-desktop-link": "a .desktop Linux internet shortcut",
          quiet: "quiet mode. If used with",
          "no-warnings": "warnings",
          simulate: "",
          "ignore-no-formats-error": '"No video formats" error. Useful for',
          "no-ignore-no-formats-error": "error when no downloadable video",
          "skip-download": "not download the video but write all",
          print: "Field name or output template to print to",
          "print-to-file": "FILE",
          "dump-json": "Quiet, but print JSON information for each",
          "dump-single-json": "Quiet, but print JSON information for each",
          "force-write-archive": "download archive entries to be",
          newline: "progress bar as new lines",
          "no-progress": "not print progress bar",
          progress: "progress bar, even if in quiet mode",
          "console-title": "progress in console titlebar",
          "progress-template": "",
          verbose: "various debugging information",
          "dump-pages": "downloaded pages encoded using base64",
          "write-pages": "downloaded intermediary pages to",
          "print-traffic": "sent and read HTTP traffic",
          encoding: "Force the specified encoding (experimental)",
          "legacy-server-connect": "allow HTTPS connection to",
          "no-check-certificates": "HTTPS certificate validation",
          "prefer-insecure": "an unencrypted connection to retrieve",
          "add-header": "Specify a custom HTTP header and its value,",
          "bidi-workaround": "around terminals that lack",
          "sleep-requests": "Number of seconds to sleep between requests",
          "sleep-interval": "Number of seconds to sleep before each",
          "max-sleep-interval": "Maximum number of seconds to sleep. Can",
          "sleep-subtitles": "Number of seconds to sleep before each",
          format: 'Video format code, see "FORMAT SELECTION"',
          "format-sort": "Sort the formats by the fields given, see",
          "format-sort-force": "user specified sort order to have",
          "no-format-sort-force": "fields have precedence over the user",
          "video-multistreams": "multiple video streams to be merged",
          "no-video-multistreams": "one video stream is downloaded for",
          "audio-multistreams": "multiple audio streams to be merged",
          "no-audio-multistreams": "one audio stream is downloaded for",
          "prefer-free-formats": "video formats with free containers",
          "no-prefer-free-formats": "Don't give any special preference to free",
          "check-formats": "sure formats are selected only from",
          "check-all-formats": "all formats for whether they are",
          "no-check-formats": "not check that the formats are actually",
          "list-formats": "available formats of each video.",
          "merge-output-format": "If a merge is required (e.g.",
          "write-subs": "subtitle file",
          "no-write-subs": "not write subtitle file (default)",
          "write-auto-subs": "automatically generated subtitle file",
          "no-write-auto-subs": "not write auto-generated subtitles",
          "list-subs": "a",
          "sub-format": "Subtitle format, accepts formats",
          "sub-langs": "Languages of the subtitles to download (can",
          username: "Login with this account ID",
          password: "Account password. If this option is left",
          twofactor: "Two-factor authentication code",
          netrc: ".netrc authentication data",
          "netrc-location": "Location of .netrc authentication data;",
          "video-password": "Video password (vimeo, youku)",
          "ap-mso": "Adobe Pass multiple-system operator (TV",
          "ap-list-mso": "all supported multiple-system",
          "ap-username": "Multiple-system operator account login",
          "ap-password": "Multiple-system operator account password.",
          "client-certificate": "Path to client certificate file in PEM",
          "client-certificate-key": "",
          "client-certificate-password": "",
          "extract-audio": "video files to audio-only files",
          "audio-format": "Specify audio format to convert the audio",
          "audio-quality": "Specify ffmpeg audio quality to use when",
          "remux-video": "Remux the video into another container if",
          "recode-video": "Re-encode the video into another format if",
          "postprocessor-args": "Give these arguments to the postprocessors.",
          "keep-video": "the intermediate video file on disk",
          "no-keep-video": "the intermediate video file after",
          "post-overwrites": "post-processed files (default)",
          "no-post-overwrites": "not overwrite post-processed files",
          "embed-subs": "subtitles in the video (only for mp4,",
          "no-embed-subs": "not embed subtitles (default)",
          "embed-thumbnail": "thumbnail in the video as cover art",
          "no-embed-thumbnail": "not embed thumbnail (default)",
          "embed-metadata": "metadata to the video file. Also",
          "no-embed-metadata": "not add metadata to file (default)",
          "embed-chapters": "chapter markers to the video file",
          "no-embed-chapters": "not add chapter markers (default)",
          "embed-info-json": "the infojson as an attachment to",
          "no-embed-info-json": "not embed the infojson as an attachment",
          "parse-metadata": "Parse additional metadata like title/artist",
          "replace-in-metadata": "REGEX REPLACE",
          xattrs: "metadata to the video file's xattrs",
          "concat-playlist": "Concatenate videos in a playlist. One of",
          fixup: "Automatically correct known faults of the",
          "ffmpeg-location": "Location of the ffmpeg binary; either the",
          exec: "Execute a command, optionally prefixed with",
          "no-exec": "any previously defined --exec",
          "convert-subs": "Convert the subtitles to another format",
          "convert-thumbnails": "Convert the thumbnails to another format",
          "split-chapters": "video into multiple files based on",
          "no-split-chapters": "not split video based on chapters",
          "remove-chapters": "Remove chapters whose title matches the",
          "no-remove-chapters": "not remove any chapters from the file",
          "force-keyframes-at-cuts": "keyframes around the chapters before",
          "no-force-keyframes-at-cuts":
            "not force keyframes around the chapters",
          "use-postprocessor": "The (case sensitive) name of plugin",
          "sponsorblock-mark": "that",
          "sponsorblock-remove": "SponsorBlock categories to be removed from",
          "sponsorblock-chapter-title": "",
          "no-sponsorblock": "both --sponsorblock-mark and",
          "sponsorblock-api": "SponsorBlock API location, defaults to",
          "extractor-retries": "Number of retries for known extractor",
          "allow-dynamic-mpd": "dynamic DASH manifests (default)",
          "ignore-dynamic-mpd": "not process dynamic DASH manifests",
          "hls-split-discontinuity": "HLS playlists to different formats at",
          "no-hls-split-discontinuity": "not split HLS playlists to different",
          "extractor-args": "Pass these arguments to the extractor. See",
        }),
        pl = {
          name: "personalSettings",
          data: () => ({
            options: [],
            aria2Options: Ma,
            ytdlOptions: ul,
            disallowAria2Settings: !1,
            isAdmin: !1,
          }),
          components: { customOptions: Na, settingsRow: Wa },
          methods: {
            renderAria2(e, t) {
              f.httpClient(f.generateUrl("/apps/vapor/personal/aria2/get"))
                .setHandler((e) => {
                  if (!e) return;
                  let n = [];
                  for (let t in e)
                    Ma.includes(t) && n.push({ name: t, value: e[t], id: t });
                  t.options = n;
                })
                .send();
            },
            renderYtdl(e, t) {
              f.httpClient(f.generateUrl("/apps/vapor/personal/ytdl/get"))
                .setHandler((e) => {
                  if (!e) return;
                  let n = [];
                  for (let t in e)
                    ul.includes(t) && n.push({ name: t, value: e[t], id: t });
                  t.options = n;
                })
                .send();
            },
          },
          computed: {
            optionRows() {
              return this.options;
            },
          },
          mounted() {
            try {
              let e = this.$el.parentElement.getAttribute("data-settings");
              e = JSON.parse(e);
              let t = this.$el.parentElement.getAttribute("data-options");
              ((t = JSON.parse(t)),
                (this.disallowAria2Settings = f.str2Boolean(
                  e.disallow_aria2_settings,
                )),
                (this.isAdmin = e.is_admin),
                (this.options = t));
            } catch (e) {
              f.error(e);
            }
          },
        },
        dl = (0, Da.A)(pl, [
          [
            "render",
            function (e, t, n, o, r, i) {
              const s = Kr("settingsRow"),
                a = Kr("customOptions");
              return (
                os(),
                as(
                  Xi,
                  null,
                  [
                    fs("div", cl, [
                      t[0] || (t[0] = fs("h3", null, OC.L10N.translate('vapor','General Settings'), -1)),
                      (os(!0),
                      as(
                        Xi,
                        null,
                        Gr(
                          i.optionRows,
                          (e, t) => (
                            os(),
                            ls(
                              s,
                              {
                                key: t,
                                value: e.value,
                                id: e.id,
                                label: e.label,
                                placeholder: e.placeholder,
                                path: e.path,
                                useBtn: !0,
                              },
                              null,
                              8,
                              ["value", "id", "label", "placeholder", "path"],
                            )
                          ),
                        ),
                        128,
                      )),
                    ]),
                    !r.disallowAria2Settings || r.isAdmin
                      ? (os(),
                        ls(
                          a,
                          {
                            key: 0,
                            name: "custom-aria2-settings",
                            title: OC.L10N.translate('vapor','Personal Aria2 Settings'),
                            onMounted: i.renderAria2,
                            path: "/apps/vapor/personal/aria2/save",
                            validOptions: r.aria2Options,
                          },
                          {
                            save: pr(() => [
                              ...(t[1] ||
                                (t[1] = [vs(OC.L10N.translate('vapor','Save Aria2 Settings'), -1)])),
                            ]),
                            _: 1,
                          },
                          8,
                          ["onMounted", "validOptions"],
                        ))
                      : gs("", !0),
                    hs(
                      a,
                      {
                        name: "custom-ytdl-settings",
                        title: OC.L10N.translate('vapor','Personal YouTube-dl Settings'),
                        onMounted: i.renderYtdl,
                        path: "/apps/vapor/personal/ytdl/save",
                        validOptions: r.ytdlOptions,
                      },
                      {
                        save: pr(() => [
                          ...(t[2] ||
                            (t[2] = [vs(OC.L10N.translate('vapor','Save Youtube-dl Settings'), -1)])),
                        ]),
                        _: 1,
                      },
                      8,
                      ["onMounted", "validOptions"],
                    ),
                  ],
                  64,
                )
              );
            },
          ],
        ]),
        fl = xa(ll),
        hl = xa(dl);
      (fl.mount("#vapor-admin-settings"),
        hl.mount("#vapor-personal-settings"),
        window.addEventListener("DOMContentLoaded", function () {
          const t = function (e) {
            let t = e.target;
            const n = function (e) {
              this.value !== e && (this.value = e);
            }.bind(t);
            f.filepicker(n);
          };
          (e("click", "#ncd_downloader_dir", t),
            e("click", "#ncd_torrents_dir", t),
            ct("#body-settings", { target: "[data-tippy-content]" }));
        }));
    })());
})();
//# sourceMappingURL=appSettings.js.map
