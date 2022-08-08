module.exports = {
  configuration: {
    once: false,
    event: 'reconnecting'
  },
  execute: ({ user: { username } }) => {
    console.log(`${username} is reconnecting to the gateway.`);
  }
};
