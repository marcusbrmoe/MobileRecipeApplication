import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Linking, Dimensions } from 'react-native';
import styles from "../../styles/styles";
import { PieChart } from "react-native-chart-kit";

// Display a pie chart of one recipe's nutrition values. 
export default function Pie(props) {

    recipe = props.recipe;

    // Set chart configurations. 
    const chartConfig = {
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#FFFFFF",
        backgroundGradientToOpacity: 1,
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        useShadowColorFromDataset: false // optional
    };

    // Use the recipes data to set the datasets and labels used in the chart.
    const data = [
        {
          name: "(g) Carbs",
          quantity: parseFloat(recipe.totalNutrients.CHOCDF.quantity.toFixed(1)),
          color: "#0000FF",
          legendFontColor: "#000000",
        },
        {
          name: "(g) Fat",
          quantity: parseFloat(recipe.totalNutrients.FAT.quantity.toFixed(1)),
          color: "#FB1313",
          legendFontColor: "#000000",
        },
        {
          name: "(g) Protein",
          quantity: parseFloat(recipe.totalNutrients.PROCNT.quantity.toFixed(1)),
          color: "#00FF00",
          legendFontColor: "#000000",
        },
        {
          name: "(g) Fiber",
          quantity: parseFloat(recipe.totalNutrients.FIBTG.quantity.toFixed(1)),
          color: "#999900",
          legendFontColor: "#000000",
        },
    ];

    return(
        <View style={styles.piechartstyle}>
            <PieChart
                data={data}
                width={Dimensions.get("window").width}
                height={300}
                chartConfig={chartConfig}
                accessor={"quantity"}
                backgroundColor={"transparent"}
                paddingLeft={32}
                absolute
            />
        </View>
    )
}