import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

interface Item {
  id: number;
  original_title: string;
  poster_path: string;
}

export default function SignInScreen() {
  //
  const [data, setData] = useState<Item[]>([]);
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
          const data = await response.json();
          console.log(data);
          setData(data.content);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);
  return (
    <View className="flex-1 justify-center items-center">
      <View>
        <Image />
      </View>
      <FlatList
        ListEmptyComponent={<Text>No items available</Text>}
        keyExtractor={(item) => item.id.toString()}
        data={data}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={{ width: 150, height: 225 }}
            />
            <Text className="text-white">{item.original_title}</Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
}
