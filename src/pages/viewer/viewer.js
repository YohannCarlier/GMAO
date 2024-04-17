import React, { Component } from 'react';
import launchViewer from './ViewerFunctions';

class viewer extends Component {

    componentDidMount(){
        
        var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cmVhY3Qtdmlld2VyLWdtYW8vcmFjYmFzaWNzYW1wbGVwcm9qZWN0LnJ2dA';
        launchViewer('viewerDiv', documentId);
    }
    
    render() {
        return (
            <div style={{position: "absolute", width: "100%", height: "85%"}} id="viewerDiv"/>
        );
    }
}

export default viewer;