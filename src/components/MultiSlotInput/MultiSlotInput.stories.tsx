import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { html, css } from 'react-strict-dom';
import { MultiSlotInput } from './MultiSlotInput';
import { InputField } from '../InputField/InputField';
import { Button } from '../Button/Button';
import SvgAdd from '../../icons/components/Add';
import SvgClose from '../../icons/components/Close';
import { tokens } from '../../theme/tokens.css';
import { useTheme } from '../../theme';

const meta: Meta<typeof MultiSlotInput> = {
  title: 'Components/MultiSlotInput',
  component: MultiSlotInput,
  argTypes: {
    children: { control: false },
    actions: { control: false },
    errorMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSlotInput>;

// ---------------------------------------------------------------------------
// Shared story styles
// ---------------------------------------------------------------------------

const storyStyles = css.create({
  container: {
    padding: tokens.spacing24,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing24,
    maxWidth: '560px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing16,
  },
  sectionTitle: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize16,
    fontWeight: tokens.weightMedium,
    color: tokens.colorTextPrimary,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorBorderSecondary,
    paddingBottom: tokens.spacing8,
  },
  caption: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
    color: tokens.colorTextSecondary,
  },
  badge: {
    paddingTop: tokens.spacing4,
    paddingBottom: tokens.spacing4,
    paddingLeft: tokens.spacing8,
    paddingRight: tokens.spacing8,
    borderRadius: '4px',
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
    fontWeight: tokens.weightMedium,
  },
  badgePrimary: {
    backgroundColor: tokens.colorSurfaceSecondary,
    color: tokens.colorTextSecondary,
  },
  badgeIndex: {
    backgroundColor: tokens.colorSurfacePrimary,
    color: tokens.colorTextTertiary,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorderSecondary,
  },
  slotIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    color: tokens.colorTextSecondary,
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
  },
});

// ---------------------------------------------------------------------------
// Helper: stateful wrapper for stories
// ---------------------------------------------------------------------------

interface StatefulProps {
  initialValues?: string[];
  errorMessage?: string;
  renderSlot: (
    index: number,
    value: string,
    onChangeText: (t: string) => void,
    onRemove: () => void,
    values: string[],
  ) => React.ReactNode;
  renderActions?: (onAdd: () => void) => React.ReactNode;
}

const Stateful = ({ initialValues = [''], errorMessage, renderSlot, renderActions }: StatefulProps) => {
  const [values, setValues] = React.useState<string[]>(initialValues);
  const { theme } = useTheme();

  const onAdd = () => setValues((p) => [...p, '']);
  const onChangeItem = (index: number, val: string) =>
    setValues((p) => p.map((v, i) => (i === index ? val : v)));
  const onRemove = (index: number) =>
    setValues((p) => p.filter((_, i) => i !== index));

  const defaultActions = (
    <Button
      variant="tertiary"
      onClick={onAdd}
      aria-label="Add another"
      iconBefore={<SvgAdd color={theme.colors.colorPrimary} />}
    >
      Add another
    </Button>
  );

  return (
    <MultiSlotInput
      actions={renderActions ? renderActions(onAdd) : defaultActions}
      errorMessage={errorMessage}
    >
      {values.map((value, index) => 
        renderSlot(index, value, (t) => onChangeItem(index, t), () => onRemove(index), values)
      )}
    </MultiSlotInput>
  );
};

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <html.div style={storyStyles.container}>
      <Stateful
        initialValues={['']}
        renderSlot={(index, value, onChangeText, onRemove, values) => {
          const { theme } = useTheme();
          return (
            <InputField
              label="Website"
              value={value}
              placeholder="https://example.com"
              onChangeText={onChangeText}
              rightSlot={
                values.length > 1 ? (
                  <Button
                    variant="tertiary"
                    size="small"
                    aria-label={`Remove slot ${index + 1}`}
                    onClick={onRemove}
                    iconBefore={<SvgClose color={theme.colors.colorPrimary} />}
                  />
                ) : undefined
              }
            />
          );
        }}
        renderActions={(onAdd) => {
          const { theme } = useTheme();
          return (
            <Button
              variant="tertiary"
              onClick={onAdd}
              aria-label="Add another website"
              iconBefore={<SvgAdd color={theme.colors.colorPrimary} />}
            >
              Add another website
            </Button>
          );
        }}
      />
    </html.div>
  ),
};

