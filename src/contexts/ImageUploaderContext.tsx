import React, { createContext, useState } from 'react';
import firebase from 'firebase/app';
import { publicStorageRef } from '../libs/Firebase';

export const ImageUploaderScreen = {
  INITIAL: 'initial',
  PREVIEW: 'preview',
  UPLOADING: 'uploading',
  DONE: 'done',
} as const;
export type ImageUploaderScreenType = typeof ImageUploaderScreen[keyof typeof ImageUploaderScreen];

type ContextProps = {
  screen: ImageUploaderScreenType;
  targetFile: File | undefined;
  setFile: (file: File) => void;
  clearFile: () => void;
  uploadFile: () => void;
  uploadProgress: number;
  errorMessage: string | undefined;
};

export const ImageUploaderContext = createContext<ContextProps>({
  screen: ImageUploaderScreen.INITIAL,
  targetFile: undefined,
  setFile: () => {},
  clearFile: () => {},
  uploadFile: () => {},
  uploadProgress: 0,
  errorMessage: undefined,
});

export const ImageUploaderProvider: React.FC = ({ children }) => {
  const [screen, setScreen] = useState<ImageUploaderScreenType>(ImageUploaderScreen.INITIAL);
  const [targetFile, setTargetFile] = useState<File | undefined>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  /**
   * 対象とするFileオブジェクトを設定
   *
   * @param file 設定するFileオブジェクト
   */
  const setFile = (file: File) => {
    // 1MBを超えている場合はエラーとする
    if (file.size > 1024 * 1024) {
      setErrorMessage('The selected file is larger than 1MB.');
      setTargetFile(undefined);
      setScreen(ImageUploaderScreen.INITIAL);
    } else {
      setErrorMessage(undefined);
      setTargetFile(file);
      setScreen(ImageUploaderScreen.PREVIEW);
    }
  };

  /**
   * 対象をクリア
   */
  const clearFile = () => {
    setTargetFile(undefined);
    setErrorMessage(undefined);
    setScreen(ImageUploaderScreen.INITIAL);
  };

  /**
   * 対象とするファイルをアップロードする
   */
  const uploadFile = () => {
    // 未選択の状態のときは処理しない
    if (!targetFile) return;
    setUploadProgress(0);
    setScreen(ImageUploaderScreen.UPLOADING);
    const uploadTask = publicStorageRef.child(targetFile.name).put(targetFile);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
      (error) => {
        console.error(error);
        setErrorMessage('The file failed to upload.');
        setUploadProgress(100);
      },
      () => {
        setScreen(ImageUploaderScreen.DONE);
      }
    );
  };

  return (
    <ImageUploaderContext.Provider
      value={{
        screen,
        targetFile,
        setFile,
        clearFile,
        uploadFile,
        uploadProgress,
        errorMessage,
      }}
    >
      {children}
    </ImageUploaderContext.Provider>
  );
};
