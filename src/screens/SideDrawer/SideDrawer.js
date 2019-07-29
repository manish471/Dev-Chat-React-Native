import React, { Component } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Platform} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import firebase from '../../../firebase';



class SideDrawer extends Component {


    constructor(props){
        super(props);

    }

    handleSignout = () => {
        firebase
          .auth()
          .signOut()
          .then(() => console.log("signed out!"));
    
      };

  render() {
    return (
      <View style={styles.Container}>
         <TouchableOpacity onPress={this.handleSignout}>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS==='android'?"md-log-out":"ios-log-out"}
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    Container: {
        paddingTop:50,
        backgroundColor:"white",
        flex:1
    },
    drawerItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      backgroundColor: "#eee"
    },
    drawerItemIcon: {
      marginRight: 10
    }
  });


  
  export default SideDrawer;