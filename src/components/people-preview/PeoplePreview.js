import React from 'react';
import "./PeoplePreview.css";
import { Link } from "react-router-dom";

export default class PeoplePreview extends React.Component {

    render() {
        return (
            <article className="PeoplePreview">
                <Link to={`${this.props.people.link()}`}><h1>{this.props.people.fullname()}</h1>
                <img src={`/images/avatars/${this.props.people.avatar}`}/>
                </Link>
            </article>
        );
    }
}