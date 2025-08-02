import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import type { FileMessage } from './types';
import type { IMessage } from './types';
import { getScreenHeight, getScreenWidth } from 'tradewize';
import Color from './Color';
import { BlurView } from '@react-native-community/blur';
import { MessageFile } from './MessageFile';

interface MediaAllShowProps {
  isVisible: boolean;
  onClose: () => void;
  fileMediaAll: IMessage | null;
  onPressFile?: (file: FileMessage) => void;
}

export function MediaAllShow({
  isVisible,
  onClose,
  fileMediaAll,
  onPressFile,
}: MediaAllShowProps) {
  return (
    <Modal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      backdropOpacity={0}
    >
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
        <BlurView
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="black"
        />
      </Pressable>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header} />

          <ScrollView style={styles.scrollView}>
            <MessageFile
              onPressFile={onPressFile}
              isShowAll
              currentMessage={fileMediaAll || ({} as IMessage)}
              messageWidth={{ width: getScreenWidth(), _id: '' }}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: getScreenHeight() * 0.5,
    paddingBottom: 48,
    backgroundColor: Color.white,
    alignItems: 'center',
  },
  header: {
    height: 8,
    backgroundColor: Color.defaultColor,
    borderRadius: 12,
    width: 60,
    marginTop: 12,
    marginBottom: 8,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Color.white,
  },
  contentScroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
