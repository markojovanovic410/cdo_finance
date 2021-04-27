import React from "react";
import { FadeInTypes, typeFade } from "./types";

export const FadeInScroll = ({
  children,
  selectorClass,
  type,
  checkPoint,
}: FadeInTypes) => {
  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      let className = type === typeFade.FadeIn ? "fade-in" : "is-visible";
      let elements = document.getElementsByClassName(selectorClass);
      if (currentScroll >= checkPoint) {
        for (var i = 0; i < elements.length; ++i) {
          let element = elements[i] as HTMLElement;
          element.classList.add(className);
          element.style.opacity = "1";
        }
      }
    });
  }, [checkPoint, type, selectorClass]);

  return <>{children}</>;
};
