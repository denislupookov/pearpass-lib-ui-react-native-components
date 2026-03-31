import React from 'react';
import { html } from 'react-strict-dom';
import { SearchOutlined } from '../../icons';
import { useTheme } from '../../theme';
import { styles } from './SearchField.styles';
import { SearchFieldProps } from './types';

export const SearchField = ({
  value,
  placeholderText = 'Search',
  onChangeText,
  size = 'small',
  testID,
  inputRef,
  onFocus,
  onBlur,
  style,
  'aria-label': ariaLabel,
}: SearchFieldProps): React.ReactElement => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <html.div
      style={[
        styles.root,
        size === 'small' ? styles.rootSmall : styles.rootMedium,
        isFocused && styles.rootFocused,
        style,
      ]}
      data-testid={testID}
    >
      <html.div style={styles.icon}>
        <SearchOutlined
          width={16}
          height={16}
          color={theme.colors.colorTextSearchField}
        />
      </html.div>
      <html.input
        ref={inputRef}
        type="text"
        value={value}
        placeholder={placeholderText}
        aria-label={ariaLabel ?? placeholderText}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => onChangeText(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.input}
      />
    </html.div>
  );
};

SearchField.displayName = 'SearchField';
