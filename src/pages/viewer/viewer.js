import React, { Component } from 'react';
import launchViewer from './ViewerFunctions';
import * as THREE from 'three';


const HARD_CODED_GUID = '5fa5a9bc-3115-489e-91b8-2466fd5783bb-0004a387';
class Viewer extends Component {

    componentDidMount(){
        console.log("Type of setGLOBALID:", typeof this.props.setGLOBALID);
        var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cHJvamV0LWdtYW8vT2ZmaWNlLnJ2dA';
        launchViewer('viewerDiv', documentId, this.props.setGLOBALID);
        this.setupSpriteDisplay();
    }


    //test
    guidToDbId(guid) {
      // Implémentez cette méthode en fonction de votre système de gestion des identifiants
      // Cette implémentation est fictive
      return parseInt(guid.split('-').pop(), 16); // Simplifié
  }
    componentDidUpdate(prevProps) {
        console.log("Mise à jour des props :", prevProps.showSprite, "->", this.props.showSprite);
        if (prevProps.showSprite !== this.props.showSprite) {
            this.setupSpriteDisplay();
        }
      }

      setupSpriteDisplay() {
        if (this.viewer && this.props.showSprite) {
          console.log("Affichage du sprite pour l'objet:", HARD_CODED_GUID);
          this.addSpriteToElement(HARD_CODED_GUID);
        } else if (this.viewer) {
          console.log("Masquage du sprite");
          this.removeSpriteFromElement(HARD_CODED_GUID);
        } else {
          console.log("Viewer non initialisé ou indisponible.");
        }
      }
      

      addSpriteToElement(guid) {
        console.log("Ajout d'un sprite au guid:", guid);
        // Assurez-vous que le viewer et le modèle sont chargés et prêts
        if (this.viewer && this.viewer.model) {
            const dbId = this.guidToDbId(guid); // Convertit le GUID en dbId si nécessaire
            // Supposons que vous voulez ajouter un overlay graphique sous forme d'icône
            if (this.viewer.createOverlay) {
                this.viewer.createOverlay("customSpriteLayer", dbId, { icon: 'path_to_sprite_image.png', scale: 1.5 });
                console.log("Sprite ajouté avec succès au guid:", guid);
            } else {
                console.log("La fonction createOverlay n'est pas disponible.");
            }
            // Optionnel : change la couleur de l'objet pour le mettre en évidence
            this.viewer.setThemingColor(dbId, new THREE.Color(1, 0, 0), this.viewer.model);
        } else {
            console.log("Viewer non initialisé ou modèle non chargé.");
        }
    }

    removeSpriteFromElement(guid) {
      console.log("Retrait du sprite du guid:", guid);
      if (this.viewer && this.viewer.model) {
          const dbId = this.guidToDbId(guid); // Convertit le GUID en dbId si nécessaire
          // Supposons que vous voulez retirer un overlay graphique
          if (this.viewer.removeOverlay) {
              this.viewer.removeOverlay("customSpriteLayer", dbId);
              console.log("Sprite retiré avec succès du guid:", guid);
          } else {
              console.log("La fonction removeOverlay n'est pas disponible.");
          }
          // Réinitialiser la couleur de l'objet si elle a été changée
          this.viewer.clearThemingColor(dbId, this.viewer.model);
      } else {
          console.log("Viewer non initialisé ou modèle non chargé.");
      }
  }

    //fin test
    
    render() {
        return (
            <div style={{position: "absolute", width: "100%", height: "85%"}} id="viewerDiv"/>
        );
    }
}

export default Viewer;