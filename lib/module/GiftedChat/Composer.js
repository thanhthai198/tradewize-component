function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { Platform, StyleSheet, TextInput, View, Image, Text } from 'react-native';
import { MIN_COMPOSER_HEIGHT, DEFAULT_PLACEHOLDER, MAX_COMPOSER_HEIGHT } from './Constant';
import Color from './Color';
import stylesCommon from './styles';
import { ButtonBase } from '../ButtonBase';
export const Composer = /*#__PURE__*/forwardRef(({
  composerHeight = MIN_COMPOSER_HEIGHT,
  disableComposer = false,
  keyboardAppearance = 'default',
  multiline = true,
  onInputSizeChanged,
  onTextChanged,
  placeholder = DEFAULT_PLACEHOLDER,
  placeholderTextColor = Color.defaultColor,
  textInputAutoFocus = false,
  text,
  textInputProps,
  textInputStyle,
  onPressPickMedia,
  onFocus,
  onBlur
}, ref) => {
  const dimensionsRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [widthText, setWidthText] = useState(0);
  const [lineCount, setLineCount] = useState(1);
  const determineInputSizeChange = useCallback(dimensions => {
    // Support earlier versions of React Native on Android.
    if (!dimensions) return;
    if (!dimensionsRef.current || dimensionsRef.current && (dimensionsRef.current.width !== dimensions.width || dimensionsRef.current.height !== dimensions.height)) {
      dimensionsRef.current = dimensions;
      setWidthText(dimensions.width);
      onInputSizeChanged === null || onInputSizeChanged === void 0 || onInputSizeChanged(dimensions);
    }
  }, [onInputSizeChanged]);
  const handleContentSizeChange = useCallback(({
    nativeEvent: {
      contentSize
    }
  }) => determineInputSizeChange(contentSize), [determineInputSizeChange]);
  const handleLayout = e => {
    const height = e.nativeEvent.layout.height;
    const lines = Math.max(1, Math.round(height / 22));
    setLineCount(lines);
  };
  const borderRadiusByLineCount = useMemo(() => {
    if (lineCount === 1) {
      return 100;
    }
    return 16;
  }, [lineCount]);
  const heightInput = useMemo(() => {
    if (lineCount === 1) {
      return composerHeight;
    }
    const height = lineCount * 22;
    if (height > MAX_COMPOSER_HEIGHT / 2) {
      return MAX_COMPOSER_HEIGHT / 2 + 20;
    }
    return height;
  }, [lineCount, composerHeight]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, isFocused && !isPickerOpen && /*#__PURE__*/React.createElement(ButtonBase, {
    onPress: () => setIsPickerOpen(true)
  }, /*#__PURE__*/React.createElement(Image, {
    tintColor: Color.defaultBlue,
    resizeMode: "contain",
    source: require('../assets/next.png'),
    style: {
      width: 18,
      height: 18
    }
  })), (!isFocused || isPickerOpen) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ButtonBase, {
    onPress: () => onPressPickMedia === null || onPressPickMedia === void 0 ? void 0 : onPressPickMedia('camera')
  }, /*#__PURE__*/React.createElement(Image, {
    tintColor: Color.defaultBlue,
    resizeMode: "contain",
    source: require('../assets/camera.png'),
    style: styles.iconPick
  })), /*#__PURE__*/React.createElement(ButtonBase, {
    onPress: () => onPressPickMedia === null || onPressPickMedia === void 0 ? void 0 : onPressPickMedia('pick')
  }, /*#__PURE__*/React.createElement(Image, {
    tintColor: Color.defaultBlue,
    resizeMode: "contain",
    source: require('../assets/photo.png'),
    style: styles.iconPick
  }))), /*#__PURE__*/React.createElement(View, {
    style: [styles.textInputContainer, {
      borderRadius: borderRadiusByLineCount
    }]
  }, /*#__PURE__*/React.createElement(TextInput, _extends({
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
    style: [stylesCommon.fill, styles.textInput, textInputStyle, {
      height: heightInput,
      ...Platform.select({
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
  }, textInputProps)), /*#__PURE__*/React.createElement(Text, {
    onLayout: handleLayout,
    style: [styles.hiddenText, {
      width: widthText
    }]
  }, text)));
});
const styles = StyleSheet.create({
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
    backgroundColor: Color.leftBubbleBackground,
    paddingHorizontal: 8
  },
  textInput: {
    paddingRight: 8,
    paddingLeft: 8,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    ...Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4
      }
    }),
    marginTop: Platform.select({
      ios: 6,
      android: 0,
      web: 6
    }),
    marginBottom: Platform.select({
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
    ...Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4
      }
    }),
    marginTop: Platform.select({
      ios: 6,
      android: 0,
      web: 6
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
      web: 4
    })
  },
  inputPreview: {
    paddingRight: 8,
    paddingLeft: 8,
    ...Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4
      }
    }),
    marginTop: Platform.select({
      ios: 6,
      android: 0,
      web: 6
    }),
    marginBottom: Platform.select({
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