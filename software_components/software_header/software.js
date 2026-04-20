export class SoftwareHeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <nav style="background: #a8e0c0; padding: 15px 0; margin-bottom: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <div class="container">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <a href="#" id="home-link" style="text-decoration: none; color: #1a3a2a; font-size: 1.5rem; font-weight: bold; cursor: pointer;">
                            Серверное программное обеспечение
                        </a>
                    </div>
                </div>
            </nav>
        `;
    }

    addListeners(homeListener) {
        const homeLink = document.getElementById('home-link');
        if (homeLink) {
            homeLink.addEventListener('click', (e) => {
                e.preventDefault();
                homeListener();
            });
        }
    }

    render(homeListener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('afterbegin', html);
        this.addListeners(homeListener);
    }
}