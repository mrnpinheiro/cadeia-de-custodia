const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'out',
    disable: process.env.NODE_ENV === 'development'
  },
  reactStrictMode: true,
});
