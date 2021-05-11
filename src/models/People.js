import Step from './Step';
//import moment from 'moment';

export default class People{

    constructor(id){
        this.id = id;
    }

    static fromJSON(json) {
        const people = new People(json.id);
        people.firstname = json.firstname;
        people.lastname = json.lastname;
        people.birthday = json.birthday;
        people.gender = json.gender;
        people.height = json.height;
        people.weight = json.weight;
        people.bmi = json.bmi;
        
        people.steps = [];

        if(json.steps){
            json.steps.forEach(step => {
                people.steps.push(Step.fromJSON(step));
            });
        }

        //people.steps.sort((a,b)=>a.date-b.date);
        
        return people;
    }

    fullname(){
        return this.firstname+" "+this.lastname;
    }
}