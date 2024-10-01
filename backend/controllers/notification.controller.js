
import Notificaiton from "../models/notification.model.js"

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id

        const notifications = await Notificaiton.find({to: userId})
        .populate({
            path: "from",
            select: "username profileImg"
        })

        await Notificaiton.updateMany({to: userId}, {read: true})

        res.status(200).json(notifications)
    } catch (error) {
        console.log("Error in getNotifications: ", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id
    
        await Notificaiton.deleteMany({to: userId})
        res.status(200).json({message: "Notifications deleted successfully"})
        
    } catch (error) {
        console.log("Error in deleteNotifications: ", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}