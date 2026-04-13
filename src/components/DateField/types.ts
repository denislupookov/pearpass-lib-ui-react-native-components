import { InputFieldProps } from '../InputField';

export type DateFieldPickerMode = 'date' | 'time' | 'datetime' | 'month-year';

export interface DateFieldProps extends Omit<InputFieldProps, 'onChange' | 'inputType'> {
  pickerMode?: DateFieldPickerMode;
  valueDate?: Date | null;
  onChangeDate?: (date: Date | null) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  locale?: string;
}
