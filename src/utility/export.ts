import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";

interface Column {
  header: string;
  accessor: string;
}

export const exportToExcel = (data: any[], fileName = "report.xlsx") => {
  // Create worksheet from JSON data
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate excel file
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  // Save file
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, fileName);
};

export const exportTablePDF = (jsonData: any[], fileName = "report.pdf") => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("User Report", 14, 15);

  // Extract columns and rows
  const columns = Object.keys(jsonData[0]);
  const rows: any[] = jsonData.map((item) => Object.values(item));

  autoTable(doc, {
    startY: 25,
    head: [columns],
    body: rows,
    margin: { top: 20 },
    styles: {
      fontSize: 11,
    },
    headStyles: {
      fillColor: [22, 160, 133], // optional
    },
  });

  doc.save(fileName);
};

export const saveJsonFile = (data: any[], fileName = "report.json") => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], {
    type: "application/json;charset=utf-8",
  });

  saveAs(blob, fileName);
};

export const exportFile = (
  exportData: any[],
  key: string,
  fileName: string
) => {
  switch (key) {
    case "excel":
      exportToExcel(exportData, `${fileName}.xlsx`);
      break;
    case "pdf":
      exportTablePDF(exportData, `${fileName}.pdf`);
      break;
    case "json":
      saveJsonFile(exportData, `${fileName}.json`);
      break;

    default:
      break;
  }
};

