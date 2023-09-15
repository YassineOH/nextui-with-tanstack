import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
} from '@nextui-org/react';
import FormWithoutSubmission from './FormWithoutSubmission';
import { UserSchema, UserType } from '../utils/schemaValidation';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useAppContext } from '../hooks/context';

type Props = {
  user: UserType;
  onClose: () => void;
  isOpen: boolean;
};

function ModalForm({ user, onClose, isOpen }: Props) {
  const { dispatch } = useAppContext()!;
  const form = useForm<UserType>({
    defaultValues: { ...user, age: user.age, fullName: user.fullName },
    resolver: valibotResolver(UserSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<UserType> = (data) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: data,
    });
    onClose();
  };

  const {
    handleSubmit,
    formState: { isValid },
  } = form;
  return (
    <Modal isOpen={isOpen} backdrop="blur">
      <ModalContent>
        <ModalHeader>Change user </ModalHeader>
        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormWithoutSubmission form={form} />
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="primary"
              className="disabled:cursor-not-allowed disabled:bg-gray-300"
              fullWidth
              disabled={!isValid}
            >
              Change
            </Button>
            <Button type="button" color="danger" fullWidth onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
export default ModalForm;
