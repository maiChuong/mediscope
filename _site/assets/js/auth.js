async function hash(input) {
  const encoder = new TextEncoder();
  const buffer = await crypto.subtle.digest('SHA-256', encoder.encode(input));
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const hashed = await hash(password);

  try {
    const response = await fetch('data/auth.json'); // ✅ relative path for local testing
    const credentials = await response.json();

    // ✅ Debug logging inside the scope
    console.log("Username:", username);
    console.log("Hashed password:", hashed);
    console.log("Stored hash:", credentials[username]);

    if (credentials[username] === hashed) {
      localStorage.setItem('authUser', username);
      window.location.href = '/editor.html';
    } else {
      alert('Invalid credentials');
    }
  } catch (err) {
    alert('Authentication error');
    console.error(err);
  }
});
