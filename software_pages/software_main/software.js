import { SoftwareProductCardComponent } from "../../software_components/software_product-card/software.js";
import { SoftwareProductPage } from "../software_product/software.js";
import { SoftwareAccordionComponent } from "../../software_components/software_accordion/software.js";
import { ConcatArrays, IsPalindrome } from "../../homework/software.js";


export class SoftwareMainPage {
    constructor(parent) {
        this.parent = parent;
        this.softwareAccordion = null;
        this.contentContainers = [];
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }
       
    getHTML() {
        return (
            `
                <div class="container">
                    <div class="my-4 d-flex gap-2">
                        <button id="copy-first-btn" class="btn btn-success">Копировать первый элемент</button>
                        <button id="remove-last-btn" class="btn btn-danger">Удалить последний элемент</button>
                    </div>
                    <div id="main-accordion-container"></div>
                    
                    <!-- Блок с демонстрацией функций на данных ПО -->
                    <div class="mt-5 pt-4 border-top">
                        <h4 class="mb-3">Демонстрация функций</h4>
                        
                        <!-- Демонстрация ConcatArrays -->
                        <div class="card mb-4">
                            <div class="card-header">
                                <strong>Функция ConcatArrays</strong>
                            </div>
                            <div class="card-body">
                                <h5>Категории программ:</h5>
                                <div id="concat-demo-container" class="mb-3"></div>
                                <hr>
                                <div class="mt-3">
                                    <strong>Как это работает:</strong>
                                    <p class="text-muted small mt-1">
                                        Функция ConcatArrays объединяет все переданные массивы в одну строку, 
                                        заменяя запятые на пробелы.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Демонстрация IsPalindrome -->
                        <div class="card">
                            <div class="card-header">
                                <strong>Функция IsPalindrome</strong>
                            </div>
                            <div class="card-body">
                                <h5>Названия программ, которые являются палиндромами:</h5>
                                <div id="palindrome-demo-container" class="mb-3"></div>
                                <hr>
                                <div class="mt-3">
                                    <strong>Интерактивная проверка:</strong>
                                    <div class="input-group mt-2">
                                        <input type="text" id="custom-palindrome-input" class="form-control" placeholder="Введите текст для проверки...">
                                        <button id="custom-check-palindrome" class="btn btn-success">Проверить</button>
                                    </div>
                                    <div id="custom-palindrome-result" class="alert alert-info mt-2 d-none"></div>
                                    <p class="text-muted small mt-2">
                                        Функция IsPalindrome игнорирует пробелы и регистр при проверке.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        )
    }
    
    clickCard(e) {
        const cardId = e.target.closest('.card').dataset.id;
        const softwarePage = new SoftwareProductPage(this.parent, cardId)
        softwarePage.render()
    }
    
    getAccordionData() {
        const softwares = this.getSoftwareData();
        return softwares.map(product => ({
            id: product.id,
            title: product.title, 
            content: product.text  
        }));
    }

    getSoftwareData() {
        return [
            {
                id: 1,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYNGtQRIVpT5HGQHTBovxirUzbohLevSU9AQ&s",
                title: "Microsoft Word",
                text: "Текстовый редактор",
                categories: ["офисные", "текстовые редакторы", "microsoft"]
            },
            {
                id: 2,
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/960px-Postgresql_elephant.svg.png",
                title: "PostgreSQL",
                text: "СУБД",
                categories: ["базы данных", "sql", "open source", "серверное ПО"]
            },
            {
                id: 3,
                src: "https://rskrf.ru/upload/iblock/e6c/3pughvx5iu7dzqo6adwlwxe3a38q7xc6.png",
                title: "Телемост",
                text: "Звонки и видеовстречи",
                categories: ["видеосвязь", "конференции", "коммуникации", "российское ПО"]
            },
        ]
    }
    

    displayConcatArraysDemo() {
        const container = document.getElementById('concat-demo-container');
        if (!container) return;
        
        const softwares = this.getSoftwareData();
        
        const allCategories = [];
        softwares.forEach(software => {
            if (software.categories && software.categories.length > 0) {
                allCategories.push(...software.categories);
            }
        });
        
        const allCategoriesString = ConcatArrays(allCategories);
        
        let html = `
            <div class="alert alert-info">
                <strong>Все категории ПО:</strong><br>
                <span class="badge bg-primary p-2">${allCategoriesString}</span>
            </div>
            <div class="row">
        `;
        
        softwares.forEach(software => {
            if (software.categories && software.categories.length > 0) {
                const categoriesString = ConcatArrays(software.categories);
                html += `
                    <div class="col-md-4 mb-2">
                        <div class="card card-body bg-light">
                            <strong>${software.title}</strong>
                            <small class="text-muted">Категории: ${categoriesString}</small>
                        </div>
                    </div>
                `;
            }
        });
        
        html += `</div>`;
        container.innerHTML = html;
    }
    
    displayPalindromeDemo() {
        const container = document.getElementById('palindrome-demo-container');
        if (!container) return;
        
        const softwares = this.getSoftwareData();
        
        let html = '<div class="row">';
        let palindromeFound = false;
        
        softwares.forEach(software => {
            const isPalindrome = IsPalindrome(software.title);
            
            html += `
                <div class="col-md-4 mb-3">
                    <div class="card ${isPalindrome ? 'border-success' : 'border-secondary'}">
                        <div class="card-body text-center">
                            <h6 class="card-title">${software.title}</h6>
                            ${isPalindrome ? 
                                '<span class="badge bg-success">Палиндром</span>' : 
                                '<span class="badge bg-secondary">Не палиндром</span>'
                            }
                        </div>
                    </div>
                </div>
            `;
            
            if (isPalindrome) palindromeFound = true;
        });
        
        html += '</div>';
        
        
        container.innerHTML = html;
    }
    
    setupCustomPalindromeCheck() {
        const input = document.getElementById('custom-palindrome-input');
        const checkBtn = document.getElementById('custom-check-palindrome');
        const resultDiv = document.getElementById('custom-palindrome-result');
        
        if (input && checkBtn && resultDiv) {
            const checkText = () => {
                const text = input.value.trim();
                if (!text) {
                    return;
                }
                
                const isPalindrome = IsPalindrome(text);
                
                if (isPalindrome) {
                    resultDiv.textContent = `" ${text} " - является палиндромом`;
                    resultDiv.className = 'alert alert-success d-block';
                } else {
                    resultDiv.textContent = `" ${text} " - не является палиндромом.`;
                    resultDiv.className = 'alert alert-danger d-block';
                }
            };
            
            checkBtn.addEventListener('click', checkText);
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') checkText();
            });
        }
    }


    copyFirstElement() {
        const softwares = this.getSoftwareData();
        if (softwares.length === 0) return;
        const firstSoftware = softwares[0];
        const newId = Math.max(...softwares.map(p => p.id)) + 1;
        const newSoftware = {
            ...firstSoftware,
            id: newId,
            title: `${firstSoftware.title} (копия)`
        };
        softwares.push(newSoftware);
        const newAccordionItem = {
            id: newSoftware.id,
            title: newSoftware.title,
            content: newSoftware.text
        };
        const containerInfo = this.softwareAccordion.addItem(newAccordionItem);
        const productContainer = document.getElementById(containerInfo.containerId);
        const softwareProductCard = new SoftwareProductCardComponent(productContainer);
        softwareProductCard.render(newSoftware, this.clickCard.bind(this));
        this.setupDeleteButton(newSoftware.id);

        this.refreshDemos();
    }

    removeLastElement() {
        const softwares = this.getSoftwareData();
        if (softwares.length === 0) return;
        
        const lastSoftware = softwares[softwares.length - 1];
        const removed = this.softwareAccordion.removeLastItem();
        
        if (removed) {
            const index = softwares.findIndex(p => p.id === lastSoftware.id);
            if (index !== -1) {
                softwares.splice(index, 1);
            }
        }

        this.refreshDemos();
    }

    deleteAccordionItem(itemId) {
        const softwares = this.getSoftwareData();
        const productId = parseInt(itemId);
        const index = softwares.findIndex(p => p.id === productId);
        
        if (index !== -1) {
            const removed = this.softwareAccordion.removeItemById(productId);
            if (removed) {
                softwares.splice(index, 1);
                console.log(`Элемент с ID ${itemId} удален`);

                this.refreshDemos();
            }
        }
    }

    setupDeleteButton(itemId) {
        const deleteBtn = document.querySelector(`.delete-item-btn[data-item-id="${itemId}"]`);
        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.deleteAccordionItem(itemId);
            });
        }
    }

    refreshDemos() {
        this.displayConcatArraysDemo();
        this.displayPalindromeDemo();
    }
        
    rendersoftwaresInAccordion(containers) {
        const softwareData = this.getSoftwareData(); 
        softwareData.forEach(product => {
            const container = containers.find(c => c.id === product.id);
            if (container) {
                const productContainer = document.getElementById(container.containerId);
                const softwareProductCard = new SoftwareProductCardComponent(productContainer);
                softwareProductCard.render(product, this.clickCard.bind(this));
                this.setupDeleteButton(product.id);
            }
        });
    }

    setupButtons() {
        document.getElementById('copy-first-btn').addEventListener('click', () => {
            this.copyFirstElement();
        });
        
        document.getElementById('remove-last-btn').addEventListener('click', () => {
            this.removeLastElement();
        });

        const refreshConcatBtn = document.getElementById('refresh-concat-demo');
        if (refreshConcatBtn) {
            refreshConcatBtn.addEventListener('click', () => {
                this.displayConcatArraysDemo();
            });
        }
        
        const checkAllBtn = document.getElementById('check-all-palindromes');
        if (checkAllBtn) {
            checkAllBtn.addEventListener('click', () => {
                this.displayPalindromeDemo();
            });
        }
        
        this.setupCustomPalindromeCheck();
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const accordionContainer = document.getElementById('main-accordion-container');
        const accordionData = this.getAccordionData(); 
        
        this.softwareAccordion = new SoftwareAccordionComponent(accordionContainer);
        this.contentContainers = this.softwareAccordion.render(accordionData);
        
        this.rendersoftwaresInAccordion(this.contentContainers);
        
        this.displayConcatArraysDemo();
        this.displayPalindromeDemo();

        this.setupButtons();
    }
}