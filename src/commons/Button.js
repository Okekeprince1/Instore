import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme';


const Button = ({ children, disabled, onPress, style, disabledStyle }) => {

    let _style = [styles.button];

    if(disabled) {
        _style.push(disabledStyle)
    }
    else{
        _style.push(style)
    }

    return (
        <TouchableOpacity style={_style} disabled={disabled} onPress={onPress}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        backgroundColor: theme.color.green,
        borderColor: theme.color.green,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        alignSelf: "center",
        height: 40,
    }
})

export default Button