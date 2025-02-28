window.SnipcartSettings = {
    publicApiKey: 'MzE3MzY0OGEtZGRkOS00ZmFiLTgxZGEtZDYyYzNhOTIxMWJmNjM4NzU1NjQ3Mzk3NDQ3NzU2',
    loadStrategy: 'onload',
    language: 'en', // or 'zh' depending on your page’s language
  };
  
  (() => {
    var c, d;
    (d = (c = window.SnipcartSettings).version) != null || (c.version = "3.0");
    var s, S;
    (S = (s = window.SnipcartSettings).timeoutDuration) != null || (s.timeoutDuration = 2750);
    var l, p;
    (p = (l = window.SnipcartSettings).domain) != null || (l.domain = "cdn.snipcart.com");
    var w, u;
    (u = (w = window.SnipcartSettings).protocol) != null || (w.protocol = "https");
    var f = window.SnipcartSettings.version.includes("v3.0.0-ci") ||
            (window.SnipcartSettings.version != "3.0" &&
             window.SnipcartSettings.version.localeCompare("3.4.0", void 0, { numeric: true, sensitivity: "base" }) === -1),
        m = ["focus", "mouseover", "touchmove", "scroll", "keydown"];
    window.LoadSnipcart = o;
    document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", r) : r();
    
    function r() {
      if (window.SnipcartSettings.loadStrategy) {
        if (window.SnipcartSettings.loadStrategy === "on-user-interaction") {
          m.forEach(t => document.addEventListener(t, o));
          setTimeout(o, window.SnipcartSettings.timeoutDuration);
        }
      } else {
        o();
      }
    }
    
    var a = false;
    function o() {
      if (a) return;
      a = true;
      let t = document.getElementsByTagName("head")[0],
          e = document.querySelector("#snipcart"),
          i = document.querySelector(`script[src^="${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}"][src$="snipcart.js"]`),
          n = document.querySelector(`link[href^="${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}"][href$="snipcart.css"]`);
      if (!e) {
        e = document.createElement("div");
        e.id = "snipcart";
        e.setAttribute("hidden", "true");
        document.body.appendChild(e);
      }
      v(e);
      if (!i) {
        i = document.createElement("script");
        i.src = `${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}/themes/v${window.SnipcartSettings.version}/default/snipcart.js`;
        i.async = true;
        t.appendChild(i);
      }
      if (!n) {
        n = document.createElement("link");
        n.rel = "stylesheet";
        n.type = "text/css";
        n.href = `${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}/themes/v${window.SnipcartSettings.version}/default/snipcart.css`;
        t.prepend(n);
      }
      m.forEach(g => document.removeEventListener(g, o));
    }
    
    function v(t) {
      if (f) return;
      t.dataset.apiKey = window.SnipcartSettings.publicApiKey;
      if (window.SnipcartSettings.addProductBehavior)
        t.dataset.configAddProductBehavior = window.SnipcartSettings.addProductBehavior;
      if (window.SnipcartSettings.modalStyle)
        t.dataset.configModalStyle = window.SnipcartSettings.modalStyle;
      if (window.SnipcartSettings.currency)
        t.dataset.currency = window.SnipcartSettings.currency;
      if (window.SnipcartSettings.templatesUrl)
        t.dataset.templatesUrl = window.SnipcartSettings.templatesUrl;
    }
  })();
  
