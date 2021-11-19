import emailjs from 'emailjs-com'
import Input from './Input'

import { useState } from 'react'

const AccessForm = () => {
	const [emailResponse, setEmailResponse] = useState(null)

	const sendEmail = async (e) => {
		e.preventDefault()
		try {
			const res = await emailjs.sendForm('service_qpr4sif', 'SpotifyCloneAccess', e.target, 'user_dndU3EyPpAw3SMgd88loo')
			res.text === 'OK' && setEmailResponse('Thank You!')
		} catch (error) {
			setEmailResponse('There was an issue please try again')
		}
	}

	return (
		<div className='form-con'>
			<h2>Access to App:</h2>
			<p>
				<strong>Your Full Name and Email associated with your Spotify account are required.</strong>
				<br />I have to input then manually to the User Access List on my Spotify Developer account.
				<br />
				After info is submitted you will receive and Email granting you access.
				<br />
				You can also email me directly at{' '}
				<a className='mailto' href='mailto:gavinbrown025@gmail.com'>
					Gavinbrown025@gmail.com
				</a>
			</p>
			<form className='contact-form' onSubmit={sendEmail}>
				<label>Full Name* </label>
				<Input type={'text'} name={'user_name'} required={true} />
				<label>Spotify Email *</label>
				<Input type={'email'} name={'user_email'} required={true} />
				<label>Reply Email (if different)</label>
				<Input type={'email'} name={'reply_email'} required={false} />
				<div className="submit-con">
					<span>{emailResponse}</span>
					<button type='submit'>Submit</button>
				</div>
			</form>
		</div>
	)
}

export default AccessForm
