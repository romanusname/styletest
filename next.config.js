/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        swcPlugins: [
            [require.resolve("./plugincss.wasm"),{backlight:false}]
        ],
    },
}

module.exports = nextConfig