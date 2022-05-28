const { SlashCommandBuilder } = require("@discordjs/builders");
const { MOD } = require("../roles.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    if (interaction.member.roles.cache.has(MOD)) {
      await interaction.reply({ content: "pong!", ephemeral: "true" });
    } else {
      await interaction.reply("You lack permission to use this command.");
    }
  },
};
