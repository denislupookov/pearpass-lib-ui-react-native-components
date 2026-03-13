import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { css, html } from 'react-strict-dom'
import { UploadField } from './UploadField'
import { UploadedFile } from './types'
import { tokens } from '../../theme/tokens.css'
import { Text } from '../Text'

const storyStyles = css.create({
  container: {
    padding: tokens.spacing24,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing24,
    maxWidth: '350px',
    width: '100%'
  },
  label: {
    color: tokens.colorTextSecondary
  }
})

const meta: Meta<typeof UploadField> = {
  title: 'Components/UploadField',
  component: UploadField,
  tags: ['autodocs'],
  parameters: {
    controls: {
      include: [
        'acceptedFormats',
        'maxFiles',
        'allowDragAndDrop',
        'image',
        'imageAlt',
        'uploadLinkText',
        'uploadSuffixText',
        'formatsPrefix'
      ]
    }
  },
  argTypes: {
    acceptedFormats: { control: false },
    fileIcon: { control: false },
    maxFiles: { control: { type: 'number', min: 1 } },
    allowDragAndDrop: { control: 'boolean' },
    image: { control: 'text' },
    imageAlt: { control: 'text' },
    uploadLinkText: { control: 'text' },
    uploadSuffixText: { control: 'text' },
    formatsPrefix: { control: 'text' },
    onFilesChange: { action: 'filesChanged' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const MOCK_FILES: UploadedFile[] = [
  {
    file: null as unknown as File,
    name: 'example.pdf',
    size: 204800,
    type: 'application/pdf'
  },
  {
    file: null as unknown as File,
    name: 'photo.png',
    size: 512000,
    type: 'image/png'
  }
]

const ControlledUploadField = (
  args: React.ComponentProps<typeof UploadField>
) => {
  const [files, setFiles] = React.useState<UploadedFile[]>([])
  const mockIndex = React.useRef(0)

  const handlePress = () => {
    const slots = (args.maxFiles ?? 1) - files.length
    if (slots <= 0) return
    const next = MOCK_FILES[mockIndex.current % MOCK_FILES.length]
    mockIndex.current += 1
    setFiles((prev) => [...prev, next].slice(0, args.maxFiles ?? 1))
  }

  return (
    <UploadField
      {...args}
      files={files}
      onFilesChange={setFiles}
      onPress={args.onPress ?? handlePress}
    />
  )
}

export const Default: Story = {
  args: {
    acceptedFormats: ['.pdf', '.png', '.jpg'],
    maxFiles: 1,
    allowDragAndDrop: false,
    uploadLinkText: 'Upload a file',
    uploadSuffixText: 'here',
    formatsPrefix: 'Required formats:'
  },
  render: (args) => (
    <html.div style={storyStyles.container}>
      <ControlledUploadField {...args} />
    </html.div>
  )
}

export const WithDragAndDrop: Story = {
  args: {
    acceptedFormats: ['.pdf', '.png', '.jpg'],
    maxFiles: 1,
    allowDragAndDrop: true,
    uploadLinkText: 'Upload file',
    uploadSuffixText: ' or drag and drop it here',
    formatsPrefix: 'Required formats:'
  },
  render: (args) => (
    <html.div style={storyStyles.container}>
      <ControlledUploadField {...args} />
    </html.div>
  )
}

export const WithContextImage: Story = {
  args: {
    image: 'https://placehold.co/40x40.png',
    imageAlt: 'Profile picture placeholder',
    acceptedFormats: ['.jpg', '.png'],
    uploadLinkText: 'Upload a file',
    uploadSuffixText: 'here',
    formatsPrefix: 'Required formats:',
    maxFiles: 1
  },
  render: (args) => (
    <html.div style={storyStyles.container}>
      <ControlledUploadField {...args} />
    </html.div>
  )
}

export const MultipleFiles: Story = {
  args: {
    acceptedFormats: ['.pdf', '.png', '.jpg'],
    maxFiles: 3,
    allowDragAndDrop: true,
    uploadLinkText: 'Upload file',
    uploadSuffixText: ' or drag and drop it here',
    formatsPrefix: 'Required formats:'
  },
  render: (args) => (
    <html.div style={storyStyles.container}>
      <Text variant="caption" style={storyStyles.label}>
        Upload area hides once all 3 slots are filled
      </Text>
      <ControlledUploadField {...args} />
    </html.div>
  )
}
