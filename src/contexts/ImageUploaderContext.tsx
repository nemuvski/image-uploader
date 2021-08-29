import React, { createContext, useState } from 'react';
import { uploadBytesResumable, ref } from 'firebase/storage';
import { publicStorageRef } from '../libs/Firebase';

export const ImageUploaderScreen = {
  INITIAL: 'initial',
  PREVIEW: 'preview',
  UPLOADING: 'uploading',
  CROPPING: 'cropping',
  DONE: 'done',
} as const;
export type ImageUploaderScreenType = typeof ImageUploaderScreen[keyof typeof ImageUploaderScreen];

type ContextProps = {
  currentScreen: ImageUploaderScreenType;
  setScreen: (screen: ImageUploaderScreenType) => void;
  targetFile?: File;
  setFile: (file: File) => void;
  clearFile: () => void;
  uploadFile: () => void;
  uploadProgress: number;
  croppedImageData?: Blob;
  setCroppedImageData: (data: Blob) => void;
  errorMessage: string | undefined;
};

export const ImageUploaderContext = createContext<ContextProps>({
  currentScreen: ImageUploaderScreen.INITIAL,
  setScreen: () => undefined,
  targetFile: undefined,
  setFile: () => undefined,
  clearFile: () => undefined,
  uploadFile: () => undefined,
  croppedImageData: undefined,
  setCroppedImageData: () => undefined,
  uploadProgress: 0,
  errorMessage: undefined,
});

export const ImageUploaderProvider: React.FC = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ImageUploaderScreenType>(ImageUploaderScreen.INITIAL);
  const [targetFile, setTargetFile] = useState<File | undefined>();
  const [croppedImage, setCroppedImage] = useState<Blob | undefined>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  /**
   * スクリーンを設定
   *
   * @param screen スクリーン識別子
   */
  const setScreen = (screen: ImageUploaderScreenType) => setCurrentScreen(screen);

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
      setCurrentScreen(ImageUploaderScreen.INITIAL);
    } else {
      setErrorMessage(undefined);
      setTargetFile(file);
      setCurrentScreen(ImageUploaderScreen.PREVIEW);
    }
  };

  /**
   * 対象をクリア
   */
  const clearFile = () => {
    setTargetFile(undefined);
    setCroppedImage(undefined);
    setErrorMessage(undefined);
    setCurrentScreen(ImageUploaderScreen.INITIAL);
  };

  /**
   * 対象とするファイルをアップロードする
   */
  const uploadFile = () => {
    // 未選択の状態のときは処理しない
    if (!targetFile) return;
    setUploadProgress(0);
    setCurrentScreen(ImageUploaderScreen.UPLOADING);

    const timestamp = new Date().getTime();
    // 拡張子の決定 (※ トリミング画像はJPEGフォーマットで保存する)
    let extension = '';
    if (targetFile.type === 'image/jpeg' || croppedImage) extension = '.jpg';
    else if (targetFile.type === 'image/png') extension = '.png';

    const fileName = `${timestamp}${extension}`;

    // トリミング処理した画像データがある場合は、トリミング後の画像をアップロードする
    uploadBytesResumable(ref(publicStorageRef, fileName), croppedImage ?? targetFile).on(
      'state_changed',
      (snapshot) => setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
      (error) => {
        console.error(error);
        setErrorMessage('The file failed to upload.');
        setUploadProgress(100);
      },
      () => {
        setCurrentScreen(ImageUploaderScreen.DONE);
      }
    );
  };

  /**
   * トリミング処理して得られた画像データ
   *
   * @param data 画像データ
   */
  const setCroppedImageData = (data: Blob) => setCroppedImage(data);

  return (
    <ImageUploaderContext.Provider
      value={{
        currentScreen,
        setScreen,
        targetFile,
        setFile,
        clearFile,
        uploadFile,
        croppedImageData: croppedImage,
        setCroppedImageData,
        uploadProgress,
        errorMessage,
      }}
    >
      {children}
    </ImageUploaderContext.Provider>
  );
};
