import XLSX from "xlsx";

export type dataType = {
  RSA: string;
  Password: string;
  Result: string;
};

export function excelReader() {
  // read the excel file
  const workbook1 = XLSX.readFile("testData/utils.xlsx");

  //   const workSheetName = workbook1.SheetNames[0];
  //   console.log(workSheetName);
  const workSheet = workbook1.Sheets["Sheet1"];
  const data = XLSX.utils.sheet_to_json<dataType>(workSheet);
  return data;
}
