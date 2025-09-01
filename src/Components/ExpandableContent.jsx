import React, { useState } from "react";

const ExpandableContent = ({ htmlContent }) => {
  const [expanded, setExpanded] = useState(false);

  // Parse HTML into DOM nodes
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const nodes = Array.from(doc.body.children); // h2, h3, p, etc.

  // Always show at least 1 heading + 1 paragraph
  let minVisibleCount = 0;
  let headingFound = false;
  let paraFound = false;

  for (let i = 0; i < nodes.length; i++) {
    const tag = nodes[i].tagName.toLowerCase();
    if (!headingFound && (tag === "h1" || tag === "h2" || tag === "h3")) {
      headingFound = true;
      minVisibleCount = i + 1;
    }
    if (headingFound && !paraFound && tag === "p" && nodes[i].textContent.trim()) {
      paraFound = true;
      minVisibleCount = i + 1;
      break;
    }
  }

  const visibleNodes = expanded ? nodes : nodes.slice(0, minVisibleCount);

  return (
    <div>
      {visibleNodes.map((node, index) => (
        <div
          key={index}
          dangerouslySetInnerHTML={{ __html: node.outerHTML }}
          className="mb-3 text-gray-700"
        />
      ))}

      {nodes.length > minVisibleCount && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 font-medium text-sm mt-2 hover:underline"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default ExpandableContent;
