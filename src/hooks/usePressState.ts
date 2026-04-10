import { useState } from 'react'

export function usePressState() {
    const [isPressed, setIsPressed] = useState(false)
    return {
        isPressed,
        pressHandlers: {
            onTouchStart: () => setIsPressed(true),
            onTouchEnd: () => setIsPressed(false),
            onTouchCancel: () => setIsPressed(false),
        },
    }
}
