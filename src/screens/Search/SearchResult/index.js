// React imports
import React, { useState, useEffect, useContext  } from 'react';
import context  from '../CreateRoute/index';
 
// Styles imports
import Style from "../../../styles/createRoute";
import { colors } from "../../../styles/themes/variables";

// Components imorts
import Banner from "../../../components/Banner";
import {
    View,
    ScrollView,
    List
  } from "react-native";

export default function SearchResult(props) {
    const [data, setData] = useState(null);
    return (
        <>
        <context.Consumer>
            {/* Principal View */}

            <View style={Style.mainContainer}>

                <Banner message="Résultats"/>
                <View style={Style.form}>
                {console.log(props.name)}
                {/* <ScrollView>
                    <List>
                        
                    </List>
                </ScrollView> */}
                </View>

            </View>
        </context.Consumer>
        </>
    )
}