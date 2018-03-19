const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
var request = require('request');

var fastXmlParser = require('fast-xml-parser');
var parseString = require('xml2js').parseString;

admin.initializeApp(functions.config().firebase);

const LOCATION = {
  // This is Dublin, Ireland 
  lat: 60.1562,
  lon: 11.170503
};

exports.addSamples = functions.pubsub.topic('hent-fra-nymfa').onPublish((event) => {
 const pubSubMessage = event.data;
  // Get the `name` attribute of the PubSub message JSON body.
  let name = null;
  try {
    var dataene = Object.assign(pubSubMessage.json, pubSubMessage.attributes)
    console.log("fra Nymfa",dataene);    
    return admin.firestore().collection('samples').doc().set(dataene);

    
  } catch (e) {
    console.error('PubSub message was not JSON', e);
  }
  return -1;
});

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    return res.redirect(303, snapshot.ref);
  });
});

//https://www.yr.no/sted/Norge/Akershus/Ullensaker/Nordbytjernet/varsel.xml


// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
// exports.addWeather = functions.https.onRequest((req, res) => {
//   console.log("Hent Værdata");
  
//   return yrno.getWeather(LOCATION)
//   .then((weather) => {
//     console.log(weather.json);
//     return weather.getFiveDaySummary();
//   }).
//   then( (data)=> {
//     console.log('FiceDay',data);
//     return res.redirect(303,snapshot.ref);
//   })
//   .catch((e) =>{
//     console.error('feil', e);
//   })
  
// });


exports.addYr = functions.https.onRequest((req, res) => {
  console.log("Hent Værdata");
  request('https://www.yr.no/sted/Norge/Akershus/Ullensaker/Nordbytjernet/varsel.xml', (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('body:', body); // Print the HTML for the Google homepage.
    parseString(body, (err, result)=> {
        var weatherRef = admin.firestore().collection('weather-YR');
        console.dir(result);
        if(err !== null)
          console.log(err);


        weatherRef.doc().set(result);
        result.lastupdate = result.weatherdata.meta[0].lastupdate[0];
        console.dir(result);
        console.log("---lagt inn i YR");
    });

    return res.sendStatus(200);
  })
  
});


exports.hentYr = functions.https.onRequest((req, res) => {
  console.log("hent fra basen");
        //admin.firestore().setLogLevel('debug');
        var weatherRef = admin.firestore().collection('weather-YR');
                 
        var lastWeather= weatherRef.orderBy('lastupdate').get()
        //var lastWeather= weatherRef.get() 
        .then(snapshot => {
          snapshot.forEach(doc => {
             // console.log(doc.id, '=>', doc.data());
              var weatherdata = doc.data().weatherdata;
              console.log("I treet", '=>', weatherdata.meta[0].lastupdate[0]);
              console.log("rot", '=>', doc.data().lastupdate);
              
            });
            
            return res.sendStatus(200);
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
  
  
});


