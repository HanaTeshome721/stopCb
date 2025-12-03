import mongoose, { Document, Schema } from "mongoose";

/* =====================
    INTERFACES
===================== */

export interface SmokingHistory {
    years_smoked: number;
    cigarettes_per_day: number;
    cigarette_cost_per_pack: number;
    brand: string;
}

export interface SmokingProfile {
    start_date: Date;
    smoking_history: SmokingHistory;
    quit_reasons: string[];
    triggers: string[];
}

export interface Goals {
    quit_date: Date;
    reduction_plan: "cold_turkey" | "gradual_reduction";
    target_cigarettes_per_day: number;
    motivation_level: "low" | "medium" | "high";
}

export interface Settings {
    notifications: {
        daily_reminders: boolean;
        progress_updates: boolean;
        motivational_alerts: boolean;
    };
    privacy: {
        share_progress: boolean;
    };
}

export interface PersonalInfo {
    username: string;
    email: string;
    phone: string;
    date_of_birth: Date;
    gender: string;
    profile_picture: string;
}

export interface UserDocument extends Document {
    personal_info: PersonalInfo;
    smoking_profile: SmokingProfile;
    goals: Goals;
    settings: Settings;
    created_at: Date;
    last_active: Date;
    sessions: mongoose.Types.ObjectId[];
    preferences: mongoose.Types.ObjectId[];
}

/* =====================
    SCHEMAS
===================== */

const SmokingHistorySchema = new Schema<SmokingHistory>({
    years_smoked: Number,
    cigarettes_per_day: Number,
    cigarette_cost_per_pack: Number,
    brand: String,
});

const SmokingProfileSchema = new Schema<SmokingProfile>({
    start_date: { type: Date },
    smoking_history: SmokingHistorySchema,
    quit_reasons: { type: [String], default: [] },
    triggers: { type: [String], default: [] },
});

const GoalsSchema = new Schema<Goals>({
    quit_date: Date,
    reduction_plan: { type: String, enum: ["cold_turkey", "gradual_reduction"] },
    target_cigarettes_per_day: Number,
    motivation_level: { type: String, enum: ["low", "medium", "high"] },
});

const SettingsSchema = new Schema<Settings>({
    notifications: {
        daily_reminders: { type: Boolean, default: true },
        progress_updates: { type: Boolean, default: true },
        motivational_alerts: { type: Boolean, default: true },
    },
    privacy: {
        share_progress: { type: Boolean, default: false },
    },
});

const PersonalInfoSchema = new Schema<PersonalInfo>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    date_of_birth: Date,
    gender: String,
    profile_picture: String,
});

const UserSchema = new Schema<UserDocument>({
    personal_info: { type: PersonalInfoSchema, required: true },
    smoking_profile: { type: SmokingProfileSchema, required: true },
    goals: { type: GoalsSchema, required: true },
    settings: { type: SettingsSchema, required: true },

    created_at: { type: Date, default: Date.now },
    last_active: { type: Date, default: Date.now },

    preferences: [
        {
            type: Schema.Types.ObjectId,
            ref: "SupportContent",
        },
    ],

    sessions: [
        {
            type: Schema.Types.ObjectId,
            ref: "SmokingSession",
        },
    ],
});

export default mongoose.model<UserDocument>("User", UserSchema);
