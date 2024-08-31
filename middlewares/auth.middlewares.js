const Joi = require('joi');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Adjust import path as necessary
const isLoggedIn = (req, res, next) => {
  // Get token from headers or cookies
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1] || req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: 'Token is not valid.' });
  }
};
const signupValidations = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error: error.details });
  }
  next();
};

const loginValidations = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error: error.details });
  }
  next();
};

// Middleware for creating or updating an itinerary
const itineraryValidationsJoi = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    start_date: Joi.date().iso().required(),
    end_date: Joi.date().iso().required(),
    locations: Joi.array().items(Joi.object({
      name: Joi.string().min(2).max(100).required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      weather_data: Joi.object({
        temperature: Joi.number(),
        condition: Joi.string()
      }),
      local_events: Joi.array().items(Joi.string())
    })),
    activities: Joi.array().items(Joi.object({
      name: Joi.string().min(2).max(100).required(),
      type: Joi.string().valid('sightseeing', 'adventure', 'cultural', 'other').required(),
      cost: Joi.number().min(0).required(),
      description: Joi.string()
    })),
    budget: Joi.number().min(0).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Bad request', error: error.details });
  }
  next();
};

const expenseValidations = (req, res, next) => {
  const schema = Joi.object({
    category: Joi.string().min(3).max(100).required(),
    amount: Joi.number().min(0).required(),
    date: Joi.date().iso().required(),
    description: Joi.string().optional()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Bad request', error: error.details });
  }
  next();
};

const locationValidations = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    weather_data: Joi.object({
      temperature: Joi.number(),
      condition: Joi.string()
    }).optional(),
    local_events: Joi.array().items(Joi.string()).optional()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Bad request', error: error.details });
  }
  next();
};

const activityValidations = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    type: Joi.string().valid('sightseeing', 'adventure', 'cultural', 'other').required(),
    cost: Joi.number().min(0).required(),
    description: Joi.string().optional()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Bad request', error: error.details });
  }
  next();
};

module.exports = { signupValidations, loginValidations, itineraryValidationsJoi, expenseValidations, locationValidations, activityValidations, isLoggedIn };