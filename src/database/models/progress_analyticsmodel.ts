import mongoose,{Schema,Document} from "mongoose";

export interface DailySumamry {
    cigarettes_smoked :number;
    cigarettes_saved : number;
    money_saved:number;
    time_saved:number;
    craving_episodes:number;
    successful_resistance:number;
}

export interface ProgressDocumnt extends Document{
    user_id: mongoose.Types.ObjectId;
    date: Date;
    daily_summary :DailySumamry;
    milestones_achieved:string[];
}


const DailySumamrySchema= new Schema<DailySumamry>({
    cigarettes_smoked:{type:Number,required:true},
    cigarettes_saved:{type:Number,required:true},
    money_saved:{type:Number,required:true},
    time_saved:{type:Number,required:true},
    craving_episodes:{type:Number, required:true},
    successful_resistance:{type:Number,required:true},
});


const ProgressSchema = new Schema<ProgressDocumnt>({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    date:{
        type:Date,
        required:true
    },

    daily_summary:{
        type: DailySumamrySchema,
        required:true
    },

    milestones_achieved:{
        type:[String],
        default:[],
    }
})


export default mongoose.model<ProgressDocumnt>(
    "Progress",ProgressSchema
)