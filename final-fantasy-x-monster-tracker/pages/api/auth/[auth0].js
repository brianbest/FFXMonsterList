// app/api/auth/[auth0]/route.js
import { handleAuth, handleCallback} from '@auth0/nextjs-auth0';
import UserService from '@/lib/UserService';
import { User } from '@/lib/User';


const afterCallback = async (req, res, session, state) => {
    // Perform actions after the user logs in
    // Check if the user is new and perform database operations
    const user = await UserService.getUser(session.user.sid);
    console.log(user);
    if (false) {
        // API call to your server to insert the user into the database
        UserService.createUser(new User(session.user.sid, session.user.email)).then(() => {
            session.returnTo = '/onboarding';
            return session;
        });
    } else { 
        return session;
    }
}
export default handleAuth(
    {
        callback: handleCallback({afterCallback})
    }
);