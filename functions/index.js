const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

//const BigQuery = require('@google-cloud/bigquery');
const {BigQuery} = require('@google-cloud/bigquery');
// Your Google Cloud Platform project ID
const projectId = 'badetemperatur';


var request = require('request');

var fastXmlParser = require('fast-xml-parser');

admin.initializeApp(functions.config().firebase);



const samplesCollection = 'samples';
//const samplesCollection = 'samples-offseason';
const samplesCollectionOffSeason = 'samples-offseason';
const samplesCollectionOther= 'samples-';

exports.addSamples = functions.pubsub.topic('hent-fra-nymfa').onPublish((event) => {
  const pubSubMessage = event.data ? Buffer.from(event.data, 'base64').toString() : null;
 //const pubSubMessage = event.data;
 
 console.log("addSamples triggered");
 console.log("data: " + pubSubMessage);
 console.log("atts " +  event.attributes);
 // Get the `name` attribute of the PubSub message JSON body.
  let name = null;
  try {
    var dataene = Object.assign(JSON.parse(pubSubMessage), event.attributes);
    dataene.published = new Date(dataene.published_at);
    console.log("fra Nymfa",dataene);   
    
    if(dataene.device_id ==="3e0032000c51343334363138"){
      console.log("dette er den som er i prod. Setter dataene i prod");
      if(dataene.tw < 1)
        {admin.firestore().collection(samplesCollectionOffSeason).doc().set(dataene); }

      return admin.firestore().collection(samplesCollection).doc().set(dataene);
    }
   
    console.log("Logger data i off season siden jeg ikke er prod decvice");
      
   
    return admin.firestore().collection(samplesCollectionOther+dataene.device_id).doc().set(dataene);
   
    
  } catch (e) {
    console.error('PubSub message was not JSON', e);
  }
  return -1;
});




//Returnerer data til nymfa om oppetid
exports.nymfa = functions.https.onRequest((req, res) => {
  
  try {
    console.log('body:', req.body);
    var ref = admin.firestore().collection('nymfaSettings').doc("settings");
    var getDoc = ref.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
        return 0;
      } else {
        var dataene = doc.data();
        console.log('Document data:',dataene );
        res.send(dataene);
        return -1;
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
  
  } catch (e) {
    console.error(' error', e);
  }
  return -1;
  
});



//Hvis man trenger å rydde i dataene. 
exports.justerData = functions.https.onRequest((req, res) => {
  console.log("justerData");
  //const result = await admin.firestore().collection(samplesCollection).orderBy("published_at", "desc").limit(10).get();
  var ref = admin.firestore().collection(samplesCollection);
  var p = 0;
  var i = 0;
  var startD = new Date("2018-09-03T21:00:38.215Z");
  var endD = new Date("2018-09-03T22:00:38.215Z");
  //var query = ref.where("published",">",startD).orderBy("published", "desc").get()
  var query = ref.where("published",">",startD).where("published","<",endD).orderBy("published", "desc").get()
    .then(snapshot => {
        snapshot.forEach(doc => {
          var data = doc.data();
         console.log("data", data);

         //Justere
         // console.log("data1",data.published_at);
          //data.published = new Date(data.published_at);
         // console.log("data ", data.published);
         // console.log("id ", doc.id);
         
         //slette
         //ref.doc(doc.id).delete();

          if (p > 50){
            console.log("antall logget ", i, " dato: " , data.published);
            p=0;
          }
          p++;
          i++;
        });
        return res.sendStatus(200);
      })
    .catch(err => {
        console.log('Error getting documents', err);
    });



  
});

exports.testYr = functions.https.onRequest((req, res) => {
  console.log('Skikkelig enkel test');
  try {
  
    var ref = admin.firestore().collection('nymfaSettings').doc("keys");
    var getDoc = ref.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
        return 0;
      } else {
        var yrData = getYRData(14.2,"2023-05-29T09:00:00+02:00");
        var apiene = doc.data();
        postToYR(yrData,apiene.yr);

       
        console.log("dataviskalsende: " + JSON.stringify(yrData));
        return res.status(200).json(yrData);
        

      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
  
  } catch (e) {
    console.error(' error', e);
  }
  return -1;
  




});

//Brukes av Dukkert
exports.lastupdated = functions.https.onRequest((req, res) => {
  console.log("lastupdated");
  console.log(req.query.client);
  var query = admin.firestore().collection(samplesCollection).orderBy("published_at", "desc").limit(1).get()
  //var query = ref.where("published",">",startD).where("published","<",endD).orderBy("published", "desc").get()
    .then(snapshot => {
      var lastUpdated = new Object();
        snapshot.forEach(doc => {
          var data = doc.data();
          console.log("data", data);
          
          lastUpdated.updated=data.published;
          lastUpdated.temperature = data.tw;
          lastUpdated.location="Nordbytjernet";
          
        });
        return res.status(200).json(lastUpdated);
        //return res.sendStatus(200);
      })
    .catch(err => {
        console.log('Error getting documents', err);
    });



  
});

//Data plattform
exports.sampleToBigQ = functions.firestore
  .document("/samples/{sampleID}")
  .onCreate((event, context) => {
    console.log("Data",event.data() );
    var data = event.data();
    let bigquery = new BigQuery();
    let datasetName="badetemperatur";
    let tableName = "sample";

    const datetime = BigQuery.datetime(data.published_at);
    let table =   bigquery.dataset(datasetName).table(tableName);
    let row = {
            
      device:data.device_id,
      temperature: data.tw,
      power:data.p,
      timestamp: datetime
    }
    console.log("row " + row);
    table.insert(row)
    .then(() => {
      console.log(`Inserted  rows`, row);
      return 0; 
    })
    .catch(err => {
      console.log('Error getting documents', err);
    })
    
    return;
  });



  exports.sendYrData = functions.firestore
  .document("/samples/{sampleID}")
  .onCreate((event, context) => {
    console.log("sendYrData",event.data() );
    var data = event.data();
    var dataToYr = getYRData(data.tw, data.published_at);
    console.log("dataviskalsende: " + JSON.stringify(dataToYr));

    try {
  
      var ref = admin.firestore().collection('nymfaSettings').doc("keys");
      var getDoc = ref.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
          return;
        } else {
          
          var apiene = doc.data();
          postToYR(dataToYr,apiene.yr);
          console.log("hentet nøkkel og postet");
          return;
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
    
    } catch (e) {
      console.error(' error', e);
    }
    
    return;
  });



function getYRData(temp, date){
 return [ 
    {
      "name": "Nordbytjernet",
      "lat": 60.15676,
      "lon": 11.16533,
      "heatedWater": false,
      "temperature": temp,
      "time": date
    }
  ];
  
}

function postToYR(postData,apikey){
  //var url = "https://yr-api-badetemperaturer-dev.dev.yr.azure.nrk.cloud/api/registrere";
  var url ="https://badetemperaturer.yr.no/api/registrere"

  axios.post(url, postData,{
    headers: {
      'Content-Type': 'application/json',
      'apikey': apikey
    }
  })
  .then(function (response) {
    console.log("test OK");
    console.log(response.data);
    return;
  })
  .catch(function (error) {
    console.log(error);
    return;
  });
}


