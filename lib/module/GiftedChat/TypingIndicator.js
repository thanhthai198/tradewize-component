import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import Color from './Color';
const TypingIndicator = ({
  size = 6,
  speed = 320,
  dotColor = Color.defaultBlue,
  bubbleColor = Color.leftBubbleBackground,
  style
}) => {
  const v1 = useRef(new Animated.Value(0)).current;
  const v2 = useRef(new Animated.Value(0)).current;
  const v3 = useRef(new Animated.Value(0)).current;
  const animate = (v, delay) => Animated.loop(Animated.sequence([Animated.delay(delay), Animated.timing(v, {
    toValue: 1,
    duration: speed,
    useNativeDriver: true
  }), Animated.timing(v, {
    toValue: 0,
    duration: speed,
    useNativeDriver: true
  })]));
  useEffect(() => {
    const a1 = animate(v1, 0);
    const a2 = animate(v2, speed / 2);
    const a3 = animate(v3, speed);
    a1.start();
    a2.start();
    a3.start();
    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, v1, v2, v3]);
  const dotAnimStyle = v => ({
    opacity: v.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1]
    }),
    transform: [{
      translateY: v.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -1]
      })
    }, {
      scale: v.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.15]
      })
    }]
  });
  const dotBase = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: dotColor,
    marginHorizontal: Math.max(1, Math.round(size * 0.33))
  };
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      backgroundColor: bubbleColor,
      paddingVertical: Math.max(4, Math.round(size * 0.8)),
      paddingHorizontal: Math.max(6, Math.round(size * 1.2)),
      borderRadius: Math.round(size * 2.2)
    }, style]
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [dotBase, dotAnimStyle(v1)]
  }), /*#__PURE__*/React.createElement(Animated.View, {
    style: [dotBase, dotAnimStyle(v2)]
  }), /*#__PURE__*/React.createElement(Animated.View, {
    style: [dotBase, dotAnimStyle(v3)]
  }));
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    height: 26,
    width: 56,
    justifyContent: 'center',
    borderWidth: 0.2,
    borderColor: Color.defaultColor
  }
});
export default TypingIndicator;
//# sourceMappingURL=TypingIndicator.js.map