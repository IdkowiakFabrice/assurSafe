import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, ImageBackground, ScrollView, Image, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CameraPicture from '../components/CameraPicture'
import * as axios from 'axios'

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;

export default class FolderFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            idUser: '',
            idDossier: '',
            startCamera: false,
            files: '',
        }
    }

    componentDidMount() {
        this.retrieve()
    }

    retrieve = async () => {
        try {
            const retrieveIdDossier = await AsyncStorage.getItem('@idDossier');
            const retrieveIdUser = await AsyncStorage.getItem('@idUser');
            const retrieveToken = await AsyncStorage.getItem('@token');
            if (retrieveIdDossier !== null) {
                this.setState({ idDossier: retrieveIdDossier })
            } if (retrieveIdUser !== null) {
                this.setState({ idUser: retrieveIdUser })
            } if (retrieveToken !== null) {
                this.setState({ token: retrieveToken })
            }
            const link = `https://patchakwak.herokuapp.com/api/users/${retrieveIdUser}/dossiers/${retrieveIdDossier}/files`
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.state.token
                }
            };
            axios.get(link, axiosConfig)
                .then((response) => {
                    var array = []
                    var filesData = response.data
                    filesData.map((file) =>
                        array.push(file.path)
                    )
                    this.setState({ files: filesData })
                    console.log('this.state.files: %s', this.state.files)
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const __startCamera = async () => {
            this.setState({ startCamera: true })
        }

        const _returnLastPage = () => {
            this.props.navigation.navigate('FolderList')
        }
        return (
            <ImageBackground source={require('../../assets/greenBackground.png')} style={{ width: '100%', height: '100%', flex: 1 }}>
                {this.state.startCamera === true ?
                    <View
                        style={{ height: WINDOW_HEIGHT }}
                    ><CameraPicture /></View>
                    :
                    <View>
                        <TouchableOpacity
                            onPress={_returnLastPage}
                            style={{
                                alignSelf: 'center',
                                marginTop: '20%',
                                marginBottom: 10,
                                width: 100,
                                borderRadius: 4,
                                backgroundColor: 'black',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 25
                            }}
                        >
                            <Text
                                style={{
                                    color: '#rgba(101,225,87,1)',
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}>
                                Retour
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={__startCamera}
                            style={{
                                alignSelf: 'center',
                                marginBottom: '20%',
                                width: 200,
                                borderRadius: 4,
                                backgroundColor: 'black',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 50
                            }}
                        >
                            <Text
                                style={{
                                    color: '#rgba(101,225,87,1)',
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}>
                                Take picture
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
                <ScrollView>
                <Text style={styles.mesImagesText}>Mes images:</Text>
                    {this.state.files ?
                        this.state.files.map((file) => (
                            <TouchableOpacity 
                            style={{
                                marginBottom: 20,
                                borderColor: '#rgba(101,225,87,1)',
                                backgroundColor: '#rgba(99,99,99,0.7)',
                                borderWidth: 2,
                            }}>
                                <Image source={{isStatic:true, uri:file.path}} style={{width:WINDOW_WIDTH- 40,height:400, alignSelf:'center'}} />
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
    mesImagesText: {
        fontSize: 20,
        color: 'black',
        paddingHorizontal: 20,
        padding: 10,
        justifyContent: 'flex-start',
    },
})
