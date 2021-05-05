import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Linking, Alert } from 'react-native';
import { Text, Image, Button, ListItem, Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import styles from '../styles/styles';

export default function Recipe({ route, navigation }) {

    const recipe = route.params;

    const saveRecipe = () => {
        firebase.database().ref().child("recipes").orderByChild("uri").equalTo(recipe.uri).once("value",snapshot => {
            if (snapshot.exists()){
                Alert.alert('Existing recipe', 'This recipe is already saved!')
            } else {
                firebase.database().ref('recipes/'+recipe.label).set(recipe);
                Alert.alert('Saved!', 'This recipe is now saved!')
            }
        });
    }
    
    const renderItem = ({item}) => (
        <ListItem
            bottomDivider
        >
            <Avatar 
                source={{uri: item.image}}
                size="small"
            />
            <ListItem.Content>
                <ListItem.Title>{item.text}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )

    return (
        <View style={styles.container}>
            <Image 
                source={{uri: recipe.image}} 
                containerStyle={styles.headerpicture}
                PlaceholderContent={<ActivityIndicator />}
            />
            <View style={styles.ingredientcontainer}>
                <View style={styles.recipeheadline}>
                    <Text h3 style={{marginLeft: 10, width: '80%'}}>{recipe.label}</Text>
                    <Button 
                        title='SAVE'
                        onPress={() => saveRecipe()}
                    />
                </View>
                
                <Text style={{marginLeft: 10}}>This recipe yields {recipe.yield} servings</Text>
                <View style={styles.ingredientcontainer}>
                    <FlatList
                        data={recipe.ingredients}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.foodId}
                    />
                </View>
            </View>
            <View style={styles.recipebuttoncontainer}>
                <Button
                    title='Full Recipe'
                    onPress={() => Linking.openURL(recipe.url)}
                />
                <Button
                    title='Nutrition'
                    onPress={() => navigation.navigate('Nutrition', recipe)}
                />
            </View>
            
        </View>
    )
}