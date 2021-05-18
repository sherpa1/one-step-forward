import React from 'react';
import { Bar } from 'react-chartjs-2';
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

import People from '../../models/People';

import "./PeopleDetails.css";

const axios_instance = axios.create({
    baseURL: 'http://localhost:1337',
    timeout: 1000
});

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

class PeopleDetails extends React.Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
            people: null,
        }
    };

    get_people = async () => {
        let result;
        
        let { id } = this.props.match.params;//get people id from url param (React Dom Router)

        try {
            //get data from API
            result = await axios_instance.get('/people/' + id);
            if (result.data) {
                this.setState({ people: People.fromJSON(result.data) });
            }
        } catch (error) {
            console.error(error);
        }
    }

    //each time component is added to DOM (cf. React Lifecycle)
    componentDidMount = async () => {

        await this.get_people();

        const labels = this.state.people.steps.map(step => step.date);
        const data = this.state.people.steps.map(step => step.total);

        this.setState({
            chart: {
                labels: labels,
                datasets: [
                    {
                        label: 'steps',
                        data: data,

                        backgroundColor: [
                            '#39cccc',
                            '#f39c14',
                        ],
                        borderColor: [
                            '#fff',
                            '#fff',
                        ],
                        borderWidth: 1,
                    },
                ],
            }
        });

    }

    get_css_class_according_to_steps_number = (steps_number)=>{
        if (steps_number>=10000)
            return 'value green';

        else return 'value';
    }

    render_steps_list = () => {
        const steps_ordered_by_date = this.state.people.steps.sort((a, b) => new Date(a.date).getDate() - new Date(b.date).getDate());
        return steps_ordered_by_date.map(step => <li key={step.id}><date>{step.date}</date> : <span className={this.get_css_class_according_to_steps_number(step.total)} >{step.total} steps</span></li>);
    }

    details = () => {
        return (
            <div className="PeopleDetails">
                <Link to="/">Back to main</Link>
                
                <section>
                    <div className="col">
                    <h1>{this.state.people.fullname()}</h1>
                        <img alt="avatar" src={`/images/avatars/${this.state.people.avatar}`} />
                    </div>
                    <div className="col">
                        <h2>Personal data</h2>
                        <p><label>Gender : </label><span class="value">{this.state.people.gender}</span></p>
                        <p><label>Birthday : </label><span class="value">{this.state.people.birthday}</span></p>
                        <p><label>Height : </label><span class="value">{this.state.people.height / 100}m</span></p>
                        <p><label>Weight : </label><span class="value">{this.state.people.weight}kg</span></p>
                        <p><label>BMI (Body Mass Index)  : </label><span class="value">{this.state.people.bmi}</span></p>
                        <p><label>Activity average  : </label><span class="value">{this.state.people.activity_average()} steps by day</span></p>
                        <p><label>Activity level  : </label><span class="value">{this.state.people.activity_level()}</span></p>
                    </div>
                    <div className="col">
                    <h2>Steps over last 10 days</h2>
                        <ul>
                            {this.render_steps_list()}
                        </ul>
                    </div>
                    <div className="col">
                        <h2>Steps number evolution during the last 10 days</h2>
                        <Bar data={this.state.chart} options={options} />
                    </div>
                </section>

                <section>

                </section>
            </div>);
    }

    render() {
        return (
            <main>
                {/* show people's details only if people's data are loaded from API, else show nothing  */}
                {(this.state.people !== null) ? this.details() : null}
            </main>
        );
    }
}

export default withRouter(PeopleDetails);//used by React Dom Router to get params from URL (https://reactrouter.com/web/api/withRouter)