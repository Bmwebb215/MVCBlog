document.addEventListener('DOMContentLoaded', () => {
  const newCommentForm = document.querySelector('#new-comment-form');
  if (newCommentForm) {
      newCommentForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const content = document.querySelector('#comment-content').value.trim();
          const postId = document.querySelector('#post-id').value; // Assuming you're on a post page with the post ID available

          if (content) {
              const response = await fetch('/api/comments', {
                  method: 'POST',
                  body: JSON.stringify({ content, postId }),
                  headers: { 'Content-Type': 'application/json' },
              });

              if (response.ok) {
                  document.location.reload();
              } else {
                  alert('Failed to submit comment.');
              }
          }
      });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-post');
  
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const postId = this.getAttribute('data-id');
  
        fetch(`/api/posts/${postId}`, {
          method: 'DELETE',
        })
        .then(response => {
          if (response.ok) {
            console.log('Post deleted');
            location.reload();
          } else {
            alert('Failed to delete post');
          }
        })
        .catch(err => console.error(err));
      });
    });
  });

  document.getElementById('edit-post-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const postId = this.querySelector('[name="id"]').value;
    const title = this.querySelector('[name="title"]').value;
    const content = this.querySelector('[name="content"]').value;
  
    fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
      if (response.ok) {
        console.log('Post updated');
        location.href = '/dashboard'; // Redirect back to the dashboard or post view
      } else {
        alert('Failed to update post');
      }
    });
  });
  
  

});
