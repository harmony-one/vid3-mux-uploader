

const HOST = `https://2b74-188-68-221-147.eu.ngrok.io`;

export const client = {
  loadVideoList: async () => {
    const response = await fetch(`${HOST}/videos`, {
      method: 'Get',
      mode: 'no-cors',
    });

    const responseData = await response.json();

    return responseData.data;
  },
  uploadVideo: async (data: FormData) => {

    const response = await fetch(`${HOST}/upload`, {
      method: 'POST',
      body: data,
      mode: 'no-cors',
    });

    const responseData = await response.json();

    return responseData.data;
  },
  loadVideoInfo: async (videoId: string) => {
    const response = await fetch(`${HOST}/videos/${videoId}`, {
      method: 'Get',
      mode: 'no-cors',
    });

    const responseData = await response.json();

    return responseData.data;
  }
}