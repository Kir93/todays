# Todays

## 프로젝트 간단 설명

하루의 루틴을 하나로 수행할 수 있는 App.

## 필요 기능

- 미완료 : :white_large_square:
- 완료 : :white_check_mark:

| 기능      | 진행 내용                                                 |      완료 여부       |
| :-------- | :-------------------------------------------------------- | :------------------: |
| 일기      | 매일의 아침 저녁 일기를 작성하여 list, month로 볼 수 있음 | :white_large_square: |
| 할일 관리 | 매일의 할 일에 대해 작성하여 완료 여부를 체크             |                      |

## 기술 스택

| 이름              | 버전    |
| :---------------- | :------ |
| React             | v17.0.2 |
| React-native      | v0.68.2 |
| Expo              | v45.0.6 |
| Styled-components | v5.3.0  |

## Quick Start

```
git clone https://github.com/tirrilee-team02/todays.git
cd todays
yarn
cd ios && pod install && cd ..
yarn ios || yarn android
```

## Fix List

- [x] Diary Screen에서만 Android App종료 할 수 있도록 수정
- [ ] List Screen에서 데이터 과도하게 불러올 때 깜빡이는 현상
- [ ] List Screen에서 데이터 과도하게 불러올 때 데이터 정확하게 안 나오는 현상
