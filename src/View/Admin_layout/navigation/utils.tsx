// utils.js

export const importAllScreens = () => {
  //   const context = require.context('./screens', false, /\.js$/);
  // const context = require.context('./screens', false, /\.tsx$/);
  // const context = require.context('./screens', false, /\.tsx$/);
  // const screens = {};

  // context.keys().forEach(key => {
  //   const screenName = key.replace(/\.tsx$/, '').replace('./', '');
  //   screens[screenName] = context(key).default;
  // });

  const screens = require.context('../../Admin/', true, /\.tsx$/);
  const screenComponents: {[key: string]: React.ComponentType<any>} = {};
  screens.keys().forEach((fileName: string) => {
    const componentName = fileName.replace(/^.*[\\\/]/, '').split('.')[0];
    screenComponents[componentName] = screens(fileName).default;
  });

  return screenComponents;
};
//password set koren anydesk er - shaharier
