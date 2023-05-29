import * as React from "react";
import {Text, StyleSheet, Image, View, TouchableOpacity} from "react-native";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";

type Props = {
  member: number;
  setMember: React.Dispatch<React.SetStateAction<number>>;
}
const SingleChoice: React.FC<Props> = (props) => {
  const { member, setMember } = props;

  return (
    <View style={styles.titleParent}>
      <Text style={[styles.title, styles.titleFlexBox]}>Permission</Text>
      <View style={[styles.frameParent, styles.frameParentFlexBox]}>
        <View style={styles.descriptionFlexBox}>
          <Text style={[styles.description, styles.titleFlexBox]}>Free</Text>
          <TouchableOpacity onPress={() => setMember(0) }>
            <Image
              style={[styles.checkboxIcon, styles.frameParentFlexBox]}
              resizeMode="cover"
              source={ member === 0 ? require("../assets/checkbox1.png") : require("../assets/checkbox.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.frameChild} />
        <View style={[styles.descriptionGroup, styles.descriptionFlexBox]}>
          <Text style={[styles.description, styles.titleFlexBox]}>
            Subscribe member
          </Text>
          <TouchableOpacity onPress={() => setMember(1) }>
            <Image
              style={[styles.checkboxIcon, styles.frameParentFlexBox]}
              resizeMode="cover"
              source={ member === 1 ? require("../assets/checkbox1.png") : require("../assets/checkbox.png") }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleFlexBox: {
    textAlign: "left",
    color: Color.iOSSystemLabelsLightPrimary,
    letterSpacing: 0,
  },
  frameParentFlexBox: {
    overflow: "hidden",
    alignSelf: "stretch",
  },
  descriptionFlexBox: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  title: {
    fontSize: FontSize.bodyBody17_size,
    lineHeight: 23,
    fontWeight: "600",
    display: "flex",
    width: 343,
    alignItems: "center",
  },
  description: {
    fontSize: FontSize.size_mini,
    lineHeight: 20,
    fontWeight: '400',
    width: 157,
  },
  checkboxIcon: {
    maxWidth: 100,
    maxHeight: 100,
    width: 16,
    height: 16,
    marginLeft: 134,
  },
  frameChild: {
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderTopWidth: 0.5,
    height: 1,
    marginTop: 10,
    alignSelf: "stretch",
  },
  descriptionGroup: {
    marginTop: 10,
  },
  frameParent: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.color1,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_sm,
    justifyContent: "center",
    marginTop: 10,
    alignItems: "center",
  },
  titleParent: {
    marginTop: 20,
    alignSelf: "stretch",
  },
});

export default SingleChoice;
