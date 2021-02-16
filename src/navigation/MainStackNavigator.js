import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Accueil from '../screens/Accueil'
import Login from '../screens/Login'
import Register from '../screens/Register'
import RegisterSuccess from '../screens/RegisterSuccess'

const Stack = createStackNavigator()

function MainStackNavigator() {
    return (
      <NavigationContainer>
        <Stack.Navigator
        initialRouteName="Accueil"
        screenOptions={{
          headerShown: false
        }}
        >
          <Stack.Screen name='Accueil' component={Accueil} />
          <Stack.Screen name='Login' component={Login}  />
          <Stack.Screen name='Register' component={Register}  />
          <Stack.Screen name='RegisterSuccess' component={RegisterSuccess}  />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  
  export default MainStackNavigator