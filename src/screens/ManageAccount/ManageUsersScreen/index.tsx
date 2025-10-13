import { StyleSheet, View } from "react-native";
import UserCard from "./UserCard";
import PopUpContainer from "@src/components/Containers/PopUpsContainer";
import AppSearchBar from "@src/components/AppSearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  adminState,
  updateSearchKeyword,
} from "@src/store/admin";
import UserCardList from "./UserCardList";
import useFetchUsers from "@src/hooks/adminHooks/useFetchUsers";
import FadeBackgroundView from "@src/components/Graphics/FadeBackgroundView";
import AppText from "@src/components/AppText";

const ManageUsersScreen = () => {
  const dispatch = useDispatch();
  const { searchKeyword, results } =
    useSelector(adminState);
  useFetchUsers();

  return (
    <PopUpContainer heading="test">
      <View style={styles.container}>
        <FadeBackgroundView>
          <AppText style={{ fontSize: 12, paddingTop: 5 }}>
            {results}
          </AppText>
          <View style={styles.searchBarContainer}>
            <AppSearchBar
              searchKeyword={searchKeyword}
              setSearchKeyword={(value: string) =>
                dispatch(updateSearchKeyword(value))
              }
            />
          </View>
        </FadeBackgroundView>
      </View>
      <UserCardList />
    </PopUpContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    // This "double view" is necessary. container has no
    // height but sets the position of the absolute elements
    width: "100%",
    alignItems: "center",
    zIndex: 10,
  },
  searchBarContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
    paddingBottom: 10,
  },
});

export default ManageUsersScreen;
