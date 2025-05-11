document.addEventListener("DOMContentLoaded", function () {
  let e = [
      "3498db",
      "e74c3c",
      "2ecc71",
      "f39c12",
      "9b59b6",
      "1abc9c",
      "d35400",
      "34495e",
      "7f8c8d",
      "c0392b",
      "8e44ad",
      "16a085",
      "d35400",
      "2c3e50",
      "27ae60",
    ],
    t = {
      columnType: "responsive",
      minColumnWidth: 200,
      columnCount: 4,
      gridGap: 20,
      showLabels: !0,
      autoRefresh: !0,
    },
    n = { ...t },
    i = 0,
    o = !1,
    l = !1,
    s = !1,
    a = 0,
    r = 0,
    d = null,
    c = document.getElementById("interactiveGrid"),
    u = document.getElementById("demoWrapper"),
    m = document.getElementById("resizeHandle"),
    g = document.getElementById("demoConsole"),
    h = g ? g.querySelector(".console-body") : null,
    f = document.getElementById("gridCssCode"),
    p = document.getElementById("currentWidth"),
    v = document.querySelector(".main-nav"),
    y = document.querySelector(".mobile-menu-button"),
    E = document.querySelectorAll(".demo-tab"),
    b = document.querySelectorAll(".demo-panel"),
    $ = document.querySelectorAll(".installation-tabs .tab-button"),
    C = document.querySelectorAll(".installation-panels .tab-panel"),
    L = document.getElementById("columnType"),
    x = document.getElementById("columnCount"),
    I = document.getElementById("columnCountValue"),
    w = document.getElementById("minColumnWidth"),
    M = document.getElementById("minColumnWidthValue"),
    _ = document.getElementById("gridGap"),
    B = document.getElementById("gridGapValue"),
    T = document.getElementById("fixedColumnsConfig"),
    k = document.getElementById("responsiveColumnsConfig"),
    S = document.getElementById("autoRefresh"),
    z = document.getElementById("resizeDemo"),
    A = document.getElementById("resizeDemoText"),
    G = document.querySelectorAll(".preset-width"),
    R = document.getElementById("addRegularItem"),
    D = document.getElementById("addTallItem"),
    W = document.getElementById("addHiddenItem"),
    q = document.getElementById("addColoredItem"),
    H = document.getElementById("removeLastItem"),
    N = document.getElementById("toggleFirstVisible"),
    V = document.getElementById("toggleRandomVisible"),
    X = document.getElementById("refreshLayout"),
    F = document.getElementById("destroyMasonIt"),
    U = document.getElementById("initMasonIt"),
    O = document.getElementById("toggleDebug"),
    j = document.getElementById("showInfo"),
    J = [
      document.getElementById("clearConsoleBtn"),
      document.getElementById("clearConsoleHeader"),
    ],
    K = document.getElementById("resetDemo"),
    P = document.getElementById("toggleLabels");
  function Q(e, t) {
    return Math.floor(Math.random() * (t - e + 1)) + e;
  }
  function Y() {
    return e[Math.floor(Math.random() * e.length)];
  }
  function Z(e, t) {
    let n;
    return function i(...o) {
      let l = () => {
        clearTimeout(n), e(...o);
      };
      clearTimeout(n), (n = setTimeout(l, t));
    };
  }
  function ee() {
    let e;
    return `.interactive-grid {
  display: grid;
  ${(e =
    "fixed" === n.columnType
      ? `grid-template-columns: repeat(${n.columnCount}, 1fr);`
      : `grid-template-columns: repeat(auto-fill, minmax(${n.minColumnWidth}px, 1fr));`)}
  gap: ${n.gridGap}px;
  align-items: start;
}`;
  }
  function et() {
    c &&
      ("fixed" === n.columnType
        ? (c.style.gridTemplateColumns = `repeat(${n.columnCount}, 1fr)`)
        : (c.style.gridTemplateColumns = `repeat(auto-fill, minmax(${n.minColumnWidth}px, 1fr))`),
      (c.style.gap = `${n.gridGap}px`),
      f && (f.textContent = ee()),
      o && n.autoRefresh && en());
  }
  function en() {
    if (o)
      try {
        MasonIt.refresh("#interactiveGrid"),
          er("Layout refreshed based on grid configuration changes", "info");
      } catch (e) {
        er(`Error refreshing layout: ${e.message}`, "error"), console.error(e);
      }
  }
  function ei() {
    p &&
      (p.textContent = (function e() {
        if (!c) return "auto";
        let t = window.getComputedStyle(c);
        return Math.round(parseFloat(t.width)) + "px";
      })());
  }
  function eo(e) {
    if (!s) return;
    let t = e.clientX - a,
      n = Math.max(300, r + t);
    (u.style.width = `${n}px`), ei();
  }
  function el(e) {
    if (!s) return;
    let t = e.touches[0],
      n = t.clientX - a,
      i = Math.max(300, r + n);
    (u.style.width = `${i}px`), ei();
  }
  E.forEach((e) => {
    e.addEventListener("click", () => {
      let t = e.getAttribute("data-panel");
      E.forEach((e) => e.classList.remove("active")),
        e.classList.add("active"),
        b.forEach((e) => {
          e.classList.toggle("active", e.id === t);
        });
    });
  }),
    $.forEach((e) => {
      e.addEventListener("click", () => {
        $.forEach((e) => {
          e.classList.remove("active"),
            e.setAttribute("aria-selected", "false");
        }),
          e.classList.add("active"),
          e.setAttribute("aria-selected", "true");
        let t = e.getAttribute("aria-controls");
        C.forEach((e) => {
          (e.hidden = !0), e.classList.remove("active");
        });
        let n = document.getElementById(t);
        n && ((n.hidden = !1), n.classList.add("active"));
      });
    }),
    L &&
      L.addEventListener("change", function () {
        (n.columnType = this.value),
          T && (T.style.display = "fixed" === n.columnType ? "block" : "none"),
          k &&
            (k.style.display =
              "responsive" === n.columnType ? "block" : "none"),
          et(),
          er(`Column type changed to: ${n.columnType}`, "info");
      }),
    x &&
      I &&
      x.addEventListener("input", function () {
        (n.columnCount = parseInt(this.value, 10)),
          (I.textContent = n.columnCount),
          clearTimeout(d),
          (d = setTimeout(() => {
            et(), er(`Column count set to: ${n.columnCount}`, "info");
          }, 100));
      }),
    w &&
      M &&
      w.addEventListener("input", function () {
        (n.minColumnWidth = parseInt(this.value, 10)),
          (M.textContent = `${n.minColumnWidth}px`),
          clearTimeout(d),
          (d = setTimeout(() => {
            et(), er(`Min column width set to: ${n.minColumnWidth}px`, "info");
          }, 100));
      }),
    _ &&
      B &&
      _.addEventListener("input", function () {
        (n.gridGap = parseInt(this.value, 10)),
          (B.textContent = `${n.gridGap}px`),
          clearTimeout(d),
          (d = setTimeout(() => {
            et(), er(`Grid gap set to: ${n.gridGap}px`, "info");
          }, 100));
      }),
    S &&
      S.addEventListener("change", function () {
        (n.autoRefresh = this.checked),
          er(
            `Auto-refresh on config change: ${
              n.autoRefresh ? "enabled" : "disabled"
            }`,
            "info"
          );
      }),
    z &&
      A &&
      z.addEventListener("click", function () {
        (s = !s)
          ? ((A.textContent = "Disable Resize Mode"),
            u.classList.add("resizable"),
            er(
              "Resize mode activated. Drag the right edge to resize the demo container.",
              "info"
            ))
          : ((A.textContent = "Enable Resize Mode"),
            u.classList.remove("resizable"),
            (u.style.width = ""),
            ei(),
            er("Resize mode deactivated.", "info"),
            o && n.autoRefresh && en());
      }),
    G.forEach((e) => {
      e.addEventListener("click", function () {
        let e = this.getAttribute("data-width");
        u &&
          ("100%" === e
            ? ((u.style.width = ""),
              er("Demo container set to full width", "info"))
            : ((u.style.width = `${e}px`),
              er(`Demo container width set to ${e}px`, "info")),
          ei(),
          o && n.autoRefresh && en());
      });
    }),
    m &&
      u &&
      (m.addEventListener("mousedown", function (e) {
        s &&
          (e.preventDefault(),
          (a = e.clientX),
          (r = u.offsetWidth),
          (document.documentElement.style.cursor = "ew-resize"),
          document.addEventListener("mousemove", eo),
          document.addEventListener("mouseup", es));
      }),
      m.addEventListener("touchstart", function (e) {
        if (!s) return;
        e.preventDefault();
        let t = e.touches[0];
        (a = t.clientX),
          (r = u.offsetWidth),
          document.addEventListener("touchmove", el),
          document.addEventListener("touchend", ea);
      }));
  let es = Z(function (e) {
      (document.documentElement.style.cursor = ""),
        document.removeEventListener("mousemove", eo),
        document.removeEventListener("mouseup", es),
        o && n.autoRefresh && en();
    }, 100),
    ea = Z(function (e) {
      document.removeEventListener("touchmove", el),
        document.removeEventListener("touchend", ea),
        o && n.autoRefresh && en();
    }, 100);
  function er(e, t = "info") {
    if (!h) return;
    let n = (function e() {
        let t = new Date(),
          n = String(t.getHours()).padStart(2, "0"),
          i = String(t.getMinutes()).padStart(2, "0"),
          o = String(t.getSeconds()).padStart(2, "0"),
          l = String(t.getMilliseconds()).padStart(3, "0");
        return `${n}:${i}:${o}.${l}`;
      })(),
      i = document.createElement("div");
    for (
      i.className = "console-log",
        i.innerHTML = `<span class="timestamp">[${n}]</span> <span class="${t}">${e}</span>`,
        h.appendChild(i),
        h.scrollTop = h.scrollHeight;
      h.children.length > 200;

    )
      h.removeChild(h.firstChild);
    console.log(
      `%c[Mason-it Demo] ${e}`,
      "success" === t
        ? "color: green; font-weight: bold"
        : "warning" === t
        ? "color: orange; font-weight: bold"
        : "error" === t
        ? "color: red; font-weight: bold"
        : "color: inherit"
    );
  }
  let ed = document.querySelectorAll(".copy-button");
  function ec(e, t) {
    let n = document.createElement("textarea");
    (n.value = e),
      (n.style.position = "fixed"),
      (n.style.opacity = "0"),
      document.body.appendChild(n),
      n.focus(),
      n.select();
    try {
      let i = document.execCommand("copy");
      i && eu(t);
    } catch (o) {
      console.error("Unable to copy code", o);
    }
    document.body.removeChild(n);
  }
  function eu(e) {
    let t = e.textContent;
    (e.textContent = "Copied!"),
      e.classList.add("copied"),
      setTimeout(() => {
        (e.textContent = t), e.classList.remove("copied");
      }, 2e3);
  }
  function em(e = {}) {
    let { tall: t = !1, hidden: o = !1, bgColor: l = null } = e;
    i++;
    let s = document.createElement("div");
    (s.className = "item"),
      (s.dataset.itemId = i),
      o && s.classList.add("is-hidden"),
      s.classList.add("item-entering");
    let a;
    a = t ? Q(250, 350) : Q(120, 200);
    let r = l || Y(),
      d = (function e(t) {
        let n = parseInt(t.substr(0, 2), 16),
          i = parseInt(t.substr(2, 2), 16),
          o = parseInt(t.substr(4, 2), 16);
        return (0.299 * n + 0.587 * i + 0.114 * o) / 255 > 0.5
          ? "000000"
          : "ffffff";
      })(r),
      c = `<p><strong>Item #${i}</strong></p>`,
      u = new URLSearchParams();
    u.append("text", n.showLabels ? `Mason-it ${i}` : "");
    let m = `https://placehold.co/300x${a}/${r}/${d}?${u.toString()}`;
    return (
      (c += `<img src="${m}" alt="Demo item ${i}" class="demo-img">`),
      (c += `
            <div class="item-meta">
                <p>${t ? "Tall Item" : "Regular Item"} ${
        o ? "(Initially Hidden)" : ""
      }</p>
                <p class="item-dimensions">300\xd7${a}px</p>
            </div>
        `),
      (s.innerHTML = c),
      setTimeout(() => {
        s.classList.remove("item-entering");
      }, 300),
      s
    );
  }
  function eg() {
    if (c) {
      if (o) {
        er("Mason-it is already active on the demo grid.", "warning");
        return;
      }
      0 === c.children.length && eh();
      try {
        MasonIt.init("#interactiveGrid"),
          (o = !0),
          er("Mason-it initialized on the demo grid.", "success"),
          ep();
      } catch (e) {
        er(`Error initializing Mason-it: ${e.message}`, "error"),
          console.error(e);
      }
      ef();
    }
  }
  function eh() {
    for (let t = 0; t < 6; t++) {
      let n = { tall: t % 3 == 0, hidden: 4 === t, bgColor: e[t % e.length] };
      c.appendChild(em(n));
    }
  }
  function ef() {
    U && (U.disabled = o), F && (F.disabled = !o), X && (X.disabled = !o);
    let e = c && c.children.length > 0;
    H && (H.disabled = !e);
    let t =
      c &&
      Array.from(c.children).some((e) => !e.classList.contains("is-hidden"));
    N && (N.disabled = !t),
      V && (V.disabled = !t),
      O && (O.textContent = l ? "Disable Debug Mode" : "Enable Debug Mode"),
      P &&
        (P.textContent = n.showLabels
          ? "Hide Image Labels"
          : "Show Image Labels");
  }
  function ep() {
    let e = document.getElementById("demoStats");
    if (!e) return;
    let t = c ? c.children.length : 0,
      i = c
        ? Array.from(c.children).filter(
            (e) => !e.classList.contains("is-hidden")
          ).length
        : 0,
      l =
        "fixed" === n.columnType
          ? `${n.columnCount} fixed columns`
          : `Min width: ${n.minColumnWidth}px`;
    e.innerHTML = `
            <div class="stat">
                <span class="stat-label">Total Items:</span>
                <span class="stat-value">${t}</span>
            </div>
            <div class="stat">
                <span class="stat-label">Visible:</span>
                <span class="stat-value">${i}</span>
            </div>
            <div class="stat">
                <span class="stat-label">Hidden:</span>
                <span class="stat-value">${t - i}</span>
            </div>
            <div class="stat">
                <span class="stat-label">Columns:</span>
                <span class="stat-value">${l}</span>
            </div>
            <div class="stat">
                <span class="stat-label">Mason-it:</span>
                <span class="stat-value ${o ? "active" : "inactive"}">${
      o ? "Active" : "Inactive"
    }</span>
            </div>
        `;
  }
  function ev(e) {
    if (!e) return !1;
    e.classList.add("item-transitioning");
    let t = e.classList.toggle("is-hidden");
    return (
      setTimeout(() => {
        e.classList.remove("item-transitioning");
      }, 300),
      t
    );
  }
  ed.forEach((e) => {
    e.addEventListener("click", () => {
      let t = e.previousElementSibling,
        n = t.querySelector("code");
      n &&
        (navigator.clipboard && navigator.clipboard.writeText
          ? navigator.clipboard
              .writeText(n.textContent)
              .then(() => {
                eu(e);
              })
              .catch((t) => {
                console.error("Failed to copy: ", t), ec(n.textContent, e);
              })
          : ec(n.textContent, e));
    });
  }),
    R &&
      R.addEventListener("click", () => {
        if (!c) return;
        let e = em();
        c.appendChild(e),
          er(`Added regular item #${i}.`),
          o ||
            er(
              "Note: Mason-it is not active. Initialize it to see masonry layout.",
              "warning"
            ),
          ef(),
          ep();
      }),
    D &&
      D.addEventListener("click", () => {
        if (!c) return;
        let e = em({ tall: !0 });
        c.appendChild(e),
          er(`Added tall item #${i}.`),
          o ||
            er(
              "Note: Mason-it is not active. Initialize it to see masonry layout.",
              "warning"
            ),
          ef(),
          ep();
      }),
    W &&
      W.addEventListener("click", () => {
        if (!c) return;
        let e = em({ hidden: !0 });
        c.appendChild(e),
          er(`Added hidden item #${i}. Use the toggle buttons to show it.`),
          ef(),
          ep();
      }),
    q &&
      q.addEventListener("click", () => {
        if (!c) return;
        let t = new Set(),
          n = Array.from(c.children).slice(-3);
        n.forEach((e) => {
          let n = e.querySelector("img");
          if (n && n.src) {
            let i = n.src.match(/\/([0-9a-f]{6})\//i);
            i && t.add(i[1]);
          }
        });
        let l;
        do l = Y();
        while (t.has(l) && t.size < e.length);
        let s = em({ tall: Math.random() > 0.5, bgColor: l });
        c.appendChild(s),
          er(`Added colored item #${i} with color #${l}.`),
          o ||
            er(
              "Note: Mason-it is not active. Initialize it to see masonry layout.",
              "warning"
            ),
          ef(),
          ep();
      }),
    H &&
      H.addEventListener("click", () => {
        if (!c || 0 === c.children.length) {
          er("No items to remove.", "warning");
          return;
        }
        let e = c.lastElementChild,
          t = e.dataset.itemId;
        e.classList.add("item-exiting"),
          setTimeout(() => {
            c.contains(e) &&
              (c.removeChild(e), er(`Removed item #${t}.`), ef(), ep());
          }, 300);
      }),
    N &&
      N.addEventListener("click", () => {
        let e = c
          ? Array.from(c.children).find(
              (e) => !e.classList.contains("is-hidden")
            )
          : null;
        if (!e) {
          er("No visible items to toggle.", "warning");
          return;
        }
        let t = ev(e);
        er(
          `Toggled visibility of item #${e.dataset.itemId}. Now ${
            t ? "hidden" : "visible"
          }.`,
          "info"
        ),
          o &&
            er(
              "Mason-it v1.0.1 automatically handles hidden items correctly.",
              "success"
            ),
          ef(),
          ep();
      }),
    V &&
      V.addEventListener("click", () => {
        let e = (function e() {
          if (!c) return null;
          let t = Array.from(c.children).filter(
            (e) => !e.classList.contains("is-hidden")
          );
          if (0 === t.length) return null;
          let n = Math.floor(Math.random() * t.length);
          return t[n];
        })();
        if (!e) {
          er("No visible items to toggle.", "warning");
          return;
        }
        let t = ev(e);
        er(
          `Toggled visibility of random item #${e.dataset.itemId}. Now ${
            t ? "hidden" : "visible"
          }.`,
          "info"
        ),
          ef(),
          ep();
      }),
    X &&
      X.addEventListener("click", () => {
        if (!o) {
          er("Mason-it must be initialized first.", "warning");
          return;
        }
        try {
          MasonIt.refresh("#interactiveGrid"),
            er("Manually refreshed the Mason-it layout.", "success");
        } catch (e) {
          er(`Error refreshing layout: ${e.message}`, "error"),
            console.error(e);
        }
      }),
    U && U.addEventListener("click", eg),
    F &&
      F.addEventListener("click", function e() {
        if (!c || !o) {
          er("Mason-it is not active on the demo grid.", "warning");
          return;
        }
        try {
          MasonIt.destroy("#interactiveGrid"),
            (o = !1),
            er("Mason-it has been removed from the demo grid.", "info");
        } catch (t) {
          er(`Error destroying Mason-it: ${t.message}`, "error"),
            console.error(t);
        }
        ef(), ep();
      }),
    O &&
      O.addEventListener("click", () => {
        l = !l;
        try {
          MasonIt.debug(l),
            er(
              `Debug mode ${
                l ? "enabled" : "disabled"
              }. Check browser console for detailed logs.`,
              l ? "success" : "info"
            );
        } catch (e) {
          er(`Error toggling debug mode: ${e.message}`, "error"),
            console.error(e);
        }
        ef();
      }),
    j &&
      j.addEventListener("click", () => {
        try {
          let e = MasonIt.version(),
            t = MasonIt.count();
          er(`Mason-it version: ${e}`, "info"),
            er(`Active Mason-it instances: ${t}`, "info");
        } catch (n) {
          er(`Error getting Mason-it info: ${n.message}`, "error"),
            console.error(n);
        }
      }),
    J.forEach((e) => {
      e &&
        e.addEventListener("click", () => {
          h && ((h.innerHTML = ""), er("Console cleared.", "info"));
        });
    }),
    K &&
      K.addEventListener("click", function e() {
        if (o)
          try {
            MasonIt.destroy("#interactiveGrid"), (o = !1);
          } catch (l) {
            console.error("Error destroying Mason-it during reset:", l);
          }
        c && ((c.innerHTML = ""), (i = 0)),
          h && (h.innerHTML = ""),
          (n = { ...t }),
          L && (L.value = n.columnType),
          x && (x.value = n.columnCount),
          I && (I.textContent = n.columnCount),
          w && (w.value = n.minColumnWidth),
          M && (M.textContent = `${n.minColumnWidth}px`),
          _ && (_.value = n.gridGap),
          B && (B.textContent = `${n.gridGap}px`),
          S && (S.checked = n.autoRefresh),
          u && ((u.style.width = ""), u.classList.remove("resizable")),
          A && (A.textContent = "Enable Resize Mode"),
          (s = !1),
          T && (T.style.display = "fixed" === n.columnType ? "block" : "none"),
          k &&
            (k.style.display =
              "responsive" === n.columnType ? "block" : "none"),
          eh(),
          et();
        try {
          MasonIt.init("#interactiveGrid"), (o = !0);
        } catch (a) {
          console.error("Error re-initializing Mason-it during reset:", a);
        }
        ef(),
          ep(),
          ei(),
          f && (f.textContent = ee()),
          er("Demo has been completely reset to default state.", "success");
      }),
    P &&
      P.addEventListener("click", () => {
        if (((n.showLabels = !n.showLabels), c)) {
          let e = c.querySelectorAll(".demo-img");
          e.forEach((e) => {
            try {
              let t = new URL(e.src),
                i = t.pathname.split("/").filter(Boolean);
              if (i.length >= 3) {
                let o = e.closest(".item"),
                  l = o ? o.dataset.itemId : "",
                  s = new URLSearchParams();
                s.append("text", n.showLabels ? `Mason-it ${l}` : ""),
                  (e.src = `https://placehold.co/${i[0]}/${i[1]}/${
                    i[2]
                  }?${s.toString()}`);
              }
            } catch (a) {
              console.error("Error updating image label:", a);
            }
          });
        }
        ef(),
          er(
            `Image labels are now ${n.showLabels ? "visible" : "hidden"}.`,
            "info"
          );
      }),
    L && (L.value = n.columnType),
    x && (x.value = n.columnCount),
    I && (I.textContent = n.columnCount),
    w && (w.value = n.minColumnWidth),
    M && (M.textContent = `${n.minColumnWidth}px`),
    _ && (_.value = n.gridGap),
    B && (B.textContent = `${n.gridGap}px`),
    S && (S.checked = n.autoRefresh),
    T && (T.style.display = "fixed" === n.columnType ? "block" : "none"),
    k && (k.style.display = "responsive" === n.columnType ? "block" : "none"),
    eg(),
    f && (f.textContent = ee()),
    ei(),
    ep();
  let ey = new ResizeObserver(
    Z(() => {
      ei(), ep();
    }, 100)
  );
  c && ey.observe(c),
    document.querySelectorAll('a[href^="#"]').forEach((e) => {
      e.addEventListener("click", function (e) {
        let t = document.querySelector(this.getAttribute("href"));
        t &&
          (e.preventDefault(),
          v &&
            v.classList.contains("active") &&
            (v.classList.remove("active"),
            y && y.setAttribute("aria-expanded", "false")),
          window.scrollTo({ top: t.offsetTop - 80, behavior: "smooth" }));
      });
    });
  let eE;
  window.addEventListener("resize", () => {
    clearTimeout(eE),
      (eE = setTimeout(() => {
        ei(), ep();
      }, 100));
  }),
    er(
      `Mason-it v${MasonIt.version()} interactive demo initialized.`,
      "success"
    ),
    er(
      "Try adding, removing, and toggling items to see Mason-it in action!",
      "info"
    ),
    er(
      "Experiment with resizing the container or changing column settings.",
      "info"
    );
});
