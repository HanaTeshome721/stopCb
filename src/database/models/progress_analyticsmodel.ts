import mongoose, { Schema, Document } from "mongoose";

export interface DailySummary {
    cigarettes_smoked: number;
    cigarettes_saved: number;
    money_saved: number;
    time_saved: number;
    craving_episodes: number;
    successful_resistances: number; // plural for consistency
}

export interface ProgressDocument extends Document {
    user_id: mongoose.Types.ObjectId;
    date: Date;
    daily_summary: DailySummary;
    milestones_achieved: string[];
}

const DailySummarySchema = new Schema<DailySummary>({
    cigarettes_smoked: { type: Number, required: true },
    cigarettes_saved: { type: Number, required: true },
    money_saved: { type: Number, required: true },
    time_saved: { type: Number, required: true },
    craving_episodes: { type: Number, required: true },
    successful_resistances: { type: Number, required: true },
});

const ProgressSchema = new Schema<ProgressDocument>(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        date: {
            type: Date,
            required: true,
        },

        daily_summary: {
            type: DailySummarySchema,
            required: true,
        },

        milestones_achieved: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true } // optional but useful
);

export default mongoose.model<ProgressDocument>("Progress", ProgressSchema);
