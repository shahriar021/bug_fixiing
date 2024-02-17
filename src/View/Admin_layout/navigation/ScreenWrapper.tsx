// // ScreenWrapper.js
// import React, {useEffect} from 'react';
// import {View} from 'react-native';
// import {useRoute} from '@react-navigation/native';
// import {importAllScreens} from './utils';

// const screens = importAllScreens();

// const ScreenWrapper = () => {
//   const route = useRoute();
//   const {screenName} = route.params;

//   const ScreenComponent = screens[screenName];

//   useEffect(() => {
//     // Perform any additional setup or actions if needed
//     // This effect will run each time the screen changes
//   }, [screenName]);

//   return (
//     <View style={{flex: 1}}>{ScreenComponent && <ScreenComponent />}</View>
//   );
// };

// export default ScreenWrapper;

// ScreenWrapper.js
import React from 'react';
import {Modal, Text, View} from 'react-native';
// import {importAllComponents} from './utils';
import {importAllScreens,modalComponents} from './utils';

const screens = importAllScreens();
const modal = modalComponents();

//console.log(screens);

const ScreenWrapper = ({route}) => {
  const {screenName} = route.params;
  const {selectedModal}= route.params;
 

  // Render the selected screen in full-screen mode
  const SelectedScreen = screens[screenName];
  console.log(screenName, 'SelectedScreen')

  const SelectedModal = modal[selectedModal];
  console.log(selectedModal)
  //console.log(SelectedScreen);

  return (
    <View style={{flex: 1}}>
      <SelectedScreen />
      

      
    </View>
  );
};

export default ScreenWrapper;