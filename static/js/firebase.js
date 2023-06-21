import {initializeApp} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {getDatabase, ref, onValue, update} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

export default class FirebaseIOT{
    constructor(databaseURL){
        this.app = initializeApp(databaseURL);
        this.database = getDatabase(this.app);
        this.commendInDB = ref(this.database, "commend");
    }

    getData(nameInDB){
        let onData = [];
        onValue(nameInDB, (snapshoot)=>{
            onData.push(Object.values(snapshoot.val())); 
        });
        return onData;
    };

    updateData(nameInDB, key, val){
        const updates = {};
        updates[key] = val;
        return update(nameInDB, updates);
    };

    getSensorSignal(){
        return this.getData(this.signalInDB);
    };
    getCommend(){
        return this.getData(this.commendInDB);
    };
    updateSensorSignal(join, val){
        this.updateData(this.signalInDB,join,val);
    };
    updateCommend(join, val){
        this.updateData(this.commendInDB,join,val);
    };
}