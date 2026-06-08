const appointmentService = require('../services/appointmentService');

async function create(req, res) {
  try {
    const { name, phone, date, time, service, notes } = req.body;

    if (!name || !phone || !date || !time || !service) {
      return res.status(400).json({
        success: false,
        error: 'Missing fields: name, phone, date, time, service',
      });
    }

    const appointment = await appointmentService.createAppointment({
      name,
      phone,
      date,
      time,
      service,
      notes,
    });

    return res.status(201).json({
      success: true,
      message: 'Appointment created successfully.',
      data: appointment,
    });
  } catch (error) {
    console.error('Create Appointment Error:', error.message);

    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to create appointment',
    });
  }
}

async function getAll(req, res) {
  try {
    const appointments =
      await appointmentService.getAllAppointments();

    return res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error('Get Appointments Error:', error.message);

    return res.status(500).json({
      success: false,
      error: 'Failed to fetch appointments',
    });
  }
}

async function update(req, res) {
  try {
    const { referenceId } = req.params;

    const updated =
      await appointmentService.updateAppointment(
        referenceId,
        req.body
      );

    if (!updated) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
    });
  } catch (error) {
    console.error(
      'Update Appointment Error:',
      error.message
    );

    return res.status(500).json({
      success: false,
      error: 'Failed to update appointment',
    });
  }
}

async function remove(req, res) {
  try {
    const { referenceId } = req.params;

    const deleted =
      await appointmentService.cancelAppointment(
        referenceId
      );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
    });
  } catch (error) {
    console.error(
      'Cancel Appointment Error:',
      error.message
    );

    return res.status(500).json({
      success: false,
      error: 'Failed to cancel appointment',
    });
  }
}

module.exports = {
  create,
  getAll,
  update,
  remove,
};