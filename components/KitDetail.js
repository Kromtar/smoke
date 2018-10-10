import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { EMITalertresponse } from '../actions/emits';

class KitDetail extends React.Component {
  displayMessage(){
    return (<View>
        <Text>
          El sensor {this.props.kitKey}
          esta: {this.props.allKitStatus.kitsList[this.props.kitKey].kitStatus}
        </Text>
        <Text>Aqui va los detalles del kit, la lista de sus sensores y mas...</Text>
        { this.props.allKitStatus.kitsList[this.props.kitKey].kitStatus == 'mal' &&
        <View style={styles.buttonBackView}>
          <TouchableOpacity
          style={styles.buttonBackOn}
          onPress={() => EMITalertresponse('bien')}
          >
         <Icon
           name={'add-alert'}
           size={30}
           color="red"
         />
       </TouchableOpacity>
      </View>}
      </View>);
  }
  render() {
    return (
    this.displayMessage()
  );
}
}
  
function mapStateToProps(state) {
  return {
    allKitStatus: state.allKitStatus //Tiene la lista de kits y sensores
  };
}

export default connect(mapStateToProps, {})(KitDetail);

const styles = StyleSheet.create({
  buttonBackView: {
    position: 'absolute',
    bottom: -100,
    right: 0
  },
  buttonBackOn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: 'black',
    borderRadius: 70,
  },
});