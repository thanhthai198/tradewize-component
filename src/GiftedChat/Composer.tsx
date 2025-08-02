import { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  type TextInputProps,
  type NativeSyntheticEvent,
  type TextInputContentSizeChangeEventData,
  View,
  Image,
  Text,
  type LayoutChangeEvent,
} from 'react-native';
import {
  MIN_COMPOSER_HEIGHT,
  DEFAULT_PLACEHOLDER,
  MAX_COMPOSER_HEIGHT,
} from './Constant';
import Color from './Color';
import stylesCommon from './styles';
import { ButtonBase } from '../ButtonBase';

export interface ComposerProps {
  composerHeight?: number;
  text?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  textInputProps?: Partial<TextInputProps>;
  textInputStyle?: TextInputProps['style'];
  textInputAutoFocus?: boolean;
  keyboardAppearance?: TextInputProps['keyboardAppearance'];
  multiline?: boolean;
  disableComposer?: boolean;
  onTextChanged?(text: string): void;
  onInputSizeChanged?(layout: { width: number; height: number }): void;
  onPressPickMedia?: (type: 'camera' | 'pick') => void;
}

export const Composer = forwardRef(
  (
    {
      composerHeight = MIN_COMPOSER_HEIGHT,
      disableComposer = false,
      keyboardAppearance = 'default',
      multiline = true,
      onInputSizeChanged,
      onTextChanged,
      placeholder = DEFAULT_PLACEHOLDER,
      placeholderTextColor = Color.defaultColor,
      textInputAutoFocus = false,
      text,
      textInputProps,
      textInputStyle,
      onPressPickMedia,
    }: ComposerProps,
    _ref: React.Ref<TextInput>
  ) => {
    const dimensionsRef: any = useRef<{ width: number; height: number }>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [widthText, setWidthText] = useState(0);
    const [lineCount, setLineCount] = useState(1);

    const determineInputSizeChange = useCallback(
      (dimensions: { width: number; height: number }) => {
        // Support earlier versions of React Native on Android.
        if (!dimensions) return;

        if (
          !dimensionsRef.current ||
          (dimensionsRef.current &&
            (dimensionsRef.current.width !== dimensions.width ||
              dimensionsRef.current.height !== dimensions.height))
        ) {
          dimensionsRef.current = dimensions;
          setWidthText(dimensions.width);
          onInputSizeChanged?.(dimensions);
        }
      },
      [onInputSizeChanged]
    );

    const handleContentSizeChange = useCallback(
      ({
        nativeEvent: { contentSize },
      }: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) =>
        determineInputSizeChange(contentSize),
      [determineInputSizeChange]
    );

    const handleLayout = (e: LayoutChangeEvent) => {
      const height = e.nativeEvent.layout.height;
      const lines = Math.max(1, Math.round(height / 22));
      setLineCount(lines);
    };

    const borderRadiusByLineCount = useMemo(() => {
      if (lineCount === 1) {
        return 100;
      }
      return 16;
    }, [lineCount]);

    const heightInput = useMemo(() => {
      if (lineCount === 1) {
        return composerHeight;
      }
      const height = lineCount * 22;
      if (height > MAX_COMPOSER_HEIGHT / 2) {
        return MAX_COMPOSER_HEIGHT / 2 + 20;
      }
      return height;
    }, [lineCount, composerHeight]);

    return (
      <View style={styles.container}>
        {isFocused && !isPickerOpen && (
          <ButtonBase onPress={() => setIsPickerOpen(true)}>
            <Image
              tintColor={Color.defaultBlue}
              resizeMode="contain"
              source={require('../assets/next.png')}
              style={{ width: 18, height: 18 }}
            />
          </ButtonBase>
        )}
        {(!isFocused || isPickerOpen) && (
          <>
            <ButtonBase onPress={() => onPressPickMedia?.('camera')}>
              <Image
                tintColor={Color.defaultBlue}
                resizeMode="contain"
                source={require('../assets/camera.png')}
                style={styles.iconPick}
              />
            </ButtonBase>

            <ButtonBase onPress={() => onPressPickMedia?.('pick')}>
              <Image
                tintColor={Color.defaultBlue}
                resizeMode="contain"
                source={require('../assets/photo.png')}
                style={styles.iconPick}
              />
            </ButtonBase>
          </>
        )}

        {/* <ButtonBase>
        <Image source={require('../assets/mic.png')} style={styles.iconPick} />
      </ButtonBase> */}

        <View
          style={[
            styles.textInputContainer,
            {
              borderRadius: borderRadiusByLineCount,
            },
          ]}
        >
          <TextInput
            testID={placeholder}
            accessible
            accessibilityLabel={placeholder}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            multiline={multiline}
            editable={!disableComposer}
            onContentSizeChange={handleContentSizeChange}
            onChangeText={(txt) => {
              onTextChanged?.(txt);
              setIsPickerOpen(false);
            }}
            style={[
              stylesCommon.fill,
              styles.textInput,
              textInputStyle,
              {
                height: heightInput,
                ...Platform.select({
                  web: {
                    outlineWidth: 0,
                    outlineColor: 'transparent',
                    outlineOffset: 0,
                  },
                }),
              },
            ]}
            autoFocus={textInputAutoFocus}
            value={text}
            enablesReturnKeyAutomatically
            underlineColorAndroid="transparent"
            keyboardAppearance={keyboardAppearance}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              setIsPickerOpen(false);
            }}
            {...textInputProps}
          />

          <Text
            onLayout={handleLayout}
            style={[
              styles.hiddenText,
              {
                width: widthText,
              },
            ]}
          >
            {text}
          </Text>

          {/* <ButtonBase>
          <Image
            tintColor={Color.defaultBlue}
            resizeMode="contain"
            source={require('../assets/smileFace.png')}
            style={styles.iconPick}
          />
        </ButtonBase> */}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Color.leftBubbleBackground,
    paddingHorizontal: 8,
  },
  textInput: {
    paddingRight: 8,
    paddingLeft: 8,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    ...Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4,
      },
    }),
    marginTop: Platform.select({
      ios: 6,
      android: 0,
      web: 6,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
      web: 4,
    }),
  },
  iconPick: {
    width: 24,
    height: 24,
  },
  hiddenText: {
    position: 'absolute',
    top: -9999,
    left: -9999,
    paddingRight: 8,
    paddingLeft: 8,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    ...Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4,
      },
    }),
    marginTop: Platform.select({
      ios: 6,
      android: 0,
      web: 6,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
      web: 4,
    }),
  },
  inputPreview: {
    paddingRight: 8,
    paddingLeft: 8,
    ...Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4,
      },
    }),
    marginTop: Platform.select({
      ios: 6,
      android: 0,
      web: 6,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
      web: 4,
    }),
  },
  txtPreview: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
  },
});
