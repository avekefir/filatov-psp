import { SoftwareProductCardComponent } from "../../software_components/software_product-card/software.js";
import { SoftwaresoftwarePage } from "../software_product/software.js";
import { SoftwareAccordionComponent } from "../../software_components/software_accordion/software.js";

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
                </div>
            `
        )
    }
    
    clickCard(e) {
        const cardId = e.target.closest('.card').dataset.id;
        const softwarePage = new SoftwaresoftwarePage(this.parent, cardId)
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
                text: "Текстовый редактор"
            },
            {
                id: 2,
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/960px-Postgresql_elephant.svg.png",
                title: "PostgreSQL",
                text: "СУБД"
            },
            {
                id: 3,
                src: "https://rskrf.ru/upload/iblock/e6c/3pughvx5iu7dzqo6adwlwxe3a38q7xc6.png",
                title: "Телемост",
                text: "Звонки и видеовстречи"
            },
        ]
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
        this.setupButtons();
    }
}