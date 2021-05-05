import React, { useState, useEffect } from 'react';
import { View, FlatList, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, Input, ListItem, Header, Avatar, SearchBar, Text } from 'react-native-elements';
import * as firebase from 'firebase';
import styles from '../styles/styles';

export default function SavedRecipes({ route, navigation }) {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchRecipes();
    }, []);
    
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

    const deleteRecipe = (item) => {
        firebase.database().ref('recipes/'+item.label).remove();
    }

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

/*

*/