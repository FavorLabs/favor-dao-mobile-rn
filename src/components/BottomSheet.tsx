import React, {useMemo, useRef, useImperativeHandle, ReactNode, useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import FavorDaoButton from "./FavorDaoButton";
import {Color} from "../GlobalStyles";

type Props = Partial<React.ComponentProps<typeof BottomSheetModal>> & {
    show: boolean
    showCancel?: boolean
    children?: ReactNode
    footer?: ReactNode
}

const BottomSheetM = (props: Props) => {
    const {showCancel = false, children, show, footer, ...bsmProps} = props
    const insets = useSafeAreaInsets();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => bsmProps.snapPoints ?? ['50%'], []);

    useEffect(() => {
        show ? bottomSheetModalRef.current?.present() : bottomSheetModalRef.current?.dismiss();
    }, [show, bottomSheetModalRef.current])

    const cancel = () => {
        bottomSheetModalRef.current?.dismiss();
    }

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        {
            ...bsmProps
        }
        snapPoints={snapPoints}
      >
          <View style={[styles.contentContainer, {marginBottom: insets.bottom}]}>
              <BottomSheetScrollView style={{flex: 1}}>
                  {
                      children
                  }
              </BottomSheetScrollView>
              {
                showCancel && <TouchableOpacity style={[styles.cancel]} onPress={cancel}>
                      <FavorDaoButton textValue="Cancel"></FavorDaoButton>
                  </TouchableOpacity>
              }
              <View>
                  { footer }
              </View>
          </View>
      </BottomSheetModal>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: Color.color2
    },
    cancel: {
        marginBottom: 10
    }
});

export default BottomSheetM;
