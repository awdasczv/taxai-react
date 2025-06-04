import Papa from 'papaparse';
import { useState, useEffect } from 'react';

function CsvLoader() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/csv/input-controller-common.csv')
          .then((response) => response.text())
          .then((csvText) => {
            Papa.parse(csvText, {
              header: true,
              skipEmptyLines: true,
              complete: function (results) {
                const parsed = results.data.map(row => ({
                  category: row.category,
                  label: row.label,
                  labelId: row.label_id,
                  inputMethod: row.input_method,
                  placeholder: row.placehoder,
                  options: parseOptions(row.options),
                  note: row.note || ''
                }));
                setData(parsed);
                console.log(parsed);
              }
            });
          });
      }, []);
    
      const parseOptions = (optionStr) => {
        try {
          return optionStr ? JSON.parse(optionStr.replace(/'/g, '"')) : [];
        } catch {
          return [];
        }
      };

      return data;
}

export default CsvLoader;