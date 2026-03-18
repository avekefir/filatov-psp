import { SoftwareAccordionItemComponent } from "../software_accordion-item/software.js";

export class SoftwareAccordionComponent {
    constructor(parent) {
        this.parent = parent;
        this.accordionId = `accordion-${Date.now()}`;
        this.contentContainers = []; 
    }

    getHTML() {
        return (
            `
                <div class="accordion" id="${this.accordionId}"></div>
            `
        );
    }

    render(data) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const accordionRoot = document.getElementById(this.accordionId);
        
        data.forEach((item, index) => {
            const isFirst = index === 0;
            const accordionItem = new SoftwareAccordionItemComponent(accordionRoot);
            const contentId = accordionItem.render(item, isFirst, this.accordionId);
            this.contentContainers.push({
                id: item.id,
                containerId: contentId
            });
        });
        
        return this.contentContainers;
    }
}