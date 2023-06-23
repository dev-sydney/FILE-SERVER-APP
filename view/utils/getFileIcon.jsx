import {
  UilScenery,
  UilFileAlt,
  UilFilm,
  UilFileQuestionAlt,
  //  UilDocumentInfo
} from '@iconscout/react-unicons';
import getColorShade from './getColorShade';

const getFileIcon = (file) => {
  switch (file.file_type.split('/')[1].toLowerCase()) {
    //NOTE:Some Image formats
    case 'jpeg':
      return (
        <UilScenery
          size="2em"
          className="file_icon"
          color="#5575EA"
          style={{ backgroundColor: getColorShade('#5575EA', 130) }}
        />
      );
    case 'png':
      return (
        <UilScenery
          size="2em"
          className="file_icon"
          color="#53885A"
          style={{ backgroundColor: getColorShade('#53885A', 130) }}
        />
      );
    case 'jpg':
      return (
        <UilScenery
          size="2em"
          className="file_icon"
          color="#885365"
          style={{ backgroundColor: getColorShade('#885365', 130) }}
        />
      );

    /* ------ */
    case 'gif':
      return (
        <UilScenery
          size="2em"
          className="file_icon"
          color="#D65E18"
          style={{ backgroundColor: getColorShade('#D65E18', 130) }}
        />
      );
    case 'bmp':
      return (
        <UilScenery
          size="2em"
          className="file_icon"
          color="#ABD61A"
          style={{ backgroundColor: getColorShade('#ABD61A', 130) }}
        />
      );
    //NOTE: Some video formats
    case 'mp4':
      return (
        <UilFilm
          size="2em"
          className="file_icon"
          color="#C41AD6"
          style={{ backgroundColor: getColorShade('#C41AD6', 130) }}
        />
      );
    case 'avi':
      return (
        <UilFilm
          size="2em"
          className="file_icon"
          color="#D61AA1"
          style={{ backgroundColor: getColorShade('#D61AA1', 130) }}
        />
      );
    case 'mkv':
      return (
        <UilFilm
          size="2em"
          className="file_icon"
          color="#1AD679"
          style={{ backgroundColor: getColorShade('#1AD679', 130) }}
        />
      );
    case 'pdf':
      return (
        <UilFileAlt
          size="2em"
          className="file_icon"
          color="#D61A1A"
          style={{ backgroundColor: getColorShade('#D61A1A', 170) }}
        />
      );

    default:
      return (
        <UilFileQuestionAlt
          size="2em"
          className="file_icon"
          color="#5575EA"
          style={{ backgroundColor: getColorShade('#885365', 130) }}
        />
      );
  }
};
export default getFileIcon;
