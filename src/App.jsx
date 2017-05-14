import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile.jsx';
import Gallery from './Gallery.jsx';

class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
        query : '',
        artist : null,
        tracks : []
      }
    }

    changeVal( event ) {
        this.setState({
          query : event.target.value
        });
    }

    search( event ) {
      event.preventDefault();
      const BASE_URL  = 'https://api.spotify.com/v1/search';
      let   FETCH_URL = BASE_URL + '?q=' + this.state.query
                                 + '&type=artist&limit=1';
      const ALBUM_URL = 'https://api.spotify.com/v1/artists';

      fetch( FETCH_URL , {
        method : 'GET'
      })
      .then( response => response.json() )
      .then( json => {

          const artist = json.artists.items[0];
          this.setState({artist});

          FETCH_URL = `${ALBUM_URL}/${artist.id}/top-tracks/?country=US`;
          fetch( FETCH_URL, {
              method : 'GET'
          })
          .then( response => response.json() )
          .then( json => {
              this.setState({
                tracks : json.tracks
              });
          });

      });
    }

    render() {
        return (
            <div className="app">

              <h1 className="app-title"> Music master </h1>

              <form onSubmit={ (event) => this.search(event) }>

                <FormGroup>

                  <InputGroup>

                    <FormControl
                      type="text"
                      value={ this.state.query }
                      onChange={ ( event ) => this.changeVal( event ) }
                      placeholder="Search artist ..." />

                    <InputGroup.Addon onClick={ (event) => this.search(event) }>
                      <Glyphicon glyph='search'> </Glyphicon>
                    </InputGroup.Addon>

                  </InputGroup>

                </FormGroup>

              </form>

              {
                ( this.state.artist !== null )
                ?
                <div className="profile-container">

                  <Profile artist={this.state.artist} />

                  <Gallery tracks={this.state.tracks} />

                </div>
                :
                  <div> Please write real singer </div>

              }

            </div>
        )
    }
}


export default App;
