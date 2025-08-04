"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GiftedAvatar = GiftedAvatar;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Color = _interopRequireDefault(require("./Color"));
var _styles = _interopRequireDefault(require("./styles"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const {
  carrot,
  emerald,
  peterRiver,
  wisteria,
  alizarin,
  turquoise,
  midnightBlue
} = _Color.default;
const styles = _reactNative.StyleSheet.create({
  avatarStyle: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  avatarTransparent: {
    backgroundColor: _Color.default.backgroundTransparent
  },
  textStyle: {
    color: _Color.default.white,
    fontSize: 16,
    backgroundColor: _Color.default.backgroundTransparent,
    fontWeight: '500'
  }
});
function GiftedAvatar(props) {
  const [avatarName, setAvatarName] = (0, _react.useState)(undefined);
  const [backgroundColor, setBackgroundColor] = (0, _react.useState)(undefined);
  const {
    user,
    avatarStyle,
    textStyle,
    onPress
  } = props;
  const setAvatarColor = (0, _react.useCallback)(() => {
    var _name$, _name$2, _name$3;
    if (backgroundColor) return;
    const userName = (user === null || user === void 0 ? void 0 : user.name) || '';
    const name = userName.toUpperCase().split(' ');
    if (name.length === 1) setAvatarName(`${(_name$ = name[0]) === null || _name$ === void 0 ? void 0 : _name$.charAt(0)}`);else if (name.length > 1) setAvatarName(`${(_name$2 = name[0]) === null || _name$2 === void 0 ? void 0 : _name$2.charAt(0)}${(_name$3 = name[1]) === null || _name$3 === void 0 ? void 0 : _name$3.charAt(0)}`);else setAvatarName('');
    let sumChars = 0;
    for (let i = 0; i < userName.length; i += 1) sumChars += userName.charCodeAt(i);

    // inspired by https://github.com/wbinnssmith/react-user-avatar
    // colors from https://flatuicolors.com/
    const colors = [carrot, emerald, peterRiver, wisteria, alizarin, turquoise, midnightBlue];
    setBackgroundColor(colors[sumChars % colors.length]);
  }, [user === null || user === void 0 ? void 0 : user.name, backgroundColor]);
  const renderAvatar = (0, _react.useCallback)(() => {
    switch (typeof (user === null || user === void 0 ? void 0 : user.avatar)) {
      case 'function':
        return user.avatar([_styles.default.centerItems, styles.avatarStyle, avatarStyle]);
      case 'string':
        return /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: {
            uri: user.avatar
          },
          style: [_styles.default.centerItems, styles.avatarStyle, avatarStyle]
        });
      case 'number':
        return /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: user.avatar,
          style: [_styles.default.centerItems, styles.avatarStyle, avatarStyle]
        });
      default:
        return null;
    }
  }, [user, avatarStyle]);
  const renderInitials = (0, _react.useCallback)(() => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [styles.textStyle, textStyle]
    }, avatarName);
  }, [textStyle, avatarName]);
  const handleOnPress = () => {
    const {
      onPress,
      ...rest
    } = props;
    if (onPress) onPress(rest);
  };
  const handleOnLongPress = () => {
    const {
      onLongPress,
      ...rest
    } = props;
    if (onLongPress) onLongPress(rest);
  };
  (0, _react.useEffect)(() => {
    setAvatarColor();
  }, [setAvatarColor]);
  if (!user || !user.name && !user.avatar)
    // render placeholder
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [_styles.default.centerItems, styles.avatarStyle, styles.avatarTransparent, avatarStyle],
      accessibilityRole: "image"
    });
  if (user.avatar) return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    disabled: !onPress,
    onPress: handleOnPress,
    onLongPress: handleOnLongPress,
    accessibilityRole: "image"
  }, renderAvatar());
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    disabled: !onPress,
    onPress: handleOnPress,
    onLongPress: handleOnLongPress,
    style: [_styles.default.centerItems, styles.avatarStyle, {
      backgroundColor
    }, avatarStyle],
    accessibilityRole: "image"
  }, renderInitials());
}
//# sourceMappingURL=GiftedAvatar.js.map