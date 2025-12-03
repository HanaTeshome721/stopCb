import mongoose, { Schema, Document } from "mongoose";

export interface TargetAudience {
    quit_stage: "early" | "middle" | "maintenance";
    trigger_context: string[];
    time_since_quit: string;
}

export interface MediaInfo {
    image_url?: string;
    video_url?: string;
    duration_minutes?: number;
}

export interface EffectivenessMetrics {
    views: number;
    success_rate: number;
    user_rating: number;
}

export interface SupportContentDocument extends Document {
    content_type: "motivational_tip" | "article" | "video" | "exercise";
    title: string;
    content: string;
    category: string;
    tags: string[];
    target_audience: TargetAudience;
    media?: MediaInfo;
    effectiveness_metrics: EffectivenessMetrics;
    created_at: Date;
}

/* ============ SUB-SCHEMAS ============ */

const TargetAudienceSchema = new Schema<TargetAudience>({
    quit_stage: {
        type: String,
        enum: ["early", "middle", "maintenance"],
        required: true,
    },
    trigger_context: { type: [String], default: [] },
    time_since_quit: { type: String, required: true },
});

const MediaSchema = new Schema<MediaInfo>({
    image_url: { type: String },
    video_url: { type: String },
    duration_minutes: { type: Number },
});

const EffectivenessMetricsSchema = new Schema<EffectivenessMetrics>({
    views: { type: Number, default: 0 },
    success_rate: { type: Number, default: 0 },
    user_rating: { type: Number, default: 0 },
});

/* ============ MAIN SCHEMA ============ */

const SupportContentSchema = new Schema<SupportContentDocument>({
    content_type: {
        type: String,
        enum: ["motivational_tip", "article", "video", "exercise"],
        required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },

    target_audience: {
        type: TargetAudienceSchema,
        required: true,
    },

    media: {
        type: MediaSchema,
        required: false,
    },

    effectiveness_metrics: {
        type: EffectivenessMetricsSchema,
        default: {},
    },

    created_at: { type: Date, default: Date.now },
});

export default mongoose.model<SupportContentDocument>(
    "SupportContent",
    SupportContentSchema
);
