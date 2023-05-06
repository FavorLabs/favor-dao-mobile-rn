import React, {useEffect, useState} from 'react';
// import * as FavorX from 'react-native-favor';
import {Text, View, StyleSheet, TouchableOpacity, Modal} from "react-native";
import FavorlabsApi from "../services/FavorlabsApi";
import {CheckBox} from '@rneui/themed'
import {FavorXConfig} from "../declare/global";
import FavorDaoButton from "../components/FavorDaoButton";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import Screens from "../navigation/RouteNames";
import {Padding, Color, FontFamily, FontSize, Border} from "../GlobalStyles";
import Loading from "../components/Loading";
import favorlabsApi from "../services/FavorlabsApi";
import Favor from "../libs/favor";


const StartNode = () => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const [config, setConfig] = useState<FavorXConfig[]>([]);
    const [selectedIndex, setIndex] = useState(0);
    const [checked, setChecked] = useState(false);
    const [visible, setVisible] = useState(false);
    const [version, setVersion] = useState('');

    useEffect(() => {
        getConfig();
        getVersion();
    }, [])
    const getVersion = async () => {
        const version = await Favor.version()
        setVersion(version);
    }
    const getConfig = async () => {
        const {data} = await FavorlabsApi.getFavorXConfig()
        setConfig(data);
    }
    const start = async () => {
        try {
            setVisible(true);
            const fc = config[selectedIndex];
            await Favor.startNode({
                "network-id": fc['network-id'],
                "boot-nodes": fc['bootnode'].join(','),
                "chain-endpoint": fc["chain-endpoint"],
                "oracle-contract-addr": fc["oracle-contract-addr"],
                // @ts-ignore
                traffic: fc['traffic'],
                "traffic-contract-addr": fc['traffic-contract-addr'],
                "proxy-group": fc['proxy-group'],
                "proxy-enable": checked,
                groups: [{
                    name: fc['proxy-group'],
                    type: 1,
                    'keep-connected-peers': 1,
                    nodes: fc['proxy-nodes'],
                }],
            })
            console.log("Node start success");
            await Favor.getConfig(fc["network-id"],'FavorDAOL');
            await Favor.subProxy();
            navigation.replace(Screens.Root);
        } catch (e) {
            console.error(e)
            await Favor.stop();
        } finally {
            setVisible(false);
        }
    }

    return <View style={styles.container}>
        <Text style={styles.title}>
            Select Network
        </Text>
        <View style={styles.networks}>
            {
                config.map((item, index) => (
                  <View style={[styles.network, index !== 1 && styles.selectorChild]} key={item.name}>
                      <Text style={styles.name}>{item.name}</Text>
                      <CheckBox
                        checked={selectedIndex === index}
                        onPress={() => setIndex(index)}
                        checkedIcon="check-circle-o"
                        uncheckedIcon="circle-o"
                        containerStyle={{backgroundColor: 'transparent'}}
                        checkedColor={'#ff8d1a'}
                      />
                  </View>
                ))
            }
        </View>
        <TouchableOpacity style={{marginTop: 20}} onPress={start}>
            <FavorDaoButton
              textValue="Start FavorX"
              frame1171275771BackgroundColor={Color.color}
              cancelColor={Color.color1}
            />
        </TouchableOpacity>
        <Loading visible={visible} text={'loading...\n' + version}/>
    </View>
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: Color.color2,
    },
    title: {
        fontSize: 28,
        textAlign: "left",
        color: Color.iOSSystemLabelsLightPrimary,
        fontFamily: FontFamily.capsCaps310SemiBold,
        fontWeight: "600",
        letterSpacing: 0,
    },
    networks: {
        paddingVertical: Padding.p_sm,
        paddingHorizontal: Padding.p_base,
        borderRadius: Border.br_3xs,
        backgroundColor: Color.color1,
        marginTop: 20,
    },
    network: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    name: {
        fontSize: FontSize.size_xl,
        textAlign: "left",
        color: Color.iOSSystemLabelsLightPrimary,
        fontFamily: FontFamily.capsCaps310SemiBold,
        fontWeight: "600",
        letterSpacing: 0,
    },
    selectorChild: {
        borderStyle: "solid",
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
        borderBottomWidth: 0.5,
    },
})

export default StartNode;
