import AsyncStorage from '@react-native-community/async-storage';

export default Storage = {
    store: async function ({ item }) {
      try {
        await AsyncStorage.setItem(item);
      } catch (error) {
          alert('Sorry, we could not save your data on this device.');
      }
    },

    retrieve: async function (itemName) {
      try {
        const value = await AsyncStorage.getItem(itemName);
        if (value !== null) {
          // We have data!!
          alert(value);
        }
      } catch (error) {
        alert('Sorry, we could not retrieve your data on this device.');
      }
    }
}
