import React from 'react'
const Navigation = ({onRouteChange,isSignIn}) =>{
    
        if(isSignIn){
            return(
        
        <nav style={{display: 'flex', justifyContent:'flex-end'  
        ,paddingLeft:'10px'}}>
            <p  onClick= {()=>onRouteChange("signout")}
            className ='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
            );
    }else {
        return(
        <nav style={{display: 'flex', justifyContent:'flex-end'  ,paddingLeft:'10px'}}>
            <p onClick= {()=>onRouteChange("register")}
            className ='f3 link dim black underline pa3 pointer'>Register</p>
            <p onClick= {()=>onRouteChange("signin")}
            className ='f3 link dim black underline pa3 pointer'>Sign in</p>
        </nav>
        );
    }
}

export default Navigation;