const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Update user profile
router.put('/profile', auth, [
    body('username').optional().trim().isLength({ min: 2, max: 30 }),
    body('bio').optional().isLength({ max: 200 }),
    body('avatar').optional(),
    body('dailyGoal').optional().isInt({ min: 50, max: 500 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const updates = {};
        const allowedUpdates = ['username', 'bio', 'avatar', 'dailyGoal'];

        allowedUpdates.forEach(field => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        const user = await User.findByIdAndUpdate(
            req.user._id,
            updates,
            { new: true }
        );

        res.json({ user: user.getPublicProfile() });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// Update progress (complete a level)
router.post('/progress', auth, [
    body('course').isIn(['html', 'css', 'js', 'ts', 'react', 'node']),
    body('levelId').notEmpty(),
    body('levelTitle').optional(),
    body('xp').isInt({ min: 0 }),
    body('firstTry').isBoolean(),
    body('fast').isBoolean()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { course, levelId, levelTitle, xp, firstTry, fast } = req.body;
        const user = req.user;

        // Extract level number from levelId (e.g., 'html-01' -> 1)
        const levelNum = parseInt(levelId.split('-')[1]);

        // Check if level already completed
        if (!user.progress[course].completed.includes(levelNum)) {
            // Add to completed
            user.progress[course].completed.push(levelNum);

            // Update current level
            const maxCompleted = Math.max(...user.progress[course].completed, 0);
            user.progress[course].current = maxCompleted + 1;

            // Add XP
            user.xp += xp;

            // Update rank
            user.rank = user.calculateRank();

            // Update stats
            user.stats.totalLevels += 1;
            if (firstTry) user.stats.firstTryCount += 1;
            if (fast) user.stats.fastCompletions += 1;

            // Update weekly XP
            const today = new Date().toISOString().split('T')[0];
            const currentDayXP = user.weeklyXP.get(today) || 0;
            user.weeklyXP.set(today, currentDayXP + xp);

            // Add to recent activity
            user.recentActivity.unshift({
                course,
                levelId,
                levelTitle: levelTitle || levelId,
                xp,
                timestamp: new Date()
            });

            // Keep only last 50 activities
            if (user.recentActivity.length > 50) {
                user.recentActivity = user.recentActivity.slice(0, 50);
            }

            // Update streak
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayKey = yesterday.toISOString().split('T')[0];

            if (user.weeklyXP.get(yesterdayKey) > 0 || user.stats.streakDays === 0) {
                // Check if first activity today
                const todayActivity = user.recentActivity.filter(a =>
                    a.timestamp.toISOString().split('T')[0] === today
                ).length;

                if (todayActivity === 1) {
                    user.stats.streakDays += 1;
                }
            } else if (!user.weeklyXP.get(yesterdayKey)) {
                user.stats.streakDays = 1;
            }

            user.lastActive = new Date();
            await user.save();
        }

        res.json({
            success: true,
            user: user.getPublicProfile()
        });
    } catch (error) {
        console.error('Progress update error:', error);
        res.status(500).json({ error: 'Failed to update progress' });
    }
});

// Add achievement
router.post('/achievements', auth, [
    body('achievementId').notEmpty()
], async (req, res) => {
    try {
        const { achievementId } = req.body;
        const user = req.user;

        if (!user.achievements.includes(achievementId)) {
            user.achievements.push(achievementId);
            await user.save();
        }

        res.json({
            success: true,
            achievements: user.achievements
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add achievement' });
    }
});

// Reset progress
router.post('/reset', auth, async (req, res) => {
    try {
        const user = req.user;

        user.xp = 0;
        user.rank = 1;
        user.progress = {
            html: { completed: [], current: 1 },
            css: { completed: [], current: 1 },
            js: { completed: [], current: 1 },
            ts: { completed: [], current: 1 },
            react: { completed: [], current: 1 },
            node: { completed: [], current: 1 }
        };
        user.achievements = [];
        user.stats = {
            totalLevels: 0,
            streakDays: 0,
            firstTryCount: 0,
            fastCompletions: 0,
            totalTime: 0
        };
        user.weeklyXP = new Map();
        user.recentActivity = [];

        await user.save();

        res.json({
            success: true,
            user: user.getPublicProfile()
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reset progress' });
    }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
    try {
        const users = await User.find({ role: 'user' })
            .select('username avatar xp rank stats.totalLevels')
            .sort({ xp: -1 })
            .limit(50);

        res.json({
            leaderboard: users.map((user, index) => ({
                rank: index + 1,
                username: user.username,
                avatar: user.avatar,
                xp: user.xp,
                level: user.rank,
                totalLevels: user.stats.totalLevels
            }))
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get leaderboard' });
    }
});

module.exports = router;
