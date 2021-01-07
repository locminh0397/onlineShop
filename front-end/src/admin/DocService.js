import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = (html, invoiceName) => {
    savePDF(html, { 
      paperSize: 'Letter',
      fileName: `HD ${invoiceName}`,
    })
  }
}

const Doc = new DocService();
export default Doc;