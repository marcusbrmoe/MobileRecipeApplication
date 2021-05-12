import React, { useState } from 'react';
import { View, FlatList, KeyboardAvoidingView } from 'react-native';
import { Button, Input, CheckBox, Text, Overlay } from 'react-native-elements';
import styles from '../styles/styles';

// Allowing for filtering recipes. 
export default function OverlayFilter(props) {

    let query = '';
    const [visible, setVisible] = useState(false);

    // Setting the base value for filter options and creating objects used for check-boxes in filtering. 
    const [calories, setCalories] = useState({maxCal: '', minCal: ''});
    const [ingredients, setIngredients] = useState('');
    const [diets, setDiets] = useState([
        {id: 1, value: '&diet=balanced',      name: 'Balanced',       isChecked: false},
        {id: 2, value: '&diet=high-fiber',    name: 'High-Fiber',     isChecked: false},
        {id: 3, value: '&diet=high-protein',  name: 'High-Protein',   isChecked: false},
        {id: 4, value: '&diet=low-carb',      name: 'Low-Carb',       isChecked: false},
        {id: 5, value: '&diet=low-fat',       name: 'Low-Fat',        isChecked: false},
        {id: 6, value: '&diet=low-sodium',    name: 'Low-Sodium',     isChecked: false},
    ]);

    const [mealTypes, setMealTypes] = useState([
        {id: 1, value: '&mealType=dinner',    name: 'Dinner',     isChecked: false},
        {id: 2, value: '&mealType=lunch',     name: 'Lunch',      isChecked: false},
        {id: 3, value: '&mealType=breakfast', name: 'Breakfast',  isChecked: false},
        {id: 4, value: '&mealType=snack',     name: 'Snack',      isChecked: false},
        {id: 5, value: '&dishType=dessert',   name: 'Dessert',    isChecked: false},
    ]);

    // Creating a query string from the selected and written parameters. 
    // Send the string to home page and search. 
    const apply = () => {

        if (calories.maxCal !== '' && calories.minCal === '') {
            query=`${query}&calories=${calories.maxCal}`
        } else if (calories.maxCal === '' && calories.minCal !== '') {
            query=`${query}&calories=${calories.minCal}%2B`
        } else if (calories.maxCal !== '' && calories.minCal !== '') {
            query=`${query}&calories=${calories.minCal}-${calories.maxCal}`
        }

        if (ingredients !== '') {
            query=`${query}&ingr=${ingredients}`
        }
        
        for (let i = 0; i < mealTypes.length; i++) {
            if(mealTypes[i].isChecked === true) {
                query=query+mealTypes[i].value
            }
        }

        for (let i = 0; i < diets.length; i++) {
            if (diets[i].isChecked === true) {
                query=query+diets[i].value
            }
        }
        
        props.saveParams(query);
        query='';
    }

    // Set all filters to not selected or empty strings respectively. 
    const removeFilters = () => {
        setCalories({maxCal: '', minCal: ''});
        setIngredients('');
        for (let i = 0; i < mealTypes.length; i++) {
            if(mealTypes[i].isChecked === true) {
                mealTypes[i].isChecked = !mealTypes[i].isChecked;
            }
        }

        for (let i = 0; i < diets.length; i++) {
            if (diets[i].isChecked === true) {
                diets[i].isChecked = !diets[i].isChecked;
            }
        }
        query='';
        props.saveParams('')
    }

    // toggle the visibility of the (filter-) overlay.
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    
    // Handle changes in all checkbox-fields. 
    const handleChange = (index, setFunc, data) => {
        let newData = [...data];
        newData[index].isChecked = !newData[index].isChecked;
        setFunc(newData)
    }

    return(
        <View>
            <Button title='Filter' onPress={toggleOverlay}></Button>
            <Overlay overlayStyle={styles.overlaycontainer} isVisible={visible} onBackdropPress={toggleOverlay}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                    keyboardVerticalOffset={100}
                >
                    <View style={styles.filterchecklistcontainer}>
                        <View>
                            <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 10}}>Diet:</Text>
                            <FlatList 
                                data={diets}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={(item) =>
                                    <CheckBox
                                        title={item.item.name}
                                        checked={item.item.isChecked}
                                        onPress={() => handleChange(item.item.id-1, setDiets, diets)}
                                    />
                                }
                            />
                        </View>
                        <View>
                            <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 10}}>Meal type:</Text>
                            <FlatList 
                                data={mealTypes}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={(item) =>
                                    <CheckBox
                                        title={item.item.name}
                                        checked={item.item.isChecked}
                                        onPress={() => handleChange(item.item.id-1, setMealTypes, mealTypes)}
                                    />
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.filterinputcontainer}>
                        <View>
                            <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 10}}>Number of Ingredients:</Text>
                            <Input 
                                placeholder='Max'
                                keyboardType= 'number-pad'
                                defaultValue={ingredients}
                                onChangeText={(value) => setIngredients(value)}
                            />
                        </View>
                        <View style={{justifyContent: 'space-between'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 10}}>Calories:</Text>
                            <View style={{flexDirection: 'row', width: '50%', justifyContent: 'space-between'}}>
                                <Input 
                                    placeholder='Min'
                                    keyboardType= 'number-pad'
                                    defaultValue={calories.minCal}
                                    onChangeText={(value) => setCalories({...calories, minCal: value.toString()})}
                                />
                                <Input 
                                    placeholder='Max'
                                    keyboardType= 'number-pad'
                                    defaultValue={calories.maxCal}
                                    onChangeText={(value) => setCalories({...calories, maxCal: value.toString()})}
                                />
                            </View>
                            
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Button 
                            buttonStyle={{backgroundColor: 'green', width: 150}}
                            title='Apply' 
                            onPress={() => {apply(); toggleOverlay()}}
                        />
                        <Button 
                            buttonStyle={{backgroundColor: 'red', width: 150}}
                            title='Clear' 
                            onPress={() => {removeFilters(); toggleOverlay()}}
                        />
                    </View>
                </KeyboardAvoidingView>
            </Overlay>
        </View>
    );
}
