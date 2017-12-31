import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Lyft from './Components/Lyft/Lyft';

const Public = props => (
  <View>
    <Text>PUBLIC FACING VIEW</Text>
    <Lyft screenProps={{ login: props.screenProps.login }} />
  </View>
);

Public.propTypes = {
  navigation: PropTypes.func,
  screenProps: PropTypes.shape({ login: PropTypes.func }),
};

export default Public;
