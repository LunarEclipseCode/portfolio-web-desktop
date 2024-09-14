module.exports = () => {
    const nextConfig = {
        transpilePackages: ['react-filerobot-image-editor', 'tippy.js'],
        webpack: (config) => {
           config.externals = [...config.externals, "canvas", "jsdom"];
            return config;
        }
    };
    return nextConfig;
};