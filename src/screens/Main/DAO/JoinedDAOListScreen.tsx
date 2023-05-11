import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { Border, Color, FontFamily, FontSize, Padding } from "../../../GlobalStyles";
import FollowDAOHeader from "../../../components/FollowDAOHeader";
import PublishContainer from "../../../components/PublishContainer";
import Chats from "../../../components/Chats";
import {DaoInfo, Page} from "../../../declare/global";
import DaoApi from "../../../services/DAOApi/Dao";
import {useUrl} from "../../../utils/hook";
import DaoCardItem from "../../../components/DaoCardItem";
import {useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";

export type Props = {};
const JoinedDAOListScreen: React.FC<Props> = (props) => {
  const url = useUrl();
  const { dao } = useSelector((state: Models) => state.global);

  const [bookmarkList, setBookmarkList] = useState<DaoInfo[]>([]);
  const [isJoin, setIsJoin] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [daoPageData, setDaoPageData] = useState<Page>({
    page: 1,
    page_size: 10,
  });

  // const daoId = '644b8ab03d02093d481d0658';

  const [daoInfo, setDaoInfo] = useState<DaoInfo>();
  // @ts-ignore
  const [activeId, setActiveId] = useState<string>('');

  const getBookmarkList = async () => {
    try {
      const { data } = await DaoApi.getBookmarkList(url, daoPageData);
      setBookmarkList(() => [...bookmarkList,...data.data?.list]);
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
      setBookmarkList(data.data?.list);
      setIsLoadingMore(
        data.data.pager.total_rows > pageData.page * pageData.page_size,
      );
      setDaoPageData((daoPageData) => ({ ...daoPageData, page: 2 }));
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  }

  const getDaoInfo = async () => {
    if(!activeId) return;
    try {
      const { data } = await DaoApi.getById(url, activeId);
      if (data.data) {
        setDaoInfo(data.data);
      }
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  }

  const handleLoadMore = () => {
    if (isLoadingMore) {
      getBookmarkList();
    }
  };

  const checkJoinStatus = async () => {
    if(!activeId) return;
    try {
      const { data } = await DaoApi.checkBookmark(url, activeId);
      setIsJoin(data.data.status);
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  };

  const bookmarkHandle = async () => {
    if(!activeId) return;
    try {
      const { data } = await DaoApi.bookmark(url, activeId);
      await refreshList();
      setIsJoin(data.data.status);
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  };

  useEffect(() => {
    getBookmarkList();
  }, []);

  useEffect(() => {
      if(bookmarkList[0] && !activeId){
        setActiveId(bookmarkList[0].id)
      }
      getDaoInfo();
      checkJoinStatus();
  },[activeId,bookmarkList])

  return (
    <View style={[styles.followeddao]}>
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
                <DaoCardItem daoInfo={daoInfo} handle={bookmarkHandle} joinStatus={isJoin}/>
                <View style={styles.channelsofdao}>
                  <PublishContainer daoInfo={daoInfo}/>
                  <Chats/>
                </View>
              </View>
          }
        </ScrollView>
      </View>
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
    fontFamily: FontFamily.paragraphP313,
    fontSize: FontSize.size_mini,
    textAlign: "left",
    letterSpacing: 0,
  },
  title: {
    fontSize: FontSize.size_mid,
    lineHeight: 23,
    fontWeight: "600",
    fontFamily: FontFamily.capsCaps310SemiBold,
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
    fontFamily: FontFamily.headingH613,
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
    fontFamily: FontFamily.paragraphP313,
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
    backgroundColor: Color.color1,
    justifyContent: "center",
    width: "100%",
    flex: 1,
  },
});

export default JoinedDAOListScreen;