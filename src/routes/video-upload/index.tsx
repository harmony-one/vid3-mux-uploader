import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import {VideoInfo} from "./types";
import {getVideoUrl, VideoItem} from "./VideoItem";
import {client} from "./client";

const VideoUpload = () => {
  const [file, setFile] =  useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<VideoInfo | undefined>();
  const [videoList, setVideoList] = useState<VideoInfo[]>([]);


  const loadVideoList = useCallback(async () => {
    const list = await client.loadVideoList();

    setVideoList(() => list);
  }, []);

  useEffect(() => {
    loadVideoList();
  }, [loadVideoList])

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

    const response = await client.uploadVideo(data)

    setResult(response)

    setUploading(() => false);
  }, [uploading, file]);

  return (
    <div>
      <div>Video uploader</div>
      <br />
      <input type="file" name="video" onChange={handleFileChange} />
      <br />
      {uploading && (<div>upload...</div>)}

      <br />
      <button onClick={handleUpload} disabled={uploading}>upload</button>
      {result && <div><a href={getVideoUrl(result)}>Go To Video</a></div>}
      {result && <code>{JSON.stringify(result, null, 4)}</code>}
      <br />

      <div>Uploaded video:</div>
      {videoList && <div>
        {videoList.map((item) => {
          return (
            <VideoItem video={item} />
          )
        })}
      </div>}
    </div>
  )
}

export default VideoUpload