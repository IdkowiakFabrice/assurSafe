import React, { Component } from 'react'
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'

export default class Accueil extends Component {
    render() {
        return (
            <ImageBackground source={require('../../assets/greenBackground.png')} style={{width: '100%', height: '100%',flex:1}}>
            <View>
                    <TouchableOpacity
                        style={styles.buttonLoginContainer}
                        onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.signInText}>Se connecter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonRegisterContainer}
                        onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.signUpText}>S'inscrire</Text>
                    </TouchableOpacity>                
            </View>
            </ImageBackground>         

        )
    }
}

const styles = StyleSheet.create({
    buttonLoginContainer :{
    backgroundColor: '#010a13',
    borderRadius: 5,
    padding: 10,
    marginBottom:2,
    marginTop: '130%',
    margin: 20,
    borderWidth:1,
    borderColor: 'rgba(101,225,87,1)',
},
    buttonRegisterContainer :{
        backgroundColor: '#010a13',
        borderRadius: 5,
        padding: 10,
        margin: 20,
        borderWidth:1,
        borderColor: 'rgba(101,225,87,1)',
        },
    signInText:{
        color: 'rgba(101,225,87,1)',
        fontSize:20,
        textAlign:'center'
    },
    signUpText: {
        color: 'rgba(101,225,87,1)',
        fontSize:20,
        textAlign:'center'
    }
  });