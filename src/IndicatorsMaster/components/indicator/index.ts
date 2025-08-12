import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';

export default class Indicator extends PureComponent {
  static defaultProps = {
    animationEasing: Easing.linear,
    animationDuration: 1200,
    hideAnimationDuration: 200,

    animating: true,
    interaction: true,
    hidesWhenStopped: true,

    count: 1,
  };

  static propTypes = {
    animationEasing: PropTypes.func,
    animationDuration: PropTypes.number,
    hideAnimationDuration: PropTypes.number,

    animating: PropTypes.bool,
    interaction: PropTypes.bool,
    hidesWhenStopped: PropTypes.bool,

    renderComponent: PropTypes.func,
    count: PropTypes.number,
  };
  animationState: number;
  savedValue: number;

  constructor(props: any) {
    super(props);

    /*
     *  0 -> 1
     *    | startAnimation
     *    | resumeAnimation
     *
     *  1 -> -1
     *    | stopAnimation
     *
     * -1 -> 0
     *    | saveAnimation
     */
    this.animationState = 0;
    this.savedValue = 0;

    let { animating }: any = this.props;

    this.state = {
      progress: new Animated.Value(0),
      hideAnimation: new Animated.Value(animating ? 1 : 0),
    };
  }

  componentDidMount() {
    let { animating }: any = this.props;

    if (animating) {
      this.startAnimation();
    }
  }

  componentDidUpdate(prevProps: any) {
    let { animating }: any = this.props;

    if (animating && !prevProps.animating) {
      this.resumeAnimation();
    }

    if (!animating && prevProps.animating) {
      this.stopAnimation();
    }

    if (animating ^ prevProps.animating) {
      let { hideAnimation }: any = this.state;
      let { hideAnimationDuration: duration }: any = this.props;

      Animated.timing(hideAnimation, {
        toValue: animating ? 1 : 0,
        duration,
        useNativeDriver: false,
      }).start() as any;
    }
  }

  startAnimation() {
    let { progress }: any = this.state;
    let { interaction, animationEasing, animationDuration }: any = this.props;

    if (0 !== this.animationState) {
      return;
    }

    let animation = Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1,
    });

    Animated.loop(animation).start() as any;

    this.animationState = 1;
  }

  stopAnimation() {
    let { progress }: any = this.state;

    if (1 !== this.animationState) {
      return;
    }

    let listener = progress.addListener(({ value }: any) => {
      progress.removeListener(listener);
      progress.stopAnimation(() => this.saveAnimation(value));
    });

    this.animationState = -1;
  }

  saveAnimation(value: number) {
    let { animating }: any = this.props;

    this.savedValue = value;
    this.animationState = 0;

    if (animating) {
      this.resumeAnimation();
    }
  }

  resumeAnimation() {
    let { progress }: any = this.state;
    let { interaction, animationDuration }: any = this.props;

    if (0 !== this.animationState) {
      return;
    }

    Animated.timing(progress, {
      useNativeDriver: true,
      isInteraction: interaction,
      duration: (1 - this.savedValue) * animationDuration,
      toValue: 1,
    }).start(({ finished }) => {
      if (finished) {
        progress.setValue(0);

        this.animationState = 0;
        this.startAnimation();
      }
    });

    this.savedValue = 0;
    this.animationState = 1;
  }

  renderComponent(_item: any, index: number) {
    let { progress }: any = this.state;
    let { renderComponent, count }: any = this.props;

    if ('function' === typeof renderComponent) {
      return renderComponent({ index, count, progress });
    }

    return null;
  }

  render() {
    let { hideAnimation }: any = this.state;
    let { count, hidesWhenStopped, ...props }: any = this.props;

    if (hidesWhenStopped) {
      props.style = [
        ...(Array.isArray(props.style) ? props.style : [props.style]),
        { opacity: hideAnimation },
      ].filter(Boolean);
    }
    return React.createElement(
      Animated.View,
      props,
      Array.from(new Array(count), this.renderComponent, this)
    );
  }
}
