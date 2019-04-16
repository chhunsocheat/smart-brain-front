import React, { Component } from 'react';
import './App.css';
import Navigation from './component/Navigation/Navigation'
import Logo from './component/Logo/Logo'
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm'
import Rank from "./component/Rank/Rank"
import Signin from "./component/SignIn/Signin"
import Register from "./component/Register/Register"
import FaceRecognition from "./component/FaceRecognition/FaceRecognition"
import Particles from 'react-particles-js';
import 'tachyons';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'a13fb8be5ba44a7289b74bfd2f9e867d'
 });
const particlesDisplay = 
{
  "particles": {
      "number": {
          "value": 150
      },
      "size": {
          "value": 3
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
}
class App extends Component {
  constructor(){
    super();
    this.state={
    input: '',
    imageURL: '',
    box: {},
    route:"signin",
    isSignin: false,
    user:{
      id: '',
      name: '',
      email : '',
      password :'',
      entries: 0,
      joined: ''
    }
  }
}
loadUser=(data)=>{
this.setState({user:{
      id: data.id,
      name: data.name,
      email : data.email,
      password :data.password,
      entries: data.entries,
      joined: data.joined
}})
console.log(this.state.user)
}
componentDidMount(){
  fetch('http://localhost:3000')
  .then(response => response.json())
  .then(data=>console.log(data))
}
calculateFaceLocation =(data)=>{
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputImage');
  const width = Number(image.width);//converting width of the image to a number
  const height = Number(image.height);
  console.log (width,height);
  return{
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width -(clarifaiFace.right_col *width),
    bottomRow: height -(clarifaiFace.bottom_row *height)

  }
}
displayFaceBox =(box)=>{
  console.log(box);
this.setState({box})
}
onInputChange = (event)=> {
  this.setState({input: event.target.value}); //value of the input(URL)
}
onButtonSubmit=()=>{
  this.setState({imageURL:this.state.input})
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
  .then(response =>{
    if(response){
      fetch('http://localhost:3000/image',{
        method: 'put',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify({
          id:this.state.user.id
        })
      })
      .then(res=>res.json())
      .then(count=>{
        console.log(this.state.user.entries)
        this.setState(Object.assign(this.state.user,{entries:count})
       ) })
    }
    this.displayFaceBox(this.calculateFaceLocation(response))})
  .catch(err => console.log(err));
}
onRouteChange =(route)=>{
  if(route === "signout"){
    this.setState({isSignin:false})
  }else if(route==="home"){
    this.setState({isSignin: true})
  }
  this.setState({route: route})
}

  render() {
    return (
      <div className="App">
        <Particles className="particles"
            params={particlesDisplay}//background display  
            />
        <Navigation isSignIn={this.state.isSignin} onRouteChange={this.onRouteChange}/>
        {
        this.state.route === 'home' ?
        <div>
        <Logo/>
        <Rank name={this.state.user.name} entries={this.state.user.entries} />
        <ImageLinkForm 
          onInputChange={this.onInputChange}//URL of the image  
          onButtonSubmit={this.onButtonSubmit}/> 
        <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
        </div>
        :(
          this.state.route ==="signin"?
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
      }
        </div>
    );
  }
}

export default App;
