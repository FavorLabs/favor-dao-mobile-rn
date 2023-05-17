import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Platform, PermissionsAndroid, ActivityIndicator} from "react-native";
import FavorlabsApi from "../services/FavorlabsApi";
import {CheckBox, Icon} from '@rneui/themed'
import {FavorXConfig} from "../declare/global";
import FavorDaoButton from "../components/FavorDaoButton";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import Screens from "../navigation/RouteNames";
import {Padding, Color, FontFamily, FontSize, Border} from "../GlobalStyles";
import Loading from "../components/Loading";
import Favor from "../libs/favor";
import {EXTERNAL_CONFIG_NAME} from '@env';
import {CometChat} from '@cometchat-pro/react-native-chat';

const StartNode = () => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const [config, setConfig] = useState<FavorXConfig[]>([]);
    const [selectedIndex, setIndex] = useState(0);
    const [checked, setChecked] = useState(false);
    const [visible, setVisible] = useState(false);
    const [version, setVersion] = useState('');
    const [configLoaded, setConfigLoaded] = useState(false);

    useEffect(() => {
        getConfig();
        getVersion();
    }, [])
    const getVersion = async () => {
        const version = await Favor.version()
        setVersion(version);
    }
    const getConfig = async () => {
        setConfigLoaded(false);
        try {
            const {data} = await FavorlabsApi.getFavorXConfig()
            setConfig(data);
        } catch (e) {
            // console.error(e);
            setConfig([{
                "name": "Polygon Mainnet",
                "bootnode": ["/ip4/94.103.5.122/tcp/1818/p2p/12D3KooWA9J6uL7xjgYD1j8ybHqVeHMAstTzZXsNpDAU4VqRScwU", "/ip4/107.167.2.249/tcp/1800/p2p/12D3KooWEnr66XXK4Y85J1oRZasJUMLj41iexzXSE7DPKwJD3Ao3", "/ip6/2610:150:c066::b5f7:4c24/tcp/1800/p2p/12D3KooWEnr66XXK4Y85J1oRZasJUMLj41iexzXSE7DPKwJD3Ao3"],
                "chain-endpoint": "https://polygon-mainnet.public.blastapi.io",
                "network-id": 18,
                "oracle-contract-addr": "0xDecc6cCfe1E5369EF8e0d30033EF476b075E49bB",
                "traffic": false,
                "traffic-contract-addr": "",
                "proxy-group": "dao-proxy",
                "proxy-nodes": ["69e1256d685f684c5b903b70dc75b09c3a865a093bf18411973e42fc87fe682f", "ad02ef8199addd00b50c56445f7e22e6e3a5803261c0ff4fecec966867e7dd47"],
                "unipass": {
                    "nodeRPC": "https://node.wallet.unipass.id/polygon-mainnet",
                    "domain": "wallet.unipass.id"
                },
                "chat": {"region": "us", "appId": "235461af0053efb9"}
            }])
        } finally {
            setConfigLoaded(true);
        }

    }
    const initChat = (region: string, appId: string) => {
        const appSetting = new CometChat.AppSettingsBuilder()
          .subscribePresenceForAllUsers()
          .setRegion(region)
          .build();
        CometChat.init(appId, appSetting)
          .then(() => {
              CometChat.setSource?.('ui-kit', Platform.OS, 'react-native');
          })
          .catch(() => {
              return null;
          });
        const getPermissions = async () => {
            if (Platform.OS === 'android') {
                let granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                ]);
                // @ts-ignore
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    granted = await PermissionsAndroid.requestMultiple([
                        PermissionsAndroid.PERMISSIONS.CAMERA,
                        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    ]);
                }
            }
        };
        getPermissions();
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
            await Favor.getConfig(fc["network-id"], EXTERNAL_CONFIG_NAME || 'FavorDAO');
            await Favor.subProxy();
            initChat(fc.chat.region, fc.chat.appId);
            navigation.replace(Screens.Root);
        } catch (e) {
            console.error(e)
            await Favor.stop();
        } finally {
            setVisible(false);
        }
    }


    return <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>
                Select Network
            </Text>
            <TouchableOpacity onPress={getConfig}>
                <Icon size={25} color={Color.color} name='refresh-circle-sharp' type='ionicon'/>
            </TouchableOpacity>
        </View>
        <View style={styles.networks}>
            {
                configLoaded ?
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
                  )) :
                  <ActivityIndicator size="large" color={Color.color}/>
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
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
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
