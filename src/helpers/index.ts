import axios, { AxiosError } from 'axios';
import { Mode, propsRef } from 'toast-notif-study/dist/types';

export const handleAxiosError = (
  toastRef: React.RefObject<propsRef>,
  e: AxiosError | Error,
) => {
  if (axios.isAxiosError(e)) {
    toastRef.current?.addMessage({
      mode: 'error',
      message: e.response?.data.message,
    });
  } else {
    console.error(e);
  }
};

export const displayToastMessage = (
  toastRef: React.RefObject<propsRef>,
  mode: Mode,
  message?: string,
) => {
  toastRef.current?.addMessage({
    mode,
    message,
  });
};
