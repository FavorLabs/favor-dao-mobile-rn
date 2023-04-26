import React, { useState, useRef } from "react";
import {Text, StyleSheet, Image, View, TouchableOpacity} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";

export type Props = {};
type SelectListItem = {
  label: string,
  value: string,
}
const UploadImage: React.FC<Props> = (props) => {
  const selectList: SelectListItem[] = [{
    label: 'Public',
    value: 'Public'
  }, {
    label: 'Private',
    value: 'Private'
  }];
  const [newsType, setNewsType] = useState<string>(selectList[0].value);
  const [uploadedImages, setUploadedImages] = useState([require("../assets/image9.png"), require("../assets/image9.png")]);
  const pickerRef = useRef(null);

  const openPicker = () => {
    // @ts-ignore
    pickerRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>Upload images</Text>
        <TouchableOpacity onPress={openPicker}>
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
        </TouchableOpacity>
      </View>

      <View style={styles.uploadedImageWrap}>
        { uploadedImages.map((item, index) =>
          <View key={index} style={styles.uploadedImageItem}>
            <Image
              style={styles.imageItem}
              resizeMode="cover"
              source={item}
            />
            <Image
              style={styles.closeButton}
              resizeMode="cover"
              source={require("../assets/group-1171275444.png")}
            />
          </View>
        )}
      </View>

      <View style={styles.uploadWrap}>
        <View style={styles.uploadIconTips}>
          <Image
            resizeMode="cover"
            source={require("../assets/uploadcloud2.png")}
          />
          <Text style={styles.tips}>
            Upload image (s)
          </Text>
        </View>
      </View>
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
    // marginLeft: 36
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
    flex: 1,
    borderRadius: Border.br_3xs,
    marginHorizontal: 8
  },
  imageItem: {
    width: '100%'
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 22,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(0, 0, 0, 0.12)",
    borderRadius: Border.br_3xs,
    backgroundColor: Color.color2
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
