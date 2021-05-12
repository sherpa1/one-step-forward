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
        let { id } = this.props.match.params;//get people id from url param         

        try {
            result = await axios_instance.get('/people/' + id);
            if (result.data) {
                this.setState({ people: People.fromJSON(result.data) });
            }
        } catch (error) {
            console.error(error);
        }


    }

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


    steps_list = () => {
        return this.state.people.steps.sort((a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()).map(step => <li>{step.date} : {step.total} steps</li>)
    }

    details = () => {
        return (
            <div className="PeopleDetails">
                <Link to="/">Back to main</Link>
                <h1>{this.state.people.fullname()}</h1>
                <section>
                    <img src={`/images/avatars/${this.state.people.avatar}`} />
                    <p><label>Gender : </label><span class="value">{this.state.people.gender}</span></p>
                    <p><label>Birthday : </label><span class="value">{this.state.people.birthday}</span></p>
                    <p><label>Height : </label><span class="value">{this.state.people.height / 100}m</span></p>
                    <p><label>Weight : </label><span class="value">{this.state.people.height}kg</span></p>
                    <p><label>BMI (Body Mass Index)  : </label><span class="value">{this.state.people.bmi}</span></p>
                </section>

                <section>
                    <h2>Steps during last 10 days</h2>
                    <ul>
                        {this.steps_list()}
                    </ul>
                    <Bar data={this.state.chart} options={options} />
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

export default withRouter(PeopleDetails);