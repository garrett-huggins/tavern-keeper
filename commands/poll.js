const { SlashCommandBuilder, channelMention } = require("@discordjs/builders");
const { MOD } = require("../roles.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Creates a yes or no poll.")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Enter poll title.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Enter poll description.")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("destination")
        .setDescription("Enter channel to send poll in.")
        .setRequired(true)
    ),
  // DO NOT SET OPTION NAMES TO UPPERCASE
  //check discord api for option name regex

  async execute(interaction) {
    if (interaction.member.roles.cache.has(MOD)) {
      const pollTitle = interaction.options.getString("title");
      const pollDesc = interaction.options.getString("description");
      const targetChannel = interaction.options.getChannel("destination");

      const poll = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle(pollTitle)
        .setDescription(pollDesc);
      await targetChannel
        .send({ embeds: [poll] })
        .then((msgReaction) => {
          msgReaction.react("👍");
          msgReaction.react("👎");
        })
        .then(
          interaction.reply({ content: "New Poll Created!", ephemeral: "true" })
        );
    } else {
      await interaction.reply("You lack permission to use this command.");
    }
  },
};
