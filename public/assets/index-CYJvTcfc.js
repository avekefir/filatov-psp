(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();class f{constructor(t){this.parent=t}getHTML(t){return`
            <div class="col-md-4 mb-4" data-card-id="${t.id}">
                <div class="card product-card h-100 shadow-sm" data-id="${t.id}" style="position: relative; border-radius: 12px; border: 2px solid rgba(140, 140, 140, 0.2); cursor: pointer;">
                    <button class="delete-card-btn" data-id="${t.id}" style="position: absolute; top: 10px; right: 10px; background: #dc3545; color: white; border: none; border-radius: 8px; width: 30px; height: 30px; font-size: 18px; font-weight: bold; cursor: pointer; z-index: 20; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                        ×
                    </button>
                    <img src="${t.src}" class="card-img-top" alt="${t.title}" style="height: 200px; object-fit: cover; border-radius: 10px 10px 0 0;">
                    <div class="card-body" style="background: #ffffff;">
                        <h5 class="card-title" style="color: #1a3a2a; font-weight: bold;">${t.title}</h5>
                        <p class="card-text text-muted" style="margin-bottom: 15px;">${t.text}</p>
                        
                        <button class="btn w-100 mt-2 edit-card-btn" data-id="${t.id}" style="background: #62a17d; color: #1a3a2a; border: none; padding: 10px; border-radius: 8px; font-weight: bold; transition: all 0.2s; margin-bottom: 8px;">
                            Редактировать
                        </button>
                        
                        <button class="btn w-100 mt-2" data-id="${t.id}" style="background: #a8e0c0; color: #1a3a2a; border: none; padding: 10px; border-radius: 8px; font-weight: bold; transition: all 0.2s;">
                            Подробнее
                        </button>
                    </div>
                </div>
            </div>
        `}addListeners(t,e,r,s){const o=this.parent.lastElementChild;if(o){const d=o.querySelector(".btn:not(.edit-card-btn)");d&&d.addEventListener("click",i=>{i.stopPropagation(),e(t.id)});const l=o.querySelector(".edit-card-btn");l&&l.addEventListener("click",i=>{i.stopPropagation(),s(t.id)});const u=o.querySelector(".delete-card-btn");u&&u.addEventListener("click",i=>{i.stopPropagation(),r(t.id)}),o.addEventListener("click",i=>{!i.target.classList.contains("btn")&&!i.target.classList.contains("delete-card-btn")&&!i.target.classList.contains("edit-card-btn")&&e(t.id)})}}render(t,e,r,s){const o=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",o),this.addListeners(t,e,r,s)}}class m{constructor(t){this.parent=t}getHTML(t){return`
            <div class="card mb-4 shadow-sm" style="border-radius: 12px; border: 2px solid rgba(140, 140, 140, 0.2); overflow: hidden;">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="${t.src}" class="img-fluid rounded-start" alt="${t.title}" style="height: 100%; object-fit: cover;">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body" style="background: #ffffff;">
                            <h3 class="card-title" style="color: #1a3a2a; font-weight: bold;">${t.title}</h3>
                            <p class="card-text lead" style="color: #333; line-height: 1.6;">${t.text}</p>
                        </div>
                    </div>
                </div>
            </div>
        `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e)}}class p{constructor(t){this.parent=t}getHTML(){return`
            <nav style="background: #a8e0c0; padding: 15px 0; margin-bottom: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <div class="container">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <a href="#" id="home-link" style="text-decoration: none; color: #1a3a2a; font-size: 1.5rem; font-weight: bold; cursor: pointer;">
                            Серверное программное обеспечение
                        </a>
                    </div>
                </div>
            </nav>
        `}addListeners(t){const e=document.getElementById("home-link");e&&e.addEventListener("click",r=>{r.preventDefault(),t()})}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("afterbegin",e),this.addListeners(t)}}class b{async get(t){try{const e=await fetch(t);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return{data:await e.json(),status:e.status}}catch(e){throw console.error("GET request failed:",e),e}}async post(t,e){try{const r=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return{data:r.status!==204?await r.json():null,status:r.status}}catch(r){throw console.error("POST request failed:",r),r}}async put(t,e){try{const r=await fetch(t,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return{data:r.status!==204?await r.json():null,status:r.status}}catch(r){throw console.error("PUT request failed:",r),r}}async delete(t){try{const e=await fetch(t,{method:"DELETE"});return{data:e.status!==204?await e.json():null,status:e.status}}catch(e){throw console.error("DELETE request failed:",e),e}}}const a=new b;class y{constructor(){this.baseUrl="http://localhost:3000"}getProducts(){return`${this.baseUrl}/software_stocks`}getProductById(t){return`${this.baseUrl}/software_stocks/${t}`}createProduct(){return`${this.baseUrl}/software_stocks`}updateProduct(t){return`${this.baseUrl}/software_stocks/${t}`}deleteProduct(t){return`${this.baseUrl}/software_stocks/${t}`}}const c=new y;class v{constructor(t,e){this.parent=t,this.id=e,this.product=null}async getData(){console.log("Loading product with id:",this.id);try{const{data:t,status:e}=await a.get(c.getProductById(this.id));console.log("GET product response:",{status:e,data:t}),e===200&&t&&(this.product=t,this.renderProduct())}catch(t){console.error("Ошибка загрузки продукта:",t),this.showNotFound()}}showNotFound(){const t=document.getElementById("product-container");if(t){t.innerHTML=`
                <div class="alert alert-danger" style="border-radius: 12px;">
                    <h4>Продукт не найден</h4>
                    <p>Продукт с ID ${this.id} не существует или был удален.</p>
                    <button id="back-to-home" class="btn" style="background: #7cbd97; color: #1a3a2a;">Вернуться на главную</button>
                </div>
            `;const e=document.getElementById("back-to-home");e&&e.addEventListener("click",()=>this.goHome())}}renderProduct(){const t=document.getElementById("product-container");t&&this.product&&new m(t).render(this.product)}get pageRoot(){return document.getElementById("product-page")}getHTML(){return`
            <div id="product-page">
                <div class="container">
                    <div id="product-container"></div>
                </div>
            </div>
        `}goHome(){new h(this.parent).render()}render(){this.parent.innerHTML="",new p(this.parent).render(()=>this.goHome());const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.getData()}}class w{constructor(t){this.parent=t,this.isEditMode=!1,this.editId=null}getHTML(t=null){const e=t?t.title:"",r=t?t.text:"",s=t?t.src:"",o=this.isEditMode;return`
            <div class="card shadow-sm" style="border-radius: 12px; border: 2px solid rgba(140, 140, 140, 0.2); overflow: hidden;">
                <div class="card-header" style="background: #a8e0c0; padding: 15px;">
                    <h4 class="mb-0" style="color: #1a3a2a;">${o?"Редактирование программы":"Добавление новой программы"}</h4>
                </div>
                <div class="card-body" style="background: #ffffff;">
                    <form id="product-form">
                        <div class="mb-3">
                            <label for="product-title" class="form-label" style="color: #1a3a2a; font-weight: bold;">Название</label>
                            <input type="text" class="form-control" id="product-title" value="${this.escapeHtml(e)}" required style="border-radius: 8px; border: 2px solid #a8e0c0;">
                        </div>
                        <div class="mb-3">
                            <label for="product-text" class="form-label" style="color: #1a3a2a; font-weight: bold;">Описание</label>
                            <textarea class="form-control" id="product-text" rows="5" required style="border-radius: 8px; border: 2px solid #a8e0c0;">${this.escapeHtml(r)}</textarea>
                        </div>
                        <div class="mb-3">
                            <label for="product-src" class="form-label" style="color: #1a3a2a; font-weight: bold;">URL изображения</label>
                            <input type="url" class="form-control" id="product-src" value="${this.escapeHtml(s)}" required style="border-radius: 8px; border: 2px solid #a8e0c0;">
                        </div>
                        <div class="d-flex gap-2">
                            <button type="submit" class="btn" style="background: #7cbd97; color: #1a3a2a; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold;">
                                ${o?"Сохранить изменения":"Создать"}
                            </button>
                            <button type="button" id="cancel-form-btn" class="btn" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold;">
                                Отмена
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `}escapeHtml(t){return t?t.replace(/[&<>]/g,function(e){return e==="&"?"&amp;":e==="<"?"&lt;":e===">"?"&gt;":e}).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,function(e){return e}):""}addListeners(t,e){const r=document.getElementById("product-form");r&&r.addEventListener("submit",o=>{o.preventDefault();const d=document.getElementById("product-title").value,l=document.getElementById("product-text").value,u=document.getElementById("product-src").value;t({title:d,text:l,src:u})});const s=document.getElementById("cancel-form-btn");s&&s.addEventListener("click",e)}render(t=null,e,r,s=!1){this.isEditMode=s,this.editId=t?t.id:null;const o=this.getHTML(t);this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",o),this.addListeners(e,r)}}class g{constructor(t,e=null){this.parent=t,this.id=e,this.product=null}async loadProduct(){if(this.id)try{const{data:t,status:e}=await a.get(c.getProductById(this.id));console.log("GET product for edit:",{status:e,data:t}),e===200&&t&&(this.product=t,this.renderForm())}catch(t){console.error("Ошибка загрузки продукта для редактирования:",t),this.goHome()}else this.renderForm()}async handleSubmit(t){if(console.log("Submitting form:",{id:this.id,formData:t}),this.id)try{const{status:e}=await a.put(c.updateProduct(this.id),t);console.log("PUT response status:",e),e===200&&this.goHome()}catch(e){console.error("Ошибка обновления:",e)}else try{const{status:e}=await a.post(c.createProduct(),t);console.log("POST response status:",e),(e===201||e===200)&&this.goHome()}catch(e){console.error("Ошибка создания:",e)}}renderForm(){const t=document.getElementById("form-container");t&&new w(t).render(this.product,r=>this.handleSubmit(r),()=>this.goHome(),!!this.id)}get pageRoot(){return document.getElementById("form-page")}getHTML(){return`
            <div id="form-page">
                <div class="container">
                    <div id="form-container"></div>
                </div>
            </div>
        `}goHome(){new h(this.parent).render()}render(){this.parent.innerHTML="",new p(this.parent).render(()=>this.goHome());const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.loadProduct()}}class h{constructor(t){this.parent=t,this.header=null,this.products=[],this.allProducts=[]}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
            <div id="main-page">
                <div class="container">
                    <div class="row mb-4">
                        <div class="col-md-12">
                            <div style="background: #f0f8f4; border-radius: 12px; padding: 15px; border: 2px solid rgba(140, 140, 140, 0.2);">
                                <div class="row align-items-center">
                                    <div class="col-md-8">
                                        <input type="text" id="search-input" class="form-control" placeholder="Поиск по названию..." style="border-radius: 8px; border: 2px solid #a8e0c0;">
                                    </div>
                                    <div class="col-md-4">
                                        <button id="add-card-btn" class="btn w-100" style="background: #7cbd97; color: #1a3a2a; border: none; padding: 8px; border-radius: 8px; font-weight: bold;">
                                            + Добавить программу
                                        </button>
                                    </div>
                                </div>
                                <div class="mt-2" id="search-stats" style="font-size: 0.85rem; color: #1a3a2a;"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row" id="products-container"></div>
                    
                    <div id="no-results" class="text-center py-5" style="display: none;">
                        <p style="color: #999; font-size: 1.2rem;">Ничего не найдено по вашему запросу</p>
                    </div>
                </div>
            </div>
        `}async loadProducts(){try{const{data:t,status:e}=await a.get(c.getProducts());console.log("GET products response:",{status:e,data:t}),e===200&&t&&(this.allProducts=t,this.products=[...t],this.renderProducts(),this.updateSearchStats(""))}catch(t){console.error("Ошибка загрузки продуктов:",t),this.allProducts=[],this.products=[],this.renderProducts(),this.updateSearchStats("")}}filterProducts(t){if(!t||t.trim()==="")this.products=[...this.allProducts];else{const e=t.toLowerCase().trim();this.products=this.allProducts.filter(r=>r.title&&r.title.toLowerCase().includes(e))}this.renderProducts(),this.updateSearchStats(t)}updateSearchStats(t){const e=document.getElementById("search-stats"),r=document.getElementById("no-results");e&&(t&&t.trim()!==""?e.innerHTML=`🔍 Найдено: ${this.products.length} из ${this.allProducts.length}`:e.innerHTML=`📋 Всего программ: ${this.allProducts.length}`),r&&(this.products.length===0&&this.allProducts.length>0?r.style.display="block":r.style.display="none")}goToProductPage(t){new v(this.parent,t).render()}goToEditPage(t){new g(this.parent,t).render()}goToCreatePage(){new g(this.parent).render()}async deleteProduct(t){var e;console.log("Deleting product:",t);try{const{status:r}=await a.delete(c.deleteProduct(t));console.log("DELETE response status:",r),(r===200||r===204)&&(console.log("Продукт успешно удален"),this.allProducts=this.allProducts.filter(s=>s.id!==t),this.products=this.products.filter(s=>s.id!==t),this.renderProducts(),this.updateSearchStats(((e=document.getElementById("search-input"))==null?void 0:e.value)||""))}catch(r){console.error("Ошибка удаления продукта:",r),this.loadProducts()}}renderProducts(){const t=document.getElementById("products-container");t&&(t.innerHTML="",this.products.length!==0&&this.products.forEach(e=>{new f(t).render(e,s=>this.goToProductPage(s),s=>this.deleteProduct(s),s=>this.goToEditPage(s))}))}setupEventListeners(){const t=document.getElementById("search-input");let e;t&&t.addEventListener("input",s=>{clearTimeout(e),e=setTimeout(()=>{this.filterProducts(s.target.value)},300)});const r=document.getElementById("add-card-btn");r&&r.addEventListener("click",()=>{this.goToCreatePage()})}goHome(){this.render()}render(){this.parent.innerHTML="",this.header=new p(this.parent),this.header.render(()=>this.goHome());const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.loadProducts(),this.setupEventListeners()}}const P=document.getElementById("root"),x=new h(P);x.render();
