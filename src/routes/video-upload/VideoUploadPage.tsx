import React, {ChangeEvent, useCallback, useState} from 'react'
import {VideoInfo} from "./types";
import {client} from "./client";
import {Anchor, Box, Button, FileInput, Heading} from "grommet";
import {getVideoUrl} from "../../router";
import {BaseLayout} from "../../components/BaseLayout";

const VideoUploadPage = () => {
  const [file, setFile] =  useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<VideoInfo | undefined>();

  const handleFileChange = (e?: ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target.files) {
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
    <BaseLayout>
      <Box gap="medium">
      <Heading>Video uploader</Heading>

      <FileInput name="File" onChange={handleFileChange} />

      <Button primary label="Upload" disabled={uploading} onClick={handleUpload} />

      {uploading && (<div>upload...</div>)}

      {result && <div><Anchor href={getVideoUrl(result)}>Go To Video</Anchor></div>}
      {result && <code>{JSON.stringify(result, null, 4)}</code>}
      </Box>
    </BaseLayout>
  )
}

export default VideoUploadPage