import {
  Input,
  // Select,
  // SelectItem,
  Checkbox,
  Radio,
  RadioGroup,
} from '@nextui-org/react';
import { Controller, type UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<
    {
      id: number;
      email: string;
      fullName: string;
      age: number;
      gender: 'Female' | 'Male';
      active: boolean;
      createdAt: string;
    },
    unknown,
    undefined
  >;
};

function FormWithoutSubmission({ form }: Props) {
  return (
    <>
      <Input
        {...form.register('fullName')}
        variant="faded"
        type="string"
        label="full name"
        isRequired={true}
        errorMessage={form.formState.errors.fullName?.message}
        color={form.formState.errors.fullName ? 'danger' : 'default'}
      />
      <Input
        {...form.register('email')}
        variant="faded"
        type="email"
        label="email"
        isRequired={true}
        errorMessage={form.formState.errors.email?.message}
        color={form.formState.errors.email ? 'danger' : 'default'}
      />
      <Input
        {...form.register('age', { valueAsNumber: true })}
        variant="faded"
        type="number"
        label="age"
        isRequired={true}
        errorMessage={form.formState.errors.age?.message}
        color={form.formState.errors.age ? 'danger' : 'default'}
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
        control={form.control}
        render={({ field }) => (
          <RadioGroup
            isRequired
            label="select your gender"
            orientation="horizontal"
            errorMessage={form.formState.errors.gender?.message}
            color={form.formState.errors.gender ? 'danger' : 'default'}
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
        control={form.control}
        render={({ field }) => (
          <Checkbox
            {...field}
            defaultSelected={field.value}
            value={field.value as unknown as string}
          >
            Active
          </Checkbox>
        )}
      />
      {/* <Checkbox {...register('active')}>Active </Checkbox> */}
    </>
  );
}
export default FormWithoutSubmission;
