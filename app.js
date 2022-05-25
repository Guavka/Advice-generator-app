(function () {
  async function init() {
    const title = document.getElementById("card-title");
    if (title === null) {
      throw new Error("title is null");
    }

    const adviceText = document.getElementById("advice-content");
    if (adviceText === null) {
      throw new Error("adviceText is null");
    }

    const updateButton = document.getElementById("update-btn");
    if (updateButton === null) {
      throw new Error("updateButton is null");
    }
    return [title, adviceText, updateButton];
  }

  async function initListeners() {
    const [title, adviceText, updateButton] = await init();

    async function getAdvice() {
      const url = "https://api.adviceslip.com/advice";

      let data;
      try {
        const response = await fetch(url);
        data = await response.json();
      } catch (error) {
        throw new Error(`Error with fetch: ${error}`);
      }

      try {
        title.innerHTML = data.slip.id;
        adviceText.innerHTML = data.slip.advice;
      } catch (error) {
        throw new Error(`Error with data: ${error}`);
      }
    }

    window.addEventListener("DOMContentLoaded", () => {
      getAdvice();
    });

    updateButton.addEventListener("click", () => {
      getAdvice();
    });
  }

  try {
    initListeners();
  } catch (error) {
    console.log(error);
    //alert("Someone wrong! Try again later!");
  }
})();
