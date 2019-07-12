# Touristapp Application

## Dev notes

Requirements:
- Run `npm install -g react-native-cli`
- Install `Android Studio`
- Open `SDK Manager` in `Android Studio` and check `Google Play Licensing Services`
- Accept Android SDK Licenses
- Install `openjdk version 1.8.0_212`
- Run `npm install`
- Create file `local.properties` in android's project folder and add `sdk.dir = /home/USERNAME/Android/Sdk`
- Creat `env.js` file at your root directory, like this :
```javascript
export default {
    googleMapsApiKey: 'GOOGLE_MAPS_API_KEY',
    jwtKEY : "SOME_SECRET"
}
```
- Run `react-native run-android`
