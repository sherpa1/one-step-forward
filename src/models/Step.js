export default class Step{
    constructor(id){
        this.id = id;
    }

    static fromJSON(json) {
        const step = new Step(json.id);
        step.people = json.people;
        step.total = json.total;
        step.date = json.date;

        return step;
    }
}