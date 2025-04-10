import React from "react";

function formatRussianText(text) {
  if (typeof text !== "string") return text;
  return text.replace(/(\s|^)([АаИиВвКкСсУуОо])\s/g, "$1$2\u00A0");
}

function processChildren(children) {
  return React.Children.map(children, (child) => {
    if (typeof child === "string") {
      return formatRussianText(child);
    } else if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        children: processChildren(child.props.children),
      });
    }
    return child;
  });
}

export default function AutoFormat({ children }) {
  return <>{processChildren(children)}</>;
}
