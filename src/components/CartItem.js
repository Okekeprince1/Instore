import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, LayoutAnimation } from 'react-native';
import { theme } from '../constants/theme'
import { Feather } from '@expo/vector-icons';
import { observer } from 'mobx-react/native';

import { Box, Text } from 'react-native-design-utility';
import QtyHover from './QtyHover';

const CustomLayoutAnimation = {
    duration: 2000,
    update : {
        type:  LayoutAnimation.Types.easeInEaseOut,
    },
};

@observer
class CartItem extends Component {
    state = {
        isHover: false,
    }

    componentWillUnmount () {
        LayoutAnimation.configureNext(CustomLayoutAnimation);
    }

    handleInc = () => {
        this.props.product.incCartQty();
    }

    handleDec = () => {
        this.props.product.decCartQty();
    }


    handleRemove = () => {
        this.handleClose();
        this.props.product.removeFromCart();
    }

    handleOpen = () => {
        this.setState({ isHover: true })
    }

    handleClose = () => {
        this.setState({ isHover: false})
    }
    render() {

        const { product } = this.props
        const {isHover} = this.state

        return (
            <TouchableWithoutFeedback onPress={this.handleClose}>
            <Box dir="row" align="center" p="xs" bg="white">
                <Box f={0.3}>
                    <Image style={styles.img} resizeMode="contain" source={product.imageUrl} />
                </Box>
                <Box f={1} pl="xs">
                    <Box mb="xs">
                        <Text bold>{product.name}</Text>
                        <Text color="greyDark" size="xs">At {product.kgPrice}/kg</Text>
                    </Box>
                    <Box>
                        <TouchableOpacity onPress={product.removeFromCart}>
                            <Box dir="row" align="center">
                                <Feather
                                    name="trash-2"
                                    color={theme.color.green}
                                    size={theme.text.size.sm} />

                                <Text size="sm" color="greyDark" ml={5}>Remove</Text>
                            </Box>
                        </TouchableOpacity>
                    </Box>
                </Box>
                <Box center mr="lg" position="relative">
                    <TouchableOpacity onPress={this.handleOpen}>
                        <Box w={45} h={35}
                            center
                            radius={6}
                            style={{
                                borderWidth: 1,
                                borderColor: theme.color.greyLight
                            }}>
                            <Text bold>{product.cartQty}</Text>
                        </Box>
                    </TouchableOpacity>
                    {isHover && (
                        <QtyHover 
                        qty={product.cartQty}
                        handleInc={this.handleInc}
                        handleDec={this.handleDec}
                        handleRemove={this.handleRemove}
                        containerStyle={{ top: 0, right: -30, left: -30, zIndex: 99 }}/>
                    )}
                </Box>
                <Box>
                        <Text>${product.totalPrice}</Text>
                </Box>
            </Box>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    img: {
        width: "100%",
        height: 100
    }
})

export default CartItem;