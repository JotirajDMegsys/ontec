import React from 'react'

export const Popup = () => {
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text></Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text>Close Popup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  )
}
