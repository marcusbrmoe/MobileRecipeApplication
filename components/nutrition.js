import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Linking, Dimensions } from 'react-native';
import styles from "../styles/styles";
import PieChart from "./piechart";
import BarChart from "./barchart";

export default function Nutrition({ route, navigation }) {

    const recipe = route.params;

    return(
        <View style={styles.container}>
            <PieChart recipe={recipe}/>
            <BarChart recipe={recipe}/>
        </View>
    );
}

