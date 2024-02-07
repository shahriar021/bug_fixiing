import {SERVER_IP_ADDRESS} from '@env';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import React, {useEffect, useState} from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Enable layout animations for Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Interfaces
interface DisplayName {
  display_name: string;
  method_names: string[];
}

interface Controller {
  controller_name: string;
  display_names: DisplayName[];
}

interface Group {
  page_group_id: number;
  page_group: string;
  controllers: Controller[];
}

const CustomDrawer = ({
  navigation,
  setRoute,
  setDrawerTitle,
  setCreate,
}: {
  navigation: DrawerNavigationHelpers;
  setRoute: React.Dispatch<React.SetStateAction<string>>;
  setDrawerTitle: React.Dispatch<React.SetStateAction<string>>;
  setCreate: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // State
  const [clickedButtons, setClickedButtons] = useState<boolean[]>([]);
  const [drawerMenu, setDrawerMenu] = useState<Group[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.0.125:5002/module_info/module_info_list`);
        if (response.ok) {
          const result = await response.json();
          setDrawerMenu(result);
          setClickedButtons(new Array(result.length).fill(false));
        } else {
          console.error('Failed to fetch data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Format string
  const formatString = (str: string | undefined) => {
    if (!str) return ''; // Return empty string if str is undefined or null
    return str
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Handle Dashboard click
  const handleDashboardClick = () => {
    setRoute('Dashboard');
    setDrawerTitle('Dashboard');
    setSelectedItem('Dashboard');
    navigation.toggleDrawer();
  };

  // Handle item click
  const handleItemClick = (
    displayName: string,
    route: string,
    create: string,
  ) => {
    setRoute(route);
    setDrawerTitle(displayName);
    setSelectedItem(displayName);
    setCreate(create);
    navigation.toggleDrawer();
  };

  // Handle dropdown click
  const handleClick = (index: number) => {
    setClickedButtons(prev => {
      const newClickedButtons = [...prev];
      // Toggle the clicked dropdown
      newClickedButtons[index] = !newClickedButtons[index];
      // Close other dropdowns
      for (let i = 0; i < newClickedButtons.length; i++) {
        if (i !== index) {
          newClickedButtons[i] = false;
        }
      }
      return newClickedButtons;
    });
  };

  return (
    <ScrollView style={{backgroundColor: '#3b5998', marginTop: -5}}>
      {/* Dashboard */}
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: selectedItem === 'Dashboard' ? '#263f78' : '#314B81',
        }}
        onPress={handleDashboardClick}>
        <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
          Dashboard
        </Text>
      </TouchableOpacity>

      {/* Drawer Menu */}
      {drawerMenu.map((group, index) => (
        <View key={group?.page_group_id}>
          {/* Group Header */}
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: '#4267b2',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: 'white',
            }}
            onPress={() => handleClick(index)}>
            <Text style={{color: 'white'}}>
              {formatString(group?.page_group)}
            </Text>
            {/* Arrow icon */}
            <Text style={{color: 'white', fontSize: 18}}>
              <Icon
                name={clickedButtons[index] ? 'angle-down' : 'angle-right'}
                size={18}
                color="white"
              />
            </Text>
          </TouchableOpacity>

          {/* Controllers */}
          {clickedButtons[index] && (
            <View style={{backgroundColor: '#314B81'}}>
              {group?.controllers?.map((controller: Controller) => (
                <TouchableOpacity
                  key={controller?.controller_name}
                  style={{
                    padding: 10,
                    backgroundColor:
                      selectedItem ===
                      formatString(controller?.display_names[1]?.display_name)
                        ? '#263f78'
                        : '#3b5998',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                  }}
                  onPress={() =>
                    handleItemClick(
                      formatString(controller?.display_names[1]?.display_name),
                      controller?.display_names[1]?.method_names[0],
                      controller?.display_names[0]?.method_names[0],
                    )
                  }>
                  <Text style={{color: 'white', paddingLeft: 5}}>
                    {formatString(controller?.controller_name)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default CustomDrawer;
