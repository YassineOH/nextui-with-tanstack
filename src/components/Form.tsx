import { Input, Button } from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useAppContext } from '../hooks/context';

import {
  object,
  email,
  string,
  number,
  minValue,
  type Input as InferInput,
  minLength,
} from 'valibot';

const UserSchema = object({
  id: number(),
  createdAt: string(),
  fullName: string('Enter your full name', [
    minLength(3, 'the should have a least 3 characters'),
  ]),
  email: string('Enter your email', [email('Invalid email')]),
  age: number('Enter your age', [
    (v) => {
      if (isNaN(v)) {
        return {
          issue: {
            validation: 'custom',
            message: 'Enter your age',
            input: v,
          },
        };
      }
      return { output: v };
    },
    minValue(18, 'You should be adult'),
  ]),
});

export type UserType = InferInput<typeof UserSchema>;

function Form() {
  const { dispatch } = useAppContext()!;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserType>({
    defaultValues: {
      fullName: '',
      email: '',
      age: NaN,
      id: -Math.floor(Math.random() * 1000),
      createdAt: new Date().toString(),
    },
    resolver: valibotResolver(UserSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<UserType> = (data) => {
    dispatch({
      type: 'SET_USER',
      payload: { ...data, id: -Math.floor(Math.random() * 1000) },
    });
  };

  return (
    <>
      <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('fullName')}
          variant="faded"
          type="string"
          label="full name"
          isRequired={true}
          errorMessage={errors.fullName?.message}
          color={errors.fullName ? 'danger' : 'default'}
        />
        <Input
          {...register('email')}
          variant="faded"
          type="email"
          label="email"
          isRequired={true}
          errorMessage={errors.email?.message}
          color={errors.email ? 'danger' : 'default'}
        />
        <Input
          {...register('age', { valueAsNumber: true })}
          variant="faded"
          type="number"
          label="age"
          isRequired={true}
          errorMessage={errors.age?.message}
          color={errors.age ? 'danger' : 'default'}
        />
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
