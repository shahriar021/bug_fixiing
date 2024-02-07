// utils.js

export const importAllScreens = () => {
  //   const context = require.context('./screens', false, /\.js$/);
  const context = require.context('./screens', false, /\.js$/);
  const screens = {};

  context.keys().forEach(key => {
    const screenName = key.replace(/\.js$/, '').replace('./', '');
    screens[screenName] = context(key).default;
  });

  return screens;
};
//password set koren anydesk er - shaharier