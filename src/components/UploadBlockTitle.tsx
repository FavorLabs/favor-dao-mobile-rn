import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Border, Color, FontFamily, FontSize} from "../GlobalStyles";

export type Props = {
  type: string;
  isShowSelector?: boolean;
};
type SelectListItem = {
  label: string,
  value: string,
}
const UploadBlocakTitle: React.FC<Props> = (props) => {
  const { type, isShowSelector = true } = props;

  const pickerRef = useRef(null);
  const selectList: SelectListItem[] = [{
    label: 'Public',
    value: 'Public'
  }, {
    label: 'Private',
    value: 'Private'
  }];
  const [newsType, setNewsType] = useState<string>(selectList[0].value);

  const openPicker = () => {
    // @ts-ignore
    pickerRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>Upload { type }</Text>
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
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
})

export default UploadBlocakTitle;