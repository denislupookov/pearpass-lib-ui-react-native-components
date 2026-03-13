import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { UploadField } from './UploadField'

jest.mock('../Button/Button.styles', () => ({
  styles: {
    buttonBase: {},
    fullWidth: {},
    sizeSmall: {},
    sizeMedium: {},
    iconOnlySmall: {},
    iconOnlyMedium: {},
    label: {},
    icon: {},
    iconSize: () => ({}),
    disabled: {},
    loading: {},
    loadingContent: {},
    spinnerContainer: {},
    spinner: {}
  }
}))
jest.mock('../Button/Button.config', () => ({
  variantStyleMap: {
    primary: {},
    secondary: {},
    tertiary: {},
    destructive: {}
  },
  variantDisabledStyleMap: {
    primary: {},
    secondary: {},
    tertiary: {},
    destructive: {}
  },
  variantTextStyleMap: {
    primary: {},
    secondary: {},
    tertiary: {},
    destructive: {}
  },
  variantDisabledTextStyleMap: {
    primary: {},
    secondary: {},
    tertiary: {},
    destructive: {}
  },
  sizeStyleMap: {},
  iconOnlyStyleMap: {},
  iconSizeMap: { small: 16, medium: 20 }
}))

jest.mock('./UploadField.styles', () => ({
  styles: {
    wrapper: {},
    uploadContainer: {},
    uploadContainerDragOver: {},
    imageWrapper: {},
    image: {},
    imageIconBadge: {},
    uploadIconWrapper: {},
    textContainer: {},
    mainText: {},
    hintText: {},
    fileContainer: {},
    fileIconContainer: {},
    fileIconInner: {},
    fileDetails: {},
    fileName: {},
    fileSize: {},
    deleteButton: {}
  }
}))

jest.mock('../Text/Text.styles', () => ({
  styles: {
    textBase: {},
    variantLabel: {},
    variantBody: {},
    variantBodyEmphasized: {},
    variantCaption: {}
  }
}))

jest.mock('../Text/Text.config', () => ({
  variantStyleMap: { label: {}, body: {}, bodyEmphasized: {}, caption: {} }
}))

jest.mock('../Link/Link.styles', () => ({
  styles: { linkBase: {} }
}))

jest.mock('../Link/linkPlatformHelper', () => ({
  getPlatformHref: (href: string) => href,
  useLinkPress: () => null
}))

jest.mock('../../icons', () => ({
  UploadFileFilled: () => <svg data-testid="icon-upload" />,
  InsertDriveFileOutlined: () => <svg data-testid="icon-file" />,
  InsertPhotoOutlined: () => <svg data-testid="icon-photo" />,
  Close: () => <svg data-testid="icon-close" />,
  TrashOutlined: () => <svg data-testid="icon-trash" />
}))

import { UploadedFile } from './types'

const Controlled = (
  props: Omit<
    React.ComponentProps<typeof UploadField>,
    'files' | 'onFilesChange'
  > & {
    onFilesChange?: (files: UploadedFile[]) => void
    initialFiles?: UploadedFile[]
  }
) => {
  const [files, setFiles] = React.useState<UploadedFile[]>(
    props.initialFiles ?? []
  )
  return (
    <UploadField
      {...props}
      files={files}
      onFilesChange={(updated) => {
        setFiles(updated)
        props.onFilesChange?.(updated)
      }}
    />
  )
}

