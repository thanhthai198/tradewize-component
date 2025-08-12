import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Animated } from 'react-native';

import Indicator from '../indicator';
import styles from './styles';

export default class BarIndicator extends PureComponent {
  static defaultProps = {
    count: 3,

    color: 'rgb(0, 0, 0)',
    size: 40,
  };

  static propTypes = {
    ...Indicator.propTypes,

    color: PropTypes.string,
    size: PropTypes.number,
  };

  constructor(props: any) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  outputRange(base: number, index: number, count: number, samples: number) {
    let range = Array.from(
      new Array(samples),
      (_item, index) =>
        base * Math.abs(Math.cos((Math.PI * index) / (samples - 1)))
    );

    for (let j = 0; j < index * (samples / count); j++) {
      range.unshift(range.pop() as number);
    }

    range.unshift(...range.slice(-1));

    return range;
  }

  renderComponent({ index, count, progress }: any) {
    let { color: backgroundColor, size, animationDuration }: any = this.props;

    let frames = (60 * animationDuration) / 1000;
    let samples = 0;

    do samples += count;
    while (samples < frames);

    let inputRange = Array.from(
      new Array(samples + 1),
      (_item, index) => index / samples
    );

    let width = Math.floor(size / 5),
      height = Math.floor(size / 2),
      radius = Math.ceil(width / 2);

    let containerStyle = {
      height: size,
      width: width,
      marginHorizontal: radius,
    };

    let topStyle = {
      width,
      height,
      backgroundColor,
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
      transform: [
        {
          translateY: progress.interpolate({
            inputRange,
            outputRange: this.outputRange(
              +(height - radius) / 2,
              index,
              count,
              samples
            ),
          }),
        },
      ],
    };

    let bottomStyle = {
      width,
      height,
      backgroundColor,
      borderBottomLeftRadius: radius,
      borderBottomRightRadius: radius,
      transform: [
        {
          translateY: progress.interpolate({
            inputRange,
            outputRange: this.outputRange(
              -(height - radius) / 2,
              index,
              count,
              samples
            ),
          }),
        },
      ],
    };

    return (
      <View style={containerStyle} {...{ key: index }}>
        <Animated.View style={topStyle} />
        <Animated.View style={bottomStyle} />
      </View>
    );
  }

  render() {
    let { style, ...props }: any = this.props;

    return (
      <Indicator
        style={[styles.container, style]}
        renderComponent={this.renderComponent}
        {...props}
      />
    );
  }
}
