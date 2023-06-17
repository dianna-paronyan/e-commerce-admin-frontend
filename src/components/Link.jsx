import { Link as RouterLink } from "react-router-dom"

function Link(props) {
  return (
    <RouterLink  {...props} style={{textDecoration:'none', color:'#000'}} />
  )
}

export default Link