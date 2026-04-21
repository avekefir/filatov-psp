export class SoftwareProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const isPalindrome = this.checkPalindrome(data.title);
        
        return `
            <div class="card mb-4 shadow-sm" style="border-radius: 12px; border: 2px solid rgba(140, 140, 140, 0.2); overflow: hidden;">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="${data.src}" class="img-fluid rounded-start" alt="${data.title}" style="height: 100%; object-fit: cover;">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body" style="background: #ffffff;">
                            ${isPalindrome ? '<span style="background: #7cbd97; color: #1a3a2a; padding: 5px 12px; border-radius: 8px; display: inline-block; margin-bottom: 15px; font-weight: bold;">🎯 Название-палиндром</span>' : ''}
                            <h3 class="card-title" style="color: #1a3a2a; font-weight: bold;">${data.title}</h3>
                            <p class="card-text lead" style="color: #333; line-height: 1.6;">${data.text}</p>
                            
                            <div class="row mt-4">
                                <div class="col-md-6">
                                    <div style="background: #f0f8f4; border-radius: 8px; padding: 15px;">
                                        <strong style="color: #1a3a2a;">Категории:</strong><br>
                                        ${this.renderCategories(data.categories)}
                                        <hr style="margin: 10px 0; border-color: rgba(140, 140, 140, 0.2);">
                                        <strong style="color: #1a3a2a;">Функция ConcatArrays():</strong><br>
                                        <span style="background: #7cbd97; color: #1a3a2a; padding: 5px 12px; border-radius: 8px; display: inline-block; margin-top: 5px; font-family: monospace;">
                                            ${this.concatCategories(data.categories)}
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div style="background: ${isPalindrome ? '#b5e6cd' : '#f0f0f0'}; border-radius: 8px; padding: 15px;">
                                        <strong style="color: #1a3a2a;">Функция IsPalindrome():</strong><br>
                                        <span style="font-size: 1.1rem; font-weight: bold;">"${data.title}"</span><br>
                                        ${isPalindrome ? 
                                            '<span style="background: #7cbd97; color: #1a3a2a; padding: 5px 12px; border-radius: 8px; display: inline-block; margin-top: 10px; font-weight: bold;">✅ Является палиндромом!</span>' : 
                                            '<span style="background: #d0d0d0; color: #666; padding: 5px 12px; border-radius: 8px; display: inline-block; margin-top: 10px;">❌ Не является палиндромом</span>'
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderCategories(categories) {
        if (!categories || categories.length === 0) {
            return '<span style="color: #666;">Нет категорий</span>';
        }
        return categories.map(cat => `<span style="background: #b5e6cd; color: #1a3a2a; padding: 4px 10px; border-radius: 8px; font-size: 0.8rem; margin: 2px; display: inline-block;">${cat}</span>`).join('');
    }
    
    concatCategories(categories) {
        if (!categories || categories.length === 0) return '—';
        return categories.join(' ');
    }
    
    checkPalindrome(title) {
        const cleaned = String(title).toLowerCase().replace(/\s/g, '');
        return cleaned === cleaned.split('').reverse().join('');
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}