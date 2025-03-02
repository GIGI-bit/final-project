import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

interface Item {
  id: number;
  original_title: string;
  poster_path: string;
}

export default function DashboardScreen() {
  //
  const [data, setData] = useState<Item[]>([]);
  const [tvShows, setTvShows] = useState<Item[]>([]);
  const [mainPoster, setMainPoster] = useState("");

  const navigation = useNavigation<any>();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "http://192.168.1.6:5001/api/v1/movie/trending",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (response.ok) {
          const datas = await response.json();
          console.log(data);
          setData(datas.content);
          setMainPoster(datas.content[0].poster_path);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getTvShows = async () => {
      try {
        const response = await fetch(
          "http://192.168.1.6:5001/api/v1/tv/trending",
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
          setTvShows(data.content);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTvShows();
    getData();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: "center", position: "relative" }}>
        {mainPoster && (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${mainPoster}`,
            }}
            style={styles.mainPoster}
          />
        )}
      </View>
      <View style={{ marginBottom: 60 }}>
        <Text style={styles.flatListHeaders}>Trending Movies</Text>
        <FlatList
          ListEmptyComponent={<Text>No items available</Text>}
          keyExtractor={(item) => item.id.toString()}
          data={data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MovieDetails", { movieId: item.id })
              }
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
      <View style={{ marginBottom: 60 }}>
        <Text style={styles.flatListHeaders}>Trending TvShows</Text>
        <FlatList
          ListEmptyComponent={<Text>No items available</Text>}
          keyExtractor={(item) => item.id.toString()}
          data={tvShows}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MovieDetails", { movieId: item.id })
              }
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    // alignItems: "center",
    backgroundColor: "#000",
    paddingTop: 20,
  },
  mainPoster: {
    width: 300,
    height: 450,
    borderRadius: 10,
  },
  smallPosterContainer: {
    marginRight: 10,
  },
  smallPoster: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  flatListHeaders: {
    color: "white",
    margin: 3,
  },
});
