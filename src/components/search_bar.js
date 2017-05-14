import React from 'react';
// import ReactDOM from 'react-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  render () {
    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={e => this.onInputChange(e.target.value)}
        />
        {/* <p>Value of the input: {this.state.term}</p> */}
      </div>
    )
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
