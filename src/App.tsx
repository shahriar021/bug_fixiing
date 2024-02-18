import {NavigationContainer} from '@react-navigation/native';
import {Alert, Modal, SafeAreaView, StatusBar,Text, View} from 'react-native';
import DrawerNav from './View/Admin_layout/navigation/DrawerNav';
import Colors from './constants/Colors';
import StackNav from './View/Admin_layout/navigation/StackNav';
import FirstBox from './View/Admin_layout/navigation/FirstBox';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Icon from 'react-native-vector-icons/FontAwesome'


import { createStackNavigator } from '@react-navigation/stack';


import NavigatorList from '../NavigatorList';



import { TouchableOpacity } from 'react-native-gesture-handler';
import NavigatorPage from './View/Admin_layout/navigation/NavigatorPage';
import ScreenWrapper from './View/Admin_layout/navigation/ScreenWrapper';
import React, { useEffect, useState } from 'react';

import { importAllScreens } from './View/Admin_layout/navigation/utils';
import { modalComponents } from './View/Admin_layout/navigation/utils';


import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);


const Stack = createStackNavigator();




const App = () => {
  const screen = importAllScreens();
  console.log(screen, '----------------------------')

  const modal = modalComponents();
  console.log('modals names are : ', modal)


  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const [allModuleInfo, setAllModuleInfo] = useState([])
  useEffect(() => {
    fetch(`http://192.168.0.111:5002/module_info/module_info_all`)
    .then(res => res.json())
    .then(data => setAllModuleInfo(data))
  }, []);

  // JSON. parse(yourJsonString)
  // try {
  //   const jsonObject = JSON.parse(allModuleInfo);
  //   console.log(jsonObject);
  // } catch (error) {
  //   console.error('Error parsing JSON:', error);
  // }

  // console.log(allModuleInfo,"all_module")

  const [selectedModal, setSelectedModal] = useState([]);
  const [selectedModals, setSelectedModals] = useState([]);
 console.log(selectedModal, 'selectedModal')
 console.log(selectedModals, 'selectedModals')



// console.log(allModuleInfo)
// const bug =allModuleInfo.map(
//   allData => allData.controllers.map(
//   controller => controller.display_names.filter(
//   displayName => displayName.method_names[0] === selectedModal)))
//  console.log(allModuleInfo.map(allData => allData.controllers.map(controller => controller.display_names.filter(displayName => displayName.method_names[0] ))))


// console.log(
  // const a=allModuleInfo.map(allData => allData.controllers.map(controller => controller.display_names.filter(
  // displayName => 
  
  // displayName.method_names == 'payment_history_create'

  // // console.log(displayName)

  
  // )))
  // console.log(a[0][4])
// console.log((((a[0])[0])[0]).method_names[0]);
// console.log((a[0][4]).method_names);


// const data = allModuleInfo.map(allModuleInfos => allModuleInfos.controllers.map(controller => controller.display_names.map(displayName => displayName.method_names[0])) )
// console.log(data)
// const data = allModuleInfo.map(allModuleInfos =>
//   allModuleInfos.controllers.map(controller =>
//     controller.display_names
//       .filter(displayName => displayName.display_name === "Geo Location Create")
//       .map(displayName => displayName.method_names[0])
//   )
// );

// console.log(data);

const data = allModuleInfo
  .filter(allModuleInfos => allModuleInfos.controllers.some(controller => controller.controller_name === selectedModal))
  .map(allModuleInfos =>
    allModuleInfos.controllers
      .filter(controller => controller?.controller_name === selectedModal)
      .map(controller =>
        controller.display_names.map(displayName => displayName.method_names[0])
      )
  )
  .flat()  // Use flat to flatten the nested arrays
  .flat() // Use filter and indexOf to remove duplicates
   // Use filter and indexOf to remove duplicates

console.log((data[0]), 'typeof(data[0])');

// console.log(data[0][0][0])
// console.log(data[0][0][0], '[0]nayan');

// console.log(createData, '[0]nayan');
const formatString = (str: any) => {
  const words = str?.split('_');

  const formattedWords = words?.map((word: any) => {
    const capitalizedWord = word?.charAt(0).toUpperCase() +    word.slice(1).toLowerCase();
    return capitalizedWord;
  });

  return formattedWords?.join(' ');
};
//const screens = importAllScreens();
  return (
    
    <SafeAreaView style={{flex:1}}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="NavigatorPage"
  component={NavigatorPage}
  options={{
    title: 'HR Allowance',
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
  }}
        initialParams={{ setSelectedModal: setSelectedModal }} // Pass the prop here
/>

        <Stack.Screen name='ScreenWrapper' component={ScreenWrapper} 
          options={({ navigation,route }) => ({
            
            // headerTitle: '',
            headerTitle: route.params && route.params.screenTitle  ? route.params.screenTitle  : 'Default Title',
            // headerLeft: null, 
            // Customizing headerRight for ScreenWrapper
            headerRight: () => (
              // <TouchableOpacity
              //   onPress={() => {
              //     // Handle the button press action
              //     navigation.navigate('NavigatorPage');
              //   }}
              //   style={{ marginRight: 15 }}
              // >
               
              //   <Icon color={"#f7cd2e"} name='home' size={38}/>
              // </TouchableOpacity>

                

              //   <TouchableOpacity
              //   onPress={() => {
              //     // Handle the button press action
                  
                  
              //   }}
              //   style={{ marginRight: 15 }}
              // >
               
              //   <Icon color={"#f7cd2e"} name='add' size={38}/>
              // </TouchableOpacity>
                
              <View style={{ flexDirection: 'row', marginRight: 15 }}>
                  {/* First Button */}
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('NavigatorPage', {
                        setSelectedModal: setSelectedModal, // Pass the function as a prop
                      });
                    }}
                    style={{ marginRight: 8 }}
                  >
                    <Icon color={"#f7cd2e"} name='home' size={38} />
                  </TouchableOpacity>

                  {/* Second Button */}
                  <TouchableOpacity
                    onPress={() => {
                      const selectedMethodName = data[0];
                      setSelectedModals(selectedMethodName);
                      toggleModal()
                      //button for modal..
                      // Alert.alert(formatString(data[0]))

                      // const selectedModal = modal[data[0]]; // Change this based on your data structure
                      // setSelectedModal(selectedModal)




                     
                    // const selectedMethodName = data[0];
    
                    // Alert.alert(modal[data[0]], formatString(selectedMethodName));

                    
                    // setSelectedModals(modal[data[0]]);
          

                    // toggleModal();

                    }}
                  >
                    <Icon color={"#A52A2A"} name='plus' size={38} />
                  </TouchableOpacity>
                  
                </View>
            ),
          })}
        />
        
        
      </Stack.Navigator>
      {selectedModals && (
  <Modal
    animationType="slide"
    transparent={true}
    visible={isModalVisible}
  >
    {modal[selectedModals] && React.createElement(modal[selectedModals], {
      isVisible: isModalVisible,
      toggleModal: toggleModal,
    })}
  </Modal>
)}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;