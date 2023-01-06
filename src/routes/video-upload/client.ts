

const HOST = `https://02ef-188-68-221-147.eu.ngrok.io`

export const client = {
  loadVideoList: async () => {
    const response = await fetch(`${HOST}/videos`, {
      method: 'Get',
    });

    const responseData = await response.json();

    return responseData.data;
  },
  uploadVideo: async (data: FormData) => {

    const response = await fetch(`${HOST}/upload`, {
      method: 'POST',
      body: data
    });

    const responseData = await response.json();

    return responseData.data;
  },
  loadVideoInfo: async (videoId: string) => {
    const response = await fetch(`${HOST}/videos/${videoId}`, {
      method: 'Get',
    });

    const responseData = await response.json();

    return responseData.data;
  }
}