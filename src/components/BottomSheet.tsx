import React, {useMemo, useRef, useImperativeHandle, ReactNode, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
    BottomSheetModal,
    BottomSheetScrollView,
    BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import FavorDaoButton from "./FavorDaoButton";
import {Color} from "../GlobalStyles";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

type Props = {
    showCancel?: boolean
    children?: ReactNode
}
const BottomSheet = ({showCancel = false, children}: Props, ref: React.Ref<any>) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['50%'], []);

    useImperativeHandle(ref, () => bottomSheetModalRef.current)

    const cancel = () => {
        bottomSheetModalRef.current?.dismiss();
    }

    return (
        // <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
            >
                <BottomSheetScrollView
                    contentContainerStyle={[styles.contentContainer, {marginBottom: insets.bottom}]}>
                    <View>
                        {
                            children
                        }
                    </View>
                    {
                        showCancel && <TouchableOpacity style={styles.cancel} onPress={cancel}>
                            <FavorDaoButton textValue="Cancel"></FavorDaoButton>
                        </TouchableOpacity>
                    }
                </BottomSheetScrollView>
            </BottomSheetModal>
        // </BottomSheetModalProvider>
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

export default React.forwardRef(BottomSheet);
