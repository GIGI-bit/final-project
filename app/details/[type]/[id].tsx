import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { Item } from "@/app/dashboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MovieDetailsScreen() {
  const { id, type } = useLocalSearchParams();
  const [movie, setMovie] = useState<any>(null);
  const [similar, setSimilar] = useState<Item[]>([]);
  const [trailer, setTrailer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      return token;
    } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
    }
  };

  const fetchMovieDetails = async () => {
    try {
      console.log("movie detail fetch");
      console.log(id);
      const response = await fetch(
        `http://192.168.1.5:5001/api/v1/${type}/${id}/details`,
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

  const fecthTrailers = async () => {
    const accessToken = await getToken();
    try {
      const response = await fetch(
        `http://192.168.1.5:5001/api/v1/${type}/${id}/trailers`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTrailer(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSimilar = async () => {
    const accessToken = await getToken();
    try {
      console.log("movie detail fetch");
      console.log(id);
      const response = await fetch(
        `http://192.168.1.5:5001/api/v1/${type}/${id}/similar`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSimilar(data.content);
      }
    } catch (error) {
      console.log("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fecthTrailers();
    fetchMovieDetails();
    fetchSimilar();
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
      <View style={{ marginBottom: 60 }}>
        <Text style={styles.flatListHeaders}>Similar</Text>
        <FlatList
          ListEmptyComponent={<Text>No items available</Text>}
          keyExtractor={(item) => item.id.toString()}
          data={similar}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`./details/movie/${item.id}`)}
              style={styles.smallPosterContainer}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.smallPoster}
              />
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
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
  flatListHeaders: {
    color: "white",
    margin: 3,
  },
  smallPosterContainer: {
    marginRight: 10,
  },
  smallPoster: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
});
