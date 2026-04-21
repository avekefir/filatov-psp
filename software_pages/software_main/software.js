import { SoftwareProductCardComponent } from "../../software_components/software_product-card/software.js";
import { SoftwareProductPage } from "../software_product/software.js";
import { SoftwareHeaderComponent } from "../../software_components/software_header/software.js";
import { SoftwareFormPage } from "../software_form/software.js";
import { fetchService } from "../../software_modules/software_fetch.js";
import { apiUrls } from "../../software_modules/software_apiUrls.js";

export class SoftwareMainPage {
    constructor(parent) {
        this.parent = parent;
        this.header = null;
        this.products = [];
        this.allProducts = [];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }
       
    getHTML() {
        return `
            <div id="main-page">
                <div class="container">
                    <div class="row mb-4">
                        <div class="col-md-12">
                            <div style="background: #f0f8f4; border-radius: 12px; padding: 15px; border: 2px solid rgba(140, 140, 140, 0.2);">
                                <div class="row align-items-center">
                                    <div class="col-md-8">
                                        <input type="text" id="search-input" class="form-control" placeholder="Поиск по названию..." style="border-radius: 8px; border: 2px solid #a8e0c0;">
                                    </div>
                                    <div class="col-md-4">
                                        <button id="add-card-btn" class="btn w-100" style="background: #7cbd97; color: #1a3a2a; border: none; padding: 8px; border-radius: 8px; font-weight: bold;">
                                            + Добавить программу
                                        </button>
                                    </div>
                                </div>
                                <div class="mt-2" id="search-stats" style="font-size: 0.85rem; color: #1a3a2a;"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row" id="products-container"></div>
                    
                    <div id="no-results" class="text-center py-5" style="display: none;">
                        <p style="color: #999; font-size: 1.2rem;">Ничего не найдено по вашему запросу</p>
                    </div>
                </div>
            </div>
        `;
    }

    async loadProducts() {
        try {
            const { data, status } = await fetchService.get(apiUrls.getProducts());
            console.log('GET products response:', { status, data });
            if (status === 200 && data) {
                this.allProducts = data;
                this.products = [...data];
                this.renderProducts();
                this.updateSearchStats('');
            }
        } catch (error) {
            console.error('Ошибка загрузки продуктов:', error);
            this.allProducts = [];
            this.products = [];
            this.renderProducts();
            this.updateSearchStats('');
        }
    }

    filterProducts(searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            this.products = [...this.allProducts];
        } else {
            const term = searchTerm.toLowerCase().trim();
            this.products = this.allProducts.filter(product => 
                product.title && product.title.toLowerCase().includes(term)
            );
        }
        this.renderProducts();
        this.updateSearchStats(searchTerm);
    }

    updateSearchStats(searchTerm) {
        const statsDiv = document.getElementById('search-stats');
        const noResultsDiv = document.getElementById('no-results');
        
        if (statsDiv) {
            if (searchTerm && searchTerm.trim() !== '') {
                statsDiv.innerHTML = `🔍 Найдено: ${this.products.length} из ${this.allProducts.length}`;
            } else {
                statsDiv.innerHTML = `📋 Всего программ: ${this.allProducts.length}`;
            }
        }
        
        if (noResultsDiv) {
            if (this.products.length === 0 && this.allProducts.length > 0) {
                noResultsDiv.style.display = 'block';
            } else {
                noResultsDiv.style.display = 'none';
            }
        }
    }

    goToProductPage(productId) {
        const productPage = new SoftwareProductPage(this.parent, productId);
        productPage.render();
    }
    
    goToEditPage(productId) {
        const formPage = new SoftwareFormPage(this.parent, productId);
        formPage.render();
    }
    
    goToCreatePage() {
        const formPage = new SoftwareFormPage(this.parent);
        formPage.render();
    }

    async deleteProduct(productId) {
        console.log('Deleting product:', productId);
        try {
            const { status } = await fetchService.delete(apiUrls.deleteProduct(productId));
            console.log('DELETE response status:', status);
            if (status === 200 || status === 204) {
                console.log('Продукт успешно удален');
                this.allProducts = this.allProducts.filter(p => p.id !== productId);
                this.products = this.products.filter(p => p.id !== productId);
                this.renderProducts();
                this.updateSearchStats(document.getElementById('search-input')?.value || '');
            }
        } catch (error) {
            console.error('Ошибка удаления продукта:', error);
            this.loadProducts();
        }
    }

    renderProducts() {
        const container = document.getElementById('products-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (this.products.length === 0) {
            return;
        }
        
        this.products.forEach((product) => {
            const productCard = new SoftwareProductCardComponent(container);
            productCard.render(
                product, 
                (id) => this.goToProductPage(id),
                (id) => this.deleteProduct(id),
                (id) => this.goToEditPage(id)
            );
        });
    }

    setupEventListeners() {
        const searchInput = document.getElementById('search-input');
        let debounceTimer;
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    this.filterProducts(e.target.value);
                }, 300);
            });
        }
        
        const addButton = document.getElementById('add-card-btn');
        if (addButton) {
            addButton.addEventListener('click', () => {
                this.goToCreatePage();
            });
        }
    }

    goHome() {
        this.render();
    }

    render() {
        this.parent.innerHTML = '';
        
        this.header = new SoftwareHeaderComponent(this.parent);
        this.header.render(() => this.goHome());
        
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        this.loadProducts();
        this.setupEventListeners();
    }
}