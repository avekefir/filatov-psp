export class SoftwareBackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        const backBtn = document.getElementById("back-button");
        if (backBtn) {
            backBtn.addEventListener("click", listener);
        }
    }

    getHTML() {
        return `
            <div class="mb-3">
                <button id="back-button" class="btn" type="button" style="background: #a8e0c0; color: #1a3a2a; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; transition: all 0.2s;">
                    ← Назад к списку
                </button>
            </div>
        `;
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}