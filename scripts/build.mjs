import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = resolve(projectRoot, "out");

const publicFiles = [
  "index.html",
  "about.html",
  "services.html",
  "gallery.html",
  "contact.html",
  "styles.css",
  "script.js",
  "section-page.js",
  "images/V&B Nails Prescott Logo.png",
  "images/about-salon-main.jpg",
  "images/about-salon-manicure.jpg",
  "images/about-salon-pedicure.jpg",
  "images/award-wall.jpg",
  "images/hero-champagne-manicure.jpg",
  "images/hero-manicure-ritual.jpg",
  "images/hero-pearl-nail-art.jpg",
  "images/gallery",
  "images/icons/facebook.svg",
  "images/icons/google-maps.svg",
  "images/icons/instagram.svg"
];

await mkdir(outputDirectory, { recursive: true });
const existingEntries = await readdir(outputDirectory);
for (const entry of existingEntries) {
  await rm(resolve(outputDirectory, entry), { recursive: true, force: true });
}

for (const relativePath of publicFiles) {
  const sourcePath = resolve(projectRoot, relativePath);
  const destinationPath = resolve(outputDirectory, relativePath);
  await mkdir(dirname(destinationPath), { recursive: true });
  await cp(sourcePath, destinationPath, { recursive: true });
}

console.log(`Built ${publicFiles.length} production files in ${outputDirectory}`);
