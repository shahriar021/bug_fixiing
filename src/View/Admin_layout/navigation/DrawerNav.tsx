import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../../constants/Colors';
import {constant} from '../../../constants/constants';
import CustomDrawer from './CustomDrawer';

type DrawerParamList = {
  [key: string]: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNav = () => {
  const [route, setRoute] = useState('Dashboard');
  const [drawerTitle, setDrawerTitle] = useState('Dashboard');
  const [create, setCreate] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  // Import all screens dynamically
  const screens = require.context('../../Admin/', true, /\.tsx$/);
  const screenComponents: {[key: string]: React.ComponentType<any>} = {};
  screens.keys().forEach((fileName: string) => {
    const componentName = fileName.replace(/^.*[\\\/]/, '').split('.')[0];
    screenComponents[componentName] = screens(fileName).default;
  });

  // Import all modals dynamically
  const modals = require.context('../../Modals/', true, /\.tsx$/);
  const modalComponents: {[key: string]: React.ComponentType<any>} = {};
  modals.keys().forEach((fileName: string) => {
    const modalName = fileName.replace(/^.*[\\\/]/, '').split('.')[0];
    modalComponents[modalName] = modals(fileName).default;
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const ScreenComponent = screenComponents[route];
  const ModalComponent = modalComponents[create];
  console.log(ModalComponent);

  return (
    <View style={styles.container}>
      <Drawer.Navigator
        screenOptions={{
          drawerType: 'slide',
          overlayColor: 'transparent',
          drawerStyle: styles.drawerStyle,
          drawerActiveBackgroundColor: Colors.primary,
          drawerItemStyle: styles.drawerItemStyles,
          drawerActiveTintColor: Colors.black,
          drawerLabelStyle: styles.drawerLabelStyles,
        }}
        drawerContent={(props: DrawerContentComponentProps) => (
          <CustomDrawer
            {...props}
            setRoute={setRoute}
            setDrawerTitle={setDrawerTitle}
            setCreate={setCreate}
          />
        )}>
        {ScreenComponent && (
          <Drawer.Screen
            key={route}
            name={route}
            component={ScreenComponent}
            options={() => ({
              drawerLabel: drawerTitle,
              title: drawerTitle,
              headerRight:
                route === 'Dashboard'
                  ? null
                  : () => (
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={toggleModal}>
                        <Icon name="plus" style={styles.addButtonIcon} />
                      </TouchableOpacity>
                    ),
            })}
          />
        )}
      </Drawer.Navigator>
      {/* Render Modal Component if exists */}
      {ModalComponent && (
        <ModalComponent
          isVisible={isModalVisible}
          toggleModal={toggleModal}
          method={create}
        />
      )}
    </View>
  );
};

export default DrawerNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerStyle: {
    width: 240,
  },
  drawerItemStyles: {
    borderRadius: constant.borderRadius,
  },
  drawerLabelStyles: {
    fontSize: constant.textFontSize,
    marginHorizontal: -constant.SPACING,
  },
  addButton: {
    marginRight: 20,
    backgroundColor: '#007bff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  addButtonIcon: {
    fontSize: 20,
    color: 'white',
  },
});
