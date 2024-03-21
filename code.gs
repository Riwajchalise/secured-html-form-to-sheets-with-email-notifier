const sheetName = 'Sheet1';
const scriptProp = PropertiesService.getScriptProperties();

function initialSetup() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}


function sendEmail(row) {
  const recipientEmail = 'test@email.com'; //Replace with the email address where you want to receive notification 
  const subject = 'New Form Submission';
  const body = `A new form submission has been added to Sheet1. 
    \n\nDetails:\n${JSON.stringify(row)}`;

  GmailApp.sendEmail(recipientEmail, subject, body);
}

function isValidOrigin(origin) {
  // Define the allowed domain 
  const allowedDomain = 'https://sfs.rctec.co;' // Replace this with your domain name

  // Check if the origin matches the allowed domain 
  return origin.includes(allowedDomain);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const origin = e && e.parameter && e.parameter.origin ? e.parameter.origin : '';
    const isValid = isValidOrigin(origin);

    if (!isValid) {
      // If the origin is not valid, return an error response
      return ContentService
        .createTextOutput(JSON.stringify({ 'result': 'error', 'message': 'You are not allowed to access this resource.' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Proceed with the rest of your code to handle valid submissions
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    const sheet = doc.getSheetByName(sheetName);

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    const newRow = headers.map(function (header) {
      return header === 'Date' ? new Date() : e.parameter[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    // Send email with the last entered row
    sendEmail({ 'row': nextRow, 'data': newRow });

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}
