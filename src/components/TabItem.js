import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Text } from 'react-native-design-utility';

import { tabBarIcons } from '../constants/images';

class TabItem extends PureComponent {

    handlePress = () => {
        this.props.navigation.navigate(this.props.routeName);
    }

    render() {

        const { routeName, isActive } = this.props

        const icon = tabBarIcons[isActive ? 'active' : 'inactive'][routeName]

        return (
            <Box f={1} center pt={10}>
                <TouchableOpacity onPress= {this.handlePress} style = {styles.button}>
                    <Box mb={3}>
                        <Image source={icon} />
                    </Box>
                    <Box>
                        <Text ls={0.12} color="greyDark" size="xs" lowercase>
                            {routeName}
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>
        )
    }
}

const styles = StyleSheet.create({
    button: { 
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default TabItem;