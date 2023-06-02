import React, {useCallback, useState} from 'react';
import {Notify, NotifyGroup, Page} from "../declare/api/DAOApi";
import BackgroundSafeAreaView from "../components/BackgroundSafeAreaView";
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import NotifyApi from "../services/DAOApi/Notify";
import {useResourceUrl, useUrl} from "../utils/hook";
import SvgIcon from "../components/SvgIcon";
import DeleteSvg from "../assets/svg/deleteIcon.svg";
import {Color} from "../GlobalStyles";
import {getTime} from "../utils/util";
import Toast from "react-native-toast-message";
import {StackNavigationProp} from "@react-navigation/stack";
import {useDispatch, useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import {updateState as globalUpdateState} from "../store/notify";
import {iteratee} from "lodash";

const NotificationsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute();
  const url = useUrl();
  const {id, avatar, name, isSystem} = route.params as NotifyGroup['fromInfo'] & { isSystem?: boolean }
  const [notifyList, setNotifyList] = useState<Notify[]>();
  const resourceUrl = useResourceUrl('avatars');
  const { delFromId } = useSelector((state: Models) => state.notify);
  const [pageInfo, setPageInfo] = useState<Page>({
    page: 1,
    page_size: 10,
  });

  const getNotify = async () => {
    try {
      const {data} = isSystem ? await NotifyApi.getNotifySys(url, id, pageInfo) : await NotifyApi.getNotifyFromId(url, id, pageInfo);
      console.log(data,'getNotify')
      if(data.data.list){
        setNotifyList(data.data.list);
      }
    } catch (e) {
      if(e instanceof Error) {
        Toast.show({
          type: 'error',
          text1: e.message
        })
      }
    }
  }

  const readNotify = async () => {
    try {
      await NotifyApi.readNotifyFromId(url, id);
    } catch (e) {
      if(e instanceof Error) {
        Toast.show({
          type: 'error',
          text1: e.message
        })
      }
    }
  }

  const delNotify = async () => {
    try {
     const {data} = await NotifyApi.delNotifyAll(url, id);
      if(data.data) {
        setNotifyList([]);
        navigation.goBack();
        dispatch(globalUpdateState({
          delFromId: id,
        }));
      }
    } catch (e) {
      if(e instanceof Error) {
        Toast.show({
          type: 'error',
          text1: e.message
        })
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      getNotify();
      readNotify()
    }, [])
  )

  return <BackgroundSafeAreaView headerStyle={{backgroundColor: Color.color2}}>
    <View style={styles.container}>
      <View style={styles.header}>
        <FavorDaoNavBar title={'Andrew parker'} rightComponent={
          <TouchableOpacity style={styles.right} onPress={delNotify}>
            <SvgIcon svg={<DeleteSvg/>}/>
          </TouchableOpacity>
        }/>
      </View>
      <FlatList
        data={notifyList}
        renderItem={({item}) => (
          <View>
            <Text style={styles.time}>
              {getTime(Number(item.createdAt))}
            </Text>
            <View style={styles.notifyRow}>
              <Image
                style={styles.avatar}
                source={{
                  uri: `${resourceUrl}/${avatar}`
                }}
              />
              <View style={styles.notifyContent}>
                <Text style={styles.text}>{item.content}</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item: Notify) => item.id}
        style={styles.flatList}
      />
    </View>
  </BackgroundSafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.color1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Color.color2
  },
  right: {
    width: 38,
    height: 38,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.color1,
  },
  flatList: {
    paddingHorizontal: 7,
    paddingVertical: 20,
  },
  time: {
    textAlign: 'center',
    marginTop: 13,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  notifyRow: {
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'center',
  },
  notifyContent: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f4f4f5',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 16,
  },
  text: {
    fontWeight: '400',
    fontSize: 16,
    color: '#000000',
  }
})

export default NotificationsScreen;
