import React, { Component } from 'react';
import { Box, Text } from 'react-native-design-utility';

import { inject } from 'mobx-react/native';

import OnboardingLogo from '../commons/OnboardingLogo';

@inject('authStore')
export default class SplashScreen extends Component {
    state = {};

    componentDidMount() {
        this.checkAuth();
    }

    checkAuth =  () => {
        setTimeout( async ()=>{
            await this.props.authStore.setupAuth();
        }, 2000)
       
    }

    render() {
        return (
            <Box f={1} center>
               <OnboardingLogo />
            </Box>
        )

    }
}