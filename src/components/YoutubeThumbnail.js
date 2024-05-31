const YoutubeThumbnail = ({videoId}) => {
  return (
    <div 
    className="youtube-thumbnail">
      <img
        src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
        alt="thumbnail"
      />
    </div>
  );
};

export default YoutubeThumbnail;
