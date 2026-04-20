export class SoftwareFormComponent {
    constructor(parent) {
        this.parent = parent;
        this.isEditMode = false;
        this.editId = null;
    }

    getHTML(data = null) {
        const title = data ? data.title : '';
        const text = data ? data.text : '';
        const src = data ? data.src : '';
        const isEdit = this.isEditMode;
        
        return `
            <div class="card shadow-sm" style="border-radius: 12px; border: 2px solid rgba(140, 140, 140, 0.2); overflow: hidden;">
                <div class="card-header" style="background: #a8e0c0; padding: 15px;">
                    <h4 class="mb-0" style="color: #1a3a2a;">${isEdit ? '✏️ Редактирование программы' : '➕ Добавление новой программы'}</h4>
                </div>
                <div class="card-body" style="background: #ffffff;">
                    <form id="product-form">
                        <div class="mb-3">
                            <label for="product-title" class="form-label" style="color: #1a3a2a; font-weight: bold;">Название</label>
                            <input type="text" class="form-control" id="product-title" value="${this.escapeHtml(title)}" required style="border-radius: 8px; border: 2px solid #a8e0c0;">
                        </div>
                        <div class="mb-3">
                            <label for="product-text" class="form-label" style="color: #1a3a2a; font-weight: bold;">Описание</label>
                            <textarea class="form-control" id="product-text" rows="5" required style="border-radius: 8px; border: 2px solid #a8e0c0;">${this.escapeHtml(text)}</textarea>
                        </div>
                        <div class="mb-3">
                            <label for="product-src" class="form-label" style="color: #1a3a2a; font-weight: bold;">URL изображения</label>
                            <input type="url" class="form-control" id="product-src" value="${this.escapeHtml(src)}" required style="border-radius: 8px; border: 2px solid #a8e0c0;">
                        </div>
                        <div class="d-flex gap-2">
                            <button type="submit" class="btn" style="background: #7cbd97; color: #1a3a2a; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold;">
                                ${isEdit ? '💾 Сохранить изменения' : '✅ Создать'}
                            </button>
                            <button type="button" id="cancel-form-btn" class="btn" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold;">
                                ❌ Отмена
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }
    
    escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
            return c;
        });
    }
    
    addListeners(submitListener, cancelListener) {
        const form = document.getElementById('product-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const title = document.getElementById('product-title').value;
                const text = document.getElementById('product-text').value;
                const src = document.getElementById('product-src').value;
                submitListener({ title, text, src });
            });
        }
        
        const cancelBtn = document.getElementById('cancel-form-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', cancelListener);
        }
    }

    render(data = null, submitListener, cancelListener, isEditMode = false) {
        this.isEditMode = isEditMode;
        this.editId = data ? data.id : null;
        const html = this.getHTML(data);
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(submitListener, cancelListener);
    }
}