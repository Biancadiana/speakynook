document.addEventListener('DOMContentLoaded', () => {

    // Handle Registration Form Submission (Google Sheets Integration)
    // IMPORTANT: Replace this URL with your actual Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyHYcPuACbHXDdTqC8EwOLNhB1LLVIl1JRO7uVRJy2-z1DYLXt7HY73r5i7YjRlIncw/exec';

    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = joinForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            // Send data to Google Sheets
            fetch(scriptURL, { method: 'POST', body: new FormData(joinForm) })
                .then(response => {
                    document.getElementById('joinSuccessMessage').style.display = 'block';
                    joinForm.reset();
                    btn.textContent = originalText;
                    btn.disabled = false;
                    setTimeout(() => { document.getElementById('joinSuccessMessage').style.display = 'none'; }, 5000);
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    alert("There was an error submitting your registration. Please try again.");
                    btn.textContent = originalText;
                    btn.disabled = false;
                });
        });
    }
});
