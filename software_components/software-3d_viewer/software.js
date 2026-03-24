import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Software3DViewerComponent {
    constructor(parent, modelId = null) {
        this.parent = parent;
        this.modelId = modelId;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        
        this.modelMapping = {
            1: "./software_models/MacBook Pro.glb",      
            2: "./software_models/Gaming Computer.glb",  
            3: "./software_models/test1.glb"             
        };
    }
    
    getHTML() {
        return `
            <div class="card mt-4">
                <div class="card-header">
                    <strong>3D Модель</strong>
                    <div class="btn-group float-right">
                        <button id="zoom-in-3d" class="btn btn-sm btn-outline-secondary">+</button>
                        <button id="zoom-out-3d" class="btn btn-sm btn-outline-secondary">-</button>
                        <button id="view-front-3d" class="btn btn-sm btn-outline-secondary">Спереди</button>
                        <button id="view-back-3d" class="btn btn-sm btn-outline-secondary">Сзади</button>
                        <button id="view-left-3d" class="btn btn-sm btn-outline-secondary">Слева</button>
                        <button id="view-right-3d" class="btn btn-sm btn-outline-secondary">Справа</button>
                    </div>
                </div>
                <div class="card-body">
                    <canvas id="viewer-canvas-3d" style="width: 100%; height: 400px; background: #e6ebf5; border-radius: 8px;"></canvas>
                </div>
            </div>
        `;
    }
    
    getModelPath() {
        const path = this.modelMapping[this.modelId];
        return path || null;
    }
    
    initThreeJS() {
        const canvas = document.getElementById('viewer-canvas-3d');
        if (!canvas) return;
        
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        this.renderer.setClearColor(0xe6ebf5, 1);
        
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xe6ebf5);
        
        this.camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        this.camera.position.set(0, 2, 5);
        
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
        this.controls.target.set(0, 1, 0);
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);
        
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
        dirLight.position.set(4, 10, 8);
        this.scene.add(dirLight);
        
        const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
        backLight.position.set(-2, 2, -4);
        this.scene.add(backLight);
        
        
        this.loadModel();
        
        window.addEventListener('resize', () => this.resizeRenderer());
        
        this.animate();
    }
    
    loadModel() {
        const modelPath = this.getModelPath();
        if (!modelPath) {
            console.warn(`Модель для ID ${this.modelId} не найдена в маппинге`);
            this.showPlaceholder();
            return;
        }
        
        const loader = new GLTFLoader();
        console.log(`Пытаемся загрузить модель: ${modelPath}`);
        
        loader.load(modelPath, 
            (gltf) => {
                console.log('Модель успешно загружена!', gltf);
                this.model = gltf.scene;
                
                const box = new THREE.Box3().setFromObject(this.model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                
                console.log('Размер модели:', size);
                console.log('Центр модели:', center);
                
                this.model.position.x -= center.x;
                this.model.position.z -= center.z;
                this.model.position.y -= box.min.y;
                
                const maxDim = Math.max(size.x, size.y, size.z);
                if (maxDim > 2) {
                    const scale = 2 / maxDim;
                    this.model.scale.multiplyScalar(scale);
                    console.log(`Модель масштабирована: ${scale}`);
                }
                
                this.scene.add(this.model);
                
                const newCenter = new THREE.Box3().setFromObject(this.model).getCenter(new THREE.Vector3());
                this.controls.target.copy(newCenter);
                this.controls.update();
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.error('Ошибка загрузки модели:', error);
                console.error('Путь к модели:', modelPath);
                this.showPlaceholder();
            }
        );
    }
    
    showPlaceholder() {
        console.log('Показываем placeholder (модель не найдена)');
        
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0x888888 });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.y = 0.5;
        this.scene.add(cube);
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 128;
        context.fillStyle = '#666';
        context.font = '20px Arial';
        context.textAlign = 'center';
        context.fillText(`Модель не найдена (ID: ${this.modelId})`, canvas.width / 2, canvas.height / 2);
        
        const texture = new THREE.CanvasTexture(canvas);
        const materialText = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(materialText);
        sprite.position.y = 1.2;
        sprite.scale.set(1.5, 0.75, 1);
        this.scene.add(sprite);
    }
    
    setupControls() {
        const zoomInBtn = document.getElementById('zoom-in-3d');
        const zoomOutBtn = document.getElementById('zoom-out-3d');
        const viewFront = document.getElementById('view-front-3d');
        const viewBack = document.getElementById('view-back-3d');
        const viewLeft = document.getElementById('view-left-3d');
        const viewRight = document.getElementById('view-right-3d');
        
        if (zoomInBtn) {
            zoomInBtn.onclick = () => {
                const vec = new THREE.Vector3().subVectors(this.camera.position, this.controls.target).normalize();
                this.camera.position.addScaledVector(vec, -0.5);
                this.controls.update();
            };
        }
        
        if (zoomOutBtn) {
            zoomOutBtn.onclick = () => {
                const vec = new THREE.Vector3().subVectors(this.camera.position, this.controls.target).normalize();
                this.camera.position.addScaledVector(vec, 0.5);
                this.controls.update();
            };
        }
        
        const distance = () => this.camera.position.distanceTo(this.controls.target);
        
        const setCameraDirection = (dir) => {
            const d = distance();
            let x = 0, y = 2, z = 0;
            if (dir === "front")  { x = 0; z = d; }
            if (dir === "back")   { x = 0; z = -d; }
            if (dir === "left")   { x = -d; z = 0; }
            if (dir === "right")  { x = d; z = 0; }
            this.camera.position.set(x, y, z);
            this.controls.target.set(0, 1, 0);
            this.controls.update();
        };
        
        if (viewFront) viewFront.onclick = () => setCameraDirection('front');
        if (viewBack) viewBack.onclick = () => setCameraDirection('back');
        if (viewLeft) viewLeft.onclick = () => setCameraDirection('left');
        if (viewRight) viewRight.onclick = () => setCameraDirection('right');
    }
    
    resizeRenderer() {
        const canvas = document.getElementById('viewer-canvas-3d');
        if (!canvas || !this.renderer) return;
        
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        
        if (canvas.width !== width || canvas.height !== height) {
            this.renderer.setSize(width, height, false);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        if (this.controls) {
            this.controls.update();
        }
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
    
    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        setTimeout(() => {
            this.initThreeJS();
            this.setupControls();
        }, 100);
    }
}