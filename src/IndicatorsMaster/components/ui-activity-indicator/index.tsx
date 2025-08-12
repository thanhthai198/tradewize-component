import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Animated } from 'react-native';

import Indicator from '../indicator';
import styles from './styles';

export default class UIActivityIndicator extends PureComponent {
  static defaultProps = {
    color: 'rgb(0, 0, 0)',
    count: 12,
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

  renderComponent({ index, count, progress }: any) {
    let { size, color: backgroundColor }: any = this.props;
    let angle = (index * 360) / count;

    let layerStyle = {
      transform: [
        {
          rotate: angle + 'deg',
        },
      ],
    };

    let inputRange = Array.from(
      new Array(count + 1),
      (_item, index) => index / count
    );

    let outputRange = Array.from(new Array(count), (_item, index) =>
      Math.max(1.0 - index * (1 / (count - 1)), 0)
    );

    for (let j = 0; j < index; j++) {
      outputRange.unshift(outputRange.pop() as number);
    }

    outputRange.unshift(...outputRange.slice(-1));

    let barStyle = {
      width: size / 10,
      height: size / 4,
      borderRadius: size / 20,
      backgroundColor,
      opacity: progress.interpolate({ inputRange, outputRange }),
    };

    return (
      <Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={barStyle} />
      </Animated.View>
    );
  }

  render() {
    let { style, size: width, size: height, ...props }: any = this.props;

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={{ width, height }}
          renderComponent={this.renderComponent}
          {...props}
        />
      </View>
    );
  }
}
