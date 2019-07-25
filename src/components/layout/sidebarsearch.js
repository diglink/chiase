import React from "react";
import slug from "slug";
import Link from "gatsby-link";


export default class WidgetGoogleSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textSearch: ""
    }

    this.onInputChanged = this.onInputChanged.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onInputChanged({ target }) {
    this.setState({
      textSearch: target.value
    });
  }

  onSearch(event) {
    event.preventDefault();

    if (this.state.textSearch) {
      const query = `site:${this.props.siteUrl} ${this.state.textSearch}`
      window.open(`https://www.google.com/search?q=${encodeURI(query)}`);
    }
  }

  render() {
    return (



          <form className="search_form">
            <input
              type="text"
              className="widget-search-input"
              placeholder="text here..."
              onChange={this.onInputChanged}
              required
            />
            <button type="submit" className="widget-search-btn" onClick={this.onSearch}>
              <svg fill="none" height="16" id="i-search" overflow="visible" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" viewBox="0 -6 32 32" width="16">
<circle cx="14" cy="14" r="12"></circle><path d="M23 23 L30 30"></path></svg>
            </button>
          </form>

    )
  }
}