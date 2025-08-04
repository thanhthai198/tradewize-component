import { createContext, useContext } from 'react';
export const GiftedChatContext = /*#__PURE__*/createContext({
  getLocale: () => 'en',
  actionSheet: () => ({
    showActionSheetWithOptions: () => {}
  })
});
export const useChatContext = () => useContext(GiftedChatContext);
//# sourceMappingURL=GiftedChatContext.js.map