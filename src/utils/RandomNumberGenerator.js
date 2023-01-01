const RandomNumberGenerator = {
  generate() {
    const randomValue = Math.random();

    return Math.ceil(randomValue / 0.1);
  },
};

export default RandomNumberGenerator;
