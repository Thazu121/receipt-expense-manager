import {createSlice} from "@reduxjs/toolkit"
const loadReceipt =()=>{
    const data =localStorage.getItem("receipts")
    return data? JSON.parse(data):[]
}
const receiptSlice=createSlice({

    name:"receipt",
        initialState:{
            receipt:loadReceipt(),
            scannedReceipt:null
        },
    reducers:{
        setScannedReceipt:(state,action)=>{
            state.scannedReceipt=action.payload
        },
        addReceipt:(state,action)=>{
            
            state.receipt.push(action.payload)
            localStorage.setItem(
                "receipts",
                JSON.stringify(state.receipts)
            )

        },
        clearScannedReceipt:(state)=>{
            state.scannedReceipt=null
        }
    }

})

export const {setScannedReceipt,addReceipt,clearScannedReceipt}=receiptSlice.actions
export default receiptSlice.reducer