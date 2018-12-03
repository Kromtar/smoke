import React from 'react';
import { View } from 'react-native';
import KitDetail from '../components/KitDetail';
import * as actions from '../actions';
import { connect } from 'react-redux';

class KitViewer extends React.Component {

  static navigationOptions = {
    title: 'Kaji',
  };


  render() {
    const kitKey = this.props.navigation.getParam('kitKey', 'nada');

    return (
      <View>
        <KitDetail 
          kitKey={kitKey} 
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    allKitStatus: state.allKitStatus //Tiene la lista de kits y sensores
  };
}

export default connect(mapStateToProps, actions)(KitViewer);