import { Linking } from 'react-native';

export const getPlatformHref = () => undefined;

export const useLinkPress = (href?: string) => {
    if (!href) return undefined;

    return (e: unknown) => {
        (e as Event).preventDefault();
        Linking.openURL(href).catch((err) =>
            console.error('Could not open link', err)
        );
    };
};
