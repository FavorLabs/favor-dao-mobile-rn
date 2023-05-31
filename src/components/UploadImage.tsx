import React, {useState, useRef, useEffect} from "react";
import {Text, StyleSheet, Image, View, TouchableOpacity, Platform} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import { PERMISSIONS } from 'react-native-permissions';
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";
import {usePermissions, useResourceUrl, useUrl} from "../utils/hook";
import ImageApi from "../services/DAOApi/Image";
import UploadBlockTitle from "./UploadBlockTitle";
import Loading from "./Loading";
import Toast from "react-native-toast-message";

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
  const imagesResUrl = useResourceUrl('images');
  const avatarsResUrl = useResourceUrl('avatars');

  const { imageType, setUpImage, multiple = true, upImage, cropping = false, autoThumbnail, setImageLoading } = props;
  const [images, setImages] = useState<any[]>([]);
  const [isDisableUpImg,setIsDisableUpImg] = useState<boolean>(false);
  const imgArr = useRef<string[]>([])
  const [visible, setVisible] = useState<boolean>(false);

  // const PhotoPermission = usePermissions(
  //   Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
  // );
  // const photoPermissionStatus = PhotoPermission.status;
  // const requestPhotoPermission = PhotoPermission.requestPermission;

  const removeImage = (index: number)=>{
    let img = images;
    let upImg = imgArr.current;
    img.splice(index,1);
    upImg.splice(index,1);
    imgArr.current = upImg;
    setImages([...img]);
    if(!multiple) setUpImage('');
    else setUpImage(imgArr.current);
  }

  const uploadImage = () => {
    // if (photoPermissionStatus === 'granted') {
      ImagePicker.openPicker({
        mediaType: "photo",
        width: 300,
        height: 400,
        cropping: cropping,
        includeBase64: false,
        multiple: multiple,
        maxFiles: 9,
      }).then((pickedImage) => {
        return(imageSetting(pickedImage));
      });
    // } else {
    //   requestPhotoPermission();
    // }
  };

  const imageSetting = async (pickedImage: any) => {
    setImages([]);
    if(!multiple) setUpImage('');
    else setUpImage([]);
    imgArr.current = [];
    setImageLoading?.(false)
    setVisible(true);

    if(!Array.isArray(pickedImage)) pickedImage= [pickedImage];
    for (const item of pickedImage) {
      await imagesProcess(item);
    }

    if(!multiple) setUpImage(imgArr.current[0]);
    else setUpImage(imgArr.current);
    setImageLoading?.(true);
    setVisible(false);
  }

  const imagesProcess = async (pickedImage: any) => {
    let imgName = pickedImage.path.split('/').pop();
    let file = {uri: pickedImage.path, type: pickedImage.mime, name: imgName };
    try {
      let fmData = new FormData();
      // @ts-ignore
      fmData.append(imageType, file);
      const { data } = await ImageApi.upload(imageType === 'avatar' ? avatarsResUrl : imagesResUrl, fmData);
      imgArr.current.push(data.id)
      setImages(images => [...images,pickedImage])
      console.log(data.id,'daoId')
    } catch (e) {
      Toast.show({
        type: 'error',
        // @ts-ignore
        text1: e.message,
      });
    }
  }

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
              source={{uri: Platform.OS === 'ios' ? item.sourceURL : item.path }}
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
                { multiple ? `Upload ${ imageType } (s)` : `Upload ${ imageType }` }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Loading visible={visible} text={'Image uploading in progress'}/>
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
    fontWeight: '400',
    color: Color.color4,
    textAlign: "center",
    lineHeight: 20,
    letterSpacing: 0,
    marginTop: 8
  }
});

export default UploadImage;
