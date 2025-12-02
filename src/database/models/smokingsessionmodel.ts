import { Schema ,model,Document} from 'mongoose';

export interface ISmokingSession extends Document{
    user_id:Schema.Types.ObjectId;
    session_type:"cigarette" |"craving"| "relapse";
    timestamp:Date;
    details:{
        cigarettes_count?:number;
        strenght_urge?:number;
        trigger?:string;
        location?:string;
        mood_before?:string;
        mood_after?:string;
        resisted?:boolean;
    };
    context:{
        activity?:string;
        people_with?:string;
        time_of_day?:string;
    };
}

const SmokingSessionSchema = new Schema<ISmokingSession>({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    session_type:{
        type:String,
        enum:["cigarette","craving","relapse"],
        required:true
    },

    timestamp:{
        type:Date,
        default:Date.now,
    },
    details:{
        cigarettes_count:{
            type:Number,
            default:0
        },

        strenght_urge:{
            type:Number,
            min:1,
            max:10,

        },
        trigger:String,
        location:String,
        mood_before:String,
        mood_after:String,
        resisted:Boolean
    },

    context:{
        activity:String,
        people_with:String,
        time_of_day:String,
    },
},{timestamps:true});

export const SmokingSession =model<ISmokingSession>(
    "SmokingSession",SmokingSessionSchema
)
