import { colors } from '@tetherto/pearpass-lib-ui-theme-provider/native'
import { View, Text, StyleSheet } from 'react-native'

import { ErrorIcon } from '../../icons/ErrorIcon'
import { OkayIcon } from '../../icons/OkayIcon'
import { YellowErrorIcon } from '../../icons/YellowErrorIcon'

/**
 * @param {{
 *  text: string;
 *  type: 'success' | 'error' | 'warning';
 * }} props
 */
export const NoticeText = ({ text, type = 'success' }) => {
  const getIconByType = () => {
    switch (type) {
      case 'success':
        return <OkayIcon size="14" />
      case 'error':
        return <ErrorIcon size="14" />
      case 'warning':
        return <YellowErrorIcon size="14" />
      default:
        return null
    }
  }

  const getTextStyle = () => {
    switch (type) {
      case 'success':
        return [styles.noticeText, styles.successText]
      case 'error':
        return [styles.noticeText, styles.errorText]
      case 'warning':
        return [styles.noticeText, styles.warningText]
      default:
        return [styles.noticeText, styles.defaultText]
    }
  }

  return (
    <View style={styles.noticeTextWrapper}>
      {getIconByType()}
      <Text style={getTextStyle()}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  noticeTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5
  },
  noticeText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500'
  },
  successText: {
    color: colors.primary400?.mode1
  },
  errorText: {
    color: colors.errorRed?.dark
  },
  warningText: {
    color: colors.errorYellow?.mode1
  },
  defaultText: {
    color: colors.white?.mode1
  }
})
