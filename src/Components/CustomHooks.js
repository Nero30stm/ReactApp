import {useState} from 'react';
import React, { Component } from 'react';

const useValidation = (value) => {
    const [isEmpty, setEmpty] = useState(true);

    React.useEffect(()=>{
        value ? setEmpty(false): setEmpty(true);
    }, [value])

    return {
        isEmpty
    }
}

const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue);
    const valid = useValidation(value, validations)

    let onChange = (e) => {
        setValue(e.target.value);
    }

    return {
        value,
        onChange,
        ...valid
    }
};

export default useInput