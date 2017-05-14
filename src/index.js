import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyC4GNozaw1jOCCAbm0GOHKQk97wwIX547k';


// Create a new component. This component should produce some HTML
class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch("kittens");
  }

  videoSearch(term) {
    YTSearch({term: term, key: API_KEY}, (videos) => {
      // console.log(videos);
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
      // ES6 syntax simplification:
      // this.setState({videos: videos}); === this.setState({videos});
    })
  }

  render(){
    const videoSearch = _.debounce(term => { this.videoSearch(term) }, 300);

    return (
      <div>
        {/* <SearchBar onSearchTermChange={term => this.videoSearch(term)} /> */}
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
