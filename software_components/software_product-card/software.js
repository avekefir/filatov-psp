export class SoftwareProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="col-md-4 mb-4" data-card-id="${data.id}">
                <div class="card product-card h-100 shadow-sm" data-id="${data.id}" style="position: relative; border-radius: 12px; border: 2px solid rgba(140, 140, 140, 0.2); cursor: pointer;">
                    <button class="delete-card-btn" data-id="${data.id}" style="position: absolute; top: 10px; right: 10px; background: #dc3545; color: white; border: none; border-radius: 8px; width: 30px; height: 30px; font-size: 18px; font-weight: bold; cursor: pointer; z-index: 20; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                        ×
                    </button>
                    <img src="${data.src}" class="card-img-top" alt="${data.title}" style="height: 200px; object-fit: cover; border-radius: 10px 10px 0 0;">
                    <div class="card-body" style="background: #ffffff;">
                        <h5 class="card-title" style="color: #1a3a2a; font-weight: bold;">${data.title}</h5>
                        <p class="card-text text-muted" style="margin-bottom: 15px;">${data.text}</p>
                        
                        <button class="btn w-100 mt-2 edit-card-btn" data-id="${data.id}" style="background: #62a17d; color: #1a3a2a; border: none; padding: 10px; border-radius: 8px; font-weight: bold; transition: all 0.2s; margin-bottom: 8px;">
                            Редактировать
                        </button>
                        
                        <button class="btn w-100 mt-2" data-id="${data.id}" style="background: #a8e0c0; color: #1a3a2a; border: none; padding: 10px; border-radius: 8px; font-weight: bold; transition: all 0.2s;">
                            Подробнее
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    addListeners(data, listener, deleteListener, editListener) {
        const cardElement = this.parent.lastElementChild;
        if (cardElement) {
            const button = cardElement.querySelector('.btn:not(.edit-card-btn)');
            if (button) {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    listener(data.id);
                });
            }
            
            const editBtn = cardElement.querySelector('.edit-card-btn');
            if (editBtn) {
                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    editListener(data.id);
                });
            }
            
            const deleteBtn = cardElement.querySelector('.delete-card-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteListener(data.id);
                });
            }
            
            cardElement.addEventListener('click', (e) => {
                if (!e.target.classList.contains('btn') && !e.target.classList.contains('delete-card-btn') && !e.target.classList.contains('edit-card-btn')) {
                    listener(data.id);
                }
            });
        }
    }

    render(data, listener, deleteListener, editListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener, deleteListener, editListener);
    }
}