import { debounce } from "../utils/debounce.js";

export default function SearchInput({ target, initialState, onChange }) {
  this.element = document.createElement("form");
  this.element.className = "SearchInput";

  this.state = initialState;

  target.appendChild(this.element);

  this.render = () => {
    this.element.innerHTML = `
      <input
        class="SearchInput__input"
        type="text"
        placeholder="프로그램 언어를 입력하세요."
        value="${this.state}"
      />
    `;
    document.querySelector(".SearchInput__input").focus();
  };

  this.render();

  this.element.addEventListener(
    "keyup",
    debounce(({ key, target: { value } }) => {
      const ignoreKeys = ["ArrowUp", "ArrowDown", "Enter"];
      if (ignoreKeys.includes(key)) return;
      onChange(value);
    }, 500)
  );

  this.element.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}
