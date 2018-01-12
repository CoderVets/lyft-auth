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
import RootNavigation from '../Components/Navigation/RootNavigation';

const Secure = (props) => {
  const logoutUser = () => {
    const tokenKey = 'LYFT-TOKEN';
    AsyncStorage.removeItem(tokenKey, (err) => {
      if (err) {
        throw err;
      }
      props.screenProps.logout();
    });
  };

  const { navPage } = RootNavigation;

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => navPage('ProfilePage')}>
        <Image
          source={require('../assets/bananaVar1.jpg')}
          style={styles.profilePic}
        />
      </TouchableHighlight>
      <Text style={{ fontSize: 30, fontStyle: 'italic' }}>Arrive</Text>
      <Text style={{ fontSize: 30, fontStyle: 'italic' }}>      Alive </Text>
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
};

Secure.navigationOptions = () => ({ header: null });

export default Secure;
