"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogDto = exports.createBlogDto = void 0;
class createBlogDto {
    constructor(title, content, description) {
        this.title = title;
        this.content = content;
        this.description = description;
    }
}
exports.createBlogDto = createBlogDto;
class updateBlogDto {
    constructor(id, title, content, description) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.description = description;
    }
}
exports.updateBlogDto = updateBlogDto;
//# sourceMappingURL=createBlog.dto.js.map