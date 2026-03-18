import { SoftwareProductCardComponent } from "../../software_components/software_product-card/software.js";
import { SoftwareProductPage } from "../software_product/software.js";
import { SoftwareAccordionComponent } from "../../software_components/software_accordion/software.js";

export class SoftwareMainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }
       
    getHTML() {
        return (
            `
                <div class="container">
                    <div id="main-accordion-container"></div>
                </div>
            `
        )
    }
    
    clickCard(e) {
        const cardId = e.target.dataset.id
        const productPage = new SoftwareProductPage(this.parent, cardId)
        productPage.render()
    }
    
    getAccordionData() {
        const products = this.getSoftwareData();
        return products.map(product => ({
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
        
    renderProductsInAccordion(containers) {
        const softwareData = this.getSoftwareData(); 
        
        softwareData.forEach(product => {
            const container = containers.find(c => c.id === product.id);
            if (container) {
                const productContainer = document.getElementById(container.containerId);
                const softwareProductCard = new SoftwareProductCardComponent(productContainer);
                softwareProductCard.render(product, this.clickCard.bind(this));
            }
        });
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const accordionContainer = document.getElementById('main-accordion-container');
        const accordionData = this.getAccordionData(); 
        
        const softwareAccordion = new SoftwareAccordionComponent(accordionContainer);
        const contentContainers = softwareAccordion.render(accordionData);
        
        this.renderProductsInAccordion(contentContainers);
    }
}