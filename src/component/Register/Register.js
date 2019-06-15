import React from 'react'

class Register extends React.Component {
  constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
      name:''
    }
  }
  onEmailChange=(event)=>{
    this.setState({email:event.target.value})
  }
  onPasswordChange=(event)=>{
    this.setState({password:event.target.value})
  }
  onNameChange=(event)=>{
    this.setState({name:event.target.value})
  }
  onSubmitRegister=()=>{
    fetch('http://localhost:3000/register',{
      method: 'post',
      headers : {'Content-Type': 'application/json'},
      body : JSON.stringify({
        email:this.state.email,
        password:this.state.password,
        name:this.state.name,
        
      })
    })
      .then(res=>res.json())
      .then(user=>{
        if(user){
          this.props.onRouteChange('home')
          this.props.loadUser(user);
        }else{
          this.props.onRouteChange('register')
        }
      }) 
     
  }
render(){
return (
<article className="pa4 black-80">
  <form action="sign-up_submit" method="get" acceptCharset="utf-8">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="ph0 mh0 fw6 clip">Register</legend>
      <div className="mt3">
        <label className="db fw4 lh-copy f3" htmlFor="email-address">Email address</label>
        <input 
        autoComplete='username email'
        onChange={this.onEmailChange}
        className="pa2 input-reset ba bg-transparent w-100 measure" 
        type="email" name="email-address"  id="email-address"/>
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f3" htmlFor="name">Name</label>
        <input 
        onChange={this.onNameChange}
        className="pa2 input-reset ba bg-transparent w-100 measure" 
        type="name" name="name"  id="name"/>
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f3" htmlFor="password">Password</label>
        <input 
        autoComplete='current-password'
        onChange={this.onPasswordChange}
        className="b pa2 input-reset ba bg-transparent"
         type="password" name="password"  id="password"/>
      </div>
    </fieldset>
    <div className="mt3">
        <input 
        onClick={this.onSubmitRegister}
        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4" 
        type="button" value="Register"/>
    </div>
    
  </form>
 
</article>

)
}
}
export default Register;