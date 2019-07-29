import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';

import {Platform} from 'react-native';


export const goToHome=()=>{


    Navigation.setDefaultOptions({
        bottomTab: {
            selectedIconColor:"#841584"
        },
      });
    
      
      
      Promise.all([
        Icon.getImageSource(Platform.OS==='android'?"md-home":"ios-home",30),
        Icon.getImageSource(Platform.OS==='android'?"md-tv":"ios-tv",30),
        Icon.getImageSource(Platform.OS==='android'?'md-person':'ios-person',30),
        Icon.getImageSource(Platform.OS==='android'?'md-menu':'ios-menu',30),
        Icon.getImageSource(Platform.OS==='android'?'md-people':'ios-people',30),
        Icon2.getImageSource(Platform.OS==='android'?'add-to-list':'add-to-list',30),
        Icon.getImageSource(Platform.OS==='android'?'md-search':'md-search',30),


      
      ]).then(sources=>{
        Navigation.setRoot({
          root: {
            sideMenu:{
              id:'SideDrawer',
                left: {
                  component: {
                    name: 'App.SideDrawer'
                  }
                },
                center:{
                  bottomTabs: {
                    id: 'BottomTabsId',
                    children: [
                      {
                        stack:{
                          id : 'Home',
                          children:[
                            {
                        component: {
                          name: 'App.Home',
                          options: {
                            topBar: {
                               visible:false,
                               _height: 0,
                                drawBehind: true,
                            },
                            bottomTab: {
                              fontSize: 12,
                              text: 'Home',
                              icon:sources[0],
                            }
                          }
                        },
                      }]}},
                      {
                        stack:{
                          id : 'Channels',
                          children:[
                            {
                        component: {
                          name: 'App.Channels',
                          options: {
                            topBar: {
                              visible:false,
                              _height: 0,
                               drawBehind: true,
                               
                            },
                            bottomTab: {
                              text: 'Channels',
                              fontSize: 12,
                              icon:sources[1]
                            }
                          }
                        },
                      }]}
                    },
                    {
                      stack:{
                        id : 'Friends',
                        children:[
                          {
                      component: {
                        name: 'App.Friends',
                        options: {
                          topBar: {
                              title: {
                                  text: 'Friends',
                                  alignment:'center'
                              },
                             
                          },
                          bottomTab: {
                            text: 'Friends',
                            fontSize: 12,
                            icon:sources[4]
                          }
                        }
                      },
                    }]}
                  },
                  
                {
                  stack:{
                    id : 'Profile',
                    children:[
                      {
                  component: {
                    name: 'App.Profile',
                    options: {
                      topBar: {
                         visible:false,
                      },
                      bottomTab: {
                        text: 'Profile',
                        fontSize: 12,
                        icon:sources[2]
                      }
                    }
                  },
                }]}
              }
                    ],
                  }
                }
            }
            
          
          }
        })
      });
      

}

export const goToAuth = () => Navigation.setRoot({
  root: {
    stack: {
      id:"Auth",
      children: [
        {
          component: {
            name: 'App.Auth',
            options: {
              topBar: {
                visible:false
              }
            }
          }
        }
      ],
    }
  }
});