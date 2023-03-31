import { messageReducer, setMessageStore } from "@/components/SocketProvider/redux";
import {setupStore} from '@true/store';

export const {store, persistor} = setupStore(
  {
    message: messageReducer,
  },
  store => {
    setMessageStore(store)
  },
);
