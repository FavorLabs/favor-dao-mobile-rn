import React from 'react';
import {View, ViewStyle} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

export type Props = {
    children: React.ReactNode
    headerComponent?: React.ReactNode
    headerStyle?: ViewStyle
    footerComponent?: React.ReactNode
    footerStyle?: ViewStyle
}
const BackgroundSafeAreaView = ({children, headerComponent, headerStyle, footerComponent, footerStyle}: Props) => {
    const {top, bottom} = useSafeAreaInsets();
    return <View style={{flex: 1}}>
        <View style={[
            headerStyle,
            {paddingTop: top}
        ]}>
            {
                headerComponent
            }
        </View>
        <View style={{flex:1}}>
            {children}
        </View>
        <View style={[
            footerStyle,
            {paddingBottom: bottom}
        ]}>
            {
                footerComponent
            }
        </View>
    </View>
};

export default BackgroundSafeAreaView;
