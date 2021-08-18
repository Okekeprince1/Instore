import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, StyleSheet} from 'react-native';
import { Box, Text } from 'react-native-design-utility';

import { NavigationService } from '../api/NavigationService';

class CategoryCard extends PureComponent {

    handlePress = () => {
        NavigationService.navigate('Category', { name: this.props.title})
    }

    render() {

        const { title, img } = this.props;

        return (
            <TouchableOpacity onPress= {this.handlePress} style={styles.button}>
            <Box f={1} center>
                {img && (<Box mb="sm">
                    <Image source={img} />
                </Box>)}
                <Box>
                    <Text size="sm" center capitalizeEach color="greyDarker">
                        {title}
                    </Text>   
                </Box>
            </Box>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        flex : 1
    }
})

export default CategoryCard;