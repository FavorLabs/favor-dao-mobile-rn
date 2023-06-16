export type ApiPort = {
  debugApiPort: string;
  rpcWsPort: string;
};

export type Addresses = {
  overlay: string;
  underlay: string[];
  nat_route: string[];
  public_ip: {
    ipv4?: string;
    ipv6?: string;
  };
  network_id: number;
  public_key: string;
};

export type Message = {
  code: number;
  message: string;
};

export type FileInfo = {
  rootCid: string;
  pinState: boolean;
  bitVector: {
    len: number;
    b: string;
  };
  register: boolean;
  manifest: {
    type?: string;
    size?: number;
    ext?: string;
    default?: string;
    mime?: string;
  };
};

export type FileList = {
  list: FileInfo[];
  total: number;
};

export declare type Chunk = {
  overlay: string;
  chunkBit: {
    len: number;
    b: string;
  };
};

export declare type ChunkSource = {
  len: number;
  chunkSource: Chunk[];
};

export declare type Topology = {
  baseAddr?: string;
  population?: number;
  connected?: number;
  timestamp?: Date;
  nnLowWatermark?: number;
  depth?: number;
  bins?: Record<
    string,
    {
      population?: number;
      connected?: number;
      disconnectedPeers?: null | string[];
      connectedPeers?: null | string[];
    }
  >;
  bootNodes?: {
    connected: number;
    connectedPeers: null | Peers;
    disconnectedPeers: null | Peers;
    population: number;
  };
  lightNodes?: {
    connected: number;
    connectedPeers: null | Peers;
    disconnectedPeers: null | Peers;
    population: number;
  };
};
