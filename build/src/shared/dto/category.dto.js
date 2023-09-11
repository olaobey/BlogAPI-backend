"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryIdDto = exports.updateCategoryDto = exports.createCategoryDto = void 0;
const client_1 = require("@prisma/client");
class createCategoryDto {
    constructor(blogId, title, type) {
        this.blogId = blogId;
        this.title = title;
        this.type = type;
    }
}
exports.createCategoryDto = createCategoryDto;
class updateCategoryDto {
    constructor(id, blogId, title, type = client_1.CategoryType.national) {
        this.id = id;
        this.blogId = blogId;
        this.title = title;
        this.type = type;
    }
}
exports.updateCategoryDto = updateCategoryDto;
class categoryIdDto {
    constructor(id) {
        this.id = id;
    }
}
exports.categoryIdDto = categoryIdDto;
//# sourceMappingURL=category.dto.js.map