import React from 'react';
import { CalendarToday } from '../../icons';
import { useTheme } from '../../theme';
import { InputField } from '../InputField';
import { DateFieldProps } from './types';

export const DateField = ({
  pickerMode: _pickerMode,
  valueDate: _valueDate,
  onChangeDate: _onChangeDate,
  minimumDate: _minimumDate,
  maximumDate: _maximumDate,
  locale: _locale,
  rightSlot,
  ...props
}: DateFieldProps): React.ReactElement => {
  const { theme } = useTheme();

  return (
    <InputField
      {...props}
      rightSlot={
        rightSlot ?? <CalendarToday color={theme.colors.colorTextPrimary} />
      }
    />
  );
};

DateField.displayName = 'DateField';
