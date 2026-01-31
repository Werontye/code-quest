const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    avatar: {
        type: String,
        default: '&#128640;'
    },
    bio: {
        type: String,
        maxlength: 200,
        default: ''
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    xp: {
        type: Number,
        default: 0
    },
    rank: {
        type: Number,
        default: 1
    },
    dailyGoal: {
        type: Number,
        default: 100
    },
    progress: {
        html: {
            completed: { type: [Number], default: [] },
            current: { type: Number, default: 1 }
        },
        css: {
            completed: { type: [Number], default: [] },
            current: { type: Number, default: 1 }
        },
        js: {
            completed: { type: [Number], default: [] },
            current: { type: Number, default: 1 }
        },
        ts: {
            completed: { type: [Number], default: [] },
            current: { type: Number, default: 1 }
        },
        react: {
            completed: { type: [Number], default: [] },
            current: { type: Number, default: 1 }
        },
        node: {
            completed: { type: [Number], default: [] },
            current: { type: Number, default: 1 }
        }
    },
    achievements: {
        type: [String],
        default: []
    },
    stats: {
        totalLevels: { type: Number, default: 0 },
        streakDays: { type: Number, default: 0 },
        firstTryCount: { type: Number, default: 0 },
        fastCompletions: { type: Number, default: 0 },
        totalTime: { type: Number, default: 0 }
    },
    weeklyXP: {
        type: Map,
        of: Number,
        default: {}
    },
    recentActivity: [{
        course: String,
        levelId: String,
        levelTitle: String,
        xp: Number,
        timestamp: { type: Date, default: Date.now }
    }],
    lastActive: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Calculate rank based on XP
userSchema.methods.calculateRank = function() {
    const rankThresholds = [0, 100, 300, 600, 1000, 1500, 2500, 4000];
    let rank = 1;
    for (let i = rankThresholds.length - 1; i >= 0; i--) {
        if (this.xp >= rankThresholds[i]) {
            rank = i + 1;
            break;
        }
    }
    return rank;
};

// Get public profile (exclude sensitive data)
userSchema.methods.getPublicProfile = function() {
    return {
        id: this._id,
        email: this.email,
        username: this.username,
        avatar: this.avatar,
        bio: this.bio,
        xp: this.xp,
        rank: this.rank,
        dailyGoal: this.dailyGoal,
        progress: this.progress,
        achievements: this.achievements,
        stats: this.stats,
        weeklyXP: Object.fromEntries(this.weeklyXP),
        recentActivity: this.recentActivity.slice(0, 10),
        createdAt: this.createdAt
    };
};

module.exports = mongoose.model('User', userSchema);
