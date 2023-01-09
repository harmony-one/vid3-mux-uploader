import { Dropzone, FileItem, FileValidated, VideoPreview } from "@dropzone-ui/react";
import { FileItemProps } from "@dropzone-ui/react/build/components/file-item/components/FileItem/FileItemProps";
import { useState } from "react";
import "/node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";

import "react-dropzone-uploader/dist/styles.css";
import './VideoUpload.styles.scss';

const VideoUpload = () => {
  const [files, setFiles] = useState<FileValidated[]>([]);
  const [videoSrc, setVideoSrc] = useState<string>('');

  const updateFiles = (incommingFiles: any) => {
    setFiles(incommingFiles);
    const video = URL.createObjectURL(incommingFiles.file)
    setVideoSrc(video)
    console.log(incommingFiles);
  };

  const handleDelete = (id : any) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  return (
    <div className='video-upload'>
      <div className='upload-title'>Drop File here or click to browse</div>
      <form className='upload-form'>
        <Dropzone
          onChange={updateFiles}
          value={files}
          // onClean
          // accept={"image/*, video/*"}
          accept={"video/*"}
          maxFileSize={50000000}
          maxFiles={1}
          // placeholder={"Drop File here or click to browse"}
          minHeight={"100px"}
          maxHeight={"100px"}
          disableScroll
        >
          {files.map((file:FileItemProps) => (
            <FileItem
              {...file}
              key={file.id}
              onDelete={handleDelete}
              alwaysActive
              info
              resultOnTooltip
            />
          ))}
        </Dropzone>
        {/* <VideoPreview
          videoSrc={videoSrc}
          openVideo={true}
          // onClose={(e) => handleWatch(undefined)}
          controls
          autoplay
        />
        <Player
          playsInline
          src={videoSrc}
          fluid={false}
          width={480}
          height={272}
        /> */}
        <button className='upload-button'>upload</button>
      </form>
    </div>
  )
}

export default VideoUpload