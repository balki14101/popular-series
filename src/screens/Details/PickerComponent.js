import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {Picker} from '@react-native-picker/picker';

class PickerComponent extends React.Component {
  state = {
    name: '',
  };
  updateName = value => {
    this.setState({name: value});
  };

  render() {
    return (
      <View>
        <Picker
          style={{height: 50}}
          selectedValue={this.state.name}
          onValueChange={this.updateName}>
          <Picker.Item label="Dhoni" value="dhoni" />

          <Picker.Item label="Sachin" value="sachin" />
        </Picker>
        <Text>{this.state.value}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: '#fff',
  },
});
export default PickerComponent;
