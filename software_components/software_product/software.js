export class SoftwareProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card mb-4 shadow-sm" style="border-radius: 12px; border: 2px solid rgba(140, 140, 140, 0.2); overflow: hidden;">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="${data.src}" class="img-fluid rounded-start" alt="${data.title}" style="height: 100%; object-fit: cover;">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body" style="background: #ffffff;">
                            <h3 class="card-title" style="color: #1a3a2a; font-weight: bold;">${data.title}</h3>
                            <p class="card-text lead" style="color: #333; line-height: 1.6;">${data.text}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}