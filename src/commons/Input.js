import React, { PureComponent } from 'react';
import { TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Box } from 'react-native-design-utility';

import { theme } from '../constants/theme'

export default class Input extends PureComponent {
    state = {

    }

    render() {
        const { containerStyle, onPress, ...rest } = this.props

        const input = (
            <TextInput
                {...rest}
                style={styles.input}
                selectionColor={theme.color.green}
            />
        )

        if (typeof onPress === 'function') {
            return (
                <Box
                    w="100%"
                    p="xs"
                    h={50}
                    radius={6}
                    mb="xs"
                    style={[{
                        borderWidth: 1,
                        borderColor: theme.color.greyLight,
                    },
                        containerStyle]}
                        position="relative" >
                    {input}
                    <TouchableOpacity style={styles.touchableSurface} onPress={onPress} />
                </Box>
            )
        }

        return (
            <Box
                w="100%"
                p="xs"
                h={50}
                radius={6}
                mb="xs"
                style={[{
                    borderWidth: 1,
                    borderColor: theme.color.greyLight,
                },
                    containerStyle]}>
                {input}
            </Box>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        flex: 1
    }, 
    touchableSurface: {
        position: "absolute",
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
    }
})