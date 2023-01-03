

export const client = {
  loadVideoList: async () => {
    const response = await fetch(`http://188.68.221.147:8080/videos`, {
      method: 'Get',
    });

    const responseData = await response.json();

    return responseData.data;
  },
  uploadVideo: async (data: FormData) => {

    const response = await fetch('http://188.68.221.147:8080/upload', {
      method: 'POST',
      body: data
    });

    const responseData = await response.json();

    return responseData.data;
  },
  loadVideoInfo: async (videoId: string) => {
    const response = await fetch(`http://188.68.221.147:8080/videos/${videoId}`, {
      method: 'Get',
    });

    const responseData = await response.json();

    return responseData.data;
  }
}