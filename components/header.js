import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import Colors from '../constant/Colors'


const Header = (props) => {
    return (
      <View style={{...styles.header, ...props.style}}>
        <Text style={styles.text}>{props.label}</Text>
      </View>
    )
  }

  const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 70,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.white,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 6,
        elevation: 5
    },
    text: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 30
    }
  });
  

  export default Header;