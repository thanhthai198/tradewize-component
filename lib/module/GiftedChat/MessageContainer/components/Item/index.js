function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { forwardRef, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import Message from '../../../Message';
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { Day } from '../../../Day';
import { isSameDay } from '../../../utils';
export * from './types';

// y-position of current scroll position relative to the bottom of the day container. (since we have inverted list it is bottom)
export const useAbsoluteScrolledPositionToBottomOfDay = (listHeight, scrolledY, containerHeight, dayBottomMargin, dayTopOffset) => {
  const absoluteScrolledPositionToBottomOfDay = useDerivedValue(() => listHeight.value + scrolledY.value - containerHeight.value - dayBottomMargin - dayTopOffset, [listHeight, scrolledY, containerHeight, dayBottomMargin, dayTopOffset]);
  return absoluteScrolledPositionToBottomOfDay;
};
export const useRelativeScrolledPositionToBottomOfDay = (listHeight, scrolledY, daysPositions, containerHeight, dayBottomMargin, dayTopOffset, createdAt) => {
  const dayMarginTop = useMemo(() => 5, []);
  const absoluteScrolledPositionToBottomOfDay = useAbsoluteScrolledPositionToBottomOfDay(listHeight, scrolledY, containerHeight, dayBottomMargin, dayTopOffset);

  // sorted array of days positions by y
  const daysPositionsArray = useDerivedValue(() => Object.values(daysPositions.value).sort((a, b) => a.y - b.y));

  // find current day position by scrolled position
  const currentDayPosition = useDerivedValue(() => {
    if (createdAt != null) {
      const currentDayPosition = daysPositionsArray.value.find(day => day.createdAt === createdAt);
      if (currentDayPosition) return currentDayPosition;
    }
    return daysPositionsArray.value.find((day, index) => {
      const dayPosition = day.y + day.height;
      return absoluteScrolledPositionToBottomOfDay.value < dayPosition || index === daysPositionsArray.value.length - 1;
    });
  }, [daysPositionsArray, absoluteScrolledPositionToBottomOfDay, createdAt]);
  const relativeScrolledPositionToBottomOfDay = useDerivedValue(() => {
    var _currentDayPosition$v, _currentDayPosition$v2;
    const scrolledBottomY = listHeight.value + scrolledY.value - ((((_currentDayPosition$v = currentDayPosition.value) === null || _currentDayPosition$v === void 0 ? void 0 : _currentDayPosition$v.y) ?? 0) + (((_currentDayPosition$v2 = currentDayPosition.value) === null || _currentDayPosition$v2 === void 0 ? void 0 : _currentDayPosition$v2.height) ?? 0) + dayMarginTop);
    return scrolledBottomY;
  }, [listHeight, scrolledY, currentDayPosition, dayMarginTop]);
  return relativeScrolledPositionToBottomOfDay;
};
const DayWrapper = /*#__PURE__*/forwardRef((props, ref) => {
  const {
    renderDay: renderDayProp,
    currentMessage,
    previousMessage
  } = props;
  if (!(currentMessage !== null && currentMessage !== void 0 && currentMessage.createdAt) || isSameDay(currentMessage, previousMessage)) return null;
  const {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    containerStyle,
    onMessageLayout,
    /* eslint-enable @typescript-eslint/no-unused-vars */
    ...rest
  } = props;
  return /*#__PURE__*/React.createElement(View, {
    ref: ref
  }, renderDayProp ? renderDayProp({
    ...rest,
    createdAt: currentMessage.createdAt
  }) : /*#__PURE__*/React.createElement(Day, _extends({}, rest, {
    createdAt: currentMessage.createdAt
  })));
});
const Item = props => {
  const {
    renderMessage: renderMessageProp,
    scrolledY,
    daysPositions,
    listHeight,
    onPressFile,
    onLongPressReaction,
    ...rest
  } = props;
  const dayContainerHeight = useSharedValue(0);
  const dayTopOffset = useMemo(() => 10, []);
  const dayBottomMargin = useMemo(() => 10, []);
  const createdAt = useMemo(() => new Date(props.currentMessage.createdAt).getTime(), [props.currentMessage.createdAt]);
  const relativeScrolledPositionToBottomOfDay = useRelativeScrolledPositionToBottomOfDay(listHeight, scrolledY, daysPositions, dayContainerHeight, dayBottomMargin, dayTopOffset, createdAt);
  const handleLayoutDayContainer = useCallback(({
    nativeEvent
  }) => {
    dayContainerHeight.value = nativeEvent.layout.height;
  }, [dayContainerHeight]);
  const style = useAnimatedStyle(() => ({
    opacity: interpolate(relativeScrolledPositionToBottomOfDay.value, [-dayTopOffset, -0.0001, 0, dayContainerHeight.value + dayTopOffset], [0, 0, 1, 1], 'clamp')
  }), [relativeScrolledPositionToBottomOfDay, dayContainerHeight, dayTopOffset]);
  return (
    /*#__PURE__*/
    // do not remove key. it helps to get correct position of the day container
    React.createElement(View, {
      key: props.currentMessage._id.toString()
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: style,
      onLayout: handleLayoutDayContainer
    }, /*#__PURE__*/React.createElement(DayWrapper, rest)), renderMessageProp ? renderMessageProp(rest) : /*#__PURE__*/React.createElement(Message, _extends({}, rest, {
      onPressFile: onPressFile,
      onLongPressReaction: onLongPressReaction
    })))
  );
};
export default Item;
//# sourceMappingURL=index.js.map