import React, { Component } from 'react';
import launchViewer from './ViewerFunctions';

class Viewer extends Component {

    componentDidMount(){
        console.log("Type of setGLOBALID:", typeof this.props.setGLOBALID);
        var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cHJvamV0LWdtYW8vT2ZmaWNlLnJ2dA';
        launchViewer('viewerDiv', documentId, this.props.setGLOBALID);
    }
    
    render() {
        return (
            <div style={{position: "absolute", width: "100%", height: "85%"}} id="viewerDiv"/>
        );
    }
}

export default Viewer;