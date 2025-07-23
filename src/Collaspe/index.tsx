import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { ButtonBase } from '../ButtonBase';

// Enable LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Enhanced type definitions
export type CollapseVariant = 'default' | 'bordered' | 'elevated' | 'flat';
export type CollapseSize = 'small' | 'medium' | 'large' | undefined;
export type CollapseIconPosition = 'left' | 'right';

interface CollapseProps {
  // Basic props
  title?: string;
  children?: React.ReactNode;
  defaultExpanded?: boolean;
  disabled?: boolean;

  // Styling props
  variant?: CollapseVariant;
  size?: CollapseSize;
  backgroundColor?: string;
  titleColor?: string;
  borderColor?: string;
  borderRadius?: number;

  // Custom state colors
  disabledBackgroundColor?: string;
  disabledTitleColor?: string;
  disabledBorderColor?: string;

  // Layout props
  fullWidth?: boolean;
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch';

  // Custom styles
  style?: ViewStyle;
  titleStyle?: TextStyle;
  contentStyle?: ViewStyle;
  containerStyle?: ViewStyle;

  // Functionality props
  onToggle?: (expanded: boolean) => void;
  animated?: boolean;
  animationDuration?: number;

  // Content props
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  customExpandIcon?: React.ReactNode;
  customCollapseIcon?: React.ReactNode;
  iconPosition?: CollapseIconPosition;
  iconSpacing?: number;
  customHeader?: React.ReactNode;

  // Accessibility props
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: 'button' | 'none';

  // Shadow props
  shadow?: boolean;
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;

  // Border props
  borderWidth?: number;
  borderStyle?: 'solid' | 'dotted' | 'dashed';

  // Content props
  showDivider?: boolean;
  dividerColor?: string;
  dividerWidth?: number;
}

