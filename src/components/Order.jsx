import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";



function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "res");
        setOrders(res);
      });
  }, []);
  return (
    <div>
      <Box>
        <Typography
          component="h2"
          variant="h5"
          color="#333"
          sx={{ textAlign: "center", marginTop: "15px" }}
        >
          All Orders
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ width: "50%", margin: "50px auto" }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "end", alignItems: "end" }}
          ></Box>
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
                  Products
                </TableCell>
                <TableCell align="center" sx={{ color: "#fff" }}>
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{order.id}</TableCell>
                  <TableCell align="center">
                    {order?.Cart?.User?.userName}
                  </TableCell>
                  <TableCell align="center">
                    {order.products.map((product) => (
                      <p key={product.productId}>{product.name}</p>
                    ))}
                  </TableCell>
                  <TableCell align="center">{order.total} USD</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default Order;
