import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const enumChecking = (value: string, enumType: any) => {
  return Object.values(enumType).includes(value);
}

export const convertToDate = (str: string) => {
  if (str === '') return str;
  const date = new Date(str);
  return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
};

export const getTime = (str: string) => {
  const date = new Date(str);
  var ampm: String = 'AM';
  var hours: Number;

  if (date.getHours() == 0) {
    hours = 12;
  } else {
    if (date.getHours() > 12) {
      ampm = 'PM';
      hours = date.getHours() - 12;
    } else {
      hours = date.getHours();
    }
  }

  const minuteStr = String(date.getMinutes()).padStart(2, '0');

  return hours + ':' + minuteStr + ' ' + ampm;
};

/**
 * Fetch data in given route
 * @param route Route name
 * @returns a Promise that resolves with the parsed JSON response data from the server
 */
export const fetchData = async (route: string) => {
  const res = await fetch(route);
  if (!res.ok) {
    throw new Error('An error has occurred while fetching: ' + res.statusText);
  }
  return await res.json();
};

export const fetcher = (url: string) => fetch(url).then(res => res.json());

// function to export what is on the table at the time to an excel file
export const handleExport = (fileName: string) => {
  const workbook = XLSX.utils.table_to_book(
    document.querySelector('#table-container')
  );
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, fileName + '.xlsx');
};
