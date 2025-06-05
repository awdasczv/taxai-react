import Papa from 'papaparse';


const CsvLoader = async()=> {
  const fileNames = ['input-controller-common.csv', 'input-controller-conditional.csv'];
  const csvFolder = '/csv/';
  
  const results = await Promise.all(
    fileNames.map(async (fileName) => {
      const response = await fetch(`${csvFolder}${fileName}`);
      const text = await response.text();
      return new Promise((resolve) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => resolve({ fileName, data: result.data }),
        });
      });
    })
  );


  // 결과 예시: [{ fileName: '...', data: [...] }, ...]
  return results;
}

export default CsvLoader;