import ImageView from "react-native-image-viewing";
import React, {useState,useEffect} from "react";
import RowUser from "./RowUser";
import {ImageSource} from "react-native-image-viewing/dist/@types";

export type Props = {
    visibleStatus: boolean,
    images:ImageSource[],
    imageIndex:number,
    setImgShowStatus: Function
}
const ImgViews: React.FC<Props> = (props) => {
    const {visibleStatus,images,imageIndex,setImgShowStatus} = props;
    const [visible, setIsVisible] = useState(false);
    useEffect(()=>{
        if(visibleStatus){
            setIsVisible(true)
        }
    },[visibleStatus])
    return(
    <ImageView
        images={images}
        imageIndex={imageIndex}
        visible={visible}
        backgroundColor={'#000'}
        // presentationStyle={'overFullScreen'}
        onRequestClose={() => {
            setIsVisible(false)
            setImgShowStatus(false)
         }
        }
    />)
}
export default ImgViews;