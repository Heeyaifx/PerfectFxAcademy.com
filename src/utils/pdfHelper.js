/**
 * Convert Google Drive share link to embeddable preview URL
 * @param {string} shareUrl - Google Drive share URL
 * @returns {string} - Embeddable preview URL
 */
export const convertGoogleDriveUrl = (shareUrl) => {
    // Extract file ID from various Google Drive URL formats
    const patterns = [
        /\/file\/d\/([a-zA-Z0-9_-]+)/,  // /file/d/FILE_ID
        /id=([a-zA-Z0-9_-]+)/,          // ?id=FILE_ID
        /\/d\/([a-zA-Z0-9_-]+)/         // /d/FILE_ID
    ];

    for (const pattern of patterns) {
        const match = shareUrl.match(pattern);
        if (match && match[1]) {
            return `https://drive.google.com/file/d/${match[1]}/preview`;
        }
    }

    // If already a preview URL or direct link, return as is
    return shareUrl;
};

/**
 * Get direct download URL from Google Drive link
 * @param {string} shareUrl - Google Drive share URL
 * @returns {string} - Direct download URL
 */
export const getGoogleDriveDownloadUrl = (shareUrl) => {
    const patterns = [
        /\/file\/d\/([a-zA-Z0-9_-]+)/,
        /id=([a-zA-Z0-9_-]+)/,
        /\/d\/([a-zA-Z0-9_-]+)/
    ];

    for (const pattern of patterns) {
        const match = shareUrl.match(pattern);
        if (match && match[1]) {
            return `https://drive.google.com/uc?export=download&id=${match[1]}`;
        }
    }

    return shareUrl;
};

/**
 * Check if URL is a Google Drive link
 * @param {string} url - URL to check
 * @returns {boolean}
 */
export const isGoogleDriveUrl = (url) => {
    return url.includes('drive.google.com');
};
