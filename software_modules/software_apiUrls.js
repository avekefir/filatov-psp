class ApiUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getProducts() {
        return `${this.baseUrl}/software_stocks`;
    }

    getProductById(id) {
        return `${this.baseUrl}/software_stocks/${id}`;
    }

    createProduct() {
        return `${this.baseUrl}/software_stocks`;
    }

    updateProduct(id) {
        return `${this.baseUrl}/software_stocks/${id}`;
    }

    deleteProduct(id) {
        return `${this.baseUrl}/software_stocks/${id}`;
    }
}

export const apiUrls = new ApiUrls();