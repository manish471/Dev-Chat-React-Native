import React from 'react';
import { TouchableOpacity,TouchableNativeFeedback, Text, View, StyleSheet,Platform } from 'react-native';

const buttonWithBackground = props => {

    const content=(
    <View style={[styles.button, {backgroundColor: "#55c57a"},props.disabled?styles.disabled:null]}>
        <Text style={props.disabled ? styles.disabledText : null}>
        {props.children}
        </Text>
    </View>
    );

    if (props.disabled) {
        return content;
    }
    if(Platform.OS==='android'){

        return(
            <TouchableNativeFeedback onPress={props.onPress}>
                {content}
            </TouchableNativeFeedback>
        )

    }
    return(
        <TouchableOpacity onPress={props.onPress}>
            {content}
        </TouchableOpacity>
    )
   
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        flex:0,
        width:"15%",
        margin: 5,
        marginLeft:"40%",
        marginTop:"50%",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "black"
    },
    disabled: {
        backgroundColor: "#eee",
        borderColor: "#aaa"
      },
    disabledText: {
    color: "#aaa"
    }
});

export default buttonWithBackground;