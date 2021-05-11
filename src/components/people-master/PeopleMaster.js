import React from 'react';
import axios from 'axios';

import People from '../../models/People';
import "./PeopleMaster.css";

import PeoplePreview from '../people-preview/PeoplePreview';


/*
const SEDENTARY = "sedentary";
const LOW_ACTIVE = "low active";
const SOMEWHAT_ACTIVE = "somewhat active";
const ACTIVE = "active";
const HIGHLY_ACTIVE = "highly active";

const STEPS_ACTIVITY_LEVEL = [SEDENTARY, LOW_ACTIVE, SOMEWHAT_ACTIVE, ACTIVE, HIGHLY_ACTIVE];
*/

const axios_instance = axios.create({
    baseURL: 'http://localhost:1337',
    timeout: 1000
});

export default class PeopleMaster extends React.Component{

    constructor(props){
        super(props);
        this.state = {people:[], filtered_people:[]};
    }

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

        if (result.data) {
            const people = result.data.map((json) => People.fromJSON(json));

            this.setState({ people: people, filtered_people: people });
        }
    }

    people_list = () => {
        return this.state.filtered_people.map((people) => <PeoplePreview key={people.id} people={people}/>);
    }

    render(){
        return(
            <section>
            <h1>People</h1>
                {this.people_list()}
            </section>
        );
    }
}