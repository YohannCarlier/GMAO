let Autodesk = window.Autodesk;
let THREE = window.THREE;

class POIExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super();
        this.viewer = viewer;
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load("img/icone_pointeur.png");
        this.selectedMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, alphaTest: 0.5, color: 0xFF0000 });
        this.defaultMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, alphaTest: 0.5, color: 0x00FF00 });
        this.loaded_poi = [];
        this.planeGeometry = new THREE.PlaneGeometry(0.6, 1, 1, 1);
        this.spriteScaleFactor = 0.8;
        this.spriteAltitude = 15.0;
    }

    load() {
        let self = this;
        this.viewer.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, this.animate.bind(this));
        return true;
    }

    unload() {
        this.viewer.removeEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, this.animate.bind(this));
        return true;
    }

    setSettings(settings) {
        const scale = 1.0 / 255.0;
        this.selectedMaterial.color.setRGB(
            settings.selectedPointColor[0] * scale,
            settings.selectedPointColor[1] * scale,
            settings.selectedPointColor[2] * scale
        );
        this.defaultMaterial.color.setRGB(
            settings.defaultPointColor[0] * scale,
            settings.defaultPointColor[1] * scale,
            settings.defaultPointColor[2] * scale
        );
        this.spriteScaleFactor = settings.spriteScaleFactor;
        this.spriteAltitude = settings.spriteAltitude;
    }

    clearAllPOI() {
        this.loaded_poi.map((poiParticle) => {
            this.viewer.impl.scene.remove(poiParticle.mesh);
        });
        this.loaded_poi = [];
    }

    createPOI(poi, isSelected) {
        let poiParticle = {
            poi: poi,
            mesh: new THREE.Mesh(this.planeGeometry, isSelected === true ? this.selectedMaterial : this.defaultMaterial)
        };

        this.loaded_poi.push(poiParticle);
        poiParticle.original_position = {
            x: poi.x,
            y: poi.y,
            z: poi.z,
        };
        poiParticle.mesh.position.set(poi.x, poi.y, this.spriteAltitude);
        this.viewer.impl.scene.add(poiParticle.mesh);
        this.viewer.impl.sceneUpdated(true);
        this.animate();
    }

    animate() {
        if (this.hacked === undefined) {
            this.viewer.toolbar._controls[1];
            let menu_1 = this.viewer.toolbar._controls[2];
            if ((menu_1 !== undefined) && (menu_1._controls !== undefined)) {
                let menu_2 = menu_1._controls[0];
                if ((menu_2 !== undefined) && (menu_2.subMenu !== undefined) && (menu_2.subMenu._controls !== undefined)) {
                    menu_2.subMenu._controls[2].onClick();
                    this.hacked = true;
                }
            }
        }

        this.loaded_poi.map((poiParticle) => {
            var vec = new THREE.Vector3();
            var defaultDepth = 10;

            poiParticle.mesh.scale.x = poiParticle.mesh.scale.y = poiParticle.mesh.scale.z = this.spriteScaleFactor * vec.setFromMatrixPosition(poiParticle.mesh.matrixWorld).sub(this.viewer.impl.camera.position).length() / defaultDepth;
            poiParticle.mesh.position.set(poiParticle.original_position.x, poiParticle.original_position.y, poiParticle.original_position.z);

            poiParticle.mesh.quaternion.copy(this.viewer.impl.camera.quaternion);
            this.viewer.impl.scene.updateMatrixWorld(true);
        });
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension('POIExtension', POIExtension);

export default POIExtension;