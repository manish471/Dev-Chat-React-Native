import React, { Component } from 'react';
import { View, FlatList, Dimensions, StyleSheet ,ActivityIndicator,ScrollView,TouchableOpacity } from 'react-native';
import Message from './Message';
import firebase from '../../../firebase';
import uuidv4 from "uuid/v4";


export default class DisplayMessages extends Component {


    state={
        messages:[],
        messagesLoading:true,
      }

    componentDidMount() {

        console.log(Dimensions.get("window").height );
        const {channel}=this.props;

        console.log(channel)


        if (channel) {
            this.addListeners(channel.id);
        }
      }
    
      addListeners=(channelId)=>{
        this.addMessageListener(channelId);
      }

      addMessageListener = channelId => {

        let loadedMessages = [];
        const ref = firebase.database().ref('messages');
    
        ref.child(channelId).on("child_added", snap => {
          loadedMessages.push(snap.val());
          this.setState({
            messages: loadedMessages,
            messagesLoading: false
          });
          
      
        });
    
    
      };

      _keyExtractor = (item, index) => `${uuidv4()}`;
        displayMessages = messages =>(
            messages.length > 0 &&
            <FlatList
            data={messages}
            style={{width:"100%"}}
            keyExtractor={this._keyExtractor}
            renderItem={(info) => (
                <TouchableOpacity>
                    <Message
                    key={info.item.timestamp}
                    message={info.item}
                    user={this.state.user}
                    />
                </TouchableOpacity>
            )}
        />  )

    render() {
        const {messages,messagesLoading}=this.state;

        return (
        <View style={styles.messages}>
            {this.displayMessages(messages)}
        </View>
        )
    }
}

const styles = StyleSheet.create({
    messages:{
      width: "100%",
      height:Dimensions.get("window").height-200 ,
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor:"black",
      marginBottom: 5,
      padding: 10,
      backgroundColor: '#eee',
      flexDirection: "row",
      alignItems: "flex-start",
    },
  })
  