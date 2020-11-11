import React, { Component } from 'react';
import './style.scss';

class Main extends Component {

  render() {
    return (
      <div className="container-fluid text-monospace">
      <br></br>
      &nbsp;
      <br></br>
        <div className="row">
          <div className="col-md-10">
            <div className="embed-responsive embed-responsive-16by9 video-player">
              <video
                src={`https://ipfs.infura.io/ipfs/${this.props.currentHash}`}
                controls
                autoPlay
              />
            </div>
            <h3 style={{marginTop: 20}}><b><i>{this.props.currentTitle}</i></b></h3>
          </div>
          <div className="col-md-2 overflow-hidden text-center right-sidebar">
            <h5><b>Share Video</b></h5>
            <form onSubmit={(event) => {
              event.preventDefault()
              const title = this.videoTitle.value
              this.props.uploadVideo(title)
            }} >
              &nbsp;
              <input 
                type="file" 
                accept=".mp4, .mkv, .mov" 
                onChange={this.props.captureFile} 
                className="input-choose-file"
              />
              <div className="form-group" style={{textAlign: 'left'}}>
                <input
                  id='videoTitle'
                  type="text"
                  className="form-control-sm"
                  placeholder="Title..."
                  required
                  ref={(input) => {this.videoTitle = input}}
                  style={{width: '100%'}}
                />
              </div>
              <button type='submit' className='btn btn-danger btn-block btn-sm'>Upload</button>
              &nbsp;
            </form>
            <hr/>
            <h5 style={{marginBottom: 20}}><b>Recent Videos</b></h5>
            <div className='list-recent-videos'>
              {
                this.props.videos.length > 0 ?
                this.props.videos.map((video, index) => {
                  return (
                    <div key={index} className='card mb-4 text-center bg-secondary mx-auto' style={{ width: '60%'}}>
                      <div className="card-title bg-dark">
                        <small className="text-white"><b>{video.title}</b></small>
                      </div>
                        <div>
                          <p onClick={()=>this.props.changeVideo(video.videoHash, video.title)}>
                          <video
                            src={`https://ipfs.infura.io/ipfs/${video.videoHash}`}
                            style={{width: '100%'}}
                          />
                          </p>
                        </div>
                    </div>
                  )
                }) :
                <div>No videos found</div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;