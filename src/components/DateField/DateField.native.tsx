import React from 'react';
import DateTimePicker, {
  DateTimePickerAndroid,
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Modal, Platform, Pressable, StyleSheet, View } from 'react-native';

import { Text } from '../Text';

import { useTheme } from '../../theme';
import { rawTokens } from '../../theme/tokens.raw';
import { InputField } from '../InputField';
import { DateFieldProps, DateFieldPickerMode } from './types';
import { formatDateFieldValue, parseDateFieldValue } from './utils';
import { PICKER_MODE } from './constants';

const getPickerDate = (
  value: string,
  valueDate?: Date | null,
  pickerMode: DateFieldPickerMode = PICKER_MODE.date
): Date => valueDate ?? parseDateFieldValue(value, pickerMode) ?? new Date();

type IOSPickerMode = Exclude<DateFieldPickerMode, typeof PICKER_MODE.monthYear>;
type AndroidPickerMode = typeof PICKER_MODE.date | typeof PICKER_MODE.time;

const getIOSPickerMode = (pickerMode: DateFieldPickerMode): IOSPickerMode => {
  if (pickerMode === PICKER_MODE.time) return PICKER_MODE.time;
  if (pickerMode === PICKER_MODE.datetime) return PICKER_MODE.datetime;
  return PICKER_MODE.date;
};

const getAndroidPickerMode = (pickerMode: DateFieldPickerMode): AndroidPickerMode =>
  pickerMode === PICKER_MODE.time ? PICKER_MODE.time : PICKER_MODE.date;

const getIOSDisplay = (): 'spinner' => 'spinner';

export const DateField = ({
  pickerMode = PICKER_MODE.date,
  valueDate,
  onChangeDate,
  minimumDate,
  maximumDate,
  locale,
  rightSlot,
  onChangeText,
  disabled = false,
  readOnly = false,
  onFocus,
  onBlur,
  value,
  ...props
}: DateFieldProps): React.ReactElement => {
  const { theme, themeType } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [draftDate, setDraftDate] = React.useState(() =>
    getPickerDate(value, valueDate, pickerMode)
  );

  React.useEffect(() => {
    setDraftDate(getPickerDate(value, valueDate, pickerMode));
  }, [pickerMode, value, valueDate]);

  const commitValue = React.useCallback(
    (nextDate: Date) => {
      onChangeText?.(formatDateFieldValue(nextDate, pickerMode));
      onChangeDate?.(nextDate);
    },
    [onChangeDate, onChangeText, pickerMode]
  );

  const handleIOSConfirm = React.useCallback(() => {
    commitValue(draftDate);
    setIsOpen(false);
    onBlur?.();
  }, [commitValue, draftDate, onBlur]);

  const handleIOSCancel = React.useCallback(() => {
    setDraftDate(getPickerDate(value, valueDate, pickerMode));
    setIsOpen(false);
    onBlur?.();
  }, [onBlur, pickerMode, value, valueDate]);

  const handleAndroidChange = React.useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (event.type === 'dismissed' || !selectedDate) {
        onBlur?.();
        return;
      }

      commitValue(selectedDate);
      onBlur?.();
    },
    [commitValue, onBlur]
  );

  const handleOpen = React.useCallback(() => {
    if (disabled || readOnly) {
      return;
    }

    const nextDate = getPickerDate(value, valueDate, pickerMode);
    setDraftDate(nextDate);
    onFocus?.();

    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: nextDate,
        mode: getAndroidPickerMode(pickerMode),
        minimumDate,
        maximumDate,
        is24Hour: true,
        onChange: handleAndroidChange,
      });
      return;
    }

    setIsOpen((prev) => !prev);
  }, [disabled, handleAndroidChange, maximumDate, minimumDate, onFocus, pickerMode, readOnly, value, valueDate]);

  return (
    <View style={styles.wrapper}>
      <InputField
        {...props}
        value={value}
        readOnly
        disabled={disabled}
        onClick={handleOpen}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
      />

      {Platform.OS === 'ios' ? (
        <Modal
          visible={isOpen}
          transparent
          animationType="slide"
          onRequestClose={handleIOSCancel}
        >
          <Pressable style={styles.modalOverlay} onPress={handleIOSCancel} />
          <View
            style={[
              styles.modalSheet,
              { backgroundColor: theme.colors.colorSurfacePrimary },
            ]}
          >
            <View
              style={[
                styles.modalToolbar,
                { borderBottomColor: theme.colors.colorBorderPrimary },
              ]}
            >
              <Pressable onPress={handleIOSCancel} hitSlop={12}>
                <Text variant="body" color={theme.colors.colorTextSecondary}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable onPress={handleIOSConfirm} hitSlop={12}>
                <Text variant="bodyEmphasized" color={theme.colors.colorPrimary}>
                  Done
                </Text>
              </Pressable>
            </View>
            <View style={styles.pickerWrapper}>
              <DateTimePicker
                value={draftDate}
                mode={getIOSPickerMode(pickerMode)}
                display={getIOSDisplay()}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                locale={locale}
                themeVariant={themeType}
                style={styles.picker}
                onChange={(_event, selectedDate) => {
                  if (!selectedDate) {
                    return;
                  }
                  setDraftDate(selectedDate);
                }}
              />
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: rawTokens.spacing8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalSheet: {
    borderTopLeftRadius: rawTokens.radius16,
    borderTopRightRadius: rawTokens.radius16,
    paddingBottom: rawTokens.spacing32,
    overflow: 'hidden',
  },
  pickerWrapper: {
    alignItems: 'center',
  },
  picker: {
    height: 200,
    width: '100%',
  },
  modalToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: rawTokens.spacing16,
    paddingVertical: rawTokens.spacing12,
    borderBottomWidth: 1,
  },
});

DateField.displayName = 'DateField';
