import React, { Component } from 'react';
import { StyleSheet,View,TextInput,Button,Text,ActivityIndicator,TouchableNativeFeedback} from 'react-native';
import firebase from '../../../firebase';
import md5 from 'md5';




class Register extends Component {

  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading:false,
    usersRef: firebase.database().ref("users"),
    authMode:"login"
  };


  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if(!this.isEmailValid(this.state)){
      error = {message : "Email is invalid"};
      this.setState({errors: errors.concat(error)});
    }
    else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  isEmailValid=({email})=>{
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }
  

  handleUsernameChange = val => this.setState({ username: val });
  handleEmailChange = val => this.setState({ email: val });
  handlepasswordChange = val => this.setState({ password: val });
  handlePasswordConfirmationChange = val => this.setState({ passwordConfirmation: val });

  
  displayErrors = errors =>
  errors.map((error, i) => <Text style={{color: 'red'}} key={i}>{error.message}</Text>);

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log("user saved");
              });
            })
            .catch(err => {
              console.error(err);
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false
              });
            });
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

  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  };


  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading,
    } = this.state;

    return (
        <View style={styles.inputContainer}>

          <TextInput
            placeholder="Your Name"
            name="username"
            style={styles.input}       
            autoCorrect={false}
            onChangeText={this.handleUsernameChange}
            value={username}
          />
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
          <TextInput
            placeholder="Confirm Password"
            name="passwordConfirmation"
            style={styles.input}       
            autoCorrect={false}
            onChangeText={this.handlePasswordConfirmationChange}
            secureTextEntry
            value={passwordConfirmation}
          />
          <View style={[{ width: "90%", margin: 10}]}>
            {loading?<ActivityIndicator size="small" color="#00ff00" />:
            <Button
              onPress={this.handleSubmit}
              disabled={loading}
              color="#841584"
              title="Register"
            />}
          </View>
          <TouchableNativeFeedback onPress={()=>this.props.changeAuth('login')}>
            <View style={{marginLeft:70}}>
              <Text style={{color:"#0000ff"}}>Already a user? Login</Text>
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


export default Register;
