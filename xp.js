const { RichEmbed } = require("discord.js")

module.exports = {
  config: {
      name: "xp",
      aliases: [],
  },
run: async (bot, message, args, connection) => {
  message.delete();

  let user;

  if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
    connection.query(`SELECT * FROM account WHERE id = '${user.id}'`, (err, rows) => {
      if(err) throw err;

		  const noinfo = new RichEmbed()
		  .setColor("8A2BE2")
		  .setDescription(`We got 0 info on ${user.username} `)
		  .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)

      if(!rows[0]) return message.channel.send(noinfo);


      
      let bar1 = `1% ●──────────── 100%` //1%

      let bar2 = `25% ───●───────── 100%` //25%

      let bar3 = `50% ──────●────── 100%` //50%

      let bar4 = `75% ─────────●─── 100%` //75%

      let bar5 = `100% ─────────────● 100%` //100%
      
      let bar;
      let xp = rows[0].xp;
      let one = 15; //1%
      let two = 375;//25%
      let three = 750; //50%
      let four = 1125;//75%
      
      let xp1 = rows[0].level * one;
      let xp2 = rows[0].level * two;
      let xp3 = rows[0].level * three;
      let xp4 = rows[0].level * four; 
      if(xp <= xp1){
        bar = bar1;
      } else {
        if(xp <= xp2){
          bar = bar2;
        } else {
          if(xp <= xp3){
          bar = bar3;
          }else {
            if(xp <= xp4){
            bar = bar4;
            } else {
            bar = bar5;
          }
        }
      }}

      let level = rows[0].level

      let levelup = 1500;
      let nxtLvl = rows[0].level * levelup;
      let tilllvl = nxtLvl - xp;

      let xpbar = bar;

		  const msg = new RichEmbed()
		  .setAuthor("User XP Profile")
      .setColor("8A2BE2")
      .setDescription(`**XP**: ${xp} | **LVL**: ${level}\n${xpbar}`)
		  .setThumbnail(user.avatarURL)
		  .setFooter(`Left till next level up ${tilllvl} XP | ${nxtLvl} XP`)
		  message.channel.send(msg);
  })
}}