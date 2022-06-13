module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ts', '.tsx'],
          alias: {
            '@APIs': './src/APIs', //외부 통신 함수들
            '@assets': './src/assets', // 이미지와 같은 정적 파일들
            '@atoms': './src/atoms', // Text와 같이 Props만으로 이루어진 최소 단위 요소들
            '@components': './src/components', // atom을 제외한 요소들
            '@configs': './src/configs', // 개인적으로 만든 커스텀 함수나, Hook들을 넣는 곳
            '@navigators': './src/navigators', // navigation 파일들을 모아두는 곳
            '@reducers': './src/reducers', // reducer 파일들이 모이는 곳
            '@styles': './src/styles', // css나 스타일 관련 파일들을 모아두는 곳
            '@utils': './src/utils', // 설정 파일이나 긴 내용의 객체들을 모아두는 곳
            '@screens': './src/screens', // 화면들을 모아두는 곳
          },
        },
      ],
    ],
  };
};
