import { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Link from "./Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";


function Categories() {
  const [categories, setCategories] = useState([]);
  const [isDel, setIsDel] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((res) => {
        setCategories(res);
      });
  }, [isDel]);
 
  const deleteCategory = async (id) => {
    const {user} = useLocalStorage()
    try {
      const response = await fetch(
        `http://localhost:5000/deleteCategory/${id}`,
        {
          method: "DELETE",
          body: JSON.stringify({
            id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: user.jwt,
          },
        }
      );
      setIsDel(!isDel);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Typography component="h2" variant="h5" color="#333" sx={{textAlign:'center', marginTop:'15px'}}>All Categories</Typography>
      <TableContainer
        component={Paper}
        sx={{ width: "50%", margin: "50px auto" }}
      >
        <Box sx={{ display: "flex", justifyContent: "end", alignItems: "end" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#DADADA",
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
            }}
          >
            <Link to="/createCategory">New Category</Link>
          </Button>
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#13A2B7" }}>
              <TableCell align="center" sx={{ color: "#fff" }}>
                ID
              </TableCell>
              <TableCell align="center" sx={{ color: "#fff" }}>
                Name
              </TableCell>
              <TableCell align="center" sx={{ color: "#fff" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow
                key={category.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{category.id}</TableCell>
                <TableCell align="center">{category.name}</TableCell>
                <TableCell align="center">
                  <Link to={`/updateCategory/${category.id}`}>
                  <EditIcon />
                  </Link>
                  <DeleteOutlineIcon
                    onClick={() => deleteCategory(category.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Categories;
