import { SoftwareProductCardComponent } from "../../software_components/software_product-card/software.js";
import { SoftwareProductPage } from "../software_product/software.js";
import { SoftwareHeaderComponent } from "../../software_components/software_header/software.js";

export class SoftwareMainPage {
    constructor(parent) {
        this.parent = parent;
        this.header = null;
        this.products = [];
        this.filteredProducts = [];
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
                                            + Добавить карточку
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

    getInitialSoftwareData() {
        return [
            {
                id: 1,
                src: "https://developer.asustor.com/uploadIcons/0020_999_1725444614_apache_256.png",
                title: "Apache HTTP Server",
                text: "Веб-сервер с открытым исходным кодом, обрабатывающий HTTP-запросы"
            },
            {
                id: 2,
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/960px-Postgresql_elephant.svg.png",
                title: "PostgreSQL",
                text: "Объектно-реляционная СУБД для хранения и сложных запросов к данным"
            },
            {
                id: 3,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ4UMCnzkph-fMmiiTeEz3An85NPMNOnJJCw&s",
                title: "Postfix",
                text: "Сервер пересылки почты (MTA), маршрутизирует email-сообщения"
            },
            {
                id: 4,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfeXbqbEPXJ8MzbFPMHmi6ZQng9F8ibWeQFA&s",
                title: "Nginx",
                text: "Высокопроизводительный веб-сервер и обратный прокси"
            },
            {
                id: 5,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJFQPzAf6HbTfeDEaeLns1SZF21ADThtgkVQ&s",
                title: "MySQL",
                text: "Популярная система управления реляционными базами данных"
            },
            {
                id: 6,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHkzcshTYAlDvn3fmpzQvKiNa1FF4yZSh0-A&s",
                title: "Microsoft Exchange",
                text: "Платформа для корпоративной почты, календарей и контактов"
            }
        ];
    }

    loadProducts() {
        if (this.products.length === 0) {
            this.products = this.getInitialSoftwareData();
        }
        this.filteredProducts = [...this.products];
    }

    goToProductPage(productId) {
        const productPage = new SoftwareProductPage(this.parent, productId, this.products);
        productPage.render();
    }

    deleteProduct(productId) {
        const index = this.products.findIndex(p => p.id === productId);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.filterProducts(document.getElementById('search-input')?.value || '');
            this.renderProducts();
        }
    }

    addProduct() {
        if (this.products.length === 0) return;
        
        const firstProduct = this.products[0];
        const newId = Math.max(...this.products.map(p => p.id), 0) + 1;
        
        const newProduct = {
            ...firstProduct,
            id: newId,
            title: `${firstProduct.title} (копия)`,
            text: firstProduct.text
        };
        
        this.products.push(newProduct);
        this.filterProducts(document.getElementById('search-input')?.value || '');
        this.renderProducts();
    }

    filterProducts(searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            this.filteredProducts = [...this.products];
        } else {
            const term = searchTerm.toLowerCase().trim();
            this.filteredProducts = this.products.filter(product => 
                product.title.toLowerCase().includes(term)
            );
        }
        this.updateSearchStats(searchTerm);
        this.renderProducts();
    }

    updateSearchStats(searchTerm) {
        const statsDiv = document.getElementById('search-stats');
        const noResultsDiv = document.getElementById('no-results');
        
        if (statsDiv) {
            if (searchTerm && searchTerm.trim() !== '') {
                statsDiv.innerHTML = `Найдено: ${this.filteredProducts.length} из ${this.products.length}`;
            } else {
                statsDiv.innerHTML = ``;
            }
        }
        
        if (noResultsDiv) {
            if (this.filteredProducts.length === 0 && this.products.length > 0) {
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
        
        this.filteredProducts.forEach((product, index) => {
            const productCard = new SoftwareProductCardComponent(container);
            productCard.render(
                product, 
                index, 
                (id) => this.goToProductPage(id),
                (id) => this.deleteProduct(id)
            );
        });
    }

    setupEventListeners() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterProducts(e.target.value);
            });
        }
        
        const addButton = document.getElementById('add-card-btn');
        if (addButton) {
            addButton.addEventListener('click', () => {
                this.addProduct();
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
        this.renderProducts();
        this.setupEventListeners();
    }
}