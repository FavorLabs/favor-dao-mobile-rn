
import * as React from "react";
import {ScrollView, StyleSheet, Text, View, Image} from "react-native";
export type Props ={
}

const RecordFavTSum = () => {
return (
    <View style={styles.body}>
        <View style={styles.yearNum}>
            <Text style={styles.yearText}>2022</Text>
        </View>
        <View style={styles.imgbox}>
            <Image
                style={styles.image}
                resizeMethod={"resize"}
                source={{uri:'https://reactnative.dev/img/tiny_logo.png'}} />
        </View>
        <View style={styles.descriptionTextBox}>
        <Text style={styles.descriptionText}>
            Andrew Parker received a total of
        </Text>
        </View>
        <View style={styles.favTBox}>
        <Text style={styles.favTSum}>
            234.20
        </Text>
        <Text style={styles.favtText}>
            FavT
        </Text>
        </View>
    </View>
);
};

const styles = StyleSheet.create({
    descriptionText:{
        fontSize:18,
        textAlign:'center'
    },
    descriptionTextBox:{
        marginTop:5
    },
    image:{
        width:70,
        right:70,
        borderRadius:35,
    },
    imgbox:{
        marginTop:14,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:70,
    },
    yearNum:{
        marginTop:20,
        marginRight:15
    },
    yearText:{
        color:"#FF8D1A",
        textAlign:'right',
        fontSize:21
},
    body:{
        backgroundColor:"#F8F8F8"
    },
    favtText:{
        fontSize:16,
        height:16,
        position:'absolute',
        bottom:13,
        right:"13%"
    },
    favTSum:{
        fontSize: 60,
        fontWeight: "700",
    },
    favTBox:{
        marginTop:8,
        display:"flex",
        alignItems:'center',
        marginBottom:32
    }
});

export default RecordFavTSum;
