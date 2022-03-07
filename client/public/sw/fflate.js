!(function (f) {
  typeof module != "undefined" && typeof exports == "object"
    ? (module.exports = f())
    : typeof define != "undefined" && define.amd
    ? define(f)
    : ((typeof self != "undefined" ? self : this).fflate = f());
})(function () {
  var _e = {};
  ("use strict");
  var t = (
      typeof module != "undefined" && typeof exports == "object"
        ? function (_f) {
            "use strict";
            var e,
              t =
                ";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";
            try {
              e = require("worker_threads").Worker;
            } catch (e) {}
            exports.default = e
              ? function (r, n, o, a, s) {
                  var u = !1,
                    i = new e(r + t, { eval: !0 })
                      .on("error", function (e) {
                        return s(e, null);
                      })
                      .on("message", function (e) {
                        return s(null, e);
                      })
                      .on("exit", function (e) {
                        e && !u && s(Error("exited with code " + e), null);
                      });
                  return (
                    i.postMessage(o, a),
                    (i.terminate = function () {
                      return (u = !0), e.prototype.terminate.call(i);
                    }),
                    i
                  );
                }
              : function (e, t, r, n, o) {
                  setImmediate(function () {
                    return o(
                      Error(
                        "async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"
                      ),
                      null
                    );
                  });
                  var a = function () {};
                  return { terminate: a, postMessage: a };
                };
            return _f;
          }
        : function (_f) {
            "use strict";
            var e = {};
            _f.default = function (r, t, s, a, n) {
              var o = new Worker(
                e[t] ||
                  (e[t] = URL.createObjectURL(
                    new Blob(
                      [
                        r +
                          ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})',
                      ],
                      { type: "text/javascript" }
                    )
                  ))
              );
              return (
                (o.onmessage = function (e) {
                  var r = e.data,
                    t = r.$e$;
                  if (t) {
                    var s = Error(t[0]);
                    (s.code = t[1]), (s.stack = t[2]), n(s, null);
                  } else n(null, r);
                }),
                o.postMessage(s, a),
                o
              );
            };
            return _f;
          }
    )({}),
    n = Uint8Array,
    r = Uint16Array,
    e = Uint32Array,
    i = new n([
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5,
      5, 5, 5, 0, 0, 0, 0,
    ]),
    o = new n([
      0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
      11, 11, 12, 12, 13, 13, 0, 0,
    ]),
    a = new n([
      16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
    ]),
    s = function (t, n) {
      for (var i = new r(31), o = 0; o < 31; ++o) i[o] = n += 1 << t[o - 1];
      var a = new e(i[30]);
      for (o = 1; o < 30; ++o)
        for (var s = i[o]; s < i[o + 1]; ++s) a[s] = ((s - i[o]) << 5) | o;
      return [i, a];
    },
    u = s(i, 2),
    f = u[0],
    h = u[1];
  (f[28] = 258), (h[258] = 28);
  for (
    var c = s(o, 0), l = c[0], p = c[1], v = new r(32768), d = 0;
    d < 32768;
    ++d
  ) {
    var g = ((43690 & d) >>> 1) | ((21845 & d) << 1);
    v[d] =
      (((65280 &
        (g =
          ((61680 & (g = ((52428 & g) >>> 2) | ((13107 & g) << 2))) >>> 4) |
          ((3855 & g) << 4))) >>>
        8) |
        ((255 & g) << 8)) >>>
      1;
  }
  var y = function (t, n, e) {
      for (var i = t.length, o = 0, a = new r(n); o < i; ++o)
        t[o] && ++a[t[o] - 1];
      var s,
        u = new r(n);
      for (o = 0; o < n; ++o) u[o] = (u[o - 1] + a[o - 1]) << 1;
      if (e) {
        s = new r(1 << n);
        var f = 15 - n;
        for (o = 0; o < i; ++o)
          if (t[o])
            for (
              var h = (o << 4) | t[o],
                c = n - t[o],
                l = u[t[o] - 1]++ << c,
                p = l | ((1 << c) - 1);
              l <= p;
              ++l
            )
              s[v[l] >>> f] = h;
      } else
        for (s = new r(i), o = 0; o < i; ++o)
          t[o] && (s[o] = v[u[t[o] - 1]++] >>> (15 - t[o]));
      return s;
    },
    m = new n(288);
  for (d = 0; d < 144; ++d) m[d] = 8;
  for (d = 144; d < 256; ++d) m[d] = 9;
  for (d = 256; d < 280; ++d) m[d] = 7;
  for (d = 280; d < 288; ++d) m[d] = 8;
  var w = new n(32);
  for (d = 0; d < 32; ++d) w[d] = 5;
  var x = y(m, 9, 0),
    b = y(m, 9, 1),
    z = y(w, 5, 0),
    k = y(w, 5, 1),
    M = function (t) {
      for (var n = t[0], r = 1; r < t.length; ++r) t[r] > n && (n = t[r]);
      return n;
    },
    S = function (t, n, r) {
      var e = (n / 8) | 0;
      return ((t[e] | (t[e + 1] << 8)) >> (7 & n)) & r;
    },
    T = function (t, n) {
      var r = (n / 8) | 0;
      return (t[r] | (t[r + 1] << 8) | (t[r + 2] << 16)) >> (7 & n);
    },
    A = function (t) {
      return ((t + 7) / 8) | 0;
    },
    E = function (t, i, o) {
      (null == i || i < 0) && (i = 0),
        (null == o || o > t.length) && (o = t.length);
      var a = new (
        2 == t.BYTES_PER_ELEMENT ? r : 4 == t.BYTES_PER_ELEMENT ? e : n
      )(o - i);
      return a.set(t.subarray(i, o)), a;
    };
  _e.FlateErrorCode = {
    UnexpectedEOF: 0,
    InvalidBlockType: 1,
    InvalidLengthLiteral: 2,
    InvalidDistance: 3,
    StreamFinished: 4,
    NoStreamHandler: 5,
    InvalidHeader: 6,
    NoCallback: 7,
    InvalidUTF8: 8,
    ExtraFieldTooLong: 9,
    InvalidDate: 10,
    FilenameTooLong: 11,
    StreamFinishing: 12,
    InvalidZipData: 13,
    UnknownCompressionMethod: 14,
  };
  var D = [
      "unexpected EOF",
      "invalid block type",
      "invalid length/literal",
      "invalid distance",
      "stream finished",
      "no stream handler",
      ,
      "no callback",
      "invalid UTF-8 data",
      "extra field too long",
      "date not in range 1980-2099",
      "filename too long",
      "stream finishing",
      "invalid zip data",
    ],
    C = function (t, n, r) {
      var e = Error(n || D[t]);
      if (
        ((e.code = t),
        Error.captureStackTrace && Error.captureStackTrace(e, C),
        !r)
      )
        throw e;
      return e;
    },
    U = function (t, r, e) {
      var s = t.length;
      if (!s || (e && e.f && !e.l)) return r || new n(0);
      var u = !r || e,
        h = !e || e.i;
      e || (e = {}), r || (r = new n(3 * s));
      var c = function (t) {
          var e = r.length;
          if (t > e) {
            var i = new n(Math.max(2 * e, t));
            i.set(r), (r = i);
          }
        },
        p = e.f || 0,
        v = e.p || 0,
        d = e.b || 0,
        g = e.l,
        m = e.d,
        w = e.m,
        x = e.n,
        z = 8 * s;
      do {
        if (!g) {
          p = S(t, v, 1);
          var D = S(t, v + 1, 3);
          if (((v += 3), !D)) {
            var U = t[(B = A(v) + 4) - 4] | (t[B - 3] << 8),
              I = B + U;
            if (I > s) {
              h && C(0);
              break;
            }
            u && c(d + U),
              r.set(t.subarray(B, I), d),
              (e.b = d += U),
              (e.p = v = 8 * I),
              (e.f = p);
            continue;
          }
          if (1 == D) (g = b), (m = k), (w = 9), (x = 5);
          else if (2 == D) {
            var F = S(t, v, 31) + 257,
              Z = S(t, v + 10, 15) + 4,
              O = F + S(t, v + 5, 31) + 1;
            v += 14;
            for (var G = new n(O), L = new n(19), N = 0; N < Z; ++N)
              L[a[N]] = S(t, v + 3 * N, 7);
            v += 3 * Z;
            var P = M(L),
              _ = (1 << P) - 1,
              q = y(L, P, 1);
            for (N = 0; N < O; ) {
              var B,
                H = q[S(t, v, _)];
              if (((v += 15 & H), (B = H >>> 4) < 16)) G[N++] = B;
              else {
                var Y = 0,
                  j = 0;
                for (
                  16 == B
                    ? ((j = 3 + S(t, v, 3)), (v += 2), (Y = G[N - 1]))
                    : 17 == B
                    ? ((j = 3 + S(t, v, 7)), (v += 3))
                    : 18 == B && ((j = 11 + S(t, v, 127)), (v += 7));
                  j--;

                )
                  G[N++] = Y;
              }
            }
            var R = G.subarray(0, F),
              J = G.subarray(F);
            (w = M(R)), (x = M(J)), (g = y(R, w, 1)), (m = y(J, x, 1));
          } else C(1);
          if (v > z) {
            h && C(0);
            break;
          }
        }
        u && c(d + 131072);
        for (var K = (1 << w) - 1, Q = (1 << x) - 1, V = v; ; V = v) {
          var W = (Y = g[T(t, v) & K]) >>> 4;
          if ((v += 15 & Y) > z) {
            h && C(0);
            break;
          }
          if ((Y || C(2), W < 256)) r[d++] = W;
          else {
            if (256 == W) {
              (V = v), (g = null);
              break;
            }
            var X = W - 254;
            W > 264 &&
              ((X = S(t, v, (1 << (nt = i[(N = W - 257)])) - 1) + f[N]),
              (v += nt));
            var $ = m[T(t, v) & Q],
              tt = $ >>> 4;
            if (($ || C(3), (v += 15 & $), (J = l[tt]), tt > 3)) {
              var nt = o[tt];
              (J += T(t, v) & ((1 << nt) - 1)), (v += nt);
            }
            if (v > z) {
              h && C(0);
              break;
            }
            u && c(d + 131072);
            for (var rt = d + X; d < rt; d += 4)
              (r[d] = r[d - J]),
                (r[d + 1] = r[d + 1 - J]),
                (r[d + 2] = r[d + 2 - J]),
                (r[d + 3] = r[d + 3 - J]);
            d = rt;
          }
        }
        (e.l = g),
          (e.p = V),
          (e.b = d),
          (e.f = p),
          g && ((p = 1), (e.m = w), (e.d = m), (e.n = x));
      } while (!p);
      return d == r.length ? r : E(r, 0, d);
    },
    I = function (t, n, r) {
      var e = (n / 8) | 0;
      (t[e] |= r <<= 7 & n), (t[e + 1] |= r >>> 8);
    },
    F = function (t, n, r) {
      var e = (n / 8) | 0;
      (t[e] |= r <<= 7 & n), (t[e + 1] |= r >>> 8), (t[e + 2] |= r >>> 16);
    },
    Z = function (t, e) {
      for (var i = [], o = 0; o < t.length; ++o)
        t[o] && i.push({ s: o, f: t[o] });
      var a = i.length,
        s = i.slice();
      if (!a) return [q, 0];
      if (1 == a) {
        var u = new n(i[0].s + 1);
        return (u[i[0].s] = 1), [u, 1];
      }
      i.sort(function (t, n) {
        return t.f - n.f;
      }),
        i.push({ s: -1, f: 25001 });
      var f = i[0],
        h = i[1],
        c = 0,
        l = 1,
        p = 2;
      for (i[0] = { s: -1, f: f.f + h.f, l: f, r: h }; l != a - 1; )
        (f = i[i[c].f < i[p].f ? c++ : p++]),
          (h = i[c != l && i[c].f < i[p].f ? c++ : p++]),
          (i[l++] = { s: -1, f: f.f + h.f, l: f, r: h });
      var v = s[0].s;
      for (o = 1; o < a; ++o) s[o].s > v && (v = s[o].s);
      var d = new r(v + 1),
        g = O(i[l - 1], d, 0);
      if (g > e) {
        o = 0;
        var y = 0,
          m = g - e,
          w = 1 << m;
        for (
          s.sort(function (t, n) {
            return d[n.s] - d[t.s] || t.f - n.f;
          });
          o < a;
          ++o
        ) {
          var x = s[o].s;
          if (!(d[x] > e)) break;
          (y += w - (1 << (g - d[x]))), (d[x] = e);
        }
        for (y >>>= m; y > 0; ) {
          var b = s[o].s;
          d[b] < e ? (y -= 1 << (e - d[b]++ - 1)) : ++o;
        }
        for (; o >= 0 && y; --o) {
          var z = s[o].s;
          d[z] == e && (--d[z], ++y);
        }
        g = e;
      }
      return [new n(d), g];
    },
    O = function (t, n, r) {
      return -1 == t.s
        ? Math.max(O(t.l, n, r + 1), O(t.r, n, r + 1))
        : (n[t.s] = r);
    },
    G = function (t) {
      for (var n = t.length; n && !t[--n]; );
      for (
        var e = new r(++n),
          i = 0,
          o = t[0],
          a = 1,
          s = function (t) {
            e[i++] = t;
          },
          u = 1;
        u <= n;
        ++u
      )
        if (t[u] == o && u != n) ++a;
        else {
          if (!o && a > 2) {
            for (; a > 138; a -= 138) s(32754);
            a > 2 &&
              (s(a > 10 ? ((a - 11) << 5) | 28690 : ((a - 3) << 5) | 12305),
              (a = 0));
          } else if (a > 3) {
            for (s(o), --a; a > 6; a -= 6) s(8304);
            a > 2 && (s(((a - 3) << 5) | 8208), (a = 0));
          }
          for (; a--; ) s(o);
          (a = 1), (o = t[u]);
        }
      return [e.subarray(0, i), n];
    },
    L = function (t, n) {
      for (var r = 0, e = 0; e < n.length; ++e) r += t[e] * n[e];
      return r;
    },
    N = function (t, n, r) {
      var e = r.length,
        i = A(n + 2);
      (t[i] = 255 & e),
        (t[i + 1] = e >>> 8),
        (t[i + 2] = 255 ^ t[i]),
        (t[i + 3] = 255 ^ t[i + 1]);
      for (var o = 0; o < e; ++o) t[i + o + 4] = r[o];
      return 8 * (i + 4 + e);
    },
    P = function (t, n, e, s, u, f, h, c, l, p, v) {
      I(n, v++, e), ++u[256];
      for (
        var d = Z(u, 15),
          g = d[0],
          b = d[1],
          k = Z(f, 15),
          M = k[0],
          S = k[1],
          T = G(g),
          A = T[0],
          E = T[1],
          D = G(M),
          C = D[0],
          U = D[1],
          O = new r(19),
          P = 0;
        P < A.length;
        ++P
      )
        O[31 & A[P]]++;
      for (P = 0; P < C.length; ++P) O[31 & C[P]]++;
      for (
        var _ = Z(O, 7), q = _[0], B = _[1], H = 19;
        H > 4 && !q[a[H - 1]];
        --H
      );
      var Y,
        j,
        R,
        J,
        K = (p + 5) << 3,
        Q = L(u, m) + L(f, w) + h,
        V =
          L(u, g) +
          L(f, M) +
          h +
          14 +
          3 * H +
          L(O, q) +
          (2 * O[16] + 3 * O[17] + 7 * O[18]);
      if (K <= Q && K <= V) return N(n, v, t.subarray(l, l + p));
      if ((I(n, v, 1 + (V < Q)), (v += 2), V < Q)) {
        (Y = y(g, b, 0)), (j = g), (R = y(M, S, 0)), (J = M);
        var W = y(q, B, 0);
        for (
          I(n, v, E - 257),
            I(n, v + 5, U - 1),
            I(n, v + 10, H - 4),
            v += 14,
            P = 0;
          P < H;
          ++P
        )
          I(n, v + 3 * P, q[a[P]]);
        v += 3 * H;
        for (var X = [A, C], $ = 0; $ < 2; ++$) {
          var tt = X[$];
          for (P = 0; P < tt.length; ++P)
            I(n, v, W[(nt = 31 & tt[P])]),
              (v += q[nt]),
              nt > 15 && (I(n, v, (tt[P] >>> 5) & 127), (v += tt[P] >>> 12));
        }
      } else (Y = x), (j = m), (R = z), (J = w);
      for (P = 0; P < c; ++P)
        if (s[P] > 255) {
          var nt;
          F(n, v, Y[257 + (nt = (s[P] >>> 18) & 31)]),
            (v += j[nt + 257]),
            nt > 7 && (I(n, v, (s[P] >>> 23) & 31), (v += i[nt]));
          var rt = 31 & s[P];
          F(n, v, R[rt]),
            (v += J[rt]),
            rt > 3 && (F(n, v, (s[P] >>> 5) & 8191), (v += o[rt]));
        } else F(n, v, Y[s[P]]), (v += j[s[P]]);
      return F(n, v, Y[256]), v + j[256];
    },
    _ = new e([
      65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632,
    ]),
    q = new n(0),
    B = function (t, a, s, u, f, c) {
      var l = t.length,
        v = new n(u + l + 5 * (1 + Math.ceil(l / 7e3)) + f),
        d = v.subarray(u, v.length - f),
        g = 0;
      if (!a || l < 8)
        for (var y = 0; y <= l; y += 65535) {
          var m = y + 65535;
          m >= l && (d[g >> 3] = c), (g = N(d, g + 1, t.subarray(y, m)));
        }
      else {
        for (
          var w = _[a - 1],
            x = w >>> 13,
            b = 8191 & w,
            z = (1 << s) - 1,
            k = new r(32768),
            M = new r(z + 1),
            S = Math.ceil(s / 3),
            T = 2 * S,
            D = function (n) {
              return (t[n] ^ (t[n + 1] << S) ^ (t[n + 2] << T)) & z;
            },
            C = new e(25e3),
            U = new r(288),
            I = new r(32),
            F = 0,
            Z = 0,
            O = ((y = 0), 0),
            G = 0,
            L = 0;
          y < l;
          ++y
        ) {
          var B = D(y),
            H = 32767 & y,
            Y = M[B];
          if (((k[H] = Y), (M[B] = H), G <= y)) {
            var j = l - y;
            if ((F > 7e3 || O > 24576) && j > 423) {
              (g = P(t, d, 0, C, U, I, Z, O, L, y - L, g)),
                (O = F = Z = 0),
                (L = y);
              for (var R = 0; R < 286; ++R) U[R] = 0;
              for (R = 0; R < 30; ++R) I[R] = 0;
            }
            var J = 2,
              K = 0,
              Q = b,
              V = (H - Y) & 32767;
            if (j > 2 && B == D(y - V))
              for (
                var W = Math.min(x, j) - 1,
                  X = Math.min(32767, y),
                  $ = Math.min(258, j);
                V <= X && --Q && H != Y;

              ) {
                if (t[y + J] == t[y + J - V]) {
                  for (var tt = 0; tt < $ && t[y + tt] == t[y + tt - V]; ++tt);
                  if (tt > J) {
                    if (((J = tt), (K = V), tt > W)) break;
                    var nt = Math.min(V, tt - 2),
                      rt = 0;
                    for (R = 0; R < nt; ++R) {
                      var et = (y - V + R + 32768) & 32767,
                        it = (et - k[et] + 32768) & 32767;
                      it > rt && ((rt = it), (Y = et));
                    }
                  }
                }
                V += ((H = Y) - (Y = k[H]) + 32768) & 32767;
              }
            if (K) {
              C[O++] = 268435456 | (h[J] << 18) | p[K];
              var ot = 31 & h[J],
                at = 31 & p[K];
              (Z += i[ot] + o[at]), ++U[257 + ot], ++I[at], (G = y + J), ++F;
            } else (C[O++] = t[y]), ++U[t[y]];
          }
        }
        (g = P(t, d, c, C, U, I, Z, O, L, y - L, g)),
          !c && 7 & g && (g = N(d, g + 1, q));
      }
      return E(v, 0, u + A(g) + f);
    },
    H = (function () {
      for (var t = new Int32Array(256), n = 0; n < 256; ++n) {
        for (var r = n, e = 9; --e; ) r = (1 & r && -306674912) ^ (r >>> 1);
        t[n] = r;
      }
      return t;
    })(),
    Y = function () {
      var t = -1;
      return {
        p: function (n) {
          for (var r = t, e = 0; e < n.length; ++e)
            r = H[(255 & r) ^ n[e]] ^ (r >>> 8);
          t = r;
        },
        d: function () {
          return ~t;
        },
      };
    },
    j = function () {
      var t = 1,
        n = 0;
      return {
        p: function (r) {
          for (var e = t, i = n, o = 0 | r.length, a = 0; a != o; ) {
            for (var s = Math.min(a + 2655, o); a < s; ++a) i += e += r[a];
            (e = (65535 & e) + 15 * (e >> 16)),
              (i = (65535 & i) + 15 * (i >> 16));
          }
          (t = e), (n = i);
        },
        d: function () {
          return (
            ((255 & (t %= 65521)) << 24) |
            ((t >>> 8) << 16) |
            ((255 & (n %= 65521)) << 8) |
            (n >>> 8)
          );
        },
      };
    },
    R = function (t, n, r, e, i) {
      return B(
        t,
        null == n.level ? 6 : n.level,
        null == n.mem
          ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(t.length))))
          : 12 + n.mem,
        r,
        e,
        !i
      );
    },
    J = function (t, n) {
      var r = {};
      for (var e in t) r[e] = t[e];
      for (var e in n) r[e] = n[e];
      return r;
    },
    K = function (t, n, r) {
      for (
        var e = t(),
          i = "" + t,
          o = i
            .slice(i.indexOf("[") + 1, i.lastIndexOf("]"))
            .replace(/\s+/g, "")
            .split(","),
          a = 0;
        a < e.length;
        ++a
      ) {
        var s = e[a],
          u = o[a];
        if ("function" == typeof s) {
          n += ";" + u + "=";
          var f = "" + s;
          if (s.prototype)
            if (-1 != f.indexOf("[native code]")) {
              var h = f.indexOf(" ", 8) + 1;
              n += f.slice(h, f.indexOf("(", h));
            } else
              for (var c in ((n += f), s.prototype))
                n += ";" + u + ".prototype." + c + "=" + s.prototype[c];
          else n += f;
        } else r[u] = s;
      }
      return [n, r];
    },
    Q = [],
    V = function (t) {
      var n = [];
      for (var r in t)
        t[r].buffer && n.push((t[r] = new t[r].constructor(t[r])).buffer);
      return n;
    },
    W = function (n, r, e, i) {
      var o;
      if (!Q[e]) {
        for (var a = "", s = {}, u = n.length - 1, f = 0; f < u; ++f)
          (a = (o = K(n[f], a, s))[0]), (s = o[1]);
        Q[e] = K(n[u], a, s);
      }
      var h = J({}, Q[e][1]);
      return t.default(
        Q[e][0] +
          ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" +
          r +
          "}",
        e,
        h,
        V(h),
        i
      );
    },
    X = function () {
      return [
        n,
        r,
        e,
        i,
        o,
        a,
        f,
        l,
        b,
        k,
        v,
        D,
        y,
        M,
        S,
        T,
        A,
        E,
        C,
        U,
        At,
        it,
        ot,
      ];
    },
    $ = function () {
      return [
        n,
        r,
        e,
        i,
        o,
        a,
        h,
        p,
        x,
        m,
        z,
        w,
        v,
        _,
        q,
        y,
        I,
        F,
        Z,
        O,
        G,
        L,
        N,
        P,
        A,
        E,
        B,
        R,
        kt,
        it,
      ];
    },
    tt = function () {
      return [pt, gt, lt, Y, H];
    },
    nt = function () {
      return [vt, dt];
    },
    rt = function () {
      return [yt, lt, j];
    },
    et = function () {
      return [mt];
    },
    it = function (t) {
      return postMessage(t, [t.buffer]);
    },
    ot = function (t) {
      return t && t.size && new n(t.size);
    },
    at = function (t, n, r, e, i, o) {
      var a = W(r, e, i, function (t, n) {
        a.terminate(), o(t, n);
      });
      return (
        a.postMessage([t, n], n.consume ? [t.buffer] : []),
        function () {
          a.terminate();
        }
      );
    },
    st = function (t) {
      return (
        (t.ondata = function (t, n) {
          return postMessage([t, n], [t.buffer]);
        }),
        function (n) {
          return t.push(n.data[0], n.data[1]);
        }
      );
    },
    ut = function (t, n, r, e, i) {
      var o,
        a = W(t, e, i, function (t, r) {
          t
            ? (a.terminate(), n.ondata.call(n, t))
            : (r[1] && a.terminate(), n.ondata.call(n, t, r[0], r[1]));
        });
      a.postMessage(r),
        (n.push = function (t, r) {
          n.ondata || C(5),
            o && n.ondata(C(4, 0, 1), null, !!r),
            a.postMessage([t, (o = r)], [t.buffer]);
        }),
        (n.terminate = function () {
          a.terminate();
        });
    },
    ft = function (t, n) {
      return t[n] | (t[n + 1] << 8);
    },
    ht = function (t, n) {
      return (
        (t[n] | (t[n + 1] << 8) | (t[n + 2] << 16) | (t[n + 3] << 24)) >>> 0
      );
    },
    ct = function (t, n) {
      return ht(t, n) + 4294967296 * ht(t, n + 4);
    },
    lt = function (t, n, r) {
      for (; r; ++n) (t[n] = r), (r >>>= 8);
    },
    pt = function (t, n) {
      var r = n.filename;
      if (
        ((t[0] = 31),
        (t[1] = 139),
        (t[2] = 8),
        (t[8] = n.level < 2 ? 4 : 9 == n.level ? 2 : 0),
        (t[9] = 3),
        0 != n.mtime &&
          lt(t, 4, Math.floor(new Date(n.mtime || Date.now()) / 1e3)),
        r)
      ) {
        t[3] = 8;
        for (var e = 0; e <= r.length; ++e) t[e + 10] = r.charCodeAt(e);
      }
    },
    vt = function (t) {
      (31 == t[0] && 139 == t[1] && 8 == t[2]) || C(6, "invalid gzip data");
      var n = t[3],
        r = 10;
      4 & n && (r += t[10] | (2 + (t[11] << 8)));
      for (var e = ((n >> 3) & 1) + ((n >> 4) & 1); e > 0; e -= !t[r++]);
      return r + (2 & n);
    },
    dt = function (t) {
      var n = t.length;
      return (
        (t[n - 4] | (t[n - 3] << 8) | (t[n - 2] << 16) | (t[n - 1] << 24)) >>> 0
      );
    },
    gt = function (t) {
      return 10 + ((t.filename && t.filename.length + 1) || 0);
    },
    yt = function (t, n) {
      var r = n.level,
        e = 0 == r ? 0 : r < 6 ? 1 : 9 == r ? 3 : 2;
      (t[0] = 120), (t[1] = (e << 6) | (e ? 32 - 2 * e : 1));
    },
    mt = function (t) {
      (8 != (15 & t[0]) || t[0] >>> 4 > 7 || ((t[0] << 8) | t[1]) % 31) &&
        C(6, "invalid zlib data"),
        32 & t[1] &&
          C(6, "invalid zlib data: preset dictionaries not supported");
    };
  function wt(t, n) {
    return (
      n || "function" != typeof t || ((n = t), (t = {})), (this.ondata = n), t
    );
  }
  var xt = (function () {
    function t(t, n) {
      n || "function" != typeof t || ((n = t), (t = {})),
        (this.ondata = n),
        (this.o = t || {});
    }
    return (
      (t.prototype.p = function (t, n) {
        this.ondata(R(t, this.o, 0, 0, !n), n);
      }),
      (t.prototype.push = function (t, n) {
        this.ondata || C(5), this.d && C(4), (this.d = n), this.p(t, n || !1);
      }),
      t
    );
  })();
  _e.Deflate = xt;
  var bt = (function () {
    return function (t, n) {
      ut(
        [
          $,
          function () {
            return [st, xt];
          },
        ],
        this,
        wt.call(this, t, n),
        function (t) {
          var n = new xt(t.data);
          onmessage = st(n);
        },
        6
      );
    };
  })();
  function zt(t, n, r) {
    return (
      r || ((r = n), (n = {})),
      "function" != typeof r && C(7),
      at(
        t,
        n,
        [$],
        function (t) {
          return it(kt(t.data[0], t.data[1]));
        },
        0,
        r
      )
    );
  }
  function kt(t, n) {
    return R(t, n || {}, 0, 0);
  }
  (_e.AsyncDeflate = bt), (_e.deflate = zt), (_e.deflateSync = kt);
  var Mt = (function () {
    function t(t) {
      (this.s = {}), (this.p = new n(0)), (this.ondata = t);
    }
    return (
      (t.prototype.e = function (t) {
        this.ondata || C(5), this.d && C(4);
        var r = this.p.length,
          e = new n(r + t.length);
        e.set(this.p), e.set(t, r), (this.p = e);
      }),
      (t.prototype.c = function (t) {
        this.d = this.s.i = t || !1;
        var n = this.s.b,
          r = U(this.p, this.o, this.s);
        this.ondata(E(r, n, this.s.b), this.d),
          (this.o = E(r, this.s.b - 32768)),
          (this.s.b = this.o.length),
          (this.p = E(this.p, (this.s.p / 8) | 0)),
          (this.s.p &= 7);
      }),
      (t.prototype.push = function (t, n) {
        this.e(t), this.c(n);
      }),
      t
    );
  })();
  _e.Inflate = Mt;
  var St = (function () {
    return function (t) {
      (this.ondata = t),
        ut(
          [
            X,
            function () {
              return [st, Mt];
            },
          ],
          this,
          0,
          function () {
            var t = new Mt();
            onmessage = st(t);
          },
          7
        );
    };
  })();
  function Tt(t, n, r) {
    return (
      r || ((r = n), (n = {})),
      "function" != typeof r && C(7),
      at(
        t,
        n,
        [X],
        function (t) {
          return it(At(t.data[0], ot(t.data[1])));
        },
        1,
        r
      )
    );
  }
  function At(t, n) {
    return U(t, n);
  }
  (_e.AsyncInflate = St), (_e.inflate = Tt), (_e.inflateSync = At);
  var Et = (function () {
    function t(t, n) {
      (this.c = Y()), (this.l = 0), (this.v = 1), xt.call(this, t, n);
    }
    return (
      (t.prototype.push = function (t, n) {
        xt.prototype.push.call(this, t, n);
      }),
      (t.prototype.p = function (t, n) {
        this.c.p(t), (this.l += t.length);
        var r = R(t, this.o, this.v && gt(this.o), n && 8, !n);
        this.v && (pt(r, this.o), (this.v = 0)),
          n && (lt(r, r.length - 8, this.c.d()), lt(r, r.length - 4, this.l)),
          this.ondata(r, n);
      }),
      t
    );
  })();
  (_e.Gzip = Et), (_e.Compress = Et);
  var Dt = (function () {
    return function (t, n) {
      ut(
        [
          $,
          tt,
          function () {
            return [st, xt, Et];
          },
        ],
        this,
        wt.call(this, t, n),
        function (t) {
          var n = new Et(t.data);
          onmessage = st(n);
        },
        8
      );
    };
  })();
  function Ct(t, n, r) {
    return (
      r || ((r = n), (n = {})),
      "function" != typeof r && C(7),
      at(
        t,
        n,
        [
          $,
          tt,
          function () {
            return [Ut];
          },
        ],
        function (t) {
          return it(Ut(t.data[0], t.data[1]));
        },
        2,
        r
      )
    );
  }
  function Ut(t, n) {
    n || (n = {});
    var r = Y(),
      e = t.length;
    r.p(t);
    var i = R(t, n, gt(n), 8),
      o = i.length;
    return pt(i, n), lt(i, o - 8, r.d()), lt(i, o - 4, e), i;
  }
  (_e.AsyncGzip = Dt),
    (_e.AsyncCompress = Dt),
    (_e.gzip = Ct),
    (_e.compress = Ct),
    (_e.gzipSync = Ut),
    (_e.compressSync = Ut);
  var It = (function () {
    function t(t) {
      (this.v = 1), Mt.call(this, t);
    }
    return (
      (t.prototype.push = function (t, n) {
        if ((Mt.prototype.e.call(this, t), this.v)) {
          var r = this.p.length > 3 ? vt(this.p) : 4;
          if (r >= this.p.length && !n) return;
          (this.p = this.p.subarray(r)), (this.v = 0);
        }
        n &&
          (this.p.length < 8 && C(6, "invalid gzip data"),
          (this.p = this.p.subarray(0, -8))),
          Mt.prototype.c.call(this, n);
      }),
      t
    );
  })();
  _e.Gunzip = It;
  var Ft = (function () {
    return function (t) {
      (this.ondata = t),
        ut(
          [
            X,
            nt,
            function () {
              return [st, Mt, It];
            },
          ],
          this,
          0,
          function () {
            var t = new It();
            onmessage = st(t);
          },
          9
        );
    };
  })();
  function Zt(t, n, r) {
    return (
      r || ((r = n), (n = {})),
      "function" != typeof r && C(7),
      at(
        t,
        n,
        [
          X,
          nt,
          function () {
            return [Ot];
          },
        ],
        function (t) {
          return it(Ot(t.data[0]));
        },
        3,
        r
      )
    );
  }
  function Ot(t, r) {
    return U(t.subarray(vt(t), -8), r || new n(dt(t)));
  }
  (_e.AsyncGunzip = Ft), (_e.gunzip = Zt), (_e.gunzipSync = Ot);
  var Gt = (function () {
    function t(t, n) {
      (this.c = j()), (this.v = 1), xt.call(this, t, n);
    }
    return (
      (t.prototype.push = function (t, n) {
        xt.prototype.push.call(this, t, n);
      }),
      (t.prototype.p = function (t, n) {
        this.c.p(t);
        var r = R(t, this.o, this.v && 2, n && 4, !n);
        this.v && (yt(r, this.o), (this.v = 0)),
          n && lt(r, r.length - 4, this.c.d()),
          this.ondata(r, n);
      }),
      t
    );
  })();
  _e.Zlib = Gt;
  var Lt = (function () {
    return function (t, n) {
      ut(
        [
          $,
          rt,
          function () {
            return [st, xt, Gt];
          },
        ],
        this,
        wt.call(this, t, n),
        function (t) {
          var n = new Gt(t.data);
          onmessage = st(n);
        },
        10
      );
    };
  })();
  function Nt(t, n, r) {
    return (
      r || ((r = n), (n = {})),
      "function" != typeof r && C(7),
      at(
        t,
        n,
        [
          $,
          rt,
          function () {
            return [Pt];
          },
        ],
        function (t) {
          return it(Pt(t.data[0], t.data[1]));
        },
        4,
        r
      )
    );
  }
  function Pt(t, n) {
    n || (n = {});
    var r = j();
    r.p(t);
    var e = R(t, n, 2, 4);
    return yt(e, n), lt(e, e.length - 4, r.d()), e;
  }
  (_e.AsyncZlib = Lt), (_e.zlib = Nt), (_e.zlibSync = Pt);
  var _t = (function () {
    function t(t) {
      (this.v = 1), Mt.call(this, t);
    }
    return (
      (t.prototype.push = function (t, n) {
        if ((Mt.prototype.e.call(this, t), this.v)) {
          if (this.p.length < 2 && !n) return;
          (this.p = this.p.subarray(2)), (this.v = 0);
        }
        n &&
          (this.p.length < 4 && C(6, "invalid zlib data"),
          (this.p = this.p.subarray(0, -4))),
          Mt.prototype.c.call(this, n);
      }),
      t
    );
  })();
  _e.Unzlib = _t;
  var qt = (function () {
    return function (t) {
      (this.ondata = t),
        ut(
          [
            X,
            et,
            function () {
              return [st, Mt, _t];
            },
          ],
          this,
          0,
          function () {
            var t = new _t();
            onmessage = st(t);
          },
          11
        );
    };
  })();
  function Bt(t, n, r) {
    return (
      r || ((r = n), (n = {})),
      "function" != typeof r && C(7),
      at(
        t,
        n,
        [
          X,
          et,
          function () {
            return [Ht];
          },
        ],
        function (t) {
          return it(Ht(t.data[0], ot(t.data[1])));
        },
        5,
        r
      )
    );
  }
  function Ht(t, n) {
    return U((mt(t), t.subarray(2, -4)), n);
  }
  (_e.AsyncUnzlib = qt), (_e.unzlib = Bt), (_e.unzlibSync = Ht);
  var Yt = (function () {
    function t(t) {
      (this.G = It), (this.I = Mt), (this.Z = _t), (this.ondata = t);
    }
    return (
      (t.prototype.push = function (t, r) {
        if ((this.ondata || C(5), this.s)) this.s.push(t, r);
        else {
          if (this.p && this.p.length) {
            var e = new n(this.p.length + t.length);
            e.set(this.p), e.set(t, this.p.length);
          } else this.p = t;
          if (this.p.length > 2) {
            var i = this,
              o = function () {
                i.ondata.apply(i, arguments);
              };
            (this.s =
              31 == this.p[0] && 139 == this.p[1] && 8 == this.p[2]
                ? new this.G(o)
                : 8 != (15 & this.p[0]) ||
                  this.p[0] >> 4 > 7 ||
                  ((this.p[0] << 8) | this.p[1]) % 31
                ? new this.I(o)
                : new this.Z(o)),
              this.s.push(this.p, r),
              (this.p = null);
          }
        }
      }),
      t
    );
  })();
  _e.Decompress = Yt;
  var jt = (function () {
    function t(t) {
      (this.G = Ft), (this.I = St), (this.Z = qt), (this.ondata = t);
    }
    return (
      (t.prototype.push = function (t, n) {
        Yt.prototype.push.call(this, t, n);
      }),
      t
    );
  })();
  function Rt(t, n, r) {
    return (
      r || ((r = n), (n = {})),
      "function" != typeof r && C(7),
      31 == t[0] && 139 == t[1] && 8 == t[2]
        ? Zt(t, n, r)
        : 8 != (15 & t[0]) || t[0] >> 4 > 7 || ((t[0] << 8) | t[1]) % 31
        ? Tt(t, n, r)
        : Bt(t, n, r)
    );
  }
  function Jt(t, n) {
    return 31 == t[0] && 139 == t[1] && 8 == t[2]
      ? Ot(t, n)
      : 8 != (15 & t[0]) || t[0] >> 4 > 7 || ((t[0] << 8) | t[1]) % 31
      ? At(t, n)
      : Ht(t, n);
  }
  (_e.AsyncDecompress = jt), (_e.decompress = Rt), (_e.decompressSync = Jt);
  var Kt = function (t, r, e, i) {
      for (var o in t) {
        var a = t[o],
          s = r + o,
          u = i;
        Array.isArray(a) && ((u = J(i, a[1])), (a = a[0])),
          a instanceof n
            ? (e[s] = [a, u])
            : ((e[(s += "/")] = [new n(0), u]), Kt(a, s, e, i));
      }
    },
    Qt = "undefined" != typeof TextEncoder && new TextEncoder(),
    Vt = "undefined" != typeof TextDecoder && new TextDecoder(),
    Wt = 0;
  try {
    Vt.decode(q, { stream: !0 }), (Wt = 1);
  } catch (t) {}
  var Xt = function (t) {
      for (var n = "", r = 0; ; ) {
        var e = t[r++],
          i = (e > 127) + (e > 223) + (e > 239);
        if (r + i > t.length) return [n, E(t, r - 1)];
        i
          ? 3 == i
            ? ((e =
                (((15 & e) << 18) |
                  ((63 & t[r++]) << 12) |
                  ((63 & t[r++]) << 6) |
                  (63 & t[r++])) -
                65536),
              (n += String.fromCharCode(55296 | (e >> 10), 56320 | (1023 & e))))
            : (n += String.fromCharCode(
                1 & i
                  ? ((31 & e) << 6) | (63 & t[r++])
                  : ((15 & e) << 12) | ((63 & t[r++]) << 6) | (63 & t[r++])
              ))
          : (n += String.fromCharCode(e));
      }
    },
    $t = (function () {
      function t(t) {
        (this.ondata = t), Wt ? (this.t = new TextDecoder()) : (this.p = q);
      }
      return (
        (t.prototype.push = function (t, r) {
          if ((this.ondata || C(5), (r = !!r), this.t))
            return (
              this.ondata(this.t.decode(t, { stream: !0 }), r),
              void (r && (this.t.decode().length && C(8), (this.t = null)))
            );
          this.p || C(4);
          var e = new n(this.p.length + t.length);
          e.set(this.p), e.set(t, this.p.length);
          var i = Xt(e),
            o = i[0],
            a = i[1];
          r ? (a.length && C(8), (this.p = null)) : (this.p = a),
            this.ondata(o, r);
        }),
        t
      );
    })();
  _e.DecodeUTF8 = $t;
  var tn = (function () {
    function t(t) {
      this.ondata = t;
    }
    return (
      (t.prototype.push = function (t, n) {
        this.ondata || C(5),
          this.d && C(4),
          this.ondata(nn(t), (this.d = n || !1));
      }),
      t
    );
  })();
  function nn(t, r) {
    if (r) {
      for (var e = new n(t.length), i = 0; i < t.length; ++i)
        e[i] = t.charCodeAt(i);
      return e;
    }
    if (Qt) return Qt.encode(t);
    var o = t.length,
      a = new n(t.length + (t.length >> 1)),
      s = 0,
      u = function (t) {
        a[s++] = t;
      };
    for (i = 0; i < o; ++i) {
      if (s + 5 > a.length) {
        var f = new n(s + 8 + ((o - i) << 1));
        f.set(a), (a = f);
      }
      var h = t.charCodeAt(i);
      h < 128 || r
        ? u(h)
        : h < 2048
        ? (u(192 | (h >> 6)), u(128 | (63 & h)))
        : h > 55295 && h < 57344
        ? (u(
            240 |
              ((h = (65536 + (1047552 & h)) | (1023 & t.charCodeAt(++i))) >> 18)
          ),
          u(128 | ((h >> 12) & 63)),
          u(128 | ((h >> 6) & 63)),
          u(128 | (63 & h)))
        : (u(224 | (h >> 12)), u(128 | ((h >> 6) & 63)), u(128 | (63 & h)));
    }
    return E(a, 0, s);
  }
  function rn(t, n) {
    if (n) {
      for (var r = "", e = 0; e < t.length; e += 16384)
        r += String.fromCharCode.apply(null, t.subarray(e, e + 16384));
      return r;
    }
    if (Vt) return Vt.decode(t);
    var i = Xt(t),
      o = i[0];
    return i[1].length && C(8), o;
  }
  (_e.EncodeUTF8 = tn), (_e.strToU8 = nn), (_e.strFromU8 = rn);
  var en = function (t) {
      return 1 == t ? 3 : t < 6 ? 2 : 9 == t ? 1 : 0;
    },
    on = function (t, n) {
      return n + 30 + ft(t, n + 26) + ft(t, n + 28);
    },
    an = function (t, n, r) {
      var e = ft(t, n + 28),
        i = rn(t.subarray(n + 46, n + 46 + e), !(2048 & ft(t, n + 8))),
        o = n + 46 + e,
        a = ht(t, n + 20),
        s = r && 4294967295 == a ? sn(t, o) : [a, ht(t, n + 24), ht(t, n + 42)],
        u = s[0],
        f = s[1],
        h = s[2];
      return [ft(t, n + 10), u, f, i, o + ft(t, n + 30) + ft(t, n + 32), h];
    },
    sn = function (t, n) {
      for (; 1 != ft(t, n); n += 4 + ft(t, n + 2));
      return [ct(t, n + 12), ct(t, n + 4), ct(t, n + 20)];
    },
    un = function (t) {
      var n = 0;
      if (t)
        for (var r in t) {
          var e = t[r].length;
          e > 65535 && C(9), (n += e + 4);
        }
      return n;
    },
    fn = function (t, n, r, e, i, o, a, s) {
      var u = e.length,
        f = r.extra,
        h = s && s.length,
        c = un(f);
      lt(t, n, null != a ? 33639248 : 67324752),
        (n += 4),
        null != a && ((t[n++] = 20), (t[n++] = r.os)),
        (t[n] = 20),
        (n += 2),
        (t[n++] = (r.flag << 1) | (null == o && 8)),
        (t[n++] = i && 8),
        (t[n++] = 255 & r.compression),
        (t[n++] = r.compression >> 8);
      var l = new Date(null == r.mtime ? Date.now() : r.mtime),
        p = l.getFullYear() - 1980;
      if (
        ((p < 0 || p > 119) && C(10),
        lt(
          t,
          n,
          (p << 25) |
            ((l.getMonth() + 1) << 21) |
            (l.getDate() << 16) |
            (l.getHours() << 11) |
            (l.getMinutes() << 5) |
            (l.getSeconds() >>> 1)
        ),
        (n += 4),
        null != o && (lt(t, n, r.crc), lt(t, n + 4, o), lt(t, n + 8, r.size)),
        lt(t, n + 12, u),
        lt(t, n + 14, c),
        (n += 16),
        null != a &&
          (lt(t, n, h), lt(t, n + 6, r.attrs), lt(t, n + 10, a), (n += 14)),
        t.set(e, n),
        (n += u),
        c)
      )
        for (var v in f) {
          var d = f[v],
            g = d.length;
          lt(t, n, +v), lt(t, n + 2, g), t.set(d, n + 4), (n += 4 + g);
        }
      return h && (t.set(s, n), (n += h)), n;
    },
    hn = function (t, n, r, e, i) {
      lt(t, n, 101010256),
        lt(t, n + 8, r),
        lt(t, n + 10, r),
        lt(t, n + 12, e),
        lt(t, n + 16, i);
    },
    cn = (function () {
      function t(t) {
        (this.filename = t),
          (this.c = Y()),
          (this.size = 0),
          (this.compression = 0);
      }
      return (
        (t.prototype.process = function (t, n) {
          this.ondata(null, t, n);
        }),
        (t.prototype.push = function (t, n) {
          this.ondata || C(5),
            this.c.p(t),
            (this.size += t.length),
            n && (this.crc = this.c.d()),
            this.process(t, n || !1);
        }),
        t
      );
    })();
  _e.ZipPassThrough = cn;
  var ln = (function () {
    function t(t, n) {
      var r = this;
      n || (n = {}),
        cn.call(this, t),
        (this.d = new xt(n, function (t, n) {
          r.ondata(null, t, n);
        })),
        (this.compression = 8),
        (this.flag = en(n.level));
    }
    return (
      (t.prototype.process = function (t, n) {
        try {
          this.d.push(t, n);
        } catch (t) {
          this.ondata(t, null, n);
        }
      }),
      (t.prototype.push = function (t, n) {
        cn.prototype.push.call(this, t, n);
      }),
      t
    );
  })();
  _e.ZipDeflate = ln;
  var pn = (function () {
    function t(t, n) {
      var r = this;
      n || (n = {}),
        cn.call(this, t),
        (this.d = new bt(n, function (t, n, e) {
          r.ondata(t, n, e);
        })),
        (this.compression = 8),
        (this.flag = en(n.level)),
        (this.terminate = this.d.terminate);
    }
    return (
      (t.prototype.process = function (t, n) {
        this.d.push(t, n);
      }),
      (t.prototype.push = function (t, n) {
        cn.prototype.push.call(this, t, n);
      }),
      t
    );
  })();
  _e.AsyncZipDeflate = pn;
  var vn = (function () {
    function t(t) {
      (this.ondata = t), (this.u = []), (this.d = 1);
    }
    return (
      (t.prototype.add = function (t) {
        var r = this;
        if ((this.ondata || C(5), 2 & this.d))
          this.ondata(C(4 + 8 * (1 & this.d), 0, 1), null, !1);
        else {
          var e = nn(t.filename),
            i = e.length,
            o = t.comment,
            a = o && nn(o),
            s = i != t.filename.length || (a && o.length != a.length),
            u = i + un(t.extra) + 30;
          i > 65535 && this.ondata(C(11, 0, 1), null, !1);
          var f = new n(u);
          fn(f, 0, t, e, s);
          var h = [f],
            c = function () {
              for (var t = 0, n = h; t < n.length; t++)
                r.ondata(null, n[t], !1);
              h = [];
            },
            l = this.d;
          this.d = 0;
          var p = this.u.length,
            v = J(t, {
              f: e,
              u: s,
              o: a,
              t: function () {
                t.terminate && t.terminate();
              },
              r: function () {
                if ((c(), l)) {
                  var t = r.u[p + 1];
                  t ? t.r() : (r.d = 1);
                }
                l = 1;
              },
            }),
            d = 0;
          (t.ondata = function (e, i, o) {
            if (e) r.ondata(e, i, o), r.terminate();
            else if (((d += i.length), h.push(i), o)) {
              var a = new n(16);
              lt(a, 0, 134695760),
                lt(a, 4, t.crc),
                lt(a, 8, d),
                lt(a, 12, t.size),
                h.push(a),
                (v.c = d),
                (v.b = u + d + 16),
                (v.crc = t.crc),
                (v.size = t.size),
                l && v.r(),
                (l = 1);
            } else l && c();
          }),
            this.u.push(v);
        }
      }),
      (t.prototype.end = function () {
        var t = this;
        2 & this.d
          ? this.ondata(C(4 + 8 * (1 & this.d), 0, 1), null, !0)
          : (this.d
              ? this.e()
              : this.u.push({
                  r: function () {
                    1 & t.d && (t.u.splice(-1, 1), t.e());
                  },
                  t: function () {},
                }),
            (this.d = 3));
      }),
      (t.prototype.e = function () {
        for (var t = 0, r = 0, e = 0, i = 0, o = this.u; i < o.length; i++)
          e += 46 + (f = o[i]).f.length + un(f.extra) + (f.o ? f.o.length : 0);
        for (var a = new n(e + 22), s = 0, u = this.u; s < u.length; s++) {
          var f;
          fn(a, t, (f = u[s]), f.f, f.u, f.c, r, f.o),
            (t += 46 + f.f.length + un(f.extra) + (f.o ? f.o.length : 0)),
            (r += f.b);
        }
        hn(a, t, this.u.length, e, r), this.ondata(null, a, !0), (this.d = 2);
      }),
      (t.prototype.terminate = function () {
        for (var t = 0, n = this.u; t < n.length; t++) n[t].t();
        this.d = 2;
      }),
      t
    );
  })();
  function dn(t, r, e) {
    e || ((e = r), (r = {})), "function" != typeof e && C(7);
    var i = {};
    Kt(t, "", i, r);
    var o = Object.keys(i),
      a = o.length,
      s = 0,
      u = 0,
      f = a,
      h = Array(a),
      c = [],
      l = function () {
        for (var t = 0; t < c.length; ++t) c[t]();
      },
      p = function (t, n) {
        bn(function () {
          e(t, n);
        });
      };
    bn(function () {
      p = e;
    });
    var v = function () {
      var t = new n(u + 22),
        r = s,
        e = u - s;
      u = 0;
      for (var i = 0; i < f; ++i) {
        var o = h[i];
        try {
          var a = o.c.length;
          fn(t, u, o, o.f, o.u, a);
          var c = 30 + o.f.length + un(o.extra),
            l = u + c;
          t.set(o.c, l),
            fn(t, s, o, o.f, o.u, a, u, o.m),
            (s += 16 + c + (o.m ? o.m.length : 0)),
            (u = l + a);
        } catch (t) {
          return p(t, null);
        }
      }
      hn(t, s, h.length, e, r), p(null, t);
    };
    a || v();
    for (
      var d = function (t) {
          var n = o[t],
            r = i[n],
            e = r[0],
            f = r[1],
            d = Y(),
            g = e.length;
          d.p(e);
          var y = nn(n),
            m = y.length,
            w = f.comment,
            x = w && nn(w),
            b = x && x.length,
            z = un(f.extra),
            k = 0 == f.level ? 0 : 8,
            M = function (r, e) {
              if (r) l(), p(r, null);
              else {
                var i = e.length;
                (h[t] = J(f, {
                  size: g,
                  crc: d.d(),
                  c: e,
                  f: y,
                  m: x,
                  u: m != n.length || (x && w.length != b),
                  compression: k,
                })),
                  (s += 30 + m + z + i),
                  (u += 76 + 2 * (m + z) + (b || 0) + i),
                  --a || v();
              }
            };
          if ((m > 65535 && M(C(11, 0, 1), null), k))
            if (g < 16e4)
              try {
                M(null, kt(e, f));
              } catch (t) {
                M(t, null);
              }
            else c.push(zt(e, f, M));
          else M(null, e);
        },
        g = 0;
      g < f;
      ++g
    )
      d(g);
    return l;
  }
  function gn(t, r) {
    r || (r = {});
    var e = {},
      i = [];
    Kt(t, "", e, r);
    var o = 0,
      a = 0;
    for (var s in e) {
      var u = e[s],
        f = u[0],
        h = u[1],
        c = 0 == h.level ? 0 : 8,
        l = (M = nn(s)).length,
        p = h.comment,
        v = p && nn(p),
        d = v && v.length,
        g = un(h.extra);
      l > 65535 && C(11);
      var y = c ? kt(f, h) : f,
        m = y.length,
        w = Y();
      w.p(f),
        i.push(
          J(h, {
            size: f.length,
            crc: w.d(),
            c: y,
            f: M,
            m: v,
            u: l != s.length || (v && p.length != d),
            o: o,
            compression: c,
          })
        ),
        (o += 30 + l + g + m),
        (a += 76 + 2 * (l + g) + (d || 0) + m);
    }
    for (var x = new n(a + 22), b = o, z = a - o, k = 0; k < i.length; ++k) {
      var M;
      fn(x, (M = i[k]).o, M, M.f, M.u, M.c.length);
      var S = 30 + M.f.length + un(M.extra);
      x.set(M.c, M.o + S),
        fn(x, o, M, M.f, M.u, M.c.length, M.o, M.m),
        (o += 16 + S + (M.m ? M.m.length : 0));
    }
    return hn(x, o, i.length, z, b), x;
  }
  (_e.Zip = vn), (_e.zip = dn), (_e.zipSync = gn);
  var yn = (function () {
    function t() {}
    return (
      (t.prototype.push = function (t, n) {
        this.ondata(null, t, n);
      }),
      (t.compression = 0),
      t
    );
  })();
  _e.UnzipPassThrough = yn;
  var mn = (function () {
    function t() {
      var t = this;
      this.i = new Mt(function (n, r) {
        t.ondata(null, n, r);
      });
    }
    return (
      (t.prototype.push = function (t, n) {
        try {
          this.i.push(t, n);
        } catch (t) {
          this.ondata(t, null, n);
        }
      }),
      (t.compression = 8),
      t
    );
  })();
  _e.UnzipInflate = mn;
  var wn = (function () {
    function t(t, n) {
      var r = this;
      n < 32e4
        ? (this.i = new Mt(function (t, n) {
            r.ondata(null, t, n);
          }))
        : ((this.i = new St(function (t, n, e) {
            r.ondata(t, n, e);
          })),
          (this.terminate = this.i.terminate));
    }
    return (
      (t.prototype.push = function (t, n) {
        this.i.terminate && (t = E(t, 0)), this.i.push(t, n);
      }),
      (t.compression = 8),
      t
    );
  })();
  _e.AsyncUnzipInflate = wn;
  var xn = (function () {
    function t(t) {
      (this.onfile = t), (this.k = []), (this.o = { 0: yn }), (this.p = q);
    }
    return (
      (t.prototype.push = function (t, r) {
        var e = this;
        if ((this.onfile || C(5), this.p || C(4), this.c > 0)) {
          var i = Math.min(this.c, t.length),
            o = t.subarray(0, i);
          if (
            ((this.c -= i),
            this.d ? this.d.push(o, !this.c) : this.k[0].push(o),
            (t = t.subarray(i)).length)
          )
            return this.push(t, r);
        } else {
          var a = 0,
            s = 0,
            u = void 0,
            f = void 0;
          this.p.length
            ? t.length
              ? ((f = new n(this.p.length + t.length)).set(this.p),
                f.set(t, this.p.length))
              : (f = this.p)
            : (f = t);
          for (
            var h = f.length,
              c = this.c,
              l = c && this.d,
              p = function () {
                var t,
                  n = ht(f, s);
                if (67324752 == n) {
                  (a = 1), (u = s), (v.d = null), (v.c = 0);
                  var r = ft(f, s + 6),
                    i = ft(f, s + 8),
                    o = 2048 & r,
                    l = 8 & r,
                    p = ft(f, s + 26),
                    d = ft(f, s + 28);
                  if (h > s + 30 + p + d) {
                    var g = [];
                    v.k.unshift(g), (a = 2);
                    var y,
                      m = ht(f, s + 18),
                      w = ht(f, s + 22),
                      x = rn(f.subarray(s + 30, (s += 30 + p)), !o);
                    4294967295 == m
                      ? ((t = l ? [-2] : sn(f, s)), (m = t[0]), (w = t[1]))
                      : l && (m = -1),
                      (s += d),
                      (v.c = m);
                    var b = {
                      name: x,
                      compression: i,
                      start: function () {
                        if ((b.ondata || C(5), m)) {
                          var t = e.o[i];
                          t ||
                            b.ondata(
                              C(14, "unknown compression type " + i, 1),
                              null,
                              !1
                            ),
                            ((y = m < 0 ? new t(x) : new t(x, m, w)).ondata =
                              function (t, n, r) {
                                b.ondata(t, n, r);
                              });
                          for (var n = 0, r = g; n < r.length; n++)
                            y.push(r[n], !1);
                          e.k[0] == g && e.c ? (e.d = y) : y.push(q, !0);
                        } else b.ondata(null, q, !0);
                      },
                      terminate: function () {
                        y && y.terminate && y.terminate();
                      },
                    };
                    m >= 0 && ((b.size = m), (b.originalSize = w)), v.onfile(b);
                  }
                  return "break";
                }
                if (c) {
                  if (134695760 == n)
                    return (
                      (u = s += 12 + (-2 == c && 8)),
                      (a = 3),
                      (v.c = 0),
                      "break"
                    );
                  if (33639248 == n)
                    return (u = s -= 4), (a = 3), (v.c = 0), "break";
                }
              },
              v = this;
            s < h - 4 && "break" !== p();
            ++s
          );
          if (((this.p = q), c < 0)) {
            var d = f.subarray(
              0,
              a
                ? u - 12 - (-2 == c && 8) - (134695760 == ht(f, u - 16) && 4)
                : s
            );
            l ? l.push(d, !!a) : this.k[+(2 == a)].push(d);
          }
          if (2 & a) return this.push(f.subarray(s), r);
          this.p = f.subarray(s);
        }
        r && (this.c && C(13), (this.p = null));
      }),
      (t.prototype.register = function (t) {
        this.o[t.compression] = t;
      }),
      t
    );
  })();
  _e.Unzip = xn;
  var bn =
    "function" == typeof queueMicrotask
      ? queueMicrotask
      : "function" == typeof setTimeout
      ? setTimeout
      : function (t) {
          t();
        };
  function zn(t, r, e) {
    e || ((e = r), (r = {})), "function" != typeof e && C(7);
    var i = [],
      o = function () {
        for (var t = 0; t < i.length; ++t) i[t]();
      },
      a = {},
      s = function (t, n) {
        bn(function () {
          e(t, n);
        });
      };
    bn(function () {
      s = e;
    });
    for (var u = t.length - 22; 101010256 != ht(t, u); --u)
      if (!u || t.length - u > 65558) return s(C(13, 0, 1), null), o;
    var f = ft(t, u + 8);
    if (f) {
      var h = f,
        c = ht(t, u + 16),
        l = 4294967295 == c;
      if (l) {
        if (((u = ht(t, u - 12)), 101075792 != ht(t, u)))
          return s(C(13, 0, 1), null), o;
        (h = f = ht(t, u + 32)), (c = ht(t, u + 48));
      }
      for (
        var p = r && r.filter,
          v = function (r) {
            var e = an(t, c, l),
              u = e[0],
              h = e[1],
              v = e[2],
              d = e[3],
              g = e[4],
              y = on(t, e[5]);
            c = g;
            var m = function (t, n) {
              t ? (o(), s(t, null)) : (n && (a[d] = n), --f || s(null, a));
            };
            if (!p || p({ name: d, size: h, originalSize: v, compression: u }))
              if (u)
                if (8 == u) {
                  var w = t.subarray(y, y + h);
                  if (h < 32e4)
                    try {
                      m(null, At(w, new n(v)));
                    } catch (t) {
                      m(t, null);
                    }
                  else i.push(Tt(w, { size: v }, m));
                } else m(C(14, "unknown compression type " + u, 1), null);
              else m(null, E(t, y, y + h));
            else m(null, null);
          },
          d = 0;
        d < h;
        ++d
      )
        v();
    } else s(null, {});
    return o;
  }
  function kn(t, r) {
    for (var e = {}, i = t.length - 22; 101010256 != ht(t, i); --i)
      (!i || t.length - i > 65558) && C(13);
    var o = ft(t, i + 8);
    if (!o) return {};
    var a = ht(t, i + 16),
      s = 4294967295 == a;
    s &&
      ((i = ht(t, i - 12)),
      101075792 != ht(t, i) && C(13),
      (o = ht(t, i + 32)),
      (a = ht(t, i + 48)));
    for (var u = r && r.filter, f = 0; f < o; ++f) {
      var h = an(t, a, s),
        c = h[0],
        l = h[1],
        p = h[2],
        v = h[3],
        d = h[4],
        g = on(t, h[5]);
      (a = d),
        (u && !u({ name: v, size: l, originalSize: p, compression: c })) ||
          (c
            ? 8 == c
              ? (e[v] = At(t.subarray(g, g + l), new n(p)))
              : C(14, "unknown compression type " + c)
            : (e[v] = E(t, g, g + l)));
    }
    return e;
  }
  (_e.unzip = zn), (_e.unzipSync = kn);
  return _e;
});
