/*
  Componente dummy
*/

import React from 'react';
import { Text } from 'react-native';
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
    <Card title={name} titleStyle={{ color }}>
      <Text style={{ marginBottom: 10 }}>
        Aqui va informacion relevante del kit, iconos, menu ...
      </Text>
    </Card>
  );
};

export default kit;
