/** @type {import('next').NextConfig} */

// const nextConfig = {};

// export default nextConfig;

const nextConfig = {
    images: {
      domains: ["firebasestorage.googleapis.com"],
    },
    // images: {
    //   remotePatterns: [
    //     {
    //       protocol: 'https',
    //       hostname: 'firebasestorage.googleapis.com',
    //       port: '',
    //       pathname: '/**', // or be more specific if you want
    //     },
    //   ],
    // },
    webpack: (config, { isServer }) => {
      // Add raw-loader for GLSL files
      config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false, // Required to prevent import errors in Next.js
            },
          },
        ],
      });
  
      return config;
    },
  };
  
  export default nextConfig
  
