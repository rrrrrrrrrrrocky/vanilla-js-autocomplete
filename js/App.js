import { fetchLanguages } from "../api/index.js";
import SearchInput from "./SearchInput.js";
import SelectedLanguages from "./SelectedLanguages.js";
import Suggestion from "./Suggestion.js";

export default function App({ target }) {
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: [],
    keyword: "",
  };

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    suggestion.setState({
      selectedIndex: 0,
      items: this.state.fetchedLanguages,
      keyword: this.state.keyword,
    });
    selectedLanguages.setState(this.state.selectedLanguages);
  };

  const selectedLanguages = new SelectedLanguages({
    target,
    initialState: [],
  });

  const searchInput = new SearchInput({
    target,
    initialState: "",
    onChange: async (keyword) => {
      if (!keyword) {
        this.setState({
          fetchedLanguages: [],
        });
      } else {
        const languages = await fetchLanguages(keyword);
        this.setState({
          fetchedLanguages: languages,
          keyword,
        });
      }
    },
  });

  const suggestion = new Suggestion({
    target,
    initialState: {
      items: [],
      selectedIndex: 0,
      keyword: "",
    },
    onSelect: (language) => {
      // alert(language);

      this.setState({
        selectedLanguages: [...this.state.selectedLanguages, language],
      });
    },
  });
}
