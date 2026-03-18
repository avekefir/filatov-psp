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

    addItem(itemData, index = -1) {
        const accordionRoot = document.getElementById(this.accordionId);
        const isFirst = accordionRoot.children.length === 0;
        
        const accordionItem = new SoftwareAccordionItemComponent(accordionRoot);
        const contentId = accordionItem.render(itemData, isFirst, this.accordionId);
        
        const containerInfo = {
            id: itemData.id,
            containerId: contentId
        };
        
        if (index === -1 || index >= this.contentContainers.length) {
            this.contentContainers.push(containerInfo);
        } else {
            this.contentContainers.splice(index, 0, containerInfo);
        }
        
        return containerInfo;
    }

    removeItemById(itemId) {
        const itemElement = document.getElementById(`accordion-item-${itemId}`);
        if (itemElement) {
            itemElement.remove();
            
            const index = this.contentContainers.findIndex(c => c.id === itemId);
            if (index !== -1) {
                this.contentContainers.splice(index, 1);
            }
            
            return true;
        }
        return false;
    }

    removeLastItem() {
        if (this.contentContainers.length > 0) {
            const lastItem = this.contentContainers[this.contentContainers.length - 1];
            return this.removeItemById(lastItem.id);
        }
        return false;
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