import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { html, css } from 'react-strict-dom'
import { AttachmentField } from './AttachmentField'
import { tokens } from '../../theme/tokens.css'
import {
  DoneAll,
  VerifiedUser,
  InsertPhotoOutlined,
  Close
} from '../../icons'

const meta: Meta<typeof AttachmentField> = {
  title: 'Components/AttachmentField',
  component: AttachmentField,
  decorators: [
    (Story, context) => {
      if (context.name === 'VariantMatrix') {
        return <Story />
      }
      return (
        <html.div style={storyStyles.previewContainer}>
          <Story />
        </html.div>
      )
    },
  ],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  }
}

export default meta
type Story = StoryObj<typeof AttachmentField>

const storyStyles = css.create({
  container: {
    padding: tokens.spacing24,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing24,
    flex: 1,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing16,
    flexShrink: 0,
  },
  sectionTitle: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize16,
    fontWeight: tokens.weightMedium,
    color: tokens.colorTextPrimary,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorBorderSecondary,
    paddingBottom: tokens.spacing8
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gridAutoRows: 'minmax(100px, auto)',
    gap: tokens.spacing20,
  },
  cell: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing8
  },
  caption: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
    color: tokens.colorTextSecondary
  },
  previewContainer: {
    maxWidth: '400px',
    width: '100%',
  },
  iconButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    cursor: 'pointer',
    display: 'flex',
  }
})

export const Default: Story = {
  args: {
    label: 'Document',
    value: '',
    placeholder: 'Select a document...',
    onClick: () => {}
  }
}

export const WithValue: Story = {
  args: {
    label: 'Document',
    value: 'passport.pdf',
    onClick: () => {}
  }
}

export const ErrorState: Story = {
  args: {
    label: 'Profile Picture',
    value: 'avatar.png',
    error: 'File size must be less than 5MB.',
    onClick: () => {}
  }
}

export const WithCustomValueIcon: Story = {
  args: {
    label: 'Photo',
    value: 'vacation.jpg',
    valueIcon: <InsertPhotoOutlined width={16} height={16} color={tokens.colorPrimary} />,
    onClick: () => {}
  }
}

export const WithRightSlot: Story = {
  args: {
    label: 'Receipt',
    value: 'receipt_001.pdf',
    rightSlot: (
      <html.button
        type="button"
        style={storyStyles.iconButton}
        onClick={(e) => {
          e.stopPropagation()
          alert('Delete clicked')
        }}
      >
        <Close width={20} height={20} color={tokens.colorTextSecondary} />
      </html.button>
    ),
    onClick: () => {}
  }
}

export const Disabled: Story = {
  args: {
    label: 'Archived File',
    value: 'archive_2024.zip',
    disabled: true,
    onClick: () => {}
  }
}

export const StaticNoOnClick: Story = {
  args: {
    label: 'Read-only View',
    value: 'TermsAndConditions.pdf',
  }
}

export const VariantMatrix: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <html.div style={storyStyles.container}>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>Default Variant</html.div>
        <html.div style={storyStyles.grid}>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Empty / Placeholder</html.div>
            <AttachmentField
              label="Document"
              value=""
              placeholder="Select a document..."
              onClick={() => {}}
            />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>With Value</html.div>
            <AttachmentField
              label="Document"
              value="document_v1.docx"
              onClick={() => {}}
            />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>With Custom Icon</html.div>
            <AttachmentField
              label="Image"
              value="photo.jpeg"
              valueIcon={<InsertPhotoOutlined width={16} height={16} color={tokens.colorTextPrimary} />}
              onClick={() => {}}
            />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>With Right Slot</html.div>
            <AttachmentField
              label="Verified File"
              value="contract.pdf"
              rightSlot={<VerifiedUser color={tokens.colorPrimary} />}
              onClick={() => {}}
            />
          </html.div>
        </html.div>
      </html.div>

      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>States</html.div>
        <html.div style={storyStyles.grid}>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>
              Error without message
            </html.div>
            <AttachmentField
              label="Upload File"
              value="invalid_file.exe"
              error=""
              onClick={() => {}}
            />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Error with message</html.div>
            <AttachmentField
              label="Upload File"
              value="too_large.vid"
              error="File exceeds 10MB limit."
              onClick={() => {}}
            />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Error with Icon</html.div>
            <AttachmentField
              label="Missing File"
              value=""
              placeholder="Required..."
              error="Please attach a file"
              rightSlot={<DoneAll color={tokens.colorSurfaceError} />}
              onClick={() => {}}
            />
          </html.div>
        </html.div>
      </html.div>
    </html.div>
  )
}
