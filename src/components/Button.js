import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import Theme from '../Theme/Color';

class Button extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                <Text style={styles.textButton}>Read Article</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
      width: 150,
      backgroundColor: Theme.COLORS.ERROR,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 50,
      marginTop: 15,
      alignItems: "center"
    },
    textButton: {
      color: "#fff",
      fontSize: 14,
      textTransform: "uppercase"
    }
});

export default Button;