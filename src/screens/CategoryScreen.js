import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { inject } from 'mobx-react/native'
import { Box } from 'react-native-design-utility';

import ProductCard from '../components/ProductCard'

@inject('productsStore')
class CategoryScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('name', 'InStore')
    }
    )

    render() {
        return (
            <Box>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                    {this.props.productsStore.data.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                    }
                </ScrollView>

            </Box>
        )
    }
}

export default CategoryScreen;