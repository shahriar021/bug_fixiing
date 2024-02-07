import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';

const Home = ({navigation}) => {
  
  return (
    <View>
      <Button
        title="Go to About"
        onPress={() => navigation.navigate('About')}
      />
      {/* ... other components */}
      <Text>this is home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
