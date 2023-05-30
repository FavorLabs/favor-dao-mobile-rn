import * as React from "react";
import {FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";
import {DaoInfo} from "../declare/api/DAOApi";
import {useResourceUrl} from "../utils/hook";
import {getDebounce, sleep} from "../utils/util";

type Props = {
  bookmarkList: DaoInfo[];
  handleLoadMore: () => void;
  refreshPage: () => void;
  activeId: string;
  setActiveId: (id: string) => void;
};
const FollowDAOHeader: React.FC<Props> = (props) => {
  const { activeId, setActiveId,refreshPage,handleLoadMore,bookmarkList } = props;
  const avatarsResUrl = useResourceUrl('avatars');
  const [refreshing, setRefreshing] = React.useState(false);

  const onPress = (id: string) => {
    if(id !== activeId){
      setActiveId(id);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await sleep(1000);
    setRefreshing(false);
    await refreshPage();
  };

  // @ts-ignore
  const RenderItem = ({ item }) => {
    return (
      // @ts-ignore
      <TouchableOpacity onPress={() => onPress(item.id)}>
        <View style={styles.block}>
          <Image
            style={[styles.image, item.id === activeId && styles.activeImg]}
            resizeMode="cover"
            source={{uri: `${avatarsResUrl}/${item.avatar}`}}
          />
          <Text style={[styles.text]} numberOfLines={1}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.followDaoHeader}>
      <FlatList
        data={bookmarkList}
        // @ts-ignore
        renderItem={({ item }) => <RenderItem item={item}/>}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.flautist}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flautist: {
    alignItems: 'center',
    width: '100%',
  },
  block: {
    marginBottom: 10,
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,

  },
  activeImg: {
    borderWidth: 2,
    borderColor: 'orange',
  },
  text: {
    fontSize: FontSize.size_mini,
    fontWeight: "500",
    color: Color.gray_200,
    textAlign: "center",
    lineHeight: 20,
  },
  followDaoHeader: {
    width: 76,
    justifyContent: 'center',
    backgroundColor: Color.color1,
    flexDirection: "column",
    paddingHorizontal: 5,
  },
});

export default FollowDAOHeader;
