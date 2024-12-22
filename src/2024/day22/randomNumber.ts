export const randomNumber = (seed: bigint): bigint => {
    seed = ((seed << 6n) ^ seed) % 16777216n;
    seed = ((seed >> 5n) ^ seed) % 16777216n;
    seed = ((seed << 11n) ^ seed) % 16777216n;

    return seed;
};
