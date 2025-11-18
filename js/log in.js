// Toggle Panel Animation
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});

// =========================
// VALIDASI LOGIN (Sign In)
// =========================

document.querySelector(".sign-in form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = this.querySelector('input[type="email"]').value.trim();
    const password = this.querySelector('input[type="password"]').value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        Swal.fire({
            icon: "error",
            title: "Email kosong",
            text: "Harap isi email terlebih dahulu.",
        });
        return;
    }

    if (!emailPattern.test(email)) {
        Swal.fire({
            icon: "warning",
            title: "Format email salah",
            text: "Gunakan format email yang benar.",
        });
        return;
    }

    if (password === "") {
        Swal.fire({
            icon: "error",
            title: "Password kosong",
            text: "Masukkan password kamu.",
        });
        return;
    }

    // Jika valid
    Swal.fire({
        icon: "success",
        title: "Login Berhasil!",
        text: "Selamat datang kembali! 👋",
        timer: 1500,
        showConfirmButton: false
    }).then(() => {
        window.location.href = "user.html"; // ubah sesuai halaman tujuan
    });
});

// =========================
// VALIDASI SIGN UP
// =========================

document.querySelector(".sign-up form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = this.querySelector('input[placeholder="Name"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const password = this.querySelector('input[type="password"]').value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "") {
        Swal.fire({
            icon: "error",
            title: "Nama kosong",
            text: "Harap masukkan nama lengkap.",
        });
        return;
    }

    if (email === "") {
        Swal.fire({
            icon: "error",
            title: "Email kosong",
            text: "Harap isi email.",
        });
        return;
    }

    if (!emailPattern.test(email)) {
        Swal.fire({
            icon: "warning",
            title: "Email tidak valid",
            text: "Gunakan format email yang benar.",
        });
        return;
    }

    if (password.length < 6) {
        Swal.fire({
            icon: "error",
            title: "Password terlalu pendek",
            text: "Password minimal 6 karakter.",
        });
        return;
    }

    Swal.fire({
        icon: "success",
        title: "Akun Berhasil Dibuat!",
        text: "Kamu bisa login sekarang.",
        timer: 1800,
        showConfirmButton: false
    });
});

