var Discord   = require('discord.io');
var DiscordJS = require('discord.js');
var logger    = require('winston');
var auth      = require('./auth.json');
var request   = require('request');

// Globals.
var us_servers      = [
  "Aegwynn","Aeriepeak","Agamaggan","Aggramar","Akama","Alexstrasza","Alleria","AltarofStorms","AlteracMountains","Andorhal","Anetheron","Antonidas",
  "Anubarak","Anvilmar","Arathor","Archimonde","Area52","ArgentDawn","Arthas","Arygos","Auchindoun","Azgalor","Azjol-Nerub","Azshara","Azuremyst","Baelgun","Balnazzar",
  "BlackDragonflight","Blackhand","Blackrock","BlackwaterRaiders","BlackwingLair","BladesEdge","Bladefist","BleedingHollow","BloodFurnace","Bloodhoof","Bloodscalp",
  "Bonechewer","BoreanTundra","Boulderfist","Bronzebeard","BurningBlade","BurningLegion","Cairne","CenarionCircle","Cenarius","Chogall","Chromaggus","Coilfang","Crushridge",
  "Daggerspine","Dalaran","Dalvengyr","DarkIron","Darkspear","Darrowmere","Dawnbringer","Deathwing","DemonSoul","Dentarg","Destromath","Dethecus","Detheroc","Doomhammer",
  "Draenor","Dragonblight","Dragonmaw","DrakTharon","Drakthul","Draka","Drenden","Dunemaul","Durotan","Duskwood","EarthenRing","EchoIsles","Eitrigg","EldreThalas",
  "Elune","EmeraldDream","Eonar","Eredar","Executus","Exodar","Farstriders","Feathermoon","Fenris","Firetree","Fizzcrank","Frostmane","Frostwolf","Galakrond","Garithos",
  "Garona","Garrosh","Ghostlands","Gilneas","Gnomeregan","Gorefiend","Gorgonnash","Greymane","GrizzlyHills","Guldan","Gurubashi","Hakkar","Haomarush","Hellscream","Hydraxis",
  "Hyjal","Icecrown","Illidan","Jaedenar","Kaelthas","Kalecgos","Kargath","KelThuzad","Khadgar","KhazModan","Kiljaeden","Kilrogg","KirinTor","Korgath","Korialstrasz",
  "KulTiras","LaughingSkull","Lethon","Lightbringer","LightningsBlade","Lightninghoof","Llane","Lothar","Madoran","Maelstrom","Magtheridon","Maiev","MalGanis","Malfurion",
  "Malorne","Malygos","Mannoroth","Medivh","Misha","MokNathal","MoonGuard","Moonrunner","Mugthol","Muradin","Nathrezim","Nazgrel","Nazjatar","Nerzhul","Nesingwary","Nordrassil",
  "Norgannon","Onyxia","Perenolde","Proudmoore","Queldorei","Ravencrest","Ravenholdt","Rexxar","Rivendare","Runetotem","Sargeras","ScarletCrusade","Scilla","Senjin","Sentinels",
  "ShadowCouncil","Shadowmoon","Shadowsong","Shandris","ShatteredHalls","ShatteredHand","Shuhalo","SilverHand","Silvermoon","SistersofElune","Skullcrusher","Skywall","Smolderthorn",
  "Spinebreaker","Spirestone","Staghelm","SteamwheedleCartel","Stonemaul","Stormrage","Stormreaver","Stormscale","Suramar","Tanaris","Terenas","Terokkar","TheForgottenCoast",
  "TheScryers","TheUnderbog","TheVentureCo","ThoriumBrotherhood","Thrall","Thunderhorn","Thunderlord","Tichondrius","Tortheldrin","Trollbane","Turalyon","TwistingNether","Uldaman",
  "Uldum","Undermine","Ursin","Uther","Vashj","Veknilash","Velen","Warsong","Whisperwind","Wildhammer","Windrunner","Winterhoof","WyrmrestAccord","Ysera","Ysondre","Zangarmarsh",
  "Zuljin","Zuluhed","AmanThul","Barthilas","Caelestrasz","DathRemar","Dreadmaul","Frostmourne","Gundrak","JubeiThos","Khazgoroth","Nagrand","Saurfang","Thaurissan","Drakkari",
  "QuelThalas","Ragnaros","Azralon","Gallywix","Goldrinn","Nemesis","TolBarad"
];
var eu_servers      = [
  "Aegwynn","AeriePeak","Agamaggan","Aggra","Aggramar","AhnQiraj","AlAkir","Alexstrasza","Alleria","Alonsus","AmanThul","Ambossar","Anachronos","Anetheron",
  "Antonidas","Anubarak","Arak-arahm","Arathi","Arathor","Archimonde","Area52","ArgentDawn","Arthas","Arygos","Ashenvale","Aszune","Auchindoun","AzjolNerub","Azshara",
  "Azuregos","Azuremyst","Baelgun","Balnazzar","Blackhand","Blackmoore","Blackrock","Blackscar","BladesEdge","Bladefist","Bloodfeather","Bloodhoof","Bloodscalp","Blutkessel",
  "BootyBay","BoreanTundra","Boulderfist","BronzeDragonflight","Bronzebeard","BurningBlade","BurningLegion","BurningSteppes","CThun","ChamberofAspects","Chantséternels",
  "Chogall","Chromaggus","ColinasPardas","ConfrérieduThorium","ConseildesOmbres","Crushridge","CultedelaRivenoire","Daggerspine","Dalaran","Dalvengyr","DarkmoonFaire",
  "Darksorrow","Darkspear","DasKonsortium","DasSyndikat","Deathguard","Deathweaver","Deathwing","Deepholm","DefiasBrotherhood","Dentarg","DerabyssischeRat","DerMithrilorden",
  "DerRatvonDalaran","Destromath","Dethecus","DieAldor","DieArguswacht","DieewigeWacht","DieNachtwache","DieSilberneHand","DieTodeskrallen","Doomhammer","Draenor",
  "Dragonblight","Dragonmaw","Drakthul","DrekThar","DunModr","DunMorogh","Dunemaul","Durotan","EarthenRing","Echsenkessel","Eitrigg","EldreThalas","Elune","EmeraldDream",
  "Emeriss","Eonar","Eredar","Eversong","Executus","Exodar","FestungderStürme","Fordragon","Forscherliga","Frostmane","Frostmourne","Frostwhisper","Frostwolf","Galakrond","Garona",
  "Garrosh","Genjuros","Ghostlands","Gilneas","Goldrinn","Gordunni","Gorgonnash","Greymane","GrimBatol","Grom","Guldan","Hakkar","Haomarush","Hellfire","Hellscream","HowlingFjord",
  "Hyjal","Illidan","Jaedenar","Kaelthas","Karazhan","Kargath","Kazzak","KelThuzad","Khadgar","KhazModan","Khazgoroth","Kiljaeden","Kilrogg","KirinTor","Korgall","Kragjin",
  "Krasus","KulTiras","KultderVerdammten","LaCroisadeécarlate","LaughingSkull","LesClairvoyants","LesSentinelles","LichKing","Lightbringer","LightningsBlade","Lordaeron",
  "LosErrantes","Lothar","Madmortem","Magtheridon","MalGanis","Malfurion","Malorne","Malygos","Mannoroth","MarécagedeZangar","Mazrigos","Medivh","Minahonda","Moonglade",
  "Mugthol","Nagrand","Nathrezim","Naxxramas","Nazjatar","Nefarian","Nemesis","Neptulon","Nerzhul","Nerathor","Nethersturm","Nordrassil","Norgannon","Nozdormu","Onyxia",
  "Outland","Perenolde","PozzodellEternità","Proudmoore","QuelThalas","Ragnaros","Rajaxx","Rashgarroth","Ravencrest","Ravenholdt","Razuvious","Rexxar","Runetotem","Sanguino",
  "Sargeras","Saurfang","ScarshieldLegion","Senjin","Shadowsong","ShatteredHalls","ShatteredHand","Shattrath","Shendralar","Silvermoon","Sinstralis","Skullcrusher","Soulflayer",
  "Spinebreaker","Sporeggar","SteamwheedleCartel","Stormrage","Stormreaver","Stormscale","Sunstrider","Suramar","Sylvanas","Taerar","Talnivarr","TarrenMill","Teldrassil","Templenoir",
  "Terenas","Terokkar","Terrordar","TheMaelstrom","TheShatar","TheVentureCo","Theradras","Thermaplugg","Thrall","ThrokFeroth","Thunderhorn","Tichondrius","Tirion","Todeswache",
  "Trollbane","Turalyon","TwilightsHammer","TwistingNether","Tyrande","Uldaman","Ulduar","Uldum","UnGoro","Varimathras","Vashj","Veklor","Veknilash","Voljin","Wildhammer",
  "Wrathbringer","Xavius","Ysera","Ysondre","Zenedar","ZirkeldesCenarius","Zuljin","Zuluhed","MarecagedeZangar","Chantseternels"
];
var valid_flags     = ['-br','-mr','-r','-d','-a'];
var bfa_dungeons    = ['wm','fh','siege','sots','td','ml','undr','kr','tos','ad'];
var us_server_regex = new RegExp(us_servers.join("|"), "i");
var eu_server_regex = new RegExp(eu_servers.join("|"), "i");
var flags_regex     = new RegExp(valid_flags.join("|"), "i");
var dungeons_regex  = new RegExp(bfa_dungeons.join("|"), "i");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
  token: auth.token,
  autorun: true
});
bot.on('ready', function (evt)
{
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
  if (message.substring(0, 5) === 'r.io ') {
    // Initialize variables.
    var flags        = [];    // Flags for passable arguments.
    var dungeon      = 'def'; // Default value for dungeon.
    var dungeon_flag = true;  // If the user hasn't done a key for this dungeon in the current season.
    const embed      = new DiscordJS.RichEmbed();

    // Split arguemts on spaces.
    var args       = message.split(' ');
    var character  = args[1];

    // Check format of input string. If valid, move on, else return and alert.
    var char_regex = new RegExp('^(us|eu)\/[a-zA-Z0-9\-\'\u00C9\u00E9]+\/[a-zA-Z\u00DF-\u0111]+$', "i")
    if(!char_regex.test(character)) {
      embed.setTitle('Error');
      embed.setDescription('Invalid format.');
      embed.setColor('RED');
      bot.sendMessage({
        to: channelID,
        message: '',
        embed: embed
      });
      return;
    }

    // Break up the character arguments.
    var char_args  = character.split('/');
    var region     = char_args[0];
    var server     = char_args[1];
    var name       = char_args[2];

    // If args length > 2, get and validate flags (dungeon as well if there).
    if(args.length > 2) {
      for(i=2;i<args.length;i++) {
        if(args[i] === '-d' || args[i] === '-D') {
          flags.push(args[i].toLowerCase());
          dungeon = args[i+1].toUpperCase();
          if(validate_dungeon(dungeon) == 1) {
            bot.sendMessage({
              to: channelID,
              message: `Invalid dungeon.`
            });
            return;
          }
          i+=1;
        }
        else {
          flags.push(args[i].toLowerCase());
        }
      }
      if(validate_flags(flags) == 1) {
        bot.sendMessage({
          to: channelID,
          message: `Invalid flag(s).`
        });
        return;
      }
    }

    switch(compare_region_server(region, server)) {
      case 0:
        var io_promise = get_io_info(region, server, name, flags);

        io_promise.then(
          function(result) {
            var io_data = result;
            // console.log(io_data);
            embed.setTitle(io_data.name + ' - Raider.io');
            embed.setDescription(io_data.name + '\'s score is ' + io_data.mythic_plus_scores.all);
            embed.setThumbnail(io_data.thumbnail_url);
            embed.setColor('ORANGE');
            embed.setURL(io_data.profile_url);
            embed.setFooter('R.io - Raider.io for Discord');
            if(flags.includes('-a')) { embed.addField('Best Run', io_data.mythic_plus_best_runs[0].dungeon + ' (' + io_data.mythic_plus_best_runs[0].short_name + ') +' + io_data.mythic_plus_best_runs[0].mythic_level + ' scoring ' + io_data.mythic_plus_best_runs[0].score);
                                       embed.addField('Most Recent Run', io_data.mythic_plus_recent_runs[0].dungeon + ' (' + io_data.mythic_plus_recent_runs[0].short_name + ') +' + io_data.mythic_plus_recent_runs[0].mythic_level + ' scoring ' + io_data.mythic_plus_recent_runs[0].score);
                                       embed.addField('Raid Progression', 'Uldir: ' + io_data.raid_progression.uldir.normal_bosses_killed + '/' + io_data.raid_progression.uldir.total_bosses +'N, ' + io_data.raid_progression.uldir.heroic_bosses_killed + '/' + io_data.raid_progression.uldir.total_bosses +'H, ' + io_data.raid_progression.uldir.mythic_bosses_killed + '/' + io_data.raid_progression.uldir.total_bosses + 'M.'); }
            else {
              if(flags.includes('-br')) { embed.addField('Best Run', io_data.mythic_plus_best_runs[0].dungeon + ' (' + io_data.mythic_plus_best_runs[0].short_name + ') +' + io_data.mythic_plus_best_runs[0].mythic_level + ' scoring ' + io_data.mythic_plus_best_runs[0].score); }
              if(flags.includes('-mr')) { embed.addField('Most Recent Run', io_data.mythic_plus_recent_runs[0].dungeon + ' (' + io_data.mythic_plus_recent_runs[0].short_name + ') +' + io_data.mythic_plus_recent_runs[0].mythic_level + ' scoring ' + io_data.mythic_plus_recent_runs[0].score); }
              if(flags.includes('-r'))  { embed.addField('Raid Progression', 'Uldir: ' + io_data.raid_progression.uldir.normal_bosses_killed + '/' + io_data.raid_progression.uldir.total_bosses +'N, ' + io_data.raid_progression.uldir.heroic_bosses_killed + '/' + io_data.raid_progression.uldir.total_bosses +'H, ' + io_data.raid_progression.uldir.mythic_bosses_killed + '/' + io_data.raid_progression.uldir.total_bosses + 'M.'); }
            }
            if(flags.includes('-d'))  {
              // Loop through mythic_plus_best_runs array to find matching dungeon
              io_data.mythic_plus_best_runs.every( function(el, i) {
                if(el.short_name === dungeon) { embed.addField('Best Run in ' + el.dungeon + ' (' + el.short_name + ')', '+' + el.mythic_level + ' scoring ' + el.score + '.'); dungeon_flag = false; return false; }
                else { return true; }
              });
              if(dungeon_flag == true) { embed.addField('Best Run in ' + el.dungeon + ' (' + el.short_name + ')', io_data.name + ' has not completed a key for this dungeon in the current season.'); }
            }

            bot.sendMessage({
              to: channelID,
              message: '',
              embed: embed
            });
        }, function(error) {
            console.log(error);
            embed.setTitle('Error');
            embed.setDescription('Couldn\'t find that character. Double check spelling.');
            embed.setColor('RED');
            bot.sendMessage({
              to: channelID,
              message: '',
              embed: embed
            });
        })
        break;
      case 1:
        console.log('Error on server: ' + character);
        embed.setTitle('Error');
        embed.setDescription('Couldn\'t find that server. Try again.');
        embed.setColor('RED');
        bot.sendMessage({
          to: channelID,
          message: '',
          embed: embed
        });
        break;
      case -1:
        console.log('Error on region: ' + character);
        embed.setTitle('Error');
        embed.setDescription('Region does not exist.');
        embed.setColor('RED');
        bot.sendMessage({
          to: channelID,
          message: '',
          embed: embed
        });
        break;
      default:
        break;
    }
  }
});

