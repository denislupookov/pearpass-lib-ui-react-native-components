import { DateFieldPickerMode } from './types';

const pad = (value: number): string => String(value).padStart(2, '0');

export const formatDateFieldValue = (
  date: Date,
  pickerMode: DateFieldPickerMode = 'date'
): string => {
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const shortYear = String(year).slice(-2);
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  switch (pickerMode) {
    case 'time':
      return `${hours}:${minutes}`;
    case 'datetime':
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    case 'month-year':
      return `${month} / ${shortYear}`;
    case 'date':
    default:
      return `${day}/${month}/${year}`;
  }
};

export const parseDateFieldValue = (
  value: string,
  pickerMode: DateFieldPickerMode = 'date'
): Date | null => {
  if (!value?.trim()) {
    return null;
  }

  if (pickerMode === 'time') {
    const match = value.match(/^(\d{1,2}):(\d{2})$/);

    if (match) {
      const date = new Date();
      date.setHours(Number(match[1]), Number(match[2]), 0, 0);
      return date;
    }
  }

  if (pickerMode === 'month-year') {
    const match = value.match(/^(\d{1,2})\s*\/\s*(\d{2}|\d{4})$/);

    if (match) {
      const month = Number(match[1]) - 1;
      const rawYear = Number(match[2]);
      const year = match[2].length === 2 ? 2000 + rawYear : rawYear;
      return new Date(year, month, 1, 0, 0, 0, 0);
    }
  }

  if (pickerMode === 'datetime') {
    const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})$/);

    if (match) {
      return new Date(
        Number(match[3]),
        Number(match[2]) - 1,
        Number(match[1]),
        Number(match[4]),
        Number(match[5]),
        0,
        0
      );
    }
  }

  const dateMatch = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

  if (dateMatch) {
    return new Date(
      Number(dateMatch[3]),
      Number(dateMatch[2]) - 1,
      Number(dateMatch[1]),
      0,
      0,
      0,
      0
    );
  }

  const fallbackDate = new Date(value);
  return Number.isNaN(fallbackDate.getTime()) ? null : fallbackDate;
};

export const getMonthYearParts = (date: Date) => ({
  month: date.getMonth(),
  year: date.getFullYear(),
});
