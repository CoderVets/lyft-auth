import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  Alert,
  AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { recieveUser } from '../../../Store/Actions/User';

const url = 'https://api.lyft.com/oauth/authorize?client_id=PbUe5NjrXqQP&scope=public%20profile%20rides.read%20rides.request%20offline&state=true&response_type=code';

class Lyft extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this._saveToken = this._saveToken.bind(this);
    this._getToken = this._getToken.bind(this);
    this._getUrlParameter = this._getUrlParameter.bind(this);
  }

  componentDidMount() {
    Linking.openURL(url);
    Linking.addEventListener('url', (responseUrl) => {
      const params = this._getUrlParameter(responseUrl.url);
      if (params.state === 'true') {
        this._saveToken(params.code);
      } else {
        Alert.alert(
          'Error while connecting to Lyft...',
          'Please close the app and try again.',
          { cancelable: true },
        );
      }
    });
  }

  componentWillUnmount() {
    Linking.removeEventListener('url');
  }

  _saveToken(code) {
    axios.request({
      url: '/oauth/token',
      method: 'post',
      baseURL: 'https://api.lyft.com/',
      auth: {
        username: 'PbUe5NjrXqQP',
        password: 'EmdVlwuj4TMBEDx-9ESOMNaBCKYvjZIT',
      },
      data: {
        grant_type: 'authorization_code',
        code,
      },
    }).then(async (res) => {
      console.log(res);
      try {
        if (res.status === 200) {
          console.log(res.data.access_token);
          console.log(res.data.refresh_token);
          console.log(res.data.token_type);
          console.log(res.data.expires_in);
          console.log(res.data.scope);
          this.props.recieveUser(res);
          await AsyncStorage.setItem('LYFT-TOKEN', res.data.access_token);
        }
      } catch (err) {
        Alert.alert(
          'Error while connecting to Lyft...',
          err,
          { cancelable: true },
        );
      }
    }).then(() => {
      console.log('GET TOKEN SO WE HAVE ACCESSS TO IT IN THE VIEW');
      this._getToken();
    })
      .done();
  }

  async _getToken() {
    try {
      const tokenKey = 'LYFT-TOKEN';
      const token = await AsyncStorage.getItem(tokenKey, (err) => {
        if (err) {
          throw err;
        }
        this.props.screenProps.login();
      });
      return token;
    } catch (e) {
      throw e;
    }
  }

  _getUrlParameter(url) {
    let regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while (match = regex.exec(url)) {
      params[match[1]] = match[2];
    }
    return params;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Authenticate with Lyft!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

Lyft.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
  screenProps: PropTypes.shape({ login: PropTypes.func }),
  recieveUser: PropTypes.func,
};

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({
  recieveUser: user => dispatch(recieveUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lyft);
