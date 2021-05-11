import React from 'react';
import './signup.css';
import {isAuthenticated, signin} from "./auth";
import {Link,Redirect} from 'react-router-dom';
import Login from '../image/Register.JPG'
const errorStyle={
    textAlign: "center"
}
class Signin extends React.Component{
    constructor(){
        super();
        this.state={
            password: "",
            email: "",
            error: "",
            redirectToReferer: false
        }
    }
    handleChange=name=>event=>{
        this.setState({
            [name]: event.target.value,
            error: "" 
        }); 
    };

    isValid=()=>{
        const {email,password}=this.state;

        if(email.length===0){
            this.setState({
                error: "Email is required"
            })
            return false
        }

        if(!/.+\@.+\..+/.test(email))
        {
            this.setState({
                error: "Please Enter a valid email"
            })
            return false;
        }

        if(password.length>=0 && password.length<=5)
        {
            this.setState({
                error: "Password should contain atleast six characters"
            })
            return false;
        }
        
        return true;
    }

    handleSubmit=event=>{
        event.preventDefault();
        if(this.isValid()){
        const {firstname,lastname,password,email,address,phone,linkedin}=this.state;

        const user={
            firstname,
            lastname,
            password,
            email,
            contacts:{address,
            phone,
            linkedin}
        }

        const login=async (user)=>{
            const data=await signin(user);
            console.log(data);
            if(data.error){
                this.setState({error: data.error});
            }
            else{
                if(typeof window !== "undefined"){
                    localStorage.setItem("jwt",JSON.stringify(data));//storing token(userinfo) in local storage
                    this.setState({
                        redirectToReferer: true
                    });
                }
            }
        }
        login(user);
    }
    }

    render(){
        if(this.state.redirectToReferer)
        {
            return <Redirect to={`/profile/${isAuthenticated().user._id}`}/>
        }
        return(
            <div className="sign">
                <div className="container cont">
                    <div className="row">
                        <div className="col-md-4"  style={{padding:'0px'}}>
                            <img src={Login} style={{width:'100%',height:'100%'}}/>
                        </div>
                        <div className="col-md-8" style={{marginTop:'80px'}}>
                            <div className="navigate">
                                <ul className="pagination">
                                    <li className="page-item"><Link to='/signup' className='page-link'><h5>Register</h5></Link></li>
                                    <li className="page-item active"><Link to='#' className='page-link'><h5>Login</h5></Link></li>
                                </ul>   
                            </div>
                            <form onSubmit={this.handleSubmit}> 
                                {this.state.error && 
                                <div className="alert alert-danger" style={errorStyle}>
                                    <i className='fas fa-exclamation-circle' style={{color:"red"}}></i> {this.state.error.toUpperCase()}
                                </div>
                                }
                                <div className="container" >
                                    <div className="row">
                                        <div className="col-md-4"></div>
                                    <div className="">
                                    
                                    <div className="form-group">
                                        <label><i className="fa fa-envelope" aria-hidden="true"></i></label>
                                        <input type="email" className="form-control" placeholder="Enter Email" onChange={this.handleChange("email")} value={this.state.email}></input>
                                    </div>
                                    <div className="form-group">
                                        <label><i class="fa fa-key" aria-hidden="true"></i></label>
                                        <input type="password" className="form-control" placeholder="Enter Password" onChange={this.handleChange("password")} value={this.state.password}></input>
                                    </div>
                                    <div className="">
                                            <button type="submit" className="btn btn-warning btn-block mybtn">Login</button>
                                            <p style={{fontSize: "14px",textAlign: "center"}}>Don't have an Account? <Link to="/signup">Create Account</Link></p>
                                        </div>
                                    </div>
                               </div>
                               </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signin;