export const Collapse: React.FC<CollapseProps> = ({
  // Basic props
  title,
  children,
  defaultExpanded = false,
  disabled = false,

  // Styling props
  variant = 'default',
  size,
  backgroundColor,
  titleColor,
  borderColor,
  borderRadius,

  // Custom state colors
  disabledBackgroundColor,
  disabledTitleColor,
  disabledBorderColor,

  // Layout props
  fullWidth = false,
  alignSelf = 'auto',

  // Custom styles
  style,
  titleStyle,
  contentStyle,
  containerStyle,

  // Functionality props
  onToggle,
  animated = true,
  animationDuration = 300,

  // Content props
  leftIcon,
  rightIcon,
  customExpandIcon,
  customCollapseIcon,
  iconPosition = 'right',
  iconSpacing = 8,
  customHeader,

  // Accessibility props
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',

  // Shadow props
  shadow = false,
  shadowColor = '#000',
  shadowOffset = { width: 0, height: 2 },
  shadowOpacity = 0.25,
  shadowRadius = 3.84,

  // Border props
  borderWidth = 0,
  borderStyle = 'solid',

  // Content props
  showDivider = false,
  dividerColor = '#e0e0e0',
  dividerWidth = 1,

  // Spread all remaining props
  ...restProps
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const animatedHeight = useRef(
    new Animated.Value(defaultExpanded ? 1 : 0)
  ).current;
  const rotateAnimation = useRef(
    new Animated.Value(defaultExpanded ? 1 : 0)
  ).current;

  // Get variant styles
  const getVariantStyles = (): {
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
  } => {
    const variants = {
      default: { backgroundColor: '#ffffff', borderWidth: 0 },
      bordered: {
        backgroundColor: '#ffffff',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 8,
      },
      elevated: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
        borderRadius: 8,
      },
      flat: { backgroundColor: '#f8f9fa', borderWidth: 0 },
    };
    return variants[variant] || {};
  };

  // Get size styles
  const getSizeStyles = (): {
    paddingVertical?: number;
    paddingHorizontal?: number;
    fontSize?: number;
    minHeight?: number;
  } => {
    if (!size) return {};

    const sizes = {
      small: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 14,
        minHeight: 40,
      },
      medium: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        minHeight: 48,
      },
      large: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        fontSize: 18,
        minHeight: 56,
      },
    };
    return sizes[size] || {};
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  // Handle toggle
  const handleToggle = () => {
    if (disabled) return;

    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onToggle?.(newExpanded);

    if (animated) {
      // Animate height
      Animated.timing(animatedHeight, {
        toValue: newExpanded ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();

      // Animate rotation
      Animated.timing(rotateAnimation, {
        toValue: newExpanded ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();

      // Layout animation for smooth transition
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  };

  // Animated icon
  const animatedIcon = (
    <Animated.View
      style={[
        styles.icon,
        {
          transform: [
            {
              rotate: rotateAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '180deg'],
              }),
            },
          ],
        },
      ]}
    >
      <Text style={styles.iconText}>▼</Text>
    </Animated.View>
  );

  const collapseStyle: ViewStyle[] = [
    styles.collapse,
    {
      backgroundColor: (() => {
        if (disabled && disabledBackgroundColor) {
          return disabledBackgroundColor;
        }
        return backgroundColor || variantStyles.backgroundColor;
      })(),
      borderRadius: borderRadius || variantStyles.borderRadius,
      ...(sizeStyles.paddingVertical && {
        paddingVertical: sizeStyles.paddingVertical,
      }),
      ...(sizeStyles.paddingHorizontal && {
        paddingHorizontal: sizeStyles.paddingHorizontal,
      }),
      ...(sizeStyles.minHeight && {
        minHeight: sizeStyles.minHeight,
      }),
      alignSelf,
      borderWidth: borderWidth || variantStyles.borderWidth || 0,
      borderColor: (() => {
        if (disabled && disabledBorderColor) {
          return disabledBorderColor;
        }
        return borderColor || variantStyles.borderColor;
      })(),
      borderStyle,
    },
    ...(fullWidth ? [styles.fullWidth] : []),
    ...(shadow
      ? [
          {
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: shadowRadius,
          },
        ]
      : []),
    ...(style ? [style] : []),
  ];

  const titleStyleCombined: TextStyle[] = [
    styles.title,
    {
      color: (() => {
        if (disabled && disabledTitleColor) {
          return disabledTitleColor;
        }
        return titleColor || '#333333';
      })(),
      ...(sizeStyles.fontSize && { fontSize: sizeStyles.fontSize }),
    },
    ...(titleStyle ? [titleStyle] : []),
  ];

  const renderHeader = () => {
    // If custom header is provided, use it
    if (customHeader) {
      return (
        <ButtonBase
          onPress={handleToggle}
          disabled={disabled}
          style={styles.header}
          activeOpacity={0.7}
          accessibilityLabel={accessibilityLabel || title}
          accessibilityHint={accessibilityHint}
          accessibilityRole={accessibilityRole}
          accessibilityState={{ expanded, disabled }}
          {...restProps}
        >
          {customHeader}
        </ButtonBase>
      );
    }

    // Default header
    const iconToShow =
      customExpandIcon && customCollapseIcon
        ? expanded
          ? customCollapseIcon
          : customExpandIcon
        : animatedIcon;

    const headerContent = (
      <View style={[styles.headerContent, { gap: iconSpacing }]}>
        {iconPosition === 'left' && iconToShow}
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        {title && <Text style={titleStyleCombined}>{title}</Text>}
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
        {iconPosition === 'right' && iconToShow}
      </View>
    );

    return (
      <ButtonBase
        onPress={handleToggle}
        disabled={disabled}
        style={styles.header}
        activeOpacity={0.7}
        accessibilityLabel={accessibilityLabel || title}
        accessibilityHint={accessibilityHint}
        accessibilityRole={accessibilityRole}
        accessibilityState={{ expanded, disabled }}
        {...restProps}
      >
        {headerContent}
      </ButtonBase>
    );
  };

  const renderContent = () => {
    if (!children) return null;

    const contentContainerStyle: ViewStyle[] = [
      styles.content,
      {
        paddingHorizontal: sizeStyles.paddingHorizontal || 0,
        paddingBottom: sizeStyles.paddingVertical || 0,
      },
      ...(contentStyle ? [contentStyle] : []),
    ];

    if (animated) {
      return (
        <Animated.View
          style={[
            contentContainerStyle,
            {
              opacity: animatedHeight,
              maxHeight: animatedHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1000], // Large enough to accommodate content
              }),
            },
          ]}
        >
          {children}
        </Animated.View>
      );
    }

    return expanded ? (
      <View style={contentContainerStyle}>{children}</View>
    ) : null;
  };

  const renderDivider = () => {
    if (!showDivider || !expanded) return null;

    return (
      <View
        style={[
          styles.divider,
          {
            backgroundColor: dividerColor,
            height: dividerWidth,
          },
        ]}
      />
    );
  };

  return (
    <View style={containerStyle}>
      <View style={collapseStyle}>
        {renderHeader()}
        {renderDivider()}
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  collapse: {
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontWeight: '500',
  },
  content: {
    overflow: 'hidden',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
  },
  iconText: {
    fontSize: 12,
    color: '#666666',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
});

// Export types
export type { CollapseProps };
