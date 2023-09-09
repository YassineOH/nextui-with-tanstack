import { Input, Button } from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';

import {
  object,
  email,
  string,
  number,
  minValue,
  type Input as InferInput,
} from 'valibot';

const UserSchema = object({
  fullName: string('Enter your full name'),
  email: string('Enter your email', [email('Invalid email')]),
  age: number('Enter you age', [minValue(18, 'You should be adult')]),
});

type UserType = InferInput<typeof UserSchema>;

function Form() {
  const { register, handleSubmit } = useForm<UserType>({
    defaultValues: {
      fullName: '',
      email: '',
      age: NaN,
    },
    resolver: valibotResolver(UserSchema),
  });

  const onSubmit: SubmitHandler<UserType> = (data) => {
    console.log(data);
  };

  return (
    <form className="w-full space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('fullName')}
        variant="faded"
        type="string"
        label="full name"
      />
      <Input
        {...register('email')}
        variant="faded"
        type="email"
        label="email"
      />
      <Input {...register('age')} variant="faded" type="number" label="age" />
      <Button
        type="submit"
        color="primary"
        className="disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        Submit
      </Button>
    </form>
  );
}
export default Form;
