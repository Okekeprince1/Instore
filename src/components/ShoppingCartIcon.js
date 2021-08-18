import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text } from 'react-native-design-utility';

import { NavigationService } from '../api/NavigationService';

import { images } from '../constants/images';
import { inject, observer } from 'mobx-react/native';

@inject('shoppingCartStore')
@observer
export default class ShoppingCartIcon extends Component {

    handlePress = () => {
        NavigationService.navigate('ShoppingCart');
    }
    render() {
        const { shoppingCartStore } = this.props;
        const { totalProducts } = shoppingCartStore;

        return (
            <TouchableOpacity onPress={this.handlePress} style={styles.btn}>
                <Box mr={16}>
                    <Image style={styles.img}
                        resizeMode="contain"
                        source={images.shoppingCart} />
                </Box>
                {totalProducts > 0 && (
                <Box style={{right: 10, top: -2}} position="absolute" circle={15} bg="red" center>
                <Text center color="white" bold size={10}>{ totalProducts }</Text>
                </Box>
                )}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    img: {
        width: 25
    },
    btn: {
        flex: 1,
        position: "relative"
    }
})