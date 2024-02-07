import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {importAllScreens} from './utils';
import ScreenWrapper from './ScreenWrapper';
import StackNavigator from './StackNavigator';

const screens = importAllScreens();
console.log(screens)

const NavigatorPage = () => {
  const navigation = useNavigation();
  const [selectedScreen, setSelectedScreen] = useState(null);

  const handleScreenPress = screenName => {
    setSelectedScreen(screenName);
    // navigation.navigate(screenName);
    navigation.navigate('ScreenWrapper', {screenName});
  };

  return (
    // <View style={{flex: 1}}>
    //   <StackNavigator selectedScreen={selectedScreen} screens={screens} />
    //   <View
    //     style={{
    //       flex: 1,
    //       flexDirection: 'column',
    //       justifyContent: 'space-around',
    //       padding: 5,
    //     }}>
    //     {Object.keys(screens).map(name => (
    //       <TouchableOpacity
    //         key={name}
    //         onPress={() => handleScreenPress(name)}
    //         style={{
    //           padding: 10,
    //           backgroundColor:
    //             selectedScreen === name ? 'lightblue' : 'transparent',
    //         }}>
    //         <Text>{name}</Text>
    //       </TouchableOpacity>
    //     ))}
    //   </View>
    // </View>
    <View style={{flex: 1}}>
      {/* <StackNavigator selectedScreen={selectedScreen} screens={screens} /> */}
      <View style={{width: '100%', height: 400, backgroundColor: 'lightblue'}}>
        <Text
          style={{
            display: 'flex',
            textAlign: 'center',
            color: 'red',
            fontSize: 30,
          }}>
          this is a dashboard
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          padding: 5,
        }}>
        {Object.keys(screens).map(name => (
          <TouchableOpacity
            key={name}
            onPress={() => handleScreenPress(name)}
            style={{
              padding: 10,
              backgroundColor:
                selectedScreen === name ? 'lightblue' : 'transparent',
            }}>
            <Text>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default NavigatorPage;

// // NavigatorPage.js
// // import React from 'react';
// // import { createStackNavigator } from '@react-navigation/stack';
// // import NavigatorList from './NavigatorList';

// // const Stack = createStackNavigator();

// // const StackNavigator = () => {
// //   return (
// //     <Stack.Navigator>
// //       <Stack.Screen name="NavigatorList" component={NavigatorList} />
// //       {/* Add other screens as needed */}
// //     </Stack.Navigator>
// //   );
// // };

// // export default StackNavigator;

// NavigatorPage.js
// import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// import NavigatorList from './NavigatorList';

// const Stack = createStackNavigator();

// const NavigatorPage = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="NavigatorList" component={NavigatorList} />
//       {/* Add other screens as needed */}
//     </Stack.Navigator>
//   );
// };

// export default NavigatorPage;

// NavigatorPage.js
// import React, { useState } from 'react';
// import { View, TouchableOpacity, Text } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import StackNavigator from './StackNavigator';
// import { importAllScreens } from './utils';

// const screens = importAllScreens();

// const NavigatorPage = () => {
//   const navigation = useNavigation();
//   const [selectedScreen, setSelectedScreen] = useState(null);

//   const handleScreenPress = screenName => {
//     setSelectedScreen(screenName);
//     // Navigate to a separate screen, not 'NavigatorPage'
//     navigation.navigate('ScreenWrapper', { screenName });
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <StackNavigator selectedScreen={selectedScreen} screens={screens} />
//       <View
//         style={{
//           flexDirection: 'column',
//           justifyContent: 'space-around',
//           padding: 5,
//         }}
//       >
//         {Object.keys(screens).map(name => (
//           <TouchableOpacity
//             key={name}
//             onPress={() => handleScreenPress(name)}
//             style={{
//               padding: 10,
//               backgroundColor:
//                 selectedScreen === name ? 'lightblue' : 'transparent',
//             }}
//           >
//             <Text>{name}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// export default NavigatorPage;
