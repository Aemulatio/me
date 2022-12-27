(function () {
  "use strict";
  /*[panel and well CSS scrolls]*/
  let panels = document.querySelectorAll(".panel").length,
    scrollDirection,
    hold = false;

  function _scrollY(obj) {
    let scrollLength,
      panelLength,
      panel,
      step = 100,
      vh = window.innerHeight / 100,
      vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
    if (
      (this !== undefined && this.id === "fullPage_container") ||
      (obj !== undefined && obj.id === "fullPage_container")
    ) {
      panel = this || obj;
      panelLength = parseInt(panel.offsetHeight / vh);
    }
    if (panel === undefined) {
      return;
    }
    panelLength = panelLength || parseInt(panel.offsetHeight / vmin);
    scrollLength = parseInt(panel.style.transform.replace("translateY(", ""));
    if (
      scrollDirection === "up" &&
      Math.abs(scrollLength) < panelLength - panelLength / panels
    ) {
      scrollLength = scrollLength - step;
    } else if (scrollDirection === "down" && scrollLength < 0) {
      scrollLength = scrollLength + step;
    } else if (scrollDirection === "top") {
      scrollLength = 0;
    }
    if (hold === false) {
      hold = true;
      panel.style.transform = "translateY(" + scrollLength + "vh)";
      points.forEach((point) => point.classList.remove("active"));
      points[scrollLength / -100].classList.add("active");
      setTimeout(function () {
        hold = false;
      }, 1000);
    }
    console.log(
      scrollDirection +
        ":" +
        scrollLength +
        ":" +
        panelLength +
        ":" +
        (panelLength - panelLength / panels)
    );
  }

  /*[swipe detection on touchscreen devices]*/
  function _swipe(obj) {
    let swipeDirection,
      sX,
      sY,
      dX,
      dY,
      threshold = 100,
      /*[min distance traveled to be considered swipe]*/
      slack = 50,
      /*[max distance allowed at the same time in perpendicular direction]*/
      alT = 500,
      /*[max time allowed to travel that distance]*/
      elT /*[elapsed time]*/,
      stT; /*[start time]*/
    obj.addEventListener(
      "touchstart",
      function (e) {
        const tchs = e.changedTouches[0];
        swipeDirection = "none";
        sX = tchs.pageX;
        sY = tchs.pageY;
        stT = new Date().getTime();
        //e.preventDefault();
      },
      false
    );

    obj.addEventListener(
      "touchmove",
      function (e) {
        e.preventDefault(); /*[prevent scrolling when inside DIV]*/
      },
      false
    );

    obj.addEventListener(
      "touchend",
      function (e) {
        const tchs = e.changedTouches[0];
        dX = tchs.pageX - sX;
        dY = tchs.pageY - sY;
        elT = new Date().getTime() - stT;
        if (elT <= alT) {
          if (Math.abs(dX) >= threshold && Math.abs(dY) <= slack) {
            swipeDirection = dX < 0 ? "left" : "right";
          } else if (Math.abs(dY) >= threshold && Math.abs(dX) <= slack) {
            swipeDirection = dY < 0 ? "up" : "down";
          }
          if (obj.id === "fullPage_container") {
            if (swipeDirection === "up") {
              scrollDirection = swipeDirection;
              _scrollY(obj);
            } else if (
              swipeDirection === "down" &&
              obj.style.transform !== "translateY(0)"
            ) {
              scrollDirection = swipeDirection;
              _scrollY(obj);
            }
            e.stopPropagation();
          }
        }
      },
      false
    );
  }

  /*[assignments]*/
  const fullPage_container = document.getElementById("fullPage_container");
  fullPage_container.style.transform = "translateY(0vh)";
  fullPage_container.addEventListener("wheel", function (e) {
    if (e.deltaY < 0) {
      scrollDirection = "down";
    }
    if (e.deltaY > 0) {
      scrollDirection = "up";
    }
    e.stopPropagation();
  });
  fullPage_container.addEventListener("wheel", _scrollY);
  _swipe(fullPage_container);

  const points = document.querySelectorAll(".point");

  points.forEach((point, index, list) => {
    point.classList.remove("active");
    if (index === 0) {
      point.addEventListener("click", function () {
        scrollDirection = "top";
        _scrollY(fullPage_container);
        list.forEach((point) => point.classList.remove("active"));
        point.classList.add("active");
      });
    } else {
      point.addEventListener("click", function () {
        fullPage_container.style.transform =
          "translateY(" + -index * 100 + "vh)";
        list.forEach((point) => point.classList.remove("active"));
        point.classList.add("active");
      });
    }
  });

  points[0].classList.add("active");
})();
