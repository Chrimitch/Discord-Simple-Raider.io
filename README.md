# R.io - A Raider.io Discord Bot #

A Discord Bot made to return the Raider.io Score of a character in a simple, easy-to-read fashion without a lot of extra fluff unless requested by the user.

### Features
* Responds to user input through the 'r.io' command.
* Can respond to arguments passed as flags (below).

### Commands
* `-br` Best run for a character in the current season.
* `-mr` Most recent run for a character in the current season.
* `-r` Raid progression for the current expansion's tiers.
* `-d [dungeon short_name]` Best run for the given dungeon. Dungeon name must be given as the Raider.io short_name. Short_names are listen below.
* `-nl` Removes the Raider.io character link from the bot response.
* `-a` This does `-br -mr -r` in a single argument. `-d` and `-nl` can be used with it, but using `-br`, `-mr`, or `-r` does nothing.

### Libraries
* [Node.js request 2.88.0](https://www.npmjs.com/package/request)
* [Raider.io API](https://raider.io/api/)

### Installation
* Clone the repo using your preferred method (otherwise `git clone https://github.com/Chrimitch/Discord-Simple-Raider.io`).
* Follow [this guide](https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/) on how to create a Discord Bot and invite it to your server.

### How to use
* `r.io [region]/[server]/[character]` is the default call for the bot.
* Multiple flags can be used in conjunction, but -d must be followed by a dungeon regardless. The order of flags does not matter.
* Use [this link](https://discordapp.com/oauth2/authorize?&client_id=530535106365095947&scope=bot&permissions=8) to invite him to your server. It's currently running on a Raspberry Pi 3B.

### Notes
* A player's best run is considered their highest scoring run.
* A player's best run for a dungeon is used through the dungeon's the abbreviation from Raider.io (ex. sots or kr; case does not matter).
* Dungeon Name         | Short_name
  ---------------------|------------
  Atal'dazar           | AD
  Freehold             | FH
  King's Rest          | KR
  The Motherlode!!     | ML
  Shrine of the Storms | SOTS
  Siege of Boralus     | SIEGE
  Temple of Sethraliss | TOS
  Tol Dagor            | TD
  The Underrot         | UNDR
  Waycrest Manor       | WM

### TODO
- [x] Integrate Raider.io
- [x] Unique Commands based on different requests (ignoring order)
- [x] r.io [region]/[server]/[character]
- [x] r.io [region]/[server]/[character] -br //best run
- [x] r.io [region]/[server]/[character] -mr //most recent run
- [x] r.io [region]/[server]/[character] -d [dungeon] //best for dungeon
- [x] r.io [region]/[server]/[character] -r //raid progress
- [x] r.io [region]/[server]/[character] -a //list all pertinent information (io score, raid progress, best run, most recent run)
