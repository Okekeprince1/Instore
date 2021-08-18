import React, { Component } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { Box, Text } from 'react-native-design-utility';

import { theme } from '../constants/theme';
import CategoryCard from '../components/CategoryCard';
import DealCarousel from '../components/DealCaroussel';

import ProfileBtn from '../commons/ProfileBtn';

const categories = [
    {
        id: 1,
        title: 'Grocery',
        img: require('../../assets/img/cart.png')
    },
    {
        id: 2,
        title: 'Drugs',
        img: require('../../assets/img/drugs.png')
    },
    {
        id: 3,
        title: 'Pets',
        img: require('../../assets/img/pets.png')
    },
    {
        id: 4,
        title: 'Video games',
    }
]

const NUM_COLUMNS = 2;

export default class HomeScreen extends Component {

    renderItem = ({item, index}) => {

        let style= {}

        if(index % NUM_COLUMNS !== 0){
            style.borderLeftWidth = 2,
            style.borderLeftColor = theme.color.greyLighter
        }

        return(
            <Box w={1 / NUM_COLUMNS} bg="white" h={120} style={style}>
                <CategoryCard {...item}/>
            </Box>
        )
    }

    keyExtractor = (item) => toString(item.id)

    separator = () => <Box h={2} bg="greyLighter"/>

    static navigationOptions = {
        title: 'InStore',
        headerLeft: <ProfileBtn />
    }

    render() {
        return (
            <Box f={1}>
                <StatusBar barStyle="light-content" />
                <Box h={130} bg="white" w="100%">
                    <DealCarousel />
                </Box>
                <Box f={1} p={10}>
                    <FlatList 
                    data = {categories}
                    renderItem={this.renderItem}
                    keyExtractor = {this.keyExtractor}
                    numColumns = {NUM_COLUMNS}
                    ItemSeparatorComponent={this.separator}
                    />
                </Box>
            </Box>
        )

    }
}