import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
} from 'react-native';
import Public from './Public/Public';
import Secure from './Secure/Secure';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secure: false,
      loading: false,
      eta: null,
      fetching: false,
    };
    this.getToken = this.getToken.bind(this);
    this.getView = this.getView.bind(this);
  }

  componentWillMount() {
    this.setState({ loading: true });
    this.getToken()
      .then((token) => {
        if (token) {
          this.setState({ secure: true });
        } else {
          this.setState({ secure: false });
        }
        this.setState({ loading: false });
      })
      .catch(err => console.log('An error occurred:', err));
  }

  async getToken() {
    try {
      const tokenKey = 'LYFT-TOKEN';
      const token = await AsyncStorage.getItem(tokenKey, (err) => {
        if (err) {
          throw err;
        }
        this.setState({ secure: true });
      });
      return token;
    } catch (e) {
      throw e;
    }
  }

  getView() {
    if (!this.state.secure) return <Public {...route.passProps}/>;
    return <Secure  {...route.passProps}/>;
  }

  render() {
    if (this.state.loading) {
      return <Text>Loading...</Text>;
    }
    const getView = this.state.secure ? (
      <Secure screenProps={{ logout: () => this.setState({ secure: false }) }}/>
    ) : (
      <Public screenProps={{ login: () => this.setState({ secure: true }) }}/>
    );
    return (
      getView
    );
  }
}

Main.navigationOptions = () => ({ header: null });

/* const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({
  recieveUser: user => dispatch(recieveUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main); */

export default Main;
