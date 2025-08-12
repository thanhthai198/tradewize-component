"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Composer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Constant = require("./Constant");
var _Color = _interopRequireDefault(require("./Color"));
var _styles = _interopRequireDefault(require("./styles"));
var _ButtonBase = require("../ButtonBase");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Composer = exports.Composer = /*#__PURE__*/(0, _react.forwardRef)(({
  composerHeight = _Constant.MIN_COMPOSER_HEIGHT,
  disableComposer = false,
  keyboardAppearance = 'default',
  multiline = true,
  onInputSizeChanged,
  onTextChanged,
  placeholder = _Constant.DEFAULT_PLACEHOLDER,
  placeholderTextColor = _Color.default.defaultColor,
  textInputAutoFocus = false,
  text,
  textInputProps,
  textInputStyle,
  onPressPickMedia,
  onFocus,
  onBlur
}, ref) => {
  const dimensionsRef = (0, _react.useRef)(null);
  const [isFocused, setIsFocused] = (0, _react.useState)(false);
  const [isPickerOpen, setIsPickerOpen] = (0, _react.useState)(false);
  const [widthText, setWidthText] = (0, _react.useState)(0);
  const [lineCount, setLineCount] = (0, _react.useState)(1);
  const determineInputSizeChange = (0, _react.useCallback)(dimensions => {
    // Support earlier versions of React Native on Android.
    if (!dimensions) return;
    if (!dimensionsRef.current || dimensionsRef.current && (dimensionsRef.current.width !== dimensions.width || dimensionsRef.current.height !== dimensions.height)) {
      dimensionsRef.current = dimensions;
      setWidthText(dimensions.width);
      onInputSizeChanged === null || onInputSizeChanged === void 0 || onInputSizeChanged(dimensions);
    }
  }, [onInputSizeChanged]);
  const handleContentSizeChange = (0, _react.useCallback)(({
    nativeEvent: {
      contentSize
    }
  }) => determineInputSizeChange(contentSize), [determineInputSizeChange]);
  const handleLayout = e => {
    const height = e.nativeEvent.layout.height;
    const lines = Math.max(1, Math.round(height / 22));
    setLineCount(lines);
  };
  const borderRadiusByLineCount = (0, _react.useMemo)(() => {
    if (lineCount === 1) {
      return 100;
    }
    return 16;
  }, [lineCount]);
  const heightInput = (0, _react.useMemo)(() => {
    if (lineCount === 1) {
      return composerHeight;
    }
    const height = lineCount * 22;
    if (height > _Constant.MAX_COMPOSER_HEIGHT / 2) {
      return _Constant.MAX_COMPOSER_HEIGHT / 2 + 20;
    }
    return height;
  }, [lineCount, composerHeight]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, isFocused && !isPickerOpen && /*#__PURE__*/_react.default.createElement(_ButtonBase.ButtonBase, {
    onPress: () => setIsPickerOpen(true)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    tintColor: _Color.default.defaultBlue,
    resizeMode: "contain",
    source: require('./assets/next.png'),
    style: {
      width: 18,
      height: 18
    }
  })), (!isFocused || isPickerOpen) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ButtonBase.ButtonBase, {
    onPress: () => onPressPickMedia === null || onPressPickMedia === void 0 ? void 0 : onPressPickMedia('camera')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    tintColor: _Color.default.defaultBlue,
    resizeMode: "contain",
    source: require('./assets/camera.png'),
    style: styles.iconPick
  })), /*#__PURE__*/_react.default.createElement(_ButtonBase.ButtonBase, {
    onPress: () => onPressPickMedia === null || onPressPickMedia === void 0 ? void 0 : onPressPickMedia('pick')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    tintColor: _Color.default.defaultBlue,
    resizeMode: "contain",
    source: require('./assets/photo.png'),
    style: styles.iconPick
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.textInputContainer, {
      borderRadius: borderRadiusByLineCount
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, _extends({
    ref: ref,
    testID: placeholder,
    accessible: true,
    accessibilityLabel: placeholder,
    placeholder: placeholder,
    placeholderTextColor: placeholderTextColor,
    multiline: multiline,
    editable: !disableComposer,
    onContentSizeChange: handleContentSizeChange,
    onChangeText: txt => {
      onTextChanged === null || onTextChanged === void 0 || onTextChanged(txt);
      setIsPickerOpen(false);
    },
    style: [_styles.default.fill, styles.textInput, textInputStyle, {
      height: heightInput,
      ..._reactNative.Platform.select({
        web: {
          outlineWidth: 0,
          outlineColor: 'transparent',
          outlineOffset: 0
        }
      })
    }],
    autoFocus: textInputAutoFocus,
    value: text,
    enablesReturnKeyAutomatically: true,
    underlineColorAndroid: "transparent",
    keyboardAppearance: keyboardAppearance,
    onFocus: () => {
      setIsFocused(true);
      onFocus === null || onFocus === void 0 || onFocus();
    },
    onBlur: () => {
      setIsFocused(false);
      setIsPickerOpen(false);
      onBlur === null || onBlur === void 0 || onBlur();
    }
  }, textInputProps)), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    onLayout: handleLayout,
    style: [styles.hiddenText, {
      width: widthText
    }]
  }, text)));
});
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: _Color.default.leftBubbleBackground,
    paddingHorizontal: 8
  },
  textInput: {
    paddingRight: 8,
    paddingLeft: 8,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    ..._reactNative.Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4
      }
    }),
    marginTop: _reactNative.Platform.select({
      ios: 6,
      android: 0,
      web: 6
    }),
    marginBottom: _reactNative.Platform.select({
      ios: 5,
      android: 3,
      web: 4
    })
  },
  iconPick: {
    width: 24,
    height: 24
  },
  hiddenText: {
    position: 'absolute',
    top: -9999,
    left: -9999,
    paddingRight: 8,
    paddingLeft: 8,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    ..._reactNative.Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4
      }
    }),
    marginTop: _reactNative.Platform.select({
      ios: 6,
      android: 0,
      web: 6
    }),
    marginBottom: _reactNative.Platform.select({
      ios: 5,
      android: 3,
      web: 4
    })
  },
  inputPreview: {
    paddingRight: 8,
    paddingLeft: 8,
    ..._reactNative.Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4
      }
    }),
    marginTop: _reactNative.Platform.select({
      ios: 6,
      android: 0,
      web: 6
    }),
    marginBottom: _reactNative.Platform.select({
      ios: 5,
      android: 3,
      web: 4
    })
  },
  txtPreview: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22
  }
});
//# sourceMappingURL=Composer.js.map