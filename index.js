require("dotenv").config();
const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.BOT_TOKEN;

const USER_1 = 6408119728;   // Areeb
const USER_2 = 7640483413;   // Friend 

const bot = new TelegramBot(TOKEN, { polling: true });

function otherUser(id) {
  return id === USER_1 ? USER_2 : USER_1;
}

bot.on("message", (msg) => {
  const fromId = msg.from.id;

  // Allow only 2 users
  if (fromId !== USER_1 && fromId !== USER_2) return;

  const target = otherUser(fromId);

  if (msg.text) {
    bot.sendMessage(target, msg.text);
  }

  if (msg.photo) {
    bot.sendPhoto(target, msg.photo[msg.photo.length - 1].file_id);
  }

  if (msg.voice) {
    bot.sendVoice(target, msg.voice.file_id);
  }

  if (msg.video) {
    bot.sendVideo(target, msg.video.file_id);
  }
});

console.log("🤖 Bot running...");
