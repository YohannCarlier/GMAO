import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Modal,
  Box,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";

class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      email: "",
      password: "",
      confirmPassword: "", // Assurez-vous d'avoir une valeur par défaut ici
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitLogin = async () => {
    const { email, password, confirmPassword } = this.state;
    const regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regEmail.test(email)) {
      if (password == confirmPassword) {
        try {
          const response = await fetch(
            "http://localhost:8080/api/auth/signup",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );
          if (response.ok) {
            console.log("Inscription enregistrées avec succès");
            // Réinitialiser l'état pour nettoyer le formulaire ici
            this.setState({
              email: "",
              password: "",
              confirmPassword: "",
            });
            window.location.href = "/login"
          } else {
            const errorData = await response.json();
            console.error("Erreur lors de l'inscription", errorData);
          }
        } catch (error) {
          console.error("Erreur lors du fetch: " + error.message);
        }
      } else {
        console.error("Les mots de passe ne sont pas identiques");
      }
    } else {
      console.error("Invalid email format");
    }
  };
  render() {
    if (sessionStorage.getItem('jwtToken')){
      window.location.href = "/home";
    }
    return (
      <div>
          <Box>
            <Typography id="modal-title" variant="h6" component="h2">
              Formulaire d'inscription
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  label="Adresse Email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  name="email"
                />
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  label="Mot De Passe"
                  type="password"
                  variant="outlined"
                  value={this.state.password}
                  onChange={this.handleChange}
                  name="password"
                />
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  label="Confirmer Mot de Passe"
                  type="password"
                  variant="outlined"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  name="confirmPassword"
                />
              </FormControl>
              <FormControl fullWidth sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.submitLogin}
                >
                  Soumettre
                </Button>
              </FormControl>
            </Box>
          </Box>
        <Link to="/login">Pas de compte? Inscrivez-Vous!</Link>

      </div>
    );
  }
}

export default Subscribe;
