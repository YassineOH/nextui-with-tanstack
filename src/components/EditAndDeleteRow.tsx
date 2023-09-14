import { type Key } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import { UserType } from '../utils/schemaValidation';
import { useAppContext } from '../hooks/context';
import ModalForm from './ModalForm';

type Props = {
  user: UserType;
};

function EditAndDeleteRow({ user }: Props) {
  const { dispatch } = useAppContext()!;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const handleAction = (key: Key) => {
    if (key === 'edit') {
      onOpen();
    } else if (key === 'delete') {
      dispatch({ type: 'DELETE_USER', payload: user.id });
    }
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="light">
            <FontAwesomeIcon icon={faEllipsis} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          onAction={(key) => handleAction(key)}
          aria-label="Static Actions"
        >
          <DropdownItem key="edit">Edit</DropdownItem>
          <DropdownItem key="delete" color="danger">
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {isOpen ? (
        <ModalForm isOpen={isOpen} onClose={onClose} user={user} />
      ) : null}
    </>
  );
}
export default EditAndDeleteRow;
