import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import{ToastContainer,toast} from "react-toastify"
import "react-toastify/ReactToastify.css"
import { useNavigate } from "react-router-dom";

function Form() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [login,setLogin]=useState({email:"",password:""})
  const [loginForm,setLoginForm]=useState(true)
  const [err,setErr]=useState({})
const nav=useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
    const handleChange1 = (e) =>
    setLogin({ ...login, [e.target.name]: e.target.value });

const url = process.env.REACT_APP_API_URL;
  const handleSubmit2 = async(e) => {
    console.log(process.env.REACT_APP_API_URL)
    e.preventDefault();
    console.log(form);
   if( Object.keys(validate()).length==0){
   try{
    const res=await fetch(`${url}/signup`,{
       method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {name: form.name,
    email: form.email,
    password: form.password,
  role:"user"})
    })
    const data=await res.json()
    console.log(data.status)
    if(data.status)
    {
      toast.success(data?.message || "Rgisterd Successfully")
      setLoginForm(true)
      setForm({ name: "", email: "", password: "" })
      
    }
    else {
      toast.error(data.message || "Something went wrong")
    }
   }
   catch(err)
   {
    console.log(err)
   }
   }
  };
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate=()=>{
    var err={}
    if(!form.name.trim())
      err.name="Name is required"
    if(!form.password.trim())
      err.password="Password is required"
    else if(form.password.length<8)
      err.password="Password must be graer than 8 character"
      if(!form?.email.trim())
    {
      err.email="eamil is required"
    }
   else if(!emailCheck.test(form.email))
    {
      err.email="Enter a valid email"
    }
    setErr(err)

    console.log(err)
    return err
    }

    const validate2=()=>{
    var err={}
 
    if(!login.password.trim())
      err.password="Password is required"
    else if(login.password.length<8)
      err.password="Password must be graer than 8 character"
      if(!login?.email.trim())
    {
      err.email="eamil is required"
    }
   else if(!emailCheck.test(login.email))
    {
      err.email="Enter a valid email"
    }
    setErr(err)

    console.log(err)
    return err
    }
    const handleLogin=async(e)=>{
 e.preventDefault()
 if(Object.keys(validate2()).length==0)
 {
   try{
    const res=await fetch(`${url}/login`,{
       method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {
    email: login.email,
    password: login.password,
  })
    })
    const data=await res.json()
    console.log(data)
    if(data.status)
    {
      toast.success(data?.message || "Rgisterd Successfully")
     // setLoginForm(true)
      setLogin({ name: "", email: "", password: "" })
      if(data.user.role=="admin")
      {
         localStorage.setItem("admin-token",JSON.stringify(data.token))
         nav("/admin")
      }
      else
      localStorage.setItem("token",JSON.stringify(data.token))
      localStorage.setItem("user",JSON.stringify(data.user))
      
    }
    else {
      toast.error(data.message || "Something went wrong")
    }
   }
   catch(err)
   {
    console.log(err)
   }
 }
    }

    const changeForm=()=>{
      setErr({})
      setLogin({email:"",password:""})
      setForm({email:"",password:"",name:""})
      setLoginForm(!loginForm)
    }

  return (
     <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 380,
          borderRadius: 4,
          backdropFilter: "blur(14px)",
         backgroundColor: "#ebe9e9ff",
color: "white",
         
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          sx={{ mb: 2, letterSpacing: 1 }}
        >
          {loginForm? "Login":"Register"}
        </Typography>
  {
    loginForm ? 
      <form onSubmit={handleLogin} >
          {/* Email */}
          <TextField
            variant="outlined"
            label="Email Address"
            name="email"
            InputLabelProps={{ style: { color: "black" } }}
            InputProps={{
              style: { color: "black" },
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "black" }} />
                </InputAdornment>
              ),
            }}
            fullWidth
            margin="normal"
            value={login.email}
            onChange={handleChange1}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor:"black" },
                "&:hover fieldset": { borderColor: "black" },
              },
            }}
          />
            {err.email && (
    <Typography variant="span" sx={{ mb: 1, color: "red" }}>
      {err.email}
    </Typography>
  )}

          {/* Password */}
          <TextField
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            InputLabelProps={{ style: { color: "black" } }}
            InputProps={{
              style: { color: "black" },
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "black" }} />
                </InputAdornment>
              ),
            }}
            fullWidth
            margin="normal"
            value={login.password}
            onChange={handleChange1}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black" },
                "&:hover fieldset": { borderColor: "black" },
              },
            }}
          />
            {err.password && (
    <Typography variant="span" sx={{ mb: 1, color: "red" }}>
      {err.password}
    </Typography>
  )}
            <Box textAlign="center" mt={2}>
  <Button
    variant="text"
    onClick={() => changeForm()}
    sx={{
      textTransform: "none",
      fontSize: "15px",
      color: "black",
      fontWeight: 500,
      '&:hover': {
        textDecoration: "underline",
        color: "black",
        backgroundColor: "transparent",
      },
    }}
  >
    {loginForm ? "Don't have an account? Register" : "Already registered? Login"}
  </Button>
