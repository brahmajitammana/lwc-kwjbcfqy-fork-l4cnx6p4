import { LightningElement, track } from 'lwc';

export default class app extends LightningElement {
    @track groupedDataMap = [];
    @track storeArray = [];
    @track showChildren = false;

    @track data = [
    {
        "Store_Name__c": "Store A",
        "Contact_Number__c": "12345678901",
        "Department__c": "Sales"
    },
    {
        "Store_Name__c": "Store A",
        "Contact_Number__c": "12345678902",
        "Department__c": "Marketing"
    },
    {
        "Store_Name__c": "Store B",
        "Contact_Number__c": "12345678903",
        "Department__c": "Sales"
    },
    {
        "Store_Name__c": "Store B",
        "Contact_Number__c": "12345678904",
        "Department__c": "Marketing"
    }
];
    connectedCallback() {
        this.groupedDataMap = new Map();

        this.data.forEach(store => {
            if (this.groupedDataMap.has(store.Store_Name__c)) {
                this.groupedDataMap.get(store.Store_Name__c).stores.push(store);
            } else {
                let newStore = {};
                newStore.Store_Name__c = store.Store_Name__c;
                newStore.stores = [store];
                this.groupedDataMap.set(store.Store_Name__c, newStore);
            }
        });
    
        let itr = this.groupedDataMap.values();
        let result = itr.next();
        while (!result.done) {
            result.value.rowspan = result.value.stores.length + 1;
            this.storeArray.push(result.value);
            result = itr.next();
        }
    }

    handleExpand() {
        this.showChildren = !this.showChildren;
    }
}
