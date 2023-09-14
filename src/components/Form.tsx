import { Button } from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useAppContext } from '../hooks/context';
import { UserSchema, type UserType } from '../utils/schemaValidation';
import FormWithoutSubmission from './FormWithoutSubmission';

function Form() {
  const { dispatch } = useAppContext()!;
  const form = useForm<UserType>({
    defaultValues: {
      fullName: '',
      email: '',
      age: NaN,
      id: 0,
      createdAt: '',
      active: false,
    },
    resolver: valibotResolver(UserSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<UserType> = (data) => {
    dispatch({
      type: 'SET_USER',
      payload: {
        ...data,
        id: -Math.floor(Math.random() * 1000),
        createdAt: new Date().toString(),
      },
    });
  };
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = form;
  return (
    <>
      <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormWithoutSubmission form={form} />
        <Button
          type="submit"
          color="primary"
          className="disabled:cursor-not-allowed disabled:bg-gray-300"
          fullWidth
          disabled={!isValid}
        >
          Submit
        </Button>
      </form>
      <DevTool control={control} />
    </>
  );
}
export default Form;
