// React imports
import React from 'react';

// Styles imports
import Style from '../../../styles/myTravels';

// Components imports
import { View, Text } from 'react-native';
import Travel from '../../../components/Travel';
import Banner from '../../../components/Banner';

<<<<<<< Updated upstream
export default function MyTravels() {  
=======
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

>>>>>>> Stashed changes
    return (
        <>
            <Banner message="Mes voyages" back={true}/>
            <View style={Style.mainContainer}>
<<<<<<< Updated upstream
            <Travel from='Paris' to='New York' distance='5 790' carbonPrint='1 440' done={true}/>
                <Travel from='New York' to='Hong Kong' distance='12 693' carbonPrint='4 320' done={true}/>
                <Travel from='Hong Kong' to='Paris' distance='9 633' carbonPrint='6 430' done={true}/>
                <Travel from='Paris' to='Marseille' distance='660' carbonPrint='6 710' done={true}/>
=======
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
>>>>>>> Stashed changes
            </View>
        </>
    )
}
