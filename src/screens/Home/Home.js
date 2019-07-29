import React, { Component } from 'react'
import { View, Dimensions, Text, StyleSheet ,ActivityIndicator,Animated,Keyboard,UIManager,TextInput,StatusBar } from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {Navigation} from 'react-native-navigation';
import MessageForm from './MessageForm';
import DisplayMessages from './DisplayMessages';

const { State: TextInputState } = TextInput;

class HomeScreen extends Component {


  state = {
    shift: new Animated.Value(0),
  };

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }



  toggleMenuButton=()=>{
    Navigation.mergeOptions('SideDrawer', {
      sideMenu: {
         left: {
           visible : true,
          }
      }
    });

  }

  handleKeyboardDidShow = (event) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
      if (gap >= 0) {
        return;
      }
      Animated.timing(
        this.state.shift,
        {
          toValue: gap-100,
          duration: 500,
          useNativeDriver: true,
        }
      ).start();
    });
  }

  handleKeyboardDidHide = () => {
    Animated.timing(
      this.state.shift,
      {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }
    ).start();
  }

   

  render() {

    const { shift } = this.state;

    if(this.props.isLoading){
      return(
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
      )
    }else{
      return (
          <Animated.View style={[styles.container, { transform: [{translateY: shift}] }]}>

            <View  style={styles.topBar} >
              <Icon style={{marginLeft:10,paddingRight:20,marginTop:12,color:"white"}} name="md-menu" size={34} onPress={this.toggleMenuButton} />
              <Text style={{fontWeight:"bold",fontSize:25,marginTop:12,color:"white"}}>#{this.props.currentChannel.name}</Text>
            </View>

            <View style={{width:"100%",position:"absolute",top:67,flexDirection:"column",alignItems:"space-between"}}>
            <DisplayMessages  channel={this.props.currentChannel}/>

            <MessageForm 
              currentChannel={this.props.currentChannel} 
              currentUser={this.props.currentUser}
            />
            </View>
              
            <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor="#4c3c4c"
            translucent={false}
            networkActivityIndicatorVisible={true}
            />
           
            
            </Animated.View>
        
    )
    }
   
   
  }
}


const styles = StyleSheet.create({
  
  topBar: {
    position:"absolute",
    top:0,
    left:0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"flex-start",
    backgroundColor:"#4c3c4c",
    width:"100%",
    height:65
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
})

const mapStateToProps = state => ({
  currentUser:state.user.currentUser,
  currentChannel:state.channel.currentChannel,
  isLoading:state.channel.isLoading
});


export default connect(mapStateToProps)(HomeScreen);