import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StatusBar,Text} from 'react-native';
import DrawerNav from './View/Admin_layout/navigation/DrawerNav';
import Colors from './constants/Colors';
import StackNav from './View/Admin_layout/navigation/StackNav';
import FirstBox from './View/Admin_layout/navigation/FirstBox';

import { createStackNavigator } from '@react-navigation/stack';

import NavigatorPage from '../NavigatorPage';
import NavigatorList from '../NavigatorList';
import ScreenWrapper from '../ScreenWrapper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();



const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar backgroundColor={Colors.red} barStyle="light-content" />
      
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="NavigatorPage" component={NavigatorPage} />
        <Stack.Screen name="ScreenWrapper" component={ScreenWrapper} 
          options={({ navigation }) => ({
            // Customizing headerRight for ScreenWrapper
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  // Handle the button press action
                  navigation.navigate('NavigatorPage');
                }}
                style={{ marginRight: 15 }}
              >
                <Text>DashBoard</Text>
              </TouchableOpacity>
            ),
          })}
        />
        {/* Add other screens as needed */}
      </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
