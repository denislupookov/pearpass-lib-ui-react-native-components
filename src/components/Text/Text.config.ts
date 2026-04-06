import { styles } from './Text.styles';
import { TextVariant } from './types';

export const variantStyleMap = {
    label: styles.variantLabel,
    labelEmphasized: styles.variantLabelEmphasized,
    body: styles.variantBody,
    bodyEmphasized: styles.variantBodyEmphasized,
    caption: styles.variantCaption,
} satisfies Record<TextVariant, (typeof styles)[keyof typeof styles]>;
