import {
  Input,
  Button,
  // Select,
  // SelectItem,
  Checkbox,
  Radio,
  RadioGroup,
} from '@nextui-org/react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useAppContext } from '../hooks/context';
import { UserSchema, type UserType } from '../utils/schemaValidation';

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
        {/* <Select
          label="select your gender"
          variant="faded"
          isRequired
          {...register('gender')}
          errorMessage={errors.gender?.message}
          color={errors.gender ? 'danger' : 'default'}
        >
          {['Male', 'Female'].map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </Select> */}
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <RadioGroup
              isRequired
              label="select your gender"
              orientation="horizontal"
              errorMessage={errors.gender?.message}
              color={errors.gender ? 'danger' : 'default'}
              {...field}
            >
              {['Female', 'Male'].map((item) => {
                return (
                  <Radio key={item} value={item}>
                    {item}
                  </Radio>
                );
              })}
            </RadioGroup>
          )}
        />

        <Controller
          name="active"
          control={control}
          render={({ field }) => (
            <Checkbox {...field} value={field.value as unknown as string}>
              Active
            </Checkbox>
          )}
        />
        {/* <Checkbox {...register('active')}>Active </Checkbox> */}
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
