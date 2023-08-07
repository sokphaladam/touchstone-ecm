'use client';
import { UserContext } from '@/context/UserContext';
import { LoginScreen } from '@/screen/login/LoginScreen';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext } from 'react';

export function WithAuth(Component: any, role: "ADMIN" | "SELLER" | "CUSTOMER") {
	const path = usePathname();
	const {push} = useRouter();
	const { user } = useContext(UserContext);

	if (user?.mainRole === role) {
		if(role  === 'SELLER' && path.split('/')[1] !== role.toLowerCase()) {
			push('/seller');
		}
		if(role  === 'ADMIN' && path.split('/')[1] !== role.toLowerCase()) {
			push('/admin');
		}
		if(role  === 'CUSTOMER' && path.split('/')[1] !== role.toLowerCase()) {
			push('/customer');
		}
		return <Component/>;
	}

	return <LoginScreen/>
}