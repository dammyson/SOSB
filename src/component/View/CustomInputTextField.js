import React from 'react'
import { StyleSheet, StatusBar, Dimensions, View, TextInput } from 'react-native'

import colors from '../color';



export default class InputTextField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
        };
    }

    componentDidMount() {
        if (this.props.onRef != null) {
            this.props.onRef(this)
        }
    }
    
    onSubmitEditing() {
        this.props.onSubmitEditing();
    }
    
    focus() {
        this.textInput.focus()
    }

    Icon = () => {
          return this.props.Icon();

        }
    handleFocus = () => this.setState({isFocused: true})

    handleBlur = () => { 
        const { onBlur } = this.props;
        this.setState({isFocused: false})
        onBlur() 
    }

    render(){
        const { onSubmitEditing,defaultValue, maxLength,  placeholder, editable, onChangeText, keyboardType, value } = this.props;
        return (
            <View  style={[ styles.input_text_view, { marginTop: 5 }, this.state.isFocused ? { } : {  }  ]} >
                <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                {this.Icon()}
                </View>
                <TextInput
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    placeholder={placeholder}
                    placeholderTextColor={colors.text_inputplace_holder}
                    onSubmitEditing={() => onSubmitEditing()}
                    returnKeyType="next"
                    keyboardType={keyboardType}
                    value={value}
                    autoCapitalize="none"
                    autoCorrect={false}
                    defaultValue={defaultValue}
                    style={styles.input_text}
                    onChangeText={text => onChangeText(text)}
                    ref={input => this.textInput = input}
                    editable={editable}  
                    maxLength={maxLength}
                />

            </View>
        );
    }
}

InputTextField;
const styles = StyleSheet.create({
    input_text_view: {
        flexDirection: 'row',
        height: 40,
        marginTop: 15,
        marginBottom: 10,
        backgroundColor:'#F4F7FA'


    },
    input_text: {
        paddingLeft: 8,
        marginLeft: 20,
        flex: 1,
        fontWeight: '600',
        fontSize: 12,
        color: '#272065',
        fontFamily: 'Proxima-nova-Regular',
        fontStyle: 'italic'
    },

});