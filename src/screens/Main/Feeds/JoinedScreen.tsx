import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Color} from "../../../GlobalStyles";
import PostList from "../../../components/PostList";
import {useIsFocused} from "@react-navigation/native";
import {useIsLogin} from "../../../utils/hook";

export type Props = {};
const JoinedScreen: React.FC<Props> = (props) => {
    const [isLogin, gotoLogin] = useIsLogin()
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused && !isLogin) {
            gotoLogin();
        }
    }, [isLogin, isFocused])

    return (
      <View style={styles.container}>
          {
              isLogin ?
                <View style={styles.container}>
                    <PostList type={'post'} focus/>
                </View> : null
          }
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.color1,
    },
});

export default JoinedScreen;
