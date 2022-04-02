const express = require("express");
const Urls = require("../Models/url");
const router = express.Router();
// const UrlModel = require("../Models/url");
// const checkAuth = require("../Middleware/auth");

const getAll = async (req, res) => {
  const shortUrls = await Urls.find();
  res.status(200).send(shortUrls);
};

const create = async (req, res) => {
  try {
    let result = await Urls.create({ fullUrl: req.body.fullUrl });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(error);
  }
};
const getOne = async (req, res) => {
  const shortUrl = await Urls.findOne({ shortUrl: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);
  shortUrl.clicks++;
  shortUrl
    .save()
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(501).send(error));
};

module.exports = { create, getOne, getAll };
