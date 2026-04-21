import { SoftwareFormComponent } from "../../software_components/software_form/software.js";
import { SoftwareMainPage } from "../software_main/software.js";
import { SoftwareHeaderComponent } from "../../software_components/software_header/software.js";
import { fetchService } from "../../software_modules/software_fetch.js";
import { apiUrls } from "../../software_modules/software_apiUrls.js";

export class SoftwareFormPage {
    constructor(parent, id = null) {
        this.parent = parent;
        this.id = id;
        this.product = null;
    }

    async loadProduct() {
        if (this.id) {
            try {
                const { data, status } = await fetchService.get(apiUrls.getProductById(this.id));
                console.log('GET product for edit:', { status, data });
                if (status === 200 && data) {
                    this.product = data;
                    this.renderForm();
                }
            } catch (error) {
                console.error('Ошибка загрузки продукта для редактирования:', error);
                alert('Не удалось загрузить данные программы');
                this.goHome();
            }
        } else {
            this.renderForm();
        }
    }
    
    async handleSubmit(formData) {
        console.log('Submitting form:', { id: this.id, formData });
        
        if (this.id) {
            try {
                const { status } = await fetchService.put(apiUrls.updateProduct(this.id), formData);
                console.log('PUT response status:', status);
                if (status === 200) {
                    alert('Программа успешно обновлена!');
                    this.goHome();
                }
            } catch (error) {
                console.error('Ошибка обновления:', error);
                alert('Ошибка при обновлении программы');
            }
        } else {
            try {
                const { status } = await fetchService.post(apiUrls.createProduct(), formData);
                console.log('POST response status:', status);
                if (status === 201 || status === 200) {
                    alert('Программа успешно создана!');
                    this.goHome();
                }
            } catch (error) {
                console.error('Ошибка создания:', error);
                alert('Ошибка при создании программы');
            }
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