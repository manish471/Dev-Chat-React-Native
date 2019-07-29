import React, { Component } from 'react';
import { StyleSheet,View} from 'react-native';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import HeadingText from '../../Components/UI/HeadingText/HeadingText';
import MainText from '../../Components/UI/MainText/MainText';


class AuthScreen extends Component {

  state = {
    authMode:"login"
  };


  changeAuthMode=(val)=>{
    this.setState({authMode:val});
  }

  render() {
    const {
      authMode
    } = this.state;

    return (
      <View style={styles.container} behavior="padding">

       <View style={{justifyContent:'center',alignItems:'center'}}><MainText><HeadingText>{'</> '}Devchat</HeadingText> </MainText></View> 

        {authMode==='login'?<Login changeAuth={this.changeAuthMode}/>:<Register changeAuth={this.changeAuthMode}/>}

      </View>
     
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});


export default AuthScreen;
