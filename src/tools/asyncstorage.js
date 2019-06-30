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
        return await AsyncStorage.getItem(itemName);
      } catch (error) {
        return false;
      }
    },

    clear: async () => AsyncStorage.clear(),
}
