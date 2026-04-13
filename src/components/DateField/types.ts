import { InputFieldProps } from '../InputField';
import { PICKER_MODE } from './constants';

export type DateFieldPickerMode = (typeof PICKER_MODE)[keyof typeof PICKER_MODE];

export interface DateFieldProps extends Omit<InputFieldProps, 'onChange' | 'inputType'> {
  pickerMode?: DateFieldPickerMode;
  valueDate?: Date | null;
  onChangeDate?: (date: Date | null) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  locale?: string;
}
