import { Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import AnimatedButton from "./AnimatedButton";
import { UserContext } from "../contexts/UserContext";
import { supabase } from "../utils/supabase";

export default function AddFriendButton({
  friend_id,
  buttonRefresh,
  setButtonRefresh,
}) {
  const { user } = useContext(UserContext);
  const [friendshipStatus, setFriendshipStatus] = useState(null);
  const [requested, setRequested] = useState(false);

  const fetchFriendshipStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("friends")
        .select("status")
        .or(
          `and(user_id.eq.${user.id},friend_id.eq.${friend_id}),and(user_id.eq.${friend_id},friend_id.eq.${user.id})`
        )
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching friendship status:", error);
      } else {
        setFriendshipStatus(data?.status || null);
      }
    } catch (error) {
      console.error("Error in fetchFriendshipStatus:", error);
    }
  };
  const fetchRequested = async () => {
    try {
      const { data, error } = await supabase
        .from("friends")
        .select("status")
        .eq("user_id", friend_id)
        .eq("friend_id", user.id)
        .eq("status", "pending")
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching requested status:", error);
      } else {
        setRequested(!!data); // Set requested to true if data exists
      }
    } catch (error) {
      console.error("Error in fetchRequested:", error);
    }
  };

  useEffect(() => {
    if (buttonRefresh) {
      (async () => {
        await fetchFriendshipStatus();
        await fetchRequested();
      })();
      setButtonRefresh(false);
    }
  }, [buttonRefresh, friendshipStatus, requested]);

  useEffect(() => {
    fetchFriendshipStatus();
    fetchRequested();
  }, [friend_id]);

  const handleAddFriend = async () => {
    try {
      const { error } = await supabase
        .from("friends")
        .upsert(
          { user_id: user.id, friend_id, status: "pending" },
          { onConflict: ["user_id", "friend_id"] }
        );

      if (error) {
        console.error("Error adding friend:", error);
      } else {
        setFriendshipStatus("pending");
      }
    } catch (error) {
      console.error("Error in handleAddFriend:", error);
    }
  };
  const handleAcceptFriendRequest = async () => {
    try {
      const { error } = await supabase
        .from("friends")
        .update({ status: "accepted" })
        .eq("user_id", friend_id)
        .eq("friend_id", user.id);

      if (error) {
        console.error("Error accepting friend request:", error);
      } else {
        setFriendshipStatus("accepted");
        setRequested(false);
      }
      await fetchFriendshipStatus(); // Ensure status is refreshed
    } catch (error) {
      console.error("Error in handleAcceptFriendRequest:", error);
    }
  };
  const handleRemoveFriend = async () => {
    try {
      const { error } = await supabase
        .from("friends")
        .delete()
        .or(
          `and(user_id.eq.${user.id},friend_id.eq.${friend_id}),and(user_id.eq.${friend_id},friend_id.eq.${user.id})`
        );

      if (error) {
        console.error("Error removing friend:", error);
      } else {
        setFriendshipStatus(null);
      }
      await fetchFriendshipStatus(); // Ensure status is refreshed
    } catch (error) {
      console.error("Error in handleRemoveFriend:", error);
    }
  };

  return (
    <AnimatedButton
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
      }}
      onPress={
        friendshipStatus === "accepted"
          ? handleRemoveFriend
          : friendshipStatus === "pending"
          ? () => {}
          : requested
          ? handleAcceptFriendRequest
          : handleAddFriend
      }
      buttonScale={friendshipStatus === "pending" ? 1 : 0.75}
      disabled={friendshipStatus === "pending"}
    >
      <View
        style={{
          height: 40,
          width: "90%",
          borderRadius: 100,
          backgroundColor:
            friendshipStatus === "accepted"
              ? "#b01717"
              : friendshipStatus === "pending"
              ? "#888"
              : requested
              ? "#4CAF50"
              : "#000",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>
          {friendshipStatus === "accepted"
            ? "Remove Friend"
            : friendshipStatus === "pending"
            ? "Pending"
            : requested
            ? "Accept Friend Request"
            : "Add Friend"}
        </Text>
      </View>
    </AnimatedButton>
  );
}
