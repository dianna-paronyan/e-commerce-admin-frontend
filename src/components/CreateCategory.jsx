import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { Box, Button } from "@mui/material";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

function CreateCategory() {
  const [name, setName] = useState("");
  const [created, setCreated] = useState('');
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function createCategory(e) {
    e.preventDefault();
    const {user} = useLocalStorage()
    if (name.trim() === "") {
      setErr("Add Category Name");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/createCategory", {
        method: "POST",
        body: JSON.stringify({
          name,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: user.jwt,
        },
      });
      setErr('');
      setCreated('')
      if (!response.ok) {
        setCreated('')
        setErr('Not Found');
      } else {
        setErr("");
        setCreated('Category Created')
        navigate("/categories");
      }
    } catch (err) {
      console.log(err);
    }
    setName("");
  }
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, width: "41ch" },
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      
    >
      <Typography
        component="h2"
        variant="h5"
        color="#333"
        sx={{ textAlign: "center", marginTop: "15px" }}
      >
        Create Category
      </Typography>
      <Typography  component='p' color="blue" sx={{ height:'10px',textAlign:'center',fontSize:'15px'}}>{created ? created : ''}</Typography>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Typography
        component="p"
        color="red"
        sx={{ height: "10px", textAlign: "center", fontSize: "15px" }}
      >
        {err ? err : ""}
      </Typography>
      <Button variant="outlined" onClick={createCategory}>
        Create
      </Button>
    </Box>
  );
}

export default CreateCategory;