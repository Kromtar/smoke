import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking } from 'react-native';
import { 
  Icon,
  Card } from 'react-native-elements';
import { Constants } from 'expo';
import * as actions from '../actions';

class KitDetail extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };
  constructor(props) {
    super(props);
    this.state = {
      iconPress: false
    };
  }
  componentWillUnmount() {
    if (this.state.iconPress){
      this.props.EMITremovekit({ kitId: this.props.kitKey, phoneId: Constants.installationId });
      this.setState({ iconPress: false });
    }
  }
  displayMessage() {
    return (<View>
        <Card 
        title={this.props.kitKey}
        >
        <Text>
          Estado: {this.props.allKitStatus.kitsList[this.props.kitKey].kitStatus}
        </Text>
        <View style={styles.buttonRemove}>
        <Icon
          onPress={() => {
                      this.props.navigation.navigate('Home');
                      this.setState({ iconPress: true });
                      }}
          name={'delete'}
          size={30}
        />
        </View>
        
        </Card>
        { this.props.allKitStatus.kitsList[this.props.kitKey].kitStatus === 'mal' &&
        <View>
          <View style={styles.buttonBackView}>
              <TouchableOpacity
              style={styles.buttonBackOn}
              onPress={() => {
                this.props.EMITalertresponse({ kitId: this.props.kitKey, response: 'verdadero' });  
                Linking.openURL('tel:132');
              }}
              >
             <Icon
               name={'add-alert'}
               size={30}
               color="red"
             />
           </TouchableOpacity>
          </View>
          <View style={styles.buttonBackView2}>
              <TouchableOpacity
              style={styles.buttonBackOn}
              onPress={() => {
                this.props.EMITalertresponse({ kitId: this.props.kitKey, response: 'falso' });
                //this.props.navigation.dispatch(NAVIGATIONback);
              }}
              >
             <Icon
               name={'Safety'}
               size={30}
               color="green"
             />
           </TouchableOpacity>
          </View>
        </View>
      }
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

export default connect(mapStateToProps, actions)(KitDetail);

const styles = StyleSheet.create({
  buttonBackView: {
    position: 'absolute',
    bottom: -200,
    right: 0
  },
  buttonBackView2: {
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
  buttonRemove: {
    position: 'absolute',
    right: 0
  }
});
