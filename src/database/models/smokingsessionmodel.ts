import { Schema, model, Document } from "mongoose";

export interface ISmokingSession extends Document {
    user_id: Schema.Types.ObjectId;
    session_type: "cigarette" | "craving" | "relapse";
    timestamp: Date;

    details: {
        cigarettes_count?: number;
        strength_urge?: number;
        trigger?: string;
        location?: string;
        mood_before?: string;
        mood_after?: string;
        resisted?: boolean;
    };

    context: {
        activity?: string;
        people_with?: string;  // or string[]
        time_of_day?: string;
    };
}

const SmokingSessionSchema = new Schema<ISmokingSession>(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        session_type: {
            type: String,
            enum: ["cigarette", "craving", "relapse"],
            required: true,
        },

        timestamp: {
            type: Date,
            default: Date.now,
        },

        details: {
            cigarettes_count: {
                type: Number,
                default: 0,
            },

            strength_urge: {
                type: Number,
                min: 1,
                max: 10,
            },

            trigger: { type: String },
            location: { type: String },
            mood_before: { type: String },
            mood_after: { type: String },
            resisted: { type: Boolean },
        },

        context: {
            activity: { type: String },
            people_with: { type: String }, // or [String] if needed
            time_of_day: { type: String },
        },
    },
    { timestamps: true }
);

export const SmokingSession = model<ISmokingSession>(
    "SmokingSession",
    SmokingSessionSchema
);
