export interface MenuItem {
  id: string;
  icon?: string;
  label: string;
  onPress: () => void;
  color?: string;
  renderIcon?: React.ReactNode;
}