/*
  Check to see if the server is in the region. Return 0 if true, 1 if false, -1 if region does not match.
*/
function compare_region_server(region, server) {
  var us_regexp = /us/i;
  var eu_regexp = /eu/i;
  if(region.match(us_regexp)) {
    if(us_server_regex.test(server)) { return 0; }
    else { return 1; }
  }
  else if(region.match(eu_regexp)) {
    if(eu_server_regex.test(server)) { return 0; }
    else { return 1; }
  }
  else {
    return -1;
  }
}

/*
  Validate to see if the flag(s) is/are valid or not. Returns 0 if all valid, 1 if one not valid, -1 if empty.
*/
function validate_flags(flags) {
  if(flags.length == 0) { return -1; }
  else {
    flags.forEach(function(el) {
      if(!flags_regex.test(el)) { return 1; }
    });
    return 0;
  }
}

/*
  Validate to see if the dungeon matches an abbreviation. Returns 0 if valid, 1 if not valid, -1 if empty.
*/
function validate_dungeon(dungeon) {
  if(dungeon === 'def') { return -1; }
  else {
    if(!dungeons_regex.test(dungeon)) { return 1; }
    return 0;
  }
}

/*
  Get Raider.io JSON data from Raider.io given a character's region, server, and name.
  ['-br','-mr','-r','-d','-a']
*/
function get_io_info(region, server, name, flags) {
  var address = 'https://raider.io/api/v1/characters/profile?region='+region+'&realm='+server+'&name='+name+'&fields=mythic_plus_scores';
  if(flags.includes('-a')) { address += ',mythic_plus_best_runs:all,mythic_plus_recent_runs,raid_progression'; }
  else {
    if(flags.includes('-br') && flags.includes('-d')) { address += ',mythic_plus_best_runs:all'; }
    else if(flags.includes('-d'))                     { address += ',mythic_plus_best_runs:all'; }
    else if(flags.includes('-br'))                    { address += ',mythic_plus_best_runs'; }
    if(flags.includes('-mr'))                         { address += ',mythic_plus_recent_runs'; }
    if(flags.includes('-r'))                          { address += ',raid_progression'; }
  }
  return new Promise(function(resolve, reject) {
    request(address, function (error, response, body) {
      if(error || response.statusCode != 200) {
        reject(error);
      }
      else {
        resolve(JSON.parse(body));
      }
    })
  })
}
