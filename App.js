import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Details from './src/screens/Details';
import ListScreen from './src/screens/ListScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// vs
// import { createStackNavigator } from '@react-navigation/stack';
// see the typo in the import here??
// See, now we got that folder inside node_modules
// node_modules/@react-navigation/stack

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.sectionContainer}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen
            name="Detail"
            component={Details}
            initialParams={{seriesId: 69050}}
            options={{title: ''}}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
  },
});

export default App;
