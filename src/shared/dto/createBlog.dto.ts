export class createBlogDto{
    constructor(
        public title: string, 
        public content: string, 
        public description: string
        ) {}
}

export class updateBlogDto{
    constructor(
        public id: string,
        public title: string, 
        public content: string, 
        public description: string
        ) {}
}
