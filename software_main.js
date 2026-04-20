import { SoftwareMainPage } from "./software_pages/software_main/software.js";

const root = document.getElementById('root');
const softwareMainPage = new SoftwareMainPage(root);
softwareMainPage.render();