import React, { Component } from 'react';


class Profile extends Component {

  render() {

    let artist = {
      name : '',
      followers : {
        total : ''
      },
      genres : [],
      images : [{url : ''}]
    };

    if ( this.props.artist != null ) {
        artist = this.props.artist;
    }

    console.log( artist );

    return (
      <div className="profile">
        <div className="profile-info">

          <img
            alt="profile"
            className="profile-img"
            src={ artist.images[0].url }
          />

          <div className="profile-name"> { artist.name } </div>
          <div className="profile-followers"> Followers { artist.followers.total } </div>

          <div className="profile-genres">

            {
              artist.genres.map( (genre,inxex) => {
                return (<span key={inxex}> {genre}, </span> )
              })
            }

          </div>

        </div>
      </div>

    )
  }
}

export default Profile;
