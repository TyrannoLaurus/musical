const client = supabase.createClient(
  'https://tlewpfnvncitbuvghzrb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZXdwZm52bmNpdGJ1dmdoenJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MjM4NTIsImV4cCI6MjA3OTQ5OTg1Mn0.xdQ1COPtiOt78IEJE8kkVfp1PpuCKnHHkOa4itMSzew'
);

// sign up
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  const { data, error } = await client.auth.signUp({
    email,
    password,
  });

  if (error) alert(error.message);
  else alert("Check your email to confirm your account");
});

// log in
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) alert(error.message);
  else window.location.href = "members.html";
});

// check user session on protected pages
async function requireAuth() {
  const { data: { session } } = await client.auth.getSession();
  if (!session) {
    // not logged in
    window.location.href = "/";
  } else {
    document.getElementById("protected-content").style.display = "block";
  }
}

// Run on members page only
if (window.location.pathname.includes("members")) {
  requireAuth();
}
