// Copies the RPG Maker MZ web export into dist/, which is where the bgp-admin
// deploy workflows look for the built web app before wrapping it with Capacitor.
// RPG Maker has no build step of its own, so this is only a copy.
//
// Files ending in "_" (e.g. "Battle1.ogg_", "IconSet.png_") are the game's
// encrypted assets, not leftovers: an encrypted RPG Maker export needs them all.
import { cpSync, rmSync } from "node:fs";

const GAME_ENTRIES = ["index.html", "audio", "css", "data", "effects", "fonts", "icon", "img", "js"];

rmSync("dist", { recursive: true, force: true });
for (const entry of GAME_ENTRIES) {
  cpSync(entry, `dist/${entry}`, { recursive: true, filter: (path) => !path.endsWith(".DS_Store") });
}
console.log("Copied the game into dist/");
