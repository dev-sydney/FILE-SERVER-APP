import {
  UilScenery,
  UilFileAlt,
  UilFilm,
  UilAlignJustify,
  UilFileQuestionAlt,
  //  UilDocumentInfo
} from '@iconscout/react-unicons';

const getFileIcon = (file) => {
  switch (file.file_type.split('/')[1].toLowerCase()) {
    //NOTE:Some Image formats
    case 'jpeg':
      return <UilScenery size="2em" color="#5575EA" />;
    case 'png':
      return <UilScenery size="2em" color="#5575EA" />;
    case 'jpg':
      return <UilScenery size="2em" color="#5575EA" />;
    case 'gif':
      return <UilScenery size="2em" color="#5575EA" />;
    case 'bmp':
      return <UilScenery size="2em" color="#5575EA" />;
    //NOTE: Some video formats
    case 'mp4':
      return <UilFilm size="2em" color="#5575EA" />;
    case 'avi':
      return <UilFilm size="2em" color="#5575EA" />;
    case 'mkv':
      return <UilFilm size="2em" color="#5575EA" />;
    case 'pdf':
      return <UilFileAlt size="2em" color="#5575EA" />;
    case 'txt':
      return <UilAlignJustify size="2em" color="#5575EA" />;
    default:
      return <UilFileQuestionAlt size="2em" color="#5575EA" />;
  }
};
export default getFileIcon;
