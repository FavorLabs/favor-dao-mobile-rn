import AsyncStorage from '@react-native-async-storage/async-storage';

interface IStorageData {
  [key: string]: string;
}

// localStorage
class CustomLocalStorage {
  private readonly storageKey: string;

  constructor() {
    this.storageKey = '@myApp:localStorage';
  }

  async getItem(key: string): Promise<string | null> {
    try {
      const data = await this._getStorageData();
      return key in data ? data[key] : null;
    } catch (error) {
      console.error(`Error reading item with key ${key} from AsyncStorage: ${error}`);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      const data = await this._getStorageData();
      data[key] = value;
      await this._setStorageData(data);
    } catch (error) {
      console.error(`Error setting item with key ${key} to value ${value} in AsyncStorage: ${error}`);
      throw error;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      const data = await this._getStorageData();
      delete data[key];
      await this._setStorageData(data);
    } catch (error) {
      console.error(`Error removing item with key ${key} from AsyncStorage: ${error}`);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error(`Error clearing localStorage with key '${this.storageKey}' in AsyncStorage: ${error}`);
      throw error;
    }
  }

  // private function
  private async _getStorageData(): Promise<IStorageData> {
    try {
      const storedData = await AsyncStorage.getItem(this.storageKey);
      return storedData ? JSON.parse(storedData) : {};
    } catch (error) {
      console.error(`Error reading data from AsyncStorage: ${error}`);
      throw error;
    }
  }

  private async _setStorageData(data: IStorageData): Promise<void> {
    try {
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error(`Error setting data in AsyncStorage: ${error}`);
      throw error;
    }
  }
}

// sessionStorage
interface ISessionStorageData {
  [key: string]: string | null;
}

const sessionStorage: ISessionStorageData = {};

function setSessionStorageItem(key: string, value: string): void {
  sessionStorage[key] = value;
}

function getSessionStorageItem(key: string): string | null {
  return sessionStorage[key] ?? null;
}

function removeSessionStorageItem(key: string): void {
  delete sessionStorage[key];
}

function clearSessionStorage(): void {
  for (let key in sessionStorage) {
    if (sessionStorage.hasOwnProperty(key)) {
      delete sessionStorage[key];
    }
  }
}

const SessionStorage = {
  setItem: setSessionStorageItem,
  getItem: getSessionStorageItem,
  removeItem: removeSessionStorageItem,
  clear: clearSessionStorage
};

const LocalStorage = new CustomLocalStorage();

export { LocalStorage, SessionStorage };
