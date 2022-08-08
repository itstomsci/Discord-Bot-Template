const { readdirSync, statSync } = require('fs');
const { resolve, basename } = require('path');

const loadCommands = async (client, directory = 'commands') => {
  readdirSync(directory).forEach(async result => {
    const path = resolve(directory, result);

    if (await statSync(path).isDirectory()) return loadCommands(client, path);

    const file = require(path);

    client.commands.set(file.configuration.command.name, file);

    console.log(`${basename(path)} loaded (command)`);
  });
};

const loadEvents = (client, directory = 'events') => {
  readdirSync(directory).forEach(async result => {
    const path = resolve(directory, result);

    if (await statSync(path).isDirectory()) return loadEvents(client, path);

    const file = require(path);

    const configuration = file.configuration;

    const event = configuration.event;

    if (configuration.once)
      client.once(event, (...args) => file.execute(...args));
    else client.on(event, (...args) => file.execute(...args));

    console.log(`${basename(path)} loaded (event)`);
  });
};

module.exports = {
  loadCommands: loadCommands,
  loadEvents: loadEvents
};
