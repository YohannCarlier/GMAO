/* global Autodesk */
import Client from "../Auth";

var getToken = { accessToken: Client.getAccesstoken() };
var viewer;

function launchViewer(div, urn, setGLOBALID){ // Ajout de setGLOBALID comme paramètre
    
    if (typeof setGLOBALID !== 'function') {
        console.error('setGLOBALID must be a function.');
        return;
    }

    getToken.accessToken.then((token) => {
        var options = {
            'env': 'AutodeskProduction',
            'accessToken': token.access_token
        };

        Autodesk.Viewing.Initializer(options, function() {
            var htmlDiv = document.getElementById(div);
            viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv);
            var startedCode = viewer.start();
            if (startedCode > 0) {
                console.error('Failed to create a Viewer: WebGL not supported.');
                return;
            }
            console.log('Initialization complete, loading a model next...');
        });

        var documentId = urn;
        Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);

        function onDocumentLoadSuccess(viewerDocument) {
            var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
            viewer.loadDocumentNode(viewerDocument, defaultModel);
            viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, onSelectionChange);
        };

        function onDocumentLoadFailure() {
            console.error('Failed fetching Forge manifest');
        };

        function onSelectionChange(event) {
            if (event.dbIdArray.length > 0) {
                const dbId = event.dbIdArray[0];
                viewer.getProperties(dbId, (props) => {
                    console.log('GUID de l\'objet sélectionné:', props.externalId);
                    setGLOBALID(props.externalId); // Utilisez setGLOBALID pour mettre à jour l'état dans React
                });
            }
        }
    });
};

export default launchViewer;
