import User from '../database/models/usermodel'
import { Request,Response } from 'express'
//get all user

export const getAlluser =async (req:Request,res:Response)=>{
 try{
    const users= await User.find()
    res.json(users)
 }catch(error){
    res.status(500).json({error:'failed to fetch users'})
 }

}



export const createUser = async (req: Request, res: Response) => {
    try {
        const { personal_info, smoking_profile, goals, settings } = req.body;

        // Validate required fields
        if (!personal_info?.email || !personal_info?.username) {
            return res.status(400).json({
                message: "Email and username are required"
            });
        }

        // Check for duplicate email
        const existingUser = await User.findOne({
            "personal_info.email": personal_info.email.toLowerCase().trim(),
        });

        if (existingUser) {
            return res.status(400).json({ 
                message: "Email already registered" 
            });
        }

        // Create new user with proper defaults
        const newUser = new User({
            personal_info: {
                username: personal_info.username.trim(),
                email: personal_info.email.toLowerCase().trim(),
                phone: personal_info.phone || "",
                date_of_birth: personal_info.date_of_birth || null,
                gender: personal_info.gender || "",
                profile_picture: personal_info.profile_picture || ""
            },
            smoking_profile: {
                start_date: smoking_profile?.start_date || new Date(),
                smoking_history: {
                    years_smoked: smoking_profile?.smoking_history?.years_smoked || 0,
                    cigarettes_per_day: smoking_profile?.smoking_history?.cigarettes_per_day || 0,
                    cigarette_cost_per_pack: smoking_profile?.smoking_history?.cigarette_cost_per_pack || 0,
                    brand: smoking_profile?.smoking_history?.brand || ""
                },
                quit_reasons: smoking_profile?.quit_reasons || [],
                triggers: smoking_profile?.triggers || []
            },
            goals: {
                quit_date: goals?.quit_date || new Date(),
                reduction_plan: goals?.reduction_plan || "cold_turkey",
                target_cigarettes_per_day: goals?.target_cigarettes_per_day || 0,
                motivation_level: goals?.motivation_level || "medium"
            },
            settings: {
                notifications: {
                    daily_reminders: settings?.notifications?.daily_reminders || true,
                    progress_updates: settings?.notifications?.progress_updates || true,
                    motivational_alerts: settings?.notifications?.motivational_alerts || false
                },
                privacy: {
                    share_progress: settings?.privacy?.share_progress || false
                }
            }
            // Don't include created_at, last_active, sessions, preferences
            // Let Mongoose handle the defaults
        });

        await newUser.save();

        // Remove sensitive data before sending response
        const userResponse = newUser.toObject();
      

        res.status(201).json({
            message: "User registered successfully",
            user: userResponse,
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: "Server error",
            error: error instanceof Error ? error.message : String(error) // Send a safe message
        });
    }
}

