import React from "react";
import { View, Button, Text, StyleSheet ,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Entypo';
import firebase from '../../../firebase';


class MessageForm extends React.Component {
  state = {
    messageRef:firebase.database().ref('messages'),
    user:this.props.currentUser,
    channel:this.props.currentChannel,
    loading:false,
    message: "",
    errors:[]
  };

  

  handleChange = val => this.setState({ message: val });

  createMessage = () => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL
      }
    };
    message["content"] = this.state.message;

    return message;
  };

  sendMessage = () => {
    const { message, channel, user,messageRef  } = this.state;

    if (message) {
      this.setState({ loading: true });
      messageRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: "", errors: [] });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: "Add a message" })
      });
    }
  };


  render() {

    // prettier-ignore
    const { errors, message, loading, uploadState, percentUploaded } = this.state;
    return (
        <View style={[styles.inputContainer]}>
            <TextInput
                placeholder="Type Here"
                onChangeText={this.handleChange}
                value={message}
                style={{width:"60%",marginLeft:10}}
            />
            <Icon1
                  onPress={()=>alert('Pick Emoji(Not Yet Done!)')}
                  color="grey"
                  name="emoji-happy"
                  style={{marginRight:2,marginBottom:5}}
                  size={25}
            />
            <Icon
                  onPress={()=>alert('Upload Image(Not Yet Done!)')}
                  color="grey"
                  name="md-images"
                  style={{marginRight:6,marginBottom:5}}
                  size={25}
            />
            <Icon
                  onPress={this.sendMessage}
                  color="#5cb85c"
                  name="md-send"
                  style={{marginRight:6,marginBottom:5}}
                  size={30}
            />
          
        </View>
    );
  }
}

const styles = StyleSheet.create({
    inputContainer: {
      width:"100%",
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:'center',
      backgroundColor:"white",
      height:50,
    },
  
  })

export default MessageForm;
