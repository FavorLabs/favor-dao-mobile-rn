import {get as _get} from 'lodash';
import React, {useMemo} from 'react';
import style from './styles';
import {View, Image, Text} from 'react-native';
import {useResourceUrl} from "../../../../../../utils/hook";

const CometChatAvatar = (props) => {
    const resourceUrl = useResourceUrl("avatars");
    const borderWidth = _get(props, 'borderWidth', 1);
    const borderColor = _get(props, 'borderColor', '#AAA');
    const cornerRadius = _get(props, 'cornerRadius', 1000);
    const textFontSize = _get(props, 'textFontSize', 18);
    const textColor = _get(props, 'textColor', 'black');
    const {image, name} = props;

    const imageUrl = useMemo(() => {
        return {
            uri: resourceUrl +'/'+ image.uri.slice(7)
        }
    }, [image])

    if (!(image && image.uri) && name) {
        return (
            <View
                style={[
                    style.defaultAvatarContainer,
                    {
                        borderRadius: cornerRadius,
                        borderWidth,
                        borderColor,
                    },
                ]}>
                <Text style={{fontSize: textFontSize, color: textColor}}>
                    {name[0].toUpperCase()}
                </Text>
            </View>
        );
    }

    return (
        <View
            style={[
                style.avatarContainer,
                {
                    borderRadius: cornerRadius,
                    borderWidth,
                    borderColor,
                },
            ]}>
            <Image source={imageUrl} alt="CometChatAvatar" style={style.imageStyle}/>
        </View>
    );
};
export default CometChatAvatar;
