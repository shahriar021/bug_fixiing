// utils.js





export const importAllScreens = () => {


  const screens = require.context('../../Admin/', true, /\.tsx$/);
  const screenComponents: {[key: string]: React.ComponentType<any>} = {};
  screens.keys().forEach((fileName: string) => {
    const componentName = fileName.replace(/^.*[\\\/]/, '').split('.')[0];
    screenComponents[componentName] = screens(fileName).default;
  });

  return  screenComponents;
  // return screenComponents;
  

  


  
};

export const modalComponents = () => {
  const modals = require.context('../../Modals/', true, /\.tsx$/);
  const modalComponents: { [key: string]: React.ComponentType<any> } = {};
  modals.keys().forEach((fileName: string) => {
    const modalName = fileName.replace(/^.*[\\\/]/, '').split('.')[0];
    modalComponents[modalName] = modals(fileName).default;
  });

  return modalComponents;
}


// utils.tsx

// export const importAllComponents = () => {
//   const screens = require.context('../../Admin/', true, /\.tsx$/);
//   const modals = require.context('../../Modals/', true, /\.tsx$/);

//   const screenComponents: { [key: string]: React.ComponentType<any> } = {};
//   const modalComponents: { [key: string]: React.ComponentType<any> } = {};

//   screens.keys().forEach((fileName: string) => {
//     const componentName = fileName.replace(/^.*[\\\/]/, '').split('.')[0];
//     screenComponents[componentName] = screens(fileName).default;
//   });

//   modals.keys().forEach((fileName: string) => {
//     const modalName = fileName.replace(/^.*[\\\/]/, '').split('.')[0];
//     modalComponents[modalName] = modals(fileName).default;
//   });


//   console.log('Screen Components:', screenComponents);
//   console.log('Modal Components:', modalComponents);

//   return { screenComponents, modalComponents };
  
// };
