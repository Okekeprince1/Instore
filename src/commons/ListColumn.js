import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text } from 'react-native-design-utility';

import { NavigationService } from '../api/NavigationService';
import { theme } from '../constants/theme';

const Left = ({ children }) => (
    <Box f={1} align="start">
        {children}
    </Box>
)

const Right = ({ children }) => (
    <Box align="end">
        {children}
    </Box>
)

export default class ListColumn extends PureComponent {
    static Left = Left;
    static Right = Right;

    renderContent = () => (
        <Box
            dir="row"
            p="sm"
            align="center"
            justify="between"
            style={{
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: theme.color.greyLight
            }}>
            {this.props.children}
        </Box>
    )

    handlePress = () => {
        NavigationService.navigate(this.props.link)
    }

    render() {
        if (this.props.link) {
            return (
                <TouchableOpacity onPress={this.handlePress}>
                    {this.renderContent()}
                </TouchableOpacity>
            )
        }
        return this.renderContent()

    }
}