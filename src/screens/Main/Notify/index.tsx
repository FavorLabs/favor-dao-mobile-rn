import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, FlatListProps, Image, TouchableOpacity} from 'react-native';
import {NotifyTopTabNavigator} from "../../../navigation/TopTabBar";
import {Color, FontFamily, FontSize, Padding} from "../../../GlobalStyles";
import BackgroundSafeAreaView from "../../../components/BackgroundSafeAreaView";
import NotifyApi from "../../../services/DAOApi/Notify";
import {useResourceUrl, useUrl} from "../../../utils/hook";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {NotifyGroup, SystemNotify} from "../../../declare/api/DAOApi";
import {getTime} from "../../../utils/util";
import {Icon} from '@rneui/themed'
import SvgIcon from "../../../components/SvgIcon";
import UnionSvg from "../../../assets/svg/union.svg"
import {StackNavigationProp} from "@react-navigation/stack";
import Screens from "../../../navigation/RouteNames";
import Toast from "react-native-toast-message";
import {useDispatch, useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";
import {updateState as globalUpdateState} from "../../../store/notify";

const NotifyScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch();
  const url = useUrl()
  const resourceUrl = useResourceUrl('avatars');
  const [list, setList] = useState<NotifyGroup[]>([]);
  const [systemList, setSystemList] = useState<SystemNotify[]>([]);
  const { delFromId } = useSelector((state: Models) => state.notify);

  const getNotifyGroup = async () => {
    try {
      const {data} = await NotifyApi.getNotifyGroup(url)
      console.log(data.data?.list,'notifyGroup')
      if (data.data?.list) {
        setList(data.data?.list)
      }
    }catch (e) {
      if(e instanceof Error) {
        Toast.show({
          type: 'error',
          text1: e.message
        })
      }
    }
  }

  const getSystemGroup = async () => {
    const {data} = await NotifyApi.getNotifyOrgan(url)
    if (data.data?.list) {
      setSystemList(data.data?.list)
    }
  }

  const delFromIdList = (delId: string) => {
    const delList = list.filter(item => item.fromInfo.id !== delId);
    setList(delList);
    dispatch(globalUpdateState({
      delFromId: '',
    }));
  }

  useFocusEffect(
    useCallback(() => {
      getNotifyGroup();
      getSystemGroup()
    }, [])
  )

  // useEffect(() => {
  //   getNotifyGroup();
  //   getSystemGroup()
  // }, []);

  useEffect(() => {
    console.log(delFromId,'delId')
    if(delFromId) delFromIdList(delFromId);
  },[delFromId])

  const gotoNotifications = (params: NotifyGroup['fromInfo'] & { isSystem?: boolean }) => {
    navigation.navigate(Screens.Notifications, params)
  }

  return (
    <BackgroundSafeAreaView showFooter={false} headerStyle={{backgroundColor: Color.whitesmoke_300}}>
      <View style={styles.container}>
        <View style={styles.frameParent}>
          <Text style={styles.title}>Notifications</Text>
          <View style={styles.systemBox}>
            {
              systemList.map(item => (
                <TouchableOpacity key={item.id} style={{alignItems: 'center'}} onPress={() => {
                  gotoNotifications({
                    id: item.id,
                    name: item.name,
                    avatar: item.avatar,
                    isSystem: item.key === 'sys'
                  })
                }}>
                  <View style={styles.iconBox}>
                    <SvgIcon svg={<UnionSvg/>}/>
                    {
                      !!item.unreadCount && <View style={styles.unread}></View>
                    }
                  </View>
                  <Text style={styles.iconText}>{item.name}</Text>
                </TouchableOpacity>
              ))
            }

          </View>
        </View>
        <View style={styles.list}>
          <Text style={styles.text}>Message list</Text>
          <FlatList data={list}
                    renderItem={({item}) => (
                      <View style={[styles.notifyBox, styles.flexRC]}>
                        <View style={styles.notifyLeft}>
                          <Image
                            style={styles.avatar}
                            source={{
                              uri: `${resourceUrl}/${item.fromInfo.avatar}`
                            }}
                          />
                        </View>
                        <View style={styles.notifyRight}>
                          <View style={[styles.infoTop, styles.flexRC]}>
                            <Text style={styles.name}>{item.fromInfo.name}</Text>
                            <Text style={styles.time}>{getTime(item.createdAt)}</Text>
                          </View>
                          <View style={styles.flexRC}>
                            <Text style={styles.content}>{item.content}</Text>
                            <View style={styles.flexRC}>
                              {
                                !!item.unreadCount && <Text style={styles.unReadCount}>
                                      +{item.unreadCount}
                                  </Text>
                              }
                              <TouchableOpacity onPress={() => {
                                gotoNotifications(item.fromInfo)
                              }}>
                                <Icon color={Color.color4} name={'chevron-right'} type={'material'}/>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                    keyExtractor={item => item.fromInfo.id}
          />
        </View>
      </View>
    </BackgroundSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  frameParent: {
    backgroundColor: Color.whitesmoke_300,
  },
  title: {
    fontSize: FontSize.size_15xl,
    fontWeight: '700',
    color: Color.iOSSystemLabelsLightPrimary,
    textAlign: "left",
    paddingBottom: Padding.p_3xs,
    paddingHorizontal: Padding.p_base,
  },
  systemBox: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: Color.color1,
    position: "relative"
  },
  unread: {
    position: 'absolute',
    top: 0,
    right: 5,
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: Color.color
  },
  iconText: {
    fontSize: FontSize.size_mini,
    fontWeight: '500',
    lineHeight: 23,
    color: '#000',
    letterSpacing: -0.4,
    marginTop: Padding.p_9xs
  },
  list: {
    flex: 1,
    paddingHorizontal: Padding.p_base,
  },
  text: {
    fontSize: FontSize.size_mini,
    lineHeight: 23,
    color: Color.color4,
    letterSpacing: -0.4,
    marginVertical: Padding.p_3xs
  },
  notifyBox: {
    // paddingVertical: 12,
  },
  flexRC: {
    flexDirection: 'row',
    alignItems: "center"
  },
  notifyLeft: {
    marginRight: Padding.p_5xs,
  },
  notifyRight: {
    flex: 1,
    marginVertical: Padding.p_3xs,
    paddingBottom: Padding.p_xs,
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderBottomColor: '#c1c1c4'
  },
  infoTop: {
    marginBottom: Padding.p_9xs,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  name: {
    flex: 1,
    fontWeight: "500",
    fontSize: FontSize.size_mid,
    lineHeight: 23,
    letterSpacing: -0.4,
    color: '#000',
    overflow: "hidden",
    marginRight: 10
  },
  time: {
    fontWeight: '500',
    fontSize: FontSize.paragraphP313_size,
    lineHeight: 18,
    color: Color.iOSSystemTintsDisableLight
  },
  content: {
    flex: 1,
    overflow: "hidden",
    fontWeight: '400',
    fontSize: FontSize.size_mid,
    lineHeight: 23,
    letterSpacing: -0.4,
    color: Color.iOSSystemTintsDisableLight,
    marginRight: 10
  },
  unReadCount: {
    backgroundColor: Color.color,
    color: Color.color1,
    borderRadius: 7,
    fontSize: FontSize.capsCaps310SemiBold_size,
    lineHeight: 14,
    paddingHorizontal: 4
  }
});

export default NotifyScreen;
