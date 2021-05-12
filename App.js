import React from 'react';

import { NavigationContainer} from'@react-navigation/native';
import { createStackNavigator} from'@react-navigation/stack';
import * as firebase from 'firebase';

import Home from './components/home';
import Recipe from './components/recipe';
import Nutrition from './components/nutrition';
import SavedRecipes from './components/savedrecipes';

// Firebase connection configurations.
const firebaseConfig = {
  apiKey: "AIzaSyBxOOj4r4dPaDaVk2JpCGcoH8GDUTTWOpE",
  authDomain: "recipelist-2fbf5.firebaseapp.com",
  databaseURL: "https://recipelist-2fbf5-default-rtdb.firebaseio.com",
  projectId: "recipelist-2fbf5",
  storageBucket: "recipelist-2fbf5.appspot.com",
  messagingSenderId: "822629360275",
  appId: "1:822629360275:web:0038a0c04186bb801a2366"
};

firebase.initializeApp(firebaseConfig);

// Render app with stack navigation. 
export default function App() {

  // Create stack navigator.
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Recipe List" 
          component={Home}
        />
        <Stack.Screen 
          name="Recipe" 
          component={Recipe} 
          options={({route}) => ({title: route.params.label})}
        />
        <Stack.Screen 
          name="Nutrition" 
          component={Nutrition} 
          options={({route}) => ({title: route.params.label + ' nutrients'})}
        />
        <Stack.Screen 
          name="Saved Recipes" 
          component={SavedRecipes} 
          options={() => ({title: 'Favorites'})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
