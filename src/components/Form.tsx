import { Input, Button } from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { valibotResolver } from '@hookform/resolvers/valibot';

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
  fullName: string('Enter your full name', [
    minLength(3, 'the should have a least 3 characters'),
  ]),
  email: string('Enter your email', [email('Invalid email')]),
  age: number('Enter you age', [minValue(18, 'You should be adult')]),
});

type UserType = InferInput<typeof UserSchema>;

function Form() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserType>({
    defaultValues: {
      fullName: '',
      email: '',
      age: 0,
    },
    resolver: valibotResolver(UserSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<UserType> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('fullName')}
          variant="faded"
          type="string"
          label="full name"
          errorMessage={errors.fullName?.message}
          color={errors.fullName ? 'danger' : 'default'}
        />
        <Input
          {...register('email')}
          variant="faded"
          type="email"
          label="email"
          errorMessage={errors.email?.message}
          color={errors.email ? 'danger' : 'default'}
        />
        <Input
          {...register('age', { valueAsNumber: true })}
          variant="faded"
          type="number"
          label="age"
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
