const express = require('express');
const User = require('../models/User');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all users (admin only)
router.get('/users', adminAuth, async (req, res) => {
    try {
        const { page = 1, limit = 20, sort = '-lastActive' } = req.query;

        const users = await User.find()
            .select('-password')
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await User.countDocuments();

        res.json({
            users: users.map(u => ({
                id: u._id,
                email: u.email,
                username: u.username,
                avatar: u.avatar,
                role: u.role,
                xp: u.xp,
                rank: u.rank,
                stats: u.stats,
                progress: u.progress,
                lastActive: u.lastActive,
                createdAt: u.createdAt
            })),
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
});

// Get user statistics summary
router.get('/stats', adminAuth, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeToday = await User.countDocuments({
            lastActive: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
        });
        const activeWeek = await User.countDocuments({
            lastActive: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        });
        const activeMonth = await User.countDocuments({
            lastActive: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        });

        // Get course completion stats
        const courseStats = await User.aggregate([
            {
                $project: {
                    htmlCompleted: { $size: '$progress.html.completed' },
                    cssCompleted: { $size: '$progress.css.completed' },
                    jsCompleted: { $size: '$progress.js.completed' },
                    tsCompleted: { $size: '$progress.ts.completed' },
                    reactCompleted: { $size: '$progress.react.completed' },
                    nodeCompleted: { $size: '$progress.node.completed' }
                }
            },
            {
                $group: {
                    _id: null,
                    totalHtml: { $sum: '$htmlCompleted' },
                    totalCss: { $sum: '$cssCompleted' },
                    totalJs: { $sum: '$jsCompleted' },
                    totalTs: { $sum: '$tsCompleted' },
                    totalReact: { $sum: '$reactCompleted' },
                    totalNode: { $sum: '$nodeCompleted' }
                }
            }
        ]);

        // Get total XP earned
        const xpStats = await User.aggregate([
            {
                $group: {
                    _id: null,
                    totalXP: { $sum: '$xp' },
                    avgXP: { $avg: '$xp' },
                    maxXP: { $max: '$xp' }
                }
            }
        ]);

        // New users per day (last 7 days)
        const newUsersPerDay = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({
            users: {
                total: totalUsers,
                activeToday,
                activeWeek,
                activeMonth
            },
            courses: courseStats[0] || {
                totalHtml: 0,
                totalCss: 0,
                totalJs: 0,
                totalTs: 0,
                totalReact: 0,
                totalNode: 0
            },
            xp: xpStats[0] || { totalXP: 0, avgXP: 0, maxXP: 0 },
            newUsersPerDay
        });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ error: 'Failed to get statistics' });
    }
});

// Get user activity (tasks completed, frequency)
router.get('/activity', adminAuth, async (req, res) => {
    try {
        const { days = 30 } = req.query;
        const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

        // Get recent activity from all users
        const activityData = await User.aggregate([
            { $unwind: '$recentActivity' },
            {
                $match: {
                    'recentActivity.timestamp': { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: '%Y-%m-%d', date: '$recentActivity.timestamp' } },
                        course: '$recentActivity.course'
                    },
                    completions: { $sum: 1 },
                    xpEarned: { $sum: '$recentActivity.xp' }
                }
            },
            { $sort: { '_id.date': -1 } }
        ]);

        // Get most active users
        const topUsers = await User.find()
            .select('username avatar xp stats.totalLevels lastActive')
            .sort({ 'stats.totalLevels': -1 })
            .limit(10);

        // Activity by hour
        const activityByHour = await User.aggregate([
            { $unwind: '$recentActivity' },
            {
                $match: {
                    'recentActivity.timestamp': { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: { $hour: '$recentActivity.timestamp' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({
            dailyActivity: activityData,
            topUsers: topUsers.map(u => ({
                username: u.username,
                avatar: u.avatar,
                xp: u.xp,
                totalLevels: u.stats.totalLevels,
                lastActive: u.lastActive
            })),
            activityByHour
        });
    } catch (error) {
        console.error('Activity error:', error);
        res.status(500).json({ error: 'Failed to get activity data' });
    }
});

// Get specific user details
router.get('/users/:userId', adminAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get user' });
    }
});

// Update user role
router.put('/users/:userId/role', adminAuth, async (req, res) => {
    try {
        const { role } = req.body;

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { role },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update role' });
    }
});

// Delete user
router.delete('/users/:userId', adminAuth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;
