// React imports
import { useState } from 'react';

export default function useInput(initialState = "") {
    const [value, setValue] = useState(initialState);
    return {
        value,
        onChange(e) {
            setValue(e.target.value)
        }
    };
}
