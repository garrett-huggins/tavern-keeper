const { SlashCommandBuilder } = require("@discordjs/builders");
const { MOD } = require("../roles.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clears the number of previous messages.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Number of messages to delete")
        .setMinValue(1)
        .setMaxValue(5) //this does not work. May start working after discord.js next release?
        .setRequired(true)
    ),

  async execute(interaction) {
    if (interaction.member.roles.cache.has(MOD)) {
      const msgAmount = interaction.options.getInteger("amount");

      /* temp fix until min and max values works */
      if (msgAmount < 1 || msgAmount > 25) {
        interaction.reply({
          content: "please choose an amount between 1-25",
          ephemeral: true,
        });
      } else {
        await interaction.channel
          .bulkDelete(msgAmount, true)
          .then((_message) => {
            interaction.reply({
              content: `Bot cleared ${msgAmount} messages :broom:`,
              ephemeral: true,
            });
          });
      }
    } else {
      await interaction.reply("You lack permission to use this command.");
    }
  },
};
