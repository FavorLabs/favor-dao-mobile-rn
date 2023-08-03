import * as React from "react";
import {StyleSheet, View, Text, Pressable, ScrollView, TouchableOpacity} from "react-native";
import QuotePreview from "../components/QuotePreview";
import {useNavigation, useRoute} from "@react-navigation/native";
import {FontSize, FontFamily, Color, Border, Padding} from "../GlobalStyles";
import FavorDaoNavBar from "../components/FavorDaoNavBar";
import FavorDaoButton from "../components/FavorDaoButton";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {useEffect, useMemo, useState} from "react";
import {useUrl} from "../utils/hook";
import PostApi from "../services/DAOApi/Post";
import {Post, PostInfo} from "../declare/api/DAOApi";
import {getContent, getDebounce} from "../utils/util";
import Toast from "react-native-toast-message";
import {ReTransferPost} from "../declare/api/DAOApi";
import TextInputParsedBlock from "../components/TextInputParsedBlock";
import {useSelector} from "react-redux";
import Models from "../declare/storeTypes";
import BackgroundSafeAreaView from "../components/BackgroundSafeAreaView";
import {strings} from "../locales/i18n";

const QuoteEdit = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const {postId} = route.params;
  const url = useUrl();

  const {dao} = useSelector((state: Models) => state.global);

  const [description, setDescription] = useState<string>('');
  const [postInfo, setPostInfo] = useState<PostInfo | null>(null);
  const [postLoading, setPostLoading] = useState<boolean>(false);

  const createDisable = useMemo(() => {
    return !(
      description && description.trim()!==''
    )
  }, [description]);

  const getPostInfo = async () => {
    try {
      const {data} = await PostApi.getPostById(url, postId);
      if (data.data) {
        setPostInfo(data.data);
      }
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  };

  const postHandle = async () => {
    if (createDisable) {
      return Toast.show({
        type: 'info',
        text1: `${strings('QuoteEditScreen.Toast.optionError')}`,
      })
    }
    if (postLoading) return;
    setPostLoading(true);
    try {
      // @ts-ignore
      const postData: ReTransferPost = {
        dao_id: dao?.id as string,
        type: 0,
        ref_id: postId,
        ref_type: 0,
        visibility: 1,
        contents: [
          {
            content: description,
            type: 2,
            sort: 0,
          },
        ],
      };
      const {data} = await PostApi.reTransferPost(url, postData);
      if (data.data) {
        Toast.show({
          type: 'info',
          text1: `${strings('QuoteEditScreen.Toast.QuoteSuccess')}`,
        })
        navigation.goBack();
      } else {
        Toast.show({
          type: 'info',
          text1: `${strings('QuoteEditScreen.Toast.QuoteError')}`,
        })
        setPostLoading(false);
      }
    } catch (e) {
      if (e instanceof Error)
        console.error(e.message);
      setPostLoading(false);
    }
  }

  useEffect(() => {
    if (postId) {
      getPostInfo();
    }
  }, [])

  return (
    <BackgroundSafeAreaView headerStyle={{backgroundColor: '#F8F8F8'}} footerStyle={{backgroundColor: '#F8F8F8'}}>
      <KeyboardAwareScrollView contentContainerStyle={styles.createWallet}>

        <FavorDaoNavBar
          title={strings('QuoteEditScreen.title')}
        />
        <ScrollView style={styles.scrollWrap}>
          <View style={[styles.instanceParent, styles.bottombuttonFlexBox]}>
            <TextInputParsedBlock
              title={strings('QuoteEditScreen.WriteCommentsTitle')}
              value={description}
              setValue={setDescription}
              multiline={true}
              placeholder={strings('QuoteEditScreen.WriteCommentsPlaceholder')}
            />
            <View style={[styles.instanceParent, styles.bottombuttonFlexBox]}>
              <QuotePreview postInfo={postInfo}/>
            </View>
          </View>
        </ScrollView>
        <View style={[styles.bottomButton, styles.bottombuttonFlexBox, createDisable && {opacity: 0.5}]}>
          <Pressable
            onPress={getDebounce(postHandle)}
          >
            <FavorDaoButton
              textValue={strings('QuoteEditScreen.PostButton')}
              frame1171275771BackgroundColor="#ff8d1a"
              cancelColor="#fff"
              isLoading={postLoading}
            />
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </BackgroundSafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollWrap: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F8F8F8',
  },
  bottombuttonFlexBox: {
    alignSelf: "stretch",
  },
  createWallet: {
    backgroundColor: Color.color2,
    flex: 1,
    overflow: "hidden",
    paddingHorizontal: Padding.p_base,
  },
  instanceParent: {
    marginTop: 20,
  },
  create: {
    fontSize: FontSize.bodyBody17_size,
    letterSpacing: 0,
    lineHeight: 23,
    fontWeight: "600",
    color: Color.color,
    textAlign: "center",
    width: 148,
  },
  createWrapper: {
    borderRadius: Border.br_29xl,
    backgroundColor: Color.color2,
    flexDirection: "row",
    paddingHorizontal: Padding.p_124xl_5,
    paddingVertical: Padding.p_sm,
    justifyContent: "center",
    overflow: "hidden",
    alignSelf: "stretch",
  },
  bottomButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  quoteEdit: {
    backgroundColor: '#F8F8F8',
    flex: 1,
    paddingHorizontal: Padding.p_base,
    paddingVertical: 0,
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
  },
});

export default QuoteEdit;
