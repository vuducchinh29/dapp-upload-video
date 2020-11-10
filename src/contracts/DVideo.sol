pragma solidity >=0.5.0 <0.8.0;

// Steps:
// 1. Model the Video
// 2. Store the Video
// 3. Upload the Video
// 4. List Videos

contract DVideo {
  uint public videoCount = 0;
  string public name = "DVideo";

  // 2. Store the Video
  //Create id=>struct mapping
  mapping (uint => Video) public videos;

  //1. Model the Video
  struct Video {
    uint id;
    string videoHash;
    string title;
    address author;
  }

  //Create Event when video is uploaded
  event VideoUploaded (
    uint id,
    string videoHash,
    string title,
    address author
  );

  constructor() public {
  }

  function uploadVideo(string memory _videoHash, string memory _title) public {
    
    // Require conditions for this function to be run
    // Make sure the video hash exists
    require(bytes(_videoHash).length > 0);
    // Make sure video title exists
    require(bytes(_title).length > 0);
    // Make sure uploader address exists
    require(msg.sender != address(0));


    // Increment video id = videoCount
    videoCount ++;

    // Add video to the contract
    videos[videoCount] = Video(videoCount, _videoHash, _title, msg.sender);

    // Trigger an event
    emit VideoUploaded(videoCount, _videoHash, _title, msg.sender);
  }
}
