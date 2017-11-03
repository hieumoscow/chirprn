# Chirp Mean Stack React Native  

| iOS | Android |
| -------- | -------- |
| [![Build status](https://build.mobile.azure.com/v0.1/apps/a48dead2-edad-446f-952c-b5bdfb9537b6/branches/master/badge)](https://mobile.azure.com)     | [![Build status](https://build.mobile.azure.com/v0.1/apps/69f7a9f4-56fe-485b-baf5-3e01199bfd86/branches/master/badge)](https://mobile.azure.com)     |
  
`code-push release-react Chirprn-iOS iOS -d Production --noDuplicateReleaseError;`  
`code-push release-react Chirprn-Android Android -d Production --noDuplicateReleaseError;`



In this lab we are going to create a cross-platform mobile application for iOS & Android using React Native. Our app will include the following features:
* View posts
* Login
* Register
* Create post  

You can do this lab in your local computer, no Azure portal needed.

**Choice of Editor**

Since you'll be doing some coding here, using an Editor will be definitely helpful. You're welcomed to use any of your favorite editors such as [Visual Studio Code](https://code.visualstudio.com/), Sublime, Atom, or Notepad++.

## Index
1. [Getting Started](#getting-started)
    * [Dependencies](#dependencies-please-do-this-prior-to-starting-the-lab)
    * [React Native Basics](#react-native-basics)
1. [Rest Service](#rest-service)
    * [Global Variables](#global-variables)
    * [Network Request](#network-request)
1. [Pages](#pages)
    * [App.js](#appjs)
    * [Home](#home)
    * [Login & Register](#login-amp-register)
1. [Appendix](#appendix)
    * [Path Alias](#path-alias)

## Lab Exercises
1. [RestService.js add missing functions](#please-do-the-same-for-postloginasync-amp-postregisterasync)
1. [Home.js add missing functions](#missing-functions)
1. [Register.js](#registerjs)
1. [Form.js add missing functions](#formjs-missing-functions)
1. [Bonus exercise - Form.js](#formjs-missing-functions)
1. [Bonus exercise - Posts.js](#formjs-bonus-exercise)
## Getting Started
### Dependencies (please do this prior to starting the lab)

To begin, please visit https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies to set up the required dependencies to start develop. This may take a long time so please do this prior to entering the lab.


**Please stop before the** [Creating a new application section](https://facebook.github.io/react-native/docs/getting-started.html#creating-a-new-application)

After the environment setup, please create a folder with the name chirprn as the root folder for your React Native project and open that folder in your terminal to run all commands in this lab.


```
cd .../chirprn  // the project folder
npm install -g react-native-cli
react-native init chirprn
```
#### To run your app on iOS:
```
react-native run-ios
```
Or
```
Open ios/chirprn.xcodeproj in Xcode
Hit the Run button
```
#### To run your app on Android:
```
react-native run-android
```
Have an Android emulator running (quickest way to get started), or a device connected.

### Possible errors

#### Unable to load script from assets
If you encounter this error upon running react-native run-android (particularly with Windows OS):
![](https://raw.githubusercontent.com/dazdaz/chirp/master/images/chirprn-red-error.jpg)

Do the following:
- Verify that you have USB Debugging enabled: https://facebook.github.io/react-native/releases/0.19/docs/running-on-device-android.html#content and be able to run "adb" from your terminal / Powershell.
- If you have the ADB installed part of the Android Studio / SDK, make sure that you've added the path in environment variable under "System". This is how i did mine:
![](https://raw.githubusercontent.com/dazdaz/chirp/master/images/chirprn-env-variable.JPG)
- Restart your computer.



#### SDK Location not found:
```
FAILURE: Build failed with an exception.

* What went wrong:
A problem occurred configuring project ':app'.
> SDK location not found. Define location with sdk.dir in the local.properties file or with an ANDROID_HOME environment variable.

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output.

BUILD FAILED

Total time: 1 mins 1.082 secs
Could not install the app on the device, read the error above for details.
Make sure you have an Android emulator running or a device connected and have
set up your Android development environment:
https://facebook.github.io/react-native/docs/android-setup.html
Nguyens-iMac:chirprn nguyennhuhieu$
```

Go to the android/ directory of your react-native project
Create a file called local.properties with this line:

sdk.dir = {SDK directory}
### React Native Basics
React Native follows React principle which is component centric, thus we should be aiming to make each features/module be its own component.
Please first view component basics at https://facebook.github.io/react-native/docs/tutorial.html and the below concepts before we dive in to code.
#### [Props](https://facebook.github.io/react-native/docs/props.html)
Most components can be customized when they are created, with different parameters. These creation parameters are called props. E.g.:
#### [State](https://facebook.github.io/react-native/docs/state.html) 
Component variables, e.g. for Login Component we might have 2 states (Username:string, Password:string)
#### [Style](https://facebook.github.io/react-native/docs/style.html)
CSS style format for components.
For layout ordering within <View>, please also view [FlexBox](https://facebook.github.io/react-native/docs/flexbox.html) 
    
## Rest Service
Please create  folder ./components/utils. We will use this for all Rest Service components.
### Global Variables
Create a `Global.js` file at ./components/utils folder. We can declare global variables in this file using  React Native `global` as below:
```javascript
global.BASE_URL = 'YOUR_CHIRP_URL'; // sample 'https://chirp-app-saqlain.herokuapp.com/';
global.API_POST = global.BASE_URL + 'api/posts';
global.API_LOGIN = global.BASE_URL + 'auth/login';
global.API_SIGNUP = global.BASE_URL + 'auth/signup';
```
Global variable is fitting for us to modify API endpoints at one single place (Global.js)

### Network Request
Create a `RestService.js` file in ./components/utils folder. This file contains all API requests functions to our Chirp backend. Please review the **API doc** at https://documenter.getpostman.com/view/868259/chirp-mean-stack/71FVqb2.

Networking in React Native is well documented by FaceBook at https://facebook.github.io/react-native/docs/network.html
I myself find async/await to be the cleanest way to handle network request. Thus, use the below async/await templates to create 4 Rest Service functions for Chirp:
#### GET GetPostsAsync 
```javascript
export async function GetPostsAsync() {
    try {
        console.log(global.API_POST);
        var resp = await fetch(global.API_POST);
        var respJson = await resp.json();
        console.log(respJson);
        return respJson;
    }
    catch (error) {
        // console.error(error);
        alert('Please check your network connection' + error)
        return null;
    };
}
```

#### POST CreatePostAsync
```javascript
export async function CreatePostAsync(value, username) {
    try {
        var body = 'text=' + value + '&created_by=' + username;
        var resp = await fetch(global.API_POST, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });
        var respJson = await resp.json();
        console.log(respJson);
        return respJson;
    }
    catch (error) {
        // console.error(error);
        alert('Please check your network connection' + error)
        return null;
    };
}
```

##### Please do the same for `POST:LoginAsync` & `POST:RegisterAsync`

#### Consume
Once the functions are completed, we can consume them using the below syntax, we will go further into this in the [Pages](#pages) section:

```javascript
async _login(){
        var respJson = await LoginAsync(this.state.username, this.state.password);
        if (respJson) {
            if (respJson.state === 'success') {
                alert('You have logged in successfully!');
                this.props.onSuccess(respJson.user);
            }
            else {
                alert(respJson.message);
            }
        }
    }
```


### Path Alias
Integrate path alias to simplify path directives in our project.
```
// Instead of using this; 
import MyUtilFn from '../../../../utils/MyUtilFn';
// Use that: 
import MyUtilFn from 'utils/MyUtilFn';
```
```
npm install --save-dev babel babel-plugin-module-alias
```
"[babel-plugin-module-alias](https://www.npmjs.com/package/babel-plugin-module-alias)" for Path Alias -> check .babelrc  

```
//.babelrc
{
  "presets": [
    "react-native"
  ],
  "plugins": [
    [
      "babel-plugin-module-alias",
      [
        {
          "src": "./resources",
          "expose": "res"
        },
        {
          "src": "./components/auth",
          "expose": "auth"
        },
        {
          "src": "./components/utils",
          "expose": "utils"
        },
      ]
    ]
  ]
}
```


Any change to .babelrc, you need to:  
```
1. npm start -- --reset-cache
2. reload ios/android app RR (Mac: cmd+R)
```

## Pages

We are going to create 3 UI Pages for our app: 
*  Home
*  Login
*  Register
### App.js
#### Navigation

There are many navigation libraries for React Native, in this lab we use reactnavition from https://reactnavigation.org. Please review their site for further info.
Run the below cmd to install navigation component.
```
npm install --save react-navigation@1.0.0-beta.12
```
In this library, we will use [StackNavigation](https://reactnavigation.org/docs/intro/#Introducing-Stack-Navigator) to navigate around the above 3 pages.
> For our app, we want to use the StackNavigator because conceptually we want to obtain a 'card stack' effect of movement, where each new screen is put on the top of the stack and going back removes a screen from the top of the stack. 
> 

Please review & copy the below content for App.js.
```javascript
// App.js
import React from 'react';
import {
    AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const ChirpApp = StackNavigator({
    Home: { screen: Home },
    Login: { screen: Login },
    Register: { screen: Register },
});
AppRegistry.registerComponent('chirprn', () => ChirpApp);
```
Replace the content of `Index.js` with this one line:
`import App from './App';`

Notes:
* AppRegistry is the JS entry point to running all React Native apps. AppRegistry register the root component with `registerComponent` function. `chirprn` is the root folder name.
* We use StackNavigation for 3 UI Pages, please create the files Home.js (in ./components/), Login.js (components/auth/), Register.js (components/auth/)
### Home

The Home page is our app's first screen. This page contains:
1. Hello Text
2. List of Posts
3. Login & Register (for not logged in users)
4. Chirp & Logout (for logged in users)

| Home | Home (Logged In) | Home (Chirp / Create Post) |
| -------- | -------- | -------- |
| ![](https://raw.githubusercontent.com/dazdaz/chirp/master/images/ChirpRN-Home.png)| ![](https://raw.githubusercontent.com/dazdaz/chirp/master/images/ChirpRN-HomeAuth.png)     | ![](https://raw.githubusercontent.com/dazdaz/chirp/master/images/ChirpRN-CreatePost.png)     |

Please review the partial code for Home.js below
```javascript
// Home.js
import React from 'react';
import {
    StyleSheet,
    View,
    Button,
    Text,
} from 'react-native';
import Posts from './Posts';
import Register from './auth/Register';
import Prompt from 'react-native-prompt';
import Global from './utils/Global'
import { CreatePostAsync } from './utils/RestService'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            helloStr: 'Please log in to Chirp!',
            user: [],
            showAuth: true,
            showPrompt: false,
        }
    }

    static navigationOptions = {
        title: 'Chirp',
    };

    //#region Render
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.hello}>{this.state.helloStr}</Text>
                <Posts ref="posts" />
                {this._renderAuth()}
                {this._renderPrompt()}
            </View>
        );
    }

    _renderAuth() {
            if (this.state.showAuth) {
                const { navigate } = this.props.navigation;
                return (<View style={styles.auth}>
                    <Button
                        onPress={() => navigate('Login', { setUser: this.setUser.bind(this) })}
                        title="Login"
                    />
                    <Button
                        onPress={() => navigate('Register', { setUser: this.setUser.bind(this) })}
                        title="Register"
                    />
                </View>)
            }
            else { // show Chirp & Logout
                return (<View style={styles.auth}>
                    <Button
                        onPress={() => this.setState({ showPrompt: true })}
                        title="Chirp"
                    />
                    <Button
                        onPress={() => {
                            this.setState({
                                user: [],
                                showAuth: true,
                                helloStr: 'Hello, please log in to Chirp!'
                            });
                        }}
                        title="Logout"
                    />
                </View>)
            }
        }
    //#endregion
}

var styles = StyleSheet.create({
    auth: {
        marginBottom: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff'
    },
    hello: {
        margin: 20
    }
});
```



#### Missing functions

##### _renderPrompt():
Please create this function to render the Prompt to create Post. In this lab, we use 
Prompt component for the create Post function: https://www.npmjs.com/package/react-native-prompt
Install the component into `/chirprn/`
> npm install react-native-prompt --save

Review the guide for using it in npmjs site, we will use `this.state.showPrompt` to decide whether to show the Prompt. You can find the Chirp button to show the Prompt below.
```javascript
<Button
    onPress={() => this.setState({ showPrompt: true })}
    title="Chirp"
/>
```

if you run into `react2.PropType error`, go to `chirprn/node_modules/react-native-prompt/src/Prompt.js/Users/nguyennhuhieu/chirprn/node_modules/react-native-prompt/src/Prompt.js` and modify the first line to:  
```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
```

##### setUser(userJson):
This function is called when User logged in successfully. 
When called, we should change the states:
```
this.setState({
    helloStr: 'Hello ' + userJson.username,
    user: userJson,
    showAuth: false, // enable _renderAuth
});
```

We will pass this function in `_renderAuth` in this line: 
```javascript
<Button
    onPress={() => navigate('Login', { setUser: this.setUser.bind(this) })}
    // Everytime a component give its function for a child to call, we need to call bind.
    title="Login"
/>
```
##### async _createPost(message):
Just like [Login Rest API consume](#consume), please create this function to call [POST CreatePostAsync](#post-createpostasync) for creating Chirp post.


#### Posts.js
This component loads the list of Chirp Posts and display it as a list. The implementation below also include:
* RefreshControl for pull-to-refresh feature.
* Moment component to format date time from https://momentjs.com/
    * Run the command to install: `npm install moment --save`
* ListView (deprecated)

##### Bonus exercise:
Replace `ListView` with [`FlatList`](https://facebook.github.io/react-native/docs/flatlist.html)

```javascript
//Posts.js
import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, RefreshControl } from 'react-native';
import moment from 'moment' // for datetime format
import { GetPostsAsync } from './utils/RestService'

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      dataSource: [],
    }
  }

  componentDidMount() {
    return this._loadData();
  }

  async _loadData() {
    let respJson = await GetPostsAsync();
    console.log('json ' + respJson);
    if (respJson) {
      let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(respJson)
      });
    }
  }

  static toDateTimeString(dateStr: string) {
    return moment(new Date(dateStr)).format('lll');
  }

  _onRefresh() {
    if (!this.state.isLoading) {
      this.setState({ refreshing: true });
      this._loadData().then(() => {
        this.setState({ refreshing: false });
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingTop: 0, paddingBottom: 20, alignItems: 'stretch' }}>
        <ListView
          dataSource={this.state.dataSource}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          renderRow={(item) =>
            <View style={{ flex: 2, padding: 10, marginTop: 5, marginBottom: 5, marginLeft: 10, marginRight: 10, backgroundColor: '#f2f9ff', alignItems: 'stretch' }}>
              <Text>{item.text}</Text>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <Text>Posted by @{item.created_by}</Text>
                <Text>{Posts.toDateTimeString(item.created_at)}</Text>
              </View>
            </View>
          }
        />
      </View>
    );
  }
}
```
Reference: https://facebook.github.io/react-native/releases/0.27/docs/sample-application-movies.html  

### Login & Register
Login and Register pages are similar in terms of UI and functionalities. Thus, we will create components that are reusable between the two. The below screenshot is our UI requirement for the lab.

| Login | Register |
| -------- | -------- |
| ![](https://raw.githubusercontent.com/dazdaz/chirp/master/images/ChirpRN-Login.png)| ![](https://raw.githubusercontent.com/dazdaz/chirp/master/images/ChirpRN-Register.png)     |

#### Login.js

```javascript
//Login.js
import React, { Component } from 'react';
import Wallpaper from './Wallpaper';
import Form from './Form';
import { NavigationActions } from 'react-navigation'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    // Everytime a component give its function for a child to call, we need to call bind.
    // In this case, we give onSuccess function to Form when user succefully logged in.
  }

  onSuccess(userJson) {
    // Pass User Json by calling setUser(userJson) in Home component
    const { params } = this.props.navigation.state;
    params.setUser(userJson);
    // Navigate back to Home.js to see Home (logged in) page
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  }

  static navigationOptions = {
    title: 'Login', // Page Title
  };

  render() {
    return (
      <Wallpaper>
        <Form title="Login" onSuccess={this.onSuccess} />
      </Wallpaper>
    );
  }
}
```
#### Register.js
Please create `Register.js` based of `Login.js` in `/components/auth/` folder

#### Components
*  /components/auth/**Wallpaper.js**: custom component for Image Background
*  /components/auth/**Form.js**: custom component that contains:
    1. TextInput (Username)
    1. TextInput (Password): `secureTextEntry={true}`
    1. Button: `title={this.props.title} //'Login'|'Register'`

*Note that we could put all the code into Login.js, however organizing it into Wallpaper & Form components would allows higher abstraction & code reuse in our project.

Reference: https://github.com/dwicao/react-native-login-screen
##### Wallpaper.js
Download wallpaper image [here](https://raw.githubusercontent.com/dazdaz/chirp/master/chirprn/resources/wallpaper1.jpg) & insert it into `/chirprn/resources/` folder (sibling folder of `/chirprn/components/`)
We will use ImageBackground component for our Wallpaper since <Image> can no longer contain children in future releases.
    
```javascript
//Wallpaper.js
import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	ImageBackground,
} from 'react-native';

import bgSrc from 'resource/wallpaper1.jpg';

export default class Wallpaper extends Component {
	render() {
		return (
				<ImageBackground style={styles.picture} source={bgSrc}>
					{this.props.children}
				</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	picture: {
		flex: 1,
		width: null,
		height: null,
	},
});
```

##### Form.js
Please review below the UI of our login/register form.

* Constructor & States:
```javascript
// Form.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import { LoginAsync, RegisterAsync } from '../utils/RestService'
import {
    ScrollView,
    StyleSheet,
    Image,
    View,
    TextInput,
    Button,
    KeyboardAvoidingView,
} from 'react-native';

export default class Form extends Component {
constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        };
    }
```
* UI Layout

```javascript
// Form.js
onLayout(e) {
        // Ensure width & height values are updated during orientational change. 
        // Portrait & Landscape
        this.setState({
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        });
}
    
render() {
        return (
            <ScrollView contentContainerStyle={styles.container} onLayout={this.onLayout.bind(this)}>
                <KeyboardAvoidingView behavior='padding'
                    style={styles.content}>
                    <TextInput
                        style={{ width: this.state.width - 40, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
                        onChangeText={(username) => this.setState({ username })}
                    />
                    <TextInput
                        style={{ width: this.state.width - 40, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })}
                    /> 
                     <Button
                        onPress={this._onPress.bind(this)} 
                        // Everytime a component give its function for a child to call, we need to call bind.
                        title={this.props.title}
                        accessibilityLabel="Learn more about this purple button"
                    />

                </KeyboardAvoidingView>
            </ScrollView>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
    },
    content: {
        marginBottom: 100,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
```
###### Notes
* **KeyboardAvoidingView** is a component to solve the common problem of views that need to move out of the way of the virtual keyboard. It can automatically adjust either its position or bottom padding based on the position of the keyboard.
* **<View onLayout={this.onLayout.bind(this)}>** Ensure width & height values are updated during orientational change. Portrait & Landscape.  
    
##### Form.js Missing Functions: 
* **_onPress()**: Called when login/register Button is clicked. Please use `this.props.title` to determine if the Form is currently child of Login.js or Register.js. The way we include Form.js in Login.js would be `<Form title='Login'/>`
* **async login()**: If Form is for Login, call this method to make an Login API request to Login. Example as seen in [Login Rest API Consume](#consume)
* **async _register()**: If Form is for Register, call this method.

##### Form.js Bonus Exercise:
Replace `TextInput` with a custom component `UserInput`

```javascript
//Form.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	TextInput,
	Image,
} from 'react-native';

export default class UserInput extends Component {
	constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        };
	}
	
	onLayout(e) {
		this.setState({
			width: Dimensions.get('window').width,
			height: Dimensions.get('window').height,
		});
	}

	render() {
		var inputStyle = StyleSheet.flatten([
			styles.input,
			{
				backgroundColor: 'rgba(255, 255, 255, 0.4)',
				width: this.state.width - 40,
				height: 40,
				marginHorizontal: 20,
				paddingLeft: 45,
				borderRadius: 20,
				color: '#ffffff',
			}
		  ])
		return (
			<View style={styles.inputWrapper} onLayout={this.onLayout.bind(this)}>
				<Image source={this.props.source}
					style={styles.inlineImg} />
				<TextInput style={inputStyle}
					placeholder={this.props.placeholder}
					secureTextEntry={this.props.secureTextEntry}
					autoCorrect={this.props.autoCorrect}
					autoCapitalize={this.props.autoCapitalize}
					returnKeyType={this.props.returnKeyType}
					onChangeText={this.props.onChangeText}
					value={this.props.value}
					placeholderTextColor='white'
					underlineColorAndroid='transparent' />
			</View>
		);
	}
}

UserInput.propTypes = {
	source: PropTypes.number.isRequired,
	placeholder: PropTypes.string.isRequired,
	secureTextEntry: PropTypes.bool,
	autoCorrect: PropTypes.bool,
	autoCapitalize: PropTypes.string,
	returnKeyType: PropTypes.string,
};

const styles = StyleSheet.create({
	inputWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 40,
		marginBottom: 20
	},
	inlineImg: {
		position: 'absolute',
		zIndex: 99,
		width: 22,
		height: 22,
		left: 35,
		top: 9,
	},
});
```

## Appendix

Command to clean, restore npm packages & restart npm VM
```
rm -rf node_modules && npm install  
npm start -- --reset-cache   
react-native run-ios  
```

https://hackmd.io/s/r1z0wJKpb
