class FB {
    constructor() {
        this.firebase = require('firebase');

        this.firebaseConfig = {
            apiKey: "AIzaSyCO21-EkTmNTu8z-euYBxSNmYI54BqyCME",
            authDomain: "weightandbalance-a0909.firebaseapp.com",
            databaseURL: "https://weightandbalance-a0909.firebaseio.com",
            projectId: "weightandbalance-a0909",
            storageBucket: "weightandbalance-a0909.appspot.com",
            messagingSenderId: "172428131882",
            appId: "1:172428131882:web:aa2e09f352194df2"
        };

        this.firebase.initializeApp(this.firebaseConfig, "VCF");
        this.db = this.firebase.app("VCF").firestore();
    }

    getData(onDataReceived)
    {
        this.db.collection("VCFAirplanes").get().then(
            function(val) {
                let data = [];
                val.forEach(function(doc) {
                    data.push(doc.data());
                });
                onDataReceived(data);
            }
        );

        return 0; //this.db.collection("VCFAirplanes").getData();
    }
}

export default FB;

