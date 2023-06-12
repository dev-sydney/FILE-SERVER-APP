const getFileThumbNail = (file) => {
  switch (file.file_type.split('/')[0]) {
    case 'image':
      return (
        <a href={`/files/${file.file_name}`} target="_blank" rel="noreferrer">
          <img
            className="feed_thumbnail"
            src={`/files/${file.file_name}`}
            alt="file thumbnail"
          />
        </a>
      );

    case 'application':
      return (
        <a
          href={`/files/${file.file_name}`}
          target="_blank"
          rel="noreferrer"
          style={{ outline: '1px solid blue' }}
        >
          <img
            // className="feed_thumbnail"
            src={`/img/thumbnails/pdf-thumbnail.png`}
            alt="file thumbnail"
            role="presentation"
            style={{ width: '100%', height: '100%' }}
          />
        </a>
      );

    case 'video':
      return (
        <a href={`/files/${file.file_name}`} target="_blank" rel="noreferrer">
          <img
            src={`/img/thumbnails/Play-Button-thumbnail.png`}
            // className="feed_thumbnail"
            alt="file thumbnail"
            role="presentation"
            style={{ width: '100%', height: '100%' }}
          />
        </a>
      );

    // case 'txt':
    //   return <UilAlignJustify size="2em" color="#5575EA" />;
    default:
      return <div></div>;
  }
};

export default getFileThumbNail;
