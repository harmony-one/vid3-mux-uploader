import React, { ChangeEvent, useCallback, useState } from "react";
import { observer } from "mobx-react-lite";
import { AxiosProgressEvent } from "axios";
import {
  Box,
  Button,
  FileInput,
  Heading,
  Meter,
  Spinner,
  Stack,
  Text,
} from "grommet";
import { VideoInfo } from "./types";
import { client } from "./client";
import { BaseLayout } from "../../components/BaseLayout";
import { AnchorLink } from "../../components/AnchorLink";
import { metamaskStore } from "../../stores/stores";
import { useNavigate } from "react-router-dom";

const VideoUploadPage = observer(() => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<VideoInfo | undefined>();
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleFileChange = (e?: ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target.files) {
      return;
    }

    setFile(e.target.files[0]);
  };

  const handleProgress = useCallback((event: AxiosProgressEvent) => {
    const percentCompleted = Math.round(
      (event.loaded * 100) / (event.total || event.bytes)
    );

    setProgress(percentCompleted);
  }, []);

  const handleUpload = useCallback(async () => {
    // debugger;
    console.log("### metamaskStore.jwt", metamaskStore.jwt);
    if (!file || uploading || !metamaskStore.jwt) {
      return;
    }

    const data = new FormData();
    data.append("video", file);

    setUploading(() => {
      return true;
    });

    try {
      const response = await client.uploadVideo(
        data,
        metamaskStore.jwt,
        handleProgress
      );

      setResult(response);

      setUploading(() => false);

      navigate(`/videos/`);
    } catch (ex) {
      console.log("### ex", ex);
      setUploading(() => false);
    }
  }, [uploading, file, handleProgress, navigate]);

  return (
    <BaseLayout>
      <Box gap="medium">
        <Heading>Video uploader</Heading>
        <FileInput
          accept="video/mp4,video/x-m4v,video/*"
          name="File"
          onChange={handleFileChange}
        />

        <Button
          primary
          label="Upload"
          disabled={uploading}
          onClick={handleUpload}
        />

        {uploading && (
          <Box align="center" gap="medium">
            <Box align="center">
              <Spinner size="large" message="loading..." />
            </Box>
            <Stack alignSelf="center" anchor="center">
              <Box>
                <Meter round max={100} type="bar" value={progress} />
              </Box>
              <Text weight="bold">{progress}%</Text>
            </Stack>
          </Box>
        )}

        {result && (
          <div>
            <AnchorLink to="/videos">Go to My Videos</AnchorLink>
          </div>
        )}
      </Box>
    </BaseLayout>
  );
});

export default VideoUploadPage;
