import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import Home from './Home';
import {useNavigation} from '@react-navigation/native';

const About = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('./Home')}
      />
      {/* ... other components */}
    </View>
  );
};

export default About;

const styles = StyleSheet.create({});
