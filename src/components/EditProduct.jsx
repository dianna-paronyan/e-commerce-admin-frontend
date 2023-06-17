import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

function EditProduct() {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  const [files, setFiles] = useState([]);
  const [updated, setUpdated] = useState('');
  const [err, setErr] = useState('');
  const [emptyErr, setEmptyErr] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/product/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setProduct(res);
      });
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((res) => {
        setCategories(res);
      });
  }, []);

  const updateProduct = async (id) => {
    const {user} = useLocalStorage()
    if(product.name === '' || product.categoryId === '' || product.price === '' || 
    product.description === '' || product.quantity === ''){
      setEmptyErr('Fill all fields');
      return;
    }
    const formData = new FormData();
    formData.append("name", product?.name);
    formData.append("price", product?.price);
    formData.append("description", product?.description);
    formData.append("quantity", product?.quantity);
    formData.append("categoryId", product?.categoryId);
    for (let i = 0; i < files.length; i++) {
      formData.append("image", files[i]);
    }
    try {
      const response = await fetch(
        `http://localhost:5000/updateProduct/${id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: user.jwt,
          },
        }
      );
      if (!response.ok) {
        setUpdated('');
        setErr('Not Found');
      }else{
        setEmptyErr('');
        setUpdated('Product Updated');
        navigate('/products')
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Typography
        component="h2"
        variant="h5"
        color="#333"
        sx={{ textAlign: "center", marginTop: "15px" }}
      >
        Edit Product
      </Typography>
      <Typography  component='p' color="blue" sx={{ height:'10px',textAlign:'center',fontSize:'15px'}}>{err ? err : updated}</Typography>
      {product.name !==undefined ? (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "41ch" },
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-helperText"
            label="Name"
            value={product.name}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />

          <TextField
            id="image"
            label="Image"
            variant="outlined"
            value={product.image}
            name="image"
            inputProps={{multiple:true}}
            type="file"
            onChange={(e) =>
              setFiles(e.target.files)
            }
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Category
            </InputLabel>
            <Select
               labelId="categoryId"
               id="category"
               value={product.categoryId}
               label="Category"
              onChange={(e) =>
                setProduct((prevState) => ({
                  ...prevState,
                  categoryId: e.target.value,
                }))
              }
            >
              {categories.map((category) => (
                <MenuItem value={category.id} key={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="price"
            label="Price"
            variant="outlined"
            value={product.price}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                price: e.target.value,
              }))
            }
          />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            value={product.description}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          />
          <TextField
            id="quantity"
            label="Quantity"
            variant="outlined"
            value={product.quantity}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                quantity: e.target.value,
              }))
            }
          />
          <Typography  component='p' color="red" sx={{ height:'10px',textAlign:'center',fontSize:'15px'}}>{emptyErr ? emptyErr : ''}</Typography>
          <Button variant="outlined" onClick={()=>updateProduct(id)}>
            Update
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </div>
  );
}

export default EditProduct;
