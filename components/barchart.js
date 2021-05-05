import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Linking, Dimensions } from 'react-native';
import styles from "../styles/styles";
import { BarChart } from "react-native-chart-kit";

export default function Bar(props) {

    recipe = props.recipe;

    const chartConfig = {
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#FFFFFF",
        backgroundGradientToOpacity: 1,
        fillShadowGradient: "#277106",
        fillShadowGradientOpacity: 1,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        decimalPlaces: 1,
        barPercentage: 0.35,
    };

    const data = {
        labels: [
            recipe.totalNutrients.CHOLE.label,
            recipe.totalNutrients.NA.label,
            recipe.totalNutrients.CA.label,
            recipe.totalNutrients.MG.label,
            recipe.totalNutrients.K.label,
            recipe.totalNutrients.P.label,
            recipe.totalNutrients.ZN.label,
            recipe.totalNutrients.FE.label,
        ],
        datasets: [
          {
            data: [
                parseFloat(recipe.totalNutrients.CHOLE.quantity.toFixed(1)),
                parseFloat(recipe.totalNutrients.NA.quantity.toFixed(1)),
                parseFloat(recipe.totalNutrients.CA.quantity.toFixed(1)),
                parseFloat(recipe.totalNutrients.MG.quantity.toFixed(1)),
                parseFloat(recipe.totalNutrients.K.quantity.toFixed(1)),
                parseFloat(recipe.totalNutrients.P.quantity.toFixed(1)),
                parseFloat(recipe.totalNutrients.ZN.quantity.toFixed(1)),
                parseFloat(recipe.totalNutrients.FE.quantity.toFixed(1)),
            ]
          }
        ],
    };

    return(
        <View style={styles.barchartstyle}>
            <BarChart 
                data={data}
                width={Dimensions.get("window").width-30}
                height={330}
                chartConfig={chartConfig}
                verticalLabelRotation={40}
                yAxisSuffix="mg"
                showBarTops={false}
                showValuesOnTopOfBars={true}
                fromZero={true}
            />
        </View>
    )
}