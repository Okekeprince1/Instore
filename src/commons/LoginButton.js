import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import { TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


import { images } from '../constants/images';

const bgColor = type => {
    switch (type) {
        case 'google':
            return 'googleBlue';
        case 'facebook':
            return 'facebookBlue';
        default:
            return 'white';
    }
}

const LoginButton = ({children, type, onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <Box dir="row" align="center" shadow={1} bg={bgColor(type)} w="80%" self="center" p="2xs" radius="xs" mb="sm">
            <Box mr="sm">
                <Box bg="white" w={32} h={32} radius="xs" center style={{position: 'relative'}}>
                    {type === 'google' && <Image style={{ width: 16, height: 16 }} source={images.googleColorIcon}/>}
                    {type === 'facebook' && 
                    <FontAwesome 
                        name = 'facebook' 
                        color="#4D6FA9" 
                        size={30}
                         />
                    }
                    
                </Box>
            </Box>
            <Box>
                <Text size="md" color="white">{children}</Text>
            </Box>

        </Box>
    </TouchableOpacity>
)

export default LoginButton;