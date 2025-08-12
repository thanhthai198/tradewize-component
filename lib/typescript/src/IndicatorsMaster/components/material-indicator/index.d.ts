import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
export default class MaterialIndicator extends PureComponent {
    static defaultProps: {
        animationDuration: number;
        color: string;
        size: number;
    };
    static propTypes: {
        trackWidth: PropTypes.Requireable<number>;
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
    _renderComponent: ({ index, progress }: any) => React.JSX.Element;
    render(): React.JSX.Element;
}
