import {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {formatSize} from '~/utils/formatSize';

interface IFileUploaderProps {
  setFile: (file: File | null) => void;
}

const FileUploader = ({setFile}: IFileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      setFile?.(file);
    },
    [setFile]
  );

  const maxSizeFile = 20 * 1024 * 1024; // 20MB in bytes

  const {getRootProps, getInputProps, isDragActive, acceptedFiles} =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {'application/pdf': ['.pdf']},
      maxSize: maxSizeFile,
    });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div className="cursor-pointer space-y-4">
          {file ? (
            <div className="uploader-selected-file">
              <img src="images/pdf.png" alt="pdf" className="size-10" />

              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 max-w-xs truncate">
                    {file.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => setFile?.(null)}
                className="cursor-pointer p-2">
                <img src="icons/cross.svg" alt="icons" className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-center items-center mb-2 mx-auto w-16 h-16">
                <img src="icons/info.svg" alt="icons" className="size-15" />
              </div>

              <p className="text-lg text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>

              <p className="text-lg text-gray-500">
                PDF(max {formatSize(maxSizeFile)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
