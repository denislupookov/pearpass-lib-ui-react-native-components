export type AlertVariant = 'info' | 'warning' | 'error';
export type AlertSize = 'small' | 'medium' | 'big';

export interface AlertMessageProps {
    variant: AlertVariant;
    size: AlertSize;
    backgroundColor?: string;
    color?: string;

    title: string;
    actionText?: string;
    onAction?: () => void;
    description: React.ReactNode;
    testID?: string;
    actionTestId?: string;
}
