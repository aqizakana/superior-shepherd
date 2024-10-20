import { actions } from 'astro:actions';
import { navigate } from 'astro:transitions/client';

export function LogoutButton() {
    return (
        <button onClick={async () => {
            const { error } = await actions.logout();
            if (!error) navigate('/');
        }}>
            Logout
        </button>
    );
}