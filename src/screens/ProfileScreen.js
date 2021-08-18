import React, { Component } from 'react';
import {
    StatusBar,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import { inject } from 'mobx-react/native';
import {
    EvilIcons,
    Ionicons,
    Feather,
    MaterialIcons
} from '@expo/vector-icons';

import { theme } from '../constants/theme';

import ListColumn from '../commons/ListColumn';
import CloseBtn from '../commons/CloseBtn';

const barIconStyle = {
    size: 25,
    color: theme.color.grey
}

const LINKS = [
    {
        link: 'Share',
        title: 'Invite friends',
        icon: <EvilIcons name="share-apple" {...barIconStyle} />
    },
    {
        link: 'Help',
        title: 'Help',
        icon: <Ionicons name="ios-help-circle-outline" {...barIconStyle} />
    },
    {
        link: 'About',
        title: 'About this app',
        icon: <Ionicons name="ios-information-circle-outline" {...barIconStyle} />
    },
    {
        link: 'Settings',
        title: 'Your account settings',
        icon: <Feather name="settings" {...barIconStyle} />
    },
]

@inject('authStore')
export default class ProfileScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'My Profile',
        headerLeft: <CloseBtn left size={25} onPress={() => navigation.goBack(null)} />
    })

    render() {
        const { authStore } = this.props
        return (
            <Box f={1} bg="white">
                <StatusBar barStyle="dark-content" />
                <ScrollView>
                    <ListColumn>
                        <ListColumn.Left>
                            <Text size="xl" bold>Hi, {authStore.info.firstName}</Text>
                        </ListColumn.Left>
                        <ListColumn.Right>
                            <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: authStore.info.avatarUrl }} />
                        </ListColumn.Right>
                    </ListColumn>
                    {LINKS.map(el => (
                        <ListColumn link={el.link} key={el.title}>
                            <ListColumn.Left>
                                <Box dir="row" align="center">
                                    <Box f={0.2}>{el.icon}</Box>
                                    <Box f={1}>
                                        <Text>{el.title}</Text>
                                    </Box>
                                </Box>
                            </ListColumn.Left>
                            <ListColumn.Right>
                                <MaterialIcons
                                    name="keyboard-arrow-right"
                                    {...barIconStyle} />
                            </ListColumn.Right>
                        </ListColumn>
                    ))}

                    <TouchableOpacity style={styles.logoutBtn}>
                        <Text bold color="green">
                            Log Out
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </Box>
        )

    }
}

const styles = StyleSheet.create({
    logoutBtn: {
        borderWidth: 1,
        borderColor: theme.color.green,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        alignSelf: "center",
        height: 40,
        marginTop: 20
    }
})