// app/api/auth/[auth0].js
import { handleAuth, handleCallback} from '@auth0/nextjs-auth0';
import UserService from '@/lib/UserService';
import { User } from '@/lib/User';


const afterCallback = async (req, res, session, state) => {
    // Perform actions after the user logs in
    // Check if the user is new and perform database operations
    const user = await UserService.getUser(session.user.sub);
    console.log(session.user);
    console.log(state);

    if (!user) {
        // API call to your server to insert the user into the database
        await UserService.createUser(new User(session.user.sub, "", session.user.email,"",""))
        state.returnTo = '/onboarding';
        return state;
    }

    return state;
}
export default handleAuth(
    {
        callback: handleCallback({afterCallback})
    }
);