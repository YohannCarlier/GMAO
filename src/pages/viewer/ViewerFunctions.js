/* global Autodesk */
import Client from "../Auth";
// import axios from "axios";

var getToken = {accessToken: Client.getAccesstoken()};
var viewer;

function launchViewer(div, urn){
    
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
            
            // Ajouter l'écouteur d'événements après que le modèle a été chargé
            viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, onSelectionChange);
          };
      
          function onDocumentLoadFailure() {
            console.error('Failed fetching Forge manifest');
          };
      
          // Gestionnaire pour les changements de sélection
          function onSelectionChange(event) {
            if (event.dbIdArray.length > 0) {
              const dbId = event.dbIdArray[0];
              viewer.getProperties(dbId, (props) => {
                // Log le GUID ici ou faites ce que vous voulez avec
                console.log('Le dbid est ' + dbId)
                console.log('GUID de l\'objet sélectionné:', props.externalId);
                // Vous pouvez également utiliser un callback ou un événement pour envoyer le GUID à votre composant React
              });
            }
          }
        });
};


export default launchViewer;