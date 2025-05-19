"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function YandexMetrika() {
  useEffect(() => {
    // Delay loading of the tracking pixel
    const loadTrackingPixel = () => {
      const img = new Image();
      img.src = "https://mc.yandex.ru/watch/101145505";
      img.style.position = "absolute";
      img.style.left = "-9999px";
      document.body.appendChild(img);
    };

    // Load the tracking pixel after the page has loaded completely
    if (window.requestIdleCallback) {
      window.requestIdleCallback(loadTrackingPixel);
    } else {
      setTimeout(loadTrackingPixel, 2000);
    }
  }, []);

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          ym(101145505, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
            ecommerce: "dataLayer"
          });
        `}
      </Script>
    </>
  );
}