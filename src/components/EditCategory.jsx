import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function EditCategory() {

  const [category, setCategory] = useState({});
  const [err, setErr] = useState('');
  const [emptyErr, setEmptyErr] = useState('');
  const [updated, setUpdated] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/category/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setCategory(res);
      });
  }, [id]);

  const updateCategory = async (id) => {
    const {user} = useLocalStorage()
    if (category.name === "") {
      setErr("Add Category Name");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/updateCategory/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(category),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: user.jwt,
          },
        }
      );
      if (!response.ok) {
        setUpdated('');
        setErr('404 Not Found');
      }else{
        setEmptyErr('');
        setErr('');
        setUpdated('Category Updated');
        navigate('/categories');
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        Edit Category
      </Typography>
      <Typography  component='p' color="blue" sx={{ height:'10px',textAlign:'center',fontSize:'15px'}}>{updated ? updated : ''}</Typography>
      {
        category.name !== undefined ? 
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={category.name}
          onChange={(e) => setCategory(prevState=> ({...prevState, name:e.target.value}))}
        /> : <></>
      }
      <Typography  component='p' color="red" sx={{ height:'10px',textAlign:'center',fontSize:'15px'}}>{emptyErr || err ? emptyErr || err : ''}</Typography>
      <Button variant="outlined" onClick={() => updateCategory(id)}>
        Update
      </Button>
    </Box>
  );
}

export default EditCategory;
