const publicPath = '/';
const target = 'https://sistemasport.ru/';
const devServer = {
  port: 3094,
  open: true,
  proxy: {
    '/competitionapi': {
      target,
      ws: true,
      changeOrigin: true,
    },
    '/chatHub': {
      target,
      ws: true,
      changeOrigin: true,
    },
    '/signalr': {
      target,
      ws: true,
      changeOrigin: true,
    },
  },
};

module.exports = {
  publicPath,
  devServer,
  transpileDependencies: [
    'vuetify',
  ],
};
