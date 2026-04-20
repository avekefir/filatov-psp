import { SoftwareProductComponent } from "../../software_components/software_product/software.js";
import { SoftwareMainPage } from "../software_main/software.js";
import { Software3DViewerComponent } from "../../software_components/software-3d_viewer/software.js";
import { SoftwareHeaderComponent } from "../../software_components/software_header/software.js";

export class SoftwareProductPage {
    constructor(parent, id, products = null) {
        this.parent = parent;
        this.id = id;
        this.products = products;
    }

    getData() {
        // Если передан массив продуктов, ищем в нем
        if (this.products && Array.isArray(this.products)) {
            const product = this.products.find(p => p.id === parseInt(this.id));
            if (product) {
                return product;
            }
        }
        
        // Если продукт не найден, возвращаем заглушку
        return {
            id: this.id,
            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Apache_HTTP_Server_logo_%282019-present%29.svg/1200px-Apache_HTTP_Server_logo_%282019-present%29.svg.png",
            title: `Продукт не найден`,
            text: `Продукт с ID ${this.id} был удален. Вернитесь на главную страницу.`,
            categories: ["серверное ПО", "программное обеспечение"]
        };
    }
    
    get pageRoot() {
        return document.getElementById('product-page');
    }
    
    getHTML() {
        return `
            <div id="product-page">
                <div class="container">
                    <div id="product-container"></div>
                    <div id="model-viewer-container" class="mt-4"></div>
                </div>
            </div>
        `;
    }
    
    goHome() {
        const softwareMainPage = new SoftwareMainPage(this.parent);
        softwareMainPage.render();
    }
    
    render() {
        this.parent.innerHTML = '';
        
        const header = new SoftwareHeaderComponent(this.parent);
        header.render(() => this.goHome());
        
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const productContainer = document.getElementById('product-container');
        
        const data = this.getData();
        const product = new SoftwareProductComponent(productContainer);
        product.render(data);

        const modelViewerContainer = document.getElementById('model-viewer-container');
        const viewer3d = new Software3DViewerComponent(modelViewerContainer, this.id);
        viewer3d.render();
    }
}