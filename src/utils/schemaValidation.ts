import {
  number,
  string,
  email,
  minValue,
  minLength,
  object,
  Input,
  enumType,
  boolean,
} from 'valibot';

export const UserSchema = object({
  id: number(),
  createdAt: string(),
  gender: enumType(['Male', 'Female'], 'Select a gender'),
  active: boolean(),
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

export type UserType = Input<typeof UserSchema>;
