// Copies the RPG Maker MZ web export into dist/, which is where the bgp-admin
// deploy workflows look for the built web app before wrapping it with Capacitor.
// RPG Maker has no build step of its own, so this is only a filtered copy.
import { cpSync, rmSync } from "node:fs";

const GAME_ENTRIES = ["index.html", "audio", "css", "data", "effects", "fonts", "icon", "img", "js"];

// Assets renamed with a trailing underscore (e.g. "Battle1.ogg_") were disabled
// on purpose to keep the app small; the game never loads them.
const isShipped = (path) => !path.endsWith("_") && !path.endsWith(".DS_Store");

rmSync("dist", { recursive: true, force: true });
for (const entry of GAME_ENTRIES) {
  cpSync(entry, `dist/${entry}`, { recursive: true, filter: isShipped });
}
console.log("Copied the game into dist/");
