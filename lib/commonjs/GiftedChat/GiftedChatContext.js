"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChatContext = exports.GiftedChatContext = void 0;
var _react = require("react");
const GiftedChatContext = exports.GiftedChatContext = /*#__PURE__*/(0, _react.createContext)({
  getLocale: () => 'en',
  actionSheet: () => ({
    showActionSheetWithOptions: () => {}
  })
});
const useChatContext = () => (0, _react.useContext)(GiftedChatContext);
exports.useChatContext = useChatContext;
//# sourceMappingURL=GiftedChatContext.js.map