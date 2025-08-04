import type { JSX } from 'react';
import type { IMessage } from '../types';
import type { BubbleProps } from './types';
export * from './types';
declare const Bubble: <TMessage extends IMessage = IMessage>(props: BubbleProps<TMessage>) => JSX.Element;
export default Bubble;
