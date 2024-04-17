import React, { Component } from 'react';
import launchViewer from './ViewerFunctions';

class Viewer extends Component {

    componentDidMount(){
        
        var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cmVhY3Qtdmlld2VyLWdtYW8vU01fQXBhcnRtZW50LmdsYg';
        launchViewer('viewerDiv', documentId);
    }
    
    render() {
        return (
            <div style={{position: "absolute", width: "100%", height: "85%"}} id="viewerDiv"/>
        );
    }
}

export default Viewer;