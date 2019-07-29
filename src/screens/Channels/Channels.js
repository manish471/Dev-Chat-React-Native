import React, { Component } from 'react'
import {View,Text,TextInput,StyleSheet,FlatList,TouchableWithoutFeedback,Dimensions,Button,ToastAndroid} from 'react-native';
import {Navigation} from 'react-native-navigation';
import firebase from '../../../firebase';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {setCurrentChannel,setCurrentChannelLoader} from '../../actions';
import {connect} from 'react-redux';
import Icon2 from 'react-native-vector-icons/Entypo';
import { Content, Container, Card, CardItem, Left, Body, } from 'native-base';



class Channels extends Component {

  state={
    channels:[],
    channelsRef:firebase.database().ref('channels'),
    activeChannel: "",
    channel:null,
    firstLoad:true,
    modal:false,
    isStarred:false,
    searchTerm:"",
    searchResults:[],
    searchLoading:false
  }

  constructor(props){
    super(props);
}

componentDidMount(){
  this.addListeners();
}

addListeners = () => {
  let loadedChannels = [];
  this.state.channelsRef.on("child_added", snap => {
    loadedChannels.push(snap.val());
    this.setState({ channels: loadedChannels },()=>this.setFirstChannel());
  });
};

  openModal=()=>{
    this.setState({modal:true})
    if(this.state.modal===true){
      Navigation.push('Channels', {
        component: {
          name: 'App.AddChannelModal',
          options: {
            topBar: {
              title: {
                text: "Add Workspace",
                alignment : 'center'
              }
            }
          }

        }
      });
    }
  }

  setFirstChannel = () => {

    const firstChannel = this.state.channels[0];
    if (this.state.firstLoad && this.state.channels.length > 0) {
      this.props.setCurrentChannel(firstChannel);
      this.setActiveChannel(firstChannel);
      this.setState({channel: firstChannel});
    }
    this.setState({ firstLoad: false });
  };


