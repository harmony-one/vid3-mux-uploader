import { action, observable, makeObservable } from "mobx";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import { client } from "../routes/video-upload/client";

const COOKIE_JWT = "JWT";

interface MetaMaskEthereumProvider {
  isMetaMask?: boolean;
  once(eventName: string | symbol, listener: (...args: any[]) => void): this;
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
  off(eventName: string | symbol, listener: (...args: any[]) => void): this;
  addListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void
  ): this;
  removeListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void
  ): this;
  removeAllListeners(event?: string | symbol): this;
}

export class MetaMaskStore {
  private _provider: MetaMaskEthereumProvider | null = null;
  public address: string | null = null;
  public metamaskChainId: number | null = null;
  private _providerPromise = Promise.resolve(true);
  public isAuthorized = false;
  public jwt: string | null = null;
  public loginInProgress = false;

  constructor() {
    makeObservable<MetaMaskStore, "_provider" | "_providerPromise">(this, {
      _provider: observable,
      address: observable,
      metamaskChainId: observable,
      _providerPromise: observable,
      isAuthorized: observable,
      handleAccountsChanged: action.bound,
      registerProvider: action.bound,
      signInMetamask: action.bound,
      logout: action.bound,
      jwt: observable,
      checkAuth: action.bound,
      loginInProgress: observable,
    });

    this.checkAuth();
    this.registerProvider();
  }

  async checkAuth() {
    const jwt = cookie.get(COOKIE_JWT) || null;

    if (!jwt) {
      cookie.remove(COOKIE_JWT);
      return false;
    }

    const result = await client.checkJWT(jwt);

    if (!result) {
      cookie.remove(COOKIE_JWT);
      return false;
    }

    this.isAuthorized = true;
    this.jwt = jwt;
    this.address = jwtDecode<{ address: string }>(jwt).address;
    this.registerProvider();
    return true;
  }

  handleAccountsChanged(account: [string]) {
    console.log("### accountChanged", account);
    if (account[0].length === 0) {
      throw new Error("Metamask not found");
    } else {
      this.address = account[0];
    }
  }

  public async registerProvider(): Promise<boolean> {
    if (this._provider) {
      return true;
    }

    const provider = await detectEthereumProvider();

    // @ts-ignore
    if (provider !== window.ethereum) {
      console.error("Do you have multiple wallets installed?");
    }

    if (!provider) {
      throw new Error("Metamask not found");
    }

    this._provider = provider;

    this._provider.on("accountsChanged", this.handleAccountsChanged);
    this._provider.on("chainChanged", (chainId) => {
      this.metamaskChainId = Number(chainId);
    });

    this._provider.on("disconnect", () => {
      console.log("### disconnect");
      // this.isAuthorized = false;
      this.address = null;
    });

    return true;
  }

  public async signInMetamask() {
    this.loginInProgress = true;
    try {
      this._providerPromise = this._providerPromise.then(this.registerProvider);
      await this._providerPromise;
      console.log("### signin");
    } catch (e) {
      console.log("### e", e);
      this.loginInProgress = false;
      return;
    }

    if (!this._provider) {
      this.loginInProgress = false;
      return false;
    }

    try {
      const params = await this._provider
        // @ts-expect-error
        .request({ method: "eth_requestAccounts" });

      this.handleAccountsChanged(params);

      // @ts-expect-error
      const web3 = new Web3(window.web3.currentProvider);
      this.metamaskChainId = await web3.eth.net.getId();

      // @ts-expect-error
      await this._provider.request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      });

      if (this.address) {
        const { nonce } = await client.requestNonce(this.address);

        const message = `${nonce}`;
        const hashMessage = web3.eth.accounts.hashMessage(
          web3.utils.utf8ToHex(message)
        );
        const signature = await web3.eth.sign(hashMessage, this.address);
        const result = await client.auth({ signature, address: this.address });

        this.jwt = result.token;
        cookie.set(COOKIE_JWT, result.token);
      }

      this.isAuthorized = true;
      this.loginInProgress = false;
    } catch (err: any) {
      this.loginInProgress = false;
      if (err.code === 4001) {
        this.isAuthorized = false;
        this.address = null;
      } else {
        console.error(err);
      }
    }
  }

  logout() {
    this.isAuthorized = false;
    this.jwt = null;
    cookie.remove(COOKIE_JWT);
  }
}
