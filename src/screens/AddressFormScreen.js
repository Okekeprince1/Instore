import React, { Component } from 'react';
import { StatusBar, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import { observer, inject } from 'mobx-react/native';
import { observable, action } from 'mobx';

import { theme } from '../constants/theme';

import  Button  from '../commons/Button';
import CloseBtn from '../commons/CloseBtn';
import Input from '../commons/Input';

import { buildAddress } from '../utils/buildAddress';


@inject('authStore')
@observer
export default class AddressFormScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Address',
        headerLeft: <CloseBtn left size={25} onPress={() => navigation.goBack(null)} />
    })

    @observable
    streetName = '';

    @observable
    postalCode = '';

    @observable
    city = '';

    @observable
    province = '';

    @observable
    address = null;

    @observable
    isSaving = false

 


    goToSearch = () => {
        this.props.navigation.navigate('AutoCompleteAddress', {
            searchAddress: this.searchAddress
        })
    }

    @action.bound
    searchAddress(value) {
        this.props.navigation.goBack(null);

        const address = buildAddress(value);

        this.streetName = address.street;
        this.postalCode = address.postalCode;
        this.city = address.city;

        this.address = address;
    }

    @action.bound
     async saveAddress () {
         this.isSaving = true
        try {
            await this.props.authStore.info.createAddress(this.address)
            this.props.navigation.goBack(null)
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        if( this.isSaving) {
            return (
                <Box f={1} bg="white" center>
                    <ActivityIndicator 
                    color={theme.color.green}  
                    size="large"/>
                </Box>
            )
        }
        return (
            <Box f={1} bg="white" p="sm">
                <StatusBar barStyle="dark-content" />
                <ScrollView>
                    <Box mb="sm">
                        <Input placeholder="Street Address"  
                        editable={false} 
                        onPress={this.goToSearch}
                        value={this.streetName}/>
                        <Input placeholder="Apt # (optional)"
                         />
                        <Box dir="row">
                            <Box f={1}>
                            <Input placeholder="Postal Code" editable={false} 
                            value={this.postalCode}/>
                            </Box>
                            <Box w={theme.space.xs}/>
                            <Box f={1}>
                            <Input placeholder="City" editable={false} 
                            value={this.city}/>
                            </Box>
                        </Box>
                        <Input placeholder="Instruction for delivery (optional)"
                            containerStyle={{ height: 100 }}
                            multiline />
                    </Box>

                    <Button disabled={!this.address} disabledStyle={styles.buttonDisabled} onPress={this.saveAddress}>
                        <Text bold color="white">
                            Save
                        </Text>
                    </Button>
                </ScrollView>
            </Box>
        )

    }
}

const styles = StyleSheet.create({
    buttonDisabled: {
        backgroundColor: theme.color.greyLight,
        borderColor: theme.color.greyLight
    }
})