 export default function swDev(){
     let url = `${process.env.PUBLIC_URL}/serviceworker.js`
     navigator.serviceWorker.register(url)
        .then(response => console.log('response' , response))
 }