const {
  SlashCommandBuilder,
  PermissionFlagsBits: { Administrator }
} = require('discord.js');

module.exports = {
  configuration: {
    command: new SlashCommandBuilder()
      .setName('administrator')
      .setDescription('Administrator Command')
      .setDefaultMemberPermissions(Administrator),
    cooldown: 3000
  },
  execute: interaction => {
    interaction.reply(
      `You have successfully executed the administrator command.`
    );
  }
};
