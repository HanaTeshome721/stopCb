import mongoose,{Document,Schema} from "mongoose";


export interface SmokingHistory {
    years_smoked :number;
    cigarettes_per_day:number;
    cigarette_cost_per_pack:number;
    brand:string;
}

export interface SmokingProfile{
    start_date:Date;
    smoking_history:SmokingHistory;
    quit_resons:string[];
    triggers:string[];
}

export interface Goals{
    quit_date:Date;
    reduction_plan:"cold_turkey" | "gradual_reduction";
    target_cigarettes_per_day:number;
    motivation_level:"low" |"medium"|"high";
}

export interface Settings{
    notifications:{
        daily_reminders:boolean;
        progress_updates:boolean;
        motivational_alerts:boolean;
    };
    privacy:{
        share_progress:boolean;
    }
}

export interface PersonalInfo {
    username:string;
    email:string;
    phone:string;
    date_of_birth:Date;
    gender:string;
    profile_picture:string
}


export interface UserDocument extends Document {
    personal_info :PersonalInfo;
    smoking_profile:SmokingProfile;
    goals:Goals;
    settings:Settings;
    created_at:Date;
    last_active:Date;
    sessions:Schema.Types.ObjectId[]
}

const SmokingHistorySchema = new Schema<SmokingHistory>({
    years_smoked:Number,
    cigarettes_per_day:Number,
    cigarette_cost_per_pack:Number,
    brand:String,
    
});

const SmokingProfileSchema = new Schema<SmokingProfile>({
    start_date:Date,
    smoking_history:SmokingHistorySchema,
    quit_resons:[String],
    triggers:[String],
});

const GoalsSchema =new Schema<Goals>({
    quit_date:Date,
    reduction_plan:{ type:String ,enum:["cold_turkey","gradual-reduction"]},
    target_cigarettes_per_day:Number,
    motivation_level:{type:String,enum:["low","medium","high"]},
});

const SettingsSchema = new Schema<Settings>({
    notifications:{
        daily_reminders:Boolean,
        progress_updates:Boolean,
        motivational_alerts:Boolean,
    },
    privacy:{
        share_progress:Boolean
    }
})

const PersonalInfoSchema =new Schema<PersonalInfo>({
    username:String,
    email:String,
    phone:String,
    date_of_birth:Date,
    gender:String,
    profile_picture:String,
});



const UserSchema = new Schema<UserDocument>({
    // _id:{type:String},
    personal_info:PersonalInfoSchema,
    smoking_profile:SmokingProfileSchema,
    goals:GoalsSchema,
    settings:SettingsSchema,
    created_at:Date,
    last_active:Date,

    sessions:[
        {
            type:Schema.Types.ObjectId,
            ref:"SmokingSession",
        }
    ]
})


export default mongoose.model<UserDocument>("User",UserSchema);