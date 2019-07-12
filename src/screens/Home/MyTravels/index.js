// React imports
import React, { useEffect } from 'react';

// Styles imports
import Style from '../../../styles/myTravels';

// Hooks imports
import Fetch from '../../../tools/fetch';
import { useStateValue } from '../../../hooks/state';

// Components imports
import { View, Text } from 'react-native';
import Travel from '../../../components/Travel';
import Banner from '../../../components/Banner';

export default function MyTravels() {
    const [{token, currentUser, myTravels}, dispatch ] = useStateValue();
    let fetchDone = false

    useEffect(() => {
        if (!fetchDone) {
            fetch()
        }
    }, []);


    async function fetch() {
        Fetch.getTravels(currentUser.id, token).then(travels => {
            console.log(travels);
            dispatch({type: 'myTravels', setTravels: travels.data.data})
            fetchDone = true
        });
    }

    return (
        <>
            <Banner message="Mes voyages" back={true}/>
            <View style={Style.mainContainer}>
            {myTravels.length===0 &&
              <View style={{marginTop: 30}}>
                <Text>Vous n'avez pas encore enregistré de voyage !</Text>
              </View>
            }
            {myTravels.length>0 && myTravels.map((travel, index) => {
                return (
                    <Travel key={index} from={travel.departure} to={travel.destination} distance={travel.distance} carbonPrint={travel.carbonFootprint} done={true}/>
                )
            })}
            </View>
        </>
    )
}
