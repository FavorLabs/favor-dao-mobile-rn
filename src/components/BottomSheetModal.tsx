import React from 'react';
import {Modal, View, StyleSheet, TouchableOpacity} from 'react-native'
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Color} from "../GlobalStyles";
import SvgIcon from "./SvgIcon";
import CloseSvg from "../assets/svg/close.svg"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export type Props = {
  visible: boolean
  setVisible: (visible: boolean) => void
  isPadding?: boolean
  children?: React.ReactNode
  height?: number | string
}
const BottomSheetModal = ({visible, setVisible, isPadding = true, children, height}: Props) => {
  const insets = useSafeAreaInsets();
  const safeStyle = {
    marginLeft: insets.left,
    // marginTop: insets.top,
    marginRight: insets.right,
  }
  const close = () => {
    setVisible(false);
  }
  return (
      <Modal
        visible={visible}
        transparent
        animationType={'slide'}
      >
        <KeyboardAwareScrollView scrollEnabled={false} contentContainerStyle={[styles.container, safeStyle]}>
          <View style={[
            styles.content,
            {paddingBottom: insets.bottom},
            !!height && {height: height},
          ]}>
            <TouchableOpacity style={styles.closeBox} onPress={close}>
              <SvgIcon svg={<CloseSvg/>} width={25} height={25}/>
            </TouchableOpacity>
            <View style={[
              !!height && styles.main,
              isPadding && {paddingHorizontal: 10},
            ]}>
              {
                children
              }
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
  )
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000066',
    flex: 1,
    justifyContent: 'flex-end'
  },
  content: {
    backgroundColor: Color.color1,
    paddingTop: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  closeBox: {
    alignItems: 'flex-end',
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  main: {
    flex: 1,
  }
})
export default BottomSheetModal;
