import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';

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

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        THIS IS THE SECURE PAGE YOU MUST HAVE A TOKEN!
      </Text>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

Secure.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
  screenProps: PropTypes.shape({ login: PropTypes.func }),
};

Secure.navigationOptions = () => ({ header: null });

export default Secure;
