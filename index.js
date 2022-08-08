const {
  Client,
  GatewayIntentBits: { Guilds },
  Collection
} = require('discord.js');
const {
  client: { token }
} = require('./configuration.json');

const client = new Client({ intents: [Guilds] });

client.commands = new Collection();

const { loadCommands, loadEvents } = require('./handlers');

loadCommands(client).then(() => loadEvents(client));

client.login(token);
