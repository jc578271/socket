import { createArrayReducer } from "@true/utils/createArrayReducer";

export const {
  reducer: messageReducer,
  setStore: setMessageStore,
  sync: syncMessage,
  useKeysByQuery: useMessagesByQuery
} = createArrayReducer('message', ['id'])
