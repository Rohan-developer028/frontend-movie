import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
   Stack,
  Chip
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/ReactToastify.css"
import Pagination from "@mui/material/Pagination";
import Header from "../components/Header"


export default function AdminPage() {

  const [id, setId] = useState(null)
  const[openView,setOpenView]=useState(false)
  const handleView = (item) => {
    fetchMovieById(item._id)
    setOpenView(true)
  };
  const handleEdit = (item) => {
    fetchMovieById(item._id)
    setOpen(true)
    setId(item._id)
  };
  const handleDelete = async (id) =>{
    try{
      const res=await fetch(`${url}/movies/${id}`,{
        method:"DELETE",
        headers: { 'Content-Type': 'application/json',
                         Authorization: `${token || ""}`,
         },
      })
     const data=await res.json()
     if(data.status)
     {
      toast.success(data.message || "Movie Delted Sucessfully")
      fetchMovies()
     }else{
      toast.error(data.message || "Something went wrong")
     }
    }
    catch(err)
    {
      console.lor(err)
    }
  };

  const [movie, setMovie] = useState({
    title: "",
    poster: "",
    genre: "",
    rating: "",
    year: "",
    description: "",
  });
  const [open, setOpen] = useState(false)
  const [err,setErr]=useState({})
  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const url = process.env.REACT_APP_API_URL;
 const token = JSON.parse(localStorage.getItem("admin-token"))
console.log(token)
const validate=()=>{
  const err={}
if(!movie.title?.trim())
{
  err.title="Title is required"
}
if(!movie.poster?.trim())
{
  err.poster="Poster is required"
}
if(!movie.genre?.trim())
{
  err.genre="Genre is required"
}
if (!movie.rating?.toString().trim()) {
  err.rating = "Rating is required";
} else if (isNaN(movie.rating) || movie.rating < 0 || movie.rating > 10) {
  err.rating = "Rating must be between 1 and 20";
}
if(!movie.year?.trim())
{
  err.year="Year is required"
}
if(!movie.description?.trim())
{
  err.description="Description is required"
}
setErr(err)
return Object.keys(err).length==0?true:false


}
  const handleSubmit = async () => {
    if (validate()) {
      if (id) {
        try {
          const res = await fetch(`${url}/movies/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json',
               Authorization: `${token || ""}`,
             },
            body: JSON.stringify({
              title: movie.title,
              poster: movie.poster,
              genre: movie.genre,
              rating: movie.rating,
              year: movie.year,
              description: movie.description
            })
          })
          const data = await res.json()
          if (data.status) {
            toast.success(data.message || "Movie updated successfully")
            handleClose()
            fetchMovies()
          }
          else {
            toast.error(data.message || "Failed to update movie")
          }

        }
        catch (err) {
          console.log(err)
          toast.error("something went wrong")
        }
      }
      else {
        try {
          const res = await fetch(`${url}/movies`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json',
                Authorization: ` ${token || ""}`,
             },
            body: JSON.stringify({
              title: movie.title,
              poster: movie.poster,
              genre: movie.genre,
              rating: movie.rating,
              year: movie.year,
              description: movie.description
            })
          })
          const data = await res.json()
          if (data.status) {
            toast.success(data.message || "Movie added successfully")
            handleClose()
            fetchMovies()
            
          }
          else {
            toast.error(data.message || "Failed to add movie")
          }

        }
        catch (err) {
          console.log(err)
          toast.error("something went wrong")
        }
      }
    }

  };

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
      const fetchMovies = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/movies?search=${search}&sort=${sort}&page=${page}&limit=${limit}`
        );

        const data = await res.json();
        console.log(data.movies)
        setMovies(data.movies || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Movies fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchMovies();
  }, [search, sort, page, limit]);
  const fetchMovieById = async (id) => {
    try {
      const res = await fetch(
        `${url}/movies/${id}`
      );

      if (!res.status) {
        throw new Error("Movie not found");
      }

      const data = await res.json();
      setMovie(data.movie);

    } catch (err) {
      console.error(err);
    }
  };
  const handleClose = () => {
    setOpen(false)
    setId(null)
    setMovie({
      title: "",
      poster: "",
      genre: "",
      rating: "",
      year: "",
      description: "",
    })
  }

  return (
    <>
   <Header/>
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Admin Dashboard
      </Typography>

      {/* Top Action Button */}
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ mb: 3, backgroundColor: "black", "&:hover": { opacity: 0.9 } }}
      >
        Add New
      </Button>

      {/* Table */}
      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Ratings</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {movies.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.rating}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => handleView(item)}
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleEdit(item)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
  count={totalPages}
  page={page}
  onChange={(e, value) => setPage(value)}
  color="primary"
  sx={{ display: "flex", justifyContent: "end", py: 3 }}
/>

      </Paper>

      <Dialog open={open} onClose={() => handleClose()} fullWidth maxWidth="md">

        <DialogTitle> {id ? "Edit Detail" : "Add New Movie"}</DialogTitle>

        <DialogContent dividers>

          <TextField
            fullWidth
            label="Movie Title"
            name="title"
            margin="normal"
            value={movie.title}
            onChange={handleChange}
          />
            {err.title && (
              <Typography variant="span" sx={{ mb: 1, color: "red" }}>
                {err.title}
              </Typography>
            )}

          <TextField
            fullWidth
            label="Poster URL"
            name="poster"
            margin="normal"
            value={movie.poster}
            onChange={handleChange}
          />
           {err.poster && (
              <Typography variant="span" sx={{ mb: 1, color: "red" }}>
                {err.poster}
              </Typography>
            )}


          <TextField
            select
            fullWidth
            label="Genre"
            name="genre"
            margin="normal"
            value={movie.genre}
            onChange={handleChange}
          >
            <MenuItem value="Action">Action</MenuItem>
            <MenuItem value="Comedy">Comedy</MenuItem>
            <MenuItem value="Drama">Drama</MenuItem>
            <MenuItem value="Horror">Horror</MenuItem>
            <MenuItem value="Sci-Fi">Sci-Fi</MenuItem>
            <MenuItem value="Thriller">Thriller</MenuItem>
          </TextField>
           {err.genre && (
              <Typography variant="span" sx={{ mb: 1, color: "red" }}>
                {err.genre}
              </Typography>
            )}


          <TextField
            fullWidth
            label="Rating (0 - 10)"
            name="rating"
            type="number"
            margin="normal"
            value={movie.rating}
            onChange={handleChange}
          />
           {err.rating && (
              <Typography variant="span" sx={{ mb: 1, color: "red" }}>
                {err.rating}
              </Typography>
            )}


          <TextField
            fullWidth
            label="Release Year"
            name="year"
            type="number"
            margin="normal"
            value={movie.year}
            onChange={handleChange}
          /> {err.year && (
              <Typography variant="span" sx={{ mb: 1, color: "red" }}>
                {err.year}
              </Typography>
            )}


          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={3}
            margin="normal"
            value={movie.description}
            onChange={handleChange}
          />
           {err.description && (
              <Typography variant="span" sx={{ mb: 1, color: "red" }}>
                {err.description}
              </Typography>
            )}


        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="error">
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSubmit}>
            Add Movie
          </Button>
        </DialogActions>
      </Dialog>
        <Dialog
      open={openView}
      onClose={()=>setOpenView(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>
         {movie.title}
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={1.5}>
          <Typography>
            <b>Description:</b> {movie.description}
          </Typography>

          <Typography>
            <b>Rating:</b> {movie.rating}
          </Typography>

          {/* <Typography>
            <b>Duration:</b> {movie.duration} mins
          </Typography> */}

          <Typography>
            <b>Release Year:</b> {movie.year}
          </Typography>

          <Stack direction="row" spacing={1}>
            <Chip label={movie.genre} />
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={()=>setOpenView(false)} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
      <ToastContainer />
    </Box>
     </>
  );
}
