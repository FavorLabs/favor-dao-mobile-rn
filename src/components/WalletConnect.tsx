import * as React from "react";
import {StyleSheet, View} from "react-native";
import LocalWallet from "../components/LocalWallet";


const WalletConnect = () => {
    return (
      <View style={{paddingHorizontal: 20}}>
          <LocalWallet/>
      </View>
    );
};

const styles = StyleSheet.create({});

export default WalletConnect;
