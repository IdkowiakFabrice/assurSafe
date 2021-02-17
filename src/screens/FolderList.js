import React, { Component } from 'react'
import { ImageBackground, Text, View, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as axios from 'axios'
import { TextInput } from 'react-native-gesture-handler';

const { width: WIDTH } = Dimensions.get('window')

export default class FolderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            folderName: '',
            idUser: '',
            count: 0,
            folders: '',
        }
    }

    componentDidMount() {
        this.retrieveFolders()
    }

    retrieveFolders = async () => {
        try {
            const retrieveToken = await AsyncStorage.getItem('@token');
            const retrieveIdUser = await AsyncStorage.getItem('@idUser');
            if (retrieveIdUser !== null) {
                this.setState({ token: retrieveToken })
            }
            if (retrieveToken !== null) {
                this.setState({ idUser: retrieveIdUser })
            }
        } catch (error) {
            console.error(error);
        }
        const link = `https://patchakwak.herokuapp.com/api/users/${this.state.idUser}/dossiers`
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            }
        };
        axios.get(link, axiosConfig)
            .then((response) => {
                var array = []
                var dataResponse = response.data
                dataResponse.map((bucket) =>
                    array.push(bucket.name)
                )
                this.setState({ folders: dataResponse })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    addFolder = () => {
        const link = `https://patchakwak.herokuapp.com/api/users/${this.state.idUser}/dossiers`
        const folder = {
            "name": this.state.folderName,
        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            }
        };
        axios.post(link, folder, axiosConfig)
            .then((response) => {
                this.state.folders.push(response.data.data.dossier.name)
                try {
                    AsyncStorage.setItem('@idDossier', response.data.data.dossier.id.toString())
                    this.props.navigation.navigate('FolderFiles')
                } catch(error) {
                    console.log(error)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    goToFolder = (idDossier) => {
            console.log("PATCHAKWAK")
            AsyncStorage.setItem('@idDossier', idDossier.toString())
            this.props.navigation.navigate('FolderFiles') 
    }

    render() {
        if (this.state.count === 0) {
            this.retrieveFolders()
            this.state.count = 1
        }
        return (
            <ImageBackground source={require('../../assets/greenBackground.png')} style={{ width: '100%', height: '100%', flex: 1 }}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder='Nom du dossier'
                        value={this.state.folderName}
                        onChangeText={(folderName) => { this.setState({ folderName }) }}>
                    </TextInput>
                    <TouchableOpacity
                        style={styles.buttonAdd}
                        onPress={() => this.addFolder()}>
                        <Text style={styles.buttonAddText}>Ajouter un dossier</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.mesDossiersText}>Mes dossiers:</Text>
                <ScrollView>
                {this.state.folders ?
                    this.state.folders.map((folder) => (
                        <TouchableOpacity
                            style={styles.folderButton}
                            onPress={() => this.goToFolder(folder.id)}>
                            <Text style={styles.buttonAddText}>{folder.name}</Text>
                        </TouchableOpacity>
                    ))
                    : null
                }
                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20%',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'black',
        paddingTop: 10,
        marginBottom: 50
    },
    buttonAdd: {
        backgroundColor: 'black',
        borderRadius: 5,
        margin: 20,
    },
    buttonAddText: {
        fontSize: 20,
        color: 'rgba(101,225,87,1)',
        paddingHorizontal: 20,
        padding: 10,
        textAlign: 'center'
    },
    mesDossiersText: {
        fontSize: 20,
        color: 'black',
        paddingHorizontal: 20,
        padding: 10,
        justifyContent: 'flex-start',
    },
    folderButton: {
        backgroundColor: 'rgba(99,99,99,0.8)',
        borderRadius: 5,
        padding: 10,
        marginBottom: 2,
        margin: 20,
        borderWidth: 1,
        borderColor: 'rgba(101,225,87,1)',
        justifyContent: 'flex-start',
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(95,95,95,0.3)',
        color: 'rgba(60,60,60,1)',
        marginHorizontal: 25,
        marginBottom: 20,
    },
})