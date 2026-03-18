export class SoftwareAccordionItemComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data, isFirst = false, accordionId = 'main-accordion') {
        const collapseId = `collapse-${data.id}`;
        const headingId = `heading-${data.id}`;
        const contentId = `accordion-content-${data.id}`;
        
        return (
            `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="${headingId}">
                        <button class="accordion-button ${!isFirst ? 'collapsed' : ''}" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#${collapseId}" 
                                aria-expanded="${isFirst ? 'true' : 'false'}" 
                                aria-controls="${collapseId}">
                            ${data.title}
                        </button>
                    </h2>
                    <div id="${collapseId}" 
                         class="accordion-collapse collapse ${isFirst ? 'show' : ''}" 
                         aria-labelledby="${headingId}" 
                         data-bs-parent="#${accordionId}">
                        <div class="accordion-body">
                            <div id="${contentId}" class="d-flex justify-content-center"></div>
                        </div>
                    </div>
                </div>
            `
        );
    }

    render(data, isFirst = false, accordionId = 'main-accordion') {
        const html = this.getHTML(data, isFirst, accordionId);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        return `accordion-content-${data.id}`;
    }
}