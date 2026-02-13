/**
 * Production Environment Configuration Check
 * This script runs on startup to ensure all required environment variables are set
 */

const requiredEnvVars = [
    'PORT',
    'HOST',
    'ADMIN_PASSWORD',
    'OFFLINE_TOLERANCE_HOURS'
];

const optionalEnvVars = [
    'NODE_ENV'
];

function validateEnvironment() {
    console.log('[ENV] Validating environment variables...');
    
    let hasErrors = false;
    
    // Check required variables
    requiredEnvVars.forEach(varName => {
        if (!process.env[varName]) {
            console.error(`[ENV] ❌ Missing required environment variable: ${varName}`);
            hasErrors = true;
        } else {
            console.log(`[ENV] ✓ ${varName}: ${varName === 'ADMIN_PASSWORD' ? '***' : process.env[varName]}`);
        }
    });
    
    // Check optional variables
    optionalEnvVars.forEach(varName => {
        if (process.env[varName]) {
            console.log(`[ENV] ✓ ${varName}: ${process.env[varName]}`);
        } else {
            console.log(`[ENV] ℹ ${varName}: not set (using default)`);
        }
    });
    
    // Security checks
    if (process.env.ADMIN_PASSWORD === 'admin123') {
        console.warn('[ENV] ⚠️  WARNING: Using default admin password! Change it immediately!');
    }
    
    if (hasErrors) {
        console.error('[ENV] ❌ Environment validation failed!');
        process.exit(1);
    }
    
    console.log('[ENV] ✅ Environment validation passed');
}

module.exports = { validateEnvironment };
