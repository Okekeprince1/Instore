import React from 'react';
import { ActivityIndicator, Text, UIManager } from 'react-native';
import { UtilityThemeProvider, Box } from 'react-native-design-utility';

import { Provider } from 'mobx-react/native'

import Navigator from './src/screens';
import { images, tabBarIcons } from './src/constants/images'
import { cacheImages } from './src/utils/cacheImages';
import { store } from './src/stores';

import { theme } from './src/constants/theme';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.cacheAssets();
  };

  cacheAssets = async() => {
    const imageAssests = cacheImages([...Object.values(images), ...Object.values(tabBarIcons.active),...Object.values(tabBarIcons.inactive) ]);

    await Promise.all([...imageAssests]);

    this.setState({isReady: true});
  };

  render(){
    if (!this.state.isReady) {
      return(
        <Box f={1} center bg = "white">
          <Box mb="md">
          <ActivityIndicator size = "large"color="green"/>
          </Box>
        <Text>Loading...</Text>
      </Box>
      )
      
    }else {
      return (
        <Provider {...store}>
          <UtilityThemeProvider theme={theme}>
            <Navigator />
          </UtilityThemeProvider>
        </Provider>
        
      );
    }
    
  }
  
}


