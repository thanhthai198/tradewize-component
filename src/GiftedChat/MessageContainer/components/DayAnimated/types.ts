import { type DayProps } from '../../../Day';
import { type IMessage } from '../../../types';
import { type DaysPositions } from '../../types';

export interface DayAnimatedProps extends Omit<DayProps, 'createdAt'> {
  scrolledY: { value: number };
  daysPositions: { value: DaysPositions };
  listHeight: { value: number };
  renderDay?: (props: DayProps) => React.ReactNode;
  messages: IMessage[];
  isLoadingEarlier: boolean;
}
