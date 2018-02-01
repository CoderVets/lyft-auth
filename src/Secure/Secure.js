import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage,
  TouchableHighlight,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { store } from '../Store/Store';
import { etaAccesToken } from '../Store/Actions/User';
import { connect } from 'react-redux'

const Secure = (props /* { navigation } */) => {
  const logoutUser = () => {
    const tokenKey = 'LYFT-TOKEN';
    AsyncStorage.removeItem(tokenKey, (err) => {
      if (err) {
        throw err;
      }
      props.screenProps.logout();
    });
  };

  const getETAToken = etaAccesToken => {
    store.dispatch(
      etaAccesToken('PbUe5NjrXqQP', 'EmdVlwuj4TMBEDx-9ESOMNaBCKYvjZIT')
    );
  }
  // this.navigation.navigate = this.props.navigation.bind(this);
  window.addEventListener("focus",getETAToken)

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => props.navigation.navigate('ProfilePage')}>
        <Image
          source={require('../assets/arrive-alive.jpg')}
          style={styles.profilePic}
        />
      </TouchableHighlight>
      <Text style={{ fontSize: 30, fontStyle: 'italic' }}>Arrive</Text>
      <Text style={{ fontSize: 30, fontStyle: 'italic' }}>      Alive </Text>
      <Text>ETA{props.screenProps.eta}</Text>
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
  // screenProps: PropTypes.shape({ login: PropTypes.func }),
  screenProps: PropTypes.shape({
    login: PropTypes.func,
    eta: PropTypes.any,
  }),
};

Secure.navigationOptions = () => ({ header: null });

const mapStateToProps = state => ({ getEtaAccToken: state.getEtaAccToken });

const mapDispatchToProps = dispatch => ({
  eta: getEtaAccToken => dispatch(eta(getEtaAccToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Secure);

//export default connect(mapStateToProps)(Secure);

//export default Secure;
