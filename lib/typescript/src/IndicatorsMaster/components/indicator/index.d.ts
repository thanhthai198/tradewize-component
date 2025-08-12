import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
export default class Indicator extends PureComponent {
    static defaultProps: {
        animationEasing: import("react-native").EasingFunction;
        animationDuration: number;
        hideAnimationDuration: number;
        animating: boolean;
        interaction: boolean;
        hidesWhenStopped: boolean;
        count: number;
    };
    static propTypes: {
        animationEasing: PropTypes.Requireable<(...args: any[]) => any>;
        animationDuration: PropTypes.Requireable<number>;
        hideAnimationDuration: PropTypes.Requireable<number>;
        animating: PropTypes.Requireable<boolean>;
        interaction: PropTypes.Requireable<boolean>;
        hidesWhenStopped: PropTypes.Requireable<boolean>;
        renderComponent: PropTypes.Requireable<(...args: any[]) => any>;
        count: PropTypes.Requireable<number>;
    };
    animationState: number;
    savedValue: number;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    startAnimation(): void;
    stopAnimation(): void;
    saveAnimation(value: number): void;
    resumeAnimation(): void;
    renderComponent(_item: any, index: number): any;
    render(): React.FunctionComponentElement<Animated.AnimatedProps<import("react-native").ViewProps & React.RefAttributes<import("react-native").View>>>;
}
