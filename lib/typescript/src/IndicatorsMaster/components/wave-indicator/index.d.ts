import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
export default class WaveIndicator extends PureComponent {
    static defaultProps: {
        animationEasing: import("react-native").EasingFunction;
        animationDuration: number;
        waveFactor: number;
        waveMode: string;
        color: string;
        count: number;
        size: number;
    };
    static propTypes: {
        waveFactor: PropTypes.Requireable<number>;
        waveMode: PropTypes.Requireable<string>;
        color: PropTypes.Requireable<string>;
        size: PropTypes.Requireable<number>;
        animationEasing: PropTypes.Requireable<(...args: any[]) => any>;
        animationDuration: PropTypes.Requireable<number>;
        hideAnimationDuration: PropTypes.Requireable<number>;
        animating: PropTypes.Requireable<boolean>;
        interaction: PropTypes.Requireable<boolean>;
        hidesWhenStopped: PropTypes.Requireable<boolean>;
        renderComponent: PropTypes.Requireable<(...args: any[]) => any>;
        count: PropTypes.Requireable<number>;
    };
    constructor(props: any);
    renderComponent({ index, progress }: any): React.JSX.Element;
    render(): React.JSX.Element;
}
