// React imports
import React, { useEffect } from 'react';

// Styles imports
import Style from '../../../styles/mySearches';

// Hooks imports
import Fetch from '../../../tools/fetch';
import { useStateValue } from '../../../hooks/state';

// Components imports
import { View, Text, ScrollView } from 'react-native';
import Travel from '../../../components/Travel';
import Banner from '../../../components/Banner';

const MySearches = () => {
    const [{token, currentUser, mySearches, myTravels, myTravelsNSearches}, dispatch ] = useStateValue();

    useEffect(() => {
        dispatch({type: 'isLoading', wait: true});
        Fetch.getSearches(currentUser.id, token).then(travels => {
            let theSearches = travels.data.data
            Fetch.getTravels(currentUser.id, token).then(travels => {
                let theTravels = travels.data.data
                dispatch({type: 'mySearches', setSearches : theSearches})
            });
        });
        dispatch({type: 'isLoading', wait: false});
    },[]);

    return (
        <ScrollView>
            <Banner message="Mes recherches" back={true}/>
            <View style={Style.mainContainer}>
                {mySearches.length===0 &&
                  <View style={{marginTop: 30}}>
                    <Text>Vous n'avez pas encore enregistré de recherches !</Text>
                  </View>
                }
                {mySearches.length>0 && mySearches.map((travel, index) => {
                    return (
                        <Travel key={index} from={travel.departure} to={travel.destination} distance={travel.distance} carbonPrint={travel.carbonFootprint} done={travel.done}/>
                    )
                })}
            </View>
        </ScrollView>
    )
}

export default MySearches;
