"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeModal = _interopRequireDefault(require("react-native-modal"));
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const FanMenu = ({
  visible,
  onClose,
  items,
  position,
  radius = 20,
  startAngle = 90,
  // Start from top
  endAngle = 270,
  // End at bottom
  itemBackgroundColor = '#007AFF',
  iconColor = '#FFFFFF',
  mainButtonSize = 60,
  // mainButtonColor = '#007AFF',
  // mainButtonIcon = '×',
  minEdgeDistance = 16
}) => {
  const fadeAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const mainButtonAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const itemAnims = (0, _react.useRef)([]).current;

  // Initialize item animations
  (0, _react.useEffect)(() => {
    itemAnims.length = 0;
    items.forEach(() => {
      itemAnims.push(new _reactNative.Animated.Value(0));
    });
  }, [items, itemAnims]);
  (0, _react.useEffect)(() => {
    if (visible) {
      // Animate backdrop
      _reactNative.Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start();

      // Animate main button
      _reactNative.Animated.spring(mainButtonAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true
      }).start();

      // Animate menu items with staggered delay
      const itemAnimations = itemAnims.map((anim, index) => _reactNative.Animated.spring(anim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        delay: index * 80,
        useNativeDriver: true
      }));
      _reactNative.Animated.parallel(itemAnimations).start();
    } else {
      // Reverse animations
      _reactNative.Animated.parallel([_reactNative.Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true
      }), _reactNative.Animated.timing(mainButtonAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true
      }), ...itemAnims.map(anim => _reactNative.Animated.timing(anim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      }))]).start();
    }
  }, [visible, fadeAnim, mainButtonAnim, itemAnims]);
  const handleBackdropPress = () => {
    onClose();
  };
  const getItemPosition = index => {
    if (!position) return {
      x: 0,
      y: 0
    };
    const locationDirection = (0, _utils.getDirection)(position);
    const totalItems = items.length;
    let finaleStartAngle = startAngle;
    let finaleEndAngle = endAngle;
    if (totalItems < 3 && locationDirection.horizontal === 'right') {
      if (locationDirection.vertical === 'bottom') {
        finaleStartAngle = 270;
        finaleEndAngle = 180;
      } else {
        finaleStartAngle = 90;
        finaleEndAngle = 180;
      }
    } else {
      if (locationDirection.vertical === 'bottom') {
        finaleStartAngle = 270;
        finaleEndAngle = 0;
      } else {
        finaleStartAngle = 90;
        finaleEndAngle = 0;
      }
    }
    const angleStep = (finaleEndAngle - finaleStartAngle) / (totalItems - 1 || 1);
    const angle = finaleStartAngle + index * angleStep;
    const angleRad = angle * Math.PI / 180;
    const rx = position.x - minEdgeDistance * 0.3;
    const ry = position.y + mainButtonSize * 1.5;

    // Calculate position relative to main button center
    const x = rx + radius * Math.cos(angleRad);
    const y = ry + radius * Math.sin(angleRad);
    return {
      x,
      y
    };
  };
  const handleItemPress = item => {
    item.onPress();
    onClose();
  };

  // const handleMainButtonPress = () => {
  //   onClose();
  // };

  return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
    isVisible: visible,
    style: {
      margin: 0
    },
    onBackdropPress: onClose,
    animationIn: "fadeIn",
    animationOut: "fadeOut",
    animationInTiming: 200,
    animationOutTiming: 200,
    backdropOpacity: 0.3,
    backdropColor: "rgba(0, 0, 0, 0.3)",
    useNativeDriver: true
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [styles.backdrop, {
      opacity: fadeAnim
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.backdropTouchable,
    onPress: handleBackdropPress,
    activeOpacity: 1
  }, items.map((item, index) => {
    const itemPos = getItemPosition(index);
    return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      key: item.id,
      style: [styles.menuItem, {
        width: mainButtonSize,
        height: mainButtonSize,
        left: itemPos.x + mainButtonSize * 0.135,
        top: itemPos.y - mainButtonSize / 2,
        backgroundColor: item.color || itemBackgroundColor,
        borderRadius: mainButtonSize / 2,
        transform: [{
          scale: itemAnims[index] || new _reactNative.Animated.Value(0)
        }]
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.menuItemTouchable,
      onPress: () => handleItemPress(item),
      activeOpacity: 0.8
    }, item !== null && item !== void 0 && item.renderIcon ? item === null || item === void 0 ? void 0 : item.renderIcon : /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: item !== null && item !== void 0 && item.icon ? item === null || item === void 0 ? void 0 : item.icon : require('./assets/setting.png'),
      style: styles.menuItemIcon,
      tintColor: iconColor
    })));
  }))));
};
const styles = _reactNative.StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  backdropTouchable: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  mainButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  mainButtonTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  },
  mainButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  menuItem: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  menuItemTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuItemIcon: {
    width: 24,
    height: 24
  }
});
var _default = exports.default = FanMenu;
//# sourceMappingURL=FanMenu.js.map