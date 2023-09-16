export class TaskModel {
    constructor(
        public id: number,
        public title: string,
        public column: number,
        public functionalityId: number,
        public description: string
    ) {}
}