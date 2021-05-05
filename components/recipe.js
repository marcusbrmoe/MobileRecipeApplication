import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Linking, Alert } from 'react-native';
import { Text, Image, Button, ListItem, Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import styles from '../styles/styles';

export default function Recipe({ route, navigation }) {

    const recipe = route.params;

    const saveRecipe = () => {
        try{
            if(recipe.totalNutrients["SUGAR.added"] === undefined){
                firebase.database().ref().child("recipes").orderByChild("uri").equalTo(recipe.uri).once("value", snapshot => {
                    if (snapshot.exists()){
                        Alert.alert('Existing recipe', 'This recipe is already saved!')
                    } else {
                        firebase.database().ref('recipes/'+recipe.label).set(recipe)
                        .then(() => console.log('HELLO'))
                        .catch(error => {
                            console.log('HEEELOO ERROR')
                            console.log(error);
                            Alert.alert('Something went wrong!', 'The recipe is NOT saved!')
                        });
                        Alert.alert('Saved!', 'This recipe is now saved!')
                    }
                })
                .catch((error) => {
                    console.log('error' + error)
                })
            } else {
                Alert.alert('NOT saved!', 'There is something wrong with the recipe.')
            }
        } catch(error) {
            console.log(error);
        }
        
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