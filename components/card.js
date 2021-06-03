import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import Colors from '../constant/Colors'


const Card = (props) => {
    return (
      <View style={{...styles.shadow, ...props.style}}>
          {props.children}
      </View>
    )
  }

  const styles = StyleSheet.create({
    shadow: {
        // borderRadius: 10,
        borderRadius: 5,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 16},
        shadowOpacity: 0.85,
        shadowRadius: 16.00,
        // elevation: 24,
        elevation: 14,
      },
  });
  

  export default Card;