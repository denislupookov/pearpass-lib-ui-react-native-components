import React from 'react'
import { html } from 'react-strict-dom'
import {
  InsertDriveFileOutlined,
  InsertPhotoOutlined,
  TrashOutlined,
  UploadFileFilled
} from '../../icons'
import { formatFileSize } from '../../utils'
import { Button } from '../Button'
import { Link } from '../Link/Link'
import { Text } from '../Text/Text'
import { styles } from './UploadField.styles'
import { UploadedFile } from './types'

function getFileIcon(mimeType: string): React.ReactElement {
  if (mimeType.startsWith('image/')) {
    return <InsertPhotoOutlined width={16} height={16} />
  }
  return <InsertDriveFileOutlined width={16} height={16} />
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
  uploadIcon?: React.ReactNode
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
  allowDragAndDrop = false,
  uploadLinkText,
  uploadSuffixText,
  formatsPrefix,
  files,
  onFilesChange,
  testID
}: UploadFieldProps): React.ReactElement => {
  const [isDragging, setIsDragging] = React.useState(false)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const dropZoneRef = React.useRef<HTMLDivElement>(null)

  const addFiles = React.useCallback(
    (incoming: File[]) => {
      const slots = maxFiles - files.length
      if (slots <= 0) return
      const toAdd: UploadedFile[] = incoming.slice(0, slots).map((f) => ({
        file: f,
        name: f.name,
        size: f.size,
        type: f.type
      }))
      onFilesChange([...files, ...toAdd])
    },
    [maxFiles, files, onFilesChange]
  )

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index))
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  React.useEffect(() => {
    const el = dropZoneRef.current
    if (!el || !allowDragAndDrop) {
      return
    }

    const onDragOver = (e: DragEvent) => {
      e.preventDefault()
      setIsDragging(true)
    }
    const onDragLeave = (e: DragEvent) => {
      if (!el.contains(e.relatedTarget as Node | null)) {
        setIsDragging(false)
      }
    }
    const onDrop = (e: DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (e.dataTransfer?.files) {
        addFiles(Array.from(e.dataTransfer.files))
      }
    }

    el.addEventListener('dragover', onDragOver)
    el.addEventListener('dragleave', onDragLeave)
    el.addEventListener('drop', onDrop)
    return () => {
      el.removeEventListener('dragover', onDragOver)
      el.removeEventListener('dragleave', onDragLeave)
      el.removeEventListener('drop', onDrop)
    }
  }, [addFiles, allowDragAndDrop])

  const triggerInput = (
    e:
      | React.MouseEvent
      | Parameters<React.ComponentProps<typeof html.a>['onClick'] & {}>[0]
  ) => {
    ;(e as { preventDefault?: () => void }).preventDefault?.()
    inputRef.current?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files))
    }
  }

  const showUploadArea = files.length < maxFiles
  const formatsLabel = buildFormatsLabel(acceptedFormats, formatsPrefix)
  const acceptAttr = acceptedFormats?.join(',')

  return (
    <html.div style={styles.wrapper} data-testid={testID}>
      {showUploadArea && (
        <html.div
          ref={dropZoneRef}
          style={[
            styles.uploadContainer,
            isDragging && styles.uploadContainerDragOver
          ]}
        >
          {image ? (
            <html.div style={styles.imageWrapper}>
              <html.img src={image} style={styles.image} alt={imageAlt} />
              <html.div style={styles.imageIconBadge}>
                <UploadFileFilled width={16} height={16} />
              </html.div>
            </html.div>
          ) : (
            <html.div style={styles.uploadIconWrapper}>
              <UploadFileFilled width={32} height={32} />
            </html.div>
          )}

          <html.div style={styles.textContainer}>
            <Text as="p" style={styles.mainText}>
              <Link onClick={triggerInput}>{uploadLinkText}</Link>{' '}
              {uploadSuffixText}
            </Text>
            {formatsLabel && (
              <Text variant="caption" style={styles.hintText}>
                {formatsLabel}
              </Text>
            )}
          </html.div>

          <input
            ref={inputRef}
            type="file"
            accept={acceptAttr}
            multiple={maxFiles > 1}
            tabIndex={-1}
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              opacity: 0,
              overflow: 'hidden',
              pointerEvents: 'none'
            }}
            onChange={handleInputChange}
          />
        </html.div>
      )}

      {files.map((uploadedFile, index) => (
        <html.div
          key={`${uploadedFile.name}-${index}`}
          style={styles.fileContainer}
        >
          <html.div style={styles.fileIconContainer}>
            <html.div style={styles.fileIconInner}>
              {fileIcon ?? getFileIcon(uploadedFile.type)}
            </html.div>
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
            iconBefore={<TrashOutlined />}
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
