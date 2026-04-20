import { SoftwareProductComponent } from "../../software_components/software_product/software.js";
import { SoftwareMainPage } from "../software_main/software.js";
import { SoftwareHeaderComponent } from "../../software_components/software_header/software.js";
import { ajax } from "../../software_modules/software_ajax.js";
import { apiUrls } from "../../software_modules/software_apiUrls.js";

export class SoftwareProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.product = null;
    }

    getData() {
        ajax.get(apiUrls.getProductById(this.id), (data, status) => {
            if (status === 200 && data) {
                this.product = data;
                this.renderProduct();
            } else {
                console.error('Ошибка загрузки продукта:', status);
                this.showNotFound();
            }
        });
    }
    
    showNotFound() {
        const productContainer = document.getElementById('product-container');
        if (productContainer) {
            productContainer.innerHTML = `
                <div class="alert alert-danger" style="border-radius: 12px;">
                    <h4>Продукт не найден</h4>
                    <p>Продукт с ID ${this.id} не существует или был удален.</p>
                    <button id="back-to-home" class="btn" style="background: #7cbd97; color: #1a3a2a;">Вернуться на главную</button>
                </div>
            `;
            const backBtn = document.getElementById('back-to-home');
            if (backBtn) {
                backBtn.addEventListener('click', () => this.goHome());
            }
        }
    }
    
    renderProduct() {
        const productContainer = document.getElementById('product-container');
        if (productContainer && this.product) {
            const product = new SoftwareProductComponent(productContainer);
            product.render(this.product);
        }
    }
    
    get pageRoot() {
        return document.getElementById('product-page');
    }
    
    getHTML() {
        return `
            <div id="product-page">
                <div class="container">
                    <div id="product-container"></div>
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
        
        this.getData();
    }
}