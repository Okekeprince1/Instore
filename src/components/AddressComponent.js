import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class AddressComponent extends PureComponent {
    render() {
        const { street,  city, postalCode} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.street}>
                    {street}
                </Text>
                <View style={styles.bt}>
                <Text style={styles.city}>
                    {city}
                </Text>
                <Text style={styles.pCode}>
                    {postalCode}
                </Text>
                </View>
                
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        flex: 1,
        padding: 10
    },
    street: {
        fontWeight: "bold",
        fontSize: 25
    },
    city: {
        color: "grey",
        marginRight: 20
    },
    pCode:{
        color: "grey"
    },
    bt:{
        flexDirection: "row",
        marginVertical: 20
    }
})



