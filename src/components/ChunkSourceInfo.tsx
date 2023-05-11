import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Api from '../services/NodeApi';
import Favor from "../libs/favor";
import {query, stringToBinary, getDownloadNumber, omitAddress} from "../utils/util";
import {WebsocketProvider} from "web3-core";
import Events from "events";
import {Config} from "../declare/global";
import { Chunk, FileInfo } from '../declare/api/nodeApi';
import {Color} from "../GlobalStyles";
import ChunkTooltip from "./ChunkTooltip";

export type Props = {
  videoHash: string;
  oracleArr: string[];
};
type FavorType = {
  api: string;
  debugApi: string;
  ws: WebsocketProvider & Events;
  config: Config;
}
type ChunkInfo = Chunk & {
  downloadLen: number;
};

export const colorArr = [
  '#FFF',
  '#4147c4',
  '#d93a49',
  '#694d9f',
  '#dea32c',
  '#45b97c',
  '#77787b',
];

const ChunkSourceInfo: React.FC<Props> = (props) => {
  const { videoHash, oracleArr } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [len, setLen] = useState<number>(0);
  const [chunkArr, setChunkArr] = useState<ChunkInfo[]>([]);
  const [currentVideoInfo, setCurrentVideoInfo] = useState<FileInfo | null>(
    null,
  );
  const [totalPercent, setTotalPercent] = useState(0);

  // @ts-ignore
  const { api, debugApi, ws, config } = Favor as FavorType;

  const getChunkSource = async () => {
    setLoading(true);
    try {
      let queryData = {
        page: { pageNum: 1, pageSize: 1 },
        filter: [
          {
            key: 'rootCid',
            value: videoHash,
            term: 'cn',
          },
        ],
      };
      const re = await Api.getPyramidSize(api, query(queryData));
      if (re.status !== 200 || re.data.list.length === 0) return;
      const hashInfo = re.data.list[0];
      const videoHashInfo: FileInfo = {
        ...hashInfo,
        bitVector: {
          ...hashInfo.bitVector,
          b: stringToBinary(hashInfo.bitVector.b, hashInfo.bitVector.len),
        },
      };
      setCurrentVideoInfo(videoHashInfo);

      const { data } = await Api.getChunkSource(debugApi, videoHash);
      if (!data) return;
      let arr: ChunkInfo[] = [];
      setLen(data.len);
      data.chunkSource?.forEach((item) => {
        const binary = stringToBinary(item.chunkBit.b, item.chunkBit.len);
        let downloadLen = getDownloadNumber(binary);
        // if (item.overlay === data.pyramidSource) {
        //   downloadLen += len;
        //   pyramidSource = true;
        // }
        // item.chunkBit.len += len;
        // let preIndex = index - 1;
        let current = {
          ...item,
          chunkBit: {
            len: item.chunkBit.len,
            b: binary,
          },
          downloadLen,
        };
        arr.push(current);
      });
      arr.sort((a, b) => {
        return b.downloadLen - a.downloadLen;
      });
      let allDownLen = 0;
      arr.forEach((item) => {
        allDownLen += item.downloadLen;
      });
      setTotalPercent((allDownLen / videoHashInfo.bitVector.len) * 100);
      setChunkArr(arr);
      setLoading(false);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  };

  const getChunkArr = (data: ChunkInfo[]) => {
    if (!currentVideoInfo) return [];
    let chunkArr: number[] = [];
    let n = currentVideoInfo.bitVector.len;
    // console.log('n', n);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < data.length; j++) {
        chunkArr[i] = 0;
        if (data[j].chunkBit.b[i] === '1') {
          if (j >= 5) {
            chunkArr[i] = 6;
          } else {
            chunkArr[i] = j + 1;
          }
          break;
        }
      }
    }
    // console.log('chunkArr', chunkArr,props.hashInfo.size);
    return chunkArr;
  };

  useEffect(() => {
    getChunkSource();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sourceInfoTitle}>Data source of this video</Text>
      <View style={styles.sourceListWrap}>
        <ScrollView>
          {
            loading ? <Text style={styles.loading}>Loading...</Text> : <View style={styles.sourceList}>
              { chunkArr.map((item, index) => (
                <View style={styles.sourceItem} key={item.overlay}>
                  <View style={styles.sourceItemLeft}>
                    <View style={[styles.colorBlock, { backgroundColor: index < 5 ? colorArr[index + 1] : colorArr[6] }]}></View>
                    <Text style={styles.address}>{ omitAddress(item.overlay, 10, 8) }</Text>
                  </View>
                  <Text style={styles.percent}>{((item.downloadLen / len) * 100).toFixed(2)}%</Text>
                </View>
              )) }
            </View>
          }
        </ScrollView>
      </View>
      <View style={styles.chunkBlockWrap}>
        {
          !loading && (
            <ScrollView>
              {
                chunkArr.length ? <>
                  <ChunkTooltip chunk={getChunkArr(chunkArr)}  />
                </> : <>
                  {
                    currentVideoInfo && (
                      <ChunkTooltip chunk={
                        currentVideoInfo.bitVector.b
                        .split('')
                        .map((item) => parseInt(item))
                      } />
                    )
                  }
                </>
              }
            </ScrollView>
          )
        }
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingRight: 32,
    height: '100%'
  },
  sourceInfoTitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    letterSpacing: -0.41
  },
  sourceListWrap: {
    flex: 1,
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Color.color1,
    borderRadius: 12
  },
  loading: {
    color: Color.color4,
    textAlign: 'center',
    fontSize: 20
  },
  sourceList: {},
  sourceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5
  },
  sourceItemLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  colorBlock: {
    width: 10,
    height: 10,
    marginRight: 10
  },
  address: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.4
  },
  percent: {
    color: Color.color4,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.4
  },
  chunkBlockWrap: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Color.color1,
    borderRadius: 12,
    maxHeight: 80
  }
})

export default ChunkSourceInfo;