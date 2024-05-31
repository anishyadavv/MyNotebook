const AutoLink = ({ text }) => {
  const delimiter =
    /((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;

  const getvideoId = (url) => {
    let videoId;
    if (url.match("https://youtu.be/")) {
      const arr = url.replace("https://youtu.be/", "");

      videoId = arr.split("?")[0];
    } else {
      const urlParams = new URLSearchParams(url.split("?")[1]); // Parse query string
      videoId = urlParams.get("v");
    }
    return videoId;
  };
  const isYoutubeVideo = (url) => {
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(watch\?v=)?([a-zA-Z0-9_-]{11})/;
    return youtubeRegex.test(url);
  };
  return (
    <>
      {text.split(delimiter).map((word) => {
        const match = word.match(delimiter);
        if (match) {
          const url = match[0];
          return (
            <div>
              <a
                href={url.startsWith("http") ? url : `http://${url}`}
                target="_blank"
                rel="noreferrer"
              >
                {isYoutubeVideo(url) ? (
                  <img
                    style={{ width: "30vw", marginBottom: "10px" }}
                    src={`https://img.youtube.com/vi/${getvideoId(url)}/0.jpg`}
                    alt="thumbnail"
                  />
                ) : (
                  url
                )}
                <br />
              </a>
            </div>
          );
        }
      })}
    </>
  );
};

export default AutoLink;
