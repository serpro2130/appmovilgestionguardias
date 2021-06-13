import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Picker } from "native-base";

export default function SelectedRol(props) {
  const { state, setstate } = props;
  const onValueChange = (value) => {
    console.log("ROLES DENTRO DEL COMPONENTE");
    console.log(value);
    setstate(value);
    console.log(state);
  };
  return (
    <Picker
      note
      mode="dialog"
      style={{ width: 100, height: 60 }}
      selectedValue={state.operator === 0 ? "99999" : state.operator}
      onValueChange={onValueChange}
    >
      <Picker.Item label="SUPERVISOR" value="1" />
      <Picker.Item label="CLIENTE" value="2" />
      <Picker.Item label="GUARDIA" value="3" />
    </Picker>
  );
}

const styles = StyleSheet.create({});
