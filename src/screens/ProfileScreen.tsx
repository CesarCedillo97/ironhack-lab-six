import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { logout } from "../services/AuthService";
import { getData, StorageKeys } from "../utils/storage";
import { Post, Profile, User } from "../services/types";
import getUserPosts from "../services/PostsService";

export default function ProfileScreen({ navigation }) {
  const [profile, setprofile] = useState<Profile | null>(null);
  const [userPosts, setuserPosts] = useState<Post[]>([]);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await getData<User>(StorageKeys.USER);
    if (userData) {
      setprofile(userData.profile);
      const userPosts = await getUserPosts();
      if (userPosts.success && userPosts.data) {
        setuserPosts(userPosts.data);
      } else {
        console.error("Error fetching user posts");
      }
    }
  };

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      navigation.replace("Login");
    }
  };

  const RenderPosts = () => {
    return userPosts.map((post) => (
      <View style={styles.postContainer} key={post.id}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postContent}>{post.content}</Text>
      </View>
    ));
  };
  return (
    <View>
      {profile && profile.name && (
        <>
          <Text>Nombre: {profile.name}</Text>
          <Text>Correo: {profile.email}</Text>
        </>
      )}
      {userPosts.length > 0 && <RenderPosts />}

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  postTitle: {
    fontWeight: "bold",
  },
  postContent: {
    marginTop: 5,
  },
});
