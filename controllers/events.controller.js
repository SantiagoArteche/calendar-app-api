import { eventModel } from "../models/events.models.js";

export const getEvents = async (request, response) => {
  try {
    const events = await eventModel.find().populate("user", "name");
    response.status(200).send({
      ok: true,
      msg: events,
    });
  } catch (error) {
    response.status(500).send({
      ok: false,
      msg: error,
    });
  }
};

export const createEvent = async (request, response) => {
  const event = request.body;
  const { uid } = request;
  try {
    event.user = uid;
    const newEvent = await eventModel.create(event);

    response.status(200).send({
      ok: true,
      msg: newEvent,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      ok: false,
      msg: "Error creating new event",
    });
  }
};

export const updateEvent = async (request, response) => {
  const { id } = request.params;
  const { uid } = request;

  try {
    const event = await eventModel.findById(id);
    if (!event) {
      return response.status(404).send({
        ok: false,
        msg: "Event doesn't exist by that ID",
      });
    }

    if (event.user.toString() !== uid) {
      return response.status(401).send({
        ok: false,
        msg: "Don't have authorization to edit this event",
      });
    }
    const newEvent = {
      ...request.body,
      user: uid,
    };

    const updateEvent = await eventModel.findByIdAndUpdate(id, newEvent, {
      new: true,
    });
    response.status(200).send({
      ok: true,
      msg: updateEvent,
    });
  } catch (error) {
    response.status(500).send({
      ok: false,
      msg: error,
    });
  }
};

export const deleteEvent = async (request, response) => {
  const { id } = request.params;
  const { uid } = request;

  try {
    const event = await eventModel.findById(id);

    if (!event) {
      return response.status(404).send({
        ok: false,
        msg: "Event doesn't exist by that ID",
      });
    }

    if (event.user.toString() !== uid) {
      return response.status(401).send({
        ok: false,
        msg: "Don't have authorization to delete this event",
      });
    }

    await eventModel.findByIdAndDelete(id);

    return response.status(200).send({
      ok: true,
      msg: "Event deleted",
    });
  } catch (error) {
    response.status(500).send({
      ok: false,
      msg: error,
    });
  }
};
