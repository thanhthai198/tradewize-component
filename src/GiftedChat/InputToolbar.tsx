import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { Composer, type ComposerProps } from './Composer';
import { Send, type SendProps } from './Send';
import { Actions, type ActionsProps } from './Actions';
import Color from './Color';
import { type FileMessage, type IMessage } from './types';
import { getScreenWidth } from '../utils';
import FastImage from 'react-native-fast-image';
import { formatDurationSmart } from './utils';

export interface InputToolbarProps<TMessage extends IMessage> {
  options?: { [key: string]: () => void };
  optionTintColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  primaryStyle?: StyleProp<ViewStyle>;
  accessoryStyle?: StyleProp<ViewStyle>;
  renderAccessory?(props: InputToolbarProps<TMessage>): React.ReactNode;
  renderActions?(props: ActionsProps): React.ReactNode;
  renderSend?(props: SendProps<TMessage>): React.ReactNode;
  renderComposer?(props: ComposerProps): React.ReactNode;
  onPressActionButton?(): void;
  icon?: () => React.ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
  inputRef?: React.RefObject<TextInput>;
  onPressPickMedia?: (type: 'camera' | 'pick') => void;
  fileMedia?: FileMessage[];
  onRemoveFile?: (file: FileMessage) => void;
  onPressFile?: (file: FileMessage) => void;
}

export function InputToolbar<TMessage extends IMessage = IMessage>(
  props: InputToolbarProps<TMessage>
) {
  const {
    renderActions,
    onPressActionButton,
    renderComposer,
    renderSend,
    renderAccessory,
    options,
    optionTintColor,
    icon,
    wrapperStyle,
    containerStyle,
    onPressPickMedia,
    fileMedia,
    onRemoveFile,
    onPressFile,
  } = props;

  const actionsFragment = useMemo(() => {
    const props = {
      onPressActionButton,
      options,
      optionTintColor,
      icon,
      wrapperStyle,
      containerStyle,
      onPressPickMedia,
    };

    return (
      renderActions?.(props) || (onPressActionButton && <Actions {...props} />)
    );
  }, [
    renderActions,
    onPressActionButton,
    options,
    optionTintColor,
    icon,
    wrapperStyle,
    containerStyle,
    onPressPickMedia,
  ]);

  const composerFragment = useMemo(() => {
    return (
      renderComposer?.(props as ComposerProps) || (
        <Composer
          ref={props?.inputRef}
          {...(props as ComposerProps)}
          onPressPickMedia={props.onPressPickMedia}
        />
      )
    );
  }, [renderComposer, props]);

  const renderFileMedia = useMemo(() => {
    if (!fileMedia?.length) return null;

    return (
      <View style={styles.previewFile}>
        {fileMedia?.map((item) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onPressFile?.(item);
              }}
              key={item.id}
              style={[
                styles.previewFileItem,
                {
                  width: getScreenWidth() * 0.22,
                  height: getScreenWidth() * 0.22,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  onRemoveFile?.(item);
                }}
                style={[
                  styles.removeFile,
                  {
                    width: getScreenWidth() * 0.06,
                    height: getScreenWidth() * 0.06,
                  },
                ]}
              >
                <Text style={styles.removeFileText}>X</Text>
              </TouchableOpacity>

              <FastImage
                source={{ uri: item.thumbnailPreview }}
                style={styles.previewFileItemImage}
              />

              {item.typeFile === 'video' && (
                <View
                  style={[
                    styles.iconPlayContainer,
                    {
                      width: getScreenWidth() * 0.1,
                      height: getScreenWidth() * 0.1,
                      top:
                        (getScreenWidth() * 0.22) / 2 -
                        (getScreenWidth() * 0.1) / 2,
                      right:
                        (getScreenWidth() * 0.22) / 2 -
                        (getScreenWidth() * 0.1) / 2,
                    },
                  ]}
                >
                  <FastImage
                    source={require('../assets/play.png')}
                    style={styles.iconPlay}
                  />
                </View>
              )}

              {item.typeFile === 'video' && (
                <View style={styles.previewFileItemVideo}>
                  <Text style={styles.previewFileItemVideoText}>
                    {formatDurationSmart(item?.duration || 0)}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }, [fileMedia, onRemoveFile, onPressFile]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.primary, props.primaryStyle]}>
        {actionsFragment}
        {composerFragment}
        {renderSend?.(props) || <Send {...props} />}
      </View>
      {renderAccessory && (
        <View style={[styles.accessory, props.accessoryStyle]}>
          {renderAccessory(props)}
        </View>
      )}
      {renderFileMedia}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Color.defaultColor,
    backgroundColor: Color.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accessory: {
    height: 44,
  },
  previewFile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  previewFileItem: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Color.defaultColor,
    borderWidth: 1,
    borderColor: Color.defaultColor,
  },
  previewFileItemImage: {
    width: '100%',
    height: '100%',
  },
  previewFileItemVideo: {
    position: 'absolute',
    bottom: 2,
    right: 4,
  },
  previewFileItemVideoText: {
    color: Color.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  removeFile: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: Color.defaultColor,
    borderRadius: 100,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.white,
  },
  removeFileText: {
    color: Color.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconPlay: {
    width: 24,
    height: 24,
    marginLeft: 4,
  },
  iconPlayContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 100,
  },
});
