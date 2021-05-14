import Step from './Step';

export default class People {

    static SEDENTARY = "sedentary";
    static LOW_ACTIVE = "low active";
    static SOMEWHAT_ACTIVE = "somewhat active";
    static ACTIVE = "active";
    static HIGHLY_ACTIVE = "highly active";

    constructor(id) {
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
        people.avatar = json.avatar;

        people.steps = [];

        if (json.steps) {
            json.steps.forEach(step => {
                people.steps.push(Step.fromJSON(step));
            });
        }

        //people.steps.sort((a,b)=>a.date-b.date);

        return people;
    }

    fullname() {
        return this.firstname + " " + this.lastname;
    }

    link() {
        return "/" + this.id;
    }

    activity_average(){
        let sum = 0;

        this.steps.forEach(step => {
            sum += step.total;
        });

        return Math.round(sum/this.steps.length);

    }

    activity_level() {

        const steps_by_day = this.activity_average();

        if(steps_by_day<5000){
            return People.SEDENTARY;
        }else if(steps_by_day>=5000 && steps_by_day<=7499){
            return People.LOW_ACTIVE;
        }else if(steps_by_day >= 7500 && steps_by_day <= 9999){
            return People.SOMEWHAT_ACTIVE;
        }else if(steps_by_day>10000&&steps_by_day<12500){
            return People.ACTIVE;
        }else if(steps_by_day>=12500){
            return People.HIGHLY_ACTIVE;
        }
    }

}