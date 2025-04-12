#!/usr/bin/env -S deno run -A
// @ts-check

import sharp from "sharp";
import { DOMParser } from "linkedom";

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
  "icon_fgmorgans_fgmaskable",
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
    case "icon_fgmorgans_fgmaskable": {
      svgElement.setAttribute("aria-labelledby", "morgans-logo-title morgans-logo-description");
      titleElement.innerHTML = 
        'Morgans Logo';
      titleElement.setAttribute("id", "morgans-logo-title");
      descElement.innerHTML = 
        "An atomic grey square background and the letter M inside in platinum";
      descElement.setAttribute("id", "morgans-logo-description");
      fg.setAttribute("transform", "matrix(.9 0 0 .9 -124.6 50)");
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

  /** @type {('avif' | 'png' | 'webp')[]} */
  const avifPngWebp = ["avif", "png", "webp"];

  /** @type {('avif' | 'png')[]} */
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

  if (logoFileName === "icon_fgmorgans" || logoFileName === "icon_fgmorgans_fgmaskable" || logoFileName === "icon_fgmorgans_bgtp_dark" || logoFileName === "icon_fgmorgans_bgtp_light" || logoFileName === "icon") {
    for (let format of avifPng) {
      const result = image.toFormat(format, {
        lossless: true,
        effort: 9,
      });

      result.resize(128, 128).toFile(`${logoFileName}_x128.${format}`);
      result.resize(512, 512).toFile(`${logoFileName}_x512.${format}`);
      result.resize(1000, 1000).toFile(`${logoFileName}_x1000.${format}`);
    }
  }

  // Use sharp to render the `.ico` from the small SVG
  const smallImage = await sharp('icon_bgrounded.svg');
  await smallImage
    .resize(32, 32)
    .toFile('favicon.ico');
}

// cd to folder
// Run as `deno run --allow-env --allow-ffi --allow-read --allow-write assets.mjs`

// Startup: npm init -> installs (deno, sharp, linkedom)

// Dependencies (macOS):
// <https://brew.sh/#install>   | brew update                 | brew -v
// [cd] npm install -g deno     | [cd] npm update -g deno     | npm view deno version
// brew install node            | brew upgrade node --greedy  | node --version
// brew install node            | npm update -g npm           | npm --version
// [cd] npm install -g sharp    | [cd] npm update -g sharp    | npm view sharp version
// [cd] npm install -g linkedom | [cd] npm update -g linkedom | npm view linkedom version

// Last run on 2025-04-12T09:56:00.000Z with software:
//   brew: v4.4.29 <https://github.com/Homebrew/brew/releases>
//   deno: v2.2.9 <https://github.com/denoland/deno/releases>
//   node: v23.11.0 <https://github.com/nodejs/node/releases> 
//   npm: v11.3.0 <https://github.com/npm/cli/releases>
//   sharp: v0.34.1 <https://github.com/lovell/sharp/releases>
//   linkedom: v0.18.9 <https://github.com/WebReflection/linkedom/tags>
//   macOS: v15.4

// Latest logo version: v0.1.4.1