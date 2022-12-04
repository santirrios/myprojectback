import * as functions from "firebase-functions";
import * as express from 'express'
import * as cors from 'cors'
import { auth } from './firebase'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.post("/iniciosesion", async (req, res) => {
    try {
        const data = JSON.parse(req.body)
        const credentials = await signInWithEmailAndPassword(auth, data.email, data.password);
        console.log(credentials)
        return res.status(200).json(credentials)
    } catch (err) {
        return res.json({ "error": err })
    }
})
app.post("/register", async (req, res) => {
    try {
        const data = JSON.parse(req.body)
        const credentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
        console.log(credentials)
        return res.status(200).json(credentials)

    } catch (err) {
        return res.json({ "error": err })
    }
})
import * as admin from 'firebase-admin'
admin.initializeApp({
    credential: admin.credential.cert('./permission.json')
});
const db = admin.firestore();

app.get("/", async (req, res) => {
    try {
        const query = await db.collection("productos").get();
        const querySnapshot = query.docs;
        const response = querySnapshot.map((doc) => ({
            id: doc.id,
            name: doc.data().nombre,
            cantidad:doc.data().cantidad,
            precio:doc.data().precio
        }));
        return res.status(200).json(response)
    } catch (err) {
        return res.status(200).send(err)
    }
});
app.post("/", async (req, res) => {
    try {
        const data = JSON.parse(req.body);
        await db.collection('productos').doc('/' + data.id + ('/')).create({ nombre: data.nombre,cantidad:data.cantidad,precio:data.precio });
        return res.status(204).json()
    } catch (err) {
        return res.status(500).send(err)
    }
});
app.delete("/",async(req,res)=>{
    try{
        const data= JSON.parse(req.body);
        await db.collection('productos').doc('/'+data.id+'/').delete();
        return res.status(204).json()
    }catch(err){
        return res.status(500).send(err)
    }
});
app.put("/",async(req,res)=>{
    try{
        const data=JSON.parse(req.body);
        const document=db.collection('productos').doc('/'+data.id+'/');
        await document.update({
        nombre:data.nombre,
        cantidad:data.cantidad,
        precio:data.precio
        });
        return res.status(204).json()
    }catch(err){
        return res.status(500).send(err)
    }
});
app.put("/estado",async(req,res)=>{
    try{
        const data=JSON.parse(req.body);
        const document=db.collection('estado').doc('1');
        await document.update({
        estado:data.estado,
        email:data.email
        });
        return res.status(204).json();
    }catch(err){
        return res.status(500).send(err);

    }
});
app.get("/estado",async(req,res)=>{
    try{
        const query = await db.collection("estado").doc('/1/').get();
        const item=query.data();
        return res.status(200).json(item)
    }catch(err){
        return res.status(500).send(err)

    }

})

//subir factura
app.post("/ventas", async (req, res) => {
    try {
        const data = JSON.parse(req.body);
        await db.collection('ventas').doc().create({ nombre:data.name,id:data.id,cantidad:data.cantidad,precio:data.precio});
        return res.status(204).json()
    } catch (err) {
        return res.status(500).send(err)
    }
});
app.get("/ventas", async (req, res) => {
    try {
        const query = await db.collection("ventas").get();
        const querySnapshot = query.docs;
        const response = querySnapshot.map((doc) => ({
            idDoc: doc.id,
            nombre:doc.data().nombre,
            id:doc.data().id,
            cantidad:doc.data().cantidad,
            precio:doc.data().precio
        }));
        return res.status(200).json(response)
    } catch (err) {
        return res.status(200).send(err)
    }
});







// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const appp = functions.https.onRequest(app)