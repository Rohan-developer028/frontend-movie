import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  CircularProgress,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../components/Header";

const fallbackPoster =
  "https://via.placeholder.com/300x450?text=No+Poster";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // 🔍 Search & Sort
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");
  const [err,setErr]=useState({})

  

  const fetchMovies = async () => {
    try {
      setLoading(true);


      const url = `${process.env.REACT_APP_API_URL}/movies/search/sort?q=${search}&sortBy=${sortBy}&order=${order}&page=${
        page + 1
      }&limit=${rowsPerPage}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.status) {
        setMovies(data.movies);
        setTotal(data.totalCount);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const timer = setTimeout(fetchMovies, 400);
    return () => clearTimeout(timer);
  }, [search, sortBy, order, page, rowsPerPage]);

  return (
<>
     <Header/>

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        px: { xs: 2, md: 5 },
        py: 4,
        background: "#fafafa",
        minHeight: "100vh",
      }}
    >
      {/* Header */}

    <Box
  sx={{
    mb: 5,
    p: 2.5,
    borderRadius: 4,
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    display: "flex",
    gap: 2,
    alignItems: "center",
    flexWrap: "wrap",
  }}
>
  {/* 🔍 Search */}
  <TextField
    fullWidth
    placeholder="Search movies, actors, keywords..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setPage(0);
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon sx={{ color: "#6b7280" }} />
        </InputAdornment>
      ),
    }}
    sx={{
      flex: 1,
      "& .MuiOutlinedInput-root": {
        borderRadius: 3,
        backgroundColor: "#fff",
      },
    }}
  />

  {/* Sort By */}
  <TextField
    select
    label="Sort By"
    value={sortBy}
    onChange={(e) => {
      setSortBy(e.target.value);
      setPage(0);
    }}
    sx={{
      minWidth: 160,
      "& .MuiOutlinedInput-root": {
        borderRadius: 3,
        backgroundColor: "#fff",
      },
    }}
  >
    <MenuItem value="title">Name</MenuItem>
    <MenuItem value="rating">Rating</MenuItem>
    <MenuItem value="releaseDate">Release Date</MenuItem>
    <MenuItem value="duration">Duration</MenuItem>
  </TextField>

  {/* Order */}
  <TextField
    select
    label="Order"
    value={order}
    onChange={(e) => {
      setOrder(e.target.value);
      setPage(0);
    }}
    sx={{
      minWidth: 140,
      "& .MuiOutlinedInput-root": {
        borderRadius: 3,
        backgroundColor: "#fff",
      },
    }}
  >
    <MenuItem value="asc">Ascending</MenuItem>
    <MenuItem value="desc">Descending</MenuItem>
  </TextField>
</Box>

 <Typography variant="h4" fontWeight={700}>
        Movies
      </Typography>
      <Typography color="text.secondary" mb={3}>
        Browse top rated movies
      </Typography>
      {/* Loader */}
      {loading ? (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container sx={{justifyContent:"center"}}  spacing={4}>
          {movies.map((movie) => (
            <Grid  item xs={12} sm={6} md={4} lg={4} key={movie._id} >
              <Card
                sx={{
                  borderRadius: 4,
                  height: "100%",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                  transition: "all .3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
                  },
                }}
              >
             <CardMedia
  component="img"
  image={movie.poster || fallbackPoster}
  alt={movie.title}
  onError={(e) => {
    e.target.src = fallbackPoster;
  }}
  sx={{
    height: 320,
    width: "100%",
    objectFit: "cover", // keeps aspect ratio, crops if needed
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    aspectRatio:"image"
  }}
/>

                <CardContent>
                  <Stack spacing={1}>
                    <Typography fontWeight={600} noWrap>
                      {movie.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {movie.description?.slice(0, 70)}...
                    </Typography>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={1}
                    >
                      <Chip
                        label={`⭐ ${movie.rating}`}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          backgroundColor: "#fff3cd",
                        }}
                      />

                      <Button
                        variant="text"
                        size="small"
                        sx={{
                          textTransform: "none",
                          fontWeight: 600,
                        }}
                      >
                        View →
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      <Box mt={4}>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[6, 12, 24]}
        />
      </Box>
    </Box>
    </>
  );
};

export default Home;