  changeChannel = channel => {
    this.props.setCurrentChannel(channel);

    this.props.setCurrentChannelLoader(true); 
    this.setActiveChannel(channel);

    this.setState({channel});
  };

  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id });

    setTimeout(() => {
      this.props.setCurrentChannelLoader(false)  
  
      }, 2000);
    setTimeout(()=>{
    this.props.setCurrentChannelLoader(false); 

    },800)

      Navigation.mergeOptions('BottomTabsId', {
        bottomTabs: {
          currentTabIndex: 0
        }
      })

  };

  handleSearchChange = val => {
    this.setState(
      {
        searchTerm: val,
        searchLoading: true
      },
      () => this.handleSearchChannels()
    );
  };
  handleSearchChannels = () => {
    const channelMessages = [...this.state.channels];
    const regex = new RegExp(this.state.searchTerm, "gi");
    const searchResults = channelMessages.reduce((acc, channel) => {
      if (channel.name && channel.name.match(regex)) {
        acc.push(channel);
      }
      return acc;
    }, []);
    this.setState({ searchResults });
    setTimeout(() => this.setState({ searchLoading: false }), 1000);
  };


  _keyExtractor = (item, index) => item.id;
  displayChannels = channels =>(
    channels.length > 0 &&
    <FlatList
    data={channels}
    style={{width:"100%"}}
    keyExtractor={this._keyExtractor}
    renderItem={(info) => (
      <View>
        {/* <View 
            style={{
            width: "100%",
            marginBottom: 5,
            padding: 10,
            backgroundColor: `${this.state.activeChannel === info.item.id ?"grey":"white"}`,
            flexDirection: "row",
            alignItems: "flex-start"
          }}
        >
          <View style={{flexDirection:"column",justifyContent:"space-between",width:"100%"}}>
            <View>
              <Text style={{fontWeight:"bold",fontSize:20,color:"black"}}>{'#'}{info.item.name}{'  '}</Text>
            </View>
            <View style={{flexDirection:"row",}}>
              <Icon1 name="info-circle" size={20}/>
              <Icon name="staro" size={20} />
            </View>
          </View>
          
        </View> */
        <Content>
          <Card style={{flex: 0}}>
            <CardItem style={{borderBottomWidth: 0.5, borderColor:"grey",}}>
              <Left>
                <View style={[styles.channelAvatar]}><Text style={{fontWeight:"bold",elevation:8,fontSize:25,color:"white"}}>{info.item.name.charAt(0)}</Text></View>
                <Body>
                  <View style={{flexDirection:"row",alignItems:"center",}}>
                  <Text style={{fontSize:20,color:"black"}}>{'#'}{info.item.name}{'  '}</Text>
                  <Icon name="star" onPress={()=>this.setState({isStarred:!this.state.isStarred})} size={25} style={{color:`${this.state.isStarred?"#FFFF33":"grey"}`,marginLeft:4,elevation:4}} />
                  </View>
                 
                  <Text note><Icon2 name="pencil"/>Created By - {info.item.createdBy.name}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem style={{height:60}}>
              <Left>
                  <Body>
                  <View style={{width:"100%",flexDirection:"row",alignItems:"center"}}>
                    <View style={{marginTop:18}}>
                    <Button
                      onPress={()=>this.changeChannel(info.item)}
                      color="#5cb85c"
                      title="Join"
                      style={{width:"30%",}}
                    />
                    </View>
                    <View style={{marginLeft:10,marginTop:18}}>
                    <Button
                      onPress={ ()=>
                        ToastAndroid.showWithGravity(
                          `${info.item.details}`,
                          ToastAndroid.LONG,
                          ToastAndroid.CENTER,
                          25,
                          50,
                        )}
                      color="#4169e1"
                      title="info"
                      style={{width:"30%"}}
                    />
                    </View>
                    
                    {/* <Icon1 name="info-with-circle" size={30} style={{color:"#4169e1",marginLeft:5}}/> */}
                  </View>
                  
                  <Text></Text>
              </Body>

              </Left>
            </CardItem>
          </Card>
        </Content>
        
        
        
        
        
        }
       </View>
    )}
  />  )
  


  render() {

    const {channels,searchTerm,searchResults}=this.state;


    return (
      <View >
        
        <View  style={styles.topBar} >
          <Icon1 style={{marginLeft:10,color:"#841584",}}  name="md-search" size={28} onPress={this.toggleMenuButton} />
          <TextInput
            style={{marginTop:2}}
            placeholder="search"
            onChangeText={this.handleSearchChange}
          />
        </View>
      
        <View style={styles.channels}>
          {searchTerm?
            this.displayChannels(searchResults):
            this.displayChannels(channels)
          }
        </View>
        

        <TouchableWithoutFeedback onPress={this.openModal}>
              <View style={[styles.button,styles.plus]}>
                <Icon2 name="plus" size={23} style={{color:"white"}}/>
              </View>
        </TouchableWithoutFeedback>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  channels:{
    width: "100%",
    position:"absolute",
    top:67,
    height:Dimensions.get("window").height-150,
  },
  topBar: {
    position:"absolute",
    top:0,
    left:0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"flex-start",
    backgroundColor:"white",
    width:"100%",
    height:62,
    elevation:4
  },
  button:{
    width:60,
    height:60,
    alignItems:"center",
    justifyContent:"center",
    shadowColor:"#333",
    elevation:8,
    shadowOpacity:.1,
    shadowOffset:{x:2 ,y:0},
    shadowRadius:2,
    borderRadius:30,
    position:"absolute",
    top:Dimensions.get("window").height-150,
    right:5

  },
  channelAvatar:{
    width:60,
    height:60,
    alignItems:"center",
    justifyContent:"center",
    shadowColor:"#333",
    elevation:2,
    shadowOpacity:.1,
    shadowOffset:{x:2 ,y:0},
    shadowRadius:2,
    borderRadius:30,
    backgroundColor:"#4c3c4c"
  },
  plus:{
    backgroundColor:"#841584"
  }
})


export default connect(null,{setCurrentChannel,setCurrentChannelLoader})(Channels);