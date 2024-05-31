import React, { Component } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Button,
  Modal, Box, TextField, FormControl, MenuItem, Select,
  InputLabel
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Viewer from './viewer/Viewer';

// Styles for the modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dateDeLaDemande: '',
      interventionType: '', 
      description: '',
      statut: 'En attente', 
      nomDuDemandeur: '',
      selectedGLOBALID: '',
      showSprite: false, // État pour contrôler l'affichage du sprite
      openGlobalIdModal: false,
    };
  }

  handleToggleSprite = () => {
    console.log("Avant changement: ", this.state.showSprite); // Ajout pour vérification
    this.setState({ showSprite: !this.state.showSprite }, () => {
      console.log("Après changement: ", this.state.showSprite); // Ajout pour vérification
    });
  };

  handleGlobalIdOpen = () => {
    this.setState({ openGlobalIdModal: true });
  };
  handleGlobalIdClose = () => {
    this.setState({ openGlobalIdModal: false });
  };

  setGLOBALID = (GLOBALID) => {
    this.setState({ selectedGLOBALID: GLOBALID });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  

  handleSubmit = async () => {
    const { dateDeLaDemande, interventionType, description, statut, nomDuDemandeur } = this.state;

    // Assurez-vous que toutes les valeurs sont non vides avant de soumettre
  if (!dateDeLaDemande || !interventionType || !description || !statut || !nomDuDemandeur) {
    console.error('Tous les champs sont requis.');
    return; // Sortez de la fonction si un champ est vide
  }

    try {
       const response = await fetch('http://localhost:8080/api/form', {
        // const response = await fetch('mongodb+srv://yohann:Yohann@cluster0.p977xft.mongodb.net/GMAO', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dateDeLaDemande, interventionType, description, statut, nomDuDemandeur }),
      });

      if (response.ok) {
        console.log('Données enregistrées avec succès');
        // Réinitialiser l'état pour nettoyer le formulaire ici
        this.setState({
          dateDeLaDemande: '',
          interventionType: '',
          description: '',
          statut: '',
          nomDuDemandeur: '',
        });
        this.handleClose();
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de l\'enregistrement des données', errorData);
      }
    } catch (error) {
      console.error('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    }
  };


  render() {
    const { interventionType, statut, openGlobalIdModal, selectedGLOBALID, showSprite } = this.state;
    return(
      <div className='viewer-home'>
        <AppBar position="static" style={{marginBottom: 25}}>
          <Toolbar>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Yohann
            </Typography>
            {/* bouton demande di  */}
            <Button variant="contained"
                sx={{ backgroundColor: '#555', color: '#fff' }} 
                onClick={this.handleClickOpen}>
              Demande DI
            </Button>
            {/* bouton bobalID  */}
            <Button variant="contained"
              sx={{ backgroundColor: '#555', color: '#fff', marginLeft: '10px' }} 
              onClick={this.handleGlobalIdOpen}>
              Afficher GLOBALID
            </Button>
            {/* bouton sprite  */}
            <Button variant="contained"
                    sx={{ backgroundColor: '#555', color: '#fff', marginLeft: '10px' }} 
                    onClick={this.handleToggleSprite}>
              Afficher Sprite
            </Button>

          </Toolbar>
        </AppBar>
        <Viewer setGLOBALID={this.setGLOBALID} showSprite={showSprite} selectedGLOBALID={selectedGLOBALID}/> {/* Passer setGLOBALID comme prop */}

                    {/* Modal Formulaire */}
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={style}>
          {/* test */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <TextField
                label="GLOBALID de l'objet"
                variant="outlined"
                value={this.state.selectedGLOBALID} // Afficher le GLOBALID ici
                onChange={this.handleChange}
                name="selectedGLOBALID"
                InputLabelProps={{
                  shrink: true,
                }}
            />
          </FormControl>
            {/* fin test  */}

            <Typography id="modal-title" variant="h6" component="h2">
              Formulaire de Demande
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  label="Date de la demande"
                  type="date"
                  value={this.state.dateDeLaDemande}
                  onChange={this.handleChange}
                  name="dateDeLaDemande"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="intervention-type-label">Type d'intervention</InputLabel>
                <Select
                  labelId="intervention-type-label"
                  id="intervention-type"
                  value={interventionType}
                  label="Type d'intervention"
                  onChange={this.handleChange}
                  name="interventionType"
                >
                  <MenuItem value="Maintenance">Maintenance</MenuItem>
                  <MenuItem value="Réparation">Réparation</MenuItem>
                  <MenuItem value="Installation">Installation</MenuItem>
                  <MenuItem value="Controle">Controle</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField label="Description" 
                  multiline 
                  rows={4} 
                  variant="outlined" 
                  value={this.state.description}
                  onChange={this.handleChange}
                  name="description" />
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="statut-label">Statut</InputLabel>
                <Select
                  labelId="statut-label"
                  id="statut"
                  value={statut}
                  label="Statut"
                  onChange={this.handleChange}
                  name="statut"
                >
                  <MenuItem value="En attente">En attente</MenuItem>
                  <MenuItem value="En cours">En cours</MenuItem>
                  <MenuItem value="Terminé">Terminé</MenuItem>
                  
                </Select>

              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField  label="Nom du demandeur"
                  variant="outlined"
                  value={this.state.nomDuDemandeur}
                  onChange={this.handleChange}
                  name="nomDuDemandeur"/>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 4 }}>
              <Button variant="contained" color="primary" onClick={this.handleSubmit}>Soumettre</Button>
              </FormControl>
            </Box>
          </Box>
        </Modal>
                    {/* Modal globalID */}
        <Modal
          open={openGlobalIdModal}
          onClose={this.handleGlobalIdClose}
          aria-labelledby="global-id-modal-title"
          aria-describedby="global-id-modal-description"
        >
          <Box sx={style}>
            <Typography id="global-id-modal-title" variant="h6" component="h2">
              GLOBALID de l'objet sélectionné
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="GLOBALID"
              variant="outlined"
              value={selectedGLOBALID} // Afficher le GLOBALID ici
              InputLabelProps={{
                shrink: true,
              }}
              readOnly
            />
            <Box textAlign='center' marginTop={2}>
              <Button variant="contained" color="primary" onClick={this.handleGlobalIdClose}>
                Fermer
              </Button>
            </Box>
          </Box>
        </Modal>

        <Viewer/>
      </div>
    )
  }
};

export default Home;
