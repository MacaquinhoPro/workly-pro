{
  "expo": {
    "name": "workly-pro",
    "slug": "workly-pro",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "worklypro",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra":{
      "APIKEY": "AIzaSyDpj9LMWfy1b45adVLyaaPr2CKJANIvRQI",
      "AUTHDOMAIN": "workly-59281.firebaseapp.com",
      "PROJECTID": "workly-59281",
      "STORAGEBUCKET": "workly-59281.firebasestorage.app",
      "MESSAGINGSENDERID": "275589312956",
      "APPID": "1:275589312956:web:5720fa337c9cc3b0873bb9",
      "MEASUREMENTID": "G-W60LMJQJ6L"
    }

  }
}
