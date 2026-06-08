const { v4: uuidv4 } = require('uuid');

const googleSheetsService = require('./googleSheetsService');

async function createAppointment(data) {
  try {
    const existingAppointments =
      await googleSheetsService.getAppointments();

    const duplicate = existingAppointments.find(
      (appointment) =>
        appointment.date === data.date &&
        appointment.time === data.time &&
        appointment.status !== 'Cancelled'
    );

    if (duplicate) {
      throw new Error('Appointment slot already booked');
    }

    const appointment = {
      referenceId: uuidv4(),
      timestamp: new Date().toISOString(),
      name: data.name,
      phone: data.phone,
      date: data.date,
      time: data.time,
      service: data.service,
      notes: data.notes || '',
      status: 'Confirmed',
    };

    await googleSheetsService.appendAppointment(
      appointment
    );

    return appointment;
  } catch (error) {
    console.error(
      'Create Appointment Error:',
      error.message
    );

    throw error;
  }
}

async function getAllAppointments() {
  try {
    const appointments =
      await googleSheetsService.getAppointments();

    return appointments;
  } catch (error) {
    console.error(
      'Get All Appointments Error:',
      error.message
    );

    return [];
  }
}

async function updateAppointment(
  referenceId,
  updatedData
) {
  try {
    const appointments =
      await googleSheetsService.getAppointments();

    const existingAppointment =
      appointments.find(
        (appointment) =>
          appointment.referenceId === referenceId
      );

    if (!existingAppointment) {
      return false;
    }

    const updatedAppointment = {
      ...existingAppointment,
      ...updatedData,
    };

    await googleSheetsService.updateAppointment(
      referenceId,
      updatedAppointment
    );

    return true;
  } catch (error) {
    console.error(
      'Update Appointment Service Error:',
      error.message
    );

    return false;
  }
}

async function cancelAppointment(referenceId) {
  try {
    const appointments =
      await googleSheetsService.getAppointments();

    const existingAppointment =
      appointments.find(
        (appointment) =>
          appointment.referenceId === referenceId
      );

    if (!existingAppointment) {
      return false;
    }

    const cancelledAppointment = {
      ...existingAppointment,
      status: 'Cancelled',
    };

    await googleSheetsService.updateAppointment(
      referenceId,
      cancelledAppointment
    );

    return true;
  } catch (error) {
    console.error(
      'Cancel Appointment Service Error:',
      error.message
    );

    return false;
  }
}

module.exports = {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  cancelAppointment,
};