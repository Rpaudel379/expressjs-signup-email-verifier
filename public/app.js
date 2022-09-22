window.addEventListener("DOMContentLoaded", () => {
  handleLoginRoutes();
});

const handleLoginRoutes = () => {
  const userType = document.querySelector(".userType");

  const form = document.querySelector(".form");

  const switchForm = document.querySelector(".switchForm");

  const errorText = document.querySelector(".error");
  const successText = document.querySelector(".success");

  let type = "Login";
  switchForm.addEventListener("click", (e) => {
    if (e.target.classList.contains("register")) {
      form.innerHTML = registerForm;

      switchForm.innerHTML = loginBtn;
      type = "Register";
      userType.textContent = type;
    } else if (e.target.classList.contains("login")) {
      form.innerHTML = loginForm;

      switchForm.innerHTML = registerBtn;

      type = "Login";
      userType.textContent = type;
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const email = e.target.email?.value;

    if (!username || !password || (type === "Register" && !email)) {
      errorText.textContent = "must not contain empty field/s";

      setTimeout(() => {
        errorText.textContent = "";
      }, 3500);
      return;
    } else {
      errorText.textContent = "";
    }

    if (type === "Login") {
      postLogin(username, password, errorText, successText);
    } else if (type === "Register") {
      postRegister(username, email, password, errorText, successText);
    }
  });
};

const postLogin = async (username, password, errorText, successText) => {
  const response = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (data) {
    if (data.error) {
      errorText.textContent = data.error;
      setTimeout(() => {
        errorText.textContent = "";
      }, 1500);
    } else if (data.success) {
      successText.textContent = data.success;

      setTimeout(() => {
        location.href = "/dashboard";
      }, 1500);
    }
  }
};

const postRegister = async (
  username,
  email,
  password,
  errorText,
  successText
) => {
  const response = await fetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();

  if (data) {
    if (data.error) {
      errorText.textContent = data.error;
    } else if (data.success) {
      successText.textContent = data.success;

      setTimeout(() => {
        location.href = "/dashboard";
      }, 2000);
    }
  }
};

const registerForm = `
    <input type="text" name="username" class="bg-slate-100 my-2 p-2.5 w-2/3 rounded-xl"
        placeholder="username" />
    <input type="email" name="email" class="bg-slate-100 my-2 p-2.5 w-2/3 rounded-xl" placeholder="email" />

    <input type="password" name="password" class="bg-slate-100 my-2 p-2.5 w-2/3 rounded-xl"
        placeholder="password" />

    <input type="submit" name="submit" value="register"
        class="bg-slate-300 cursor-pointer my-2 p-2.5 w-2/3 rounded-xl ">

`;

const loginForm = `<input type="text" name="username" class="bg-slate-100 my-2 p-2.5 w-2/3 rounded-xl"
placeholder="username" />

<input type="password" name="password" class="bg-slate-100 my-2 p-2.5 w-2/3 rounded-xl"
placeholder="password" />

<input type="submit" name="submit" value="signin"
class="bg-slate-300 cursor-pointer my-2 p-2.5 w-2/3 rounded-xl ">
`;

const loginBtn = `<p class="text-sm">Already a user? <span class="login underline cursor-pointer">login</span></p>
`;

const registerBtn = `<p class="text-sm">New User? <span class="register underline cursor-pointer">register</span></p>
`;
