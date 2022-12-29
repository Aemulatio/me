document.addEventListener("DOMContentLoaded", (e) => {
  const { y, height } = document
    .querySelector("div.me")
    .getBoundingClientRect();
  const header = document.querySelector("header.header");
  document.addEventListener("wheel", (e) => {
    const scrollY = window.scrollY;

    if (scrollY >= y + height) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  const notFirst = document.querySelectorAll(".notFirst");
  notFirst?.forEach((element, index) => {
    element.style.paddingTop = `${
      header.getBoundingClientRect().height * 1.5
    }px`;
  });
  console.log(notFirst);
});
