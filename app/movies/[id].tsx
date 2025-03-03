import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

export default function MovieDetailsScreen() {
  const movieId = useLocalSearchParams();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieDetails = async () => {
    try {
      console.log("movie detail fetch");
      console.log(movieId);
      const response = await fetch(
        `http://192.168.1.6:5001/api/v1/movie/${movieId.id}/details`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMovie(data.content);
      }
    } catch (error) {
      console.log("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load movie details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.original_title}</Text>
      <Text style={styles.description}>{movie.overview}</Text>
      <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  poster: {
    width: "100%",
    height: 400,
    borderRadius: 10,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    color: "gray",
    fontSize: 16,
    marginTop: 5,
  },
  releaseDate: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },
});
