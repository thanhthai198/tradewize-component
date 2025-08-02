import { type MessageContainerProps, type DaysPositions } from '../../types';
import { type FileMessage, type IMessage } from '../../../types';

export interface ItemProps<TMessage extends IMessage>
  extends MessageContainerProps<TMessage> {
  currentMessage: TMessage;
  previousMessage?: TMessage;
  nextMessage?: TMessage;
  position: 'left' | 'right';
  scrolledY: { value: number };
  daysPositions: { value: DaysPositions };
  listHeight: { value: number };
  onPressFile?: (file: FileMessage) => void;
  onLongPressReaction?(
    message: TMessage,
    position: {
      x: number;
      y: number;
      width: number;
      height: number;
      pageX: number;
      pageY: number;
    }
  ): void;
}
