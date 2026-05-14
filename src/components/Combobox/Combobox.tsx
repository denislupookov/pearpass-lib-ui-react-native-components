import { useState, useCallback } from 'react'
import { html } from 'react-strict-dom'
import { styles } from './Combobox.styles'
import { InputField } from '../InputField'
import { ListItem } from '../ListItem'
import { SelectField } from '../SelectField'
import { Button } from '../Button'
import { Text } from '../Text'
import { Close, KeyboardArrowBottom } from '../../icons'
import { useTheme } from '../../theme'
import { ContextMenu } from '../ContextMenu'
import type { ComboboxProps } from './types'

export type { ComboboxProps, ComboboxItem } from './types'

export const Combobox = function Combobox({
  label,
  title,
  value,
  placeholder,
  onClear,
  disabled = false,
  error,
  items,
  selectedId,
  onSelect,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  emptyText = 'No results',
  open,
  onOpenChange,
  clearAriaLabel = 'Clear',
  closeAriaLabel = 'Close',
  testID,
}: ComboboxProps) {
  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = useState(false)
  const effectiveOpen = isControlled ? open : internalOpen
  const { theme } = useTheme()

  const handleOpenChange = useCallback(
    (val: boolean) => {
      if (val && disabled) return
      if (!isControlled) setInternalOpen(val)
      onOpenChange?.(val)
    },
    [isControlled, disabled, onOpenChange]
  )

  const handleSelect = useCallback(
    (id: string) => {
      onSelect(id)
      handleOpenChange(false)
    },
    [onSelect, handleOpenChange]
  )

  const rightSlot = (
    <html.div style={styles.rightSlot}>
      {onClear && value ? (
        <Button
          variant='tertiary'
          size='small'
          type='button'
          aria-label={clearAriaLabel}
          iconBefore={
            <Close
              width={16}
              height={16}
              color={theme.colors.colorTextPrimary}
            />
          }
          onClick={(e) => {
            e.stopPropagation()
            onClear()
          }}
        />
      ) : null}
      <html.span
        style={[styles.chevron, effectiveOpen ? styles.chevronOpen : undefined]}
      >
        <KeyboardArrowBottom
          width={16}
          height={16}
          color={theme.colors.colorTextPrimary}
        />
      </html.span>
    </html.div>
  )

  return (
    <ContextMenu
      open={effectiveOpen}
      onOpenChange={handleOpenChange}
      testID={testID}
      fullWidth
      closeOnContentClick={false}
      trigger={
        <SelectField
          label={label}
          value={value}
          placeholder={placeholder}
          error={error}
          disabled={disabled}
          rightSlot={rightSlot}
        />
      }
    >
      {title && typeof document === 'undefined' ? (
        <html.div style={styles.header}>
          <html.div style={styles.headerSpacer} />
          <html.div style={styles.headerTitle}>
            <Text variant='bodyEmphasized'>{title}</Text>
          </html.div>
          <Button
            variant='tertiary'
            size='medium'
            type='button'
            aria-label={closeAriaLabel}
            iconBefore={
              <Close
                width={16}
                height={16}
                color={theme.colors.colorTextPrimary}
              />
            }
            onClick={() => handleOpenChange(false)}
          />
        </html.div>
      ) : null}
      <html.div style={typeof document !== 'undefined' ? styles.searchPaddingWeb : styles.searchPaddingNative}>
        <InputField
          placeholder={searchPlaceholder}
          value={searchValue}
          onChangeText={onSearchChange}
        />
      </html.div>
      <html.div style={styles.itemsList}>
        {items.length > 0 ? (
          items.map((item) => (
            <ListItem
              key={item.id}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              rightElement={item.rightElement}
              selected={item.id === selectedId}
              onClick={() => handleSelect(item.id)}
              testID={`combobox-item-${item.id}`}
            />
          ))
        ) : (
          <html.div style={styles.emptyState}>{emptyText}</html.div>
        )}
      </html.div>
    </ContextMenu>
  )
}
