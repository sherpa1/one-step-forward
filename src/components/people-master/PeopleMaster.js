import React from 'react';
import axios from 'axios';

import People from '../../models/People';
import "./PeopleMaster.css";

import PeoplePreview from '../people-preview/PeoplePreview';

const axios_instance = axios.create({
    baseURL: 'http://localhost:1337',
    timeout: 1000
});

export default class PeopleMaster extends React.Component{

    constructor(props){
        super(props);
        this.state = {people:[], filtered_people:[]};
    }

    //each time component is added to DOM (cf. React Lifecycle)
    componentDidMount = () => {
        this.get_data();
    }

    get_data = async () => {
        let result;

        try {
            result = await axios_instance.get('/people');
        } catch (error) {
            console.error(error);
        }

        if (result !== undefined && result.data) {
            const people = result.data.map((json) => People.fromJSON(json));//transform json data in an array of People instances

            this.setState({ people: people, filtered_people: people });
        }
    }

    render_people_list = () => {
        return this.state.filtered_people.map((person) => <PeoplePreview key={person.id} people={person}/>);
    }

    filter_people_by_activity_level = (evt)=>{
        const level = evt.currentTarget.value;

        if(level==="all"){
            this.setState({filtered_people:this.state.people});
        }else{
            const filtered_people_list = this.state.people.filter(person => person.activity_level()===level);

            this.setState({filtered_people:filtered_people_list});
        }
        
    }

    render(){
        return(
            <section className="PeopleMaster">
            <h2>Fake People</h2>
            <div>
                <label>Filter people by activity level</label>
            
            <select onChange={(evt)=>this.filter_people_by_activity_level(evt)}>
                <option value="all">All</option>
                <option value={People.SEDENTARY}>Sedentary</option>
                <option value={People.LOW_ACTIVE}>Low Active</option>
                <option value={People.SOMEWHAT_ACTIVE}>Somewhat Active</option>
                <option value={People.ACTIVE}>Active</option>
                <option value={People.HIGHLY_ACTIVE}>Highly Active</option>
            </select>

            </div>
            <div>
                {this.render_people_list()}
            </div>
            </section>
        );
    }
}