import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Color} from "../../../GlobalStyles";
import PostList from "../../../components/PostList";
import {useIsFocused} from "@react-navigation/native";
import {useIsLogin} from "../../../utils/hook";
import {useDispatch, useSelector} from "react-redux";
import Models from "../../../declare/storeTypes";
import {updateState as globalUpdateState} from "../../../store/global";
import NoDataShow from "../../../components/NoDataShow";
import {strings} from "../../../locales/i18n";

export type Props = {};
const JoinedScreen: React.FC<Props> = (props) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const {feedsSearch} = useSelector((state: Models) => state.search);
    const {newsJoinStatus} = useSelector((state: Models) => state.global);
    const [isNewsFocus, setIsNewsFocus] = useState<boolean>(false);
    const [isLogin, gotoLogin] = useIsLogin();

    useEffect(() => {
        if (isFocused && newsJoinStatus) {
            setIsNewsFocus(true);

            dispatch(globalUpdateState({
                newsJoinStatus: false
            }))
        }
    }, [isFocused])

    return (
      <View style={styles.container}>
          <View style={styles.container}>
              {
                  isLogin ?
                  <PostList type={'post'} focus query={feedsSearch} isNewsFocus={isNewsFocus}
                        setIsNewsFocus={setIsNewsFocus}/>
                :
                <View style={styles.noData}>
                    <NoDataShow
                      title={`${strings('Feeds.JoinedScreen.noDataTitle')}`}
                      image={require('../../../assets/postlistNoData.png')}
                      description={`${strings('Feeds.JoinedScreen.noDataDescription')}`}
                    />
                </View>
              }
          </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.color1,
    },
    noData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default JoinedScreen;
