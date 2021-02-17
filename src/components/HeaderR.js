import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function Header() {

        return (
            <View style={styles.header}>
                <Text style= {styles.headerText}>PATCHAKWAK</Text>
            </View>
        )
    }

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#010a13',
        padding: 25,
        alignItems: 'flex-start',
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor: 'rgba(101,225,87,1)',
    },
    headerText: {
        color: 'rgba(101,225,87,1)',
    },
})