import React from 'react';
import defaultImage from '../image/avatar.png';
import { getBasics,isAuthenticated } from './auth';
import {BrowserRouter,Switch,Route,Link} from 'react-router-dom';
import Edu from '../components/edu';
import Work from '../components/work';
import Achievement from '../components/achievement';
import Skill from '../components/skill';
import './profile.css'

class Profile extends React.Component{
    constructor(){
        super();
        this.state={
            id: "",
            firstname: "",
            lastname: "",
            email: "",
            address: "",
            phone: "",
            linkedin: "",
            error: ""
        }
    }

    componentDidMount(){
        const getBasicsDetails=async (id)=>{
            const data=await getBasics(id);
            console.log(data);
            if(data.error){
                console.log(data.error);
            }
            else{
                this.setState({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    address: data.contacts.address,
                    phone: data.contacts.phone,
                    linkedin: data.contacts.linkedin,
                    error: ""
                })
            }
        }
        const id=this.props.match.params.userid;
        
        getBasicsDetails(id);
    }

    render(){
        return(
            <BrowserRouter>
            <div className="main">
                <div className="container profile"> 
                    <div className="row">
                        <div className="col-md-4 card">
                            <div >
                                <img className="card-img-top" src={defaultImage} alt="Card image cap"/>
                                <div className="card-body">
                                    <h3 className="card-title">{this.state.firstname} {this.state.lastname}</h3>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <div>
                                    <p><i className="pic fa fa-envelope" aria-hidden="true"></i> {this.state.email}</p>
                                    <p><i className="pic fas fa-phone"></i> {this.state.phone}</p>
                                    <p><i className="pic fas fa-map-marker-alt"></i> {this.state.address}</p>
                                    <p><i className="pic fab fa-linkedin-in"></i> {this.state.linkedin}</p>
                                </div>
                            </div>       
                        </div>
                        <div className="col-md-8 conta"> 
                                    <ul className="nav nav-tabs">
                                    <li className="nav-item"><Link to={`/profile/${this.props.match.params.userid}/edu/${this.props.match.params.userid}`} className="nav-link">Education</Link></li>
                                    <li className="nav-item"><Link to={`/profile/${this.props.match.params.userid}/work/${this.props.match.params.userid}`} className="nav-link">Work</Link></li>
                                    <li className="nav-item"><Link to={`/profile/${this.props.match.params.userid}/achievement/${this.props.match.params.userid}`} className="nav-link">Achivement</Link></li>
                                    <li className="nav-item"><Link to={`/profile/${this.props.match.params.userid}/skill/${this.props.match.params.userid}`} className="nav-link">Skills</Link></li>
                                    </ul>
                                    <Switch>
                                        <Route exact path='/profile/:userid/edu/:id' component={Edu}></Route>
                                        <Route exact path='/profile/:userid/work/:id' component={Work}></Route>
                                        <Route exact path='/profile/:userid/skill/:id' component={Skill}></Route>
                                        <Route exact path='/profile/:userid/achievement/:id' component={Achievement}></Route>
                                        
                                    </Switch>
                        
                        </div>    

                        </div>
                        </div>
                    </div>
                    </BrowserRouter>
               
        )
    }
}

export default Profile;