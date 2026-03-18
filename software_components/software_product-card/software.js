export class SoftwareProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="card m-2" style="width: 300px;" data-id="${data.id}">
                    <img src="${data.src}" class="card-img-top" alt="картинка" data-id="${data.id}">
                    <div class="card-body" data-id="${data.id}">
                        <h5 class="card-title" data-id="${data.id}">${data.title}</h5>
                        <p class="card-text" data-id="${data.id}">${data.text}</p>
                        <button class="btn btn-primary" data-id="${data.id}">Подробнее</button>
                    </div>
                </div>
            `
        );
    }
    
    addListeners(data, listener) {
        const card = this.parent.lastElementChild;
        if (card) {
            card.addEventListener('click', listener);
        }
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}