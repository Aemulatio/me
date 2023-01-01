document.addEventListener("DOMContentLoaded", (e) => {
  // const { y, height } = document
  //   .querySelector("div.me")
  //   .getBoundingClientRect();
  // const header = document.querySelector("header.header");
  // document.addEventListener("wheel", (e) => {
  //   const scrollY = window.scrollY;
  //
  //   if (scrollY >= y + height) {
  //     header.classList.add("scrolled");
  //   } else {
  //     header.classList.remove("scrolled");
  //   }
  // });
  //
  // const notFirst = document.querySelectorAll(".notFirst");
  // notFirst?.forEach((element, index) => {
  //   element.style.paddingTop = `${
  //     header.getBoundingClientRect().height * 1.5
  //   }px`;
  // });
  // console.log(notFirst);

  const getSiblings = function (e) {
    let siblings = [];
    if (!e.parentNode) {
      return siblings;
    }
    let sibling = e.parentNode.firstChild;
    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== e) {
        siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
    }
    return siblings;
  };

  const commercials = document.querySelectorAll("div[class*='__body'] li");
  commercials.forEach((element, index, list) => {
    element.addEventListener("click", function (e) {
      getSiblings(this).map((sibling) => {
        sibling
          .querySelector("div[class*='__item-body']")
          .classList.add("hide");
        sibling.classList.remove("active");
      });
      this.querySelector("div[class*='__item-body']").classList.toggle("hide");
      this.classList.toggle("active");
    });

    element
      .querySelector("div[class*='__item-body']")
      .addEventListener("click", (e) => e.stopPropagation());
  });

  const scrolls = document.querySelectorAll("div[class$='__next']");
  scrolls.forEach((element, index, list) => {
    element.addEventListener("click", function (e) {
      document
        .querySelector(`#${this.dataset.for}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
