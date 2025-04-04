// 카카오 책 검색 API 엔드포인트 설정
const API_URL = 'https://dapi.kakao.com/v3/search/book?';

// API 요청에 필요한 인증 키 설정
const API_KEY = 'KakaoAK 3fb9abf6e2929ccaf46538d13a4a72a6';

// api 함수 정의 (비동기 함수)
// params: 검색할 때 필요한 쿼리 파라미터 객체 (예: { query: '해리포터', size: '2' }).
// async 키워드를 사용해 비동기 함수로 선언.
const api = async params => {
  // URLSearchParams를 이용한 쿼리 문자열 변환
  // params 객체를 URL 인코딩된 문자열로 변환.
  // { query: '해리포터', size: '2' } → "query=%ED%95%B4%EB%A6%AC%ED%8F%AC%ED%84%B0&size=2"
  const queryString = new URLSearchParams(params).toString();

  // fetch()를 이용한 API 요청
  // await 키워드를 사용해 응답이 올 때까지 기다림.
  // headers에서 인증 토큰(API_KEY) 을 추가.
  const response = await fetch(API_URL + queryString, {
    headers: {Authorization: API_KEY}
  });

  // JSON 변환 후 반환
  // await를 사용하지 않아서 Promise를 반환함 → api 함수의 호출자가 await api()로 결과를 기다려야 함.
  return response.json();
}

// 함수 내보내기 (export default)
// api 함수를 모듈로 내보내서 다른 파일에서 import하여 사용할 수 있도록 함.
export default api;

// ✅ 최종 실행 흐름
// 1. 쿼리 문자열 변환 → "query=해리포터&size=2"
// 2. fetch()로 API 호출 (비동기)
// 3. 응답을 JSON으로 변환하여 반환
// 4. 다른 파일에서 import api from './파일명' 해서 사용 가능