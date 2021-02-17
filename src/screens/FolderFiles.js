import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class FolderFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            idUser: '',
            idDossier: ''
        }
    }

    componentDidMount() {
        this.retrieve()
    }

    retrieve = async () => {
        try {
            const retrieveIdDossier = await AsyncStorage.getItem('@idDossier');
            if (retrieveIdDossier !== null) {
                this.setState({ idDossier: retrieveIdDossier })
            }
        } catch (error) {
            console.error(error);
        }
    }
    render() {
        return (
            <View>
                <Text> TA MERE LE PUTE </Text>
            </View>
        )
    }
}
