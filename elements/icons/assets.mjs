#!/usr/bin/env -S deno run -A
// @ts-check

import sharp from "npm:sharp@0.33.5";
import { DOMParser } from "npm:linkedom@0.18.5";

/** the text contained in the source SVG file */
const text = await Deno.readTextFile("icon.svg");

// Names of the SVGs to use for generation
const logoFileNames = 
[
  "icon",
  "bimi_fgmaskable", 
  "icon_bgrounded", 
  "icon_bgtp_dark", 
  "icon_bgtp_light", 
  "icon_fgmaskable", 
  "icon_fgmorgans", 
  "icon_fgmorgans_bgtp_dark",
  "icon_fgmorgans_bgtp_light"
];

// Start the generation process for each logo
for (const logoFileName of logoFileNames) {
  const svg = new DOMParser().parseFromString(text, "image/svg+xml");

  const fg = svg.getElementById("foreground");
  const bg = svg.getElementById("background");
  const title = svg.getElementById("tyler-morgan-logo-title");
  const titleElement = svg.querySelector("title");
  const morgansTitle = svg.getElementById("morgans-logo-title");
  const description = svg.getElementById("tyler-morgan-logo-description");
  const morgansDescription = svg.getElementById("morgans-logo-description");
  const svgElement = svg.querySelector("svg");
  const descElement = svg.querySelector("desc");
  const letterT = svg.getElementById("letter-t");
  const leftBar = svg.getElementById("left-bar");
  const rightBar = svg.getElementById("right-bar");

  switch (logoFileName) {
    case "icon": {
      // this is the source logo, do nothing!
      break;
    }
    case "bimi_fgmaskable": {
      svgElement.setAttribute("version", "1.2");
      svgElement.setAttribute("baseProfile", "tiny-ps");
      svgElement.removeAttribute("aria-labelledby");
      fg.setAttribute("transform", "matrix(0.7,0,0,0.7,150,150)");
      break;
    }
    case "icon_bgrounded": {
      description.innerHTML =
        "An atomic grey rounded square background and the letters TM inside in platinum";
      bg.setAttribute("rx", "175.439");
      break;
    }
    case "icon_bgtp_dark": {
      description.innerHTML =
        "A transparent square background and the letters TM inside in platinum";
      bg.remove();
      break;
    }
    case "icon_bgtp_light": {
      description.innerHTML =
        "A transparent square background and the letters TM inside in atomic grey";
      bg.remove();
      fg.setAttribute("fill", "#424a4e");
      break;
    }
    case "icon_fgmaskable": {
      fg.setAttribute("transform", "matrix(0.7,0,0,0.7,150,150)");
      break;
    }
    case "icon_fgmorgans": {
      svgElement.setAttribute("aria-labelledby", "morgans-logo-title morgans-logo-description");
      titleElement.innerHTML = 
        'Morgans Logo';
      titleElement.setAttribute("id", "morgans-logo-title");
      descElement.innerHTML = 
        "An atomic grey square background and the letter M inside in platinum";
      descElement.setAttribute("id", "morgans-logo-description");
      fg.setAttribute("transform", "matrix(1.25,0,0,1.25,-367.5,-125)");
      letterT.remove();
      leftBar.remove();
      rightBar.setAttribute("id", "bar");
      break;
    }
    case "icon_fgmorgans_bgtp_dark": {
      svgElement.setAttribute("aria-labelledby", "morgans-logo-title morgans-logo-description");
      titleElement.innerHTML = 
        'Morgans Logo';
      titleElement.setAttribute("id", "morgans-logo-title");
      descElement.innerHTML = 
        "A transparent square background and the letter M inside in platinum";
      descElement.setAttribute("id", "morgans-logo-description");
      bg.remove();
      fg.setAttribute("transform", "matrix(1.25,0,0,1.25,-367.5,-125)");
      letterT.remove();
      leftBar.remove();
      rightBar.setAttribute("id", "bar");
      break;
    }
    case "icon_fgmorgans_bgtp_light": {
      svgElement.setAttribute("aria-labelledby", "morgans-logo-title morgans-logo-description");
      titleElement.innerHTML = 
        'Morgans Logo';
      titleElement.setAttribute("id", "morgans-logo-title");
      descElement.innerHTML = 
        "A transparent square background and the letter M inside in atomic grey";
      descElement.setAttribute("id", "morgans-logo-description");
      bg.remove();
      fg.setAttribute("fill", "#424a4e");
      fg.setAttribute("transform", "matrix(1.25,0,0,1.25,-367.5,-125)");
      letterT.remove();
      leftBar.remove();
      rightBar.setAttribute("id", "bar");
      break;
    }
  }

  // overwrite the SVG files with the updated content
  await Deno.writeTextFile(
    `${logoFileName}.svg`,
    svg.toString().replace('<?xml version="1.0" encoding="utf-8"?>', ""),
  );

  // Load the SVG file into sharp
  const image = await sharp(`${logoFileName}.svg`);

  const avifPngWebp = ["avif", "png", "webp"];
  const avifPng = ["avif", "png"];

  // Generate the different formats for the logo

  if (logoFileName === "icon") {
    const result = image.toFormat("avif", {
      lossless: true,
      effort: 9,
    });
  
    result.resize(180, 180).toFile(`apple-touch-icon.avif`);
  }

  if (logoFileName === "icon_bgrounded" || logoFileName === "icon_fgmaskable") {
    for (let format of avifPngWebp) {
      const result = image.toFormat(format, {
        lossless: true,
        effort: 6,
      });

      result.resize(192, 192).toFile(`${logoFileName}_x192.${format}`);
      result.resize(512, 512).toFile(`${logoFileName}_x512.${format}`);
    }
  }

  if (logoFileName === "icon_bgtp_dark" || logoFileName === "icon_bgtp_light") {
    for (let format of avifPng) {
      const result = image.toFormat(format, {
        lossless: true,
        effort: 9,
      });

      result.resize(180, 180).toFile(`${logoFileName}_x180.${format}`);
      result.resize(192, 192).toFile(`${logoFileName}_x192.${format}`);
    }
  }

  if (logoFileName === "icon_fgmorgans" || logoFileName === "icon_fgmorgans_bgtp_dark" || logoFileName === "icon_fgmorgans_bgtp_light" || logoFileName === "icon") {
    for (let format of avifPng) {
      const result = image.toFormat(format, {
        lossless: true,
        effort: 9,
      });

      result.resize(128, 128).toFile(`${logoFileName}_x128.${format}`);
      result.resize(512, 512).toFile(`${logoFileName}_x512.${format}`);
    }
  }

  // Use sharp to render the `.ico` from the small SVG
  const smallImage = await sharp('icon_bgrounded.svg');
  await smallImage
    .resize(32, 32)
    .toFile('favicon.ico');
}

// cd to folder
// Run as `deno run --allow-read --allow-write --allow-net --allow-env --allow-ffi assets.mjs`

// Dependencies (macOS):
// brew install deno
// brew install npm
// npm install -g sharp
// npm install -g linkedom