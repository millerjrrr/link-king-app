import AppText from "@src/components/AppText";
import ListFooterComponent from "@src/components/ListFooterComponent";
import { adminState, updatePage } from "@src/store/admin";
import { FlatList, Platform, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";

const UserCardList = () => {
  const dispatch = useDispatch();
  const { users, page, allDataLoaded } =
    useSelector(adminState);

  const noUsers = "No users found";

  return users === null || users.length === 0 ? (
    <View
      style={{ flex: 1, paddingTop: 100, width: "80%" }}
    >
      <AppText>{noUsers}</AppText>
    </View>
  ) : (
    <>
      <FlatList
        data={[...users]}
        renderItem={({ item }) => {
          // must be called item for FlatList to work
          return <UserCard user={item} />;
        }}
        keyExtractor={(item) => item.email}
        style={{
          flex: 1,
          padding: 15,
          paddingTop: 100,
          width: "100%",
        }}
        onEndReached={() => {
          if (!allDataLoaded)
            dispatch(updatePage(page + 1));
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          ListFooterComponent({ active: !allDataLoaded })
        }
        showsVerticalScrollIndicator={Platform.OS !== "web"}
      />
    </>
  );
};

export default UserCardList;
