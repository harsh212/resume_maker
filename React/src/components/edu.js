import React from 'react';
import {isAuthenticated,getEdu} from '../user/auth';
import '../user/profile.css'
class Edu extends React.Component{
    constructor(){
        super();
        this.state={
            education: []
        }
    }
    componentDidMount(){
        const getEduDetails=async (id)=>{
            const data=await getEdu(id);
            console.log(data);
            if(data.error){
                console.log(data.error);
            }
            else{
                this.setState({
                    education: data.education
                })
            }
        }
        const id=this.props.match.params.id;
        getEduDetails(id);
    }
    render(){
        return(
            <div className="list-group"> 
                {
                    this.state.education.map((edu,key)=>(
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item title"><h4><i class="fas fa-university"></i>{edu.title}</h4></li>
                            <li className="list-group-item detail">{edu.year.start} {edu.year.end}</li>
                            <li className="list-group-item detail">{edu.institute}</li>
                        </ul>
                    ))
                }
            </div>
        )
    }
}

export default Edu;