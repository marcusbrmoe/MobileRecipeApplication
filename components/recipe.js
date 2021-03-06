import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Linking, Alert } from 'react-native';
import { Text, Image, Button, ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import * as Speech from 'expo-speech';
import styles from '../styles/styles';

// Display the information of one selected recipe.  
export default function Recipe({ route, navigation }) {

    // Get the recipe data from route.params. 
    const recipe = route.params;
    
    // Recipe information. 
    const [info, setInfo] = useState('');

    useEffect(() => {
        getInformation();
    }, [])

    const getInformation = () => {
        let informationString = `${recipe.label}, ingredients, `

        for (let i = 0; i < recipe.ingredientLines.length; i++) {
            informationString = informationString + recipe.ingredientLines[i]+ ', ';
        }
        setInfo(informationString);
    }

    // Save the recipe to the Firebase Realtime Database.
    // There is a problems with recipes containing an object property called "SUGAR.added". 
    // It does not follow naming convetions and will not be accepted by Firebase. 
    // As I have no need for the object, I just delete the object if it exists and saves the recipe as normal. 
    const saveRecipe = () => {
        try{
            if(recipe.totalNutrients["SUGAR.added"] !== undefined){
                delete recipe.totalNutrients["SUGAR.added"];
            } 
            firebase.database().ref().child("recipes").orderByChild("uri").equalTo(recipe.uri).once("value", snapshot => {
                if (snapshot.exists()){
                    Alert.alert('Existing recipe', 'This recipe is already saved!')
                } else {
                    firebase.database().ref('recipes/'+recipe.label).set(recipe)
                    .catch(error => {
                        console.error(error);
                        Alert.alert('Something went wrong!', 'The recipe is NOT saved!')
                    });
                    Alert.alert('Saved!', 'This recipe is now saved!') // Confirming the save. 
                }
            })
            .catch((error) => {
                console.error(error)
            })
        } catch(error) {
            console.error(error);
        }
        
    }
    
    // Listen to the recipe information
    const recipeInformationListening = () => {
        Speech.stop();
        Speech.speak(info, {language: 'english'});
    }

    // Adding a button in the header for saveing the recipe.
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
                    <Button 
                        onPress={() => saveRecipe()}
                        buttonStyle={styles.savebutton}
                        icon={<Icon
                            name='save'
                            size={24}
                            color= 'white'
                          />}
                    />
          ),
        });
    }, [navigation]);

    // Creating items for the ingredient list. 
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
                        icon={<Icon
                            name='assistive-listening-systems'
                            size={22}
                            color= 'white'
                          />}
                        onPress={() => recipeInformationListening()}
                    />
                </View>
                <Text style={{marginLeft: 10}}>This recipe yields {recipe.yield} servings</Text>
                <View style={styles.ingredientlist}>   
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