import { Paper, Typography } from "@mui/material";

function Home() {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <Paper elevation={3} sx={{width:'50%', height:'80px',display:'flex',justifyContent:'center', alignItems:'center'}}>
    <Typography variant="h3" component="h2" sx={{textAlign:'center'}}>
      Welcome {user.userName}
    </Typography>
    </Paper>
  );
}

export default Home;
