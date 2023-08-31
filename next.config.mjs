import withPlaiceholder from '@plaiceholder/next';

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn2.thecatapi.com',
				port: '',
				pathname: '/images/**',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: '30.media.tumblr.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default withPlaiceholder(nextConfig);
