import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableHighlight,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  etaAccesToken,
  LyftETA
} from '../Store/Actions/User';

import { connect, Provider } from 'react-redux'
import storeFactory from '../Store/Store';
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';
// import * as API from './APITest1'

const store = storeFactory();

class ArriveAlive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eta: null,
      fetching: false,
    };
    //this.getToken = this.getToken.bind(this);
    //this.getView = this.getView.bind(this);
  }

  static propTypes = {
    eta: PropTypes.number,
    fetching: PropTypes.bool
  };

  componentWillMount() {
    store.dispatch(
      etaAccesToken('PbUe5NjrXqQP', 'EmdVlwuj4TMBEDx-9ESOMNaBCKYvjZIT')
    )
  };

  render() {
    //const{ navigate2 } = this.props.navigation;

    if (this.state.fetching) {
      return(
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => navigation('ProfilePage')}>
        {/* <TouchableHighlight onPress={() => navigate2('ProfilePage')}> */}
            <Image 
              source={require('../assets/arrive-alive.jpg')}
              style={styles.profilePic}
            />
        </TouchableHighlight>
        <Text style={{fontSize: 30, fontStyle: "italic"}} >Arrive</Text>
          <Text style={{fontSize: 30, fontStyle: "italic"}}>      Alive </Text>
          <Text>ETA{state.eta}</Text>
      </View>
      /* <View style={styles.container}>
        <TouchableHighlight onPress={() => navigate('Profile')}>
            <Image
                
                source={require('./assets/bananaVar1.jpg')}
                style={styles.profilePic}
            />
        </TouchableHighlight>
        <Text style={{fontSize: 30, fontStyle: "italic"}} >Arrive</Text>
          <Text style={{fontSize: 30, fontStyle: "italic"}}>      Alive </Text>
      </View> */
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',

    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 200,
    height: 200,
    borderRadius: 30,
  },

});

ArriveAlive.propTypes = {
  eta: PropTypes.number,
  fetching: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  eta: state.getLyftETA.etaSeconds,
  fetching: state.fetching,
});

const Container = connect(mapStateToProps)(ArriveAlive);

export default Container
