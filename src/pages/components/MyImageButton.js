import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

const MyImageButton = (props) => {

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: props.btnColor }]}
      onPress={props.customClick}>

      <Icon style={styles.icon}
        name={props.btnIcon} size={30} color='white' />

      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2992C4',
    width: 150,
    height: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
  },
  icon: {
    paddingBottom: 5,
  }
});

export default MyImageButton;