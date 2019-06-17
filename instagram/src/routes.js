import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'

import Feed from './pages/feed/Feed';
import New from './pages/new/New';

// @ts-ignore
import logo from './assets/logo.png';

export default createAppContainer(
  createStackNavigator({
    Feed,
    New
  }, {
    defaultNavigationOptions: {
      headerTintColor: '#000',
      headerTitle: <Image source={logo} style={{ margin: 20}}/>,
      headerBackTitle: null
    },
    mode: 'modal'
  })
);