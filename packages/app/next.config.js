const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'out'
  },
  reactStrictMode: true,
});