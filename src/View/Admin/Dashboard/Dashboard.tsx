import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome icons

const Dashboard= () => {
  return (
    // <View style={styles.container}>
    //   <View style={styles.row}>
    //     <View style={styles.col}>
    //       {/* Card 1 */}
    //       <View style={[styles.card, styles.bgGradientSuccess]}>
    //         <View style={styles.cardBody}>
    //           <View style={styles.row}>
    //             <View style={styles.colCircle}>
    //               <View style={styles.cardCircle}>
    //                 <Icon name="sms" size={24} color="white" />
    //               </View>
    //             </View>
    //             <View style={styles.colContent}>
    //               <View style={styles.cardInner}>
    //                 <Text style={styles.cardValue}>0</Text>
    //                 <Text style={styles.cardLabel}>Total SMS</Text>
    //               </View>
    //             </View>
    //           </View>
    //         </View>
    //       </View>
    //     </View>

    //     {/* Repeat similar structures for other cards */}
    //   </View>
    // </View>
    <View style={{flex:1}}>
      <Text style={[styles.container]}>Dashboardpp</Text>
      <View><Text>this is block</Text></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    color:"black",
    backgroundColor:'red'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    flex: 1,
    paddingHorizontal: 5,
  },
  card: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bgGradientSuccess: {
    backgroundColor: 'green', // You need to define gradient styles separately
  },
  cardBody: {
    padding: 10,
  },
  colCircle: {
    flex: 1,
    alignItems: 'center',
  },
  cardCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colContent: {
    flex: 3,
  },
  cardInner: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  cardValue: {
    fontSize: 24,
    color: 'white',
  },
  cardLabel: {
    fontSize: 12,
    color: 'white',
  },
});

export default Dashboard;