export const WithPrefilledValues: Story = {
  render: () => (
    <html.div style={storyStyles.container}>
      <Stateful
        initialValues={['alice@example.com', 'bob@example.com']}
        renderSlot={(index, value, onChangeText, onRemove, values) => {
          const { theme } = useTheme();
          return (
            <InputField
              label="Email"
              value={value}
              placeholder="Enter email address"
              onChangeText={onChangeText}
              rightSlot={
                values.length > 1 ? (
                  <Button
                    variant="tertiary"
                    size="small"
                    aria-label={`Remove slot ${index + 1}`}
                    onClick={onRemove}
                    iconBefore={<SvgClose color={theme.colors.colorPrimary} />}
                  />
                ) : undefined
              }
            />
          );
        }}
        renderActions={(onAdd) => {
          const { theme } = useTheme();
          return (
            <Button
              variant="tertiary"
              onClick={onAdd}
              aria-label="Add another email"
              iconBefore={<SvgAdd color={theme.colors.colorPrimary} />}
            >
              Add another email
            </Button>
          );
        }}
      />
    </html.div>
  ),
};

export const ErrorVariant: Story = {
  render: () => (
    <html.div style={storyStyles.container}>
      <Stateful
        initialValues={['not-a-url']}
        errorMessage="Invalid URL. Please enter a valid website."
        renderSlot={(_, value, onChangeText) => (
          <InputField
            label="Website"
            value={value}
            placeholder="https://example.com"
            onChangeText={onChangeText}
            isGrouped
          />
        )}
        renderActions={(onAdd) => {
          const { theme } = useTheme();
          return (
            <Button
              variant="tertiary"
              onClick={onAdd}
              aria-label="Add another website"
              iconBefore={<SvgAdd color={theme.colors.colorPrimary} />}
            >
              Add another website
            </Button>
          );
        }}
      />
    </html.div>
  ),
};

export const WithBadgeRightSlot: Story = {
  render: () => (
    <html.div style={storyStyles.container}>
      <Stateful
        initialValues={['alice@example.com', 'bob@example.com', '']}
        renderSlot={(index, value, onChangeText, onRemove, values) => {
          const { theme } = useTheme();
          return (
            <InputField
              label="Priority email"
              value={value}
              placeholder="user@example.com"
              onChangeText={onChangeText}
              rightSlot={
                <>
                  <html.span style={[storyStyles.badge, storyStyles.badgePrimary]}>
                    {index === 0 ? 'Primary' : 'CC'}
                  </html.span>
                  {values.length > 1 && (
                    <Button
                      variant="tertiary"
                      size="small"
                      aria-label={`Remove slot ${index + 1}`}
                      onClick={onRemove}
                      iconBefore={<SvgClose color={theme.colors.colorPrimary} />}
                    />
                  )}
                </>
              }
            />
          );
        }}
        renderActions={(onAdd) => {
          const { theme } = useTheme();
          return (
            <Button
              variant="tertiary"
              onClick={onAdd}
              aria-label="Add another email"
              iconBefore={<SvgAdd color={theme.colors.colorPrimary} />}
            >
              Add another email
            </Button>
          );
        }}
      />
    </html.div>
  ),
};

