import { useState, useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import Link from "../../components/Link";
import Chart from "../../components/Chart";
import { MenuItem, MenuList, Box, Avatar, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddIcon from "@mui/icons-material/Add";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function Admin() {
  const [users, setUsers] = useState([]);
  const {user} = useLocalStorage()
  const [pg, setpg] = useState(0);
  const [rpg, setrpg] = useState(5);

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  useEffect(() => {
    fetch("http://localhost:5000/users", {
      headers: {
        Authorization: user.jwt,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          navigate("/");
        }
        setUsers(res);
      });
  }, []);

  return (
    <Box sx={{ display: "flex", gap: "30px" }}>
      <Box
        sx={{
          width: 320,
          height: "100vh",
          maxWidth: "100%",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          borderRadius: "none",
          backgroundColor: "#343A40",
          color: "#A8B3C7",
        }}
      >
        <MenuList
          sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <MenuItem sx={{ marginTop: "15px" }}>
            <Avatar alt="" src="" />
            <Typography sx={{ marginLeft: "10px" }}>
              Welcome <br /> {user.userName}
            </Typography>
          </MenuItem>
          <MenuItem sx={{ marginTop: "15px", color: "#4F47E3" }}>
            <DashboardIcon />
            Dashboard
          </MenuItem>
          <Link to="/createProduct">
            <MenuItem sx={{ color: "#A8B3C7" }}>
              <AddIcon /> Create Product
            </MenuItem>
          </Link>
          <Link to="/products">
            <MenuItem sx={{ color: "#A8B3C7" }}>
              <ShoppingBagIcon /> Products
            </MenuItem>
          </Link>
          <Link to="/categories">
            <MenuItem sx={{ color: "#A8B3C7" }}>
              <CategoryIcon /> Categories
            </MenuItem>
          </Link>
        </MenuList>
      </Box>
      <div
        style={{
          width: "80%",
          margin: "30px auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "95%",
            margin: "10px auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 150,
                }}
              >
                <Chart />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  width: 200,
                  height: 150,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <PeopleAltIcon />
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Total Clients {users.length}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            width: "85%",
            margin: "30px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{ margin: "5px auto", width: "98%" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#13A2B7" }}>
                <TableRow>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    ID
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    UserName
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    Email
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(pg * rpg, pg * rpg + rpg).map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCell align="center">{user.userName}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">
                      {user.createdAt.slice(0, 10)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 7]}
            component="div"
            count={users.length}
            rowsPerPage={rpg}
            page={pg}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </Box>
  );
}

export default Admin;
