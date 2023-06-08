import * as React from "react";
import {Text, StyleSheet, View, TouchableOpacity, Pressable, ScrollView} from "react-native";
import {Color, Border, Padding, FontFamily, FontSize} from "../GlobalStyles";
import FavorDaoButton from "./FavorDaoButton";
import DaoCommunityCard from "./DaoCommunityCard";
import {useIsLogin, useUrl} from "../utils/hook";
import UserApi from '../services/DAOApi/User'
import {useEffect, useState} from "react";
import {addDecimal, compareNumber} from "../utils/balance";
import Toast from "react-native-toast-message";
import DaoCardItem from "./DaoCardItem";
import DaoApi from "../services/DAOApi/Dao";

type Props = React.ComponentProps<typeof DaoCommunityCard> & {
    subFn?: Function
    loading?: boolean
}
const SubscribeBlock = ({daoCardInfo, subFn, loading}: Props) => {
    const url = useUrl();
    const [balance, setBalance] = useState<string>('0');
    const [isLogin, gotoLogin] = useIsLogin();
    const [isJoin, setIsJoin] = useState(false);
    const [btnLoading,setBtnLoading] = useState<boolean>(false);

    const bookmarkHandle = async () => {
        if(btnLoading) return;
        try {
            setBtnLoading(true);
            console.log(daoCardInfo.id)
            const { data } = await DaoApi.bookmark(url, daoCardInfo.dao.id);
            if(data.data) {
                setIsJoin(data.data.status);
                Toast.show({type: 'info', text1: 'Join success!'});
            }
        } catch (e) {
            if (e instanceof Error) console.error(e.message);
        } finally {
            setBtnLoading(false);
        }
    };

    const checkJoinStatus = async () => {
        try {
            const { data } = await DaoApi.checkBookmark(url, daoCardInfo.dao.id);
            setIsJoin(data.data.status);
            console.log(data.data.status);
        } catch (e) {
            if (e instanceof Error) console.error(e.message);
        }
    };

    useEffect(() => {
        getBalance();
        checkJoinStatus();
    }, [])

    const getBalance = async () => {
        const {data} = await UserApi.getAccounts(url);
        console.log(data.data)
        setBalance(data.data[0].balance)
    }
    const subscribe = () => {
        if (!isLogin) {
            gotoLogin();
            return;
        }

        if (compareNumber(daoCardInfo.dao.price, balance)) {
            Toast.show({
                type: 'info',
                text1: 'Insufficient balance!'
            })
            return;
        }

        subFn?.();
    }

    return (
      <View style={styles.titleParent}>
          <ScrollView>
          <Text style={[styles.title, styles.titleFlexBox]}>
              Please subscribe first
          </Text>
          <View style={{
              width: '100%',
              marginTop: 20,
          }}>
              <DaoCardItem daoInfo={daoCardInfo.dao} handle={bookmarkHandle} joinStatus={isJoin} btnLoading={btnLoading}/>
          </View>

          <View style={[styles.frameWrapper, styles.frameWrapperSpaceBlock]}>
              <View style={styles.frameGroup}>
                  <View style={styles.descriptionParent}>
                      <Text style={[styles.description1, styles.descriptionTypo]}>
                          Balance
                      </Text>
                      <Text style={[styles.description2, styles.descriptionTypo]}>
                          {addDecimal(balance)} FavT
                      </Text>
                  </View>
                  <View style={styles.frameItem}/>
                  <View style={styles.descriptionGroup}>
                      <Text style={[styles.description1, styles.descriptionTypo]}>
                          Price
                      </Text>
                      <Text style={[styles.description2, styles.descriptionTypo]}>
                          {addDecimal(daoCardInfo.dao.price)} FavT
                      </Text>
                  </View>
              </View>
          </View>
          <Pressable disabled={loading}  onPress={subscribe} style={styles.button} >
              <FavorDaoButton
                isLoading={loading}
                textValue="Subscribe"
                frame1171275771BackgroundColor="#ff8d1a"
                cancelColor="#fff"
              />
          </Pressable>
          </ScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
    },
    titleFlexBox: {
        textAlign: "left",
        color: Color.iOSSystemLabelsLightPrimary,
    },
    frameWrapperSpaceBlock: {
        paddingHorizontal: Padding.p_base,
        alignSelf: "stretch",
    },
    descriptionTypo: {
        fontWeight: '400',
        fontSize: FontSize.size_mini,
        letterSpacing: 0,
    },
    label1FlexBox: {
        textAlign: "center",
        letterSpacing: 0,
    },
    title: {
        fontSize: FontSize.size_xl,
        fontWeight: '600',
        letterSpacing: 0,
        textAlign: "left",
        alignSelf: "stretch",
    },
    description1: {
        fontWeight: '400',
        fontSize: FontSize.size_mini,
        textAlign: "left",
        color: Color.iOSSystemLabelsLightPrimary,
    },
    description2: {
        color: Color.color4,
        textAlign: "right",
        marginLeft: 15,
        flex: 1,
        lineHeight: 20,
        fontWeight: '400',
        fontSize: FontSize.size_mini,
    },
    descriptionParent: {
        flexDirection: "row",
        alignSelf: "stretch",
    },
    frameItem: {
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderTopWidth: 0.5,
        width: 312,
        height: 1,
        marginTop: 10,
    },
    descriptionGroup: {
        marginTop: 10,
        flexDirection: "row",
        alignSelf: "stretch",
    },
    frameGroup: {
        alignSelf: "stretch",
    },
    frameWrapper: {
        height: 80,
        paddingVertical: Padding.p_3xs,
        justifyContent: "space-between",
        backgroundColor: Color.color1,
        borderRadius: Border.br_3xs,
        marginTop: 20,
    },
    create: {
        color: Color.color1,
        lineHeight: 23,
        fontSize: FontSize.bodyBody17_size,
        fontWeight: '600',
    },
    titleParent: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
    },
});

export default SubscribeBlock;
