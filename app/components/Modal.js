import * as React from 'react';
import { Modal, Portal, Provider } from 'react-native-paper';

const CustomModal = ({visible,hideModal,children}) => {
  const containerStyle = {backgroundColor: 'white', padding: 20,outerWidth:50,innerWidth:60};
  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          {children}
        </Modal>
      </Portal>
    </Provider>
  );
};

export default CustomModal;