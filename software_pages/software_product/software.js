import { SoftwareProductComponent } from "../../software_components/software_product/software.js"
import { SoftwareBackButtonComponent } from "../../software_components/software_back-button/software.js"
import { SoftwareMainPage } from "../software_main/software.js"

export class SoftwareProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getData() {
        const softwareData = {
            1: {
                id: 1,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYNGtQRIVpT5HGQHTBovxirUzbohLevSU9AQ&s",
                title: "Microsoft Word",
                text: "Microsoft Word (Ворд) — это самый популярный в мире текстовый процессор, предназначенный для создания, редактирования, форматирования и печати текстовых документов. Входит в пакет Microsoft Office (365) и позволяет работать с текстами, таблицами, изображениями и графиками, обеспечивая профессиональное оформление."
            },
            2: {
                id: 2,
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/960px-Postgresql_elephant.svg.png",
                title: "PostgreSQL",
                text: "PostgreSQL — это мощная, свободная объектно-реляционная система управления базами данных (СУБД) с открытым исходным кодом. Она использует язык SQL и известна своей высокой надежностью, целостностью данных, масштабируемостью и поддержкой сложных запросов. Часто используется в веб-приложениях и корпоративных системах как аналог дорогих коммерческих решений."
            },
            3: {
                id: 3,
                src: "https://rskrf.ru/upload/iblock/e6c/3pughvx5iu7dzqo6adwlwxe3a38q7xc6.png",
                title: "Телемост",
                text: "«Яндекс Телемост» — это российский сервис для видеоконференций и звонков, позволяющий создавать онлайн-встречи без ограничений по времени. Он обеспечивает общение до 40 участников через браузер или приложение без обязательной регистрации, работая как аналог зарубежных Zoom или Google Meet."
            }
        };
        
        return softwareData[this.id] || {
            id: this.id,
            src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
            title: `Продукт ${this.id}`,
            text: `Подробное описание продукта ${this.id}`
        };
    }
    
    get pageRoot() {
        return document.getElementById('product-page')
    }
    
    getHTML() {
        return (
            `
                <div class="container">
                    <div id="product-page"></div>
                </div>
            `
        )
    }
    
    clickBack() {
        const softwareMainPage = new SoftwareMainPage(this.parent)
        softwareMainPage.render()
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const softwareBackButton = new SoftwareBackButtonComponent(this.pageRoot)
        softwareBackButton.render(this.clickBack.bind(this))

        const data = this.getData()
        const product = new SoftwareProductComponent(this.pageRoot)
        product.render(data)
    }
}