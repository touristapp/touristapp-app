// React imports
import React, { useEffect } from 'react';

// Styles imports
import Style from '../../../styles/mySearches';

// Hooks imports
import Fetch from '../../../tools/fetch';
import { useStateValue } from '../../../hooks/state';

// Components imports
import { View, Text } from 'react-native';
import Travel from '../../../components/travel';
import Banner from '../../../components/Banner';

export default function MySearches() {  
    const [{token, currentUser, mySearches, myTravels, myTravelsNSearches}, dispatch ] = useStateValue();
    let fetchDone = false
    let array = []

    useEffect(() => {
        if (!fetchDone) {
            fetch() 
        }
    }, []);
    
    async function fetch() {     
        Fetch.getSearches(currentUser.id, token).then(travels => {
            dispatch({type: 'mySearches', setSearches: travels.data.data})
            Fetch.getTravels(currentUser.id, token).then(travels => {
                dispatch({type: 'myTravels', setTravels: travels.data.data})
                array = mySearches.concat(myTravels);
                dispatch({type: 'myTravelsNSearches', setTravelsNSearches: array})
                fetchDone = true
            });
        });
    }

    return (
        <>
            <Banner message="Mes recherches" back={true}/> 
            <View style={Style.mainContainer}>
                {myTravelsNSearches.map((travel, index) => {
                    return (
                        <Travel key={index} from={travel.departure} to={travel.destination} distance={travel.distance} carbonPrint={travel.carbonFootprint} done={travel.done}/>
                    )
                })}
            </View>
        </>
    )
}