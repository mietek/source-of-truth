#!/usr/bin/env node

'use strict';

var assign = require('object-assign');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var fs = require('fs');
var papa = require('babyparse');
var uuid = require('node-uuid');


function parseCsv(file, cb) {
  var fileData = fs.readFileSync(file, 'utf8');
  var completedLength;
  papa.parse(fileData, {
      header: true,
      complete: function (result) {
        if (!result.errors.length) {
          if (!completedLength) {
            cb(result.data);
            completedLength = result.data.length;
          } else {
            if (completedLength !== result.data.length) {
              console.error('Bad parse:', completedLength, result.data.length);
            }
          }
        } else {
          result.errors.forEach(function (e) {
              console.error(e.message);
            });
        }
      }
    });
}


var app = express();

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(cors());


function respond(req, res, status, body) {
  var isOk = status >= 200 && status < 400;
  var info = req.connection.remoteAddress + ' ' + req.method + ' ' + req.url;
  if (isOk) {
    console.log(info, status);
  } else {
    console.log(info, status, body);
  }
  res.status(status);
  res.send(body);
  return isOk;
}


app.get('/', function (req, res) {
    respond(req, res, 200, {});
  });

app.listen(process.env.PORT || 7000);
