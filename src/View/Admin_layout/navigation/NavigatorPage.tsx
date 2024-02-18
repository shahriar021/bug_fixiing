
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { importAllScreens,modalComponents } from './utils';


const NavigatorPage = ({route}) => {
  
  const {setSelectedModal} = route.params;
console.log(setSelectedModal)
  const navigation = useNavigation();
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [routes, setRoute] = useState('');
  console.log(routes, 'route')
  
  const screens = importAllScreens();
   const modal = modalComponents();
    //console.log('modals : ',modal)
  
  const ScreenComponent = screens[routes];

  console.log('ScreenComponent: ', ScreenComponent)

  const mainColor = '#6FC8D8';

  // const handleScreenPress = (screenName) => {
  //   //console.log('screenName: ', screenName)
  //   setSelectedScreen(screenName);
  //   setRoute(screenName);
  //   // navigation.navigate('ScreenWrapper', { ScreenComponent });
  //   navigation.navigate(ScreenComponent)
  // };
  const handleScreenPress = (screenName: any,controllerName) => {
    setSelectedModal(controllerName)
    console.log(screenName,)
    console.log(controllerName, 'controller_name')
    setSelectedScreen(screenName);
    setRoute(screenName);




    const modalComponent = modal[controllerName];
    // if (modalComponent) {
    //   modalComponent.openModal(); // Call a function to open the modal
    // }




    navigation.navigate('ScreenWrapper', { screenName: screenName,screenTitle: formatString(screenName) });
  };
  

  const [allModuleInfo, setAllModuleInfo] = useState([])
  useEffect(() => {
    fetch(`http://192.168.0.111:5002/module_info/module_info_all`)
    .then(res => res.json())
    .then(data => setAllModuleInfo(data))
  }, [])

  // const filteredMethodNames = allModuleInfo.reduce((acc, page) => {
  //   page.controllers.forEach((controller) => {
  //     controller.display_names.forEach((display) => {
  //       display.method_names.forEach((method) => {
  //         if (method.endsWith("_all")) {
  //           acc.push(method);
  //         }
  //       });
  //     });
  //   });
  //   return acc;
  // }, []);
  
  // console.log(filteredMethodNames);
  // console.log(allModuleInfo.map(module => module.controllers.map(controller => controller.display_names.map(displayName => displayName.method_names[0]))))
  // console.log( allModuleInfo.map(module => module.controllers.map(controller =>
  //   controller.display_names.map(displayName => displayName.method_names))))



  const formatString = (str: any) => {
    const words = str?.split('_');

    const formattedWords = words?.map((word: any) => {
      const capitalizedWord = word?.charAt(0).toUpperCase() +    word.slice(1).toLowerCase();
      return capitalizedWord;
    });

    return formattedWords?.join(' ');
  };
  return (
    <View style={styles.container}>


      {/* Header Section */}
      <View style={[styles.header, { backgroundColor: mainColor }]}>
        <Text style={styles.headerText}>HR Allowance</Text>
      </View>
      <ScrollView style={styles.content}>
  {allModuleInfo.map(module =>
    module.controllers.map(controller =>
      controller.display_names.map(displayName => {
        const methodNames = displayName.method_names.filter(methodName => methodName.endsWith('_all'));
       

        return methodNames.map(methodName => (
          <TouchableOpacity
            key={methodName}
            onPress={() => handleScreenPress(methodName, controller.controller_name)}
            style={[
              styles.screenButton,
              {
                backgroundColor: selectedScreen === controller ? mainColor : '#3498db',
                borderColor: selectedScreen === controller ? mainColor : '#0f9ea8',
              },
            ]}
          >
            <Text style={styles.screenButtonText}>
              {formatString(controller.controller_name)}
            </Text>
          </TouchableOpacity>
        ));
      })
    ))
    }
</ScrollView>


      {/* Main Content Section */}
      {/* <ScrollView style={styles.content}>
        {Object.keys(screens).map((name, index) => (
          <TouchableOpacity
            key={name}
            onPress={() => handleScreenPress(name)}
            style={[
              styles.screenButton,
              {
                backgroundColor: selectedScreen === name ? mainColor : '#3498db',
                borderColor: selectedScreen === name ? mainColor : '#0f9ea8',
              },
            ]}
          >
            <Text style={styles.screenButtonText}>{name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  screenButton: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NavigatorPage;
