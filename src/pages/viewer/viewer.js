import React, { Component } from 'react';
import launchViewer from './ViewerFunctions';
let THREE = window.THREE;
let Autodesk = window.Autodesk;

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.viewerDiv = React.createRef();
    }

    componentDidMount() {
        console.log('Component did mount');
        console.log('Viewer Div:', this.viewerDiv.current); // Ajoutez ceci pour vérifier la référence

        const documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cmVhY3Qtdmlld2VyLWZvcmdlL3JhY2FkdmFuY2Vkc2FtcGxlcHJvamVjdC5ydnQ';
        
        // Utiliser la référence au div directement
        if (this.viewerDiv.current) {
            launchViewer(this.viewerDiv.current, documentId);
        } else {
            console.error('viewerDiv.current is null');
        }
    }
    
    render() {
        return (
            <div 
                ref={this.viewerDiv} 
                style={{ position: "absolute", width: "100%", height: "85%" }} 
                id="viewerDiv"
            />
        );
    }
}

export default Viewer
/*
export const createPOI = (viewer, position, poiData) => {
    const overlayName = 'custom-pois';
    const div = document.createElement('div');
    div.className = 'poi-marker';
    div.innerHTML = `<div class="poi-content">${poiData.label}</div>`;
    div.style.position = 'absolute';
    div.style.width = '20px';
    div.style.height = '20px';
    div.style.background = 'red';
    div.style.borderRadius = '50%';
    div.style.cursor = 'pointer';

    // Gestion de l'overlay
    const overlayScenes = viewer.impl.overlayScenes;
    console.log(overlayScenes)
    if (!overlayScenes[overlayName]) {
        viewer.impl.createOverlayScene(overlayName);
    }
    viewer.impl.addOverlay(overlayName, div);

    const worldCoords = new THREE.Vector3(position.x, position.y, position.z);
    const screenPoint = viewer.worldToClient(worldCoords);
    div.style.left = `${screenPoint.x - 10}px`;
    div.style.top = `${screenPoint.y - 10}px`;

    // Mettre à jour la position du marqueur lorsque la scène est modifiée
    const updatePosition = () => {
        const newScreenPoint = viewer.worldToClient(worldCoords);
        div.style.left = `${newScreenPoint.x - 10}px`;
        div.style.top = `${newScreenPoint.y - 10}px`;
    };

    viewer.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, updatePosition);

    div.addEventListener('click', () => {
        alert(`POI: ${poiData.label}`);
    });
    return div;
};*/

export const createPOI = (viewer, position, poiData) => {
    const overlayName = 'custom-pois';

    // Créer un canvas pour le sprite
    const createTextCanvas = (text, bgColor, textColor) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = '100px Arial';

        // Déterminer la taille du texte et ajuster la taille du canvas
        const textWidth = context.measureText(text).width;
        canvas.width = textWidth + 20;
        canvas.height = 40;

        // Dessiner le fond
        context.fillStyle = bgColor;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Dessiner le texte
        context.fillStyle = textColor;
        context.fillText(text, 10, 30);
        console.log('étape 1')
        return canvas;
    };

    // Créer le sprite pour le POI
    const createPOISprite = (poiData) => {
        const canvas = createTextCanvas(poiData.label, 'red', 'white');
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(200, 150, 100); // Ajuster l'échelle selon vos besoins
        console.log('étape 2')
        return sprite;
    };

    // Gestion de l'overlay
    if (!viewer.impl.overlayScenes[overlayName]) {
        viewer.impl.createOverlayScene(overlayName);
        console.log('étape 3')
    }

    const sprite = createPOISprite(poiData);
    sprite.position.set(position.x, position.y, position.z);
    sprite.name=poiData.label;
    viewer.impl.addOverlay(overlayName, sprite);
    console.log(sprite)
    console.log('étape 4')

    // Mettre à jour la position du sprite lorsque la scène est modifiée
    const updatePosition = () => {
        const screenPoint = viewer.worldToClient(sprite.position);
        sprite.position.set(screenPoint.x, screenPoint.y, screenPoint.z);
        console.log('étape 5')
    };

    viewer.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, updatePosition);
    console.log('étape 6')
    sprite.onClick = () => {
        alert(`POI: ${poiData.label}`);
        console.log('étape 7')
    };
    console.log('étape 8')
    console.log(viewer.impl.overlayScenes)
    return sprite;
};