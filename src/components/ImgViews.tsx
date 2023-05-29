import ImageView from "react-native-image-viewing";
import React, {useState,useEffect} from "react";
import RowUser from "./RowUser";

export type Props = {
    visibleStatus: boolean,
    images:any,
    imageIndex:number,
    setImgShowStatus:any
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
        onRequestClose={() => {
            setIsVisible(false)
            setImgShowStatus(false)
         }
        }
    />)
}
export default ImgViews;