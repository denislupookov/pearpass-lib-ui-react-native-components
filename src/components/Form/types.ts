import { html } from "react-strict-dom";

export interface FormProps {
    children?: React.ReactNode;
    style?: React.ComponentProps<typeof html.div>['style'];
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    testID?: string;
    noValidate?: boolean;
    'aria-label'?: string;
    'aria-labelledby'?: string;
}
