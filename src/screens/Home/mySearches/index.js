// React imports
import React from 'react';

// Styles imports
import Style from '../../../styles/mySearches';

// Components imports
import { View, Text } from 'react-native';
import Travel from '../../../components/Travel';
import Banner from '../../../components/Banner';

<<<<<<< Updated upstream
export default function MySearches() {  
=======
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
            let theSearches = travels.data.data
            Fetch.getTravels(currentUser.id, token).then(travels => {
                let theTravels = travels.data.data
                array = theSearches.concat(theTravels);
                dispatch({type: 'myTravelsNSearches', setTravelsNSearches: array})
                fetchDone = true
            });
        });
    }

>>>>>>> Stashed changes
    return (
        <>
            <Banner message="Mes recherches" back={true}/>
            <View style={Style.mainContainer}>
                <Travel from='Paris' to='New York' distance='5 790' carbonPrint='1 440' done={true}/>
                <Travel from='New York' to='Pekin' distance='12 093' carbonPrint='5 320'/>
                <Travel from='New York' to='Hong Kong' distance='12 693' carbonPrint='4 320' done={true}/>
                <Travel from='Hong Kong' to='Paris' distance='9 633' carbonPrint='6 430' done={true}/>
                <Travel from='Paris' to='Marseille' distance='660' carbonPrint='6 710' done={true}/>
            </View>
        </>
    )
}
