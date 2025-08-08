"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Send = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Color = _interopRequireDefault(require("./Color"));
var _Constant = require("./Constant");
var _ButtonBase = require("../ButtonBase");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const styles = _reactNative.StyleSheet.create({
  container: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  text: {
    color: _Color.default.defaultBlue,
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: _Color.default.backgroundTransparent,
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10
  }
});
const Send = ({
  text,
  containerStyle,
  children,
  alwaysShowSend = false,
  disabled = false,
  sendButtonProps,
  onSend,
  iconStyle,
  iconSend
}) => {
  const handleOnPress = (0, _react.useCallback)(() => {
    onSend === null || onSend === void 0 || onSend({
      text: text === null || text === void 0 ? void 0 : text.trim()
    }, true);
  }, [text, onSend]);
  const showSend = (0, _react.useMemo)(() => alwaysShowSend || text && text.trim().length > 0, [alwaysShowSend, text]);
  if (!showSend) return null;
  return /*#__PURE__*/_react.default.createElement(_ButtonBase.ButtonBase, _extends({
    testID: _Constant.TEST_ID.SEND_TOUCHABLE,
    accessible: true,
    accessibilityLabel: "send",
    style: [styles.container, containerStyle],
    onPress: handleOnPress,
    disabled: disabled
  }, sendButtonProps), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, children || /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: iconSend ? iconSend : require('./assets/send.png'),
    style: [{
      width: 24,
      height: 24
    }, iconStyle]
  })));
};
exports.Send = Send;
//# sourceMappingURL=Send.js.map