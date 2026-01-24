const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// ===== AKUN DEMO HARDCODED =====
const DEMO_ACCOUNTS = [
  {
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    redirect: "admin.html",
  },
  {
    email: "user@example.com",
    password: "user123",
    role: "user",
    redirect: "fooddelivery.html",
  },
];

// ===== SIGN IN =====
const signinForm = document.getElementById("signinForm");

signinForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("siEmail").value.trim();
  const password = document.getElementById("siPassword").value.trim();

  if (!email || !password) {
    Swal.fire({
      icon: "warning",
      title: "Input kosong",
      text: "Email dan password wajib diisi",
    });
    return;
  }

  const account = DEMO_ACCOUNTS.find(
    (acc) => acc.email === email && acc.password === password
  );

  if (!account) {
    Swal.fire({
      icon: "error",
      title: "Login gagal",
      text: "Email atau password salah",
    });
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Login berhasil",
    text: `Masuk sebagai ${account.role}`,
    timer: 1500,
    showConfirmButton: false,
  }).then(() => {
    window.location.href = account.redirect;
  });
});

// ===== SIGN UP (DEMO ONLY) =====
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  Swal.fire({
    icon: "info",
    title: "Demo Mode",
    text: "Sign Up dinonaktifkan. Gunakan akun demo.",
  });
});