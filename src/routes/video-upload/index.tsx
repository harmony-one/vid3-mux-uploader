import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react'
import {VideoInfo} from "../video-upload-info";


const getVideoUrl = (video: VideoInfo) => {
  if (!video) {
    return '';
  }

  // @ts-ignore
  return `/videos/upload/${video.id}`;
}

const VideoUpload = () => {
  const [file, setFile] =  useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{data: VideoInfo} | undefined>();
  const [videoList, setVideoList] = useState<VideoInfo[]>([]);


  const loadVideoList = useCallback(async () => {
    const response = await fetch(`http://188.68.221.147:8080/videos`, {
      method: 'Get',
    });

    const responseData = await response.json();

    setVideoList(() => responseData.data);

  }, []);

  useEffect(() => {
    loadVideoList();
  }, [])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0])
  };

  const handleUpload = useCallback(async () => {

    if (!file || uploading) {
      return;
    }

    var data = new FormData()
    data.append('video', file);

    setUploading(() => {
      return true
    });

    const response = await fetch('http://188.68.221.147:8080/upload', {
      method: 'POST',
      body: data
    });

    const result = await response.json();
    setResult(result)

    setUploading(() => false);
  }, [uploading, file, result]);

  return (
    <div>
      <div>Video uploader</div>
      <br />
      <input type="file" name="video" onChange={handleFileChange} />
      <br />
      {uploading && (<div>upload...</div>)}

      <br />
      <button onClick={handleUpload} disabled={uploading}>upload</button>
      {result && <div><a href={getVideoUrl(result.data)}>Go To Video</a></div>}
      {result && <code>{JSON.stringify(result, null, 4)}</code>}
      <br />

      <div>Uploaded video:</div>
      {videoList && <div>
        {videoList.map((item) => {
          return (
            <div key={item.id}>{item.id} {new Date(item.createdAt).toString()} <a href={getVideoUrl(item)}>Go to video</a></div>
          )
        })}
      </div>}
    </div>
  )
}

export default VideoUpload