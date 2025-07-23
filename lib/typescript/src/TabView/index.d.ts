import React from 'react';
import type { ScrollViewProps, ViewStyle } from 'react-native';
export interface TabItem {
    key: string;
    title: string;
    content?: React.ReactNode;
    disabled?: boolean;
    badge?: string | number;
    icon?: React.ReactNode;
}
export interface TabViewProps {
    tabs: TabItem[];
    initialTabIndex?: number;
    onTabChange?: (index: number, tab: TabItem) => void;
    tabBarPosition?: 'top' | 'bottom';
    scrollable?: boolean;
    fullWidth?: boolean;
    equalWidth?: boolean;
    tabBarStyle?: ViewStyle;
    tabStyle?: ViewStyle;
    contentStyle?: ViewStyle;
    indicatorStyle?: ViewStyle;
    showIndicator?: boolean;
    tabVariant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning';
    tabSize?: 'small' | 'medium' | 'large' | 'xlarge';
    tabShape?: 'rounded' | 'pill' | 'square';
    activeTabVariant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning';
    activeTabBackgroundColor?: string;
    activeTabTextColor?: string;
    inactiveTabBackgroundColor?: string;
    inactiveTabTextColor?: string;
    indicatorColor?: string;
    animated?: boolean;
    animationDuration?: number;
    scrollViewProps?: ScrollViewProps;
    containerStyle?: ViewStyle;
    tabBarContainerStyle?: ViewStyle;
    contentContainerStyle?: ViewStyle;
}
export declare const TabView: React.FC<TabViewProps>;
