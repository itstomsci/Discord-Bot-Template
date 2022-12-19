const {
  Routes: { applicationCommands },
  Events: { ClientReady }
} = require('discord.js');

module.exports = {
  configuration: {
    once: false,
    event: ClientReady
  },
  execute: ({ user: { username, id }, users, guilds, commands, rest }) => {
    const userSize = users.cache.size;

    const guildSize = guilds.cache.size;

    console.log(
      `${username} is online, serving ${userSize} user${
        userSize == 1 ? '' : 's'
      } in ${guildSize} guild${guildSize == 1 ? '' : 's'}.`
    );

    if (process.argv[2] == '--register') {
      const currentCommands = [];

      commands.forEach(({ configuration: { command } }) =>
        currentCommands.push(command)
      );

      rest
        .put(applicationCommands(id), {
          body: currentCommands
        })
        .then(() =>
          console.log(
            `Successfully registered command${
              currentCommands.length == 1 ? '' : 's'
            }.`
          )
        );
    }
  }
};
