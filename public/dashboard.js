window.addEventListener("DOMContentLoaded", () => {
  getUserData();
  updateDashboardUser();

  const verify = document.querySelector(".verify");
  const verifySuccess = document.querySelector(".verifySuccess");
  const verifyError = document.querySelector(".verifyError");

  verify.addEventListener("click", async () => {
    const response = await fetch("/verifyemail", { method: "POST" });

    const data = await response.json();

    if (data.success) {
      verifySuccess.textContent = "check your email";
    } else if (data.error) {
      verifyError.textContent = data.error;
    }
  });

  /* ~~~~~~~~~~~~~~~~~~~~ */
  /* ~~~~~~~~~~~~~~~~~~~~ */
});

const updateDashboardUser = () => {
  const editForm = document.querySelector(".editForm");
  const edit = document.querySelectorAll(".edit");
  const editContainer = document.querySelector(".editContainer");
  const editValue = document.querySelector(".editValue");
  const editBtn = document.querySelector(".editBtn");
  const editHideBtn = document.querySelector(".editHideBtn");
  const editError = document.querySelector(".editError");

  editHideBtn.addEventListener("click", () => {
    editContainer.classList.add("hidden");
  });

  edit.forEach((item) => {
    item.addEventListener("click", (e) => {
      editContainer.classList.toggle("hidden");
      if (e.target.classList.contains("editUsername")) {
        editBtn.value = "Edit username";
        editValue.placeholder = "edit username";
      } else {
        editBtn.value = "Edit email";
        editValue.placeholder = "edit email";
      }
    });
  });

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!editValue.value) {
      editError.textContent = "please provide value";
      setTimeout(() => {
        editError.textContent = "";
      }, 2000);
      return;
    }

    const type = editBtn.value.toString().toLowerCase().includes("username")
      ? "username"
      : "email";

    updateUser(editValue.value, type, editError);
  });
};

const updateUser = async (value, type, editError) => {
  const response = await fetch("/auth/updateuser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value, type }),
  });

  const data = await response.json();
  console.log(data);

  if (data.error) {
    editError.textContent = data.error;
  } else if (data.success) {
    location.href = "/dashboard";
  }
};

const getUserData = () => {
  const username = document.querySelector(".username");
  const email = document.querySelector(".email");
  const createdAt = document.querySelector(".createdAt");
  const isVerified = document.querySelector(".isVerified");

  const getUser = async () => {
    const response = await fetch("/getUser");

    const { user } = await response.json();
    if (user) {
      username.textContent = user.username;
      email.textContent = user.email;
      createdAt.textContent = user.createdAt;
      isVerified.textContent = user.isVerified ? "verified" : "not verified";
    }
  };

  getUser();
};
