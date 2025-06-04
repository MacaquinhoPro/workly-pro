import 'dotenv/config';

export default {
  expo: {
    name: 'workly-pro',
    slug: 'workly-pro',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'worklypro',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      APIKEY: process.env.APIKEY,
      AUTHDOMAIN: process.env.AUTHDOMAIN,
      PROJECTID: process.env.PROJECTID,
      STORAGEBUCKET: process.env.STORAGEBUCKET,
      MESSAGINGSENDERID: process.env.MESSAGINGSENDERID,
      APPID: process.env.APPID,
      MEASUREMENTID: process.env.MEASUREMENTID,
    },
  },
};
