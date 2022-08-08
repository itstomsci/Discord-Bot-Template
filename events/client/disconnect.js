module.exports = {
  configuration: {
    once: false,
    event: 'disconnect'
  },
  execute: ({ user: { username } }) => {
    console.log(`${username} has disconnected from the gateway.`);
  }
};
