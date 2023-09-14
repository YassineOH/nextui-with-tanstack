import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import { UserType } from '../utils/schemaValidation';
import { Key } from 'react';
import { useAppContext } from '../hooks/context';

type Props = {
  user: UserType;
};

function EditAndDeleteRow({ user }: Props) {
  const { dispatch } = useAppContext()!;
  const handleAction = (key: Key) => {
    console.log(key);

    if (key === 'edit') {
      console.log('editing', user);
      // dispatch({type:'UPDATE_USER', payload: user})
    } else if (key === 'delete') {
      dispatch({ type: 'DELETE_USER', payload: user.id });
    }
  };

  return (
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
  );
}
export default EditAndDeleteRow;
