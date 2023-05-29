import React from 'react';
import {View, ViewStyle} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

export type Props = {
    children: React.ReactNode
    headerComponent?: React.ReactNode
    headerStyle?: ViewStyle
    footerComponent?: React.ReactNode
    footerStyle?: ViewStyle
    showFooter?: boolean
}
const BackgroundSafeAreaView = ({children, headerComponent, headerStyle, footerComponent, footerStyle, showFooter = true}: Props) => {
    const {top, bottom} = useSafeAreaInsets();
    return <View style={{flex: 1}}>
        <View style={[
            {paddingTop: top},
            headerStyle,
        ]}>
            {
                headerComponent
            }
        </View>
        <View style={{flex:1}}>
            {children}
        </View>
        {
            showFooter &&
          <View style={[
              {paddingBottom: bottom},
              footerStyle,
          ]}>
              {
                  footerComponent
              }
          </View>
        }

    </View>
};

export default BackgroundSafeAreaView;
