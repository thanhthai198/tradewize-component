import { getScreenWidth } from '../utils';
import { getScreenHeight } from '../utils';
export const getDirection = location => {
  let locationDirection = {
    horizontal: 'right',
    vertical: 'bottom'
  };
  if (location.x < getScreenWidth() / 2) {
    locationDirection.horizontal = 'left';
  }
  if (location.y < getScreenHeight() / 2) {
    locationDirection.vertical = 'top';
  }
  return locationDirection;
};
//# sourceMappingURL=utils.js.map