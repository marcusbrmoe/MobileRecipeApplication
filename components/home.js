import React, { useState, useEffect } from 'react';
import { View, FlatList, KeyboardAvoidingView } from 'react-native';
import { Button, ListItem, Avatar, SearchBar, Text } from 'react-native-elements';
import styles from '../styles/styles';
import OverlayFilter from './overlay';
import Icon from 'react-native-vector-icons/FontAwesome';


// Home page with search and filter ability. Also, displays recipes and 
// gives access to favorite recipes. 
export default function Home({ navigation }) {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [text, setText] = useState('');

    // The API only serves data if we give it one or more search parameters. 
    // I thought "mealType=dinner" is nice to begin with.
    const fetchData = (search, query='&mealType=dinner') => {
        fetch(`https://api.edamam.com/search?q=${search}&app_id=52e74eb0&app_key=fa94fc1713000eb7b678745f9f10a557&from=0&to=20${query}`)
        .then(response => response.json())
        .then(data => setData(data.hits))
        .catch(err => console.error(err))
    }

    // Update the search text and fetch data. If no query params is saved (query = ''), 
    // fetch with only one parameter. 
    const updateSearch = (text) => {
        setText(text);
        if (query === '' && text === ''){
            fetchData(text);
        } else if (query === '' && text !== ''){
            fetchData(text, '');
        } else {
            fetchData(text, query);
        }
    }

    // Save params and fetch data. If params = '', fetch with only one parameter.
    const saveParams = (params) => {
        setQuery(params);
        if (params === '') {
            fetchData(text)
        } else {
            fetchData(text, params)
        }
    }

    // Fetch data on load. 
    useEffect(() => {
        fetchData(text);
    }, [])

    // Adding a button in the header for accessing favorite/saved recipes.
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button 
                onPress={() => navigation.navigate('Saved Recipes')} 
                buttonStyle={styles.favoritesbutton}
                icon={<Icon
                    name='star'
                    size={22}
                    color= 'green'
                  />}
            />
          ),
        });
    }, [navigation]);

    // Create list items for the flatlist. 
    const renderItem = ({item}) => (
        <ListItem
            bottomDivider
            onPress={() => navigation.navigate('Recipe', item.recipe)}
        >
            <Avatar 
                source={{uri: item.recipe.image}}
                size="large"
            />
            <ListItem.Content>
                <ListItem.Title>{item.recipe.label}</ListItem.Title>
                <ListItem.Subtitle>{item.recipe.source}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron/>
        </ListItem>
    )

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={100}
        >
            <SearchBar 
                onChangeText={(text) => updateSearch(text)}
                value={text}
                placeholder="Search"
            />
            <OverlayFilter saveParams={saveParams}/>
            <View style={styles.listcontainer}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.recipe.uri}
                    ListEmptyComponent={
                        <View><Text>No results</Text></View>
                    }
                />
            </View>
        </KeyboardAvoidingView>
    )
}

// Find recipe by ID: 
// https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_9b5945e03f05acbf9d69625138385408&app_id=52e74eb0&app_key=fa94fc1713000eb7b678745f9f10a557
// https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_43b2f41778b04e094219b37196c4adc7&app_id=52e74eb0&app_key=fa94fc1713000eb7b678745f9f10a557