</Box>

          {/* Button */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              mt: 3,
              py: 1.3,
              fontWeight: "bold",
              borderRadius: 3,
              background: "black",
              "&:hover": { opacity: 0.9 },
            }}
          >
            Create Account
          </Button>
        </form>
        : <form onSubmit={handleSubmit2}>
  {/* Name */}
  <TextField
    variant="outlined"
    label="Full Name"
    type="text"
    name="name"
    InputLabelProps={{ style: { color: "black" } }}
    InputProps={{
      style: { color: "black" },
      startAdornment: (
        <InputAdornment position="start">
          <PersonIcon sx={{ color: "black" }} />
        </InputAdornment>
      ),
    }}
    fullWidth
    margin="normal"
    value={form.name}
    onChange={handleChange}
    sx={{
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "black" },
        "&:hover fieldset": { borderColor: "black" },
      },
    }}
  />

  {err.name && (
    <Typography variant="span" sx={{ mb: 1, color: "red" }}>
      {err.name}
    </Typography>
  )}

  {/* Email */}
  <TextField
    variant="outlined"
    label="Email Address"
    name="email"
    InputLabelProps={{ style: { color: "black" } }}
    InputProps={{
      style: { color: "black" },
      startAdornment: (
        <InputAdornment position="start">
          <EmailIcon sx={{ color: "black" }} />
        </InputAdornment>
      ),
    }}
    fullWidth
    margin="normal"
    value={form.email}
    onChange={handleChange}
    sx={{
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "black" },
        "&:hover fieldset": { borderColor: "black" },
      },
    }}
  />

  {err.email && (
    <Typography variant="span" sx={{ mb: 1, color: "red" }}>
      {err.email}
    </Typography>
  )}

  {/* Password */}
  <TextField
    variant="outlined"
    label="Password"
    name="password"
    type="password"
    InputLabelProps={{ style: { color: "black" } }}
    InputProps={{
      style: { color: "black" },
      startAdornment: (
        <InputAdornment position="start">
          <LockIcon sx={{ color: "black" }} />
        </InputAdornment>
      ),
    }}
    fullWidth
    margin="normal"
    value={form.password}
    onChange={handleChange}
    sx={{
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "black" },
        "&:hover fieldset": { borderColor: "black" },
      },
    }}
  />

  {err.password && (
    <Typography variant="span" sx={{ mb: 1, color: "red" }}>
      {err.password}
    </Typography>
  )}

  {/* Switch Login/Register */}
  <Box textAlign="center" mt={2}>
    <Button
      variant="text"
      onClick={() => changeForm()}
      sx={{
        textTransform: "none",
        fontSize: "15px",
        color: "black",
        fontWeight: 500,
        "&:hover": {
          textDecoration: "underline",
          color: "black",
        },
      }}
    >
      {loginForm
        ? "Don't have an account? Register"
        : "Already registered? Login"}
    </Button>
  </Box>

  {/* Submit Button */}
  <Button
    type="submit"
    variant="contained"
    size="large"
    fullWidth
    sx={{
      mt: 3,
      py: 1.3,
      fontWeight: "bold",
      borderRadius: 2,
      backgroundColor: "black",
      color: "white",
      "&:hover": { backgroundColor: "#333" },
    }}
  >
    Create Account
  </Button>
</form>

  }
      
      </Paper>
      <ToastContainer/>
      
    </Box>
  );
}

export default Form;
