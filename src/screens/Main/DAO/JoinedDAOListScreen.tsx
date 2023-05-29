import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { Border, Color, FontFamily, FontSize, Padding } from "../../../GlobalStyles";
import FollowDAOHeader from "../../../components/FollowDAOHeader";
import PublishContainer from "../../../components/PublishContainer";
import Chats from "../../../components/Chats";
import {DaoInfo, Page, Post} from "../../../declare/api/DAOApi";
import DaoApi from "../../../services/DAOApi/Dao";
import {useUrl} from "../../../utils/hook";
import DaoCardItem from "../../../components/DaoCardItem";
import {useDispatch, useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";
import NoDataShow from "../../../components/NoDataShow";
import {updateState as globalUpdateState} from "../../../store/global";
import {useIsFocused} from "@react-navigation/native";
import {getContent, getTime} from "../../../utils/util";
import Toast from "react-native-toast-message";

export type Props = {};
const JoinedDAOListScreen: React.FC<Props> = (props) => {
  const url = useUrl();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { dao, joinStatus } = useSelector((state: Models) => state.global);

  const [bookmarkList, setBookmarkList] = useState<DaoInfo[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [daoPageData, setDaoPageData] = useState<Page>({
    page: 1,
    page_size: 10,
  });

  const [activeId, setActiveId] = useState<string>('');
  const [btnLoading,setBtnLoading] = useState<boolean>(false);

  const getBookmarkList = async () => {
    try {
      const { data } = await DaoApi.getBookmarkList(url, daoPageData);
      if(data.data?.list) {
        const newsData = data.data.list;
        const otherItems: DaoInfo[] = newsData.filter(item => item.id !== dao?.id);
        setBookmarkList(() => [...bookmarkList,...otherItems]);
      }
      setIsLoadingMore(
        data.data.pager.total_rows > daoPageData.page * daoPageData.page_size,
      );
      setDaoPageData((daoPageData) => ({ ...daoPageData, page: ++daoPageData.page }));
    } catch (e){
      if (e instanceof Error) console.error(e.message);
    }
  };

  const refreshList = async () => {
    const pageData = { page: 1, page_size: 10,}
    try {
      const { data } = await DaoApi.getBookmarkList(url, pageData);
      if(data.data?.list) {
        const newsData = data.data.list.map(item=>({...item,is_joined:true}));
        const firstItem: DaoInfo | null = dao;
        const otherItems: DaoInfo[] = newsData.filter(item => item?.id !== dao?.id);
        let sortedData: DaoInfo[] = [];
        if(firstItem) {
          sortedData = [firstItem, ...otherItems];
        } else {
          sortedData = [...otherItems];
        }
        await setBookmarkList([...sortedData]);
        setActiveId(sortedData[0] ? sortedData[0].id : '');
      }
      setIsLoadingMore(
        data.data.pager.total_rows > pageData.page * pageData.page_size,
      );
      setDaoPageData((daoPageData) => ({ ...daoPageData, page: 2 }));
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  }

  const handleLoadMore = () => {
    if (isLoadingMore) {
      getBookmarkList();
    }
  };

  const bookmarkHandle = async () => {
    if(btnLoading) return;
    try {
      setBtnLoading(true);
      const { data } = await DaoApi.bookmark(url, activeId);
      if(data.data) {
        await refreshList();
        setActiveId('');
      }
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    } finally {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
      if(bookmarkList.length > 0 && !activeId){
        setActiveId(bookmarkList[0].id)
      }
  },[bookmarkList,activeId]);

  const daoInfo = useMemo(()=> activeId ? bookmarkList.find(obj => obj.id === activeId):null,[activeId])

  useEffect(() => {
    if (isFocused && joinStatus) {
      refreshList();
      dispatch(globalUpdateState({
        joinStatus: false
      }))
    }
  },[isFocused])

  useEffect(() => {
    refreshList();
  },[])

  return (
    <View style={[styles.followeddao]}>
      {
        bookmarkList.length ?
          <View style={styles.frameParentFlexBox}>
            <FollowDAOHeader
              bookmarkList={bookmarkList}
              handleLoadMore={handleLoadMore}
              refreshPage={refreshList}
              activeId={activeId}
              setActiveId={setActiveId}
            />
            <ScrollView>
              {
                daoInfo &&
                  <View style={styles.daoDetail}>
                      <DaoCardItem daoInfo={daoInfo} handle={bookmarkHandle} joinStatus={true} btnLoading={btnLoading}/>
                      <View style={styles.channelsofdao}>
                          <PublishContainer daoInfo={daoInfo}/>
                          <Chats daoInfo={daoInfo}/>
                      </View>
                  </View>
              }
            </ScrollView>
          </View>
          :
          <NoDataShow/>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  daoJoinedBriefLayout: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.color1,
    alignSelf: "stretch",
  },
  frameParentFlexBox: {
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  subtitleTypo: {
    fontWeight: '400',
    fontSize: FontSize.size_mini,
    textAlign: "left",
    letterSpacing: 0,
  },
  title: {
    fontSize: FontSize.size_mid,
    lineHeight: 23,
    fontWeight: "600",
    width: 114,
    textAlign: "left",
    color: Color.iOSSystemLabelsLightPrimary,
    letterSpacing: 0,
  },
  subtitle: {
    lineHeight: 20,
    color: Color.iOSSystemLabelsLightSecondary,
    marginTop: 3,
    width: 114,
  },
  label1: {
    fontSize: FontSize.paragraphP313_size,
    lineHeight: 18,
    fontWeight: "500",
    color: Color.color2,
    textAlign: "center",
    letterSpacing: 0,
  },
  label: {
    borderRadius: Border.br_base,
    backgroundColor: Color.darkorange_100,
    paddingHorizontal: Padding.p_2xs,
    paddingVertical: Padding.p_8xs,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  labelWrapper: {
    alignItems: "flex-end",
    // marginLeft: 119,
    justifyContent: "center",
    // flex: 1,
  },
  frameParent: {
    alignItems: "center",
  },
  description: {
    lineHeight: 21,
    color: Color.iOSSystemLabelsLightPrimary,
    fontWeight: '400',
    fontSize: FontSize.size_mini,
    flex: 1,
  },
  ellipseParent: {
    paddingHorizontal: Padding.p_base,
    paddingBottom: Padding.p_base,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  daoJoinedBrief: {
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 16,
    elevation: 16,
    shadowOpacity: 1,
  },
  channelsofdao: {
    padding: Padding.p_xs,
    alignItems: "center",
    backgroundColor: Color.color1,
  },
  daoDetail: {
    paddingHorizontal: Padding.p_xs,
    paddingVertical: 0,
    backgroundColor: Color.color1,
  },
  followeddao: {
    flex: 1,
    backgroundColor: Color.color1,
  },
});

export default JoinedDAOListScreen;