export const WithLeftAndBadge: Story = {
  render: () => (
    <html.div style={storyStyles.container}>
      <Stateful
        initialValues={['https://twitter.com/me', 'https://github.com/me']}
        renderSlot={(index, value, onChangeText, onRemove, values) => {
          const { theme } = useTheme();
          return (
            <InputField
              label="Social links"
              value={value}
              placeholder="https://"
              onChangeText={onChangeText}
              leftSlot={<html.span style={storyStyles.slotIcon}>🔗</html.span>}
              rightSlot={
                <>
                  <html.span style={[storyStyles.badge, storyStyles.badgeIndex]}>#{index + 1}</html.span>
                  {values.length > 1 && (
                    <Button
                      variant="tertiary"
                      size="small"
                      aria-label={`Remove slot ${index + 1}`}
                      onClick={onRemove}
                      iconBefore={<SvgClose color={theme.colors.colorPrimary} />}
                    />
                  )}
                </>
              }
            />
          );
        }}
        renderActions={(onAdd) => {
          const { theme } = useTheme();
          return (
            <Button
              variant="tertiary"
              onClick={onAdd}
              aria-label="Add another link"
              iconBefore={<SvgAdd color={theme.colors.colorPrimary} />}
            >
              Add another link
            </Button>
          );
        }}
      />
    </html.div>
  ),
};

export const VariantMatrix: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const SlotWithRemove = (
      index: number,
      value: string,
      onChangeText: (t: string) => void,
      onRemove: () => void,
      values: string[],
      label: string,
      placeholder: string,
    ) => {
      const { theme } = useTheme();
      return (
        <InputField
          label={label}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          isGrouped
          rightSlot={
            values.length > 1 ? (
              <Button
                variant="tertiary"
                size="small"
                aria-label={`Remove slot ${index + 1}`}
                onClick={onRemove}
                iconBefore={<SvgClose color={theme.colors.colorPrimary} />}
              />
            ) : undefined
          }
        />
      );
    };

    const AddButton = (onAdd: () => void, label: string) => {
      const { theme } = useTheme();
      return (
        <Button
          variant="tertiary"
          onClick={onAdd}
          aria-label={label}
          iconBefore={<SvgAdd color={theme.colors.colorPrimary} />}
        >
          {label}
        </Button>
      );
    };

    return (
      <html.div style={storyStyles.container}>
        <html.div style={storyStyles.section}>
          <html.div style={storyStyles.sectionTitle}>Default — with value</html.div>
          <html.div style={storyStyles.caption}>One pre-filled slot; click "Add" to grow the list</html.div>
          <Stateful
            initialValues={['https://mysite.io']}
            renderSlot={(i, v, onChange, onRemove, values) =>
              SlotWithRemove(i, v, onChange, onRemove, values, 'Website', 'https://example.com')
            }
            renderActions={(onAdd) => AddButton(onAdd, 'Add another website')}
          />
        </html.div>

        <html.div style={storyStyles.section}>
          <html.div style={storyStyles.sectionTitle}>Empty placeholder state</html.div>
          <html.div style={storyStyles.caption}>Starts empty; remove is hidden when only one slot remains</html.div>
          <Stateful
            initialValues={['']}
            renderSlot={(i, v, onChange, onRemove, values) =>
              SlotWithRemove(i, v, onChange, onRemove, values, 'Email address', 'user@example.com')
            }
            renderActions={(onAdd) => AddButton(onAdd, 'Add another email')}
          />
        </html.div>

        <html.div style={storyStyles.section}>
          <html.div style={storyStyles.sectionTitle}>Error variant</html.div>
          <html.div style={storyStyles.caption}>Error border shown when errorMessage is set</html.div>
          <Stateful
            initialValues={['bad-value', '']}
            errorMessage="At least one URL is invalid."
            renderSlot={(i, v, onChange, onRemove, values) =>
              SlotWithRemove(i, v, onChange, onRemove, values, 'URL', 'https://')
            }
            renderActions={(onAdd) => AddButton(onAdd, 'Add another URL')}
          />
        </html.div>
      </html.div>
    );
  },
};