/**
 * React Native PickNGo App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/screens/HomeScreen';
import CreateBaguetteScreen from './app/screens/CreateBaguetteScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {CookiesProvider} from 'react-cookie';

const HomeStack = createStackNavigator();
const OrderStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#009387'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
    <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title: 'Domovská stránka',
        headerLeft: () => (
            <Icon.Button name="md-bulb" size={25} backgroundColor='#009387' onPress={() => navigation.openDrawer()}/>
        )
    }} />
    </HomeStack.Navigator>
);

const OrderStackScreen = ({navigation}) => (
    <OrderStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <OrderStack.Screen name="Order" component={CreateBaguetteScreen} options={{
            title: 'Objednávka bagety',
            headerLeft: () => (
                <Icon.Button name="md-bulb" size={25} backgroundColor='#009387' onPress={() => navigation.openDrawer()}/>
            )
        }} />
    </OrderStack.Navigator>
);

export default function App() {
    return (
        <CookiesProvider>
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeStackScreen} />
                <Drawer.Screen name="Order" component={OrderStackScreen}/>
            </Drawer.Navigator>
        </NavigationContainer>
        </CookiesProvider>
    );
}

