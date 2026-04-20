import { SoftwareProductCardComponent } from "../../software_components/software_product-card/software.js";
import { SoftwareProductPage } from "../software_product/software.js";
import { SoftwareHeaderComponent } from "../../software_components/software_header/software.js";
import { SoftwareFormPage } from "../software_form/software.js";
import { ajax } from "../../software_modules/software_ajax.js";
import { apiUrls } from "../../software_modules/software_apiUrls.js";

export class SoftwareMainPage {
    constructor(parent) {
        this.parent = parent;
        this.header = null;
        this.products = [];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }
       
    getHTML() {
        return `
            <div id="main-page">
                <div class="container">
                    <!-- Панель управления -->
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
                    
                    <!-- Контейнер с карточками -->
                    <div class="row" id="products-container"></div>
                    
                    <!-- Сообщение если ничего не найдено -->
                    <div id="no-results" class="text-center py-5" style="display: none;">
                        <p style="color: #999; font-size: 1.2rem;">Ничего не найдено по вашему запросу</p>
                    </div>
                </div>
            </div>
        `;
    }

    loadProducts(searchTerm = '') {
        const url = searchTerm ? `${apiUrls.getProducts()}?title_like=${encodeURIComponent(searchTerm)}` : apiUrls.getProducts();
        ajax.get(url, (data, status) => {
            if (status === 200 && data) {
                this.products = data;
                this.renderProducts();
                this.updateSearchStats(searchTerm);
            } else {
                console.error('Ошибка загрузки продуктов:', status);
            }
        });
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

    deleteProduct(productId) {
        ajax.delete(apiUrls.deleteProduct(productId), (data, status) => {
            if (status === 200) {
                this.loadProducts();
            } else {
                console.error('Ошибка удаления продукта:', status);
                alert('Ошибка при удалении');
            }
        });
    }

    filterProducts(searchTerm) {
        this.loadProducts(searchTerm);
    }

    updateSearchStats(searchTerm) {
        const statsDiv = document.getElementById('search-stats');
        const noResultsDiv = document.getElementById('no-results');
        
        if (statsDiv) {
            if (searchTerm && searchTerm.trim() !== '') {
                statsDiv.innerHTML = `Найдено: ${this.products.length} программ(ы)`;
            } else {
                statsDiv.innerHTML = `Всего программ: ${this.products.length}`;
            }
        }
        
        if (noResultsDiv) {
            if (this.products.length === 0) {
                noResultsDiv.style.display = 'block';
            } else {
                noResultsDiv.style.display = 'none';
            }
        }
    }

    renderProducts() {
        const container = document.getElementById('products-container');
        if (!container) return;
        
        container.innerHTML = '';
        
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