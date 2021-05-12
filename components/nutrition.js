import React from 'react';
import { View } from 'react-native';
import styles from "../styles/styles";
import PieChart from "./charts/piechart";
import BarChart from "./charts/barchart";

export default function Nutrition({ route, navigation }) {

    // Get the recipe from route.params. 
    const recipe = route.params;

    // Display both charts with the recipe data. 
    return(
        <View style={styles.container}>
            <PieChart recipe={recipe}/>
            <BarChart recipe={recipe}/>
        </View>
    );
}

