import  {Navigation}  from "react-native-navigation";
import {registerScreens} from './src/screens/Screens';


registerScreens();



// Start a App

Navigation.events().registerAppLaunchedListener(() => {

  Navigation.setRoot({
    root: {
      component: {
        name: 'App.Initializing'
      }
    },
  });
});




