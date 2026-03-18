import { colors } from '@tetherto/pearpass-lib-ui-theme-provider/native'
import { Text, StyleSheet } from 'react-native'

/**
 * @param {{
 *  text: string,
 *  fontsize: string,
 *  fontWeight: number,
 *  numberOfLines: number
 * }} props
 */
export const HighlightString = ({
  text,
  fontsize = 20,
  fontWeight = 400,
  numberOfLines = undefined
}) => (
  <Text
    numberOfLines={numberOfLines}
    style={[
      styles.highlightedText,
      { fontSize: parseInt(fontsize), fontWeight: fontWeight.toString() }
    ]}
  >
    {highlightText(text)}
  </Text>
)

const highlightText = (text) => {
  const regex = /(\d+|[^a-zA-Z\d\s])/g
  const parts = text.split(regex)

  return parts.map((part, index) => {
    if (/^\d+$/.test(part)) {
      return (
        <Text key={index} style={styles.numberSpan}>
          {part}
        </Text>
      )
    }

    if (/[^a-zA-Z\d\s]/.test(part)) {
      return (
        <Text key={index} style={styles.symbolSpan}>
          {part}
        </Text>
      )
    }

    return <Text key={index}>{part}</Text>
  })
}

const styles = StyleSheet.create({
  highlightedText: {
    color: colors.white?.mode1,
    fontFamily: 'Inter',
    textAlign: 'center'
  },
  numberSpan: {
    color: colors.primary400?.mode1,
    fontWeight: 'bold'
  },
  symbolSpan: {
    color: colors.categoryLogin?.mode1,
    fontWeight: 'bold'
  }
})
