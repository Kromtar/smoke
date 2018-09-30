import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
} from 'react-native';

class KitDetail extends React.Component {

  render() {
    return (
      <View>
        <Text>
          El sensor {this.props.kitKey}
          esta: {this.props.allKitStatus.kitsList[this.props.kitKey].kitStatus}
        </Text>
        <Text>Aqui va los detalles del kit, la lista de sus sensores y mas...</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    allKitStatus: state.allKitStatus //Tiene la lista de kits y sensores
  };
}

export default connect(mapStateToProps, {})(KitDetail);
