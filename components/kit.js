/*
  Componente dummy
*/

import React from 'react';
import {
  View,
  StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

const kit = (props) => {
  const name = props.name || props.id || 'Nombre kit';

  let color;
  if (props.state === 'bien') {
    color = 'green';
  } else if (props.state === 'mal') {
    color = 'red';
  } else {
    color = 'black';
  }

  return (
    <Card title={name} titleStyle={{ color }} >
      <View 
        style={{
          alignSelf: 'stretch',
          height: 30,
          backgroundColor: color
        }} 
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  RectangleShapeView: {
    alignSelf: 'stretch',
    height: 30,
    }

});
export default kit;
