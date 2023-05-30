import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/pages/HomeScreen';
import HastaEkle from './src/pages/HastaEkle';
import HastaGuncelle from './src/pages/HastaGuncelle';
import HastaDetayScreen from './src/pages/HastaDetay';
import HastaSilScreen from './src/pages/HastaSilme';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Hasta Kayıt Sistemi',
          headerStyle: {
            backgroundColor: '#5b69d4'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="HastaEkle"
        component={HastaEkle}
        options={{
          title: 'Hasta Ekle',
          headerStyle: {
            backgroundColor: '#2992C4'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="HastaGuncelle"
        component={HastaGuncelle}
        options={{
          title: 'Hasta Güncelle',
          headerStyle: {
            backgroundColor: '#A45BB9'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="HastaDetay"
        component={HastaDetayScreen}
        options={{
          title: 'Hasta Görüntüle',
          headerStyle: {
            backgroundColor: '#F9AD29'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="HastaSil"
        component={HastaSilScreen}
        options={{
          title: 'Hasta Sil',
          headerStyle: {
            backgroundColor: '#D1503A'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;