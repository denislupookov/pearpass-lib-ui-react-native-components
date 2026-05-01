import React from 'react';
import { ScrollView, StyleSheet, Text, type TextInputProps } from 'react-native';
import { html } from 'react-strict-dom';
import { useTheme } from '../../theme';
import { rawTokens } from '../../theme/tokens.raw';
import { styles } from './InputField.styles';
import { InputValueProps } from './types';

export const InputValue = ({ inputRef, as: AsComponent, ...rest }: InputValueProps): React.ReactElement => {
  const { theme } = useTheme();
  const { value, type, placeholder, disabled, readOnly, onClick } = rest;

  if (readOnly) {
    const hasValue = Boolean(value);
    const displayValue = type === 'password' && hasValue
      ? '•'.repeat(value.length)
      : hasValue
        ? value
        : (placeholder ?? '');
    const textColor = hasValue
      ? theme.colors.colorTextPrimary
      : theme.colors.colorTextSecondary;

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={readOnlyStyles.scroll}
        contentContainerStyle={readOnlyStyles.scrollContent}
      >
        <Text numberOfLines={1} style={[readOnlyStyles.text, { color: textColor }]}>
          {displayValue}
        </Text>
      </ScrollView>
    );
  }

  const renderAs = AsComponent
    ? ((nativeProps: TextInputProps) => <AsComponent {...nativeProps} />) as unknown as React.ReactNode
    : undefined;

  return (
    <html.input
      {...rest}
      ref={inputRef}
      onClick={disabled ? undefined : onClick}
      style={[styles.input, disabled && styles.containerDisabled]}
    >
      {renderAs}
    </html.input>
  );
};

const readOnlyStyles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
    alignSelf: 'stretch',
  },
  scrollContent: {
    flexGrow: 1,
  },
  text: {
    fontFamily: rawTokens.fontPrimary,
    fontWeight: rawTokens.weightMedium,
    fontSize: rawTokens.fontSize14,
    lineHeight: rawTokens.spacing20,
  },
});
