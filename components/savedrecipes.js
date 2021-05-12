import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { ListItem, Avatar, Text } from 'react-native-elements';
import * as firebase from 'firebase';
import styles from '../styles/styles';

// Display your saved/favorite recipes. 
export default function SavedRecipes({ route, navigation }) {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchRecipes();
    }, []);


    // Fetch all saved recipes from the Firebase Realtime Database. 
    const fetchRecipes = () => {
        try{
            firebase.database().ref('recipes/').on('value', snapshot => {
                if(snapshot.exists()) {
                    const data = snapshot.val();
                    const items = Object.values(data);
                    setRecipes(items);
                }
            })
        } catch (error) {
            console.log(error);
            Alert.alert('No database connection!', 'There seems to be a problem with the database connection.');
        }
    }

    // Delete one single recipe from the Firebase Realtime Database. 
    const deleteRecipe = (item) => {
        // Ask for confirmation of deletion choice. 
        Alert.alert(
            'Delete recipe?',
            `Are you sure you want to delete ${item.label}`,
            [
                {text: 'NO', onPress: () => Alert.alert('Nothing deleted!', 'No recipe was deleted from the database'), style: 'cancel'},
                {text: 'YES', onPress: () => {
                    firebase.database().ref('recipes/'+item.label).remove();
                    Alert.alert('Recipe deleted!', `${item.label} has been deleted from the database.`)
                }},
            ]
        );
    }
        
    

    // Create an item for each recipe in the Firebase Realtime Database. 
    const renderItem = ({item}) => (
        <ListItem
            bottomDivider
            onPress={() => navigation.navigate('Recipe', item)}
            onLongPress={() => deleteRecipe(item)}
        >
            <Avatar 
                source={{uri: item.image}}
                size="large"
            />
            <ListItem.Content>
                <ListItem.Title>{item.label}</ListItem.Title>
                <ListItem.Subtitle>{item.source}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron/>
        </ListItem>
    )

    return(
        <View style={styles.container}>
            <View style={styles.listcontainer}>
                <FlatList
                    data={recipes}
                    renderItem={renderItem}
                    keyExtractor={item => item.uri}
                    ListEmptyComponent={
                        <View><Text>No saved recipes</Text></View>
                    }
                />
            </View>
        </View>
    );
}
