import {config} from "../../config";

const HOST = config.uploader.host;

export const client = {
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
  }
}