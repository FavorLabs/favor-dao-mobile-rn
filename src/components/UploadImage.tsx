import React, {useState, useRef, useEffect} from "react";
import {Text, StyleSheet, Image, View, TouchableOpacity, Platform} from "react-native";
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import { PERMISSIONS } from 'react-native-permissions';
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";
import {usePermissions, useResourceUrl, useUrl} from "../utils/hook";
import ImageApi from "../services/DAOApi/Image";

export type Props = {
  imageType: string;
  isShowSelector?: boolean;
  upImage?: string;
  setUpImage?: any;
  multiple?: boolean;
};
type SelectListItem = {
  label: string,
  value: string,
}
const UploadImage: React.FC<Props> = (props) => {
  const url = useUrl();
  const imagesResUrl = useResourceUrl('images');
  const avatarsResUrl = useResourceUrl('avatars');

  const { imageType, isShowSelector = true ,setUpImage, multiple, upImage } = props;
  const selectList: SelectListItem[] = [{
    label: 'Public',
    value: 'Public'
  }, {
    label: 'Private',
    value: 'Private'
  }];
  const [newsType, setNewsType] = useState<string>(selectList[0].value);
  const [images, setImages] = useState([]);
  const pickerRef = useRef(null);
  const [isDisableUpImg,setIsDisableUpImg] = useState<boolean>(false);

  const [image, setImage] = useState<{ uri: string } | null>(null);
  // const PhotoPermission = usePermissions(
  //   Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
  // );
  // const photoPermissionStatus = PhotoPermission.status;
  // const requestPhotoPermission = PhotoPermission.requestPermission;

  const openPicker = () => {
    // @ts-ignore
    pickerRef.current?.focus();
  };

  const removeImage = (index:number)=>{
    let img = images;
    img.splice(index,1);
    setImages([...img]);
    setIsDisableUpImg(false)
    if(!multiple) {
      setUpImage('')
    }
  }

  const uploadImage = () => {
    // if (photoPermissionStatus === 'granted') {
      ImagePicker.openPicker({
        mediaType: "photo",
        width: 300,
        height: 400,
        cropping: true,
        includeBase64:true
      }).then((pickedImage) => {
        // @ts-ignore
        setImages(images => [...images,pickedImage])
        // uploadImg(pickedImage)

        if(!multiple) {
          setUpImage(pickedImage)
          setIsDisableUpImg(true)
        } else {

        }

      });
    // } else {
    //   requestPhotoPermission();
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>Upload { imageType }</Text>
        { isShowSelector && <TouchableOpacity onPress={openPicker}>
            <View style={styles.selector}>
                <Image
                    resizeMode="cover"
                    source={require("../assets/icon.png")}
                />
                <Text style={styles.selectedValue}>{newsType}</Text>
                <View style={styles.picker}>
                    <Picker
                        ref={pickerRef}
                        selectedValue={newsType}
                        onValueChange={(value, index) =>
                          setNewsType(value)
                        }>
                      { selectList.map(item =>
                        <Picker.Item key={item.label} label={item.label} value={item.value} />
                      )}
                    </Picker>
                </View>
            </View>
        </TouchableOpacity> }
      </View>

      <View style={styles.uploadedImageWrap}>
        { images.map((item, index) =>
          <View key={index} style={styles.uploadedImageItem}>
            <Image
              style={styles.imageItem}
              resizeMode="cover"
              // @ts-ignore
              source={{uri: `data:${item.mime};base64,${item.data}`}}
            />
            <TouchableOpacity onPress={removeImage.bind(index)} style={styles.closeButton}>
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
  titleWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    color: Color.iOSSystemLabelsLightPrimary,
    fontFamily: FontFamily.capsCaps310SemiBold,
    fontWeight: "600",
  },
  selector: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: 30,
    borderColor: "#e8e8e8",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: Border.br_5xs,
    paddingLeft: 10,
    backgroundColor: Color.color1
  },
  selectedValue: {
    marginLeft: 2,
    marginRight: 20,
  },
  picker: {
    width: 20,
    marginRight: -10
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
    backgroundColor: Color.color2
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