describe('UploadField', () => {
  it('renders the upload area by default', () => {
    let component!: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(<Controlled testID="upload-field" />)
    })

    expect(component.toJSON()).toMatchSnapshot()
  })

  it('shows "Upload a file here" text when allowDragAndDrop is false', () => {
    let component!: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Controlled
          allowDragAndDrop={false}
          uploadLinkText="Upload a file"
          uploadSuffixText="here"
          testID="upload-field"
        />
      )
    })

    const json = JSON.stringify(component.toJSON())
    expect(json).toContain('Upload a file')
    expect(json).toContain('here')
    expect(json).not.toContain('drag and drop')
  })

  it('shows "Upload file or drag and drop it here" text when allowDragAndDrop is true', () => {
    let component!: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Controlled
          allowDragAndDrop={true}
          uploadLinkText="Upload file"
          uploadSuffixText="or drag and drop it here"
          testID="upload-field"
        />
      )
    })

    const json = JSON.stringify(component.toJSON())
    expect(json).toContain('Upload file')
    expect(json).toContain('drag and drop it here')
  })

  it('renders required formats label when acceptedFormats is provided', () => {
    let component!: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Controlled acceptedFormats={['.pdf', '.png']} testID="upload-field" />
      )
    })

    const json = JSON.stringify(component.toJSON())
    expect(json).toContain('.PDF')
    expect(json).toContain('.PNG')
  })

  it('uses custom uploadLinkText, uploadSuffixText and formatsPrefix when provided', () => {
    let component!: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Controlled
          uploadLinkText="ატვირთე ფაილი"
          uploadSuffixText=" ან გადაათრიე აქ"
          formatsPrefix="მხარდაჭერილი ფორმატები:"
          acceptedFormats={['.pdf']}
          testID="upload-field"
        />
      )
    })

    const json = JSON.stringify(component.toJSON())
    expect(json).toContain('ატვირთე ფაილი')
    expect(json).toContain(' ან გადაათრიე აქ')
    expect(json).toContain('მხარდაჭერილი ფორმატები:')
  })

  it('renders context image when image prop is provided', () => {
    let component!: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Controlled image="https://example.com/logo.png" imageAlt="Logo" />
      )
    })

    expect(component.toJSON()).toMatchSnapshot()
  })

  it('calls onFilesChange when files are provided externally', () => {
    const onFilesChange = jest.fn()
    const mockFile = {
      file: {} as File,
      name: 'test.pdf',
      size: 100,
      type: 'application/pdf'
    }
    let component!: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <UploadField
          files={[mockFile]}
          onFilesChange={onFilesChange}
          testID="upload-field"
        />
      )
    })

    const deleteButton = component.root.findAll((node) =>
      node.props['aria-label']?.startsWith('Remove')
    )[0]

    act(() => {
      deleteButton.props.onClick()
    })

    expect(onFilesChange).toHaveBeenCalledWith([])
  })

  it('hides the upload area when maxFiles limit is reached', () => {
    const mockFile = {
      file: {} as File,
      name: 'doc.pdf',
      size: 100,
      type: 'application/pdf'
    }
    let component!: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Controlled
          maxFiles={1}
          initialFiles={[mockFile]}
          testID="upload-field"
        />
      )
    })

    // Upload area should be gone once limit is reached
    const json = JSON.stringify(component.toJSON())
    expect(json).not.toContain('icon-upload')
  })

  it('removes a file when the delete button is clicked', () => {
    const onFilesChange = jest.fn()
    const mockFile = {
      file: {} as File,
      name: 'report.pdf',
      size: 200,
      type: 'application/pdf'
    }
    let component!: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Controlled
          maxFiles={2}
          initialFiles={[mockFile]}
          onFilesChange={onFilesChange}
          testID="upload-field"
        />
      )
    })

    const deleteButton = component.root.findAll((node) =>
      node.props['aria-label']?.startsWith('Remove')
    )[0]

    act(() => {
      deleteButton.props.onClick()
    })

    expect(onFilesChange).toHaveBeenCalledWith([])
  })

  it('shows InsertPhotoOutlined icon for image files', () => {
    const imageFile = {
      file: {} as File,
      name: 'photo.png',
      size: 0,
      type: 'image/png'
    }
    let component!: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Controlled
          maxFiles={2}
          initialFiles={[imageFile]}
          testID="upload-field"
        />
      )
    })

    expect(
      component.root.findAll((n) => n.props['data-testid'] === 'icon-photo')
        .length
    ).toBe(1)
    expect(
      component.root.findAll((n) => n.props['data-testid'] === 'icon-file')
        .length
    ).toBe(0)
  })

  it('shows InsertDriveFileOutlined icon for non-image files', () => {
    const pdfFile = {
      file: {} as File,
      name: 'document.pdf',
      size: 0,
      type: 'application/pdf'
    }
    let component!: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Controlled
          maxFiles={2}
          initialFiles={[pdfFile]}
          testID="upload-field"
        />
      )
    })

    expect(
      component.root.findAll((n) => n.props['data-testid'] === 'icon-file')
        .length
    ).toBe(1)
    expect(
      component.root.findAll((n) => n.props['data-testid'] === 'icon-photo')
        .length
    ).toBe(0)
  })
})
