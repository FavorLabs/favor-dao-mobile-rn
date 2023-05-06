import {Config} from "../declare/global";
import Web3 from "web3";
import {WebsocketProvider} from 'web3-core'
import * as FavorX from "react-native-favor";
import favorlabsApi from "../services/FavorlabsApi";
import Api from "../services/NodeApi";
import {EventEmitter} from 'events'

export const group_sub_method = 'group_subscribe';

class Favor extends EventEmitter {
    api?: string
    debugApi?: string
    ws?: WebsocketProvider
    config?: Config

    get url() {
        return `${this.api}/group/http/${this.config!.proxyGroup}/favordao/v1`
    }

    async startNode(fc: FavorX.Options) {
        const apiPort = fc['api-port'] || 2633;
        const debugApiPort = fc['debug-api-port'] || 2635;
        const wsPort = fc['ws-port'] || 2637;
        await FavorX.start({
            "api-port": apiPort,
            "debug-api-enable": true,
            "debug-api-port": debugApiPort,
            "ws-port": wsPort,
            ...fc
        });
        const host = '://127.0.0.1:';
        this.api = fc['enable-tls'] ? 'https' : 'http' + host + apiPort;
        this.debugApi = fc['enable-tls'] ? 'https' : 'http' + host + debugApiPort;
        this.ws = new Web3.providers.WebsocketProvider(
          fc['enable-tls'] ? 'wss' : 'ws' + host + wsPort,
          {
              reconnect: {
                  auto: true,
              }
          });
        // @ts-ignore
        this.ws.on('data', (res) => {
            // @ts-ignore
            this.ws.emit(res.params.subscription, res.params.result);
        });
    }

    async stop() {
        await FavorX.stop();
    }

    version() {
        return FavorX.version()
    }

    async getConfig(id: number, name?: string) {
        const {data} = await favorlabsApi.getConfig(id, name);
        this.config = data.data;
    }

    async subProxy() {
        if (!(this.api && this.config && this.ws)) {
            return;
        }
        await Api.observeProxyGroup(
          this.api,
          this.config.proxyGroup,
          this.config.proxyNodes,
        )
        this.ws.send(
          {
              id: 1,
              jsonrpc: '2.0',
              method: group_sub_method,
              params: ['peers', this.config.proxyGroup],
          }, (error, result) => {
              if (result) {
                  // @ts-ignore
                  this.ws.on(result.result, (res) => {
                      this.emit(group_sub_method, res);
                  });
              }
          })
    }
}


export default new Favor();

