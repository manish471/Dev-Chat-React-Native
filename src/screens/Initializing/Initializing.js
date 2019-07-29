import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native';

import firebase from '../../../firebase';
import { setUser, clearUser } from "../../actions";

import { goToAuth, goToHome } from '../startMainTabs/startMainTabs';
import { connect } from 'react-redux';
import  HeadingText from '../../Components/UI/HeadingText/HeadingText';





class Initialising extends React.Component {
   componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) { 
          console.log(user);
          this.props.setUser(user);
          goToHome();
        } else {
          goToAuth();
          this.props.clearUser();
        }
      });
  }

  render() {
    return (
    <View style={styles.container}>
         <View style={{marginRight:'auto',marginLeft:'auto'}}><Text style={{color : "white"}}><HeadingText>{'</>'}Devchat</HeadingText></Text></View>
         <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#4c3c4c"
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
    </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'#4c3c4c'
      },
})

export default connect(null,{setUser,clearUser})(Initialising);