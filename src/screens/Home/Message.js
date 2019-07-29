import React, { Component } from 'react';
import { View, Image, Text, StyleSheet ,ActivityIndicator,ScrollView } from 'react-native';

import moment from "moment";

// const isOwnMessage = (message, user) => {
//   return message.user.id === user.uid ? "message__self" : "";
// };

// const isImage = message => {
//   return message.hasOwnProperty("image") && !message.hasOwnProperty("content");
// };

const timeFromNow = timestamp => moment(timestamp).fromNow();

const Message = ({ message, user }) => (
  <View style={styles.listItem}>
    <Image
        resizeMode="cover"
        style={styles.placeImage}
        source={{ uri: message.user.avatar  }}
    />
    <View>
        <View style={{flexDirection:"row"}}>
            <Text style={{fontSize:20,color:"black",fontWeight:"bold"}}>{message.user.name}</Text>
            <Text style={{marginLeft:7,marginTop:7}}>{timeFromNow(message.timestamp)}</Text>
        </View>
      
      <Text style={{fontSize:15,color:"black",}}>{message.content}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
    listItem: {
      width: "100%",
      marginBottom: 5,
      padding: 3,
      backgroundColor: "#fff",
      flexDirection: "row",
      justifyContent:"flex-start",
      alignItems: "center"
    },
    placeImage: {
        marginLeft:0,
        marginRight: 15,
        width: 40,
        height: 40,
        margin: 12,
        borderRadius: 18, borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'lightgray',
    }
  });

export default Message;

