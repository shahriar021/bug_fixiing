// import React, {useState} from 'react';
// import {View, TouchableOpacity, Text} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {importAllScreens} from './utils';

// const NavigatorList = () => {
//   const navigation = useNavigation();
//   const [selectedScreen, setSelectedScreen] = useState(null);
//   const screens = importAllScreens();

//   const handleScreenPress = screenName => {
//     setSelectedScreen(screenName);
//     navigation.navigate('screens', {screenName});
//     console.log(screenName);
//   };

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <View>
//         {Object.keys(screens).map(name => (
//           <TouchableOpacity
//             key={name}
//             onPress={() => handleScreenPress(name)}
//             style={{
//               padding: 10,
//               backgroundColor:
//                 selectedScreen === name ? 'lightblue' : 'transparent',
//             }}>
//             <Text>{name}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// export default NavigatorList;

// NavigatorList.js
import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {importAllScreens} from './utils';
import NavigatorPage from './NavigatorPage';

const NavigatorList = () => {
  const navigation = useNavigation();
  const [selectedScreen, setSelectedScreen] = useState(null);
  const screens = importAllScreens();

  const handleScreenPress = screenName => {
    setSelectedScreen(screenName);
    navigation.navigate('NavigatorPage', {screenName});
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
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

export default NavigatorList;
