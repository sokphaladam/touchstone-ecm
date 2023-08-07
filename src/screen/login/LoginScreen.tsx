import { Button, Icon, Image, LegacyCard, Page, TextField } from '@shopify/polaris';
import React, {useState, useCallback} from 'react';
import { PasskeyMinor, CustomersMinor } from '@shopify/polaris-icons'

export function LoginScreen() {
	const [userInput, setUserInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');

	const handleChangeUserInput = useCallback((value: any) => {
		setUserInput(value)
	}, [])
	
	const handleChangePasswordInput = useCallback((value: any) => {
		setPasswordInput(value)
	}, [])
	
	const handleSubmit = useCallback((e: any) => {
		e.preventDefault();
		console.log(userInput, passwordInput)
	}, [passwordInput, userInput]);

	return (
		<Page>
			<div className='h-full w-full overflow-hidden'>
			<div className='w-96 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
				<form onSubmit={handleSubmit}>
				<LegacyCard>
						<LegacyCard.Section>
							<div className='flex items-center justify-center'>
							<Image source='vercel.svg' alt="" className='object-contain w-[132px] h-auto'/>
							</div>
						</LegacyCard.Section>
						<LegacyCard.Section>
							<TextField autoComplete='off' label="Username" placeholder='Enter username...' value={userInput} onChange={handleChangeUserInput} prefix={<Icon source={CustomersMinor}/>}/>
							<br />
							<TextField autoComplete='off' label="Password" placeholder='Enter password...' type='password' value={passwordInput} onChange={handleChangePasswordInput} prefix={<Icon source={PasskeyMinor}/>}/>
						</LegacyCard.Section>
						<LegacyCard.Section>
							<Button primarySuccess submit>Login</Button>
						</LegacyCard.Section>
					</LegacyCard>
				</form>
				</div>
			</div>
		</Page>
	)
}