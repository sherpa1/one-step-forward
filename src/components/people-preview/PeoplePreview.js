import React from 'react';
import "./PeoplePreview.css";

export default class PeoplePreview extends React.Component{

    steps_list = ()=>{
        return this.props.people.steps.sort((a,b)=>new Date(a.date).getDate()-new Date(b.date).getDate()).map(step=><li>{step.date} : {step.total} pas</li>)
    }

    render(){
        return(
            <article>
                <h1>{this.props.people.fullname()}</h1>
                <p><label>gender : </label><span class="value">{this.props.people.gender}</span></p>
                <p><label>brithday : </label><span class="value">{this.props.people.birthday}</span></p>
                <p><label>height : </label><span class="value">{this.props.people.height/100}m</span></p>
                <p><label>weight : </label><span class="value">{this.props.people.height}kg</span></p>
                <p><label>BMI (Body Mass Index)  : </label><span class="value">{this.props.people.bmi}</span></p>
                <ul>
                    {this.steps_list()}
                </ul>
            </article>
        );
    }
}