import Papa from 'papaparse';

/**
 * CSV 파일들을 로드하고 파싱하는 함수
 * @returns {Promise<Array>} 파싱된 CSV 데이터 배열
 */
const csvLoader = async () => {
  // 로드할 CSV 파일 목록
  const fileNames = [
    'input-controller-common.csv',
     'input-controller-conditional.csv',
     'input-controller-acquisition.csv',
    ];
    
  const csvFolder = '/csv/';
  
  // 모든 CSV 파일을 병렬로 로드하고 파싱
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
};

export { csvLoader };