import {config} from "../../config";

const HOST = config.uploader.host;

export const client = {

  requestNonce: async (address: string) => {
    const response = await fetch(`${HOST}/auth/web3/nonce`, {
      method: 'POST',
      body: JSON.stringify({address}),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const responseData = await response.json();

    return responseData.data;
  },

  auth: async ({signature, address}: {signature: string, address: string}) => {
    const response = await fetch(`${HOST}/auth/web3/signature`, {
      method: 'POST',
      body: JSON.stringify({signature, address}),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const responseData = await response.json();

    return responseData.data;
  },

  checkJWT: (jwt: string) => {
    return fetch(`${HOST}/auth/web3/test`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${jwt}`
      },
    }).then((result) => result.status === 200).catch(() => false);
  },

  loadVideoList: async () => {
    const response = await fetch(`${HOST}/videos`, {
      method: 'Get',
      mode: 'cors',
    });

    const responseData = await response.json();

    return responseData.data;
  },
  uploadVideo: async (data: FormData) => {

    const response = await fetch(`${HOST}/upload`, {
      method: 'POST',
      body: data,
      mode: 'cors',
    });

    const responseData = await response.json();

    return responseData.data;
  },
  loadVideoInfo: async (videoId: string) => {
    const response = await fetch(`${HOST}/videos/${videoId}`, {
      method: 'Get',
      mode: 'cors',
    });

    const responseData = await response.json();

    return responseData.data;
  },
  loadVideoByUrl: async (videoUrl: string) => {
    const response = await fetch(`${HOST}/videos/url/${videoUrl}`, {
      method: 'Get',
      mode: 'cors',
    });

    const responseData = await response.json();

    return responseData.data;
  },
  loadVideoBySequenceId: async (sequenceId: string) => {
    const response = await fetch(`${HOST}/videos/bySequenceId/${sequenceId}`, {
      method: 'Get',
      mode: 'cors',
    });

    const responseData = await response.json();

    return responseData.data;
  }
}