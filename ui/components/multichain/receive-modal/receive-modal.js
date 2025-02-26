import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AvatarAccount,
  AvatarAccountSize,
  AvatarAccountVariant,
  Box,
  Modal,
  ModalOverlay,
  Text,
} from '../../component-library';
import { ModalContent } from '../../component-library/modal-content/deprecated';
import { ModalHeader } from '../../component-library/modal-header/deprecated';
import QrView from '../../ui/qr-code';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { getMetaMaskAccountsOrdered, getUseBlockie } from '../../../selectors';
import {
  AlignItems,
  BlockSize,
  Display,
  FlexDirection,
  JustifyContent,
  TextAlign,
  TextVariant,
} from '../../../helpers/constants/design-system';

export const ReceiveModal = ({ address, onClose }) => {
  const t = useI18nContext();
  const useBlockie = useSelector(getUseBlockie);
  const accounts = useSelector(getMetaMaskAccountsOrdered);
  const { name } = accounts.find((account) => account.address === address);

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader marginBottom={4} onClose={onClose}>
          {t('receive')}
        </ModalHeader>
        <Box
          display={Display.Flex}
          width={BlockSize.Full}
          justifyContent={JustifyContent.center}
        >
          <AvatarAccount
            variant={
              useBlockie
                ? AvatarAccountVariant.Blockies
                : AvatarAccountVariant.Jazzicon
            }
            address={address}
            size={AvatarAccountSize.Lg}
          />
        </Box>
        <Text
          marginTop={4}
          variant={TextVariant.bodyLgMedium}
          textAlign={TextAlign.Center}
        >
          {name}
        </Text>

        <Box
          display={Display.Flex}
          alignItems={AlignItems.center}
          flexDirection={FlexDirection.Column}
        >
          <QrView Qr={{ data: address }} />
        </Box>
      </ModalContent>
    </Modal>
  );
};

ReceiveModal.propTypes = {
  address: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
