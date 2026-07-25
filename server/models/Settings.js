const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'Abdelrahman'
  },
  title: {
    type: String,
    default: 'Web Designer & Front-end Developer'
  },
  description: {
    type: String,
    default: 'He crafts responsive websites where technologies meet creativity'
  },
  email: {
    type: String,
    default: 'abdelrahman@dev.ml'
  },
  discord: {
    type: String,
    default: '!Abdelrahman#3519'
  },
  github: {
    type: String,
    default: '#'
  },
  twitter: {
    type: String,
    default: '#'
  },
  linkedin: {
    type: String,
    default: '#'
  },
  heroTitle: {
    type: String,
    default: 'Abdelrahman is a web designer and front-end developer'
  },
  heroDesc: {
    type: String,
    default: 'He crafts responsive websites where technologies meet creativity'
  },
  aboutP1: {
    type: String,
    default: "I'm a self-taught front-end developer based in Kyiv, Ukraine. I can develop responsive websites from scratch and raise them into modern user-friendly web experiences."
  },
  aboutP2: {
    type: String,
    default: "Transforming my creativity and knowledge into websites has been my passion for over a year. I have been helping various clients establish their presence online. I always strive to learn about the newest technologies and frameworks."
  },
  quote: {
    type: String,
    default: 'With great power comes great electricity bill'
  },
  quoteAuthor: {
    type: String,
    default: '– Dr. Who'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);
