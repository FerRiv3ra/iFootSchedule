const gradientSelector = mode => {
  let gradient = [];
  switch (mode) {
    case 'UCL':
      gradient = ['#ff00ff', '#180056', '#180056', '#180056', '#4400ff'];
      break;
    case 'laLiga':
      gradient = [
        'rgb(141,29,29)',
        'rgb(141,29,29)',
        '#C80029',
        'rgb(182,142,0)',
      ];
      break;
    case 'premier':
      gradient = [
        'rgb(0,198,255)',
        'rgb(0,198,255)',
        'rgb(147,42,255)',
        'rgb(0,255,120)',
      ];
      break;
    case 'FWC':
      gradient = [
        'rgb(222,0,90)',
        'rgb(138,0,40)',
        'rgb(33,81,246)',
        'rgb(0,208,71)',
      ];
      break;
    default:
      gradient = ['#ff00ff', '#180056', '#180056', '#180056', '#4400ff'];
      break;
  }

  return gradient;
};

export default gradientSelector;
