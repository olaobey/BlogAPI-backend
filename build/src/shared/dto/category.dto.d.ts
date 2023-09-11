import { CategoryType } from "@prisma/client";
export declare class createCategoryDto {
    blogId: string;
    title: string;
    type: CategoryType;
    constructor(blogId: string, title: string, type: CategoryType);
}
export declare class updateCategoryDto {
    id: string;
    blogId: string;
    title: string;
    type: CategoryType;
    constructor(id: string, blogId: string, title: string, type?: CategoryType);
}
export declare class categoryIdDto {
    id: string;
    constructor(id: string);
}
