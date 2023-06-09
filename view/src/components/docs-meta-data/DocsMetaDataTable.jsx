import {
  UilScenery,
  UilFileAlt,
  UilFilm,
  UilAlignJustify,
  UilFileQuestionAlt,
  //  UilDocumentInfo
} from '@iconscout/react-unicons';
import PropTypes from 'prop-types';

const DocsMetaDataTable = ({ companyDocuments }) => {
  const getDocumentIcon = (fileType = String) => {
    switch (fileType) {
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
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name ⬆️</th>
            <th>Uploaded on 🕒</th>
            <th>Shares</th>
            <th>Downloads</th>
          </tr>
        </thead>
        <tbody>
          {companyDocuments.length > 0 &&
            companyDocuments.map((docData, i) => (
              <tr key={i}>
                <td>
                  {getDocumentIcon(docData.file_type.toLowerCase())}

                  {docData.title}
                </td>
                <td>{new Date(docData.created_at).toDateString()}</td>
                <td>{docData.no_shares}</td>
                <td>{docData.no_downloads ? docData.no_downloads : 'none'}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
DocsMetaDataTable.propTypes = {
  companyDocuments: PropTypes.array,
};
export default DocsMetaDataTable;
