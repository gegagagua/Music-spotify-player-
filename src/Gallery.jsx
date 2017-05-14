import React, { Component } from 'react';


class Gallery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playing : false,
      audio : null,
      playingUrl : ''
    }
  }

  playAudio( soundLink ) {

    let audio = new Audio( soundLink );
    if( !this.state.playing ) {
      audio.play();
      this.setState({
        playing : true,
        audio : audio,
        playingUrl : soundLink
      });
    }else {
      if( this.state.playingUrl === soundLink ) {
        this.state.audio.pause();
        this.setState({
          playing : false
        });
      }else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing : true,
          audio : audio,
          playingUrl : soundLink
        });
      }
    }

  }

  render() {

    const tracks = this.props.tracks;

    return (
      <div className="gallery">

        {tracks.map( (track,index) => {

          const image = track.album.images[0].url;

          return (
            <div key={index} className='track' onClick={ () => this.playAudio( track.preview_url ) }>

                <img src={image} alt="track" className="track-img" />
                <div className='track-play'>
                  <div className='track-play-inner'>
                    {
                      ( this.state.playingUrl === track.preview_url )
                      ? <span> | | </span>
                      : <span> &#9654; </span>
                    }
                  </div>
                </div>
                <p> {track.name} </p>

            </div>
          )

        })}

      </div>
    )
  }
}

export default Gallery;
