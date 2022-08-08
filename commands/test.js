const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  configuration: {
    command: new SlashCommandBuilder()
      .setName('test')
      .setDescription('Test Command'),
    cooldown: 3000
  },
  execute: interaction => {
    interaction.reply(`You have successfully executed the test command.`);
  }
};
