import { actions } from 'astro:actions';
import { useState } from 'preact/hooks';

export function LikeButton({ postId }: { postId: string }) {
    const [showLogin, setShowLogin] = useState(false);
    return (
        <>
            {
                showLogin && <a href="/signin">Log in to like a post.</a>
            }
            <button onClick={async () => {
                const { data, error } = await actions.likePost({ postId });
                if (error?.code === 'UNAUTHORIZED') setShowLogin(true);
                // Early return for unexpected errors
                else if (error) return;
                // update likes
            }}>
                Like
            </button>
        </>
    )
}