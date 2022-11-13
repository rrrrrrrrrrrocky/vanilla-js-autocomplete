const MAX_DISPLAY_COUNT = 5;
export default function SelectedLanguages({ target, initialState, onChange }) {
  this.element = document.createElement("div");
  this.element.className = "SelectedLanguage";
  this.state = initialState;

  target.appendChild(this.element);

  this.setState = (nextState) => {
    this.state = nextState;

    if (this.state.length > MAX_DISPLAY_COUNT) {
      this.state.splice(0, 1);
    }
    this.render();
  };

  this.render = () => {
    if (this.state.length > 0) {
      this.element.style.display = "block";
      this.element.innerHTML = `
      <ul>
        ${this.state
          .map((item, idx) => `<li data-index="${idx}">${item}</li>`)
          .join("")}
      </ul>
      `;
    } else {
      this.element.style.display = "none";
      this.element.innerHTML = "";
    }
  };

  this.render();
}
