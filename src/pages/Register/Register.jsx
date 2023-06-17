import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [registered, setRegistered] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmitRegister(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify({
          userName: user.userName,
          email: user.email,
          password: user.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      if (response.status === 400) {
        setRegistered('');
        setError(data.message ? data.message : data);
      }else{
        setError('');
        setRegistered('User Created');
      }
      console.log(data, "data");
    } catch (err) {
      console.log(err, "err");
    }
    setUser({ userName: "", email: "", password: "" });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#4AC59A" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Typography component="p" >
          {registered ? registered : ''}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmitRegister}
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="esername"
                label="UserName"
                name="username"
                value={user.userName}
                onChange={(e) =>
                  setUser((prevState) => ({
                    ...prevState,
                    userName: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={user.email}
                onChange={(e) =>
                  setUser((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={user.password}
                onChange={(e) =>
                  setUser((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
              />
            </Grid>
          </Grid>
          <Typography
            variant="body1"
            sx={{
              height: "15px",
              fontSize: "13px",
              textAlign: "center",
              color: "red",
            }}
          >
            {error && error}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor:'#465E5E' }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={() => navigate("/login")}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
