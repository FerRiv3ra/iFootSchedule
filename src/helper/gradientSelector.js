const gradientSelector = mode => {
  let gradient = [];
  if (mode === 'UCL') {
    gradient = [
      '#ff00ff',
      '#180056',
      '#180056',
      '#180056',
      '#180056',
      '#4400ff',
    ];
  } else {
    gradient = ['#5a0024', '#5a0024', '#5a0024', '#000'];
  }

  return gradient;
};

export default gradientSelector;
