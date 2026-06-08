const { google } = require('googleapis');
const path = require('path');

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = 'Sheet1';

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../../service-account.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({
  version: 'v4',
  auth,
});

async function appendAppointment(appointment) {
  try {
    const values = [[
      appointment.referenceId,
      appointment.timestamp,
      appointment.name,
      appointment.phone,
      appointment.date,
      appointment.time,
      appointment.service,
      appointment.notes || '',
      appointment.status,
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:I`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    console.log('✅ Appointment added to Google Sheets');

    return true;
  } catch (error) {
    console.error('❌ Google Sheets Append Error:', error.message);
    return false;
  }
}

async function getAppointments() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:I`,
    });

    const rows = response.data.values || [];

    if (rows.length <= 1) {
      return [];
    }

    return rows.slice(1).map((row) => ({
      referenceId: row[0] || '',
      timestamp: row[1] || '',
      name: row[2] || '',
      phone: row[3] || '',
      date: row[4] || '',
      time: row[5] || '',
      service: row[6] || '',
      notes: row[7] || '',
      status: row[8] || '',
    }));
  } catch (error) {
    console.error('❌ Google Sheets Fetch Error:', error.message);
    return [];
  }
}

async function updateAppointment(referenceId, updatedData) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:I`,
    });

    const rows = response.data.values || [];

    const rowIndex = rows.findIndex(
      (row) => row[0] === referenceId
    );

    if (rowIndex === -1) {
      return false;
    }

    const updatedRow = [
      updatedData.referenceId,
      updatedData.timestamp,
      updatedData.name,
      updatedData.phone,
      updatedData.date,
      updatedData.time,
      updatedData.service,
      updatedData.notes,
      updatedData.status,
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A${rowIndex + 1}:I${rowIndex + 1}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [updatedRow],
      },
    });

    console.log('✅ Appointment updated');

    return true;
  } catch (error) {
    console.error('❌ Google Sheets Update Error:', error.message);
    return false;
  }
}

module.exports = {
  appendAppointment,
  getAppointments,
  updateAppointment,
};