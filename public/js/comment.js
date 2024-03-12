document.addEventListener('DOMContentLoaded', () => {
    const newCommentForm = document.querySelector('#new-comment-form');
    if (newCommentForm) {
        newCommentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Use "comment_text" to match the expected field in your backend
            const comment_text = document.querySelector('#comment-content').value.trim();
            const postId = document.querySelector('#post-id').value;
            
            // Ensure your payload matches the backend expectations
            if (comment_text && postId) {
                const response = await fetch('/api/comments', {
                    method: 'POST',
                    body: JSON.stringify({ comment_text, postId }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    document.location.reload(); // Reload the page to see the new comment
                } else {
                    alert('Failed to submit comment.');
                }
            }
        });
    }
});
