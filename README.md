A Discord Bot made to return the Raider.io Score of a character in a simple, easy-to-read fashion without a lot of extra fluff unless requested by the user.

### Features
* Responds to user input through the 'r.io' command.
* Raider.io API call working. No further implementation done in it yet. It logs the JSON data to the console for now.

### Libraries
* [Node.js request 2.88.0](https://www.npmjs.com/package/request)

### Installation
* Clone the repo using your preferred method (otherwise `git clone https://github.com/Chrimitch/Discord-Simple-Raider.io`).
* [Follow this guide](https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/) on how to create a Discord Bot and invite it to your server.

### TODO
- [x] Integrate Raider.io
- [] 	Unique Commands based on different requests
- [] 	r.io [region]/[server]/[character]
- [] 	r.io [region]/[server]/[character] -br //best run
- [] 	r.io [region]/[server]/[character] -mr //most recent run
- [] 	r.io [region]/[server]/[character] -[dungeon-name-abbreviation] //best for dungeon
- []  r.io [region]/[server]/[character] -r //raid progress
- []  r.io [region]/[server]/[character] -a //list all pertinent information (io scores, raid progress, best run, most recent run)
