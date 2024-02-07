import {SERVER_IP_ADDRESS} from '@env';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Building {
  id: number;
  building_name: string;
  created_date: string; // Assuming created_date is a string in ISO format
}

const BuildingAll = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Building[]>([]);

  useEffect(() => {
    fetchBuildingData();
  }, []);

  const fetchBuildingData = async () => {
    try {
      const response = await fetch(`${SERVER_IP_ADDRESS}all_building`);
      const jsonData: Building[] = await response.json();
      // Parse and format dates
      const formattedData: Building[] = jsonData.map(item => ({
        ...item,
        created_date: formatDateTime(item.created_date),
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching building data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to format date and time
  const formatDateTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    // Format date and time
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.bold, styles.column]}>
              Building Name
            </Text>
            <Text style={[styles.cell, styles.bold, styles.column]}>
              Created Date
            </Text>
            <Text style={[styles.cell, styles.bold, styles.column]}>
              Action
            </Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.row}>
                <Text style={[styles.cell, styles.column]}>
                  {item.building_name}
                </Text>
                <Text style={[styles.cell, styles.column]}>
                  {item.created_date}
                </Text>
                <TouchableOpacity
                  style={[styles.editCell, styles.column]}
                  onPress={() => console.log('Edit pressed')}>
                  <Text style={[styles.editLink, styles.bold]}>Edit</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Center vertically
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    padding: 5,
    color: '#000000', // Black text color
    textAlign: 'left',
  },
  bold: {
    fontWeight: 'bold', // Bold text
    textAlign: 'center',
  },
  column: {
    width: '33%', // Each column takes 33% of the available width
  },
  editCell: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#007bff',
    justifyContent: 'center', // Center the Edit button vertically
  },
  editLink: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default BuildingAll;
