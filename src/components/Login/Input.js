import { useState, useEffect } from 'react'

const Input = ({ type, name, required }) => {
	const [filled, setFilled] = useState('')
	const [value, setValue] = useState('')

	useEffect(() => {
        const timeout = setTimeout(() => {
            value && setFilled(true)
        }, 2000);
		return () => {
			setFilled(false)
            clearTimeout(timeout)
		}
	}, [value])

	return <input onChange={(e) => setValue(e.target.value)} className={filled ? 'filled' : ''} type={type} required={required} name={name} />
}

export default Input
