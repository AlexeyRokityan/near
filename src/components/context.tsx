import { useState, createContext, useContext, useEffect } from 'react';
import * as nearAPI from 'near-api-js';
import { RGBColor } from 'react-color';
import qs from 'qs';

export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || 'frontend-test-2.badconfig.testnet';

const { keyStores, connect, Contract, WalletConnection, Account, utils } = nearAPI;
const keyStore = new keyStores.BrowserLocalStorageKeyStore();
export const NUMBER_FRACTIONAL_COUNT = 10;

export const config = {
  networkId: 'testnet',
  keyStore,
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
};

type ColorType = { old: RGBColor; new: RGBColor };

type ContractType = InstanceType<typeof Contract> & {
  get(): Promise<number[]>;
  set(data: RGBColor): Promise<void>;
};

type WalletDataType = {
  id?: InstanceType<typeof Account>['accountId'];
  balance?: string;
};

type ContextType = {
  data?: WalletDataType;
  contract?: ContractType;
  wallet?: InstanceType<typeof WalletConnection>;
  color: ColorType;
  setColor: React.Dispatch<React.SetStateAction<ColorType>>;
  setData: React.Dispatch<React.SetStateAction<WalletDataType | undefined>>;
};

type ParentContextType = () => ContextType;

const Context = createContext<ContextType>({} as ContextType);

const defaultColorValue = { r: 162, g: 162, b: 162 };
const defaultColor = { old: defaultColorValue, new: defaultColorValue };

const params = qs.parse(window.location.search, { ignoreQueryPrefix: true });

const ParentContext: CustomFC = ({ children }) => {
  const [contract, setContract] = useState<ContextType['contract']>();
  const [wallet, setWallet] = useState<ContextType['wallet']>();
  const [data, setData] = useState<ContextType['data']>();
  const [isLoading, setIsLoading] = useState(true);

  const [color, setColor] = useState<ContextType['color']>(defaultColor);

  const init = async () => {
    const nearConnect = await connect(config);
    const nearWallet = new WalletConnection(nearConnect, null);

    const accountId = nearWallet.getAccountId();

    const nearContract = new Contract(nearWallet.account(), CONTRACT_ADDRESS, {
      viewMethods: ['get'],
      changeMethods: ['set'],
    }) as ContractType;

    setContract(nearContract);
    setWallet(nearWallet);

    if (accountId) {
      const balance = await nearWallet.account().getAccountBalance();
      const color = await nearContract.get();
      const [r, g, b] = color;
      const value = { r, g, b };

      setColor({ old: value, new: value });

      setData({
        id: accountId,
        balance: utils.format.formatNearAmount(balance.total, NUMBER_FRACTIONAL_COUNT),
      });
    }
  };

  useEffect(() => {
    init().finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!data?.id && params.status === 'success') {
      init();
    }
  }, [params.status]);

  return (
    <Context.Provider
      value={{
        contract,
        data,
        wallet,
        color,
        setColor,
        setData,
      }}
    >
      {!isLoading && children}
    </Context.Provider>
  );
};

export const useParentContext: ParentContextType = () => useContext(Context);
export default ParentContext;
