import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Link from "./Link";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function Products() {
  const [products, setProducts] = useState([]);
  const [isDel, setIsDel] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProducts(res);
      });
  }, [isDel]);

  const deleteProduct = async (id) => {
    const token = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await fetch(
        `http://localhost:5000/deleteProduct/${id}`,
        {
          method: "DELETE",
          body: JSON.stringify({
            id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": token.jwt
          },
        }
      );
      if(!response.ok){
        navigate('/');
      }
      setIsDel(!isDel);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Typography component="h2" variant="h5" color="#333" sx={{textAlign:'center', marginTop:'15px'}}>All Products</Typography>
      <Container sx={{ width:'80%', margin:'auto',display: "flex", justifyContent:'center',alignItems:'center', flexDirection: "column" }}>
        <TableContainer
          component={Paper}
          sx={{ width: "90%", margin: "50px auto" }}
        >
          <Box sx={{ display: "flex",
            justifyContent: "end",
            alignItems: "end"}}>

           <Button variant="contained" sx={{backgroundColor:'#DADADA',display: "flex",
            justifyContent: "end",
            alignItems: "end",}}>
            <Link to="/createProduct">New Product</Link>
          </Button>
          </Box>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{backgroundColor:'#13A2B7'}}>
                <TableCell align="center" sx={{color:'#fff'}}>Name</TableCell>
                <TableCell align="center" sx={{color:'#fff'}}>Image</TableCell>
                <TableCell align="center" sx={{color:'#fff'}}>Price</TableCell>
                <TableCell align="center" sx={{color:'#fff'}}>Description</TableCell>
                <TableCell align="center" sx={{color:'#fff'}}>Category</TableCell>
                <TableCell align="center" sx={{color:'#fff'}}>Quantity</TableCell>
                <TableCell align="center" sx={{color:'#fff'}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">
                 { product.Images.map((image)=> <img key={image.id} src={`http://localhost:5000/images/${image.fileName}`} width='30px'/>)} 
                  </TableCell>
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="center">{product.description}</TableCell>
                  <TableCell align="center">{product.Category?.name}</TableCell>
                  <TableCell align="center">{product.quantity}</TableCell>
                  <TableCell align="center">
                    <Link to={`/updateProduct/${product.id}`}>
                      <EditIcon />
                    </Link>
                    <DeleteOutlineIcon onClick={()=>deleteProduct(product.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Products;

