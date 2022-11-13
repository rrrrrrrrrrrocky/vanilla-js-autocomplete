export default function Suggestion({ target, initialState, onSelect }) {
  this.element = document.createElement("div");
  this.element.className = "Suggestion";
  this.state = {
    selectedIndex: 0,
    items: initialState.items,
    keyword: "",
  };

  target.appendChild(this.element);

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.renderMatchItem = (keyword, item) => {
    const matchedText = item.match(new RegExp(keyword, "gi"))[0];
    return item.replace(
      new RegExp(matchedText, "gi"),
      `<span class="Suggestion__item--matched">${matchedText}</span>`
    );
  };

  this.render = () => {
    const { items = [], selectedIndex, keyword } = this.state;

    if (items.length > 0) {
      this.element.style.display = "block";
      this.element.innerHTML = `
      <ul>
        ${items
          .map(
            (item, idx) =>
              `<li class="${
                Number(idx) === selectedIndex
                  ? "Suggestion__item--selected"
                  : ""
              }" data-index="${idx}">${this.renderMatchItem(
                keyword,
                item
              )}</li>`
          )
          .join("")}
      </ul>
      `;
    } else {
      this.element.style.display = "none";
      this.element.innerHTML = "";
    }
  };

  this.render();

  window.addEventListener("keyup", ({ key }) => {
    const { selectedIndex } = this.state;
    const lastIndex = this.state.items.length - 1;
    const keys = ["ArrowUp", "ArrowDown", "Enter"];
    let nextIndex = selectedIndex;

    if (keys.includes(key)) {
      switch (key) {
        case "ArrowUp":
          nextIndex = selectedIndex === 0 ? lastIndex : selectedIndex - 1;
          break;
        case "ArrowDown":
          nextIndex = selectedIndex === lastIndex ? 0 : selectedIndex + 1;
          break;
        case "Enter":
          onSelect(this.state.items[this.state.selectedIndex]);
          break;
        default:
      }
      this.setState({ ...this.state, selectedIndex: nextIndex });
    }
  });

  window.addEventListener("click", (e) => {
    const idx = e.target.dataset.index;
    if (!idx) return;
    this.setState({ ...this.state, selectedIndex: idx });
    onSelect(this.state.items[idx]);
  });
}
