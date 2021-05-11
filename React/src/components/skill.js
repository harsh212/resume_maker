import React from 'react';
import {isAuthenticated,getSkill} from '../user/auth';

class Skill extends React.Component{
    constructor(){
        super();
        this.state={
            skill: []
        }
    }
    componentDidMount(){
        const getAchDetails=async (id)=>{
            const data=await getSkill(id);
            console.log(data);
            if(data.error){
                console.log(data.error);
            }
            else{
                this.setState({
                    skill: data.skills
                })
            }
        }
        const id=this.props.match.params.id;
        getAchDetails(id);
    }
    render(){
        return(
            <div> 
                {
                    this.state.skill.map((s,key)=>(
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item title"><h4> <i class="fas fa-pen-nib"></i>{s.title}</h4></li>
                            <li className="list-group-item detail">
                                <div className="progress">
                                    <div className="progress-bar bg-info"  style={{width:`${s.rate*10}%`}}></div>
                                </div>
                                {/* {s.rate} */}
                            </li>
                        </ul>
                    ))
                }
            </div>
        )
    }
}

export default Skill;