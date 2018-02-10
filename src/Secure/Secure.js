import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage,
  TouchableHighlight,
  Image,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import storeFactory from '../Store/Store';
import {
  etaAccesToken,
  LyftETA
} from '../Store/Actions/User';
import { connect } from 'react-redux'
import ArriveAlive from './ArriveAlive';

const store = storeFactory();
//let eta = null
//let fetching = true

window.store = store;

const Secure = (props /* { navigation } */) => {

  this.state = {
    //eta: 500000,
    //fetching: false,
  };

  const logoutUser = () => {
    const tokenKey = 'LYFT-TOKEN';
    AsyncStorage.removeItem(tokenKey, (err) => {
      if (err) {
        throw err;
      }
      props.screenProps.logout();
    });
  };

  store.dispatch(
    etaAccesToken('PbUe5NjrXqQP', 'EmdVlwuj4TMBEDx-9ESOMNaBCKYvjZIT')
  )

  //const { navigate } = props.navigation;

  if (store.fetching) {
    return(
      <View style={{flex: 1, paddingTop: 20}}>
        <ActivityIndicator />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => this.props.navigate('ProfilePage')}>
        <Image
          source={require('../assets/arrive-alive.jpg')}
          style={styles.profilePic}
        />
      </TouchableHighlight>
      <Text style={{ fontSize: 30, fontStyle: 'italic' }}>Arrive</Text>
      <Text style={{ fontSize: 30, fontStyle: 'italic' }}>      Alive </Text>
      <Text>ETA {store.eta}</Text>
      {/*<ArriveAlive/>*/}
      <Button
        title="Destroy Lyft Session"
        onPress={() => logoutUser()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 30,
  },
  profilePic: {
    width: 200,
    height: 200,
    borderRadius: 30,
  },
});

Secure.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
  screenProps: PropTypes.shape({ login: PropTypes.func }),
  screenProps: PropTypes.shape({
    login: PropTypes.func,
  }),
  eta: PropTypes.number,
  fetching: PropTypes.bool,
};

Secure.navigationOptions = () => ({ header: null });

//map state to props & map dispatch to props
const mapStateToProps = state => ({
  eta: state.getLyftETA.etaSeconds,
  fetching: state.fetching,
});

export default connect(mapStateToProps)(Secure);

