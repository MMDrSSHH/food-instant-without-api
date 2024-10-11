"use client";
import React, { useEffect, useRef, useState } from "react";

const svgCache = new Map();

export default function FetchSvg({ url, className, fetchOptions }) {
  const [svgContent, setSvgContent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const fetchSvg = async () => {
      if (svgCache.has(url)) {
        setSvgContent(svgCache.get(url));
        return;
      }

      try {
        const response = await fetch(url, { ...fetchOptions });

        if (!response.ok) {
          throw new Error(`Error fetching svg: ${response.statusText}`);
        }

        const svgText = await response.text();
        svgCache.set(url, svgText);
        setSvgContent(svgText);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSvg();
  }, [url, isVisible]);

  useEffect(() => {
    if (svgContent) {
      const parser = new DOMParser();
      const svgDocument = parser.parseFromString(svgContent, "image/svg+xml");
      const svgElement = svgDocument.querySelector("svg");
      // const pathElement = svgDocument.querySelector("path");

      // if (pathElement) {
      //   pathElement.removeAttribute("fill");
      // }

      if (svgElement) {
        removeAttributeFromDescendants(svgElement, "fill");
        if (className) {
          svgElement.classList.add(...className.split(" "));
        }
        setSvgContent(svgElement.outerHTML);
      }
    }
  }, [svgContent, className]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: svgContent }} />;
}

function removeAttributeFromDescendants(root, attributeName) {
  if (!root || !attributeName) return;

  // Remove the attribute from the current element
  if (root.hasAttribute(attributeName)) {
    root.removeAttribute(attributeName);
  }

  // Recursively remove the attribute from child elements
  for (let i = 0; i < root.children.length; i++) {
    removeAttributeFromDescendants(root.children[i], attributeName);
  }
}
