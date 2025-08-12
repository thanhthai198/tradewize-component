import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Animated } from 'react-native';

import Indicator from '../indicator';
import styles from './styles';

export default class BallIndicator extends PureComponent {
  static defaultProps = {
    color: 'rgb(0, 0, 0)',
    count: 8,
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

    let outputRange = Array.from(
      new Array(count),
      (_item, index) => 1.2 - (0.5 * index) / (count - 1)
    );

    for (let j = 0; j < index; j++) {
      outputRange.unshift(outputRange.pop() as number);
    }

    outputRange.unshift(...outputRange.slice(-1));

    let ballStyle = {
      margin: size / 20,
      backgroundColor,
      width: size / 5,
      height: size / 5,
      borderRadius: size / 10,
      transform: [
        {
          scale: progress.interpolate({ inputRange, outputRange }),
        },
      ],
    };

    return (
      <Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={ballStyle} />
      </Animated.View>
    );
  }

  render() {
    let { style, size: width, size: height, ...props }: any = this.props;

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={{ width, height } as any}
          renderComponent={this.renderComponent}
          {...props}
        />
      </View>
    );
  }
}
