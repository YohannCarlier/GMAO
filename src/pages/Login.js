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
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      email: "",
      password: "", // Assurez-vous d'avoir une valeur par défaut ici
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitLogin = async () => {
    const { email, password } = this.state;
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        console.log("Connexion effectuée avec succès");
        // Réinitialiser l'état pour nettoyer le formulaire ici
        this.setState({
          email: "",
          password: "",
        });
        window.location.href = "/home"
      } else {
        const errorData = await response.json();
        console.error("Erreur lors de la connexion", errorData);
      }
    } catch (error) {
      console.error("Erreur lors du fetch: " + error.message);
    }
  };
  render() {
    return (
      <div>
        
          <Box>
            <Typography id="modal-title" variant="h6" component="h2">
              Formulaire de Connexion
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  label="Date de la demande"
                  value={this.state.email}
                  onChange={this.handleChange}
                  name="email"
                />
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  label="MotDePasse"
                  type="password"
                  variant="outlined"
                  value={this.state.password}
                  onChange={this.handleChange}
                  name="password"
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
        
        <Link to="/">Pas de compte? Inscrivez-Vous!</Link>
      </div>
    );
  }
}

export default Login;
