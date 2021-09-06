import {useTheme} from '@react-navigation/native'
import React, {useState} from 'react'
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native'
import WallPaperManager from 'react-native-set-wallpaper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const BottomPopup = ({modalVisible, toggleModal, urls}) => {
  const {colors} = useTheme()
  const statuses = ['IDLE', 'SETTING', 'SET']
  const [settingWallpaperStatus, setSettingWallpaperStatus] = useState(
    statuses[0],
  )

  const showToast = () => {
    ToastAndroid.show('Wallpaper set successfully !', ToastAndroid.SHORT)
  }

  const setWallpaper = () => {
    setSettingWallpaperStatus(statuses[1])
    WallPaperManager.setWallpaper({uri: urls.regular}, res => {
      console.log(res)
      setSettingWallpaperStatus(statuses[2])
      showToast()
    })
  }

  return (
    <Modal
      animationType='none'
      transparent
      visible={modalVisible}
      onRequestClose={toggleModal}>
      <Pressable
        onPress={toggleModal}
        style={[styles.tint, {backgroundColor: colors.text}]}
      />
      <View style={styles.centeredView}>
        <View style={[styles.modalView, {backgroundColor: colors.cardHeader}]}>
          <Pressable onPress={setWallpaper} style={styles.itemWrapper}>
            <Text style={[styles.modalText, {color: colors.text}]}>
              Set as Wallpaper...
            </Text>
            {settingWallpaperStatus === statuses[1] && (
              <ActivityIndicator size='small' color={colors.text} />
            )}

            {settingWallpaperStatus === statuses[2] && (
              <MaterialCommunityIcons
                name='check'
                color={colors.text}
                size={18}
              />
            )}
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tint: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.4,
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // margin: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    // marginBottom: 15,
    fontSize: 16,
    // backgroundColor: 'gray',
    // textAlign: 'left',
    // width: '100%'
    flexGrow: 1,
  },
  itemWrapper: {
    alignItems: 'center',
    // backgroundColor: 'red',
    width: '100%',
    paddingHorizontal: 35,
    flexDirection: 'row',
    marginBottom: 15,
  },
})

export default BottomPopup
