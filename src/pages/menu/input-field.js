import React, { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const InputField = (props) => {
  const [height, setHeight] = useState(1);
  const [color, setColor] = useState('#D7D9DB');

  const onFocus = () => {
    setHeight(2);
    setColor('#000');
  };

  const onBlur = () => {
    setHeight(1);
    setColor('#D7D9DB');
  };

  const width = props.width ? wp(props.width) : wp('80%');
  return (
    <View style={{ ...styles.inputView, borderColor: color, borderWidth: height, width }}>
      <TextInput
        onChangeText={props.onChangeText}
        style={styles.inputText}
        placeholder={props.placeholder}
        placeholderTextColor="#a89292"
        onFocus={onFocus}
        onBlur={onBlur}
        value={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },

  inputText: {
    color: '#000',
    width: wp('85%'),
    fontSize: 16,
  },
});

export default InputField;