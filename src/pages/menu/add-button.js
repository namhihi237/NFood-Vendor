import React from 'react';
import { Text } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const AddButton = (props) => {
  const icon = props.type === 'edit' ? 'edit' : 'plus';
  return (
    <TouchableOpacity style={styles.btn} onPress={props.onPress}>
      <FontAwesome5 name={icon} size={wp('4%')} color="#000" />
      <Text fontSize="md" style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};
export default AddButton;

const styles = StyleSheet.create({
  btn: {
    height: 35,
    borderRadius: 6,
    alignItems: 'center',
    width: wp('40%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#A4A4A4',
  },
  text: {
    color: '#000',
  },
});
