import React, { Component } from 'react'
import {View,TextInput,Button,StyleSheet,StatusBar} from 'react-native';
import { connect } from 'react-redux';
import firebase from '../../../firebase';
import {Navigation} from 'react-native-navigation';


class AddChannelModal extends Component {


    state = {
        channelName: "",
        channelDetails: "",
        channelsRef: firebase.database().ref("channels"),
        user:this.props.currentUser
    };

    


    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
          this.addChannel();
        }
      };

        addChannel = () => {
            const { channelsRef, channelName, channelDetails, user } = this.state;

            const key = channelsRef.push().key;

            const newChannel = {
                id: key,
                name: channelName,
                details: channelDetails,
                createdBy: {
                name: user.displayName,
                avatar: user.photoURL
                }
            };

            channelsRef
                .child(key)
                .update(newChannel)
                .then(() => {
                this.setState({ channelName: "", channelDetails: "" });
                Navigation.pop('Channels');
                })
                .catch(err => {
                    console.error(err);
                });
        };
    
        handleChannelNameChange = val => this.setState({ channelName: val });
        handleChannelDetailsChange = val => this.setState({ channelDetails: val });
        
        isFormValid = ({ channelName, channelDetails }) =>
            channelName && channelDetails;

    render() {
        const {channelName,channelDetails}=this.state;
        return (
          <View style={styles.container}>
            <StatusBar backgroundColor="#4c3c4c" barStyle="light-content" />
            <View style={styles.inputContainer}>
            <TextInput
                placeholder="Channel Name"
                style={styles.input}
                underlineColorAndroid="black"
                onChangeText={this.handleChannelNameChange}
                value={channelName}
            />
            <Button
                  onPress={this.handleSubmit}
                  color="#5cb85c"
                  title="Add"
                  style={styles.button}
            />
            </View>
            
            <View style={styles.inputContainer}>
            <TextInput
                placeholder="Channel Description"
                style={styles.input}
                underlineColorAndroid="black"
                value={channelDetails}
                onChangeText={this.handleChannelDetailsChange}
            />
            <Button
                  onPress={()=>Navigation.pop('Channels')}
                  color="#d9534f"
                  title="Cancel"
                  style={styles.button}
            />
            </View>
          </View>
        )
      }
    }
    
    const styles = StyleSheet.create({
      container:{
        flex:1,
        padding:26,
        backgroundColor:"#fff",
        alignItems:'center',
        justifyContent:'center'
    
      },
      inputContainer: {
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center'
      },
      input:{
        width:"70%"
      },
      button:{
        width:"30%"
      }
    });

    const mapStateToProps = state => ({
        currentUser:state.user.currentUser
      });

    export default connect(mapStateToProps,null)(AddChannelModal);