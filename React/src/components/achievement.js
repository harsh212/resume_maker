import React from 'react';
import {isAuthenticated,getAch} from '../user/auth';

class Achievement extends React.Component{
    constructor(){
        super();
        this.state={
            achievement: []
        }
    }
    componentDidMount(){
        const getAchDetails=async (id)=>{
            const data=await getAch(id);
            console.log(data);
            if(data.error){
                console.log(data.error);
            }
            else{
                this.setState({
                    achievement: data.achievements
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
                    this.state.achievement.map((ach,key)=>(
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item title"><h4><i class="fas fa-trophy"></i>{ach.title}</h4></li>
                            <li className="list-group-item detail">{ach.description}</li>
                        </ul>
                    ))
                }
            </div>
        )
    }
}

export default Achievement;