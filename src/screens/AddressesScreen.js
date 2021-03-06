import React, { Component } from 'react';
import { StatusBar, StyleSheet, ScrollView } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import { EvilIcons } from '@expo/vector-icons';
import { inject, observer } from 'mobx-react/native'

import { theme } from '../constants/theme';
import Button from '../commons/Button';
import AddressComponent from "../components/AddressComponent";

@inject('authStore')
@observer
export default class AddressesScreen extends Component {
    static navigationOptions = {
        title: 'Addresses'
    }

    handleAddAddressPress = () => {
        this.props.navigation.navigate('AddressForm')
    }

    renderIfEmpty = () => (
        <Box f={1} center bg="white" px="md">
            <StatusBar barStyle="dark-content" />
            <Box center mb="md">
                <EvilIcons name="location" color={theme.color.black} size={200} />
            </Box>
            <Box center mb="md">
                <Text bold size="lg">Add address</Text>
                <Text size="sm" color="greyLight">You haven't add an address yet</Text>
            </Box>
            <Box w="100%">
                <Button style={styles.button} onPress={this.handleAddAddressPress}>
                    <Text bold color="white">Add address</Text>
                </Button>
            </Box>
        </Box>
    )

    render() {
        const { authStore } = this.props;
        
        if (authStore.info.addressesIsEmpty) { 
             return this.renderIfEmpty()
        }
        return ( <Box f={1} center bg="white" px="md">
                <StatusBar barStyle="dark-content" />
                <Box w="100%" mt={20}>
                    <Button style={styles.button} onPress={this.handleAddAddressPress}>
                        <Text bold color="white">Add address</Text>
                    </Button>
                </Box>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle}>
                    {
                    this.props.authStore.info.addresses.map((address, i) => (
                        <AddressComponent key={i} {...address}/>
                    ))
                    }
                </ScrollView>
            </Box>
        )

    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.color.green
    },
    scrollViewStyle: {
        flex: 1,
        width: '100%',
    }
})