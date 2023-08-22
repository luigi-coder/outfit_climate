import React, { useState } from 'react'

const FormCity = ({onSubmit }) => {

    const [inputValue, setInputValue] = useState('');

    const _handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(inputValue);
        setInputValue('');
    }

    const _handleChange = (event) => {
        const inputValue = event.target.value;
        setInputValue(inputValue);
    }


    return (
        <>
            <form onSubmit={_handleSubmit}>
                <input
                    className="input_city"
                    id="city"
                    name="city"
                    type="text"
                    value={inputValue}
                    placeholder="Enter a city"
                    onChange={_handleChange}
                    autoComplete="off"
                />
                {' '}
                <button className="button_city" type="submit">
                    Go
                </button>
            </form>
        </>
    )
}

export default FormCity


/* const FormCity = ({onSubmit, value, onChange}) => {

    let form = useRef(null);

    const _handleSubmit = (event) => {
        event.preventDefault();
        form.current.reset();
        onSubmit(event);
    }

    return (
        <form ref={form} onSubmit={_handleSubmit}>
            <input
                className="input_city"
                type="text"
                value={value}
                placeholder="Enter a city"
                onChange={onChange}
            />
            {" "}
            <button className="button_city" type="submit">
                Go
            </button>
        </form>
    )
}

export default FormCity
 */