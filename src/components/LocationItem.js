import React, { Component } from 'react';
import { Box } from 'react-native-design-utility';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { theme } from '../constants/theme';

export default class LocationItem extends Component {

    handlePress = async () => {
        try {
            const res = await this.props.fetchDetails(this.props.place_id);
            this.props.searchAddress(res);

        } catch (error) {
            throw error;
        }
    }
    render() {
        return (
            <TouchableOpacity onPress={this.handlePress}>
                <Box w="100%"
                    style={{
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderBottomColor: theme.color.greenLight
                    }}>
                    <Box p={10}>
                        <Text>{this.props.description}</Text>
                    </Box>
                </Box>
            </TouchableOpacity>
        )
    }
}