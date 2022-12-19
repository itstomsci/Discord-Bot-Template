const {
  Collection,
  Events: { InteractionCreate }
} = require('discord.js');

const cooldowns = new Collection();

module.exports = {
  configuration: {
    once: false,
    event: InteractionCreate
  },
  execute: interaction => {
    if (!interaction.isChatInputCommand()) return;

    const file = interaction.client.commands.get(interaction.commandName);

    if (!file) return;

    const {
      configuration: {
        command: { name },
        cooldown
      }
    } = file;

    if (cooldown) {
      if (!cooldowns.has(name)) cooldowns.set(name, new Collection());

      const member = interaction.member;

      if (cooldowns.get(name).has(member.id))
        return interaction.reply({
          content:
            'You currently have a cooldown on this command; please try again later.',
          ephemeral: true
        });

      cooldowns.get(name).set(member.id);

      setTimeout(() => cooldowns.get(name).delete(member.id), cooldown);
    }

    file.execute(interaction);
  }
};
