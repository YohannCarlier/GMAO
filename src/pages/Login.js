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
      fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            sessionStorage.setItem("jwtTokenAuth", data.token); // Storing the token in sessionStorage
            console.log("Login successful and token stored");
            console.log("Le token est" + sessionStorage.getItem('jwtTokenAutg'))
            this.setState({
              email: "",
              password: "",
            });
            window.location.href = "/home"
          } else {
            console.log("Login failed");
          }
        });
    } catch (error) {
      console.error("Erreur lors du fetch: " + error.message);
    }
  };
  render() {
    if (sessionStorage.getItem('jwtTokenAuth')){
      window.location.href = "/home";
    }
    return (
      <div>
        <Box>
          <Typography id="modal-title" variant="h6" component="h2">
            Formulaire de Connexion
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <FormControl fullWidth sx={{ mt: 2 }}>
              <TextField
                label="Adresse Email"
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
