import React, { Component } from 'react'
import { StyleSheet,View,TextInput,Button,Text,ActivityIndicator,TouchableNativeFeedback} from 'react-native';
import firebase from '../../../firebase';


export default class Login extends Component {

    state = {
        email: "",
        password: "",
        errors: [],
        loading: false
      };

      handleEmailChange = val => this.setState({ email: val });
      handlepasswordChange = val => this.setState({ password: val });

      isFormValid = ({ email, password }) => email && password;

      displayErrors = errors =>
        errors.map((error, i) => <p key={i}>{error.message}</p>);

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.setState({ errors: [], loading: true });
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(signedInUser => {
                console.log(signedInUser);
            })
            .catch(err => {
                console.error(err);
                this.setState({
                errors: this.state.errors.concat(err),
                loading: false
                });
            });
        }
        };

    render() {

        const {
            email,
            password,
            errors,
            loading,
          } = this.state;

        return (
            <View style={styles.inputContainer}>

          <TextInput
            placeholder="Your E-Mail Address"
            name="email"
            style={styles.input}       
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this.handleEmailChange}
            keyboardType='email-address'
            value={email}
          />
          <TextInput
            placeholder="Password"
            name="password"
            style={styles.input}       
            autoCorrect={false}
            onChangeText={this.handlepasswordChange}
            secureTextEntry
            value={password}
          />
    
          <View style={[{ width: "90%",marginTop:10, marginLeft: 15}]}>
            {loading?<ActivityIndicator size="small" color="#841584" />:
            <Button
              onPress={this.handleSubmit}
              disabled={loading}
              color="#841584"
              title="Login"
            />}
          </View>
          <TouchableNativeFeedback onPress={()=>this.props.changeAuth('signup')}>
            <View style={{marginLeft:40}}>
              <Text style={{color:"#0000ff"}}>Don't have an account? Register</Text>
            </View>
          </TouchableNativeFeedback> 
          {errors.length > 0 && (
            <View>
              <Text style={{color: 'red'}}>Error</Text>
              {this.displayErrors(errors)}
            </View>
          )}
        </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
      width: "80%"
    },
    input: {
      backgroundColor: "#eee",
      borderColor: "#bbb",
      marginTop:10
    },
  });