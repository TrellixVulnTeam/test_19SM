import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();
const hbase = require('hbase');
//const rtsIndex = require('../routes/index.router');

const client = hbase({ host: "127.0.0.1", port: 8080 });

app.use(cors());
//app.use('/projet', rtsIndex);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

//nombre de # de VakeelSaab
app.get('/tab12', (req, res) => {
  client.table("AAlichouribehe-hashtag-VakeelSaab-NbTimes").scan(
    {
      batch: 1,
    },(err,resu) => {
      if(err){
        console.log(err);
      }else{
        res.json(resu);
      }
    });
});

//nombre de tweets par pays
app.get('/tab13', (req, res) => {
  client.table("AAlichouribehe-nbTweetByCountry").scan(
    {
      batch: 1000,
    }, (err, resu) => {
      if(err){
        console.log(err);
      }else{
        res.json(resu);
      }
    });
});

//nombre de tweets par langue
app.get('/tab14', (req, res) => {
  client.table("AAlichouribehe-nbTweetByLanguage").scan(
    {
      batch: 1000,
    }, (err, resu) => {
      if(err){
        console.log(err);
      }else{
        res.json(resu);
      }
    });
});

//nombre tweets par utilisateur total
app.get('/tab15', (req, res) => {
  client.table("AAlichouribehe-nbtweet-byuser").scan(
    {
      batch: 200000,
    }, (err, resu) => {
      if(err){
        console.log(err);
      }else{
        res.json(resu);
      }
    });
});

//les k # les plus utilisé entre 1 et 10000 sur toute les données
app.get('/tab16', (req, res) => {
  client.table("AAlichouribehe-topKHashtag-AllData").scan(
    {
      batch: 10000,
    }, (err, resu) => {
      if(err){
        console.log(err);
      }else{
        res.json(resu);
      }
    });
});

//les k # les plus utilisé pour une date spécifique
app.get('/tab17', (req, res) => {
  client.table("AAlichouribehe-topKHashtag-03-03-2020").scan(
    {
      batch: 10000,
    }, (err, resu) => {
      if(err){
        console.log(err);
      }else{
        res.json(resu);
      }
    });
});

//Les utilisateurs ayant utilisé au moins un hashtag, la liste des hashtags (sans doublon) et le nombre total de hashtags qu’ils ont utilisés
app.get('/tab18', (req, res) => {
  client.table("AAlichouribehe-user-used-hashtag").scan(
    {
      batch: 10,
    }, (err, resu) => {
      if(err){
        console.log(err);
      }else{
        res.json(resu);
      }
    });
});

//Nombre de tweet par heure :
app.get('/tab19', (req, res) => {
  client.table("AAlichouribehe-nbTweetByDayByHour").scan(
    {
      batch: 10,
    }, (err, resu) => {
      if(err){
        console.log(err);
      }else{
        res.json(resu);
      }
    });
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
