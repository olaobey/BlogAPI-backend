import { CategoryType } from "@prisma/client";

export class createCategoryDto{
    constructor(
        public blogId: string,
        public title: string,
        public type: CategoryType
    ){}
}

export class updateCategoryDto{
    constructor(
        public id: string,
        public blogId: string,
        public title: string,
        public type: CategoryType = CategoryType.national
    ){}
}

export class categoryIdDto{
    constructor(public id: string){}
}
