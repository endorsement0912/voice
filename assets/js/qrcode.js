// 📌 비동기 작업 3개 실행
// 1. getToken() → 배경 이미지 가져오기
// 2. geoApi() → 현재 위치 (위도, 경도) 가져오기
// 3. weatherApi() → 날씨 정보 가져오기 (geoApi()가 완료된 후 실행)
// 1 & (2->3)
import getToken from './module/unsplash.js'; // 이미지 API 모듈 (배경 이미지)
import geoApi from "./module/geolocation.js"; // 위치 정보 API 모듈 (위도, 경도)
import weatherApi from "./module/openweather.js"; // 날씨 API 모듈 (날씨 정보)


(async () => {

  // 📌 geoApi()와 getToken()을 동시에 실행하고 결과를 기다림
  const results = await Promise.allSettled([geoApi(), getToken()]);

  // 📌 Promise.allSettled() 결과에서 value만 추출 (구조 분해 할당)
  //    geoApi() 실행 결과: coords (위도, 경도)
  //    getToken() 실행 결과: token (배경 이미지 정보)
  const [{ value: coords }, { value: token }] = results;

  // 📌 weatherApi(coords)를 호출하여 날씨 정보를 가져옴
  //    구조 분해 할당을 사용해 temp(온도)와 info(날씨 상태)만 추출
  const {
    main: { temp }, // 온도 정보 (temp)
    weather: [{ main: info }] // 날씨 상태 (info) - 예: "Clear", "Rain", "Clouds"
  } = await weatherApi(coords);

  // 📌 HTML 요소 가져오기
  const weather = document.querySelector('#weather'); // 날씨 표시 요소
  const body = document.querySelector('body'); // 배경 이미지 적용할 body 요소
  const locationName = document.querySelector('#locationName'); // 위치 정보 표시 요소

  weather.textContent = `${info}@${temp} ℃`;  // 📌 날씨 정보 업데이트 (예: "Clear@25 ℃")

  body.style.backgroundImage = `url(${token.bg})`;   // 📌 배경 이미지 적용

  locationName.textContent = token.location; // 📌 배경 이미지의 촬영 위치 정보 표시

})(); // 즉시 실행 함수 (IIFE)
