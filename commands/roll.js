const { SlashCommandBuilder } = require("@discordjs/builders");
const { MOD } = require("../roles.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Take a chance and roll the dice!")
    .addIntegerOption((option) =>
      option
        .setName("dice")
        .setDescription("What sided dice?")
        .setRequired(true)
        .addChoice("d4", 4)
        .addChoice("d6", 6)
        .addChoice("d8", 8)
        .addChoice("d10", 10)
        .addChoice("d12", 12)
        .addChoice("d20", 20)
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("How many?")
        .setMaxValue(20)
        .setRequired(true)
    ),
  async execute(interaction) {
    if (interaction.member.roles.cache.has(MOD)) {
      const dice = interaction.options.getInteger("dice");
      const amount = interaction.options.getInteger("amount");
      if (amount > 100) {
        await interaction.reply(
          "Oh no! Your hands are too small and you cannot roll more than 100 dice at a time!"
        );
      } else if (amount < 1) {
        await interaction.reply("How do you plan on rolling less than 1 dice?");
      } else {
        let value = 0;
        for (let i = 1; i < amount; i++) {
          value += Math.floor(Math.random() * dice) + 1;
        }

        await interaction.reply(
          `You rolled a d${dice} ${amount} times, and rolled a ${value}`
        );
      }
    } else {
      await interaction.reply("You lack permission to use this command.");
    }
  },
};
