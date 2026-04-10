export type AlertVariant = 'warning' | 'error';
export type AlertSize = 'small' | 'medium' | 'big';

export interface AlertMessageProps {
    variant: AlertVariant;
    size: AlertSize;

    title: string;
    actionText?: string;
    onAction?: () => void;
    description: React.ReactNode;
    testID?: string;
    actionTestId?: string;
}
