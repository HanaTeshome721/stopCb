import mongoose, { Schema, Document } from "mongoose";

export interface MilestoneDetails {
    name: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    reward_points: number;
}

export interface MilestoneMetrics {
    days_clean: number;
    cigarettes_avoided: number;
    money_saved: number;
    life_regained: number; // added from your original JSON
}

export interface MilestoneDocument extends Document {
    user_id: mongoose.Types.ObjectId;
    milestone_type: string; // you can add enum later
    achieved_at: Date;
    details: MilestoneDetails;
    metrics: MilestoneMetrics;
}

const MilestoneDetailsSchema = new Schema<MilestoneDetails>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
    reward_points: { type: Number, required: true },
});

const MilestoneMetricsSchema = new Schema<MilestoneMetrics>({
    days_clean: { type: Number, required: true },
    cigarettes_avoided: { type: Number, required: true },
    money_saved: { type: Number, required: true },
    life_regained: { type: Number, required: true },
});

const MilestoneSchema = new Schema<MilestoneDocument>(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        milestone_type: {
            type: String,
            required: true,
        },

        achieved_at: {
            type: Date,
            required: true,
        },

        details: {
            type: MilestoneDetailsSchema,
            required: true,
        },

        metrics: {
            type: MilestoneMetricsSchema,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<MilestoneDocument>("Milestone", MilestoneSchema);
