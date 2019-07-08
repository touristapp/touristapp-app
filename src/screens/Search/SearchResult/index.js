// React imports
import React from 'react';

// Styles imports
import Style from "../../../styles/createRoute";
import { colors } from "../../../styles/themes/variables";

// Components imorts
import Banner from "../../../components/Banner";
import { ScrollView } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';
import { useStateValue } from '../../../hooks/state';


export default function SearchResult() {
    const [data, setData] = useState(json);
    return (
        <>
            {/* Principal View */}

            <View style={Style.mainContainer}>

                <Banner message="Résultats"/>
                <View style={Style.form}>
                <ScrollView>
                    <List>
                        $
                    </List>
                </ScrollView>
                </View>

            </View>
        </>
    )
}