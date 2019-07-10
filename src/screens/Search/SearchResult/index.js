// React imports
import React, { useState, useEffect } from 'react';

// Styles imports
import Style from "../../../styles/createRoute";
import { colors } from "../../../styles/themes/variables";

// Components imorts
import Banner from "../../../components/Banner";
import {
    View
  } from "react-native";

export default function SearchResult(props) {
    const fetch = props
    console.log(fetch);
    const [data, setData] = useState(null);
    return (
        <>
            {/* Principal View */}

            <View style={Style.mainContainer}>

                <Banner message="Résultats"/>
                <View style={Style.form}>
                {/* <ScrollView>
                    <List>
                        
                    </List>
                </ScrollView> */}
                </View>

            </View>
        </>
    )
}