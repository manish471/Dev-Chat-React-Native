import React, { Component } from 'react'
import {View,Text,Image,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import MainText from '../../Components/UI/MainText/MainText';
import HeadingText from '../../Components/UI/HeadingText/HeadingText';


 class Profile extends Component {

  state={
    user:this.props.currentUser
  }

  render() {

    const {user}=this.state;

    return (
      <View style={styles.container} behavior="padding">
        <Image
            style={{ width: 80, height: 80, margin: 12, borderRadius: 18, borderWidth: StyleSheet.hairlineWidth, borderColor: 'lightgray' }}
            source={{ uri: user.photoURL  }}
         />
         <MainText><HeadingText>{user.displayName}</HeadingText></MainText>
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

const mapStateToProps = state => ({
  currentUser:state.user.currentUser
});

export default connect(mapStateToProps,null)(Profile);