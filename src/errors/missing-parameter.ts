export class MissingParameter extends Error {

    constructor(parameter: string) {
        super(`${parameter} is missing`);
        this.name = 'MissingParameter';
    }
}
