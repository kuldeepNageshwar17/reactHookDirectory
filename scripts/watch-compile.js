#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
let esbuild;
try {
  esbuild = require("esbuild");
} catch (err) {
  console.error(
    "esbuild is required to run this script. Install it with: npm install -D esbuild"
  );
  process.exit(1);
}

const hooksDir = path.resolve(__dirname, "../src/hooks");
const outFile = path.resolve(__dirname, "../public/compiledHooks.json");

function compileAll() {
  try {
    const files = fs
      .readdirSync(hooksDir)
      .filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"));
    const result = {};
    for (const file of files) {
      const id = path.basename(file).replace(/\.tsx?$/, "");
      const src = fs.readFileSync(path.join(hooksDir, file), "utf8");
      try {
        const res = esbuild.transformSync(src, {
          loader: "ts",
          format: "esm",
          target: "es2018",
        });
        result[id] = res.code;
      } catch (e) {
        console.warn("esbuild transform failed for", file, e && e.message);
        result[id] = src;
      }
    }
    fs.writeFileSync(outFile, JSON.stringify(result, null, 2), "utf8");
    console.log(
      new Date().toLocaleTimeString(),
      "Wrote compiled hooks to",
      outFile
    );
  } catch (err) {
    console.error("Failed to compile hooks:", err && err.message);
  }
}

// initial compile
compileAll();

// simple debounce helper
let timer = null;
const schedule = () => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    compileAll();
    timer = null;
  }, 150);
};

// watch the hooks directory for changes
try {
  const watcher = fs.watch(hooksDir, { persistent: true }, (evt, fname) => {
    if (!fname) return;
    // ignore dot-files
    if (fname.startsWith(".")) return;
    console.log(
      new Date().toLocaleTimeString(),
      "change detected in",
      fname,
      "- rebuilding snippets..."
    );
    schedule();
  });
  console.log("Watching", hooksDir, "for changes. Press Ctrl+C to stop.");
} catch (err) {
  console.error("Failed to watch hooks directory:", err && err.message);
  process.exit(1);
}
