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


exports.hentYrOld = functions.https.onRequest((req, res) => {
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

exports.nymfaStatus = functions.https.onRequest((req, res) => {
  
  try {
    
    var dataene = new Object() ;
    dataene.waitfor = 60*30;
    dataene.awake= false;   
    admin.firestore().collection('nymfaSettings').doc().set(dataene);
  
    res.send(dataene);
    
  } catch (e) {
    console.error(' error', e);
  }
  return -1;
  
});

exports.hentYr = functions.https.onRequest((req, res) => {
  console.log("Hent Værdata");
  request('https://www.yr.no/sted/Norge/Akershus/Ullensaker/Nordbytjernet/varsel.xml', (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    //console.log('body:', body); // Print the HTML for the Google homepage.
    parseString(body, (err, result)=> {
        var weatherRef = admin.firestore().collection('weather-simple');
        //console.dir(result);
        if(err !== null)
          console.log(err);

        var weather = new Object();
        var dateTemp = result.weatherdata.meta[0].lastupdate[0] + "+02:00";
        console.log("dateTemp", dateTemp);
        console.log("dateTemp", Date.parse(dateTemp));
        weather.lastupdate=  new Date(dateTemp);
        weather.link= result.weatherdata.links[0].link[2].$.url;
        weather.symbol= result.weatherdata.forecast[0].tabular[0].time[0].symbol[0];
        weather.wind = result.weatherdata.forecast[0].tabular[0].time[0].windSpeed[0].$;
        weather.time = getDateNoTime(result.weatherdata.forecast[0].tabular[0].time[0].$);
        weather.temperature = result.weatherdata.forecast[0].tabular[0].time[0].temperature[0].$.value;
        var tempForecast = result.weatherdata.forecast[0].tabular[0].time;
        console.log("length" , tempForecast.length );
        for(var i = 0; i<tempForecast.length; i++){
          
            console.log("periode",tempForecast[i].$.period);
            if(tempForecast[i].$.period === "3")
            {
              weather.forecast = new Object();
              console.log("YEAH");
              weather.forecast.symbol= tempForecast[i].symbol[0];
              weather.forecast.wind = tempForecast[i].windSpeed[0].$;
              weather.forecast.time = getDateNoTime(tempForecast[i].$);
              weather.forecast.temperature = tempForecast[i].temperature[0].$.value;

              if((new Date(weather.time.from)).setHours(0,0,0,0) === (new Date(weather.forecast.time.from)).setHours(0,0,0,0)){
                console.log("samme dag");
                weather.forecast.sameDay=true;
              }
              else{
                weather.forecast.sameDay=false;
              }
              break;
            }
        }
        // legg til hele fila;  
        //weather.complete = result;

        console.log("ISOString" + weather.lastupdate.toISOString());
        weatherRef.doc(weather.lastupdate.toISOString()).set(weather);
        //result.lastupdate = result.weatherdata.meta[0].lastupdate[0];
        return res.send(weather);

    });

  
  })
  
});



function getDateNoTime(time){
  time.from = new Date(time.from+"+02:00");
  time.to = new Date(time.to+"+02:00");
 return time;
}

