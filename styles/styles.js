import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 4,
        backgroundColor: '#fff',
    },
    listcontainer: {
        flex: 5,
        margin: 10,
        backgroundColor: '#fff',
    },
    overlaycontainer:{
        width: '90%',
        height: '80%',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    headerpicture:{
        flex: 1,
    },
    recipeheadline:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginRight: 10
    },
    ingredientcontainer:{
        flex: 3,
        marginTop: 20,
        width: Dimensions.get("window").width
    },
    recipebuttoncontainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 10,
        justifyContent: 'space-around',
    },
    filterchecklistcontainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around', 
    },
    filterinputcontainer: {
        flex: 1,
        justifyContent: 'space-around', 
    },
    barchartstyle: {
        flex: 2,
        padding:15,
    },
    piechartstyle: {
        flex: 2,
    },
});

export default styles;