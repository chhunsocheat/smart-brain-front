import React from 'react'


class Signin extends React.Component{
  constructor(props){
    super(props)
    this.state={
      signInEmail:'',
      signInPassword:''
    }
  }
  onEmailChange=(event)=>{
    this.setState({signInEmail:event.target.value})
  }
  onPasswordChange=(event)=>{
    this.setState({signInPassword:event.target.value})
  }
  onSubmitSignin=()=>{
    
    fetch('http://localhost:3000/signin',{
      method: 'post',
      headers : {'Content-Type': 'application/json'},
      body : JSON.stringify({
        email:this.state.signInEmail,
        password:this.state.signInPassword
      })
    })
    .then(res=>res.json())
    .then(user=>{
      if(user.id){
        this.props.onRouteChange('home')
        this.props.loadUser(user);
        console.log("Valid Username")
      }else{
        alert("Invalid User")
      }
    })
   
  }
render(){
  const {onRouteChange}= this.props
  return (
<article className="pa4 black-80 ">
  <form className="" action="sign-up_submit" method="get" acceptCharset="utf-8">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
      <div className="mt3">
        <label className="db fw4 lh-copy f3" htmlFor="email-address">Email address</label>
        <input
        autoComplete='current email' 
        className="pa2 input-reset ba bg-transparent w-100 measure" 
        type="email" name="email-address"  id="email-address"
        onChange={this.onEmailChange}/>
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f3" htmlFor="password">Password</label>
        <input autoComplete='current-password' className="b pa2 input-reset ba bg-transparent"
         type="password" name="password"  id="password" 
         onChange={this.onPasswordChange}/>
      </div>
    </fieldset>
    <div className="mt3">
        <input 
        onClick={this.onSubmitSignin}
        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4" 
        type="button" value="Sign In"/>
    </div>
    <div className="mt3">
        <input 
         onClick={()=>onRouteChange("register")}
        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4" 
        type="button" value="Register"/>
    </div>
  </form>
</article>

)
}
}
export default Signin;
