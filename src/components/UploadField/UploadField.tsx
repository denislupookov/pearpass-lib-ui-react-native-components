import React from 'react'
import { html } from 'react-strict-dom'
import {
  InsertDriveFileOutlined,
  InsertPhotoOutlined,
  TrashOutlined,
  UploadFileFilled
} from '../../icons'
import { useTheme } from '../../theme'
import { formatFileSize } from '../../utils'
import { Button } from '../Button'
import { Link } from '../Link/Link'
import { Text } from '../Text/Text'
import { styles } from './UploadField.styles'
import { UploadedFile } from './types'

function getFileIcon(mimeType: string, color: string): React.ReactElement {
  if (mimeType.startsWith('image/')) {
    return <InsertPhotoOutlined width={16} height={16} color={color} />
  }
  return <InsertDriveFileOutlined width={16} height={16} color={color} />
}

function buildFormatsLabel(
  acceptedFormats?: string[],
  prefix?: string | undefined
): string | undefined {
  if (!acceptedFormats || acceptedFormats.length === 0) return undefined
  return `${prefix} ${acceptedFormats.join(', ').toUpperCase()}`
}

export interface UploadFieldProps {
  image?: string
  imageAlt?: string
  fileIcon?: React.ReactNode
  acceptedFormats?: string[]
  maxFiles?: number
  allowDragAndDrop?: boolean
  uploadLinkText?: string
  uploadSuffixText?: string
  formatsPrefix?: string
  files: UploadedFile[]
  onFilesChange: (files: UploadedFile[]) => void
  onPress?: () => void
  testID?: string
}

export const UploadField = ({
  image,
  imageAlt = '',
  fileIcon,
  acceptedFormats,
  maxFiles = 1,
  uploadLinkText,
  uploadSuffixText,
  formatsPrefix,
  files,
  onFilesChange,
  onPress,
  testID
}: UploadFieldProps): React.ReactElement => {
  const { theme } = useTheme()

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index))
  }

  const showUploadArea = files.length < maxFiles
  const formatsLabel = buildFormatsLabel(acceptedFormats, formatsPrefix)

  return (
    <html.div style={styles.wrapper} data-testid={testID}>
      {showUploadArea && (
        <html.div style={styles.uploadContainer}>
          {image ? (
            <html.div style={styles.imageWrapper}>
              <html.img src={image} style={styles.image} alt={imageAlt} />
              <html.span style={styles.imageIconBadge}>
                <UploadFileFilled
                  color={theme.colors.colorTextSecondary}
                  width={16}
                  height={16}
                />
              </html.span>
            </html.div>
          ) : (
            <html.span style={styles.uploadIconWrapper}>
              <UploadFileFilled
                color={theme.colors.colorTextSecondary}
                width={32}
                height={32}
              />
            </html.span>
          )}

          <html.div style={styles.textContainer}>
            <Text as="p" style={styles.mainText}>
              <Link href="#" onClick={onPress}>
                {uploadLinkText}
              </Link>{' '}
              {uploadSuffixText}
            </Text>
            {formatsLabel && (
              <Text variant="caption" style={styles.hintText}>
                {formatsLabel}
              </Text>
            )}
          </html.div>
        </html.div>
      )}

      {files.map((uploadedFile, index) => (
        <html.div
          key={`${uploadedFile.name}-${index}`}
          style={styles.fileContainer}
        >
          <html.div style={styles.fileIconContainer}>
            <html.span style={styles.fileIconInner}>
              {fileIcon ??
                getFileIcon(uploadedFile.type, theme.colors.colorTextSecondary)}
            </html.span>
          </html.div>

          <html.div style={styles.fileDetails}>
            <Text variant="label" style={styles.fileName}>
              {uploadedFile.name}
            </Text>
            <Text variant="caption" style={styles.fileSize}>
              {formatFileSize(uploadedFile.size)}
            </Text>
          </html.div>

          <Button
            iconBefore={
              <TrashOutlined color={theme.colors.colorTextSecondary} />
            }
            variant="tertiary"
            onClick={() => removeFile(index)}
            aria-label={`Remove ${uploadedFile.name}`}
          />
        </html.div>
      ))}
    </html.div>
  )
}

UploadField.displayName = 'UploadField'
