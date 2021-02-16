import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, TextInput, ImageBackground } from 'react-native'
import * as axios from 'axios'

const{width: WIDTH} = Dimensions.get('window') 


export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    _storeData = (token, idUser) => {
        try {
          AsyncStorage.multiSet([['@token', token], ['@idUser', idUser]])
        } catch (error) {
         console.error(error);
        }
      }

      _login = () => {
        const link = 'https:/patchakwak.herokuapp.com/api/authenticate/signin';
        const user = {
            "username": this.state.username,
            "password": this.state.password,
          };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post(link, user, axiosConfig)
        .then((response) => {
            this._storeData(response.data.data.meta.token, response.data.data.user.id.toString());
            this.props.navigation.navigate('ChampionsListPage')
        })
        .catch((error) => {
            console.log(error);
            // à mettre en front
        });
      }

    render() {
        return (
            <ImageBackground source={require('../../assets/greenBackground.png')} style={{width: '100%', height: '100%',flex:1}}>
                <View style={styles.container}>
                    <Text style={styles.text}>Connexion</Text>
                    <TextInput
                        placeholder="Nom d'utilisateur"
                        style={styles.input}
                        onChangeText={(username) => { this.setState({ username }) }}
                        value={this.state.username}>
                    </TextInput>
                    <TextInput
                        placeholder="Mot de passe"
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(password) => { this.setState({ password }) }}
                        value={this.state.password}>
                    </TextInput>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={this._login}
                    >
                        <Text style={styles.buttonTextLogin}>Se connecter</Text>
                    </TouchableOpacity>
                    <Text style={styles.registerText}>Vous n'avez pas de compte ? Cliquez ici: </Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.signUpText}>S'inscrire</Text>
                    </TouchableOpacity>
                </View>   
                </ImageBackground>         
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:'60%',
    },    
    text: {
        color: 'rgba(20,20,20,0.6)',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    buttonContainer: {
        backgroundColor: '#222',
        borderRadius: 5,
        margin: 20,
        
    },
    buttonTextLogin: {
        fontSize: 20,
        color: 'rgba(101,225,87,1)',
        paddingHorizontal: 20,
        borderWidth:1,
        borderColor: 'rgba(101,225,87,1)',
        borderRadius: 5,
        padding: 10,
        
    },
    signUpText: {
        color: 'rgba(20,20,20,0.6)',
    },
    input: {
        width: WIDTH -55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor:'rgba(95,95,95,0.3)',
        color:'rgba(60,60,60,1)',
        marginHorizontal: 25,
        marginBottom: 20,
    },
    registerText:   {
    color: 'rgba(255,255,255,0.7)',
    
    }
})

export default Login
