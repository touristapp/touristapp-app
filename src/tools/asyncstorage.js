import AsyncStorage from '@react-native-community/async-storage';

export default Storage = {
    store: async (items) => {
      try {
        const keys = Object.keys(items);
        for (let i=0;i<keys.length;i++) {
          await AsyncStorage.setItem(keys[i],items[keys[i]]);
        }
      } catch (error) {
          alert('Sorry, we could not save your data on this device.');
      }
    },

    retrieve: async (itemName) => {
      try {
        const value = await AsyncStorage.getItem(itemName);
        if (value !== null) {
          // We have data!!
          alert(value);
        }
      } catch (error) {
        alert('Sorry, we could not retrieve your data on this device.');
      }
    },

    clear: async () => AsyncStorage.clear(),
}
