import { Document, Page, pdfjs } from 'react-pdf';

/**
 * Handles the logic to render out  a small preview of a fileor
 * some other placeholder for unsupported media
 * @param {Object} file The File data
 * @returns
 */
const GetFileThumbNail = (file) => {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
  ).toString();

  switch (file?.file_type.split('/')[0]) {
    case 'image':
      return (
        <img
          className="file-preview"
          src={`/files/${file.file_name}`}
          alt="file"
        />
      );

    case 'application':
      return (
        <Document file={`/files/${file?.file_name}`} className={'preview-pdf'}>
          <Page
            renderAnnotationLayer={false}
            renderTextLayer={false}
            render
            height={200}
            pageNumber={1}
          />
        </Document>
      );

    case 'video':
      return (
        <video controls playsInline={true} className="file-preview">
          <source src={`/files/${file?.file_name}`} type={file?.file_type} />
          <p>
            Your browser does not support HTML video. Here is a
            <a href={`/files/${file?.file_name}`}>link to the video</a> instead.
          </p>
        </video>
      );
    case 'audio':
      return (
        <audio controls className="file-preview">
          <source src={`/files/${file?.file_name}`} type={file?.file_type} />
          <p>
            Your browser does not support this audio format. Download
            <a href={`/files/${file?.file_name}`}>the file</a> instead.
          </p>
        </audio>
      );

    default:
      return <div></div>;
  }
};

export default GetFileThumbNail;
