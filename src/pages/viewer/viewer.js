import React, { Component } from 'react';
import launchViewer from './ViewerFunctions';
let THREE = window.THREE;
let Autodesk = window.Autodesk;

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.viewerDiv = React.createRef();
        this.viewerInstance= React.createRef();
      }
    componentDidMount(){
        
        var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cmVhY3Qtdmlld2VyLWZvcmdlL3JhY2FkdmFuY2Vkc2FtcGxlcHJvamVjdC5ydnQ';
        launchViewer('viewerDiv', documentId);
    }
    
    render() {
        return (
            <div style={{position: "absolute", width: "100%", height: "85%"}} id="viewerDiv"/>
        );
    }
}

export default Viewer;

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
    const overlayManager = viewer.impl.overlayManager;
    if (!overlayManager.hasOverlay(overlayName)) {
        viewer.impl.createOverlayScene(overlayName);
    }
    overlayManager.addOverlay(overlayName, div);

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
};