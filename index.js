// Model
class BaseModel {
    constructor(id, name, created_at) {
        this.id = id;
        this.name = name;
        this.created_at = created_at;
    }
}
class Product extends BaseModel {
    constructor(id, categoryid, category, name, created_at) {
        super(id, name, created_at);
        this.categoryid = categoryid;
        this.category = category;
    }
    setCategory(category) {
        this.category = category;
        this.categoryid = category.id;
    }
}
class Category extends BaseModel {
    constructor(id, products = [], name, created_at) {
        super(id, name, created_at);
        this.products = products;
    }
    addProduct(product) {
        this.products.push(product);
        product.setCategory(this);
    }
}
class Repository {
    constructor() {
        this.model = [];
    }
    getAll() {
        return this.model;
    }
    getById(id) {
        return this.model.find(item => item.id === id);
    }
    create(item) {
        this.model.push(item);
        return item;
    }
    update(item, id) {
        const index = this.model.findIndex(i => i.id === id);
        if (index > -1) {
            this.model[index] = item;
        }
        return item;
    }
    erase(id) {
        const index = this.model.findIndex(i => i.id === id);
        if (index > -1) {
            this.model.splice(index, 1);
        }
    }
}
class ProductRepository extends Repository {
    getProductInStock() {
        // Filtro fictício para produtos em estoque
        return this.model.filter(product => product.id > 0);
    }
}
class CategoryRepository extends Repository {
}
// Controller
class BaseController {
    constructor(repository) {
        this.repository = repository;
    }
    getAll() {
        return this.repository.getAll();
    }
    getById(id) {
        return this.repository.getById(id);
    }
    create(id, name) {
        const item = this.createInstance(id, name);
        return this.repository.create(item);
    }
    update(id, name) {
        const item = this.createInstance(id, name);
        return this.repository.update(item, id);
    }
    erase(id) {
        this.repository.erase(id);
    }
    createInstance(id, name) {
        throw new Error('Method not implemented.');
    }
}
class ProductController extends BaseController {
    createInstance(id, name) {
        return new Product(id, undefined, undefined, name);
    }
}
class CategoryController extends BaseController {
    createInstance(id, name) {
        return new Category(id, [], name);
    }
}
// View
class BaseView {
    display(items, title) {
        console.log(`*** ${title} ***`);
        items.forEach(item => console.log(`ID: ${item.id}, Name: ${item.name}`));
    }
}
class ProductView extends BaseView {
}
class CategoryView extends BaseView {
}
// Injeção de Dependências e Uso
const productRepository = new ProductRepository();
const productController = new ProductController(productRepository);
const productView = new ProductView();
const newProd = productController.create(1, 'product1');
const allProds = productController.getAll();
productView.display(allProds, 'Products');
const categoryRepository = new CategoryRepository();
const categoryController = new CategoryController(categoryRepository);
const categoryView = new CategoryView();
const newCat = categoryController.create(1, 'category1');
const allCats = categoryController.getAll();
categoryView.display(allCats, 'Categories');
// Adicionando um produto a uma categoria
newCat.addProduct(newProd);
