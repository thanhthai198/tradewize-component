import React from 'react';
import type { ViewStyle, TextStyle } from 'react-native';
export interface TabItem {
    key: string;
    title: string;
    content?: React.ReactNode;
}
export interface ScrollTabViewProps {
    tabs: TabItem[];
    activeTabKey?: string;
    onTabPress?: (tabKey: string, index: number) => void;
    containerStyle?: ViewStyle;
    tabContainerStyle?: ViewStyle;
    tabStyle?: ViewStyle;
    activeTabStyle?: ViewStyle;
    tabTextStyle?: TextStyle;
    activeTabTextStyle?: TextStyle;
    contentContainerStyle?: ViewStyle;
    scrollEnabled?: boolean;
    showsHorizontalScrollIndicator?: boolean;
    tabWidth?: number;
    tabSpacing?: number;
    tabPaddingHorizontal?: number;
    tabPaddingVertical?: number;
    activeTabBackgroundColor?: string;
    activeTabTextColor?: string;
    inactiveTabTextColor?: string;
    tabMinHeight?: number;
    tabBorderRadius?: number;
    tabActiveOpacity?: number;
    scrollBounces?: boolean;
    defaultTabFontSize?: number;
    defaultTabFontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    defaultContentFontSize?: number;
    defaultContentTextColor?: string;
    renderTab?: (tab: TabItem, isActive: boolean, index: number) => React.ReactNode;
    renderContent?: (tab: TabItem, isActive: boolean, index: number) => React.ReactNode;
    showContent?: boolean;
}
export declare const ScrollTabView: React.FC<ScrollTabViewProps>;
export default ScrollTabView;
