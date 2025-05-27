"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function YandexMetrika() {
  useEffect(() => {
    // Load Yandex pixel after idle
    const loadTrackingPixel = () => {
      const img = new Image();
      img.src = "https://mc.yandex.ru/watch/101145505";
      img.style.position = "absolute";
      img.style.left = "-9999px";
      document.body.appendChild(img);
    };

    if (window.requestIdleCallback) {
      window.requestIdleCallback(loadTrackingPixel);
    } else {
      setTimeout(loadTrackingPixel, 2000);
    }
  }, []);

  return (
    <>
      {/* Yandex Metrika Script */}
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {
              if (document.scripts[j].src === r) return;
            }
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(101145505, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
            ecommerce: "dataLayer"
          });
        `}
      </Script>

      {/* ClickFraud Script */}
      <Script id="clickfraud-loader" strategy="beforeInteractive">
        {`
          var _mtm = window._mtm = window._mtm || [];
          _mtm.push({ 'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start' });
          (function() {
            var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
            g.src = 'https://stat1.clickfraud.dev/js/container_TYt4coYS.js';
            s.parentNode.insertBefore(g, s);
          })();
        `}
      </Script>

      {/* Yandex Meta Tag Injection (if not in <head> directly) */}
      <Script id="yandex-meta" strategy="beforeInteractive">
        {`
          (function() {
            var meta = document.createElement('meta');
            meta.name = "yandex-verification";
            meta.content = "9c7162fe8393ca88";
            document.getElementsByTagName('head')[0].appendChild(meta);
          })();
        `}
      </Script>
    </>
  );
}
