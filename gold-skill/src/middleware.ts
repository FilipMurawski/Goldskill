import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { auth } from './lib/auth';

const handleReferral = (req: NextRequest) => {
    const referralCode = req.nextUrl.searchParams.get('ref');
    if (referralCode) {

        const urlWithoutReferral = new URL(req.nextUrl);
        urlWithoutReferral.searchParams.delete('ref');
        const response = NextResponse.redirect(urlWithoutReferral);
        response.cookies.set('referralId', referralCode, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
            secure: req.nextUrl.protocol === 'https:',
        });

        return response;
    }
    return null
}

// const checkSession = async (req: NextRequest) => {
//     const privateRoute = req.nextUrl.pathname.includes('/panel');
//     if (privateRoute) {
//         const session = await auth()
//         if (!session || !session.user) {
//             const url = new URL('/sign-in', req.url);
//             const response = NextResponse.redirect(url);
//             return response;
//         }
//         return null
//     }
//     return null
    
// }

export const middleware = (req: NextRequest) => {

    const referralResponse = handleReferral(req);
    if (referralResponse) return referralResponse;

    // const sessionResponse = checkSession(req);
    // if (sessionResponse) return sessionResponse;

    return NextResponse.next()
}