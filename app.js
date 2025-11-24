const client = supabase.createClient(
  'https://tlewpfnvncitbuvghzrb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZXdwZm52bmNpdGJ1dmdoenJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MjM4NTIsImV4cCI6MjA3OTQ5OTg1Mn0.xdQ1COPtiOt78IEJE8kkVfp1PpuCKnHHkOa4itMSzew'
);

// sign up (commented out for now)
// document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const email = document.getElementById("signup-email").value;
//   const password = document.getElementById("signup-password").value;

//   const { data, error } = await client.auth.signUp({ email, password });

//   if (error) alert(error.message);
//   else alert("Check your email to confirm your account");
// });

// log in
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      const { 
        data: { user }, 
        error 
      } = await client.auth.signInWithPassword({ email, password });

      if (error) {
        alert(error.message);
      } else if (user) {
        window.location.href = "members.html";
      } else {
        alert("Login mislukt: gebruiker bestaat niet");
      }
    });
  }

  // check user session on protected pages
  async function requireAuth() {
    const {
      data: { session },
    } = await client.auth.getSession();

    console.log("Session on members page:", session);

    if (!session) {
      window.location.href = "musical/login.html";
    } else {
      const protectedDiv = document.getElementById("protected-content");
      if (protectedDiv) protectedDiv.style.display = "block";
    }
  }

  // Run on members page only
  if (window.location.pathname.includes("members")) {
    requireAuth();
  }
}); // <-- this was missing
