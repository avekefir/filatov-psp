import { SoftwareFormComponent } from "../../software_components/software_form/software.js";
import { SoftwareMainPage } from "../software_main/software.js";
import { SoftwareHeaderComponent } from "../../software_components/software_header/software.js";
import { ajax } from "../../software_modules/software_ajax.js";
import { apiUrls } from "../../software_modules/software_apiUrls.js";

export class SoftwareFormPage {
    constructor(parent, id = null) {
        this.parent = parent;
        this.id = id;
        this.product = null;
    }

    loadProduct() {
        if (this.id) {
            ajax.get(apiUrls.getProductById(this.id), (data, status) => {
                if (status === 200 && data) {
                    this.product = data;
                    this.renderForm();
                } else {
                    console.error('Ошибка загрузки продукта для редактирования:', status);
                    this.goHome();
                }
            });
        } else {
            this.renderForm();
        }
    }
    
    handleSubmit(formData) {
        if (this.id) {
            // Редактирование существующего продукта
            ajax.put(apiUrls.updateProduct(this.id), formData, (data, status) => {
                if (status === 200) {
                    this.goHome();
                } else {
                    console.error('Ошибка обновления:', status);
                    alert('Ошибка при обновлении программы');
                }
            });
        } else {
            // Создание нового продукта
            ajax.post(apiUrls.createProduct(), formData, (data, status) => {
                if (status === 201) {
                    this.goHome();
                } else {
                    console.error('Ошибка создания:', status);
                    alert('Ошибка при создании программы');
                }
            });
        }
    }
    
    renderForm() {
        const formContainer = document.getElementById('form-container');
        if (formContainer) {
            const form = new SoftwareFormComponent(formContainer);
            form.render(
                this.product,
                (data) => this.handleSubmit(data),
                () => this.goHome(),
                !!this.id
            );
        }
    }
    
    get pageRoot() {
        return document.getElementById('form-page');
    }
    
    getHTML() {
        return `
            <div id="form-page">
                <div class="container">
                    <div id="form-container"></div>
                </div>
            </div>
        `;
    }
    
    goHome() {
        const softwareMainPage = new SoftwareMainPage(this.parent);
        softwareMainPage.render();
    }
    
    render() {
        this.parent.innerHTML = '';
        
        const header = new SoftwareHeaderComponent(this.parent);
        header.render(() => this.goHome());
        
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        this.loadProduct();
    }
}