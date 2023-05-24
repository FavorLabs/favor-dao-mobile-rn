import React, {useState, useRef, useEffect} from "react";
import {Text, StyleSheet, Image, View, TouchableOpacity, Platform} from "react-native";
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import { PERMISSIONS } from 'react-native-permissions';
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";
import {usePermissions, useResourceUrl, useUrl} from "../utils/hook";
import ImageApi from "../services/DAOApi/Image";
import UploadBlockTitle from "./UploadBlockTitle";

export type Props = {
  imageType: string;
  isShowSelector?: boolean;
  upImage?: string;
  setUpImage: any;
  multiple?: boolean;
  cropping?: boolean;
  autoThumbnail?: string;
  setImageLoading?: (a:boolean) => void;
};
const UploadImage: React.FC<Props> = (props) => {
  const url = useUrl();
  const imagesResUrl = useResourceUrl('images');
  const avatarsResUrl = useResourceUrl('avatars');

  const { imageType, setUpImage, multiple = true, upImage, cropping = false, autoThumbnail, setImageLoading } = props;
  const [images, setImages] = useState<any[]>([]);
  const [isDisableUpImg,setIsDisableUpImg] = useState<boolean>(false);
  const imgArr = useRef<string[]>([])

  // const PhotoPermission = usePermissions(
  //   Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
  // );
  // const photoPermissionStatus = PhotoPermission.status;
  // const requestPhotoPermission = PhotoPermission.requestPermission;

  const removeImage = (index: number)=>{
    let img = images;
    img.splice(index,1);
    setImages([...img]);
    setIsDisableUpImg(false)
    if(!multiple) {
      setUpImage('')
    } else {
      setImageLoading?.(false);
      processImagesArr(img);
    }
  }

  const uploadImage = () => {
    // if (photoPermissionStatus === 'granted') {
      ImagePicker.openPicker({
        mediaType: "photo",
        width: 300,
        height: 400,
        cropping: cropping,
        includeBase64:true,
        multiple: multiple,
        maxFiles: 9,
      }).then((pickedImage) => {
        if(Array.isArray(pickedImage)) {
          setImageLoading?.(false);
          processImagesArr(pickedImage)
          setIsDisableUpImg(false)
        } else {
          processImages(pickedImage)
          setIsDisableUpImg(true)
        }
      });
    // } else {
    //   requestPhotoPermission();
    // }
  };

  const processImages = async (pickedImage: any) => {
    // @ts-ignore
    multiple ? setImages(images => [...images,pickedImage]) : setImages([pickedImage]);
    let file = {uri: pickedImage.path, type: 'multipart/form-data', name:'image.png' };
    try {
      let fmData = new FormData();
      // @ts-ignore
      fmData.append(imageType, file);
      if(imageType === 'avatar') {
        const { data } = await ImageApi.upload(avatarsResUrl, fmData);
        setUpImage(data.id)
        console.log(data,'upload Avatar')
      } else {
        const { data } = await ImageApi.upload(imagesResUrl, fmData);
        setUpImage(data.id)
        console.log(data,'upload Image')
      }
    } catch (e){
      console.log(e)
    }
  };

  const processImagesArr = async (pickedImage: any) => {
    if(!pickedImage.length) {
      setUpImage([])
      setImageLoading?.(true)
      return ;
    }

    setImages([]);
    setUpImage([]);
    // setImgArr([]);
    imgArr.current = [];
    await new Promise<void>(resolve => {
      pickedImage.map(async (item: any,index: number) => {
        let file = {uri: item.path, type: 'multipart/form-data', name: 'image.png'};
        // @ts-ignore
        setImages(images => [...images,item])
        try {
          let fmData = new FormData();
          // @ts-ignore
          fmData.append(imageType, file);
          const {data} = await ImageApi.upload(imagesResUrl, fmData);
          // @ts-ignore
          imgArr.current.push(data.id)
          if (index === pickedImage.length - 1) resolve()
        } catch (e) {
          console.log(e)
        }
      });
    })
    setUpImage(imgArr.current);
    setImageLoading?.(true)
  };



  useEffect(() => {
    setImages(autoThumbnail ? [{ sourceURL: autoThumbnail }] : [])
  }, [autoThumbnail]);

  useEffect(() => {
    if (upImage) {
      setImages([{ sourceURL: `${imageType === 'avatar' ? avatarsResUrl : imagesResUrl}/${upImage}` }]);
    }
  }, [upImage]);

  useEffect(() => {
    if (!multiple && images.length) setIsDisableUpImg(true);
    else setIsDisableUpImg(false);
  }, [multiple, images])

  return (
    <View style={styles.container}>
      <UploadBlockTitle type={imageType} isShowSelector={false} />

      <View style={styles.uploadedImageWrap}>
        { images.map((item, index) =>
          <View key={index} style={styles.uploadedImageItem}>
            <Image
              style={styles.imageItem}
              resizeMode="cover"
              // @ts-ignore
              source={{uri: item.sourceURL}}
            />
            <TouchableOpacity
              // @ts-ignore
              onPress={() => { removeImage(index)}}
              style={styles.closeButton}
            >
            <Image
              resizeMode="cover"
              source={require("../assets/group-1171275444.png")}
            />
            </TouchableOpacity>
          </View>
        )}
      </View>

      { !isDisableUpImg && (
        <View style={styles.uploadWrap}>
          <View style={styles.uploadIconTips}>
            <TouchableOpacity style={styles.iconTips} onPress={uploadImage}>
              <Image
                resizeMode="cover"
                source={require("../assets/uploadcloud2.png")}
              />
              <Text style={styles.tips}>
                Upload { imageType } (s)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignSelf: "stretch",
  },
  uploadedImageWrap: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginHorizontal: -8
  },
  uploadedImageItem: {
    position: 'relative',
    // flex: 1,
    width: '45%',
    borderRadius: Border.br_3xs,
    marginHorizontal: 8
  },
  imageItem: {
    width: '100%',
    height: 160,
    borderRadius: Border.br_3xs,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  uploadWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  uploadIconTips: {
    width: '100%',
    paddingVertical: 22,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(0, 0, 0, 0.12)",
    borderRadius: Border.br_3xs,
    backgroundColor: Color.color1
  },
  iconTips: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tips: {
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.paragraphP313,
    color: Color.color4,
    textAlign: "center",
    lineHeight: 20,
    letterSpacing: 0,
    marginTop: 8
  }
});

export default UploadImage;
