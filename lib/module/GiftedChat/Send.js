function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useMemo, useCallback } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Color from './Color';
import { TEST_ID } from './Constant';
import { ButtonBase } from '../ButtonBase';
const styles = StyleSheet.create({
  container: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  text: {
    color: Color.defaultBlue,
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: Color.backgroundTransparent,
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10
  }
});
export const Send = ({
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
  const handleOnPress = useCallback(() => {
    onSend === null || onSend === void 0 || onSend({
      text: text === null || text === void 0 ? void 0 : text.trim()
    }, true);
  }, [text, onSend]);
  const showSend = useMemo(() => alwaysShowSend || text && text.trim().length > 0, [alwaysShowSend, text]);
  if (!showSend) return null;
  return /*#__PURE__*/React.createElement(ButtonBase, _extends({
    testID: TEST_ID.SEND_TOUCHABLE,
    accessible: true,
    accessibilityLabel: "send",
    style: [styles.container, containerStyle],
    onPress: handleOnPress,
    disabled: disabled
  }, sendButtonProps), /*#__PURE__*/React.createElement(View, null, children || /*#__PURE__*/React.createElement(Image, {
    source: iconSend ? iconSend : require('./assets/send.png'),
    style: [{
      width: 24,
      height: 24
    }, iconStyle]
  })));
};
//# sourceMappingURL=Send.js.map