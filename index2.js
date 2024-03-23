"use strict";
const db = {
    "products": [
        { "id": 1, "name": "product1", "categoryId": 2 },
        { "id": 2, "name": "product2", "categoryId": 1 },
        { "id": 3, "name": "product3", "categoryId": 2 },
        { "id": 4, "name": "product4", "categoryId": 1 }
    ],
    "categories": [
        { "id": 1, "name": "category1" },
        { "id": 2, "name": "category2" }
    ]
};
class Product {
    constructor(id, name, categoryId) {
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
    }
}
class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
class BaseRepository {
    constructor(data) {
        this.data = data;
    }
    getAll() {
        return this.data;
    }
    getById(id) {
        return this.data.find(item => item.id === id);
    }
}
class ProductRepository extends BaseRepository {
    constructor() {
        super(db.products.map(p => new Product(p.id, p.name, p.categoryId)));
    }
}
class CategoryRepository extends BaseRepository {
    constructor() {
        super(db.categories.map(c => new Category(c.id, c.name)));
    }
}
let productRepository = new ProductRepository();
console.log(productRepository.getAll());
let categoryRepository = new CategoryRepository();
console.log(categoryRepository.getAll());
